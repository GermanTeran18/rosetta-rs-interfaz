#Tutorial de Features: ejecutar el benchmark científico

Introducción
============

El **benchmark científico de Features** se usa para comparar lotes de estructuras procedentes de distintas fuentes con respecto a características químicas y geométricas locales. Este tutorial describe cómo ejecutar el benchmark científico de features. Los pasos generales son

1.  Para cada fuente de muestras, obtener o generar un lote de conformaciones de estructuras
2.  Para cada fuente de muestras, extraer features a una base de datos de features
3.  Para cada script de análisis, comparar 2 o más fuentes de muestras

[[_TOC_]]

Requisitos de compatibilidad con bases de datos
=============================

El benchmark científico de features almacena los datos de features en bases de datos.

-   **SQLite** : Rosetta se distribuye con compatibilidad con bases de datos *SQLite3*.
-   **MySQL** , **PostgreSQL** : para usar la interfaz con *MySQL* y *PostgreSQL*, los controladores adecuados deben estar compilados en Rosetta. Consulta la página de [[entrada/salida de bases de datos|Database-IO]] para más información.


Generar bases de datos de features
==========================

Generar la base de datos de features implica extraer información de features de cada estructura. Normalmente esto requiere especificar la siguiente información

Entrada de estructuras
--------------------

Las coordenadas de las estructuras usadas para extraer la información de features pueden suministrarse en cualquier formato reconocido por la aplicación *rosetta\_scripts*.

-   **pdb** :
    -   *-in:path path/to/structures* : el directorio que contiene los pdb
    -   *-in:file:l \<pdbfile.list\>* : un archivo con una lista de nombres de archivos PDB que se deben procesar. NOTA: los nombres de archivo del archivo *\<pdbfile.list\>* serán las *tags* de la tabla *structures*.
    -   Si las estructuras provienen del Protein Data Bank, sigue los pasos para hacer que Rosetta sea más [[robusto ante entradas defectuosas|robust]].

-   **Silent files** :
    -   *-in:file:silent \<structures.silent\>* : el nombre de archivo del silent file
    -   *-in:file:silent\_struct\_type \<type\>* : el tipo del silent file
    -   *-in:file:tags* : las tags de las estructuras que se usarán del silent file. NOTA: serán las *tags* de la tabla *structures*
    -   *-in:file:tagfile* : el nombre de un archivo con la lista de tags de las estructuras que se usarán del silent file. NOTA: serán las *tags* de la tabla *structures*

