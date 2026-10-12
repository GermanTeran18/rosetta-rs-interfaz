<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
El AndResidueSelector combina la salida de varios ResidueSelectors con lógica AND; es decir, solo se seleccionan los residuos seleccionados por TODOS los ResidueSelectors contenidos. Los ResidueSelectors se pueden tomar de un DataMap, de subetiquetas (para los ResidueSelectors conocidos por el ResidueSelectorFactory) o mediante programación con %add_residue_selector.

```xml
<And name="(&string;)" selectors="(&string;)" >
    <Residue Selector Tag ... />
</And>
```

-   **selectors**: Lista de residuos seleccionados, separados por comas. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.


"Residue Selector Tag": Cualquiera de los [[ResidueSelectors]]

---
