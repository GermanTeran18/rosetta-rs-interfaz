<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<RestrictRegion name="(&string;)" type="(&restrict_region_modes;)"
        resfile="(&string;)" psipred_cmd="(&string;)" blueprint="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" num_regions="(&string;)"
        permanent_restriction="(&string;)" max_trp="(&non_negative_integer;)"
        scorefxn="(&string;)" />
```

-   **type**: 'Enum' de los posibles modos del mover.
-   **resfile**: Nombre del archivo resfile
-   **psipred_cmd**: Comando para ejecutar psipred
-   **blueprint**: Archivo blueprint
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **num_regions**: Número de regiones a mutar
-   **permanent_restriction**: XRW POR HACER
-   **max_trp**: Número máximo de triptófanos
-   **scorefxn**: Nombre de la función de puntuación a usar

---
