<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Cambia la conformación de un segmento del anticuerpo

```xml
<SpliceOutAntibody name="(&string;)" tolerance="(0.23 &real;)"
        ignore_chain_break="(false &bool;)" debug="(false &bool;)"
        CG_const="(false &bool;)" rb_sensitive="(false &bool;)"
        chain_num="(1 &non_negative_integer;)"
        cut_site="(1 &non_negative_integer;)" segment="(&string;)"
        superimposed="(true &bool;)" scorefxn="(&string;)"
        add_sequence_constraints_only="(false &bool;)"
        template_file="(&string;)" source_pdb="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" torsion_database="(&string;)"
        design_shell="(6.0 &real;)" repack_shell="(8.0 &real;)"
        rms_cutoff="(999999 &real;)" rms_cutoff_loop="(999999 &real;)"
        randomize_cut="(false &bool;)" cut_secondarystruc="(false &bool;)"
        design="(false &bool;)" rtmin="(true &bool;)" splice_filter="(&string;)"
        mover="(&string;)" tail_mover="(&string;)"
        restrict_to_repacking_chain2="(true &bool;)"
        use_sequence_profile="(true &bool;)" />
```

-   **tolerance**: XRW POR HACER
-   **ignore_chain_break**: XRW POR HACER
-   **debug**: XRW POR HACER
-   **CG_const**: XRW POR HACER
-   **rb_sensitive**: XRW POR HACER
-   **chain_num**: XRW POR HACER
-   **cut_site**: número del residuo donde se pone el corte
-   **segment**: XRW POR HACER
-   **superimposed**: XRW POR HACER
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **add_sequence_constraints_only**: XRW POR HACER
-   **template_file**: XRW POR HACER
-   **source_pdb**: XRW POR HACER
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **torsion_database**: XRW POR HACER
-   **design_shell**: XRW POR HACER
-   **repack_shell**: XRW POR HACER
-   **rms_cutoff**: XRW POR HACER
-   **rms_cutoff_loop**: XRW POR HACER
-   **randomize_cut**: XRW POR HACER
-   **cut_secondarystruc**: XRW POR HACER
-   **design**: XRW POR HACER
-   **rtmin**: aplica rtmin después de CCD/minmover
-   **splice_filter**: nombre del filtro que se usa para comprobar si el mover terminó correctamente
-   **mover**: Qué mover se usa para cerrar el segmento
-   **tail_mover**: Qué mover se usa para cerrar el segmento
-   **restrict_to_repacking_chain2**: Si es true, no diseña la cadena 2
-   **use_sequence_profile**: Si es true, construye el PSSM y aplica el perfil de secuencia a la Pose

---
