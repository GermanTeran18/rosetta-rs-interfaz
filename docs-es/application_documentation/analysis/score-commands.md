#Comandos de score

Metadatos
========

Este documento fue editado el 20/6/2016 por Jared Adolf-Bryfogle. Esta aplicación de Rosetta3 fue creada y documentada por Mike Tyka, et al.

Propósito y algoritmo
=====================

Esta aplicación simplemente vuelve a puntuar PDB, silent files y PDB dentro de bases de datos relacionales. También sirve para conversiones, es decir, convertir desde y hacia silent files, PDB y bases de datos relacionales.  Usa las [[opciones generales de salida|output-options]] de Rosetta para las conversiones de tipo de archivo.


El comportamiento por defecto es no repetir los PDB en la salida, así que solo se entrega el scorefile. Esto se puede controlar con opciones de línea de comandos.

Puedes encontrar un tutorial introductorio sobre la puntuación en Rosetta [aquí](https://www.rosettacommons.org/demos/latest/tutorials/scoring/scoring).

Opciones de línea de comandos
====================

```
* Sample command:  score_jd2.linuxgccrelease -database db_path -l PDBLIST.txt


Score Application Specific
-score_app:linmin                  Run a quick linmin before scoring
-rescore:verbose                   display score breakdown


Quick Start Options
-in:file:native                    native PDB if CaRMS is required
-score:weights  weights            weight set or weights file
-score:patch  patch                patch set

-out:nooutput                      don't print PDB structures (default now)
-out:output                        force printing of PDB structures

-out:file:score_only               Only output score file (supress all other filetypes)
-out:file:scorefile name.sc        Name of scorefile (default score.sc)
-out:file:silent                   write silent-out file
-out:prefix  myprefix              prefix the output structures with a string
-scorefile_format json             Write the output score file as a JSON file (useful for reading into python)
```

Opciones generales
-  [[Opciones de entrada|Input options]]
-  [[Opciones de base de datos|Database options]]
-  [[Opciones de salida|Output Options]]
-  [[Opciones de puntuación|Score Options]]

Llama a optH al leer silent files (útil para determinar HisD/HisE)

Consejos
====

* Si quieres encontrar fácilmente la estructura de menor energía, usa el comando <code>sort</code>.  Puedes ordenar por una columna concreta con la opción -kx. Consulta [esta página](http://www.skorks.com/2010/05/sort-files-like-a-master-with-the-linux-sort-command-bash/) para más información.
 - Ordenar por puntuación total: <code>sort my_score_file.sc</code> 
 - Ordenar por término de energía: <code>sort -k5 my_score_file.sc</code>, que ordenaría por la 5.ª columna, o el 4.º término de puntuación.
 - Para obtener resúmenes generales del scorefile y de términos específicos (si la salida está en formato JSON): <code>Rosetta/main/source/tools/scorefile.py my_score_file.sc</code>

##Véase también
* [Tutorial de puntuación](https://www.rosettacommons.org/demos/latest/tutorials/scoring/scoring)
* [[Aplicaciones de análisis | analysis-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta