#Aplicaciones

Esta es una lista de todas las aplicaciones de Rosetta que se compilan con las versiones semanales, a fecha del 15 de junio de 2015.

### [[performance_benchmark|performance-benchmarks]]
Ejecuta los benchmarks de rendimiento, que determinan si los cambios recientes en el código de Rosetta han alterado sustancialmente su rendimiento.
Por lo general, los usuarios no se benefician de ejecutar esta aplicación, a menos que intenten hacer modificaciones importantes a Rosetta.

### [[ddg_benchmark]]
Ejecuta una prueba científica que calcula el delta-delta-G de la mutación a alanina para varios residuos con valores experimentales conocidos.
Al igual que el benchmark de rendimiento, es muy poco probable que cualquier modificación de un usuario en el código de un protocolo pueda propagarse hacia atrás y afectar a este benchmark.

### [[design_contrast_and_statistic]]
Ejecuta diseño fixbb sobre varios PDB para probar la distribución global de tipos de aminoácidos que devuelve ese algoritmo.

### [[rotamer_recovery]]
Reempaqueta un PDB e informa cuántos rotámeros conservó el packer: esta estadística de calidad de la función de puntuación está pensada para ejecutarse sobre PDB de muy alta calidad, porque lo deseable es que se reproduzcan los buenos rotámeros nativos.

### [[AbinitioRelax|abinitio-relax]]
Realiza determinación de estructura _ab initio_ usando archivos de fragmentos y predicciones de estructura secundaria.

### [[backrub]]
Ejecuta el mover backrub, que implica un tipo particular de muestreo de la cadena principal destinado a mantener interacciones y orientaciones coherentes de las cadenas laterales

### [[cluster]]
Selecciona los primeros 400 modelos para crear clústeres según la distancia CA y el radio del clúster. Asigna las estructuras restantes de una en una calculando la distancia a los clústeres creados previamente; fuera del radio del clúster, se crea un nuevo clúster.

### [[combine_silent]]
Combina varios silent files en uno.

### [[extract_pdbs|extract-pdbs]]
Extrae de un silent file a un archivo PDB los modelos con las etiquetas proporcionadas.

### [[fragment_picker|app-fragment-picker]]
Dada una secuencia de proteína y, opcionalmente, la estructura secundaria u otra información, produce un archivo de fragmentos de la(s) longitud(es) deseada(s) a partir del "vall", la biblioteca de fragmentos de Rosetta.

### [[idealize_jd2]]
Reemplaza cada residuo de un Pose por las coordenadas idealizadas tomadas de la base de datos.

### [[minimize]]
Minimiza localmente una estructura usando una función de puntuación y un tipo de minimización dados.

### [[minimize_ppi]]
Minimiza un ligando en una interfaz y escribe mucha información de análisis.

### [[packstat | RosettaHoles]]
Calcula estadísticas avanzadas de detección de cavidades en estructuras PDB para analizar la calidad del empaquetamiento.

### [[relax]]
Realiza ciclos de minimización con todos los átomos y reempaquetamiento de cadenas laterales con un término repulsivo creciente. Responde a un script de relajación proporcionado.

### [[remodel]]
Aplicación extremadamente versátil para expandir y contraer estructuras; en esencia, lleva el marco de muestreo del modelado de loops a escenarios que requieren diseño.

### [[sequence_tolerance | Sequence tolerance]]
Esta aplicación usa un algoritmo genético y muestreo backrub repetido con un resfile para optimizar la secuencia de una proteína y explorar el rango de identidades de residuos que esa estructura permite.

### [[SymDock|sym-dock]]
Hace docking de un conjunto de oligómeros simétricos.

### [[vip | RosettaHoles]]
Localiza vacíos enterrados usando una versión temprana de RosettaHoles e intenta mutaciones puntuales que podrían reducir el volumen del vacío.

### [[contactMap]]
Determina qué residuos están en contacto entre sí.

### [[ensemble_analysis]]
Obtiene el RMSD ponderado de un conjunto de decoys, los alinea y los escribe.

### [[fast_clustering]]
Obtiene el RMSD ponderado de un conjunto de decoys y luego los agrupa, usando un algoritmo de agrupamiento más tradicional que cluster.

### [[InterfaceAnalyzer | Interface analyzer]]
Realiza un análisis exhaustivo de los residuos presentes en la interfaz y genera una gran variedad de métricas.

