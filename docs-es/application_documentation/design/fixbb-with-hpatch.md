#Aplicación de diseño con cadena principal fija, "fixbb", con el término de energía de solubilidad 'hpatch'

Metadatos
========

Este documento se editó por última vez el 22 de junio de 2011 por Ron Jacak. El código fue escrito por Ron Jacak y Andrew Leaver-Fay. El investigador principal responsable es Brian Kuhlman (bkuhlman@email.unc.edu).

Código y demo
=============

La puntuación hpatch está pensada para usarse principalmente con el diseño con cadena principal fija, mediante la [[aplicación fixbb|fixbb]] . Consulta `       rosetta/main/tests/integration/tests/fixbb/      ` para ver un ejemplo de simulación de diseño con cadena principal fija y todos los archivos de entrada necesarios. Para activar la puntuación hpatch durante una simulación de diseño con cadena principal fija, hay que añadir una opción más en la línea de comandos (descrita abajo).

Como la puntuación hpatch es un término de energía no descomponible por pares, la lógica para evaluarla está dentro de las clases InteractionGraph. Estas clases tienen dos propósitos: guardan las energías de pares de rotámeros que se usan durante la optimización de la secuencia y evalúan los términos de energía no descomponibles por pares. La mayor parte del código está en `       rosetta/main/source/src/core/pack/interaction_graph/      ` . La puntuación hpatch puede optimizarse con cualquier aplicación que realice diseño, pero la forma más común de usarla es mediante la aplicación fixbb. La [[aplicación fixbb|fixbb]] está en `       rosetta/main/source/src/apps/public/design/fixbb.cc      ` e invoca el `       PackRotamersMover      ` que está en `       rosetta/main/source/src/protocols/moves/PackRotamersMover.cc      `

Referencias
==========

Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de RosettaDesign:

