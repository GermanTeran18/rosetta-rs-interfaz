# HighestEnergyRegion
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## HighestEnergyRegion

Selecciona los residuos que tienen la mayor energía por residuo. Esta TaskOperation es estocástica para permitir variación en las regiones de diseño. Los residuos se seleccionan así. Primero, todos los residuos se ordenan por la puntuación total de una región formada por una esfera alrededor del residuo. Luego, el primer residuo se selecciona con un generador de números aleatorios. El primer residuo de la lista (el de puntuación más alta, es decir, peor) tiene un 50% de probabilidad de ser seleccionado, el segundo un 25%, y así sucesivamente. Si regions\_to\_design es \> 1, se seleccionan residuos adicionales con el mismo proceso, pero sin tener en cuenta los residuos elegidos previamente.

    <HighestEnergyRegion name="(&string)" region_shell="(&real)" regions_to_design="(&int)" repack_non_selected="(&bool)" scorefxn="(&string)" />

-   region\_shell: El radio de una esfera que rodea al residuo seleccionado para mutación. Todos los residuos dentro de esta esfera se establecerán para diseño, y los que estén fuera no se diseñarán.
-   repack\_non\_selected: Si se establece, los residuos fuera de la esfera de diseño se reempaquetarán; de lo contrario, se mantendrán fijos.
-   regions\_to\_design: El número de residuos (y de regiones, según el valor de region\_shell) que se seleccionarán para diseño.
-   scorefxn: La función de puntuación que se usará para determinar las puntuaciones de las regiones.

**Ejemplo** El ejemplo siguiente rediseña una esfera de 8 A de radio centrada en una región del Pose con mala puntuación. Los residuos fuera de la esfera se mantienen fijos.

    <TASKOPERATIONS>
        <HighestEnergyRegion name="des_high_energy" region_shell="8.0" regions_to_design="1" repack_non_selected="0" />
    </TASKOPERATIONS>
    <MOVERS>
        <PackRotamersMover name="design" task_operations="des_high_energy" />
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="design" />
    </PROTOCOLS>

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
