# Constraint Generators
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Constraint Generators

Los Constraint Generators son un método para crear y eliminar restricciones automáticamente, según la estructura actual del Pose.

[[AddConstraintsMover]] puede tomar un Constraint Generator y añadir restricciones al Pose, y [[RemoveConstraintsMover]] eliminará las restricciones añadidas por AddConstraintsMover.

Consulta la [[página de Movers de RosettaScripts|Movers-RosettaScripts#general-movers_constraints_constraint-generators]] para ver una lista actualizada de Constraint Generators válidos.

### Ejemplo

Este ejemplo añade y elimina restricciones de distancia solo en los residuos de hoja, y usa el Pose especificado por `-in:file:native` para obtener las coordenadas.

```xml
<RESIDUE_SELECTORS>
    <SecondaryStructureSelector name="sheet" ss="E" use_dssp="1" />
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

##Véase también

* [[AddConstraintsMover]]
* [[RemoveConstraintsMover]]
* [[ConstraintScoreFilter]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[ConstraintSetMover]]
* [[ClearConstraintsMover]]