### [[PeptideDeriver | PeptiDerive]]
Forma un macrociclo peptídico a partir de una conformación de un péptido en un bolsillo de unión.

### [[per_residue_energies]], [[residue_energy_breakdown|residue-energy-breakdown]]
Imprime el desglose de energía por residuo de cada residuo de un Pose.

### [[score]], [[score_jd2 | score-commands]]
Puntúa un PDB dado con la función de puntuación solicitada. También se puede usar para extraer de un silent file a un PDB los modelos con una etiqueta dada. score_jd2 aprovecha el distribuidor de trabajos moderno.

### [[antibody_legacy]]
Código heredado para determinar estructuras de anticuerpos.

### [[antibody_graft | antibody-assemble-cdrs]]
Injerta un nuevo loop en un marco de anticuerpo existente.

### [[antibody_H3 | antibody-model-CDR-H3]]
Modela el loop CDR H3 de un anticuerpo junto con la optimización de los loops circundantes y de la orientación VH/VL.

### [[minirosetta|minirosetta]]
Una aplicación comodín que, en las versiones de Rosetta anteriores a la tres, hacía prácticamente todo. Se distribuye con BOINC para realizar las tareas de Rosetta@Home. Probablemente no necesites ejecutar esta aplicación.

### [[minirosetta_graphics|minirosetta]]
Minirosetta, pero con un visor gráfico.

### [[cluster_alns]]
Agrupa componentes de alineamientos múltiples de secuencias según la similitud de secuencia.

### [[fix_alignment_to_match_pdb]]
Configura la numeración de los alineamientos para que coincidan con los PDB proporcionados.

### [[full_length_model]]
Obtiene un modelo de longitud completa de una proteína a partir de un alineamiento.

### [[partial_thread]]
Enhebra (thread) cada Pose de entrada sobre el Pose plantilla. 

### [[score_aln]], [[score_aln2]]
Puntúa alineamientos usando un PSSM proporcionado; score_aln2 usa maquinaria especializada en modelado comparativo y es la preferida.

### [[super_aln]]
Superpone dos Poses dados, ya sea mediante residuos objetivo proporcionados o con todos los residuos.

### [[validate_silent]]
Elimina manualmente del silent proporcionado cualquier discrepancia de secuencia o simulación fallida.

### [[coupled_moves]]
Realiza movimientos acoplados, en los que el mover de rotámeros de Boltzmann (que, a diferencia del packer, hace un esfuerzo concertado por lograr _diversidad de secuencia_) reempaqueta y se hacen pequeños movimientos de la cadena principal al mismo tiempo.

### [[DARC]]
Emplea algoritmos de trazado de rayos (optimizados para ejecutarse en GPU) para lograr el docking de ligandos.

### [[make_ray_files|DARC#Other-Input-files-for-DARC]]
Crea archivos de entrada para usar el trazado de rayos en el alineamiento. Esta aplicación es independiente en gran parte porque DARC se beneficia de la aceleración por GPU y esta no.

### [[ddg_monomer|ddg-monomer]]
Calcula la energía de mutación de mutaciones puntuales (o múltiples) de un PDB dado.
Muestrea conjuntos del tipo silvestre y del mutante y da las energías de cada uno, ya sea como el promedio de las tres energías más bajas, la energía más baja o la energía promedio.

### [[ensemble_generator_score12_sidechain_ver2]]
Crea un conjunto de estructuras usando minimización con restricciones en todos los pares de CA, opcionalmente movimientos pequeños y de cizalla (shear), y pruebas de rotámeros.
En principio, puntuar y calcular estadísticas de los conjuntos del tipo silvestre y del mutante generados por esta función sería otro modo de predicción de ddG; es importante señalar que, para el ddG de interfaz, no modelaría explícitamente los estados unido y no unido.

### [[minimize_with_cst]]
Minimiza con restricciones en todos los pares de átomos CA. I

### [[fixbb]]
Reempaqueta un Pose usando un resfile.
Naturalmente, el uso emblemático de fixbb es el diseño de cadena principal fija; internamente es idéntico a reempaquetar un Pose con un resfile y simplemente permitir rotámeros de otros aminoácidos en una o más posiciones.

### [[mpi_msd | mpi-msd]]
Realiza diseño multiestado con MPI usando un algoritmo genético con una estructura que asegura que los residuos correspondientes de distintos estados se empaqueten en el mismo rotámero.

