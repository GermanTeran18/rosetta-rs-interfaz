<!-- --- title: Featurereporters -->Feature Reporters implementados
=================

[[_TOC_]]

##[[SimpleMetricFeatures]]
* Calcula y escribe [[SimpleMetrics]] arbitrarias

##[[Meta|MetaFeaturesReporters]]   
* Información sobre el lote de estructuras y el protocolo que se usó para generarlo

 * [[Protocol|MetaFeaturesReporters#ProtocolFeatures]] , [[Batch|MetaFeaturesReporters#BatchFeatures]] , [[JobData|MetaFeaturesReporters#JobDataFeatures]] , [[PoseComments|MetaFeaturesReporters#PoseCommentsFeatures]] , [[Runtime|MetaFeaturesReporters#RuntimeFeatures]]


##[[Químicos|ChemicalFeaturesReporters]]   
* Información de tipos químicos que se usa para definir conformaciones moleculares

* [[AtomType|ChemicalFeaturesReporters#AtomTypeFeatures]] , [[ResidueType|ChemicalFeaturesReporters#ResidueTypesFeatures]]

##[[De un cuerpo|OneBodyFeaturesReporters]]   
* Características identificadas por un solo residuo

* [[Residue|OneBodyFeaturesReporters#ResidueFeatures]] , [[ResidueConformation|OneBodyFeaturesReporters#ResidueConformationFeatures]] , [[ProteinResidueConformation|OneBodyFeaturesReporters#ProteinResidueConformationFeatures]] , [[RotamerFeatures|OneBodyFeaturesReporters#RotamerFeatures]] , [[ProteinBackboneTorsionAngle|OneBodyFeaturesReporters#ProteinBackboneTorsionAngleFeatures]] , [[ProteinBondGeometry|OneBodyFeaturesReporters#ProteinBondGeometryFeatures]] [[ResidueBurial|OneBodyFeaturesReporters#ResidueBurialFeatures]] , [[ResidueSecondaryStructure|OneBodyFeaturesReporters#ResidueSecondaryStructureFeatures]] , [[BetaTurnDetection|OneBodyFeaturesReporters#BetaTurnDetectionFeatures]] , [[RotamerBoltzmannWeight|OneBodyFeaturesReporters#RotamerBoltzmannWeightFeatures]]

##[[De dos cuerpos|TwoBodyFeaturesReporters]]   
* Características identificadas por un par de residuos

* [[Pair|TwoBodyFeaturesReporters#PairFeatures]] , [[AtomAtomPair|TwoBodyFeaturesReporters#AtomAtomPairFeatures]] , [[AtomInResidueAtomInResiduePair|TwoBodyFeaturesReporters#AtomInResidueAtomInResiduePairFeatures]] , [[ProteinBackboneAtomAtomPair|TwoBodyFeaturesReporters#ProteinBackboneAtomAtomPairFeatures]] , [[HBond|TwoBodyFeaturesReporters#HBondFeatures]] , [[Orbital|TwoBodyFeaturesReporters#OrbitalFeatures]] , [[SaltBridge|TwoBodyFeaturesReporters#SaltBridgeFeatures]] , [[ChargeCharge|TwoBodyFeaturesReporters#ChargeChargeFeatures]] , [[LoopAnchor|TwoBodyFeaturesReporters#LoopAnchorFeatures]]

##[[De varios cuerpos|MultiBodyFeaturesReporters]]   
* Características identificadas por más de dos residuos

* [[Structure|MultiBodyFeaturesReporters#StructureFeatures]] , [[PoseConformation|MultiBodyFeaturesReporters#PoseConformationFeatures]] , [[GeometricSolvation|MultiBodyFeaturesReporters#GeometricSolvationFeatures]] , [[RadiusOfGyration|MultiBodyFeaturesReporters#RadiusOfGyrationFeatures]] , [[Sandwich|MultiBodyFeaturesReporters#SandwichFeatures]] , [[Smotif|MultiBodyFeaturesReporters#SmotifFeatures]] , [[SecondaryStructureSegment|MultiBodyFeaturesReporters#SecondaryStructureSegmentFeatures]] , [[StrandBundle|MultiBodyFeaturesReporters#StrandBundleFeatures]], [[Interface | MultiBodyFeaturesReporters#InterfaceFeatures]], [[Anticuerpo | MultibodyFeaturesReporters#AntibodyFeatures]], [[Clúster de CDR | MultibodyFeaturesReporters#CDRClusterFeatures]]

##[[De varias estructuras|MultiStructureFeaturesReporters]]   
* Características identificadas por más de una estructura

* [[ProteinRMSD|MultiStructureFeaturesReporters#ProteinRMSDFeatures]] , [[ProteinRMSDNoSuperposition|MultiStructureFeaturesReporters#ProteinRMSDNoSuperpositionFeatures]] , [[RotamerRecovery|MultiStructureFeaturesReporters#RotamerRecoveryFeatures]]

##[[Función de energía|EnergyFunctionFeaturesReporters]]   
* Modelos de características y sus parámetros usados para crear términos de energía

* [[TotalScore|EnergyFunctionFeaturesReporters#TotalScoreFeatures]] , [[ScoreType|EnergyFunctionFeaturesReporters#ScoreTypeFeatures]] , [[ScoreFunction|EnergyFunctionFeaturesReporters#ScoreFunctionFeatures]] , [[StructureScores|EnergyFunctionFeaturesReporters#StructureScoresFeatures]] , [[ResidueScores|EnergyFunctionFeaturesReporters#ResidueScoresFeatures]] , [[ResidueTotalScores|EnergyFunctionFeaturesReporters#ResidueTotalScoresFeatures]] , [[HBondParameter|EnergyFunctionFeaturesReporters#HBondParameterFeatures]] , [[ScreeningFeatures|EnergyFunctionFeaturesReporters#ScreeningFeatures]]

##[[Anticuerpo | MultiBodyFeaturesReporters#antibody-features]]
* FeatureReporters específicos para el análisis de anticuerpos
* [[Anticuerpo | MultiBodyFeaturesReporters#antibody-features_antibodyfeatures]], [[Clúster de CDR | MultiBodyFeaturesReporters#antibody-features_cdrclusterfeatures]]

##[[Experimentales|ExperimentalFeaturesReporters]]   
* Datos experimentales no definidos por las coordenadas atómicas
* [[PdbData|ExperimentalFeaturesReporters#PdbDataFeatures]]


##Véase también

* [[Features reporter overview]]: la página de inicio de FeaturesReporter
* [[FeaturesTutorials]]: tutoriales para usar FeaturesReporters
* [[Página de inicio de RosettaScripts|RosettaScripts]]
* [[RosettaScripts database connection options]]
* [[Database IO]]: entrada/salida a bases de datos usando Rosetta
* [[Rosetta Database Output Tutorial]]
* [[SQLite3 Interface]]: información específica sobre el uso de SQLite3 con Rosetta
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con bases de datos
* [[Database options]]: opciones de línea de comandos relacionadas con bases de datos