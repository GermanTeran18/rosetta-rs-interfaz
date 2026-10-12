<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Establece una simetría no cristalográfica (NCS) entre residuos. El mover fija restricciones diedras en la cadena principal y en las cadenas laterales para forzar a los residuos a mantener la misma conformación. También se puede imponer el tipo de aminoácido. Este mover no hace ninguna minimización, así que normalmente le sigue un MinMover o un RelaxMover.

```xml
<SetupNCS name="(&string;)" bb="(&bool;)" chi="(&bool;)" wt="(&real;)"
        limit="(&real;)" symmetric_sequence="(&bool;)" sd="(&real;)"
        distance_pair="(&bool;)" >
    <NCSgroup source="(&string;)" target="(&string;)" />
    <NCSend source="(&string;)" target="(&string;)" />
    <NCSdistance source="(&string;)" target="(&string;)" />
</SetupNCS>
```

-   **bb**: Establece restricciones diedras para la cadena principal.
-   **chi**: Establece restricciones diedras para las cadenas laterales.
-   **wt**: XRW POR HACER
-   **limit**: XRW POR HACER
-   **symmetric_sequence**: Fuerza la secuencia del origen en el destino.
-   **sd**: para Harmonic, distancia
-   **distance_pair**: descrip


Subetiqueta **NCSgroup**:   

-   **source**: Residuos de referencia, expresados como un solo residuo o un intervalo. El origen y el destino necesitan el mismo número de residuos.
-   **target**: Residuos de destino, expresados como un solo residuo o un intervalo. El origen y el destino necesitan el mismo número de residuos.

Subetiqueta **NCSend**:   

-   **source**: Residuos de referencia, expresados como un solo residuo o un intervalo. El origen y el destino necesitan el mismo número de residuos.
-   **target**: Residuos de destino, expresados como un solo residuo o un intervalo. El origen y el destino necesitan el mismo número de residuos.

Subetiqueta **NCSdistance**:   

-   **source**: Residuos de referencia, expresados como un solo residuo o un intervalo. El origen y el destino necesitan el mismo número de residuos.
-   **target**: Residuos de destino, expresados como un solo residuo o un intervalo. El origen y el destino necesitan el mismo número de residuos.

---
