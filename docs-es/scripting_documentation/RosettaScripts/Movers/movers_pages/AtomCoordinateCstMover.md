# AtomCoordinateCstMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AtomCoordinateCstMover

El mover que añade restricciones de coordenadas a la Pose para la aplicación relax. Las restricciones de coordenadas se añaden a la Pose según el estado de la Pose en el momento de aplicarlas, o a partir de una Pose nativa distinta.

```xml
<AtomCoordinateCstMover name="(&string)" coord_dev="(&Real 0.5)" bounded="(&bool false)" bound_width="(&Real 0)" sidechain="(&bool false)" native="(&bool false)" task_operations="(&comma-delimited list of taskoperations)" func_groups="(&bool false)" />
```

-   coord\_dev - la intensidad/desviación de las restricciones que se usarán (p. ej., -relax:coord\_cst\_stdev)
-   bounded - si se usan restricciones armónicas (false) o acotadas (true)
-   bound\_width - el ancho de la restricción acotada (p. ej., -relax::coord\_cst\_width)
-   sidechain - si se restringen solo los átomos pesados de la cadena principal (false) o todos los átomos pesados (true) (p. ej., -relax:coord\_constrain\_sidechains)
-   native - si es true, usa como referencia la Pose de -in:file:native en lugar de la Pose en el momento de aplicar el mover. Para emparejar los residuos de las dos Poses se usa una heurística basada en el tamaño y en las designaciones del PDB. Pueden usarse Poses con secuencias distintas, incluso para restricciones de la cadena lateral. Solo se restringirán los átomos que coincidan.
-   task\_operations - si se indica, solo aplica restricciones a los residuos que las task\_operations enumeran como empaquetables. Si no se indica, aplica restricciones a todos los residuos de la Pose.
-   func\_groups - si es true, aplica restricciones de coordenadas a los átomos funcionales de los residuos restringidos. Por ejemplo, los átomos N de un residuo Arg. Si se usa esta opción, las restricciones aplicadas son solo armónicas; usar restricciones acotadas lanzará un error.

Recuerda que, para que tenga efecto, el término de energía coordinate\_constraint debe estar activado en la función de puntuación. Se recomienda encarecidamente aplicar una raíz virtual a tu Pose antes de aplicar estas restricciones, sobre todo si restringes contra una estructura nativa. (Consulta el mover [VirtualRoot](#VirtualRoot).)


##Véase también

* [[ConstraintSetMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[ClearConstraintsMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[AddSidechainConstraintsToHotspotsMover]]
* [[TaskAwareCstsMover]]
