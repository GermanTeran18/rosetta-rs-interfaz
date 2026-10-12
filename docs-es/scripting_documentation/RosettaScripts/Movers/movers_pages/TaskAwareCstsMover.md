# TaskAwareCsts
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## TaskAwareCsts

Añade restricciones de coordenadas a todos los residuos que las task\_operations consideran diseñables. Por ahora la media y la desviación estándar están fijadas en 0,1. Si quieres usarlo, no olvides hacer que los movers posteriores tengan en cuenta las restricciones de coordenadas cambiando el peso coordinate\_constraint de sus scorefxn.

```xml
<TaskAwareCsts name="(&string)" anchor_resnum="('' &string)" task_operations="(&comma-delimited list of task operations)"/>
```
-  anchor_resnum: ¿qué residuo se usa como ancla para las restricciones de coordenadas? Como el muestreo conformacional de Rosetta se hace en el espacio de torsiones, las restricciones de coordenadas son relativas a una posición. Si no se fija esta opción, el ancla es el primer residuo diseñable definido en las task_operations. Usa aquí la numeración general del Pose: 3 significa el 3.er residuo del Pose, mientras que 3B significa el residuo 3 de la cadena B. El número de residuo se analiza en el momento de aplicar.
-  task_operations: los residuos definidos como diseñables tienen restricciones de coordenadas colocadas en sus CA.



##Véase también

* [[Task operations en RosettaScripts|TaskOperations-RosettaScripts]]
* [[ConstraintSetMover]]
* [[Formato de archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[ClearConstraintsMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[AddSidechainConstraintsToHotspotsMover]]
* [[TaskAwareMinMOver]]
* [[TaskAwareSymMinMover]]
* [[I want to do x]]: guía para elegir un mover

