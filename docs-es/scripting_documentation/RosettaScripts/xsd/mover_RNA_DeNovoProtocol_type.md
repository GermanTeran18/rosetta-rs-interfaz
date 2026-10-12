<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Reemplaza el PDB actual por un modelo listo para el ensamblaje de fragmentos de ARN, conservando lo más exactamente posible el estilo de rna_denovo (al menos sus características más comunes).

```xml
<RNA_DeNovoProtocol name="(&string;)" fasta_files="(&string;)"
        input_pdbs="(&string;)" input_silent_files="(&string;)"
        input_sequence_strings="(&string;)" helical_substructs="(&string;)"
        initial_structures="(&string;)" offset="(0 &non_negative_integer;)"
        edensity_mapfile="(&string;)" virtual_anchor="(&string;)"
        cutpoint_open="(&string;)" secstruct="(&string;)"
        secstruct_file="(&string;)" secstruct_general="(&string;)"
        secstruct_general_file="(&string;)" secstruct_legacy="(&string;)"
        input_res="(&string;)" input_silent_res="(&string;)"
        obligate_pair="(&string;)" obligate_pair_explicit="(&string;)"
        working_res="(&string;)" cutpoint_closed="(&string;)"
        cyclize_res="(&string;)" twoprime_res="(&string;)"
        fiveprime_cap_res="(&string;)" block_stack_above_res="(&string;)"
        block_stack_below_res="(&string;)" in_path="(&string;)"
        native="(&string;)" working_native="(&string;)" cst_file="(&string;)"
        rna_data_file="(&string;)" remove_pair="(&string;)"
        remove_obligate_pair="(&string;)" chain_connection="(&string;)"
        get_fold_tree_from_silent_file="(&string;)"
        fold_tree_from_silent_file_tag="(&string;)"
        force_syn_chi_res_list="(&string;)" force_anti_chi_res_list="(&string;)"
        lores_scorefxn="(farna/rna_lores.wts &string;)" cst_gap="(false &bool;)"
        cycles="(0 &non_negative_integer;)" rounds="(10 &non_negative_integer;)"
        minimize_rna="(&bool;)" relax_rna="(false &bool;)"
        allow_bulge="(false &bool;)" temperature="(2.0 &real;)"
        ignore_secstruct="(false &bool;)" jump_change_frequency="(0.1 &real;)"
        close_loops="(true &bool;)" close_loops_after_each_move="(false &bool;)"
        staged_constraints="(false &bool;)"
        filter_lores_base_pairs="(true &bool;)"
        filter_lores_base_pairs_early="(true &bool;)"
        suppress_bp_constraint="(1.0 &real;)"
        filter_chain_closure="(true &bool;)"
        filter_chain_closure_distance="(6.0 &real;)"
        filter_chain_closure_halfway="(true &bool;)"
        root_at_first_rigid_body="(false &bool;)"
        dock_each_chunk="(true &bool;)"
        dock_each_chunk_per_chain="(false &bool;)" dock_chunks="(&string;)"
        center_jumps_in_single_stranded="(false &bool;)"
        autofilter="(true &bool;)" bps_moves="(true &bool;)"
        disallow_bps_at_extra_min_res="(false &bool;)"
        allow_fragment_moves_in_bps="(false &bool;)"
        frag_size="(0 &non_negative_integer;)"
        output_score_frequency="(0 &non_negative_integer;)"
        output_lores_silent_file="(false &bool;)" output_score_file="(&string;)"
        output_jump_res="(&nnegative_int_wsslist;)"
        output_jump_o3p_to_o5p="(false &bool;)"
        output_jump_chainbreak="(false &bool;)"
        output_rotation_vector="(false &bool;)" target_xyz="(&string;)"
        output_jump_reference_RT="(&string;)"
        save_jump_histogram="(false &bool;)"
        jump_histogram_boxsize="(40.0 &real;)"
        jump_histogram_binwidth="(4.0 &real;)"
        jump_histogram_binwidth_rotvector="(36.0 &real;)"
        output_histogram_file="(&string;)"
        allow_consecutive_bulges="(false &bool;)"
        allowed_bulge_res="(&nnegative_int_wsslist;)"
        output_filters="(false &bool;)" VDW_rep_screen_info="(&string;)"
        vdw_rep_screen_include_sidechains="(true &bool;)"
        gradual_constraints="(true &bool;)" ramp_rnp_vdw="(false &bool;)"
        grid_vdw_weight="(1.0 &real;)" convert_protein_centroid="(true &bool;)"
        rna_protein_docking="(false &bool;)"
        rna_protein_docking_legacy="(false &bool;)"
        rna_protein_docking_freq="(0.4 &real;)"
        small_docking_moves="(false &bool;)" docking_move_size="(1.0 &real;)"
        randomize_init_rnp="(true &bool;)" rnp_high_res_relax="(true &bool;)"
        rnp_high_res_cycles="(10 &non_negative_integer;)"
        rnp_pack_first="(false &bool;)" rnp_ramp_rep="(false &bool;)"
        rnp_min_first="(false &bool;)" dock_into_density_legacy="(false &bool;)"
        new_fold_tree_initializer="(false &bool;)" simple_relax="(false &bool;)"
        override_refine_pose_rounds="(false &bool;)"
        refine_native_get_good_FT="(false &bool;)"
        superimpose_over_all="(true &bool;)" fixed_stems="(false &bool;)"
        ft_close_chains="(true &bool;)" use_1jj2_torsions="(false &string;)"
        vall_torsions="(RNA18_HUB_2.154_2.5.torsions &string;)"
        jump_library_file="(RNA18_HUB_2.154_2.5.jump &string;)"
        linear_chainbreak_weight="(0.0 &real;)" chainbreak_weight="(0.0 &real;)"
        no_filters="(false &bool;)" rmsd_screen="(false &bool;)"
        symm_hack_arity="(0 &non_negative_integer;)"
        exhaustive_fragment_insertion="(false &bool;)"
        save_times="(false &bool;)" minimize_rounds="(2 &non_negative_integer;)"
        vary_geometry="(false &bool;)" deriv_check="(false &bool;)"
        skip_o2prime_trials="(false &bool;)"
        extra_minimize_res="(&nnegative_int_wsslist;)"
        extra_minimize_chi_res="(&nnegative_int_wsslist;)"
        minimizer_use_coordinate_constraints="(true &bool;)"
        min_type="(lbfgs_armijo_nonmonotone &string;)"
        skip_coord_constraints="(false &bool;)" minimize_bps="(true &bool;)"
        minimize_all_protein="(false &bool;)"
        minimize_protein_sc="(false &bool;)" protein_packing="(false &bool;)"
        protein_pack_all="(false &bool;)"
        protein_packing_distance="(10.0 &real;)"
        minimize_use_nblist="(true &bool;)"
        minimize_nblist_auto_update="(true &bool;)"
        minimize_max_iter="(2000 &non_negative_integer;)"
        dock_into_density="(false &bool;)"
        move_first_rigid_body="(false &bool;)" />
```

