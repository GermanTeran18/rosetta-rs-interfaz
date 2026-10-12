#Escribir una nueva clase Features Reporter


Implementar un FeaturesReporter implica los siguientes pasos:

1.  Implementa la interfaz de la clase FeaturesReporter (véase justo debajo). Además, puedes usar code_templates para generar los archivos .hh y .cc de la clase.
2.  Implementa la interfaz de la clase FeaturesReporterCreator (como harías con un mover).
3.  Registra el FeatureReporter en el FeaturesReporterRegistrator (rosetta/main/source/src/protocols/init/init.FeaturesReporterCreators.ihh y rosetta/main/source/src/protocols/init/init.FeaturesReporterRegistrators.ihh)
4.  Añade el FeatureReporter a la prueba unitaria FeatureReporterTests (rosetta/main/source/test/protocols/features/FeaturesReporterTests.cxxtest.hh).
5.  Considera añadir el FeatureReporter a la prueba de integración de features (rosetta/main/tests/integration/tests/features).
6.  Documenta el FeatureReporter en la página del [[esquema de la base de datos de Features|FeatureReporters]].
7.  Añade los nuevos tipos en la página organizativa <FeatureReporters>

Interfaz de la clase FeatureReporter
-------------------------------

La interfaz de la clase base FeatureReporter (rosetta/main/source/src/protocols/features/FeaturesReporter.hh) tiene los siguientes componentes, que debe implementar un nuevo FeaturesReporter:

**Métodos obligatorios**

-   **type\_name** : devuelve una cadena con el tipo del feature reporter
-   **schema** : devuelve las sentencias SQL que configuran en la base de datos las tablas que contendrán las features. Para admitir todos los motores de base de datos, usa el marco de [[generación de esquemas|FeaturesSchemaGeneration]] (función write\_schema\_to\_db).
-   **report\_features** : extrae todas las features a la base de datos

**Métodos opcionales**

-   **features\_reporter\_dependencies** : devuelve un vector con los nombres de los features reporters de los que depende este. (En rosetta\_scripts, el mover ReportToDB impone esta dependencia exigiendo que los FeaturesReporters listados aquí estén definidos antes en la lista.)
-   **parse\_my\_tag** : cómo se interpreta en rosetta scripts la subetiqueta \<Feature name=(& type\_name string)/\> del mover ReportToDB.
-   **load\_into\_pose** : si los datos se usan para inicializar algún aspecto de un Pose, pon la lógica aquí.
-   **delete\_records** : elimina de la base de datos todos los registros asociados a una estructura.

Como ejemplo, considera el feature reporter PoseCommentsFeatures (rosetta/main/source/protocols/features/PoseCommentsFeatures.hh). Se puede asociar información textual arbitraria a un Pose en forma de comentarios *(key, val)* (véase rosetta/main/source/src/core/pose/util.hh). El FeaturesReporter PoseCommentsFeatures extrae todos los comentarios definidos a una tabla *pose\_comments* usando *struct\_id* y *key* como clave primaria. *struct\_id* hace referencia a la tabla structures, que identifica cada una de las estructuras de la base de datos.

En la función report\_features, sessionOP es un puntero propietario a la base de datos donde se deben escribir las features. Consulta la [[interfaz de bases de datos|Database IO]] para saber cómo obtener sesiones de base de datos e interactuar con ellas.

    string
    PoseCommentsFeatures::type_name() const { return "PoseCommentsFeatures"; }

    string
    PoseCommentsFeatures::schema() const {
      return
        "CREATE TABLE IF NOT EXISTS pose_comments (\n"
        " struct_id INTEGER,\n"
        " key TEXT,\n"
        " value TEXT,\n"
        " FOREIGN KEY (struct_id)\n"
        " REFERENCES structures (struct_id)\n"
        " DEFERRABLE INITIALLY DEFERRED,\n"
        " PRIMARY KEY(struct_id, key));";
    }

    Size
    PoseCommentsFeatures::report_features(
      Pose const & pose,
      Size struct_id,
      sessionOP db_session
    ){  
      typedef map< string, string >::value_type kv_pair;
      foreach(kv_pair const & kv, get_all_comments(pose)){
        statement stmt = (*db_session) <<
          "INSERT INTO pose_comments VALUES (?,?,?)" <<
          struct_id << kv.first << kv.second;
        stmt.exec();
      }
      
      return 0;
    }

-   Opcionalmente, un FeatureReporter puede construirse con una ScoreFunction. Por ejemplo, véase la clase RotamerRecoveryFeatures (rosetta/main/source/protocols/features/RotamerRecoveryFeatures.hh).

##Véase también

* [[FeatureReporters]]
* [[FeaturesTutorials]]
* [[FeaturesRScripts]]
* [[TrajectoryReportToDBMover]]
* [[RosettaScripts database connection options]]
* [[Database IO]]: información sobre la entrada/salida a bases de datos en Rosetta
* [[Rosetta Database Output Tutorial]]
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con bases de datos
* [[Database options]]: opciones de línea de comandos relacionadas con bases de datos
* [[I want to do x]]: guía para elegir un mover
