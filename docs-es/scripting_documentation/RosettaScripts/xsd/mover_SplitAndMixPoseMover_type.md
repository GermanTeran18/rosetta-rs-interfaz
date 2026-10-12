<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Divide una Pose en las piezas solicitadas y las une de nuevo. Permite intercambiar el orden

```xml
<SplitAndMixPoseMover name="(&string;)" order="(&string;)"
        merge_chains="(0 &bool;)" try_all_pairs="(0 &bool;)"
        exclude_consecutive="(1 &bool;)" max_distance="(-1 &real;)"
        residue_selector="(&string;)" />
```

-   **order**: Números separados por comas que definen el orden en que se vuelven a unir los segmentos
-   **merge_chains**: Si es true, todas las piezas se fusionan en una sola cadena. En caso contrario, la cadena de una pieza se asigna según su cadena original.
-   **try_all_pairs**: Si es true, todas las piezas se fusionan en una sola cadena
-   **exclude_consecutive**: Si es true, y try_all_pairs es true, evita probar subPoses consecutivas. Solo se aplica cuando try_all_pairs=True.
-   **max_distance**: Si es positivo, y try_all_pairs es true, limita la distancia entre el extremo N-terminal y el C-terminal para generar una pareja. Solo se aplica cuando try_all_pairs=True.
-   **residue_selector**: (OBLIGATORIO) ResidueSelector que define las regiones de la Pose que se conservan El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.

---
