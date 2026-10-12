# ProteinCore
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ProteinCore

Restringe el diseño de los residuos que están en el núcleo (p. ej., para evitar cargas). Para determinar qué residuos son del núcleo, cuenta los vecinos espaciales (distancia entre Cb). Para evitar confusiones en los giros de la superficie de la proteína, se omiten los vecinos en la secuencia, de forma similar a la usada en *Choi & Deane, Mol Biosyst(2011) 7(12):3327-3334 DOI: 10.1039/c1mb05223c*

     
     <ProteinCore name=(&string) distance_threshold=(8.0 &real) bound=(0 &bool) jump=(1 &Size) neighbor_cutoff=(10 &Size) neighbor_count_cutoff=(6 &Size) /> 

Lista de opciones

-   distance\_threshold: distancia máxima para que un residuo se considere vecino
-   bound: elimina las cadenas posteriores al salto para evitar contar los residuos del ligando como vecinos
-   jump: salto entre la cadena de interés y el ligando
-   neighbor\_cutoff: número de vecinos secuenciales que se excluyen del cálculo
-   neighbor\_count\_cutoff: número de vecinos requerido para un residuo del núcleo


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