### [[pmut_scan_parallel|pmut-scan-parallel]]
Busca mutaciones estabilizadoras en una proteína.
Esta aplicación puede ejecutarse en un modo de doble mutante que exige que los residuos mutados en cuestión tengan al menos un átomo en contacto entre sí.
También puede aceptar solo una lista dada de mutaciones, escribir estructuras, aceptar un corte de ddg e intentar, en cambio, desestabilizar una interfaz. 

### [[sequence_recovery|sequence-recovery]]
Realiza diseño de cadena principal fija y analiza las secuencias producidas con una estadística llamada recuperación de secuencia: con qué frecuencia se reprodujo la secuencia nativa para distintos tipos de residuo (polar, alifático, ...) y entornos (núcleo, superficie, ...).

### [[beta_peptide_modeling]]
Reempaqueta, rediseña o minimiza un complejo que comprende una o más cadenas de beta-péptidos. (Es importante señalar que aquí un beta-péptido no se refiere a una conformación, sino a que está compuesto por beta-aminoácidos).

### [[rna_design|rna-design]]
Realiza diseño sobre Poses de ARN. Esta aplicación puede ser preferible para el diseño de ARN porque puede procesar opciones críticas, como si se debe muestrear un chi de protón concreto en O2', y escribir información útil, como si los residuos están en entornos particulares (hebra sencilla, hebra doble o contacto terciario).

### [[supercharge]]
Pensada para mutar los residuos expuestos de modo que tengan predominantemente carga positiva o negativa, por las propiedades biológicas útiles que resultan.
Se puede establecer una carga objetivo o no; puede ejecutarse en un modo determinista AvNAPSA o en un modo estocástico pack_rotamers.
Por defecto, solo muta a lisina en el modo positivo o a glutamato (excepto partiendo de asparagina) en el modo negativo; puede aceptar energías de referencia personalizadas en el modo Rosetta.

### [[zinc_heterodimer_design | Zinc heterodimer design]]
Diseña tres residuos de un sitio de unión a zinc en anquirina, luego usa un residuo de la otra proteína para definir la orientación de la interfaz, muestrea el espacio de cuerpo rígido y después diseña.

### [[zinc2_homodimer_setup]]
Prepara una interfaz homodimérica mediada por la coordinación de dos átomos de zinc: injerta en la superficie de la proteína dos coincidencias de sitios de unión a zinc de dos residuos, y rota alrededor del eje zinc-zinc y del eje perpendicular.
Busca en malla las rotaciones del eje zinc-zinc y escribe los Poses no eclipsados con buena geometría del metal.

### [[zinc2_homodimer_design]]
Diseño simétrico sobre un homodímero mediado por zinc, con minimización de cadenas laterales, cadenas principales y del salto (jump).

### [[docking_prepack_protocol|docking-prepack-protocol]]
Prepackea la interfaz entre un par de cadenas para preparar una simulación de docking.

### [[docking_protocol | docking-protocol]]
El caballo de batalla del docking clásico de cuerpo rígido, que puede realizar tanto el protocolo global centroid de baja resolución como el protocolo de refinamiento de alta resolución.

### [[loops_from_density|loops-from-density]]
Dada una estructura y datos de densidad electrónica con los que tiene un mal ajuste, genera archivos de loops que harían que Rosetta remodele hasta la fracción dada de la estructura inicial.

### [[mr_protocols | mr-protocols]]
Usa fragmentos para realizar un protocolo de reemplazo molecular en datos de densidad electrónica.

### [[CstfileToTheozymePDB|match-cstfile-format]]
Dado un archivo de restricciones de enzimas, produce un árbol de rotámeros inversos de los residuos en cuestión (que forman una "enzima teórica" geométricamente ideal) y lo escribe como un PDB multimodelo.
Como "funcionalidad oculta", puede tomar un PDB con -s que se alineará con la teozima creada.

### [[enzyme_design | Enzyme Design]]
Realiza diseño de enzimas con cadena principal fija o flexible y muestreo de rotámeros del ligando.

### [[rna_cluster|rna-denovo#how-can-I-cluster-models]]
Algoritmo de agrupamiento especializado para trabajar con ARN

