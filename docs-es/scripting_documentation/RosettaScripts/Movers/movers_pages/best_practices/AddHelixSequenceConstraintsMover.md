# Mover AddHelixSequenceConstraints
Página creada el 12 de febrero de 2017 por Vikram K. Mulligan (vmullig@uw.edu), Baker Laboratory.

<i><b>Nota:</b>  Este mover aún no está publicado.  Si te resulta útil en un proyecto de diseño, incluye al autor (Vikram K. Mulligan) en la publicación resultante.</i>

*Volver a la página de [[Movers|Movers-RosettaScripts]].*

[[_TOC_]]

## Descripción del mover

El mover AddHelixSequenceConstraints configura restricciones de secuencia para cada hélice de un Pose o de una selección.  Puede exigir cargas negativas y positivas en los extremos N y C, respectivamente, puede limitar el número de residuos desfavorables a la hélice en cada hélice, puede exigir que la hélice tenga una fracción de alanina definida por el usuario y puede exigir un contenido hidrofóbico fraccionario mínimo en cada hélice.  Ten en cuenta que estas restricciones permanecen asociadas al Pose y están pensadas para usarse durante el diseño con el término de puntuación [[aa_composition|AACompositionEnergy]].  Las hélices se detectan con DSSP cuando se aplica este mover, así que, si la estructura secundaria cambia entre la aplicación de este mover y el diseño, las restricciones se aplicarán a índices de residuo obsoletos.  (En ese caso, las restricciones de secuencia se pueden volver a aplicar con este mover después de borrar las antiguas con ClearCompositionConstraintsMover, o definiendo "reset=true" en las opciones de este mover.)

Ten en cuenta que los valores por defecto de este mover se han fijado de modo que pueda aplicarse sin configurar nada manualmente y aun así produzca un comportamiento razonable.  Los usuarios avanzados pueden ajustar manualmente todos los parámetros, pero en muchos casos no debería ser necesario.

## Uso típico con las opciones por defecto

Por defecto, este mover añade cinco tipos de restricciones de secuencia a cada hélice alfa del Pose.  Cualquiera de estos comportamientos puede desactivarse o modificarse con opciones avanzadas, pero en la mayoría de los casos no hace falta definir ninguna.  Los cinco tipos de restricciones de secuencia son:

1.  Una restricción de secuencia fuerte que exige al menos dos residuos con carga negativa en los tres primeros residuos (extremo N) de cada hélice alfa.

2.  Una restricción de secuencia fuerte que exige al menos dos residuos con carga positiva en los tres últimos residuos (extremo C) de cada hélice alfa.

3.  Una restricción de secuencia débil, pero de crecimiento muy pronunciado, que penaliza los tipos de residuo desfavorables a la hélice (por defecto, Asn, Asp, Ser, Gly, Thr y Val) a lo largo de cada hélice.  (A veces se tolera un solo residuo de este tipo, pero la penalización por tener más de uno en esta categoría aumenta cuadráticamente con el número de residuos desfavorables a la hélice.)

4.  Una restricción de secuencia débil que empuja a la hélice a tener un 10 % de alanina.  Como esta restricción es débil, se toleran desviaciones de ese valor, pero debería evitar una abundancia excesiva de residuos de alanina.

5.  Una restricción de secuencia débil que empuja a la hélice a tener al menos un 25 % de contenido hidrofóbico.  Esta restricción también es débil, por lo que se tolerarán en cierta medida hélices algo menos hidrofóbicas.  Ten en cuenta que en Rosetta la alanina no se considera "hidrofóbica".

Este mover se puede usar, con la configuración por defecto, en tres sencillos pasos:

1.  Configura una función de puntuación que tenga el peso del término de puntuación [[aa_composition|AACompositionEnergy]] en 1.0.  Esto se puede hacer modificando el archivo .wts que se pasa por línea de comandos o usando la etiqueta `<Reweight ... />` al configurar una función de puntuación en RosettaScripts.

2.  Añade el mover, sin más opciones que el nombre de la instancia, a la sección `<MOVERS>` y aplícalo antes de los pasos de diseño en la sección `<PROTOCOLS>`.

3.  Añade la función de puntuación modificada a los pasos de diseño que se produzcan después de aplicar el mover AddHelixSequenceConstraints.

