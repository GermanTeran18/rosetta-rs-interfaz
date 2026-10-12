#Movers (RosettaScripts)

[[Volver a RosettaScripts|RosettaScripts]]

Cada definición de mover tiene la siguiente estructura

```xml
<mover_name name="&string"/>
```

donde "mover\_name" pertenece a un conjunto predefinido de movers posibles que el parser reconoce y que se enumeran más abajo, name es un identificador único para esta definición de mover y después va cualquier número de parámetros que el mover necesite para quedar definido.

Por razones históricas o por diferencias sutiles en las funciones deseadas, algunos de los movers son casi duplicados. [[Más información|Near Duplicate Classes and Functions]] sobre la comparación de estos movers casi duplicados.

[[_TOC_]]

## Movers predefinidos

Los movers predefinidos se definen internamente en el parser, y el protocolo puede usarlos sin definirlos explícitamente.

**[[NullMover]]** - No hace nada.

## Metamovers

Los metamovers no hacen nada al Pose por sí mismos, sino que combinan o modifican la aplicación de otros movers y filtros.

Mover  | Descripción
------------ | -------------
[[RunSimpleMetrics]] | Ejecuta un conjunto arbitrario de [[SimpleMetrics]] y añade los datos que devuelven al Pose y al archivo de puntuación de salida.  Se puede fijar prefijo/sufijo y ejecutar varios conjuntos de métricas en una sola ejecución de RosettaScripts.  Todas las SimpleMetrics también se pueden usar para filtrar y para los features reporters. 
 
### Combinación de movers

Mover  | Descripción
------------ | -------------
**[[ParsedProtocol|ParsedProtocolMover]]** | (antes DockDesign) - Crea subrutinas de RosettaScripts.
**[[MultiplePoseMover]]** | Permite "distribuir y recopilar" a partir de ciertos submovers.
**[[MultipleOutputWrapper|MultipleOutputWrapperMover]]** | Convierte un mover de salida única en uno de salida múltiple.
**[[Subroutine|SubroutineMover]]** | Ejecuta otro archivo XML como subrutina.
**[[ContingentAcceptMover]]** | Falla si un submover no mejora el valor de un filtro.
**[[IfMover]]** | Ejecuta distintos movers según el valor de un filtro.
**[[RandomMover]]** | Elige al azar un mover de una lista ponderada.
**[[SwitchMover]]** | Permite elegir entre un grupo de movers declarados.

### Movers de bucles y Monte Carlo

Mover  | Descripción
------------ | -------------
**[[GenericMonteCarlo|GenericMonteCarloMover]]** | Aplica repetidamente un mover al estilo Monte Carlo.
**[[GenericSimulatedAnnealer|GenericSimulatedAnnealerMover]]** | Aplica repetidamente un mover al estilo Monte Carlo con temperaturas en rampa.
**[[IteratedConvergence|IteratedConvergenceMover]]** | Aplica repetidamente un mover hasta que un filtro da valores estables. 
**[[LoopOver|LoopOverMover]]** | Aplica repetidamente un mover.
**[[MonteCarloTest|MonteCarloTestMover]]** | Prueba el criterio de Monte Carlo de un mover 
**[[MonteCarloRecover|MonteCarloRecoverMover]]** | Recupera un Pose del mover generic monte carlo
**[[MonteCarloUtil|MonteCarloUtilMover]]** | (solo en la versión para desarrolladores) Recupera el Pose de menor energía de un objeto Monte Carlo dado
**[[MetropolisHastings|MetropolisHastingsMover]]** | Realiza simulaciones de Monte Carlo de Metropolis-Hastings
**[[RampMover]]** | Aplica repetidamente un mover mientras cambia un término de puntuación.

### Informe y guardado

Mover  | Descripción
------------ | -------------
**[[AddJobPairData|AddJobPairDataMover]]** | Añade un par clave:valor al trabajo actual para incluirlo en la salida
**[[CstInfoMover]]** | Añade al archivo de puntuación detalles sobre el cumplimiento de restricciones
**[[DumpPdb|DumpPdbMover]]** | Guarda un Pose en disco.
**[[FilterReportAsPoseExtraScoresMover]]** | Registra en el archivo de puntuación los valores de los filtros
**[[MetricRecorder|MetricRecorderMover]]** | Registra métricas en un archivo de texto
**[[PDBTrajectoryRecorder|PDBTrajectoryRecorderMover]]** | Registra un archivo PDB multimodelo
**[[PyMolMover]]** | Envía un Pose a PyMol
**[[RenderGridsToKinemage|RenderGridsToKinemageMover]]** | (para depuración) Crea un archivo Kinemage que contiene rejilla(s) de puntuación
**[[ReportToDB|ReportToDBMover]]** | Informa datos estructurales a una base de datos relacional.
**[[ReportXYZ|ReportXYZ]]** | Informa X Y Z de un residuo específico en la línea de puntuación
**[[ResetBaseline|ResetBaselineMover]]** | Restablece la línea base (no se necesita para MC)
**[[SavePoseMover]]** | Guarda o recupera un Pose para usarlo en otro mover o filtro.
**[[SaveProbabilitiesMetricMover]]** | Guarda una PerResidueProbabilitiesMetric como archivo de pesos o de pssm.
**[[SilentTrajectoryRecorder|SilentTrajectoryRecorderMover]]** | Registra una trayectoria en un silent file
**[[StorePoseSnapshot|StorePoseSnapshotMover]]** | Guarda una instantánea de la numeración de residuos actual del Pose como un Pose de referencia con nombre, de modo que los movers posteriores puedan usar la numeración de residuos del estado actual aunque la numeración haya cambiado.
**[[TrajectoryReportToDB|TrajectoryReportToDBMover]]** | Informa varias estructuras a una salida que forma una trayectoria
**[[WriteLigandMolFile|WriteLigandMolFileMover]]** | Crea un archivo mol V2000 para cada Pose
**[[AddResidueLabel|AddResidueLabelMover]]** | Añade PDBInfoLabel a tu Pose actual según una selección.
**[[LabelPoseFromResidueSelectorMover]]** | Añade y quita PDBInfoLabel del Pose según una selección dada.
**[[DisplayPoseLabelsMover]]** | Imprime en pantalla las etiquetas asignadas a cada residuo y las guarda en el silent file como REMARKS.