### [[rna_database|rna-denovo#use-of-alternative-fragment-sources]]
Convierte los archivos PDB que contienen ARN proporcionados en el equivalente en ARN de un archivo de fragmentos "vall", que en su lugar solo almacena torsiones.
Del mismo modo, almacena orientaciones de cuerpo rígido

### [[rna_denovo|rna-denovo]]
Diseño de novo de estructuras de ARN; se diferencia del ab initio en el contexto de proteínas en que usa "archivos de fragmentos" que en realidad son solo torsiones y orientaciones relativas de cuerpo rígido.

### [[rna_extract|rna-denovo#Extraction-Of-Models-Into-PDB-Format]]
Extrae estructuras de ARN de silent files

### [[rna_minimize|rna-denovo#How-do-I-just-minimize?]]
Minimiza estructuras de ARN usando RNAMinimizer (preferido); puede variar la geometría de los enlaces y omitir pruebas del chi de O2'.

### [[rna_score|rna-denovo#How-do-I-just-score?]]
Puntúa estructuras de ARN.

### [[cs_rosetta_rna|CS-Rosetta-RNA]]
Resuelve estructuras de ARN usando restricciones de ARN.

### [[FiberDiffractionFreeSet]]
Emplea datos de difracción de fibras para refinar estructuras de proteínas.

### [[BuildPeptide|build-peptide]]
Construye un péptido de una secuencia dada en conformación extendida.

### [[FlexPepDocking | flex-pep-dock]]
Hace docking de un péptido en un bolsillo de unión con total flexibilidad de la cadena principal del péptido. Se prefiere un Pose inicial con el péptido cerca de su supuesto bolsillo de unión, aunque en el modo ab initio no se necesita ningún conocimiento sobre la conformación final del péptido.

### [[AnchoredDesign | Anchored design]]
Diseña una interfaz proteína-proteína anclada por una porción injertada de una interfaz nativa.

### [[AnchoredPDBCreator | Anchored pdb creator]]
Injerta una región "ancla" de una proteína en otra para ayudar a que esta última se una con éxito al compañero nativo de la primera.

### [[AnchorFinder | Anchor finder]]
Localiza en el PDB interfaces que tienen regiones "ancla" de alto carácter de loop y excelentes energías de unión de interfaz, para injertarlas en otras proteínas y ayudar en la dimerización.

### [[validate_database]]
Asegura que la base de datos de Rosetta sea internamente coherente (por ejemplo, que las bibliotecas de Dunbrack produzcan binarios correctos).

### [[extract_atomtree_diffs|extract-atomtree-diffs]]
Los silent files Atomtree_diff son un formato particular de silent file; esta aplicación los convierte en muchos archivos PDB.

### [[ligand_dock | ligand-dock]]
Hace docking de ligandos a proteínas. OBSOLETA POR los movers de RosettaScripts. Su uso no está respaldado y solo es relevante para mantener la coherencia con flujos de trabajo heredados.

### [[ligand_rpkmin|ligand-dock#ligand_rpkmin]]
Minimiza y reempaqueta cadenas laterales, para preparar estructuras antes del docking de ligandos; es, por tanto, análoga a docking_prepack_protocol.

### [[select_best_unique_ligand_poses|ligand-dock#selectbestuniqueligandposes]]
Toma el 5% superior de Poses por puntuación total, ordenados por energía de interfaz.
Los recorre uno por uno y conserva los Poses que estén al menos a min_rmsd de los Poses conservados hasta ese momento.

### [[loopmodel | loopmodel]]
Modela loops flexibles de proteínas con uno de varios algoritmos, incluidos CCD (descenso de coordenadas cíclico) y KIC (cierre cinemático).

### [[gen_apo_grids|match#gen-apo-grids]]
Genera mallas para la forma _apo_ (sin ligando) de la proteína explorando la química alrededor del bolsillo. 

### [[gen_lig_grids|match#gen-lig-grids]]
Genera mallas para la estructura _holo_ proteína-ligando.

### [[match | Match]]
Orienta residuos alrededor de un ligando para que coincidan con átomos particulares del andamio (scaffold).

### [[membrane_abinitio2|membrane-abinitio]]
Plegamiento ab initio de una proteína de membrana. Funcionalmente, es solo un wrapper de Abrelax que responde a opciones específicas de membrana.

### [[extract_motifs]]
Extrae y puntúa motivos clave de cadenas laterales de residuos de un PDB dado, y los escribe.

