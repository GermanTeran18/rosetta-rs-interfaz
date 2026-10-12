<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Selecciona todos los residuos que están unidos por un enlace químico a los residuos dados

```xml
<Bonded name="(&string;)" residue_selector="(&string;)"
        resnums="(&resnum_list_with_ranges;)" >
    <Residue Selector Tag ... />
</Bonded>
```

-   **residue_selector**: Nombre del selector de residuos que especifica los residuos de los que se seleccionan las parejas enlazadas. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **resnums**: Lista de números de residuo a usar


"Residue Selector Tag": Cualquiera de los [[ResidueSelectors]]

---
