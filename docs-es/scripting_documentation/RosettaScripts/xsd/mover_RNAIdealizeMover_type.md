<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Idealiza una Pose, llevando sus longitudes y ángulos de enlace hacia los valores ideales mediante relajaciones repetidas

```xml
<RNAIdealizeMover name="(&string;)" iterations="(&positive_integer;)"
        noise="(&bool;)" final_minimize="(&bool;)"
        ang_significance_threshold="(&real;)" />
```

-   **iterations**: Número de iteraciones en las que repartir la idealización.
-   **noise**: Añade a la Pose inicial algo de ruido gaussiano.
-   **final_minimize**: Minimiza toda la Pose de una vez al final.
-   **ang_significance_threshold**: Tamaño de la desviación angular que se corrige (en grados).

---
