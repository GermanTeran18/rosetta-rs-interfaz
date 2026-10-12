# SelectBySASA
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## SelectBySASA

Selecciona residuos según su área de superficie accesible al solvente en el estado monomérico, unido o no unido del Pose. Se pueden establecer umbrales de área de superficie accesible para que las posiciones se consideren núcleo, frontera o superficie de la forma siguiente: los residuos con áreas de superficie accesible menores que core\_asa se consideran núcleo, los que tienen áreas mayores que surface\_asa se consideran superficie y los que están entre los umbrales core\_asa y surface\_asa se consideran frontera. Estas SASA se pueden evaluar en el estado monomérico, unido o no unido, y sobre todos los átomos de la cadena principal y el CBeta o sobre todos los átomos pesados de la cadena lateral. Se impide el reempaquetado de todos los residuos que no cumplen los criterios especificados por el usuario. Funciona con Poses simétricos o asimétricos, así como con Poses con bloques de construcción simétricos. Se puede usar para implementar protocolos personalizados de «layer design». Para diseños de novo, probablemente lo mejor sea usar mode="mc" en lugar de mode="sc". Para establecer los parámetros iguales a los predeterminados de la TaskOperation LayerDesign, usa: mode="mc", state="bound", probe\_radius=2.0, core\_asa=20, surface\_asa=40.

     <SelectBySASA name="(&string)" mode="('sc' &string)" state="('monomer' &string)" probe_radius="(2.2 &Real)" core_asa="(0 &Real)" surface_asa="(30 &Real)" jumps="(1 &Size ',' separated)" sym_dof_names="('' &string ',' separated)" core="(0 &bool)" boundary="(0 &bool)" surface="(0 &bool)" verbose="(0 &bool)" />

Ejemplos:

Permite el reempaquetado solo en las posiciones del núcleo en el estado unido. Es útil en combinación con otras tareas, como RestrictToInterface, para seleccionar solo el núcleo de la interfaz para diseño.

     <SelectBySASA name="core" mode="sc" state="bound" probe_radius="2.2" core_asa="0" surface_asa="30" core="1" boundary="0" surface="0" verbose="1" />

Permite el reempaquetado solo en las posiciones de frontera y superficie en el estado unido.

     <SelectBySASA name="core" mode="sc" state="bound" probe_radius="2.2" core_asa="0" surface_asa="30" core="0" boundary="1" surface="1" verbose="1" />

Impide que el núcleo de los monómeros (cada cadena) se reempaquete. Es útil en combinación con otras tareas para asegurar que no se diseñen las posiciones del núcleo.

     <SelectBySASA name="no_core_mono_repack" mode="sc" state="monomer" probe_radius="2.2" core_asa="0" surface_asa="30" core="0" boundary="1" surface="1" verbose="1" />

Lista de opciones

-   mode ( por defecto "sc" ) : Opciones: "mc" o "sc". Átomos que se evalúan durante el cálculo de la SASA. Por defecto se considera la SASA total de los átomos de la cadena lateral de cada residuo (mode="sc"), pero alternativamente se puede considerar la SASA total de los átomos de la cadena principal + CB de cada residuo (mode="mc").
-   state ( por defecto, "monomer" ) : Opciones: "monomer", "bound" o "unbound". Especifica el estado en el que quieres evaluar la SASA. Si state="monomer", cada cadena se extrae del Pose y la SASA se evalúa por separado en cada uno de estos Poses monoméricos. Si state="bound", el Pose no se modifica antes de evaluar las SASA. Si state="unbound", las cadenas se trasladan 1000 angstroms a lo largo de los saltos o sym\_dofs especificados por el usuario antes de evaluar las SASA.
-   probe\_radius ( por defecto, 2.2 ) : Radio de la sonda para calcular el área de superficie accesible al solvente. Nota: el valor predeterminado es mayor que el típico de 1.4 angstroms que representa el agua, pero se ha comprobado que funciona bien con los demás parámetros predeterminados para fines de rediseño de proteínas.
-   core\_asa ( por defecto, 0 ) : Umbral superior de área de superficie accesible para que un residuo se considere núcleo. Cualquier residuo con un valor por debajo de core\_asa se seleccionará como núcleo.
-   surface\_asa ( por defecto, 30 ) : Umbral inferior de área de superficie accesible para que un residuo se considere superficie. Cualquier residuo con un valor por encima de surface\_asa se seleccionará como superficie. Cualquier residuo con un valor entre core\_asa y surface\_asa se considerará frontera.
-   jumps ( por defecto, 1 ) : Lista de saltos, separados por comas, a lo largo de los cuales trasladar si mode="unbound".
-   sym\_dof\_names ( por defecto, "" ) : Lista, separada por comas, de sym\_dof\_names que controlan los DOF simétricos maestros a lo largo de los cuales trasladar si mode="unbound".
-   core ( por defecto, false ) : ¿Deben poder diseñarse las posiciones del núcleo? Si es así, establece core=true.
-   boundary ( por defecto, false ) : ¿Deben poder diseñarse las posiciones de frontera? Si es así, establece boundary=true.
-   surface ( por defecto, false ) : ¿Deben poder diseñarse las posiciones de superficie? Si es así, establece surface=true.
-   verbose ( por defecto, false ) : Si es verdadero, se enviará información adicional al tracer, incluidas las selecciones de PyMOL de los residuos considerados núcleo, frontera y superficie. Ayuda a probar los parámetros adecuados para un sistema dado y a verificar que las posiciones se seleccionan como se desea.


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
