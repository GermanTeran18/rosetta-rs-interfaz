# ReportToDB
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## ReportToDB

Informa de datos estructurales a una [[base de datos relacional|Database-IO]] usando un esquema modular. Cada [[FeaturesReporter|FeatureReporters]] es responsable de un conjunto de tablas que representa conceptualmente un tipo de propiedad geométrica, química o meta de una estructura. Todas las características informadas a través de una única instancia del Mover ReportToDB se agruparán en un **lote** de estructuras.

```xml
<ReportToDB name="&string" {database_connection_options}  cache_size="(&integer)" batch_description="&string" protocol_id="(&integer)" task_operations="(&task_operations)" relevant_residues_mode="[explicit,implicit]">
   <&string {feature_specific_options}/>
   <&string {feature_specific_options}/>
   .
   .
   .
</ReportToDB>
```

**Etiqueta ReportToDB**:

-   **name** *(&string)*: el nombre asignado a este mover para referenciarlo en la sección MOVERS del RosettaScript.
-   **[[database_connection_options|RosettaScripts-database-connection-options]]**: opciones para conectarse a la base de datos relacional
-   **sample\_source** *(&string)*: una descripción del *lote* de estructuras. Termina en la columna `      description     ` de la tabla [[batches|MetaFeaturesReporters#BatchFeatures]].
-   **[[task_operations|TaskOperations-RosettaScripts]]**: restringe la extracción de características a un subconjunto de residuos de una estructura. Un residuo es *relevante* si es *empaquetable*. Para características de varios residuos, todos los residuos deben ser *empaquetables* para que se informe de ellas.
-   **relevant\_residues\_mode** [ *explicit* `      default     `, *implicit* ]: determina qué características deben informarse dado el conjunto de residuos relevantes. Con *explicit*, todos los residuos de una característica deben ser *relevantes* para que se informe de ella. Con *implicit*, al menos un residuo de una característica debe ser *relevante* para que se informe de ella.

**Subetiquetas de características**: cada subetiqueta de características aplica un [[features reporter|FeatureReporters]] a la estructura.

-   **name** *(&string)*: este es el nombre de la característica, p. ej., *RotamerRecoveryFeatures*.
-   **feature\_specific\_options**: consulta cada FeaturesReporter para más detalles.
-   Los siguientes FeaturesReporters se incluyen automáticamente:
    -   **[[ProtocolFeatures|MetaFeaturesReporters#ProtocolFeatures]]**: sobre la ejecución de la aplicación Rosetta.
    -   **[[BatchFeatures|MetaFeaturesReporters#BatchFeatures]]**: sobre el conjunto de características extraídas por esta instancia de ReportToDB.
    -   **[[StructureFeatures|MultiBodyFeaturesReporters#StructureFeatures]]**: sobre cada estructura informada por esta instancia de ReportToDB. Ten en cuenta que, actualmente, cada estructura tiene un id único universal, **struct\_id**, que se usa como clave primaria compuesta en casi todas las tablas de características.
-   Se crean las siguientes tablas para ayudar a organizar la base de datos de características:
    -   **features\_reporters**: los FeaturesReporters usados en cualquier lote de la base de datos

<!-- -->

        CREATE TABLE IF NOT EXISTS features_reporters (
            report_name TEXT,
            PRIMARY KEY (reporter_name));

-   **batch\_reports**: los features reporters usados por esta instancia de ReportToDB.

<!-- -->

        CREATE TABLE IF NOT EXISTS batch_reports (
            report_name TEXT,
            batch_id INTEGER,
            FOREIGN KEY (report_name) REFERENCES features_reporters (report_name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (report_name, batch_id));

Información adicional:

-   Información general sobre el uso de una base de datos de características para hacer [[análisis de características|FeaturesScientificBenchmark]].
-   Cómo [[crear|FeaturesExtracting]] un nuevo FeaturesReporter.
-   Uso del análisis de características para hacer [benchmarking científico](http://contador.med.unc.edu/features/paper/features_optE_methenz_120710.pdf) de la ScoreFunction de Rosetta.


##Véase también

* [[TrajectoryReportToDBMover]]
* [[RosettaScripts database connection options]]
* [[Database IO]]: información sobre la entrada/salida de bases de datos en Rosetta
* [[Rosetta Database Output Tutorial]]
* [[SQLite3 Interface]]: información específica sobre el uso de SQLite3 con Rosetta
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con bases de datos
* [[Database options]]: opciones de línea de comandos relacionadas con bases de datos
* [[I want to do x]]: guía para elegir un mover
