#Filtros (RosettaScripts)

[[Volver a RosettaScripts|RosettaScripts]]

Cada definición de filtro tiene el siguiente formato en el bloque `FILTERS`:

```xml
<FILTERS>
	<SomeFilterName name="&string" confidence="(1 &Real)" other_option=""/>
</FILTERS>
```

donde "SomeFilterName" pertenece a un conjunto predefinido de filtros posibles que el parser reconoce y que se enumeran más abajo, name es un identificador único para esta definición de filtro y después va cualquier número de parámetros que el filtro necesite para quedar definido.

Los filtros pueden ejecutarse sobre [[SimpleMetrics]] arbitrarias, que con el tiempo reemplazarán algunos aspectos del sistema de filtros.  Consulta el [[SimpleMetricFilter]] especial para usar métricas arbitrarias como criterio de filtrado.

Si confidence es 1.0, el filtro se evalúa como en la lógica de predicados (V/F). Si el valor es menor que 0.999, el filtro se evalúa de forma difusa, de modo que devuelve True en una fracción (1.0 - confidence) de las veces que se consulta. Esto puede ser útil cuando los datos experimentales son ambiguos o inciertos.

Después del final del bloque de código de protocolos, los filtros se ejecutarán _de nuevo_ para informar al Pose los valores más actualizados. Se puede evitar esa ejecución final, manteniendo aun así el filtrado, añadiendo la opción: `report_at_end=“false”`.
[[_TOC_]]

## Filtros predefinidos

Filtros simples que están disponibles sin necesidad de definirlos explícitamente.

Filtro  | Descripción
------------ | -------------
**[[TrueFilter]]** | Siempre pasa.
**[[FalseFilter]]** | Nunca pasa.

## Filtros especiales

Filtros útiles para combinar o modificar otros filtros y movers, o para trabajar con ellos.

Filtro  | Descripción
------------ | -------------
**[[CompoundStatement|CompoundStatementFilter]]** | Usa filtros definidos previamente con operaciones lógicas para construir un filtro compuesto.
**[[CombinedValue|CombinedValueFilter]]** | Suma ponderada de varios filtros.
**[[CalculatorFilter]]** | Combina varios filtros con una expresión matemática.
**[[ReplicateFilter]]** | Repite un filtro varias veces y promedia.
**[[Boltzmann|BoltzmannFilter]]** | Suma ponderada de Boltzmann de filtros positivos/negativos.
**[[MoveBeforeFilter]]** | Aplica un mover antes de aplicar el filtro.
**[[Operator|OperatorFilter]]** | Aplica una operación de lógica difusa a un conjunto de filtros.
**[[Sigmoid|SigmoidFilter]]** | Transforma el valor de un filtro según una función sigmoide.
**[[IfThenFilter]]** | Se evalúa a un valor que depende del valor verdadero/falso de otros filtros.
**[[ContingentFilter]]** | Un filtro especial que permite que los movers fijen su valor (pasa/falla).
**[[PoseComment|PoseCommentFilter]]** | Comprueba la existencia o el valor de un comentario en el Pose.
**[[Range|RangeFilter]]** | Devuelve true si el valor de un filtro dado está dentro de un rango dado.

-----------------------

## Filtros generales

Filtro  | Descripción
------------ | -------------
**[[SimpleMetricFilter]]** | Filtra según cualquier [[SimpleMetric | SimpleMetrics]] arbitraria.


### Filtros básicos

Filtro  | Descripción
------------ | -------------
**[[ResidueCount|ResidueCountFilter]]** | Filtra según el número total de residuos.
**[[NetCharge|NetChargeFilter]]** | Filtra según la suma simple de la carga de la proteína.

### Energía y puntuación

