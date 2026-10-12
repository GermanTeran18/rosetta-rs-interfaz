<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Movimientos de torsión de la cadena principal de estilo small-move que, a diferencia de shear, no minimizan la propagación aguas abajo.

```xml
<Small name="(&string;)" temperature="(&real;)"
        nmoves="(&non_negative_integer;)" angle_max="(6.0 &real;)"
        preserve_detailed_balance="(&bool;)" scorefxn="(&string;)"
        residue_selector="(&string;)" >
    <MoveMap name="(&string;)" bb="(&bool;)" chi="(&bool;)" jump="(&bool;)" >
        <Jump number="(&non_negative_integer;)" setting="(&bool;)" />
        <Chain number="(&non_negative_integer;)" chi="(&bool;)" bb="(&bool;)" />
        <Span begin="(&non_negative_integer;)" end="(&non_negative_integer;)"
                chi="(&bool;)" bb="(&bool;)" bondangle="(&bool;)" bondlength="(&bool;)" />
        <ResidueSelector selector="(&string;)" chi="(&bool;)" bb="(&bool;)"
                bondangle="(&bool;)" bondlength="(&bool;)" />
    </MoveMap>
</Small>
```

-   **temperature**: Qué temperatura de aceptación MC se usa (solo prueba la puntuación rama, así que no es un MC completo)
-   **nmoves**: Cuántos movimientos consecutivos se hacen
-   **angle_max**: Cuánto se perturba la cadena principal
-   **preserve_detailed_balance**: Si es true, no se evalúa el criterio de aceptación de MC y siempre se acepta
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **residue_selector**: Un ResidueSelector opcional, definido previamente, que especifica el subconjunto de residuos al que se aplica el mover. Si no se indica, el mover se aplica a toda la Pose. (Alternativamente, se puede usar un MoveMap; ver más abajo). El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.


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
