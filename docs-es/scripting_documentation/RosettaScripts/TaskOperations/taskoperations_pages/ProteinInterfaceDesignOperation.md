# ProteinInterfaceDesign
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ProteinInterfaceDesign

Restringe a la tarea que es la base del diseño de interfaces de proteínas. Comportamiento por defecto:

    - prevent mutation of native pro/gly/cys
    - prevent design of nonnative pro/gly/cys
    - allow design of chain2 non-pro/gly/cys positions with Cbeta within 8.0Å of chain1
    - allow repack of chain1 non-pro/gly/cys positions with Cbeta within 8.0Å of chain2

Nota: Cuando se usa esta TaskOp en un Pose con más de 2 cadenas, todo lo que está antes del salto indicado se trata como «chain1» y todo lo que está después como «chain2».

-   repack\_chain1=(1, &bool)
-   repack\_chain2=(1, &bool)
-   design\_chain1=(0, &bool)
-   design\_chain2=(1, &bool)
-   allow\_all\_aas=(0 &bool)
-   design\_all\_aas=(0 &bool)
-   interface\_distance\_cutoff=(8.0, &Real)
-   jump=(1&integer) las cadenas por debajo y por encima del salto se llaman chain1 y chain2 arriba.
-   modify\_before\_jump=(1 &bool)
-   modify\_after\_jump=(1 &bool)

modify before/after jump determinan si la TaskOperation cambiará los residuos antes o después del salto. Por ejemplo, si quieres establecer en verdadero el reempaquetado de los residuos de interfaz de la cadena 2 y en falso el del resto de la cadena 2, y a la vez no cambiar la tarea de la cadena 1, usa esta TaskOperation con modify\_before\_jump=0


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
