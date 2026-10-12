[[_TOC_]]

###Autor
Gideon Lapidoth; glapidoth@gmail.com; PI: Sarel J. Fleishman; sarel@weizmann.ac.il

##Descripción general
###Resumen 

Este mover se usa para extraer los ángulos de torsión phi, psi y omega de una estructura PDB de origen y guardarlos en una base de datos de torsiones. Más adelante, la base de datos de torsiones se usa en el diseño para modificar la conformación de la cadena principal de un Pose (véase [SpliceIn](https://www.rosettacommons.org/docs/wiki/create/scripting_documentation/RosettaScripts/Movers/SpliceIn)). 
El segmento que se va a cambiar se define con dos residuos: "From_res" y "To_res". La numeración de esos residuos corresponde al "PDB plantilla". Para el mover SpliceIn se debe usar el mismo PDB plantilla. 
 El PDB de origen, la estructura del Pose y la plantilla deben estar alineados.

```xml
<SpliceOut name="(&string;)" tolerance="(0.23 &real;)"
        ignore_chain_break="(false &bool;)" debug="(false &bool;)"
        CG_const="(false &bool;)" chain_num="(1 &non_negative_integer;)"
        cut_site="(1 &non_negative_integer;)" superimposed="(true &bool;)" 
        source_pdb_to_res="(&refpose_enabled_residue_number;)"
        use_sequence_profile="(&bool;)" scorefxn="(&string;)"
        add_sequence_constraints_only="(false &bool;)"
        template_file="(&string;)" source_pdb="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        from_res="(0 &refpose_enabled_residue_number;)"
        to_res="(0 &refpose_enabled_residue_number;)"
        design_task_operations="(&string;)" 
        torsion_database="(&string;)" design_shell="(6.0 &real;)"
        repack_shell="(8.0 &real;)" rms_cutoff="(999999 &real;)"
        rms_cutoff_loop="(999999 &real;)"
        randomize_cut="(false &bool;)"
        cut_secondarystruc="(false &bool;)" thread_ala="(true &bool;)"
        design="(false &bool;)" thread_original_sequence="(false &bool;)"
        rtmin="(true &bool;)" checkpointing_file="(&string;)" splice_filter="(&string;)"
        mover="(&string;)" restrict_to_repacking_chain2="(true &bool;)" >
    <Segments name="(&string;)" current_segment="(&string;)" >
        <Segment name="(&string;)" pdb_profile_match="(&string;)" profiles="(&string;)" />
    </Segments>
</SpliceOut>
```

-   **tolerance**: el mover Splice realiza una comprobación interna de la longitud del enlace peptídico en el nuevo segmento. Si la longitud del enlace supera la tolerancia fijada, el mover informa de un fallo.
-   **ignore_chain_break**: si es true, ignora la desviación de la longitud de enlace. No se recomienda y suele usarse para depuración.
-   **debug**: si es true, la salida es más detallada y se vuelcan estructuras PDB
-   **CG_const**: si es true, aplica una restricción de coordenadas a los C-gamma del segmento durante CCD/minimización
-   **chain_num**: la cadena del Pose a la que se añade el nuevo segmento.
-   **cut_site**: número del residuo donde se coloca el corte
-   **superimposed**: si es false, superpone el pdb de origen sobre el Pose actual.
-   **source_pdb_to_res**: si las estructuras no están alineadas, usa el from_res de la plantilla y el from_res del pdb de origen para alinear
-   **use_sequence_profile**: si es true, construye una PSSM y aplica el perfil de secuencia al Pose
-   **scorefxn**: nombre de la función de puntuación que se usa
-   **template_file**:  el archivo PDB del PDB de referencia (el que se usó para construir la base de datos de conformaciones)
-   **source_pdb**: el archivo PDB del que se extrae la conformación del segmento
-   **task_operations**: una lista de TaskOperations separadas por comas que se usan.
-   **from_res**: el residuo N-terminal del segmento muestreado
-   **to_res**: el residuo C-terminal del segmento muestreado
-   **torsion_database**: nombre del archivo de conformaciones en el que se guarda
-   **design_shell**: radio de la capa de diseño alrededor de la nueva conformación del segmento.
-   **repack_shell**: radio de la capa de reempaquetado alrededor de la nueva conformación del segmento.
-   **rms_cutoff**: al final de la ejecución, el valor de RMSD entre la nueva conformación del segmento y la conformación del segmento de origen. Si el valor de RMSD supera el umbral fijado, la ejecución falla. Este valor solo se refiere a los elementos de estructura secundaria del nuevo segmento. 
-   **rms_cutoff_loop**: igual que rms_cutoff, pero solo se refiere a los elementos de estructura secundaria de tipo loop. 
-   **randomize_cut**:  si es true, el corte se colocará al azar en el segmento
-   **cut_secondarystruc**: si es true, el corte se puede colocar en un elemento de estructura secundaria.
-   **thread_original_sequence**: si es true, usa la secuencia del PDB de origen 
-   **rtmin**:  aplica rtmin después de CCD/minmover
-   **splice_filter**: nombre del filtro que se usa para comprobar si el mover terminó con éxito.
-   **mover**: qué mover se usa para cerrar el segmento
-   **restrict_to_repacking_chain2**: si es true, no diseña la cadena2
-   **use_sequence_profiles**: XRW TO DO


Subetiqueta **Segments**:   envoltorio para varias etiquetas de segmentos

-   **current_segment**: qué segmento estamos cambiando actualmente


Subetiqueta **Segment**:   etiqueta de un segmento individual

-   **pdb_profile_match**: mapa del segmento del pdb de origen al archivo PSSM
-   **profiles**: ruta a los archivos PSSM

---
##Ejemplo
Por ahora, este mover solo es accesible mediante RosettaScripts. La conformación del nuevo segmento se guardará en el archivo test.db. El mover "min" se usa para optimizar la nueva conformación de la cadena principal en el contexto del Pose.

A continuación se muestra un ejemplo de etiqueta de RosettaScripts:

```xml
			<SpliceOut name="spliceout" source_pdb="source.pdb" torsion_database="test.db" scorefxn="talaris14" randomize_cut="1" cut_secondarystruc="0" from_res="127" to_res="199" rms_cutoff="0.25" design_shell="0.01" repack_shell="0.01" splice_filter="chainbreak_val" template_file="template.pdb" task_operations="init,rtr" debug="0" mover="min" superimposed="1"> 
 <Segments current_segment="blade4"/>
</SpliceOut>


```
