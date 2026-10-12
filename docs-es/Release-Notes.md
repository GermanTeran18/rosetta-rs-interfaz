# Notas de la versión

## Rosetta 3.15

##### Cambios notables en el sistema de compilación:
* La versión de Scons que se distribuye con Rosetta se ha actualizado para admitir Python 3.12+. Las versiones de Python anteriores a la 3.5 (incluido Python 2.7) ya no son compatibles.
* La compilación con el extra `pytorch` se ha renombrado a `torch`, lo que cambia tanto la línea de comandos de Scons como los nombres de los ejecutables compilados (véase [[Building Rosetta with Tensorflow and Torch]])

##### Nuevos protocolos:
* Rosetta Evolutionary Ligand ([[REvoLd]]) <https://arxiv.org/abs/2404.17329>
* [[RosettaAMRLD]] (Rosetta automated Monte Carlo reaction-based ligand design ) <https://doi.org/10.1021/acs.jcim.5c00497>
* [[GALigandDock]] puede detectar regiones sin modelar de mapas de crio-EM y evaluar ligandos acoplados según su dG y su ajuste a la densidad. <https://doi.org/10.1016/j.str.2025.07.002>
    * aplicación [[sim_cryo]] para simular densidad de crio-EM
* Código actualizado de motivos de ligandos
    * aplicación [[determine_real_motifs]]
    * aplicación [[remove_duplicate_motifs]]
* Nuevo enfoque de generación de rotámeros no canónicos: "[[FakeRotLib]]" <https://doi.org/10.1021/acs.jcim.5c01030>

##### Nuevas herramientas (Movers, Filtros, etc.):
* [[PerResidueBfactorMetric]]
* Compatibilidad con lantionina en [[CrosslinkerMover]]
* Movers, filtros y químicas para diseño de fármacos
    * [[DrugDesignMover]]
    * [[DrugPolishMover]]
    * Filtro [[AtomExists]]
    * [[NChiFilter]]
    * [[SAScoreFilter]]
    * [[RDKitMetricFilter]]
    * [[HeteroHeteroBondFilter]]
    * [[LigandLocationFilter]]
    * Química [[Reprotonate]]
    * Química [[RDKitRotamers]]
    * Química [[BCLFragmentRotamers]]
    * Química [[RandomFragmentLigand]]
    * Química [[ReactionGrow]]
    * Química [[ReactionFragment]]
    * Química [[ReactionBasedAnalogSampler]]
    * Química [[ReactionMultitransform]]
    * Química [[SubsituentReplace]]
    * Química [[SubstructureReplace]]

##### Actualizaciones:
* Cambio a un nuevo motor de análisis de mmCIF: debería ser más robusto y corrige problemas en los que no se leían partes de los archivos mmCIF.
* [[RECON]] ahora admite diseño con NCAA.
* [[BackrubProtcol]] ahora tiene la opción `dump_poses` (por defecto false), que controla la escritura de los archivos *_last.pdb y *_low.pdb.
* [[InterfaceScoreCalculator]] añade puntuaciones al Pose cuando no se ejecuta bajo JD2.
* Mejoras de calidad de vida en [[PerResidueEsmProbabilitiesMetric]]
* Se añade una opción `deterministic` a [[ProteinMPNNProbabilitiesMetric]]
* Se añade una opción `cartesian` a [[FinalMinimizer]] de RosettaLigand

##### Corrección de errores:
* Se corrige una variable sin inicializar en [[InterfaceScoreCalculator]] con un uso que no es RosettaScripts
* Correcciones de errores en [[SampleSequenceFromProbabilities]]
* Se corrige un fallo en [[homodimer_design]] con -pack_min_runs > 2
* Se corrige un segfault en [[RosettaCM]] cuando se usa con glicanos ramificados
* Se corrige un error tipográfico en la comunicación de [[UnfoldedStateEnergyCalculator]].
* Se corrige un intercambio interno de las opciones get_script_vars y get_user_options de [[ProtocolSettingsMetric]]
* Se corrige la impresión del tracer en [[CompositeStringMetric]]
* Se corrige un error de NaN que afectaba a los cálculos de MembraneGeometry
* Se corrige la compilación de la interfaz con [[PHENIX]]
* Mejor compatibilidad con versiones más recientes de compiladores
* Correcciones de compilación para [[DalphaBall]] incluido
* Ajustes varios en los sistemas de compilación y de pruebas.

## Rosetta 3.14

