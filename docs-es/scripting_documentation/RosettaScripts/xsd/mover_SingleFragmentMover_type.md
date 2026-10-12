<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Hace un único movimiento de inserción de fragmento en la Pose. Respeta las restricciones impuestas por el MoveMap del usuario y por la cinemática subyacente de la Pose (es decir, el FoldTree). Por defecto, todas las torsiones de la cadena principal son móviles.

```xml
<SingleFragmentMover name="(&string;)" fragments="(&string;)"
        policy="(uniform &policy_type;)" >
    <MoveMap name="(&string;)" bb="(&bool;)" chi="(&bool;)" jump="(&bool;)" >
        <Jump number="(&non_negative_integer;)" setting="(&bool;)" />
        <Chain number="(&non_negative_integer;)" chi="(&bool;)" bb="(&bool;)" />
        <Span begin="(&non_negative_integer;)" end="(&non_negative_integer;)"
                chi="(&bool;)" bb="(&bool;)" bondangle="(&bool;)" bondlength="(&bool;)" />
        <ResidueSelector selector="(&string;)" chi="(&bool;)" bb="(&bool;)"
                bondangle="(&bool;)" bondlength="(&bool;)" />
    </MoveMap>
</SingleFragmentMover>
```

-   **fragments**: (OBLIGATORIO) Archivo de fragmentos. Los fragmentos se usan en el ensamblaje de proteínas, ya sea para predicción de estructura o para diseño, para reducir el tamaño del espacio de búsqueda del plegamiento. Son una parte esencial del diseño en Rosetta. : Muchos protocolos usan bibliotecas de fragmentos, pero son una parte esencial de ab initio.
-   **policy**: El objeto de política se encarga de elegir entre los posibles fragmentos que contiene el archivo de fragmentos. Por ahora se admiten dos políticas: 'uniform' y 'smooth'. La primera elige de manera uniforme entre el conjunto de posibilidades. La segunda elige el fragmento que, al aplicarlo, causa la mínima distorsión en la Pose.


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
