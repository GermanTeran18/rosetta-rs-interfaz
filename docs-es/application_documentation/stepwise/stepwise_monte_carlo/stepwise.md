#stepwise: StepWise Monte Carlo para modelar motivos pequeños de RNA y proteínas

Propósito de la aplicación
===========================================

El código de Monte Carlo stepwise sirve para obtener modelos tridimensionales de novo de motivos de RNA y de proteínas, con la perspectiva de alcanzar una precisión alta. Se diferencia de los enfoques de ensamblaje de fragmentos en que no depende de la base de datos de estructuras conocidas y, por tanto, es adecuado para problemas que hay que modelar 'ab initio'. 

El Monte Carlo stepwise es más lento que los enfoques basados en fragmentos, pero parece comparable en velocidad al modelado de loops basado en KIC, y es mucho más rápido y fácil de ejecutar que los métodos originales de enumeración stepwise. El código se ha escrito de forma modular para que los desarrolladores de Rosetta puedan probarlo en problemas nuevos, como cadenas principales no naturales, péptidos/nucleótidos cíclicos, proteínas con puentes disulfuro y docking de ligandos.

Aquí hay una útil descripción de 20 minutos de los fundamentos y el marco conceptual del Monte Carlo stepwise:

[![Animación del tetraloop GCAA en Youtube](http://img.youtube.com/vi/WtbTh9rFznY/0.jpg)](http://www.youtube.com/watch?v=WtbTh9rFznY)

Las diapositivas también están disponibles en formato keynote [aquí](https://dl.dropboxusercontent.com/u/21569020/Das_SWM_RosettaDevMeetingTalk2014_keynote_format.zip). 


Algoritmo
=========

Este método de minimización Monte Carlo construye modelos mediante movimientos que implican el muestreo y la minimización de residuos individuales, lo que antes llamamos un 'ansatz stepwise'. A diferencia de otros modos de Rosetta, los movimientos incluyen la eliminación y la adición de residuos individuales. Como estos movimientos se concentran en los extremos, se aceptan con frecuencia y permiten una optimización profunda de una función de energía de todos los átomos.  En algunos problemas, los Poses también se pueden dividir y fusionar, y las cadenas separadas se pueden unir (docking) o separar. Este mismo marco y aplicación stepwise también reimplementa el muestreo enumerativo, siguiendo una relación de recursión descrita previamente (el método de 'ensamblaje stepwise'); en versiones futuras se eliminará el código más antiguo.

Opciones
=======

Hay un recuento completo de las opciones que quizá quieras usar [[también disponible|stepwise-options]]. 

Opciones de uso frecuente
---------------------
```
-s                                  Input file(s). For motifs that connect multiple helices like two- or three-way junctions, one may
                                    consider providing helices as distinct input files; the algorithm will allow them to move relative to
                                    each other.
-in:fasta                           Fasta-formatted sequence file. [FileVector]
-extra_minimize_res                 List of residues (either Rosetta numbering or resnum-chain (A:1-5) which may be minimized despite 
                                    being provided as part of the 'starting structure'
-terminal_res                       List of residues (either Rosetta numbering or resnum-chain (A:1-5) which are the terminal residues of
                                    the starting structure(s) provided
-motif_mode                         If provided, Rosetta will automatically compute -extra_minimize_res and -terminal_res
-chemical::enlarge_H_lj             Use a physically realistic H LJ radius, preventing collapse of RNA helices.
-out:file:silent                    Name of output file [scores and torsions, compressed format]. default="default.out" [String]
-in:native                          Native PDB filename. [File].
-out:nstruct                        Number of models to make. default: 1. [Integer]
-score:weights                      Scoring function (weights file) to use. The official 'best practice' at the moment is to use 
                                    -score:weights stepwise/rna/rna_res_level_energy4.wts -restore_talaris_behavior; currently in development
                                    is stepwise/rna/rna_res_level_energy7beta.wts, which does not require -restore_talaris_behavior.

Useful options
--------------
-monte_carlo:submotif_frequency     Adjust the frequency of 'submotif moves' (taken from a database of native structures). When 
                                    benchmarking, it can be useful to set this to 0.0 to ensure no part of the target loop is being built
                                    from a native.
-cycles                             Number of Monte Carlo cycles.[default 50]. [Integer]
```

Limitaciones
===========

-   No se garantiza que este método dé una búsqueda exhaustiva de un subespacio físicamente realista de conformaciones de RNA/proteína, que era una buena característica del trabajo original de ensamblaje stepwise. En cambio, como casi todos los protocolos de Rosetta (modelado con KIC, etc.), el muestreo puede devolver soluciones distintas a partir de semillas iniciales distintas, y debes comprobar la convergencia en ejecuciones independientes.

-  El método es extremadamente sensible a la función de energía supuesta. Esto contrasta con otros protocolos de Rosetta que pasan por etapas de baja resolución ('centroide') o usan fragmentos de la base de datos; ambas estrategias 'regularizan' la búsqueda, pero impiden resolver problemas en los que no se puede confiar en las funciones de energía de baja resolución o en los que la base de datos de fragmentos es demasiado escasa. 

- El método calcula energías de cierre de loops (`loop_close`) basadas en un modelo sencillo de cadena gaussiana de loops no instanciados. Aunque esta función de energía puede manejar ciclos de loops, falla con colecciones de Poses que tienen ciclos de loops anidados, por lo que en `stepwise` se evitan por defecto.

-  El método pretende obedecer el balance detallado, aunque sobre un paisaje de energía perturbado en el que la energía de cada conformación se asigna a la del mínimo local más cercano. Se evitan grandes desviaciones del balance detallado calculando la razón entre las probabilidades de propuesta directa e inversa. Sin embargo, en los movimientos que implican la adición o el remuestreo de cadenas con cierre, las implementaciones actuales de los movimientos no obedecen del todo el balance detallado, por un manejo incorrecto de la multiplicidad de movimientos al añadir, un calendario de movimientos incorrecto y la omisión de una razón jacobiana, respectivamente. Hay formas de corregirlo, si hace falta.

Código y demo
=============

El código central de la aplicación *stepwise* está en ` src/apps/public/stepwise/stepwise.cc   ` y todas las clases importantes están en `   src/protocols/stepwise      ` .

Para ver ejemplos de demo "mínimos", con sus archivos de entrada, del protocolo de modelado macromolecular stepwise, consulta:

`       rosetta/demos/public/stepwise_monte_carlo_rna_loop     `

`        rosetta/demos/public/stepwise_monte_carlo_rna_multiloop    `  

`        rosetta/demos/public/stepwise_monte_carlo_protein_loop     `

`        rosetta/demos/public/stepwise_monte_carlo_mini_protein     `

Los enlaces a videos de abajo ilustran estas demos.

Hay otras líneas de comando útiles como pruebas de integración en directorios con nombres como

`       rosetta/main/tests/integration/tests/swm_*     `


Referencias
==========
El Monte Carlo stepwise no está publicado al momento de escribir esto &ndash; esta documentación pretende permitir que los desarrolladores prueben y amplíen el protocolo mientras el laboratorio Das termina los benchmarks finales para motivos de RNA. Sin embargo, el método es una ampliación del ensamblaje stepwise, que se ha descrito en referencias anteriores:

Sripakdeevong, P., Kladwang, W., and Das, R. (2011) "An enumerative stepwise ansatz enables atomic-accuracy RNA loop modeling", PNAS 108:20573-20578. [para modelado de loops] [Artículo](http://www.stanford.edu/~rhiju/Sripakdeevong_StepwiseAnsatz_2011.pdf) [Enlace](http://dx.doi.org/10.1073/pnas.1106516108)

Das, R. (2013) "Atomic-accuracy prediction of protein loop structures enabled by an RNA-inspired ansatz", PLoS ONE 8(10): e74830. doi:10.1371/journal.pone.0074830 [Enlace](http://dx.doi.org/10.1371/journal.pone.0074830).

Un artículo que describe la aplicación del Monte Carlo stepwise a una predicción a ciegas de la xrRNA de Zika (RNA-Puzzle 18) y a varias interacciones tetraloop-receptor de tetraloop, así como su rendimiento en un extenso benchmark de 82 motivos, está disponible en [biorxiv](https://www.biorxiv.org/content/early/2018/02/06/223305).

Modos
=====

-   Por defecto, el código ejecuta Monte Carlo stepwise. Las aplicaciones a loops de RNA, miniproteínas, RNA/proteína mixtos, etc. no son modos distintos, sino que se definen por las secuencias de entrada (véase más abajo). El código reconocerá hasta dos dominios para docking, lo que permite, en principio, modelos ab initio de contactos terciarios RNA-RNA o de interfaces RNA-proteína sin conocer a priori su disposición de cuerpo rígido.

-   Es posible ejecutar movimientos únicos especificados a partir de una estructura de partida, indicándolos con `-move`. Consulta los [Consejos](#tips) más abajo.

Archivos de entrada
===========

Archivos requeridos
-------------

Normalmente usarás dos archivos de entrada:

-   El [[archivo fasta|fasta file]] es un archivo de secuencia de todas las cadenas de tu problema de modelado completo. 
Para mayor comodidad, puedes especificar la numeración de la secuencia y los ID de cadena.
-   Un [[archivo pdb|pdb file]] (o un conjunto de archivos) para aportar las estructuras de partida de entrada del problema. 
Los residuos de los archivos PDB deben tener números de cadena y de residuo que representen sus valores reales en el problema de modelado completo.

Archivos adicionales opcionales:
--------------------------
-   Un archivo PDB nativo, si quieres calcular el RMSD.
-   Un archivo PDB de alineamiento, si quieres mantener el modelado restringido cerca de esta estructura. [Ten en cuenta que puede ser distinto del archivo PDB nativo, si se desea.]

Uso básico para predicción de estructura
---------------------------
Una línea de comando de ejemplo es la siguiente:

```
stepwise -fasta 1zih.fasta -s start_helix.pdb  -out:file:silent swm_rebuild.out
```

Esto supone que has preparado 1zih.fasta para que coincida, en secuencia y numeración, con los residuos 3-10 de 1zih.pdb:
```
>1zih A:3-10
gcgcaagc
```

Un fasta así exigiría un PDB de partida numerado `A:3-4 A:9-10` que contenga una hélice de forma A `gc/gc`.

El código tarda unos 3 minutos en generar un modelo, con 50 ciclos de Monte Carlo stepwise. Ejecutar más ciclos (hasta 500) garantiza prácticamente la solución de este problema, incluso en un solo portátil. 

Aquí hay una animación que llega a la estructura experimental conocida. 

[![Animación del tetraloop GCAA en Youtube](http://img.youtube.com/vi/muTAOdPXkps/0.jpg)](http://www.youtube.com/watch?v=muTAOdPXkps)

Parámetros adicionales útiles:

 La opción `-motif_mode` equivale a `-extra_min_res 4 9 -terminal_res 1 12`; pediría que el par de bases de cierre de la hélice de partida se minimice (pero sin someterlo a adiciones, eliminaciones ni remuestreo de rotámeros) durante la ejecución, y evitaría que los residuos se apilen sobre el par de bases del límite exterior ('terminal res'). No es obligatoria, pero permitir la relajación de los pares de bases de cierre parece mejorar en general la convergencia en este y otros casos de RNA.

Para casos de RNA, actualmente se usa `  -score:rna_torsion_potential RNA11_based_new -chemical::enlarge_H_lj  ` para probar un potencial de torsión de RNA actualizado y ayudar a evitar la sobrecompresión de las hélices de RNA. Estos se activaron por defecto en el momento de la publicación del método, tras completar los benchmarks.

Diseño
---------------------------
El diseño se realiza simplemente especificando n ('nucleótido desconocido') en el archivo fasta, en lugar de una secuencia concreta, en las posiciones que deban variar.

```
stepwise -fasta NNNN.fasta -s start_helix.pdb  -out:file:silent swm_design.out  -cycles 500 -extra_min_res 4 9
```

A diferencia del ejemplo de predicción de estructura anterior, el archivo fasta aportado incluye `n` para representar nucleótidos desconocidos (un estándar IUPAC), pero por lo demás es idéntico:
```
>1zih A:3-10
gcnnnngc
```

Esta estrategia de diseño se generaliza: IUPAC admite códigos de una letra ambiguos para ácidos nucleicos, que también se han incorporado a Rosetta. Además de `n`, Rosetta admite `b`, `d`, `h` y `v` (para 'no a', 'no c', 'no g' y 'no t/u'); `r` e `y` (para purinas `g/a` y pirimidinas `u/c`); `w` y `s` (para formadores de pares de bases débiles `a/u` y fuertes `g/c`); `k` y `m` (para bases ceto `g/u` y bases amina `a/c`).

Observa la especificación de ciclos adicionales (500 en lugar de 50). Esto es necesario para asegurar soluciones cerradas y convergentes, ya que el espacio conformacional de búsqueda es mayor en los casos de diseño que en los de predicción de estructura pura.

[![Animación del diseño de un tetraloop en Youtube](http://img.youtube.com/vi/5egRg78UR8Q/0.jpg)](http://www.youtube.com/watch?v=5egRg78UR8Q)

Consulta el siguiente directorio de demo para ver los archivos de entrada y el README:

`       rosetta/demos/public/stepwise_monte_carlo_rna_loop     `

Varios loops
---------------------------
Si tienes un motivo de loop interno de RNA, por ejemplo dos cadenas que conectan dos hélices, hay dos formas de plantear el problema. 

Si no conoces las orientaciones de cuerpo rígido relativas de las dos hélices de los extremos (el caso de uso típico), especifica esos dos fragmentos en archivos PDB distintos.

`stepwise -in:file:fasta 1lnt.fasta -s gu_gc_helix.pdb  uc_ga_helix.pdb -out:file:silent swm_rebuild.out -extra_min_res 2 15 7 10 -terminal_res 1 8 9 16 -nstruct 20  -cycles 1000  -score:rna_torsion_potential RNA11_based_new  -native native_1lnt_RNA.pdb`

Las hélices de partida en este caso provienen de la aplicación `rna_helix`, que se describe brevemente [[aquí|rna-helix]]. La otra opción nueva aquí es `-terminal_res`, que impide el apilamiento sobre esos residuos (no es realmente necesaria aquí, pero evita algunos movimientos absurdos). Verás cómo se añaden nucleótidos a ambos inicios de hélice y, al final, cómo se fusionan los dos 'lados' del problema, como en este video:


[![Animación del modelado de SRP en Youtube](http://img.youtube.com/vi/CsXLyiyTcH4/0.jpg)](http://www.youtube.com/watch?v=CsXLyiyTcH4)


Si sí tienes coordenadas de las dos hélices de los extremos (puede ocurrir en problemas de refinamiento de loops, incluido el refinamiento cristalográfico de RNA), especifica esos dos fragmentos en el mismo archivo PDB:

`stepwise -in:file:fasta 1lnt.fasta -s start_native_1lnt_RNA.pdb -out:file:silent swm_rebuild.out -extra_min_res 2 15 7 10 -terminal_res 1 8 9 16 -nstruct 20  -cycles 1000  -score:rna_torsion_potential RNA11_based_new  -native native_1lnt_RNA.pdb`


Consulta el siguiente directorio de demo para ver los archivos de entrada y el README:

`       rosetta/demos/public/stepwise_monte_carlo_rna_multiloop     `

Loops de proteínas
--------------------------------
Los loops de proteínas se pueden manejar de forma similar a los casos de RNA anteriores. [Internamente se tratan igual que el RNA.] 

Una línea de comando de ejemplo para reconstruir un loop a partir de una estructura de partida con ese loop extirpado:

`stepwise -s noloop_mini_1alc_H.pdb -fasta mini_1alc.fasta -native mini_1alc.pdb -score:weights stepwise/protein/protein_res_level_energy.wts -silent swm_rebuild.out -from_scratch_frequency 0.0 -allow_split_off false -cycles 200 -nstruct 20`

Ten en cuenta que la mayoría de los problemas de modelado de loops se pueden acelerar recortando un pequeño 'subproblema'; en el ejemplo anterior esto se hizo a mano, pero probablemente se podría preparar para que ocurra automáticamente en Rosetta. Notas sobre las opciones adicionales: `-from_scratch_frequency 0.0 -allow_split_off false` desactivan el muestreo de dipéptidos que pueden modelarse libres y fusionarse con el loop; aquí no son tan útiles, aunque tampoco perjudican. Por último, no se ha trabajado mucho en la función de energía. Los pesos `protein_res_level_energy.wts` son una adaptación de score12.wts, como se hizo en [este artículo](http://dx.doi.org/10.1371/journal.pone.0074830).

Los archivos de entrada y la demo están en:

`       rosetta/demos/public/stepwise_monte_carlo_protein_loop     `

Aquí hay una animación:

[![Animación del modelado del loop de 1ALC en Youtube](http://img.youtube.com/vi/9jxaVRizIxA/0.jpg)](http://www.youtube.com/watch?v=9jxaVRizIxA)

Algo interesante que conviene señalar es que el empaquetado de cadenas laterales de proteínas en el Monte Carlo stepwise usa la nueva opción `allow_virtual_side_chains` y un término de energía `free_side_chain` que da una bonificación a los residuos por estar virtualizados (igual a 0.5 kcal por el número de torsiones de la cadena lateral). Esto significa que las cadenas laterales solo se instancian si pueden empaquetarse o formar enlaces de hidrógeno, y el resultado es una búsqueda conformacional bastante más suave.

Miniproteínas construidas desde cero
--------------------------------
Tanto para RNA como para proteínas, el Monte Carlo stepwise también puede construir modelos 'desde cero' (esta característica se optimizará en el futuro para que no tengas que construir, por ejemplo, hélices de RNA). Una línea de comando de ejemplo es:


`stepwise -fasta rosetta_inputs/2jof.fasta -native rosetta_inputs/2jof.pdb -score:weights stepwise/protein/protein_res_level_energy.wts -silent swm_rebuild.out -cycles 2000 -nstruct 50`

Aquí hay una animación de una trayectoria que alcanza una estructura de baja energía:

[![Animación del Trp cage (2jof) en Youtube](http://img.youtube.com/vi/MRYZjEoVs5Q/0.jpg)](http://www.youtube.com/watch?v=MRYZjEoVs5Q)

Es posible que gran parte de la simulación se dedique a hacer parpadear trozos de estructura secundaria &ndash; en el futuro probablemente prepararemos un precálculo de estos trozos para que el cómputo pueda centrarse en construir la estructura completa de la miniproteína.


Los archivos de entrada y la demo están en:
`       rosetta/demos/public/stepwise_monte_carlo_mini_protein    `


Consejos
====

¿Y si no se reconstruyen todos los residuos?
------------------------
Si las ejecuciones devuelven muchas soluciones incompletas y distintas, aumenta el número de ciclos. Si la ejecución devuelve la misma solución una y otra vez con, por ejemplo, una U ausente, el Monte Carlo stepwise te está diciendo que cree que el costo entrópico de estructurar ese nucleótido no se compensa con las interacciones de empaquetado/enlaces de hidrógeno en ninguna de las soluciones estructurales disponibles. Hay formas de forzar la construcción de esa protuberancia (véase más abajo) mediante posprocesamiento.


Ejecución de movimientos específicos
-------------
Es posible ejecutar movimientos únicos especificados a partir de una estructura de partida, indicándolos con `-move`. Esto es útil para hacer 'pruebas unitarias' de movimientos concretos y también sirve de conexión con la enumeración stepwise original. En particular, estos movimientos equivalen a los movimientos básicos de los ejecutables originales de ensamblaje stepwise (swa_rna_main y swa_protein_main), pero pueden tener un muestreo estocástico de conformaciones de nucleótidos/aminoácidos para minimizar. Además, el uso de la opción `-enumerate` recupera el comportamiento enumerativo original. Ejemplo en ` tests/integration/tests/swm_rna_move_two_strands `.


Conformational Space Annealing
------------------------------
Conformational space annealing (CSA) es una nueva optimización basada en poblaciones para el Monte Carlo stepwise. Al ejecutar stepwise con CSA, cada trabajo conoce el nombre de un silent file con un "banco" de modelos y lo actualiza tras realizar algunos pasos de Monte Carlo. Cada modelo del banco tiene una columna "cycles" (y su nombre es S_N, donde N = cycles). Este es el número total de ciclos del cálculo CSA sobre todos los trabajos completados en el momento en que el modelo se guarda en disco. Actualmente, las decisiones de sustituir modelos por modelos "cercanos" se basan en el RMSD. El umbral de RMSD se puede fijar con la opción `-csa_rmsd`.

Los siguientes parámetros definen la cantidad de cómputo que realiza stepwise con CSA:
```
Rosetta options:
-cycles                               number of monte carlo cycles per update (default: 50)
-nstruct                              number of updates per structure in bank (default: 20)
-csa_bank_size                        number of structures stored in the bank (default: 0)

 
Compute per job:
total cycles  = <cycles> * <nstruct>

Total Compute:
total cycles  = <cycles> * <nstruct> * <csa_bank_size>
```

Para ejecutar stepwise con CSA, crea un `README_SWM` con la siguiente línea de comando:
```
stepwise @flags -cycles <cycles> -nstruct <nstruct> -csa_bank_size <csa_bank_size>
```

Para preparar los trabajos en un clúster, ejecuta el siguiente comando:
```
rosetta\_submit.py README\_SWM SWM <njobs> <nhours>
```
NOTA: `csa_bank_size` debe coincidir con `njobs`, el número de núcleos que se ejecutan en paralelo.


¿Qué significan las puntuaciones?
------------------------
Los términos de energía son similares a los de las funciones de energía estándar de Rosetta para proteína o RNA (que a su vez podrían unificarse pronto). Para ser completos, aquí se describen algunos términos adicionales relevantes para las aplicaciones de stepwise.
```
***Energy interpreter for silent output:
score                                            Final total score
fa_atr                                           Lennard-jones attractive between atoms in different residues
fa_rep                                           Lennard-jones repulsive between atoms in different residues
fa_intra_rep                                     Lennard-jones repulsive between atoms in the same residue
lk_nonpolar                                      Lazaridis-karplus solvation energy, over nonpolar atoms
hbond_sr_bb_sc                                   Backbone-sidechain hbonds close in primary sequence (i,i+1)
hbond_lr_bb_sc                                   Backbone-sidechain hbonds distant in primary sequence
hbond_sc                                         Sidechain-sidechain hydrogen bond energy
geom_sol_fast                                    Geometric solvation energy for polar atoms (environment-independent)
loop_close                                       Entropic cost for loops not yet instantiated but whose endpoints are fixed
ref                                              Cost for instantiation of a full RNA/protein residue, backbone + sidechain
free_suite                                       Bonus for freeing a terminal phosphate or sugar (may be unified with ref)
free_2HOprime                                    Bonus for freeing a 2'-OH hydroxyl (may be unified with ref)
intermol                                         Cost of bringing two chains together at 1 M (-conc flag can change this)
other_pose                                       Score of sister poses (if building off separate PDBs, prior to merge)
linear_chainbreak                                Closure term to keep chainbreaks together upon loop closure
atom\_pair\_constraint                             any pairwise distance constraints (not implemented yet)
coordinate\_constraint                            any constraints to put atoms at specific coordinates (not implemented yet)

[RNA stuff]
fa\_elec\_rna\_phos\_phos                            Distance-dep. dielectric Coulomb repulsion term between phosphates
rna\_torsion                                      RNA torsional potential.
rna\_sugar\_close                                  Distance/angle constraints to keep riboses as closed rings.
fa\_stack                                         Extra van der Waals attraction for nucleobases, projected along base normal 
stack\_elec                                       Electrostatics for nucleobase atoms, projected along base normal. 

[protein stuff]
pro\_close                                        Distance/angle constraints to keep prolines as closed rings.
fa\_pair                                          Lo-res propensity for protein side-chains to be near each other
hbond\_\*                                          Other h-bond terms, probably will all get unified
dslf\_\*                                           Disulfide geometry terms, unified in later score functions 
rama                                             Score for phi/psi backbone combination 
omega                                            Tether of protein backbone omega to 0° or 180°  
fa\_dun                                           Protein side chain energy
p\_aa\_pp                                          -log P( aa | phi, psi ), enters into current bayesian formalism for score
free\_side\_chain                                  bonus (of 0.5 * nchi) for virtualizing a protein side chain

[Following are provided if the user gives a native structure for reference]
missing                                          number of residues not yet built in the structure
rms                                              all-heavy-atom RMSD to the native structure of built residues.
```

Posprocesamiento
===============

Cómo terminar el 'modelo completo'
--------------------------

No se garantiza que la aplicación `stepwise` termine de construir todo el problema de modelado completo en el número de ciclos indicado. Nos gustaría obtener modelos que tengan todos los residuos totalmente representados, ya que así se cumplen dos requisitos:
  
  1. En la práctica, los métodos de agrupamiento suelen requerir que los modelos que se agrupan tengan la misma longitud
  2. La aplicación `stepwise` calcula dos medidas de RMSD respecto de la nativa, y es probable que ninguna sea exactamente lo que quieres o esperas. 
    - `rms` se calcula solo sobre los residuos construidos, así que una simulación que construya exactamente uno de diez residuos probablemente tendrá un `rms` muy bueno aunque esté muy lejos del problema de modelado completo deseado. 
	- `rms_fill` se calcula imaginando que los residuos restantes del problema están todos en conformaciones de cadena principal de forma A que se extienden desde cada conexión expuesta. Esto es rápido de calcular al final de un problema de modelado y ayuda a penalizar los modelos en gran parte sin construir.

Queremos rellenar estos modelos con residuos 'desplegados', y lo hacemos con la aplicación `build_full_model`. Esta aplicación se ejecuta en dos modos principales, cada uno de los cuales ejecuta el mismo plan de alto nivel: colocar todos los residuos del problema de modelado completo previsto y calcular un RMSD realista, así como estadísticas de apareamiento de bases para evaluar cuántas de las características clave de la estructura nativa se recuperaron.

La aplicación siempre toma un silent file con `-in:file:silent` y genera uno con `-out:file:silent`. En un modo, que se ejecuta con `-virtualize_built true -caleb_legacy true`, instalamos residuos virtuales uno a uno con movimientos de `stepwise`. Esto es muy rápido, quizá segundos por estructura. El segundo (`-fragment_assembly_mode true`) instala todos los residuos a la vez, como variantes 'solo repulsivas' (que solo experimentan repulsión de van der Waals y penalizaciones de cierre de cadena) y luego usa el [[código de ensamblaje de fragmentos|rna-denovo]] para optimizar su conformación. Este método tarda bastante más y no es determinista, pero tiene la ventaja de producir conformaciones de cadenas que no se cruzan consigo mismas. (En teoría, los residuos virtuales instalados por el primer modo podrían cruzarse consigo mismos.) Una línea de comando estándar usada en el artículo de Watkins, 2018 es:

```
build_full_model.linuxclangrelease –in:file:silent swm_rebuild.out –in:file:fasta t_loop_modified_fixed.fasta –out:file:silent swm_rebuild_full_model.out –in:file:native t_loop_modified_fixed_NATIVE_1ehz.pdb –stepwise:monte_carlo:from_scratch_frequency 0.0 –out:overwrite true –score:weights stepwise/rna/rna_res_level_energy4.wts –virtualize_built false –fragment_assembly_mode true –rna:evaluate_base_pairs true –superimpose_over_all true –allow_complex_loop_graph true
```

Después podemos tomar los modelos resultantes y pasarlos por un [[agrupador|rna-cluster]] para analizar lo bien que la ejecución convergió en soluciones de bajo RMSD.

Extracción de modelos a formato PDB
------------------------------------

Los modelos de la ejecución anterior se guardan en formato comprimido en archivos como `swm_rebuild.out`. Puedes ver los modelos en formato PDB con el comando de conversión.

```
extract_pdbs  -in:file:silent swm_rebuild.out
```


Cosas experimentales
=============================
Modo de baja resolución
------------
[![Animación de stepwise en baja resolución en Youtube](http://img.youtube.com/vi/Q0qNSTN05is/0.jpg)](http://www.youtube.com/watch?v=Q0qNSTN05is)

Este modo, que se activa con la opción `-lores`, busca permitir pruebas de stepwise con muchos más ciclos de los permitidos arriba. En lugar de minimizar, el modelo se optimiza con 100 ciclos de [[ensamblaje de fragmentos|rna-denovo]] después de cada adición/eliminación/remuestreo de stepwise, en una función de puntuación de baja resolución (aquí, `rna_lores.wts` complementada con `loop_close` y `ref`). En la mayoría de los casos de modelado de loops o de motivos, lleva a una sobreoptimización de una función inexacta, o a una optimización peor que la de la [[preparación clásica de FARFAR para loops|rna-denovo-setup]].  Contacta con Rhiju si te interesa probarlo en casos más complejos, donde podría haber una 'ganancia'.

Modo de loops de longitud variable
-------------------------
Es una generalización del diseño stepwise en la que se permite que los loops (especificados como cadenas de `n` en el archivo FASTA) cambien su longitud durante la ejecución. Las longitudes máximas de los loops se basan en el archivo FASTA. Ejecuta `stepwise` con `-vary_loop_length_frequency 0.2` para probarlo; contacta con Rhiju para hacerlo robusto y para optimizar el delta-G previsto del plegamiento terciario por comparación con las energías libres del paquete Vienna RNA.


Novedades desde la última versión
=============================
Este es un ejecutable nuevo de 2014, con actualizaciones continuas hasta finales de 2018.

##Véase también
* Aplicaciones para el ensamblaje stepwise determinista:
  * [[Ensamblaje stepwise para loops de proteínas|swa-protein-main]]
    * [[Documentación adicional|swa-protein-long-loop]]
  * [[Modelado de loops de RNA con ensamblaje stepwise|swa-rna-loop]]
* [[Visión general de las clases de Stepwise|stepwise-classes-overview]]
* [Documentación interna para desarrolladores sobre Stepwise](https://www.rosettacommons.org/docs/wiki/internal_documentation/Internal-Documentation#documentation-for-specific-projects_stepwise-assembly-and-monte-carlo-project) (para desarrolladores)
* [[Structure prediction applications]]: Incluye enlaces a estas y otras aplicaciones de modelado de loops
* [[RNA applications]]: Aplicaciones para usar con RNA o con RNA y proteínas
* [[RosettaScripts]]: La página de inicio de RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
* [RiboKit](http://ribokit.github.io/): Paquetes de modelado y análisis de RNA mantenidos por el laboratorio Das
