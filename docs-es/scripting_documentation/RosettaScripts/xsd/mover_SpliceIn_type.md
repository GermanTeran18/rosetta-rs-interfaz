<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<SpliceIn name="(&string;)" tolerance="(0.23 &real;)"
        ignore_chain_break="(false &bool;)" debug="(false &bool;)"
        min_seg="(false &bool;)" CG_const="(false &bool;)"
        rb_sensitive="(false &bool;)" chain_num="(1 &non_negative_integer;)"
        superimposed="(true &bool;)"
        source_pdb_to_res="(&refpose_enabled_residue_number;)"
        skip_alignment="(false &bool;)" use_sequence_profile="(&bool;)"
        scorefxn="(&string;)" template_file="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)"
        design_task_operations="(&string;)" residue_numbers_setter="(&string;)"
        torsion_database="(&string;)" database_entry="(&non_negative_integer;)"
        database_pdb_entry="(&string;)" design_shell="(6.0 &real;)"
        repack_shell="(8.0 &real;)" randomize_cut="(false &bool;)"
        cut_secondarystruc="(false &bool;)" delta_lengths="(&int_cslist;)"
        thread_original_sequence="(false &bool;)" rtmin="(true &bool;)"
        dbase_iterate="(false &bool;)" checkpointing_file="(&string;)" >
    <Segments name="(&string;)" profile_weight_away_from_interface="(1.0 &real;)"
            current_segment="(&string;)" >
        <segment name="(&string;)" pdb_profile_match="(&string;)" profiles="(&string;)" />
    </Segments>
</SpliceIn>
```

-   **tolerance**: tolerancia de la desviación estándar de la longitud de enlace al comprobar rupturas de cadena
-   **ignore_chain_break**: si hay una ruptura de cadena, no falla
-   **debug**: más detallado durante la ejecución
-   **min_seg**: ¿minimizar el segmento después de insertarlo?
-   **CG_const**: aplica restricciones de coordenadas a los átomos C-gamma
-   **rb_sensitive**: aplica adaptaciones de cuerpo rígido
-   **chain_num**: en qué número de cadena se aplica el splice
-   **superimposed**: ¿las estructuras están superpuestas?
-   **source_pdb_to_res**: número del último residuo del segmento de origen
-   **skip_alignment**: si se alinea la Pose con el pdb de origen
-   **use_sequence_profile**: ¿Usar perfiles de secuencia en el diseño?
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **template_file**: Cuál es el archivo molde que se usa durante el diseño
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **design_task_operations**: XRW POR HACER
-   **residue_numbers_setter**: XRW POR HACER
-   **torsion_database**: nombre del archivo de la base de datos de torsiones
-   **database_entry**: elige la entrada de la base de datos por número
-   **database_pdb_entry**: XRW POR HACER
-   **design_shell**: radio de la capa de diseño
-   **repack_shell**: radio de la capa de empaquetado
-   **randomize_cut**: si el corte debe ponerse al azar en el segmento diseñado
-   **cut_secondarystruc**: pone el corte en la estructura secundaria
-   **delta_lengths**: lista, separada por comas, de las diferencias de longitud de segmento permitidas
-   **thread_original_sequence**: hace threading de la secuencia del pdb de origen sobre el diseño
-   **rtmin**: si se debe aplicar rtmin después del diseño
-   **dbase_iterate**: si se debe iterar por el archivo de la base de datos
-   **checkpointing_file**: nombre del archivo de puntos de control (checkpoint)


Subetiqueta **Segments**:   Envoltorio para varias etiquetas de segmentos

-   **profile_weight_away_from_interface**: multiplica la restricción de secuencia aplicada por un factor para los residuos fuera de la interfaz predefinida
-   **current_segment**: Qué segmento se está modificando actualmente


Subetiqueta **segment**:   etiqueta de segmento individual

-   **pdb_profile_match**: XRW POR HACER
-   **profiles**: ruta a los archivos PSSM

---