* Se han hecho numerosos cambios para dar soporte al [repositorio abierto](https://github.com/RosettaCommons/rosetta) de Rosetta.

* El filtro worst9mer de RosettaScripts se ha renombrado a [[Worst9mer]]. 

Nuevas herramientas y aplicaciones:
* [[SewAnything]]
* [[rosetta_scripts_jd3]]
* [[atom_energy_breakdown]]
* [[parcs_ccs_calc]]
* [[SID_ERMS_prediction]]
* [[loodo]] -- https://onlinelibrary.wiley.com/doi/10.1002/prot.25445
* [[transform_loodo]] -- https://onlinelibrary.wiley.com/doi/10.1002/prot.25445
* [[cl_complex_rescore]] vuelve a puntuar modelos acoplados usando datos de marcaje covalente obtenidos por espectrometría de masas 
* [[ligand_discovery_search_protocol]] docking de ligandos basado en motivos
* [[identify_ligand_motifs]] descubrimiento de ligandos basado en motivos
* [[HDXEnergy]] puntúa qué tan bien concuerda un Pose (pdb) con datos de HDX dados 

Nuevos Movers, Filtros, etc.:
* [[JumpForResidue Selector]]
* [[FilterValueMetric]] ahora accesible desde XML
* Nuevo término de puntuación [[depc_ms]] para datos de MS de marcaje covalente con dietilpirocarbonato
* [[ConstraintsMetric]], métrica para informar sobre las restricciones
* Se añadió el potencial EZ asimétrico de Schramm et al 2012; DOI 10.1016/j.str.2012.03.016. 
* [[TrueFalseFilter]] para permitir el control de flujo de RosettaScripts mediante script_vars
* [[SequenceMover]] ahora es compatible con RosettaScripts
* [[CycpepRigidBodyPermutationMover]] para superponer un péptido cíclico sobre sí mismo con permutación cíclica
* [[ConfChangeMover]] para muestrear una variedad de cambios conformacionales.
* energía [[lk_dome]] para la interacción con el agua
* [[SixDoFGridDockMover]]
* [[ShakeStructureMover]]
* [[DEEROptimizeCoordsMover]]
* [[ProteinMPNNMover]]
* [[SecretionOptimizationMover]], también conocido como [[Degreaser]]
* Objetos [[Chemistry]], que modifican ResidueTypes:
    * [[ApplyChemistyMover]] aplica una Chemistry a un Pose
    * [[PatchChemistry]] aplica una PatchOperation
* [[CrankshaftFlipMover]]
* [[LipidMemGrid]], una malla de puntuación de RosettaLigand para el docking de residuos de lípidos
* [[MixedMonteCarlo]] - un método híbrido de MonteCarlo que recibe tanto un Pose de baja resolución (centroid) como de alta resolución (todos los átomos)
* Se expone [[BalancedKicMover]] a RosettaScripts
* [[BFactorSelector]]
* [[EMERALD]], un protocolo de docking de ligandos guiado por densidad
* [[PTMPredictionMetric]], un SimpleMetric para predecir 18 modificaciones postraduccionales distintas usando redes neuronales artificiales (ANN) 
* Diversas métricas y movers para trabajar con modelos de lenguaje de aprendizaje automático [[Working with PerResidueProbabilitiesMetrics]]
    * [[PerResidueEsmProbabilitiesMetric]]
    * [[PseudoPerplexityMetric]]
    * [[ProteinMPNNProbabilitiesMetric]]
    * [[SaveProbabilitiesMetricMover]]
    * [[LoadedProbabilitiesMetric]]
    * [[RestrictAAsFromProbabilities]]
    * [[SampleSequenceFromProbabilities]]
    * [[CurrentProbabilityMetric]]
    * [[AverageProbabilitiesMetric]]
    * [[ProbabilityConservationMetric]]
    * [[BestMutationsFromProbabilitiesMetric]]
    * [[MIFSTProbabilitiesMetric]]	

Rendimiento:

* Opción `-never_rerun_filters` para evitar la reejecución final de las opciones con RosettaScripts
* Las transiciones de bins (por ejemplo, para [[GenKIC]]) se cargan de forma diferida y segura para hilos (threadsafe)
* El esquema XML solo se genera y se valida una vez
* Las ScoreFunctions se cargan desde disco una sola vez, de forma diferida y segura para hilos.
* Se optimizó la carga de PDB
    * Numerosas correcciones para acelerar la carga en el caso por defecto
    * `-in:obey_ssbond` omite la detección de disulfuros y supone que los registros SSBOND son correctos
    * `-fast_restyping` usa un método más rápido para asignar tipos de residuo, que puede funcionar en casos sencillos (por ejemplo, solo residuos de proteína)

Actualizaciones:
* Citas adicionales y mejoradas
* Mensajes de error mejorados
* Actualizaciones del Chemical Components Dictionary incluido, de wwwPDB
* Mejoras de rendimiento y generalización del algoritmo de [[Jacobi loop closure]]
* Se añadió la opción JumpSelector a [[DdgFilter]] y [[ShapeComplementarityFilter]]
* Nuevas opciones de [[BuriedUnsatisfiedPolarsCalculator]], mejor manejo de errores
* Numerosas actualizaciones de [[GALigandDock]]
* Membrana
    * Actualizaciones de las derivadas de solvatación de membrana.
    * Se añaden opciones de membrana a cartesian_ddg
    * Se añade compatibilidad con geometrías de membrana adicionales, como micelas, bicelas, vesículas y vesículas dobles.
    * Se añade compatibilidad con proteínas de membrana al protocolo de docking de conjuntos
* Glicanos
    * Se añade un parche para ramificación exocíclica a partir de aldofuranosas
    * Se añade una nueva columna de puntuación para variantes sin glicosilar en la aplicación de glicomutagénesis
    * El ácido murámico (Mur) se anota como O3_LACTYL_SUGAR
    * Se añaden a la base de datos azúcares metilados, tiolados y propargilados
    * Se añaden aminoazúcares glicolilados
    * Se habilitan enlaces glicosídicos bidireccionales
    * Se añade un parche de acilación con butirilo
* Mejoras en mol2genparams.py
    * Se añade la opción --comment_bonds
* Mejoras en molfile_to_params_polymer.py
* Se actualizan los parámetros de la fenilserina (BB8) 
* Se permite dividir en varios residuos los residuos de la entrada PDB según la información de la base de datos
* Se permite usar [[RandomizeBBByRamaPrePro]] sin un selector de residuos
* Diversas actualizaciones de [[SapConstraintEnergy]], [[AddSapConstraintMover]], [[AddSapMathConstraintMover]]
* Se permite que [[helical_bundle_predict]] reciba un archivo de PsiPred como alternativa a un archivo de definición de hélices, para la predicción con aminoácidos canónicos
* Opciones adicionales relacionadas con el manejo del almacén de fragmentos para [[ConnectChainsMover]], [[FixAllLoopsMover]], [[NearNativeLoopCloser]], [[Worst9mer]], [[StructProfileMover]]
* Opciones adicionales de PSSM para StructProfileMover
* Se añade la opción -edensity::periodicity para condiciones de contorno periódicas en la densidad
* Diversas mejoras para [[MultistageRosettaScripts]]
* Se añade mejor compatibilidad con residuos no canónicos en [[SimpleThreadingMover]]
* Se asegura que la aplicación [[energy_based_clustering]] escriba los nombres de archivo u otros descriptores de los Poses que agrupa.
* Se añadió la opción sort_scorefxn a [[Disulfidize]]
* Se añadió la opción logic a [[CompoundStatement]] para usarla en lugar de subelementos.
* Se añade la opción detect_disulfides a [[DeleteRegionMover]]
* Se añade la opción logic a [[IfMover]]
* [[RandomMover]] ahora tiene la opción de repeticiones para cada mover
* Se añade la opción dir al mover [[dumpPDB]]
* Se añade la capacidad residue_selector a [[mergePDBmover]]
* Se añaden nuevos pesos de puntuación para el protocolo [[ReplicaDock2.0]]
* Se generaliza el parche de residuo virtual 
* Se añade la predicción de estructuras de lariat con tioéter a [[simple_cycpep_predict]] y [[SimpleCycpepPredictApplication]]
* Se añade compatibilidad con otros tipos de entrecruzamiento en [[CrosslinkerMover]]
* Se añade la opción "db_file_name" a [[SampleRotamersFromPDB]]
* Se permite que [[RDKitMetric]] reciba una cadena de varios residuos (por ejemplo, un péptido cíclico).
* Se añade una comprobación de simetría a [[MergePDBMover]] cuando se usan residue_selectors
* Se añade compatibilidad con beta-aminoácidos en la predicción de estructura de macrociclos
* Se ajustan las definiciones de torsiones impropias de cart_bonded para que Rosetta pueda corregir átomos de H de Q/N mal etiquetados
* Se añade la capacidad de medir el desorden directamente a partir de la estructura en [[ResidueDisorder]]
* Se habilita [[NamedAtomPairConstraints]] en el archivo de restricciones
* Se permite que [[PARCS]] también lea silent files
* Se permite cambiar los cortes de probabilidad de Dunbrack en cada ejecución del packer
* Se actualiza la versión de RDKit utilizada.
* Se añade compatibilidad con la opción -density_zscores en la aplicación [[density_tools]]
* Se añade la opción -bbamide a la aplicación [[per_residue_solvent_exposure]]
* Se añade la opción -alternative_score_file a [[energy_based_clustering]] para puntuación personalizada
* Se añade la opción `metric_to_bfactor` a [[RunSimpleMetricsMover]] para asignar una métrica por residuo al factor B
* Se añade la opción `use_pose_name` al mover [[DumpPDB]]
* Se añade la opción `delta_metrics` a [[InterfaceAnalyzerMover]]
* Ahora se pueden controlar torsiones personalizadas con [[DihedralConstraintGenerator]]
* Se añade compatibilidad con archivos tar para la lectura de archivos params.
* La función de puntuación franklin2019 se ha actualizado según [Samanta & Gray](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10327106/)
* La integración con [[BCL]] se ha actualizado para usar la versión más reciente de BCL.

Correcciones de errores:
* Se evita un retorno errático de 0 en rmsfitca2() 
* Se corrigen errores relacionados con el uso de abs()/std::abs()
* Numerosas correcciones de errores en [[GALigandDock]]
* Se corrige un fallo de [[DEEREnergy]] durante el cálculo de derivadas
* Se corrige [[map_symmetric_res_pairs]] para que funcione correctamente con simetrías no cíclicas
* Se corrige la lectura de silent files con varias observaciones (remarks)
* Se corrigió el truncamiento y el redondeo de valores en [[SidechainNeighborCountMetric]]
* Se corrige un error en hbnet si find_only_native_networks no encuentra redes
* Se corrige un desbordamiento en utility::decode6bit() al leer silent files binarios.
* Se corrige un comportamiento indefinido en FArrays
* Se corrige un error en [[simple_cycpep_predict]] con disulfuro terminal
* Se corrige el manejo del esquema de numeración de anticuerpos IMGT
* Se corrigen segfaults con interfaces de una sola cadena en [[Interface]], [[InterfaceInfo]] y [[InterchainPotential]]
* Se corrige un error espurio en [[helical_bundle_predict]] cuando PsiPred predice un único residuo aislado de hélice 
* Mejor manejo de residuos virtuales en [[ReferenceEnergy]], [[BuriedUnsatPenalty]], [[VoidsPenalty]], [[HydroxylTorsionPotential]] y [[RamaPrePro]]
* Se generaliza SequenceSymmetricAnnealer para que funcione con residuos no canónicos
* Se hace más robusto el constructor de [[HybridizeProtocol]] frente a los ajustes de la opción -fix_disulf
* Se corrige un error en [[TotalEnergyMetric]] que omitía términos no descomponibles por pares
* Corrección de un error en [[NamedDihedralConstraint]]
* Corrección de errores y adiciones en [[GlycanSequonSelector]]
* Mejor comprobación de límites en [[NearNativeLoop closure]]
* Se corrige un acceso a puntero nulo en [[SeqprofConsensus]]
* Se corrige el calculador de [[PNear]] para casos en los que los valores absolutos de las energías son grandes.
* Se corrige un problema de NaN cuando rama_prepro tiene 0 en alguna entrada de probabilidad
* Se corrige un error en el cálculo de energía de largo alcance del fondo en el diseño multiestado
* Se corrige la E/S de DEER, para el término de energía epr_deer_score
* Se corrige una comprobación de límites de índice en [[KeepRegionMover]]
* Se corrige un error tipográfico en el ajuste `oob_mode` de [[SliceResidueSelector]]
* Se corrige un caso en el que [[cartesian_ddg]] no terminaba
* Se corrige un error de [[simple_cycpep_predict]] en el muestreo cis-trans con lariats
* Se hace que [[SymmetricalResidueSelector]] siempre produzca selecciones simétricas
* Se corrige la colocación del átomo de oxígeno en el parche AcetylatedProteinNtermConnection.
* Se corrige un error de vértice del FoldTree en [[stepwise]]
* Se elimina una posible división por cero en [[CartesianMD]]
* Se corrige cómo la salida PDB calcula los residuos de los registros SSBOND.
* Se ajusta el mover [[Transform]] para acumular el mejor ligando entre repeticiones
* Se corrige un problema con PDB_ROTAMERS y residuos poliméricos con parches
* Se hace que [[DdgFilter]] respete la opción repack_unbound

Sistema de compilación:
* Correcciones de compilación para sistemas operativos y compiladores más nuevos
    * Los Mac con Apple Silicon (M1) ya son compatibles
    * Linux arm64 ya debería ser compatible
* Se añadieron las compilaciones `extras=pytorch` y `extras=pytorch_gpu` para integrar modelos de aprendizaje automático basados en PyTorch
* Menor inclusión de encabezados para una compilación más rápida

Otros:
* Se añadió el benchmark científico [[GlycanDock]]
* Se añadieron pruebas de [[RosettaNMR]] a los benchmarks científicos
* Se añadió el benchmark científico [[cartesianddG]] para membranas.
* Se actualizó la prueba científica [[protein_data_bank_diagnostic]] para el PDB ampliado

## Rosetta 3.13

Nuevas herramientas y aplicaciones:
* Sistema de benchmarks científicos renovado (y enviado para publicación)
* trRosetta ya está disponible en Rosetta en C++.  Una compilación con TensorFlow (extras=tensorflow o extras=tensorflow_gpu) lo admite.
     * [[aplicación trRosetta|trRosetta]] para la predicción de estructura completa a partir de una secuencia o de un alineamiento múltiple de secuencias.
     * [[mover trRosettaProtocol|trRosettaProtocol]] para la predicción de estructura a partir de una secuencia o de un alineamiento múltiple de secuencias en el contexto de un protocolo mayor.  (Accesible desde RosettaScripts, PyRosetta o código C++).
     * [[trRosettaConstraintGenerator]] para aplicar restricciones de trRosetta basadas en una secuencia o en un alineamiento múltiple de secuencias en el contexto de un protocolo mayor.  (Accesible desde RosettaScripts, PyRosetta o código C++).
* Compatibilidad con el nuevo chip M1 de Mac
* RosettaSurf (superficies de proteínas)
* La conexión PyMOL-Rosetta ahora puede "rebotar" a través de un servidor del laboratorio Gray para permitir ver trayectorias de Rosetta cuando el origen de la trayectoria no es suficientemente configurable
* manejo de epr/deer
* scripts de diseño de macrociclos peptídicos de NDM-1 (mediante el subrepositorio de RosettaScripts)
* [[helical_bundle_predict|helical-bundle-predict]] -- predicción de estructura sin fragmentos de ensamblajes de haces helicoidales.  Experimental.
* auto-DRRAFTER
* Actualizaciones importantes de RosettaScripts en [[Updating-RosettaScripts]]; en particular, APPLY_TO_POSE ya no existe.
* [[CitationManager]] -- un módulo de Rosetta que registra qué módulos se usaron en un protocolo y escribe información en el tracer al final indicando qué artículos deben citarse.
* Protocolo de cierre de loops de Jacobi y módulos de análisis del jacobiano
* [[restype_converter]]
*  https://crash.rosettacommons.org/ y un script de asistencia al usuario destinado a informar a ese sitio (Rosetta no puede informar nada por sí mismo)


Nuevos Movers, Filtros, etc.:
* [[ShapeSimilarity]], [[ElectrostaticSimilarity]] (RosettaSurf)
* [[SideChainNeighborCountMetric]]
* [[BuriedUnsatHbonds2]]
* [[RemoveMetalConnectionsMover]]
* [[LogicResidueSelector]]
* [[SapScore]], como SimpleMetric o como término de puntuación
* [[SimpleMetricSelector]]
* [[CavityVolumeFilter]]
* [[hrf_dynamics]]
* [[FavorCouplingTensor]]
* SimpleMetric y Filtro para puentes de hidrógeno internos de un péptido
* [[FoldTreeFromMotif]]
* [[TargetClashEnergy]]
* [[mover trRosettaProtocol|trRosettaProtocol]] -- ejecuta la predicción de estructura con trRosetta dentro de un protocolo mayor de RosettaScripts, PyRosetta o C++.
* [[trRosettaConstraintGenerator]] -- añade restricciones estructurales de trRosetta dentro de un protocolo mayor de RosettaScripts, PyRosetta o C++.
* [[PeptideInternalHbondsMetric]] y [[PeptideInternalHbondsFilter]] -- cuentan o filtran según el número de puentes de hidrógeno internos dentro de un Pose, una cadena o una selección. 
* [[NTerminalAcetyltransferaseMover]]


Base de datos:
* Carbohidratos: lactilo, triosa, tetrosa, aldohexofuranosilos, aldohexofuranosas modificadas, ácido to4 / to7 / to9-neuramínico, cetopentofuranosilos, quivonosa, cetohexopiranosilos, aldopentofuranosilos; códigos GLYCAM; muchas otras adiciones a la base de datos
* Archivos params centroid para AIB, ORN, DAB y DAP (aminoácidos no canónicos comunes)


Clases y módulos actualizados o con errores corregidos:
* molfile_to_params.py
* [[GALigandDock]], [[GenericBondedPotential]]
* [[RosettaAntibodyDesign]]
 * disulfuros
 * optimización por ciclos de la etapa con todos los átomos
 * otras correcciones
* CitationManager (prueba la opción -info con RosettaScripts; por ejemplo, "Rosetta/main/source/bin/rosetta_scripts.default.linuxgccrelease -info FastDesign".)
* RosettaScripts:
 * acceso al Pose nativo
 * single_random
 * ' además de "
 * opción para no recargar el XML en cada estructura
 * Eliminación de APPLY_TO_POSE
* la mayoría de las clases ahora usan lógica de selectores mediante su opción `selector=` en una etiqueta.
* SimpleMetrics: más opciones de informe
 * Se pueden ejecutar directamente desde la sección PROTOCOLS del XML
* [[DEEROverlapMethod]]
* [[DsspMover]] y [[LayerSelector]] funcionan mejor con simetría
* glicomutagénesis: disulfuros
* [[LinearPenaltyFunction]]
* Mejor adherencia a lbfgs_armijo_nonmonotone como tipo de minimizador por defecto en más partes de Rosetta
* [[SwitchChainOrderMover]]
* Backrub compatible con la especificación de MoveMap
* [[InteractionGraphSummaryMetric]]
* Manejo de D-aminoácidos
* [[SequenceSymmetricAnnealer]]
* [[CrosslinkerMover]] y [[simple_cycpep_predict]]
* ddG cartesiano
* [[SeqprofConsensusOperation]]
* [[AddConstraintsToCurrentConformationMover]]
* Cuestiones de funciones de puntuación
 * [[RamachandranEnergy]]
 * Minimización cartesiana con Ramachandran
* [[EPRSpinLabel]]
* [[AlignChainMover]]
* [[FragmentScoreFilter]]
* Mejor uso de memoria en el docking de ligandos
* [[AtomicDistanceFilter]]
* ARN
 * [[RNA_BasePairHandler]]
 * mover de idealización
 * muestreador de monómeros
 * Flexibilidad de ligandos en FARFAR2


* [[MutateResidue]] ahora es más fuerte que un disulfuro
* [[DeclareBond]]
* [[MoverFilterPair]]
* [[TimingProfileMetric]]
* [[HybridizeMover]]
* [[NormalModeRelaxMover]]
* [[DisulfidizeMover]]
* [[approximate_buried_unsat_penalty]]
* [[PeptideStubMover]]
* [[HbondMetric]]
* [[IndexSelector]]
* [[ResidueTypeLinkingConstraint]]
* manejo de la salida de ATOM y HETATM
* mejoras de rendimiento del empaquetamiento
* [[ApproximateBuriedUnsatPenalty]]
* [[MinimizationRefiner]]
* [[Multistage RosettaScripts]]
* [[StoredRotamerLibrarySpecification]]
* [[SmartAnnealer]]
* [[BuildingBlockInterface]]
* [[TaskAwareSymmMinMover]]
* [[GlycanTreeModeler]]
* [[FullAtomDisulfideEnergy]]
* [[SelectedResiduesPyMOLMetric]]
* [[RepackWithoutLigand]]
* [[ShuffleFileDistributor]]
* [[HybridizeFoldTreeDynamic]]
* [[FlexPepDock]]
* [[SSElementSelector]]
* [[PeptideStubMover]]
* [[PoseFromSequenceMover]]
* [[SequenceSymmetricAnnealer]]
* [[WaterMediatedHbondMetric]]
* [[FastDesign]]
* [[FastRelax]]

Otros:
* Ya no hay grafías no canónicas de "noncanonical" 
* Se rebajó el famoso mensaje de error "Inaccurate G!".  Sigue siendo grave, pero ahora grita menos.
* Un algoritmo no recursivo de actualización de coordenadas reemplaza la antigua versión recursiva.  Es útil en multihilo, porque el espacio de pila de los hilos no primarios puede ser limitado.  Es más rápido y eficiente en general.
* Los ResidueTypes se han actualizado pensando en propiedades para aprendizaje automático (ML)
* Varias correcciones generales para ADN
* EnzymaticMovers: se añade el análisis de secuencias de ácidos nucleicos al sistema EnzymaticMover


## Rosetta 3.12

Nuevas aplicaciones:
* [[constel]]
* [[restype_converter]] una utilidad sencilla para convertir entre representaciones de residuos
* aplicación para encontrar el grosor hidrofóbico de menor energía
* complementos de [[simple_cycpep_predict]]:
    * [[count-cycpep-sequences]] para contar secuencias únicas
    * Predicción de estructura sin fragmentos para péptidos cíclicos


Nuevas herramientas:
* Rosetta produce un archivo ROSETTA_CRASH.log cuando hay errores. RosettaCommons ahora recopila estos informes en <https://crash.rosettacommons.org>, y el script source/scripts/python/public/report_crashes.py se puede usar para enviar automáticamente esos archivos.
    * También se mejoraron varios mensajes de finalización
* Más RelaxScripts nuevos: [[MonomerDesign2019]] y similares
* [[SliceResidueSelector]]
* [[AcceptToBestMover]] - replica el comando accept_to_best desde dentro de FastRelax
* [[SequenceSymmetricAnnealer]]
* [[ContactMolecularSurface]]
* muestreador [[stepwise]] e infraestructura para polímeros generales
* [[DumpTrajectoryEnergy]] ampliado para funcionar con el packer
* [[ResidueType]] se separó de [[MutableResidueType]] para permitir la modificación química sobre la marcha

Rendimiento:
* Hay disponible empaquetamiento multihilo.  Ten en cuenta que debes compilar en modo multihilo.

Actualizaciones y corrección de errores:
* [[FastRelax]]
* [[GreenPacker]]
* [[helical_bundle_predict]] y [[simple_cycpep_predict]]
* Obsolescencia de APPLY_TO_POSE en RosettaScripts
* [[TryDisulfidePermutations]]
* Actualizaciones de make_symmdef_file.pl para fibras y simetrías helicoidales apolares
* Pesos de puntuación de ARN
* Ajustes del segmentID de PDB
* desarrollo de pruebas científicas
* MPIJobDistributor de JD3
* Objetos XML convertidos para depender menos de los Poses en el momento del análisis:
    * usan ResidueSelectors internamente
    * get_count_pair_function_trie de [[baseEtableEnergy]]
* [[InterfaceAnalyzer]]
* [[RMSDMetric]]
* [[StructProfileMover]]
* [[MotifGraft]]
* Correcciones de las restricciones de quiralidad de glicanos en cart_bonded.
* constructor de disulfuros de remodel
* varios errores del matcher
* [[MonteCarlo]] mejor soporte para cuando la puntuación total de un Pose no coincide con la puntuación que se está evaluando
* Lógica de co-orientación de [[Residue]] y otros cambios en [[MutableResidueType]]
* ResidueAtomTreeCollection
* [[CompoundFilter]]
* [[FinalMinimizer]] y [[HighResDocker]] del docking de ligandos
* [[TCRmodel]]
* [[LoadDensityMapMover]]
* [[HybridizeMover]]
* Se descubrieron algunos errores de división entera, al menos uno de los cuales afectaba a las matemáticas de los puentes de hidrógeno
* La copia almacenada en Rosetta del archivo de componentes de wwPDB (¡los usuarios siempre pueden actualizarla directamente desde wwPDB!)
    * También hay actualizaciones para que funcione mejor con los D-aminoácidos y con los estados de protonación correctos del ATP (el de wwPDB es incorrecto)
* Protocolos de agua estadística de [[beta_nov16]]
* algunas correcciones de python2 a python3
* [[ApproximateBuriedUnsat]]
* [[FragmentStore]]
* [[mhc_epitope]]
* Lectura de PDB
* [[RollMover]]
* [[ddG_filter]]
* [[RosettaAntibodyDesign]]
* SnugDock
* [[PDBInfoLabel]]
* [[PhiSelector]]
* Tras solo 10 años de angustia, -jd2:delete_old_poses ahora es true por defecto
* [[PruneBuriedUnsats]] todavía no admite simetría, pero falla con cortesía si lo intentas
* [[VirtualRootMover]]
* [[graftswitchmover]]
* Mejor compatibilidad de E/S de mmTF
* [[SasaMetric]] - SASA polar o hidrofóbica
* [[ParatopeSiteConstraintMover]]
* [[ParatopeEpitopeSiteConstraintMover]]
* [[NmerRefEnergy]]
* site.settings.release

## Rosetta 3.11

### Nuevas aplicaciones

* glicomutagénesis shotgun, con [[GlycosyltransferaseMover]].
* [[TCRmodel]] (receptor de células T)
* create_clash-based_repack_shell (Ejem)
* Se ha añadido una aplicación experimental para generar potenciales de cadena principal para aminoácidos no canónicos (llamada make_mainchain_potential).
* [[ERRASER2]]
* [[MultistageRosettaScripts]]
* Se añadió la aplicación [[count_cycpep_sequences|count-cycpep-sequences]], para calcular el número de secuencias únicas de un péptido cíclico con una simetría dada, teniendo en cuenta las permutaciones cíclicas.
* [[cartesian_ddg]]

### Mejoras en las aplicaciones:
* Las convenciones de diseño no canónico (en todas las aplicaciones) se han hecho coherentes con las convenciones de diseño canónico: las operaciones de tarea solo se pueden usar para _deshabilitar_ tipos de residuo, no para _habilitarlos_.  Se han introducido las [[PackerPalettes|PackerPalette]] como elemento de interfaz para definir el conjunto por defecto de tipos de residuo con los que diseñar en ausencia de cualquier operación de tarea, lo que permite a quienes diseñan con aminoácidos no canónicos especificar un conjunto ampliado de bloques de construcción con los que trabajar.
* Compatibilidad con la predicción de estructura de macrociclos de peptoides en la aplicación [[simple_cycpep_predict]].
* [[GALigandDock]]: puntuación de densidad
* [[AntibodyModelerProtocol]]: compatibilidad con [[LoopModeler]]
* La [[energy_based_clustering_application]] ahora puede informar el número de cadenas únicas de bins de Ramachandran observadas en los clústeres producidos.
* [[RosettaScripts]]: los Poses de salida solo se vuelven a puntuar automáticamente si el bloque OUTPUT lo indica; de lo contrario, se deja intacto y se informa el último dato de puntuación.  Comportamiento mejorado en ambos casos.
* Los silent files ahora funcionan con [[hbnet]], [[PyRosetta]] y [[SimpleMetrics]]
* FARFAR#
* Compatibilidad de [[RosettaAntibodyDesign]] con nanocuerpos
* [[mp_domain_assembly]]
* Se implementó un [[gestor de hilos de Rosetta|RosettaThreadManager]] para facilitar el desarrollo de protocolos multihilo y evitar explosiones de hilos cuando se hacen solicitudes anidadas de ejecución de código multihilo.  (Ten en cuenta que esto solo afecta a las compilaciones multihilo de Rosetta, compiladas con la opción `extras=cxx11thread`).

###Nuevas herramientas y funciones de puntuación
* [[pHVariantTaskOperation]] para -pH_mode
* [[franklin2019]], para membranas implícitas (https://www.biorxiv.org/content/10.1101/630715v1)
* [[TautomerizeAnomerMover]]
* [[EnzymaticMover]] (herramientas que producen PTM según la secuencia local): mejor gramática para identificar sobre qué secuencias se debe actuar
 * [[GlycosyltransferaseMover]]
 * Hay una quinasa
* silent files compatibles con [[PDBInfoLabels]]
* [[RingConformerSet]] ahora permite confórmeros de anillos aromáticos
* [[GraftSwitchMover]]
* compatibilidad con [[mmTF]]
* El término de puntuación `mhc_epitope`, implementado con [[MHCEpitopeEnergy]], permite la desinmunización de proteínas compatible con el packer, usando ProPred o predictores de epítopos de bases de datos precalculadas.  Estas últimas se pueden generar para las bases de datos IEDB y NetMHCII con [[mhc-energy-tools]].  La desinmunización local se puede realizar con [[AddMHCEpitopeConstraintMover]].  La integración con nmer/NMerSVMEnergy se implementará en la próxima versión.
* [[NMerSVMEnergy]]
* La salida de PDB ahora tiene secciones de encabezado y opciones para tarjetas de autor y más detalles
 * Hay disponibles líneas SEQRES en la E/S de archivos PDB
* Herramientas para exportar el [[InteractionGraph]] a código externo, de modo que el paso de empaquetamiento se pueda hacer con COMPUTADORES CUÁNTICOS, DIOS MÍO, ES EL FUTURO

* Un mover de optimización de disulfuros
* Poses serializados como una serialización más formal que el silent file
* Marco de [[RotamerSetsObjects]]
** [[PruneBuriedUnsatsOperation]]

* Nuevos [[ResidueSelectors]]
 * [[ResiduePropertySelector]]

* Nuevos [[SimpleMetrics]]
 * [[ElectrostaticComplementarityMetric | simple_metric_ElectrostaticComplementarityMetric_type ]]
 * [[ResidueSummaryMetric]]
 * [[InteractionEnergyMetric]]
 * [[PerResidueClashMetric]]
 * [[SequenceRecoveryMetric]]
 * [[PerResidueGlycanLayerMetric| simple_metric_PerResidueGlycanLayerMetric_type]]
 * [[ProtocolSettingsMetric]]

###Mejoras y corrección de errores en clases:
* [[JD3]] y su ecosistema
* [[RingPlaneFlipMover]]
* [[NubInitioMover]]
* [[CoupledMoves]]: compatibilidad con [[RosettaScripts]] y nuevas funciones
* [[AtomicContactCount]]
* [[AntibodyDesignMover]]
* [[BuriedUnsatisfiedHBonds]] o [[BuriedUnsatHbondFilter]]
* [[approximate_buried_unsat_penalty]] o [[approximate_buried_unsat_energy]]
* [[SetSecStructEnergies]]
* [[NearNativeLoopClosure]]
* [[StructureProfile]]
* [[ForceDisulfidesMover]]
* [[RandomMutationMover]]
* [[CovalentLabelingEnergy]]
* [[MotifGraft]]
* Corrección de un error al cargar residuos desde la base de datos PDB Chemical Components
* [[SimpleMetrics]] funcionan en PyRosetta
* [[ForceDisulfideMover]]
* [[ShapeGrid]]
* El término de energía [[RamaPrePro]] recibió algunos ajustes de eficiencia.
* [[InterfaceAnalyzerMover]]
* [[HBnet]]
* [[ReadResfileFromDB]]
* [[ProteinProteinInterfaceUpweighter]]
* [[MathVectors]]
* [[LinearMemoryInteractionGraph]]
* [[GlycanTreeModeler]]
* [[PrimarySequenceNeighborhoodSelector]]
* [[SSPredictionFilter]]
* El [[SequenceMetric]] ahora tiene opciones para permitir una salida de una letra (_p. ej._ `S`), de tres letras (_p. ej._ `DSE`), de nombre base (_p. ej._ `DSER`) o de nombre completo (_p. ej._ `DSER:phosphorylation`).
* [[BoltzmannRotamerMover]]
* [[CoupledMovesProtocol]]
* [[SnugDock]]
* [[DDGMover]]
* [[DDGFilter]]
* [[RandomTorsionMover]]
* [[xyzStripeHash]]
* [[SugarBBEnergy]]
* Filtro de puentes de hidrógeno y puentes salinos de la interfaz
* [[structure_store]]
* [[SwitchChainOrderMover]]
* [[BackboneMover]] (tan venerable)
* [[DisulfideInsertionMover]]
* [[ShapeComplementarityFilter]]
* [[ConservativeDesignOperation]]
* [[SymmetricEnergies]]
* [[SymmetricConformation]]
* [[MinMover]]
* [[MoveMapFactory]]
* [[DensityFitMetric]]
* [[DensityFitSelector]]
* [[PerResidueEnergyMetric]]
* [[TotalEnergyMetric]]
* [[RMSDMetric]]
* [[HolesFilter]]
* [[ReplaceRegionMover]]
* [[InsertPoseIntoPoseMover]]
* [[AtomLevelHBondGraph]]
* [[AtomicDepth]]
* [[ResidueIndexDescription]]
* [[FastRelax|FastRelaxMover]] y [[FastDesign|FastDesignMovers]] ahora tienen un `RelaxScriptManager`, para asegurar que los scripts de relax se lean del disco una sola vez, bajo demanda y de forma segura para hilos.  (El `RelaxScriptManager` no tiene interfaz de cara al usuario).

###Miscelánea:
* Campaña de revitalización de las pruebas científicas
* Mejoras generales para centralizar el uso del disco y eliminar accesos repetidos, especialmente en lo relativo a la puntuación.  Esto hace que Rosetta sea más utilizable en supercomputadores con un número de procesadores ultra alto, sin saturar el disco cuando todos los hilos intentan obtener a la vez los datos de la función de puntuación.
* Jack Maguire hizo un perfilado serio para buscar ralentizaciones en los bucles internos y logró varias mejoras de rendimiento de unos pocos puntos porcentuales.
* Mejoras de seguridad para hilos (threadsafety), especialmente en el sistema de opciones
* Avance hacia Python3 en todas partes
* El tipo de átomo Npro estaba incorrectamente listado como donador de puentes de hidrógeno
* Se ha añadido cadmio a la base de datos de Rosetta.
* Se añadió compatibilidad para enlazar Rosetta con Tensorflow (opción `extras=tensorflow` durante la compilación) para facilitar el desarrollo de protocolos basados en aprendizaje automático.
* Refactorización considerable del código de interpolación policúbica para corregir errores y permitir mayor generalidad.

###Correcciones generales de errores:
* Sabemos que "Cannot normalize xyzVector of length() zero" es críptico; a nosotros también nos molesta.  Se ha trabajado para capturar y volver a lanzar este error con datos adicionales, de modo que podamos rastrear mejor su causa.  (La causa mejor entendida son 3 átomos colineales, cuyo diedro incalculable provoca este error).
* El sistema de manejo y notificación de errores de Rosetta ha madurado y ahora imprime trazas de depuración con menos agresividad en los fallos mejor entendidos, y las vuelca a disco cuando corresponde en lugar de a la terminal.
* Los potenciales de cadenas laterales de Dunbrack ahora interpolan correctamente las ubicaciones de los pozos como ángulos (eliminando problemas en el punto de ruptura -180/180).  Sigue siendo interpolación polilineal, pero en el futuro se podría cambiar fácilmente a splines de Catmull-Rom.
* El sistema de opciones de Rosetta se ha refactorizado para mejorar la seguridad para hilos.
* Correcciones de errores para aminoácidos N-metilados.  El soporte que se había retirado temporalmente por esta modificación ya se ha restablecido.

## Rosetta 3.10

### Nuevas aplicaciones
* [[GALigandDock]]

### Mejoras de la función de puntuación
* [[gen_bonded|Updates-beta-genpot]] - los resultados más recientes de la iniciativa de desarrollo de la función de energía de Seattle
* Nuevos [[términos de puntuación de guía para el diseño|design-guidance-terms]]:
     * [[hbnet|HBNetEnergy]], para promover redes de puentes de hidrógeno durante el diseño
     * [[buried_unsatisfied_penalty|BuriedUnsatPenalty]], para promover que los donadores y aceptores de puentes de hidrógeno enterrados queden totalmente satisfechos durante el diseño

### Nuevas funciones
* Los [[SimpleMetrics]] empiezan a estar disponibles para reemplazar el uso de Movers y Filtros sin acción que se usaban para calcular valores
* Enormes mejoras de estabilidad en los lectores de PDB y mmCIF
* Directorio de la base de datos de [[RelaxScripts]].  El RelaxScript de RosettaCON2018 se está considerando como el próximo script por defecto: mejora la calidad del diseño y además se ejecuta más rápido
* Conjuntos de proteínas en el docking de moléculas pequeñas
* Actualizaciones de [[Splice|SpliceMover]]
* [[InterfaceAnalyzerMover]] compatible con ligandos y en general más estable
* [[DensityFitResidueSelector|rs_DensityFitResidueSelector_type]]
* Filtro [[InterfaceHydrophobicResidueContacts]]
* [[RosettaDock|docking-protocol]] incorpora selección adaptativa de confórmeros y puntuación de motivos de docking
* Refactorización de [[SEWING]] y nuevas agujas (bueno, bueno, nuevas subaplicaciones).  No creo que ya sea multihilo.
* [[FindGlycanSeqonsMover]]
* La aplicación [[simple_cycpep_predict]] ahora admite nuevas químicas de ciclación, incluidos enlaces isopeptídicos de cadena lateral (lariats).
* Trucos para volcar trayectorias de minimización
* compatibilidad con archivos comunes de opciones/configuración [Configuraciones personalizadas](https://www.rosettacommons.org/docs/latest/rosetta_basics/running-rosetta-with-options#common-options-and-default-user-configuration)

### Químicas no proteicas
#### Glicanos
* Método para escribir la secuencia IUPAC de un glicano individual
* [[RingPlaneFlipMover]]
* Glicosilación de lípidos y de nucleótidos difosfato
* [[ShearMover]] ahora funciona con glicanos
* [[Stepwise]] funciona mejor con azúcares

#### ARN
* Correcciones de errores en las hélices de ARN generadas paramétricamente
* Cálculos de ddG de ARN-proteína.
* [[DRRAFTER]]

#### Oligoureas
* Compatibilidad con el diseño de oligoureas
* Compatibilidad con la predicción de estructura de oligoureas con la aplicación [[simple_cycpep_predict]]

#### Metales
* [[CrosslinkerMover]] ahora puede colocar metales octaédricos, tetraédricos, piramidales cuadrados, planos cuadrados, planos trigonales y piramidales trigonales.
* Mejoras en [[auto_setup_metals|Metals]]; en particular, funciona en modo centroid y se puede invocar desde el nuevo [[SetupMetalsMover]] dentro de protocolos de RosettaScripts.

### Actualizaciones
* Los módulos core y database de Rosetta ahora son seguros para hilos, lo que permite desarrollar protocolos multihilo.  Rosetta no es multihilo en general (algunos protocolos especializados sí lo son) y no lo será en breve.
* UBQ_Gp_LYX-Cterm compatible con un ResidueSelector del cual muestrear para elegir posiciones LYX
* RosettaAntibody puede aceptar CDR definidos por el usuario mediante una entrada JSON, útil cuando falla la detección automática por regex
* [[CoupledMoves]] y [[ClashBasedRepackShell]]
* [[UnsatSel]]
* `-output_ligands_as_separate_chains` hace que Rosetta reasigne el ID de cadena de un ligando cuando lo comparte con una cadena peptídica.
* [[SnugDock]] ya no requiere un patrón de cadenas L_HA
* El uso de encabezados PDB en Enzdes ahora es más amigable para el usuario
* La minimización en modo cartesiano y [[cart_bonded]] son compatibles con el control por átomo (usado principalmente para la compatibilidad con la nomenclatura IUPAC en los Movemaps de glicanos). Correcciones para geometría cíclica, D-aminoácidos y comportamiento de la glicina simétrica.
* [[BuriedUnsatisfiedHbondFilter]] incorpora ddG_style_dont_recalc_surface
* La conexión con [[PyMOLMover]] es compatible con python3
* [[WriteSSEMover]]
* [[SimpleThreadingMover]] funciona con simetría
* Refactorización importante del código paramétrico subyacente a los movers [[MakeBundle|MakeBundleMover]], [[BundleGridSampler|BundleGridSamplerMover]] y [[PerturbBundle|PerturbBundleMover]].

### Corrección de errores
* [[BindingSiteConstraint]]
* Docking en red 3D y [[MakeLatticeMover]]
* Análisis de XML de BackrubDD
* [[BuriedUnsatFilter]] o quizás [[BuriedUnsatisfiedHbondFilter]]
* [[EllipsoidalRandomizationMover]] y [[SnugDock]]
* Compatibilidad de [[GlycanRelax]] con [[Symmetry]]
* [[CoupledMoves]] tuvo varios segfaults de casos límite eliminados
* [[PeptideStubMover]]
* [[SequenceMetric]]
* aplicación [[simple_cycpep_predict]]
* [[RotamerSetFactory]]
* [[StrandCurvatureByLevels]]
* [[EnzScoreFilter]]

## Rosetta 3.9

### Cambios en la función de puntuación
* Cambiamos nuestra función de puntuación por defecto a [[REF2015|Overview-of-Seattle-Group-energy-function-optimization-project]]. (http://pubs.acs.org/doi/abs/10.1021/acs.jctc.7b00125)

### Cambios en la API
* PyRosetta: xyzMatrix ahora tiene propiedades .xy enlazadas como 'data' en lugar de funciones set/get. Por lo tanto, si tu código accedía directamente a estos métodos, deberás refactorizarlo como m.xx(m.xy()) --> m.xx = m.xy

### Facilidad de uso
* Se mejoró el formato de salida de los errores: en el rarísimo caso de que ocurra un error con Rosetta, ahora es más probable que obtengas un mensaje de error útil e interpretable.
* Se añadieron **Configuraciones comunes de opciones** para facilitar la ejecución frecuente de Rosetta y en una variedad de casos de uso. [[running-rosetta-with-options#common-options-and-default-user-configuration]]
* Se redujo el uso de memoria en el paso del proceso de compilación que más memoria consume.  Ahora puedes compilar Rosetta en máquinas algo más modestas.  De todos modos, probablemente no deberías intentar ejecutar Rosetta en esas máquinas.
* El manejo de excepciones se reorganizó para que los usuarios de Python vean el mensaje de texto de las excepciones lanzadas desde C++
* Ajustes largamente deseados y largamente retrasados en el código "publicado" que ven los usuarios finales. El sistema de compilación se ajusta para:
 * usar por defecto el modo release, más rápido 
 * buscar de forma agresiva compiladores y rutas (ya no hace falta usar .default.)
 * Ignorar las advertencias de compiladores con los que no hemos hecho pruebas
* Se hizo la infraestructura de Python que viene con el código C++ (no PyRosetta, sino el Python de Rosetta) más tolerante a Python 2 y 3

##Funciones nuevas o actualizadas

###Aplicaciones
* [[JD3]] ha ganado:
  * Un [[ResourceManager]] revivido
  * Compatibilidad con RosettaScripts (recibirá su publicación pública en la próxima versión)
  * [[MultistageRosettaScripts]]  
* Se publicó la aplicación [[RosettaAntibodyDesign]]: preparando el artículo publicado.  El preprint está disponible aquí: [https://www.biorxiv.org/content/early/2018/02/23/183350]

* Correcciones de errores de [[dock_glycans]]
* Protocolos para agua explícita:
  * El [[Hydrate/SPaDES protocol]] incluye: interacciones solvente-proteína en un modelo de solvatación híbrido implícito-explícito.
  * RyanP, ¿cómo era ese nombre tuyo?
* [[interface_energy]] - distinta de [[InterfaceAnalyzer|interface-analyzer]], y también bien documentada
* [[RosettaCM]] / [[HybridizeMover]] - mejoras en el manejo de errores por longitudes de plantilla que no coinciden
* El modelado por homología de anticuerpos funciona con solo una cadena pesada
* [[RosettaES|mover_FragmentExtension_type]]
* [[shobuns]] - átomos polares enterrados sin satisfacer (Buried UNSatisfied) para el modelo de solvatación SHO
* El multihilo ha llegado a [[simple_cycpep_predict]]
* [[Plegamiento y diseño funcionales|FunFolDes]]
* [[HBNet|HBNetMover]]
* [[energy_based_clustering|energy_based_clustering_application]]

###Herramientas de RosettaScripts
* RosettaScripts disponible desde PyRosetta: ideal para cuando de verdad, de verdad, de verdad no quieres pensar en el núcleo en C++ de Rosetta
* [[RosettaScripts#rosettascript-sections_move_map_factories]] creado para permitir que los protocolos creen MoveMaps en puntos mejores (más tardíos) de la trayectoria, cuando los datos relevantes están disponibles.  Se añadió nueva documentación en la página principal de RosettaScripts sobre cómo usar esta gran herramienta.
* [[LayerDesign]] mediante ResidueSelectors ahora es compatible con lógica booleana para un uso más fácil
*  Los ConstraintGenerators ahora se pueden especificar en su propio bloque CONSTRAINT_GENERATORS en un RosettaScript y se pueden pasar a [[AddConstraintsMover]] mediante la opción constraint_generators.  Los Constraint Generators se usan para crear restricciones sobre la marcha, sin necesidad de archivos de restricciones. 
* [[DihedralConstraintGenerator | constraint_generator_DihedralConstraintGenerator_complex_type]] - un generador de restricciones que crea restricciones diedras para residuos especificados mediante un selector de residuos. Usa restricciones CircularHarmonic, porque no existe una función CircularGaussian. Por defecto trabaja con los diedros de la cadena principal de proteínas y carbohidratos (aunque esto se puede cambiar); además, también se pueden definir DIEDROS ARBITRARIOS PERSONALIZADOS.
* El uso de inclusión recursiva de scripts en RosettaScripts ahora es muchísimo más rápido
* [[WriteFiltersToPose]]
* Corrección de un error en [[SwitchChainOrderMover]]
* [[buried_apolar_area_filter]] - filtra según el área de superficie enterrada
* un filtro para calcular el tramo continuo más largo de residuos polares en un Pose o selección
* [[ResidueProbDesignOperation | to_ResidueProbDesignOperation_type]] (usada originalmente para [[RosettaAntibodyDesign]] ) ahora puede recibir un archivo de texto con probabilidades de residuos por posición y está disponible en RosettaScripts
* [[ReturnSidechainMover]] - funciona mejor con cosas como residuos fosforilados y, en general, produce advertencias y errores más útiles
* Metales:
    * [[MetalContactsConstraintGenerator]] añade restricciones de distancia, ángulo y diedro entre contactos (opcionalmente especificados) y un átomo de metal especificado por el usuario, ya sea como un ion individual o como parte de un ligando.
    * [[LigandMetalContactSelector]] identifica y selecciona residuos que forman contactos con residuos seleccionados que contienen metales.
    * [[SetupMetalsMover]]
* Actualizaciones de [[DockingSlideIntoContact]]
* Corrección de un error en [[NeighborhoodResidueSelector]]
* Actualizaciones de [[PerturbBundle]]
* Función de [[RandomResidueSelector]]: seleccionar clústeres aleatorios de residuos cercanos en el espacio 3D
* Función de [[AlignChainMover]]: alinear al centro de masa en lugar de a un segundo Pose.
* Actualizaciones de [[SecondaryStructureCountFilter]]
* Corrección de un error en [[SelectResiduesByLayer]]
* Actualizaciones de [[BuriedSurfaceArea]]
* [[BondedResidueSelector]], que toma un selector de residuos de entrada o una lista de números de residuo y selecciona todos los residuos con enlaces químicos al conjunto de entrada
* [[HBondSelector]] toma un selector de residuos de entrada o una lista de números de residuo. Si se proporciona, selecciona todos los residuos que forman puentes de hidrógeno con los residuos del conjunto de entrada, siempre que esos puentes de hidrógeno cumplan un requisito de energía especificado (por defecto -0.5 REU). Si no se proporciona ningún selector, se seleccionan todos los residuos del Pose que forman puentes de hidrógeno. Por defecto, se ignoran los puentes de hidrógeno entre cadenas principales.
* Corrección de un error en [[ShearMover]].  Sí, este fue uno de los primeros Movers que escribimos.  Imagina nuestra incredulidad al descubrir que ha tenido un error durante la mayor parte de una década.

* __Más comandos de resfile__: Tenemos 3 nuevos comandos de resfile: CHARGED, AROMATIC y PROPERTY.
El tercero es un comando general que recibe cualquier ResidueProperty. Por ahora solo funciona con residuos canónicos, pero quizás se pueda generalizar en el futuro para los no canónicos.

* [[ResfileCommandOperation | to_ResfileCommandOperation_type]] - aplica el equivalente de una línea de resfile (sin los números de residuo) a los residuos especificados en un selector de residuos.
* [[SequenceMotifTaskOperation | to_SequenceMotifTaskOperation_type]] - una TaskOp que toma un patrón similar a una regex y lo convierte en un conjunto de residuos de diseño. 
* [[CreateSequenceMotifMover | mover_CreateSequenceMotifMover_type]] - un mover sencillo para crear un motivo de secuencia en una región de la proteína usando SequenceMotifTaskOperation. Usa pseudoexpresiones regulares para definir el motivo.

* Corrección de un error en [[TrueResidueSelector]]
* Actualización de [[RmsdFromResidueSelectorFilter]]
* [[SecondaryStructureSelector]]
* [[AtomPairConstraint]]
* [[SegmentedAtomPairConstraint]]
* [[ReleaseConstraintFromResidueMover]]
* [[UnsatSelector]] - compatibilidad con simetría
* [[AddHelixSequenceConstraintsMover]]
* [[ReadPoseExtraScoreFilter]]
* Actualizaciones de [[BuriedUnsatHbondsFilter]]



###Miscelánea
* correcciones de errores en la lógica de construcción PDB->Pose derivados de átomos que faltan en los extremos
* se eliminó el término fa_plane no implementado. Un término fa_plane con peso cero era una característica de un gran número de funciones de puntuación, lo cual era un error de bulto.  Esto puede causar problemas al usar conjuntos de pesos de puntuación heredados con Rosetta 3.9: basta con quitar el término fa_plane sin usar de tu archivo de pesos.
* filtro [[AlignmentAAFinderFilter]] -- recorre un alineamiento, prueba todos los aminoácidos posibles en cada posición y genera un archivo con los aminoácidos que pasan.
* filtro [[AlignmentGapInserterFilter]] -- recorre un alineamiento e inserta huecos (gaps) donde las posiciones del alineamiento no son representativas del entorno químico de la secuencia del Pose. Útil para eliminar la epistasis de un MSA.
* Corrección de un error en [[NearNativeLoopCloser]]
* correcciones de errores en la minimización cartesiana, el término cart_bonded y, especialmente, ambos con Poses simétricos
* corrección de un error en la puntuación de disulfuros simétricos
* Corrección de un error en [[PolymerBondedEnergyContainer]]
* [[LoopModeler | LoopModelerMover]] optimiza la compatibilidad con el muestreo basado en fragmentos
* Correcciones de errores en [[GenKIC|GeneralizedKIC]]
* Correcciones de errores en [[remodel]]
* Corrección de un error en [[Backrub]]
* Mejoras en la lectura de silent files, que permiten leer algunos silent files ligeramente corruptos.  (Persiste un error latente que hace que ocasionalmente se escriban en un estado corrupto).
* Correcciones de compilación para GCC 7.1 y 4.9.
* Corrección de un error en ERRASER
* Correcciones de errores en ScoringGrids e InterfaceScoreCalculator (para ligandos)
* Correcciones de errores en el calculador explícito de la energía del estado desplegado
* Término de puntuación de bins ABEGO
* Implementación de un algoritmo de campo medio para predecir la probabilidad de rotámeros o aminoácidos. Se puede usar para [[predecir perfiles de especificidad|GenMeanFieldMover]] de interacciones proteína-proteína o proteína-péptido.
* [[MonteCarloInterface]] permite a los usuarios establecer el ddG de la interfaz proteína-proteína como criterio de energía en MonteCarlo.  Esto atiende en parte la función solicitada con frecuencia de favorecer la energía de unión, no la energía total, en las operaciones de diseño.
* [[término de guía para el diseño voids_penalty|VoidsPenaltyEnergy]] - la naturaleza aborrece el vacío, pero Rosetta tiende a ignorarlo.  VoidsPenalty detecta regiones poco empaquetadas en el núcleo de las proteínas y favorece rotámeros que llenen esos huecos.
* [[término de guía para el diseño netcharge|NetChargeEnergy]] - una superclase de la antigua idea de "supercharge"; este término de puntuación permite fijar como objetivo una carga neta deseada para tu diseño.
* El antiguo [[SEWING]] queda obsoleto pero sigue funcionando hasta que llegue su reemplazo
* Correcciones de errores en [[LoopAnalyzerMover]]


###Químicas no proteicas
* Correcciones importantes en la puntuación de rotámeros para cadenas laterales no canónicas
* Mejoras en el manejo interno e I/O de glicanos. (Para importar PDB usa las opciones `-auto_detect_glycan_connections` y `-alternate_3_letter_codes pdb_sugar`.  Para más información, consulta [[WorkingWithGlycans]]
* El manejo de las conexiones químicas no poliméricas se ha mejorado y simplificado. Esto incluye un mejor manejo de los registros LINK en la entrada PDB, así como la eliminación del tipo de variante de residuo BRANCH_LOWER_TERMINUS.
* Mejoras tanto en el manejo automático como en el especificado por el usuario de iones metálicos
* Hay disponibles algunos lípidos más para el modelado explícito de membranas (esto es distinto de la función de puntuación de membrana implícita)
* Escritura mejor y automática de registros LINK en la salida PDB
* Rosetta es más capaz de deducir automáticamente datos químicos que faltan:
    * Puede estimar parámetros de torsión cuando faltan al puntuar el término cart_bonded (minimización cartesiana)
    * Puede generar automáticamente tipos de residuo centroid (no poliméricos) cuando el tipo con todos los átomos está presente; ideal para protocolos divididos en centroid y todos los átomos en los que el usuario ha creado solo el archivo params con todos los átomos de su ligando.
* Vikram Mulligan ha estado absolutamente en llamas añadiendo químicas no proteicas para péptidos cíclicos.  (Ahora trabaja duro en péptidos ignífugos):
    * ácido trimésico, un entrecruzador de tres vías
    * ciclación mediante disulfuro (en lugar de simplemente incluir disulfuros)
    * Oligoureas
    * aminoácidos N-metilados, para deshacerse de ese molesto donador de puente de hidrógeno de la cadena principal
    * ácido 2-aminoisobutírico (AIB), un alfa-aminoácido no canónico y aquiral que favorece fuertemente las hélices (tanto zurdas como diestras).  AIB es a ALA lo que el bactriano es al dromedario.  (Eso convierte a la glicina en un caballo).
* Glycan Relax - Versión 2 [[GlycanTreeRelax]]

## Rosetta 3.8
###Nuevo XML de RosettaScripts
El XML que respalda a RosettaScripts se ha refactorizado por completo.  Rosetta ahora valida los archivos XML de entrada contra un "XML Schema" y puede determinar mejor, al inicio de una ejecución, si todas las opciones del XML son legales y funcionales.  El lector de XML ahora puede señalar los errores con mucha más precisión y ofrece mensajes de error más útiles.

Ahora también puedes obtener ayuda por línea de comandos para las clases habilitadas para XML con la opción -info; por ejemplo, ```-info PackRotamersMover```, y una plantilla de rosetta script en blanco y con formato ejecutando la aplicación `rosetta_script` sin indicar la opción `-parser:protocol`.  

Una consecuencia de esta refactorización es que los scripts XML anteriores a Rosetta 3.8 normalmente ya no son XML legal; ofrecemos una herramienta para convertir el antiguo pseudo-XML al formato actual en tools/xsd_xrw/rewrite_rosetta_script.py (está en la carpeta tools de nivel superior, no en la carpeta del código principal).  La gran mayoría de las clases tienen documentación completa; cuando encuentres una que no la tenga, ¡quéjate a (correo de comentarios sobre la documentación) para avisarnos!

###JD3
Un nuevo distribuidor de trabajos, JD3, está listo para usarse.  En su mayor parte es invisible para los usuarios finales, pero permitirá elaborar protocolos más complejos en lugar de instrucciones de varios pasos y varias aplicaciones.  Espera aplicaciones interesantes habilitadas con JD3 en futuras versiones.

###compatibilidad con más PDB
Aunque la mayoría de las mejoras estuvieron en Rosetta3.7, seguimos aumentando la fracción de PDB sin modificar que Rosetta puede manejar.  (No te preocupes: siempre hemos podido manejar bien las proteínas canónicas, pero lo hacemos cada vez mejor con cosas extrañas como el fluoróforo de la GFP, ligandos concatenados químicamente, glicanos, ARN, etc.).

###Compilaciones Cxx11
Rosetta activó las funciones de Cxx11 en su C++.  Esto deja obsoleta la compatibilidad con muchos compiladores antiguos. Consulta <https://www.rosettacommons.org/docs/latest/build_documentation/Cxx11Support> para más información.

###Nombres de los ejecutables
Hemos ajustado el sistema de compilación para que los ejecutables compilados tengan nombres un poco más sencillos.  Los nombres de tres partes (rosetta_scripts.default.linuxgccrelease) funcionarán como antes, pero ahora los nombres de dos partes (rosetta_scripts.linuxgccrelease) siempre apuntarán a la compilación por defecto, en lugar de a la compilación más reciente.

###beta_nov15
¡Se está gestando una nueva función de puntuación!  Todavía no tiene su nombre oficial, pero está [publicada](https://www.ncbi.nlm.nih.gov/pubmed/27766851).  Mientras tanto, puedes probarla con -beta_nov15 en la línea de comandos y con `<ScoreFunction name="beta_nov15" weights="beta_nov15">` en RosettaScripts.  Ten en cuenta que la opción de línea de comandos -beta_nov15 es necesaria para cualquier uso de la nueva función de puntuación, ya que ciertos objetos relacionados con la puntuación deben inicializarse de otra manera (lo que significa que, por ahora, no es posible puntuar con talaris2014 _y_ beta_nov15 en la misma sesión de Rosetta).

###Nuevos potenciales de Ramachandran
El código de puntuación de Ramachandran de Rosetta se ha refactorizado en gran medida.  El software ahora admite potenciales de Ramachandran para aminoácidos arbitrarios.  Se cargan de forma diferida, por lo que no contribuyen a la huella de memoria de Rosetta a menos que se necesiten.  El código de Ramachandran refactorizado ahora forma parte del término de puntuación `rama_prepro` de la función de puntuación beta_nov15.  La puntuación de Ramachandran también permite ahora potenciales de Ramachandran distintos para las posiciones que preceden a residuos de prolina y para las que no los preceden.

###Funciones nuevas o actualizadas
####Herramientas de RosettaScripts
* [[ScoreTermValueBasedSelector|ResidueSelectors#other_scoretermvaluebased]]
* [[SecondaryStructureFilter]]
* [[LoopLengthChangeMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[ReturnResidueSubsetSelector|ResidueSelectors]]
* [[ConvertRealToVirtualMover]] convierte residuos en _virtuales_, que no se puntúan ni se escriben.
* [[ConvertVirtualToRealMover]] convierte de vuelta los residuos virtuales en reales.
* [[CloseContactResidueSelector|ResidueSelectors]]] identifica residuos que tienen (cualquier) átomo dentro de un cierto corte de distancia (normalmente, la detección de vecinos depende de CB por velocidad)
* [[UnsatSelector|ResidueSelectors]]
* [[NeighborhoodResidueSelector|ResidueSelectors]] usa por defecto el grafo de vecinos para acelerar enormemente los cálculos
* [[BridgeChainsMover]]
* [[MutateResidue|MutateResidueMover]] incorpora compatibilidad con ResidueSelector
* [[MakePolyXMover]] incorpora compatibilidad con ResidueSelector
* [[ModifyVariantTypeMover]] incorpora compatibilidad con ResidueSelector
* [[SecondaryStructureFilter]] incorpora compatibilidad con ResidueSelector
* [[InterfaceAnalyzerMover]] (corrección de errores)
* [[Backrub]] ya está disponible en RosettaScripts
* [[FilterReportAsPoseExtraScoresMover]]
* [[LoopAnalyzerMover]] (actualizado con compatibilidad con RosettaScripts) y [[LoopAnalyzerFilter]]
* [[DistanceConstraintGenerator]]
* [[HydrogenBondConstraintGenerator]]
* [[SSPredictionFilter]]/PsiPredInterface compatible con más versiones de psipred
* [[HelixPairingFilter]]
* [[Disulfidize|DisulfidizeMover]] actualizado para grupos no canónicos formadores de disulfuros
* [[GeneralizedKIC]] incorpora opciones de muestreo simétrico
* [[GlycanResidueSelector]] selecciona residuos de glicanos
* [[GlycanPositionSelector]] selecciona residuos específicos de glicanos en los árboles
* [[RandomGlycanFoliageSelector]] selecciona al azar el follaje de glicanos para el modelado
* El protocolo de ddG de interfaz con conjuntos Backrub se ha expuesto mediante RosettaScripts.

####Miscelánea
* Mover Transform en el docking de ligandos (correcciones de errores)
* El MPIWorkPartitionJobDistributor de JD2 (la mejor opción de MPI para ejecuciones MPI pequeñas) divide los trabajos de una forma más eficiente para las ejecuciones reiniciadas
* Cambios en el almacenamiento en caché del formato binario de la biblioteca de Dunbrack.  Como consecuencia, no instales Rosetta 3.8 sobre una instalación existente; querrás que esta biblioteca se reconstruya en la primera ejecución.
* Entrada y salida de mmCIF
* Corrección de un error en los archivos de restricciones que afectaba a la numeración de los residuos con numeración PDB de la cadena A
* Impresión de registros HELIX y SHEET en los PDB (-out::file::output_secondary_structure)
* Impresión de registros LINK en los PDB (-out::file::write_pdb_link_records)
* Corrección de un error en los resfiles con docking de ligandos
* Relax: corrección de un error en -constrain_relax_to_native_coords
* Ya funcionan los sanitizadores de código y las herramientas de análisis estático (nos ayudan a escribir código mejor y más a prueba de errores; deberían ser invisibles para el usuario final)
* Backend de SQLite actualizado; versión 3.16.2 en lugar de 3.7.4
* correcciones de errores para varios compiladores sin soporte específico (gcc 5.4; gcc 6.2.0, clang 3.9.0 e ICC 14.0)

####Químicas no proteicas
* La aplicación [[simple_cycpep_predict]] ha recibido diversas correcciones de errores y ahora admite muestreo cuasi simétrico para péptidos con simetrías cN o cN/m.
* [[CycpepSymmetryFilter]] filtra según si un péptido tiene una simetría cíclica deseada (c2, c3, c4, etc.) o cíclica en espejo (c2/m, c4/m, c6/m, etc.).
* Correcciones de errores en [[PeptideCyclizeMover]]
* Glicanos:
 * Actualizaciones de [[GlycanRelax]] y nuevos métodos para manejar la conectividad de glicanos ramificados (GlycanTreeSet); úsalo con PyRosetta: `pose.glycan_tree_set()`

## Rosetta 3.7

### Aplicaciones nuevas y actualizadas
* [[ERRASER|erraser]] actualizado: mejor compatibilidad con residuos que no son ARN canónico
* [[GlycanRelax]] (véase también [[WorkingWithGlycans]]). Artículo de RosettaCarbohydrates [publicado](https://www.ncbi.nlm.nih.gov/pubmed/27900782)
* El protocolo RosettaAntibody se ha simplificado y está más cerca de ser una sola aplicación en lugar de una constelación de scripts.  Nuevo [artículo que describe la funcionalidad](https://www.ncbi.nlm.nih.gov/pubmed/28125104)
    * Compatibilidad con L4/H4 (loop DE)
    * Compatibilidad con anticuerpos camélidos
    * herramienta identify_cdr_clusters
    * herramienta packing_angle

* [[RosettaScripts]] ahora admite la [[inclusión de fragmentos de script en otros scripts|RosettaScripts#options-available-in-the-xml-protocol-file_xml-file-inclusion]]
* [[simple_cycpep_predict]] - diseño de péptidos cíclicos
* [[FlexPepDock|flex-pep-dock]] - compatibilidad con ligandos
* [[ddg-monomer]] - compatibilidad con ligandos
* [[torsional-potential-corrections]], para [Conway P, DiMaio F. Improving hybrid statistical and physical forcefields through local structure enumeration. Protein Sci. 2016 May 30.](http://www.ncbi.nlm.nih.gov/pubmed/27239808)
* [pH_protocol](http://www.ncbi.nlm.nih.gov/pubmed/25501663) (enlace al artículo)

### Nuevas funciones y clases
* Se ha añadido un nuevo sistema de tutoriales introductorios en el directorio demos/tutorial/. También se pueden encontrar en línea en <https://www.rosettacommons.org/demos/latest/>
    * Los tutoriales introductorios cubren tanto conceptos básicos (empaquetamiento, minimización, todos los átomos/centroid) como demostraciones de cómo usar algunos de los protocolos de Rosetta más comunes (ab inito, modelado comparativo, modelado de loops, diseño, docking proteína-proteína y docking proteína-ligando).
    * Las demostraciones adicionales ahora se enumeran [por temas](https://www.rosettacommons.org/demos/latest/demos-by-category), para ayudar a encontrar las relevantes.
* Muchos [[ResidueSelectors]] nuevos
* La lectura de PDB puede manejar registros LINK en la mayoría de los casos
* "Corrector ortográfico" para las opciones: sugerencias de la opción deseada si las opciones del usuario no son válidas
* [[AACompositionEnergy]] acepta composiciones fraccionarias además de composiciones contadas
* Nuevo término de puntuación que penaliza las secuencias peptídicas que forman aspartimida
* Nuevo script para preparar el entorno de [[pyrosetta]] y publicación de [PyRosetta-4](http://www.pyrosetta.org/news/pyrosetta-4released)

### Corrección de errores

* Se reparó `loops::restrict_kic_sampling_to_torsion_string` (para el modelado de loops con [[KIC|next-generation-KIC]])
* Se reparó [[BridgeChainsMover]] para que coincida con la publicación

## Rosetta 3.6

Tras publicar Rosetta 3.5 en 2013, Rosetta pasó a un sistema de versiones semanales.  Rosetta 3.6 es la versión semanal v2016.13-dev58602.  La marcamos como 3.6 para atender las necesidades de los usuarios que requieren versiones numeradas en lugar de semanales.  Este extenso conjunto de notas de la versión recoge los cambios publicados en las versiones semanales desde su inicio.

### Nuevas funciones de puntuación:

Desde Rosetta 3.5, la función de puntuación por defecto se [actualizó](rosetta_basics/scoring/Scorefunction-History) dos generaciones, a Talaris2013 y luego a Talaris2014.  
También hemos actualizado el minimizador por defecto a [LBGFS](https://en.wikipedia.org/wiki/Limited-memory_BFGS), del que se espera un mejor rendimiento en el problema promedio.

### Nuevas aplicaciones:
* [Remodel](application_documentation/design/rosettaremodel)
* [PeptiDerive](application_documentation/analysis/PeptiDerive)
* [Suite de anticuerpos](application_documentation/antibody/antibody-applications) (incluye SnugDock, que antes solo estaba en el Rosetta2 heredado)
* Nuevas herramientas para el modelado comparativo con Rosetta ([RosettaCM](application_documentation/structure_prediction/RosettaCM))
* (Más) herramientas para el refinamiento cristalográfico con Rosetta y PHENIX
Actualizaciones del docking con [DARC](application_documentation/docking/DARC)
* Diseño de interfaces metálicas:
    * Diseño de homodímeros de zinc ([http://www.ncbi.nlm.nih.gov/pubmed/22092237](http://www.ncbi.nlm.nih.gov/pubmed/22092237), [http://www.ncbi.nlm.nih.gov/pubmed/22510088](http://www.ncbi.nlm.nih.gov/pubmed/22510088))
* [FARNA](farna-refactor), una refactorización del código de ARN de Rosetta
    *  [Mg_modeler](application_documentation/rna/mg-modeler), para incluir iones de magnesio 2+ en las estructuras
* Un nuevo [marco](application_documentation/membrane_proteins/RosettaMP-GettingStarted-Overview) y conjunto de aplicaciones para modelar y diseñar proteínas de membrana (http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1004398)
* Docking de bolsillos (busca sitios farmacológicamente accesibles) ([make-exemplar](application_documentation/utilities/make-exemplar), [pocket-relax](application_documentation/utilities/pocket-relax), [pocket-suggest-targets](application_documentation/utilities/pocket-suggest-targets) )
* [SEWING](scripting_documentation/RosettaScripts/composite_protocols/sewing/SEWING) (http://www.ncbi.nlm.nih.gov/pubmed/27151863)
* [Simple_cycpep_predict](structure_prediction/simple_cycpep_predict): predicción de estructura sin fragmentos de péptidos cíclicos N-a-C que contienen mezclas arbitrarias de L- y D-aminoácidos (y glicina).  
* [[Surface-docking]] (docking a superficies minerales)
Rediseño de la especificidad de enzimas (usando coupled_moves) ([http://www.ncbi.nlm.nih.gov/pubmed/26397464](http://www.ncbi.nlm.nih.gov/pubmed/26397464))
* Diseño con oligooxopiperazinas (OOP), sustitutos de puentes de hidrógeno (HBS) y foldámeros de peptoides ([http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0067051](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0067051), [http://pubs.acs.org/doi/abs/10.1021/ja502310r](http://pubs.acs.org/doi/abs/10.1021/ja502310r), [http://pubs.acs.org/doi/abs/10.1021/ja503776z](http://pubs.acs.org/doi/abs/10.1021/ja503776z))


### Nuevas herramientas:
* [[Batch-distances]]
* [Residue_energy_breakdown](application_documentation/analysis/residue-energy-breakdown)
* Poses de referencia: [guarda una "instantánea" de un Pose](scripting_documentation/RosettaScripts/Movers/movers_pages/StorePoseSnapshotMover) en un punto concreto de un protocolo y usa la numeración de residuos de ese Pose para controlar el comportamiento de los módulos en un punto posterior, aunque la numeración de residuos haya cambiado (por inserción de loops, etc.).
* [Optimización de los pesos de la función de energía](application_documentation/utilities/opt-e-parallel-doc) (no se sugiere para el usuario final, pero si te sientes valiente…)
* Se añadió un gran número de Movers, Filtros, TaskOperations, etc. de RosettaScripts.  Entre ellos:
    * [Disulfidize](scripting_documentation/RosettaScripts/Movers/movers_pages/DisulfidizeMover): añade enlaces disulfuro a un Pose, probando todas las permutaciones para encontrar la mejor colocación de disulfuros.
    * Perturbación por bins de torsión (movers [InitializeByBins](scripting_documentation/RosettaScripts/Movers/movers_pages/InitializeByBinsMover), [PerturbByBins](scripting_documentation/RosettaScripts/Movers/movers_pages/PerturbByBinsMover)): perturba una conformación según la probabilidad estadística de encontrar el residuo i en el bin de torsión B y el residuo i+1 en el bin B’.
    * Mover [GeneralizedKIC](scripting_documentation/RosettaScripts/composite_protocols/generalized_kic/GeneralizedKIC): cierre de loops general basado en cinemática para cadenas arbitrarias de átomos que pueden incluir tramos de cadena principal canónica o no canónica, cadenas laterales, ligandos, etc.
    * Herramientas de diseño paramétrico (movers [MakeBundle](scripting_documentation/RosettaScripts/Movers/movers_pages/MakeBundleMover), [PerturbBundle](scripting_documentation/RosettaScripts/Movers/movers_pages/PerturbBundleMover) y [BundleGridSampler](scripting_documentation/RosettaScripts/Movers/movers_pages/BundleGridSamplerMover); filtro [BundleReporter](scripting_documentation/RosettaScripts/Filters/filter_pages/BundleReporterFilter)): muestreo sin fragmentos de estructuras terciarias de coiled-coil.  Totalmente generalizado para hebras o hélices hechas de bloques de construcción canónicos o no canónicos.
    * LayerDesign y LayerSelector: diseño con distintos conjuntos de tipos de residuo según el enterramiento y/o la estructura secundaria.  [[LayerDesignOperation|scripting_documentation/RosettaScripts/TaskOperations/taskoperations_pages/LayerDesignOperation]], [[LayerSelector|ResidueSelectors#residueselectors_conformation-dependent-residue-selectors_layers]]
* Marco de [FeaturesReporter](https://www.rosettacommons.org/docs/latest/scripting_documentation/RosettaScripts/FeaturesReporter/Features-reporter-overview) para el análisis estructural con Rosetta (estaba en 3.5, pero ahora es un sistema más completo)


### Nuevas funciones misceláneas:
* La versión de Boost de Rosetta se actualizó de 1.46 a 1.55
* El modelo interno de punteros inteligentes se modificó para coincidir con C++11, junto con otros cambios de cara a C++11
* Actualizaciones importantes de MR-Rosetta
* Modelado de loops:
    * Extensión del modelado de loops con KIC a cadenas principales no canónicas (beta-aminoácidos, etc.) con GeneralizedKIC (véase arriba).
    * Desarrollo continuo de KIC de nueva generación, incluida la compatibilidad con el modelado basado en fragmentos
* Múltiples refactorizaciones en las capas de química, que permiten:
    * Poses con carbohidratos
    * Mejor soporte para ribonucleoproteínas
    * Soporte para todos los ligandos del diccionario químico del PDB (ten en cuenta que debes [instalar ese diccionario por separado](build_documentation/Build-Documentation#setting-up-rosetta-3_obtaining-additional-files_pdb-chemical-components-dictionary))
    * Soporte para la manipulación de la química en tiempo de ejecución (añadir y quitar átomos)
    * Soporte para bibliotecas de rotámeros con números arbitrarios de dependencias de torsiones de la cadena principal
    * Configuración automática de enlaces con [iones metálicos](rosetta_basics/non_protein_residues/Metals).  
* Mucho mejor soporte para [D-aminoácidos](rosetta_basics/non_protein_residues/D-Amino-Acids).  Las conformaciones en imagen especular ahora puntúan de forma idéntica con las funciones de puntuación talaris2013 y talaris2014.  Los D-residuos usan las bases de datos de rotámeros y de puntuación de sus contrapartes L.
* Soporte para [operaciones de simetría de imagen especular](rosetta_basics/structural_concepts/symmetry#symmetry-definitions_symmetries-with-mirror-operations) en Poses simétricos, con la conversión adecuada entre tipos de residuo de D- y L-aminoácidos.
* Soporte para [términos de puntuación no descomponibles por pares](rosetta_basics/scoring/AACompositionEnergy) durante el empaquetamiento
* Nuevo término de puntuación no descomponible por pares para guiar el diseño que penaliza las desviaciones respecto de una composición de tipos de residuo deseada.  
    * Nuevas "[restricciones de secuencia](scripting_documentation/RosettaScripts/Movers/movers_pages/AddCompositionConstraintMover)" para controlar la composición de tipos de residuo de una subregión de una estructura (por ejemplo, una interfaz proteica) durante el diseño.
* Nuevos radios de vecinos para los aminoácidos canónicos
* Jerarquía de ResidueSelector como sintaxis de selección
* FloppyTail ahora es compatible con simetría
* Mucho mejor soporte para enlaces de residuos no canónicos, como la ciclación N a C, enlaces cadena lateral-cadena principal, etc.
* [Soporte de bases de datos](rosetta_basics/file_types/sql/Database-IO) completo y documentación (SQLITE3, MySQL, etc.)

### Mejoras de rendimiento y de usabilidad, corrección de errores:
* Mejora de velocidad del 10% en la evaluación de etable (puntuación más rápida).  Menor uso de memoria.
* Informe automático de trazas (backtrace) ante un fallo, para depurar mejor
* Embellecimiento: sí, por fin tenemos un único formato de estilo en todo el código, aplicado por un script externo de embellecimiento
* Reparación de la antigua "explosión de ResidueType", un defecto de diseño, que reduce drásticamente el uso de memoria y mejora el tiempo de arranque de Rosetta
* Se rehízo por completo la maquinaria de SASA.  Los radios de SASA por defecto cambiaron al conjunto Reduce, que incluye hidrógenos por defecto.  Antes se usaba un conjunto de radios que nunca se publicó. La configuración del cálculo de SASA se puede cambiar mediante el sistema de opciones.
* Nuevo [wiki de documentación](Home)


## Rosetta 3.5

Publicada el domingo 2 de junio de 2013

* Actualizaciones importantes del soporte de bases de datos relacionales
* Muchos Movers, Filtros, TaskOperations, etc. nuevos
* Cierre cinemático de loops NGK de "nueva generación"
* Actualizaciones de las aplicaciones de docking conjugado químicamente UBQ_E2_thioester y vecinas (Saha A, Kleiger G, Lewis S, Kuhlman B, Deshaies RJ. Essential role for ubiquitin-ubiquitin-conjugating enzyme interaction in ubiquitin discharge from Cdc34 to substrate. Molecular Cell. In press.)
* Etiqueta LOOP_DEFINITIONS: especificación de loops dentro de RosettaScripts
* Etiqueta OUTPUT: opción de volver a puntuar al escribir la salida en RosettaScripts
* Paquete ERRASER para la corrección de estructuras de ARN con o sin densidad electrónica experimental (NOTA: colaboración con el proyecto PHENIX; requiere que PHENIX tenga licencia y esté instalado por separado).
* ResourceManager permite distintos argumentos de línea de comandos y otros recursos gestionados centralmente con distintos trabajos dentro de una misma instancia de Rosetta
* Soporte de OpenCL: observa que muy pocos algoritmos cuentan con soporte de GPU; todavía no hay soporte general de GPU. Se eliminó el soporte anterior de CUDA
* Actualizaciones de la aplicación FloppyTail
* La aplicación pmut_scan se actualizó para dar soporte al modo alter_spec de Rosetta++: busca mutaciones desestabilizadoras en lugar de estabilizadoras (en particular en las interfaces proteína-proteína)
* El Linear Memory Interaction Graph ahora funciona con Poses simétricos
* Diseño de enzimas en interfaces proteína-proteína
* Aplicación Supercharge (Lawrence MS, Phillips KJ, Liu DR. Supercharging proteins can impart unusual resilience. J Am Chem Soc. 2007 Aug 22;129(33):10110-2.)
* Aplicación de diseño de interfaces mediadas por metales 3x1 (Der BS, Machius M, Miley MJ, Mills JL, Szyperski T, Kuhlman B. Metal-mediated affinity and orientation specificity in a computationally designed protein homodimer. J Am Chem Soc. 2012 Jan 11;134(1):375-85.)
* Nuevas demostraciones: ERRASER, favor_native_residue, capturas de protocolos
* Puntuación
    * -use_bicubic_interpolation suaviza los problemas de los conocimientos estadísticos basados en bins
    * términos basados en phi-psi (incluidos Ramachandran, p_aa_pp y Dunbrack (solo 2002)
    * correcciones de errores en los radios centroid
    * Nuevos potenciales de puntuación de ARN, para usar con ERRASER y PHENIX
    * -analytic_etable_evaluation (afecta a fa_rep, fa_atr, fa_sol, fa_intra_rep) ofrece una reducción importante de memoria y elimina una discontinuidad de la derivada, a costa de algo de velocidad
    * puntuaciones sasapack y avge de Rosetta++
    * Se añadió la biblioteca Dunbrack 2010 (Dun10). La biblioteca Dunbrack 2008 (Dun08) quedó obsoleta y se eliminó. Ten en cuenta que, por ahora, Dun10 solo está disponible para usuarios académicos como parte de la descarga de Rosetta; los usuarios comerciales deben licenciar Dun10 por separado (LINKY). No dudes en contactarnos a través de los foros para pedir ayuda con la instalación de la biblioteca Dun10.
    * minimizador lbfgs: más eficiente para la minimización con muchos grados de libertad, especialmente en Relax
    * minimizador cartesiano: permite minimizar coordenadas 3D en lugar de torsiones internas, incluida la minimización de longitudes y ángulos de enlace
    * -bbdep_omega: término de puntuación de la torsión omega dependiente de la cadena principal
* Herramientas
    * Scripts de Python para procesar la salida de Rosetta (convertir scorefiles en gráficos de puntuación frente a RMSD, etc.)
    * paquete pdb2vall: genera una base de datos plantilla VALL para el selector de fragmentos a partir de un PDB+cadena especificados
    * batch_molfile_to_params.py: se usa para crear grandes cantidades de archivos de parámetros de ligandos (para cribado virtual, etc.); script para cargar silent files directamente en PyMOL.

## Rosetta 3.4

Publicada el domingo 25 de marzo de 2012

* Aplicación de escaneo de mutaciones puntuales: el propósito de este protocolo es aumentar la estabilidad de una proteína de interés con solo mutantes puntuales simples o dobles.
* Utilidades para aminoácidos no canónicos: esta función incluye 2 aplicaciones:
    1. MakeRotLib: esta aplicación crea una biblioteca de rotámeros de aminoácidos no canónicos
    2. UnfoldedStateEnergyCalculator: esta aplicación calcula las energías explícitas del estado desplegado.
* Ensamblaje de ARN con restricciones experimentales por pares: este código está pensado para tomar una secuencia de ARN y una estructura secundaria y luego dar modelos tridimensionales de novo de las hélices y los motivos entre hélices, y construir después el modelo completo a partir de estas partes.
* Modelado de estructuras 3D de ARN: se añadieron las aplicaciones rna_cluster, rna_minimize y rna_helix
* Modelado de loops de ARN con ensamblaje stepwise: este método construye loops de ARN de hebra sencilla usando un método de muestreo enumerativo determinista llamado Stepwise Assembly.
* Remodelado de modelos cristalográficos de ARN con restricción de densidad electrónica: este código se usa para mejorar un modelo cristalográfico de ARN dado y reducir el número de posibles errores del modelo (que se pueden evaluar con Molprobity), bajo la restricción del mapa de densidad electrónica experimental.
* Docking conjugado químicamente: estas extensiones del protocolo UBQ_E2_thioester permiten modelar proteínas conjugadas químicamente (como la ubiquitina unida a una diana) mediante enlaces isopeptídicos, tioéster y disulfuro.
* Aplicación RosettaVIP de identificación y empaquetamiento de vacíos: este código está pensado para tomar un archivo pdb con las coordenadas de un modelo estructural de una proteína con mal empaquetamiento hidrofóbico y devolver una lista de mutaciones que se predice que llenarán cavidades del núcleo de la proteína.
* Relax de pdb con restricciones de todos los átomos: estos scripts relajan un pdb (minimizan la puntuación de Rosetta) manteniendo los átomos lo más cerca posible de sus posiciones originales en el cristal. Está diseñado para usarse en la preparación de una estructura para un diseño posterior en Rosetta.
* Diseño de homodímeros de hebra beta: este código se escribió para una aplicación relativamente singular: encontrar proteínas con hebras beta expuestas en la superficie y luego intentar crear y diseñar un homodímero que se forme mediante esa hebra beta.
* DougsDockDesignMinimizeInterface: este protocolo se usó en el manuscrito adjunto para rediseñar la interfaz proteína/péptido de la calpaína y un fragmento de su péptido inhibidor, la calpastatina.

## Rosetta 3.3

Publicada el miércoles 31 de agosto de 2011

* Incluye documentación en línea completa para usuarios y para desarrolladores
* Un conjunto de software orientado a objetos basado en bibliotecas
* Aplicaciones fáciles de usar
* Flexible para incorporar tus propios protocolos
* Nuevas aplicaciones: Rosetta Antibody, Interface Analyzer, DDG Monomer, Multistate Design, Sequence Recovery, Fragment Picker, Interface Design, RosettaRNA, aplicación Pepspec.
* Incluye el revolucionario nuevo videojuego Foldit en versión independiente

## Rosetta 3.2.1

Publicada el viernes 11 de marzo de 2011

* Nueva función de Rosetta: RosettaDNA

## Rosetta 3.2

Publicada el viernes 11 de marzo de 2011

* Incluye documentación en línea completa para usuarios y para desarrolladores
* Un conjunto de software orientado a objetos basado en bibliotecas
* Aplicaciones fáciles de usar
* Flexible para incorporar tus propios protocolos
Nuevas aplicaciones: Modelado comparativo, Docking de péptidos flexibles, Docking de simetría, RosettaMatch, Reemplazo molecular, Boinc Minirosetta, aplicación Cluster.
