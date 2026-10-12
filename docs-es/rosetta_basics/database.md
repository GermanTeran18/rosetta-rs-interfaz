#La base de datos de Rosetta

**Nota**: Esta página trata sobre la base de datos incluida con Rosetta. Si quieres usar una base de datos relacional independiente con Rosetta, consulta la página [[Database IO]].

La base de datos de Rosetta contiene archivos de datos importantes que Rosetta usa durante las ejecuciones (por ejemplo, las definiciones de qué átomos hay en la alanina o cuáles son los radios de Lennard-Jones).

#Configuración para una sola ejecución de Rosetta:



Tienes que especificar en la línea de comandos la ruta a este directorio de la base de datos para ejecutar simulaciones de Rosetta. Por ejemplo: 
* <code>rosetta.linuxgccrelease -database /path/to/rosetta/main/database other\_flags</code>


#Configuración para varias ejecuciones de Rosetta:

Rosetta también comprobará automáticamente la variable de entorno <code>$ROSETTA3_DB</code>.  Si está presente, no hace falta establecer la opción <code>-database</code>. Para establecerla temporalmente en tu sesión de shell: 

* <code>ROSETTA3_DB=path_to_rosetta_db</code>

Establece la variable en el archivo de configuración de usuario de tu shell, como por ejemplo, para el shell bash por defecto: <code>$HOME/.bashrc</code> en linux y <code>$HOME/.bash_profile</code> en mac.

##Véase también

* [[Database Conventions]]: Convenciones que seguir al añadir archivos a la base de datos de Rosetta
* [[Input options]]: Opciones de entrada de Rosetta, incluida la opción que especifica la base de datos de Rosetta
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de términos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[File types list]]: Enlaces a la documentación de los distintos tipos de archivo usados en Rosetta
