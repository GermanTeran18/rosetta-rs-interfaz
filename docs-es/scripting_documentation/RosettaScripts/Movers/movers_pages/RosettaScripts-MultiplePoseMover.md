#MultiplePoseMover (RosettaScripts)
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
##MultiplePoseMover (RosettaScripts)

[[Volver a RosettaScripts|RosettaScripts]]

[[Volver a los movers de RosettaScripts|Movers-RosettaScripts]]

[[_TOC_]]

MultiplePoseMover permite implementar en un único RosettaScript un protocolo de varios pasos de «distribuir y recoger».
Ejemplos de estos protocolos son ab initio seguido de agrupamiento y docking seguido de diseño, que se describen con más detalle a continuación.

## Resumen

Primero, MultiplePoseMover recoge todos los Poses del mover anterior del protocolo (el indicado en la sección PROTOCOLS del RosettaScript).
Después, se seleccionan Poses del conjunto completo mediante los Pose Selectors definidos en la etiqueta SELECT.
Luego, el subprotocolo especificado en la etiqueta ROSETTASCRIPT se ejecuta sobre todos los Poses seleccionados.
Los Poses para los que el protocolo tiene éxito se pasan a otro mover para seguir procesándolos, o al Job Distributor para su salida a almacenamiento persistente.

Tanto la etiqueta SELECT como la etiqueta ROSETTASCRIPTS son opcionales.
Por tanto, este mover también puede usarse para «ramificar» sin ningún criterio de selección (es decir, generar muchos Poses derivados a partir de uno o más Poses de entrada) o puramente como selector para reducir el conjunto de Poses según algún criterio.

Se pueden conectar varios MultiplePoseMovers consecutivamente para varios pasos de distribuir y recoger. El subprotocolo también puede contener uno o más MultiplePoseMovers.

Puntos a tener en cuenta:

-   El mover anterior debe poder generar más de un Pose, o no será posible ramificar.
    Los movers que no tienen esta capacidad pueden envolverse con MultipleOutputWrapper, que llama repetidamente al mover contenido para generar Poses adicionales.

-   Actualmente este mover funciona con un solo hilo, mantiene todos los Poses en memoria y no admite checkpoints para reanudar. Por tanto, no está diseñado para operar sobre 100,000 Poses. Estás avisado.

## Sintaxis XML general

MultiplePoseMover entiende dos etiquetas hijas.
Los criterios de selección de Poses se definen dentro de la etiqueta SELECT, mientras que un protocolo normal de RosettaScript vive dentro de la etiqueta ROSETTASCRIPTS.
Ambas etiquetas son opcionales, pero al menos una debe estar presente; de lo contrario, se convierte en un mover nulo con caché y se generará una advertencia.

```xml
<MultiplePoseMover name="(&string)" max_input_poses="(&integer)">
    <SELECT>
    ...
    </SELECT>
    <ROSETTASCRIPTS>
    	<IMPORT movers="(&string)" filter="(&string)"/>
    ...
    </ROSETTASCRIPTS>
</MultiplePoseMover>
```

-   max\_input\_poses: número máximo de Poses que este mover aceptará del mover anterior. Por defecto acepta todos los Poses que dé el mover anterior.

## Etiqueta SELECT

Los Poses se seleccionan del conjunto completo de Poses recogidos usando un único selector, que se define dentro de la etiqueta SELECT.
Pueden usarse selectores lógicos para construir sentencias compuestas para, por ejemplo, seleccionar Poses que tengan la propiedad (X e Y) o Z.

### Pose Selectors

- AndSelector: selector lógico AND; se selecciona un Pose si lo eligen TODOS los selectores hijos definidos.
- OrSelector: selector lógico OR; se selecciona un Pose si lo elige ALGUNO de los selectores hijos definidos.
- TopNByProperty: selecciona los n mejores Poses del conjunto según alguna propiedad. Este selector se usa con un PosePropertyReporter.
- ClusterPoseSelector: agrupa los Poses según alguna propiedad (p. ej., RMSD) y selecciona Poses de los centros de los clústeres. Este selector se usa con un PosePropertyReporter.

Más detalles abajo.

### Pose Property Reporters

- EnergyReporter: informa de cualquier término de puntuación o de la puntuación total del Pose.
- FilterReporter: usa el valor de cualquier filtro de RosettaScripts (p. ej., complementariedad de forma, SASA, ...).
- RMSDReporter: informa del RMSD de dos Poses.

## Etiqueta IMPORT

Para evitar declaraciones redundantes de filtros y movers, la etiqueta IMPORT puede usarse para importar por su nombre filtros y movers definidos previamente.
La declaración que se va a importar debe estar en algún lugar más arriba en la jerarquía del script (cualquier ancestro, pero no un hermano).

Ejemplo:

```xml
<IMPORT movers="repack" filters="filter1,filter2"/>
```

## Pose Selectors

### AndSelector y OrSelector

