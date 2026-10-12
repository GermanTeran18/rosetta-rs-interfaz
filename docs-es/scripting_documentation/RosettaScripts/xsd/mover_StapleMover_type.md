<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Diseña un péptido grapado (stapled) en una interfaz de proteínas

```xml
<StapleMover name="(&string;)" resnum="(&refpose_enabled_residue_number;)"
        pdb_num="(&refpose_enabled_residue_number;)"
        staple_gap="(4 &non_negative_integer;)" />
```

-   **resnum**: Número del residuo donde empieza la grapa (staple), en numeración de Rosetta, de PDB o de la Pose de referencia
-   **pdb_num**: Número del residuo donde empieza la grapa (staple), en numeración de Rosetta, de PDB o de la Pose de referencia
-   **staple_gap**: Distancia desde el primer hasta el último residuo grapado

---
