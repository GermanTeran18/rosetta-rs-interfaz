# AddLigandMotifRotamers
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## AddLigandMotifRotamers

Usa una biblioteca de interacciones proteína-ligando para identificar posibles interacciones similares a las nativas con el ligando y añade esos rotámeros al packer, posiblemente con una bonificación.

    <AddLigandMotifRotamers name="(&string)"/>

Como solo tiene sentido ejecutar AddLigandMotifRotamers una vez (tarda mucho), no he hecho que las opciones se puedan analizar desde el XML. Sin embargo, puedes leer varios archivos de pesos para hacer una rampa de pesos de los motivos.

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