Filtro  | Descripción
------------ | -------------
**[[ScoreType|ScoreTypeFilter]]** | Filtra según un término de puntuación concreto.
**[[TaskAwareScoreType|TaskAwareScoreTypeFilter]]** (antes AverageInterfaceEnergy) | Filtra según la puntuación de los residuos "empaquetables".
**[[BindingStrain|BindingStrainFilter]]** | Filtra según la tensión energética de un monómero unido.
**[[ConstraintScore|ConstraintScoreFilter]]** | Filtro que genera una puntuación a partir de un conjunto de restricciones generadas por ConstraintGenerators.
**[[Delta|DeltaFilter]]** | Calcula la diferencia del valor del filtro respecto al nativo.
**[[EnergyPerResidue|EnergyPerResidueFilter]]** | Filtra según la energía de una selección concreta (residuo(s), interfaz, proteína).
**[[ReadPoseExtraScoreFilter|ReadPoseExtraScoreFilter]]** | Extrae una puntuación guardada previamente en el Pose.
**[[Residue Interaction Energy|ResidueIEFilter]]** | Filtra según la energía de un residuo concreto en el contexto de una interfaz o de un Pose.
**[[ResidueSetChainEnergy|ResidueSetChainEnergyFilter]]** | Filtra según la energía de un conjunto de residuos (de una cadena o de una selección).
**[[ScorePoseSegmentFromResidueSelectorFilter|ScorePoseSegmentFromResidueSelectorFilter]]** | Obtiene la puntuación de una sección solicitada de un Pose mediante un ResidueSelector.

### Distancia

Filtro  | Descripción
------------ | -------------
**[[ResidueDistance|ResidueDistanceFilter]]** | Filtra según la distancia entre dos residuos.
**[[AtomicContact|AtomicContactFilter]]** | ¿Hay átomos de dos residuos a una distancia menor que el umbral?
**[[AtomicContactCount|AtomicContactCountFilter]]** | Cuenta el número de contactos carbono-carbono.
**[[AtomicDistance|AtomicDistanceFilter]]** | Filtra según la distancia entre dos átomos.
**[[TerminusDistance|TerminusDistanceFilter]]** | Distancia en la secuencia desde cualquiera de los extremos hasta la interfaz.


### Análisis de secuencia

Filtro  | Descripción
------------ | -------------
**[[LongestContinuousPolarSegment|LongestContinuousPolarSegmentFilter]]** | Filtra según la longitud del tramo más largo de residuos de aminoácidos polares.
**[[LongestContinuousApolarSegment|LongestContinuousApolarSegmentFilter]]** | Filtra según la longitud del tramo más largo de residuos de aminoácidos apolares.
**[[SequenceDistance|SequenceDistanceFilter]]** | Filtra según el número de mutaciones entre la secuencia del Pose y la secuencia guardada en los comentarios del Pose.

### Análisis de alineamiento

Filtro  | Descripción
------------ | -------------
**[[AlignmentAAFinder|AlignmentAAFinderFilter]]** | Recorre un alineamiento, prueba todos los aminoácidos posibles en cada posición y genera un archivo con los aminoácidos que pasan.
**[[AlignmentGapInserter|AlignmentGapInserterFilter]]** | Recorre un alineamiento e inserta huecos (gaps) donde las posiciones del alineamiento no representan el entorno químico de la secuencia del Pose.

### Geometría

Filtro  | Descripción
------------ | -------------
**[[AngleToVector|AngleToVectorFilter]]** | Filtra según el ángulo entre dos átomos del primer residuo de una cadena y un vector dado.
**[[Torsion|TorsionFilter]]** | Filtra según el valor de un diedro.
**[[HelixPairing|HelixPairingFilter]]** | Filtra estructuras según la geometría de los apareamientos de hélices.
**[[SSMotifFinder|SSMotifFinderFilter]]** | Filtra estructuras según la geometría de los tallos de los loops.
**[[SecondaryStructure|SecondaryStructureFilter]]** | Filtra estructuras según la estructura secundaria.
**[[SecondaryStructureCount|SecondaryStructureCountFilter]]** | Cuenta el número de elementos de un único tipo de estructura secundaria. 
**[[SecondaryStructureHasResidue|SecondaryStructureHasResidueFilter]]** | Cuenta la fracción de posiciones de un elemento de estructura secundaria que contienen un residuo concreto.
**[[HelixKink|HelixKinkFilter]]** | A grandes rasgos, filtra según la topología de la hélice.
**[[Geometry|GeometryFilter]]** | Geometría de enlaces y restricciones del ángulo omega.
**[[HSSTriplet|HSSTripletFilter]]** | Evalúa los tripletes hélice-hebra-hebra dados. 
**[[PreProlineFilter|PreProlineFilter]]** | Comprueba si hay torsiones malas en los residuos anteriores a las prolinas.
**[[LoopAnalyzerFilter]]** | Comprueba si hay geometrías malas en la cadena principal de los loops.

