# Término de penalización de huecos (voids\_penalty)
Documentación creada por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker, el 21 de diciembre de 2017.

**Nota:** el término de energía ```voids_penalty``` todavía no está publicado.  Si lo usas para algo interesante, incluye a Vikram K. Mulligan en tu lista de autores.

[[_TOC_]]

## Propósito y algoritmo

El término de puntuación ```voids_penalty``` está pensado para usarse durante el diseño, con el fin de penalizar los huecos o cavidades enterrados y guiar al packer hacia soluciones de diseño en las que todo el volumen enterrado esté ocupado por cadenas laterales.  La identificación de huecos enterrados no es descomponible por pares por naturaleza.  Este término de puntuación está pensado para funcionar con los cambios de Alex Ford al packer, que permiten usar durante el empaquetado o el diseño términos de puntuación de cálculo rápido pero no descomponibles por pares.

Normalmente, la identificación de huecos enterrados también es lenta por naturaleza, lo que hace difícil penalizarlos de un modo que permita una evaluación rápida y repetida durante el millón de pasos, aproximadamente, de una trayectoria del packer.  Afortunadamente, buena parte del costo computacional se puede desviar a un precálculo, y ese es el enfoque adoptado aquí.  En realidad, el término de puntuación se comporta de manera distinta en el empaquetado, la puntuación y la minimización, como se explica a continuación:

### Comportamiento durante el empaquetado

#### Precálculo

Los pasos del precálculo son costosos computacionalmente: requieren hasta unos pocos segundos de CPU y escalan linealmente con el volumen (en vóxeles) del Pose y el número de rotámeros.  El enfoque es el siguiente:

1.  Se superpone una cuadrícula de vóxeles al Pose.  El tamaño de vóxel predeterminado es 0.5 Angstroms, aunque el usuario puede configurarlo.
2.  Los vóxeles se clasifican como «enterrados» o «no enterrados» con el método de los conos de vecinos de la cadena lateral.  Resumidamente, consiste en proyectar un cono a lo largo de cada vector Calpha-Cbeta, contar el número de conos superpuestos que contienen un vóxel dado y contar ese vóxel como enterrado si el número es mayor o igual que un umbral definido por el usuario (6 conos por defecto).  Se calcula y se almacena el volumen enterrado total, que es el volumen que intentamos llenar con cadenas laterales.
3.  Se examinan todas las posiciones no empaquetables.  Para cada residuo no empaquetable, se quitan del conjunto de enterrados todos los vóxeles enterrados con los que ese residuo se superpone, y se actualiza en consecuencia el volumen enterrado total almacenado.  Esto asegura que no intentaremos llenar un volumen que ya está ocupado por residuos no empaquetables.
4.  Se examinan todos los rotámeros candidatos.  Para cada rotámero, se cuenta el número de vóxeles enterrados con los que se superpone y se usa para determinar un volumen para ese rotámero.  Estos volúmenes se almacenan.
5.  Cualquier vóxel que no toque ningún rotámero se quita del conjunto de enterrados, y el volumen enterrado total se actualiza para reflejar esta poda.  Esto asegura que el volumen inalcanzable no distorsione el cálculo.

Al final del precálculo tenemos (a) un valor para el volumen enterrado total (al que llamaremos ```V```) y (b) un número para el volumen enterrado de cada rotámero, al que llamaremos ```v(i,j)``` para el volumen del j-ésimo rotámero en la posición i.  En este punto se descarta la cuadrícula de vóxeles para liberar memoria, y entonces comienza la trayectoria del packer.

#### Cálculo durante la trayectoria del packer

Durante la trayectoria del packer, el término de energía ```voids_penalty``` impone una penalización que crece cuadráticamente con la diferencia entre el volumen enterrado total que intentamos llenar (```V```) y la suma de los volúmenes enterrados de los rotámeros que se están considerando en ese momento (```sum_over_i( v(i,s_i)``` ), donde ```s``` es un vector de índices de los rotámeros considerados actualmente.  El efecto es guiar al packer hacia soluciones en las que la suma de los volúmenes enterrados de los rotámeros actuales coincide con el volumen total por llenar, _es decir_, soluciones sin huecos ni cavidades enterrados.  Como ```V``` y ```v(i,s_i)``` están precalculados, ```( V-sum_over_i( v(i,s_i) ) )^2``` es extremadamente rápido de calcular sobre la marcha en cada paso de la trayectoria del packer.

