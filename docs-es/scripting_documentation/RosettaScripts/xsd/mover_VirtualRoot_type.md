<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Vuelve a enraizar el FoldTree de la Pose en un residuo virtual (nuevo). Es útil para la minimización en el contexto de marcos absolutos (restricciones de coordenadas, información de densidad electrónica, etc.). Por defecto, el mover añade a la Pose un residuo raíz virtual si no existe ya uno. Si más adelante quieres eliminar la raíz virtual, añade la raíz con un mover con removable en true y luego usa otro mover VirtualRoot aparte con remove en true para eliminarla.

```xml
<VirtualRoot name="(&string;)" remove="(&bool;)" removable="(&bool;)" />
```

-   **remove**: Elimina la raíz virtual de la Pose. Es útil para usarlo después de una llamada previa a VirtualRoot
-   **removable**: Ponlo en true si quieres que la raíz virtual se pueda eliminar. Consulta la opción remove.

---
