<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Este mover guarda una operación de tarea en la caché de datos de un objeto Pose, lo que permite recuperarla más tarde.

```xml
<StoreTaskMover name="(&string;)" task_name="(&pose_cached_task_operation;)"
        overwrite="(false &bool;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **task_name**: (OBLIGATORIO) El identificador de la operación de tarea que se almacena en la caché del objeto Pose. Sirve para recuperar la operación de tarea del objeto Pose en el futuro.
-   **overwrite**: Si es true, se sobrescribe una operación de tarea ya almacenada en la caché con el nombre indicado. Si es false, se lanza un error si ya existe en el objeto Pose una operación de tarea con ese nombre.
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
