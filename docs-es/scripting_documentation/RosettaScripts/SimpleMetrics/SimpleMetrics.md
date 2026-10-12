# SimpleMetrics
*Volver a la página principal de [[RosettaScripts|RosettaScripts]].*

Las SimpleMetrics son una nueva forma de hacer análisis y de informar datos en RosettaScripts, y han sustituido para ese fin al antiguo sistema de Filters. Las SimpleMetrics se pueden ejecutar en distintos puntos de un protocolo, por ejemplo antes y después de un mover concreto o de un conjunto de movers. Se declaran en el bloque `<SIMPLE_METRICS>` de RosettaScripts y están disponibles en las versiones de Rosetta posteriores al 10 de abril de 2018. 

**Cita por favor** [este artículo](https://doi.org/10.1101/2021.09.27.462000) si usas SimpleMetrics. 

Hay dos formas de escribir en un archivo de puntuaciones los datos calculados por las SimpleMetrics. La primera, y la más flexible, es con el mover [[RunSimpleMetrics]]. Consulta la página de documentación de [[RunSimpleMetrics]] para ver más sobre la sintaxis para incluirlo en tu protocolo.

La otra (disponible desde el 15 de octubre de 2021) es usar la opción `metrics` en la sección [[PROTOCOLS|RosettaScripts#rosettascript-sections_protocols]]. Esta opción toma una lista separada por comas de nombres de métricas (definidas previamente en la sección SIMPLE_METRICS) que se aplicarán en ese punto del protocolo y se informarán en el archivo de puntuaciones. Por defecto, este enfoque usa el nombre de la métrica como etiqueta de salida, en lugar de los tipos personalizados especificados por la métrica. Puedes especificar una etiqueta de salida distinta con la opción `labels` de la sección PROTOCOLS (que también toma una lista separada por comas). La etiqueta `-` es un caso especial que te da el nombre de la métrica que obtendrías de otro modo con RunSimpleMetrics. 

Todas las SimpleMetrics también se pueden usar como Filters, mediante [[SimpleMetricFilter]].
 
Por último, todas las SimpleMetrics también se pueden usar dentro del marco [[FeaturesReporter | Features-reporter-overview]], para permitir un análisis robusto en bases de datos relacionales.  Consulta [[SimpleMetricFeatures]] para más información. 

Ejemplo con comparación con el nativo mediante `-in:file:native`:


```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
		<CDR name="L1" cdrs="L1"/>
	</RESIDUE_SELECTORS>
	<MOVE_MAP_FACTORIES>
		<MoveMapFactory name="movemap_L1" bb="0" chi="0">
			<Backbone residue_selector="L1" />
			<Chi residue_selector="L1" />
		</MoveMapFactory>
	</MOVE_MAP_FACTORIES>
	<SIMPLE_METRICS>
		<TimingProfileMetric name="timing" />
		<RMSDMetric name="rmsd" rmsd_type="rmsd_protein_bb_heavy" residue_selector="L1" use_native="1"/>
		<SelectedResiduesPyMOLMetric name="pymol_selection" residue_selector="L1" />
		<TotalEnergyMetric name="total_energy" residue_selector="L1" />
	</SIMPLE_METRICS>
	<MOVERS>
		<MinMover name="min_mover" movemap_factory="movemap_L1" tolerance=".1" /> 
		<RunSimpleMetrics name="run_metrics1" metrics="pymol_selection,total_energy" prefix="m1_" />
		<RunSimpleMetrics name="run_metrics2" metrics="pymol_selection,total_energy" prefix="m2_" />
	</MOVERS>
	<PROTOCOLS>
		<Add mover_name="run_metrics1"/>
		<Add mover_name="min_mover" />
		<Add mover_name="run_metrics2" />
		<Add metrics="timing,rmsd" labels="run_time,bb_rmsd_to_native"/>
	</PROTOCOLS>
</ROSETTASCRIPTS>
```

Autor del marco: 
   Jared Adolf-Bryfogle (jadolfbr@gmail.com)

[[_TOC_]]


##Referencia general de SimpleMetrics
**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]]

##Uso eficaz de SimpleMetrics

### Resumir/calcular métricas

[[ResidueSummaryMetric]] toma una [[PerResidueRealMetric | SimpleMetrics#PerResidueRealMetric]] y resume los datos de varias maneras, como la media, la suma o el número de residuos por encima, por debajo o iguales a un cierto valor. Esta métrica es en sí misma una [[RealMetric | SimpleMetrics#RealMetric]] y se puede usar como tal en filtros, features reporters, etc.

[[CalculatorMetric]] es una RealMetric que puede combinar otras RealMetrics con una fórmula matemática arbitraria.

### Tipos personalizados

Cada SimpleMetric tiene una opción `custom_type`.  Esta opción da un nombre adicional al término de datos al usar [[RunSimpleMetrics]] o [[SimpleMetricFeatures]] (p. ej.: en el ejemplo siguiente, el término de salida pasa a ser L1_total_energy y L2_total_energy). La ventaja es que puedes tener varias SimpleMetrics, todas configuradas de forma distinta, y usar la opción `custom_type` te permite ejecutarlas todas en una única aplicación RunSimpleMetrics o SimpleMetricFeatures.  

Ej.:

```xml

	<TotalEnergyMetric name="E_L1" residue_selector="L1" custom_type="L1" />
	<TotalEnergyMetric name="E_L2" residue_selector="L2" custom_type="L2" />
	<TotalEnergyMetric name="E_CDRs" residue_selector="ALL" custom_type="cdrs"/>

  	. . .

	<RunSimpleMetrics name="cdr_metrics" metrics="E_L1,E_L2,E_CDRs" />

```

### Prefijo/sufijo

[[RunSimpleMetrics]] y [[SimpleMetricFeatures]] tienen opciones adicionales de prefijo y sufijo.  Úsalas para ejecutar un conjunto de SimpleMetrics en distintos puntos de tu protocolo, o para empezar a agrupar conjuntos de métricas en etiquetas similares.  Por ejemplo, antes de un mover puedes definir `prefix="pre_min"` y luego ejecutar el mismo conjunto de SimpleMetrics después con `prefix="post_min"`.  

Ej.:

```xml


<RunSimpleMetrics name="cdr_metrics_pre" metrics="E_L1,E_L2,E_CDRs" prefix="pre_min_"/>
<RunSimpleMetrics name="cdr_metrics_post" metrics="E_L1,E_L2,E_CDRs" prefix="post_min_"/>
	
 . . . 
  
<PROTOCOLS>
	<Add mover_name="cdr_metrics_pre"/>
	<Add mover_name="min_mover" />
	<Add mover_name="cdr_metrics_post" />
</PROTOCOLS>

```

###Caché de métricas

Algunos cálculos son costosos, como `DensityFitMetric`.  Para reducir el tiempo de ejecución durante un protocolo complejo, [[SimpleMetricFilter]], [[SimpleMetricFeatures]] y [[ResidueSummaryMetric]] pueden usar datos en caché.  Durante la aplicación `RunSimpleMetrics`, TODOS los datos se almacenan dentro del Pose, y esto se puede usar para filtros y features mediante la opción `use_cached_data`.  Si se usó un prefijo/sufijo durante `RunSimpleMetrics`, aquí también hace falta, mediante las opciones `cache_prefix` y `cache_suffix`. Cualquier cambio de longitud del Pose se tiene en cuenta automáticamente gracias a la excelente funcionalidad de Pose de referencia de Vikram Mulligan.  

Ej.: 

```xml
<SimpleMetricFilter name="ss_filter" use_cached_data="1" cache_prefix="cached_"  metric="ss" match="LLLLLLLLLLL"  comparison_type="ne"/>
<SimpleMetricFilter name="rmsd_filter" use_cached_data="1" cache_prefix="cached_"  metric="rmsd" cutoff="0.5" comparison_type="lt" />
```

###SavePoseMover

Algo que conviene tener presente es que los datos calculados durante [[RunSimpleMetrics]] se almacenan en el Pose.  Esto significa que, si calculas un montón de datos y cambias a otro Pose del protocolo usando [[SavePoseMover]], los datos no se escribirán en la salida.  Se está trabajando en un mover para copiar estos datos a un Pose nuevo, pero ten presente esta circunstancia.


##RealMetrics

Estas métricas calculan un único número real (o entero). 

SimpleMetric  | Descripción | ¿Compatible con ResidueSelector?
------------ | ------------- | -------------
**[[CalculatorMetric]]** | Combina varias RealMetrics con una expresión matemática. | No
**[[CustomRealValueMetric]]** | Añade a un Pose un valor de coma flotante arbitrario con una etiqueta definida por el usuario. | No/no hace falta
**[[CustomStringValueMetric]]** | Añade a un Pose una cadena arbitraria con una etiqueta definida por el usuario. | No/no hace falta
**[[DihedralDistanceMetric]]** | Calcula la distancia normalizada de ángulos diedros en grados a partir de estadística direccional sobre un conjunto de diedros/residuos de dos Poses o de dos regiones de un Pose.  | Sí
**[[InteractionEnergyMetric]]** | Calcula la energía de interacción (de largo y corto alcance) entre una selección y todos los demás residuos u otra selección. Se puede configurar para calcular solo la de corto o largo alcance, o para usar solo ciertos términos de puntuación como fa_rep. | Sí
**[[PseudoPerplexityMetric]]** | Una métrica que toma una _PerResidueProbabilitiesMetric_ y calcula a partir de ella la pseudoperplejidad (una puntuación que describe la verosimilitud de una secuencia dada). | No/no hace falta
**[[ResidueSummaryMetric]]** | Una métrica que toma una _PerResidueRealMetric_ y resume los datos de distintas maneras, como la suma, la media o el número de residuos que cumplen un cierto criterio. Puede usar datos en caché. | Sí
**[[RMSDMetric]]** | Calcula el RMSD entre dos Poses o sobre un subconjunto de residuos.  Hay muchas opciones de RMSD, como bb, heavy, all, etc. | Sí 
**[[SasaMetric]]** | Calcula el área de superficie accesible al disolvente (sasa). | Sí
**[[SelectedResidueCountMetric]]** | Cuenta el número de residuos de una selección (o de todo el Pose). | Sí
**[[SequenceRecoveryMetric]]** | Compara la secuencia de la estructura con la de una estructura de referencia o un PSSM | Sí
**[[SequenceSimilarityMetric]]** | Promedia la puntuación BLOSUM62 de los residuos seleccionados. | Sí
**[[TotalEnergyMetric]]** | Calcula la energía total de un Pose usando una función de puntuación O la diferencia de energía total entre dos Poses. | Sí
**[[TimingProfileMetric | TimingMetric]]** | Calcula el tiempo transcurrido en minutos u horas desde la construcción hasta apply (es decir, desde que se declara en el bloque RS hasta que se ejecuta).  Útil para obtener información de tiempos de los protocolos. | No
**[[SapScoreMetric|simple_metric_SapScoreMetric_type]]**| Calcula la puntuación SAP | sí


##StringMetrics

Estas métricas calculan una cadena de texto, como la secuencia y la estructura secundaria. 

SimpleMetric  | Descripción | ¿Compatible con ResidueSelector?
------------ | ------------- | -------------
**[[ConstraintsMetric]]** | Dado un Pose con restricciones, extrae las definiciones de las restricciones en un formato compatible con los archivos .cst. | Sí.
**[[InteractionGraphSummaryMetric]]** | Dado un Pose y un conjunto de task operations, calcula un grafo de interacción y escribe un resumen de él.  Pensada para usarse con annealers externos y con el [[mover ExternalPackerResultLoader|ExternalPackerResultLoader]] para reconstruir el Pose con la solución externa. | Sí (indirectamente, ya que las task operations pueden tomar residue selectors)
**[[PolarGroupBurialPyMolStringMetric]]** | Devuelve comandos de PyMol para colorear los grupos polares de un Pose según su enterramiento, de forma compatible con el término de puntuación [[buried_unsatisfied_penalty|BuriedUnsatPenalty]]. | No (no aplicable)
**[[SecondaryStructureMetric]]** | Devuelve la estructura secundaria DSSP del Pose o de un conjunto de residuos seleccionados. | Sí
**[[SelectedResiduesMetric]]** | Devuelve una lista separada por comas de los residuos seleccionados en numeración PDB o de Rosetta. | Sí - _Obligatorio_
**[[SelectedResiduesPyMOLMetric]]** | Devuelve una selección de PyMOL de un conjunto de residuos seleccionados. | Sí - _Obligatorio_
**[[SequenceMetric]]** | Devuelve la secuencia de una o tres letras del Pose o de un conjunto de residuos seleccionados.  | Sí

##PerResidueRealMetrics
Estas métricas calculan un único número real (o entero) para cada residuo seleccionado por un residue selector.
Por defecto se calculan sobre TODOS los residuos.  
**Todas aceptan ResidueSelectors.**  La salida puede estar en numeración de Rosetta o PDB.  Puedes usar [[ResidueSummaryMetric]] para calcular la suma, la media, etc. a partir de una PerResidueMetric.  

SimpleMetric  | Descripción 
------------ | -------------
**[[CurrentProbabilityMetric]]** | Devuelve solo la probabilidad de las identidades de aminoácido presentes actualmente en el Pose a partir de una PerResidueProbabilitiesMetric. 
**[[HbondMetric]]** | Calcula el número de enlaces de hidrógeno entre residuos de un selector o entre dos selectores
**[[PeptideInternalHbondsMetric]]** | Calcula el número de enlaces de hidrógeno de una única selección o Pose, excluyendo los enlaces entre residuos que estén a una distancia umbral entre sí en términos de conectividad covalente.
**[[PerResidueDensityFitMetric]]** | Calcula el ajuste de un modelo a la densidad cargada, ya sea por correlación o por Zscore.
**[[PerResidueBfactorMetric]]** | Obtiene el factor b por residuo para un átomo dado (por defecto CA). Omite los residuos que no tienen ese átomo. 
**[[PerResidueClashMetric]]** | Calcula el número de choques atómicos por residuo usando dos residue selectors. Los choques se calculan mediante el radio de Lennard-Jones de cada tipo de átomo.
**[[PerResidueEnergyMetric]]** | Calcula cualquier término de energía para cada residuo.  Por defecto es la energía total.  Si se proporciona un nativo o un Pose de referencia, puede calcular la diferencia de energía de cada residuo.
**[[PerResidueRMSDMetric]]** | Calcula el RMSD de cada residuo entre la entrada y el nativo o un Pose de referencia.
**[[PerResidueSasaMetric]]** | Calcula el área de superficie accesible al disolvente (SASA) de cada residuo.
**[[PTMPredictionMetric]]** | Predice la probabilidad de distintas modificaciones postraduccionales.
**[[ProbabilityConservationMetric]]** | Calcula la conservación de una posición a partir de ciertas probabilidades predichas (usando la entropía de Shannon relativa).
**[[SidechainNeighborCountMetric|simple_metric_SidechainNeighborCountMetric_type]]** | Calcula los vecinos de cada cadena lateral basándose en conos. Esta métrica usa el mismo código central que LayerSelector.
**[[WaterMediatedHbondMetric]]** | Una métrica para medir los enlaces de hidrógeno entre un conjunto de residuos que están mediados por agua (con puente).  Puede calcular distintas profundidades para recorrer redes complejas de enlaces de hidrógeno.
**[[PerResidueSapScoreMetric|simple_metric_PerResidueSapScoreMetric_type]]** | Calcula la puntuación SAP (~hidrofobicidad) de cada residuo.




##PerResidueStringMetrics
Estas métricas producen una única cadena de texto para cada residuo de un residue selector. 

##CompositeRealMetrics

Estas métricas calculan un conjunto de números reales con nombre. Todos los valores de métrica del compuesto se escriben en la salida y están disponibles para filtrar. 

SimpleMetric  | Descripción | ¿Compatible con ResidueSelector?
------------ | ------------- | -------------
**[[BestMutationsFromProbabilitiesMetric]]**| Calcula las mutaciones con mayor diferencia de probabilidad respecto a los residuos actuales a partir de una PerResidueProbabilitiesMetric. | No
**[[BlockwiseShapeCompMetric|simple_metric_BlockwiseShapeCompMetric_type]]** | Mide la complementariedad de forma entre bloques (tramos contiguos de aminoácidos). | Sí
**[[BlockwisePoseCompMotifMetric|simple_metric_BlockwisePoseCompMotifMetric_type]]** | Calcula puntuaciones de motivos entre bloques (tramos contiguos de aminoácidos). | Sí
**[[CompositeEnergyMetric]]** | Calcula cada término de puntuación individual de una función de puntuación o la DIFERENCIA de cada término de puntuación entre dos Poses.  Cada valor con nombre es el término de puntuación | Sí
**[[ElectrostaticComplementarityMetric | simple_metric_ElectrostaticComplementarityMetric_type ]]** | Calcula la complementariedad electrostática de McCoy, Chandana y Colman usando APBS. | Sí

##CompositeStringMetrics

Estas métricas calculan un conjunto de cadenas de texto con nombre. Todos los valores de métrica del compuesto se escriben en la salida y están disponibles para filtrar. 

SimpleMetric  | Descripción | ¿Compatible con ResidueSelector?
------------ | ------------- | -------------
**[[ProtocolSettingsMetric]]** | Escribe las opciones de usuario definidas actualmente (línea de comandos, xml o ambas).  Permite escribir solo métricas concretas o definir una etiqueta para el experimento en particular.  Útil para benchmarking/gráficos o para conservar históricamente las opciones ligadas a un Pose  | No

##PerResidueProbabilitiesMetrics
Estas métricas calculan varios números reales (probabilidades) para cada residuo seleccionado por un residue selector. Se usan en el contexto de modelos de aprendizaje automático que, para una posición concreta, predicen probabilidades para todos los aminoácidos posibles en esa posición (p. ej., ¿es más probable que mi residuo de la posición 10 sea un triptófano o una alanina?).

SimpleMetric  | Descripción 
------------ | -------------
**[[AverageProbabilitiesMetric]]** | Promedia varias PerResidueProbabilitiesMetrics.
**[[LoadedProbabilitiesMetric]]** | Carga probabilidades guardadas desde un archivo de pesos.
**[[PerResidueEsmProbabilitiesMetric]]** | Usa la familia de modelos de lenguaje de proteínas ESM (Evolutionary Scale Modeling) para predecir probabilidades de aminoácidos (requiere tensorflow).
**[[ProteinMPNNProbabilitiesMetric]]** | Usa el modelo ProteinMPNN para predecir probabilidades de aminoácidos (requiere una compilación con extras=torch).

##Véase también

* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
