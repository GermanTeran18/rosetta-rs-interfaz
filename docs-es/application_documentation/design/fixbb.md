#Aplicación de diseño con cadena principal fija, "fixbb"

Metadatos
========

Este documento fue editado en octubre de 2015 por Jared Adolf-Bryfogle. La aplicación `       fixbb      ` la mantiene el laboratorio de Brian Kuhlman. Envía tus preguntas a (bkuhlman@email.unc.edu)

Código y demo
=============

Consulta `       rosetta/main/tests/integration/tests/fixbb      ` para ver un ejemplo de protocolo de diseño con cadena principal fija y de archivos de entrada. Se puede hacer una ejecución de producción a partir del archivo `       command      ` añadiendo las opciones -ex1 y -ex2 para la ejecución con todos los átomos. La ejecución en modo centroid ya es una "ejecución de producción", en el sentido de que no se puede hacer que tarde más de lo que ya tarda.

La mayoría de las clases de la aplicación fixbb están en `       rosetta/main/source/src/core/pack      ` . La clase de interfaz principal es `       PackerTask      `, que está en `       rosetta/main/source/src/core/pack/task      ` . Los rotámeros se guardan en instancias de la clase `       RotamerSet      `, que a su vez se guardan en una instancia de la clase `       RotamerSets      ` ; estas clases están en `       rosetta/main/source/src/core/pack/rotamer_set      ` . Las energías de pares de rotámeros se guardan en una de varias clases de "grafo de interacción", que están en el espacio de nombres `       core::pack::interaction_graph      ` . Las clases de annealer están en `       rosetta/main/source/src/core/pack/annealer      ` La aplicación en sí está en `       rosetta/main/source/src/apps/public/design/fixbb.cc      ` e invoca el `       PackRotamersMover      ` que está en `       rosetta/main/source/src/protocols/moves/PackRotamersMover.cc      `

Referencias
==========

Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de RosettaDesign:

-   Design of a novel globular protein fold with atomic-level accuracy. Kuhlman B, et al.Science. 2003 Nov 21;302(5649):1364-8.
-   A large scale test of computational protein design: folding and stability of nine completely redesigned globular proteins. Dantas G, et al. J Mol Biol. 2003 Sep 12;332(2):449-60.
-   High-resolution design of a protein loop. Hu X, Wang H, Ke H, Kuhlman B. Proc Natl Acad Sci U S A. 2007 Nov 6;104(45):17668-73. Epub 2007 Oct 30
-   Rotamer-Pair Energy Calculations using a Trie Data Structure. A. Leaver-Fay, B. Kuhlman, and J.S. Snoeyink. In WABI 2005. 500-511.
-   An Adaptive Dynamic Programming Algorithm for The Side Chain Placement Problem. A. Leaver-Fay, B. Kuhlman, and J.S. Snoeyink. In PSB 2005. 17-28.
-   On-The-Fly Rotamer Pair Energy Evaluation in Protein Design. A. Leaver-Fay, J.S. Snoeyink, and B. Kuhlman. In ISBRA 2008. 343–354.

Propósito de la aplicación
===========================================

Esta aplicación intentará optimizar la colocación de los rotámeros de las cadenas laterales sobre una cadena principal fija. Puede usarse para optimizar las posiciones de las cadenas laterales de una estructura de entrada o para crear una nueva secuencia de aminoácidos que encaje en la cadena principal original.

Algoritmo
=========

El problema de optimización combinatoria que plantea el reempaquetado (o diseño) con cadena principal fija es NP-completo [Pierce & Winfree, 2002]; el algoritmo que se usa aquí es un enfoque estocástico de recocido simulado y no garantiza la optimalidad de las cadenas laterales colocadas. Sin embargo, su tiempo de ejecución es bastante bueno; la parte lenta de un rediseño con cadena principal fija es el precálculo de todas las energías de pares de rotámeros. Rosetta usa los algoritmos trie-contra-trie para calcular rápidamente las energías de pares de rotámeros [Leaver-Fay et al. 2005]; actualmente es el único paquete de diseño de proteínas que aprovecha la mejora de rendimiento que ofrece este algoritmo. El precálculo de la energía de pares de rotámeros puede sustituirse por el cálculo de energía sobre la marcha, con una aceleración considerable y una reducción del 95 % en el uso de memoria [Leaver-Fay et al. 2008].

Hay muchas formas de controlar cómo se muestrean los rotámeros y en qué posiciones se debe intentar el diseño. Hay varias opciones de línea de comandos que se aplican a todos los residuos. Además, un "resfile" puede especificar cómo se van a tratar residuos concretos. Por defecto, `       fixbb      ` intentará rediseñar todos los residuos usando todos los aminoácidos.

