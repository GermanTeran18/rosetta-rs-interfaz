<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<TryRotamers name="(&string;)" pdb_num="(&residue_number;)"
        res_num="(&non_negative_integer;)" automatic_connection="(1 &bool;)"
        scorefxn="(&string;)" jump_num="(1 &non_negative_integer;)"
        solo_res="(1 &bool;)" final_filter="(true_filter &string;)"
        clash_check="(0 &bool;)" include_current="(1 &bool;)"
        explosion="(0 &non_negative_integer;)"
        shove="(&refpose_enabled_residue_number_cslist;)" />
```

-   **pdb_num**: Número de residuo en numeración PDB (número de residuo + ID de cadena)
-   **res_num**: Número de residuo en numeración de Rosetta (secuencial, con el primer residuo de la Pose como 1)
-   **automatic_connection**: Configura automáticamente un FoldTree de hotspot
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **jump_num**: Salto a través del cual se evalúan las energías, numerado secuencialmente desde uno
-   **solo_res**: Añade tipos terminales (superior e inferior) al residuo de hotspot
-   **final_filter**: Añade tipos terminales (superior e inferior) al residuo de hotspot
-   **clash_check**: Hace una comprobación de choques y filtra los rotámeros que chocan (¡ayuda a ganar velocidad!)
-   **include_current**: Incluye la conformación de entrada
-   **explosion**: Agresividad con la que se muestrean las conformaciones, de 0 a 4 (los valores mayores que cuatro equivalen a cuatro)
-   **shove**: Lista de residuos para los que se usa el tipo shove, dados en numeración de Pose de referencia, de Pose o de PDB

---
