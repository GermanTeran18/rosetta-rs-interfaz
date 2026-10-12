# DesignBySecondaryStructure
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## DesignBySecondaryStructure

DesignBySecondaryStructureOperation es una TaskOperation en desarrollo y no está disponible en la versión pública de Rosetta.

<!--- BEGIN_INTERNAL -->

Selecciona residuos para diseño según su concordancia con la predicción de estructura secundaria de psipred. Se seleccionan para diseño los residuos que no concuerdan con la predicción de estructura secundaria. Este mover es estocástico: los residuos que no concuerdan con la predicción de estructura secundaria se seleccionan al azar cada vez que se llama a la TaskOperation.

    <DesignBySecondaryStructure name="(&string)" region_shell="(8.0 &real)" regions_to_design="(1 &int)" repack_non_selected="(0 &bool)" blueprint="('' &string)" cmd="(&string)" />

-   region\_shell: El radio de una esfera que rodea al residuo seleccionado para mutación. Todos los residuos dentro de esta esfera se establecerán para diseño, y los que estén fuera no se diseñarán.
-   repack\_non\_selected: Si se establece, los residuos fuera de la esfera de diseño se reempaquetarán; de lo contrario, se mantendrán fijos.
-   regions\_to\_design: El número de residuos (y de regiones, según el valor de region\_shell) que se seleccionarán para diseño.
-   blueprint: Un archivo blueprint que especifica la estructura secundaria en cada posición.
-   cmd: **Obligatoria.** Ruta al ejecutable runpsipred.

**Ejemplo** El ejemplo siguiente rediseña una esfera de 8 A de radio centrada en un residuo cuya predicción de estructura secundaria no concuerda con la estructura secundaria real. Los residuos fuera de la esfera se mantienen fijos.

    <TASKOPERATIONS>
        <DesignBySecondaryStructure name="des_by_sspred" region_shell="8.0" regions_to_design="1" repack_non_selected="0" cmd="/path/to/runpsipred_single" />
    </TASKOPERATIONS>
    <MOVERS>
        <PackRotamersMover name="design" task_operations="des_by_sspred" />
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="design" />
    </PROTOCOLS>

<!--- END_INTERNAL -->

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
