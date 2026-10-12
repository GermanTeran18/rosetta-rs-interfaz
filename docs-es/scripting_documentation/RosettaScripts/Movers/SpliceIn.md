[[_TOC_]]

###Autor
Gideon Lapidoth; glapidoth@gmail.com; PI: Sarel J. Fleishman; sarel@weizmann.ac.il

##Descripción general
###Resumen 

Este mover se usa para aplicar los ángulos de torsión phi, psi y omega de una base de datos de torsiones precalculada (véase [SpliceOut](https://www.rosettacommons.org/docs/wiki/create/scripting_documentation/RosettaScripts/Movers/SpliceOut)) al segmento correspondiente del Pose. El PDB plantilla se usa para establecer la correspondencia entre la base de datos de torsiones y el Pose actual, por lo que el PDB plantilla y el Pose deben estar alineados. Aquí se debe usar el mismo pdb plantilla que se usó para construir la base de datos de torsiones.


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
-   **debug**: más detalle durante la ejecución
-   **min_seg**: ¿minimizar el segmento después del splice in?
-   **CG_const**: aplica restricciones de coordenadas a los átomos C-gamma
-   **rb_sensitive**: aplica adaptaciones de cuerpo rígido
-   **chain_num**: en qué número de cadena se aplica el splice
-   **segment**: nombre del segmento
-   **superimposed**: ¿están superpuestas las estructuras?
-   **delete_hairpin**: ¿eliminar el segmento de horquilla?
-   **delete_hairpin_n**: cuántos residuos eliminar en la horquilla del extremo N
-   **delete_hairpin_c**: cuántos residuos eliminar en la horquilla del extremo C
-   **tail_segment**: en qué dirección está el segmento de cola
-   **source_pdb_to_res**: número del último residuo del segmento de origen
-   **skip_alignment**: si se alinea el Pose con el pdb de origen
-   **use_sequence_profile**: ¿usar perfiles de secuencia en el diseño?
-   **scorefxn**: nombre de la función de puntuación que se usa
-   **template_file**: cuál es el archivo plantilla que se usa durante el diseño
-   **task_operations**: una lista de TaskOperations separadas por comas que se usan.
-   **design_task_operations**: XRW TO DO
-   **residue_numbers_setter**: XRW TO DO
-   **torsion_database**: nombre del archivo de la base de datos de torsiones
-   **database_entry**: elige la entrada de la base de datos por número
-   **database_pdb_entry**: XRW TO DO
-   **design_shell**: radio de la capa de diseño
-   **repack_shell**: radio de la capa de empaquetado
-   **randomize_cut**: ¿debe colocarse el corte al azar en el segmento diseñado?
-   **cut_secondarystruc**: coloca el corte en la estructura secundaria
-   **delta_lengths**: lista separada por comas de las deltas de longitud de segmento permitidas
-   **thread_original_sequence**: hace threading de la secuencia del pdb de origen sobre el diseño
-   **rtmin**: ¿debe aplicarse rtmin después del diseño?
-   **dbase_iterate**: ¿debe iterarse sobre el archivo de la base de datos?
-   **checkpointing_file**: nombre del archivo de checkpoint


Subetiqueta **Segments**:   envoltorio para varias etiquetas de segmentos

-   **profile_weight_away_from_interface**: XRW TO DO
-   **current_segment**: XRW TO DO


Subetiqueta **segment**:   etiqueta de un segmento individual

-   **pdb_profile_match**: XRW TO DO
-   **profiles**: XRW TO DO

---

---
##Ejemplo
Por ahora, este mover solo es accesible mediante RosettaScripts. La conformación del nuevo segmento se guardará en el archivo test.db. El mover "min" se usa para optimizar la nueva conformación de la cadena principal en el contexto del Pose.

A continuación se muestra un ejemplo de etiqueta de RosettaScripts:

```xml
			<SpliceOut name="spliceout" source_pdb="source.pdb" torsion_database="test.db" scorefxn="talaris14" randomize_cut="1" cut_secondarystruc="0" from_res="127" to_res="199" rms_cutoff="0.25" design_shell="0.01" repack_shell="0.01" splice_filter="chainbreak_val" template_file="template.pdb" task_operations="init,rtr" debug="0" mover="min" superimposed="1"> 
 <Segments current_segment="blade4"/>
</SpliceOut>


```
