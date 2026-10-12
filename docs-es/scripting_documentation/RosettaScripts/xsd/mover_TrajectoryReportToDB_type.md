<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Informa a la base de datos cada stride pasos de una trayectoria

Referencias e información de autoría del mover TrajectoryReportToDB:

Cita(s) de TrajectoryReportToDB (Mover):
Leaver-Fay A, O'Meara MJ, Tyka M, Jicak R, Song Y, Kellogg EH, Thompson J, Davis IW, Pache RA, Lyskov S, Gray JJ, Kortemme T, Richardson JS, Havranek JJ, Snoeyink J, Baker D, and Kuhlman B.  (2013).  Scientific benchmarks for guiding macromolecular energy function improvement.  Methods Enzymol 523:109-43.  doi: 10.1016/B978-0-12-394292-0.00006-0.

```xml
<TrajectoryReportToDB name="(&string;)" db_session_name="(&string;)"
        transaction_mode="(standard &database_transaction_mode_string;)"
        database_mode="(&database_mode_string;)" database_name="(&string;)"
        database_pq_schema="(&string;)"
        database_separate_db_per_mpi_process="(&bool;)"
        database_partition="(&integer;)" database_read_only="(&bool;)"
        database_host="(&string;)" database_user="(&string;)"
        database_password="(&string;)" database_port="(&non_negative_integer;)"
        batch_description="(&string;)" protocol_id="(&non_negative_integer;)"
        batch_id="(&non_negative_integer;)" use_transactions="(&bool;)"
        cache_size="(2000 &non_negative_integer;)"
        remove_xray_virt="(false &bool;)"
        relevant_residues_mode="(explicit &report_to_db_relevant_residues_mode;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)"
        stride="(&non_negative_integer;)" >
    <Features Reporter Tag ... />
</TrajectoryReportToDB>
```

-   **db_session_name**: El nombre del objeto DatabaseSession (declarado previamente) que se recupera del DataMap; si se da esta opción, tiene prioridad sobre los demás atributos que definen la sesión de base de datos y que este elemento también admite. Los objetos DatabaseSession se declaran en el bloque de nivel superior DATABASE_SESSIONS de RosettaScripts.
-   **transaction_mode**: Modo de transacción para la salida a la base de datos
-   **database_mode**: ¿Qué tipo de base de datos de salida usar?
-   **database_name**: Nombre de la base de datos de salida
-   **database_pq_schema**: Nombre del esquema dentro de la base de datos
-   **database_separate_db_per_mpi_process**: ¿Usar una base de datos distinta para cada proceso MPI? (solo sqlite3). Incompatible con database_partition.
-   **database_partition**: Partición de la base de datos a usar. (solo sqlite3). Incompatible con database_separate_db_per_mpi_process.
-   **database_read_only**: ¿La base de datos es de solo lectura? (solo sqlite3)
-   **database_host**: URI del servidor de la base de datos (solo postgres y mysql)
-   **database_user**: Nombre de usuario para acceder a la base de datos (solo postgres y mysql)
-   **database_password**: Contraseña para acceder a la base de datos (solo postgres y mysql)
-   **database_port**: Puerto que se usa para acceder al servidor de la base de datos (solo postgres)
-   **batch_description**: Descripción de la base de datos de características
-   **protocol_id**: Controla manualmente el protocol_id asociado a esta etiqueta ReportToDB. Se incrementa automáticamente por defecto.
-   **batch_id**: Controla manualmente el batch_id asociado a esta etiqueta ReportToDB. Se incrementa automáticamente por defecto.
-   **use_transactions**: Usa transacciones para agrupar la entrada y salida de la base de datos y ganar eficiencia. Desactivarlas puede ayudar a depurar.
-   **cache_size**: Especifica el número máximo de páginas de 1k que se conservan en memoria antes de escribir en disco.
-   **remove_xray_virt**: Elimina el residuo virtual añadido durante el proceso de refinamiento de rayos X
-   **relevant_residues_mode**: Determina qué características se informan según los residuos relevantes
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **stride**: Número de iteraciones entre informes a la base de datos


"Features Reporter Tag": Cualquiera de los [[FeatureReporters]]

---
