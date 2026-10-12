# SimpleMetricFilter
*Volver a la página de [[SimpleMetrics]].*
*Volver a la página de [[Filtros | Filters-RosettaScripts]].*
## SimpleMetricFilter

## Referencia
**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]]

Ejecuta una [[Simple Metric | SimpleMetrics]] arbitraria y filtra según el valor o los valores calculados. Usa el mover [[RunSimpleMetrics]] para informar valores en un archivo de puntuación.  

##General

Fija `comparison_type` para indicar al filtro cómo debe filtrar en realidad según los datos. La comparación se hace así:

```
metric_value comparison_type cutoff/match value
```

Por ejemplo, si `comparison_type` es eq: si el valor de la métrica es igual al valor de cutoff/match, devolvemos true.

Los comparison_types aceptables son las comparaciones de igualdad típicas:

comparison_type  | Descripción 
------------ | ------------- 
`eq` | Igual
`ne` | Distinto
`lt` | Menor que
`gt` | Mayor que,
`lt_or_eq` | Menor o igual que
`gt_or_eq` | Mayor o igual que


##Métricas numéricas

Incluyen RealMetrics, IntegerMetrics y sus equivalentes compuestas. 
La opción `cutoff` es obligatoria para fijar un tipo de umbral concreto. 

##Métricas de cadena

Incluyen StringMetrics y su equivalente compuesta.
La opción `match` es obligatoria para fijar una cadena arbitraria con la que se compara. 
Solo se pueden usar los `comparison_types` `eq` y `ne`. 

##Métricas compuestas

Las métricas compuestas reciben una opción adicional, `composite_action`, para indicar al filtro exactamente qué hacer con la métrica compuesta. 
Las opciones aceptables son: 

composite_action  | Descripción 
------------ | ------------- 
`any` | Filtra según CUALQUIER métrica de la compuesta.  Por ejemplo, si tenemos lt y un cutoff de 5, entonces si CUALQUIER métrica es menor que 5, devolvemos True.
`all` | Filtra según TODAS las métricas.  Por ejemplo, si usamos el mismo ejemplo de arriba con ALL, entonces TODAS las métricas de la compuesta deben ser menores que 5 para pasar el filtro.
`metric_name` | Puede ser cualquier nombre de compuesta.  Consulta cada compuesta para más información.  En el caso de la [[CompositeEnergyMetric]], puede ser cualquier nombre de término de puntuación.  Esto nos permite filtrar según cualquier nombre de métrica calculada por la métrica compuesta. 


[[include:filter_SimpleMetricFilter_type]]

##Ejemplo: 

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
		<RMSDMetric name="rmsd" rmsd_type="rmsd_protein_bb_heavy" residue_selector="L1" use_native="1"/>
		<SasaMetric name="sasa" residue_selector="L1"/>
		<SecondaryStructureMetric name="ss" residue_selector="L1" />
		<TotalEnergyMetric name="total_energy" residue_selector="L1" use_native="0"/>
		<CompositeEnergyMetric name="composite_energy" residue_selector="L1" use_native="0"/>
	</SIMPLE_METRICS>
	<MOVERS>
		<MinMover name="min_mover" tolerance=".1" movemap_factory="movemap_L1"/> 
	</MOVERS>
	<FILTERS>
		<SimpleMetricFilter name="sasa_filter" metric="sasa" cutoff="100" comparison_type="gt"/>
		<SimpleMetricFilter name="delta_energy" metric="total_energy" cutoff="5" comparison_type="lt"/>
		<SimpleMetricFilter name="composite_all" metric="composite_energy" cutoff="100" composite_action="all" comparison_type="lt"/>
		<SimpleMetricFilter name="ss_filter" metric="ss" match="LLLLLLLLLLL"  comparison_type="ne"/>
		<SimpleMetricFilter name="rmsd_filter" metric="rmsd" cutoff="0.5" comparison_type="lt" />

	</FILTERS>
	<PROTOCOLS>
		<Add mover_name="min_mover" />
		<Add filter_name="sasa_filter" />
		<Add filter_name="delta_energy" />
		<Add filter_name="composite_all" />
		<Add filter_name="ss_filter" />
		<Add filter_name="rmsd_filter" />
	</PROTOCOLS>
</ROSETTASCRIPTS>

```

##Véase también

* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[SimpleMetricFilter]]: filtro según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[Mover|Movers-RosettaScripts]]: movers disponibles
* [[I want to do x]]: guía para elegir un mover
