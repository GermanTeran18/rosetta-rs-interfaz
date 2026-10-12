<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Configura una paleta de packer vacía, que no especifica ningún residuo, sin opciones configurables por el usuario. Esto restringe el packer al reempaquetado. Ten en cuenta que este comportamiento se puede conseguir con la operación de tarea RestrictToRepacking, pero hacerlo con el PackerPalette puede ser preferible, ya que significa que, internamente, no se configura innecesariamente una lista de ResidueTypes solo para eliminarlos todos después.

```xml
<NoDesignPackerPalette name="(&string;)" />
```



---
