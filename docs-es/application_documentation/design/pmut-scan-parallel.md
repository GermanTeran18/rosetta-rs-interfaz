#Aplicación de escaneo de mutantes puntuales ("pmut"), pmut\_scan\_parallel

Metadatos
========

Este documento se editó por última vez el 2/11/12 por Steven Lewis. El código fue escrito por Ron Jacak. El investigador principal correspondiente es Brian Kuhlman (bkuhlman@email.unc.edu).

Código y demostración
=====================

El código del protocolo pmut scan reside principalmente en `       rosetta/main/source/src/protocols/pmut_scan      `, en las clases PointMutScanDriver y Mutant. La clase Mutant es una clase auxiliar que guarda información sobre mutantes simples, dobles (o de orden superior) y sus respectivas mutaciones. La clase PointMutScanDriver se encarga de determinar qué mutantes se van a crear, distribuir los trabajos entre todas las CPU disponibles y calcular la puntuación de todas las estructuras. El protocolo se inicia mediante la aplicación pmut\_scan\_parallel, cuyo código se encuentra en `       rosetta/main/source/src/apps/pilot/ronj/pmut_scan_parallel      ` . Las pruebas unitarias del protocolo están en `       rosetta/main/source/test/protocols/pmut_scan      ` . Las pruebas de integración del protocolo están en `       rosetta/main/tests/integration/tests/pmut_scan      ` .

Referencias
===========

Recomendamos los siguientes artículos para comprender mejor la metodología de RosettaDesign:

