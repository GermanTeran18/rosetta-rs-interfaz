<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Aplica repetidamente un mover dado mientras hace una rampa de la puntuación de un valor bajo a un valor alto

```xml
<RampingMover name="(&string;)" start_weight="(&real;)" end_weight="(&real;)"
        scoretype="(&string;)" ramp_func="(&ramp_func_name;)"
        inner_cycles="(&non_negative_integer;)"
        outer_cycles="(&non_negative_integer;)" mover="(&string;)"
        montecarlo="(none &string;)" />
```

-   **start_weight**: (OBLIGATORIO) peso inicial de la rampa.
-   **end_weight**: (OBLIGATORIO) peso final de la rampa.
-   **scoretype**: (OBLIGATORIO) nombre del término de puntuación sobre el que se hace la rampa.
-   **ramp_func**: (OBLIGATORIO) la función de rampa a usar.
-   **inner_cycles**: (OBLIGATORIO) número de veces que se llama al mover interno en cada incremento de la rampa de puntuación.
-   **outer_cycles**: (OBLIGATORIO) número de incrementos en los que se hace la rampa de puntuación.
-   **mover**: (OBLIGATORIO) nombre del mover interno a usar.
-   **montecarlo**: el nombre del objeto montecarlo a usar.

---
