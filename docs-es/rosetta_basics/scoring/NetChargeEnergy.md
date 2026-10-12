# Energía de carga neta (netcharge) 
Documentación creada por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker, el 26 de noviembre de 2017.

<i>Nota: esta página documenta el término de energía ```netcharge```.  Para información sobre el filtro NetCharge, consulta [[esta página|NetChargeFilter]].</i>

<b><i>Ten en cuenta también: el término de energía ```netcharge``` todavía no está publicado.  Si lo usas en tu proyecto, incluye a Vikram K. Mulligan como autor.</i></b>

[[_TOC_]]

## Propósito y algoritmo

Este término de puntuación está pensado para usarse durante el diseño, con el fin de penalizar las desviaciones respecto de una carga neta deseada en un Pose o en una región. Por ejemplo, un usuario podría especificar que una proteína tenga una carga neta global de +1, pero que una interfaz de unión tenga una carga neta de -2.  Como es una puntuación y no un algoritmo de diseño, se puede usar junto con cualquier algoritmo de diseño existente que emplee el packer (incluidos los movers [[FastDesign|FastDesignMover]] y [[PackRotamers|PackRotamersMover]], o la aplicación [[fixbb]]).  Además, se puede combinar con otros términos de energía que guían el diseño, como [[aa_composition|AACompositionEnergy]].

Calcular una puntuación basada en la carga neta es fácil y rápido (basta con sumar las cargas de todos los aminoácidos de la proteína, tomar la diferencia respecto de la carga deseada y buscar en una tabla la penalización adecuada para esa diferencia), pero el cálculo no es descomponible por pares por naturaleza.  Este término de puntuación está pensado para funcionar con los cambios de Alex Ford al packer, que permiten usar durante el empaquetado o el diseño términos de puntuación de cálculo rápido pero no descomponibles por pares.

## Control por parte del usuario

### Opciones de línea de comandos o control mediante RosettaScripts

Para usar este término, hay que activarlo reponderando `netcharge` a un valor distinto de cero, ya sea en el archivo de pesos que define la función de puntuación, o en la definición de la función de puntuación en RosettaScripts, en PyRosetta o en código C++.

Este término de puntuación se controla mediante archivos ```.charge```, que definen la carga deseada en un Pose o en una subregión de un Pose definida por selectores de residuos.  Si no se proporciona ningún archivo ```.charge```, el término de energía `netcharge` siempre devuelve una puntuación de cero.  Los archivos ```.charge``` que se usarán se pueden proporcionar a Rosetta de tres maneras:
- El usuario puede proporcionar uno o más archivos ```.charge``` como entrada en la línea de comandos con la opción ```-netcharge_setup_file <filename1> <filename2> <filename3> ...```.  Las especificaciones de carga se aplicarán de forma global, a todo el Pose, cada vez que se puntúe con el término de energía `netcharge`.
- El usuario puede proporcionar uno o más archivos ```.charge``` al configurar una función de puntuación concreta en RosettaScripts (o en PyRosetta o en código C++), usando la etiqueta ```<Set>``` para modificar la función de puntuación.  La especificación de carga se aplicará de forma global, a todo el Pose, siempre que se use esa función de puntuación en particular.  Por ejemplo:

```xml
<SCOREFXNS>
	<ScoreFunction name="r15" weights="ref2015.wts" >
		<Reweight scoretype="netcharge" weight="1.0" />
		<Set netcharge_setup_file="inputs/positive_three.charge" />
	</ScoreFunction>
</SCOREFXNS>
```
- El usuario puede asociar archivos ```.charge``` a un Pose con el [[AddNetChargeConstraintMover]].  Estos permanecen asociados al Pose, como cualquier otra restricción, hasta que se borran todas las restricciones con el [[ClearConstraintsMover]], o hasta que se borran solo las restricciones de composición de secuencia con el [[ClearCompositionConstraintsMover]].  Ten en cuenta que a las restricciones de carga neta añadidas con el AddNetChargeConstraintMover también se les puede asociar un [[ResidueSelector|ResidueSelectors]].  Esto permite al usuario definir subregiones del Pose (_p. ej._ una sola hélice, la superficie de la proteína, una interfaz de unión entre subunidades) a las que se aplicará una restricción de carga neta.  El ResidueSelector se evalúa antes de la puntuación o del empaquetado (pero no se evalúa repetidamente durante el empaquetado).  A continuación hay un ejemplo de RosettaScript en el que se usa un LayerSelector para seleccionar la superficie de la proteína, y el AddNetChargeConstraintMover para imponer el requisito de que los residuos de la superficie tengan solo una carga neta de +2:

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
		<ScoreFunction name="r15" weights="ref2015.wts" >
			<Reweight scoretype="netcharge" weight="1.0" />
		</ScoreFunction>
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
		<Layer name="surflayer" select_core="false" select_boundary="false" select_surface="true" core_cutoff="0.5" surface_cutoff="0.25" />
	</RESIDUE_SELECTORS>
	<TASKOPERATIONS>
	</TASKOPERATIONS>
	<FILTERS>
	</FILTERS>
	<MOVERS>
		<AddNetChargeConstraintMover name="netcharge_cst" filename="plustwo.charge" selector="surflayer" />
		
		<FastDesign name=fdes1 scorefxn="r15" repeats="3" >
			<MoveMap name="fdes1_mm">
				<Span begin="1" end="30" chi="1" bb="0" />
			</MoveMap>
		</FastDesign>
	</MOVERS>
	<APPLY_TO_POSE>
	</APPLY_TO_POSE>
	<PROTOCOLS>
		<Add mover="netcharge_cst" />
		<Add mover="fdes1" />
	</PROTOCOLS>
