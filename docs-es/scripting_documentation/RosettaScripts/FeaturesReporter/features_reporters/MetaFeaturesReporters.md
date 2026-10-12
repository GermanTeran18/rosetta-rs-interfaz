<!-- --- title: Metafeaturesreporters -->Meta Features
=============

Un meta features reporter informa sobre el lote de estructuras y el protocolo que se usó para generarlo.

ProtocolFeatures
----------------

Un protocolo se representa como toda la información necesaria para reproducir los resultados de la ejecución de la aplicación de Rosetta. Las features asociadas a cada ejecución de la aplicación se vinculan, en última instancia, con una sola fila de la tabla protocols mediante el reporter *BatchFeatures*.

-   **protocols** :
    -   *command\_line* : la línea de comandos completa usada para ejecutar Rosetta
    -   *specified\_options* : las opciones no predeterminadas especificadas en el sistema de opciones.
    -   *svn\_url* : la URL del repositorio SVN usado para el código fuente de Rosetta.
    -   *svn\_version* : el número de revisión SVN del repositorio svn.
    -   *script* : el contenido del script XML de rosetta\_scripts, si se ejecutó mediante el sistema rosetta\_scripts.

<!-- -->

        CREATE TABLE IF NOT EXISTS protocols (
            protocol_id INTEGER PRIMARY KEY AUTOINCREMENT,
            command_line TEXT,
            specified_options TEXT,
            svn_url TEXT,
            svn_version TEXT,
            script TEXT);

BatchFeatures
-------------

        CREATE TABLE IF NOT EXISTS batches (
            batch_id INTEGER PRIMARY KEY AUTOINCREMENT,
            protocol_id INTEGER,
            name TEXT,
            description TEXT,
            FOREIGN KEY (protocol_id) REFERENCES protocols(protocol_id) DEFERRABLE INITIALLY DEFERRED));

JobDataFeatures
---------------

Almacena datos de tipo *string*, *string* - *string* y *string* - *real* asociados a un trabajo. Por ejemplo, el código de docking de ligandos lo hace así cuando usa el DatabaseJobOutputter.

-   **job\_string\_data**
    -   *data\_key* : asocia claves etiquetadas con una estructura

<!-- -->

        CREATE TABLE IF NOT EXISTS string_data (
             struct_id INTEGER,
             data_key TEXT,
             FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
             PRIMARY KEY (struct_id, data_key));

-   **job\_string\_string\_data** :
    -   *data\_key* , *data\_value* : asocia cadenas de texto etiquetadas con una estructura

<!-- -->

        CREATE TABLE IF NOT EXISTS string_string_data (
             struct_id INTEGER,
             data_key TEXT,
             data_value TEXT,
             FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
             PRIMARY KEY (struct_id, data_key));

-   **job\_string\_real\_data** :
    -   *data\_key* , *data\_value* : asocia números reales etiquetados con una estructura

<!-- -->

        CREATE TABLE IF NOT EXISTS string_real_data (
             struct_id INTEGER,
             data_key TEXT,
             data_value REAL,
             FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
             PRIMARY KEY (struct_id, data_key));

PoseCommentsFeatures
--------------------

Se puede asociar información textual arbitraria a un Pose en forma de comentarios *(key, val)*. El reporter PoseCommentsFeatures almacena esta información como una feature.

-   **pose\_comments** : se extraen todos los comentarios del Pose usando.

<!-- -->

        CREATE TABLE IF NOT EXISTS pose_comments (
            struct_id INTEGER,
            key TEXT,
            value TEXT,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, key));

RuntimeFeatures
---------------
Informa de cuánto tiempo tardó en procesarse cada estructura. La base de datos se rellena con dos campos: una cadena 'timestamp' que indica la fecha y la hora en que empezó el protocolo, y un entero 'elapsed_time' que indica el número de segundos transcurridos mientras se ejecutaba el protocolo.

Ejemplo:

```xml
<RuntimeFeatures/>
```

Opciones: ninguna

Esquema:

```sql
CREATE TABLE `runtimes` (
  `struct_id` bigint(20) NOT NULL DEFAULT '0',
  `timestamp` varchar(20) DEFAULT NULL,
  `elapsed_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`struct_id`),
  FOREIGN KEY (`struct_id`) REFERENCES `structures` (`struct_id`)
)
```