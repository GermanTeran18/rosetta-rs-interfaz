<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Aplica al azar un mover de una lista, según pesos de probabilidad dados

```xml
<RandomMover name="(&string;)" movers="(&string;)"
        weights="(&xsct_real_cslist_w_ws;)"
        mover_repeats="(&xsct_real_cslist_w_ws;)"
        repeats="(1 &non_negative_integer;)" />
```

-   **movers**: El atributo movers toma una lista de nombres de movers separados por comas.
-   **weights**: SIN ESPACIOS entre las comas y los valores. El atributo weights toma una lista de pesos separados por comas cuya suma es 1.
-   **mover_repeats**: Lista separada por comas de repeticiones, donde se repite el mover N veces. Permite repeticiones probabilísticas.
-   **repeats**: Número de veces que se aplican los movers. XDW POR HACER

---