</ROSETTASCRIPTS>

```

Si el usuario emplea más de uno de los métodos descritos arriba, se usarán _todos_ los archivos ```.charge``` proporcionados en la puntuación, siempre que el término de energía `netcharge` esté activado con un peso distinto de cero.  Esto puede ser útil para aplicar requisitos de carga complicados, como: «La carga neta de toda la proteína debe ser +1, pero la carga neta de la primera hélice debe ser -3 y la carga neta del bolsillo de unión debe ser +3».

### Archivo de definición (".charge")

Un archivo `.charge` define una única carga neta deseada, que se puede exigir de forma global o regional dentro de un Pose.  También define la función de penalización que se aplica si la carga neta real se desvía de la deseada.  Esta función de penalización es muy importante: es lo que guía al packer hacia soluciones con la carga neta deseada.  Idealmente, queremos que la función de penalización descienda gradualmente hasta un mínimo en la carga neta deseada.

Un archivo `.charge` _debe_ contener una línea ```DESIRED_CHARGE```, una línea ```PENALTIES_CHARGE_RANGE``` y una línea ```PENALTIES```.  Opcionalmente, también puede contener líneas ```BEFORE_FUNCTION``` y ```AFTER_FUNCTION```.  Cada una de ellas se define a continuación:

|  Línea  |  Descripción |  Ejemplo |
| ------ | ------- | -------- |
| ```DESIRED_CHARGE <signed int>``` | La carga neta deseada para todo el Pose o la región, expresada como un entero con signo.  Esta línea es obligatoria. | ```DESIRED_CHARGE -7 #I want a charge of negative seven in this pose or region.``` |
| ```PENALTIES_CHARGE_RANGE <signed int> <signed int>``` | El rango de cargas netas observadas posibles para el que se definen penalizaciones.  Esta línea es obligatoria. | ```PENALTIES_CHARGE_RANGE -9 -5 #The PENALTIES line will list penalties for observed net charges ranging from -9 to -5.``` |
| ```PENALTIES <real> <real> <real> ...``` | Los valores que el término de energía `netcharge` debe devolver para las cargas netas observadas correspondientes a cada valor del rango definido en la línea ```PENALTIES_CHARGE_RANGE```.  Hay que proporcionar un valor por cada carga del rango.  Esta línea es obligatoria. | ```PENALTIES 100 10 0 5 10 #In this example, much harsher penalties are imposed below the desired net charge than above it.``` |
| ```BEFORE_FUNCTION <string>``` | Fuera del rango de penalizaciones definido en la línea ```PENALTIES_CHARGE_RANGE```, este es el comportamiento de la función de penalización en los valores más negativos.  Las opciones son ```CONSTANT``` (el valor del extremo inferior del rango se repite para cualquier carga observada por debajo del rango), ```LINEAR``` (los dos primeros valores se extrapolan linealmente para los valores por debajo del rango) o ```QUADRATIC``` (los dos primeros valores se ajustan a una parábola y se extrapolan cuadráticamente por debajo del rango).  Esta línea es opcional; si no se especifica, el valor predeterminado es ```QUADRATIC```. | ```BEFORE_FUNCTION QUADRATIC #Ramp quadratically for observed net charges below the range defined.``` |
| ```AFTER_FUNCTION <string>``` | Fuera del rango de penalizaciones definido en la línea ```PENALTIES_CHARGE_RANGE```, este es el comportamiento de la función de penalización en los valores más positivos.  Las opciones son ```CONSTANT``` (el valor del extremo superior del rango se repite para cualquier carga observada por encima del rango), ```LINEAR``` (los dos últimos valores se extrapolan linealmente para los valores por encima del rango) o ```QUADRATIC``` (los dos últimos valores se ajustan a una parábola y se extrapolan cuadráticamente por encima del rango).  Esta línea es opcional; si no se especifica, el valor predeterminado es ```QUADRATIC```. | ```AFTER_FUNCTION LINEAR #Ramp linearly for observed net charges below the range defined.``` |

