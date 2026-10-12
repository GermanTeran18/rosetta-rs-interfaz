# PoseInfo
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## PoseInfo


Está pensado principalmente para depuración. Cuando se invoca, imprime información básica del Pose (p. ej., la numeración PDB y la disposición del FoldTree) en la salida estándar o del tracer.

Este filtro \*siempre\* devuelve true, por lo que no se recomienda usarlo con la opción estándar "confidence", ya que eso puede hacer que el filtro no se aplique cuando quieres que se aplique (y que, por tanto, no obtengas la salida del tracer).

```xml
<PoseInfo name="(&string)"/>
```

## Véase también:

* [[LoadPDBMover]]
* [[PoseCommentFilter]]
