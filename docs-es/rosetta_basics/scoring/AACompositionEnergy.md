# Energía de composición de tipos de residuo (aa_composition)
Documentación creada por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker.
Última edición: 27 de diciembre de 2017.

[[_TOC_]]

## Propósito y algoritmo

Este término de puntuación está pensado para usarse durante el diseño, para penalizar las desviaciones respecto a una composición de tipos de residuo deseada.  Por ejemplo, un usuario podría especificar que la proteína no debe tener más de un 5% de alaninas, no más de 3 glicinas, al menos 4 prolinas, y ser entre un 40% y un 50% hidrofóbica con un 5% de aromáticos, y que su superficie no tenga más de un 50% de residuos cargados.  Calcular una puntuación basada en la composición de tipos de residuo es fácil y rápido, pero no es descomponible por pares por naturaleza.  Este término de puntuación está pensado para funcionar con los cambios de Alex Ford en el packer que permiten usar durante el empaquetado o el diseño términos de puntuación de cálculo rápido pero no descomponibles por pares.<br/>
<br/>
La idea básica es que el algoritmo hace lo siguiente:
- Recorre el Pose y cuenta el número de residuos de los tipos que debe contar en las regiones del Pose que se han seleccionado para el recuento.  (Por ejemplo, cuenta las alaninas del núcleo si el usuario ha establecido un tope a la fracción de alanina en el núcleo, o los aromáticos, o lo que sea.)
- Calcula la diferencia entre el número deseado y el número observado.
- Impone una penalización, basada en una tabla de consulta, en función de esa diferencia.  Por ejemplo, el usuario podría decidir que no haya penalización si se está a 1 residuo de lo ideal, pero que la penalización aumente bruscamente si hay más de 2 de más y gradualmente si hay más de 2 de menos respecto al número deseado.  El usuario puede proporcionar la tabla de consulta en archivos ```.comp``` que definen el comportamiento de este término de puntuación (véase más abajo).

## Control por parte del usuario

Este término de puntuación se controla mediante archivos ```.comp```, que definen la composición de tipos de residuo deseada de una proteína.  Los archivos ```.comp``` que se usarán se pueden proporcionar a Rosetta de tres maneras:
- El usuario puede proporcionar uno o más archivos ```.comp``` como entrada en la línea de comandos con la opción ```-aa_composition_setup_file <filename1> <filename2> <filename3> ...```.
- El usuario puede proporcionar uno o más archivos ```.comp``` al configurar una función de puntuación concreta en RosettaScripts, usando la etiqueta ```<Set>``` para modificar la función de puntuación.  Por ejemplo:

```xml
<SCOREFXNS>
	<ScoreFunction name="tala" weights="talaris2014.wts" >
		<Reweight scoretype="aa_composition" weight="1.0" />
		<Set aa_composition_setup_file="inputs/disfavour_polyala.comp" />
	</ScoreFunction>
</SCOREFXNS>
```
- El usuario puede asociar archivos ```.comp``` a un Pose con el [[AddCompositionConstraintMover]].  Estos permanecen asociados al Pose, como cualquier otra restricción, hasta que se borran todas las restricciones con el [[ClearConstraintsMover]], o hasta que se borran solo las restricciones de composición de secuencia con el [[ClearCompositionConstraintsMover]].  Ten en cuenta que a las restricciones de composición añadidas con el AddCompositionConstraintMover también se les puede asociar un [[ResidueSelector|ResidueSelectors]].  Esto permite al usuario definir subregiones del Pose (p. ej., una sola hélice, el núcleo de la proteína, una interfaz de unión entre subunidades) a las que se aplicará una restricción de composición de aminoácidos.  El ResidueSelector se evalúa antes de la puntuación o el empaquetado (pero no se evalúa repetidamente durante el empaquetado).  Este es un ejemplo de RosettaScript en el que se usa un LayerSelector para seleccionar el núcleo de la proteína y se usa el AddCompositionConstraintMover para imponer un requisito de composición de secuencia solo a los residuos del núcleo:

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
		<ScoreFunction name="tala" weights="talaris2014.wts" >
			<Reweight scoretype="aa_composition" weight="1.0" />
		</ScoreFunction>
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
		<Layer name="corelayer" select_core="true" core_cutoff="0.5" surface_cutoff="0.25" />
	</RESIDUE_SELECTORS>
	<TASKOPERATIONS>
	</TASKOPERATIONS>
	<FILTERS>
	</FILTERS>
	<MOVERS>
		<AddCompositionConstraintMover name="addcomp1" filename="desired_core_composition.comp" selector="corelayer" />
		
		<FastDesign name=fdes1 scorefxn="tala" repeats="3" >
			<MoveMap name="fdes1_mm">
				<Span begin="1" end="30" chi="1" bb="0" />
			</MoveMap>
		</FastDesign>
	</MOVERS>
	<APPLY_TO_POSE>
	</APPLY_TO_POSE>
	<PROTOCOLS>
		<Add mover="addcomp1" />
		<Add mover="fdes1" />
	</PROTOCOLS>