El diseño con cadena principal fija funciona mejor combinado con un término de Lennard-Jones suavizado [Dantas et al. 2003], que ayuda a superar el problema de la construcción discreta de rotámeros (no es el valor por defecto). La función de puntuación que se usa puede controlarse en la línea de comandos especificando un archivo de pesos (o un archivo de pesos y un archivo de parche de pesos). 

Limitaciones
===========

Hay tres limitaciones serias que conviene tener en cuenta: 1) el diseño con cadena principal fija no muestrea el espacio conformacional de la cadena principal y, por lo tanto, no puede garantizar que la nueva secuencia se pliegue en la conformación de cadena principal deseada; 2) como el problema de optimización combinatoria subyacente es NP-completo y nuestra aproximación es estocástica, la salida de distintos trabajos de `       fixbb      ` variará; 3) la función de puntuación que se usa es imperfecta, de modo que incluso los diseños de mejor puntuación podrían no expresarse o no plegarse.

Archivos de entrada
===========

1) Estructuras

Siempre hay que proporcionar al menos un archivo pdb de entrada. Se puede especificar una lista de pdbs en la línea de comandos o en un archivo de lista:

-s \<pdb1\> \<pdb2\> \<pdb3\> ...

or

-l \<listfname\>

donde listfname es un archivo de texto simple con un nombre de archivo pdb por línea. La aplicación fixbb aplicará el PackRotamersMover a cada una de las estructuras de entrada indicadas.

2) Control del reempaquetado y del diseño: el resfile

Por defecto, fixbb intentará un rediseño global de la proteína, permitiendo que todos los residuos cambien a nuevas identidades de aminoácido. Si se indica la opción `-packing:repack_only`, el diseño se desactiva y se permite que todas las posiciones se reempaqueten, pero sin cambiar las identidades de los residuos.

La forma más flexible de controlar cómo fixbb reempaqueta o diseña la proteína es con un resfile. Se puede especificar un único resfile en la línea de comandos con la opción -resfile \<fname\>. Este resfile se usará para todas las estructuras de entrada. Si un resfile no puede aplicarse a todas las estructuras, hay que dividir el trabajo. El formato del resfile se describe aquí: [[Sintaxis y convenciones de los resfiles|resfiles]].

Opciones
=======

Especificación de los archivos de entrada:

```
-s <pdb> <pdb2>       A list of one or more pdbs to run fixbb upon.
-l <listfile>         A file that lists one or more pdbs to run fixbb upon.
-resfile <fname>      The resfile that is to be used for this job
-packing:repack_only  Turn off all design and only repack residues
-nstruct <int>        The number of iterations to perform per input structure; e.g. with 10 input structures
                      and an -nstruct of 10, 100 trajectories will be performed.
```

Grafo de interacción (por defecto se precalculan todas las energías de pares de rotámeros)

```
-linmem_ig <int>     Activate the linear-memory interaction graph [Leaver-Fay et al. 2008]
-lazy_ig             Activate the lazy interaction graph
```

Rotámeros

```
-ex1                 Increase chi1 rotamer sampling for buried* residues +/- 1 standard deviation
-ex1aro              Increase chi1 rotamer sampling for buried* aromatic** residues +/- 1 standard deviation
-ex2                 Increase chi2 rotamer sampling for buried* residues +/- 1 standard deviation
-ex2aro              Increase chi2 rotamer sampling for buried* aromatic** residues +/- 1 standard deviation
-ex3                 Increase chi3 rotamer sampling for buried* residues +/- 1 standard deviation
-ex4                 Increase chi4 rotamer sampling for buried* residues +/- 1 standard deviation
-ex1:level <int>     Increase chi1 sampling for buried* residues to the given sampling level
-ex1aro:level <int> : Increase chi1 sampling for buried* aromatic residues to the given sampling level
-ex2:level <int>     Increase chi1 sampling for buried* residues to the given sampling level
-ex2aro:level <int> : Increase chi1 sampling for buried* aromatic residues to the given sampling level
-ex3:level <int>     Increase chi1 sampling for buried* residues to the given sampling level
-ex4:level <int>     Increase chi1 sampling for buried* residues to the given sampling level
-preserve_input_cb   Do not idealize the CA-CB bond vector -- instead, use the CB coordinates of the input pdb.
-use_input_sc        Include the side chain from the input pdb.  False by default.  Including the input sidechain
                     is "cheating" if your goal is to measure sequence recovery, but a good idea if your goal is
                     to redesign the input sequence for eventual synthesis.
```

Los residuos enterrados son aquellos con \#vecinos CBeta \>= umbral (por defecto 18) a menos de 10 Angstroms. Este umbral puede controlarse con la opción -extrachi\_cutoff.

```
-extrachi_cutoff <int> : Set the number of cbeta neighbors (counting its own) at which a residue is considered buried.
                         A value of "1" will mean that all residues are considered buried for the purpose of rotamer building.
```

