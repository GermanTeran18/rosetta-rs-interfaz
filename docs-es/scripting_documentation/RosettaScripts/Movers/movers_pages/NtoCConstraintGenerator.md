# NtoCConstraintGenerator
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## NtoCConstraintGenerator

Genera, añade o sustituye en el Pose restricciones entre los residuos N- y C-terminales.

```xml
<NtoCConstraintGenerator name="(&string)" dist="(&float 11.0)" weight="(&float 1.0)" />
```

dist: distancia que se usa para las restricciones de pares de átomos
weight: peso escalar que se usa en las restricciones de pares de átomos

Las restricciones generadas con este mover pueden eliminarse del Pose con el mover RemoveCsts.

##Véase también

* [[Formato de archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[FileConstraintGenerator]]
