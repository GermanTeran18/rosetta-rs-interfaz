<!-- --- title: Relational Database Options -->

Opciones para usar bases de datos relacionales dentro de Rosetta.

**NOTA:** No las confundas con la opción para especificar la [[base de datos de Rosetta|database]], que se encuentra en las [[opciones de entrada|input options]].

Los motores admitidos actualmente son: sqlite3, mysql y postgres

General
=================

```
-inout:dbms:mode                            Specify database backend. default: 'sqlite3'
                                             legal=["sqlite3", "mysql", "postgres"],
-inout:dbms:database_name                   If sqlite3, the filename for the database
-inout:dbms:pq_schema                       For PostgreSQL, the schema namespace in the database to use
-inout:dbms:host                            NOTE to use mysql or postgres as a backend:
-inout:dbms:user                               compile with 'extras=mysql' or 'extras=postgres' and use
-inout:dbms:password                           the '-inout:dbms:mode mysql' or
-inout:dbms:port                               the '-inout:dbms:mode postgres' flag
                                                  Consider using ~/.pgpass or ~/.my.cnf to store connection info
```

Entrada
============================
```
-in:use_database                          Indicate that structures should be read from the given database
-in:select_structures_from_database       An sql query to select which structures should be extracted. 
                                           ex:  "SELECT tag FROM structures WHERE tag = '7rsa';"
```

Salida
====================

```
-out:use_database          Write out structures to database.
                            Specify database via -inout:dbms:database_name and wanted structures with
                            -in:file:tags [Boolean]
-out:database_filter       Filter to use with database output.  Arguments for filter follow filter name [StringVector]
-out:resume_batch          Specify 1 or more batch ids to finish an incomplete protocol.
                            Only works with the DatabaseJobOutputter.
                            The new jobs will be generated under a new protocol and batch ID
```

##Véase también

* [[Full options list]]
* [[Options overview]]: descripción de las opciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Database IO]]: información sobre la entrada/salida a diferentes formatos de bases de datos con Rosetta
* [[Rosetta Database Output Tutorial]]
* [[SQLite3 Interface]]: información específica sobre el uso de SQLite3 con Rosetta
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con las bases de datos
* [[RosettaScripts database connection options]]
* [[La base de datos de Rosetta|database]]: información sobre la base de datos principal incluida con Rosetta y especificada con la opción -in:path:database (tema aparte)
