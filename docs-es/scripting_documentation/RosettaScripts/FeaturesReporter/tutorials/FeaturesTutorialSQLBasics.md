#Tutorial de Features: conceptos básicos de SQL

SQL significa *Structured Query Language* (lenguaje de consulta estructurado) y se usa para introducir y extraer información de una base de datos relacional. El principal beneficio de almacenar información en una base de datos relacional es que los datos se pueden extraer rápidamente con SQL.

Este tutorial cubre los fundamentos de cómo trabajar con una base de datos SQLite3 y extraer información de ella; una base de datos SQLite3 es simplemente un archivo *.db3* en el sistema de archivos.

Para seguir el tutorial, necesitarás tener instalado el programa de línea de comandos *sqlite3*. Probablemente ya esté instalado, pero, si no lo está, puedes descargarlo de la página de [descargas de sqlite](http://sqlite.org/download.html).

Útil para leer en paralelo:

-   [Sintaxis básica](http://www.w3schools.com/sql/sql_syntax.asp)
-   [Un poco más](http://souptonuts.sourceforge.net/readme_sqlite_tutorial.html)

Obtener el esquema de una base de datos
---------------------------------

El primer paso es ver qué tablas hay en la base de datos

        sqlite3 example.db3 '.schema'

y devuelve algo como esto

        CREATE TABLE table_name (
            tag TEXT,
            category1 TEXT,
            value1 REAL,
            PRIMARY KEY(tag));

En este caso, la tabla *table\_name* tiene tres columnas *tag* , *category1* , *value1* , y la columna tag de cada fila debe ser única y no NULL.

Extraer una tabla completa
------------------------

Para obtener el contenido de una tabla completa, puedes ejecutar esto desde la línea de comandos:

        sqlite3 example.db3 'SELECT * FROM table_name;'

Esto indica que se extraigan todas las filas de la tabla *table\_name* y las escriba en la pantalla. Para cambiar el separador de columnas del símbolo «|» al símbolo «,», añadir encabezados de columna y escribir los resultados en un archivo, primero escribe un archivo de consulta, *query.sql* , así:

        --FILENAME: query.sql
        --DESCRIPTION: query the entire contents of the table 'table_name'
        --(This is a comment, by the way)

        .seperator ','
        .header on

        SELECT
            *
        FROM
            table_name;

Luego, desde la línea de comandos, ejecuta:

        sqlite3 example.db3 < query.sql > results.csv

Las siguientes secciones describen otros tipos de consultas que se pueden usar en un archivo de consulta como *query.sql*

Extraer algunas de las columnas y filas
------------------------------------

Para limitarte a algunas de las columnas y algunas de las filas, puedes usar una consulta como esta:

        SELECT
            table_name.tag,
            table_name.value1
        FROM
            table_name
        WHERE
            table_name.category1 = 'catA';

Esto devolverá solo las filas en las que el valor de la columna *category1* es *catA* y, de esas filas, solo las columnas *tag* y *value1* .

Extraer información de varias tablas
----------------------------------------

Las bases de datos relacionales suelen almacenar información distinta sobre los mismos objetos en tablas diferentes. Por ejemplo, supón que la base de datos *example.db3* tuviera otra tabla como esta

        CREATE TABLE another_table (
            tag TEXT,
            value2 REAL,
            PRIMARY KEY (tag));

donde los objetos se identifican por sus valores de «tag» tanto en *table\_name* como en *another\_table* . Estas dos tablas se pueden unir para hacer una consulta

        SELECT
            table_name.tag,
            table_name.value1,
            another_table.value2
        FROM
            table_name,
            another_table
        WHERE
            table_name.tag = another_table.tag;

Más información
----------------

SQL permite describir consultas más complicadas. Para saber más,

-   consulta la página [SQL as Understood by SQLite](http://sqlite.org/lang.html), que describe la sintaxis de SQL.
-   Recomiendo el libro [The Definitive Guide to SQLite](http://www.amazon.com/Definitive-Guide-SQLite-Michael-Owens/dp/1590596730), de Michael Owens.

