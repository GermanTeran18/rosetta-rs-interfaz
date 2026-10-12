#Quiero muestrear X

Normalmente, los usuarios llegan a Rosetta con una idea del [[problema biológico que quieren resolver|Solving-a-Biological-Problem]]. A veces, los usuarios llegan con una estructura de entrada y la idea de que quieren realizar un tipo concreto de muestreo, ya sea ejecutando una aplicación o usando un mover de RosettaScripts.
Aquí hemos clasificado los movers de Rosetta compatibles con RosettaScripts según el tipo de perturbación estructural que realizan, pero la página de [[problemas biológicos|Solving-a-Biological-Problem]] te servirá mejor para el uso de aplicaciones.
Si ninguna de las dos páginas te ayuda, ¿quizá no has determinado [[cuál es el problema|Determining-what-a-problem-is]]?

[[_TOC_]]

<!--
AddChain, AddChainBreak, AddConstraintsToCurrentConformationMover
AddEncounterConstraintMover, AddFoldUnit, AddMPLigandMover, AddOrRemoveMatchCsts
AddSidechainConstraintsToHotspots, AlignChain, AlignEnds, ,  AtomCoordinateCstMover, AtomTree, Auction, , , , BestHotspotCst, BfactorFitting, BluePrintBDR, BridgeChains, , CAcstGenerator, CDRDihedralConstraintMover, ChangeAndResetFoldTreeMover, CircularPermutation, ClearConstraintsMover, CloseFold, CoMTrackerCM, CompoundTranslate, ConformerSwitchMover, ConnectJumps
ConstraintFileCstGenerator, ConstraintPreparer, ConstraintSetMover, ContactMap, ContingentAccept, CoordinateCst, CreateAngleConstraint, CreateDistanceConstraint, CreateTorsionConstraint, CutOutDomain, DeclareBond, DeleteChainsMover, DeleteRegionMover, DensityMorphing, DomainAssembly, Dssp, DumpPdb, DumpStatsSS, Environment, , ExtendedPoseMover, ExtractAsymmetricPose, ExtractAsymmetricUnit, ExtractSubposeMover
FitBfactors, , FlipMover, FoldTreeFromLoops, FragmentCM, FragmentJumpCM, FragmentLoopInserter, FusePosesNtoCMover, GenericMonteCarlo, 
, GridInitMover, GrowLigand
HotspotDisjointedFoldTree, HotspotHasher
 Hybridize, InitializeByBins, InsertZincCoordinationRemarkLines, InsertionSiteTestMover, InterfaceRecapitulation, , InterlockAroma, InverseRotamersCstGenerator, InvrotTreeCstGenerator, IterativeLoophashLoopInserter, JumpRotamerSidechain, KeepRegionMover, LoadDensityMap, , MSDMover,  MakeStarTopology, MapHotspot, MatchResiduesMover, MatcherMover, 
, MetropolisHastings, ModifyVariantType, ModulatedMover, MonteCarloRecover, MonteCarloReset, MonteCarloTest, MotifDnaPacker, MotifGraft, MultipleOutputWrapper, MultiplePoseMover, , NtoCCstGenerator, , OptimizeThreading, PSSM2Bfactor, , ParatopeEpitopeConstraintMover, ParatopeSiteConstraintMover, PatchdockTransform, PeptideStubMover, PeriodicBoxMover, PerturbByBins, PlaceOnLoop, PlaceSimultaneously, PlaceStub, PlaceSurfaceProbe, PlacementMinimization, , ProteinInterfaceMS, , RBIn, RBOut, RampingMover, RandomConformers, RandomMover, RemoveCsts, 
RenderGridsToKinemage, RepeatPropagation, ReplaceRegionMover, ReportEffectivePKA, ReportFSC, ReportToDB, ResetBaseline, ResidueTypeConstraintMover, ResidueVicinityCstCreator, RestrictRegion, RigidChunkCM, RingConformationMover, RollMover, RotamerRecoveryMover,  Rotate, Rotates, ScaleMapIntensities, SchemePlaceMotifs, ScoreMover, ScriptCM, SeedFoldTree, SeedSetupMover, SegmentHybridizer, SeparateDnaFromNonDna, , SetCrystWeight, SetRefinementOptions, SetSecStructEnergies, SetTemperatureFactor, SetupCoiledCoilFoldTreeMover, SetupForDensityScoring, SetupHotspotConstraints, 
SetupHotspotConstraintsLoops, SetupNCS, SetupPoissonBoltzmannPotential, , , SheetCstGenerator, ShoveResidueMover,  SilentTrajectoryRecorder, SimulatedTempering, SingleFragmentMover, SlideTogether, SpinMover, Splice, StapleMover, StartFresh, StartFrom, StoreCombinedStoredTasksMover, StoreCompoundTaskMover, StoreTaskMover, StructPerturberCM, Subroutine, Superimpose, SwapSegment, SwitchChainOrder, SwitchResidueTypeSetMover,, 
SymDofMover, , TagPoseWithRefinementStats, TaskAwareCsts, TempWeightedMetropolisHastings, TopologyBrokerMover, Transform, Translate, TrialCounterObserver, TryRotamers, Tumble, , ,, UpdateSolvent, VLB, VirtualRoot, VisualizeEmbeddingMover, ddG, load_unbound_rot, profile,
-->

