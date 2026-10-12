# StoreTask
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## StoreTask

(Este es un Mover de desarrollo y no está disponible en las versiones publicadas.)

<!--- BEGIN_INTERNAL -->
Crea una packer task aplicando las task operations especificadas por el usuario al Pose actual y guarda la packer task en los datos cacheables del Pose, lo que permite acceder a la tarea, sin cambios, más adelante en el protocolo de RosettaScripts. Debe usarse junto con la task operation [[RetrieveStoredTask|RetrieveStoredTaskOperation]].

    <StoreTaskMover name="(&string)" task_name="(&string)" task_operations="(comma-delimited list of task operations)" overwrite="(0 &bool)" />

-   task\_name: el índice donde se guardará la tarea en los datos cacheables del Pose. Debe ser idéntico al task\_name usado para recuperar la tarea con la task operation [[RetrieveStoredTask|RetrieveStoredTaskOperation]].
-   task\_operations: una lista de task operations separadas por comas que se usan para crear la packer task.
-   overwrite: si es true, sobrescribirá una tarea existente con el mismo task\_name, si existe.

<!--- END_INTERNAL --> 

##Véase también

* [[StoreCompoundTaskMover]]
* [[Task operations en RosettaScripts|TaskOperations-RosettaScripts]]
* [[TaskAwareCstsMover]]
* [[TaskAwareMinMOver]]
* [[TaskAwareSymMinMover]]