Ten en cuenta que probablemente existan soluciones del packer en las que el volumen total de los rotámeros coincide con el volumen total por llenar, pero que aun así dejan huecos (porque algunos residuos se superponen).  Otros términos de energía, como ```fa_rep```, actúan en contra de esas soluciones.  Las únicas soluciones que dan puntuaciones ```fa_rep``` bajas _y_ puntuaciones ```voids_penalty``` bajas tienen pocas cavidades.  (Sin embargo, el término de puntuación puede guiar al packer hacia soluciones que se habrían descartado por tener puntuaciones ```fa_rep``` ligeramente positivas.  Esto es una característica, no un error: significa que se pueden seleccionar soluciones con pequeños choques que se pueden resolver con minimización para dar un empaquetado bueno y sin huecos.)

#### Velocidad global durante el empaquetado

En un benchmark con treinta y seis Poses de 100 residuos con diseño completo de los residuos del núcleo y del límite usando [[FastDesign|FastDesignMover]], el término de energía ```voids_penalty``` produjo una ralentización del 23% con una cuadrícula de vóxeles de 0.5 Angstroms (el valor predeterminado).  Esto aumenta hasta una ralentización del 60% cuando el término se activa durante la puntuación normal (véase la sección siguiente).

### Comportamiento durante la puntuación

El comportamiento predeterminado del término de energía ```voids_penalty``` es no hacer nada durante la puntuación normal; es decir, este término de puntuación devuelve 0 por defecto durante la puntuación y solo sirve para guiar al packer hacia buenas soluciones sin huecos.  Sin embargo, el usuario puede activar opcionalmente ```voids_penalty``` durante la puntuación normal con la opción ```-score:voids_penalty_energy_disabled_except_during_packing false```.  En ese caso, cada vez que se puntúe el Pose ocurrirán los siguientes pasos:

1.  Se superpone una cuadrícula de vóxeles (tamaño de vóxel predeterminado de 0.5 Angstroms) al Pose.
2.  Los vóxeles se clasifican como «enterrados» o «no enterrados» con el método de los conos de vecinos de la cadena lateral, como se describió arriba.  Se calcula y se almacena el volumen de los vóxeles enterrados, ```V```.
3.  Para cada residuo, se cuenta el número de vóxeles enterrados que se superponen con el residuo para calcular el volumen enterrado del residuo.  Se calcula y se almacena la suma de los volúmenes enterrados de todos los residuos, ```v```.
4.  Se calcula y se devuelve una función de penalización cuadrática ```( V - v )^2```.

Hay dos puntos importantes que conviene señalar sobre este algoritmo de puntuación:
* Es lento.  Como hay que hacer un cálculo volumétrico en _cada_ evaluación de la función de puntuación, lo mejor es dejar desactivada la puntuación a menos que de verdad se necesite.
* Es ligeramente distinto del método usado durante el empaquetado, ya que en una evaluación normal de la función de puntuación no existe el concepto de conjunto de rotámeros y, por lo tanto, no hay manera de podar el volumen «inalcanzable».  Por ello, la puntuación devuelta refleja la fracción del volumen total que está llena, no la fracción del volumen alcanzable que está llena.

### Comportamiento durante la minimización

El término de energía ```voids_penalty``` no define derivadas por ahora.  Por eso, actualmente está fijado en el código para estar completamente desactivado durante las trayectorias de minimización, en cualquier circunstancia.  Esto significa que no se evalúa innecesariamente durante la minimización de línea, aunque también es concebible que el minimizador introduzca huecos que no estaban presentes durante el empaquetado.

## Control por parte del usuario

### Control básico

En el caso más sencillo, el término de energía ```voids_penalty``` se invoca simplemente activándolo (_es decir_, dándole a ```voids_penalty``` un peso distinto de cero) en la función de puntuación que use cualquier módulo de diseño de Rosetta que invoque al packer de Rosetta.  (Tales módulos incluyen la [[aplicación fixbb|fixbb]], el [[PackRotamersMover]], el [[mover FastDesign|FastDesignMover]], _etc._)  La reponderación se puede hacer con un archivo de pesos pasado en la línea de comandos, o en la sección ```<SCOREFXNS>``` de un script XML de RosettaScripts.  Por ejemplo, la simple adición de la línea comentada en el siguiente script penaliza los huecos:

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
		<ScoreFunction name="r15_voids" weights="ref2015.wts" >
			<Reweight scoretype="voids_penalty" weight="0.25" /> # This is the only line that must be added to convert this design script to one that penalizes voids during design.
		</ScoreFunction>
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
		<Layer name="select_surf" select_core="false" select_boundary="false" select_surface="true" />
	</RESIDUE_SELECTORS>
	<TASKOPERATIONS>
		<OperateOnResidueSubset name="no_repack_surf" selector="select_surf" >
			<PreventRepackingRLT />
		</OperateOnResidueSubset>
		<ReadResfile name="allowed_for_design" filename="inputs/design.resfile" />
	</TASKOPERATIONS>
	<MOVERS>
		<FastDesign name="design" scorefxn="r15_voids" repeats="1" task_operations="no_repack_surf,allowed_for_design" />
	</MOVERS>
	<APPLY_TO_POSE>
	</APPLY_TO_POSE>
	<PROTOCOLS>
		<Add mover="design" />
	</PROTOCOLS>
	<OUTPUT scorefxn="r15_voids" />
