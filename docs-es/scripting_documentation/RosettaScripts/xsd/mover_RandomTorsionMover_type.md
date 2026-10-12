<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<RandomTorsionMover name="(&string;)" max_angle="(&real;)"
        num_moves="(&non_negative_integer;)" >
    <MoveMap name="(&string;)" bb="(&bool;)" chi="(&bool;)" jump="(&bool;)" >
        <Jump number="(&non_negative_integer;)" setting="(&bool;)" />
        <Chain number="(&non_negative_integer;)" chi="(&bool;)" bb="(&bool;)" />
        <Span begin="(&non_negative_integer;)" end="(&non_negative_integer;)"
                chi="(&bool;)" bb="(&bool;)" bondangle="(&bool;)" bondlength="(&bool;)" />
        <ResidueSelector selector="(&string;)" chi="(&bool;)" bb="(&bool;)"
                bondangle="(&bool;)" bondlength="(&bool;)" />
    </MoveMap>
</RandomTorsionMover>
```

-   **max_angle**: XRW POR HACER
-   **num_moves**: XRW POR HACER


Subetiqueta **MoveMap**:   especificación del MoveMap

-   **bb**: ¿Mover los ángulos de torsión de la cadena principal?
-   **chi**: ¿Mover los ángulos de torsión chi de la cadena lateral?
-   **jump**: ¿Mover todos los saltos?


Subetiqueta **Jump**:   los saltos son las conexiones de coordenadas internas, no químicas, entre partes separadas de tu Pose

-   **number**: (OBLIGATORIO) Qué número de salto (en el FoldTree)
-   **setting**: (OBLIGATORIO) true para mover, false para no mover

Subetiqueta **Chain**:   controla una cadena cinemáticamente contigua (piensa en las cadenas de proteínas)

-   **number**: (OBLIGATORIO) ¿Qué cadena?
-   **chi**: (OBLIGATORIO) ¿Mover los ángulos de torsión chi de la cadena lateral?
-   **bb**: (OBLIGATORIO) ¿Mover los ángulos de torsión de la cadena principal?

Subetiqueta **Span**:   XRW POR HACER, probablemente una región de la Pose definida por el usuario

-   **begin**: (OBLIGATORIO) inicio del tramo
-   **end**: (OBLIGATORIO) fin del tramo
-   **chi**: (OBLIGATORIO) ¿Mover los ángulos de torsión chi de la cadena lateral?
-   **bb**: (OBLIGATORIO) ¿Mover los ángulos de torsión de la cadena principal?
-   **bondangle**: ¿Mover los ángulos de tres cuerpos?
-   **bondlength**: ¿Mover las longitudes de dos cuerpos?

Subetiqueta **ResidueSelector**:   Región de la Pose definida por un selector de residuos.

-   **selector**: (OBLIGATORIO) Selector de residuos
-   **chi**: (OBLIGATORIO) ¿Mover los ángulos de torsión chi de la cadena lateral?
-   **bb**: (OBLIGATORIO) ¿Mover los ángulos de torsión de la cadena principal?
-   **bondangle**: ¿Mover los ángulos de tres cuerpos?
-   **bondlength**: ¿Mover las longitudes de dos cuerpos?

---