### [[incorporate_motifs]]
Identifica regiones flexibles en un Pose usando el marco de loops y usa una colección de rotámeros inversos tomados de la biblioteca de motivos para intentar cerrar el loop. 

### [[MakeRotLib|make-rot-lib]]
Calcula una biblioteca de rotámeros para un conjunto dado de ángulos de la cadena principal de un ResidueType dado.

### [[UnfoldedStateEnergyCalculator|unfolded-energy-state-calculator]]
Calcula la energía del estado desplegado (un tipo de energía de referencia que usa la función de energía mm_std) de un ResidueType.

### [[r_noe_assign]]
Genera archivos de restricciones a partir de un archivo proporcionado de NOE con buen formato y escribe asignaciones basadas en la estructura del Pose nativo proporcionado.

### [[hbs_design|hbs-design]]
Diseña un complejo fijo de proteína y andamio de sustituto de puente de hidrógeno (HBS). Los HBS son miméticos de hélice restringidos, hechos de aminoácidos canónicos o no canónicos, con un macrociclo que restringe los primeros residuos de la cadena principal.

### [[oop_design|oop-design]]
Diseña un complejo fijo de proteína y andamio de oligooxopiperazina. Las oligooxopiperazinas son miméticos de superficie de hélice hechos de aminoácidos canónicos o no canónicos, con anillos de seis miembros que restringen la cadena principal

### [[peptoid_design]]
Diseña un complejo fijo de proteína y andamio de peptoide. Los peptoides son residuos de glicina N-alquilados o N-arilados; Rosetta incorpora muchas cadenas laterales específicas de peptoides.

### [[pepspec]]
Opcionalmente extiende un péptido un cierto número de residuos; realiza diseño y minimización para acomodarlo en el bolsillo de unión. Tiene fases de baja y de alta resolución. 

### [[pepspec_anchor_dock|pepspec]]
Docking de péptidos anclado y con cadena principal flexible, para preparar estructuras para pepspec.

### [[pocket_relax|pocket-relax]]
Relaja una capa de residuos del bolsillo alrededor de un residuo ejemplar objetivo.

### [[pocket_suggest_target_residues_by_ddg|pocket-suggest-targets]]
Obtiene el bolsillo objetivo analizando un archivo de ddg y evaluando los bolsillos de residuos individuales que contiene.

### [[pocket_measure|pocket-measure]]
Mide estadísticas y datos de malla de un bolsillo deseado.

### [[make_exemplar|make-exemplar]]
Evalúa un bolsillo alrededor de un residuo deseado con el fin de formar un "ejemplar". Consulta la documentación de la serie de aplicaciones: pocket_relax, pocket_suggest_target_residues_by_ddg, pocket_measure y make_exemplar.

### [[nucleobase_sample_around|Sample-around-nucleobase]]
Muestrea átomos o moléculas sonda del tamaño deseado alrededor de una nucleobase. 

### [[recces_turner|recces]]
Muestreo y análisis estructural exhaustivo de ARN.

### [[rna_features]]
Del mismo modo que el marco [FeaturesReporter] exporta a bases de datos una variedad de características de proteínas, esta aplicación extrae características críticas de estructuras de ARN.

### [[rna_graft|rna-denovo-setup#rna-graft]]
Injerta varias secuencias de ARN entre sí.

### [[rna_helix|rna-assembly]]
Produce una hélice de ARN idealizada a partir de una secuencia, para usarla en injertos posteriores.

### [[rna_predict_chem_map]]
Predice cuál sería el chem map (un dato común usado en la determinación experimental de estructuras de ARN) de un modelo estructural dado.

### [[rna_suitename]]
Dado un conjunto de Poses, asigna y escribe sus nombres de suite (una clasificación estructural).

### [[rna_thread|rna-thread]]]
Enhebra (thread) una secuencia de ARN sobre una plantilla.

### [[erraser_minimizer|erraser]]
Añade restricciones estructurales a un Pose de ARN, incluidas restricciones específicas sobre las posiciones de los fosfatos y de otros átomos, seguido de minimización.

### [[surface_docking|surface-docking]]
Hace docking de una proteína a una superficie mineral.

### [[swa_protein_main|swa-protein-main]]
Realiza ensamblaje stepwise para construir loops de proteína.

### [[swa_rna_main|swa-rna-loop]]
Realiza ensamblaje stepwise sobre estructuras de ARN.