-   [ROSETTA3: an object-oriented software suite for the simulation and design of macromolecules.](http://www.ncbi.nlm.nih.gov/pubmed/21187238) A. Leaver-Fay, et al. Methods Enzymol. 2011;487:545-74.
-   [Design of a novel globular protein fold with atomic-level accuracy.](http://www.ncbi.nlm.nih.gov/pubmed/14631033) Kuhlman B, et al.Science. 2003 Nov 21;302(5649):1364-8.

Propósito de la aplicación
===========================================

Uno de los objetivos más comunes del diseño o la ingeniería de proteínas es aumentar la estabilidad de una proteína de interés. Estudios previos han mostrado que rediseñar proteínas nativas puede producir aumentos significativos de estabilidad. Sin embargo, estos rediseños suelen tener un gran número de diferencias respecto a la secuencia de tipo silvestre. El propósito de este protocolo es aumentar la estabilidad de una proteína de interés con solo mutantes puntuales simples o dobles.

Algoritmo
=========

El protocolo funciona leyendo primero la estructura de la proteína objetivo (y soluciones alternativas de la misma proteína, si las hay). Luego construye una lista de todos los mutantes cuya puntuación hay que calcular. Si se realiza un escaneo de mutantes dobles, solo se prueban los residuos que están lo bastante cerca como para interactuar. (Dos residuos deben tener un par de átomos de cadena lateral a menos de 4.5 Angstroms para considerarse lo bastante cercanos como para interactuar.) Una vez construida la lista de mutantes, se crea y se evalúa cada uno de ellos. Se generan las energías de los mutantes que se predice que estabilizan en 1 unidad de energía de Rosetta o más.

**Si se compila con MPI, el protocolo distribuirá el trabajo de crear y puntuar todos los mutantes de forma equitativa entre todas las CPU disponibles. Esto se logra agregando "extras=mpi" al comando de compilación de SCons.**

Limitaciones
============

Los mutantes que el protocolo pmut scan predice como estabilizadores pueden no serlo, y se pueden pasar por alto mutantes que sí estabilizan. Las razones de estos resultados son variadas. La función de energía de Rosetta es imperfecta; por lo tanto, ciertos aspectos energéticos que Rosetta no contempla pueden hacer que un mutante predicho como estabilizador sea en realidad desestabilizador. Además, para modelar las mutaciones, el protocolo supone una conformación fija de la cadena principal. Los estudios han mostrado que se pueden lograr mejores resultados con protocolos que permiten flexibilidad de la cadena principal. Para mejorar la precisión de las predicciones será necesario refinar el protocolo con base en los resultados de la caracterización experimental de las predicciones.

Archivos de entrada
===================

Estructuras - OBLIGATORIO
-------------------------

Se debe especificar en la línea de comandos al menos un archivo PDB de entrada, con la opción -s o -l.

```
-s <pdb1> <pdb2>                                 A list of one or more PDBs to run the point mutant scan on
-l <listfile>                                    A file that lists one or more PDBs to run the point mutant scan on, one PDB per line
```

**IMPORTANTE: Si se especifica un archivo de lista, el protocolo supone que las estructuras son soluciones alternativas de las mismas proteínas e intenta encontrar mutaciones que estabilicen en todas las soluciones.**

Opciones
========

Ubicación de la base de datos 
-----------------------------

```
-database <path/to/rosetta/main/database>     Specifies the location of the rosetta_database
```

Opciones de la aplicación
-------------------------

```
-double_mutant_scan                              Look for double mutants that are stabilizing. By default, the protocol only looks for single mutants that are stabilizing. This mode looks for both double and single mutants. (default: false)
-mutants_list <file>                             Only make the mutants specified in the text file. Useful for combining mutants found during a scan into higher-order mutants. Not used by default.
-output_mutant_structures                        Output PDB files for each of the mutants predicted to be stabilizing. (default: false)
-DDG_cutoff                                      Filter output score lines to only print mutations with ddGs better than this.
-alter_spec_disruption_mode                      Search for mutations that destabilize an interface (see below)
```

Rotámeros
---------

```
-ex1                                             Increase chi1 rotamer sampling for buried* residues +/- 1 standard deviation - RECOMMENDED
-ex1_aro                                         Increase chi1 rotamer sampling for buried* aromatic** residues +/- 1 standard deviation
-ex2                                             Increase chi2 rotamer sampling for buried* residues +/- 1 standard deviation - RECOMMENDED
-ex2_aro                                         Increase chi2 rotamer sampling for buried* aromatic** residues +/- 1 standard deviation
-ex3                                             Increase chi3 rotamer sampling for buried* residues +/- 1 standard deviation
-ex4                                             Increase chi4 rotamer sampling for buried* residues +/- 1 standard deviation

-ex1:level <int>                                 Increase chi1 sampling for buried* residues to the given sampling level***
-ex1_aro:level <int>                             Increase chi1 sampling for buried* aromatic residues to the given sampling level
-ex2:level <int>                                 Increase chi1 sampling for buried* residues to the given sampling level
-ex2_aro:level <int>                             Increase chi1 sampling for buried* aromatic residues to the given sampling level
-ex3:level <int>                                 Increase chi1 sampling for buried* residues to the given sampling level
-ex4:level <int>                                 Increase chi1 sampling for buried* residues to the given sampling level

-extrachi_cutoff <int>                           Set the number of Cbeta neighbors (counting its own) at which a residue is considered buried.
                                                 A value of "1" will mean that all residues are considered buried for the purpose of rotamer building.
                                                 Use this option when you want to use extra rotamers for less buried positions.

-preserve_input_cb                               Do not idealize the CA-CB bond vector -- instead, use the CB coordinates of the input PDB
-use_input_sc                                    Include the side chain from the input PDB.  (default: true)

-no_his_his_pairE                                Exclude the favorable pair term energy for HIS-HIS residue pairs - RECOMMENDED
-score:weights design_hpatch.wts                 Activate the hpatch score during scoring.
```

\* Los residuos enterrados son aquellos con \>= un umbral (por defecto: 18) de vecinos a menos de 10 Angstroms (distancia Cbeta). Este umbral se puede controlar con la opción -extrachi\_cutoff.

\*\* Los residuos aromáticos son HIS, TYR, TRP y PHE. Nota: incluir -ex1 y -ex1\_aro a la vez no aumenta el muestreo de los residuos aromáticos más que incluir solo la opción -ex1. Sin embargo, si se incluyen en la línea de comandos tanto -ex1 como -ex1\_aro:level 4, los residuos aromáticos tendrán más muestras de rotámeros chi1 que los no aromáticos. Ten en cuenta también que -ex1\_aro *solo puede aumentar* el muestreo de los residuos aromáticos por encima del de los no aromáticos. -ex1:level 4 y -ex1\_aro:level 1 juntos tienen el mismo efecto que -ex1:level 4 solo.

\*\*\* Puedes encontrar más información sobre los [[niveles de muestreo extra de rotámeros|resfiles#Extra-Rotamer-Commands:]] , incluidos los valores recomendados, en la [[página de documentación de resfiles|resfiles]] .

Debido a la gran cantidad de estructuras con coordinación de metales en el PDB, el término de energía de pares, que busca favorecer las interacciones electrostáticas, otorga una bonificación a los pares de residuos HIS-HIS. Agregar la opción -no\_his\_his\_pairE elimina la bonificación otorgada a los pares de residuos HIS-HIS y reduce el número de histidinas diseñadas.

Annealer
--------

Por defecto, fixbb usa el annealer estándar utilizado en [Kuhlman et al. Science, 2003].

```
-multi_cool_annealer <int>                       Use an alternate annealer that spends more time at low temperatures. This annealer produces consistently lower energies than the standard annealer. Recommended value: 10.
```

Otras opciones
--------------

```
-constant_seed                                   Fix the random seed
-jran <int>                                      Specify the random seed; if unspecified, and -constant_seed appears on the command line, then the seed 11111111 will be used
```

Consejos
========

-   Se recomiendan las opciones -ex1 y -ex2 para obtener energías y estructuras de salida más precisas.

Ejemplos de líneas de comandos
==============================

Para ejecutar un escaneo de **mutantes simples (puntuales)** estabilizadores en el PDB 1ABC:

```
[mpirun -np 100] rosetta/main/source/bin/pmut_scan_parallel.macosgccrelease -database ~/rosettadb -s 1ABC.pdb.gz -ex1 -ex2 -extrachi_cutoff 1 -use_input_sc -ignore_unrecognized_res -no_his_his_pairE -multi_cool_annealer 10 -mute basic core
```

Para ejecutar un escaneo de mutantes **dobles** estabilizadores en el PDB 1ABC:

```
[mpirun -np 100] rosetta/main/source/bin/pmut_scan_parallel.macosgccrelease -database ~/rosettadb -s 1ABC.pdb.gz -double_mutant_scan -ex1 -ex2 -extrachi_cutoff 1 -use_input_sc -ignore_unrecognized_res -no_his_his_pairE -multi_cool_annealer 10 -mute basic core
```

Para ejecutar un escaneo de mutantes dobles estabilizadores en el PDB 1ABC y **generar estructuras de salida** de los mutantes que resulten estabilizadores:

```
[mpirun -np 100] rosetta/main/source/bin/pmut_scan_parallel.macosgccrelease -database ~/rosettadb -s 1ABC.pdb.gz -double_mutant_scan -output_mutant_structures -ex1 -ex2 -extrachi_cutoff 1 -use_input_sc -ignore_unrecognized_res -no_his_his_pairE -multi_cool_annealer 10 -mute basic core
```

Para calcular la puntuación de una **lista predeterminada de mutantes** y crear estructuras de salida para cada uno de ellos:

```
[mpirun -np 100] rosetta/main/source/bin/pmut_scan_parallel.macosgccrelease -database ~/rosettadb -s 1ABC.pdb.gz -mutants_list mutants.txt -output_mutant_structures -ex1 -ex2 -ex3 -extrachi_cutoff 1 -use_input_sc -ignore_unrecognized_res -no_his_his_pairE -multi_cool_annealer 10 -mute basic core
```

Para calcular la puntuación de una lista predeterminada de mutantes, crear estructuras de salida para cada uno y hacer un **muestreo aumentado** alrededor de los ángulos chi 1 y 2:

```
[mpirun -np 100] rosetta/main/source/bin/pmut_scan_parallel.macosgccrelease -database ~/rosettadb -s 1ABC.pdb.gz -mutants_list mutants.txt -output_mutant_structures -ex1 -ex1:level 3 -ex2 -ex2:level 3 -ex3 -extrachi_cutoff 1 -use_input_sc -ignore_unrecognized_res -no_his_his_pairE -multi_cool_annealer 10 -mute basic core
```

Formato del archivo de lista de mutantes
========================================

-   las líneas que empiezan con \# se ignoran
-   el formato es "chain current\_seq resnum[icode] new\_seq"
-   repite ese formato las veces que haga falta para mutantes múltiples
-   cada línea es un mutante independiente

Ejemplos:

```
# a single mutant
A N 1 G

# a double mutant
A N 1 G A S 13 N

# a double mutant with insertion codes on the residue numbers
A N 1E G A S 13G N
```

Salidas esperadas
=================

La única salida del protocolo, por defecto, es el archivo de log de la ejecución. El log contendrá el ddG predicho y la diferencia en la energía total promedio de todos los mutantes que resulten estabilizadores.
 Si se especificó la opción "-output\_mutant\_structures", también se generará un archivo PDB por cada mutante que resulte estabilizador. Los archivos PDB se nombrarán con el archivo de entrada + una cadena que representa el mutante. Por ejemplo, el mutante histidina-1-glicina en la cadena A de la estructura 1l2y\_renameH.pdb se generará en un archivo llamado 1l2y\_renameH.A-H1G.pdb.

Especificidad alterada
======================

Este código tiene un segundo modo que sirve como primer paso de "disrupción" del protocolo de especificidad alterada (alter\_spec). En resumen, alter\_spec primero encuentra una mutación desestabilizadora en una interfaz proteína-proteína y luego busca mutaciones compensatorias en la cadena opuesta, con la intención de diseñar nuevos pares ortogonales.

Este modo cambia algunas cosas. Primero, las Poses de entrada deben tener una interfaz. Todas las mutaciones se criban previamente para asegurar que ocurran en la interfaz. Las mutaciones también se criban previamente por distancia (como antes) y para asegurar que todos los pares estén en la misma cadena.

El sentido del DDG se invierte en este modo: se busca la disrupción, así que el modo informa las mutaciones más *desestabilizadoras*. El texto del log no lo refleja (muestra - donde corresponde +).

Posprocesamiento
================

Los campos del archivo de log están delimitados por espacios en blanco, así que se puede leer en Excel para un análisis posterior. Las estructuras de salida se pueden ver en un visor de PDB como PyMOL.

Novedades desde la última versión
=================================

El protocolo pmut scan se publica por primera vez con Rosetta v3.4. En 3.5 se agregó AlterSpecDisruptionMode. Además, -double\_mutant\_scan ahora incluye los mutantes simples.


##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta
