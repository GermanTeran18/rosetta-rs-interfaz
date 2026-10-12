# AddConstraintsToCurrentConformationMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AddConstraintsToCurrentConformationMover

Añade restricciones a la Pose según su conformación actual. Puede aplicar restricciones de coordenadas a los Calfa de las proteínas y a los átomos pesados del ADN (el comportamiento predeterminado) o restricciones de distancia entre pares de átomos Calfa de la proteína. La forma funcional de las restricciones de coordenadas puede ser armónica o acotada (de fondo plano), mientras que las restricciones de distancia entre pares de átomos por ahora solo tienen forma gaussiana.

[[include:mover_AddConstraintsToCurrentConformationMover_type]]

##Véase también

* [[ConstraintSetMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[ClearConstraintsMover]]
* [[AddSidechainConstraintsToHotspotsMover]]
* [[TaskAwareCstsMover]]
