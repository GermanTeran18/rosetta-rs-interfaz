#Generación de esquemas de Features

Descripción general
--------

El generador de esquemas es un marco de trabajo para generar esquemas SQL independientes del motor de base de datos. Actualmente los motores admitidos son sqlite, postgresql y mysql.

La organización general del generador de esquemas es la siguiente:

Objeto Schema
-------------

Un objeto Schema es el objeto de nivel más alto y tiene un comando "print" que genera una cadena que representa el esquema de una tabla. Un esquema es un contenedor del resto de los objetos usados para generar esquemas de bases de datos. En concreto, un esquema tiene una PrimaryKey, un conjunto de ForeignKeys, un conjunto de Columns y un conjunto de Constraints.

Objeto Column
-------------

Las Columns son el bloque de construcción más básico de los esquemas y se usan en todos los objetos de generación de esquemas de nivel superior. En su forma más básica, una columna es simplemente una cadena que representa el nombre de la columna y un DbDatatype que especifica el tipo de datos almacenado en esta columna. También se puede añadir a las columnas información adicional, como restricciones de no nulo y autoincremento.

Ejemplo: Column example\_column("example\_column", DbInteger());

Objeto PrimaryKey
-----------------

El objeto PrimaryKey es simplemente un contenedor de columnas. Normalmente las tablas de una base de datos relacional tienen una sola columna como clave primaria. Se garantiza que las claves primarias son únicas.

Ejemplo: PrimaryKey example\_pkey(example\_column);

Objeto ForeignKey
-----------------

Una clave externa es una columna especial que hace referencia a una columna única de otra tabla (normalmente la clave primaria de esa tabla). Por tanto, el objeto ForeignKey contiene una sola columna y dos cadenas que representan el nombre de la tabla y de la columna a las que se hace referencia.

Ejemplo:

ForeignKey example\_fkey(example\_column, "other\_table", "column\_name\_from\_other\_table");

Objeto Constraint
-----------------

Un objeto Constraint es una clase base que se usa para representar una restricción concreta que se puede añadir a un esquema. Ejemplos de restricciones son la unicidad y las restricciones aritméticas (p. ej., some\_column \> 5).

Tipos de datos admitidos actualmente
-----------------------------

DbText:

DbInteger:

DbBoolean:

DbBigInt:

DbReal:

DbUUID:

Ejemplo
-------

Consulta protocols/features/StructureFeatures.cc para ver un ejemplo completo de cómo usar el SchemaGenerator
