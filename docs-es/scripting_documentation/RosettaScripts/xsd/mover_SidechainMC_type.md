<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
En una simulación Monte Carlo, mueve la cadena lateral de un conjunto de residuos identificados por una operación de tarea, de una manera que puede ser totalmente independiente de las asignaciones de rotámeros

```xml
<SidechainMC name="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)"
        ntrials="(10000 &non_negative_integer;)"
        preserve_detailed_balance="(1 &bool;)" temperature="(1.0 &real;)"
        inherit_scorefxn_temperature="(&bool;)" prob_uniform="(0.0 &real;)"
        prob_withinrot="(0.0 &real;)" prob_random_pert_current="(0.0 &real;)" />
```

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **ntrials**: Número de intentos.
-   **preserve_detailed_balance**: ¿La simulación debe preservar el balance detallado?
-   **temperature**: Temperatura de la simulación.
-   **inherit_scorefxn_temperature**: ¿La simulación debe heredar la temperatura dada por la función de puntuación?
-   **prob_uniform**: La probabilidad de muestreo uniforme de chi.
-   **prob_withinrot**: La probabilidad de muestreo dentro del rotámero.
-   **prob_random_pert_current**: La probabilidad de aplicar una perturbación aleatoria al valor de chi actual.

---
