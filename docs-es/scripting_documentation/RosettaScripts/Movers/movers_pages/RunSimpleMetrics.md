# RunSimpleMetrics
*Volver a la página de [[SimpleMetrics]].*
*Volver a la página de [[Movers | Movers-RosettaScripts]].*
## RunSimpleMetrics

## Referencia
**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]]

Ejecuta un conjunto de [[SimpleMetrics]] y añade los datos al Pose para su salida al scorefile/tabla de puntuaciones. Fija prefix/suffix para generar el conjunto con una etiqueta concreta. Se recomienda usar la salida de scorefile en JSON para facilitar el análisis en Python, especialmente con pandas: `-scorefile_format json`

Usa las opciones prefix/suffix para agrupar métricas o para ejecutar métricas en distintos puntos de un protocolo. Cada SimpleMetric también tiene una opción `custom_type`, que puede usarse para ejecutar durante `RunSimpleMetrics` varias configuraciones de un mismo tipo de SimpleMetric. Cualquier opción prefix, suffix y custom_type que se fije se añade a la etiqueta de datos del scorefile.

Consulta [[Uso eficaz de SimpleMetrics | SimpleMetrics#effective-use-of-simplemetrics]] para más información. 


[[include:mover_RunSimpleMetrics_type]]

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
		<TimingProfileMetric name="timing" />
		<RMSDMetric name="rmsd" rmsd_type="rmsd_protein_bb_heavy" residue_selector="L1" use_native="1"/>
		<SasaMetric name="sasa" residue_selector="L1"/>
		<DihedralDistanceMetric name="dihedral" residue_selector="L1" use_native="1"/>
		<SelectedResiduesMetric name="selection" residue_selector="L1"/>
		<SelectedResiduesMetric name="rosetta_sele" residue_selector="L1" rosetta_numbering="1"/>
		<SelectedResiduesPyMOLMetric name="pymol_selection" residue_selector="L1" />
		<SequenceMetric name="sequence" residue_selector="L1" />
		<SecondaryStructureMetric name="ss" residue_selector="L1" />
		<TotalEnergyMetric name="total_energy" residue_selector="L1" />
		<CompositeEnergyMetric name="composite_energy" residue_selector="L1" use_native="1"/>
	</SIMPLE_METRICS>
	<MOVERS>
		<MinMover name="min_mover" movemap_factory="movemap_L1" tolerance=".1" /> 
		<RunSimpleMetrics name="run_metrics1" metrics="sasa,pymol_selection,sequence,ss,total_energy,rosetta_sele" prefix="m1_" />
		<RunSimpleMetrics name="run_metrics2" metrics="sasa,selection,pymol_selection,sequence,ss,total_energy,rmsd,dihedral,composite_energy" prefix="m2_" />
	</MOVERS>
	<PROTOCOLS>
		<Add mover_name="run_metrics1"/>
		<Add mover_name="min_mover" />
		<Add mover_name="run_metrics2" />
	</PROTOCOLS>
</ROSETTASCRIPTS>
```

##Véase también

* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[SimpleMetricFilter]]: filtra por una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[Mover|Movers-RosettaScripts]]: movers disponibles
* [[I want to do x]]: guía para elegir un mover