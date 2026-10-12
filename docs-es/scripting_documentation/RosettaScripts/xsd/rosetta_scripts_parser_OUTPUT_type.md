<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
El elemento OUTPUT controla la función de puntuación final que usa RosettaScripts antes de generar una Pose. Si, por ejemplo, has estado usando en tu protocolo una función de puntuación con restricciones, pero al final quieres generar las puntuaciones sin restricciones, puedes fijar en el elemento OUTPUT una ScoreFunction con pesos de restricciones iguales a cero, y RosettaScripts volverá a puntuar la Pose con esa ScoreFunction justo antes de escribir las puntuaciones en disco.

```xml
<OUTPUT scorefxn="(&string;)" />
```

-   **scorefxn**: Nombre de la función de puntuación a usar

---