</ROSETTASCRIPTS>

```

Si el usuario usa más de uno de los métodos descritos arriba, se usarán en la puntuación _todos_ los archivos ```.comp``` proporcionados, siempre que el término de puntuación ```aa_composition``` esté activado con un peso distinto de cero.

Un archivo ```.comp``` consta de uno o más bloques ```PENALTY_DEFINITION```.  Las líneas que pueden estar presentes en un bloque ```PENALTY_DEFINITION``` incluyen:
- ```PENALTY_DEFINITION``` Inicia el bloque.
- ```TYPE <restype1> <restype2> <restype3> ...``` Indica que un residuo debe contarse si su código de tres letras coincide con CUALQUIERA de los nombres proporcionados.
- ```NOT_TYPE <restype1> <restype2> <restype3> ...``` Indica que un residuo NO debe contarse si su código de tres letras coincide con CUALQUIERA de los nombres proporcionados.  El residuo no se cuenta aunque coincida con propiedades indicadas en las líneas ```PROPERTIES``` u ```OR_PROPERTIES```.
- ```PROPERTIES <property1> <property2> <property3> ...``` Indica que un residuo debe contarse si tiene TODAS las propiedades indicadas.  Ten en cuenta que una lista de las propiedades de residuo actualmente válidas se genera automáticamente [[aquí|rs_ResiduePropertySelector_type]].
- ```OR_PROPERTIES <property1> <property2> <property3> ...``` Indica que un residuo debe contarse si tiene CUALQUIERA de las propiedades indicadas.
- ```NOT_PROPERTIES <property1> <property2> <property3> ...``` Indica que un residuo NO debe contarse si tiene CUALQUIERA de las propiedades indicadas.
- ```DELTA_START <integer>``` Indica hasta qué distancia por debajo del número deseado de residuos se extiende nuestra tabla de penalizaciones.  Por ejemplo, un valor de '-5' significa que proporcionaremos valores de penalización hasta cinco residuos menos que el número deseado.
- ```DELTA_END <integer>``` Indica hasta qué distancia por encima del número deseado de residuos se extiende nuestra tabla de penalizaciones.  Por ejemplo, un valor de '7' significa que proporcionaremos valores de penalización hasta siete residuos más que el número deseado.
- ```FRACT_DELTA_START <float>``` <b>Novedad del 28-abr-2016</b> Es una alternativa a ```DELTA_START``` que indica hasta qué distancia por debajo de la composición fraccionaria deseada se extiende nuestra tabla de penalizaciones.  Por ejemplo, un valor de '-0.05' significa que proporcionaremos valores de penalización hasta un 5% menos que el número deseado.  (Así, si especificamos una composición fraccionaria deseada de 0.07 (7%) para la alanina, ```FRACT_DELTA_START -0.05``` indica que la tabla de penalizaciones proporciona penalizaciones hasta un 2% de alanina.)  Hay que usar <i>o bien</i> ```DELTA_START``` <i>o bien</i> ```FRACT_DELTA_START```.
- ```FRACT_DELTA_END <float>``` <b>Novedad del 28-abr-2016</b> Es una alternativa a ```DELTA_END``` que indica hasta qué distancia por encima de la composición fraccionaria deseada se extiende nuestra tabla de penalizaciones.  Por ejemplo, un valor de '0.08' significa que proporcionaremos valores de penalización hasta un 8% más que el número deseado.  (Así, si especificamos una composición fraccionaria deseada de 0.03 (3%) para la valina, ```FRACT_DELTA_END 0.08``` indica que la tabla de penalizaciones proporciona penalizaciones hasta un 11% de valina.)  Hay que usar <i>o bien</i> ```DELTA_END``` <i>o bien</i> ```FRACT_DELTA_END```.
- ```PENALTIES <float1> <float2> <float3> ...``` La tabla de penalizaciones propiamente dicha.  Si se usaron ```DELTA_START``` y ```DELTA_END```, deben proporcionarse entradas para cada valor entero desde DELTA_START hasta DELTA_END.  Estos valores representan la penalización energética por tener N residuos de menos, N+1 residuos de menos, N+2 residuos de menos ... M-1 residuos de más, M residuos de más.  Si se usan ```FRACT_DELTA_START``` y ```FRACT_DELTA_END```, se puede especificar cualquier número de valores de penalización; se interpolarán linealmente dentro del intervalo [FRACT_DELTA_START, FRACT_DELTA_END].  En cualquiera de los dos casos, se aplican las funciones de los extremos si los recuentos de tipos de residuo caen fuera del intervalo.
- ```FRACTION <float>``` Indica que este tipo de residuo, o los residuos con las propiedades definidas, idealmente son esta fracción del total.  Por ejemplo, un valor de 0.25 significaría que, idealmente, una cuarta parte de los residuos de la proteína son los definidos por este ```PENALTY_DEFINITION```.  Si se usó un ResidueSelector al aplicar una restricción de composición a un Pose, la fracción representa la parte de los residuos seleccionados (p. ej., el 50% de los residuos del núcleo, el 10% de los residuos de la hélice 3, el 40% de los residuos de la interfaz de unión).  En caso contrario, representa la fracción del total de residuos del Pose.
-  ```ABSOLUTE <integer>``` Una alternativa a ```FRACTION```; indica el número absoluto de residuos del tipo o con las propiedades dadas que se desea en la estructura.  Por ejemplo, un valor de 3 significaría que queremos 3 residuos del tipo o con las propiedades dadas.
- ```BEFORE_FUNCTION <string>``` y ```AFTER_FUNCTION <string>``` Definen el comportamiento de la función de penalización fuera del intervalo definido por el usuario.  Los valores permitidos son CONSTANT (se repite el primer o el último valor), LINEAR (penalización con rampa lineal basada en la pendiente de los dos primeros o los dos últimos valores de penalización) o QUADRATIC (penalización parabólica centrada en cero que pasa por los dos primeros o los dos últimos valores de penalización).
- ```END_PENALTY_DEFINITION``` Termina el bloque.

Las líneas ```PENALTY_DEFINITION```, ```PENALTIES``` y ```END_PENALTY_DEFINITION``` son siempre obligatorias.  Las líneas ```BEFORE_FUNCTION``` y ```AFTER_FUNCTION``` son opcionales, y por defecto son QUADRATIC si no se especifican.  También debe haber una línea ```FRACTION``` *o* una línea ```ABSOLUTE``` (pero no ambas).  Se requieren las líneas ```DELTA_START``` y ```DELTA_END```, *o* ```FRACT_DELTA_START``` y ```FRACT_DELTA_END```.  Las líneas ```TYPE```, ```NOT_TYPE```, ```PROPERTIES```, ```OR_PROPERTIES``` y ```NOT_PROPERTIES``` son todas opcionales y se pueden usar conjuntamente.  La lógica para decidir si se cuenta o no un residuo es la siguiente:

Se cuenta si ( coincide algún TYPE ) O ( ( no coincide ningún NOT_TYPE ) Y ( ( no está presente ninguna propiedad de NOT_PROPERTIES ) Y ( (no hay PROPERTIES ni OR_PROPERTIES definidas) O ( están presentes todas las PROPERTIES ) O ( está presente alguna de las OR_PROPERTIES ) ) ) ).

Este es un ejemplo de archivo ```.comp``` que penaliza las desviaciones respecto a tener un 10% de residuos aromáticos en una proteína (ten en cuenta que el signo de almohadilla se puede usar para comentar uno de estos archivos):

```
# This is a .comp file for requiring that a structure be ten percent aromatic.
# File created 21 July 2015 by Vikram K. Mulligan (vmullig@uw.edu), Baker laboratory.
# This penalty definition block specifies that, for aromatics, there will be a 100-point penalty for
# having ANY fewer or ANY more than the desired number of aromatic residues.