### Empaquetado y conectividad

Filtro  | Descripción
------------ | -------------
**[[CavityVolume|CavityVolumeFilter]]** | Siempre devuelve true, pero calcula el volumen de las cavidades dentro de la proteína.
**[[AverageDegree|AverageDegreeFilter]]** | Cuenta el número de residuos a cierta distancia de otra selección de residuos.
**[[PackStat|PackStatFilter]]** | Calcula estadísticas de empaquetado.
**[[Holes|HolesFilter]]** | Identifica vacíos (holes) en el empaquetado.
**[[InterfaceHoles|InterfaceHolesFilter]]** | Identifica vacíos en las interfaces proteína-proteína.
**[[NeighborType|NeighborTypeFilter]]** | Busca un tipo de residuo dentro de un radio alrededor de un residuo objetivo.
**[[ResInInterface|ResInInterfaceFilter]]** | Filtra según el número total de residuos de la interfaz.
**[[ShapeComplementarity|ShapeComplementarityFilter]]** | Filtra según la complementariedad de forma de la interfaz.
**[[SSShapeComplementarity|SSShapeComplementarityFilter]]** (SecondaryStructureShapeComplementarity) | Filtra según la complementariedad de forma de la estructura secundaria.
**[[SpecificResiduesNearInterface|SpecificResiduesNearInterfaceFilter]]** | Filtra según residuos concretos cercanos a la interfaz.

### Enterramiento

Filtro  | Descripción
------------ | -------------
**[[TotalSasa|TotalSasaFilter]]** | Filtra según el área de superficie accesible al solvente total del Pose.
**[[Sasa|SasaFilter]]** | Filtra según el área de superficie accesible al solvente de una *interfaz*.
**[[ResidueBurial|ResidueBurialFilter]]** | Número de residuos a una distancia de interacción, a través de la interfaz, del residuo objetivo.
**[[BuriedSurfaceArea|BuriedSurfaceAreaFilter]]** | Calcula el área de superficie enterrada de un Pose o de una selección, con la opción de considerar solo los residuos hidrofóbicos.
**[[ExposedHydrophobics|ExposedHydrophobicsFilter]]** | Calcula la SASA de cada residuo hidrofóbico.

### Comparación

Filtro  | Descripción
------------ | -------------
**[[RelativePose|RelativePoseFilter]]** | Calcula el valor de un filtro relativo a la estructura de otro Pose.
**[[Rmsd|RmsdFilter]]** | Filtra según el RMSD de C-alfa respecto a una estructura de referencia. 
**[[SidechainRmsd|SidechainRmsdFilter]]** | Calcula el RMSD de una única cadena lateral.
**[[IRmsd|IRmsdFilter]]** | Filtra según el RMSD de la cadena principal sobre los residuos de la interfaz.
**[[RmsdFromResidueSelectorFilter|RmsdFromResidueSelectorFilter]]** | Similar al filtro [[Rmsd|RmsdFilter]]. Permite indicar **ResidueSelectors** tanto para el Pose de consulta como para el de referencia.
**[[SequenceRecovery|SequenceRecoveryFilter]]** | Calcula la fracción de recuperación de secuencia de un Pose en comparación con un Pose de referencia. 

### Enlaces

