[[_TOC_]]

###Autor
Gideon Lapidoth; glapidoth@gmail.com; PI: Sarel J. Fleishman; sarel@weizmann.ac.il

##Descripción general
###Resumen 

Este mover es similar al mover SpliceIn: se usa para aplicar nuevos ángulos de torsión (phi, psi y omega) de una base de datos precalculada (véase [SpliceOutTail](https://www.rosettacommons.org/docs/wiki/create/scripting_documentation/RosettaScripts/Movers/SpliceOutTail)) a un segmento correspondiente del Pose. Mientras que SpliceIn sirve para extraer los ángulos de torsión de un segmento colocado entre dos residuos, SpliceInTail está diseñado para segmentos que están en los extremos N o C de la cadena de la proteína. El PDB plantilla que se usó para construir la base de datos de torsiones debe ser el mismo que se use con este mover. Además, el PDB plantilla y el Pose deben estar alineados estructuralmente. El pdb plantilla se usa para "contabilidad": el número de "from res" (el residuo al comienzo del segmento modificado) sigue el PDB plantilla. 

```xml
<SpliceInTail name="(&string;)" debug="(false &bool;)" min_seg="(false &bool;)"
        CG_const="(false &bool;)" chain_num="(1 &non_negative_integer;)" 
        superimposed="(true &bool;)" use_sequence_profile="(&bool;)"
        scorefxn="(&string;)" template_file="(&string;)" task_operations="(&task_operation_comma_separated_list;)"
        torsion_database="(&string;)" database_entry="(&non_negative_integer;)" database_pdb_entry="(&string;)"
        design_shell="(6.0 &real;)" repack_shell="(8.0 &real;)" 
        delta_lengths="(&int_cslist;)" thread_original_sequence="(false &bool;)"
        rtmin="(true &bool;)" dbase_iterate="(false &bool;)">
  
  <Segments name="(&string;)" profile_weight_away_from_interface="(1.0 &real;)"
            current_segment="(&string;)" >
        <segment name="(&string;)" pdb_profile_match="(&string;)" profiles="(&string;)" />
    </Segments>
</SpliceInTail>
```

-    **debug**: si es true, la salida es más detallada y se vuelcan estructuras PDB.
-   **min_seg**: aplica el minimizador al nuevo segmento. Se recomienda para mejorar la energía. Se aplica con restricciones de coordenadas.
-    **CG_const**: si es true, aplica una restricción de coordenadas a los C-gamma del segmento durante CCD/minimización
-   **chain_num**: la cadena del Pose a la que se añade el nuevo segmento.
-   **superimposed**: si es false, superpone el pdb de origen sobre el Pose actual.
-   **use_sequence_profile**: si es true, construye una PSSM y aplica el perfil de secuencia al Pose
-   **scorefxn**: nombre de la función de puntuación que se usa
-   **template_file**: el archivo PDB del PDB de referencia (el que se usó para construir la base de datos de conformaciones)
-   **task_operations**: una lista de TaskOperations separadas por comas que se usan.
-   **torsion_database**: nombre del archivo de conformaciones en el que se guarda
-   **database_entry**: qué entrada de la base de datos se usa (por número; p. ej., primera entrada = 1, segunda entrada = 2, etc.)
-   **database_pdb_entry**: qué entrada de la base de datos se usa, por código PDB
-   **design_shell**: cuántos residuos alrededor del segmento construido se pueden diseñar
-   **repack_shell**: cuántos residuos alrededor del segmento construido se pueden reempaquetar
-   **delta_lengths**: muestrea longitudes de la nueva conformación del segmento con deltas de longitud relativas al segmento inicial del Pose (p. ej., si la delta de longitud se fija en -2, de la base de datos solo se muestrearán segmentos que sean 2 aminoácidos más cortos que el segmento del Pose)
-   **thread_original_sequence**: usa la secuencia de la base de datos de torsiones. 
-   **rtmin**: aplica rtmin después de minmover/tailsegmentmover
-   **dbase_iterate**: si es true, recorre la base de datos de torsiones de forma iterativa (así, en la misma trayectoria no se muestreará dos veces la misma conformación de la base de datos). 


Subetiqueta **Segments**:   envoltorio para varias etiquetas de segmentos

-   **profile_weight_away_from_interface**: multiplica la restricción de secuencia aplicada por un factor para los residuos fuera de la interfaz predefinida
-   **current_segment**: qué segmento se está modificando actualmente 

##Ejemplo
Por ahora, este mover solo es accesible mediante RosettaScripts. La conformación del nuevo segmento se muestreará del archivo test.db. 

A continuación se muestra un ejemplo de etiqueta de RosettaScripts:

```xml
			<SpliceInTail name="splice" torsion_database="test.db"  scorefxn="talaris_cal" repack_shell="1" design_shell="1" template_file="template.pdb" task_operations="init,thread" debug="1"  min_seg="1" delta_lengths="-2,-1,0,1,2" dbase_iterate="1" > rtmin=1 CG_const="1"
          <Segments current_segment="blade6"/>
	</SpliceInTail>


```
