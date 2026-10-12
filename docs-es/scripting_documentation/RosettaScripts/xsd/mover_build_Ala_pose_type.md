<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<build_Ala_pose name="(&string;)" partner1="(0 &bool;)" partner2="(1 &bool;)"
        interface_cutoff_distance="(8.0 &real;)" AA="(ALA &string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **partner1**: Diseña/reempaqueta la primera cadena
-   **partner2**: Diseña/reempaqueta la segunda cadena
-   **interface_cutoff_distance**: Distancia a la interfaz que cuenta para el backrub
-   **AA**: Aminoácido, por nombre, a partir del cual se construye la Pose
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
