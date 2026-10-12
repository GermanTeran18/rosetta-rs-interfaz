<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
trocea proteínas con repeticiones en miniproteínas

```xml
<SliceToMiniProteinMover name="(&string;)" scorefxn="(&string;)"
        max_length="(119 &non_negative_integer;)"
        min_sse_count="(4 &non_negative_integer;)"
        min_sse_length="(13 &non_negative_integer;)"
        ddg_ala_slice_score="(-5.0 &real;)" relax_mover="(&string;)"
        output_mode="(all &string;)" residue_selector="(&string;)" />
```

-   **scorefxn**: Nombre de la función de puntuación a usar
-   **max_length**: longitud máxima de la miniproteína
-   **min_sse_count**: número mínimo de elementos de estructura secundaria
-   **min_sse_length**: longitud mínima de los elementos de estructura secundaria
-   **ddg_ala_slice_score**: energía al trocear la miniproteína
-   **relax_mover**: Define opcionalmente un mover que se aplica antes de calcular la energía del sistema en el estado no unido.
-   **output_mode**: modo de salida: all, longest, best_ddg
-   **residue_selector**: nombre de un selector de residuos que especifica el subconjunto que puede formar parte de la miniproteína. Nota: este segmento debe ser contiguo. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.

---
