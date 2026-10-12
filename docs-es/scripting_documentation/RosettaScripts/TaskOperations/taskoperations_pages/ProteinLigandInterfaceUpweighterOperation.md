# ProteinLigandInterfaceUpweighter
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ProteinLigandInterfaceUpweighter

Aumenta específicamente, según un factor dado, la intensidad de las energías de interacción proteína-ligando.

    <ProteinLigandInterfaceUpweighter name="(&string)" interface_weight="(1.0 &Real)" catres_interface_weight="(1.0 &Real)"/>

interface\_weight: aumenta el peso de las interacciones con el ligando en este valor

catres\_interface\_weight: aumenta el peso de las interacciones de los residuos catalíticos en este valor


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
