# SymmetricCycpepAlignMover

Documentación creada por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker, el 23 de diciembre de 2016.
*Volver a la página de [[Mover|Movers-RosettaScripts]].*

## SymmetricCycpepAlignMover

[[_TOC_]]

## Descripción

Dado un péptido cíclico cuasisimétrico, este mover alinea el péptido de modo que el eje de simetría cíclica quede a lo largo del eje Z y el centro de masa esté en el origen. Después, opcionalmente, elimina todas las repeticiones de simetría salvo una, de modo que la simetría real pueda configurarse con el mover [[SetupForSymmetry|SetupForSymmetryMover]].

Ten en cuenta que, si se usa la opción de recorte, también se eliminan todos los residuos que no son proteína (_p. ej._ entrecruzadores como el 1,3,5-tris(bromometil)benceno). Se configura un nuevo fold tree con el centro de la repetición de simetría como raíz del árbol (lo que suele ser útil para la minimización simétrica posterior).

## Opciones completas

```xml
<SymmetricCycpepAlign name=(string) auto_detect_symmetry=(bool,"false")
    symmetry_repeats=(int,"2") mirror_symmetry=(bool,"false")
    angle_threshold=(real,"10.0") trim_to_single_repeat=(bool,"false")
    repeat_to_preserve=(int,"1") invert=(bool,"false")
/>
```
- **name** (string) Un nombre único para esta instancia del mover, que se usa para referirse al mover más adelante en el script.
- **auto_detect_symmetry** (bool) Si es true, la simetría de este péptido se detectará automáticamente. El mover terminará con estado de fallo (deteniendo la trayectoria pero sin terminar la ejecución del programa) si el péptido es asimétrico. False por defecto. (Ten en cuenta que, si se pone en "true", no pueden usarse las opciones "symmetry_repeats" y "mirror_symmetry").
- **symmetry_repeats** (int) El número de repeticiones de simetría. Por ejemplo, para especificar simetría c6 o c6/m, ponlo en "6". Por defecto "2" (para simetría c2). El mover terminará con estado de fallo si la simetría del péptido de entrada no coincide con esta simetría.
- **mirror_symmetry** (bool) Si es true, indica que el Pose posee simetría especular. Por ejemplo, para especificar simetría c6/m, pon "symmetry_repeats" en "6" y "mirror_symmetry" en "true". Si se pone en "false", indicaría simetría c6. Por defecto "false" (para simetría c2 sin espejo).
- **angle_threshold** (real) El umbral, en grados, para considerar iguales dos valores diedros. Por defecto 10 grados. Se usa al confirmar que un péptido cuasisimétrico tiene la simetría indicada, o al detectar la simetría del péptido.
- **trim_to_single_repeat** (bool) Si es true, se eliminará toda la geometría del péptido (incluidos todos los entrecruzadores), excepto la parte polipeptídica de una única repetición de simetría. Por defecto "false". (Es útil para preparar un péptido para el mover SetupForSymmetry).
- **repeat_to_preserve** (int) Si "trim_to_single_repeat" es true, esta es la repetición de simetría que NO se eliminará (es decir, la que se conservará). Por defecto "1".
- **invert** (bool) Si es true, la normal del péptido se alinea con el eje Z negativo; si es false, con el positivo. Por defecto false.

## Ejemplo

Este script opera sobre un péptido c4-simétrico de 20 residuos. Se declara un enlace peptídico que conecta los extremos N y C con el mover [[DeclareBond]], y luego el péptido se alinea con el eje Z y se recorta a una única repetición de simetría de 5 residuos con este mover. Después se usa el mover [[SetupForSymmetry|SetupForSymmetryMover]] para configurar la simetría de Rosetta, y se declara un nuevo enlace entre las repeticiones de simetría individuales con [[PeptideCyclizeMover]], que también crea restricciones para el enlace peptídico. Por último, el péptido se somete a relax simétrico.

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
		<ScoreFunction name="bnv" weights="beta_nov15.wts" symmetric="true" />
		<ScoreFunction name="bnv_cst" weights="beta_nov15_cst.wts" symmetric="true" />
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
		<!-- A selector is needed because the SetupForSymmetry mover appends virtual residues, -->
		<!-- and the PeptideCyclizeMover, by default, operates on the first and last residues  -->
		<!-- of the pose or selection.                                                         -->
		<Index name="peptide_selector" resnums="1-20" />
	</RESIDUE_SELECTORS>
	<MOVERS>
	
		<DeclareBond name="bond1" res1="20" res2="1" atom1="C" atom2="N" add_termini="false" />
	
		<SymmetricCycpepAlign name="align" auto_detect_symmetry="true" angle_threshold="15" trim_to_single_repeat="true" invert="true" />
		
		<SetupForSymmetry name="sym" definition="inputs/c4.symm" />

		<PeptideCyclizeMover name="bond2" residue_selector="peptide_selector" />
		
		<FastRelax name="frlx" repeats="3" scorefxn="bnv_cst" >
			<MoveMap name="frlx_mm1" >
				<Span begin="1" end="999" bb="true" chi="true" />
				<Jump number="1" setting="true" />
				<Jump number="2" setting="true" />
				<Jump number="3" setting="true" />
				<Jump number="4" setting="true" />
				<Jump number="5" setting="true" />
				<Jump number="6" setting="true" />
				<Jump number="7" setting="true" />
				<Jump number="8" setting="true" />
				<Jump number="9" setting="true" />
				<Jump number="10" setting="true" />
				<Jump number="11" setting="true" />
				<Jump number="12" setting="true" />
			</MoveMap>
		</FastRelax>
		
	</MOVERS>
	<PROTOCOLS>
		<Add mover="bond1" />
		<Add mover="align" />
		<Add mover="sym" />
		<Add mover="bond2" />
		<Add mover="frlx" />
	</PROTOCOLS>
	<OUTPUT scorefxn="bnv" />
</ROSETTASCRIPTS>

```

## Véase también

- La aplicación [[simple_cycpep_predict]]
- El mover [[SetupForSymmetry|SetupForSymmetryMover]]