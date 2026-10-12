<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<StoreCompoundTaskMover name="(&string;)"
        task_name="(&pose_cached_task_operation;)"
        true_behavior="(&compound_task_behavior;)"
        false_behavior="(&compound_task_behavior;)"
        mode="(packable &compound_task_mode;)" invert="(false &bool;)"
        verbose="(false &bool;)" overwrite="(false &bool;)" >
    <AND task_operations="(&task_operation_comma_separated_list;)"
            packer_palette="(&named_packer_palette;)" />
    <OR task_operations="(&task_operation_comma_separated_list;)"
            packer_palette="(&named_packer_palette;)" />
    <XOR task_operations="(&task_operation_comma_separated_list;)"
            packer_palette="(&named_packer_palette;)" />
    <NOR task_operations="(&task_operation_comma_separated_list;)"
            packer_palette="(&named_packer_palette;)" />
    <NAND task_operations="(&task_operation_comma_separated_list;)"
            packer_palette="(&named_packer_palette;)" />
    <ORNOT task_operations="(&task_operation_comma_separated_list;)"
            packer_palette="(&named_packer_palette;)" />
    <ANDNOT task_operations="(&task_operation_comma_separated_list;)"
            packer_palette="(&named_packer_palette;)" />
    <NOT task_operations="(&task_operation_comma_separated_list;)"
            packer_palette="(&named_packer_palette;)" />
</StoreCompoundTaskMover>
```

-   **task_name**: El nombre con el que se identificará la operación de tarea que se va a almacenar, una vez almacenada en la caché de datos de un objeto Pose.
-   **true_behavior**: XRW POR HACER
-   **false_behavior**: XRW POR HACER
-   **mode**: XRW POR HACER
-   **invert**: XRW POR HACER
-   **verbose**: XRW POR HACER
-   **overwrite**: XRW POR HACER


Subetiqueta **AND**:   

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

Subetiqueta **OR**:   

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

Subetiqueta **XOR**:   

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

Subetiqueta **NOR**:   

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

Subetiqueta **NAND**:   

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

Subetiqueta **ORNOT**:   

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

Subetiqueta **ANDNOT**:   

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

Subetiqueta **NOT**:   

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
