<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
selector que selecciona todos los residuos entre los seleccionados por otro selector que no están intercalados con los seleccionados por un tercer selector. Es decir, rellena todos los huecos entre los residuos más N-terminal y más C-terminal del selector de terminales que no tienen entre ellos un residuo seleccionado por el selector de rotura.

```xml
<ConfluentSelector name="(&string;)" terminus_selector="(&string;)"
        breaking_selector="(&string;)" />
```

-   **terminus_selector**: Define los extremos de la selección. Se rellenan todos los huecos entre los residuos seleccionados por este selector. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **breaking_selector**: Este selector funciona de forma inversa al selector de terminales. Se conservan como huecos todos los huecos del selector de terminales que contienen al menos un residuo seleccionado por el selector de rotura. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.

---