-   **Entrada desde base de datos** :
    -   *-inout:database\_mode \<mode\>* : qué motor de base de datos usar ( *sqlite3* , *mysql* o *postgresql* ).
    -   *-inout:database\_filename \<database\_name\>* : es el nombre de archivo de la base de datos para *sqlite3* y el nombre de la base de datos para *MySQL* y *PostgreSQL* . NOTA: la base de datos a la que se extraen las features se especifica en la etiqueta \< [[ReportToDB|Movers-RosettaScripts#ReportToDB]] /\> del script de *rosetta\_scripts*
    -   *-{postgresql, mysql}:{host, user, password, port}* : información sobre cómo conectarse a las bases de datos *MySQL* y *PostgreSQL*
    -   *-in:use\_database* : indica que la base de datos debe usarse como entrada
    -   *-in:select\_structures* : una consulta SQL para seleccionar qué estructuras se deben usar, p. ej. "SELECT tag FROM structures WHERE tag= '7rsa';"

Seleccionar los Feature Reporters
---------------------------


Usa el mover ReportToDB con el scripting XML de Rosetta para especificar qué features se deben extraer a la base de datos de features. (Nota: el mover TrajectoryReportToDB también se puede usar en Rosetta scripts o en C++ para informar de features en forma de trayectoria varias veces a la base de datos para una sola salida).

Cada FeaturesReporter se encarga de extraer un cierto tipo de features a la base de datos de features. Selecciona un conjunto de [[FeaturesReporters|FeaturesDatabaseSchema]] e inclúyelos como subetiquetas de la etiqueta del mover ReportToDB en el XML de *rosetta\_scripts*. Consulta [[esta página | Movers-RosettaScripts#ReportToDB]] para más información sobre el mover más allá de lo que se cubre aquí. [[SimpleMetricFeatures]] permite usar CUALQUIER [[Simple Metric |SimpleMetrics]] para escribirla en una base de datos de features.


```xml

        <ROSETTASCRIPTS>
            <SCOREFXNS>
                <ScoreFunction name="s" weights="score12_w_corrections"/>
            </SCOREFXNS>
            <MOVERS>
                <ReportToDB name="features" database_name="scores.db3">
                    <ScoreTypeFeatures/>
                    <StructureScoresFeatures scorefxn="s"/>
                </ReportToDB>
            </MOVERS>
            <PROTOCOLS>
                    <Add mover_name="features"/>
            </PROTOCOLS>
        </ROSETTASCRIPTS>

```

-   Etiqueta \<ReportToDB\>
    -   _name_ : identificador del mover para poder incluirlo en el bloque PROTOCOLS de RosettaScripts

    -   _database_name_ (&string): nombre de la base de datos de salida. También se puede especificar por línea de comandos.

    -   _batch_description_ (&string): (opcional) descripción del lote. También se puede especificar por línea de comandos.

    -   [[Opciones de conexión a la base de datos|RosettaScripts-database-connection-options]] : para las opciones de cómo conectarse a la base de datos

    -   _sample\_source_ (&string) : breve descripción en texto almacenada en la tabla *sample\_source*

    -   _protocol\_id_ (&int) : (opcional) establece el *protocol\_id* en la tabla *protocols* en lugar de incrementarlo automáticamente.

    -   _task\_operations_ (&task): restringe la extracción de features a un subconjunto relevante de residuos. Como las operaciones de tarea se diseñaron como tareas para el remodelado de cadenas laterales, las features de un residuo se informan cuando el residuo es «empaquetable». Si un features reporter involucra más de un residuo, la convención es que solo se informa si cada residuo está especificado; sin embargo, esta funcionalidad no está admitida por todos los Reporters.

    -   _database_separate_db_per_mpi_process_ (&bool) (Default=false) : para usar con la ejecución de Features Reporter con [[MPI-Sqlite3 | FeaturesTutorialRunSciBench#extracting-features-in-parallel_mpi ]].

    -   _cache\_size_ (&int) : la cantidad máxima de memoria que se usa antes de escribir en la base de datos ( [solo sqlite3](http://www.sqlite.org/pragma.html#pragma_cache_size) ).

-   Etiqueta \<feature\> (subetiqueta de \<ReportToDB\>)
    -   _name_ : especifica un FeatureReporter que se incluirá en la base de datos

Ejecutar RosettaScripts
----------------------

Como ReportToDB es simplemente un mover, se puede incluir en cualquier protocolo de Rosetta. Por ejemplo, para extraer las features de un conjunto de archivos pdb listados en *structures.list* , con el script anterior guardado en *parser\_script.xml* , ejecuta el siguiente comando:

       rosetta_scripts.linuxgccrelease -output:nooutput -l structures.list -parser:protocol parser_script.xml

Esto generará un archivo de base de datos SQLite3 *scores.db3* que contiene las features definidas en cada uno de los FeatureReporters especificados para cada estructura de *structures.list* . Consulta la prueba de integración de features (rosetta/main/test/integration/tests/features) para ver un ejemplo que funciona.



Extraer features en paralelo
===============================

Los Features Reporters se pueden ejecutar en paralelo, ya sea mediante MPI o mediante una ejecución por lotes.

MPI
---

Para las ejecuciones basadas en MPI, asegúrate de [[ compilar Rosetta en modo MPI | Build-Documentation#setting-up-rosetta-3_alternative-setup-for-individual-workstations_message-passing-interface-mpi ]].


### Sqlite3

Por defecto, Rosetta se compila con compatibilidad con Sqlite3. Sqlite3 no admite que varios procesos en paralelo escriban en una misma base de datos, así que durante la ejecución MPI se separan para cada procesador y se fusionan al final mediante un script.

Para usar MPI en ejecuciones de Features con salida a una base de datos Sqlite3, basta con añadir <code> -separate_db_per_mpi_process</code> a la línea de comandos o añadir una opción a ReportToDB en tu script xml, por ejemplo:

```xml
<ROSETTASCRIPTS>
	<MOVERS>
		<ReportToDB name=features database_name=example.db3 batch_description=example database_separate_db_per_mpi_process=1>

```
Ejecuta Features (por ejemplo): <code>mpiexec -np 101 rosetta_scripts.mpi.linuxclangrelease -parser:protocol antibody_features.xml -ignore_unrecognized_res</code>


Al terminar, fusiona las bases de datos (véase [[fusión | FeaturesTutorialRunSciBench#extracting-features-in-parallel_merging]] para más información)


### MySQL y PostGres

Funcionan sin ninguna opción adicional de MPI, pero tendrás que compilar y ejecutar Rosetta con las opciones y los controladores adecuados. Consulta la página de [[entrada/salida de bases de datos|Database-IO]] para más información.


Por lotes (Batch)
-----

Las ejecuciones por lotes se pueden hacer dividiendo manualmente una fuente de muestras en lotes, generando una base de datos de features para cada lote y fusionándolas. Consulta la prueba de integración features_parallel (rosetta/main/test/integration/tests/features_parallel) para ver un ejemplo que funciona.

Por ejemplo, si hay 1000 estructuras divididas en 4 lotes, los scripts de la ejecución que procesa el primer lote contendrían:

```xml
       <ReportToDB name=features_reporter db="features.db3_01" sample_source="batch1" protocol_id=1 first_struct_id=1>
          ...
       </ReportToDB>
```

y el script de la ejecución que procesa el segundo lote contendría:

```xml
       <ReportToDB name=features_reporter db="features.db3_02" sample_source="batch2" protocol_id=2 first_struct_id=26>
          ...
       </ReportToDB>
```

Al terminar, fusiona las bases de datos (véase [[fusión | FeaturesTutorialRunSciBench#extracting-features-in-parallel_merging]] para más información)

Fusión (Merging)
-------

Cuando terminen las ejecuciones, localiza el script merge.sh (rosetta/main/test/scientific/cluster/features/sample_sources/merge.sh) y ejecuta

       bash /path/to/merge.sh features.db3 features.db3_*

Esto fusionará las features de cada base de datos *features.db3\_xx* en *features.db3* .

-   **CONSEJO 1** : la fusión de bases de datos de features debe hacerse con lotes de estructuras que conceptualmente provienen de la misma fuente de muestras. Lo mejor es mantener las estructuras de distintas fuentes de muestras en bases de datos separadas y, solo durante el análisis, usar la sentencia [ATTACH](http://www.sqlite.org/lang_attach.html) de sqlite3 para reunirlas.
-   **CONSEJO 2** : añadir el script de fusión a tu variable $PATH resulta muy útil.
-   **ADVERTENCIA** : extraer muchas bases de datos en paralelo genera altas tasas de transferencia de datos. Esto puede sobrecargar un clúster con un sistema de archivos compartido.

Plantillas de fuentes de muestras
=======================

El benchmark científico de features tiene plantillas de fuentes de muestras que se usan para configurar la información necesaria para extraer features de un conjunto de datos de entrada.

Cada *plantilla de sample\_source* es una carpeta de *main/tests/features/sample\_sources/* con los siguientes archivos:

-   **submit.py** : es un script de Python que implementa y ejecuta una clase derivada de *BaseSampleSource* .

Especifica qué fuentes de muestras usar editando rosetta/main/test/scientific/cluster/features/sample\_sources/benchmark.list. Consulta la página de [[fuentes de muestras|FeaturesSampleSources]] para ver los detalles de cada fuente de muestras.\</li\>

Ejecuta el benchmark científico de features usando el script features.py

        Rosetta/main/tests/features/features.py [OPTIONS] [RUN]

### Opciones de features.py

Estas son las opciones de línea de comandos que se usan para ejecutar *features.py*

-   **[ACCIÓN]**
    -   *submit* : genera bases de datos de features para todas las fuentes de muestras de benchmarks.list
    -   *analyze* : finaliza las bases de datos generadas durante la fase submit.

-   **[OPCIONES]**
    -   **--run-type** :
        -   *condor* : se ejecuta en un servidor condor
        -   *lsf* : se ejecuta en un servidor Load Sharing Facility (p. ej., envías los trabajos con bsub)
        -   *local* : se ejecuta localmente como un trabajo de un solo proceso
        -   *dryrun* : prepara archivos y directorios como si acabara de terminar la acción

    -   **--output-dir** : el directorio base en el que se generarán las bases de datos de features (cada fuente de muestras estará en su propio directorio).
    -   **--lsf-queue\_name** : la cola a la que se envían los trabajos (se usa con el run-type *lsf*)
    -   **--num-cores** : cuántos núcleos quieres asignar a la ejecución de esta prueba
    -   **--mini\_home** : la ruta a rosetta\_source, con ../../rosetta\_source como valor predeterminado
    -   **--compiler** : el compilador usado para compilar Rosetta (p. ej., gcc, icc, clang), con gcc como valor predeterminado
    -   **--mode** : el modo usado para compilar Rosetta (p. ej., release, debug), con release como valor predeterminado
    -   **--database** : ruta a /path/to/rosetta/main/database (por defecto usará el valor de \$ROSETTA3\_DB)


Requisitos generales
============

Requisitos computacionales
--------------------------

El benchmark científico de features se puede ejecutar localmente o en un clúster basado en MPI. Los requisitos de tiempo y espacio de cómputo difieren según las distintas etapas del análisis.

-   **Extracción de features** : el costo computacional y los requisitos de espacio para extraer features dependen de qué *FeaturesReporters* se usen. Las features predeterminadas de la fuente de muestras *top8000* usan \~1Mb por estructura.
-   **Análisis de features** : cada script de análisis de features hace una consulta a la base de datos y luego realiza el análisis. Según la eficiencia con la que se pueda acceder a la base de datos y la complejidad del análisis de features y de la generación de gráficos, cada análisis suele tardar entre uno o dos minutos y decenas de minutos.
-   **Generación de lotes** : los protocolos de predicción para generar lotes de estructuras suelen ser muy intensivos computacionalmente, desde cientos hasta miles de horas de CPU. Das y Baker tienen una buena [revisión](https://doi.org/10.1146/annurev.biochem.77.062906.171838) de los protocolos de predicción de Rosetta. Consulta la documentación de cada protocolo concreto para más información.


Requisitos de los lotes
------------------

Cada lote de estructuras debe ser lo más grande y representativo posible. Si generas predicciones de estructuras para compararlas con datos experimentales, estas son algunas pautas:

-   Procura generar una diversidad estructural similar a la de tu conjunto de datos experimental; así las comparaciones serán más interpretables.
-   Si tu protocolo de predicción está muy restringido (p. ej., dentro de cierto RMSD de una conformación objetivo), ten en cuenta que aumentar el número de estructuras tendrá rendimientos decrecientes. Considera reservar algunas secuencias, objetivos, etc. para formar un conjunto de prueba independiente o hacer una validación cruzada K-fold.
-   Si eres nuevo en el diseño experimental, considera consultar con un estadístico o estudiarlo por tu cuenta. Por ejemplo, consulta el [manual del NIST sobre estadística para ingeniería](http://www.itl.nist.gov/div898/handbook/index.htm) .


Requisitos opcionales del entorno de clúster
--------------------------------

El benchmark científico de features admite entornos de cómputo de **un solo hilo**, **MPI** y **Condor**. El proceso de extracción de features solo usa la aplicación *rosetta\_scripts* y el distribuidor de trabajos *jd2*. Así que, si consigues que funcionen en tu plataforma, debería ser posible hacer funcionar también el benchmark científico de features. Se ofrece información de configuración específica para los siguientes planificadores de trabajos.

-   **Compatibilidad con MPI** : para habilitar la compatibilidad con MPI, proporciona las cabeceras y bibliotecas necesarias y compila Rosetta con scons usando la opción *extras=mpi*. Véase [[Ejecutar Features en paralelo | FeaturesTutorialRunSciBench#extracting-features-in-parallel ]]
-   **Clústeres Load Sharing Facility** : el [Load Sharing Facility](http://en.wikipedia.org/wiki/Platform_LSF) (LSF) es un planificador de trabajos para aplicaciones paralelas MPI. Por ejemplo, el clúster [killdevil](http://help.unc.edu/6214) de UNC usa LSF. Al configurar los trabajos de extracción de features, usa *--run-type lsf* con el script *features.py*.
-   **Clústeres Condor** : [Condor](http://research.cs.wisc.edu/condor/) es un planificador de trabajos que se usa a menudo con recursos de clúster heterogéneos. Al configurar los trabajos de extracción de features, usa *--run-type condor* con *features.py* .



##Véase también

* [[Ejecutar los scripts de R de Features | FeaturesTutorialRunFeaturesAnalysis]]
* [[FeatureReporters]]
* [[FeaturesTutorials]]
* [[TrajectoryReportToDBMover]]
* [[RosettaScripts database connection options]]
* [[Database IO]]: información sobre la entrada/salida a bases de datos en Rosetta
* [[Rosetta Database Output Tutorial]]
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con bases de datos
* [[Database options]]: opciones de línea de comandos relacionadas con bases de datos
* [[I want to do x]]: guía para elegir un mover