Los residuos aromáticos son HIS, TYR, TRP y PHE. Nota: incluir tanto -ex1 como -ex1\_aro no aumenta el muestreo de los residuos aromáticos más que incluir solo la opción -ex1. Sin embargo, si se incluyen en la línea de comandos tanto -ex1 como -ex1\_aro:level 4, los residuos aromáticos tendrán más muestras de rotámeros chi1 que los residuos no aromáticos. Ten en cuenta también que -ex1\_aro *solo puede aumentar* el muestreo de los residuos aromáticos por encima del de los no aromáticos. -ex1:level 4 y -ex1\_aro:level 1 juntos tendrán el mismo efecto que -ex1:level 4 solo.

Annealer

(Por defecto es el annealer original usado en [Kuhlman et al. 2003])

```
-multi_cool_annealer <int>   Use an alternate annealer that spends more time at low temperatures.
                             This annealer produces consistently lower energies than the standard annealer.
```

Otras

```
-database <path/to/rosetta/main/database>     Specify the location of the rosetta_database (required)

-overwrite             Overwrite the output files, even if they already exist.

-minimize_sidechains   Follow the packing phase with gradient-based minimization of the sidechains for
                       residues that were either repacked or designed in the packing phase.

-min_type <string>     When combined with the -minimize_sidechains flag, specifies the line-search algorithm to use
                       in the gradient-based minimization . "dfpmin" by default.

-score:weights <wts_file>           Set the weights file to be used.
-score:weights_patch <patch_file>   Set the weights patch file to be used.
```

Si no se usa ninguna de las opciones -score:weights ni -score:weights\_patch, se usará "score12" por defecto.

```
-constant_seed         Fix the random seed
-jran <int>            Specify the random seed; if unspecified, and -constant_seed appears on the command line,
                       then the seed 11111111 will be used
```

Consejos
====

-   Se recomiendan las opciones -ex1 y -ex2 para obtener estructuras de salida bien empaquetadas.
-   Un resfile de dos líneas, donde la primera línea es "NATAA" y la segunda es "start", basta para indicar "reempaquetar solo la secuencia de entrada"
-   Si estás rediseñando con muchos rotámeros (\>6K), usar el grafo de interacción de memoria lineal ahorrará tiempo y memoria. Todo ventajas.

Salidas esperadas
================

La estructura del final de la ejecución se escribirá en un archivo .pdb, y la puntuación de esa estructura se escribirá en el archivo de puntuaciones, score.sc. El archivo .pdb se llamará con el archivo de entrada + número de trabajo.pdb. "-s 1ubq.pdb" produce el archivo de salida 1ubq\_0001.pdb.

Como la aplicación `       fixbb      ` usa el distribuidor de trabajos JD2, respeta todas las opciones de jd2 que controlan la salida.

Posprocesamiento
===============

La aplicación fixbb se usa habitualmente en pruebas de recuperación de secuencia; el script de Python pdb2fasta.py [APL: se está trabajando para incluir este archivo en el trunk] convierte un archivo pdb en un archivo fasta para facilitar la comparación de secuencias.

Novedades de Rosetta3.2
==========================

Rosetta3.2 incluye el Lazy Interaction Graph, que todavía no se había portado desde Rosetta++ en la versión 3.1.

Novedades de Rosetta 3.8
===========================

Rosetta 3.8 incluye varios términos de energía centrados en el diseño, como [[aa_composition|AACompositionEnergy]] (que penaliza las desviaciones respecto a una composición de aminoácidos deseada), [[netcharge|NetChargeEnergy]] (que penaliza las desviaciones respecto a una carga neta deseada) y [[hbnet|HBNetEnergy]] (que ofrece una bonificación energética para las redes de enlaces de hidrógeno).  Se pueden usar con la aplicación fixbb para guiar el proceso de diseño y promover las características deseadas.  Consulta la documentación de cada uno de estos términos de energía para más detalles.

##Véase también

* Fixbb puede ejecutarse con el [[ término de energía hpatch| fixbb-with-hpatch ]] para evitar la aparición de parches hidrofóbicos en la superficie
* [[Servidor Rosetta Design (enlace externo)|http://rosettadesign.med.unc.edu/]]: servidor web para el diseño con cadena principal fija
* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[PackRotamersMover]]: mover de RosettaScripts para el reempaquetado y el diseño de rotámeros
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
* [[AACompositionEnergy]]: guía al packer de Rosetta hacia soluciones con una composición de aminoácidos deseada.
* [[NetChargeEnergy]]: guía al packer de Rosetta hacia soluciones con una carga neta deseada.
* [[HBNetEnergy]]:  guía al packer de Rosetta hacia soluciones con redes de enlaces de hidrógeno.