### Movers de configuración

Mover  | Descripción
------------ | -------------
**[[SetupPoissonBoltzmannPotential|SetupPoissonBoltzmannPotentialMover]]** | Inicialización del entorno de ejecución para el solucionador PB (mover ddG)
**[[SetupForDensityScoringMover]]** | Prepara el Pose para usar la puntuación de densidad electrónica 


## Movers de "mejores prácticas"
Estos son movers que permiten a los usuarios realizar tareas comunes que a menudo se quiere hacer en circunstancias concretas (*p. ej.*, preparar un Pose para diseño, con restricciones de secuencia que imponen el conocimiento previo sobre las composiciones típicas de aminoácidos de las proteínas).

Mover  | Descripción
------------ | -------------
**[[AddHelixSequenceConstraints|AddHelixSequenceConstraintsMover]]** | Añade restricciones de composición de secuencia (para usar con el término de puntuación [[aa_composition|AACompositionEnergy]]) para animar a los pasos de diseño posteriores a producir secuencias de aminoácidos sensatas para cada hélice de un Pose o de una selección.


## Movers generales

Estos son movers que deberían poder usarse en la mayoría de los casos con la mayoría de los sistemas

### Movers de análisis

Mover  | Descripción
------------ | -------------
**[[ScoreMover]]** | Puntúa el Pose
**[[LoopAnalyzerMover]]** | Calcula métricas específicas de loops de proteínas
**[[InterfaceAnalyzerMover]]** | Calcula métricas de interfaces proteína-proteína
**[[RunSimpleMetrics]]** | Mover que ejecuta un conjunto de [[SimpleMetrics]], lo que permite un análisis robusto en Rosetta.

### Protocolos de predicción de estructuras

Mover  | Descripción
------------ | -------------
**[[trRosettaProtocolMover|trRosettaProtocol]]** | Usa la red neuronal trRosetta para predecir la estructura de proteínas.  ¡Ojo con los requisitos especiales de compilación!

### Diseño de secuencia simple

Mover  | Descripción
------------ | -------------
**[[PackRotamersMover]]** | Reempaqueta cadenas laterales, diseñando con un resfile o con un conjunto de [[TaskOperations-RosettaScripts]]
**[[FixBB|FixBBMockMover]]** | Diseño de secuencia sobre una cadena principal fija
**[[FlexibleBBdesign|FlexibleBBdesignMockMover]]** | Diseño de secuencia con minimización de la cadena principal
**[[FastDesign|FastDesignMover]]** | Realiza el refinamiento de todos los átomos de FastRelax, pero añade funciones relacionadas con el diseño
**[[SimpleThreadingMover]]** | Hace threading de secuencias sobre estructuras. Nada especial.

### Motivos de secuencia

Mover  | Descripción
------------ | -------------
**[[CreateSequenceMotifMover]]** | Crea un motivo de secuencia usando la sintaxis de motivos y un selector de residuos.  Por ejemplo, N[^P][S/T], que diseñaría N, cualquier cosa que no sea prolina y luego serina o treonina.
**[[CreateGlycanSequonMover]]** | Crea en una proteína, en los residuos especificados, un motivo de secuencia específico de glicanos llamado sequon.
  
### Movimiento de la cadena principal

Mover  | Descripción
------------ | -------------
**[[Backrub|BackrubMover]]** | Hace rotaciones locales alrededor de dos átomos de la cadena principal
**[[BackboneGridSampler|BackboneGridSamplerMover]]** | Genera una cadena de residuos y muestrea los ángulos de torsión
**[[CartesianMD|CartesianMD]]** | Introduce un movimiento concertado en la cadena principal mediante dinámica molecular en el espacio cartesiano
**[[ConfChangeMover|ConfChangeMover]]** | Introduce un movimiento concertado en la cadena principal mediante Monte Carlo de cadenas de Markov (2022)
**[[CrankshaftFlip|CrankshaftFlipMover]]** | Realiza movimientos de giro tipo cigüeñal (crankshaft flip), una inversión de un diedro phi con el omega siguiente cambiando entre cis/trans
**[[InitializeByBins|InitializeByBinsMover]]** | Aleatoriza tramos de la cadena principal según intervalos de torsión
**[[NormalModeRelax|NormalModeRelaxMover]]** | Introduce un movimiento concertado en las cadenas principales mediante el Modelo de Red Anisotrópica (ANM)
**[[PerturbByBins|PerturbByBinsMover]]** | Perturba tramos de la cadena principal según intervalos de torsión
**[[RandomizeBBByRamaPrePro|RandomizeBBByRamaPreProMover]]** | Aleatoriza la cadena principal de un residuo dado con un sesgo según su mapa de Ramachandran
**[[SetTorsion|SetTorsionMover]]** | Fija una torsión en un valor especificado o aleatorio
**[[Shear|ShearMover]]** | Hace movimientos de torsión de tipo shear que minimizan la propagación aguas abajo
**[[Small|SmallMover]]** | Hace movimientos de torsión de tipo small (sin minimización de la propagación)




### Modelado comparativo

Mover  | Descripción
------------ | -------------
**[[HybridizeMover]]** | Usa una o varias plantillas para generar un modelo combinado.  Forma parte de [[RosettaCM]].
**[[SimpleThreadingMover]]** | Hace threading de secuencias sobre estructuras.  Nada especial.


### Restricciones

