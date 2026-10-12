# RemoveConstraints
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## Mover RemoveConstraints

Elimina del Pose un conjunto de restricciones generado por un generador de restricciones. El generador de restricciones debe haberse definido previamente en un [[AddConstraintsMover]].


```xml
<RemoveConstraints name="(&string)" constraint_generators="(&string)" />
```

**constraint\_generators**: lista separada por comas de los generadores de restricciones que crearon las restricciones que se van a eliminar. Los generadores de restricciones deben haberse definido previamente en un mover AddConstraints.

### Ejemplo
Este ejemplo genera restricciones de coordenadas para todos los residuos de hoja, las añade al Pose y luego las elimina.

```xml
<RESIDUE_SELECTORS>
    <SecondaryStructureSelector name="sheet" ss="E" use_dssp="1" />
</RESIDUE_SELECTORS>
<MOVERS>
    <AddConstraints name="add_coord_csts" >
        <CoordinateConstraintGenerator name="coord_cst_gen" residue_selector="sheet" />
    </AddConstraints>
    <RemoveConstraints name="rm_coord_csts" constraint_generators="coord_cst_gen" />
</MOVERS>
<PROTOCOLS>
    <Add mover="add_coord_csts" />
    <!-- do things with constraints in pose -->
    <Add mover="rm_coord_csts" />
</PROTOCOLS>

```

##Véase también

* [[ConstraintGenerators]]
* [[AddConstraintsMover]]
* [[ConstraintScoreFilter]]
* [[FileConstraintGenerator]]
* [[ConstraintSetMover]]
* [[Formato de archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[ClearConstraintsMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[AddSidechainConstraintsToHotspotsMover]]
* [[TaskAwareCstsMover]]

