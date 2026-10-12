<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<SwitchChainOrder name="(&string;)" chain_order="(&string;)"
        chain_num="(&nnegative_int_cslist;)" chain_name="(&chain_cslist;)"
        invert_chains="(false &bool;)" residue_numbers_setter="(&string;)"
        scorefxn="(&string;)" />
```

-   **chain_order**: Orden de las cadenas finales
-   **chain_num**: Lista de posiciones finales de las cadenas, que se corresponde con chain_name
-   **chain_name**: Lista de nombres finales de las cadenas, que se corresponde con chain_num
-   **invert_chains**: Si es true, se aplica sobre la inversa de la selección de cadenas (la especificada en las opciones name o number)
-   **residue_numbers_setter**: Lista de nombres finales de las cadenas, que se corresponde con chain_num
-   **scorefxn**: Nombre de la función de puntuación a usar

---
