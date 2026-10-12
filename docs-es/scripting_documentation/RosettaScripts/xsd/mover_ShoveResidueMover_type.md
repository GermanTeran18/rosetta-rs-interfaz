<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<ShoveResidueMover name="(&string;)" pdb_num="(&residue_number;)"
        res_num="(&non_negative_integer;)" remove_shove_variant="(false &bool;)"
        shove="(&refpose_enabled_residue_number_cslist;)" />
```

-   **pdb_num**: Número de residuo en numeración PDB (número de residuo + ID de cadena)
-   **res_num**: Número de residuo en numeración de Rosetta (secuencial, con el primer residuo de la Pose como 1)
-   **remove_shove_variant**: ¿Eliminar la variante shove del residuo en cuestión?
-   **shove**: Residuos a los que se añade la variante shove, sobre todo si no se indica resnum

---