</ROSETTASCRIPTS>

```

El peso proporcionado gobierna el grado en que se penalizan los huecos.  Si es demasiado bajo, el comportamiento se vuelve indistinguible del diseño sin el término.  Si es demasiado alto, los huecos se penalizan tan fuertemente que podrían aceptarse rotámeros de alta energía, choques u otras características que dan puntuaciones energéticas altas con tal de cumplir el requisito de que no haya huecos.  El enfoque recomendado es usar un valor entre 0.05 y 1.0, ajustado por ensayo y error para producir resultados con buenas energías y relativamente pocos huecos.

### Diseño de subregiones de Poses

Ten en cuenta que, como los vóxeles inalcanzables y los vóxeles ocupados por residuos no diseñables se podan automáticamente, la configuración sencilla descrita arriba es todo lo que se necesita incluso cuando se usan operaciones de tarea para restringir el diseño a subregiones de un Pose.

### Opciones avanzadas

Algunas opciones permiten al usuario ajustar la definición de un vóxel enterrado, la resolución de la cuadrícula de vóxeles usada para el diseño, o configurar de otro modo el término de energía ```voids_penalty```.  Ten en cuenta, sin embargo, que los valores predeterminados se han elegido para funcionar en la mayoría de las situaciones, por lo que rara vez debería ser necesario apartarse de ellos.  No obstante, los parámetros configurables se enumeran a continuación y se pueden fijar globalmente en la línea de comandos, o para una función de puntuación concreta mediante la interfaz de RosettaScripts (o mediante EnergyMethodOptions en PyRosetta):

| Opción | Tipo  | Descripción |
| ------ | ----- | ----------- |
| voids_penalty_energy_voxel_size                     | Real    | El tamaño, en Angstroms, de los vóxeles usados en la cuadrícula de vóxeles para la energía ```voids_penalty```.  Por defecto es 0.5 A (un cubo de 0.5 Angstroms de lado). |
| voids_penalty_energy_voxel_grid_padding             | Real    | Es el agrandamiento (en todos los lados) de la caja delimitadora del Pose al configurar la cuadrícula de vóxeles.  Por defecto es 1.0 A de relleno en todos los lados. |
| voids_penalty_energy_containing_cones_cutoff        | Integer | El número mínimo de conos proyectados desde cadenas laterales en los que debe estar un vóxel para que ese vóxel se considere enterrado.  Por defecto es 6 conos. |
| voids_penalty_energy_cone_dotproduct_cutoff         | Real    | El valor de corte del producto escalar de un vector de cono y un vector de base del cono al punto de prueba, por debajo del cual declaramos que el punto de prueba no está dentro del cono.  En la práctica, es el ancho del cono.  Los valores más bajos dan conos más anchos.  Por defecto 0.1.  Puede ir de 1.0 (cono infinitamente delgado) a -1.0 (volumen esférico completo), y 0.0 representa todos los puntos de un lado del plano perpendicular al vector del cono. |
| voids_penalty_energy_cone_distance_cutoff           | Real    | El valor de corte de la distancia desde la base del cono a partir de la cual se considera que ya no estamos dentro del cono.  Por defecto es 8.0 Angstroms. |
| voids_penalty_energy_disabled_except_during_packing | Boolean | Si es true, el término ```voids_penalty``` solo se evalúa durante el empaquetado (y no en la puntuación ni en la minimización).  Si es false, se evalúa durante el empaquetado y la puntuación (pero no en la minimización).  Es true por defecto.  Se puede anular para una ScoreFunction concreta en cada instancia. |

El siguiente XML de RosettaScripts de ejemplo muestra cómo se podrían fijar estas opciones para una función de puntuación concreta (en lugar de globalmente) dentro de RosettaScripts.

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
		<ScoreFunction name="r15_voids" weights="ref2015.wts" >
			<Reweight scoretype="voids_penalty" weight="0.25" />
			# The following settings are set ONLY for the r15_voids scorefunction, and will not affect other scorefunctions.
			<Set voids_penalty_energy_containing_cones_cutoff="5" />
			<Set voids_penalty_energy_cone_dotproduct_cutoff="0.05" />
			<Set voids_penalty_energy_cone_distance_cutoff="9.0" />
			<Set voids_penalty_energy_voxel_size="0.25" />
			<Set voids_penalty_energy_voxel_grid_padding="0.5" />
			<Set voids_penalty_energy_disabled_except_during_packing="false" />
		</ScoreFunction>
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
		<Layer name="select_surf" select_core="false" select_boundary="false" select_surface="true" />
	</RESIDUE_SELECTORS>
	<TASKOPERATIONS>
		<OperateOnResidueSubset name="no_repack_surf" selector="select_surf" >
			<PreventRepackingRLT />
		</OperateOnResidueSubset>
		<ReadResfile name="allowed_for_design" filename="inputs/design.resfile" />
	</TASKOPERATIONS>
	<MOVERS>
		<FastDesign name="design" scorefxn="r15_voids" repeats="1" task_operations="no_repack_surf,allowed_for_design" />
	</MOVERS>
	<APPLY_TO_POSE>
	</APPLY_TO_POSE>
	<PROTOCOLS>
		<Add mover="design" />
	</PROTOCOLS>
	<OUTPUT scorefxn="r15_voids" />
</ROSETTASCRIPTS>

```