Ten en cuenta que el archivo ```.charge``` _no_ especifica si la carga neta deseada es una carga neta global o local.  Eso lo determina la manera en que se aplica el archivo ```.charge```: si se aplica con el [[AddNetChargeConstraintMover]] y se proporciona un selector de residuos, definirá la carga esperada en una región del Pose; en caso contrario, se aplicará a todo el Pose.

#### Ejemplo de archivo ```.charge``` que exige una carga neta de 0

El siguiente ejemplo muestra un archivo ```.charge``` que exige que la carga neta de un Pose o una región sea exactamente 0.

```
DESIRED_CHARGE 0 #Desired net charge is zero.
PENALTIES_CHARGE_RANGE -1 1 #Penalties are listed in the observed net charge range of -1 to +1.
PENALTIES 10 0 10 #The penalties are 10 for an observed charge of -1, 0 for an observed charge of 0, and 10 for an observed charge of +1.
BEFORE_FUNCTION QUADRATIC #Ramp quadratically for observed net charges of -2 or less.
AFTER_FUNCTION QUADRATIC #Ramp quadratically for observed net charges of +2 or greater.
```

#### Ejemplo de archivo ```.charge``` que exige una carga neta en el rango de -1 a +3

El siguiente ejemplo muestra un archivo ```.charge``` que exige que la carga neta de un Pose o una región esté en el rango de -1 a +3.  Dentro de este rango, la penalización devuelta es cero; fuera de él, se vuelve positiva rápidamente.

```
DESIRED_CHARGE 0 #Desired net charge is zero.
PENALTIES_CHARGE_RANGE -2 4 #Penalties are listed in the observed net charge range of -2 to +4.
PENALTIES 10 0 0 0 0 0 10 #The penalties are 10 for an observed charge of -2, 0 for an observed charge of -1 to +3, and 10 for an observed charge of +4.
BEFORE_FUNCTION QUADRATIC #Ramp quadratically for observed net charges of -3 or less.
AFTER_FUNCTION QUADRATIC #Ramp quadratically for observed net charges of +5 or greater.
```

#### Ejemplo de archivo ```.charge``` que exige una carga neta de como máximo -3

El comportamiento ```CONSTANT``` fuera de los límites es útil cuando queremos especificar un máximo pero no un mínimo, o un mínimo pero no un máximo.  En este caso, especificamos que queremos una carga neta de, como máximo, -3.

```
DESIRED_CHARGE -3 #Desired net charge is -3.
PENALTIES_CHARGE_RANGE -4 -2 #Penalties are listed in the observed net charge range of -4 to -2.
PENALTIES 0 0 10 #The penalties are 0 for an observed charge of -4, 0 for an observed charge of -3, and 10 for an observed charge of -2.
BEFORE_FUNCTION CONSTANT #Return 0 for observed net charges of -5 or less.
AFTER_FUNCTION QUADRATIC #Ramp quadratically for observed net charges of -1 or greater.
```
#### Ejemplo de archivo ```.charge``` que exige una carga neta absoluta mayor que 2

El formato de archivo ```.charge``` es lo bastante versátil como para permitirnos penalizar las cargas netas cercanas a cero, pero permitir cargas netas muy positivas o muy negativas.  Aquí hay un ejemplo:

```
DESIRED_CHARGE 0 #Desired net charge is zero.
PENALTIES_CHARGE_RANGE -2 2 #Penalties are listed in the observed net charge range of -2 to +2.
PENALTIES 0 25 50 25 0 #The penalties are 0 for an observed charge of -2 or +2, 25 for an observed charge of -1 or +1, and 50 for an observed charge of 0.
BEFORE_FUNCTION CONSTANT #Return 0 for observed net charges of -3 or less.
AFTER_FUNCTION CONSTANT #Return 0 for observed net charges of +3 or greater.
```

## Control regional con restricciones de carga neta

Se puede fijar una carga neta deseada para una región de un Pose (p. ej. la proteína de unión en un complejo proteína de unión-diana, una sola hélice de una proteína mayor, una interfaz de unión) mediante restricciones de carga neta.  Al igual que las restricciones geométricas, estas se asocian a un Pose y las lee el término de energía ```netcharge``` cuando se puntúa o se empaqueta el Pose.  Las restricciones de carga neta se pueden añadir con el [[AddNetChargeConstraintMover]].  A continuación se muestra un ejemplo en el que una interfaz de unión se selecciona con un selector de residuos y se restringe para que tenga una carga neta negativa:

