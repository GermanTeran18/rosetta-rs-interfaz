<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Hace girar (rota al azar alrededor del centro de masa) una subsección dada de la proteína.

```xml
<Tumble name="(&string;)" chain_number="(&non_negative_integer;)"
        start_res="(&refpose_enabled_residue_number;)"
        stop_res="(&refpose_enabled_residue_number;)" />
```

-   **chain_number**: La cadena que se hace girar; no es compatible con start_res/stop_res.
-   **start_res**: El primer residuo del tramo de residuos que se hace girar; no es compatible con chain_number.
-   **stop_res**: El último residuo del tramo de residuos que se hace girar; no es compatible con chain_number.

---
