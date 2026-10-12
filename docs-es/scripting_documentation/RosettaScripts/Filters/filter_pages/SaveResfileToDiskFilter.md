# SaveResfileToDisk
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SaveResfileToDisk

Guarda en el directorio de salida un resfile que especifica el aminoácido presente en cada posición definida por un conjunto de operaciones de tarea de entrada. Escribe "PIKAA X", donde X es el aminoácido actual del Pose en esa posición.

```xml
<SaveResfileToDisk name="(&string)" task_operations="(comma-delimited list of task operations)" designable_only="(0 &bool)" resfile_prefix="(&string)" resfile_suffix="(&string)" resfile_name="(&string)" resfile_general_property="(NATAA &string)" selected_resis_property="(&string)" renumber_pdb="(0 &bool)" />
```

-   task\_operations - Se usan para definir qué residuos se escriben en el resfile.
-   designable\_only - Si es true, solo se escriben las posiciones diseñables; si no, se escriben todas las posiciones reempaquetables.
-   resfile\_prefix - Un prefijo que se añadirá a cada resfile de salida.
-   resfile\_suffix - Un sufijo que se añadirá a cada resfile de salida.
-   resfile\_name - Un nombre para el resfile de salida, que irá entre el prefijo y el sufijo, si se especifican. Si no se especifica resfile\_name, se tomará el nombre del trabajo actual del distribuidor de trabajos y se usará ese.
-   resfile\_general\_property - Qué propiedad general debe ir al principio del resfile de salida.
-   selected\_resis\_property - Qué propiedad se usa para los residuos seleccionados (por defecto "PIKAA X", donde X es el aminoácido actual del Pose.
-   renumber\_pdb - Si es true, usa la numeración de residuos que correspondería a la salida con la opción -out:file:renumber\_pdb. Si no, usa la numeración actual del PDB. (Si ya has renumerado los residuos, no debería haber diferencia.)

## Véase también

* [[TaskOperations-RosettaScripts]]
* [[Docking proteína-proteína|docking-protocol]]
