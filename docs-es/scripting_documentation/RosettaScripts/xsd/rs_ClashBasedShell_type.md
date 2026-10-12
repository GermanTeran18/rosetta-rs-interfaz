<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
El ClashBasedShellSelector identifica todos los residuos que chocan con al menos un rotámero de una selección de residuos dada.

```xml
<ClashBasedShell name="(&string;)" scorefxn="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" residue_selector="(&string;)"
        resnums="(&int_cslist;)" invert="(false &bool;)"
        num_shells="(1 &non_negative_integer;)" include_focus="(true &bool;)"
        focus_on_designable="(true &bool;)" bump_overlap_factor="(0.5 &real;)" >
    <Residue Selector Tag ... />
</ClashBasedShell>
```

-   **scorefxn**: Nombre de la función de puntuación a usar
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **residue_selector**: . El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **resnums**: Los residuos alrededor de los cuales se construye la capa. También se pueden especificar mediante las opciones 'selector' o 'task_operations', o mediante una subetiqueta ResidueSelector.
-   **invert**: Selecciona los residuos que NO forman parte de la capa basada en choques.
-   **num_shells**: El número de capas que se calculan.
-   **include_focus**: Si es true, incluye los residuos de enfoque en la selección final.
-   **focus_on_designable**: Solo se aplica si se da 'task_operations'. Por defecto, al construir la capa solo se consideran los residuos que se pueden diseñar. Ponlo en 'false' para considerar también los residuos que se pueden reempaquetar.
-   **bump_overlap_factor**: Se considera que dos átomos chocan cuando el cuadrado de la distancia entre ellos es menor que: bump_overlap_factor * {suma de los radios de Lennard-Jones}^2


"Residue Selector Tag": Cualquiera de los [[ResidueSelectors]]

---
