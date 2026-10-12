<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
BlockSelector selecciona regiones de bloques continuos de un selector de entrada. Asegúrate de usar algún otro selector para trocear el selector en bloques contables.

```xml
<BlockSelector name="(&string;)" block_number="(1 &non_negative_integer;)"
        inverse="(false &xs:boolean;)" selector="(&string;)" />
```

-   **block_number**: Qué bloque de residuos se selecciona
-   **inverse**: Si es true, el bloque 1 es el bloque más cercano al extremo C-terminal
-   **selector**: selector de residuos del que se selecciona un bloque continuo. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.

---
