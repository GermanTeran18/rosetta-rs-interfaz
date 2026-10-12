#Interfaz de Sqlite3

Metadatos
========

Última edición: 18/10/10. Código y documentación de Matthew O'Meara (mattjomeara@gmail.com) .

Descripción general
========

La biblioteca [SQLite3](http://www.sqlite.org) es un motor de bases de datos SQL sencillo. La clase Sqlite3Interface permite crear bases de datos SQLite desde dentro de Rosetta.

¿Por qué usar una base de datos? ¿Por qué usar SQLite?
===================================

¿Tus tablas csv tienen demasiadas columnas? ¿Ya no caben en memoria? ¿Tus protocolos se están convirtiendo en varias fases y te cuesta llevar la cuenta de qué parámetros corresponden a qué predicciones de estructuras? ¿Tus ejecuciones son tan largas que a veces se interrumpen y tus datos pueden estar corrompiéndose? ¿Has improvisado código para leer varias tablas de parámetros? ¿Te gustaría poder hacer consultas «SELECT ... FROM ... WHERE ...» sobre todas tus tablas de datos?

Puede que sea hora de pensar en usar una base de datos.

Las tareas de gestión de datos de distintas escalas requieren distintos niveles de sofisticación. A veces usar una hoja de cálculo es lo más adecuado. A veces lo más adecuado es tener varias tablas separadas por comas en distintos directorios. Y a veces lo más adecuado es usar una base de datos SQL completa.

No te asustes: SQLite3 es bastante fácil de usar, tratándose de bases de datos, y la Sqlite3Interface lo deja casi tan fácil como escribir en un Tracer.

Las bases de datos como PostgreSQL o MySQL funcionan con una arquitectura cliente-servidor. En cambio, SQLite es una biblioteca enlazada directamente en el programa. Como cada base de datos SQLite se guarda en memoria o en un único archivo, son bastante portables y fáciles de configurar.

Configuración de SQLite
================

Aunque SQLite es de dominio público, (actualmente) no se distribuye con Rosetta. Para evitar que sea una dependencia global, los desarrolladores que usen la Sqlite3Interface deben especificar en tiempo de compilación que piensan usar SQLite, añadiendo 'sqlite' a la lista de opciones 'extras' que se pasan a scons.

```
./scons.py extras=sqlite  <other commands>
```

Esto indicará a gcc que defina DB\_SQLITE3 como variable de preprocesamiento, que se usa en bloques \#ifdef del código. Este es un ejemplo sencillo, desarrollado con más detalle en la prueba unitaria test/utility/sql\_database/Sqlite3Interface.cxxtest.hh.

```
#ifdef DB_SQLITE
// This requires the external dependency of the sqlite3 library
// To use compile with $scons.py extras=sqlite

#include <utility/sql_database/sqlite3_interface.hh>
using utility::sql_database;


Sqlite3Interface sqlite3_interface("/tmp/test_db.db3");

// A transaction groups together multiple statements to be more
// efficient.
sqlite3_interface.begin_transaction();

sqlite3_interface.execute_sql( "\
TABLE table1 (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    value REAL,\
    math_const TEXT,\
    awesome BOOL );");


sqlite3_interface
    << Sqlite3Interface::begin_row("table1")
    << Sqlite3Interface::sqlite3_null
    << 3.14
    << "pi"
    << true
    << Sqlite3Interface::end_row;

sqlite3_interface.end_transaction();


#endif // DB_SQLITE
```

##Véase también

* [[Database IO]]: información sobre la entrada/salida a diferentes formatos de bases de datos con Rosetta
* [[Rosetta Database Output Tutorial]]
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con las bases de datos
* [[Database options]]: opciones de línea de comandos para trabajar con bases de datos
* [[RosettaScripts database connection options]]
* [[La base de datos de Rosetta|database]]: información sobre la base de datos principal incluida con Rosetta y especificada con la opción -in:path:database (tema aparte)