Estos selectores se usan para construir sentencias lógicas compuestas.
Se definen uno o más subselectores en etiquetas hijas y se evaluarán en el orden indicado.
Se selecciona un Pose si todos (AndSelector) o alguno (OrSelector) de los selectores definidos lo eligen.

```xml
<AndSelector>
  <SomeOtherSelector>
    ...
  </SomeOtherSelector>
  <SomeOtherSelector>
    ...
  </SomeOtherSelector>
  ...
</AndSelector>
```

### TopNByProperty

Este selector se usa para seleccionar los n mejores Poses según alguna propiedad, sin especificar explícitamente ningún valor umbral.
Usa el PosePropertyReporter definido para clasificar todos los Poses recogidos del conjunto y luego elige los n mejores.

```xml
<TopNByProperty n="(&integer)" order="(&string)">
  # A PosePropertyReporter (for example, EnergyReporter) must be defined here.
</TopNByProperty>
```

-   n: número de «mejores» Poses que se seleccionan.
-   order: orden de clasificación, ascendente (por defecto) o descendente.

### ClusterPoseSelector

Este selector agrupa todos los Poses recogidos según alguna propiedad, como el RMSD.
Usa el pose property reporter definido para evaluar la similitud de dos Poses.
Los Poses similares se colocan en el mismo clúster.
Para el agrupamiento se usa el algoritmo de clústeres de Phil Bradley. Consulta la aplicación cluster para más detalles.

```xml
<ClusterPoseSelector radius="(&Real)" structures_per_cluster="(&integer)" remove_singletons="(&boolean)" initial_cluster_set_size="(&integer)" max_cluster_size="(&integer)"  max_clusters="(&integer)"  max_structures="(&integer)">
  # A PosePropertyReporter (for example, EnergyReporter) must be defined here.
</ClusterPoseSelector>
```

- radius: radio de corte para la similitud entre Poses. La unidad depende del reporter usado. Para RMSDReporter el radio está en Å. Este parámetro es obligatorio. Sin valor por defecto.
- remove\_singletons: elimina los clústeres que solo contienen una estructura. Por defecto: false.
- structures\_per\_cluster: número de estructuras que se seleccionan de cada clúster, empezando por el centro del clúster. Por defecto: 1.
- initial\_cluster\_set\_size: número máximo de estructuras que se usan en el paso inicial de agrupamiento. Las estructuras adicionales se asignan a clústeres más tarde. Por defecto: 400.
- max\_cluster\_size: número máximo de Poses que se colocan en un clúster. Por defecto: sin límite.
- max\_clusters: número máximo de clústeres que se generan. Por defecto: sin límite.
- max\_structures: número máximo de estructuras que se seleccionan. Por defecto: sin límite.

## Pose Property Reporters

Los PosePropertyReporters informan de un único valor Real para una propiedad dada del Pose o para la similitud entre dos Poses.

### EnergyReporter

Este reporter puntúa el Pose y devuelve la puntuación total del Pose o un término concreto.

```xml
<EnergyReporter scorefunction="(&string)" term="(&string)"/>
```

- scorefunction: la función de puntuación que se usa. Ten en cuenta que este es el nombre de un archivo de pesos, NO de una función de puntuación definida previamente en el script. (Es probable que esto cambie en el futuro).
- term: el término de puntuación del que se informa, o total_score. Por defecto: total_score.

### FilterReporter

Este reporter usa cualquier filtro de RosettaScripts capaz de expresar como número real la propiedad que mide.
El filtro debe estar definido en la sección FITLERS y referenciarse aquí por el nombre dado en la definición.

```xml
<FilterReporter filter="(&string)"/>
```

- filter: nombre del filtro que se usa.

### RMSDReporter

ClusterPoseSelector usa este reporter para calcular la similitud de dos Poses en términos de RMSD.

```xml
<RMSDReporter mode="(&string)" residues="(&string)"/>
```

- mode: CA o all_atom (obligatorio).
- residues: lista de residuos que se incluyen, con el formato 1-20,40-100. Por defecto: todos los residuos.



## Ejemplos completos

### Ab initio clásico con agrupamiento

En este ejemplo, el protocolo ab initio clásico genera el número deseado de modelos ab initio (paso 1).
Después, esos modelos se agrupan por RMSD (paso 2) y se genera un modelo del centro de cada clúster.

La primera instancia de MultiplePoseMover, con el nombre "abinito_protocol", se usa para ramificar, mientras que la segunda instancia del mover, con el nombre "cluster", se usa puramente para selección/filtrado de Poses.
Si los Poses seleccionados debieran procesarse más, se podría añadir un bloque ROSETTASCRIPT al MultiplePoseMover "cluster", o se podría añadir un tercer mover MultiplePoseMover a la sección PROTOCOLS principal.

El protocolo ab initio del paso 1 (bloque ROSETTASCRIPTS en el MultiplePoseMover de nombre abinito_protocol) es un copiar y pegar casi literal del protocolo ab initio clásico de los demos.

