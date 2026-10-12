# ClearCompositionConstraintsMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ClearCompositionConstraintsMover

Elimina de la Pose cualquier restricción de secuencia (_p. ej._, restricciones de composición que se puntúan con el [[término de energía aa_composition|AACompositionEnergy]], o restricciones de carga neta que se puntúan con el [[término de energía netcharge|NetChargeEnergy]]).

```xml
<ClearCompositionConstraintsMover name="(&string)" />
```

Ten en cuenta que esto elimina las restricciones de secuencia (_p. ej._, restricciones de composición de aminoácidos, restricciones de carga neta) pero **no** las restricciones geométricas (_p. ej._, restricciones de pares de átomos, restricciones de coordenadas) de la Pose.

##Véase también

* [[AddCompositionConstraintMover]]
* [[AddNetChargeConstraintMover]]
* [[Mover AddHelixSequenceConstraints|AddHelixSequenceConstraintsMover]]
* [[AACompositionEnergy]]
* [[NetChargeEnergy]]
* [[ConstraintSetMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[MHCEpitopeEnergy]]
* [[AddMHCEpitopeConstraintMover]]