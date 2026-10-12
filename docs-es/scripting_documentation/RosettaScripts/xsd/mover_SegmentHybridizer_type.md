<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
SegmentHybridize toma el principio del protocolo cartesian hybridize para cerrar loops. Alinea fragmentos con la sección rota hasta que los extremos están lo bastante cerca (según se define con rms_frags) para usar el minimizador cartesiano para el cierre. El principio es permitir que roturas pequeñas cierren un hueco grande, con la idea de cerrar las pequeñas mediante minimización. Se puede usar para cerrar loops o para injertar (todavía muy experimental).

```xml
<SegmentHybridizer name="(&string;)" fa_scorefxn="(&string;)"
        frag_big="(9 &non_negative_integer;)"
        frag_smal="(3 &non_negative_integer;)"
        nfrags="(50 &non_negative_integer;)"
        cartfrag_overlap="(2 &non_negative_integer;)" use_seq="(false &bool;)"
        rms_frags="(0.5 &real;)" auto_mm="(1 &bool;)"
        frag_tries="(100 &integer;)" mc_cycles="(200 &non_negative_integer;)"
        temp="(2.0 &real;)" use_frags="(1 &bool;)"
        min_cycles="(5 &non_negative_integer;)" all_movable="(false &bool;)"
        extra_min="(false &bool;)" >
    <Span begin="(&string;)" end="(&string;)"
            extend_outside="(5 &non_negative_integer;)"
            extend_inside="(1 &non_negative_integer;)" />
</SegmentHybridizer>
```

-   **fa_scorefxn**: Nombre de la función de puntuación a usar
-   **frag_big**: qué tamaño de fragmento se debe usar para cerrar los huecos
-   **frag_smal**: XSD XRW: POR HACER
-   **nfrags**: XSD XRW: POR HACER
-   **cartfrag_overlap**: XSD XRW: POR HACER
-   **use_seq**: cómo se eligen los fragmentos: solo según la estructura secundaria, o según la estructura secundaria y la secuencia
-   **rms_frags**: a partir de qué tamaño de ruptura se usa el minimizador cartesiano para cerrar el hueco
-   **auto_mm**: si el MoveMap (que define qué se permite minimizar) debe configurarse automáticamente
-   **frag_tries**: cuántos fragmentos se deben probar
-   **mc_cycles**: XSD XRW: POR HACER
-   **temp**: XSD XRW: POR HACER
-   **use_frags**: XSD XRW: POR HACER
-   **min_cycles**: XSD XRW: POR HACER
-   **all_movable**: XSD XRW: POR HACER
-   **extra_min**: XSD XRW: POR HACER


Subetiqueta **Span**:   

-   **begin**: XSD XRW: POR HACER
-   **end**: XSD XRW: POR HACER
-   **extend_outside**: hasta dónde se puede salir del loop para permitir la hibridación de fragmentos que cierre el loop (ojo: si te alejas demasiado, puede que el loop no se cierre...)
-   **extend_inside**: XSD XRW: POR HACER

---
