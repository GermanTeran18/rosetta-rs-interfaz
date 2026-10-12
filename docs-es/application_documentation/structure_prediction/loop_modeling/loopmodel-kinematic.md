#Modelado cinemático de loops

#NOTA: KIC está obsoleto. Usa en su lugar [[next generation KIC]] o [[KIC con fragmentos|KIC_with_fragments]].

Metadatos
========

Autores: Daniel J. Mandell, Roland A. Pache, Amelie Stein

Este documento fue actualizado por última vez el 10 de octubre de 2012 por Amelie Stein. Los investigadores principales correspondientes a esta aplicación son Tanja Kortemme (kortemme@cgl.ucsf.edu) y Evangelos A. Coutsias (coutsias@unm.edu).

Puedes encontrar un tutorial introductorio sobre modelado de loops [aquí](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling).

Código y demo
=============

La aplicación actual para este método (en Rosetta 3.4) es `       bin/loopmodel.<my_os>gccrelease      ` . Los movers principales del protocolo son `       src/protocols/moves/KinematicMover      ` , que realiza una perturbación cinemática localizada de una cadena peptídica, `       src/protocols/loops/loop_mover/perturb/LoopMover_KIC      ` y `       src/protocols/loops/loop_mover/refine/LoopMover_KIC      ` , que envuelven el KinematicMover en un protocolo de Monte Carlo para el modelado de loops, y `       src/protocols/comparative_modeling/LoopRelaxMover      ` , que permite combinar los protocolos de LoopMover\_KIC con otros protocolos de modelado de loops. Un ejemplo básico de uso que remodela brevemente un loop de 8 residuos es la prueba de integración `       kinematic_looprelax      ` , que se encuentra en `       main/tests/integration/tests/kinematic_looprelax      ` .

Para reproducir los resultados de benchmark de los conjuntos de datos 1 y 2 del artículo de Mandell *et al.* (2009) (consulta la referencia más abajo), obtén del sistema subversion la revisión 24219 de Rosetta. En esta versión más antigua de Rosetta, la aplicación de modelado cinemático de loops es `       bin/loop_test.<my_os>gccrelease      ` . Al ser una aplicación piloto, para compilarla correctamente asegúrate de que en el archivo `       src/pilot_apps.src.settings.all      ` la aplicación `       loop_test      ` no esté comentada y luego compila Rosetta usando el script `       scons.py      ` de la distribución actual de Rosetta (Rosetta 3.3) con la línea de comandos

```
scons.py bin mode=release pilot_apps_all
```

Esta versión de la aplicación de modelado cinemático de loops también usa opciones distintas de las de la versión actual implementada en Rosetta 3.3 (consulta más abajo para más detalles).

Referencias
==========

Aquí puedes encontrar una descripción del protocolo de modelado cinemático de loops, los pasos geométricos que da el protocolo y resultados que muestran una precisión mediana de 0.9 Å en la reconstrucción *de novo* de 45 loops de 12 residuos en monómeros de proteínas, y una precisión similar al modelar cambios conformacionales de loops de interfaces de proteínas:

-   Mandell DJ, Coutsias EA, Kortemme T. (2009). Sub-angstrom accuracy in protein loop reconstruction by robotics-inspired conformational sampling. *Nature Methods* 6(8):551-2.

Puedes encontrar más detalles sobre los principios subyacentes del algoritmo de cierre cinemático aquí:

-   Coutsias EA, Seok C, Wester MJ, Dill KA. (2005). Resultants and loop closure. *International Journal of Quantum Chemistry* . 106(1), 176–189.

Aquí se describe una aplicación que usa KIC para predecir las secuencias toleradas en una interfaz anticuerpo-antígeno de alta afinidad:

-   Babor M, Mandell DJ, Kortemme T. (2010). Assessment of flexible backbone protein design methods for sequence library prediction in the therapeutic antibody Herceptin-HER2 interface. *Protein Sci.* . 20(6):1082-1089.

Propósito
=======

