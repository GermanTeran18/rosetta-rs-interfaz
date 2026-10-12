#MergePDBMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MergePDBMover


##Autor
TJ Brunette; tjbrunette@gmail.com

##Resumen 

Combina dos Poses a lo largo de un elemento de estructura secundaria común y rediseña la secuencia según corresponda.

```xml
<MergePDB name="(&string;)" symm_file="(&string;)"
        attachment_termini="(n_term &attachment_termini_type;)"
        chain="(A &string;)" overlap_length="(4 &non_negative_integer;)"
        overlap_rmsd="(0.3 &real;)"
        overlap_scan_range_cmdLine_pose="(20 &non_negative_integer;)"
        overlap_scan_range_xml_pose="(20 &non_negative_integer;)"
        attach_pdb="(&string;)" design_range="(9 &real;)"
        packing_range="(8 &real;)" detect_disulf_before_pack="(true &bool;)"
        do_minimize="(true &bool;)" no_design_label="(&string;)"
        duplicate_rmsd_pose_threshold="(1.0 &real;)"
        init_overlap_sequence="[input_pose|xml_pose|both]"
        scorefxn="(&string;)" output_only_first="(false &bool;)"
        output_overlap_positions="(false &bool;)" do_design="(true &bool;)"
        clash_threshold="(10 &real;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

Opciones:

* **task_operations:** por defecto, cualquier residuo dentro de packing_range se reempaquetará y cualquier residuo dentro de design_range se diseñará.

* **scorefxn:** la función de puntuación que se usa para el diseño y el empaquetado. Es obligatoria si no se usa como 
  subetiqueta de algún otro LoopMover.

* **attachment_termini:** [n_term o c_term] ¿quieres unir el xml_pose al extremo N o al extremo C del input_pose (el Pose de -in:file:s)?

* **attach_pdb:** PDB que se va a unir

* **overlap_length:** número de residuos que se solapan

* **overlap_rmsd:** umbral para considerar que hay solapamiento

* **design_range:** distancia en Å desde el solapamiento dentro de la cual se diseña

* **packing_range:** distancia desde los residuos diseñados dentro de la cual se permite el empaquetado

* **overlap_scan_range_cmdLine_pose:** cuántos residuos del PDB de -in:file se comprueban en busca de solapamiento

* **overlap_scan_range_xml_pose:** cuántos residuos del attach_pdb se comprueban en busca de solapamiento

* **symm_file:** si se usa simetría (Pose de entrada simétrico), hay que reconstruir la simetría tras el solapamiento. Indica la ruta de la definición de simetría

* **no_design_label:** usa add_residue_label para definir las partes que no quieres diseñar

* **init_overlap_sequence:[input_pose|xml_pose|both]:** en qué Pose quieres inicializar los rotámeros del solapamiento

* **duplicate_rmsd_pose_threshold:** RMSD para eliminar Poses duplicados. Por velocidad, no funciona con valores >1.0

* **chain:** sobre qué cadena se opera. Por defecto es 'A'.

* **do_design**: realiza diseño de secuencia (por defecto: true)

* **do_minimize**: realiza minimización de energía (por defecto: true)

**Notas:**

* Se añaden PDBInfoLabels al Pose de salida:

**overlap**: residuos que se superponen entre input_pose y xml_pose

**other_overlap**: residuos detectados alrededor del design_range que se diseñaron

**other_overlap_sym**: residuos detectados por simetría que se diseñaron

**Advertencias:**

* El Pose debe ser simétrico desde el principio para usar la opción symm_file.
* Si se define no_design_label, debes usar init_overlap_sequence="input_pose" (el valor por defecto)