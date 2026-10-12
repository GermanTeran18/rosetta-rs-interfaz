[[_TOC_]]

###Autor
Gideon Lapidoth; glapidoth@gmail.com; PI: Sarel J. Fleishman; sarel@weizmann.ac.il

##Descripción general
###Resumen 

Este mover es similar al mover SpliceOut: sirve para extraer los ángulos de torsión phi, psi y omega de una estructura PDB de referencia y guardarlos en una base de datos de torsiones. Más adelante, esa base de datos se usa en el diseño para modificar la conformación de la cadena principal de una Pose (consulta [SpliceInTail](https://www.rosettacommons.org/docs/wiki/create/scripting_documentation/RosettaScripts/Movers/SpliceInTail)). Mientras que SpliceOut sirve para extraer los ángulos de torsión de un segmento situado entre dos residuos, SpliceOutTail está pensado para segmentos que están en los extremos N o C de la cadena de la proteína. El PDB de referencia, la estructura de la Pose y el molde deben estar alineados. El PDB molde se usa para llevar la "contabilidad": el número de "from res" (el residuo al inicio del segmento modificado) se toma según el PDB molde. Debe usarse el mismo PDB molde para el mover SpliceInTail. 

```xml
<SpliceOutTail name="(&string;)" debug="(false &bool;)"
        CG_const="(false &bool;)" 
        chain_num="(1 &non_negative_integer;)" 
        superimposed="(true &bool;)" tail_segment="(&n_or_c;)"
        use_sequence_profile="(&bool;)" scorefxn="(&string;)"
        template_file="(&string;)" 
        source_pdb="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        from_res="(0 &refpose_enabled_residue_number;)"
        torsion_database="(&string;)" design_shell="(6.0 &real;)"
        repack_shell="(8.0 &real;)" rms_cutoff="(999999 &real;)"
        thread_original_sequence="(false &bool;)"
        rtmin="(true &bool;)" splice_filter="(&string;)"
        mover="(&string;)" restrict_to_repacking_chain2="(true &bool;)"
        use_sequence_profiles="(true &bool;)" >
    <Segments name="(&string;)" current_segment="(&string;)" >
        <segment name="(&string;)" pdb_profile_match="(&string;)" profiles="(&string;)" />
    </Segments>
</SpliceOutTail>
```
-    **debug**: si es true, la salida es más detallada y se guardan estructuras PDB. 
-    **CG_const**: si es true, aplica una restricción de coordenadas sobre los C-gamma del segmento durante CCD/minimización.
-   **chain_num**: la cadena de la Pose a la que se añade el nuevo segmento.
-   **superimposed**: si es false, superpone el PDB de origen sobre la Pose actual.
-   **tail_segment**: indica si es un segmento C-terminal ("c") o N-terminal ("N").
-   **scorefxn**: nombre de la función de puntuación que se usará.
-   **template_file**: el archivo PDB de referencia (el que se usó para construir la base de datos de conformaciones).
-   **source_pdb**: el archivo PDB del que se extrae la conformación del segmento.
-   **task_operations**: lista de TaskOperations separadas por comas que se usarán.
-   **torsion_database**: nombre del archivo de conformaciones donde se guardará el resultado.
-   **design_shell**: cuántos residuos alrededor del segmento construido pueden diseñarse.
-   **repack_shell**: cuántos residuos alrededor del segmento construido pueden reempaquetarse.
-   **rms_cutoff**: el umbral de RMS entre el nuevo segmento añadido a la Pose y el segmento del PDB de origen. Si el RMS supera cierto umbral, el mover informa de un fallo. Este parámetro solo se refiere a los elementos de estructura secundaria.
-   **rtmin**: aplica rtmin después de minmover/tailsegmentmover.
-   **splice_filter**: nombre del filtro que se usa para comprobar si el mover terminó correctamente. 
-   **mover**: qué mover se usa para optimizar la cadena principal del segmento (minmover/TailSegmentMover).
-   **restrict_to_repacking_chain2**: si es true, no se diseña la cadena 2.
-   **use_sequence_profile**: si es true, construye una PSSM y aplica el perfil de secuencia a la Pose.

Subetiqueta **Segments**:   contenedor para varias etiquetas de segmentos

-   **profile_weight_away_from_interface**: multiplica por un factor la restricción de secuencia aplicada a los residuos que están fuera de la interfaz predefinida.
-   **current_segment**: qué segmento se está modificando en este momento. 

##Ejemplo
Por ahora, este mover solo es accesible mediante RosettaScripts. La conformación del nuevo segmento se guardará en el archivo test.db. El mover "min" se usa para optimizar la nueva conformación de la cadena principal en el contexto de la Pose.

A continuación se muestra un ejemplo de etiqueta de RosettaScripts:

```xml
		<SpliceOutTail name="spliceout" source_pdb="1.pdb" torsion_database="test.db" scorefxn="talaris2014" tail_segment="c" from_res="100" rms_cutoff="100" design_shell="0.01" repack_shell="0.01" template_file="template.pdb" task_operations="init,rtr" debug="1" mover="min" superimposed="1"> 
      			<Segments current_segment="test"/>
		</SpliceOutTail>


```