Determinación de estructuras mediante sustitución de fragmentos
-------------
- AbscriptLoopCloserCM  
    gestiona el cierre de loops en circunstancias de relax ab initio
- AbscriptMover

<!--
Generación de estructuras
-------------
-	[[BackboneGridSampler|BackboneGridSamplerMover]]
-	BuildSheet
-	[[BundleGridSampler|BundleGridSamplerMover]]
-	[[PerturbBundle|PerturbBundleMover]]
-	PerturbBundleHelix
-	[[MakeBundle|MakeBundleMover]]
-	MakeBundleHelix
-	[[MakePolyX|MakePolyXMover]]
-	BackboneSampler
-	FitSimpleHelix
-	InsertPoseIntoPoseMover  
combinación de Poses
-	[[build_Ala_pose|BuildAlaPoseMover]]
-	[[SetupForSymmetry|SetupForSymmetryMover]]  
Necesario antes de hacer cualquier otra cosa de forma simétrica
-	[[AddHydrogens|AddHydrogensMover]]  
añade y optimiza los hidrógenos que faltan  
-	AddMembraneMover  
añade una membrana a una estructura cuando hace falta
-	SymmetricAddMembraneMover  
-	GrowPeptides
-	A partir de densidad electrónica:
	-	IdealizeHelices
	-	RecomputeDensityMap
	-	CartesianSampler
-->
Generación de estructuras
-------------
-   [[BackboneGridSampler|BackboneGridSamplerMover]]
-   BuildSheet
-   [[BundleGridSampler|BundleGridSamplerMover]]
-   [[PerturbBundle|PerturbBundleMover]]
-   PerturbBundleHelix
-   [[MakeBundle|MakeBundleMover]]
-   MakeBundleHelix
-   [[MakePolyX|MakePolyXMover]]
-   BackboneSampler
-   FitSimpleHelix
-   InsertPoseIntoPoseMover
combinación de Poses
-   [[build_Ala_pose|BuildAlaPoseMover]]
-   [[SetupForSymmetry|SetupForSymmetryMover]]
Necesario antes de hacer cualquier otra cosa de forma simétrica
-   [[AddHydrogens|AddHydrogensMover]]
añade y optimiza los hidrógenos que faltan
-   SymmetricAddMembraneMover
-   GrowPeptides
-   A partir de densidad electrónica:
    -   IdealizeHelices
    -   RecomputeDensityMap
    -   CartesianSampler

Inserción y eliminación de residuos
------------------------------
-   [[AddChain|AddChainMover]]
-   [[AnchoredGraftMover]]
-   [[CCDEndsGraftMover]]
-   [[CutOutDomain|CutOutDomainMover]]
-   [[DeleteRegionMover]]
-   [[InsertPoseIntoPoseMover]]
-   [[KeepRegionMover]]
-   [[MotifGraft|MotifGraftMover]]
-   [[ReplaceRegionMover]]
-   [[Splice|SpliceMover]]
-   [[SwitchChainOrder|SwitchChainOrderMover]]


