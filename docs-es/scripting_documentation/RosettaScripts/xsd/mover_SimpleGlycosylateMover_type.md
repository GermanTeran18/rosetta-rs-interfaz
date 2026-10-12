<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Autores: Jared Adolf-Bryfogle (jadolfbr@gmail.com) y Jason W. Labonte (JWLabonte@jhu.edu)
Mover que añade las glicosilaciones especificadas a una Pose en las posiciones especificadas

Referencias e información de autoría del mover SimpleGlycosylateMover:

Autor(es) de SimpleGlycosylateMover (Mover):
Jared Adolf-Bryfogle, The Scripps Research Institute, La Jolla, CA [jadolfbr@gmail.com]

```xml
<SimpleGlycosylateMover name="(&string;)" glycosylation="(&string;)"
        glycosylations="(&string;)"
        position="(&refpose_enabled_residue_number;)"
        positions="(&refpose_enabled_residue_number_cslist;)"
        atom_name="(&string;)" weights="(&delimited_real_list;)"
        strip_existing="(&bool;)" ref_pose_name="(&string;)"
        idealize_glycosylation="(&bool;)" residue_selector="(&string;)" />
```

-   **glycosylation**: Cadena que especifica la glicosilación que se añade a esta Pose (cadena de glicano IUPAC) (o el nombre de un archivo con la glicosilación y extensión .iupac)
-   **glycosylations**: Cadena o nombre de archivo que especifica varias glicosilaciones posibles que se añaden a esta Pose (cadena de glicano IUPAC) (o el nombre de un archivo con la glicosilación y extensión .iupac) (se muestrean al azar)
-   **position**: Posición donde se añade la glicosilación
-   **positions**: Posiciones donde se añaden glicosilaciones
-   **atom_name**: Átomo al que se une químicamente el glicano
-   **weights**: Pesos de muestreo correspondientes al conjunto de glicanos dado
-   **strip_existing**: Elimina de la Pose las glicosilaciones existentes
-   **ref_pose_name**: Nombre de la Pose de referencia guardada
-   **idealize_glycosylation**: ¿Idealizar las glicosilaciones de la Pose?
-   **residue_selector**: . El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.

---
