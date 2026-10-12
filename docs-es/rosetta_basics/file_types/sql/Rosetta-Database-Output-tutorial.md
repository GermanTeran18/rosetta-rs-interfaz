Tutorial de salida a base de datos de Rosetta
================================

Resumen
--------

Rosetta permite generar la salida de varias maneras, la mayoría de las
cuales usan archivos PDB «normales» o comprimidos (silent files, pdb\_gz, etc.).
La función, añadida recientemente, de escribir los resultados en una base de datos permite a los usuarios
interactuar con la salida de Rosetta de forma mucho más cómoda,
eliminando la mayor parte de la necesidad de scripts engorrosos, archivos corruptos, etc.
La implementación actual admite 2 formatos de bases de datos: mysql y
sqlite.

Cómo crear una ejecución de Rosetta con salida a base de datos
---------------------------------------------

Para usar la función de salida a base de datos tienes que incluir 2 opciones
básicas (para mysql también necesitarás las opciones mysql::host,
mysql::user, mysql::password y mysql::port). En este tutorial
me centraré en sqlite3, que se ajusta mejor a nuestras necesidades y
es mucho más sencillo de usar.

*-out:use\_database*: indica que quieres la salida en formato de base de datos

*-inout:dbms:database\_name*: el nombre de archivo de la base de datos

*-inout:database\_mode*: por defecto es sqlite3, así que no lo tocaremos.

Usar estas opciones de línea de comandos es bastante sencillo, por ejemplo:

    $ROSETTA_BIN/<protocol>.linuxgccrelease -s 1SFI_cyc.pdb 
    -database $ROSETTA_DB -ex1 -ex2 -use_input_sc -nstruct  1 -out:use_database -inout:dbms:database\_name results.db

Cómo sacar estructuras de la base de datos
--------------------------------------

¿Cómo pasar los resultados de la base de datos a uno o varios archivos PDB?

###Cómo sacar todos los decoys de la base de datos


Para sacar todas las estructuras de la base de datos, puedes usar
la aplicación score\_jd2 con las siguientes opciones:

*-inout:dbms:database\_name* file.db *-in:use\_database* *-out:pdb*

###Cómo sacar decoys específicos de la base de datos

Si quieres obtener solo un subconjunto de estructuras (por ejemplo,
las que tienen total\_score\<0), basta con pasar una consulta a sqlite3
(comprueba antes que lo tienes instalado...):

    sqlite3 results.db < query.txt

El archivo de consulta debería verse así (quita los comentarios /\* \*/ al ejecutarlo):

    .output structures.txt  /*set the output to file mode*/
    select tag from structures;  /*the query, should output tag names only!*/
    .exit

A continuación, pasa la salida de la consulta a la opción *-in:file:tags*, por ejemplo
de la siguiente manera:

    $ROSETTA_BIN/score_jd2.linuxgccrelease -inout:dbms:database\_name results.db 
    -in:use_database -out:pdb -in:file:tags `cat structures.txt` -database $ROSETTA_DB

###Cómo mover resultados antiguos a un archivo de base de datos


De nuevo usaremos la aplicación score\_jd2 para volver a puntuar un conjunto de archivos PDB
y dirigir la salida a una base de datos:

    score_jd2.linuxgccrelease -s decoy_* -database $ROSETTA_DB -out:use_database -inout:dbms:database\_name results.db

Consultas útiles
--------------

**TODO** ...

Enlaces
-----

[Ejemplos sencillos de sqlite](http://www.sqlite.org/sqlite.html)

##Véase también

* [[Database IO]]: información sobre la entrada/salida a diferentes formatos de bases de datos con Rosetta
* [[Features reporter overview]]: página principal del Features Reporter, una herramienta para escribir información en bases de datos con Rosetta
* [[SQLite3 Interface]]: información específica sobre el uso de SQLite3 con Rosetta
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con las bases de datos
* [[Database options]]: opciones de línea de comandos para trabajar con bases de datos
* [[RosettaScripts database connection options]]
* [[La base de datos de Rosetta|database]]: información sobre la base de datos principal incluida con Rosetta y especificada con la opción -in:path:database (tema aparte)
