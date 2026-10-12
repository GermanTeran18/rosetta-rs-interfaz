<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
El mover RandomizeBBByRamaPrePro aleatoriza una cadena principal, o residuos seleccionados de una cadena principal, con un sesgo según las preferencias de Ramachandran de cada aminoácido, usando el término de energía RamaPrePro (que usa tablas de puntuación distintas para las posiciones anteriores a una prolina o a peptoides que para las demás posiciones).

```xml
<RandomizeBBByRamaPrePro name="(&string;)" residue_selector="(&string;)" />
```

-   **residue_selector**: Un selector de residuos opcional. Si se indica, el mover solo aleatoriza el subconjunto de residuos seleccionado. Si no se indica, el mover se aplica a toda la Pose. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.

---
