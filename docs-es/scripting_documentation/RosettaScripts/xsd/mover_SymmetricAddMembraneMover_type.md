<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Versión de AddMembraneMover con soporte de simetría

```xml
<SymmetricAddMembraneMover name="(&string;)" spanfile="(&string;)"
        anchor_rsd="(&non_negative_integer;)"
        membrane_rsd="(&non_negative_integer;)" thickness="(&real;)"
        steepness="(&real;)" membrane_core="(&real;)"
        span_starts="(&residue_number_cslist;)"
        span_ends="(&residue_number_cslist;)" span_starts_num="(&string;)"
        span_ends_num="(&string;)" span_orientations="(&string;)"
        center="(&string;)" normal="(&string;)" >
    <Span start="(&non_negative_integer;)" end="(&non_negative_integer;)"
            orientation="(&string;)" />
</SymmetricAddMembraneMover>
```

-   **spanfile**: Ruta al spanfile de entrada
-   **anchor_rsd**: Índice del residuo ancla de la membrana
-   **membrane_rsd**: Posición del residuo de la membrana
-   **thickness**: Grosor de la membrana. La función de puntuación está optimizada para 15 Å.
-   **steepness**: Pendiente de la transición de la membrana. La función de puntuación está optimizada para 10.
-   **membrane_core**: anchura del núcleo de la membrana para el potencial LK calibrado de Elazar
-   **span_starts**: lista, separada por comas, de los residuos donde empiezan los spans
-   **span_ends**: lista, separada por comas, de los residuos donde terminan los spans
-   **span_starts_num**: lista, separada por comas, de los residuos donde empiezan los spans, en numeración de Rosetta
-   **span_ends_num**: lista, separada por comas, de los residuos donde terminan los spans, en numeración de Rosetta
-   **span_orientations**: lista, separada por comas, de las orientaciones de los spans; solo se permiten in2out o out2in
-   **center**: Posición del centro de la membrana en formato x,y,z
-   **normal**: Vector normal de la membrana en formato x,y,z


Subetiqueta **Span**:   

-   **start**: residuo donde empieza el span
-   **end**: residuo donde termina el span
-   **orientation**: orientación del span: in2out u out2in

---