Optimización de estructuras
-------------
- [[IdealizeMover]]  
    Sustituye cada residuo por una versión con las longitudes y los ángulos de enlace de la base de datos.
    Añade restricciones para mantener los puentes de hidrógeno originales.
    Luego, minimiza cada diedro de cadena lateral y de cadena principal (excepto phi de la prolina) usando dfpmin.
- [[FinalMinimizer|FinalMinimizerMover]]  
- SaneMinMover  
- [[TaskAwareMinMover]]  
- Symmetrizer  
    Funcionalmente es un mover de optimización; toma un Pose con desviaciones de la simetría suficientemente pequeñas y las resuelve.
- [[TaskAwareSymMinMover]]  
    [[SymMinMover]]  
    minimiza con simetría
- LocalRelax  
    [[FastRelax|FastRelaxMover]]  
    Reempaqueta repetidamente las cadenas laterales y minimiza las cadenas laterales y la cadena principal mientras sube y baja el peso repulsivo.
    Respeta los resfiles, los movemaps y las operaciones de tarea.
- [[RepackMinimize|RepackMinimizeMover]]
    Como un solo ciclo de relax, con un peso repulsivo constante.
- [[MinPackMover]]  
- [[EnzRepackMinimize|EnzRepackMinimizeMover]]  
- [[MinMover]]  
- [[MinimizationRefiner|MinimizationRefinerMover]]
- NormalModeMinimizer

