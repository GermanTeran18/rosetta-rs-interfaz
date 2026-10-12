<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Un único proceso que cambia estocásticamente entre niveles de temperatura

```xml
<SimulatedTempering name="(&string;)" temp_file="(&string;)"
        temp_low="(0.6 &real;)" temp_high="(3.0 &real;)"
        temp_levels="(10 &non_negative_integer;)"
        temp_interpolation="(linear &interpolation_type;)"
        temp_stride="(100 &non_negative_integer;)"
        io_stride="(10000 &non_negative_integer;)"
        trust_current_temp="(true &bool;)" stats_line_output="(false &bool;)"
        stats_silent_output="(false &bool;)"
        stats_file="(tempering.stats &string;)" score_offset="(40.0 &real;)"
        temperature_jumps="(false &bool;)" reweight_stride="(false &bool;)" />
```

-   **temp_file**: XRW POR HACER
-   **temp_low**: XRW POR HACER
-   **temp_high**: XRW POR HACER
-   **temp_levels**: XRW POR HACER
-   **temp_interpolation**: XRW POR HACER
-   **temp_stride**: XRW POR HACER
-   **io_stride**: XRW POR HACER
-   **trust_current_temp**: XRW POR HACER
-   **stats_line_output**: XRW POR HACER
-   **stats_silent_output**: XRW POR HACER
-   **stats_file**: XRW POR HACER
-   **score_offset**: Desplazamiento de la puntuación (escala todos los pesos)
-   **temperature_jumps**: Salta a cualquier temperatura, no solo en un nivel
-   **reweight_stride**: Cuántos intentos pasan entre cada reponderación automática

---
