# ImportUnboundRotamers
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ImportUnboundRotamers

Importa rotámeros no unidos de un archivo PDB dado. Especifica el archivo PDB no unido/nativo con la opción: -packing::unboundrot

Nota: Esta TaskOperation se desarrolló para favorecer los rotámeros no unidos (en particular, los rotámeros nativos) de un archivo PDB importado. Si es lo que quieres, asegúrate de usar el mover load\_unbound\_rot (sin parámetros y actualmente sin documentar), que cambia el término de energía de rotámeros de Dunbrack (fa\_dun) de modo que las puntuaciones de tus rotámeros no unidos importados sean iguales a las de los rotámeros con mejor puntuación de la biblioteca que estés usando. Esto favorecerá los rotámeros no unidos importados cuando diseñes o reempaquetes cadenas laterales. Esta TaskOperation debe usarse con tu mover favorito de diseño o empaquetado de cadenas laterales (por ejemplo: GreedyOptMutationMover, RepackMinimize o PackRotamersMover).

    <ImportUnboundRotamers name="(&string)"/>

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
