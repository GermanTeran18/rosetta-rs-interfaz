# DetectProteinLigandInterface
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## DetectProteinLigandInterface

Configura la tarea del packer según los ajustes de detección de la interfaz de diseño del diseño de enzimas.

    <DetectProteinLigandInterface name="(&string)" cut1="(6.0 &Real)" cut2="(8.0 &Real)" cut3="(10.0 &Real)" cut4="(12.0 &Real)" 
    design="(1 &bool)" resfile="('' &string)" design_to_cys="(0 &bool)" catres_interface="(0 &bool)" catres_only_interface="(0 &bool)" 
    arg_sweep_interface="(0 &bool)" target_cstids="('' &string)"/>

La tarea establecerá para diseño todos los residuos con un Calpha a menos de cut1 del ligando (en concreto, del último ligando), o a menos de cut2 del ligando, donde el vector Calpha-Cbeta apunte hacia el ligando. Los residuos que estén a menos de cut3, o a menos de cut4 apuntando hacia el ligando, se establecerán para reempaquetado. Todos los demás se establecerán como fijos. Si design es falso, se desactiva el diseño en todas las posiciones.

Si se especifica resfile, se leerá el resfile indicado y sus ajustes se aplicarán a la tarea. A las posiciones establecidas como "AUTO" (y solo a esas) se les aplicará el procedimiento de detección de la interfaz de diseño descrito arriba. Ten en cuenta que design=0 desactiva el diseño incluso en las posiciones donde el resfile lo permite (usa "cut1=0.0 cut2=0.0 design=1" para permitir el diseño en las posiciones que el resfile permite y desactivarlo en todas las posiciones AUTO).

Por defecto, DetectProteinLigandInterface desactiva el diseño en las cisteínas de los disulfuros y no permite diseñar hacia cisteína. (Las posiciones que empiezan como cisteína pueden seguir siéndolo si se activa el uso de las cadenas laterales de entrada, o si se desactiva el diseño en esa posición, por ejemplo, para los residuos catalíticos de enzdes). Si quieres permitir el diseño hacia cisteína en las posiciones diseñables, establece design\_to\_cys=1.

catres\_interface: considera los residuos catalíticos (si los hay) para determinar la interfaz (es decir, los residuos a menos de cut1 de estos residuos se harán diseñables, etc.).

catres\_only\_interface: considera solo los vecinos de los residuos catalíticos (no del ligando) para definir la interfaz.

arg\_sweep\_interface: usa la accesibilidad de la arginina a la interfaz como criterio para definir las posiciones diseñables, en lugar de la distancia.

target\_cstids: lista, separada por comas, de residuos restringidos concretos que se considerarán como objetivos exclusivos para la detección de la interfaz (p. ej., 1B,2B,3B).

##Véase también

* [[Preparación de ligandos|preparing-ligands]] para usar en Rosetta
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
