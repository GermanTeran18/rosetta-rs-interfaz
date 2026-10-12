# RestrictIdentitiesAtAlignedPositions
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## RestrictIdentitiesAtAlignedPositions

Restringe las posiciones especificadas por el usuario, que están alineadas con posiciones de un PDB de origen, a las identidades observadas en ese PDB. Se puede usar para revertir residuos predefinidos a sus identidades en un progenitor de tipo silvestre. También se puede usar para modificar un TaskFactory de modo que solo considere las identidades del PDB de origen en las posiciones objetivo (sin cambiar la tarea del packer en otras posiciones). Ten en cuenta que el Pose y el Pose de origen deben estar alineados para que esto funcione. Se ignoran los residuos que no tienen un residuo alineado en el PDB objetivo.

-   source\_pdb: el PDB del que se derivarán las identidades
-   resnums: los números de residuo en el source\_pdb(!) que hay que derivar
-   chain (por defecto 1 &integer): ¿en qué cadena del PDB objetivo se buscan los residuos alineados?
-   design\_only\_target\_residues (por defecto 0 &bool): si es verdadero, diseña los residuos objetivo hacia las identidades del origen mientras reempaqueta una capa de 6A alrededor de cada residuo. Si es falso, solo restringe las identidades permitidas en los residuos objetivo, sin afectar a otros residuos.
-   prevent\_repacking
* repack_shell - cambia la capa de reempaquetado; por defecto es 6.0
* design_shell - cambia la capa de diseño; por defecto es 0.01


##Véase también

* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