## Uso con simetría

La función de puntuación ```voids_penalty``` es totalmente compatible con la simetría.  Por desgracia, la simetría no acelera de manera significativa el precálculo, ya que hay que cuantificar el volumen de cada una de las copias simétricas de los rotámeros debido a las pequeñas asimetrías que introduce la discretización del espacio en una cuadrícula de vóxeles.  Sin embargo, sí acelera ligeramente el cálculo que se realiza en cada movimiento del recocido simulado, ya que 
la suma de los volúmenes de los rotámeros simétricos se puede precalcular.

## Organización del código

La función de puntuación ```voids_penalty``` se encuentra en ```core.4``` y en el espacio de nombres ```core::pack::guidance_scoreterms::voids_penalty_energy```.  Las clases relevantes (ubicadas en este espacio de nombres) son ```VoidsPenaltyEnergy```, que es un método de energía que hereda de ```core::scoring::methods::WholeStructureEnergy``` y de ```core::scoring::annealing::ResidueArrayAnnealableEnergy```, y ```VoidsPenaltyVoxelGrid```, una clase auxiliar que se usa para colocar una cuadrícula de vóxeles sobre un Pose, podar los vóxeles no enterrados, calcular el volumen enterrado y calcular los volúmenes de los rotámeros enterrados.  Cada instancia de la clase ```VoidsPenaltyEnergy``` crea de forma transitoria una instancia de ```VoidsPenaltyVoxelGrid``` durante la inicialización del packer o durante la puntuación (esto último si y solo si se usa la opción ```-voids_penalty_energy_disabled_except_during_packing false```).

Ten en cuenta que la implementación de la clase ```VoidsPenaltyEnergy``` exigió que la clase base ```ResidueArrayAnnealableEnergy```, definida en ```core.3```, conociera la existencia de la clase ```core::pack::rotamer_set::RotamerSets```, definida en ```core.4``` (aunque _no_ fue necesaria la inclusión completa de la cabecera).  Por esta razón, se añadió una declaración adelantada de la clase ```RotamerSets``` al directorio ```src/core/scoring/annealing```, una violación menor pero necesaria de las convenciones de espacios de nombres y niveles de biblioteca de Rosetta que _no_ afecta de forma significativa al tiempo ni a la complejidad de la compilación.

##Véase también

* [[Scoring explained]]
* [[Score functions and score types |score-types]]
* [[Adding a new energy method to Rosetta|new-energy-method]]
* [[Design-centric guidance terms|design-guidance-terms]]
* [[AACompositionEnergy]]
* [[AARepeatEnergy|Repeat-stretch-energy]]
* [[BuriedUnsatPenalty]]
* [[HBNetEnergy]]
* [[NetChargeEnergy]]
