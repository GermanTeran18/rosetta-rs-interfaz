#KIC con fragmentos

Metadatos
=======

Autor: Roland A. Pache

Este documento fue actualizado por última vez el 27 de julio de 2014 por Roland A. Pache. La investigadora principal correspondiente a esta aplicación es Tanja Kortemme (kortemme@cgl.ucsf.edu). 

Puedes encontrar un tutorial introductorio sobre modelado de loops [aquí](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling).

Código y demo
===========

La aplicación actual para este método es `       bin/loopmodel.<my_os>gccrelease      ` . El protocolo se basa en el código KIC refactorizado de Kale Kundert. Las clases principales son `    src/protocols/kinematic_closure/KicMover      ` , que realiza una perturbación cinemática localizada de una cadena peptídica, `       src/protocols/loop_modeling/LoopBuilder.cc      `, que ahora permite usar datos de fragmentos para la construcción inicial del loop (tras descartar la conformación nativa del loop), `       src/protocols/kinematic_closure/perturbers/FragmentPerturber      `, que muestrea conformaciones de loops usando torsiones phi/psi/omega acopladas de las bibliotecas de fragmentos dadas, y `       src/protocols/comparative_modeling/LoopRelaxMover      `, que permite la combinación con otros protocolos de modelado de loops. Un ejemplo básico de uso que remodela brevemente un loop de 8 residuos es la prueba de integración `       KIC_with_fragments      `, que se encuentra en `       main/tests/integration/tests/KIC_with_fragments      `.


Referencias
========

La referencia del artículo de KIC con fragmentos se añadirá cuando esté disponible. 

Puedes encontrar una descripción del protocolo original de modelado cinemático de loops aquí:

-   Mandell DJ, Coutsias EA, Kortemme T. (2009). Sub-angstrom accuracy in protein loop reconstruction by robotics-inspired conformational sampling. *Nat Methods*. 2009 Aug;6(8):551-2. doi: 10.1038/nmeth0809-551. PMID: 19644455

Puedes encontrar más detalles sobre los principios subyacentes del algoritmo de cierre cinemático aquí:

-   Coutsias EA, Seok C, Wester MJ, Dill KA. (2005). Resultants and loop closure. *International Journal of Quantum Chemistry* . 106(1), 176–189.


Propósito
======

El modelado de loops con KIC con fragmentos tiene varias aplicaciones importantes en biología estructural: predecir conformaciones de loops en modelado comparativo o la conformación de loops no resueltos en estructuras cristalinas, predecir cambios conformacionales por unión en interfaces proteína-proteína, pregenerar conformaciones de loops para docking con flexibilidad del receptor y generar conjuntos conformacionales de proteínas completas (la heterogeneidad del conjunto dependerá de la heterogeneidad de las bibliotecas de fragmentos dadas). Conceptualmente, las dos variantes principales del protocolo que conviene distinguir son:

-   **Reconstrucción de loops:** La predicción *de novo* de la conformación de un segmento peptídico a partir de su secuencia, en la que se descartan las conformaciones iniciales de la cadena principal y de las cadenas laterales
-   **Refinamiento de loops:** Encontrar conformaciones de baja energía para una conformación y una secuencia peptídicas dadas

