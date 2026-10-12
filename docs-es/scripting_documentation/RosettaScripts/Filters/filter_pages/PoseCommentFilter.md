# PoseComment
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## PoseComment

Comprueba la existencia o el valor de un comentario en el Pose. Es útil para controlar el flujo de ejecución: si los comentarios del Pose se han modificado, se hace una cosa u otra.

```xml
<PoseComment name="(&string)" comment_name="(&string, '' )" comment_value="(&string, '')" comment_exists="(&bool, false )"/>
```
- comment_name: el valor clave del comentario
- comment_value: el valor del comentario
- comment_exists: comprueba solo si el comentario existe o no, sin importar su contenido.

Si ejecutas con comment_name="", se comprueban todos los comentarios del Pose para encontrar el valor solicitado.

## Véase también:

* [[LoadPDBMover]]
* [[PoseInfoFilter]]
