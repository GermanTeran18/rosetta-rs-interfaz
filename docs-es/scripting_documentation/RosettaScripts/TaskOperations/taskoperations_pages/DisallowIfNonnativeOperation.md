# DisallowIfNonnative
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## DisallowIfNonnative

Restringe el diseño para que no incluya un residuo como posibilidad de la tarea en una posición, a menos que sea el residuo inicial. Si resnum se deja en 0, la restricción se aplica a todo el Pose.

     <DisallowIfNonnative name="(&string)" resnum="(0 &integer)" disallow_aas="(&string)" />

-   disallow\_aas toma una cadena de códigos de aminoácidos de una letra, sin separadores. Por ejemplo, disallow\_aas=GCP impediría diseñar hacia Gly, Cys y Pro, a menos que fueran el aminoácido nativo en una posición.

Esta tarea es útil cuando diseñas en una región que tiene Gly y Pro y no quieres incluirlos en otras posiciones que no sean ya Gly o Pro.

**Nota:** «nativo» significa el residuo actual, _no_ el residuo inicial de «-s» ni «-in:file:native».

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
