<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com) y Sebastian Raemish (raemish@scripps.edu).
Selecciona residuos con un buen ajuste de densidad electrónica. (O con un mal ajuste, usando la opción invert.) Para ello usa las herramientas internas de densidad. 
 Los números y los cortes coinciden bien con la herramienta de análisis de ajuste de densidad de Coot.
 Zscore usa una suma ponderada de la densidad, la densidad comparada con la de los vecinos, rama (cuando es aplicable) y cart_bonded para calcularlo)  
La correlación usa los mismos valores que se emplean para calcular las puntuaciones de densidad. Zscore: eLife 2016, Dimaio
CONSEJOS:
 Para hacer comparaciones con la nativa, ejecuta PerResidueDensityFit sobre la entrada (al principio del RS) y luego usa este selector sobre eso.

```xml
<DensityFitResidueSelector name="(&string;)" invert="(false &bool;)"
        cutoff="(-.5 &real;)" sliding_window_size="(3 &positive_integer;)"
        mixed_sliding_window="(false &bool;)" match_res="(false &bool;)"
        use_selector_as_zscore_mask="(true &bool;)" den_fit_metric="(&string;)"
        use_cache="(false &bool;)" prefix="(&string;)" suffix="(&string;)"
        fail_on_missing_cache="(false &bool;)" residue_selector="(&string;)" />
```

-   **invert**: Selecciona los residuos con mal ajuste de densidad en lugar de los de buen ajuste de densidad.
-   **cutoff**: Corte de mal ajuste a la densidad
-   **sliding_window_size**: Tamaño de la ventana deslizante para el cálculo de la densidad
-   **mixed_sliding_window**: Usa un tamaño de ventana de 3 para proteínas y 1 para glicanos. Puede sesgar los resultados.
-   **match_res**: Usa la correlación de densidad en lugar de un zscore para el ajuste a la densidad
-   **use_selector_as_zscore_mask**: Usa el selector como máscara verdadera para calcular el Zscore. En caso contrario, solo se usa como selección para el resultado. Por defecto es true.
-   **den_fit_metric**: Usa una métrica Per-Residue Density Fit definida previamente (úsala para guardar datos en caché)
-   **use_cache**: Usa los datos SM en caché en lugar de recalcular. Los datos se pueden guardar en caché llamando a RunSimpleMetrics sobre la métrica antes de usar este selector de residuos. La métrica tendrá que estar definida antes que este selector, quizá en otra sección de SIMPLE_METRICS.
-   **prefix**: Prefijo de los datos en caché.
-   **suffix**: Sufijo de los datos en caché.
-   **fail_on_missing_cache**: Si usamos datos en caché, ¿debe fallar si no hay caché?
-   **residue_selector**: Una máscara de selector de residuos. Se usa para calcular el Zscore solo entre un conjunto de residuos. Útil para la densidad de proteínas frente a glicanos. Como match_res NO es un zscore, el selector actúa como un selector `AND`, de modo que solo calculamos las correlaciones sobre este conjunto. . El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.

---
