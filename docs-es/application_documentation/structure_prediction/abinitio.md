# Abinitio

Puedes encontrar un tutorial introductorio sobre _ab initio_ [aquí](https://www.rosettacommons.org/demos/latest/tutorials/denovo_structure_prediction/Denovo_structure_prediction). Un tutorial sobre plegamiento de proteínas con el broker está [aquí](https://www.rosettacommons.org/demos/latest/tutorials/advanced_denovo_structure_prediction/folding_tutorial)

## Algoritmo básico, FragmentSampler

El ensamblaje de fragmentos avanza en 4 etapas que se distinguen sobre todo por la ScoreFunction y el tamaño de fragmento que se aplican durante los movimientos de prueba. La tercera etapa se divide en dos subetapas, IIIa y IIIb. Los conjuntos de pesos para crear las ScoreFunctions están guardados en la base de datos de Rosetta con los nombres `score0`, `score1`, `score2`, `score5` y `score3`, para las etapas 1, 2, 3a, 3b y 4, respectivamente. Para modificar la puntuación durante las etapas de ensamblaje hay que proporcionar un parche de puntuación con las opciones `-abinitio:stageX_patch file.wts_patch`, donde X = 1, 2, 3a, 3b o 4, respectivamente, y file.wts_patch es un archivo que contiene el parche. No existe una única opción para parchear a la vez las ScoreFunctions de todas las etapas.

El protocolo de ensamblaje de fragmentos ejecuta por lo general un bloque de movimientos de prueba con fragmentos (el tamaño de bloque estándar es de 2000 ciclos) y luego devuelve la conformación que dio la energía más baja durante esos ciclos. Las etapas I y II ejecutan cada una 1 bloque de 2000 ciclos. En la etapa III se ejecutan 10 bloques de 2000 ciclos, alternando entre los modos IIIa y IIIb. En la etapa IV se ejecutan 3 bloques de 4000 ciclos. El número de ciclos se puede aumentar de forma global con la opción `-increase_cycles X`, de modo que los nuevos números de ciclos pasan a ser 2000\*X y 4000\*X, respectivamente.

Los movimientos de prueba usan fragmentos grandes en las etapas I, II y III, y fragmentos pequeños en la etapa IV, y los gestiona el ClassicFragmentMover. En los bloques 2 y 3 de la etapa IV se usa un SmoothFragmentMover, que prefiere los movimientos de fragmento con poca perturbación aguas abajo. La cantidad de perturbación aguas abajo se cuantifica con la métrica GunnCost.

La opción `-abinitio:skip_stages [1,2,3,4]` permite especificar una lista de etapas que se omiten durante el proceso de ensamblaje de fragmentos. El comportamiento estándar es recuperar el Pose de menor puntuación después de cada bloque de ciclos. Este comportamiento se puede cambiar enumerando explícitamente las etapas en las que debe hacerse una recuperación con la opción `-abinitio:recover_low_instages [1,2,3,4]`.

## Algoritmo con restricciones de plegamiento, ConstraintFragmentSampler

Se hacen algunos cambios y adiciones al algoritmo básico para mejorar el rendimiento cuando hay restricciones.

Las restricciones de distancia y las penalizaciones de ruptura de cadena (jumping) se activan según su separación en la secuencia, es decir, el número mínimo de residuos que hay que recorrer en el [[FoldTree|FoldTree overview]] para llegar de un residuo al otro. El primer bloque de ciclos de la etapa I comienza con una separación máxima en la secuencia de 3 residuos. Después, este umbral aumenta en pasos de dos residuos hasta alcanzar una separación máxima en la secuencia del 15 % (`-fold_cst::seq_sep_stages`) de la longitud total de la proteína. Después de cada incremento se muestrea un bloque de ciclos de la etapa I. Esta es una de las razones por las que el algoritmo con restricciones es más lento en proteínas grandes (hay muchos incrementos hasta llegar al 15 %...).
En las etapas siguientes, el umbral de separación en la secuencia se eleva poco a poco hasta el 100 % (`-fold_cst::seq_sep_stages`), pero no se usan ciclos de muestreo adicionales.

Si se usa jumping de láminas beta, las penalizaciones de ruptura de cadena se tratan de forma similar a las restricciones de distancia, de modo que se activan o desactivan según el umbral de separación en la secuencia; además, los pesos de ruptura de cadena (chainbreak) de la `ScoreFunction` se pueden ir elevando gradualmente (`-jumping:ramp_chainbreaks`).

##  Opciones (Abinitio)

Una aplicación que usa el protocolo abinitio y se inicia, por ejemplo, en el directorio `rosetta_demos/abinitio/` leería las siguientes opciones:

### Opciones de entrada
```
-in:file:native ./input_files/1elw.pdb 	                Native structure (optional)
-in:file:fasta ./input_files/1elwA.fasta 	        Protein sequence in fasta format (required)
-in:file:frag3 ./input_files/aa1elwA03_05.200_v1_3 	Fragment library: 3-residue fragments (required)
-in:file:frag9 ./input_files/aa1elwA09_05.200_v1_3 	Fragment library: 9-residue fragments (required)
-database path/to/rosetta/main/database 	        Path to rosetta database (required if not ROSETTA3_DB environment variable is set)
```

### Opciones de salida
```
-nstruct 1 	                        Number of output structures (default=1).
-out:file:silent 1elwA_silent.out 	Use silent file output, use filename after this flag (default=default.out).
(or -out:pdb) 	                        Use PDB file output (default=false).
-out:path /my/path 	                Path where PDB output files will be written to (default='.').
```

### Opciones algorítmicas

Estas opciones están implementadas en `FragmentSampler.cc`

Hay varios ajustes opcionales. Los que se han probado y comparado en profundidad para obtener un rendimiento óptimo llevan el comentario «recommended»:
```
-abinitio::increase_cycles 10 	Increase the number of cycles at each stage in ab initio by this factor (recommended).
-abinitio:rg_reweight 0.5 	Reweight contribution of radius of gyration to total score by this scale factor (recommended).
-abinitio:rsd_wt_helix 0.5 	Reweight env,pair,cb for helix residues by this factor (recommended).
-abinitio:rsd_wt_loop 0.5 	Reweight env,pair,cb for loop residues by this factor (recommended).
-abinitio:stage1_patch 	        Supply patch file for the score0 ScoreFunction used in Stage1
-abinitio:stage2_patch 	        Supply patch file for the score1 ScoreFunction used in Stage2
-abinitio:stage3a_patch 	Supply patch file for the score2 ScoreFunction used in Stage3
-abinitio:stage3b_patch 	Supply patch file for the score5 ScoreFunction used in Stage3
-abinitio:stage4_patch 	        Supply patch file for the score3 ScoreFunction used in Stage4
-abinitio:skip_stages 1 2 3 4 	list all stages (1-4) that should be skipped (default=None)
-abinitio:recover_low_in_stages 1 2 3 4     after the sampling cycles of a given block are finished the 
                                            lowest scoring pose recorded during the sampling is recovered,
                                            use this flag to switch this off for individual stages
```

### Opciones de restricciones y jumping

Estas opciones están implementadas en `ConstraintFragmentSampler.cc`
```
-constraints:cst_weight 1.0 	                Patches the weight for the ScoreType atom_pair_constraint in
                                                all scores (score0, score1, score2, score5 and score3) used
                                                for abinitio. This change is applied after patching via
                                                -stageX_patch.
-fold_cst:seq_sep_stages f1 f2 f3 	        Restraints and chainbreak-penalties are considered based on
                                                their sequence separation. The maximum sequence separation an
                                                active restraint can have is slowly ramped up. The target values
                                                for the ramping can be controlled for the end-points of stage
                                                2, 3 and 4, and are given as fraction of total length of
                                                protein (default=0.15, 1.0, 1.2).
-fold_cst:skip_on_noviolation_in_stage1         In Stage1 the maximum restraint sequence separation is incremented 
                                                in steps of 2 residues. After each increment a block of sampling 
                                                cycles is performed. This option allows to terminate (or skip) 
                                                sampling no restraint is violated at a given time.
-constraint:threshold 	                        control the threshold above which a constraint is violated (default=1).
-fold_cst:no_recover_low_at_constraint_switch 	When new constraints are turned (seq_sep_stages) the MonteCarlo object
                                                has to be reset and the previously found lowest energy pose will be lost.
                                                To avoid loosing this information, we usually carry out a recover_low
                                                before switching on new constraints. Use this flag to avoid this extra
                                                recover_low.
-jumps:ramp_chainbreaks 	                smoothly ramp up the weights for ScoreTypes linear_chainbreak and
                                                overlap_chainbreak (recommended, default=true).
-jumps:increase_chainbreak 	                factor for the ramping of chainbreaks (default=1.0).
-jumps:overlap_chainbreak 	                use the overlap chainbreak in stage4 (recommended, default=false).
-jumps:chainbreak_weight_stage1 	        Set the weight for ScoreType linear_chainbreak for Stage1. 
                                                Irrelevant if ramping of chainbreaks is active.
-jumps:chainbreak_weight_stage2 	        Set the weight for ScoreType linear_chainbreak for Stage2. 
                                                Irrelevant if ramping of chainbreaks is active.
-jumps:chainbreak_weight_stage3 	        Set the weight for ScoreType linear_chainbreak for Stage3. 
                                                Irrelevant if ramping of chainbreaks is active.
-jumps:chainbreak_weight_stage4 	        Set the weight for ScoreType linear_chainbreak for Stage4. 
                                                Irrelevant if ramping of chainbreaks is active.
```

### Opciones de procesamiento

Para ejecutar varios trabajos en un clúster resultan útiles las siguientes opciones:

```
-constant_seed 	        Use a constant seed (1111111 unless specified with -jran)
-jran 1234567 	        Specify seed. Should be unique among jobs (requires -constant_seed)
-seed_offset 10 	This value will be added to the random number seed. Useful when using 
                        time as seed and submitting many jobs to a cluster. If jobs are started 
                        in the same second they will still have different initial seeds when using 
                        a unique offset. If using Condor (http://www.cs.wisc.edu/condor), the Condor 
                        process id, $(Process), can be used for this. 
                        For example "-seed_offset $(Process)" can be used in the condor submit file.
-run:dry_run 	        no sampling cycles, just initialize all objects (for testing, default=False)
-run:test_cycles 	only a single sampling cycle per stage (for testing, default=False)
```

## Código fuente 

El mover de nivel superior que codifica el protocolo abrelax se llama AbrelaxMover y reside en `main/source/src/protocols/abinitio`.

Este mover de nivel superior llama a los Movers del protocolo de ensamblaje de fragmentos (abinitio) y del protocolo relax. Si se usa jumping de láminas beta, hay que cerrar las rupturas de cadena no naturales, y el AbrelaxMover usará los protocolos de cierre de loops e idealización antes de la etapa de relax.

El protocolo de ensamblaje de fragmentos está codificado en los Movers FragmentSampler y en su clase derivada ConstraintFragmentSampler, que residen en `main/source/src/protocols/abinitio`.

El AbrelaxMover trabaja en estrecha colaboración con el módulo [[TopologyBroker|BrokeredEnvironment]], que reside en `main/source/src/protocols/topology_broker`. El módulo TopologyBroker se encarga de introducir las restricciones y luego determina la cinemática de las láminas beta mediante sus clases ConstraintClaimer y TemplateJumpClaimer, respectivamente.


#Véase también

* [Tutorial de ab initio](https://www.rosettacommons.org/demos/latest/tutorials/denovo_structure_prediction/Denovo_structure_prediction)
* [Plegamiento de proteínas con el tutorial del Broker](https://www.rosettacommons.org/demos/latest/tutorials/advanced_denovo_structure_prediction/folding_tutorial)
* [[Abinitio relax]]: Página principal de esta aplicación
* [[Fasta file]]: Formato de archivo Fasta
* [[Fragment file]]: Formato de archivo de fragmentos (necesario para la predicción de estructura ab initio)
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura
  * [[NonlocalAbinitio]]: Aplicación para predecir la estructura de una proteína a partir de información estructural previa
  * [[Membrane abinitio]]: Ab initio para proteínas de membrana.  
  - [[Comparative modeling|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado (usa la aplicación minirosetta).
    * [[Minirosetta]]: Más información sobre la aplicación minirosetta.
  * [[Metalloprotein ab initio|metalloprotein-abrelax]]: Modelado ab initio de metaloproteínas.  
  - [[Backrub]]: Crea conjuntos de cadenas principales mediante cambios pequeños y locales en la cadena principal.  
  - [[Floppy tail]]: Predice estructuras de regiones largas y flexibles en el extremo N o C.
  - [[Fold-and-dock]]: Predice estructuras tridimensionales de homooligómeros simétricos.  
  - [[Molecular replacement protocols|mr-protocols]]: Usa Rosetta para construir modelos para el reemplazo molecular en cristalografía de rayos X.  
    * [[Prepare template for MR]]: Script de preparación para los protocolos de reemplazo molecular.  
  - [[Relax]]: Optimiza «localmente» las estructuras, incluida la asignación de posiciones de las cadenas laterales.
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