El cierre cinemático (KIC) es un cálculo analítico inspirado en técnicas de robótica para determinar con rapidez las posibles conformaciones de objetos enlazados sujetos a restricciones. En la implementación de KIC en Rosetta, 2 *N* - 6 torsiones de la cadena principal de un segmento peptídico de *N* residuos (llamadas torsiones no pivote) se fijan a valores extraídos al azar del espacio de Ramachandran de cada tipo de residuo, y las 6 torsiones phi/psi restantes (llamadas torsiones pivote) las resuelve KIC de forma analítica. Esta formulación permite muestrear con rapidez grandes espacios conformacionales. Si se fija `       -loops:vicinity_sampling      `, las torsiones no pivote se muestrean alrededor de sus valores iniciales en `       -loops:vicinity_degree      ` grados, para concentrar el muestreo en torno a la conformación inicial en lugar de extraer valores aleatorios de Ramachandran para perturbaciones mayores.

Los protocolos de modelado de loops KIC se usan para abordar uno de dos problemas generales:

-   **Reconstrucción de loops:** La predicción *de novo* de la conformación de un segmento peptídico a partir de su secuencia, en la que se descartan las conformaciones iniciales de la cadena principal y de las cadenas laterales
-   **Refinamiento de loops:** Encontrar conformaciones de baja energía para una conformación y una secuencia peptídicas dadas

Estos protocolos son útiles para varias tareas, como predecir conformaciones de loops en modelado comparativo, predecir cambios conformacionales por unión en interfaces proteína-proteína y pregenerar conformaciones de loops para docking con flexibilidad del receptor.

