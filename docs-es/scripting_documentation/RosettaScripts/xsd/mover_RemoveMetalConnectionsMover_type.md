<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Un mover que elimina los enlaces entre metales y átomos que coordinan metales, añadidos con SetupMetalsMover o con la opción de línea de comandos -auto_setup_metals. Este mover también devuelve el residuo metálico y el residuo que coordina el metal a los tipos que no tienen los enlaces adicionales. Ten en cuenta que, por ahora, no elimina las restricciones de metales.

Referencias e información de autoría del mover RemoveMetalConnectionsMover:

Autor(es) de RemoveMetalConnectionsMover (Mover):
Vikram K. Mulligan, Center for Computational Biology, Flatiron Institute [vmulligan@flatironinstitute.org]  (Creó este mover.)

```xml
<RemoveMetalConnectionsMover name="(&string;)" residue_selector="(&string;)" />
```

-   **residue_selector**: Un selector de residuos para elegir los residuos de los que se eliminan los enlaces metálicos y los tipos variantes. Si se seleccionan un residuo Y el metal al que se une, se eliminan los enlaces y los tipos variantes de ambos. El mover se aplica a toda la Pose si no se indica ningún selector de residuos. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.

---
