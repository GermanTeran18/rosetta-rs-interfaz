<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
(Este es un Mover de desarrollo y no está disponible en las versiones publicadas.) Una versión de SymMinMover consciente de las tareas, que permite minimizar solo ciertos conjuntos de residuos especificados mediante operaciones de tarea definidas por el usuario.

```xml
<TaskAwareSymMinMover name="(&string;)" scorefxn="(score12_symm &string;)"
        chi="(true &bool;)" bb="(false &bool;)" rb="(false &bool;)"
        symdofs="(&string;)" type="(lbfgs_armijo_nonmonotone &string;)"
        tolerance="(1e-5 &real;)" designable_only="(true &bool;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **scorefxn**: Función de puntuación a usar.
-   **chi**: Si se permite la minimización de cadenas laterales.
-   **bb**: Si se permite la minimización de la cadena principal.
-   **rb**: Si se permite la minimización de cuerpo rígido.
-   **symdofs**: Los DOF simétricos que se pueden mover (si rb está habilitado).
-   **type**: Tipo de minimización. Por ejemplo, también puede ser 'dfpmin_armijo_nonmonotone'.
-   **tolerance**: ¿Tolerancia de la minimización?
-   **designable_only**: Si es true, solo se minimizan los residuos diseñables.
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