A continuación se muestra un script de ejemplo que usa el mover FastDesign.  Ten en cuenta que las restricciones de secuencia se aprovechan mejor con diseño de cadena principal flexible, de modo que la cadena principal pueda desplazarse un poco para adaptarse a la composición de secuencia de aminoácidos deseada.  (Por ejemplo, las hélices que están demasiado cerca pueden separarse ligeramente durante los pasos de minimización para acomodar mejor los grupos hidrofóbicos voluminosos añadidos durante los pasos de diseño.)

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
		<ScoreFunction name="tala_comp" weights="talaris2014.wts" >
			<Reweight scoretype="aa_composition" weight="1.0" /> <!-- Step 1: turn on aa_composition. -->
		</ScoreFunction>
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
	</RESIDUE_SELECTORS>
	<TASKOPERATIONS>
		<ReadResfile name="resfile" filename="inputs/resfile.txt" />
	</TASKOPERATIONS>
	<FILTERS>
	</FILTERS>
	<MOVERS>
		<AddHelixSequenceConstraints name="addcomps" /> <!-- Step 2: Add the mover, with no options. -->
		<FastDesign name="fastdes" scorefxn="tala_comp" task_operations="resfile" repeats="2" > <!-- Step 3: Use the modified scorefunction for design. -->
			<MoveMap name="fastdes_mm" >
				<Span begin="1" end="999" bb="true" chi="true" />
			</MoveMap>
		</FastDesign>
	</MOVERS>
	<APPLY_TO_POSE>
	</APPLY_TO_POSE>
	<PROTOCOLS>
		<Add mover="addcomps" /> <!-- Step 2: Add the mover to the PROTOCOLS section. -->
		<Add mover="fastdes" />
	</PROTOCOLS>
	<OUTPUT scorefxn="tala_comp" />
</ROSETTASCRIPTS>
```

## Uso avanzado: ajustes manuales

El patrón de uso por defecto deja que el mover "piense" por el usuario.  Para usuarios avanzados, cualquiera de las cinco funciones de este mover puede desactivarse de forma independiente, o se puede modificar el comportamiento de cada una.  La lista completa de opciones es la siguiente:

```xml
<AddHelixSequenceConstraints name=(string)
     residue_selector=(string) reset=(bool,"false") min_helix_length=(int,"8")
     add_n_terminal_constraints=(bool,"true") min_n_terminal_charges=(int,"2") n_terminal_residues=(int,"3") n_terminal_constraint_strength=(real,"15.0")
     add_c_terminal_constraints=(bool,"true") min_c_terminal_charges=(int,"2") c_terminal_residues=(int,"3") c_terminal_constraint_strength=(real,"15.0")
     add_overall_constraints=(bool,"true") types_to_avoid=(string,"ASN ASP SER GLY THR VAL") overall_max_count=(int,"0") overall_constraints_strength=(real,"5.0")
     add_alanine_constraints=(bool,"true") desired_alanine_fraction=(real,"0.1") ala_constraint_under_strength=(real,"0.2") ala_constraint_over_strength=(real,"0.2")
     add_hydrophobic_constraints=(bool,"true") desired_min_hydrophobic_fraction=(real,"0.25") hydrophobic_constraint_strength=(real,"0.2")
