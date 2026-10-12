<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Herramienta de visualización de rejillas

```xml
<RenderGridsToKinemage name="(&string;)" grid_name="(&string;)"
        file_name="(&string;)" low_color="(&three_dim_real_vector;)"
        zero_color="(&three_dim_real_vector;)"
        high_color="(&three_dim_real_vector;)" color="(&three_dim_real_vector;)"
        gradient_bins="(10 &non_negative_integer;)"
        stride="(2 &non_negative_integer;)" grid_set="(default &string;)" />
```

-   **grid_name**: (OBLIGATORIO) El nombre de la rejilla que se vuelca al archivo
-   **file_name**: (OBLIGATORIO) El nombre del archivo al que se vuelca la rejilla indicada
-   **low_color**: Valores RGB del color que se usa para el valor bajo
-   **zero_color**: Valores RGB del color que se usa para el cero
-   **high_color**: Valores RGB del color que se usa para el valor alto
-   **color**: Valores RGB del color a usar
-   **gradient_bins**: Tamaño de los intervalos a usar
-   **stride**: Separación entre los colores posibles
-   **grid_set**: El Grid Set del que se toma la rejilla.

---
