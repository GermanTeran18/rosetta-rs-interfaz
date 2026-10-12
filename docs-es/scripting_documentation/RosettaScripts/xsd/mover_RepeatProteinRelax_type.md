<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
configura la simetría de repeticiones internas o hace un relax con simetría de repeticiones, según la llamada

```xml
<RepeatProteinRelax name="(&string;)" numb_repeats="(&non_negative_integer;)"
        minimize="(false &bool;)" loop_cutpoint_mode="(false &bool;)"
        relax_iterations="(5 &non_negative_integer;)" cartesian="(false &bool;)"
        min_type="(lbfgs_armijo_nonmonotone &string;)"
        remove_symmetry="(true &bool;)"
        modify_symmetry_and_exit="(false &bool;)" scorefxn="(&string;)" />
```

-   **numb_repeats**: (OBLIGATORIO) número de repeticiones a generar
-   **minimize**: minimiza en lugar de relajar
-   **loop_cutpoint_mode**: añade un punto de corte al loop más largo, pero mantiene rígidas las uniones
-   **relax_iterations**: número de iteraciones de relax
-   **cartesian**: relax cartesiano
-   **min_type**: tipo de minimización
-   **remove_symmetry**: elimina la configuración de simetría tras el mover
-   **modify_symmetry_and_exit**: configura la simetría y termina; ten en cuenta que no elimina la simetría
-   **scorefxn**: Función de puntuación usada en el relax

---