Para fines de demostración se usa un radio de clúster bastante grande para mantener un tiempo de ejecución razonable (~2 minutos en total).

```
Example command line:
rosetta_scripts.linuxgccrelease -fasta 1a19a.fasta -parser:protocol abinito_cluster.xml -database ../database/

Step 1: Classic Abinitio

A ClassicAbinitio-like protocol that operates in 5 stages. The MoveMap parameter
to SingleFragmentMover (SFM) can be used to control backbone torsion flexibility.
SFMs policy parameter specifies the strategy used to select from the numerous
fragments at a given insertion position. "uniform" selects uniformly among the
possibilities. "smooth" chooses the fragment that, when inserted, minimizes
distortion to the pose.

Overview:
Stage 1 : 9mers, score0.wts_patch, 2000 cycles, uniform policy
Stage 2 : 9mers, score1.wts_patch, 2000 cycles, uniform policy
Stage 3a: 9mers, score2.wts_patch, 2000 cycles, uniform policy
Stage 3b: 9mers, score5.wts_patch, 2000 cycles, uniform policy
Stage 4 : 3mers, score3.wts_patch, 4000 cycles, smooth policy

Step 2: Clustering

Cluster all generated structures (100) by RMSD, pick the model at the cluster center for diversity.

<ROSETTASCRIPTS>

  <MOVERS>
		
		Step 1: 10 classic ab initio runs, i.e. the classic abitio rosetta scripts protocol from the demos
		This is wrapper with the AdditionalOutputMover to generate 100 poses
		
		<MultipleOutputWrapper name=abinito max_output_poses=100>

			Cut and paste from Classic Abinitio demo XML
			
			<ROSETTASCRIPTS>
				<SCOREFXNS>
					<score0 weights="score0"/>
					<score1 weights="score1"/>
					<score2 weights="score2"/>
					<score3 weights="score3"/>
					<score5 weights="score5"/>
				</SCOREFXNS>
				<FILTERS>
				</FILTERS>
				<MOVERS>
					Defines the base mover for small fragments (typically 3-mers)
					<SingleFragmentMover name="sfm_small" fragments="aa1a19a03_05.200_v1_3" policy="smooth">
						<MoveMap>
							<Span begin=1 end=89 chi=1 bb=1/>
						</MoveMap>
					</SingleFragmentMover>

					Defines the base mover for large fragments (typically 9-mers)
					<SingleFragmentMover name="sfm_large" fragments="aa1a19a09_05.200_v1_3" policy="uniform">
						<MoveMap>
							<Span begin=1 end=89 chi=1 bb=1/>
						</MoveMap>
					</SingleFragmentMover>

					Wrap the base movers in GenericMonteCarlo objects for scoring
					<GenericMonteCarlo name="stage1"  scorefxn_name="score0" mover_name="sfm_large" temperature=2.0 trials=2000/>
					<GenericMonteCarlo name="stage2"  scorefxn_name="score1" mover_name="sfm_large" temperature=2.0 trials=2000/>
					<GenericMonteCarlo name="stage3a" scorefxn_name="score2" mover_name="sfm_large" temperature=2.0 trials=2000/>
					<GenericMonteCarlo name="stage3b" scorefxn_name="score5" mover_name="sfm_large" temperature=2.0 trials=2000/>
					<GenericMonteCarlo name="stage4"  scorefxn_name="score3" mover_name="sfm_small" temperature=2.0 trials=4000/>

					Converts the centroid-level pose to fullatom for scoring
					<SwitchResidueTypeSetMover name=fullatom set=fa_standard/>
				</MOVERS>
				<APPLY_TO_POSE>
				</APPLY_TO_POSE>
				<PROTOCOLS>
					<Add mover=stage1/>
					<Add mover=stage2/>
					<Add mover=stage3a/>
					<Add mover=stage3b/>
					<Add mover=stage4/>
					<Add mover=fullatom/>
				</PROTOCOLS>
			</ROSETTASCRIPTS>

		</MultipleOutputWrapper>

		Step 2: Cluster poses and pick center structure from each cluster
		Large cluster radius is used here only for demo purposes since there are only 100 total structures
		
		<MultiplePoseMover name=cluster>
			<SELECT>
				<ClusterPoseSelector structures_per_cluster=1 radius=10 remove_singletons=true>
					<RMSDReporter mode=CA/>
				</ClusterPoseSelector>
			</SELECT>
		</MultiplePoseMover>
		
  </MOVERS>
  
  <PROTOCOLS>
    <Add mover_name=abinito/>
    <Add mover_name=cluster/>
  </PROTOCOLS>
  
</ROSETTASCRIPTS>
```

##Véase también

* [[MultiplePoseMover]]
* [[MultipleOutputWrapperMover]]
* [[JD2]]: el distribuidor de trabajos
* [[ResourceManager]]