Mover  | Descripción
------------ | -------------
**[[CstInfoMover]]** | Añade al archivo de puntuación detalles sobre el cumplimiento de restricciones
**[[AddCompositionConstraintMover]]** | Añade restricciones de secuencia relacionadas con la composición de aminoácidos, aplicadas por el [[término de puntuación aa_composition|AACompositionEnergy]].
**[[AddConstraintsToCurrentConformationMover]]** | Añade restricciones basadas en la conformación actual
**[[AddNetChargeConstraintMover]]** | Añade restricciones de secuencia que penalizan la desviación de una carga neta deseada, aplicadas por el [[término de puntuación netcharge|NetChargeEnergy]].
**[[AddMHCEpitopeConstraintMover]]** | Añade restricciones basadas en la secuencia que penalizan epítopos inmunogénicos, aplicadas por el [[término de puntuación mhc_epitope|MHCEpitopeEnergy]].
**[[AddResidueCouplingConstraint]]** | Añade restricciones de coevolución para favorecer secuencias más naturales y conservar la función durante el diseño
**[[AtomCoordinateCstMover]]** | Añade restricciones de coordenadas para Relax
**[[ClearConstraintsMover]]** | Quita todas las restricciones (geométricas y de secuencia) del Pose
**[[ReleaseConstraintFromResidueMover]]** | Igual que [[ClearConstraintsMover]], pero solo para los residuos seleccionados
**[[ClearCompositionConstraintsMover]]** | Quita selectivamente restricciones de secuencia del Pose.
**[[ConstraintSetMover]]** | Añade restricciones al Pose usando un archivo de restricciones
**[[FavorSymmetricSequence|FavorSymmetricSequenceMover]]** | Añade restricciones para preferir secuencias simétricas
**[[ResidueTypeConstraintMover]]** | Restringe el tipo de residuo
**[[RemoveMetalConnectionsMover]]** | Quita los enlaces covalentes con iones metálicos que se añadieron con SetupMetalsMover o -auto_setup_metals
**[[SetupMetalsMover]]** | Añade enlaces covalentes y restricciones de distancia/ángulo a iones metálicos
**[[TaskAwareCsts|TaskAwareCstsMover]]** | Añade restricciones a los residuos designados por task_operations
**[[AddConstraints|AddConstraintsMover]]** | Usa un generador de restricciones para añadir restricciones al Pose
**[[RemoveConstraints|RemoveConstraintsMover]]** | Quita del Pose un conjunto de restricciones generadas por un generador de restricciones

#### Generadores de restricciones

Mover  | Descripción
------------ | -------------
**[[AtomPairConstraintGenerator]]** | Genera restricciones de distancia entre residuos de un subconjunto
**[[SegmentedAtomPairConstraintGenerator]]** | Genera restricciones de distancia especificadas de forma distinta entre residuos de un rango y entre residuos de rangos distintos.  
**[[CoordinateConstraintGenerator]]** | Genera restricciones de coordenadas para residuos de un subconjunto
**[[DistanceConstraintGenerator]]** | Genera restricciones para imponer una distancia entre residuos de dos subconjuntos.
**[[DihedralConstraintGenerator]]** | Genera restricciones para imponer un ángulo diedro.
**[[FileConstraintGenerator]]** | Genera, añade y quita restricciones desde un archivo
**[[HydrogenBondConstraintGenerator]]** | Genera restricciones para imponer enlaces de hidrógeno entre residuos
**[[SheetConstraintGenerator]]** | Genera restricciones para formar enlaces de hidrógeno correctos en láminas beta
**[[TerminiConstraintGenerator]]** | Genera restricciones de pares de átomos entre los extremos N y C
**[[trRosettaConstraintGenerator]]** | Genera restricciones de distancia y orientación entre residuos a partir de un alineamiento múltiple de secuencias, usando la red neuronal trRosetta.  Ojo con los requisitos especiales de compilación.


### Docking y ensamblaje

Mover  | Descripción
------------ | -------------
**[[BridgeChains|BridgeChainsMover]]** | Conecta cadenas mediante Monte Carlo de inserción de fragmentos
**[[DockingInitialPerturbation|DockingInitialPerturbationMover]]** | Realiza la fase de perturbación inicial del algoritmo RosettaDock
**[[DockingProtocol|DockingProtocolMover]]** | Realiza el protocolo de docking completo con los valores por defecto actuales
**[[FlexPepDock|FlexPepDockMover]]** | Realiza docking de péptidos ab initio o de refinamiento
**[[GridDock|SixDoFGridDockMover]]** | Realiza docking en rejilla con seis grados de libertad

### Inserción de fragmentos

Mover  | Descripción
------------ | -------------
**[[SingleFragmentMover]]** | Realiza una única inserción de fragmento


### Idealización y relax

Mover  | Descripción
------------ | -------------
**[[Idealize|IdealizeMover]]** | Fuerza longitudes y ángulos de enlace ideales
**[[FastRelax|FastRelaxMover]]** | Realiza el refinamiento de todos los átomos de FastRelax
**[[FastDesign|FastDesignMover]]** | Realiza el refinamiento de todos los átomos de FastRelax, pero añade funciones relacionadas con el diseño
**[[RepeatProteinRelax]]** | Realiza el refinamiento de todos los átomos de FastRelax en proteínas repetitivas


### Inserción, deleción e injerto

#### Inserción

Mover  | Descripción
------------ | -------------
**[[AddChain|AddChainMover]]** | Añade un archivo PDB a un Pose existente
**[[AnchoredGraftMover]]** | Injerta una región de un Pose en otro usando el mismo método que se usa en [[ The Anchored Design Protocol | anchored-design]].  También se usa en el protocolo de diseño de anticuerpos RabD. 
**[[CCDEndsGraftMover]]** | Injerta una región de un Pose en otro mediante superposición de los extremos del inserto y brazos CCD para cerrar el injerto.  Se usa en el protocolo de diseño de anticuerpos RabD. 
**[[InsertPoseIntoPoseMover]]** | Inserta un Pose en otro.  No hace ninguna optimización de la estructura.
**[[MergePDB|MergePDBMover]]** | Fusiona dos Poses a lo largo de un elemento de estructura secundaria común
**[[MotifGraft|MotifGraftMover]]** | Injerta un motivo en uno o más Poses
**[[Splice|SpliceMover]]** | (solo en la versión para desarrolladores) Varios métodos para empalmar segmentos en el Pose actual


#### Deleción

