# ThreadSequence
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ThreadSequence

[[include:to_ThreadSequence_type]]

Para cambiar realmente la secuencia del Pose, tienes que llamar a algo como PackRotamersMover sobre el Pose usando esta TaskOperation. Ten en cuenta que, con los parámetros predeterminados, esto empaqueta la secuencia a la que se hizo threading y deja todo lo demás abierto para diseño.


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
