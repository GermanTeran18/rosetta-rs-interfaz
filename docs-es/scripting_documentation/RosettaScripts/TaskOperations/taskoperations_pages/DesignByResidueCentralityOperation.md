# DesignByResidueCentrality
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## DesignByResidueCentrality

Selecciona para diseño los residuos con el mayor valor de centralidad de residuo. La centralidad se determina a partir de la red de interacciones dentro de la proteína. Se considera que dos residuos interactúan, y reciben una arista en la red, si tienen átomos separados por \<= 4 angstroms. La centralidad de residuo es el promedio del camino más corto promedio desde cada nodo hasta todos los demás nodos, y puede usarse para identificar residuos importantes estructural o funcionalmente.

Esta TaskOperation es estocástica para permitir variación en las regiones de diseño. Los residuos se seleccionan así. Primero, todos los residuos se ordenan por centralidad en la red. Luego, el primer residuo se selecciona con un generador de números aleatorios. El primer residuo de la lista (el de mayor centralidad) tiene un 50% de probabilidad de ser seleccionado, el segundo un 25%, y así sucesivamente. Si regions\_to\_design es \> 1, se seleccionan residuos adicionales con el mismo proceso, pero sin tener en cuenta los residuos elegidos previamente.

    <DesignByResidueCentrality name="(&string)" region_shell="(8.0 &real)" regions_to_design="(1 &int)" repack_non_selected="(0 &bool)" />

-   region\_shell: El radio de una esfera que rodea al residuo seleccionado para mutación. Todos los residuos dentro de esta esfera se establecerán para diseño, y los que estén fuera no se diseñarán.
-   repack\_non\_selected: Si se establece, los residuos fuera de la esfera de diseño se reempaquetarán; de lo contrario, se mantendrán fijos.
-   regions\_to\_design: El número de residuos (y de regiones, según el valor de region\_shell) que se seleccionarán para diseño.

**Ejemplo** El ejemplo siguiente rediseña una esfera de 8 A de radio centrada en un residuo de alta centralidad. Los residuos fuera de la esfera se mantienen fijos.

    <TASKOPERATIONS>
        <DesignByResidueCentrality name="des_by_centrality" region_shell="8.0" regions_to_design="1" repack_non_selected="0" />
    </TASKOPERATIONS>
    <MOVERS>
        <PackRotamersMover name="design" task_operations="des_by_centrality" />
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
