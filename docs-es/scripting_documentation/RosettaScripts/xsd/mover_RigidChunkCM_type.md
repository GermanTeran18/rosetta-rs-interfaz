<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Mantiene constante una región especificada de la Pose, fija en las coordenadas del archivo pdb molde.

```xml
<RigidChunkCM name="(&string;)" selector="(&string;)"
        region_selector="(&string;)" apply_to_template="(&string;)"
        template="(&string;)" region_file="(&string;)" region="(&string;)" />
```

-   **selector**: Selector de residuos que especifica la región sobre la que se aplica este mover cliente. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **region_selector**: Selector de residuos que especifica la región del PDB molde que se usa como molde para la Pose. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **apply_to_template**: Lista de movers, separados por comas, que se aplican a la región del molde
-   **template**: Archivo PDB que se usa como molde de la región indicada. Si en su lugar se da el argumento 'INPUT', fija las coordenadas en sus posiciones actuales
-   **region_file**: Archivo de loops que especifica la región del PDB molde que se usa como molde para la Pose
-   **region**: Cadena que especifica los índices de los residuos que se usan como molde

---
