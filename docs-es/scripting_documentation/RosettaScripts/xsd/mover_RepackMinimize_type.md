<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
RepackMinimizeMover hace un remodelado extenso de la interfaz

```xml
<RepackMinimize name="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" scorefxn_repack="(&string;)"
        scorefxn_minimize="(&string;)" repack="(&bool;)"
        repack_partner1="(&bool;)" repack_partner2="(&bool;)" design="(&bool;)"
        design_partner1="(&bool;)" design_partner2="(&bool;)"
        optimize_fold_tree="(1 &bool;)" minimize_rb="(1 &bool;)"
        minimize_bb="(1 &bool;)" minimize_bb_ch1="(1 &bool;)"
        minimize_bb_ch2="(1 &bool;)" minimize_sc="(1 &bool;)"
        interface_cutoff_distance="(8.0 &real;)" repack_non_ala="(1 &bool;)"
        symmetry="(0 &bool;)" automatic_repacking_definition="(1 &bool;)" >
    <residue pdb_num="(&refpose_enabled_residue_number;)"
            resnum="(&refpose_enabled_residue_number;)" />
</RepackMinimize>
```

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **scorefxn_repack**: Nombre de la función de puntuación a usar
-   **scorefxn_minimize**: Nombre de la función de puntuación a usar
-   **repack**: Reempaquetar ambas partes
-   **repack_partner1**: Reempaquetar la parte 1
-   **repack_partner2**: Reempaquetar la parte 2
-   **design**: Diseñar ambas partes
-   **design_partner1**: Diseñar la parte 1
-   **design_partner2**: Diseñar la parte 2
-   **optimize_fold_tree**: Optimizar el FoldTree
-   **minimize_rb**: Minimizar los grados de libertad del cuerpo rígido
-   **minimize_bb**: Minimizar la cadena principal de ambas cadenas
-   **minimize_bb_ch1**: Minimizar la cadena principal de la cadena 1
-   **minimize_bb_ch2**: Minimizar la cadena principal de la cadena 2
-   **minimize_sc**: Minimizar las cadenas laterales
-   **interface_cutoff_distance**: Distancia de corte de la interfaz
-   **repack_non_ala**: Reempaquetar los residuos que no son alanina
-   **symmetry**: opera sobre una Pose simétrica
-   **automatic_repacking_definition**: ¿Se configura el empaquetado automáticamente?


Subetiqueta **residue**:   

-   **pdb_num**: Número de residuo en la Pose de referencia, en el PDB o en la numeración seqpos
-   **resnum**: Número de residuo en la Pose de referencia, en el PDB o en la numeración seqpos

---
