#Motif Dock Score

Metadatos
========

Autor: Nick Marze (nickmarze@gmail.com)

Última edición: 31/7/2017 por Nick Marze. Investigador principal correspondiente: Jeffrey Gray (jgray@jhu.edu).

[[_TOC_]]

Código
======

-   Código fuente de la aplicación: `        rosetta/main/source/src/apps/public/motif_dock/make_motif_tables.cc       `

Para ejecutar cualquiera de los modos de make_motif_tables, escribe lo siguiente en una línea de comandos:

```
[path to executable]/make_motif_tables.[platform|linux/mac][compile|gcc/ixx]release –database [path to database] @options
```

Para ejecutar docking en el modo Motif Dock Score, escribe lo siguiente en una línea de comandos:

```
[path to executable]/docking_protocol.[platform|linux/mac][compile|gcc/ixx]release –database [path to database] -mh:path:scores_BB_BB [path to score tables + score table prefix] -mh:score:use_ss1 false -mh:score:use_ss2 false -mh:score:use_aa1 true -mh:score:use_aa2 true -docking_low_res_score motif_dock_score @options
```

Nota: el argumento por defecto de -mh:path:scores_BB_BB es: [path to Rosetta main]/database/additional_protocol_data/motif_dock/xh_16_ *Nota: ruta actualizada el 17/4/2023

Nota: el código reside actualmente en la rama ssrb19/ensembledock_separate, y se integrará en master en el otoño de 2017. *Nota: el código se integró en algún momento anterior al 17/4/2023.

Referencias
===========

Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de RosettaDock:

-   Marze, N. A.; Roy Burman, S. S.; Sheffler, W.; Gray, J. J. (2018) Efficient flexible backbone protein–protein docking for challenging targets. Bioinformatics 34(20), pp 3461–3469

Propósito de la aplicación
===========================================

Docking rápido de baja resolución que usa energías de todos los átomos asignadas a coordenadas de la cadena principal

Algoritmo
=========

Motif Dock Scoring se basa en tablas precalculadas de energías de interacción entre pares de residuos, asignadas a geometrías de la cadena principal. Las tablas optimizadas con energías REF15 se encuentran en database/protocol_data/motif_dock. Si es necesario, se pueden generar tablas nuevas con la aplicación pública make_motif_tables.

Las tablas de puntuación generadas por la aplicación pública make_motif_tables se usan como parte del protocolo Motif Dock Score, al que se accede con un conjunto de opciones a través de la aplicación Docking Protocol. Las tablas de puntuación optimizadas para REF15 se encuentran en database/protocol_data/motif_dock.

Modos
=====

Hay cinco modos dentro de make_motif_tables, cada uno de los cuales se activa con una opción de línea de comandos:

Recolectar motivos (harvest motifs)
-----------------------------------

Se leen y puntúan los archivos PDB consultados. Las puntuaciones se descomponen en todos los pares de residuos, y los pares con energías negativas se almacenan como motivos de pares de una sola línea. El motivo de par contiene campos para, entre otros: números de residuo, identidades de aminoácidos, puntuación del par de residuos y las coordenadas de la transformación 6D necesaria para superponer la cadena principal de un aminoácido sobre la del otro. Todos los motivos de un mismo archivo PDB se concatenan y se comprimen en un único archivo .rpm.bin.gz (no legible por humanos). Existirá un archivo de salida .rpm.bin.gz por cada archivo PDB de entrada, etiquetado con el código de 4 caracteres del PDB.

Uso de la opción del modo:
```
-mh:harvest_motifs [list of PDB files to query]
```

Opciones obligatorias:
```
-out:file:o [path to rpm output directory]
-mh:filter:filter_harvest
-mh:filter:motif_type BB_BB
```

Opción sugerida:
```
-mh:harvest:max_res 5000 (ignores query PDB structures with > 5000 residues)
```

Notas sobre futuras optimizaciones:
Actualmente, make_motif_tables usa una función de puntuación REF15 modificada y codificada de forma fija. Para usar una función nueva, habrá que editar el cálculo de la variable full_score con los pesos de la nueva función de puntuación; además, habrá que pasar la opción -score:weights adecuada y cualquier opción de parche relevante. Cabe señalar que la optimización sugirió que los términos de energía de un solo cuerpo, cuando se incluyen, dan peor rendimiento que cuando se omiten. Este comportamiento surge porque las malas puntuaciones de términos de un solo cuerpo enmascararán las buenas puntuaciones de términos de dos cuerpos, llevando la puntuación total del par por encima del límite de 0 REU para almacenar el motivo. Del mismo modo, las buenas puntuaciones de términos de un solo cuerpo enmascararán las malas puntuaciones de términos de dos cuerpos, lo que provoca el almacenamiento de motivos no óptimos. Potencialmente, este efecto de convolución podría ignorarse si se almacenaran todos los motivos, sin importar su energía. En la práctica, sin embargo, esto no es factible, ya que el mayor número de motivos pronto resulta prohibitivo en memoria con el hardware actual (> 50 GB de memoria al usar un umbral de -3 REU y el conjunto completo de motivos del PDB).

