#Cómo preparar estructuras para usarlas en Rosetta

*Esta página describe el procedimiento estándar para preparar estructuras de proteínas para Rosetta. Para preparar ligandos para usarlos con Rosetta, consulta la página [[preparing ligands]] y el [tutorial](https://www.rosettacommons.org/demos/latest/tutorials/prepare_ligand/prepare_ligand_tutorial). Para preparar polímeros que no son péptidos, consulta la página [[preparing PDB files for non-peptide polymers]].  Para archivos PDB que contienen tanto proteínas como ARN, consulta la página [[RNA-protein changes]].

Puedes encontrar el tutorial introductorio [aquí](https://www.rosettacommons.org/demos/latest/tutorials/input_and_output/input_and_output#controlling-input_preparing-a-structure-by-refinement). Para ver los detalles, sigue leyendo.

[[_TOC_]]

# Finalidad de la aplicación

Las estructuras obtenidas directamente del PDB casi nunca son perfectamente compatibles con Rosetta: es habitual que tengan choques (solapamientos de átomos), rotámeros de aminoácidos con una energía pésima según Rosetta u otros errores. 
A menudo conviene preparar las estructuras antes de trabajar de verdad con ellas para eliminar de antemano estos errores. Esto ofrece varias ventajas:

-   En el diseño, Rosetta a menudo coloca un aminoácido determinado únicamente porque el original tiene un mal choque o una mala energía de rotámero; preparar primero las estructuras permitirá a Rosetta conservar el aminoácido de tipo silvestre y reducir al mínimo el número de cambios realizados a partir de una puntuación incorrecta de la estructura nativa.
-   Se dedica menos tiempo en cada trayectoria a volver a relajar de forma independiente los mismos errores de la entrada.
-   Los resultados tienen menos ruido causado por errores que se gestionan de distinta manera en diferentes trayectorias.
-   Las puntuaciones son más bajas en general: nunca deberías tener puntuaciones positivas de score12 (o talaris) en una proteína bien plegada.

# Referencias

Nivón LG, Moretti R, Baker D (2013) A Pareto-Optimal Refinement Method for Protein Design Scaffolds. PLoS ONE 8(4): e59004. [Artículo](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0059004)

# ¿Cómo preparo las estructuras?

La preparación de las estructuras está indisolublemente ligada a lo que quieres hacer con ellas. 
En otras palabras, tu protocolo principal dicta tu protocolo de preparación. 
Recuerda que lo único que haces aquí es relajar la estructura hacia la función de energía de Rosetta: no la estás haciendo necesariamente más correcta de forma objetiva (aunque los choques por lo general son incorrectos), solo estás haciendo que a Rosetta le guste más. 
A continuación se presenta un protocolo que se ha evaluado en diseño de enzimas y que debería funcionar en cualquier situación de diseño, y después una serie de sugerencias de desarrolladores de Rosetta para otras situaciones.

# Limpieza de PDB para Rosetta

Analizar una estructura PDB descargada del [[PDB|http://www.rcsb.org/pdb/home/home.do]] suele producir un error.
Esto se debe sobre todo a que el PDB contiene información ajena (como moléculas de agua que Rosetta no modela).
Ocasionalmente, se debe a que Rosetta no puede analizar una entidad química concreta.

La forma más sencilla de limpiar un archivo PDB es ejecutar la siguiente expresión de línea de comandos:

```
grep "^ATOM" SOME.pdb > SOME.clean.pdb
```

**Advertencia:** esto es bastante bárbaro y eliminará información del PDB que podría ser valiosa.

También hay un script, `tools/protein_tools/scripts/clean_pdb.py`, para limpiar el PDB, que elimina la mayoría de las líneas que Rosetta no puede analizar.
Desde el 9 de junio de 2015, el script deja solo las líneas que empiezan por 'ATOM' o 'TER' y elimina los registros 'HETATM' a menos que el residuo sea una selenometionina.
También elimina los residuos con ocupación 0.
Consulta el encabezado del script para más información.
Para ejecutar el script:

```
python clean_pdb.py <pdb> <chain id>
```

## Limpieza de PDB con ligando

Hay casos en los que tu PDB puede contener un ligando HETATM y, por razones obvias, puede que quieras relajar el PDB con el ligando.
A menudo limpiamos las estructuras para sustituir los aminoácidos no canónicos por sus homólogos más cercanos con `clean_pdb_keep_ligand.py`:
```
python clean_pdb_keep_ligand.py your_structure_original.pdb -ignorechain
```

Estos protocolos están diseñados para un PDB de una sola cadena. 
Para varias cadenas, recomendamos dividir el PDB en uno por cada cadena y ejecutar el protocolo por separado en cada una. Como alternativa, puedes probar la opción `-ignorechain` del script, que conservará todas las cadenas.

Mientras que el script anterior (clean_pdb.py) descartaba la mayoría o todos los registros HETATM, este script conserva los HETATM que no son ligandos no canónicos.

# Relax con restricciones sobre todos los átomos pesados: introducción

(Consulta también la [[documentación de relax|relax]].)

Buscamos una forma de minimizar a la vez la energía de Rosetta y mantener todos los átomos pesados de una estructura cristalográfica lo más cerca posible de sus posiciones iniciales. 
Como mostrarán muchas de las publicaciones que siguen (o la experiencia ganada a pulso), ejecutar relax en una estructura a menudo mueve la cadena principal unos cuantos ángstroms. 
La mejor manera que hemos encontrado de realizar la optimización simultánea es ejecutar relax con las restricciones siempre activadas (normalmente las restricciones disminuyen gradualmente en los últimos ciclos de una ejecución de relax) y restringir no solo la cadena principal sino también los átomos de las cadenas laterales (lo cual se puede hacer con opciones o con un [[archivo de restricciones|constraint-file]]; consulta [[preparing-structures#generating-constraints-file-for-your-pdb]]).
Este protocolo se ha probado en un conjunto de referencia de 51 proteínas y se ha comprobado que aumenta la recuperación de secuencia en el diseño de enzimas en un 5% en comparación con el diseño en estructuras PDB sin tratar. 
Lo consigue con solo 0.077 ángstroms de RMSD sobre el conjunto de proteínas (RMSD de C-alfa) entre el PDB sin tratar y el PDB relajado con restricciones. 
Más abajo hay una descripción más completa de los datos que llevaron a este protocolo.

# Relax con restricciones sobre todos los átomos pesados: protocolo

Los archivos necesarios están en: `Rosetta/main/source/src/apps/public/relax_w_allatom_cst`. 

También hay una demostración con un archivo de restricciones en lugar de opciones en: `Rosetta/demos/public/prepare_pdb_for_rosetta_with_relax`.

### Protocolo corto (recomendado, sin archivo de restricciones)

El relax con restricciones sobre todos los átomos pesados está integrado en la propia aplicación relax. 
Si se trata de una estructura nueva, puede que quieras limpiarla primero con el script anterior. Relax se ejecuta así:

```
relax.linuxgccrelease  -database Rosetta/main/database [-extra_res_fa your_ligand.params] -relax:constrain_relax_to_start_coords -relax:coord_constrain_sidechains -relax:ramp_constraints false -s your_structure.pdb
```

El archivo de opciones puede contener las opciones de empaquetado y de función de puntuación que quieras usar. Recomendamos al menos:

```
-ex1
-ex2
-use_input_sc
-flip_HNQ
-no_optH false
```

La intensidad y el tipo de las restricciones usadas se pueden variar con las opciones `       -relax:coord_cst_stdev      ` y `       -relax:coord_cst_width      `. 
Por defecto, relax usa una restricción armónica con la intensidad ajustada por `coord_cst_stdev` (menor = más estricta). 
Si se especifica `coord_cst_width`, se usa una restricción de fondo plano y paredes lineales, con el tamaño del pozo de fondo plano controlado por `coord_cst_width` (menor = más estricta) y la pendiente de las paredes por `coord_cst_stdev` (menor = más estricta). 
Puedes encontrar más información sobre las funciones de restricción [[aquí|constraint-file#function-types]].

### Protocolo largo (no recomendado, con archivo de restricciones)

En general se prefiere el protocolo corto para la mayoría de las aplicaciones, ya que esta versión es más complicada y ambos dan resultados casi idénticos. 
En este protocolo, un script aparte genera primero restricciones de átomos de cadenas laterales a partir de un PDB de entrada y después se ejecuta el protocolo relax con este archivo de restricciones pregenerado. 
El protocolo más corto hace todo esto en un solo paso, y **esta versión está en gran medida obsoleta**. 
Algunos usuarios podrían preferir este protocolo porque permite ver una lista de todas las restricciones y, quizá, modificarlas con otros scripts o datos antes de relax.

1. Genera restricciones de coordenadas de cadenas laterales en tu PDB con `sidechain_cst_3.py`:

    ```
    python sidechain_cst_3.py your_structure.pdb 0.1 0.5
    ``` 
    [salida: your\_structure\_sc.cst]

2. Ejecuta relax con estas restricciones y con un script de relax personalizado que fuerce a que las restricciones permanezcan activadas durante toda la ejecución. 
El tiempo de ejecución es de aproximadamente 30 minutos para una proteína de 340 residuos.

    ```
    relax.linuxgccrelease  -database Rosetta/main/database -relax:script Rosetta/main/source/src/apps/public/relax_w_allatom_cst/always_constrained_relax_script -constrain_relax_to_start_coords -constraints:cst_fa_file your_structure_sc.cst -s your_structure.pdb [-extra_res_fa your_ligand.params]
    ```

El `extra_res_fa` entre corchetes solo se aplica si hay ligandos en la estructura. 
El archivo de opciones de ejemplo que figura a continuación se usó en las pruebas:

```
-ex1
-ex2
-use_input_sc
-correct
-no_his_his_pairE
-score::hbond_params correct_params
-lj_hbond_hdis 1.75
-lj_hbond_OH_donor_dis 2.6
-linmem_ig 10
-nblist_autoupdate true
-no_optH false
-flip_HNQ
-chemical:exclude_patches LowerDNA UpperDNA Cterm_amidation SpecialRotamer
VirtualBB ShoveBB VirtualDNAPhosphate VirtualNTerm CTermConnect sc_orbitals
pro_hydroxylated_case1 pro_hydroxylated_case2 ser_phosphorylated
thr_phosphorylated tyr_phosphorylated tyr_sulfated lys_dimethylated
lys_monomethylated lys_trimethylated lys_acetylated glu_carboxylated
cys_acetylated tyr_diiodinated N_acetylated C_methylamidated
MethylatedProteinCterm
```

Nota: incluir rotámeros adicionales es importante si tu objetivo es mantener todos los átomos de las cadenas laterales fuertemente restringidos; si eso no es importante para tus aplicaciones, excluye ex1 y ex2 para ganar velocidad.

# Relax con restricciones sobre todos los átomos pesados: datos

Para probar protocolos de relajación de PDB de entrada usamos el conjunto de prueba de 51 andamiajes (scaffolds) de enzdes. 
Ejecutamos diseño sobre las estructuras de entrada y calculamos el porcentaje de residuos que vuelven con la identidad nativa (recuperación de secuencia), solo sobre los residuos diseñados. 
Por supuesto, esta es una métrica imperfecta (la secuencia original podría no ser totalmente óptima), pero permite preguntarnos cuántos residuos elegirá correctamente Rosetta, suponiendo que la estructura de entrada ya está en un mínimo del espacio de secuencias para el ligando en cuestión. 
Ya se había comprobado que relax por sí solo (sin restricciones) distorsionará la mayoría de las estructuras, y que esas estructuras darán una recuperación de secuencia mucho mayor en el diseño, pero esto es un resultado de la distorsión de la estructura de entrada.

Decidimos probar algunos protocolos para encontrar el que mejor minimizara el RMSD respecto al PDB original y maximizara a la vez la recuperación de secuencia. 
Todos los cálculos son promedios de 50 ejecuciones del conjunto de 51 andamiajes. 
Todos los RMSD son respecto al C-alfa nativo. 
También es posible leer la densidad electrónica de un PDB y usarla como restricción durante relax (se describe [[aquí|density-map-scoring]]), pero la densidad electrónica no está disponible de manera uniforme, y buscábamos un protocolo que funcionara en todos los casos aunque faltara la densidad electrónica. 
Elegimos el primer protocolo como el mejor porque minimizaba el RMSD (y los movimientos de las cadenas laterales) a la vez que maximizaba la recuperación de secuencia.  Consulta [[Nivon et al|preparing-structures#References]] para más información.

Ejecutar relax con restricciones de coordenadas de las cadenas laterales y restricciones de coordenadas de la cadena principal: (opciones ex y use native; opciones ex activadas en enzdes)

-   0.447 de recuperación de secuencia (0.077 de RMSD) [-557 de puntuación total]

Ejecutar relax con restricciones de distancia cadena lateral-cadena lateral con un corte de distancia de 3.5. 
Ten en cuenta que esto consigue una minimización del RMSD similar, pero no maximiza la recuperación de secuencia ni minimiza la puntuación tan bien como las restricciones de coordenadas. 
Probamos este protocolo con diversos valores de corte de la restricción de distancia cadena lateral-cadena lateral y comprobamos que rinde de forma ligera pero sistemática peor que las restricciones de coordenadas:

-   0.436 de recuperación de secuencia (0.0706 de RMSD) (-534 de puntuación total)

Ejecutar relax solo con restricciones de la cadena principal: 
(Ten en cuenta que esto resulta peor en cuanto a RMSD y que muchas cadenas laterales están desviadas unos ángstroms)

-   0.488 de recuperación de secuencia (0.098 de RMSD) (-633 de puntuación total)

Sin relax como referencia y puntuación de Rosetta de las estructuras nativas de entrada:

-   0.40 (0 de RMSD por definición) (-194.7 de puntuación total)

Llegados a este punto, el lector astuto podría preguntar: ¿qué términos de puntuación mejoraron 438 unidades de energía de Rosetta (REU)? 
Ordenamos la diferencia de puntuaciones sobre todas las estructuras, comparando el protocolo de restricciones de coordenadas de todos los átomos con la estructura de entrada sin relajar.
La mayor diferencia es fa\_dun (-192.4), seguida de fa\_rep (-108.1), pro\_close (-26.4), hbond\_sc (-10.8) y omega (-8.5). 
Muchos rotámeros de entrada están cerca de un «buen» rotámero de Dunbrack, pero sin llegar a serlo, y hay que retocar ligeramente la cadena principal para que ese residuo obtenga una buena puntuación de dunbrack. 
Además, muchos átomos están ligeramente demasiado cerca, y dan la contribución de fa\_rep.

# Discusión entre desarrolladores: pregunta original de Ramesh Jha

¿Existe un protocolo de consenso para crear los PDB iniciales que se usarán en mini (Rosetta)? 
No es ningún secreto que los PDB que vienen directamente del Protein Data Bank contienen artefactos y defectos que pueden provocar un salto excepcional de energía si se alteran durante un protocolo de diseño. 
Para minimizar este problema, hay algunas cosas que se pueden probar y que conozco:

1. Reempaquetar (con o sin `-use_input_sc`)
2. Reempaquetar con `sc_min`
3. Relax (fast relax con o sin `use_input_sc`)
4. Idealizar

Tras probarlas todas, pensé que la opción 3 era la mejor, en la que usé fast relax con la opción `-use_input_sc`. 
Pero últimamente he observado que, aunque «relax» es capaz de disminuir sustancialmente la energía de los PDB iniciales, también produce movimientos sutiles en las cadenas principales, y un PDB que podía acomodar un ligando ya no podía hacerlo después de relajarse.

## Respuesta de James

Prueba a añadir la opción `-constrain_relax_to_start_coords` a tu protocolo \#3.

## Respuesta de Ben

He estado usando un protocolo que hace minimización de cadena lateral y principal, empaquetado completo con `-use_input_sc` y después minimización de cadena principal, cuerpo rígido y cadenas laterales. 
Está en: `rosetta/rosetta\_source/src/apps/pilot/stranges/InterfaceStructMaker.cc`. 
La idea es que evita que las cosas se alejen demasiado de la estructura inicial. 
No hay muestreo de la cadena principal, así que normalmente el RMSD respecto a la estructura cristalográfica es \< 1.0. 
En realidad, relax hará muestreo explícito de la cadena principal y por eso da una estructura de menor energía que mi protocolo, pero también puede introducir los cambios que observaste. 
Pego a continuación mi archivo de opciones habitual:

```
-database Rosetta/main/database
-nstruct 20
-ndruns 10
-no_his_his_pairE
-run::min_type dfpmin_armijo_nonmonotone
-ignore_unrecognized_res
-use_input_sc
-ex1
-ex2
-no_optH false
-overwrite
-allow_rbmin true
-min_all_jumps true
-mute protocols.moves.RigidBodyMover protocols.moves.RigidBodyMover core.scoring.etable core.pack.task protocols.docking.DockingInitialPerturbation protocols.TrialMover core.io.database
```

## Respuesta de Sagar

Yo solo uso reempaquetado con `-sc_min` e incluyo el ligando en el proceso.

## Respuesta de Rocco

Hay un programa de minimización con cadena principal fija que forma parte de la aplicación de docking de ligandos, ligand\_rpkmin (consulta la sección «Preparación del receptor proteico para el docking» de [[la documentación de docking de ligandos|ligand dock]]).

Sin embargo, no aliviará ninguna tensión de la cadena principal, así que aún puedes tener problemas si el protocolo posterior permite el movimiento de la cadena principal.

## Respuesta de Steven C.

En general, el laboratorio Meiler hace lo siguiente:

1. Obtener la proteína con un script (consulta los scripts de python adjuntos; los scripts los escribió, creo, James Thompson del laboratorio Baker, y yo los edité para que funcionen con la configuración del laboratorio Meiler). El script limpia y renumera la proteína, y elimina las conformaciones múltiples de residuos.
2. `relax.linuxgccrelease -ex1 -ex2 -ex1aro -relax:sequence`

Esto aliviará los choques en la proteína y dará una buena estructura inicial para cualquiera de las aplicaciones de Rosetta... a menos que la proteína explote por algún motivo.

Con un apéndice de James Thompson:

¡Gracias, Steven! Es una forma muy razonable de suavizar estructuras del PDB, aunque hay muchas maneras distintas de intentarlo.

Se me ocurren dos cosas más:

-   Si notas que tu proteína se mueve demasiado, prueba a añadir la opción `-constrain_relax_to_start_coords`. Esto usará restricciones de coordenadas para que tu proteína se mantenga más cerca de tu modelo de entrada.
-   Además, Mike Tyka escribió ese script para limpiar PDB. Una de las partes más útiles de ese script es que hace corresponder los aminoácidos no canónicos (como las selenometioninas) con el aminoácido canónico adecuado.

Con un segundo apéndice de Andrew Leaver-Fay:

Pensé que podría señalar dos cosas:

1. ex1aro no hace nada extra si ya tienes ex1 en tu línea de comandos. Sin embargo, puedes establecer el nivel de muestreo de ex1aro más alto que el de ex1; por ejemplo, `-ex1 -ex1aro:level 4`. Esto se indica de forma muy explícita en la documentación de las opciones, pero sigue sorprendiendo a mucha gente. En Rosetta++, `-ex1aro` se comportaba como si fuera `-ex1aro:level 4`.
2. Mike ha observado que los rotámeros adicionales no producirán estructuras de menor energía con relax; sí lo harán más lento.

# Limitaciones

Este no es el relax «normal»; es decir, no encontrará el mínimo global de energía de tu estructura, solo encontrará una buena energía que sea coherente con las posiciones atómicas de entrada.

# Posprocesamiento

¿Qué pasos de posprocesamiento son típicos? 
¿Son útiles los gráficos de puntuación frente a RMSD? 
¿Se agrupan las estructuras en clústeres (en tal caso, indica una línea de comandos)? 
¿Es evidente cuándo la aplicación ha tenido éxito o ha fallado (por ejemplo, si el protocolo hace predicciones como «esta es la conformación acoplada de las proteínas A y B»)? 
En el caso de los diseños, ¿cómo deben seleccionarse?

## Véase también

* [[Cómo hacer que Rosetta resista PDB mal formados|robust]]
* [Tutorial sobre el control de la entrada y la salida](https://www.rosettacommons.org/demos/latest/tutorials/input_and_output/input_and_output#controlling-input_preparing-a-structure-by-refinement)
* [[Preparing ligands]]: preparación de ligandos para usarlos en Rosetta
* [Tutorial sobre la preparación de residuos que no son proteínas](https://www.rosettacommons.org/demos/wiki/tutorials/prepare_ligand/prepare_ligand_tutorial)
* [[Preparing PDB files for non-peptide polymers]]
* [[Preparación de archivos PDB que contienen proteína y ARN|RNA-protein-changes]]
* [[Running Rosetta with options]]: instrucciones para ejecutar aplicaciones de Rosetta en la línea de comandos
* [[File types list]]: tipos de archivo que usa Rosetta