Mover  | Descripción
------------ | -------------
**[[CutOutDomain|CutOutDomainMover]]** | Usa una plantilla para quitar los residuos especificados
**[[DeleteRegionMover]]** | Elimina una región o cadena de un Pose.
**[[DeleteChainsMover]]** | Elimina cadenas específicas de un Pose.
**[[KeepRegionMover]]** | Conserva una región del Pose actual y elimina el resto.
**[[SwitchChainOrder|SwitchChainOrderMover]]** | Reordena (o quita) las cadenas de un Pose 

#### Injerto
Mover  | Descripción
------------ | -------------
**[[ReplaceRegionMover]]** | Reemplaza una región de un Pose por otra de la misma longitud.
**[[InsertPoseIntoPoseMover]] ** | Inserta un Pose en otro.  No hace ninguna optimización
**[[CCDEndsGraftMover]] ** | Injerta una región de un Pose en otro, usando CCD en cada extremo para optimizar el injerto.
**[[AnchoredGraftMover]] ** | Injerta una región de un Pose en otro, usando el algoritmo de injerto de AchoredDesign
**[[AntibodyCDRGrafter]] ** | Injerta una CDR de un Pose o archivo en otro, usando algoritmos de injerto optimizados. Esta es la clase de injerto que usan tanto RosettaAntibody como RosettaAntibodyDesign


### Movers de cierre cinemático

Mover  | Descripción
------------ | -------------
**[[Generalized Kinematic Closure (GeneralizedKIC)|GeneralizedKICMover]]** | Cierre de loops y muestreo conformacional, totalmente generalizado para loops formados por cualquier cadena arbitraria de átomos (cadenas principales canónicas, cadenas principales no canónicas, disulfuros y otros enlaces de cadena lateral, entrecruzadores artificiales, *etc.*).


### Empaquetado y minimización

Mover  | Descripción
------------ | -------------
**[[ConsensusDesignMover]]** | Muta residuos para crear un consenso de varias secuencias, teniendo en cuenta las puntuaciones de los residuos
**[[ExternalPackerResultLoader]]** | Dados archivos que definen un problema de empaquetado (como los que produce [[InteractionGraphSummaryMetric]]) y una solución de empaquetado (como la que podría producir un optimizador o annealer externo), reconstruye el Pose y hace threading de la solución de empaquetado sobre él.
**[[ForceDisulfides|ForceDisulfidesMover]]** | Se asegura de que se formen los disulfuros no reconocidos y de que la geometría de enlace sea correcta
**[[MinMover]]** | Minimiza cadenas laterales o cadena principal
**[[MinPackMover]]** | Empaqueta y minimiza una cadena lateral, llama a Monte Carlo
**[[PackRotamersMover]]** | Reempaqueta cadenas laterales
**[[PackRotamersMoverPartGreedy|PackRotamersMoverPartGreedyMover]]** | Optimiza alrededor de los residuos objetivo y reempaqueta cadenas laterales
**[[PertMinMover]]** | Aplica una perturbación aleatoria a los átomos y luego minimiza.
**[[RotamerTrialsMover]]** | Recorre los residuos para encontrar el rotámero de menor energía de cada uno
**[[RotamerTrialsMinMover]]** | Recorre los residuos para encontrar el rotámero de menor energía de cada uno en el contexto del Pose actual
**[[Sidechain|SidechainMover]]** | Movimientos "fuera de rotámero" solo de cadenas laterales
**[[SidechainMC|SidechainMCMover]]** | Muestreo de Monte Carlo "fuera de rotámero" solo de cadenas laterales
**[[TaskAwareMinMover]]** | Minimiza cadenas laterales o cadena principal en las posiciones especificadas por TaskOperations


### Generación paramétrica de la cadena principal

Mover  | Descripción
------------ | -------------
**[[MakeBundle|MakeBundleMover]]** | Usa las ecuaciones de Crick para crear una hélice de hélices o un barril beta, dados los valores de parámetros especificados por el usuario.
**[[BundleGridSampler|BundleGridSamplerMover]]** | Crea una hélice de hélices o un barril beta muestreando rangos de parámetros definidos por el usuario y eligiendo el conjunto de valores de parámetros que da la estructura de menor energía.
**[[PerturbBundle|PerturbBundleMover]]** | Toma un Pose de haz helicoidal generado paramétricamente y altera ligeramente los parámetros helicoidales para perturbar la geometría del haz.  Bueno para hacer movimientos como parte de una búsqueda de Monte Carlo en el espacio de parámetros.


### Simetría

Consulta [[SymmetryAndRosettaScripts]] para ver detalles sobre el uso de la simetría con RosettaScripts.

