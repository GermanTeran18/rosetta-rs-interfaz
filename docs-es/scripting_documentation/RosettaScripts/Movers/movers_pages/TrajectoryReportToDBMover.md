# TrajectoryReportToDB
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## TrajectoryReportToDB

El mover TrajectoryReportToDB es una subclase de [[ReportToDB|Movers-RosettaScripts#ReportToDB]] que puede usarse en Rosetta scripts para informar de características varias veces a una base de datos para una única salida, creando una «trayectoria». Como este mover es una subclase del anterior, cualquier etiqueta u opción descrita para ReportToDB también puede usarse aquí. Consulta [[ReportToDB|Movers-RosettaScripts#ReportToDB]] para ver esas opciones.

Las estructuras se asignan al paso del ciclo en la tabla trajectory\_structures\_steps. Para seleccionar toda la salida de trayectoria de una ejecución concreta, agrupa los struct\_ids por etiqueta de salida (que se encuentra en la tabla structures).

**Etiqueta ReportToDB**:

-   Cualquier etiqueta usada en [[ReportToDB|Movers-RosettaScripts#ReportToDB]] también puede usarse en TrajectoryReportToDB
-   **stride** *(&int)*: esta etiqueta adicional es exclusiva de TrajectoryReportToDB. Controla el «paso» (stride), es decir, la frecuencia con que se informa de las características de la trayectoria en una simulación. Ejemplo: si stride se pone en 10, se informará de las características cada 10.ª iteración del protocolo.

**Subetiquetas de características**: igual que en [[ReportToDB|Movers-RosettaScripts#ReportToDB]]

-   Se crean las siguientes tablas:
    -   **trajectory\_structures\_steps**: asigna struct\_id al número de paso de la trayectoria.

<!-- -->

        CREATE TABLE trajectory_structures_steps(
             struct_id INTEGER NOT NULL,
             step INTEGER NOT NULL,
             FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
             PRIMARY KEY (struct_id, step));


##Véase también

* [[ReportToDBMover]]
* [[RosettaScripts database connection options]]
* [[Database IO]]: información sobre la entrada/salida de bases de datos en Rosetta
* [[Rosetta Database Output Tutorial]]
* [[SQLite3 Interface]]: información específica sobre el uso de SQLite3 con Rosetta
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con bases de datos
* [[Database options]]: opciones de línea de comandos relacionadas con bases de datos
* [[I want to do x]]: guía para elegir un mover
