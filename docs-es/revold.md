# RosettaEvolutionaryLigand (REvoLd)

# Propósito

RosettaEvolutionaryLigand (REvoLd) es un algoritmo evolutivo para muestrear de forma eficiente moléculas pequeñas de bibliotecas combinatorias basadas en fragmentos y de fabricación bajo demanda, como Enamine REAL. Se diseñó para optimizar una puntuación de aptitud normalizada basada en RosettaLigand, pero puede usarse con cualquier RosettaScript. En 24 horas puede llevarte de no saber nada sobre los ligandos potenciales a una lista de compuestos prometedores. Solo necesitas una estructura de entrada como diana, la definición de la biblioteca combinatoria y alguna idea de dónde está el sitio de unión.

REvoLd se suele ejecutar varias veces con inicios independientes para muestrear mejor el espacio químico. Cada ejecución encuentra distintos ligandos de baja energía. Una sola ejecución muestrea entre 1,000 y 4,000 ligandos. Según el hardware y el tiempo que tengas disponibles, sugiero entre 10 y 20 ejecuciones.

# Referencia

Eisenhuth, Paul, et al. "REvoLd: Ultra-Large Library Screening with an Evolutionary Algorithm in Rosetta." arXiv preprint arXiv:2404.17329 (2024). [[Artículo preliminar|https://arxiv.org/abs/2404.17329]]

# Inicio rápido

Esta sección está pensada para que ejecutes REvoLd lo más rápido posible y te da toda la información necesaria. Sin embargo, buena parte depende de trabajo ajeno al alcance de REvoLd, por lo que puede cambiar sin que se actualice aquí. Si tienes dificultades para compilar REvoLd u obtener el código de Rosetta, ponte en contacto con RosettaCommons. Si no puedes conseguir la biblioteca combinatoria a través de BioSolveIt, contacta directamente con Enamine, usa cualquier otro proveedor o crea una tú mismo.

Recomendamos encarecidamente ejecutar REvoLd solo con soporte MPI mediante mpirun/mpiexec/srun/etc. Según el tamaño de tu biblioteca combinatoria, podrías necesitar entre 200 y 300 GB de RAM (en total, no por CPU). Recomendamos usar entre 50 y 60 CPU por ejecución.

### Biblioteca combinatoria

En nuestro artículo y en la campaña de descubrimiento de fármacos en la que participamos usamos el espacio REAL de Enamine. Sin embargo, cualquier biblioteca combinatoria es adecuada. Los campos obligatorios se mencionan en la sección de entrada.

Enamine Ltd. ha externalizado a BioSolveIt la concesión de licencias de los datos de entrada de su espacio REAL. Puedes contactarlos aquí: https://www.biosolveit.de/contact/. Según nuestra experiencia, si planeas usar los datos de entrada de REAL exclusivamente para investigación académica, el proceso del acuerdo de confidencialidad (NDA) es sencillo y por lo general no presenta problemas. Puedes mencionar a la Universidad de Leipzig y tu plan de usar REvoLd para tu investigación académica.

**ACTUALIZACIÓN:** Por desgracia, parece que BioSolveIT ya no concede gratis las licencias de los archivos de definición y exige en cambio una licencia de 5,000 EUR al año. Este es el precio para un uso puramente académico.

### Código

El código está disponible en GitHub: https://github.com/RosettaCommons/rosetta

Puedes descargarlo con:

```
git clone https://github.com/RosettaCommons/rosetta.git
```

Esto creará un directorio llamado rosetta en tu directorio de trabajo actual, con el código.

### Compilación

Asegúrate de haber clonado la última versión de Rosetta y de tener disponible un compilador MPI (por ejemplo, mpiCC).

```
# navigate into your local Rosetta clone
cd Path/to/rosetta/source
# overwrite compile settings
cp tools/build/site.settings.release tools/build/site.settings
# start compile
./scons.py -j <num of processors> revold mode=release extras=mpi
```

#### Solución de problemas

Puede que tengas problemas con las versiones de MPI o que SCons dé el error «mpiCC not found». En esos casos, descomenta dos líneas en tools/build/site.settings, en la parte de «override», y cambia la ruta a tu versión correcta de MPI:

```
"cxx" : "/path/to/mpicxx",
"cc"  : "/path/to/mpicc",
```

Además, asegúrate de que SCons intente usar el compilador MPI correcto disponible en tu equipo. Si tienes mpicc disponible, pero SCons intenta usar mpiCC, fallará. En ese caso, abre tools/build/basics.settings y cambia todas las apariciones de mpiCC por mpicc.

# Entrada

REvoLd necesita una única estructura de proteína como diana. Recuerda [[prepararla|rosetta_basics/preparation/preparing-structures]]. Además, necesitas la definición del espacio combinatorio del que muestrear. Esto requiere dos archivos: uno que defina las reacciones y otro que defina los reactivos (o los fragmentos y las reglas para enlazarlos). Pueden obtenerse, bajo un NDA, de proveedores como Enamine o de cualquier otra fuente, incluidos los de elaboración propia. La definición consta de dos archivos separados por espacios en blanco, con líneas de encabezado que incluyen los siguientes campos:

1. reactions: reaction_id (un nombre o número que identifica la reacción), components (número de fragmentos que participan en la reacción), Reaction (cadena SMARTS que define la reacción o el acoplamiento de fragmentos)

2. reagents: SMILES (que define el reactivo), synton_id (identificador único del reactivo), synton# (que especifica la posición al aplicar la reacción SMARTS, [1,...,components]), reaction_id (identificador coincidente para vincular el reactivo con una reacción)

Por último, REvoLd necesita un RosettaScript que se aplicará varias veces a cada complejo proteína-ligando para el docking y la puntuación. Usamos el script de RosettaLigand ([[archivo xml|rosettaligand-cleaned-dock]] [artículo](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0132508)). El archivo xml está ligeramente modificado respecto a la publicación original para corregir algunos errores de sintaxis y ofrecer un sitio de unión lo bastante grande para la mayoría de las moléculas pequeñas. Quizá quieras cambiar [[box_size en la etiqueta Tranform|scripting_documentation/RosettaScripts/Movers/movers_pages/TransformMover]] y [[width en la etiqueta ScoringGrid|https://docs.rosettacommons.org/docs/wiki/scripting_documentation/RosettaScripts/RosettaScripts#rosettascript-sections_ligands_scoringgrids]] para adaptarlos a tus objetivos.

Resumen de los archivos necesarios:

1. Estructura de la proteína, [[preparada|rosetta_basics/preparation/preparing-structures]]
2. Archivo de reacciones
3. Archivo de reactivos
4. Script xml de docking

# Opciones de línea de comandos

Puedes usar cualquier opción de Rosetta en la línea de comandos o en un archivo de opciones. A continuación se indican las opciones obligatorias de REvoLd y sus ajustes opcionales específicos.

### Opciones obligatorias

```
-in:file:s                      Protein structure used as target
-parser:protocol                RosettaScript used for refining and scoring protein-ligand complexes
-ligand_evolution:xyz           Centroid position for initial ligand placement
-ligand_evolution:reagent_file  Path to reagents file
-ligand_evolution:reaction_file Path to reactions file
-ligand_evolution:main_scfx     Name of the scoring function specified in the docking protocol which should be used for scoring compounds.
```

### Opciones adicionales

```
-ligand_evolution:options                Path to the REvoLd evolution options file, allows changing the evolutionary optimization, detailed below
-ligand_evolution:external_scoring       Triggers vHTS mode, detailed below
-ligand_evolution:smiles_file            Triggers vHTS mode, detailed below
-ligand_evolution:n_scoring_runs         How often should the scoring protocol be applied to each complex. Defaults to 150.
-ligand_evolution:ligand_chain           Name of the ligand chain used in the docking protocol. Defaults to X.
-ligand_evolution:pose_output_directory  Directory to which all calculated poses will be written. Defaults to the run directory.
-ligand_evolution:score_mem_path         Path to a former results file to load as score memory. Needs to be in REvoLd output format. REvoLd will check if a ligand is present in the memory file and use its score instead of docking it.
-ligand_evolution:main_term              Name of the main term used as fitness function. Defaults to lid_root2. Terms are detailed below.
-ligand_evolution:n_generations          For how many generations should REvoLd optimize. Defaults to 30.
```

# Ejemplo

```
mpirun -np 20 bin/revold.mpi.linuxgccrelease               \
       -in:auto_setup_metals                               \
       -in:file:s 5ZBQ_0001_A.pdb                          \
       -parser:protocol docking_perturb.xml                \
       -ligand_evolution:xyz -46.972 -19.708 70.869        \
       -ligand_evolution:main_scfx hard_rep                \
       -ligand_evolution:reagent_file reagents_short.txt   \
       -ligand_evolution:reaction_file reactions_short.txt \
```

**Importante**: No inicies nunca varias ejecuciones de REvoLd en el mismo directorio, porque se sobrescribirían los resultados unas a otras.

# Resultados

Después de ejecutar REvoLd encontrarás varios archivos en tu directorio de ejecución:

1. De 1,000 a 4,000 archivos pdb con un código numérico como nombre. Son los complejos con mejor puntuación, calculados con tu script de docking definido, para cada ligando considerado durante la optimización.
2. **ligands.tsv** - _Este es el resultado principal de REvoLd_. Contiene toda la información de cada ligando acoplado durante la optimización, ordenada por el término de puntuación principal (por defecto lid_root2). El id numérico corresponde al nombre del archivo pdb.
3. population.tsv - Este archivo puede ignorarse en la mayoría de los casos. Contiene información de la población para quien quiera analizar la dinámica de la optimización evolutiva, pero no es fácil de leer porque está pensado solo para fines de desarrollo. Se divide en tres bloques, cada uno con su propio encabezado. Primero, una correspondencia para convertir los ids numéricos de los ligandos (los mismos que los del pdb) en ids de individuos. Segundo, información de aristas del árbol genealógico y, tercero, una lista de todas las poblaciones existentes durante la optimización.

# Descripción del algoritmo

Los detalles se encuentran en la publicación. En resumen, REvoLd parte de una población de ligandos (200 por defecto) muestreados al azar del espacio combinatorio de entrada. Cada ligando se añade a una copia de la Pose diana y se coloca en la posición xyz especificada. El protocolo de docking se aplica n_scoring_runs veces (150 por defecto). Después de cada aplicación se puntúa la Pose proteína-ligando con la función de puntuación principal especificada. Las puntuaciones resultantes se usan para calcular las puntuaciones específicas de REvoLd, que en adelante llamaremos puntuaciones de aptitud:

1. total_REU: Energía de Rosetta del complejo completo
2. ligand_interface_delta: Diferencia entre el complejo unido y el no unido. La energía del complejo no unido se calcula alejando el ligando 500 A de la proteína diana y volviendo a puntuar sin relajación adicional.
3. ligand_interface_delta_EFFICIENCY: Las puntuaciones de ligand interface delta (lid) divididas por el número de átomos que no son de hidrógeno del ligando
4. lid_root2: Igual que la eficiencia, pero se usa la raíz cuadrada del número de átomos que no son de hidrógeno
5. lid_root3: Igual que lid_root2, pero con la raíz cúbica en lugar de la cuadrada

El término principal especificado (por defecto lid_root2) se usa para seleccionar el mejor resultado de docking de cada ligando, y la Pose correspondiente se escribe en un archivo. Su puntuación se usa también como aptitud del ligando. Tras puntuar cada ligando, hay que reducir la población para simular la presión selectiva (por defecto, a un tamaño de 50 ligandos). Esto se hace mediante un selector (por defecto, selección por torneo). Por último, comienza el ciclo de optimización evolutiva, que se repite hasta alcanzar el número máximo de generaciones (30 por defecto). Después de cada generación se guarda toda la información de los ligandos.

Cada generación comienza seleccionando individuos de la población actual para producir descendencia. Esto puede modificarse con flexibilidad mediante combinaciones de selectores y fábricas de descendencia. La descendencia resultante puede ser idéntica a sus progenitores, para conservar en generaciones futuras los ligandos bien adaptados; mutaciones que cambian un único fragmento; o cruces entre dos progenitores que combinan fragmentos de ambos.

# Opción vHTS

REvoLd también puede usarse para puntuar una lista de SMILES distribuida entre varios procesadores si se establecen las opciones mencionadas external_scoring y smiles_file. Cada procesador de la llamada a mpirun seleccionará su propio fragmento, de igual tamaño, de SMILES del smiles_file, convertirá cada SMILES en un complejo proteína-ligando, lo colocará en la posición xyz especificada y aplicará el RosettaScript especificado n_scoring_runs veces. No se escribirán pdb durante vHTS para reducir los requisitos de espacio en disco, pero cada proceso creará un archivo llamado external_results_<procID>.csv. Este archivo contendrá, para cada ligando, tantas líneas como defina external_scoring, correspondientes a los n mejores resultados del docking. Cada línea tiene la forma smiles;term1;term2;...;termN

# Script evolutivo

El ciclo de optimización evolutiva de REvoLd es muy modular y puede modificarse. Sin embargo, esta opción no suele ser importante si lo que quieres es usar REvoLd. Los ajustes por defecto se han evaluado en benchmarks y han mostrado un rendimiento fiable. Aun así, si quieres cambiarlo, usa -ligand_evolution:options para especificar un archivo xml:

```xml
<Population main_selector="std_tournament" supported_size="50"/>
<PopulationInit init_type="random" size="200"/>
<PopulationInit init_type="best_loaded" size="25" selection="1000"/>

<Scorer similarity_penalty="0.5" similarity_penalty_threshold="0.95"/>

<Selector name="remove_elitist" type="elitist" size="15" remove="True"/>
<Selector name="std_tournament" type="tournament" size="15" remove="False" tournament_size="15" acceptance_chance="0.75"/>
<Selector name="std_roulette" type="roulette" size="15" remove="False" consider_positive="False"/>

<Factory name="std_mutator" type="mutator" size="30" reaction_weight="1.0" reagent_weight="2.0" min_similarity="0.6" max_similarity="0.99"/>
<Factory name="drastic_mutator" type="mutator" size="30" reaction_weight="0.0" reagent_weight="1.0" min_similarity="0.0" max_similarity="0.25"/>
<Factory name="reaction_mutator" type="mutator" size="30" reaction_weight="1.0" reagent_weight="0.0" min_similarity="0.6" max_similarity="0.99"/>
<Factory name="large_crossover" type="crossover" size="60"/>
<Factory name="std_identity" type="identity" size="15"/>

<!--order is important here-->
<EvolutionProtocol selector="std_roulette" factory="std_mutator"/>
<EvolutionProtocol selector="std_roulette" factory="large_crossover"/>
<EvolutionProtocol selector="std_roulette" factory="drastic_mutator"/>
<EvolutionProtocol selector="std_roulette" factory="reaction_mutator"/>
<EvolutionProtocol selector="remove_elitist" factory="std_identity"/>
<EvolutionProtocol selector="std_roulette" factory="std_mutator"/>
<EvolutionProtocol selector="std_roulette" factory="large_crossover"/>
```

Las etiquetas se explican con más detalle:

* Population
    * Define cómo se aplica la presión selectiva al avanzar de generación
    * main_selector: Nombre de uno de los selectores definidos
    * supported_size: Número máximo de individuos que avanzan a la siguiente generación
* PopulationInit
    * Define un operador para generar la población inicial
    * random: Extrae <size> ligandos al azar de la biblioteca combinatoria
    * best_loaded: Necesita que se defina una sore_memory. Primero elige los <selection> mejores ligandos de esa lista y después muestrea al azar <size> ligandos de entre ellos
* Scorer
    * Define cómo se penalizará la similitud entre moléculas para imponer moléculas diversas dentro de cada población
    * similarity_penalty: Penalización fija que se sumará a la aptitud calculada de cada molécula con mayor aptitud que supere el similarity_penalty_threshold (similitud de Tanimoto de huellas de RDKit)
* Selector
    * Selecciona <size> individuos de una población para pasarlos a una fábrica de descendencia. Si <remove> es true, los individuos seleccionados se eliminan de la población actual y no pueden volver a producir descendencia.
    * elitist: Simplemente selecciona los mejores ligandos
    * roulette: Cada ligando tiene una probabilidad proporcional a su aptitud relativa; por ejemplo, un ligando con lid_root2 de -4.0 tiene el doble de probabilidades de ser seleccionado que uno con -2.0. <consider_positive> activa una transformación lineal de todas las puntuaciones a un rango negativo, pero esto puede tener un impacto no deseado y no debería usarse.
    * tournament: Considera solo la clasificación de los ligandos en lugar de la diferencia relativa de sus puntuaciones. Se juegan <size> torneos consecutivos y cada ganador se pasa a la fábrica de descendencia. En cada torneo se seleccionan <tournament_size> ligandos al azar para participar. A continuación se ordenan por aptitud y se ofrece la victoria al primer ligando, que la acepta con una probabilidad de <acceptance_chance>. Si se acepta la victoria, el torneo termina y comienza el siguiente, con el último ganador excluido de participar. Si se rechaza, se ofrece al segundo ligando, luego al tercero, y así sucesivamente.
* Factory
    * Recibe un conjunto de ligandos progenitores que se usará para generar <size> moléculas nuevas sin alterar a los progenitores
    * identity: Simplemente copia el ligando progenitor. Esto, combinado por ejemplo con el selector elitist, permite que las mejores moléculas persistan a lo largo de las generaciones.
    * mutator: Toma un progenitor y cambia la reacción o uno de los fragmentos. <reaction_weight> y <reagent_weight> especifican la probabilidad de cada operación. Si se cambia la reacción, se buscan en la nueva reacción los reactivos más parecidos al progenitor. Si se cambia un fragmento, se consideran todos los reemplazos adecuados siempre que estén por debajo de <max_similarity> y por encima de <min_similarity> respecto al progenitor
    * crossover: Combina fragmentos de dos progenitores emparejados al azar para producir un ligando nuevo
* EvolutionProtocol:
    * Cada etiqueta define, en orden, qué selector se aplicará a la población actual y a qué fábrica se pasarán los individuos seleccionados. Toda la descendencia se almacenará en una población temporal y reemplazará a la población actual en cuanto terminen todos los pasos del protocolo.

Al analizar un nuevo protocolo evolutivo se realizan comprobaciones exhaustivas, con mensajes de error informativos. Si te interesa escribir tu propio protocolo, te sugerimos simplemente experimentar con este sistema.

# Véase también

* [[Preparación de estructuras|rosetta_basics/preparation/preparing-structures]]
* [[RosettaLigand|application_documentation/docking/ligand-dock]]
* [[Transform Mover|scripting_documentation/RosettaScripts/Movers/movers_pages/TransformMover]]
* [[HighRes Mover|scripting_documentation/RosettaScripts/Movers/movers_pages/HighResDockerMover]]
* [[Final Minimizer|scripting_documentation/RosettaScripts/Movers/movers_pages/FinalMinimizerMover]]
* [[InterfaceScoreCalculator|scripting_documentation/RosettaScripts/Movers/movers_pages/InterfaceScoreCalculatorMover]]
