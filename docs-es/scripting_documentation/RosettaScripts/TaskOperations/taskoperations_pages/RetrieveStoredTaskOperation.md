# RetrieveStoredTask
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## RetrieveStoredTask

Recupera una tarea del packer almacenada en los datos cacheables del Pose; debe usarse junto con el [[StoreTaskMover]]. Permite guardar en caché y recuperar tareas, de modo que una tarea del packer se pueda definir en un punto arbitrario de un protocolo de RosettaScripts y volver a usarse más tarde. Esto es útil cuando los cambios que sufra el Pose entretanto pueden dar lugar a una tarea del packer distinta aunque se apliquen las mismas TaskOperations. Tiene el beneficio adicional de acortar las listas de TaskOperations que suelen salpicar los archivos .xml de RosettaScripts.

      <RetrieveStoredTask name="(&string)" task_name="(&string)" />

-   task\_name - El índice donde se puede acceder a la tarea almacenada en los datos cacheables del Pose. Debe ser idéntico al task\_name usado para almacenar la tarea con el mover StoreTask.


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
