#Aplicación de prueba de archivos XML de Rosetta-scripts, "validate_rosetta_script"

Metadatos
========

Este documento fue creado en septiembre de 2017 por Andrew Leaver-Fay. La aplicación `validate_rosetta_script` la mantiene el laboratorio de Brian Kuhlman. Envía tus preguntas a (bkuhlman@email.unc.edu)

Código y demo
=============

El código de "punto de entrada" de la aplicación `validate_rosetta_script` está en `src/protocols/rosetta_scripts/RosettaScriptsParser.cc`; sin embargo, depende de los esquemas definidos por cientos de Movers, Filters, ResidueSelectors, TaskOperations, etc. repartidos por todo el código.

Una demo del uso de esta aplicación está en Rosetta/rosetta_scripts_scripts/testing/validate_all_scripts.py: este script ejecutará la aplicación validate_rosetta_script
sobre todos los scripts enumerados en Rosetta/rosetta_scripts_scripts/scripts_to_validate.py

Referencias
==========

El artículo original de rosetta_scripts se publicó en:

Fleishman, Sarel J., et al. "RosettaScripts: a scripting language interface to the Rosetta macromolecular modeling suite." PloS one 6.6 (2011): e20161.


Propósito de la aplicación
===========================================

El propósito de esta aplicación es probar un script XML escrito para la aplicación rosetta_scripts, para asegurarse de que
es válido según el esquema XML generado internamente por Rosetta. Si el
script es válido, la aplicación imprimirá un breve mensaje de éxito y terminará con estado de salida 0;
si no, imprimirá el mensaje de error que se haya generado y terminará con un estado de salida distinto de cero.

Algoritmo
=========

El script carga el archivo XML, expande todas las etiquetas xi:include que encuentre y reemplaza todas las variables script-vars
que halle. Construye el esquema de rosetta_scripts y valida el archivo XML de entrada con ese esquema. 

Limitaciones
===========

Esta aplicación no ejecuta un rosetta script, ni garantiza que las funciones parse-my-tag de los objetos definidos en el script de entrada
tengan éxito. Esta aplicación solo verifica que el script de entrada es válido según el XSD.
Por ejemplo, podrías especificar para un Mover dos atributos mutuamente excluyentes de modo que el análisis no tendría éxito, pero la validación del esquema sí.
Esta aplicación no puede detectar ese tipo de problema en el script de entrada.

Archivos de entrada
===========

Los archivos de entrada principales de esta aplicación son archivos XML. Un archivo XML puede incluir otro archivo XML mediante una etiqueta `<xi:include href="filename">`.
Esto te permite reutilizar elementos en varios scripts sin duplicarlos.

No debería accederse a ningún otro archivo de entrada, ya que los objetos del archivo XML no se construyen.

Opciones
=======

Hay dos argumentos de línea de comando principales para usar con rosetta_scripts y con aplicaciones similares a rosetta-scripts (como esta)

```
-parser:protocol <xml-filename>                         The script that will be read and whose tags will be turned into Rosetta objects 
-parser:script_vars <ws-sep-varname-equals-value-pairs> The input XML file(s) may contain variables that can then be replaced with other
                                                        values from the command line. These variables should be enclosed in double % symbols.
                                                        E.g. <SomeTag value="%%myvariable%%"/>. The variable in the previous XML element named
                                                        myvariable can be replaced with a particular value, e.g. 10.3 by having the script_vars
                                                        flag on the command line: --parser:script_vars myvariable=10.3
                                                        You may have as many variables as you would like; each variable should be separated by
                                                        whitespace (i.e. the ws-sep part; it is white-space-separated). The variable name an
                                                        the value you wish to assign should be separated by an equals sign. Valid variable names
                                                        include any alpha-numeric strings and may contain underscores; they should not contain
                                                        consecutive percent symbols. Alternatively, you may include the script_vars option multiple
                                                        times on the command line, giving a different variable=value pair for each instance.

```

Consejos
====

Puedes usar la opción `-parser:info <tag-name>` con la aplicación rosetta_scripts para imprimir la información del esquema XML
y el texto de documentación asociado de una etiqueta concreta con el nombre de etiqueta solicitado, si ves que un Mover/Filter/etc.
no es válido según el XSD.

Salidas esperadas
================

Termina con un breve mensaje de éxito y con estado de salida cero si el script de entrada se puede analizar;
en caso contrario, termina con un mensaje de error detallado y con estado de salida distinto de cero.

Posprocesamiento
===============

Sin posprocesamiento