# Note that this is a slightly artificial case for demonstration purposes.  Generally, when designing,
# one wants quadratically-ramping penalties as one deviates from the desired amino acid composition.
# Quadratically-ramping penalties help to guide the packer to the desired amino acid composition.  Constant
# penalties of zero are usually used at most on one side or the other if one wants to indicate that one
# wants at most or at least a certain number or fraction to be a particular amino acid.

PENALTY_DEFINITION

# Define residue types to control
PROPERTIES AROMATIC
NOT_PROPERTIES POLAR CHARGED

# Declare desired quantity of these residues
FRACTION 0.1

# Set the penalty for having too few, at the desired number, and too many of the specified residues
PENALTIES 100 0 100

# Set how many residues you can be below the desired quantity before a penalty is applied. Since
# this value is a delta, the desired number of residues is "0", or zero residues away from the target.
# Therefore, "-1" indicates that the penalty will be applied once there is one fewer than the
# desired quantity
DELTA_START -1

# Set how many residues you can be above the desired quantity before a penalty is applied. Since
# this value is a delta, the desired number of residues is "0", or zero residues away from the target.
# Therefore, "1" indicates that the penalty will be applied once there is one more than the
# desired quantity
DELTA_END 1

#set how the penalties are applied
BEFORE_FUNCTION CONSTANT
AFTER_FUNCTION CONSTANT
END_PENALTY_DEFINITION
```

Este es un archivo .comp más complicado que impone el requisito de que la proteína tenga un 40% de residuos alifáticos o aromáticos distintos de la leucina (es decir, ALA, PHE, ILE, MET, PRO, VAL, TRP o TYR) y un 5% de leucinas:


```
# This is a .comp file for requiring that a structure be ten percent aromatic.
# File created 21 July 2015 by Vikram K. Mulligan (vmullig@uw.edu), Baker laboratory.
# Edited 30 May 2024 by Vikram K. Mulligan (vmulligan@flatironinstitute.org), Flatiron Institute.
PENALTY_DEFINITION
OR_PROPERTIES AROMATIC ALIPHATIC
NOT_TYPE LEU
FRACT_DELTA_START -0.05
FRACT_DELTA_END 0.05
PENALTIES 100 0 100 # The above two lines mean that if we're 5% below or 5% above the desired content, we get a 100-point penalty.
FRACTION 0.4 # Forty percent aromatic or aliphatic, but not leucine
BEFORE_FUNCTION QUADRATIC
AFTER_FUNCTION QUADRATIC
END_PENALTY_DEFINITION