-   **fasta_files**: Archivos FASTA de entrada.
-   **input_pdbs**: Archivos PDB de entrada.
-   **input_silent_files**: Silent files de entrada.
-   **input_sequence_strings**: Cadenas de secuencia de entrada.
-   **helical_substructs**: PDB de subestructuras helicoidales.
-   **initial_structures**: Ubicaciones iniciales para DRRAFTER.
-   **offset**: Desplazamiento de la numeración de la secuencia.
-   **edensity_mapfile**: Archivo de mapa de densidad electrónica.
-   **virtual_anchor**: Ancla virtual.
-   **cutpoint_open**: Punto de corte abierto.
-   **secstruct**: Estructura secundaria en notación de punto y paréntesis.
-   **secstruct_file**: Archivo con la estructura secundaria en notación de punto y paréntesis.
-   **secstruct_general**: Estructura secundaria general en notación de punto y paréntesis.
-   **secstruct_general_file**: Archivo con la estructura secundaria general en notación de punto y paréntesis.
-   **secstruct_legacy**: Estructura secundaria en formato antiguo.
-   **input_res**: Residuos de entrada.
-   **input_silent_res**: Residuos de entrada del silent file.
-   **obligate_pair**: Pareja obligada.
-   **obligate_pair_explicit**: Pareja obligada (explícita).
-   **working_res**: Residuos de trabajo.
-   **cutpoint_closed**: Puntos de corte cerrados.
-   **cyclize_res**: Residuos a ciclar.
-   **twoprime_res**: Residuos de conexión 2'.
-   **fiveprime_cap_res**: Residuos con cap en 5'.
-   **block_stack_above_res**: Bloquea el apilamiento por encima de estos residuos.
-   **block_stack_below_res**: Bloquea el apilamiento por debajo de estos residuos.
-   **in_path**: Ruta de entrada.
-   **native**: Archivo PDB nativo.
-   **working_native**: Archivo PDB nativo de trabajo.
-   **cst_file**: Archivo de restricciones.
-   **rna_data_file**: Archivo de datos de ARN.
-   **remove_pair**: Eliminar parejas.
-   **remove_obligate_pair**: Eliminar parejas obligadas.
-   **chain_connection**: Conexión de cadenas.
-   **get_fold_tree_from_silent_file**: Silent file para configurar el FoldTree.
-   **fold_tree_from_silent_file_tag**: Etiqueta en la que basar el FoldTree.
-   **force_syn_chi_res_list**: Lista de residuos para forzar ángulos chi syn
-   **force_anti_chi_res_list**: Lista de residuos para forzar ángulos chi anti
-   **lores_scorefxn**: Nombre de la función de puntuación de baja resolución.
-   **cst_gap**: Aplica restricciones a cualquier hueco de la secuencia.
-   **cycles**: Número de ciclos de Monte Carlo.
-   **rounds**: Número de rondas de Monte Carlo.
-   **minimize_rna**: (OBLIGATORIO) XRW POR HACER
-   **relax_rna**: XRW POR HACER
-   **allow_bulge**: XRW POR HACER
-   **temperature**: XRW POR HACER
-   **ignore_secstruct**: XRW POR HACER
-   **jump_change_frequency**: XRW POR HACER
-   **close_loops**: XRW POR HACER
-   **close_loops_after_each_move**: XRW POR HACER
-   **staged_constraints**: XRW POR HACER
-   **filter_lores_base_pairs**: XRW POR HACER
-   **filter_lores_base_pairs_early**: XRW POR HACER
-   **suppress_bp_constraint**: XRW POR HACER
-   **filter_chain_closure**: XRW POR HACER
-   **filter_chain_closure_distance**: XRW POR HACER
-   **filter_chain_closure_halfway**: XRW POR HACER
-   **root_at_first_rigid_body**: XRW POR HACER
-   **dock_each_chunk**: XRW POR HACER
-   **dock_each_chunk_per_chain**: XRW POR HACER
-   **dock_chunks**: Lista de PDB separados por espacios.
-   **center_jumps_in_single_stranded**: XRW POR HACER
-   **autofilter**: XRW POR HACER
-   **bps_moves**: XRW POR HACER
-   **disallow_bps_at_extra_min_res**: XRW POR HACER
-   **allow_fragment_moves_in_bps**: XRW POR HACER
-   **frag_size**: XRW POR HACER
-   **output_score_frequency**: XRW POR HACER
-   **output_lores_silent_file**: XRW POR HACER
-   **output_score_file**: XRW POR HACER
-   **output_jump_res**: XRW POR HACER
-   **output_jump_o3p_to_o5p**: XRW POR HACER
-   **output_jump_chainbreak**: XRW POR HACER
-   **output_rotation_vector**: XRW POR HACER
-   **target_xyz**: AMW POR HACER
-   **output_jump_reference_RT**: XRW POR HACER
-   **save_jump_histogram**: XRW POR HACER
-   **jump_histogram_boxsize**: XRW POR HACER
-   **jump_histogram_binwidth**: XRW POR HACER
-   **jump_histogram_binwidth_rotvector**: XRW POR HACER
-   **output_histogram_file**: XRW POR HACER
-   **allow_consecutive_bulges**: XRW POR HACER
-   **allowed_bulge_res**: XRW POR HACER
-   **output_filters**: XRW POR HACER
-   **VDW_rep_screen_info**: XRW POR HACER
-   **vdw_rep_screen_include_sidechains**: XRW POR HACER
-   **gradual_constraints**: XRW POR HACER
-   **ramp_rnp_vdw**: XRW POR HACER
-   **grid_vdw_weight**: XRW POR HACER
-   **convert_protein_centroid**: XRW POR HACER
-   **rna_protein_docking**: XRW POR HACER
-   **rna_protein_docking_legacy**: XRW POR HACER
-   **rna_protein_docking_freq**: XRW POR HACER
-   **small_docking_moves**: XRW POR HACER
-   **docking_move_size**: XRW POR HACER
-   **randomize_init_rnp**: XRW POR HACER
-   **rnp_high_res_relax**: XRW POR HACER
-   **rnp_high_res_cycles**: XRW POR HACER
-   **rnp_pack_first**: XRW POR HACER
-   **rnp_ramp_rep**: XRW POR HACER
-   **rnp_min_first**: XRW POR HACER
-   **dock_into_density_legacy**: XRW POR HACER
-   **new_fold_tree_initializer**: XRW POR HACER
-   **simple_relax**: XRW POR HACER
-   **override_refine_pose_rounds**: XRW POR HACER
-   **refine_native_get_good_FT**: XRW POR HACER
-   **superimpose_over_all**: XRW POR HACER
-   **fixed_stems**: XRW POR HACER
-   **ft_close_chains**: XRW POR HACER
-   **use_1jj2_torsions**: XRW POR HACER
-   **vall_torsions**: XRW POR HACER
-   **jump_library_file**: XRW POR HACER
-   **linear_chainbreak_weight**: XRW POR HACER
-   **chainbreak_weight**: XRW POR HACER
-   **no_filters**: XRW POR HACER
-   **rmsd_screen**: XRW POR HACER
-   **symm_hack_arity**: XRW POR HACER
-   **exhaustive_fragment_insertion**: XRW POR HACER
-   **save_times**: XRW POR HACER
-   **minimize_rounds**: Número de ciclos de minimización.
-   **vary_geometry**: XRW POR HACER
-   **deriv_check**: XRW POR HACER
-   **skip_o2prime_trials**: XRW POR HACER
-   **extra_minimize_res**: XRW POR HACER
-   **extra_minimize_chi_res**: XRW POR HACER
-   **minimizer_use_coordinate_constraints**: XRW POR HACER
-   **min_type**: XRW POR HACER
-   **skip_coord_constraints**: XRW POR HACER
-   **minimize_bps**: XRW POR HACER
-   **minimize_all_protein**: XRW POR HACER
-   **minimize_protein_sc**: XRW POR HACER
-   **protein_packing**: XRW POR HACER
-   **protein_pack_all**: XRW POR HACER
-   **protein_packing_distance**: XRW POR HACER
-   **minimize_use_nblist**: XRW POR HACER
-   **minimize_nblist_auto_update**: XRW POR HACER
-   **minimize_max_iter**: XRW POR HACER
-   **dock_into_density**: XRW POR HACER
-   **move_first_rigid_body**: XRW POR HACER

---