-   [Computational Protein Design with Explicit Consideration of Surface Hydrophobic Patches. R. Jacak, A. Leaver-Fay, and B. Kuhlman.](https://www.ncbi.nlm.nih.gov/pubmed/22223219)
-   [Design of a novel globular protein fold with atomic-level accuracy.](http://www.ncbi.nlm.nih.gov/pubmed/14631033) Kuhlman B, et al.Science. 2003 Nov 21;302(5649):1364-8.
-   [An Adaptive Dynamic Programming Algorithm for The Side Chain Placement Problem.](http://www.ncbi.nlm.nih.gov/pubmed/15759610) A. Leaver-Fay, B. Kuhlman, and J.S. Snoeyink. In PSB 2005. 17-28.

Propósito de la aplicación
===========================================

Las superficies de la mayoría de las proteínas nativas no exponen grandes cantidades de área superficial hidrofóbica, aunque, en general, alrededor del 30 % de los residuos expuestos en la superficie son hidrofóbicos. Las proteínas diseñadas con la función de energía actual de Rosetta sí tienden a exponer grandes cantidades de área superficial hidrofóbica, a pesar de tener un porcentaje de aminoácidos hidrofóbicos similar al nativo en las posiciones de la superficie. El propósito de la puntuación hpatch es evitar la formación de estos parches hidrofóbicos de superficie durante las simulaciones de diseño.

Algoritmo
=========

Las simulaciones de diseño de proteínas suelen comenzar leyendo un conjunto de coordenadas de la cadena principal y construyendo conformaciones, o rotámeros, de todos los aminoácidos posibles en cada posición modificable. Rosetta usa la biblioteca de rotámeros dependiente de la cadena principal de Dunbrack para construir los rotámeros. Una vez construidos los rotámeros para la estructura deseada, puede comenzar la optimización de la secuencia. Esta fase del diseño suele empezar con el cálculo de las energías de pares de rotámeros (RPE), es decir, las energías de interacción entre todos los pares de rotámeros posibles. Estas energías se almacenan en grandes tablas dentro de una estructura de datos de grafo. Una vez calculadas estas energías, el algoritmo de búsqueda de Rosetta prueba millones de sustituciones y calcula rápidamente el cambio de energía de cada sustitución usando las RPE almacenadas. La conformación con la mejor energía (la más baja) se escribe como el modelo de diseño final al terminar la simulación.

El término de energía hpatch funciona penalizando las sustituciones que crean grandes parches hidrofóbicos en la superficie durante la fase de optimización de la secuencia del diseño. Además de almacenar las RPE, el grafo de interacción de hpatch también registra el área de superficie accesible al solvente (SASA) de cada átomo de la estructura. Para cada sustitución considerada, la puntuación hpatch calcula cuál sería el cambio en el SASA de cada átomo si se aceptara esa sustitución. Después, la puntuación asigna todos los átomos hidrofóbicos expuestos a otro grafo y coloca aristas entre los nodos cuyos átomos tienen solapamiento de área de superficie accesible al solvente. Sobre este grafo se ejecuta el algoritmo union-find para encontrar los componentes conexos (básicamente, subgrafos conexos). Los componentes conexos representan los parches hidrofóbicos de la superficie de la proteína. A cada parche se le asigna una puntuación según su área. El cambio en la puntuación hpatch puede combinarse con el cambio en la puntuación de todos los términos de energía descomponibles por pares (calculados por el InteractionGraph) para obtener un cambio en la puntuación global para una sustitución dada. Ese cambio se evalúa con el criterio de Metropolis para determinar si se acepta o se rechaza la sustitución considerada.

La puntuación hpatch es compatible con todas las mismas opciones que se pueden usar con la aplicación fixbb estándar. Por ejemplo, se puede usar un "resfile" (que impide diseñar ciertas posiciones) con la puntuación hpatch. Todas las opciones compatibles se enumeran de nuevo abajo.

Limitaciones
===========

La estabilidad y la solubilidad de las proteínas son estados que compiten entre sí. Algunos estudios han demostrado que sustituir residuos polares parcialmente enterrados en la superficie de una proteína por residuos hidrofóbicos puede aumentar la estabilidad [Dantas-JMB-2007]. Sin embargo, otros estudios han demostrado que la velocidad de agregación de las proteínas es proporcional a la cantidad de área superficial hidrofóbica presente [Chiti-Nature-2003]. La puntuación hpatch intenta mejorar la solubilidad de las proteínas evitando la formación de parches hidrofóbicos, pero esto puede ser a costa de cierta estabilidad de la proteína.

Las mismas limitaciones que afectan a la aplicación fixbb se aplican al diseño con la puntuación hpatch. Se repiten aquí estas condiciones: 1) el diseño con cadena principal fija no muestrea el espacio conformacional de la cadena principal y, por lo tanto, no puede garantizar que la nueva secuencia se pliegue en la conformación de cadena principal deseada; 2) como el problema de optimización de cadenas laterales subyacente es NP-difícil y nuestra solución es estocástica, la salida de distintos trabajos de `       fixbb      ` probablemente variará; 3) la función de puntuación es imperfecta, de modo que incluso los diseños de mejor puntuación podrían no expresarse o no plegarse experimentalmente.

Archivos de entrada
===========

Estructuras - OBLIGATORIO
---------------------

Siempre hay que proporcionar al menos un archivo PDB de entrada. Hay que especificar en la línea de comandos un único PDB o una lista de PDB. La puntuación hpatch es compatible con PDB que contienen ligandos o aminoácidos no naturales.

```
-s <pdb1> <pdb2>                   A list of one or more PDBs to run fixbb upon
-l <listfile>                      A file that lists one or more PDBs to run fixbb upon, one PDB per line
```

La aplicación fixbb aplicará el PackRotamersMover a cada una de las estructuras de entrada indicadas.

Resfile
-------