Filtro  | Descripción
------------ | -------------
**[[ChainBreak|ChainBreakFilter]]** | Filtra según el número de rupturas de cadena en el Pose.
**[[HbondsToResidue|HbondsToResidueFilter]]** | Filtra según el número de parejas de enlace de hidrógeno de un residuo.
**[[SimpleHbondsToAtom|SimpleHbondsToAtomFilter]]** | Filtra según el número de parejas de enlace de hidrógeno de uno o más átomos, con una lógica bastante más simple que HbondsToAtom.
**[[HbondsToAtom|HbondsToAtomFilter]]** | Filtra según el número de parejas de enlace de hidrógeno de uno o más átomos.
**[[PeptideInternalHbondsFilter]]** | Filtra según el número de enlaces de hidrógeno en una única selección o Pose, excluyendo los enlaces entre residuos que están dentro de una distancia umbral entre sí en términos de conectividad covalente.
**[[BuriedUnsatHbonds|BuriedUnsatHbondsFilter]]** | Filtra según el número máximo de enlaces de hidrógeno enterrados no satisfechos.
**[[BuriedUnsatHbonds2|BuriedUnsatHbonds2Filter]]** | Filtra según el número de enlaces de hidrógeno no satisfechos en las interfaces (algoritmo distinto al del filtro anterior).
**[[OversaturatedHbondAcceptorFilter]]** | Filtra según el número de aceptores de enlaces de hidrógeno que reciben enlaces de más donadores de los permitidos.
**[[DisulfideFilter]]** | Filtra según la presencia de un disulfuro a través de una interfaz.
**[[AveragePathLength|AveragePathLengthFilter]]** | Calcula la longitud del camino más corto en un grafo donde los residuos son nodos y los enlaces covalentes son aristas.
**[[DisulfideEntropy|DisulfideEntropyFilter]]** | Calcula el cambio de entropía configuracional debido a la formación de enlaces disulfuro.

---------------------------

## Filtros de informe

Estos filtros se usan sobre todo por los informes que generan en el log o en los archivos de puntuación y silent, más que por su capacidad de terminar una ejecución.

Filtro  | Descripción
------------ | -------------
**[[BundleReporter|BundleReporterFilter]]** | Informa los parámetros del haz helicoidal y la energía de un Pose generado paramétricamente.
**[[DesignableResidues|DesignableResiduesFilter]]** | Informa qué residuos son diseñables.
**[[Expiry|ExpiryFilter]]** | Filtra según la duración de la simulación (en segundos).
**[[FileExist|FileExistFilter]]** | ¿Existe un archivo en el disco?
**[[FileRemove|FileRemoveFilter]]** | Elimina un archivo del disco.
**[[RelativeSegmentFilter]]** | Informa los números de los residuos que se alinean con un segmento del Pose de origen.
**[[Report|ReportFilter]]** | Este filtro informa el valor de otro filtro junto con el nombre del trabajo actual.
**[[RotamerBoltzmannWeight|RotamerBoltzmannWeightFilter]]** | Informa la probabilidad de Boltzmann de que aparezca un rotámero.
**[[RotamerBoltzmannWeight2|RotamerBoltzmannWeight2Filter]]** | Informa la probabilidad de Boltzmann de que aparezcan los rotámeros específicos en un subconjunto dado de residuos. Hay varios métodos disponibles para calcular la probabilidad y la puntuación.
**[[StemFinder|StemFinderFilter]]** | Compara PDBs con una plantilla para identificar tallos donde empalmar segmentos.
**[[AlaScan|AlaScanFilter]]** | Informa el ddG del escaneo de alaninas.
**[[DdGScan|DdGScanFilter]]** | Informa el ddG del escaneo de alaninas en residuos concretos. Este filtro se llamaba antes "TaskAwareAlaScanFilter".
**[[FilterScan|FilterScanFilter]]** | Recorre todas las mutaciones que permiten las task\_operations y las prueba contra un filtro.
**[[Time|TimeFilter]]** | Informa cuánto tarda una secuencia de movers y filtros.
**[[PeptideDeriver|PeptideDeriverFilter]]** | Deriva el péptido lineal que más contribuye a la energía de unión.
**[[PoseInfo|PoseInfoFilter]]** | Informa al tracer información básica del Pose.
**[[SaveResfileToDisk|SaveResfileToDiskFilter]]** | Guarda un resfile en el directorio de salida.
**[[SSPrediction|SSPredictionFilter]]** | Genera predicciones de estructura secundaria a partir de la secuencia.
**[[ChainCountFilter|ChainCountFilter]]** | Cuenta el número de cadenas de un Pose.

----------------------------------------

## Filtros para aplicaciones especiales

### Unión

