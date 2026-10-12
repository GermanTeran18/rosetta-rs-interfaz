<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<SpliceOutTail name="(&string;)" debug="(false &bool;)"
        CG_const="(false &bool;)" chain_num="(1 &non_negative_integer;)"
        superimposed="(true &bool;)" thread_original_sequence="(false &bool;)"
        tail_segment="(&n_or_c;)" scorefxn="(&string;)"
        use_sequence_profile="(&bool;)" template_file="(&string;)"
        source_pdb="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)"
        from_res="(0 &refpose_enabled_residue_number;)"
        torsion_database="(&string;)" design_shell="(6.0 &real;)"
        repack_shell="(8.0 &real;)" rms_cutoff="(999999 &real;)"
        rtmin="(true &bool;)" splice_filter="(&string;)" mover="(&string;)"
        restrict_to_repacking_chain2="(true &bool;)" >
    <Segments name="(&string;)" current_segment="(&string;)" >
        <segment name="(&string;)" pdb_profile_match="(&string;)" profiles="(&string;)" />
    </Segments>
</SpliceOutTail>
```

-   **debug**: XRW POR HACER
-   **CG_const**: Si es true, aplica una restricción de coordenadas a los C-gamma del segmento durante CCD/minimización
-   **chain_num**: La cadena de la Pose a la que se añade el nuevo segmento.
-   **superimposed**: superpone el pdb de origen sobre la Pose actual.
-   **thread_original_sequence**: Si es true, hace threading de la secuencia del pdb de referencia sobre el segmento
-   **tail_segment**: ¿Es un segmento C-terminal ("c") o N-terminal ("N")?
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **use_sequence_profile**: XRW POR HACER
-   **template_file**: XRW POR HACER
-   **source_pdb**: XRW POR HACER
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **from_res**: XRW POR HACER
-   **torsion_database**: XRW POR HACER
-   **design_shell**: XRW POR HACER
-   **repack_shell**: XRW POR HACER
-   **rms_cutoff**: XRW POR HACER
-   **rtmin**: XRW POR HACER
-   **splice_filter**: XRW POR HACER
-   **mover**: Qué mover se usa para optimizar la cadena principal del segmento
-   **restrict_to_repacking_chain2**: XRW POR HACER


Subetiqueta **Segments**:   Envoltorio para varias etiquetas de segmentos

-   **current_segment**: XRW POR HACER


Subetiqueta **segment**:   etiqueta de segmento individual

-   **pdb_profile_match**: XRW POR HACER
-   **profiles**: XRW POR HACER

---
