<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<TaskAwareMinMover name="(&string;)" chi="(&bool;)" bb="(&bool;)"
        jump="(&bool;)" max_iter="(200 &positive_integer;)"
        type="(lbfgs_armijo_nonmonotone &minimizer_type;)"
        tolerance="(0.01 &real;)" cartesian="(false &bool;)"
        bondangle="(0 &bool;)" bondlength="(0 &bool;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" scorefxn="(&string;)" />
```

-   **chi**: Permite que los grados de libertad chi se minimicen
-   **bb**: Permite que los grados de libertad de la cadena principal se minimicen
-   **jump**: Permite que los grados de libertad de salto se minimicen
-   **max_iter**: Número de iteraciones
-   **type**: Tipo de minimizador, elegido de una larga lista de algoritmos
-   **tolerance**: Tolerancia de minimización (absoluta)
-   **cartesian**: Usa minimización cartesiana (no de coordenadas internas)
-   **bondangle**: Minimiza los grados de libertad de los ángulos de enlace
-   **bondlength**: Minimiza los grados de libertad de las longitudes de enlace
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **scorefxn**: Nombre de la función de puntuación a usar

---
