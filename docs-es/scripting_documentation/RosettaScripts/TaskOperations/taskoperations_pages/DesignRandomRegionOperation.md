# DesignRandomRegion
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## DesignRandomRegion

Simplemente elige residuos al azar del Pose. Esta TaskOperation es estocástica para permitir variación en las regiones de diseño. Cada llamada a esta operación produce un nuevo conjunto de residuos elegidos al azar para diseño.

    <DesignRandomRegion name="(&string)" region_shell="(&real)" regions_to_design="(&int)" repack_non_selected="(&bool)" />

-   region\_shell: El radio de una esfera que rodea al residuo seleccionado para mutación. Todos los residuos dentro de esta esfera se establecerán para diseño, y los que estén fuera no se diseñarán.
-   repack\_non\_selected: Si se establece, los residuos fuera de la esfera de diseño se reempaquetarán; de lo contrario, se mantendrán fijos.
-   regions\_to\_design: El número de residuos (y de regiones, según el valor de region\_shell) que se seleccionarán para diseño.

**Ejemplo** El ejemplo siguiente rediseña una esfera de 8 A de radio centrada en un residuo elegido al azar. Los residuos fuera de la esfera se mantienen fijos.

    <TASKOPERATIONS>
        <DesignRandomRegion name="des_random" region_shell="8.0" regions_to_design="1" repack_non_selected="0" />
    </TASKOPERATIONS>
    <MOVERS>
        <PackRotamersMover name="design" task_operations="des_random" />
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