Generación de conjuntos
-------------
- [[FastRelax|FastRelaxMover]]
- [[Backrub|BackrubMover]]
- [[ParallelTempering|Tempering-MetropolisHastings#ParallelTempering]]
- CanonicalSampling
- BBGaussian
- [[GenericSimulatedAnnealer|GenericSimulatedAnnealerMover]]
- [[GeneralizedKIC]] 

Grados de libertad de la cadena principal
-------------
- [[Backrub|BackrubMover]]  
    [[BackrubDD|BackrubDDMover]]  
    BackrubSidechain  
    ShortBackrubMover  
    Una forma particular de movimiento de la cadena principal pensada para coordinarse con el mantenimiento de posiciones concretas de cadenas laterales.
- [[Small|SmallMover]]
    Hace pequeñas perturbaciones en un grado de libertad de la cadena principal
- [[Shear|ShearMover]]
    Hace pequeñas perturbaciones en un diedro de un residuo y perturbaciones contravariantes en el otro diedro, para evitar un "efecto de brazo de palanca"
- [[SetTorsion|SetTorsionMover]]  
    Asigna a una torsión un valor o la perturba en un valor (con la opción perturb)
- MinimizeBackbone  
    Solo minimiza la cadena principal
- RandomOmegaFlipMover
    Invierte un ángulo omega aleatorio; es más útil para peptoides
- BackboneTorsionPerturbation
- BackboneTorsionSampler
- BBGaussian

Grados de libertad de las cadenas laterales
-------------
- SetChiMover
- [[SymRotamerTrialsMover|SymPackRotamersMover]]
- [[PackRotamersMover]]
- [[RotamerTrialsMinMover]]
- [[RotamerTrialsMover]]
- [[RotamerTrialsRefiner|RotamerTrialsRefinerMover]]
- [[Sidechain|SidechainMover]]
- [[SidechainMC|SidechainMCMover]]
- RepackTrial
- [[RepackingRefiner|RepackingRefinerMover]]
- BoltzmannRotamerMover
- [[PackRotamersMoverPartGreedyMover]]
- [[Prepack|PrepackMover]]
- [[SymPackRotamersMover]] 
- PerturbRotamerSidechain  
- [[DnaInterfacePacker|DnaInterfacePackerMover]]
- PerturbChiSidechain

Cualquier grado de libertad conformacional
-------------
- RandomTorsionMover  
    Perturba una torsión aleatoria seleccionada de un movemap

Muestreo conformacional de loops
-------------
- AnchoredGraftMover  
    un mover compuesto que hace mucho modelado de loops seguido de un reempaquetado para injertar residuos
- [[KicMover]]
- LegacyKicSampler
- SmallMinCCDTrial 
- ShearMinCCDTrial
- [[LoopBuilder|LoopBuilderMover]]
- LoopCM
- [[LoopCreationMover]]
- [[LoopFinder|LoopFinderMover]]
- LoopHash  
    LoopHashDiversifier  
    LoopHashLoopClosureMover  
    Los algoritmos LoopHash constituyen una forma muy rápida de extraer de bibliotecas de fragmentos conformaciones de loops que podrían lograr un cierre dado
- [[LoopLengthChange|LoopLengthChangeMover]]
- [[LoopModeler|LoopModelerMover]]
- [[LoopMoverFromCommandLine|LoopMoverFromCommandLineMover]]
- LoopMover_Perturb_CCD
- LoopMover_Perturb_KIC
- LoopMover_Perturb_QuickCCD
- LoopMover_Perturb_QuickCCD_Moves
- LoopMover_Refine_Backrub
- LoopMover_Refine_CCD
- LoopMover_Refine_KIC
- LoopMover_SlidingWindow
- [[LoopProtocol|LoopProtocolMover]]
- LoopRefineInnerCycleContainer
- LoopRelaxMover
- [[LoopRemodel|LoopRemodelMover]]
- [[LoophashLoopInserter|LoopCreationMover]]
- LoopmodelWrapper
- CCDEndsGraftMover
- CCDLoopCloser
- CCDLoopClosureMover
- DefineMovableLoops
- [[GeneralizedKIC]]  
    Un sistema enorme e intrincado que opera en gran medida por sí solo para realizar cierre cinemático de loops sobre una secuencia arbitraria de átomos.

Docking
-------------
- [[DARC]] app  
    Mediante un algoritmo de trazado de rayos particularmente rápido en GPU
- [[FlexPepDock|FlexPepDockMover]]  
    Muestrea de forma simultánea los grados de libertad de la cadena principal del péptido
- SymDockProtocol  
    Docking de oligómeros simétricos
- [[RigidBodyTransMover]]  
    manipula manualmente la posición relativa de dos cuerpos a través de un salto
- RigidBodyPerturbNoCenter
- UnbiasedRigidBodyPerturbNoCenter
- UniformRigidBodyCM
- Docking
- [[DockingInitialPerturbation|DockingInitialPerturbationMover]]
- [[DockingProtocol|DockingProtocolMover]]
- DnaInterfaceMinMover 
- SymFoldandDockRbTrialMover
- [[HighResDocker|HighResDockerMover]]
- DockSetupMover
- [[DockWithHotspotMover]]

Conectividad química
-------------
- [[ForceDisulfides|ForceDisulfidesMover]]  
    Dada una lista de pares de residuos (por ejemplo, disulfuros), reempaqueta las envolturas de residuos a su alrededor, pero no cambia los residuos de tipo CYS.  
- DisulfideInsertion  
    Muta dos posiciones de residuos a CYS:disulfide, las enlaza conformacionalmente y añade restricciones al Pose para tener una buena distancia, ángulo y diedro de disulfuro.
    Está pensado para añadir un disulfuro a péptidos cortos potencialmente macrocíclicos.
- [[DisulfideMover]]  
    Dadas dos posiciones de residuos, muta ambas a CYS:disulfide y las enlaza conformacionalmente; no hace reempaquetado ni minimización
- [[Disulfidize|DisulfidizeMover]]  
    Prueba todos los pares posibles de residuos de un Pose para intentar introducir uno o más disulfuros nuevos siempre que puntúen bien

Diseño
-------------
- [[FastDesign|FastDesignMover]] 
- [[Control de la composición de aminoácidos durante el diseño|AACompositionEnergy]]
- CoupledMover  
    mover de FastRelax que hace diseño durante el reempaquetado
- [[RemodelMover]]  
    Función extremadamente diversa: puede hacer diseño, reempaquetado, remodelado completo de la cadena principal, construcción de disulfuros, etcétera   
- diseño de enzimas
    - EnzdesRemodelMover
    - [[PredesignPerturbMover]]
- [[DesignMinimizeHbondsMover]]
- [[GreedyOptMutationMover]]
- ParetoOptMutationMover
- [[MutateResidue|MutateResidueMover]]
- [[RandomMutation|RandomMutationMover]]
- [[ConsensusDesignMover]]
- AntibodyDesignMover
- AntibodyDesignProtocol
- DesignProteinBackboneAroundDNA
- MatDesGreedyOptMutationMover  
- FlxbbDesign  
    Se le puede dar un archivo blueprint para extrapolarlo a un movemap; hace diseño, puede hacer algo de relajación; convierte tu Pose a alanina antes de diseñar
- DnaInterfaceMultiStateDesign
- NcbbDockDesign  
    docking y diseño de cadenas principales no canónicas (peptidomiméticos)
- LigandDesign
- No son movers de diseño propiamente dichos, pero sesgan la composición de aminoácidos de una secuencia y por lo tanto pueden contribuir a un protocolo de diseño.
    - SetAACompositionPotential 
    - [[FavorNativeResidue|FavorNativeResidueMover]]
    - FavorNonNativeResidue
    - [[FavorSequenceProfile|FavorSequenceProfileMover]]
    - [[FavorSymmetricSequence|FavorSymmetricSequenceMover]]
    - FindConsensusSequence

Análisis
-------------
- [[InterfaceAnalyzerMover]]
- [[ComputeLigandRDF|ComputeLigandRDFMover]]
- [[InterfaceScoreCalculator|InterfaceScoreCalculatorMover]]
- [[MetricRecorder|MetricRecorderMover]]
- LoadVarSolDistSasaCalculatorMover
- LoadZnCoordNumHbondCalculatorMover

<!--
Interfaces simétricas
-------------
-	[[SymRotamerTrialsMover|SymPackRotamersMover]]
-	[[SymPackRotamersMover]]  
-	SymDockProtocol  
Docking de oligómeros simétricos
-	Symmetrizer  
Funcionalmente es un mover de optimización; toma un Pose con desviaciones de la simetría suficientemente pequeñas y las resuelve.
-	[[TaskAwareSymMinMover]]  
[[SymMinMover]]  
minimiza con simetría  
-	[[DetectSymmetry|DetectSymmetryMover]]  
-	GenericSymmetricSampler
-	fold and dock
	-	SymFoldandDockMoveRbJumpMover
	-	SymFoldandDockSlideTrialMover
	-	SymFoldandDockRbTrialMover  
-	MPSymDockMover
-->

Interfaces simétricas
-------------
- [[SymRotamerTrialsMover|SymPackRotamersMover]]
- [[SymPackRotamersMover]]  
- SymDockProtocol  
    Docking de oligómeros simétricos
- Symmetrizer  
    Funcionalmente es un mover de optimización; toma un Pose con desviaciones de la simetría suficientemente pequeñas y las resuelve.
- [[TaskAwareSymMinMover]]  
    [[SymMinMover]]  
    minimiza con simetría  
- [[DetectSymmetry|DetectSymmetryMover]]  
- GenericSymmetricSampler
- fold and dock
    - SymFoldandDockMoveRbJumpMover
    - SymFoldandDockSlideTrialMover
    - SymFoldandDockRbTrialMover  

Códigos de dinámica molecular
-------------
- CartesianMD
- [[HamiltonianExchange|Tempering-MetropolisHastings#HamiltonianExchange]]

Peptidomiméticos
-------------
- NcbbDockDesign  
- OopCreatorMover
- OopDockDesign

<!--
Proteínas de membrana
-------------
-	MPDockingMover
-	MPDockingSetupMover
-	MPFastRelaxMover
-	MPSymDockMover
-	AddMembraneMover
-	MembranePositionFromTopologyMover
-	MembraneTopology
-	SetMembranePositionMover
-	VisualizeMembraneMover
-	TransformIntoMembraneMover
-->

Modelado y diseño de anticuerpos
----------------------------

-   [[AntibodyDesignMover]]
-   [[AntibodyDesignModeler]]
-   [[AntibodyDesignProtocol]]
-   [[CDRDihedralConstraintMover]]
-   [[ParatopeSiteConstraintMover]] 
-   [[ParatopeEpitopeSiteConstraintMover]]


##Véase también

* [[RosettaScripts]]: la página de inicio de RosettaScripts
* [[Lista de movers de RosettaScripts|Movers-RosettaScripts]]
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Resources for learning biophysics and computational modeling]]
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar los archivos ejecutables de Rosetta
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Scripting Documentation]]: interfaces de scripting para Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de términos de Rosetta
* [[Rosetta overview]]: visión general de los conceptos principales de Rosetta
