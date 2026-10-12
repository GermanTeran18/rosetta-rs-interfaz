<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
A partir de un ResidueSelector dado y limitado por un MoveMap, este mover selecciona los residuos cíclicos aplicables y hace un movimiento de cizalla de 180 grados en el que el enlace anomérico y el enlace de la cadena principal del lado opuesto del anillo se mueven en direcciones opuestas.

Referencias e información de autoría del mover RingPlaneFlipMover:

Autor(es) de RingPlaneFlipMover (Mover):
Jason W. Labonte, Department of Chemistry, Johns Hopkins University, Baltimore, MD [JWLabonte@jhu.edu]

```xml
<RingPlaneFlipMover name="(&string;)" residue_selector="(&string;)"
        movemap_factory="(&string;)" >
    <MoveMap name="(&string;)" bb="(&bool;)" chi="(&bool;)" jump="(&bool;)" >
        <Jump number="(&non_negative_integer;)" setting="(&bool;)" />
        <Chain number="(&non_negative_integer;)" chi="(&bool;)" bb="(&bool;)" />
        <Span begin="(&non_negative_integer;)" end="(&non_negative_integer;)"
                chi="(&bool;)" bb="(&bool;)" bondangle="(&bool;)" bondlength="(&bool;)" />
        <ResidueSelector selector="(&string;)" chi="(&bool;)" bb="(&bool;)"
                bondangle="(&bool;)" bondlength="(&bool;)" />
    </MoveMap>
</RingPlaneFlipMover>
```

-   **residue_selector**: El nombre de un ResidueSelector predefinido. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **movemap_factory**: El nombre de un MoveMapFactory predefinido.


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