Consulta [Movers de docking simétrico](#Symmetric Docking movers) para ver protocolos que involucran simetría.

Mover  | Descripción
------------ | -------------
**[[SetupForSymmetry|SetupForSymmetryMover]]** | Simetriza un Pose según un archivo de definición
**[[SetupForSequenceSymmetryMover|SetupForSequenceSymmetryMover]]** | Permite definir cadenas simétricas para sistemas complicados antes de usar la operación de tarea KeepSequenceSymmetry
**[[DetectSymmetry|DetectSymmetryMover]]** | Simetriza un Pose compuesto por cadenas simétricas
**[[ExtractAsymmetricUnit|ExtractAsymmetricUnitMover]]** | Convierte un Pose simétrico en un Pose no simétrico (inverso de SetupForSymmetry)
**[[ExtractSubpose|ExtractSubposeMover]]** | (Solo en la versión para desarrolladores) Extrae un subconjunto de un Pose simétrico sin modificar el original
**[[ExtractAsymmetricPose|ExtractAsymmetricPoseMover]]** | (similar a ExtractAsymmetricUnit) Convierte un Pose simétrico en un Pose no simétrico
**[[SymDofMover]]** | Configura sistemas simétricos de estructuras alineadas.
**[[SymmetricCycpepAlign|SymmetricCycpepAlignMover]]** | Para el caso especial de péptidos cíclicos con cuasi-simetría interna, alinea el eje de simetría del péptido con el eje Z y elimina todas las repeticiones de simetría menos una para crear una entrada adecuada para el mover [[SetupForSymmetry|SetupForSymmetryMover]].
**[[SymPackRotamersMover]]** y SymRotamerTrialsMover | Versiones simétricas de PackRotamers y RotamerTrials
**[[TaskAwareSymMinMover]]** | (solo en la versión para desarrolladores) Similar a SymMinMover, pero permite minimizar solo ciertos residuos
**[[PeriodicBoxMover]]** | Mover que permite ejecutar una simulación MC en una caja periódica, por ejemplo una simulación de líquidos.  


### Creación de Poses

Mover  | Descripción
------------ | -------------
**[[PoseFromSequenceMover]]**  | Crea un Pose a partir de una secuencia, o varias cadenas a partir de secuencias.


### Otras manipulaciones del Pose

Mover  | Descripción
------------ | -------------
**[[AlignChain|AlignChainMover]]** | Alinea los átomos Calfa de cadenas de dos Poses distintos
**[[AlignByResidueSelectorMover]]** | Alinea los átomos Calfa de los residuos seleccionados de dos Poses distintos
**[[AddChainBreak|AddChainBreakMover]]** | Añade una ruptura en una posición específica
**[[BluePrintBDR|BluePrintBDRMover]]** | Crea una estructura centroide a partir de un archivo PDB
**[[CopyRotamer|CopyRotamerMover]]** | Copia la identidad y/o la conformación de una cadena lateral de un residuo a otro residuo.
**[[CycpepRigidBodyPermutationMover]]** | Altera la posición y la orientación de un péptido cíclico para que quede superpuesto sobre una copia permutada o permutada inversa de sí mismo.
**[[DeclareBond]]** | Le dice a Rosetta que existe un enlace químico entre dos residuos.
**[[Disulfidize|DisulfidizeMover]]** | Encuentra posibles posiciones de enlaces disulfuro según la distancia Calfa - Cbeta
**[[Dssp|DsspMover]]** | Calcula la estructura secundaria con dssp
**[[EnsureExclusivelySharedJumpMover]]** | Cambia el fold tree para garantizar que haya un jump que construya los residuos seleccionados y solo los residuos seleccionados
**[[FavorNativeResidue|FavorNativeResidueMover]]** | Restringe el tipo de residuo favoreciendo el tipo presente cuando se aplica
**[[FavorSequenceProfile|FavorSequenceProfileMover]]** | Restringe el tipo de residuo usando uno de varios perfiles
**[[FlipChirality|FlipChiralityMover]]** | Refleja una selección del Pose
**[[FoldTreeFromLoops|FoldTreeFromLoopsMover]]** | Define un fold tree según los puntos extremos de un loop
**[[HBNet|HBNetMover]]** | Métodos para diseñar redes explícitas de enlaces de hidrógeno
**[[LoadPDB|LoadPDBMover]]** | Reemplaza el PDB actual por otro
**[[LoopLengthChange|LoopLengthChangeMover]]** | Cambia la longitud de un loop
**[[LoopCreationMover]]** | (solo en la versión para desarrolladores) Construye loops para cerrar los huecos de una estructura
**[[MutateResidue|MutateResidueMover]]** | Cambia un residuo a un tipo distinto
**[[ModifyVariantType|ModifyVariantTypeMover]]** | Añade o quita tipos variantes de un conjunto de residuos
**[[PeptideStubMover]]** | Añade nuevos residuos a un Pose
**[[PeptideCyclizeMover]]** | Cierra los dos extremos de una selección de un Pose
**[[SampleSequenceFromProbabilities]]** | Muestrea una secuencia completa o una cantidad especificada de mutaciones a partir de una PerResidueProbabilitiesMetric.
**[[SegmentHybridize|SegmentHybridizeMover]]** | Cierra loops mediante inserción de fragmentos y minimización cartesiana
**[[Superimpose|SuperimposeMover]]** | Superpone el Pose actual sobre otro Pose almacenado
**[[SetSecStructEnergies|SetSecStructEnergiesMover]]** | Sesga la puntuación hacia elementos de estructura secundaria concretos
**[[SwitchChainOrder|SwitchChainOrderMover]]** | Reordena (o quita) las cadenas de un Pose 
**[[TryDisulfPermutations|TryDisulfPermuationsMover]]** | Prueba todas las permutaciones posibles de disulfuros para los tipos de residuo que pueden formar disulfuros y devuelve la permutación de menor energía.
**[[MakePolyX|MakePolyXMover]]** | Convierte un Pose en un polímero de un solo tipo de aminoácido
**[[MembraneTopology|MembraneTopologyMover]]** | Inserta en un Pose la topología de membrana de un archivo de segmentos de membrana
**[[SaveSequenceToComments|SaveSequenceToCommentsMover]]** | Guarda la secuencia actual del Pose en los comentarios del Pose
**[[SwitchResidueTypeSetMover]]** | Alterna entre los modos centroide y de todos los átomos
**[[SetTemperatureFactor|SetTemperatureFactorMover]]** | Fija la columna del factor de temperatura de un archivo PDB
**[[PSSM2Bfactor|PSSM2BfactorMover]]** | Fija la columna del factor de temperatura de un archivo PDB según la puntuación PSSM
**[[RemodelMover]]** (incluida la construcción de disulfuros) | Construcción y refinamiento de loops con Remodel
**[[RepeatPropagationMover]]** | Propaga una proteína repetitiva 
**[[ReplaceRegionMover]]** | Reemplaza una región de un Pose por otra de la misma longitud.
**[[RigidBodyTransMover]]** | Traslada una cadena a lo largo de un eje
**[[RigidBodyPerturbNoCenter]]** | Hace un movimiento pequeño y aleatorio de traslación y rotación para mover dos partes de un Pose una respecto a la otra.
**[[RollMover]]** | Rota el Pose un ángulo dado sobre un eje dado
**[[SetupNCS|SetupNCSMover]]** | Configura la simetría no cristalográfica entre residuos y obliga a los residuos a mantener su conformación y tipo
**[[StoreResidueSubset|StoreResidueSubsetMover]]** | Crea un subconjunto de residuos a partir de un selector de residuos y lo guarda en el Pose actual con un nombre dado.
**[[StoreTask|StoreTaskMover]]** | (Solo en la versión para desarrolladores) Crea y guarda una tarea del packer en el Pose actual
**[[StoreCompoundTaskMover]]** | (Solo en la versión para desarrolladores) Construye tareas lógicas compuestas y las guarda en el Pose actual
**[[VirtualRoot|VirtualRootMover]]** | Crea un residuo virtual y vuelve a enraizar el foldtree del Pose en el nuevo residuo


## Movers de modelado y diseño de anticuerpos

Véase también: [[Antibody TaskOperations | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]], [[Antibody Feature Reporters | FeatureReporters#implemented-feature-reporters_antibody]], [[Movers de injerto | Movers-RosettaScripts#general-movers_insertion-and-deletion-grafting]]

### Restricciones ###

Mover  | Descripción
------------ | -------------
**[[CDRDihedralConstraintMover]]** | Añade restricciones diedras generales o de clúster de CDR a las CDR especificadas de un anticuerpo renumerado
**[[ParatopeSiteConstraintMover]]** | Añade SiteConstraints entre el paratopo y un antígeno dado para mantener el paratopo en contacto con el antígeno.  
**[[ParatopeEpitopeSiteConstraintMover]]** | Añade SiteConstraints entre el paratopo y el epítopo para mantener ambos en contacto durante cualquier modelado de cuerpo rígido. 

### Modelado ###

Mover  | Descripción
------------ | -------------
**[[AntibodyCDRGrafter]]** | Injerta loops de CDR de una estructura en otra, con la opción de optimizar las CDR.


### Diseño ###

Mover  | Descripción
------------ | -------------
**[[AntibodyDesignMover]]** | Mover principal para el diseño de anticuerpos dentro del marco de RosettaAntibodyDesign
**[[AntibodyDesignProtocol]]** | Ejecuta AntibodyDesignMover, con algunas opciones adicionales para ejecutar más protocolos.  Menos configurable que AntibodyDesignMover.


## Movers específicos de carbohidratos

Mover  | Descripción
------------ | -------------
**[[LinkageConformerMover | mover_LinkageConformerMover_type]]** | Muestrea torsiones de enlaces glicosídicos a partir de conformaciones estadísticamente favorables.
**[[RingPlaneFlipMover]]** | Gira anillos de piranosa con enlaces opuestos y ecuatoriales.
**[[TautomerizeAnomerMover]]** | Reemplaza el azúcar del extremo reductor por su anómero.
**[[GlycanTreeModeler]]** | Modela glicanos con un algoritmo basado en árboles para predicción de estructuras de novo o refinamiento.
**[[GlycanSampler | GlycanRelaxMover]]** | Algoritmo simple para muestrear torsiones de glicanos usando datos estructurales y optimizar estructuras mediante minimización y empaquetado.
**[[SimpleGlycosylateMover]]** | Glicosila Poses con árboles de glicanos, como man5 o man9 u otros árboles complejos. 
**[[GlycosyltransferaseMover]]** | Simula la actividad de glicosiltransferasas y oligosacariltransferasas biológicas específicas glicosilando un Pose.


## Movers de "maduración de afinidad" computacional

Mover  | Descripción
------------ | -------------
**[[GreedyOptMutationMover]]** | Introduce mutaciones, las puntúa, las combina y acepta las combinaciones según la puntuación
**[[RandomMutation|RandomMutationMover]]** | Introduce una mutación aleatoria en una posición rediseñable


## Movers de diseño de interfaces con ADN

Mover  | Descripción
------------ | -------------
**[[DnaInterfacePacker|DnaInterfacePackerMover]]** | Minimiza cadenas laterales y calcula la energía de unión 

## Movers centrados en entrecruzadores

Mover  | Descripción
------------ | -------------
**[[CrosslinkerMover]]** | Coloca entrecruzadores de moléculas pequeñas, configura sus restricciones y los minimiza energéticamente.  Es compatible con entrecruzadores simétricos en Poses de simetría Nfold.  (**Nota:** este mover se llamaba antes _ThreefoldLinkerMover_).


## Movers centrados en ligandos

### Docking de ligandos

Estos movers reemplazan al ejecutable de docking de ligandos y dan al usuario mayor flexibilidad para personalizar el protocolo de docking. Puedes encontrar un archivo XML de ejemplo para docking de ligandos en el directorio de demos, en Rosetta/demos/protocol_capture/2015/rosettaligand_transform/. Los movers de abajo se enumeran en el orden en que suelen aparecer en un protocolo de docking de ligandos.

Mover  | Descripción
------------ | -------------
**[[StartFrom|StartFromMover]]** | Mueve un ligando a coordenadas especificadas por el usuario
**[[Transform|TransformMover]]** | Realiza movimientos de docking de ligandos mediante una búsqueda de Monte Carlo y rejillas de puntuación dadas
**[[Translate|TranslateMover]]** | Mueve una molécula pequeña a una posición aleatoria dentro de una esfera especificada
**[[Rotate|RotateMover]]** | Realiza rotaciones aleatorias y conserva Poses según un filtro
**[[SlideTogether|SlideTogetherMover]]** | Se asegura de que los ligandos rotados y trasladados estén lo bastante cerca de la proteína para completar el docking de alta resolución
**[[HighResDocker|HighResDockerMover]]** | Usa rotamer trials, perturbaciones del ligando y reempaquetado para completar el docking
**[[FinalMinimizer|FinalMinimizerMover]]** | Realiza una minimización por gradiente de un Pose acoplado
**[[InterfaceScoreCalculator|InterfaceScoreCalculatorMover]]** | Calcula la puntuación de la interfaz restando la de las parejas separadas a la del complejo
**[[ComputeLigandRDF|ComputeLigandRDFMover]]** | Calcula funciones de distribución radial usando pares de átomos proteína-proteína o proteína-ligando
**[[GALigandDock]]** | Usa el potencial general beta para realizar docking flexible de un ligando de molécula pequeña con rejillas de puntuación precalculadas


### Diseño de enzimas

Mover  | Descripción
------------ | -------------
**[[EnzRepackMinimize|EnzRepackMinimizeMover]]** | Diseño/reempaquetado y minimización para el diseño de enzimas
**[[AddOrRemoveMatchCsts|AddOrRemoveMatchCstsMover]]** | Añade o quita restricciones geométricas por pares de un Pose
**[[PredesignPerturbMover]]** | Perturba un ligando en un sitio activo, lo rota y traslada al azar, y acepta según criterios de Boltzmann


### Diseño de ligandos

Mover  | Descripción
------------ | -------------
**[[GrowLigand|GrowLigandMover]]** | Conecta un fragmento aleatorio a un ligando en crecimiento
**[[AddHydrogens|AddHydrogensMover]]** | Satura las conexiones incompletas


## Movers de modelado de loops

Consulta [[RosettaScriptsLoopModeling]] para ver una descripción general.

Mover  | Descripción
------------ | -------------
**[[RemodelMover]]** | Remodela y reconstruye una cadena de proteína
**[[LoopRemodelMover]]** | Perturba y/o refina un conjunto de loops definidos por el usuario. Útil para muestrear una variedad de conformaciones de loops.
**[[ConnectChainsMover|mover_ConnectChainsMover_type]]** |  ¿Lo mejor para loops hélice-hélice?
**[[LoopHashLoopClosureMover|mover_LoopHashLoopClosureMover_type]]** |
**[[LoopHash|mover_LoopHash_type]]** |
**[[LoopCreationMover]]** | no disponible en las versiones publicadas
**[[LoopModeler|LoopModelerMover]]** | Realiza una simulación estándar de modelado de loops (KIC o LoopHash)
**[[LoopBuilder|LoopBuilderMover]]** | Construye los átomos de la cadena principal de loops con residuos que faltan
**[[LoopProtocol|LoopProtocolMover]]** | Optimiza la cadena principal de una región de loop mediante una simulación de Monte Carlo
**[[CCDLoopClosureMover|mover_CCDLoopClosureMover_type]]** | Realiza el cierre de loops con el algoritmo CCD.
**[[KicMover]]** | Genera conformaciones de la cadena principal con el algoritmo de cierre cinemático 
**[[RepackingRefiner|RepackingRefinerMover]]** | Refina las cadenas laterales alrededor de un loop con el packer estándar
**[[RotamerTrialsRefiner|RotamerTrialsRefinerMover]]** | Refina las cadenas laterales dentro y alrededor de un loop con rotamer trials
**[[MinimizationRefiner|MinimizationRefinerMover]]** | Refina la cadena principal y las cadenas laterales del loop mediante minimización por gradiente
**[[PrepareForCentroid|PrepareForCentroidMover]]** | Convierte un Pose al modo centroide
**[[PrepareForFullatom|PrepareForFullatomMover]]** | Convierte un Pose al modo de todos los átomos


## Movers de modelado, diseño y análisis de interfaces de proteínas

Estos movers son, al menos en parte, específicos del diseño de interfaces proteína-proteína. Intentar usarlos con, por ejemplo, complejos proteína-ADN puede producir un comportamiento inesperado.

Mover  | Descripción
------------ | -------------
**[[PatchdockTransform|PatchdockTransformMover]]** | Modifica la configuración del Pose usando un archivo de Patchdock
**[[ProteinInterfaceMS|ProteinInterfaceMSMover]]** | Diseño de interfaces de proteínas en el que el estado unido se compara con el estado no unido y con el estado no unido y desplegado
**[[InterfaceAnalyzerMover]]** | Calcula métricas para evaluar interfaces de proteínas
**[[Docking|DockingMover]]** | Realiza docking en modo centroide o de todos los átomos
**[[DockWithHotspotMover]]** | Realiza docking en modo centroide con restricciones
**[[Prepack|PrepackMover]]** | Minimiza y reempaqueta complejos de proteínas
**[[RepackMinimize|RepackMinimizeMover]]** | Diseño/reempaquetado y minimización para complejos de proteínas
**[[DesignMinimizeHBonds|DesignMinimizeHBondsMover]]** | Similar a RepackResidues, pero con un conjunto definible de residuos objetivo
**[[build_Ala_pose|BuildAlaPoseMover]]** | Convierte en alanina los residuos de la interfaz como preparación para los pasos de diseño
**[[SaveAndRetrieveSidechains|SaveAndRetrieveSidechainsMover]]** | Guarda los datos de cadena lateral que se pierden al cambiar de tipo de residuo
**[[AtomTree|AtomTreeMover]]** | Conecta residuos de dos cadenas distintas con un AtomTree
**[[SpinMover]]** | Permite un giro aleatorio alrededor de un eje definido por un árbol de átomos
**[[TryRotamers|TryRotamersMover]]** | Produce un conjunto de rotámeros para uno o varios residuos dados
**[[BackrubDD|BackrubDDMover]]** | Muestreo de cadena principal y cadenas laterales al estilo backrub
**[[BestHotspotCst|BestHotspotCstMover]]** | Quita las restricciones de todos los residuos salvo los mejores, para evitar problemas con la minimización
**[[DomainAssembly|DomainAssemblyMover]]** (No probado a fondo) | Realiza muestreo de ensamblaje de dominios mediante inserción de fragmentos
**[[LoopFinder|LoopFinderMover]]** | Encuentra loops en el Pose actual y los guarda para usarlos más tarde
**[[LoopRemodel|LoopRemodelMover]]** | Muestrea conformaciones de loops mediante perturbación y refinamiento
**[[LoopMoverFromCommandLine|LoopMoverFromCommandLineMover]]** | Usa varios protocolos para perturbar y refinar los loops de un archivo de loops
**[[DisulfideMover]]** | Crea enlaces disulfuro entre un conjunto de residuos objetivo en una interfaz
**[[InterfaceRecapitulation|InterfaceRecapitulationMover]]** | Prueba movers de diseño por su capacidad de recuperar la secuencia nativa
**[[VLB|VLBMover]]** (también llamado Variable Length Build) | Mejora estructuras de complejos mediante métodos de "afinidad computacional"
**[[HotspotDisjointedFoldTree|HotspotDisjointedFoldTreeMover]]** | Produce un foldtree disjunto para uno o varios residuos seleccionados
**[[AddSidechainConstraintsToHotspots|AddSidechainConstraintsToHotspotsMover]]** | Añade restricciones a átomos de cadena lateral como preparación para la maduración de afinidad
**[[MSDMover|MSDMover]]** | Ejecuta diseño multiestado de proteínas con el protocolo RECON
**[[FindConsensusSequence|FindConsensusSequence]]** | Encuentra una secuencia consenso a partir de candidatos generados por el protocolo RECON. Se usa con MSDMover.
**[[SetupHotspotConstraints]]** | Aplica restricciones de hotspot a un Pose.
**[[Sequence profile Constraints]]** | Aplica restricciones de perfil de secuencia a un Pose.

### Placement y movers y filtros asociados a placement

Consulta [[RosettaScriptsPlacement]] para más información.

Mover  | Descripción
------------ | -------------
**[[Auction|AuctionMover]]** | Subasta residuos a conjuntos de hotspots 
**[[MapHotspot|MapHotspotMover]]** | Mapea residuos hotspot potenciales
**[[PlacementMinimization|PlacementMinimizationMover]]** | Realiza minimización de cuerpo rígido
**[[PlaceOnLoop|PlaceOnLoopMover]]** | Realiza remodelado de loops con cierre cinemático de loops y gestiona la aplicación de restricciones de hotspot
**[[PlaceStub|PlaceStubMover]]** | Placement de cadenas laterales usando el método de hot-spots para el diseño de proteínas de unión
**[[PlaceSimultaneously|PlaceSimultaneouslyMover]]** | Similar a PlaceStub, pero coloca los residuos simultáneamente en lugar de iterativamente
**[[RestrictRegion|RestrictRegionMover]]** | Permite diseñar pequeñas secciones de un Pose sin efectos de largo alcance
**[[StubScore|StubScoreFilter]]** | Filtra configuraciones sin esperanza según si las restricciones de hotspot son efectivas o no
**[[ddG|ddGMover]]** | Calcula el ddG global o por residuo
**[[ContactMap|ContactMapMover]]** | Produce mapas de contactos para una o varias estructuras


##Movers para construir protocolos / otros

Estos movers ayudan a construir protocolos o se pueden usar en circunstancias muy específicas. 

Mover  | Descripción##SEWING movers
------------ | -------------
**[[ConvertRealToVirtualMover]]** | Convierte residuos en residuos virtuales, que no se puntúan y no se escriben en un PDB.
**[[ConvertVirtualToRealMover]]** | Vuelve a convertir residuos virtuales en residuos reales.


##Movers de SEWING

Estos movers se usan como parte del protocolo [[SEWING]] y tienen archivos de entrada y opciones de línea de comandos específicos del protocolo:

###Movers de SEWING refactorizados
Estos movers forman parte del nuevo marco de SEWING que llegará pronto a master. Para la versión de SEWING que está actualmente en la versión publicada de Rosetta, consulta los movers de SEWING heredados.

Mover  | Descripción
------------ | -------------
**[[AssemblyMover]]** | Construye un ensamblaje de un tamaño especificado por el usuario mediante muestreo de Monte Carlo de subestructuras.
**[[AppendAssemblyMover]]** | Construye una proteína extendiendo una estructura inicial especificada por el usuario. Se usa a menudo para el diseño de interfaces (partiendo de un péptido de unión a proteínas) o para incorporar motivos específicos en los diseños. Documentación próximamente.
**[[LigandBindingAssemblyMover]]** | Se usa para añadir nuevos contactos a un ligando especificado usando el marco de SEWING. Documentación próximamente.

###Movers de SEWING heredados

Mover  | Descripción
------------ | -------------
**[[LegacyMonteCarloAssemblyMover]]** | Construye un ensamblaje de un tamaño especificado por el usuario mediante muestreo de Monte Carlo de subestructuras.
**[[LegacyAppendAssemblyMover]]** | Construye una proteína extendiendo una estructura inicial especificada por el usuario. Se usa a menudo para el diseño de interfaces (partiendo de un péptido de unión a proteínas) o para incorporar motivos específicos en los diseños.
**[[LegacyRepeatAssemblyMover]]** | Se usa para diseñar proteínas repetitivas.
**[[LegacyEnumerateAssemblyMover]]** | Construye todas las estructuras posibles a partir de un SewGraph dado.
**[[LegacyAssemblyConstraintsMover]]** | Se usa para favorecer residuos nativos durante el refinamiento en ensamblajes producidos con [[SEWING]].

##Movers de docking simétrico

Mover  | Descripción
------------ | -------------
**[[SymDockProtocol]]** | Docking de oligómeros simétricos: como el docking proteína-proteína, pero entre parejas simétricas.
**[[SymFoldandDockMoveRbJumpMover]]** | Restablece los residuos ancla de las transformaciones de subunidades
**[[SymFoldandDockRbTrialMover]]** | Perturba al azar la transformación de cuerpo rígido de las subunidades
**[[SymFoldandDockSlideTrialMover]]** | Desliza subunidades simétricas para juntarlas

## EnzmaticMovers
Estos movers comparten una interfaz común y simulan la actividad de enzimas sobre un `Pose`, como modificaciones postraduccionales virtuales.

Mover  | Descripción
------------ | -------------
**[[DNAMethyltransferaseMover]]** | Simula la actividad de ADN metiltransferasas biológicas específicas metilando un `Pose` que contiene ADN.
**[[GlycosyltransferaseMover]]** | Simula la actividad de glicosiltransferasas y oligosacariltransferasas biológicas específicas glicosilando un `Pose`.
**[[KinaseMover]]** | Simula la actividad de cinasas biológicas específicas fosforilando un `Pose`.
**[[NTerminalAcetyltransferaseMover]]** | Simula la actividad de N-acetiltransferasas N-terminales biológicas específicas acetilando un `Pose` en su extremo N.

##Véase también

* [[Mover]]: una descripción general de los Movers. 
* [[I want to do x]]: guía para elegir un mover de RosettaScripts
