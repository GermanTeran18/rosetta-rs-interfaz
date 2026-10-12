# trRosettaConstraintGenerator
*Volver a la página de [[Movers|Movers-RosettaScripts]].*

Documentación añadida el 25 de marzo de 2021 por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org).

## trRosettaConstraintGenerator

El trRosettaConstraintGenerator recibe como entrada un alineamiento múltiple de secuencias, lo convierte en un tensor 3D de entrada en codificación one-hot y lo pasa por la red neuronal trRosetta para generar predicciones de las distribuciones de probabilidad de las distancias y orientaciones entre residuos. Después convierte esta información en una lista de restricciones de Rosetta.

Estas restricciones pueden ser útiles para la predicción de estructuras _de novo_. En ese caso, sin embargo, no es necesario escribir este generador de restricciones directamente en un script. En su lugar, la [[aplicación trRosetta|trRosetta]] y el [[mover trRosettaProtocol|trRosettaProtocol]] encapsulan este generador de restricciones y ofrecen un flujo completo de predicción de estructuras que toma una MSA como entrada y produce una Pose como salida. No obstante, si quieres hacer cosas más exóticas, como usar las restricciones de distancia y orientación de trRosetta en diseño, docking o modelado de loops, puede ser útil tener acceso directo a trRosettaConstraintGenerator.

### Una nota sobre la nomenclatura

Aunque "omega" y "phi" se usan habitualmente para referirse al tercer y al primer diedro de la cadena principal de un alfa-aminoácido, y "theta" se usa para referirse al segundo diedro de la cadena principal de un beta-aminoácido, en el contexto de los protocolos relacionados con trRosetta estas letras griegas tienen otro significado. Aquí, "omega" se refiere al ángulo diedro entre residuos formado por los átomos CA y CB de un primer residuo y los átomos CB y CA de un segundo residuo. "Theta" se refiere al ángulo diedro entre residuos formado por los átomos N, CA y CB de un primer residuo y el átomo CB de un segundo residuo. Y "phi" se refiere al ángulo entre residuos formado por los átomos CA y CB de un primer residuo y el átomo CB de un segundo residuo.

### Requisitos de compilación

trRosettaConstraintGenerator requiere que Rosetta se compile con compatibilidad con Tensorflow. Consulta la descripción autogenerada más abajo para ver los detalles sobre cómo compilar Rosetta y enlazar Tensorflow.

## Todas las opciones

[[include:constraint_generator_trRosettaConstraintGenerator_type]]

### Mejores prácticas

En el momento de escribir esto, se recomienda dejar todas las opciones con sus valores predeterminados, salvo que haya un motivo para personalizar la configuración.

## Ejemplo

El siguiente ejemplo reproduce aproximadamente el protocolo que usan el [[mover trRosettaProtocol|trRosettaProtocol]] y la [[aplicación trRosetta|trRosetta]]. **Ten en cuenta que (a) es algo simplificado, lo que limita su precisión como protocolo de predicción de estructuras, y (b) no es necesario escribir manualmente el protocolo completo de predicción de estructuras, ya que puede usarse en su lugar el mover o la aplicación. Esto es solo una demostración de cómo puede escribirse en un script el trRosettaConstraintGenerator.**

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
		<ScoreFunction name="cen" weights="score0.wts" >
			<Reweight scoretype="atom_pair_constraint" weight="5.0" />
			<Reweight scoretype="angle_constraint" weight="1.0" />
			<Reweight scoretype="dihedral_constraint" weight="1.0" />
		</ScoreFunction>
		<ScoreFunction name="r15" weights="ref2015.wts" />
		<ScoreFunction name="r15_cst" weights="ref2015_cst.wts" />
	</SCOREFXNS>
	<SIMPLE_METRICS>
		<RMSDMetric name="measure_rmsd"
			use_native="true"
			super="true"
			custom_type="RMSD_after_centroid_phase_"
			rmsd_type="rmsd_protein_bb_heavy"
		/>
		<RMSDMetric name="measure_rmsd2"
			use_native="true"
			super="true"
			custom_type="RMSD_after_fullatom_phase_"
			rmsd_type="rmsd_protein_bb_heavy"
		/>

	</SIMPLE_METRICS>
	<CONSTRAINT_GENERATORS>
		<trRosettaConstraintGenerator name="gen_csts"
			msa_file="inputs/1r6j_msa.a3m"
		/> 
	</CONSTRAINT_GENERATORS>
	<MOVERS>
		<InitializeByBins name="randomize_bb"
			bin_params_file="ABBA"
		/>
		<AddConstraints name="gen_csts_mover"
			constraint_generators="gen_csts"
		/>
		<MinMover name="minimize"
			scorefxn="cen"
			tolerance="0.0000001"
			bb="true" chi="false" jump="0"
		/>
		<ClearConstraintsMover name="remove_csts" />
		<SwitchResidueTypeSetMover name="make_fullatom" set="fa_standard"/>
		<FastRelax name="frlx" repeats="3" scorefxn="r15_cst" />
	</MOVERS>
	<PROTOCOLS>
		<Add mover="randomize_bb" />
		<Add mover="gen_csts_mover" />
		<Add mover="minimize" />
		<Add metrics="measure_rmsd" />
		<Add mover="remove_csts" />
		<Add mover="make_fullatom" />
		<Add mover="gen_csts_mover" />
		<Add mover="frlx" />
		<Add metrics="measure_rmsd2" />
	</PROTOCOLS>
	<OUTPUT scorefxn="r15" />
```

El archivo de alineamiento múltiple de secuencias de entrada puede generarse con HHBlits u otro software. Consulta la documentación del [[mover trRosettaProtocol|trRosettaProtocol]] para ver más detalles y un ejemplo del formato de archivo .a3m.

## Organización del código

Consulta la documentación de la [[aplicación trRosetta|trRosetta]] para obtener información sobre la organización del código de trRosetta.

## Referencias

- La red neuronal trRosetta se describe en Yang _et al_. (2020) _Proc Natl Acad Sci USA_ 117(3):1496-1503 (doi 10.1073/pnas.1914677117).
- El mover [[trRosettaProtocol]], trRosettaConstriantGenerator, la [[aplicación trRosetta|trRosetta]] y el resto de la infraestructura en C++ fueron escritos por Vikram K. Mulligan (vmulligan@flatironinstitute.org) y por ahora no están publicados.

## Véase también

* [[mover trRosettaProtocol|trRosettaProtocol]]: un mover que usa este generador de restricciones y el [[MinMover]] para predecir la estructura de proteínas.
* [[aplicación trRosetta|trRosetta]]: en esencia, el mover anterior en forma de aplicación, de modo que puedes dar una MSA en la línea de comandos y obtener una estructura.
* [[MinMover]]: lo usa el mover [[trRosettaProtocol]] para encontrar conformaciones compatibles con las restricciones de trRosetta.
* [[FastRelax|FastRelaxMover]]: lo usa el mover [[trRosettaProtocol]] para el refinamiento con todos los átomos.
* [[Aplicación AbinitioRelax|abinitio-relax]]: predicción clásica de estructuras basada en fragmentos.