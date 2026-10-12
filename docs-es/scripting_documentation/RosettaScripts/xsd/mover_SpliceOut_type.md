<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<SpliceOut name="(&string;)" tolerance="(0.23 &real;)"
        ignore_chain_break="(false &bool;)" debug="(false &bool;)"
        CG_const="(false &bool;)" chain_num="(1 &non_negative_integer;)"
        cut_site="(1 &non_negative_integer;)" Segment="(&string;)"
        superimposed="(true &bool;)"
        source_pdb_to_res="(&refpose_enabled_residue_number;)"
        use_sequence_profile="(&bool;)" scorefxn="(&string;)"
        template_file="(&string;)" set_fold_tree_only="(false &bool;)"
        source_pdb="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)"
        from_res="(0 &refpose_enabled_residue_number;)"
        to_res="(0 &refpose_enabled_residue_number;)"
        torsion_database="(&string;)" design_shell="(6.0 &real;)"
        repack_shell="(8.0 &real;)" rms_cutoff="(999999 &real;)"
        rms_cutoff_loop="(999999 &real;)" randomize_cut="(true &bool;)"
        cut_secondarystruc="(false &bool;)"
        thread_original_sequence="(false &bool;)" rtmin="(true &bool;)"
        splice_filter="(&string;)" mover="(&string;)"
        restrict_to_repacking_chain2="(true &bool;)" >
    <Segments name="(&string;)" current_segment="(&string;)" >
        <Segment name="(&string;)" pdb_profile_match="(&string;)" profiles="(&string;)" />
    </Segments>
</SpliceOut>
```

-   **tolerance**: El mover Splice hace una comprobación interna de la longitud del enlace peptídico en el nuevo segmento. Si la longitud del enlace supera la tolerancia fijada, el mover informa de un fallo.
-   **ignore_chain_break**: Si es true, ignora la desviación en la longitud de enlace. No se recomienda y suele usarse para depurar.
-   **debug**: Si es true, la salida es más detallada y se vuelcan estructuras PDB
-   **CG_const**: Si es true, aplica una restricción de coordenadas a los C-gamma del segmento durante CCD/minimización
-   **chain_num**: La cadena de la Pose a la que se añade el nuevo segmento.
-   **cut_site**: número del residuo donde se pone el corte; se usa sobre todo para depurar.
-   **Segment**: XRW POR HACER
-   **superimposed**: Si es false, superpone el pdb de origen sobre la Pose actual.
-   **source_pdb_to_res**: Si las estructuras no están alineadas, usa from_res del molde y from_res del pdb de origen para alinear
-   **use_sequence_profile**: Si es true, añade a la Pose una restricción de secuencia a partir de archivos pssm
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **template_file**: El archivo PDB del PDB de referencia (el usado para construir la base de datos de conformaciones)
-   **set_fold_tree_only**: XRW POR HACER
-   **source_pdb**: El archivo PDB del que se extrae la conformación del segmento
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **from_res**: El residuo N-terminal del segmento muestreado
-   **to_res**: El residuo C-terminal del segmento muestreado
-   **torsion_database**: Nombre del archivo de conformaciones donde guardar
-   **design_shell**: Radio de la capa de diseño alrededor de la nueva conformación del segmento.
-   **repack_shell**: Radio de la capa de reempaquetado alrededor de la nueva conformación del segmento.
-   **rms_cutoff**: Al final de la ejecución, el valor de RMSD entre la nueva conformación del segmento y la conformación del segmento de origen. Si el valor de RMSD supera el valor de corte fijado, la ejecución falla. Este valor solo se refiere a los elementos de estructura secundaria del nuevo segmento.
-   **rms_cutoff_loop**: Igual que rms_cutoff, pero solo se refiere a los elementos de estructura secundaria de tipo loop.
-   **randomize_cut**: si es true, el corte se pone al azar en el segmento
-   **cut_secondarystruc**: si es true, el corte se puede poner en un elemento de estructura secundaria.
-   **thread_original_sequence**: Si es true, usa la secuencia del PDB de origen
-   **rtmin**: aplica rtmin después de CCD/minmover
-   **splice_filter**: nombre del filtro que se usa para comprobar si el mover terminó correctamente.
-   **mover**: Qué mover se usa para cerrar el segmento
-   **restrict_to_repacking_chain2**: Si es true, no diseña la cadena 2


Subetiqueta **Segments**:   Envoltorio para varias etiquetas de segmentos

-   **current_segment**: XRW POR HACER


Subetiqueta **Segment**:   etiqueta de segmento individual

-   **pdb_profile_match**: correspondencia del segmento de origen del pdb con el archivo PSSM
-   **profiles**: ruta a los archivos PSSM

---
