<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<TaskAwareCsts name="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)"
        cst_type="(coordinate &string;)" anchor_resnum="(&string;)" />
```

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **cst_type**: Qué tipo de restricción piensas aplicar
-   **anchor_resnum**: Qué número de residuo debe servir de ancla (relevante para las restricciones de coordenadas: indícalo si es así; en otro caso, importa menos).

---
