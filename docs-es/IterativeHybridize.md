#Iterative Hybridize: protocolo de refinamiento de modelos de proteínas

## Metadatos

Documentación de Hahnbeom Park (hahnbeom@u.washington.edu)

## Propósito

Este protocolo realiza un refinamiento de estructura a gran escala a partir de un conjunto de
* estructuras de modelos por homología o
* modelos ab initio de novo relativamente convergidos.

HybridizeMover funciona como unidad básica de muestreo durante todo el proceso iterativo de optimización global de la energía. Por defecto, la función objetivo de la optimización global es la energía de todos los átomos de Rosetta, pero también se pueden incorporar restricciones definidas por el usuario (por ejemplo, restricciones de coevolución) como suma ponderada de la puntuación total.

## Referencias

[Protein structure determination using metagenome sequence data]
(http://science.sciencemag.org/content/355/6322/294). 
Sergey Ovchinnikov, Hahnbeom Park, Neha Varghese, Po-Ssu Huang, Georgios A. Pavlopoulos, David E. Kim, Hetunandan Kamisetty, Nikos C. Kyrpides, David Baker. 
Science 2017, 355:294-298.

[Protein homology model refinement by large scale energy optimization]
(http://www.pnas.org/content/115/12/3054).
Hahnbeom Park, Sergey Ovchinnikov, David E Kim, Frank DiMaio, and David Baker. 
Proc Natl Acad Sci USA 2018. 

## Algoritmo

El conjunto formado por la aplicación de Rosetta y el script maestro en Python realiza un refinamiento estructural inspirado en los algoritmos genéticos. Los conceptos clave de un algoritmo genético son: a) la selección de padres; b) las operaciones de cruce o de mutación (estructural) para generar, a partir de esos padres, nuevos conjuntos de estructuras descendientes; c) el control del conjunto tras generar nuevas estructuras; y d) opcionalmente, la lógica para evitar la convergencia prematura, es decir, para mantener una diversidad estructural suficiente durante el procedimiento. La aplicación y el script contienen lógica tomada del Conformational Space Annealing (CSA), como el recocido del umbral de distancia para el agrupamiento a medida que avanzan las iteraciones y la selección de padres según el número de veces que se han usado sin descubrir una nueva estructura competitiva (nuse), lo que mejora a), c) y d) respecto de los algoritmos genéticos típicos. Las operaciones estructurales, b), se basan sobre todo en HybridizeMover, que está optimizado para operaciones estructurales de tipo cruce en problemas de modelado por homología.

## Ejecutar el protocolo IterativeHybridize

### Descripción general

Paso 0. Etapa de diversificación
Genera modelos "relativamente" diversos (es decir, que compartan la misma topología pero no estén demasiado cerca)
: no forma parte de esta documentación, ya que hay varios métodos posibles para hacerlo 

Paso 1. Etapa de evolución
itera N veces el proceso siguiente (normalmente n~50)
- Selecciona Padres del conjunto de estructuras
- Aplica Hybridize a los padres dados
- Selecciona el siguiente conjunto a partir de los Padres y los conjuntos de estructuras recién generadas

### Selección de modelos a partir de estructuras iniciales diversas 
Es necesaria para comenzar la primera iteración. Línea de comandos con la aplicación pública de Rosetta:

    $ROSETTA/main/source/bin/iterhybrid_selector.linuxgccrelease \
    -in:file:silent $1 -in:file:template_pdb $2 -cm:similarity_cut $3 \
    -out:file:silent ref.out -out:nstruct $4 \
    -out:prefix iter0 -score:weights ref2015_cart \
    -silent_read_through_errors -in:file:silent_struct_type binary -out:file:silent_struct_type binary -mute core basic \

    (optional.1 for rescoring with restraints) -cst_fa_file fa.cst -set_weights atom_pair_constraint 1.0
    (optional.2 for dumping adaptive cst) -constraint:dump_cst_set cen.pair.cst
    (optional.3 for deformation penalty) -cm:refsimilarity_cut $5 
    (optional.4 for quota setup for each input silent, should match number of input silents) -cm:quota_per_silent 0.7 0.3 

* $1: lista de silent files que contienen modelos diversos
* $2: estructura "de referencia" de entrada (obligatoria; suele ser un modelo basado en plantilla y es necesaria para restringir la búsqueda a su alrededor)
* $3: se recomienda 0.2; distancia mutua mínima para las estructuras seleccionadas, que va de 0 (idénticas) a 1 (completamente distintas), donde la fórmula es 1 - Sscore; Sscore es una métrica inversa al RMSD y tiene una escala muy similar al TM-score
* $4: se recomienda entre 30 y 50; tamaño del conjunto de estructuras
* $5, opcional: Similitud con la estructura de referencia estimada, en escala GDT-HA; se aplica una penalización si alguna estructura se vuelve menos similar a la estructura de referencia que este valor; por defecto es 25.0

* IMPORTANTE: **"-out:prefix iter0"** es necesario para reformatear el silent de entrada de modo que IterationMaster.py pueda leerlo. Comprueba que hayas incluido bien esta opción si obtienes el mensaje de error "ERROR: pdbs not extracted correctly!".
* NOTA: Al añadir "-constraint:dump_cst_set cen.pair.cst", la aplicación genera un conjunto de restricciones por defecto para el proceso iterativo siguiente, derivado de las regiones convergidas del conjunto de estructuras. Se recomienda para los usuarios que no tengan su propio archivo de restricciones personalizado.

