#Construcción enumerativa de un loop de proteína mediante recursión sistemática

Metadatos
========

Autor: Rhiju Das

Escrito en 2013. Última actualización: abril de 2013, por Rhiju Das (rhiju [at] stanford.edu).

Código y demo
=============

El código central de la aplicación *swa\_protein\_main* está en `       src/apps/swa/protein/swa_protein_main.cc      ` y en varios archivos de `       src/protocols/swa/      ` .

Para una demo de todo el flujo de trabajo y archivos de ejemplo, consulta:

`       demos/public/swa_protein_long_loop/      `

Referencias
==========

Das, R. (2013) "Atomic-accuracy prediction of protein loop structures enabled by an RNA-inspired ansatz", en revisión. [Preprint](http://dx.doi.org/10.1371/journal.pone.0074830) .

Consulta también:

Sripakdeevong, P., Kladwang, W., and Das, R. (2011) "An enumerative stepwise ansatz enables atomic-accuracy RNA loop modeling", PNAS 108:20573-20578. [Artículo](http://www.stanford.edu/~rhiju/Sripakdeevong_StepwiseAnsatz_2011.pdf) [Enlace](http://dx.doi.org/10.1073/pnas.1106516108)

Propósito de la aplicación
===========================================

Este código sirve para obtener modelos tridimensionales de novo de segmentos de proteína con precisión atómica, sin necesidad de información de entrada de las cadenas laterales circundantes. Esta documentación presenta el flujo de trabajo para loops de más de 4-5 residuos. Para loops cortos, consulta [[Construcción enumerativa de un loop de proteína [parte del modelado por ensamblaje stepwise]|swa-protein-main]].

Algoritmo
=========

El algoritmo construye un loop de novo construyendo fragmentos de un residuo en un residuo, desde el punto de despegue y desde el punto final, mediante una enumeración completa de la cadena principal en cada paso. Los modelos del loop de proteína completo se crean combinando exhaustivamente fragmentos N-terminales y C-terminales y sometiéndolos a cierre de cadena. Cada paso de reconstrucción de un solo residuo o de cierre de cadena es una llamada de Rosetta a `       swa_protein_main      `; estas llamadas se describen en [[Construcción enumerativa de un loop de proteína [parte del modelado por ensamblaje stepwise]|swa-protein-main]]. El flujo de trabajo se describe como un grafo acíclico dirigido (DAG) de trabajos de Rosetta con dependencias bien definidas.

Limitaciones
===========

-   Este método no enumera por completo todo el espacio conformacional de un loop, sino el subespacio al que se llega construyendo residuo a residuo en etapas que, a su vez, tienen baja energía [esta es nuestra hipótesis de trabajo, o Ansatz StepWise].

-   Se ha demostrado que este método alcanza precisión atómica para motivos pequeños (12 residuos o menos), incluidos casos que no se pueden resolver con otros enfoques de Rosetta, como el ensamblaje de fragmentos o el modelado de loops con KIC. Sin embargo, en varios casos el modelo con precisión atómica es uno de los cinco de menor energía, no el de energía más baja. Los problemas de la función de energía de Rosetta se hacen evidentes al discriminar los loops 'correctos' cuando el muestreo conformacional se realiza de forma exhaustiva.

-   Realizar el ensamblaje StepWise completo requiere un script maestro de Python para preparar el trabajo y otro script maestro de Python para poner en cola el cálculo resultante, que se describe como un grafo acíclico dirigido. Este flujo de trabajo completo se describe en documentación aparte [consulta [[Construcción enumerativa de un loop de proteína mediante recursión sistemática|swa-protein-long-loop]] ].

-   Como en la mayoría de los demás modos de Rosetta, no se garantiza que el conjunto final de modelos sea un conjunto de Boltzmann. Sin embargo, se espera que los modelos generados *sean* un conjunto completo de las configuraciones de menor energía que resultan de una búsqueda razonablemente completa del espacio conformacional.

-   No se está realizando minimización ni muestreo de tau [ángulo de enlace CA].

-   Este código no está totalmente integrado con los scripts de ensamblaje StepWise de RNA [consulta [[Modelado de loops de RNA (problema de llave y cerradura) con ensamblaje stepwise|swa-rna-loop]] ], aunque su desarrollo partió del código base compartido original. Los scripts de Python para ejecutar el flujo de trabajo completo son parecidos, pero no iguales. Es posible que estos códigos base se unifiquen en un futuro cercano para ayudar a abordar el modelado de RNA/proteína, como el del ribosoma.

Modos
=====

El ensamblaje stepwise se puede usar para reconstruir un loop interno o, más sencillamente, un loop terminal. Aquí se describirá el primer modo, por ser el caso de uso más común.

Preparación
=====

Debes definir una variable de entorno \$ROSETTA con tu directorio de Rosetta. Añade a tu .bashrc o .bash\_profile una línea como:

```
export ROSETTA='/Users/rhiju/src/rosetta/'   [change to your Rosetta directory]
```

También necesitas que tu sistema sepa dónde están los scripts de Python para generar el DAG y ejecutar los trabajos:

```
PATH=$PATH:$ROSETTA/rosetta/tools/SWA_protein_python/generate_dag/
PATH=$PATH:$ROSETTA/rosetta/tools/SWA_protein_python/run_dag_on_cluster/
```

Archivos de entrada
===========

Archivos requeridos
-------------

Solo necesitas dos archivos de entrada para ejecutar el modelado de loops con `       swa_protein_main      `:

-   El [[archivo fasta|fasta file]]: es el archivo de secuencia de tu modelo completo (proteína más loop construido).

-   El archivo PDB de entrada. No hay problema en introducirlo sin cadenas laterales y sin loops. También puedes incluir un loop de partida (sus longitudes y ángulos de enlace se usarán para todos los modelos).

Archivos adicionales opcionales:
--------------------------

-   Un archivo PDB nativo, si quieres RMSD de CA, de la cadena principal y de todos los átomos pesados.

-   Un archivo de disulfuros. ¡Importante para el empaquetado de cadenas laterales! Cada línea debe contener dos números por cada par de residuos unidos por un puente disulfuro.

Cómo incluir estos archivos.
---------------------------

Ejecutar el ensamblaje StepWise requiere preparar un DAG (grafo acíclico dirigido) con todos los comandos de Rosetta que se deben ejecutar.

Una línea de comando de ejemplo que reconstruye los residuos 3-8 sobre el andamio de knottina 2it7, al que se le han quitado el loop y todas las cadenas laterales de la proteína:

```
generate_swa_protein_dag.py  -loop_start_pdb noloop_2it7_stripsidechain.pdb  -native 2it7.pdb -fasta 2it7.fasta -cluster_radius 0.25 -final_number 1000   -denovo 1   -disulfide_file 2it7.disulf  -loop_res 3 4 5 6 7 8
```

Todos estos archivos de entrada están disponibles en el subdirectorio `       rosetta_inputs/      ` del directorio de demos de Rosetta mencionado arriba.

Las salidas son:

-   `        protein_build.dag       `: archivo de texto que describe todos los trabajos, los comandos de preprocesamiento y de scripts de preprocesamiento, y sus dependencias. En formato condor DAGMAN.

-   `        CONDOR/       `: directorio con las definiciones de los trabajos, en un formato similar al de definición de trabajos de condor.

-   `        REGION_3_2/, REGION_4_2/, ...       `: directorios que contendrán las salidas de cada trabajo de Rosetta. Los números corresponden al residuo N-terminal del fragmento de loop que parte del extremo C-terminal del loop y al residuo C-terminal del fragmento de loop que parte del punto de despegue N-terminal del loop. REGION\_3\_2 corresponde a modelos en los que los fragmentos del loop se han encontrado en el límite entre los residuos 2 y 3.

Ejecución en un clúster
--------------------

En clústeres con condor, puedes ejecutar el DAG anterior con el comando:

```
condor_dagman protein_build.dag
```

Hemos comprobado que `       condor_dagman      ` es extraordinariamente lento, por desgracia. Otro problema es que, por ahora, no hay una buena solución universal para ejecutar DAG en clústeres, aunque paquetes como Pegasus y las versiones más nuevas de Hadoop parecen prometedores.

Para nuestros propios fines, hemos desarrollado scripts de Python internos [disponibles en `       rosetta/tools/SWA_protein_python/run_dag_on_cluster/      ` ] para ejecutar los trabajos arrancando un nodo maestro que puede poner trabajos en cola para nodos esclavos. Más recientemente hemos usado colas PBS/torque ('qsub'), y puedes ejecutar los trabajos con 100 núcleos con el comando:

```
 qsub README_QSUB
```

que pondrá en cola desde un nodo maestro:

```
 SWA_pseudo_dagman_continuous.py -j 100 protein_build.dag  > SWA_pseudo_dagman_continuous.out 2> SWA_pseudo_dagman_continuous.err
```

También se está desarrollando soporte para clústeres LSF y colas MPI. Contacta con rhiju [at] stanford.edu si tienes preguntas o sugerencias para admitir sistemas de colas más generales. O, si quieres un posdoctorado o una colaboración para lograr que este código sea fácil de ejecutar en cualquier clúster, optimizar su velocidad y aplicarlo a una variedad de problemas prácticos y fundamentales de predicción de estructura de proteínas, ¡contáctanos!

El código tarda unas 4 horas en generar modelos de loops si usas 100 núcleos. Obtenemos un 'silent file' con todos los modelos, `       2it7_rebuild.out      ` .

Para extraer modelos de un silent file, puedes usar el comando habitual de Rosetta `       extract_pdbs      `:

```
extract_pdbs -in:file:silent region_FINAL.out -tags S_0
```

Salidas esperadas
================

De la ejecución anterior obtenemos un 'silent file' con todos los modelos, `       region_FINAL.out      ` .

Opciones
=======

A continuación están las opciones

```
Required:
-fasta                                           Fasta-formatted sequence file. [File]
-start_pdb                                       Input PDB with starting model -- cannot have loop present.
-loop_res                                        Positions that need to be rebuilt.

Commonly used options
-native                                          Native PDB filename. [File].
-disulfide_file                                  Specify disulfide-bonded pairs explicitly, including any involving loop residues.
-loop_force_Nsquared                             In SWA buildup, model stages with partial fragments reaching from N-terminus and
                                                   from C-terminus. Default is to <em>not</em> do this, keeping models with buildup from one end
                                                   or from other end, but not both, and closing chain in middle -- cannot capture
                                                   'hairpin' like loops where contacts within loop are important. Turning
                                                   on -loop_force_Nsquared increases the number of stages as N^2 rather than N, where
                                                   N is the number of residues in the loop.
-rmsd_screen                                     Only keep models with backbone RMSD [N,CA,C,O] within this cutoff useful for
                                                  agressive sampling near PDB specified by -native.

Less commonly used options
-cst_file                                        Constraint file in classic Rosetta format for atom-pairs. Use 'global numbering'.
-cluster:radius                                  How finely to cluster loops (based on backbone RMSD) before minimizing and again
                                                  before output. In Angstroms. Default 0.25 A is reasonable for long loops.
-N_SAMPLE                                        Number of 'rotamers' in phi or psi torsion angles. Default is 18, corresponding to
                                                  360/18 = 20 degree increments
-nstruct                                         Maximum number of models to make. default: 400. [Integer]
-cst_file                                        Constraint file in classic Rosetta format for atom-pairs. Use 'global numbering'.
-no_ccd                                          Do not close chains with CCD moves.
-do_kic                                          Also try to close chains by analytical loop closure (KIC-like); does not appear
-disable_sampling_of_loop_takeoff                Do not sample psi at take off point or phi at end point. [use if trying to match
                                                  previous work with KIC loop modeling.]
                                                  effective compared to CCD above.
```

Cómo incluir restricciones
---------------------

Puede ser útil, en ejecuciones que refinan una estructura (por ejemplo, la estructura experimental) o en modelado por homología, para mantenerse cerca de una estructura de partida. Puedes generar un archivo de restricciones así:

```
generate_CA_constraints.py 2it7.pdb -cst_res 3-8 -coord_cst -anchor_res 1 -fade > 2it7_coordinate2.0.cst
```

Este script de Python está disponible en `       rosetta/tools/SWA_protein_python/generate_dag/      `, que ya debería estar en tu PATH.

Para incorporarlo al modelado de loops anterior, incluye en la línea de comando de `       generate_swa_protein_dag.py      ` la opción `       -cst_file 2it7_coordinate2.0.cst      `

Novedades desde la última versión
=============================

Esta documentación se ha añadido al mismo tiempo que la publicación de la demo [después de Rosetta 3.5].

##Véase también

* [[Volver a la página principal de la aplicación de ensamblaje stepwise para proteínas|swa-protein-main]]
* [[Modelado de loops de RNA con ensamblaje stepwise|swa-rna-loop]]
* [[Aplicación Stepwise MonteCarlo|stepwise]]
* [[Visión general de las clases de Stepwise|stepwise-classes-overview]]
* [[Structure prediction applications]]: Incluye enlaces a estas y otras aplicaciones de modelado de loops
* [[RosettaScripts]]: La página de inicio de RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
