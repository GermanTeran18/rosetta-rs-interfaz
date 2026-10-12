# IncludeCurrent
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## IncludeCurrent

Incluye los rotámeros actuales en el conjunto de rotámeros.

**Notas:**
* La primera llamada de empaquetado incluirá los rotámeros del PDB de entrada. Estos rotámeros del PDB de entrada se perderán tras la primera ejecución de empaquetado, así que solo son efectivos en la carga inicial de un PDB.
* Las llamadas sucesivas al packer incluirán el rotámero actual del Pose en la inicialización (como indica el nombre).

```xml
<IncludeCurrent name="(&string)" />
```

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
