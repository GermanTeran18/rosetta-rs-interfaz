<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com)
Ejecuta un conjunto de SimpleMetrics sobre la Pose, con un prefijo y un sufijo concretos. (prefijo + custom_type + _ + nombre_de_métrica + sufijo) 

Referencias e información de autoría del mover RunSimpleMetrics:

Autor(es) de RunSimpleMetrics (Mover):
Jared Adolf-Bryfogle, The Scripps Research Institute, La Jolla, CA [jadolfbr@gmail.com]

```xml
<RunSimpleMetrics name="(&string;)" metrics="(&string;)" prefix="(&string;)"
        suffix="(&string;)" override="(false &bool;)"
        metric_to_bfactor="(&string;)" >
    <Simple Metric Tag ... />
</RunSimpleMetrics>
```

-   **metrics**: Lista, separada por comas, de simple_metrics definidos previamente que se añaden.
-   **prefix**: Etiqueta de prefijo para los valores que se añaden al archivo de puntuaciones de salida para estas métricas. (prefijo + custom_type + _ + nombre_de_métrica + sufijo)
-   **suffix**: Etiqueta de sufijo para los valores que se añaden al archivo de puntuaciones de salida para estas métricas. (prefijo + custom_type + _ + nombre_de_métrica + sufijo)
-   **override**: ¿Se deben sobrescribir los datos existentes?
-   **metric_to_bfactor**: Nombre de una PerResidueRealMetric cuyos valores se escriben en la columna del factor B.


"Simple Metric Tag": Cualquiera de las [[SimpleMetrics]]

---