PENALTY_DEFINITION
TYPE LEU
DELTA_START -1
DELTA_END 1
PENALTIES 100 0 100
FRACTION 0.05 # Five percent leucine
BEFORE_FUNCTION QUADRATIC
AFTER_FUNCTION QUADRATIC

END_PENALTY_DEFINITION
```

## Uso con simetría
Desde el 6 de marzo de 2016, el término de puntuación aa_composition debería ser totalmente compatible con la simetría, incluida la simetría especular.  Ten en cuenta que cuenta todos los residuos del Pose o de la selección, no solo los de la unidad asimétrica.  En los Poses con simetría especular, reconoce correctamente los tipos invertidos en las subunidades reflejadas.

## Organización del código

- El término de puntuación reside en ```core/scoring/aa_composition_energy/AACompositionEnergy.cc``` y ```core/scoring/aa_composition_energy/AACompositionEnergy.hh```.
- Como cualquier energía de cuerpo completo, la clase **AACompositionEnergy** implementa una función ```finalize_total_energy()``` que recibe un Pose.  Esta calcula la puntuación.  Internamente, llama a ```calculate_aa_composition_energy()```, que recibe un vector de punteros propietarios a Residues (a la que se puede llamar directamente durante el empaquetado).
- Al inicializarse, el término crea un objeto interno AACompositionEnergySetup que almacena la configuración definida por el usuario para la composición de tipos de residuo deseada.  Esta clase está definida en ```core/scoring/aa_composition_energy/AACompositionEnergySetup.cc``` y ```core/scoring/aa_composition_energy/AACompositionEnergySetup.hh```.  Los objetos AACompositionEnergySetup también se pueden almacenar en AACompositionConstraints asociadas a un Pose.  En el momento de la puntuación o del empaquetado, el AACompositionEnergy construye un vector de punteros propietarios a sus objetos AACompositionEnergySetup internos y a todos los almacenados en el Pose, y usa todos ellos para la puntuación.
- Los archivos ```.comp``` se encuentran en ```/database/scoring/score_functions/aa_composition/```.

##Véase también

* [[Scoring explained]]
* [[Funciones de puntuación y tipos de puntuación |score-types]]
* [[Cómo añadir un nuevo método de energía a Rosetta|new-energy-method]]
* [[Términos de guía centrados en el diseño|design-guidance-terms]]
* [[AddCompositionConstraintMover]]
* [[ClearCompositionConstraintsMover]]
* [[Mover AddHelixSequenceConstraints|AddHelixSequenceConstraintsMover]]
* [[AARepeatEnergy|Repeat-stretch-energy]]
* [[HBNetEnergy]]
* [[BuriedUnsatPenalty]]
* [[NetChargeEnergy]]
* [[VoidsPenaltyEnergy]]
