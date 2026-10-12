# ModifyAnnealer
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ModifyAnnealer

Permite modificar las temperaturas y el quench que usa el annealer durante el empaquetado.

```xml
<ModifyAnnealer name="(&string)" high_temp="(100.0 &Real)" low_temp="(0.3 &Real)" disallow_quench="(0 &bool)"/>
```

-   high\_temp - la temperatura alta inicial del annealer.
-   low\_temp - la temperatura a la que se enfría el annealer.
-   disallow\_quench - el quench acepta todo cambio que reduzca la energía. Si quieres más diversidad, puede ser prudente desactivar el paso de quench. El quench está activado por defecto.


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
