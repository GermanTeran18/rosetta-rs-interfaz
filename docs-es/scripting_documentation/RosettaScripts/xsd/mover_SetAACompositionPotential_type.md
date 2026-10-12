<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Fija la composición de aminoácidos objetivo de una Pose y añade el término correspondiente a la función de puntuación indicada

```xml
<SetAACompositionPotential name="(&string;)" file="(&string;)"
        weight="(1.0 &real;)" scorefxn="(&string;)" />
```

-   **file**: (OBLIGATORIO) Archivo que especifica la composición de aminoácidos deseada
-   **weight**: Peso del potencial de composición de aminoácidos
-   **scorefxn**: (OBLIGATORIO) Función de puntuación a la que se añade este potencial

---
