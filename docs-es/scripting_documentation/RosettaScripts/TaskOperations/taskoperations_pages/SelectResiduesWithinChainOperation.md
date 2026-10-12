# SelectResiduesWithinChain
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## SelectResiduesWithinChain

Selecciona una lista de residuos dentro de una cadena para diseño/reempaquetado según la numeración interna de la cadena. Si modify\_unselected\_residues es verdadero, todos los demás residuos se establecen como norepack.

    <SelectResiduesWithinChain name="(&string)" chain="(1&Integer)" resid="(&comma-separated integer list)" allow_design="(1&bool)" allow_repacking="(1&bool)" modify_unselected_residues="(1&bool)"/>

-   chain: qué cadena. Usa solo numeración secuencial: 1, 2..
-   resid: qué residuos dentro de la cadena. De nuevo, solo numeración (24,35)
-   allow\_design: si es verdadero, permite el diseño en las posiciones seleccionadas.
-   allow\_repacking: si es verdadero, permite el reempaquetado en las posiciones seleccionadas.
-   modify\_unselected\_residues: si es verdadero, establece los residuos no seleccionados como norepacking.


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