/>
```
### Opciones generales

**residue\_selector (string):**  Un ResidueSelector opcional, definido previamente.  Si se indica, solo se aplicarán restricciones a las hélices que contengan al menos un residuo seleccionado por el ResidueSelector.  Si no se usa, las restricciones se aplican a todas las hélices del Pose.

**reset (bool,"false"):**  Si es true, todas las restricciones de secuencia del Pose se borran (se eliminan) antes de aplicar este mover.  Si es false, el mover añade las suyas a las restricciones de secuencia existentes.  Por defecto es false.

**min\_helix\_length (int,"8"):**  El número mínimo de residuos que debe tener una hélice para que este mover actúe sobre ella.  Por defecto se ignoran las hélices de menos de 8 residuos, ya que sus macrodipolos de hélice son despreciables.

### Opciones relacionadas con las cargas del extremo N

**add\_n\_terminal\_constraints (bool,"true"):**  Si es true, este mover añadirá restricciones de secuencia que exigen un número mínimo, definido por el usuario, de residuos con carga negativa en el extremo N de cada hélice.  Por defecto es true.

**min\_n\_terminal\_charges (int,"2"):**  El número mínimo de residuos con carga negativa que se exige en el extremo N de las hélices.  Por defecto es 2 residuos.

**n\_terminal\_residues (int,"3"):**  La longitud del tramo de residuos que debe contener cargas negativas en el extremo N de una hélice.  Por defecto es 3 residuos.

**n\_terminal\_constraint\_strength (real,"15.0"):**  La fuerza de la restricción de secuencia que exige cargas negativas en los extremos N de las hélices.  Si es demasiado débil, el packer de Rosetta a veces puede colocar muy pocas cargas negativas.  Por defecto es 15.0.
(Para usuarios avanzados: esta es la penalización de energía que se aplica cuando hay un residuo con carga negativa menos que el número deseado.  La penalización crece cuadráticamente para dos menos, tres menos, *etc.*)

### Opciones relacionadas con las cargas del extremo C

**add\_c\_terminal\_constraints (bool,"true"):**  Si es true, este mover añadirá restricciones de secuencia que exigen un número mínimo, definido por el usuario, de residuos con carga positiva en el extremo C de cada hélice.  Por defecto es true.

**min\_c\_terminal\_charges (int,"2"):**  El número mínimo de residuos con carga positiva que se exige en el extremo C de las hélices.  Por defecto es 2 residuos.

**c\_terminal\_residues (int,"3"):**  La longitud del tramo de residuos que debe contener cargas positivas en el extremo C de una hélice.  Por defecto es 3 residuos.

**c\_terminal\_constraint\_strength (real,"15.0"):**  La fuerza de la restricción de secuencia que exige cargas positivas en los extremos N de las hélices.  Si es demasiado débil, el packer de Rosetta a veces puede colocar muy pocas cargas positivas.  Por defecto es 15.0.
(Para usuarios avanzados: esta es la penalización de energía que se aplica cuando hay un residuo con carga positiva menos que el número deseado.  La penalización crece cuadráticamente para dos menos, tres menos, *etc.*)

### Opciones para penalizar los tipos de residuo desfavorables a la hélice

**add\_overall\_constraints (bool,"true"):**  Si es true, este mover añadirá restricciones de secuencia que penalizan que haya más de un número máximo, definido por el usuario, de residuos desfavorables a la hélice en cada hélice.  Por defecto es true.

**types\_to\_avoid (string,"ASN ASP SER GLY THR VAL"):**  La lista de tipos de residuo desfavorables a la hélice que las restricciones "overall" deben penalizar en todas las posiciones de la hélice.  Debe ser una lista de códigos de tres letras de tipos de residuo separados por espacios en blanco, sin comas.

**overall\_max\_count (int,"0"):**  El número máximo permitido de tipos de residuo desfavorables a la hélice.  Por defecto es cero (aunque, por defecto, la penalización por tener uno es pequeña).

**overall\_constraints\_strength (real,"5.0"):**  La fuerza de la restricción de secuencia que penaliza los tipos de residuo desfavorables a la hélice.  Si es demasiado débil, el packer de Rosetta a veces puede colocar demasiados residuos desfavorables a la hélice.  Por defecto es 5.0.
(Para usuarios avanzados: esta es la penalización de energía que se aplica cuando hay un residuo desfavorable a la hélice más que el máximo permitido.  La penalización crece cuadráticamente para dos más, tres más, *etc.*)

### Opciones relacionadas con el contenido de alanina de la hélice

**add\_alanine\_constraints (bool,"true"):**  Si es true, este mover añadirá restricciones de secuencia que penalizan que haya demasiados o demasiado pocos residuos de alanina en cada hélice.  El usuario puede definir el contenido fraccionario de alanina deseado.  Ten en cuenta que esta restricción suele ser débil, de modo que se tolera cierta desviación del contenido fraccionario de alanina deseado.  Por defecto es true.

**desired\_alanine\_fraction (real,"0.1"):**  El contenido fraccionario de alanina deseado en cada hélice.  Por defecto es 0.1 (un 10 por ciento de alanina).  Ten en cuenta que es posible desviarse de esta fracción si las restricciones de alanina son débiles (y por defecto lo son).

**ala\_constraint\_under\_strength (real,"0.2"):**  La penalización de la restricción de alanina que se impone si el contenido fraccionario de alanina es un 1 por ciento menor que el contenido fraccionario deseado.  La penalización crece cuadráticamente a medida que el contenido de alanina cae por debajo del deseado.  Ten en cuenta que, por defecto, esta penalización es débil para permitir cierta desviación del contenido fraccionario de alanina deseado según el caso.

**ala\_constraint\_over\_strength (real,"0.2"):**  La penalización de la restricción de alanina que se impone si el contenido fraccionario de alanina es un 1 por ciento mayor que el contenido fraccionario deseado.  La penalización crece cuadráticamente a medida que el contenido de alanina supera el deseado.  Ten en cuenta que, por defecto, esta penalización es débil para permitir cierta desviación del contenido fraccionario de alanina deseado según el caso.

### Opciones relacionadas con el contenido hidrofóbico mínimo de la hélice

**add\_hydrophobic\_constraints (bool,"true"):**  Si es true, este mover añadirá restricciones de secuencia que penalizan que haya muy pocos residuos hidrofóbicos en cada hélice.  El usuario puede definir el contenido fraccionario hidrofóbico mínimo deseado.  Ten en cuenta que esta restricción suele ser débil, de modo que se devolverán algunos diseños con menos del contenido hidrofóbico mínimo.  Ten en cuenta que la alanina NO se considera hidrofóbica.  Por defecto es true.

**desired\_min\_hydrophobic\_fraction (real,"0.25"):**  El contenido fraccionario hidrofóbico mínimo deseado en cada hélice.  Por defecto es 0.25 (un 25 por ciento hidrofóbico).  No hay penalización por tener más residuos hidrofóbicos; solo por tener menos de los deseados.  Ten en cuenta que son posibles hélices ligeramente por debajo de esta fracción si las restricciones hidrofóbicas son débiles (y por defecto lo son).

**hydrophobic\_constraint\_strength (real,"0.2"):**  La penalización de la restricción hidrofóbica que se impone si el contenido fraccionario hidrofóbico es un 1 por ciento menor que el contenido fraccionario deseado.  La penalización crece cuadráticamente a medida que el contenido hidrofóbico cae por debajo del deseado.  Ten en cuenta que, por defecto, esta penalización es débil para permitir cierta desviación del contenido fraccionario hidrofóbico deseado según el caso.

## Limitaciones conocidas

- Como este mover llama a DSSP para detectar la estructura secundaria, actualmente es incompatible con hélices levógiras o con tipos exóticos de hélice formados por residuos de aminoácidos no canónicos.
- La detección de estructura secundaria con DSSP se produce en el momento en que el mover AddHelixSequenceConstraints se aplica al Pose, y las restricciones de secuencia resultantes permanecen asociadas al Pose.  Esto significa que, si el usuario aplica el mover AddHelixSequenceConstraints y luego aplica otro mover que altere la conformación de la cadena principal antes del diseño, las hélices que existían cuando se llamó a DSSP pueden haber desaparecido o tener otra longitud.  Es decir, las restricciones de secuencia pueden estar obsoletas.  Para resolverlo, el mover AddHelixSeqeuenceConstraints se puede volver a aplicar tras borrar las restricciones con la opción `reset` o con [[ClearCompositionConstraintsMover]].
- Las restricciones de secuencia añaden una penalización de puntuación no lineal por desviarse de una composición de aminoácidos deseada, guiando al packer hacia buenas secuencias durante el diseño.  Esto significa que no pueden superar las restricciones de secuencia impuestas mediante task operations.  Por ejemplo, si tengo una restricción de secuencia que penaliza la ausencia de cargas negativas en el extremo N de una hélice, pero mi lista de task operations prohíbe las cargas negativas en esas posiciones, no obtendré ningún resultado con cargas negativas en el extremo N de esa hélice.

## Véase también
- [[AACompositionEnergy]]
- [[AddCompositionConstraintMover]]
- [[ClearCompositionConstraintsMover]]