```xml
<ROSETTASCRIPTS>
        <SCOREFXNS>
                <ScoreFunction name="r15" weights="ref2015.wts" >
                        <Reweight scoretype="netcharge" weight="1.0" />
                </ScoreFunction>
        </SCOREFXNS>
        <RESIDUE_SELECTORS>
		# The interface is selected by selecting residues in chain A that are within 15 Angstroms of residue 53 in chain B:
		<Index name="select_b53" resnums="53B" />
		<Chain name="select_chainA" chains="A" />
		<Neighborhood name="select_near_b53" selector="select_b53" distance="15.0" />
		<And name="select_interface" selectors="select_chainA,select_near_b53" />
		<Not name="select_not_interface" selector="select_interface" />
        </RESIDUE_SELECTORS>
        <TASKOPERATIONS>
		# We set up task operations to prevent design away from the interface:
		<OperateOnResidueSubset name="only_repack_not_interface" selector="select_not_interface" >
			<RestrictToRepackingRLT />
		</OperateOnResidueSubset>
        </TASKOPERATIONS>
        <FILTERS>
        </FILTERS>
        <MOVERS>
                <AddNetChargeConstraintMover name="netcharge_cst" filename="must_be_negative.charge" selector="select_interface" />
                <FastDesign name=fdes1 scorefxn="r15" repeats="3" task_operations="only_repack_not_interface" />
        </MOVERS>
        <APPLY_TO_POSE>
        </APPLY_TO_POSE>
        <PROTOCOLS>
                <Add mover="netcharge_cst" />
                <Add mover="fdes1" />
        </PROTOCOLS>
</ROSETTASCRIPTS>
```

## Uso con simetría
El término de energía ```netcharge``` debería ser totalmente compatible con la simetría, incluida la simetría especular.  Ten en cuenta que cuenta todos los residuos del Pose o de la selección, no solo los de la unidad asimétrica.

## Uso con otros términos de energía orientados al diseño
El término de energía ```netcharge``` debería ser totalmente compatible con el [[término de energía aa_composition|AACompositionEnergy]], el [[término de energía hbnet|HBNetEnergy]] o cualquier otro término de energía orientado al diseño.  La potencia de estos términos aumenta cuando se usan juntos.  Por ejemplo, con una combinación de ```netcharge``` y ```aa_composition```, un usuario podría decir de forma efectiva: «Diseña ambos lados de esta interfaz y dame diseños con una mezcla 50/50 de aminoácidos polares e hidrofóbicos a cada lado de la interfaz, un máximo de 4 residuos cargados a cada lado de la interfaz y una carga neta de +2 en un lado y -2 en el otro».  Si además se añade el término ```hbnet```, se podría asegurar que los diseños devueltos tengan redes de enlaces de hidrógeno siempre que sea posible, _además_ de lo anterior.

## Organización del código

- El término de puntuación vive en ```core/scoring/netcharge_energy/NetChargeEnergy.cc``` y ```core/scoring/netcharge_energy/NetChargeEnergy.hh```.
- Como cualquier energía de cuerpo completo, la clase **NetChargeEnergy** implementa una función ```finalize_total_energy()``` que recibe un Pose.  Esta calcula la puntuación.  Internamente, llama a ```calculate_energy()```, que recibe un vector de punteros propietarios a Residues (y que se puede llamar directamente durante el empaquetado).
- Al inicializarse, el término crea un objeto NetChargeEnergySetup interno que almacena los ajustes definidos por el usuario para la composición de tipos de residuo deseada.  Esta clase está definida en ```core/scoring/netcharge_energy/NetChargeEnergySetup.cc``` y ```core/scoring/netcharge_energy/NetChargeEnergySetup.hh```.  Los objetos NetChargeEnergySetup también se pueden almacenar en NetChargeConstraints asociadas a un Pose.  En el momento de puntuar o empaquetar, NetChargeEnergy construye un vector de punteros propietarios a sus objetos NetChargeEnergySetup internos y a todos los almacenados en el Pose, y usa todos ellos para la puntuación.
- Los archivos ```.charge``` se encuentran en ```/database/scoring/score_functions/netcharge/```.

##Véase también

* [[Scoring explained]]
* [[Score functions and score types |score-types]]
* [[Adding a new energy method to Rosetta|new-energy-method]]
* [[Design-centric guidance terms|design-guidance-terms]]
* [[AddNetChargeConstraintMover]]
* [[ClearCompositionConstraintsMover]]
* [[AACompositionEnergy]]
* [[AARepeatEnergy|Repeat-stretch-energy]]
* [[BuriedUnsatPenalty]]
* [[HBNetEnergy]]
* [[VoidsPenaltyEnergy]]