Se puede especificar un único resfile en la línea de comandos con la opción resfile. Este resfile se usará para todas las estructuras de entrada. Si un resfile no puede aplicarse a todas las estructuras, hay que dividir el trabajo. El formato del resfile se describe en [[Sintaxis y convenciones de los resfiles|resfiles]] .

```
-resfile <fname>                  The resfile that is to be used for this job
```

Opciones
=======

Ubicación de la base de datos - OBLIGATORIO
----------------------------

```
-database <path/to/rosetta/main/database>     Specifies the location of the rosetta_database
```

Archivo de pesos - OBLIGATORIO
-----------------------

La puntuación hpatch se activa asignando al término un peso distinto de cero en la función de energía. La opción score:weights puede usarse para especificar un conjunto de pesos distinto en una simulación. Por defecto, la opción buscará archivos de pesos en el directorio de la base de datos rosetta/main/database/scoring/weights/ o en el directorio actual. El archivo design\_hpatch.wts se distribuye con Rosetta y tiene los pesos estándar de la función de energía de Rosetta con la puntuación hpatch activada y con las energías de referencia reponderadas.

```
-score:weights design_hpatch.wts  This flag instructs the application to use the weights specified in the database file 'design_hpatch.wts'
```

**IMPORTANTE: si no se usa la opción -score:weights, se usará "score12" por defecto. LA PUNTUACIÓN HPATCH NO SE USARÁ.**

Grafo de interacción
-----------------

(Por defecto: se precalculan todas las energías de pares de rotámeros)

```
-linmem_ig 10                     Activate the linear-memory interaction graph [Leaver-Fay et al. 2008]
```

Rotámeros
--------

```
-ex1                              Increase chi1 rotamer sampling for buried* residues +/- 1 standard deviation - RECOMMENDED
-ex1_aro                          Increase chi1 rotamer sampling for buried* aromatic** residues +/- 1 standard deviation
-ex2                              Increase chi2 rotamer sampling for buried* residues +/- 1 standard deviation - RECOMMENDED
-ex2_aro                          Increase chi2 rotamer sampling for buried* aromatic** residues +/- 1 standard deviation
-ex3                              Increase chi3 rotamer sampling for buried* residues +/- 1 standard deviation
-ex4                              Increase chi4 rotamer sampling for buried* residues +/- 1 standard deviation

-ex1:level <int>                  Increase chi1 sampling for buried* residues to the given sampling level***
-ex1_aro:level <int>              Increase chi1 sampling for buried* aromatic residues to the given sampling level
-ex2:level <int>                  Increase chi1 sampling for buried* residues to the given sampling level
-ex2_aro:level <int>              Increase chi1 sampling for buried* aromatic residues to the given sampling level
-ex3:level <int>                  Increase chi1 sampling for buried* residues to the given sampling level
-ex4:level <int>                  Increase chi1 sampling for buried* residues to the given sampling level

-extrachi_cutoff <int>            Set the number of Cbeta neighbors (counting its own) at which a residue is considered buried.
                                  A value of "1" will mean that all residues are considered buried for the purpose of rotamer building.
                                  Use this option when you want to use extra rotamers for less buried positions.

-preserve_input_cb                Do not idealize the CA-CB bond vector -- instead, use the CB coordinates of the input PDB
-use_input_sc                     Include the side chain from the input PDB.  Default: false
                                  Including the input sidechain is "cheating" if your goal is to measure sequence recovery,
                                  but a good idea if your goal is to eventually synthesize the designed sequence

-no_his_his_pairE                 Exclude the favorable pair term energy for HIS-HIS residue pairs - RECOMMENDED
```

\*   Los residuos enterrados son aquellos con \>= umbral (por defecto: 18) vecinos a menos de 10 Angstroms (distancia Cbeta). Este umbral puede controlarse con la opción -extrachi\_cutoff.

