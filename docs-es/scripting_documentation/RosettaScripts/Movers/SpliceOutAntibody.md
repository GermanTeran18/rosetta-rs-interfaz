[[_TOC_]]

###Autor
Gideon Lapidoth; glapidoth@gmail.com; PI: Sarel J. Fleishman; sarel@weizmann.ac.il

###Referencias


1. Baran, Dror, M. Gabriele Pszolla, Gideon D. Lapidoth, Christoffer Norn, Orly Dym, Tamar Unger, Shira Albeck, Michael D. Tyka, and Sarel J. Fleishman. 2017. “Principles for Computational Design of Binding Antibodies.” Proceedings of the National Academy of Sciences of the United States of America 114 (41): 10900–905.
2. Lapidoth, Gideon D., Dror Baran, Gabriele M. Pszolla, Christoffer Norn, Assaf Alon, Michael D. Tyka, and Sarel J. Fleishman. 2015. “AbDesign: An Algorithm for Combinatorial Backbone Design Guided by Natural Conformations and Sequences.” Proteins 83 (8): 1385–1406.
3. Norn, Christoffer H., Gideon Lapidoth, and Sarel J. Fleishman. 2017. “High-Accuracy Modeling of Antibody Structures by a Search for Minimum-Energy Recombination of Backbone Fragments.” Proteins 85 (1): 30–38.


##Descripción general
###Resumen 

Este mover es el mover central de los algoritmos "AbDesign"[1-2] y "AbPredict"[3], que sirven para diseñar y modelar el dominio variable (Fv) de los anticuerpos, formado por las cadenas variables ligera y pesada. Ambos métodos usan un algoritmo de optimización combinatoria de la cadena principal que aprovecha la gran cantidad de secuencias y de estructuras moleculares determinadas experimentalmente de anticuerpos para construir nuevos modelos de anticuerpos, en lugar de intentar construir conformaciones de la cadena principal desde cero. En resumen, todas las estructuras de anticuerpos determinadas experimentalmente se descargan del Protein Data Bank (PDB) y se segmentan en posiciones estructuralmente conservadas: las cisteínas de los puentes disulfuro en el núcleo de las cadenas ligera y pesada del dominio variable. Así se crean 4 segmentos: los CDR 1 y 2 con el andamio intermedio (VH y VL) y el CDR 3 (H3 y L3). Estos cuatro segmentos se recombinan de forma combinatoria para producir un conjunto de nuevos modelos de anticuerpos con una gran diversidad conformacional. Después, los modelos se optimizan energéticamente mediante muestreo de Monte Carlo. En cada paso se muestrea la conformación de un segmento al azar a partir de una base de datos precalculada. 
El mover **SpliceOutAntibody** sirve para crear la base de datos de conformaciones. La base de datos de conformaciones es específica de un anticuerpo molde. Cualquier estructura del PDB puede usarse como anticuerpo molde, que sirve de punto de partida o marco de referencia sobre el que se muestrean las distintas conformaciones de la cadena principal de los anticuerpos. 
Para cada segmento (VL, L3, VH y H3) de cada uno de los anticuerpos naturales, extraemos los ángulos diedros de la cadena principal (phi, psi y omega) del anticuerpo de origen y sustituimos el segmento del molde por los ángulos diedros del segmento de origen, introduciendo un corte en la cadena principal en una posición elegida al azar dentro del segmento insertado. Cuando el segmento insertado es más largo que el segmento del anticuerpo molde, se añaden residuos al modelo usando longitudes y ángulos de enlace idealizados. Luego refinamos la cadena principal con el mover de descenso de coordenadas cíclico (CCD) o con minmover.

```xml
<SpliceOutAntibody name="(&string;)" tolerance="(0.23 &real;)"
        ignore_chain_break="(false &bool;)" debug="(false &bool;)"
        CG_const="(false &bool;)" rb_sensitive="(false &bool;)"
        chain_num="(1 &non_negative_integer;)"
        cut_site="(1 &non_negative_integer;)" segment="(&string;)"
        superimposed="(true &bool;)" add_sequence_constraints_only="(false &bool;)"
        template_file="(&string;)" source_pdb="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        torsion_database="(&string;)" design_shell="(6.0 &real;)"
        repack_shell="(8.0 &real;)" rms_cutoff="(999999 &real;)"
        rms_cutoff_loop="(999999 &real;)"
        cut_secondarystruc="(false &bool;)" 
        design="(false &bool;)" 
        rtmin="(true &bool;)" allow_all_aa="(false &bool;)"
        locked_residue="(&string;)" checkpointing_file="(&string;)"
        splice_filter="(&string;)" mover="(&string;)" tail_mover="(&string;)"
        restrict_to_repacking_chain2="(true &bool;)"
        use_sequence_profile="(true &bool;)" >
    <Segments name="(&string;)" current_segment="(&string;)" >
        <segment name="(&string;)" pdb_profile_match="(&string;)" profiles="(&string;)" />
    </Segments>
</SpliceOutAntibody>
```