Combinar motivos (merge motifs)
-------------------------------

Para construir las tablas de puntuación, los archivos rpm deben leerse todos a la vez desde la línea de comandos. Cuando se usa el PDB completo como conjunto de consulta, el número resultante de archivos rpm excede el límite típico de caracteres de la línea de comandos. Como solución alternativa, los archivos rpm sin procesar se pueden combinar en un número menor de listas de motivos más grandes. N.B.: No combines todo en un único archivo rpm, ya que esto probablemente haga fallar make_motif_tables por los requisitos de memoria; lo recomendado es generar un archivo rpm combinado por cada par de 2 caracteres del medio del código de 4 caracteres del PDB (por ejemplo, el archivo rpm combinado B3 contendrá motivos de 1B3F, 1B3Z, 2B3A, etc.)

Uso de la opción del modo:
```
-mh:merge_motifs [list of raw .rpm.bin.gz files]
```

Opción obligatoria:
```
-mh:motif_out_file [path to merged .rpm.bin.gz file]
```

Recolectar puntuaciones (harvest scores)
----------------------------------------

Construye las tablas de puntuación a partir de las listas de motivos. Los motivos se leen uno por uno, y la geometría de su transformación 6D se asigna al contenedor (bin) correspondiente de la tabla de puntuación. La puntuación del motivo se compara con la puntuación del contenedor, y la menor de las dos se almacena como la nueva puntuación del contenedor. Tras leer todos los motivos, la tabla de puntuación contendrá cierto número de contenedores poblados, en los que está representada la conformación de menor energía que corresponde a la geometría del contenedor, y cierto número de contenedores vacíos, en los que no se observó ninguna geometría coincidente en el conjunto de motivos y cuya puntuación es 0. Se generará una tabla de puntuación por cada par de aminoácidos, almacenada en formato comprimido .xh.bin.gz (no legible por humanos).

Uso de la opción del modo:
```
-mh:harvest_scores [list of merged .rpm.bin.gz files]
```

Opciones obligatorias (valores sugeridos entre <paréntesis angulares>):
```
-mh:motif_out_file [path to xh output directory]
-mh:filter:filter_harvest
-mh:filter:motif_type BB_BB
-mh:harvest:sep_aa true
-mh:harvest:hash_cart_resl <2>
-mh:harvest:hash_angle_resl <22.5>
```

>**N.B.: la variable de ruta -mh:motif_out_file también será el prefijo de los nombres de archivo .xh.bin.gz, y no debe contener ningún carácter “/”**

Opciones sugeridas:
```
-mh:harvest:agg_with_max TRUE
-mh:harvest:smoothing_factor 1
```

Notas sobre futuras optimizaciones:
Las opciones hash_cart_resl y hash_angle_resl fijan el tamaño de los contenedores para las coordenadas traslacionales y rotacionales, respectivamente. La primera debe dividir exactamente a 16, y la segunda debe dividir exactamente a 180, para asegurar contenedores de igual tamaño. Establecer agg_with_max en FALSE cambiará el comportamiento de poblado de los contenedores de la tabla de puntuación: en lugar de almacenar el mínimo entre la puntuación del contenedor y la puntuación del motivo consultado, almacena la suma de ambas. Esta configuración NO se recomienda en absoluto, ya que este comportamiento produce malos resultados de Motif Dock Score, con unos pocos contenedores muy poblados que dominan el Motif Dock Score. Este método de poblado necesita una reconstrucción extensa para ser viable en el caso general. Establecer la variable smoothing_factor altera la suavidad de las tablas de puntuación. Las puntuaciones de motivos suficientemente bajas también se almacenarán en los contenedores de puntuación vecinos; valores más altos de smoothing_factor aumentarán el radio de poblado desde el contenedor central de puntuación, incrementando el número de contenedores poblados con el motivo de baja puntuación.

Imprimir motivos (print motifs)
-------------------------------

Imprime en una forma legible por humanos los motivos de un archivo comprimido .rpm.bin.gz.

Uso de la opción del modo:
```
-mh:print_motifs [path to .rpm.bin.gz file]
```

Imprimir puntuaciones (print scores)
------------------------------------

Imprime una lista legible por humanos de los contenedores poblados dentro de un archivo .xh.bin.gz.

Uso de la opción del modo:
```
-mh:print_scores [path to .xh.bin.gz file]
```

Opciones obligatorias:
```
-mh:harvest:hash_cart_resl <matching value of hash_cart_resl flag used in harvest_scores>
-mh:harvest:hash_angle_resl <matching value of hash_angle_resl flag used in harvest_scores>
```
