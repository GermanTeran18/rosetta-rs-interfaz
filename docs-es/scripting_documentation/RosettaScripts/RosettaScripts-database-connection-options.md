<!-- --- title: Rosettascripts Database Connection Options -->### Opciones de conexión a bases de datos de RosettaScripts

Las etiquetas que requieren acceso a una [[base de datos relacional|Database-IO]] aceptan todas opciones para configurar la conexión. Como ejemplo, considera el mover [[ReportToDB|Movers-RosettaScripts#ReportToDB]], p. ej.

       <ReportToDB database_mode="postgres" database_name="interface_design" pq_schema="stage4"/>

donde rosetta se ha compilado con soporte de postgres. Las opciones *host*, *port*, *username* y *password* se especifican en un archivo `   ~/.pgpass  ` por motivos de seguridad.

Si no se proporciona una opción, las opciones que se describen a continuación recurren a las opciones del sistema de opciones, sustituyendo *database\_* por `   -inout:dbms:  `

Opciones generales
---------------

-   **database\_mode** : Qué backend de base de datos se debe usar. Las opciones válidas son [ *sqlite3* , *postgres* , *mysql* ]. Si no se especifica (ni siquiera en el sistema de opciones), se usa *sqlite3* por defecto.
-   **transaction\_mode** : Especifica cuándo se deben confirmar las transacciones en la base de datos. Una transacción agrupa sentencias y las ejecuta en bloque. Esto es beneficioso para mantener la consistencia de la base de datos cuando las sentencias están relacionadas semánticamente. Además, al agrupar sentencias se reducen los costes de comunicación en configuraciones de base de datos cliente-servidor. Un riesgo de hacer transacciones demasiado grandes es que obliga a retener más datos antes de pasarlos a la base de datos. Esto desperdicia memoria y, si hay un fallo a mitad de camino, los resultados parciales no se guardan en la base de datos.
    -   Los valores válidos son
        -   *none* : Cada sentencia se confirma como si fuera una transacción. Es útil para depurar.
        -   *standard* (por defecto): Cada llamada a `        commit()       ` provoca que se confirme una transacción.
        -   *chunk* : Requiere especificar la opción *chunk\_size*. Se confirman en la base de datos como una única transacción conjuntos de transacciones de tamaño *chunk\_size*. Por ejemplo, en casos de uso de clúster en los que *1000* núcleos intentan escribir a la vez en un servidor de base de datos con *8* núcleos y la carga es demasiado alta, considera usar un tamaño de bloque de *100* . NOTA: Para aprovechar plenamente el uso de bloques es útil usar el gestor de recursos para mantener la sesión de base de datos durante toda la vida del protocolo.

-   **chunk\_size** : Número de transacciones que se agrupan antes de confirmarlas en la base de datos. NOTA: Requiere `    transaction_mode=chunk   ` .

Opciones específicas de Sqlite3
------------------------

-   **database\_name** : La ruta y el nombre de archivo de la base de datos sqlite3. Normalmente tiene extensión *.db3* .
-   **database\_separate\_db\_per\_mpi\_process** : Añade al final del nombre de archivo de la base de datos *\_\<mpi\_rank\>* . Esto es útil, por ejemplo, para escribir bases de datos separadas en paralelo y fusionarlas después [(Véase main/tests/features/sample\_sources/merge.sh)](https://github.com/RosettaCommons/rosetta/blob/main/tests/features/sample_sources/merge.sh) .
-   **database\_readonly** : Abre el archivo de base de datos de modo que no se pueda modificar.

Opciones específicas de PostgreSQL
---------------------------

-   **database\_host** : La URI del servidor de base de datos.
-   **database\_port** : El *puerto* para acceder al servidor de base de datos.
-   **database\_user** : El *nombre de usuario* para acceder al servidor de base de datos.
-   **database\_password** : La *contraseña* para acceder al servidor de base de datos. Considera configurar un archivo [.pgpass](http://wiki.postgresql.org/wiki/Pgpass) en tu directorio personal para tener un mayor control de seguridad.
-   **database\_name** : El nombre de la base de datos.
-   **pq\_schema** : El nombre del esquema dentro de la base de datos. Es un espacio de nombres de 1 nivel que se usa para almacenar juntas bases de datos relacionadas. La ventaja de usar esquemas es que Postgres no permite consultar entre bases de datos, pero sí permite consultar entre esquemas. Consulta la documentación de Postgres sobre [esquemas](http://www.postgresql.org/docs/9.1/static/ddl-schemas.htm) para más información.

Opciones específicas de MySQL
----------------------

-   **database\_host** : La URI del servidor de base de datos.
-   **database\_port** : El *puerto* para acceder al servidor de base de datos.
-   **database\_user** : El *nombre de usuario* para acceder al servidor de base de datos.
-   **database\_password** : La *contraseña* para acceder al servidor de base de datos. Considera configurar un archivo [.my.cnf](http://dev.mysql.com/doc/refman/5.1/en/option-files.html) en tu directorio personal para tener un mayor control de seguridad.
-   **database\_name** : El nombre de la base de datos.

##Véase también

* [[RosettaScripts]]: La página principal de RosettaScripts
* [[Database IO]]: Información sobre la entrada/salida a distintos formatos de base de datos con Rosetta
* [[Rosetta Database Output Tutorial]]
* [[SQLite3 Interface]]: Información específica sobre el uso de SQLite3 con Rosetta
* [[Database support]]: Detalles avanzados sobre la interfaz de Rosetta con bases de datos
* [[Database options]]: Lista de opciones de línea de comandos relacionadas con bases de datos
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[Movers de RosettaScripts|Movers-RosettaScripts]]
* [[Filtros de RosettaScripts|Filters-RosettaScripts]]
* [[I want to do x]]: Guía para realizar perturbaciones estructurales concretas con RosettaScripts
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Glossary]]
* [[RosettaEncyclopedia]]