### Generar restricciones adaptativas a partir de un conjunto de estructuras

Véase optional.2 más arriba. 

### Ejecutar el proceso iterativo
Todos los scripts de python/bash necesarios para el proceso iterativo se encuentran en:

    $Rosetta/main/source/scripts/python/public/iterative_hybridize/

Copia los archivos de ese directorio a donde te resulte cómodo (por ejemplo, $SCRIPTDIR). 
Prepara estos archivos y cópialos al directorio de trabajo; ten en cuenta que los nombres de archivo deben COINCIDIR EXACTAMENTE.

    * init.pdb : Reference structure (e.g. homology model) in pdb format
    * input.fa : sequence in fasta format
    * t000_.3mers, t000_.9mers: Rosetta fragment library files
      (please refer to https://www.rosettacommons.org/docs/wiki/application_documentation/utilities/app-fragment-picker for picking fragments)

    * cen.cst, fa.cst : Rosetta restraint file used at centroid / full-atom stage
                        See above "Generating adaptive restraints from pool of structures". 
                        "fa.cst" is used for model ranking during process and can be ignored.

    * ref.out : Rosetta silent file containing pool of structures for evolutionary algorithm. 
                Size of pool during evolutionary process follows number of structures in this file.

Una vez preparados los archivos, ejecuta la siguiente línea de comandos (para las opciones por defecto):

    python $SCRIPTDIR/IterationMaster.py -iha [model accuracy] -nodefile [nodefile] >& iterhyb.log

    * model accuracy : % in GDT-HA scale; 
                      (20/40/60) mean (completely wrong / roughly correct / correct)
    * nodefile: a text file containing nodes to distribute; 
      using 4 cores at n001 will be like:

      n001
      n001
      n001
      n001

Más opciones:

    -native [pdb]  # native structure for monitoring model accuracy during process
    -debug         # turn on debug mode
    -niter [int]   # number of iterations, default=50
    -simple        # run simpler protocol with predefined options
                   # used for Robetta server & refinement w/ co-evolution data
    -mulfactor_phase0 [int] # scale factor for number of sampling at initial phase; 
                            # default=2 (twice more at beginning) 
#### Selección de modelos a partir de los Padres y las estructuras nuevas (después de cada iteración)

Línea de comandos con la aplicación pública de Rosetta:

    $ROSETTA/main/source/bin/iterhybrid_selector.linuxgccrelease \
    -in:file:silent $1 \
    -in:file:template_pdb $2 \
    -in:file:template_silent $6 -similarity_cut $3 -cm:similarity_limit 0.2 \
    -out:nstruct $4 -out:file:silent sel.out \
    -out:prefix iter.$niter \
    -silent_read_through_errors -in:file:silent_struct_type binary -out:file:silent_struct_type binary -mute core basic

    (optional.1 for rescoring) -score:weights ref2015_cart -cst_fa_file fa.cst -set_weights atom_pair_constraint 1.0
    (optional.2 for dumping adaptive cst) -constraint:dump_cst_set cen.pair.cst
    (optional.3 for deformation penalty) -cm:refsimilarity_cut $5 
    (optional.4 for parent information update) -cm:seeds $7

* $1 ~ $5: misma descripción que en "Selección de modelos a partir de estructuras iniciales diversas"; aquí $1 es el conjunto de padres
* $6: el conjunto de estructuras recién generadas, en formato silent
* $7: actualiza qué estructuras del conjunto de Padres han servido como Padres; para invocar esta opción, el silent de padres ($1) debe tener la columna "poolid"
* $niter: índice de la siguiente iteración (por ejemplo, iter2)

### Posprocesamiento

Los modelos de salida de cada iteración siempre se agrupan y se ordenan según su energía (más la restricción de todos los átomos, si se proporciona), por lo que elegir el modelo o modelos de menor índice es la forma más directa de seleccionar modelos representativos. Estos "model[1-5].pdb" se encuentran en "workdir/iter_[niter]/" si todo el proceso terminó con normalidad.

Como alternativa, se puede promediar la estructura sobre toda la trayectoria:

    cat iter_*/gen.out > gen.total.out

    $ROSETTA/main/source/bin/avrg_silent.linuxgccrelease -database $ROSETTADB \
    -in:file:template_pdb iter_[niter]/model1.pdb -out:prefix avrg \
    -cm:similarity_cut 0.5 \
    -in:file:silent gen.total.out -silent_read_through_errors > avrg.log

"avrg.relaxed.pdb", generado después de este comando, es un modelo promediado estructuralmente y regularizado. -cm:similarity_cut usa la misma métrica de distancia estructural descrita para la aplicación iterhybrid_selector; cuanto menor es, más cercanas son las estructuras; aproximadamente, 0.2 corresponde a similitud a nivel de familia y 0.6 a similitud a nivel de plegamiento.

Consulta [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta

### Otros consejos

## Véase también

* Documentación de [[RosettaScripts]]
* [[RosettaCM]] : protocolo de modelado por homología de Rosetta
* [[HybridizeMover]]: el Hybridize Mover que usa RosettaCM
* [[Structure prediction applications]]: lista de otras aplicaciones que se pueden usar para la predicción de estructura
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de ejemplos de líneas de comando para ejecutar archivos ejecutables de Rosetta