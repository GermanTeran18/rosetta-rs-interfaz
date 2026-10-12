#Archivo PDB
##Archivo PDB

El formato de archivo PDB es un formato de archivo estándar de la industria para almacenar estructuras biomoleculares. La [descripción oficial](http://www.wwpdb.org/documentation/file-format) del formato de archivo la mantiene el wwPDB.

Actualmente Rosetta lee solo un subconjunto de los registros del formato PDB.

Los registros principales que se leen son los registros ATOM y HETATM, que definen las coordenadas de los átomos.

La mayoría de los demás registros se ignoran.

Un punto de confusión para los usuarios nuevos es el tratamiento de los ID de residuo del PDB en Rosetta. Los ID de residuo se representan en las columnas 23-27 de un archivo PDB (el número de secuencia y el código de inserción) para los registros correspondientes, _p. ej._ ATOM, HETATM, _etc._ Cuando un archivo PDB se lee en Rosetta, esta numeración de residuos se representa internamente como una lista secuencial de ID enteros (sin códigos de inserción) que empieza con el ID 1. En algunos casos esta numeración coincide con la del PDB, pero en general no. Algunos de los archivos de entrada de Rosetta usan la numeración del PDB y otros la numeración de Rosetta, por lo que es importante darse cuenta de qué esquema de numeración espera cada archivo de entrada. En relación con esto, Rosetta puede conservar o descartar ciertos átomos (_p. ej._ los de ocupación cero) o residuos (_p. ej._ los que no tienen los átomos de la cadena principal necesarios) según las opciones de línea de comandos que se le pasen, algo que conviene tener presente.

TODO: Insertar comentarios sobre el uso especializado de otros registros

##Véase también
* [[Preparing structures]]: Preparación de PDB para su uso con Rosetta
* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Input options]]: Opciones de línea de comandos para la entrada de Rosetta
* [[Output options]]: Opciones de línea de comandos para la salida de Rosetta
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
