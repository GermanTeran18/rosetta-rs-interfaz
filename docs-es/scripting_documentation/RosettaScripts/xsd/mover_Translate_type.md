<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Hace un movimiento aleatorio grueso de una molécula pequeña en el espacio xyz.

```xml
<Translate name="(&string;)" chain="(&string;)"
        distribution="(&distribution_string;)" force="(&string;)"
        tag_along_chains="(&string;)" angstroms="(&real;)"
        cycles="(&non_negative_integer;)" grid_set="(default &string;)" />
```

-   **chain**: (OBLIGATORIO) ID de la cadena que se traslada.
-   **distribution**: (OBLIGATORIO) El movimiento aleatorio se puede elegir de una distribución "uniform" o "gaussian".
-   **force**: XRW POR HACER
-   **tag_along_chains**: XRW POR HACER. Lista de ID de cadena, separados por comas, que se mueven junto con "chain".
-   **angstroms**: (OBLIGATORIO) El movimiento puede ser a cualquier lugar dentro de una esfera cuyo radio especifica "angstroms".
-   **cycles**: (OBLIGATORIO) Número de intentos de hacer tal movimiento sin caer encima de otra molécula.
-   **grid_set**: El conjunto de ScoringGrid que se usa para puntuar la traslación. Si no hay ninguna rejilla de puntuación en el XML, se usa una rejilla clásica por defecto.

---
