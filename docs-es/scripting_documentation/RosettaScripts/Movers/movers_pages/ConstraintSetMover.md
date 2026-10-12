# ConstraintSetMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ConstraintSetMover

Añade restricciones a la Pose, o las sustituye, usando la funcionalidad de lectura desde archivo de las restricciones.

```xml
<ConstraintSetMover name="(&string)" add_constraints="(false &bool)" cst_file="(&string)"/>
```

cst\_file: el archivo que contiene los datos de las restricciones. Por ejemplo:

    ...
    CoordinateConstraint CA 380 CA 1   27.514  34.934  50.283 HARMONIC 0 1
    CoordinateConstraint CA 381 CA 1   24.211  36.849  50.154 HARMONIC 0 1
    ...
El formato de los archivos de restricciones de coordenadas es:
CoordinateConstraint target_res anchor_res x y z function

Para eliminar restricciones de la Pose, crea un mover con cst\_file=none.

-  add_constraints: si es true, las restricciones se añadirán a la Pose actual; en caso contrario, las restricciones leídas del disco sustituirán a las restricciones actuales de la Pose. (¡esto es delicado y confuso, así que ten cuidado!)


##Véase también

* [[TaskAwareCstsMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[ClearConstraintsMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[AddSidechainConstraintsToHotspotsMover]]
