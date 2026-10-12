<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Aplica una lista de movers en orden.

```xml
<SequenceMover name="(&string;)" movers="(&string;)"
        mover_status="(false &bool;)" />
```

-   **movers**: El atributo movers toma una lista de nombres de movers separados por comas.
-   **mover_status**: Usa MoverStatus durante la ejecución. FAIL_RETRY volverá a intentar el mover. FAIL_DO_NOT_RETRY o FAIL_BAD_INPUT terminarán la ejecución.

---