Aunque esta documentación habla de modelar regiones de loop, en la práctica el protocolo KIC con fragmentos se puede aplicar a cualquier segmento de proteína de al menos 3 residuos de longitud, siempre que haya datos de fragmentos (que se pueden generar para cualquier secuencia de aminoácidos de interés, con el [servidor web Robetta](http://robetta.bakerlab.org/), que es gratuito, o con la [[aplicación fragment picker|app-fragment-picker]]; consulta [[Uso de archivos de fragmentos en Rosetta|fragment-file]] para más detalles).


Ejemplo de inicio rápido
==============

La siguiente línea de comandos realizará una reconstrucción *de novo* de un loop de proteína (se descartarán las coordenadas iniciales y el loop se modelará desde cero), seguida de un refinamiento de todos los átomos con rotámeros adicionales. Para descartar las coordenadas iniciales del loop, asegúrate de que el campo «Extend loop» del archivo de definición de loops esté en '1' (así se garantiza que se hace una construcción inicial del loop y se idealizan las longitudes y los ángulos de enlace del loop; para más detalles consulta [Archivos de entrada](#Input-Files) y [Opciones](#Options)).

```
rosetta/main/source/bin/loopmodel.<my_os>gccrelease -database </path/to/rosetta/main/database> -loops:remodel perturb_kic_with_fragments
-loops:refine refine_kic_with_fragments -in:file:s <my_starting_structure>.pdb -in:file:fullatom -loops:loop_file
<my_loopfile>.loop -nstruct <num_desired_models> -ex1 -ex2 -overwrite -loops:frag_sizes 9 3 1 -loops:frag_files 
<my_starting_structure>.200.9mers.gz <my_starting_structure>.200.3mers.gz none     
```


Algoritmo
=======

El cierre cinemático (KIC) es un cálculo analítico inspirado en técnicas de robótica para determinar con rapidez las posibles conformaciones de objetos enlazados sujetos a restricciones. En el protocolo KIC con fragmentos, los ángulos de torsión phi/psi/omega acoplados de residuos consecutivos de fragmentos de proteínas (por defecto 9meros, 3meros o 1meros) se usan para muestrear todos los grados de libertad de torsión salvo 6. Esas 6 torsiones restantes (los ángulos diedros phi/psi de los 3 residuos pivote) las resuelve KIC de forma analítica. Esta formulación permite muestrear con rapidez grandes espacios conformacionales. (A diferencia de [[KIC|loopmodel-kinematic]] y de [[KIC de nueva generación|next-generation-KIC]], las opciones de muestreo en la vecindad no se aplican, porque las torsiones que no son pivote siempre se toman de los datos de fragmentos. )

Para más detalles sobre los pasos geométricos que da el solucionador cinemático subyacente, consulta el material suplementario de Mandell *et al.*, citado arriba.

El protocolo de modelado de loops KIC con fragmentos tiene dos etapas: **remodel** , que se activa con `       -loops:remodel perturb_kic_with_fragments      ` y **refine** , que se activa con `       -loops:refine refine_kic_with_fragments      ` , y que pueden invocarse por separado o de forma secuencial mediante opciones de línea de comandos.

Etapa remodel 
------------

La etapa remodel se usa para un muestreo rápido y amplio de conformaciones de la cadena principal, normalmente con el fin de remodelar o reconstruir segmentos peptídicos. En esta etapa se muestrean de forma independiente las conformaciones de la cadena principal de cada loop definido en el archivo de definición de loops, usando una representación reducida (centroid) de las cadenas laterales y la función de puntuación de baja resolución de Rosetta. Esta etapa se activa con `       -loops:remodel perturb_kic_with_fragments      ` . Si el campo «extend loop» del archivo de definición de loops está en '1' (consulta [Archivos de entrada](#Input-Files)), el loop se colocará primero en una conformación cerrada aleatoria tras idealizar las longitudes de enlace, los ángulos de enlace y las torsiones omega. En caso contrario, se usa como estructura inicial la conformación de entrada. Después, cada loop se somete a un único ciclo de Monte Carlo con recocido simulado.

Durante la construcción inicial del loop, primero se idealizan todas las longitudes de enlace, los ángulos y las torsiones omega del loop. Después, todas las torsiones phi/psi del loop se sustituyen por valores aleatorios del espacio de Ramachandran, para asegurar que se descarta toda la información nativa del loop. Por último, las torsiones phi/psi/omega se muestrean con datos de fragmentos, seguido del cierre cinemático del loop. La opción `-loops:max_kic_build_attempts` determina el número máximo de intentos para encontrar una conformación de loop cerrada. 
Cada paso del ciclo posterior de Monte Carlo con recocido simulado de remodel consiste en un muestreo basado en fragmentos sobre un subsegmento aleatorio del loop, seguido del cierre cinemático, la minimización de las torsiones phi/psi del loop (con el algoritmo BFGS (dfpmin)) y una prueba de aceptación con el criterio de Metropolis usando la función de puntuación de baja resolución `       score4L      ` de Rosetta. El número de pasos de Monte Carlo lo determina el número de `       outer_cycles      ` \* `       inner_cycles      ` . El número de `       outer_cycles      ` se fija con `       -loops:refine_outer_cycles      ` (por defecto=5). El número de ciclos internos es `       min( 1000, number_of_loop_residues * 20 )      ` , o se fija en `       -loops:max_inner_cycles      ` si se indica. Al final de cada ciclo externo, el Pose se establece en la conformación de menor energía observada hasta ese momento en la simulación. (La opción `       -loops:kic_recover_last      `, que pasaría la última conformación aceptada al siguiente ciclo externo, aún no se ha implementado en el código KIC refactorizado en el que se basa KIC con fragmentos. ) Del primer paso al último, la temperatura disminuye exponencialmente de 1.5 KT a 0.5 KT. (Las opciones `       -loops:remodel_init_temp      ` y `       -loops:remodel_final_temp      `, que controlarían la temperatura inicial y la final, aún no se han implementado en el código KIC refactorizado. )

El muestreo de torsiones phi/psi/omega basado en fragmentos consta de una secuencia de seis pasos distintos: (i) se selecciona al azar una de las bibliotecas de fragmentos de entrada dadas; (ii) se busca en esa biblioteca los marcos de alineamiento de fragmentos que se solapan con el subsegmento del loop dado; (iii) se elige al azar uno de esos marcos de alineamiento; (iv) se selecciona al azar uno de los fragmentos contenidos en ese marco de alineamiento; (v) las torsiones phi/psi/omega de ese fragmento se aplican a la región respectiva del subsegmento del loop; y (vi) se usa el cierre cinemático (KIC) para cerrar el loop. 

Etapa refine 
-----------

La etapa refine se usa para encontrar conformaciones predichas de baja energía de segmentos peptídicos, a partir de una conformación inicial. Esta etapa se puede usar, por ejemplo, para refinar modelos por homología. En esta etapa las cadenas laterales se representan con detalle de todos los átomos y, junto con las conformaciones de la cadena principal, se evalúan con la función de puntuación de alta resolución de Rosetta (actualmente `Talaris2013`, a julio de 2014), con un término de ruptura de cadena de mayor peso.

Esta etapa se invoca con `       -loops:refine refine_kic_with_fragments      ` . Al comienzo de esta etapa, todos los residuos a menos de 10 angstroms del loop se reempaquetan y se someten a pruebas de rotámeros. Las cadenas principales y las cadenas laterales de todos los residuos del loop, así como las cadenas laterales de todos los vecinos, se someten luego a minimización de energía (con el algoritmo BFGS (dfpmin)). (Las opciones `       -loops:fix_natsc      `, que conservaría las conformaciones nativas de las cadenas laterales de todos los residuos de la vecindad del loop, y `       -loops:neighbor_dist      `, que podría usarse para cambiar la distancia de corte de la vecindad, aún no están implementadas en el código KIC refactorizado. ) En consecuencia, si esta etapa ha sido precedida por la etapa centroid, las cadenas laterales que rodean al loop se optimizarán para la conformación perturbada del loop y no para la conformación inicial del loop, lo cual supone una tarea más difícil para fines de benchmark, ya que hay que reconstruir las cadenas laterales vecinas de tipo silvestre además de las conformaciones de la cadena principal y las cadenas laterales del loop. La simulación avanza entonces por un único ciclo de Monte Carlo con recocido simulado, con la misma programación que la etapa centroid, salvo que en cada ciclo interno se intentan dos rondas de movimientos de cierre cinemático y que, si no se fija `       -loops:max_inner_cycles      `, el número de ciclos internos es `       min( 200, 10 * total_number_loop_residues )      ` . Aquí, el número de residuos de loop incluye todas las definiciones de loop (si se definen varios loops), porque los movimientos de cierre cinemático de la etapa refine se aplican al azar a cualquiera de los loops. Después de cada movimiento cinemático, el loop y los residuos vecinos se someten a pruebas de rotámeros, y se minimizan la cadena principal del loop, así como las cadenas laterales del loop y de los residuos vecinos. En cada repack_cycle, que se fija con `       -loops:repack_period      ` (por defecto=20), se reempaquetan todas las cadenas laterales del loop y de los residuos vecinos. (Para todas estas optimizaciones, una vez que la opción `       -loops:fix_natsc      ` se implemente en el código KIC refactorizado, los residuos vecinos permanecerían fijos y solo los residuos del loop se someterían a pruebas de rotámeros, reempaquetado y minimización. Del primer paso al último, la temperatura vuelve a disminuir exponencialmente de 1.5 KT a 0.5 KT. (Las opciones `       -loops:refine_init_temp      ` y `       -loops:refine_final_temp      `, que controlarían la temperatura inicial y la final, aún no se han implementado en el código KIC refactorizado. )

El muestreo de torsiones phi/psi/omega basado en fragmentos consta de la misma secuencia de seis pasos descrita antes para la etapa remodel: (i) se selecciona al azar una de las bibliotecas de fragmentos de entrada dadas; (ii) se busca en esa biblioteca los marcos de alineamiento de fragmentos que se solapan con el subsegmento del loop dado; (iii) se elige al azar uno de esos marcos de alineamiento; (iv) se selecciona al azar uno de los fragmentos contenidos en ese marco de alineamiento; (v) las torsiones phi/psi/omega de ese fragmento se aplican a la región respectiva del subsegmento del loop; y (vi) se usa el cierre cinemático (KIC) para cerrar el loop.  

Uso del protocolo
-------------

Para la ***reconstrucción de novo*** de loops de proteínas, usa tanto `       -loops:remodel perturb_kic_with_fragments      ` como `       -loops:refine refine_kic_with_fragments      ` , con el campo «extend loop» del archivo de definición de loops en '1'.

Para el **refinamiento de loops** , usa solo `       -loops:refine refine_kic_with_fragments      ` .


Limitaciones
========

Por definición, los movimientos KIC son perturbaciones locales, así que los átomos C-alfa de los residuos inicial y final de las definiciones de loop permanecen fijos. Las definiciones de loop pueden incluir los extremos N y/o C de proteínas monoméricas, y los átomos C-alfa de los extremos permanecerán fijos (es decir, el modelado de loops KIC no se puede usar para muestrear las conformaciones de los propios residuos terminales sin añadir residuos «virtuales» a los extremos). 


Archivos de entrada
========

Los siguientes archivos son necesarios para KIC con fragmentos:

-   Archivo PDB inicial, especificado con `-in:file:s` o `-s`. La estructura inicial debe tener coordenadas reales para todos los residuos fuera de la definición del loop, además del primer y el último residuo de cada región de loop (las cadenas laterales pueden ser reconstruidas por Rosetta si falta densidad electrónica, pero todos los átomos de la cadena principal deben tener coordenadas bien definidas).

-   Archivo de definición de loops, especificado con `        -loops:loop_file       ` y compartido por todos los protocolos de modelado de loops. Para cada loop que se vaya a modelar, incluye lo siguiente en una línea:

    ```
    column1  "LOOP":     The loop file identify tag
    column2  "integer":  Loop start residue number
    column3  "integer":  Loop end residue number
    column4  "integer":  Cut point residue number, >=startRes, <=endRes. Default: 0 (let the loop modeling code 
                         choose the cutpoint) 
                         Note: Setting the cut point outside the loop can lead to a segmentation fault. 
    column5  "float":    Skip rate. Default: 0 (never skip modeling this loop)
    column6  "boolean":  Extend loop (i.e. discard the native loop conformation and rebuild the loop from scratch,
                         idealizing all bond lengths and angles). Default: 0 (false). It is important for loop
                         reconstruction benchmarks to set this flag to 1 to ensure a starting loop conformation 
                         that is different from the original one, as well as for de novo loop construction/
                         insertion to create a connected starting loop conformation from single unconnected loop 
                         residues 
    ```

    Puedes encontrar un ejemplo de archivo de definición de loops en `        tests/integration/tests/KIC_with_fragments/inputs/4fxn.loop       ` , que tiene este aspecto:

    ```
    LOOP 88 95 92 0 1
    ```

    **NOTA:** Los índices de residuos en los archivos de definición de loops se refieren a la *numeración de Rosetta* (numerada de forma continua desde '1', incluso entre cadenas en proteínas de varias cadenas). Puede ser útil renumerar las estructuras iniciales con la numeración de Rosetta para que las definiciones de loop y los índices de residuos del PDB coincidan.

-   Bibliotecas de fragmentos, especificadas con las opciones `-loops:frag_sizes`, que define el número de residuos por fragmento (lo habitual es `9 3 1` para usar 9meros, 3meros y 1meros durante el muestreo), y `-loops:frag_files`, que define la ruta y el nombre de las bibliotecas de fragmentos respectivas. Esos archivos se pueden generar para cualquier secuencia de aminoácidos de interés, con el [[servidor web Robetta|http://robetta.bakerlab.org/]], que es gratuito, o con la [[aplicación fragment picker|app-fragment-picker]]; consulta [[Uso de archivos de fragmentos en Rosetta|fragment-file]] para más detalles). Cuando se especifica `none` como nombre de la biblioteca de fragmentos de 1meros, los fragmentos de 1mero se generarán automáticamente a partir de los datos de fragmentos de 3meros dados. 


Opciones
=======

-   Las siguientes opciones sirven para activar KIC con fragmentos y deben estar presentes en la línea de comandos (se requiere una de las dos, o ambas, entre `        -loops:remodel       ` y `        -loops:refine       `):

    ```
    -database                                   Path to the Rosetta database. [Path]
    -loops:remodel perturb_kic_with_fragments   Selects the KIC with fragments protocol for the centroid remodeling stage.
    -loops:refine refine_kic_with_fragments     Selects the KIC with fragments protocol for the all-atom refinement stage. 
    -loops:loop_file                            Path/name of loop definition file. [File]
    -loops:frag_sizes                           Defines the number of residues per fragment for the following set
                                                of fragment libraries (e.g. 9 3 1). 
    -loops:frag_files                           Paths/names of the respective fragment libraries. [Files]
    ```

-   Se recomienda la siguiente opción para suprimir la salida estándar con detalles del muestreo de fragmentos:
    ```
    -mute protocols.looprelax.FragmentPerturber Mutes FragmentPerturber output of sampling details. 
    ```

-   Las siguientes opciones generales de Rosetta se usan habitualmente con KIC con fragmentos:

    ```
    -in:file:s           Path/name of input pdb file. [File]
    -in:file:native      Path/name of native pdb file. Backbone rmsd to this structure will be reported in 
                         each output decoy. [File]
    -in:file:fullatom    Read the input structure in full-atom mode. Set this flag to avoid discarding the 
                         native side chains and repacking the input structure before modeling (the refine stage 
                         always begins by repacking the loop and neighboring side-chains). Default = 'false'. [Boolean]
    -ex1 -ex2            Include extra chi1 and chi2 rotamers during packing and rotamer trials. 
                         This improves benchmark performance. 
    -extrachi_cutoff 0   Include extra rotamers regardless of number of neighbors. This can lead to more accurate 
                         side-chain conformations, but slightly decreases benchmark performance. 
    -extra_res_cen       Path to centroid parameters file for non-protein atoms or ligands. Note that this is 
                         required for structures with ligands even if only full-atom remodeling is performed.
    -extra_res_fa        Path to all-atom parameters file for non-protein atoms or ligands. 
    -overwrite           Overwrite existing models (Rosetta will not output without this flag if same-named model exists). 
    -out:pdb_gz          Create compressed output PDB files (using gzip), which saves a lot of space. 
                         These files can still be visualized normally with software such as Pymol. 
    ```

-   Las siguientes opciones «avanzadas» pueden usarse para personalizar el comportamiento de KIC con fragmentos:

    ```
    -loops:max_kic_build_attempts   Number of times to attempt initial loop closure in the perturb stage.
                                    Try increasing to 1000000 if initial closure is failing. Default = 10000. [Integer]
    -loops:skip_initial_loop_build  This option allows to run KIC with fragments in both centroid and fullatom mode, but
                                    without building the loop from scratch first. This can be useful for broad sampling 
                                    of the given loop in the vicinity of its native conformation or for backbone ensemble
                                    generation, where using fullatom refinement only would lead to ensembles of too low
                                    conformational diversity. When modeling several loops simultaneously, if the initial
                                    loop build should be skipped for only a subset of loops, instead set the given loop 
                                    extend flag in the loop file to 0. 
    -loops:outer_cycles             Number of outer cycles for Monte Carlo (described above in Algorithm).
                                    Default = 5. [Integer]
    -loops:max_inner_cycles         Maximum number of inner cycles for Monte Carlo (described above in Algorithm). [Integer]
    -loops:fast                     Significantly reduces the number of inner cycles. For quick testing, 
                                    not production runs. Default = 'false'. [Boolean]
    -run:test_cycles                Sets the number of outer cycles and inner cycles to 3. For extremely quick testing 
                                    and sanity checks, not for production runs. Default = 'false'. [Boolean]
    ```


Consejos
====

Para ejecuciones de producción se recomienda incluir `       -ex1      ` y `       -ex2      ` y generar 500 modelos por loop (ya sea con `       -nstruct 500      ` o ejecutando varios trabajos más pequeños en varios núcleos de procesador). El protocolo KIC con fragmentos se evaluó originalmente en benchmarks de reconstrucción de loops de proteína de 12 residuos en distintos entornos y con distintas distancias extremo a extremo. Los loops más cortos o los segmentos peptídicos en su mayoría enterrados pueden requerir bastantes menos modelos. En promedio, cada modelo generado con el protocolo combinado de remodel y refine que se muestra en la sección [Ejemplo de inicio rápido](#Quick-Start-Example) tarda de 30 a 40 minutos para un loop de 12 residuos en un solo núcleo de CPU, aunque el tiempo necesario puede variar según lo enterrado que esté el loop y su composición de aminoácidos.

Si la estructura inicial incluye ligandos que no son proteínas, es obligatorio incluir archivos de parámetros centroid (para remodel) y de todos los átomos (para refine) mediante las opciones `       -extra_res_cen      ` y `       -extra_res_fa      `. Para ello puede usarse el script `       rosetta/main/source/scripts/python/public/molfile_to_params.py      ` (usa la opción '-c' con ese script para generar también el archivo de parámetros centroid). El script requiere como entrada un archivo mol o mol2 que describa el ligando, que puede generarse con los paquetes de software OpenBabel o Avogadro. 


Salidas esperadas
================

Cada decoy de salida contiene información sobre la energía y el rmsd del modelo al final del archivo. Si se proporciona `       -in:::file:native      `, el rmsd indicado es el rmsd de la cadena principal (N, Ca, C, O) respecto al/los loop(s) nativo(s). Si no, el rmsd indicado es 0. Un ejemplo de salida tiene este aspecto:

```
chainbreak: 0 (score of the chainbreak term, smaller value means well-closed loops. should be < 1.0)
loop_cenrms: 2.93581 (rmsd to native/start after centroid stage)
loop_rms: 0.857773 (rmsd to native/start after all-atom stage)
total_energy: -359.17 (total score of the system)
```


Preprocesamiento
==============

La etapa refine reempaquetará todos los residuos dentro de la distancia de vecindad de cualquier loop antes de intentar cualquier inserción de fragmentos o movimiento KIC. Ten en cuenta que las conformaciones de cadena lateral fuera de rotámero de la estructura inicial se incluyen en el packer, pero si alguna vez se reemplazan, se excluyen de toda consideración posterior. Consulta la [[documentación de fixbb|fixbb]] para reempaquetar, rediseñar y/o minimizar cualquiera de las cadenas laterales de la estructura inicial, o todas, si lo deseas. Para fines de benchmark, las cadenas laterales iniciales se descartaron, se reempaquetaron y se minimizaron antes de ejecutar la aplicación de modelado de loops con el protocolo MinPack, usando el siguiente comando:

```
fixbb.<my_os>gccrelease -database <Rosetta_database> -s <input_PDB> -in:file:fullatom -overwrite -nstruct 1 
-out:pdb_gz -ignore_zero_occupancy false -constant_seed -ex1 -ex2 -extrachi_cutoff 0 -flip_HNQ -no_optH false 
-preserve_header -min_pack -packing:repack_only
```


Posprocesamiento
===============

Para fines de benchmark, crear un gráfico de puntuación *frente a* rmsd para todos los decoys y buscar «embudos de energía» cercanos al estado nativo es una buena forma de probar el rendimiento de los protocolos en un sistema, y puede ayudar a determinar si los errores se deben a la puntuación o al muestreo. Para la predicción a ciegas y el refinamiento, esos gráficos pueden seguir siendo útiles para buscar convergencia o varios mínimos en el paisaje de energía. Los decoys también pueden agruparse por pares con la [[aplicación cluster|cluster]], para buscar regiones muy pobladas del espacio conformacional que puedan representar conformaciones alternativas de baja energía. 


Comparación con otros protocolos de modelado de loops
===============================

Benchmarks recientes con 45 loops de 12 residuos han mostrado que KIC con fragmentos alcanza una precisión de reconstrucción de loops inferior a un angstrom (0.72 Å de rmsd de la cadena principal), y supera con creces a los protocolos de modelado de loops existentes en el muestreo de modelos de menos de un angstrom (fracción mediana de modelos de menos de un angstrom = 30 % (sin usar homólogos durante la generación de fragmentos), frente a solo un 13 % para KIC de nueva generación, un 6 % para el KIC heredado y un 2 % para CCD). 


Novedades desde la última versión
=============================

Esta es la primera versión pública. 

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
