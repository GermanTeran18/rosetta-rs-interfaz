<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Reempaqueta las cadenas laterales dentro y alrededor del loop que se muestrea.

```xml
<RepackingRefiner name="(&string;)" loops_file="(&string;)"
        once_every="(&non_negative_integer;)" scorefxn="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **loops_file**: ruta al archivo de loops
-   **once_every**: Activa el reempaquetado cada N ciclos.
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