-    **tolerance**: el mover Splice hace una comprobación interna de la longitud del enlace peptídico en el nuevo segmento. Si la longitud del enlace supera la tolerancia fijada, el mover informa de un fallo. 
-    **ignore_chain_break**: si es true, ignora la desviación en la longitud del enlace. No se recomienda y suele usarse para depurar. 
-    **debug**: si es true, la salida es más detallada y se guardan estructuras PDB. 
-    **CG_const**: si es true, aplica una restricción de coordenadas sobre los C-gamma del segmento durante CCD/minimización.
-    **rb_sensitive**: si es true, alinea la Pose actual con el PDB molde.
-   **chain_num**: la cadena de la Pose a la que se añade el nuevo segmento.
-   **cut_site**: número del residuo donde se coloca el corte; se usa sobre todo para depurar.
-   **segment**: qué segmento se está cambiando (VL, VH, L3, H3).
-   **superimposed**: superpone el PDB de origen sobre la Pose actual.
-   **scorefxn**: nombre de la función de puntuación que se usará.
-   **add_sequence_constraints_only**: si es true, no construye un nuevo segmento; solo construye el perfil de secuencia de la Pose y aplica las restricciones de secuencia.
-   **template_file**: el archivo PDB de referencia (el que se usó para construir la base de datos de conformaciones).
-   **source_pdb**: el archivo PDB del que se extrae la conformación del segmento.
-   **task_operations**: lista de TaskOperations separadas por comas que se usarán.
-   **torsion_database**: nombre del archivo de conformaciones donde se guardará el resultado.
-   **design_shell**: radio de la capa de diseño alrededor de la conformación del nuevo segmento.
-   **repack_shell**: radio de la capa de reempaquetado alrededor de la conformación del nuevo segmento.
-   **rms_cutoff**: el umbral de RMS entre el nuevo segmento añadido a la Pose y el segmento del PDB de origen. Si el RMS supera cierto umbral, el mover informa de un fallo. Este parámetro solo se refiere a los elementos de estructura secundaria.
-   **rms_cutoff_loop**: el umbral de RMS entre el nuevo segmento añadido a la Pose y el segmento del PDB de origen, solo para la región de loop.
-   **randomize_cut**: si es true, el corte se coloca al azar en el segmento.
-   **cut_secondarystruc**: si es true, el corte puede colocarse en un elemento de estructura secundaria.
-   **rtmin**: aplica rtmin después de CCD/minmover.
-   **splice_filter**: nombre del filtro que se usa para comprobar si el mover terminó correctamente. 
-   **mover**: qué mover se usa para cerrar el segmento (CCD/minmover).
-   **tail_mover**: qué mover se usa para cambiar la conformación del segmento de cola de VL/VH.
-   **restrict_to_repacking_chain2**: si es true, no se diseña la cadena 2.
-   **use_sequence_profile**: si es true, construye una PSSM y aplica el perfil de secuencia a la Pose.

##Ejemplo
Por ahora, este mover solo es accesible mediante RosettaScripts. La definición de SpliceOutAntibody siguiente generará una nueva **conformación L1_L2** y la aplicará al anticuerpo de la Pose. La conformación del nuevo segmento se guardará en el archivo <name>_L1_L2.db. Los movers CCD y de cola también deben definirse en el XML.


A continuación se muestra un ejemplo de etiqueta de RosettaScripts:

```xml
	<SpliceOutAntibody name="spliceout" source_pdb="%%source%%" torsion_database="db/%%name%%_L1_L2.db" scorefxn="talaris_cal" rms_cutoff="0.3" rms_cutoff_loop="0.3" splice_filter="chainbreak_val" template_file="%%start_pdb%%" task_operations="init,seqprofcons" debug="0" mover="ccd" tail_mover="tail" segment="L1_L2" use_sequence_profile="1" superimposed="1" > 
		</SpliceOutAntibody>

```