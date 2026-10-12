[[_TOC_]]

###Autor
Gideon Lapidoth; glapidoth@gmail.com; PI: Sarel J. Fleishman; sarel@weizmann.ac.il

###Referencias


1. Lapidoth, Gideon D., Dror Baran, Gabriele M. Pszolla, Christoffer Norn, Assaf Alon, Michael D. Tyka, and Sarel J. Fleishman. 2015. “AbDesign: An Algorithm for Combinatorial Backbone Design Guided by Natural Conformations and Sequences.” Proteins 83 (8): 1385–1406.
2. Baran, Dror, M. Gabriele Pszolla, Gideon D. Lapidoth, Christoffer Norn, Orly Dym, Tamar Unger, Shira Albeck, Michael D. Tyka, and Sarel J. Fleishman. 2017. “Principles for Computational Design of Binding Antibodies.” Proceedings of the National Academy of Sciences of the United States of America 114 (41): 10900–905.
3. Norn, Christoffer H., Gideon Lapidoth, and Sarel J. Fleishman. 2017. “High-Accuracy Modeling of Antibody Structures by a Search for Minimum-Energy Recombination of Backbone Fragments.” Proteins 85 (1): 30–38.


##Descripción general
###Resumen 

Este mover es el mover central de los algoritmos "AbDesign"[1-2] y "AbPredict"[3] para diseñar y modelar el dominio variable (Fv) de los anticuerpos, formado por las cadenas variables ligera y pesada. Ambos algoritmos usan una optimización combinatoria de la cadena principal, que aprovecha el gran número de secuencias y de estructuras moleculares determinadas experimentalmente de anticuerpos para construir nuevos modelos de anticuerpos, en lugar de intentar construir conformaciones de la cadena principal desde cero. En resumen, todas las estructuras de anticuerpos determinadas experimentalmente se descargan del Protein Data Bank (PDB) y se segmentan en posiciones estructuralmente conservadas: las cisteínas de disulfuro en el núcleo de las cadenas ligera y pesada del dominio variable, lo que crea 4 segmentos que comprenden las CDR 1 y 2 y el andamio intermedio (VH y VL) y la CDR 3 (H3 y L3). Luego estos cuatro segmentos se recombinan de forma combinatoria para producir un conjunto de nuevos modelos de anticuerpos con una gran diversidad conformacional. Después, los modelos se optimizan energéticamente mediante muestreo de Monte Carlo. En cada paso se muestrea una conformación de segmento al azar de una base de datos de torsiones precalculada con el mover **SpliceInAntibody**. El mover aplica los ángulos de torsión de la base de datos al segmento correspondiente (p. ej., VH, VL, L3 o H3). Si el segmento que se reemplaza es más corto que el que se muestrea, se añaden residuos idealizados al segmento del Pose. 
La base de datos de torsiones se genera con el mover [SpliceOutAntibody](https://www.rosettacommons.org/docs/wiki/scripting_documentation/RosettaScripts/Movers/movers_pages/SpliceOutAntibody). 
```xml
<SpliceInAntibody name="(&string;)" tolerance="(0.23 &real;)"
        ignore_chain_break="(false &bool;)" debug="(false &bool;)"
        min_seg="(false &bool;)" CG_const="(false &bool;)"
        rb_sensitive="(false &bool;)" chain_num="(1 &non_negative_integer;)"
        segment="(&string;)" superimposed="(true &bool;)"
        delta_lengths="(&int_cslist;)" dbase_iterate="(false &bool;)"
        database_entry="(&non_negative_integer;)"
        database_pdb_entry="(&string;)" scorefxn="(&string;)"
        template_file="(&string;)" 
        task_operations="(&task_operation_comma_separated_list;)"
        torsion_database="(&string;)" design_shell="(6.0 &real;)"
        repack_shell="(8.0 &real;)" 
        rtmin="(true &bool;)" splice_filter="(&string;)" 
        restrict_to_repacking_chain2="(true &bool;)"
        use_sequence_profile="(true &bool;)" >
</SpliceInAntibody>
```

-   **tolerance**: a cuántas desviaciones estándar de la norma está la longitud de enlace de la ruptura de cadena.
-   **ignore_chain_break**: si es true, y se encuentra una ruptura de cadena, no hace fallar la trayectoria. Se usa para depuración. 
-   **debug**: si es true, la salida es más detallada y se vuelcan pdbs.
-   **min_seg**: aplica minimización a la cadena principal y las cadenas laterales de la nueva conformación del segmento.
-   **segment**: qué tipo de segmento se cambia (L1_L2, H1_H2, L3 o H3)
-   **delta_lengths**: una lista de enteros separados por comas que especifica las deltas de longitud entre las longitudes del segmento actual y las muestreadas de la base de datos. Por ejemplo, si delta_length=-1,1, solo se muestrearán las conformaciones que sean un residuo más largas o más cortas que el segmento original.
-   **dbase_iterate**: itera sobre la base de datos de conformaciones. Se usa para el modelado de anticuerpos. 
-   **database_entry**: especifica el número de entrada de la conformación que se muestrea de la base de datos de conformaciones.
-   **database_pdb_entry**:  especifica el código PDB de entrada de la conformación que se muestrea de la base de datos de conformaciones.
-   **scorefxn**: nombre de la función de puntuación que se usa
-   **template_file**: el archivo pdb que se usó para construir la base de datos de conformaciones.
-   **task_operations**: una lista de TaskOperations separadas por comas que se usan.
-   **torsion_database**: ruta al archivo de la base de datos de conformaciones. 
-   **design_shell**: capa de diseño alrededor de la conformación muestreada.
-   **repack_shell**: capa de reempaquetado alrededor de la conformación muestreada.
-   **rtmin**: bool. ¿Realizar rtmin sobre el nuevo segmento?
-   **restrict_to_repacking_chain2**: bool. ¿Aplicar diseño a la cadena que no es del anticuerpo?
-   **use_sequence_profile**: usa restricciones de secuencia de PSSMs específicas de la conformación.

---

##Ejemplo
Por ahora, este mover solo es accesible mediante RosettaScripts. La definición de SpliceInAntibody de abajo aplicará una nueva **conformación L1_L2** al anticuerpo del Pose. 


A continuación se muestra un ejemplo de etiqueta de RosettaScripts:

```xml
	<SpliceInAntibody name="splice" torsion_database="L1_L2.db"  scorefxn="ref_15" repack_shell="8" design_shell="6" template_file="template.pdb" task_operations="init" debug="0"  min_seg="1" database_entry="5" segment="L1_L2"> 
		</SpliceInAntibody>



```
