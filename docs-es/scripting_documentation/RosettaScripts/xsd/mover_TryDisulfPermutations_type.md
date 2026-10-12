<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Mover que prueba distintos conjuntos de posibles enlaces disulfuro entre residuos existentes capaces de formar disulfuros

Referencias e información de autoría del mover TryDisulfPermutations:

Autor(es) de TryDisulfPermutations (Mover):
Vikram K. Mulligan, Systems Biology, Center for Computational Biology, Flatiron Institute [vmulligan@flatironinstitute.org]

```xml
<TryDisulfPermutations name="(&string;)" selector="(&string;)"
        consider_already_bonded="(&bool;)" min_type="(&minimizer_type;)"
        min_tolerance="(&real;)" />
```

-   **selector**: Selector de residuos que especifica qué residuos se consideran. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **consider_already_bonded**: También muestrea permutaciones de disulfuros que ya están enlazados
-   **min_type**: Tipo de minimización que se hace
-   **min_tolerance**: tolerancia del minimizador

---
