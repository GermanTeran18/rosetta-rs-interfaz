<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Restringe el diseño para que no incluya un residuo como posibilidad en la tarea en una posición, salvo que sea el residuo inicial. Si se deja resnum en 0, la restricción se aplica a toda la Pose.

```xml
<DisallowIfNonnativeRLT name="(&string;)" disallow_aas="(&string;)" />
```

-   **disallow_aas**: (OBLIGATORIO) toma una cadena de códigos de aminoácidos de una letra, sin separación. Por ejemplo, disallow_aas=GCP impediría diseñar Gly, Cys y Pro, salvo que fueran el aminoácido nativo en una posición. Esta tarea es útil cuando diseñas en una región que tiene Gly y Pro y no quieres incluirlos en otras posiciones que no eran ya Gly o Pro.

---
