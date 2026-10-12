# FileExist
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## FileExist

¿Existe un archivo en el disco? Útil para saber si estamos recuperándonos de un checkpoint.

```xml
<FileExist name="(&string)" filename="(&string)" ignore_zero_bytes="(0 &bool)"/>
```

-   filename: qué nombre de archivo se comprueba.
-   ignore\_zero\_bytes: si es true, los archivos que son meros marcadores de posición (no contienen nada) se tratan como inexistentes (el filtro devuelve false).

## Véase también

* [[FileRemoveFilter]]
