<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Usa pruebas de rotámeros (rotamer trials) para optimizar rápidamente las cadenas laterales dentro y alrededor del loop que se muestrea. Rotamer trials es un algoritmo voraz para empaquetar cadenas laterales. Cada residuo se considera solo una vez y se coloca en su rotámero óptimo

```xml
<RotamerTrialsRefiner name="(&string;)" loops_file="(&string;)"
        scorefxn="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **loops_file**: ruta al archivo de loops
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
