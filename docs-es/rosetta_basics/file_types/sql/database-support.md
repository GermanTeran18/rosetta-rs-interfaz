#Soporte de bases de datos SQL

Metadatos
========

Última edición: 14/01/11. Matthew O'Meara (mattjomeara@gmail.com).

[[_TOC_]]

Descripción general de las bases de datos relacionales
================================

Las bases de datos relacionales son estructuras de datos estándar para la gestión persistente de grandes cantidades de datos. En comparación con los formatos de archivo plano, las bases de datos relacionales ofrecen las siguientes ventajas:

-   Los datos se guardan en tablas separadas pero interconectadas, que se pueden unir bajo demanda con consultas escritas en el lenguaje de consulta estructurado (SQL).

-   La modificación de datos es transaccional; es decir, se pueden agrupar varias operaciones con la garantía de que se completarán con éxito o se revertirán. Ante un fallo de recursos, esto puede ofrecer mayores garantías de integridad de los datos.

-   La mayoría de las implementaciones estándar usan estructuras de datos sofisticadas, optimizadas para el rendimiento en diversas arquitecturas y casos de uso.

-   Las bases de datos relacionales se usan desde hace más de 30 años y las implementaciones estándar son bastante robustas y cuentan con un sólido respaldo en la comunidad de las ciencias de la computación.

Soporte de bases de datos en Rosetta
===========================

Aunque implementaciones estándar como SQLite, PostgreSQL, MySQL y Oracle se parecen bastante en muchos aspectos, cada una tiene detalles propios. Para ser útil en distintos contextos, Rosetta usa una biblioteca de abstracción, cppdb, que presenta una interfaz común dentro del código y permite admitir varios motores de bases de datos.

¿Por qué la biblioteca cppdb?
----------------------

Al elegir cppdb como capa de abstracción de bases de datos evaluamos varios enfoques y proyectos. La estrategia general de una capa de abstracción es tener controladores de backend, cada uno de los cuales se conecta con una biblioteca distinta (en este caso, un motor de bases de datos), y controladores de frontend que presentan una interfaz para un entorno de programación distinto. Una capa de abstracción eficaz debe simplificar el diseño del software, evitando tener que implementar interfaces para todas las combinaciones de entornos de programación y bibliotecas.

-   ODBC es una capa de abstracción de bases de datos de implementación muy extendida, que admite muchos motores de bases de datos y cuenta con implementaciones para muchos entornos de programación. Sin embargo, debido a la complejidad de la especificación de ODBC, muchos backends para motores de bases de datos estándar tienen implementaciones deficientes, difíciles de usar y, según se dice, con errores.

-   SOCI es una capa de abstracción de bases de datos bien respaldada y centrada en C++. Sin embargo, ha evolucionado a partir de una interfaz centrada en Oracle y procura comportarse como las estructuras de datos de la biblioteca estándar de plantillas. El resultado es que la API de C++ de SOCI resulta extraña y excesivamente complicada. Parece que hay desarrollo activo, pero no ha habido una versión estable desde 2008, lo cual es preocupante.

-   DBI es también una capa de abstracción de bases de datos multilenguaje bien respaldada. Originalmente surgió de un módulo de perl. Probamos a usarla con el frontend dbixx para C++ y parecía que habría funcionado relativamente bien. Un problema de DBI es que, para poder cargar controladores de bases de datos sobre la marcha en tiempo de ejecución, requiere libtool, un componente relativamente estándar de la cadena de herramientas autotools. Sin embargo, como no usamos make para nuestro sistema de compilación, habría hecho falta añadir libtool como dependencia adicional. Aunque libtool está disponible en la mayoría de los sistemas operativos comerciales, Rosetta se ejecuta en muchos clústeres distintos que podrían no tener esa capacidad. Otro problema de la capa de abstracción DBI es que el desarrollador de dbixx ha dejado de trabajar en ella. En su lugar, ha reescrito una capa de abstracción de bases de datos simplificada y centrada en C++: cppdb.

