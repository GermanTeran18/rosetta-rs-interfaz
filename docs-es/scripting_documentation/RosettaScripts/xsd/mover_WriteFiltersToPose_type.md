<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Toma los resultados de cualquier filtro y los escribe al final del archivo de la Pose.

```xml
<WriteFiltersToPose name="(&string;)" prefix="(&string;)"
        include_type="(false &bool;)" />
```

-   **prefix**: Prefijo que se añade a la salida del informe, para poder tener varias instancias de WriteFiltersToPose en distintos puntos de tu RosettaScripts sin que se sobrescriban entre sí.
-   **include_type**: Incluye el tipo de filtro en la salida (que lo quieras o no depende de cómo analices los archivos de Pose).

---
