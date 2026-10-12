# AtomPairConstraintGenerator
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AtomPairConstraintGenerator

[[include:constraint_generator_AtomPairConstraintGenerator_type]]

Genera restricciones de distancia entre pares de átomos para restringir pares de átomos de la Pose según su distancia. Las restricciones pueden generarse según el estado de la Pose en el momento de aplicarlas o, de forma opcional, a partir de una Pose nativa distinta.

De forma predeterminada, la distancia entre los átomos CA y el primer átomo de la cadena lateral de cada par de residuos se restringe mediante una función armónica, donde puntuación = w * ( x - x0 ) / sd; w es la opción "weight", "x0" es la distancia en la Pose nativa o de referencia, "x" es la distancia actual y "sd" es la opción "sd". Opcionalmente, la función armónica puede cambiarse.

Si ca_only=False, se restringen en su lugar los átomos vecinos.

Recuerda que, para que tengan efecto, el término de energía atom_pair_constraint debe estar activado en la función de puntuación.


### Ejemplo 1

Este ejemplo añade y elimina restricciones de distancia solo para los residuos de hoja y usa la Pose indicada con -in:file:native para obtener las coordenadas.

```xml
<RESIDUE_SELECTORS>
    <SecondaryStructure name="sheet" ss="E" use_dssp="1" />
</RESIDUE_SELECTORS>
<MOVERS>
    <AddConstraints name="add_csts" >
        <AtomPairConstraintGenerator name="gen_my_csts"
            residue_selector="sheet" native="1" />
    </AddConstraints>
    <RemoveConstraints name="rm_csts" constraint_generators="gen_my_csts" />
</MOVERS>
<PROTOCOLS>
    <Add mover="add_csts" />
    <!-- do things with constraints -->
    <Add mover="rm_csts" />
</PROTOCOLS>
```

### Ejemplo 2

```xml
<RESIDUE_SELECTORS>
    <SecondaryStructure name="sheet" ss="E" use_dssp="1" />
    <SecondaryStructure name="alpha" ss="H" use_dssp="1" />
</RESIDUE_SELECTORS>
<MOVERS>
    <AddConstraints name="add_csts" >
        <AtomPairConstraintGenerator name="gen_my_csts"
            residue_selector="sheet" secondary_selector="alpha" native="1" />
    </AddConstraints>
    <RemoveConstraints name="rm_csts" constraint_generators="gen_my_csts" />
</MOVERS>
<PROTOCOLS>
    <Add mover="add_csts" />
    <!-- do things with constraints -->
    <Add mover="rm_csts" />
</PROTOCOLS>
```

En este caso se generarán restricciones entre los residuos de la hélice alfa y los de la hebra beta, pero no se generará ninguna restricción entre distintos residuos alfa ni entre dos residuos de hebras beta.

##Véase también

* [[AddConstraintsMover]]
* [[RemoveConstraintsMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[AddConstraintsToCurrentConformationMover]]
