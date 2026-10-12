#MultiBodyFeaturesReporters

[[_TOC_]]

##Features de anticuerpos




**Descripción general**

Estos features reporters analizan los componentes de un anticuerpo y las interfaces que forman parte de él.


###AntibodyFeatures

**Autor**

Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
Investigador principal: Roland Dunbrack

Parte del marco de trabajo RosettaAntibody y RosettaAntibodyDesign (RAbD)
* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]]

Muchas de las funciones de métricas fueron programadas por primera vez por Brian Weitzner (brian.weitzner@gmail.com) y Jeff Gray ([[http://graylab.jhu.edu]]) en JHU como parte de RosettaAntibody 3.0.

**Descripción general**

El Antibody Features Reporter es una subclase del Reporter [[InterfaceFeatures |MultiBodyFeaturesReporters#InterfaceFeatures]]. Genera todas las tablas igual que InterfaceFeatures, para interfaces específicas de anticuerpos (combinaciones de L, H y A, donde L es la cadena ligera, H la pesada y A el antígeno). Por defecto, analizará todas las interfaces del anticuerpo, a menos que se especifique lo contrario en la etiqueta XML. También añadirá a las tablas del anticuerpo información sobre el antígeno. Usa _skip_all_antigen_analysis_ para omitir este reporte. Funciona también con anticuerpos de camélidos.

Para usar este Reporter, el anticuerpo debe estar renumerado según un esquema de numeración concreto. Consulta [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información sobre cómo renumerar tu anticuerpo con distintos servidores de anticuerpos. Si tu anticuerpo proviene de RosettaAntibody 3.0, ya está renumerado con el esquema de Chothia, que es el predeterminado. El esquema de numeración se puede especificar por línea de comandos o mediante una etiqueta XML.

```xml
			<AntibodyFeatures scorefxn="(&string)" interface="(&string)" numbering_scheme="(&string, Chothia_Scheme)" cdr_definition="(&string, Aroop)" pack_separated="(&string, true)" pack_together="(&string, false)" />
```

**Opciones XML**

-   scorefxn (& scorefxn string): especifica la función de puntuación que se usará
-   interface(s) (&string) (default=todas las interfaces del anticuerpo presentes): especifica la interfaz como CadenasLado1_CadenasLado2, como en LH_A, o una lista de interfaces como LH_A,L_HA, etc. Cadenas de interfaz aceptadas: L_H, L_A, H_A y LH_A
-   numbering_scheme (&string): establece el esquema de numeración del anticuerpo. También debe establecerse la opción XML cdr_definition. Ambas opciones también se pueden establecer por línea de comandos (recomendado). Consulta [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información.
-   cdr_definition (&string): establece la definición de CDR que quieres usar. También debe establecerse la opción XML numbering_scheme. Consulta [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]


**Más opciones XML**
-   pack_separated (&bool) (default=false): reempaqueta los residuos de la interfaz detectados durante la separación.
-   pack_together (&bool) (default=true): reempaqueta los residuos de la interfaz detectados cuando están juntos.
-   dSASA_cutoff (&real) (default=100): umbral de área de superficie accesible al solvente (SASA) enterrada para omitir el reporte de la mayoría de los valores.
-   compute_packstat (&bool) (default=true): ¿calcular el valor de PackStat (RosettaHoles 1.0) de la interfaz? Normalmente tarda un poco más. A veces packstat tiene errores. Si tienes errores en packstat, prueba a desactivarlo.
-   skip_all_antigen_analysis (&bool) (default=false): por defecto, si hay antígeno, se informa de algunos datos sobre él. Establece esta opción en true para omitir el reporte del antígeno.

**Tablas**

_ab_metrics_

-   Un conjunto de métricas del anticuerpo. Algunas se repiten de las métricas de la interfaz. El paratopo se define como todos los CDR presentes en el anticuerpo.

```sql
CREATE TABLE ab_metrics(
	struct_id INTEGER,
	numbering_scheme TEXT,
	cdr_definition TEXT,
	cdr_residues INTEGER,
	antigen_present INTEGER,
	antigen_chains TEXT,
	net_charge INTEGER,
	paratope_charge INTEGER,
	paratope_SASA REAL,
	paratope_hSASA REAL,
	paratope_pSASA REAL,
	VL_VH_packing_angle REAL,
	VL_VH_distance REAL,
	VL_VH_opening_angle REAL,
	VL_VH_opposite_opening_angle REAL,
	is_camelid INTEGER,
	FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (struct_id))
```

_cdr_metrics_

-   Análisis de los CDR en el Pose del anticuerpo.

```sql
CREATE TABLE cdr_metrics(
	struct_id INTEGER,
	CDR TEXT,
	length INTEGER,
	start INTEGER,
	end INTEGER,
	ag_ab_contacts_total INTEGER,
	ag_ab_contacts_nres INTEGER,
	ag_ab_dSASA REAL,
	ag_ab_dSASA_sc REAL,
	ag_ab_dhSASA REAL,
	ag_ab_dhSASA_sc REAL,
	ag_ab_dhSASA_rel_by_charge REAL,
	ag_ab_dG REAL,
	SASA REAL,
	charge INTEGER,
	energy REAL,
	anchor_CN_distance REAL,
	aromatic_nres REAL,
	FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (struct_id, CDR))

```

_ab_h3_kink_metrics_

-   Métricas del kink de H3 del anticuerpo

```sql
CREATE TABLE ab_h3_kink_metrics(
	struct_id INTEGER,
	kink_type TEXT,
	begin INTEGER,
	end INTEGER,
	anion_res INTEGER,
	cation_res INTEGER,
	RD_Hbond_dis REAL,
	bb_Hbond_dis REAL,
	Trp_Hbond_dis REAL,
	qdis REAL,
	qdih REAL,
	FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (struct_id))
```


###CDRClusterFeatures

**Autor**

Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
Investigador principal: Roland Dunbrack

Parte del marco de trabajo RosettaAntibody y RosettaAntibodyDesign (RAbD)
* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]]

**Referencias**

Adolf-Bryfogle J,  Xu Q,  North B, Lehmann A,  Roland L. Dunbrack Jr, [PyIgClassify: a database of antibody CDR structural classifications](https://doi.org/10.1093/nar/gku1106) , Nucleic Acids Research 2014

North B, Lehmann A, Dunbrack R, [A new clustering of antibody CDR loop conformations](https://pmc.ncbi.nlm.nih.gov/articles/PMC3065967/) (2011). JMB 406(2): 228-256.


**Descripción general**

Informa de los clústeres de CDR de North/Dunbrack de un anticuerpo. (Usa la definición de CDR de North/Dunbrack)

Para usar este Reporter, el anticuerpo debe estar renumerado según un esquema de numeración concreto. Consulta [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información sobre cómo renumerar tu anticuerpo con distintos servidores de anticuerpos. Si tu anticuerpo proviene de RosettaAntibody 3.0, ya está renumerado con el esquema de Chothia, que es el predeterminado. El esquema de numeración se puede especificar por línea de comandos o mediante una etiqueta XML.

```xml
			<CDRClusterFeatures numbering_scheme="AHO_Scheme"/>
```

**Opciones XML**
-   numbering_scheme (&string): establece el esquema de numeración del anticuerpo. También debe establecerse la opción XML cdr_definition. Ambas opciones también se pueden establecer por línea de comandos (recomendado). Consulta [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información.
-   cdrs (&string) (default=todos los CDR presentes): establece los CDR que quieres analizar. Valores permitidos = [H1, h1, etc.]

**Tablas**

_cdr_clusters_

```sql
CREATE TABLE cdr_clusters(
	struct_id INTEGER,
	resnum_begin INTEGER,
	resnum_end INTEGER,
	chain TEXT,
	CDR TEXT,
	length INTEGER,
	fullcluster TEXT,
	dis REAL,
	normDis REAL,
	normDis_deg REAL,
	sequence TEXT,
	FOREIGN KEY (struct_id) REFERENCES residues(struct_id) DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (struct_id, resnum_begin, resnum_end))
```

##Sándwiches beta

###SandwichFeatures

**Descripción general**

Resumen de la función: extraer y analizar sándwiches beta

Extracción: extrae los sándwiches beta de forma conservadora, de modo que se excluyan correctamente las hélices alfa que SCOP identifica como sándwich beta y los barriles beta que CATH identifica como sándwiches beta. Para volcarlos en archivos pdb, usa el format\_converter de Matt.

Análisis: ángulos phi/psi en las hebras del núcleo y del borde por separado. Interacciones electrostáticas entre residuos. Se asigna una lámina beta entre las dos láminas beta que constituyen un sándwich beta como cadena adicional, para poder usar InterfaceAnalyzer. Beta_sheet_capping_info. Distribución y tipo de aminoácidos. Topología candidata. Beta-capping. Quiralidad.


**Tablas**

-   **sandwich**

<!-- -->

    CREATE TABLE sandwich(
        struct_id INTEGER AUTOINCREMENT NOT NULL,
        sw_can_by_components_PK_id INTEGER NOT NULL,
        tag TEXT NOT NULL,
        sw_can_by_sh_id INTEGER NOT NULL,
        sheet_id INTEGER,
        sheet_antiparallel INTEGER,
        sw_can_by_components_bs_id INTEGER,
        sw_can_by_components_bs_edge INTEGER,
        intra_sheet_con_id INTEGER,
        inter_sheet_con_id INTEGER,
        residue_begin INTEGER NOT NULL,
        residue_end INTEGER NOT NULL,
        FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, residue_begin) REFERENCES residues(struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, residue_end) REFERENCES residues(struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
        PRIMARY KEY (struct_id, sw_can_by_components_PK_id));


###StrandBundleFeatures

**Descripción general**

Resumen de la función: encontrar todas las hebras -\> conservar todos los pares de hebras -\> conservar todos los pares de láminas

Detalle de la función:

Genera la unidad más pequeña de sándwiches beta, que son archivos de entrada del protocolo SEWING de Tim.

Tras encontrar todas las hebras beta en los archivos pdb, conserva todos los pares de hebras beta (paralelas o antiparalelas) entre ellas. Luego conserva todos los pares de láminas beta (constituidas por 4 hebras beta cada una). Al encontrar hebras y láminas, solo encuentra las que cumplen los criterios especificados en las opciones. Las tablas 'strand\_pairs' y 'sandwich' se crean cada una en un mismo esquema.


**Tablas**

-   **strand\_pairs**


<!-- -->

    CREATE TABLE strand_pairs(
        struct_id INTEGER AUTOINCREMENT NOT NULL,
        strand_pairs_id INTEGER NOT NULL,
        bool_parallel INTEGER NOT NULL,
        beta_select_id_i INTEGER NOT NULL,
        beta_select_id_j INTEGER NOT NULL,
        FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, beta_select_id_i) REFERENCES beta_selected_segments(struct_id, beta_selected_segments_id) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, beta_select_id_j) REFERENCES beta_selected_segments(struct_id, beta_selected_segments_id) DEFERRABLE INITIALLY DEFERRED,
        PRIMARY KEY (struct_id, strand_pairs_id));

-   **sandwich**

<!-- -->

    CREATE TABLE sandwich(
        struct_id INTEGER AUTOINCREMENT NOT NULL,
        sandwich_id INTEGER NOT NULL,
        sp_id_1 INTEGER NOT NULL,
        sp_id_2 INTEGER NOT NULL,
        shortest_sc_dis REAL NOT NULL,
        FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, sp_id_1) REFERENCES strand_pairs(struct_id, strand_pairs_id) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, sp_id_2) REFERENCES strand_pairs(struct_id, strand_pairs_id) DEFERRABLE INITIALLY DEFERRED,
        PRIMARY KEY (struct_id, sandwich_id));

##GeometricSolvationFeatures

**Descripción general**

-   **geometric\_solvation** : la puntuación exacta de solvatación geométrica, que se calcula integrando la energía de enlace de hidrógeno no ocupada por otros átomos.
    -   *hbond\_site\_id* : un donante o aceptor de enlace de hidrógeno
    -   *geometric\_solvation\_exact* : la versión no descomponible por pares de la puntuación de solvatación geométrica.

**Tablas**

<!-- -->

        CREATE TABLE IF NOT EXISTS geometric_solvation (
            struct_id INTEGER AUTOINCREMENT,
            hbond_site_id TEXT,
            geometric_solvation_exact REAL,
            FOREIGN KEY (struct_id, hbond_site_id) REFERENCES hbond_sites(struct_id, site_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, hbond_site_id));

##InterfaceFeatures

**Autor**

Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
Investigador principal: Roland Dunbrack


Autores de InterfaceAnalyzer: Steven Lewis, P. Ben Stranges, Jared Adolf-Bryfogle
El investigador principal es Brian Kuhlman, bkuhlman@email.unc.edu .


**Descripción general**

Este Feature Reporter escribe tres tablas correspondientes a las interfaces de un Pose dado. Internamente usa una versión actualizada del [[InterfaceAnalyzerMover]], que también usa la [[aplicación InterfaceAnalyzer | interface-analyzer]]. Sin opciones, detectará todas las interfaces de un Pose dado e informará de todas ellas, aunque no tengan residuos.

```xml
			<InterfaceFeatures scorefxn="(& Scorefxn name)" interface="(&string)", pack_separated="(&bool, false)" pack_together="(&bool, false)" dSASA_cutoff="(&real, 100)" compute_packstat="(&bool, true)" pack_together="true"/>
```


**Opciones XML**

-   scorefxn (& scorefxn string): especifica la función de puntuación que se usará
-   interface(s) (&string) (default=todas las interfaces): especifica la interfaz como CadenasLado1_CadenasLado2, como en LH_A, o una lista de interfaces como LH_A,L_HB, etc.
-   pack_separated (&bool) (default=false): reempaqueta los residuos de la interfaz detectados durante la separación.
-   pack_together (&bool) (default=true): reempaqueta los residuos de la interfaz detectados cuando están juntos.
-   dSASA_cutoff (&real) (default=100): umbral de área de superficie accesible al solvente (SASA) enterrada para omitir el reporte de la mayoría de los valores.
-   compute_packstat (&bool) (default=true): ¿calcular el valor de PackStat (RosettaHoles 1.0) de la interfaz? Normalmente tarda un poco más. A veces packstat tiene errores. Si tienes errores en packstat, prueba a desactivarlo.

**Tablas**

_interface_sides_

-   Datos de salida específicos de cada lado de una interfaz dada

```sql
CREATE TABLE interface_sides(
	struct_id INTEGER,
	interface TEXT,
	side TEXT,
	chains_side1 TEXT,
	chains_side2 TEXT,
	interface_nres INTEGER,
	dSASA REAL,
	dSASA_sc REAL,
	dhSASA REAL,
	dhSASA_sc REAL,
	dhSASA_rel_by_charge REAL,
	dG REAL,
	energy_int REAL,
	energy_sep REAL,
	avg_per_residue_energy_dG REAL,
	avg_per_residue_energy_int REAL,
	avg_per_residue_energy_sep REAL,
	avg_per_residue_dSASA REAL,
	avg_per_residue_SASA_int REAL,
	avg_per_residue_SASA_sep REAL,
	aromatic_fraction REAL,
	aromatic_dSASA_fraction REAL,
	aromatic_dG_fraction REAL,
	interface_to_surface_fraction REAL,
	ss_sheet_fraction REAL,
	ss_helix_fraction REAL,
	ss_loop_fraction REAL,
	FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY (chains_side1, chains_side2) REFERENCES interfaces(chains_side1, chains_side2) DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (struct_id, interface, side))
```

_interfaces_

-   Datos de salida globales de la interfaz

```sql
CREATE TABLE interfaces(
	struct_id INTEGER,
	interface TEXT,
	chains_side1 TEXT,
	chains_side2 TEXT,
	nchains_side1 INTEGER,
	nchains_side2 INTEGER,
	dSASA REAL,
	dSASA_hphobic REAL,
	dSASA_polar REAL,
	dG REAL,
	dG_cross REAL,
	dG_dev_dSASAx100 REAL,
	dG_cross_dev_dSASAx100 REAL,
	delta_unsatHbonds REAL,
	hbond_E_fraction REAL,
	sc_value REAL,
	packstat REAL,
	nres_int INTEGER,
	nres_all INTEGER,
	complex_normalized REAL,
	FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (struct_id, interface))
```

_interface_residues_

-   Datos de salida específicos de los residuos de una interfaz dada de un Pose dado.

```sql
CREATE TABLE interface_residues(
	struct_id INTEGER,
	interface TEXT,
	resNum INTEGER,
	chains_side1 TEXT,
	chains_side2 TEXT,
	side TEXT,
	dSASA REAL,
	dSASA_sc REAL,
	dhSASA REAL,
	dhSASA_sc REAL,
	dhSASA_rel_by_charge REAL,
	SASA_int REAL,
	SASA_sep REAL,
	relative_dSASA_fraction REAL,
	dG REAL,
	energy_int REAL,
	energy_sep REAL,
	FOREIGN KEY (struct_id, resNum) REFERENCES residues(struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (struct_id, interface, resNum))
```



##PoseConformationFeatures

**Descripción general**

El reporter PoseConformationFeatures mide la información a nivel de conformación de un Pose. Junto con ProteinResidueConformationFeatures, se pueden reconstruir las coordenadas atómicas. Para facilitar la creación de Poses a partir de los datos de estructura de conformación almacenados en la base de datos de features, PoseConformationFeatures tiene un método *load\_into\_pose*.

-   **pose\_conformations** : esta tabla almacena información sobre la secuencia de residuos de la conformación.
	-   *annotated\_sequence* : la cadena de [secuencia anotada](Glossary#annotatedsequence) de los tipos de residuo que componen la conformación
    -   *total\_residue* : el número de residuos de la conformación
    -   *fullatom* : el ResidueTypeSet es *FA\_STANDARD* si es verdadero y *CENTROID* si es falso.

**Tablas**

<!-- -->

        CREATE TABLE IF NOT EXISTS pose_conformations (
            struct_id INTEGER AUTOINCREMENT PRIMARY KEY,
            annotated_sequence TEXT,
            total_residue INTEGER,
            fullatom BOOLEAN,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED);

-   **fold\_trees** : el fold tree especifica un grafo de cómo están unidos los residuos entre sí. Si se piensa en los residuos como vértices, cada fila de la tabla *fold\_trees* especifica una arista dirigida.
    -   *(start\_res, start\_atom)* : el residuo inicial y el átomo de unión dentro del residuo
    -   *(end\_res, end\_atom)* : el residuo terminal y el átomo de unión dentro del residuo
    -   *label* : -2 si es una arista *CHEMICAL*, -1 si es una arista *PEPTIDE*, y 1, 2, ... si es una unión *JUMP*. La geometría de las uniones *JUMP* se almacena en la tabla *jumps*.
    -   *keep\_stub\_in\_residue* : por completitud, se almacena la opción de conservar el stub en el residuo.

<!-- -->

        CREATE TABLE IF NOT EXISTS fold_trees (
            struct_id INTEGER AUTOINCREMENT,
            start_res INTEGER,
            start_atom TEXT,
            stop_res INTEGER,
            stop_atom TEXT,
            label INTEGER,
            keep_stub_in_residue BOOLEAN,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED);

-   **jumps** : cada arista *JUMP* del fold tree se especifica mediante una transformación de coordenadas, que se codifica en la tabla *jumps*.
    -   *jump\_id* : el orden canónico de los jumps en una conformación.
    -   {x,y,z}{x,y,z}: coordenadas de la matriz de rotación
    -   {x,y,z}: coordenadas del vector de traslación

<!-- -->

        CREATE TABLE IF NOT EXISTS jumps (
            struct_id INTEGER AUTOINCREMENT,
            jump_id INTEGER,
            xx REAL,
            xy REAL,
            xz REAL,
            yx REAL,
            yy REAL,
            yz REAL,
            zx REAL,
            zy REAL,
            zz REAL,
            x REAL,
            y REAL,
            z REAL,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED);

-   **chain\_endings** : la conformación se divide en cadenas unidas químicamente, que se identifican por los extremos de cadena. Nota: si hay *n* cadenas, hay *n-1* chain\_endings.
    -   *end\_pos* : la última posición de secuencia de una cadena en la conformación.

<!-- -->

        CREATE TABLE IF NOT EXISTS chain_endings (
            struct_id INTEGER AUTOINCREMENT,
            end_pos INTEGER,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED);


##RadiusOfGyrationFeatures

**Descripción general**

Mide el radio de giro de cada estructura. El radio de giro mide cuán compacta es una estructura en O(n). Es el desplazamiento esperado de la masa respecto al centro de masa. La página de Wikipedia tiene algo de [información](http://en.wikipedia.org/wiki/Radius_of_gyration) . Véase también Lobanov MY, Bogatyreva NS, Galzitskaya OV. [Radius of gyration as an indicator of protein structure compactness](https://doi.org/10.1134/S0026893308040195) . Molecular Biology. 2008;42(4):623-628.

-   **radius\_of\_gyration** :
    -   *radius\_of\_gyration* : sea *C* el centro de masa y *ri* la posición del residuo *i*-ésimo de *n* residuos; entonces el radio de giro se define como *Rg = SQRT{SUM\_{ri}(ri-C)\^2/(n-1)}* . Nota: el factor de normalización es *n-1* para ser coherente con r++. Se ignoran los átomos con tipo de variante "REPLONLY".

**Tablas**

<!-- -->

        CREATE TABLE IF NOT EXISTS radius_of_gyration (
            struct_id INTEGER AUTOINCREMENT,
            radius_of_gyration REAL,
            FOREIGN KEY(struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id));


##SecondaryStructureSegmentFeatures

**Descripción general**
Informa de segmentos continuos de estructura secundaria. Se usa DSSP para definir la estructura secundaria, pero simplificado a solo H, E y L (todos los códigos DSSP distintos de H y E). Debido a esta simplificación de los códigos DSSP, la columna dssp NO es una clave externa de la tabla dssp\_codes.

**Tablas**

        CREATE TABLE IF NOT EXISTS secondary_structure_segments (
            struct_id INTEGER AUTOINCREMENT NOT NULL,
            segement_id INTEGER NOT NULL,
            residue_begin INTEGER,
            residue_end INTEGER,
            dssp TEXT NOT NULL,
        FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, residue_begin) REFERENCES residues(struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, residue_end) REFERENCES residues(struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
        PRIMARY KEY (struct_id, segment_id))

##SmotifFeatures

**Descripción general**

Registra un conjunto de parámetros geométricos definidos por dos fragmentos de estructura secundaria adyacentes. Puedes encontrar más información aquí: <https://doi.org/10.1371/journal.pcbi.1000750>


**Tablas**

    CREATE TABLE smotifs(
        struct_id INTEGER AUTOINCREMENT NOT NULL,
        smotif_id INTEGER NOT NULL,
        secondary_struct_segment_id_1 INTEGER NOT NULL,
        secondary_struct_segment_id_2 INTEGER NOT NULL,
        loop_segment_id INTEGER NOT NULL,
        distance REAL NOT NULL,
        hoist REAL NOT NULL,
        packing REAL NOT NULL,
        meridian REAL NOT NULL,
        FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, secondary_struct_segment_id_1) REFERENCES secondary_structure_segments(struct_id, segment_id) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, secondary_struct_segment_id_2) REFERENCES secondary_structure_segments(struct_id, segment_id) DEFERRABLE INITIALLY DEFERRED,
        FOREIGN KEY (struct_id, loop_segment_id) REFERENCES secondary_structure_segments(struct_id, segment_id) DEFERRABLE INITIALLY DEFERRED,
        PRIMARY KEY (struct_id, smotif_id))


##StructureFeatures

**Descripción general**

Una estructura es un grupo de residuos organizados espacialmente. La definición corresponde a un Pose en Rosetta. Lamentablemente, en Rosetta no hay una forma bien definida de identificar un Pose. A efectos de la base de datos de features, a cada estructura se le asigna un struct\_id único. Para facilitar la conexión entre las estructuras de la base de datos y las estructuras de Rosetta, el campo tag es único.

-   **structures** : identifica las estructuras de la base de datos de features
    -   *tag* : la etiqueta identifica la estructura en Rosetta. Se buscan en orden las siguientes ubicaciones.
        1.  *pose.pdb\_info()-\>name()*
        2.  *pose.data().get(JOBDIST\_OUTPUT\_TAG)*
        3.  *JobDistributor::get\_instance()-\>current\_job()-\>input\_tag()*

**Tablas**

<!-- -->

        CREATE TABLE IF NOT EXISTS structures (
            struct_id INTEGER PRIMARY KEY AUTOINCREMENT,
            protocol_id INTEGER,
            tag TEXT,
            UNIQUE (protocol_id, tag),
            FOREIGN KEY (protocol_id) REFERENCES protocols (protocol_id) DEFERRABLE INITIALLY DEFERRED);