Filtro  | Descripción
------------ | -------------
**[[Ddg|DdgFilter]]** | Filtra según la energía de unión.
**[[InterfaceBindingEnergyDensityFilter]]** | Filtra según el ddG dividido por la SASA (usando los filtros respectivos).
**[[InterfaceHydrophobicResidueContacts]]** | Filtra según el número de residuos hidrofóbicos del objetivo que tienen al menos cierto ddG hidrofóbico.

### Docking de ligandos y diseño de enzimas

Filtro  | Descripción
------------ | -------------
**[[DSasa|DSasaFilter]]** | Filtra según la delta de SASA del ligando unido y no unido.
**[[DiffAtomBurial|DiffAtomBurialFilter]]** | Compara la DSasa de dos átomos especificados y comprueba si una es mayor o menor que la otra.
**[[LigInterfaceEnergy|LigInterfaceEnergyFilter]]** | Filtra según la energía de unión de un ligando.
**[[EnzScore|EnzScoreFilter]]** | Calcula las puntuaciones de un Pose teniendo en cuenta (o no) la cst_energy al estilo de enzdes.
**[[RepackWithoutLigand|RepackWithoutLigandFilter]]** | Calcula la delta_energy o el RMSD de los residuos de proteína en una interfaz proteína-ligando cuando se quita el ligando y se reempaqueta la interfaz.

### Diseño de ligandos

Filtro  | Descripción
------------ | -------------
**[[HeavyAtom|HeavyAtomFilter]]** | Filtra según el número de átomos pesados de un residuo.
**[[CompleteConnections|CompleteConnectionsFilter]]** | Filtra según las conexiones sin cumplir.

### Diseño de hotspots

Filtro  | Descripción
------------ | -------------
**[[StubScore|StubScoreFilter]]** | Filtra según si el andamio "siente" alguna de las restricciones de stub de hotspot.

<!--- BEGIN_INTERNAL -->

### MatDes

Filtro  | Descripción
------------ | -------------
**[[OligomericAverageDegree|OligomericAverageDegreeFilter]]** | Una versión del filtro AverageDegree (véase arriba) compatible con bloques de construcción oligoméricos.
**[[SymUnsatHbonds|SymUnsatHbondsFilter]]** | Filtra según el número máximo de enlaces de hidrógeno enterrados no satisfechos que se permiten a través de una interfaz.
**[[ClashCheck|ClashCheckFilter]]** | Calcula el número de átomos pesados que chocan entre bloques de construcción.
**[[InterfacePacking|InterfacePackingFilter]]** | Calcula la puntuación de holes de Will Sheffler para los átomos de las interfaces entre bloques de construcción.
**[[MutationsFilter|MutationsFilter]]** | Determina los residuos mutados del Pose actual en comparación con un Pose de referencia. 
**[[GetRBDOFValues|GetRBDOFValuesFilter]]** | Calcula la traslación o la rotación actual a través de un salto (jump) especificado por el usuario.

<!--- END_INTERNAL -->

-----------------------

### Diseño de la cadena principal

Filtro  | Descripción
------------ | -------------
**[[Foldability|FoldabilityFilter]]** | Reconstruye un número especificado de veces un segmento dado de un Pose de entrada mediante ensamblaje basado en fragmentos.
**[[FragQual|FragQualFilter]]** | Compara un Pose de entrada con un conjunto de fragmentos.

### Diseño de péptidos cíclicos

Filtro  | Descripción
------------ | -------------
**[[CycpepSymmetryFilter|CycpepSymmetryFilter]]** | Determina si la cadena principal de un péptido cíclico tiene la simetría cíclica deseada y pasa si y solo si la tiene.  Funciona con simetría c2, c3, c4, _etc._, así como con simetría c2/m, c4/m, c6/m, _etc._


##Véase también

* [[RosettaScripts]]: la página principal de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[Movers de RosettaScripts|Movers-RosettaScripts]]
* [[TaskOperations de RosettaScripts|TaskOperations-RosettaScripts]]
* [[I want to do x]]: guía para hacer perturbaciones estructurales específicas con RosettaScripts
* [[Scripting Documentation]]: la página principal de la documentación de scripting
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Glossary]]
* [[RosettaEncyclopedia]]
