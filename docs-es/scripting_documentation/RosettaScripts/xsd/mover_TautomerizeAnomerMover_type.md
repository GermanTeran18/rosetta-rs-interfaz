<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Este Mover específico de carbohidratos selecciona al azar un extremo reductor libre (que no sea un glucósido) e invierte la estereoquímica, cambiando anómeros alfa por beta y beta por alfa. (Podría considerarse un caso de diseño extremadamente limitado; sin embargo, los extremos reductores se tautomerizan fácilmente en disolución, a diferencia de otros casos, en los que los residuos no mutan con facilidad en otros.) Generalmente no se sabe con certeza qué forma se prefiere (si es que hay alguna) en las proteínas que se unen a azúcares, y las estructuras cristalinas a veces asignan arbitrariamente un anómero en lugar de otro al ajustar la densidad, por lo que este Mover puede asegurar que se muestrea cada anómero.

Referencias e información de autoría del mover TautomerizeAnomerMover:

Autor(es) de TautomerizeAnomerMover (Mover):
Jason W. Labonte, Department of Chemistry, Johns Hopkins University, Baltimore, MD [JWLabonte@jhu.edu]

```xml
<TautomerizeAnomerMover name="(&string;)" residue_selector="(&string;)" />
```

-   **residue_selector**: El nombre de un ResidueSelector predefinido. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.

---
