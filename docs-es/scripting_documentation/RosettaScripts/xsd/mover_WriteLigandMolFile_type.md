<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Genera un registro de archivo mol V2000 con todos los átomos de la cadena de ligando especificada y todos los datos almacenados en el Job actual para cada Pose procesada

```xml
<WriteLigandMolFile name="(&string;)" hash_file_names="(false &string;)"
        chain="(&string;)" directory="(&string;)" prefix="(&string;)"
        use_residue_name="(false &bool;)" />
```

-   **hash_file_names**: Parece que no se usa.
-   **chain**: (OBLIGATORIO) El ID de cadena del PDB del ligando que se genera en la salida.
-   **directory**: (OBLIGATORIO) El directorio al que se envían todos los registros mol. El directorio se crea si no existe.
-   **prefix**: Fija un prefijo de archivo para los archivos de salida.
-   **use_residue_name**: Usa el nombre del residuo como parte del prefijo de los archivos de salida.

---