### [[swa_rna_util|swa-rna-loop]]
Algoritmos de utilidad para alineamiento, empaquetamiento de O2', RMSD, mutación, segmentación, creación de silent files y minimización.

### [[stepwise]]
Código general que realizará ensamblaje stepwise Monte Carlo sobre cualquier cosa.

### [[trRosetta]]
Predicción de estructura de proteínas mejorada con redes neuronales, usando un alineamiento múltiple de secuencias como entrada.  Requiere extras=tensorflow durante la compilación.

### [[revert_design_to_native|RosettaScripts#revert_design_to_wt-application]]
Si un diseño es suficientemente comparable a la puntuación del nativo, lo revertimos 

### [[rosetta_scripts|RosettaScripts]]
Ejecuta un protocolo especificado en XML, compuesto por Movers, Filtros y TaskOperations concretos que se han hecho compatibles con RosettaScripts.

### [[rosettaDNA|rosetta-dna]]
Ejecuta el DockDesignParser, permite acceder a información y código de proteína-ADN, y usa una salida PDB personalizada para añadir información específica de proteína-ADN.

### [[exposed_strand_finder|beta-strand-homodimer-design]]
Localiza hebras beta expuestas dentro del PDB proporcionado como posible objetivo de homodimerización con una hebra beta diseñada.

### [[homodimer_design|beta-strand-homodimer-design]]
Realiza efectivamente el diseño de homodímeros sobre un andamio de hebra beta fija.

### [[homodimer_maker|beta-strand-homodimer-design]]
Orienta dos copias de una cadena de modo que una hebra beta expuesta previamente quede alineada entre ambas para formar un homodímero.

### [[ca_to_allatom|ca-to-allatom]]  
Dada una estructura de baja resolución que, por tanto, solo contiene un trazado de los carbonos alfa, expande los átomos CA a residuos completos y realiza un muestreo exhaustivo.

### [[doug_dock_design_min_mod2_cal_cal|doug-dock-design-min-mod2-cal-cal]]
Una aplicación de docking y diseño escrita originalmente para ejemplificar las maravillas que el nuevo distribuidor de trabajos y el Rosetta 3.0+ orientado a objetos pueden hacer por ti.
Hace docking, diseño y minimización de un péptido en un bolsillo de unión con flexibilidad mínima.

### [[FloppyTail|floppy-tail]]
Explora grandes extensiones del espacio conformacional para enumerar las posibles conformaciones de una cola desordenada de una proteína. 
_No_ proporciona información positiva; en cualquier caso no hay una conformación fija para esta cola, pero puede dar información sobre si una región del espacio conformacional es accesible o inaccesible.

### [[UBQ_E2_thioester|ubq-conjugated]]
Dado un PDB inicial con una cisteína y un PDB de ubiquitina (aunque en realidad es aplicable a cualquier proteína), conjuga el C-terminal del PDB de ubiquitina con la cisteína indicada y luego hace docking de las dos proteínas sujeto a esa restricción.

### [[UBQ_Gp_CYD-CYD|ubq-conjugated]]
Dado un PDB inicial con una cisteína y un PDB de ubiquitina (aunque en realidad es aplicable a cualquier proteína que contenga una cisteína), forma un disulfuro con las dos cisteínas indicadas y luego hace docking de las dos proteínas sujeto a esa restricción.

### [[UBQ_Gp_LYX-Cterm|ubq-conjugated]]
Dado un PDB inicial con una lisina y un PDB de ubiquitina (aunque en realidad es aplicable a cualquier proteína), conjuga el C-terminal del PDB de ubiquitina con la lisina indicada y luego hace docking de las dos proteínas sujeto a esa restricción.

### [[optE_parallel|opt-e-parallel-doc]]
Optimiza los pesos de una función de energía proporcionada para producir una excelente recuperación de secuencia y de rotámeros.

### [[validate_rosetta_script]]
Prueba un script XML escrito para la aplicación rostta_scripts contra la definición de XML Schema generada internamente por Rosetta, sin ejecutar el script.

### [[parse_rosetta_script]]
Prueba un script XML escrito para la aplicación rostta_scripts contra la definición de XML Schema generada internamente por Rosetta y comprueba que
los Movers, Filtros, TaskOperations, etc. definidos en él se puedan construir e inicializar, sin ejecutar el script. Es una prueba estrictamente
más rigurosa que la aplicación validate_rosetta_script.