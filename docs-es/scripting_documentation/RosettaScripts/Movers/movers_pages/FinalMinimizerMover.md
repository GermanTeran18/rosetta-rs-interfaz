# FinalMinimizer
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FinalMinimizer

Este mover forma parte del protocolo LigandDocking.

[[include:mover_FinalMinimizer_type]]

"movemap_builder" especifica qué [[MoveMapBuilder|RosettaScripts#rosettascript-sections_ligands_movemap_builders]] se usa para crear un movemap que describirá qué grados de libertad de la cadena lateral y de la cadena principal existen.

Si se especifica movimiento de la cadena principal en movemap_builder, el mover configurará un foldtree de loops personalizado para la Pose antes de minimizar, con cortes y saltos añadidos de modo que los residuos que no se hayan especificado para moverse en el movemap permanezcan fijos en el espacio (en lugar de moverse por efectos de palanca). El mover debería devolver el foldtree a su estado original al final del proceso.

Para evitar que los loops minimizados se abran, el mover añadirá automáticamente el término `chainbreak` a la función de puntuación utilizada si el peso de este término no se ha fijado manualmente. Además, también añadirá restricciones de coordenadas a los Calfa de la cadena principal de los residuos que se mueven. (Sin embargo, la función de puntuación no se ajustará si no tiene ese término activado.) Si `remove_constraints` es true, estas restricciones se eliminan al final de la minimización.

##Véase también

* [[DockingMover]]
* [[MinMover]]
* [[HighResDockerMover]]
* [[FlexPepDockMover]]
* [[DockingProtocolMover]]
* [[Minimization overview]]
