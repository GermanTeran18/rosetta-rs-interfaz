<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<Splice name="(&string;)" tolerance="(0.23 &real;)"
        ignore_chain_break="(false &bool;)" debug="(false &bool;)"
        min_seg="(false &bool;)" CG_const="(false &bool;)"
        rb_sensitive="(false &bool;)" chain_num="(1 &non_negative_integer;)"
        segment="(&string;)" superimposed="(true &bool;)"
        delete_hairpin="(false &bool;)"
        delete_hairpin_n="(4 &non_negative_integer;)"
        delete_hairpin_c="(13 &non_negative_integer;)" tail_segment="(&n_or_c;)"
        protein_family="(&string;)"
        source_pdb_to_res="(&refpose_enabled_residue_number;)"
        skip_alignment="(false &bool;)" reference_name="(&string;)"
        use_sequence_profile="(&bool;)" scorefxn="(&string;)"
        add_sequence_constraints_only="(false &bool;)"
        template_file="(&string;)" set_fold_tree_only="(false &bool;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)"
        from_res="(0 &refpose_enabled_residue_number;)"
        to_res="(0 &refpose_enabled_residue_number;)"
        design_task_operations="(&string;)" residue_numbers_setter="(&string;)"
        torsion_database="(&string;)" database_entry="(&non_negative_integer;)"
        database_pdb_entry="(&string;)" source_pdb="(&string;)" ccd="(&bool;)"
        design_shell="(6.0 &real;)" repack_shell="(8.0 &real;)"
        rms_cutoff="(999999 &real;)" res_move="(1000 &non_negative_integer;)"
        randomize_cut="(false &bool;)" cut_secondarystruc="(false &bool;)"
        equal_length="(false &bool;)" thread_ala="(true &bool;)"
        delta_lengths="(&int_cslist;)" design="(false &bool;)"
        thread_original_sequence="(false &bool;)" rtmin="(true &bool;)"
        allow_all_aa="(false &bool;)" dbase_iterate="(false &bool;)"
        locked_residue="(&string;)" allowed_cuts="(&string;)"
        checkpointing_file="(&string;)" loop_dbase_file_name="(&string;)"
        splice_filter="(&string;)" mover_tag="(&string;)"
        loop_pdb_source="(&string;)"
        restrict_to_repacking_chain2="(true &bool;)"
        use_sequence_profiles="(true &bool;)" >
    <Segments name="(&string;)" profile_weight_away_from_interface="(1.0 &real;)"
            current_segment="(&string;)" >
        <Segment name="(&string;)" pdb_profile_match="(&string;)" profiles="(&string;)" />
    </Segments>
    <DB name="(&string;)" />
</Splice>
```

-   **tolerance**: XRW POR HACER
-   **ignore_chain_break**: XRW POR HACER
-   **debug**: XRW POR HACER
-   **min_seg**: XRW POR HACER
-   **CG_const**: XRW POR HACER
-   **rb_sensitive**: XRW POR HACER
-   **chain_num**: XRW POR HACER
-   **segment**: XRW POR HACER
-   **superimposed**: XRW POR HACER
-   **delete_hairpin**: XRW POR HACER
-   **delete_hairpin_n**: XRW POR HACER
-   **delete_hairpin_c**: XRW POR HACER
-   **tail_segment**: XRW POR HACER
-   **protein_family**: XRW POR HACER
-   **source_pdb_to_res**: XRW POR HACER
-   **skip_alignment**: XRW POR HACER
-   **reference_name**: Usa la Pose de referencia como Pose de inicio (y como Pose molde si no se da template_file).
-   **use_sequence_profile**: XRW POR HACER
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **add_sequence_constraints_only**: XRW POR HACER
-   **template_file**: XRW POR HACER
-   **set_fold_tree_only**: XRW POR HACER
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **from_res**: XRW POR HACER
-   **to_res**: XRW POR HACER
-   **design_task_operations**: XRW POR HACER
-   **residue_numbers_setter**: XRW POR HACER
-   **torsion_database**: XRW POR HACER
-   **database_entry**: XRW POR HACER
-   **database_pdb_entry**: XRW POR HACER
-   **source_pdb**: XRW POR HACER
-   **ccd**: XRW POR HACER
-   **design_shell**: XRW POR HACER
-   **repack_shell**: XRW POR HACER
-   **rms_cutoff**: XRW POR HACER
-   **res_move**: XRW POR HACER
-   **randomize_cut**: XRW POR HACER
-   **cut_secondarystruc**: XRW POR HACER
-   **equal_length**: XRW POR HACER
-   **thread_ala**: XRW POR HACER
-   **delta_lengths**: XRW POR HACER
-   **design**: XRW POR HACER
-   **thread_original_sequence**: XRW POR HACER
-   **rtmin**: XRW POR HACER
-   **allow_all_aa**: XRW POR HACER
-   **dbase_iterate**: XRW POR HACER
-   **locked_residue**: XRW POR HACER
-   **allowed_cuts**: Cuántos cortes se permiten en la proteína después del mover Splice
-   **checkpointing_file**: XRW POR HACER
-   **loop_dbase_file_name**: XRW POR HACER
-   **splice_filter**: XRW POR HACER
-   **mover_tag**: XRW POR HACER
-   **loop_pdb_source**: XRW POR HACER
-   **restrict_to_repacking_chain2**: XRW POR HACER
-   **use_sequence_profiles**: XRW POR HACER


Subetiqueta **Segments**:   Envoltorio para varias etiquetas de segmentos

-   **profile_weight_away_from_interface**: XRW POR HACER
-   **current_segment**: XRW POR HACER


Subetiqueta **Segment**:   etiqueta de segmento individual

-   **pdb_profile_match**: XRW POR HACER
-   **profiles**: XRW POR HACER

---
