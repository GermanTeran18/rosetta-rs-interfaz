<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<VLB name="(&string;)" scorefxn="(score4L &string;)" >
    <Bridge left="(&refpose_enabled_residue_number;)"
            right="(&refpose_enabled_residue_number;)" ss="(&string;)"
            aa="(&string;)" />
    <ConnectRight left="(&refpose_enabled_residue_number;)"
            right="(&refpose_enabled_residue_number;)" pdb="(&string;)" />
    <GrowLeft pos="(&refpose_enabled_residue_number;)" ss="(&string;)"
            aa="(&string;)" />
    <GrowRight pos="(&refpose_enabled_residue_number;)" ss="(&string;)"
            aa="(&string;)" />
    <SegmentInsert left="(&refpose_enabled_residue_number;)"
            right="(&refpose_enabled_residue_number;)" ss="(&string;)"
            keep_bb_torsions="(0 &bool;)" pdb="(&string;)" side="(&string;)" />
    <SegmentRebuild left="(&refpose_enabled_residue_number;)"
            right="(&refpose_enabled_residue_number;)" ss="(&string;)"
            aa="(&string;)" />
    <SegmentSwap left="(&refpose_enabled_residue_number;)"
            right="(&refpose_enabled_residue_number;)" pdb="(&string;)" />
</VLB>
```

-   **scorefxn**: Función de puntuación que se usa


Subetiqueta **Bridge**:   XRW POR HACER

-   **left**: (OBLIGATORIO) Residuo izquierdo
-   **right**: (OBLIGATORIO) Residuo derecho
-   **ss**: (OBLIGATORIO) XRW POR HACER
-   **aa**: (OBLIGATORIO) XRW POR HACER

Subetiqueta **ConnectRight**:   XRW POR HACER

-   **left**: (OBLIGATORIO) Residuo izquierdo
-   **right**: (OBLIGATORIO) Residuo derecho
-   **pdb**: (OBLIGATORIO) Nombre del archivo PDB que se lee

Subetiqueta **GrowLeft**:   XRW POR HACER

-   **pos**: (OBLIGATORIO) El residuo único a partir del cual se construye
-   **ss**: (OBLIGATORIO) XRW POR HACER
-   **aa**: (OBLIGATORIO) XRW POR HACER

Subetiqueta **GrowRight**:   XRW POR HACER

-   **pos**: (OBLIGATORIO) El residuo único a partir del cual se construye
-   **ss**: (OBLIGATORIO) XRW POR HACER
-   **aa**: (OBLIGATORIO) XRW POR HACER

Subetiqueta **SegmentInsert**:   XRW POR HACER

-   **left**: (OBLIGATORIO) Residuo izquierdo
-   **right**: (OBLIGATORIO) Residuo derecho
-   **ss**: (OBLIGATORIO) XRW POR HACER
-   **keep_bb_torsions**: XRW POR HACER
-   **pdb**: (OBLIGATORIO) Nombre del archivo PDB que se lee
-   **side**: (OBLIGATORIO) XRW POR HACER

Subetiqueta **SegmentRebuild**:   XRW POR HACER

-   **left**: (OBLIGATORIO) Residuo izquierdo
-   **right**: (OBLIGATORIO) Residuo derecho
-   **ss**: (OBLIGATORIO) XRW POR HACER
-   **aa**: (OBLIGATORIO) XRW POR HACER

Subetiqueta **SegmentSwap**:   XRW POR HACER

-   **left**: (OBLIGATORIO) Residuo izquierdo
-   **right**: (OBLIGATORIO) Residuo derecho
-   **pdb**: (OBLIGATORIO) Nombre del archivo PDB que se lee

---
