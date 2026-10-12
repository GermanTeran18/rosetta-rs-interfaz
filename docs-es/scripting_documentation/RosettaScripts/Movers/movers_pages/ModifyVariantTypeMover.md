# ModifyVariantType
Última actualización: 6 de abril de 2017, por Vikram K. Mulligan (vmullig@uw.edu).<br/>
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## ModifyVariantType

Añade o elimina tipos variantes en los residuos indicados.

```xml
<ModifyVariantType name="[name]" add_type="[type[,type]...]" remove_type="[type[,type...]]" residue_selector="(&string)" update_polymer_bond_dependent_atoms="(&bool,false)" />
```

Añade (si faltan) o elimina (si están presentes) [[tipos variantes|rosetta_basics/structural_concepts/VariantTypes-and-ResidueProperties]] en los residuos indicados en las task operations dadas. Usa un [[ResidueSelector|ResidueSelectors]] para seleccionar residuos concretos. Opcionalmente, las posiciones de los átomos que dependen de las conexiones poliméricas (_p. ej._ el protón amida, el oxígeno carbonilo, el grupo N-metilo en los aminoácidos N-metilados, _etc._) pueden actualizarse después de modificar el tipo variante (`update_polymer_bond_dependent_atoms="true"`).

## Ejemplo

El siguiente script añade el tipo variante de amidación C-terminal a un péptido de 18 residuos importado de un archivo PDB. (Habría que ejecutarlo con la opción de línea de comandos ```-in:file:s``` para indicar el archivo PDB.)

```xml
<ROSETTASCRIPTS>
	<RESIDUE_SELECTORS>
		<Index name="select_cterm" resnums="18" />
	</RESIDUE_SELECTORS>	
	<MOVERS>
		<ModifyVariantType name="vartype" add_type="CTERM_AMIDATION" residue_selector="select_cterm" />
	</MOVERS>
	<PROTOCOLS>
		<Add mover="vartype" />
	</PROTOCOLS>
</ROSETTASCRIPTS>

```

##Véase también

* [[I want to do x]]: guía para elegir un mover

