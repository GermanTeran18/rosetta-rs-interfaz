<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<SpliceInTail name="(&string;)" debug="(false &bool;)" min_seg="(false &bool;)"
        CG_const="(false &bool;)" chain_num="(1 &non_negative_integer;)"
        superimposed="(true &bool;)" use_sequence_profile="(&bool;)"
        scorefxn="(&string;)" template_file="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" torsion_database="(&string;)"
        database_entry="(&non_negative_integer;)"
        database_pdb_entry="(&string;)" design_shell="(6.0 &real;)"
        repack_shell="(8.0 &real;)" delta_lengths="(&int_cslist;)"
        thread_original_sequence="(false &bool;)" rtmin="(true &bool;)"
        dbase_iterate="(false &bool;)" >
    <Segments name="(&string;)" profile_weight_away_from_interface="(1.0 &real;)"
            current_segment="(&string;)" >
        <segment name="(&string;)" pdb_profile_match="(&string;)" profiles="(&string;)" />
    </Segments>
</SpliceInTail>
```

-   **debug**: Si es true, la salida es más detallada y se vuelcan estructuras PDB.
-   **min_seg**: Aplica el minimizador al nuevo segmento. Se recomienda para mejorar la energía. Aplícalo con restricciones de coordenadas.
-   **CG_const**: Si es true, aplica una restricción de coordenadas a los C-gamma del segmento durante CCD/minimización
-   **chain_num**: La cadena de la Pose a la que se añade el nuevo segmento.
-   **superimposed**: Si es false, superpone el pdb de origen sobre la Pose actual.
-   **use_sequence_profile**: Si es true, construye el PSSM y aplica el perfil de secuencia a la Pose
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **template_file**: El archivo PDB del PDB de referencia (el usado para construir la base de datos de conformaciones)
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **torsion_database**: Nombre del archivo de conformaciones donde guardar
-   **database_entry**: Qué entrada de la base de datos se usa (por número; por ejemplo, la primera entrada = 1, la segunda = 2, etc.)
-   **database_pdb_entry**: Qué entrada de la base de datos se usa, por código PDB
-   **design_shell**: cuántos residuos alrededor del segmento construido se pueden diseñar
-   **repack_shell**: cuántos residuos alrededor del segmento construido se pueden reempaquetar
-   **delta_lengths**: muestrea longitudes de la nueva conformación del segmento con diferencias de longitud respecto al segmento inicial de la Pose (por ejemplo, si la diferencia de longitud es -2, solo se muestrean de la base de datos segmentos que sean 2 aminoácidos más cortos que el segmento de la Pose)
-   **thread_original_sequence**: Usa la secuencia de la base de datos de torsiones.
-   **rtmin**: aplica rtmin después de minmover/tailsegmentmover
-   **dbase_iterate**: si es true, recorre la base de datos de torsiones de forma iterativa (así, en la misma trayectoria no se muestrea dos veces la misma conformación de la base de datos)


Subetiqueta **Segments**:   Envoltorio para varias etiquetas de segmentos

-   **profile_weight_away_from_interface**: multiplica la restricción de secuencia aplicada por un factor para los residuos fuera de la interfaz predefinida
-   **current_segment**: Qué segmento se está modificando actualmente


Subetiqueta **segment**:   etiqueta de segmento individual

-   **pdb_profile_match**: Correspondencia entre el nombre del segmento y el archivo PSSM
-   **profiles**: lista de archivos PSSM

---
