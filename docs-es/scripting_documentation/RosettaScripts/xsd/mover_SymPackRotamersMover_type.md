<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Reempaqueta las cadenas laterales con opciones del usuario, incluidas TaskOperations. 
 NOTA: Este Mover se ofrece solo por compatibilidad histórica. El PackRotamersMover normal debería manejar la simetría de forma transparente y es preferible.

```xml
<SymPackRotamersMover name="(&string;)" nloop="(1 &non_negative_integer;)"
        scorefxn="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **nloop**: Equivale a "-ndruns". Número de ejecuciones completas de empaquetado antes de producir una salida (la de mejor puntuación).
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