-   ccpdb es una capa de abstracción de bases de datos relativamente nueva, limpia y sencilla. Admite SQLite3, MySQL y PostgreSQL, además de una conexión a ODBC, de serie. Tiene licencia MIT/BOOST, por lo que es claramente adecuada para incluirla en Rosetta. Admite la carga de bibliotecas sobre la marcha, pero la hemos desactivado para eliminar la dependencia de libtool. Admite un comportamiento seguro para hilos, pero para evitar añadir pthreads como dependencia general, de momento la seguridad para hilos está desactivada. La documentación es escasa, pero hasta ahora eso no ha sido un gran problema, ya que mirar directamente la API ha resultado bastante sencillo. Cuando surgieron problemas al incluir cppdb en Rosetta, Artyom ha respondido con mucha rapidez para ayudar.

Uso de las bases de datos
==================

Descripción general del uso
--------

El proceso general de uso de una base de datos consta de las tres tareas básicas siguientes:

-   Establecer una sesión de base de datos
-   Ejecutar sentencias o
-   Ejecutar consultas

Gestión de sesiones
------------------

Actualmente solo se admiten bases de datos SQLite3, aunque añadir más tipos de bases de datos será factible. Para establecer una sesión, solicita una sesión al DatabaseSessionManager.

```
  #include <utility/sql_database/DatabaseSessionManager.hh>

  //...

  using utility::sql_database::DatabaseSessionManager;
    using utility::sql_database::sessionOP;

  DatabaseSessionManager * dsm = DatatabaseSessionManager::get_instance();
    sessionOP db_session = dsm->get_session(database_filename);
```

El DatabaseSessionManager es un singleton gestionado en las compilaciones sin MPI y se gestiona con boost::auto\_ptr en las compilaciones con MPI. Una cosa que conviene tener en cuenta: para usar punteros propietarios con un objeto de sesión, usa utility::sql\_database::session. Deriva de cppdb::session.

Normalmente tu aplicación querrá usar el nombre de archivo de base de datos que el usuario especifica en el sistema de opciones:

```
  -inout:database_filename
```

consultándolo de esta manera:

```
  #include <basic/options/option.hh>
  #include <basic/options/keys/inout.OptionKeys.gen.hh>
    #include <string>

  // ...

  using namespace basic::options;
  using OptionKeys::inout;

    std::string database_filename(option[database_filename].value());
```

Una vez establecida la sesión de base de datos, una de las tareas principales es ejecutar sentencias. Por ejemplo, para crear una tabla:

```
  #include <cppdb/frontend.h> // for 'statement' and 'result' classes

    // ...

    using cppdb::statement;

  statement create_table_stmt = (*db_session) <<
        "CREATE TABLE table1 ("
        "   column1 INTEGER PRIMARY KEY,"
        "   value1 TEXT);";
    create_table_stmt.exec();

    statement insert_row_stmt = (*db_session) <<
        "INSERT INTO table1 (null,?)" << "hi";
    insert_row_stmt.exec();
```

Otra tarea principal es ejecutar consultas sobre una base de datos. Por ejemplo:

```
  #include <cppdb/frontend.h> // for 'statement' and 'result' classes

    // ...

    using cppdb::statement;

  result res = (*db_session) <<
        "SELECT * FROM table1;";
    while(res.next()){
      int col1;
        string val;
      res >> col1 >> val;
        // use col1 and val
    }
```

Para ver un ejemplo ampliado que funciona, consulta test/utility/sql\_database/DatabaseSessionManagerTests.cxxtest.hh

Para más documentación sobre la API de cppdb, consulta la [documentación en línea de CppDB](http://cppcms.sourceforge.net/sql/cppdb/index.html) y external/dbio/cppdb/frontend.h.

##Véase también

* [[Database IO]]: información sobre la entrada/salida a diferentes formatos de bases de datos con Rosetta
* [[Rosetta Database Output Tutorial]]
* [[SQLite3 Interface]]: información específica sobre el uso de SQLite3 con Rosetta
* [[Database options]]: lista de opciones relacionadas con el uso de bases de datos con Rosetta
* [[RosettaScripts database connection options]]
* [[La base de datos de Rosetta|database]]: información sobre la base de datos principal incluida con Rosetta y especificada con la opción -in:path:database (tema aparte)