También es posible usar los protocolos KIC para varias aplicaciones nuevas (consulta [Novedades desde la última versión](#New-things-since-last-release) más abajo):

-   Modelado simultáneo de varios loops
-   Diseño iterativo con cadena principal flexible, en el que el diseño de secuencia y los movimientos de cadena principal KIC se intercalan
-   Generación de conjuntos conformacionales de proteínas completas, en los que los movimientos KIC se aplican a una estructura entera (no solo a segmentos de loop)

Aunque esta documentación habla de modelar regiones de loop, en la práctica los protocolos KIC se pueden aplicar a cualquier segmento de proteína de al menos 3 residuos de longitud.

Ejemplo de inicio rápido
===================

Las siguientes líneas de comandos realizarán una reconstrucción *de novo* de un loop de proteína (se descartarán las coordenadas iniciales y el loop se modelará desde cero), seguida de un refinamiento de todos los átomos con rotámeros adicionales. Para descartar las coordenadas iniciales del loop, asegúrate de que el campo «Extend loop» del archivo de definición de loops esté en '1' (consulta [Archivos de entrada](#Input-Files) ).

Con Rosetta 3.4:

```
rosetta/main/source/bin/loopmodel.<my_os>gccrelease -database <rosetta_database_path> -loops:remodel perturb_kic -loops:refine refine_kic -in:file:s <my_starting_structure>.pdb -in:file:fullatom -loops:loop_file <my_loopfile>.loop -nstruct <num_desired_models> -ex1 -ex2 -overwrite
```

Con la versión antigua de Rosetta (revisión 24219 de Rosetta) de la publicación original de Mandell *et al.* (2009, consulta [Referencias](#References) ):

```
rosetta/mini/bin/loop_test.<my_os>gccrelease -database <rosetta_database_path> -loops:kinematic -loops:nonpivot_torsion_sampling -loops:template_pdb <my_starting_structure>.pdb -in:file:fullatom -loops:loop_file <my_loopfile>.loop -nstruct <num_desired_models> -ex1 -ex2 -out:file:fullatom -overwrite
```

Protocolo
========

El protocolo de modelado de loops KIC tiene dos etapas: **remodel** , que se activa con `       -loops:remodel perturb_kic      ` y **refine** , que se activa con `       -loops:refine refine_kic      ` , y que pueden invocarse por separado o de forma secuencial mediante opciones de línea de comandos.

Descripción general de la etapa remodel
----------------------

La etapa remodel se usa para un muestreo rápido y amplio de conformaciones de la cadena principal, normalmente con el fin de remodelar o reconstruir segmentos peptídicos. En esta etapa se muestrean de forma independiente las conformaciones de la cadena principal de cada loop definido en el archivo de definición de loops, usando una representación reducida (centroid) de las cadenas laterales y la función de puntuación de baja resolución de Rosetta. Esta etapa se activa con `       -loops:remodel perturb_kic      ` . Si el campo «extend loop» de la definición del loop está en '1' (consulta [Archivos de entrada](#Input-Files) ), el loop se colocará primero en una conformación cerrada aleatoria con longitudes de enlace, ángulos de enlace y ángulos omega idealizados. En caso contrario, se usa como estructura inicial la conformación de entrada. Después, cada loop se somete a un único ciclo de Monte Carlo con recocido simulado.

Detalles de la etapa remodel
---------------------

Cada paso del ciclo de Monte Carlo de remodel consiste en un movimiento de cierre cinemático aplicado al loop, seguido de una minimización lineal de las torsiones phi/psi del loop y una prueba de aceptación con el criterio de Metropolis usando la función de puntuación de baja resolución `       score4L      ` de Rosetta. El número de pasos de Monte Carlo lo determina `       outer_cycles      ` \* `       inner_cycles      ` . El número de `       outer_cycles      ` se fija con `       -loops:refine_outer_cycles      ` . El número de ciclos internos es `       min( 1000, number_of_loop_residues * 20 )      ` , o se fija en `       -loops:max_inner_cycles      ` si se indica. Al final de cada ciclo externo, el Pose se establece en la conformación de menor energía observada hasta ese momento en la simulación, salvo que se fije la opción `       -loops:kic_recover_last      `, en cuyo caso la última conformación aceptada pasa al siguiente ciclo externo. Del primer paso al último, la temperatura disminuye exponencialmente de `       -loops:remodel_init_temp      ` a `       -loops:remodel_final_temp      ` .

Descripción general de la etapa refine
---------------------

La etapa refine se usa para encontrar conformaciones predichas de baja energía de un segmento peptídico, a partir de una conformación inicial. Esta etapa se puede usar, por ejemplo, para refinar modelos por homología o para permitir que las cadenas principales se ajusten en respuesta a mutaciones de secuencia. En esta etapa las cadenas laterales se representan con detalle de todos los átomos y, junto con las conformaciones de la cadena principal, se evalúan con la función de puntuación de alta resolución de Rosetta.

Detalles de la etapa refine
--------------------

La etapa refine usa la representación de todos los átomos de Rosetta y su función de puntuación de alta resolución ( `       score12      ` con un término de ruptura de cadena de mayor peso). Esta etapa se invoca con `       -loops:refine refine_kic      ` . Al comienzo de esta etapa, salvo que se indique la opción `       -loops:fix_natsc      `, todos los residuos dentro de la distancia de vecindad de un loop (definida por `       -loops:neighbor_dist      ` ) se reempaquetan y luego se someten a pruebas de rotámeros. Las cadenas principales de todos los residuos del loop, y las cadenas laterales de todos los residuos del loop y de sus vecinos, se someten luego a minimización de energía (con el algoritmo DFP). Si se fija `       -loops:fix_natsc      `, solo los residuos del loop (y no los vecinos) se someterán a reempaquetado, pruebas de rotámeros y minimización. En consecuencia, si esta etapa ha sido precedida por la etapa centroid y se omite la opción `       -loops:fix_natsc      `, las cadenas laterales que rodean al loop se optimizarán para la conformación perturbada del loop y no para la conformación inicial del loop, lo cual supone una tarea más difícil para fines de benchmark, ya que hay que reconstruir las cadenas laterales vecinas de tipo silvestre además de las conformaciones de la cadena principal y las cadenas laterales del loop. La simulación avanza entonces por un único ciclo de Monte Carlo con recocido simulado, con la misma programación que la etapa centroid, salvo que en cada ciclo interno se intentan dos rondas de movimientos de cierre cinemático y que, si no se fija `       -loops:max_inner_cycles      `, el número de ciclos internos es `       min( 200, 10 * total_number_loop_residues )      ` . Aquí, el número de residuos de loop incluye todas las definiciones de loop (si se definen varios loops), porque los movimientos de cierre cinemático de la etapa refine se aplican al azar a cualquiera de los loops. Después de cada movimiento cinemático, el loop y los residuos vecinos se someten a pruebas de rotámeros, y se aplica DFPmin a la cadena principal del loop y a las cadenas laterales del loop y de los vecinos. En cada `       repack_cycle      ` , que se fija con `       -loops:repack_period      ` , se reempaquetan todas las cadenas laterales del loop y de los vecinos. Para todas estas optimizaciones, si se fija la opción `       -loops:fix_natsc      `, los residuos vecinos permanecerán fijos y solo los residuos del loop se someterán a pruebas de rotámeros, minimización y reempaquetado. Del primer paso al último, la temperatura disminuye exponencialmente de `       -loops:refine_init_temp      ` a `       -loops:refine_final_temp      ` .

Uso del protocolo
--------------

Para la ***reconstrucción de novo*** de loops de proteínas, usa tanto `       -loops:remodel perturb_kic      ` como `       -loops:refine refine_kic      ` , con el campo «extend loop» del archivo de definición de loops en '1'.

Para el **refinamiento de loops** , usa solo `       -loops:refine refine_kic      ` .

Para más detalles sobre los pasos geométricos que da el solucionador cinemático subyacente, consulta el material suplementario de Mandell *et al.*, citado arriba.

En la revisión 24219 de Rosetta usada en la publicación original de Mandell *et al.* (2009, consulta [Referencias](#References) ), estas opciones todavía no existían. En su lugar, en esa versión de Rosetta hay una opción `       -loops:kinematic      ` , que activa el método KIC tanto en la etapa remodel como en la refine.

Limitaciones
===========

Por definición, los movimientos KIC son perturbaciones locales, así que los átomos C-alfa de los residuos inicial y final de las definiciones de loop permanecen fijos. Las definiciones de loop pueden incluir los extremos N y/o C de proteínas monoméricas, y los átomos C-alfa de los extremos permanecerán fijos (es decir, el modelado de loops KIC no se puede usar para muestrear las conformaciones de los propios residuos terminales sin añadir residuos «virtuales» a los extremos). Para definiciones terminales en complejos de proteínas, consulta la nota en *Generación de conjuntos de proteínas completas* en [Novedades desde la última versión](#New-things-since-last-release).

Archivos de entrada
===========

Los siguientes archivos son necesarios para el modelado cinemático de loops:

-   Archivo PDB inicial, especificado con `-in:file:s`. La estructura inicial debe tener coordenadas reales para todos los residuos fuera de la definición del loop, además del primer y el último residuo de cada región de loop. En la revisión 24219 de Rosetta usada en la publicación original de Mandell *et al.* (2009, consulta [Referencias](#References) ), esta opción se llama en cambio `        -loops:template_pdb       ` .

-   Archivo de definición de loops, especificado con `        loops:loop_file       ` y compartido por todos los protocolos de modelado de loops. Para cada loop que se vaya a modelar, incluye lo siguiente en una línea:

    ```
    column1  "LOOP":     The loop file identify tag
    column2  "integer":  Loop start residue number
    column3  "integer":  Loop end residue number
    column4  "integer":  Cut point residue number, >=startRes, <=endRes. default - let the loop modeling code choose cutpoint. 
                         Note: Setting the cut point outside the loop can lead to a segmentation fault. 
    column5  "float":    Skip rate. default - never skip
    column6  "boolean":  Extend loop. Default false. Setting this flag to 1 leads to randomization of the loop conformation before KIC sampling, 
                         using idealized bond lengths and angles. This is important for loop reconstruction benchmarks to ensure a starting loop 
                         conformation that is different from the original one, as well as for <em>de novo</em> loop construction/insertion with KIC, 
                         to create a connected starting loop conformation from single unconnected loop residues 
                         (see tutorial at rosetta/demos/public/model_missing_loop/). 
    ```

    Puedes encontrar un ejemplo de archivo de definición de loops en `        test/integration/tests/kinematic_looprelax/input/4fxn.loop       ` , que tiene este aspecto:

    ```
    LOOP 88 95 92 0 1
    ```

**NOTA:** Los índices de residuos en los archivos de definición de loops se refieren a la *numeración de Rosetta* (numerada de forma continua desde '1', incluso entre cadenas en proteínas de varias cadenas). Puede ser útil renumerar las estructuras iniciales con la numeración de Rosetta para que las definiciones de loop y los índices de residuos del PDB coincidan.

Opciones
=======

-   Las siguientes opciones sirven para activar KIC y deben estar presentes en la línea de comandos (se requiere una de las dos, o ambas, entre `        -loops:remodel       ` y `        -loops:refine       `):

    ```
    -database                       Path to the Rosetta database. [Path]
    -loops:remodel                  Selects a protocol for the centroid remodeling stage.
                                    Legal values: 'perturb_kic','perturb_ccd','quick_ccd','quick_ccd_moves','old_loop_relax','no'.
                                    default = 'quick_ccd'. For KIC, use 'perturb_kic'. [String]
    -loops:refine                   Selects the all-atom refinement stage protocol.
                                    Legal values: 'refine_kic','refine_ccd','no'. default = 'no'. For KIC, use 'refine_kic'. [String]
    -loops:loop_file                Path/name of loop definition file. default = 'loop_file'. [File]
    ```

-   Las siguientes opciones generales de Rosetta se usan habitualmente con KIC:

    ```
    -in:file:s                      Path/name of input pdb file. [File]
    -in:file:native                 Path/name of native pdb file. Backbone rmsd to this structure will be reported in each output decoy.
                                    If no native structure is provided, the protocol will return an rmsd of 0. [File]
    -in:file:fullatom               Read the input structure in full-atom mode. Set this flag to avoid discarding the native side chains and repacking the input structure
                                    before modeling (KIC refine alway begins by repacking the loop side-chains,
                                    including the neighboring side-chains if -loops:fix_natsc is 'false'). default = 'false'. [Boolean]
    -loops:fix_natsc                Don't repack, rotamer trial, or minimize loop residue neighbors. default = 'false'. [Bolean]
    -ex1 (-ex2, -ex3, -ex4)         Include extra chi1 rotamers (or also chi2, chi3, chi4). Using -ex1 -ex2 improves benchmark performance.  
    -extrachi_cutoff 0              Set to 0 to include extra rotamers regardless of number of neighbors
    -extra_res_cen                  Path to centroid parameters file for non-protein atoms or ligands. Note that this is required for structures with ligands even if only full-atom remodeling is performed.
    -extra_res_fa                   Path to all-atom parameters file for non-protein atoms or ligands
    -overwrite                      Overwrite existing models (Rosetta will not output without this flag if same-named model exists)
    -out:pdb_gz                     Create compressed output PDB files (using gzip), which saves a lot of space. These files can still be 
                                    visualized normally with software such as Pymol. 
    ```

-   Las siguientes opciones «avanzadas» pueden usarse para personalizar el comportamiento de KIC:

    ```
    -loops:cen_weights          Centroid weight set to be used; use of smooth weights is strongly recommended when bicubic interpolation is used, which is now active by default. [String]
    -loops:cen_patch            Optional patch for centroid weights. [String]
    -loops:neighbor_dist            Only optimize side-chains with C-beta atoms within this many angstroms of any loop C-beta atom.
                                    default = '10.0'. To speed up runs, try '6.0'. [Float]
    -loops:vicinity_sampling        Sample non-pivot torsions within a vicinity of their input values. default = 'false'.
                                    For a description of pivot and non-pivot torsions, please see Purpose, above. [Boolean]
    -loops:vicinity_degree          Number of degrees allowed to deviate from current non-pivot torsions when using vicinity sampling
                                    (smaller number makes tighter sampling). default = '1.0'. [Float]
    -loops:kic_max_seglen           Maximum number of residues in a KIC move segment. default = '12'. [Integer]
    -loops:remodel_init_temp        Initial temperature for simulated annealing in 'perturb_kic'. default = '2.0'. [Float]
    -loops:remodel_final_temp       Final temperature for simulated annealing in 'perturb_kic'. default = '1.0'. [Float]
    -loops:refine_init_temp         Initial temperature for simulated annealing in 'refine_kic'. default = '1.5'. [Float]
    -loops:refine_final_temp        Final temperature for simulated annealing in 'refine_kic'. default = '0.5'. [Float]
    -loops:max_kic_build_attempts   Number of times to attempt initial closure in 'perturb_kic' protocol.
                                    Try increasing to 1000000 if initial closure is failing. default = 10000. [Integer]
    -loops:refine_outer_cycles             Number of outer cycles for Monte Carlo (described above in Protocol). default = '3'. [Integer]
    -loops:max_inner_cycles         Maximum number of inner cycles for Monte Carlo (default described above in Protocol). [Integer]
    -loops:kic_recover_last         Keep the last sampled conformation at the end of each outer cycle instead of the lowest
                                    energy conformation sampled so far. default = 'false'. [Boolean]
    -loops:optimize_only_kic_
    region_sidechains_after_move    Should rotamer trials and minimization be performed after every KIC move but only within the
                                    loops:neighbor_dist of the residues in the moved KIC segment. Speeds up execution when using very
                                    large loop definitions (such as when whole chains are used for ensemble generation).
                                    default = 'false'. [Boolean]
    -loops:fast                     Signifcantly reduces the number of inner cycles. For quick testing, not production runs.
                                    default = 'false'. [Boolean]
    -run:test_cycles                Sets the number of outer cycles and inner cycles to 3. For extremely quick testing and
                                    sanity checks, not for production runs. default = 'false'. [Boolean]
    ```

-   Opciones específicas de la revisión 24219 de Rosetta usada en la publicación original de Mandell *et al.* (2009, consulta [[Referencias|next-generation-KIC#kic_refs]] ):

    ```
    -loops:template_pdb             Path/name of input pdb file.  [File]
    -loops:kinematic                Activates the KIC method for both remodel and refine stages. 
    -loops:output_pdb               Definition of the output path and PDB prefix. Note: In this old version of Rosetta, the 
                                    -out:pdb_gz and -out:path flags don't work. 
    ```

    **NOTA:** En esta versión antigua del protocolo KIC se realiza un número ilimitado de intentos de construcción del loop.

Consejos
====

Para ejecuciones de producción se recomienda incluir `       -ex1      ` y `       -ex2      ` . Para reconstruir de forma consistente loops largos (p. ej., de 12 residuos o más) con alta precisión, se recomienda generar 1000 modelos con `       -nstruct 1000      ` (o ejecutando varios trabajos más pequeños en varios núcleos de procesador). El protocolo KIC se optimizó para la reconstrucción *de novo* de loops de proteína de 12 residuos en distintos entornos y con distintas distancias extremo a extremo. Los loops más cortos o los segmentos peptídicos en su mayoría enterrados *pueden* requerir bastantes menos modelos. También se demostró que el método KIC reconstruye 9 loops distintos de 18 residuos de dominios SH3 con una precisión inferior a un angstrom, para lo cual se generaron 5000 modelos por caso. En promedio, cada modelo generado con el protocolo combinado de remodel y refine que se muestra en la sección [Ejemplo de inicio rápido](#Quick-Start-Example) tarda de 15 a 20 minutos para un loop de 12 residuos en un solo núcleo de CPU, aunque el tiempo necesario puede variar según lo enterrado que esté el loop y su composición de aminoácidos.

Si la estructura inicial incluye ligandos que no son proteínas, es obligatorio convertir esos HETATM en tipos de átomo de Rosetta e incluir archivos de parámetros centroid (para remodel) y de todos los átomos (para refine) mediante las líneas de comandos `       -extra_res_cen      ` y `       -extra_res_fa      `. Para crear el archivo de parámetros de todos los átomos puede usarse el script `       rosetta/main/source/scripts/python/public/molfile_to_params.py      ` (incluye la opción '-c' para generar también el archivo de parámetros centroid). El script mofile\_to\_params.py requiere como entrada un Molfile de MDL del ligando. Se puede usar OpenBabel para convertir ligandos PDB en Molfiles.

KIC también se ha usado para generar conjuntos de cadenas principales para el diseño con cadena principal flexible. Un estudio reciente encontró que diseñar sobre un conjunto de cadenas principales generado con KIC predijo correctamente en promedio el 82 % de los aminoácidos en 17 posiciones observadas en experimentos de phage display en la interfaz Herceptin-HER2 (para más detalles consulta Babor *et al.* , citado arriba). Las definiciones de loop siguieron la descripción dada en *Generación de conjuntos de proteínas completas* en [Novedades desde la última versión](#New-things-since-last-release) . Las opciones de línea de comandos fueron

```
loopmodel.linuxgccrelease -database <path/to/rosetta/main/database> -loops:refine refine_kic -loops:input_pdb structure.pdb -loops:loop_file modeling.loops -loops:outer_cycles 1 -loops:refine_init_temp 1.2 -loops:refine_final_temp 1.2 -loops:vicinity_sampling -loops:vicinity_degree 3 -loops:optimize_only_kic_region_sidechains_after_move -ex1 -ex2 -nstruct 100
```

**NOTA:** El pdb de entrada ahora se especifica mediante el distribuidor de trabajos, con `       -in:               file:s             ` en lugar de `       -loops:input_pdb      ` . La línea de comandos anterior se conserva tal cual por su interés histórico.

Salidas esperadas
================

Cada decoy de salida contiene información sobre la energía y el rmsd del modelo al final del archivo. Si se proporciona `       -in:::file:native      `, el rmsd indicado es el rmsd de la cadena principal (N, Ca, C, O) respecto al/los loop(s) nativo(s). Si no, el rmsd indicado es 0. Un ejemplo de salida tiene este aspecto:

```
loop_cenrms: 3.49022 (rmsd to native/start after centroid stage)
loop_rms: 0.858667 (rmsd to native/start after all-atom stage)
total_energy: -389.076 (total score of the system)
chainbreak: 0.0254188 (score of the chainbreak term, smaller value means well-closed loops. should be < 1.0)
```

Preprocesamiento
==============

El protocolo KIC refine reempaquetará todos los residuos dentro de la distancia de vecindad de cualquier loop antes de intentar cualquier movimiento KIC. Ten en cuenta que las conformaciones de cadena lateral fuera de rotámero de la estructura inicial se incluyen en el packer, pero si alguna vez se reemplazan, se excluyen de toda consideración posterior. Consulta la [[documentación de fixbb|fixbb]] para reempaquetar, rediseñar y/o minimizar cualquiera de las cadenas laterales de la estructura inicial, o todas, si lo deseas. Para fines de benchmark, las cadenas laterales iniciales en Mandell *et al* . se descartaron, se reempaquetaron y se minimizaron antes de ejecutar la aplicación loopmodel.

Posprocesamiento
===============

Para fines de benchmark, crear un gráfico de puntuación *frente a* rmsd para todos los decoys y buscar «embudos de energía» cercanos al estado nativo es una buena forma de probar el rendimiento de los protocolos en un sistema, y puede ayudar a determinar si los errores se deben a la puntuación o al muestreo. Para la predicción a ciegas y el refinamiento, esos gráficos pueden seguir siendo útiles para buscar convergencia o varios mínimos en el paisaje de energía. Los decoys también pueden agruparse por pares para buscar regiones muy pobladas del espacio conformacional que puedan representar conformaciones alternativas de baja energía. Para más información sobre el análisis de los resultados del modelado de loops, consulta Mandell *et al.* y el suplemento que lo acompaña, citados arriba.

Comparación con el modelado de loops CCD
===============================

Se demostró que los protocolos de modelado de loops KIC mejoraban la precisión mediana respecto a las estructuras cristalinas de 45 loops de 12 residuos hasta 0.9 Å de rmsd de la cadena principal, desde los 2.0 Å de rmsd de la cadena principal de los protocolos de modelado de loops CCD (consulta Mandell *et al.* , citado arriba). En promedio, los protocolos KIC tardaron un 15 % más que los protocolos CCD en producir 1000 decoys para cada caso de benchmark.

Novedades desde la última versión
=============================

Los protocolos KIC se han ampliado para realizar tareas adicionales que todavía no se han evaluado en benchmarks.

-   *Modelado de varios loops* . Para modelar varios loops (u otras regiones de una proteína), basta con incluir varias entradas en el archivo de definición de loops. Cada loop se modela de forma secuencial en la etapa remodel, mientras que en la etapa refine los loops se seleccionan al azar de las definiciones de loop y se refinan de forma iterativa.
-   *Diseño iterativo con cadena principal flexible* . Si se añade un `        -resfile       ` a la línea de comandos, el packer incluirá los residuos especificados para diseño cada `        -loops:repack_period       ` ciclos en el protocolo `        refine_kic       ` . Esta función puede usarse, por ejemplo, para rediseñar interfaces de proteínas que muestran plasticidad conformacional.
-   *Generación de conjuntos de proteínas completas* . El archivo de definición de loops puede especificar regiones de cualquier tamaño, incluidas proteínas enteras. Este procedimiento también puede aplicarse a complejos de proteínas, aunque es necesario que el final del primer loop se fije a no más allá del extremo C de la primera pareja menos 1 residuo, y que el inicio del segundo loop no sea anterior al extremo N de la segunda pareja más 1 residuo. Los resultados preliminares sobre la recapitulación de la variación natural de secuencia de la familia de las proteínas similares a la ubiquitina mediante el diseño de secuencias sobre conjuntos KIC sugieren que puede ser útil omitir la etapa de remodelado centroid e incluir las opciones `        -loops:outer_cycles 1 -loops:refine_init_temp 1.2 -loops:refine_final_temp 1.2 -loops:vicinity_sampling -loops:vicinity_degree 3` Estos parámetros también se usaron para recuperar en promedio el 82 % de los residuos observados en experimentos de phage display en 17 posiciones de la interfaz Herceptin-HER2 (consulta Babor *et al* ., arriba).

Llamar directamente a los protocolos KIC
==================================

Los usuarios expertos pueden querer llamar a los protocolos KIC directamente desde sus propios protocolos o aplicaciones. El código para configurar y usar LoopMover\_KIC está en `       src/protocols/comparative_modeling/LoopRelaxMover.cc      ` . Aquí se reproducen las líneas clave.

-   Para leer las definiciones de loops:

    ```
    protocols::loops::Loops loops = protocols::loops::get_loops_from_file();
    ```

-   Para configurar el fold tree para el modelado de loops:

    ```
    core::kinematics::FoldTree f_new;
    protocols::loops::fold_tree_from_loops( pose, loops,  f_new, true );
    pose.fold_tree( f_new );
    ```

-   Para ejecutar la etapa remodel (centroid):

    ```
    IndependentLoopMoverOP remodel_mover( static_cast< loops::IndependentLoopMover * >
       ( loops::get_loop_mover( "perturb_kic"), loops ).get() ) );
    remodel_mover->apply( pose );
    ```

-   Para ejecutar la etapa refine (todos los átomos):

    ```
    protocols::loops::LoopMover_Refine_KIC refine_kic( loops );
    refine_kic.apply( pose );
    ```


##Véase también

* [Tutorial de modelado de loops](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling)
* [[Loopmodel]]: La página principal de la aplicación loopmodel
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura, incluido el modelado de loops
* [[Fragment file]]: Formato de archivo de fragmentos (necesario para la predicción de estructura ab initio)
* [[Loops file]]: Formato de archivo para especificar loops en el modelado de loops
* [[Loop modeling algorithms|loopmodel-algorithms]]
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
