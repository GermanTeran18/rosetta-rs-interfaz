<!-- --- title: Database IO -->Soporte de bases de datos en Rosetta
===========================

Controladores de bases de datos
----------------

Rosetta admite la interacción con los motores de bases de datos SQLite3, MySQL y PostgreSQL. Esta página describe los motores, cómo empezar a usarlos y lo que ya se ha hecho. El motor SQLite3 se prueba de forma exhaustiva en las *integration\_tests* con cada commit, y el soporte de PostgreSQL y MySQL se prueba mediante el [servidor de pruebas de Rosetta](https://benchmark.graylab.jhu.edu/).

-   **SQLite3**
    -   [SQLite3](http://www.sqlite.org/) es un motor de bases de datos ligero que guarda cada base de datos como un archivo en el sistema de archivos, y está optimizado para conexiones únicas a una base de datos almacenada en una unidad local.
    -   Viene integrado en Rosetta y se compila por defecto, así que no necesita ninguna configuración especial.

-   **MySQL**
    -   [MySQL](http://www.mysql.com/) tiene una arquitectura cliente-servidor.
    -   Para compilar Rosetta con soporte de MySQL:
        -   Descarga la biblioteca MySQL Connector/C ( [libmysqlclient](http://dev.mysql.com/downloads/connector/c/) ). Como scons no importa variables de entorno, tendrás que añadir a tu ruta el directorio `        mysql/lib       ` que contiene `        libmysqlclient_r.so       ` creando un archivo `        site.settings       `.
        -   También tendrás que instalar `        libmysqlclient       ` en la variable de entorno `        LD_LIBRARY_PATH       ` (y en tiempo de ejecución).
            -   Para crear un archivo `          site.settings         `:
            -   Copia `          source/tools/build/site.settings.template         ` en `          source/tools/build/site.settings         `
            -   En el diccionario `          library_path         `, añade una cadena con la ruta al directorio que contiene las bibliotecas cliente de mysql (por ejemplo, `          "/home/jdoe/lib/mysql-connector-c-6.1.2-linux-glibc2.5-x86_64/lib"         ` )

        -   Crea un enlace simbólico a mysql.h (y a los demás encabezados necesarios) o colócalo en `        external/dbio/mysql       `
        -   Compila con `        extras=mysql       `

    -   Instrucciones específicas de Ubuntu (y quizá de otras distribuciones de Linux) para compilar Rosetta con soporte de MySQL:
        -   Instala `        libmysqlclient       ` instalando el cliente `        libmysqlclient-dev       ` desde el gestor de paquetes de tu distribución (por ejemplo, `        apt-get install libmysqlclient-dev       ` )
            -   Nota: esto debería asegurar que las bibliotecas estén incluidas en tu ruta, de modo que no hará falta modificar la ruta de bibliotecas

        -   Crea enlaces simbólicos de los archivos de encabezado en `        external/dbio/mysql       ` ejecutando `        ln -s /usr/include/mysql/* .       `
        -   Compila con `        extras=mysql       ` como arriba

-   **PostgreSQL**
    -   [PostgreSQL](http://www.postgresql.org/) tiene una arquitectura cliente-servidor
    -   Para compilar Rosetta con soporte de PostgreSQL:
        -   Compila `        libpq       ` e instálala en la variable de entorno `        LD_LIBRARY_PATH       ` (nota: asegúrate de usar la misma versión de la biblioteca cliente que el servidor de bases de datos).
        -   Crea un enlace simbólico del directorio `        postgreSQL       ` en `        Rosetta/main/source/external/dbio/       `.
        -   Compila con `        extras=postgres       `

La información de conexión a la base de datos se puede especificar con estas [[opciones|RosettaScripts-database-connection-options]] de RosettaScripts o de línea de comandos.

Marco de trabajo de FeaturesReporter
--------------------------

En muchas aplicaciones se quiere guardar y recuperar información sobre un conjunto de estructuras; por ejemplo, puede ser relevante guardar las coordenadas atómicas, lo parecida que es cada estructura a la nativa y la energía de unión predicha (quizá el proyecto sea de diseño de interfaces de proteínas, y el conjunto conste de todas las estructuras de las distintas rondas de predicción). Hemos desarrollado un **esquema de base de datos modular**, en el que cada `   FeaturesReporter  ` es responsable de un conjunto de tablas de la base de datos. Con un esquema determinado, las características de un conjunto de estructuras se guardan como un *lote* (batch) en la base de datos.

-   Aquí están todos los [[features reporters|FeatureReporters]] que se han [[creado|FeaturesScientificBenchmark]] hasta ahora.
-   Consulta [aquí](http://contador.med.unc.edu/features/paper/features_optE_methenz_120710.pdf) un ejemplo del uso de la base de datos de características para benchmarks científicos.
-   La forma principal de registrar características en una base de datos de características es el mover [[ReportToDB|Movers-RosettaScripts#ReportToDB]] de RosettaScripts.

Distribución de trabajos y E/S de bases de datos
--------------------------------

Las estructuras se pueden leer de una base de datos relacional y escribir en ella al usar el distribuidor de trabajos JD2. Las ventajas frente a los archivos PDB o los silent files incluyen:

-   Especificar la entrada mediante consultas SQL y filtrar los datos según lo que haya almacenado en ese momento en la base de datos
-   Conectar con otros conjuntos de datos bioinformáticos una vez que las estructuras están en una base de datos relacional
-   Guardar información adicional junto con las estructuras mediante FeaturesReporters (por ejemplo, usando el mover ReportToDB para la salida)
-   Garantizar la coherencia mediante restricciones de la base de datos, como las claves foráneas y las transacciones atómicas
-   Más comprimida que los archivos PDB y casi tan comprimida como los silent files binarios.

La E/S de bases de datos se implementa simplemente como un conjunto fijo de FeaturesReporters:

-   Metacaracterísticas:
    -   **ProtocolFeatures**: sobre la invocación de la aplicación de Rosetta
    -   **BatchFeatures**: sobre el conjunto de estructuras
    -   **JobDataFeatures**: información genérica de registro del protocolo

-   Características de la estructura completa:
    -   **StructureFeatures**: sobre cada estructura
    -   **PdbDataFeatures**: (si existe el PDBInfo) sobre la numeración del PDB, la temperatura y la ocupación
    -   **ScoreTypeFeatures**: los tipos de puntuación definidos
    -   **StructureScoresFeatures**: la función de puntuación de Rosetta desglosada por tipo de puntuación
    -   **PoseConformationFeatures**: la topología de la conformación, incluidos el foldtree, los saltos (jumps), etc.
    -   **PoseCommentsFeatures**: comentarios adicionales añadidos al Pose.

-   Características por residuo
    -   **ResidueFeatures**: sobre cada residuo
    -   **[Protein]ResidueConformationFeatures**: coordenadas de los residuos; si la estructura es ideal y solo tiene residuos canónicos, solo se guardan los ángulos de torsión; si no, se guardan las coordenadas de cada átomo.

Posibles problemas en trabajos basados en clúster:

-   Las bases de datos SQLite3 resultan pesadas para los sistemas de archivos, ¡así que ten cuidado al usarlas con un sistema de archivos compartido!
-   Las bases de datos se pueden fusionar porque las características tienen claves primarias compuestas que incluyen la clave primaria de la estructura, **struct\_id**, que está al menos parcialmente aleatorizada. Para fusionar bases de datos sqlite3 considera usar el script de fusión en main/tests/features/sample\_sources/merge.sh.

-   -in:use\_database
-   -out:use\_database \<bool\> *escribe los archivos de salida en la base de datos*
-   -out:database\_protocol\_id \<int\> *Especifica manualmente un ID de protocolo. Esta opción debe especificarse si varios procesos escriben en una misma base de datos (por ejemplo, al usar MPI). Las bases de datos creadas con esta opción especificada no se pueden escribir sin ella, y viceversa*
-   -out:database\_filter \<string vector\> *especifica un filtro de base de datos y sus opciones asociadas; consulta la sección «Filtros de base de datos» más abajo para ver los detalles*

E/S de Poses
-------

Rosetta puede leer Poses de una base de datos y escribirlos en ella. Esta funcionalidad está disponible en cualquier aplicación que use el distribuidor de trabajos JD2. El DatabaseJobOutputter es compatible con trabajos en serie y en paralelo, y detecta automáticamente los Poses no ideales y gestiona correctamente la salida.

Se pueden guardar varias ejecuciones de Rosetta en la misma base de datos. Cada ejecución tendrá un protocol\_id distinto. Si no se especifica -out:database\_protocol\_id, el campo protocol\_id se incrementa automáticamente. En la base de datos se guardan la versión de Rosetta en SVN, la línea de comandos, el script XML (si está disponible) y las opciones.

### Extracción de Poses

Los Poses se pueden extraer de la base de datos a archivos PDB o silent files con la aplicación score\_jd2. También hay interfaces de MySQL y sqlite3 para perl, python, R y otros lenguajes de scripting, lo que permite analizar los datos directamente sin extraerlos. En el código, los Poses se pueden extraer de una base de datos con la función protocols::features::ProteinSilentReport::load\_pose().

### Filtros de base de datos

Los filtros de base de datos permiten escribir solo los Poses que cumplan algún criterio basado en los Poses ya existentes en la base de datos. Los filtros de base de datos se invocan desde la línea de comandos con la siguiente sintaxis:

`   -out:database_filter <database filter name> <list of database filter options>  `

Actualmente hay 4 filtros de base de datos implementados:

-   TopPercentOfEachInput \<scoring\_term\> \<percentile\> *Escribe solo el n por ciento superior de las estructuras generadas para cada estructura de entrada, según el término de puntuación especificado. Un valor de percentil de 0.10 corresponde al 10%*
-   TopPercentOfAllInputs \<scoring\_term\> \<percentile\> *Escribe solo el n por ciento superior de las estructuras generadas sobre todas las estructuras de entrada, según el término de puntuación especificado. Un valor de percentil de 0.10 corresponde al 10%*
-   TopCountOfEachInput \<scoring\_term\> \<count\> *Escribe solo las n mejores estructuras generadas para cada estructura de entrada, según el término de puntuación especificado.*
-   TopCountOfAllInputs \<scoring\_term\> \<count\> *Escribe solo las n mejores estructuras generadas para todas las estructuras de entrada, según el término de puntuación especificado.*

##Véase también

* [[Rosetta Database Output Tutorial]]
* [[SQLite3 Interface]]: información específica sobre el uso de SQLite3 con Rosetta
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con las bases de datos
* [[RosettaScripts database connection options]]
* [[Features reporter overview]]: página principal del Features Reporter, una herramienta para escribir información en bases de datos con Rosetta
* [[Database options]]: opciones de línea de comandos relacionadas con bases de datos
* [[La base de datos de Rosetta|database]]: información sobre la base de datos principal incluida con Rosetta y especificada con la opción -in:path:database (tema aparte)
