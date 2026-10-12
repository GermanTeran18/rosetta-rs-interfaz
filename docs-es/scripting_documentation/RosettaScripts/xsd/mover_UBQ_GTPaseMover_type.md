<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Un mover para modelar docking mediante un enlace LYX.

```xml
<UBQ_GTPaseMover name="(&string;)" binding_lysine="(&string;)"
        UBQpdb="(&string;)" extraBodies="(&xs:boolean;)"
        numTailRes="(&non_negative_integer;)" scorefilter="(&real;)"
        SASAfilter="(&real;)" lys_num="(&integer;)" />
```

-   **binding_lysine**: Un selector de residuos que da el residuo de lisina del sustrato al que se une UBQ. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **UBQpdb**: Ruta del archivo pdb de UBQ
-   **extraBodies**: Si hay cuerpos adicionales en la simulación.
-   **numTailRes**: Número de residuos de la cola de la ubiquitina.
-   **scorefilter**: Filtro para la puntuación total
-   **SASAfilter**: Filtro para la SASA
-   **lys_num**: Un entero que da el residuo de lisina al que se une UBQ. Usa esto o binding_lysine.

---
