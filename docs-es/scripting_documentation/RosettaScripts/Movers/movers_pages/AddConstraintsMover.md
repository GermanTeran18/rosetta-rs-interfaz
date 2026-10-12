# AddConstraints
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Mover AddConstraints

Este mover usa uno o más generadores de restricciones para generar un conjunto de restricciones y añadirlas a la Pose. El conjunto de restricciones puede eliminarse de forma específica con el mover RemoveConstraints.

Recordatorio: las restricciones añadidas a la Pose no hacen nada si no están activados los términos de energía de restricciones correspondientes. 

Los ConstraintGenerators pueden indicarse dentro del mover AddConstraints o en un bloque XML `<CONSTRAINT_GENERATORS>` aparte, usando la opción `constraint_generators`.

```xml
<AddConstraints name="(&string)" >
   <!-- Constraint generator 1 ... -->
   <!-- Constraint generator 2 ... -->
   <!-- Constraint generator n ... -->
</AddConstraints>
```

###Ejemplo

Este ejemplo añade restricciones de coordenadas a todos los residuos de hojas.

```xml
<RESIDUE_SELECTORS>
    <SecondaryStructureSelector name="sheet" ss="E" use_dssp="1" />
</RESIDUE_SELECTORS>
<CONSTRAINT_GENERATORS>
    <CoordinateConstraintGenerator name="coord_cst_gen" constraint_generators="sheet" />
</CONSTRAINT_GENERATORS>
<MOVERS>
    <AddConstraints name="add_coord_csts" >
</MOVERS>
```

##Véase también

* [[ConstraintGenerators]]
* [[RemoveConstraintsMover]]
* [[ConstraintScoreFilter]]
* [[ConstraintSetMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[ClearConstraintsMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[AddSidechainConstraintsToHotspotsMover]]
* [[TaskAwareCstsMover]]