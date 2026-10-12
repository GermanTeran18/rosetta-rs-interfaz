<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Código de interfaz de refinamiento cristalográfico con PHENIX. Convierte los pesos de una función de puntuación en pesos para el término xtal_ml de otra función de puntuación; el MoveMap ayuda a determinar el peso óptimo

```xml
<SetCrystWeight name="(&string;)" scorefxn="(&string;)"
        scorefxn_ref="(&string;)" jump="(&jump_type;)" chi="(&bool;)"
        bb="(&bool;)" bondangle="(&bool;)" bondlength="(&bool;)"
        weight="(&real;)" weight_min="(&real;)" weight_scale="(1.0 &real;)"
        cartesian="(false &bool;)" >
    <MoveMap name="(&string;)" bb="(&bool;)" chi="(&bool;)" jump="(&bool;)" >
        <Jump number="(&non_negative_integer;)" setting="(&bool;)" />
        <Chain number="(&non_negative_integer;)" chi="(&bool;)" bb="(&bool;)" />
        <Span begin="(&non_negative_integer;)" end="(&non_negative_integer;)"
                chi="(&bool;)" bb="(&bool;)" bondangle="(&bool;)" bondlength="(&bool;)" />
        <ResidueSelector selector="(&string;)" chi="(&bool;)" bb="(&bool;)"
                bondangle="(&bool;)" bondlength="(&bool;)" />
    </MoveMap>
</SetCrystWeight>
```

-   **scorefxn**: Nombre de la función de puntuación a usar
-   **scorefxn_ref**: Nombre de una función de puntuación definida en la sección SCOREFUNCTION; se usa para copiar los pesos; por defecto, la función de puntuación definida por el subelemento scorefunction de este elemento)
-   **jump**: si es 'ALL', 'All' o 'all', todos los saltos son móviles en el MoveMap; en otro caso, se interpreta como una lista de enteros separados por comas que identifican los saltos
-   **chi**: chi móvil en el MoveMap
-   **bb**: cadena principal móvil en el MoveMap
-   **bondangle**: ángulos de enlace móviles en el MoveMap
-   **bondlength**: longitudes de enlace móviles en el MoveMap
-   **weight**: Fija siempre este peso, anulando las heurísticas
-   **weight_min**: Mantiene el peso por encima de este mínimo
-   **weight_scale**: escala el peso por este factor (se aplica a los pesos automáticos Y a los anulados)
-   **cartesian**: Usa ??? cartesiano al determinar los pesos automáticamente


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
