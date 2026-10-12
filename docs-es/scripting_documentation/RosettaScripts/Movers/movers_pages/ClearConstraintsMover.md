# ClearConstraintsMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ClearConstraintsMover

Elimina cualquier restricción de la Pose.

    <ClearConstraintsMover name="(&string)" />

Ten en cuenta que esto elimina de la Pose tanto las restricciones geométricas (_p. ej._, restricciones de pares de átomos, restricciones de coordenadas) como las de secuencia (_p. ej._, restricciones de composición de aminoácidos, restricciones de carga neta). Para eliminar solo estas últimas, usa [[ClearCompositionConstraintsMover]].


##Véase también

* [[ConstraintSetMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[AddSidechainConstraintsToHotspotsMover]]
* [[TaskAwareCstsMover]]
* [[ClearCompositionConstraintsMover]]
* [[AddCompositionConstraintMover]]
* [[AddNetChargeConstraintMover]]