\*\* Los residuos aromáticos son HIS, TYR, TRP y PHE. Nota: incluir tanto -ex1 como -ex1\_aro no aumenta el muestreo de los residuos aromáticos más que incluir solo la opción -ex1. Sin embargo, si se incluyen en la línea de comandos tanto -ex1 como -ex1\_aro:level 4, los residuos aromáticos tendrán más muestras de rotámeros chi1 que los residuos no aromáticos. Ten en cuenta también que -ex1\_aro *solo puede aumentar* el muestreo de los residuos aromáticos por encima del de los no aromáticos. -ex1:level 4 y -ex1\_aro:level 1 juntos tendrán el mismo efecto que -ex1:level 4 solo.

\*\*\* Puedes encontrar más información sobre los [[niveles de muestreo de rotámeros extra|resfiles#Extra-Rotamer-Commands:]], incluidos los valores recomendados, en la [[página de documentación de los resfiles|resfiles]] .

Debido al gran número de estructuras que coordinan metales en el PDB, el término de energía de pares, que busca favorecer las interacciones electrostáticas, da una bonificación a los pares de residuos HIS-HIS. Añadir la opción -no\_his\_his\_pairE elimina la bonificación que reciben los pares de residuos HIS-HIS y reduce el número de histidinas diseñadas.

Annealer
--------

Por defecto, fixbb usa el annealer estándar usado en [Kuhlman et al. Science, 2003].

```
-multi_cool_annealer <int>        Use an alternate annealer that spends more time at low temperatures. This annealer produces
                                  consistently lower energies than the standard annealer. Recommended value: 10.
```

Otras opciones
-------------

```
-nstruct <int>                    The number of iterations to perform per input structure; e.g. with 10 input structures and an -nstruct
                                  of 10, 100 trajectories will be performed. Default: 1.
-overwrite                        Overwrite the output files, if they already exist. Not used by default.

-minimize_sidechains              Follow the packing phase with gradient-based minimization of the sidechains for residues that were either
                                  repacked or designed in the packing phase. Not used by default.
-min_type <string>                When combined with the -minimize_sidechains flag, specifies the line-search algorithm to use in the
                                  gradient-based minimization . "dfpmin" by default.

-constant_seed                    Fix the random seed
-jran <int>                       Specify the random seed; if unspecified, and -constant_seed appears on the command line, then the seed 11111111 will be used
```

Consejos
====

-   Se recomiendan las opciones -ex1 y -ex2 para obtener estructuras de salida bien empaquetadas.
-   Un resfile de dos líneas, donde la primera línea es "NATAA" y la segunda es "start", basta para indicar "reempaquetar solo la secuencia de entrada". Esto optimiza solo los rotámeros de las cadenas laterales de las estructuras de entrada y deja la secuencia igual.
-   Si estás rediseñando con muchos rotámeros (\>6K), usar el grafo de interacción de memoria lineal ahorrará tiempo y memoria. Añade la opción "-linmem\_ig 10" para activar el grafo de interacción de memoria lineal.

Salidas esperadas
================

La estructura del final de la ejecución se escribirá en un archivo .pdb, y la puntuación de esa estructura se escribirá en el archivo de puntuaciones, score.sc. El archivo .pdb se llamará con el archivo de entrada + número de trabajo.pdb. Por ejemplo, "-s 1ubq.pdb" produce el archivo de salida 1ubq\_0001.pdb. Como la aplicación `       fixbb      ` usa el [[distribuidor de trabajos JD2|jd2]] , respeta todas las opciones de jd2 que controlan la salida.

Posprocesamiento
===============

La [[aplicación fixbb|fixbb]] se usa habitualmente en pruebas de recuperación de secuencia; la aplicación [[sequence_recovery|sequence-recovery]] puede usarse para medir la recuperación de secuencia entre una proteína nativa y una rediseñada.

Novedades desde la última versión
=============================

La puntuación hpatch se publica por primera vez con Rosetta v3.3.


##Véase también

* [[Fixbb | fixbb ]]: más documentación de fixbb
* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
