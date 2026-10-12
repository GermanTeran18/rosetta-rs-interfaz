<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Este Mover aplica la función de puntuación a tu Pose

```xml
<ScoreMover name="(&string;)" scorefxn="(&string;)" verbose="(&bool;)" />
```

-   **scorefxn**: Función de puntuación que se usa para puntuar esta Pose. Debe estar definida previamente en el DataMap. En caso contrario, se usa la función de puntuación por defecto.
-   **verbose**: booleano que controla un conjunto de salidas adicionales: pose.energies.show() y algo llamado jd2:ScoreMap

---
