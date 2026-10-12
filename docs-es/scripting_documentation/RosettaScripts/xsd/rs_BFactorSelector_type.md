<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Selecciona residuos según los valores del factor B

Referencias e información de autoría del selector de residuos BFactorSelector:

Autor(es) de BFactorSelector (ResidueSelector):
AmeyaHarmalkar, Johns Hopkins University [aharmal1@jhu.edu]  (Escribió BFactorSelector.)

```xml
<BFactorSelector name="(&string;)" selector="(&string;)"
        lower_bfactor="(0.0 &real;)" upper_bfactor="(100.0 &real;)"
        lower="(0 &non_negative_integer;)" upper="(0 &non_negative_integer;)"
        min_contiguous_res="(3 &non_negative_integer;)"
        cross_chain_boundaries="(&bool;)" />
```

-   **selector**: . El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **lower_bfactor**: se seleccionarán los residuos con una puntuación igual o superior a este umbral
-   **upper_bfactor**: se seleccionarán los residuos con una puntuación igual o inferior a este umbral
-   **lower**: límite inferior para residuos contiguos (extremo N-terminal)
-   **upper**: límite superior para residuos contiguos (extremo C-terminal)
-   **min_contiguous_res**: Mínimo de segmentos contiguos aceptables; es decir, se seleccionarán los residuos cuyos tramos contiguos superen la opción min_contiguous_res y cumplan los criterios del umbral. Por ejemplo, si min_contiguous_res = 3 y BFactorSelector selecciona los residuos [12-15,17,18-19,23-27], con la opción min_contiguous_res la selección final sería [12-15,23-27], de modo que solo se seleccionan segmentos contiguos de residuos. Es útil si la salida de la selección se pasa a movers Backrub o KIC, que necesitan pivotes y puntos de corte.
-   **cross_chain_boundaries**: ¿Permitir que el selector cruce los límites entre cadenas? Por defecto es false.

---
