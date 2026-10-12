<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Hace una generación de perfil de secuencia basada en alineamiento. TODO fordas

```xml
<SegmentSequenceProfileMover name="(&string;)" structure_store="(&string;)"
        residue_selector="(&string;)" rmsd_tolerance="(.5 &real;)"
        pseudocount="(1 &real;)" output_lookup_count="(&string;)"
        output_pssm_filename="(&string;)" output_pssm_inline="(&string;)"
        apply_profile="(true &bool;)"
        scaling="(prob &favor_seqprof_scaling_type;)" weight="(1 &real;)" />
```

-   **structure_store**: (OBLIGATORIO) Ruta del almacén de estructuras de destino.
-   **residue_selector**: (OBLIGATORIO) Selector de residuos que abarca una región de segmento contigua de la que se genera el perfil. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **rmsd_tolerance**: Tolerancia del RMSD del extremo en la búsqueda.
-   **pseudocount**: Pseudoconteo del perfil de secuencia.
-   **output_lookup_count**: Genera como entrada de puntuación el número de aciertos de la búsqueda.
-   **output_pssm_filename**: Genera el pssm de log-odds creado, con el nombre de archivo indicado.
-   **output_pssm_inline**: Genera el pssm de log-odds creado, dentro del pdb y bajo el nombre de encabezado indicado.
-   **apply_profile**: Aplica el perfil mediante FavorSequenceProfile.
-   **scaling**: Establece cómo se escalan los valores dados; consulta FavorSequenceProfile."prob"=probabilidad ponderada por Boltzmann según la puntuación del perfil"global"= reescalado lineal global con cero fijo, de modo que todos los valores (antes de ponderar) queden en el rango de -1.0 a 1.0"none" no ajusta los valores.
-   **weight**: Ajusta la intensidad de las restricciones tras el escalado; consulta FavorSequenceProfile.

---
