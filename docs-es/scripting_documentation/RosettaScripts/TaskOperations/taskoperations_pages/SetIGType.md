# SetIGType
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## SetIGType

Una TaskOperation para establecer el tipo de grafo de interacción: linmem, lazy, double lazy o precompute_ig.

```xml
<SetIGType name=(string) lin_mem_ig=(bool,"false") lazy_ig=(bool,"false") double_lazy_ig=(bool,"false") precompute_ig=(bool,"false")/>
```

name (string):  El nombre dado a esta instancia.
lin_mem_ig (bool,"false"):  Tipo de grafo de interacción lin_mem_ig.
lazy_ig (bool,"false"):  Tipo de grafo de interacción lazy_ig.
double_lazy_ig (bool,"false"):  Tipo de grafo de interacción double_lazy_ig.
precompute_ig (bool,"false"):  Tipo de grafo de interacción precompute_ig.


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
