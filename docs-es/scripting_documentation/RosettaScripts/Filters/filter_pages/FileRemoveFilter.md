# FileRemove
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## FileRemove

Elimina un archivo del disco. Útil para limpiar al final de una trayectoria, si guardamos archivos intermedios. Pero hay que conocer de antemano los nombres de todos los archivos que se quieren borrar. No admite comodines.

```xml
<FileRemove name="(&string)" filenames="(comma delimited list, &string)" delete_contents_only="(0 &bool)"/>
```

-   filenames: lista de nombres de archivo separados por comas, p. ej., 3r2x\_0001.pdb,3r2x\_0002.pdb
-   delete\_contents\_only: si es true, solo elimina el contenido del archivo, pero deja un archivo marcador de posición de 0 bytes.

## Véase también

* [[FileExistFilter]]
