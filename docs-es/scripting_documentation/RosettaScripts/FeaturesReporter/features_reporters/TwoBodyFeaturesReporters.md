#FeaturesReporters de dos cuerpos

PairFeatures
------------

El reporter PairFeatures mide las distancias entre residuos.

-   **residue\_pairs** : la información almacenada aquí sigue el EnergyMethod 'pair'. La forma funcional del EnergyMethod pair se describe en [Simons, K.T., et al, Improved Recognition of Native-Like Protein Structures Using a Combination of Sequence-Dependent and Sequence-Independent Features of Proteins, (Proteins 1999).](http://www.ncbi.nlm.nih.gov/pubmed/10336385,)
    -   *resNum{1/2}* : los índices de residuo de Rosetta de los residuos implicados. Nota: cada par se registra una sola vez y resNum1 \< resNum2.
    -   *res{1/2}\_10A\_neighbors* : número de vecinos de cada residuo, usado como indicador del enterramiento. (Estas columnas se trasladarán pronto a la tabla **residue\_burial**.)
    -   Un *centro de residuo* se representa mediante actcoord, que se define como el centro geométrico promedio de los ACT\_COORD\_ATOMS especificados en el archivo de parámetros del tipo de residuo para cada tipo de residuo.
    -   *actcoord\_dist* : la distancia cartesiana entre centros de residuo.
    -   *polymeric\_sequence\_dist* : la distancia en la secuencia entre los residuos. Si alguno de los residuos no es un residuo de *polímero* o si están en cadenas distintas, vale -1.

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_pairs (
            struct_id INTEGER,
            resNum1 INTEGER,
            resNum2 INTEGER,
            res1_10A_neighbors INTEGER,
            res2_10A_neighbors INTEGER,
            actcoord_dist REAL,
            polymeric_sequence_dist INTEGER,
            FOREIGN KEY (struct_id, resNum1) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, resNum2) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            CONSTRAINT res1_10A_neighbors_greater_than CHECK (res1_10A_neighbors >= 1),
            CONSTRAINT res2_10A_neighbors_greater_than CHECK (res2_10A_neighbors >= 1));

AtomAtomPairFeatures
--------------------

        <AtomAtomPairFeatures min_dist="(&real 0)" max_dist="(&real 10)" nbins="(&integer 15)"/>

Las distancias entre pares de átomos son un indicador del empaquetado de una estructura. Como hay un gran número de pares de átomos, aquí la información se resume mediante distribuciones de pares de átomos para cada par de tipos de átomo (AtomType de Rosetta -\> tipo de elemento). Consulta AtomInResidueAtomInResiduePairFeatures para ver una agrupación alternativa de las interacciones átomo-átomo.

-   **atom\_pairs** : distribución agrupada en intervalos de pares de tipos de átomo
    -   *atom\_type* : el AtomType del átomo central. Es un subconjunto de los AtomTypes definidos en el AtomTypeSet de todos los átomos atom\_properties.txt: *CAbb* , *CObb* , *OCbb* , *CNH2* , *COO* , *CH1* , *CH2* , *CH3* , *aroC* , *Nbb* , *Ntrp* , *Nhis* , *NH2O* , *Nlys* , *Narg* , *Npro* , *OH* , *ONH2* , *OOC* , *Oaro* , *Hpol* , *Hapo* , *Haro* , *HNbb* , *HOH* y *S* .
    -   *element* : el tipo de elemento del segundo átomo: *C* , *N* , *O* y *H*
    -   *{lower/upper}\_break* : los límites del intervalo de distancia
    -   *count* : el número de instancias átomo-átomo del tipo correcto que ocurren en el rango de distancia específico en la estructura.

<!-- -->

        CREATE TABLE IF NOT EXISTS atom_pairs (
            struct_id INTEGER,
            atom_type TEXT,
            element TEXT,
            lower_break REAL,
            upper_break REAL,
            count INTEGER,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, atom_type, element, lower_break));

AtomInResidueAtomInResiduePairFeatures
--------------------------------------

Las distancias entre pares de átomos son un indicador del empaquetado de una estructura. Como hay un gran número de pares de átomos, aquí la información se resume mediante distribuciones de pares de átomos para cada par de tipos de átomo (tipo de residuo + número de átomo). Es muy parecido en espíritu a [Lu H, Skolnick J. A distance-dependent atomic knowledge-based potential for improved protein structure selection. Proteins. 2001;44(3):223-32](http://www.ncbi.nlm.nih.gov/pubmed/11455595) , aunque ellos usan intervalos de distancia distintos. Aquí se usan (0,1], ..., (9,10] porque son sencillos. Tendría sentido buscar una agrupación mejor tras un análisis más detallado. La fracción molar de los tipos de átomo puede calcularse uniendo con la tabla Residues, ya que los tipos son únicos dentro de cada tipo de residuo. Si esto resulta demasiado engorroso, puede que haya que precalcularlo. **ADVERTENCIA** : ¡¡¡Actualmente esto genera una cantidad desmesurada de datos!!! \~250M por estructura. **ADVERTENCIA**

-   **atom\_in\_residue\_pairs** : distribución agrupada en intervalos de pares de tipos de átomo
    -   *residue\_type1* , *atom\_type1* : el ResidueType y el número de átomo del primer tipo de átomo
    -   *residue\_type2* , *atom\_type2* : el ResidueType y el número de átomo del segundo tipo de átomo
    -   *distance\_bin* : agrupa todos los pares de átomos en el rango (distance\_bin-1, distance\_bin]
    -   *count* : número de pares de átomos en el intervalo de distancia

<!-- -->

        CREATE TABLE IF NOT EXISTS atom_in_residue_pairs (
            struct_id INTEGER,
            residue_type1 TEXT,
            atom_type1 TEXT,
            residue_type2 TEXT,
            atom_type2 TEXT,
            distance_bin TEXT,
            count INTEGER,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, residue_type1, atom_type1, residue_type2, atom_type2, distance_bin),
            CONSTRAINT count_greater_than CHECK (count >= 0));

ProteinBackboneAtomAtomPairFeatures
-----------------------------------

El reporter ProteinBackboneAtomAtomPairFeatures mide todas las distancias entre pares de átomos de la cadena principal en pares de residuos cuya coordenada de acción está a menos de 10A. Sigue el análisis realizado en *Song Y, Tyka M, Leaver-Fay A, Thompson J, Baker D. Structure guided forcefield optimization. Proteins: Structure, Function, and Bioinformatics. 2011* . Allí examinaron estas distancias en pares de residuos que forman estructura secundaria.

-   **protein\_backbone\_atom\_atom\_pairs** :
    -   *resNum{1,2}* : los índices de los residuos de proteína. Nota: resNum1 \< resNum2.
    -   *{N,Ca,C,O,Ha}\_{N,Ca,C,O,Ha}\_dist* : la distancia entre el átomo *N* , *Ca* , *C* , *O* o *Ha* del primer residuo y el átomo *N* , *Ca* , *C* , *O* o *Ha* del segundo residuo.

<!-- -->

        CREATE TABLE IF NOT EXISTS protein_backbone_atom_atom_pairs (
            struct_id TEXT,
            resNum1 INTEGER,
            resNum2 INTEGER,
             N_N_dist REAL,  N_Ca_dist REAL,  N_C_dist REAL,  N_O_dist REAL,  N_Ha_dist REAL,
            Ca_N_dist REAL, Ca_Ca_dist REAL, Ca_C_dist REAL, Ca_O_dist REAL, Ca_Ha_dist REAL,
             C_N_dist REAL,  C_Ca_dist REAL,  C_C_dist REAL,  C_O_dist REAL,  C_Ha_dist REAL,
             O_N_dist REAL,  O_Ca_dist REAL,  O_C_dist REAL,  O_O_dist REAL,  O_Ha_dist REAL,
            Ha_N_dist REAL, Ha_Ca_dist REAL, Ha_C_dist REAL, Ha_O_dist REAL, Ha_Ha_dist REAL,
            FOREIGN KEY (struct_id, resNum1) REFERENCES residues (struct_id, resNum1) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, resNum2) REFERENCES residues (struct_id, resNum2) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, resNum1, resNum2));

HBondFeatures
-------------

El reporter HBondFeatures mide la geometría de los enlaces de hidrógeno. La referencia más actual es [Tanja Kortemme, Alexandre V. Morozov, David Baker, An Orientation-dependent Hydrogen Bonding Potential Improves Prediction of Specificity and Structure for Proteins and Protein-Protein Complexes, (JMB 2003)](https://doi.org/10.1016/s0022-2836(03)00021-4) .

El feature reporter HBondFeatures acepta las siguientes opciones:

        <HBondFeatures scorefxn="(&scorefxn)" definition_type="(['energy', 'AHdist'])" definition_threshold="(&real)"/>

-   *scorefxn* : usa los parámetros de una función de puntuación definida para evaluar los enlaces de hidrógeno
-   *definition\_type* , *definition\_threshold* : ¿cómo debe definirse un enlace de hidrógeno? Por defecto, un enlace de hidrógeno es una interacción en la que la energía hbond es \< 0, es decir, `    energy   ` con `    definition_threshold=0   `

Las features asociadas a los enlaces de hidrógeno incluyen

-   **hbond\_sites** : conceptualmente, son grupos funcionales con carga positiva y negativa que pueden formar enlaces de hidrógeno.
    -   *atmNum* : en los grupos funcionales donantes, atmNum es el número de átomo del hidrógeno polar. En los grupos funcionales aceptores, atmNum es el número de átomo de un átomo aceptor.
    -   *HBChemType* : la cadena HBChemType correspondiente a un HBAccChemType o a un HBDonChemType, según si el sitio es donante o aceptor.

<!-- -->

        CREATE TABLE hbond_sites (
            struct_id INTEGER,
            site_id INTEGER,
            resNum INTEGER,
            HBChemType TEXT,
            atmNum INTEGER,
            is_donor INTEGER,
            chain INTEGER,
            resType TEXT,
            atmType TEXT,
            FOREIGN KEY(struct_id, resNum) REFERENCES residues(struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, site_id));

-   **hbond\_site\_atoms** : cada sitio de enlace de hidrógeno define una parte de un marco de referencia mediante átomos enlazados.
    -   Átomos donantes:
        -   *atm* : el átomo de *hidrógeno* polar
        -   *base* : el átomo padre del átomo de hidrógeno. Es el *donante* .

    -   Átomos aceptores:
        -   *atm* : el átomo *aceptor*
        -   *base* : el padre del átomo aceptor. Es la *base* .
        -   *bbase* : el padre del átomo base.
        -   *base2* : el segundo átomo base alternativo del aceptor.
            -   Nota: el átomo padre se define en la columna 6 de ICOOR\_SECTION en cada archivo de parámetros de tipo de residuo.

        -   El vector unitario de la base al aceptor se define por el tipo de hibridación del átomo aceptor y los átomos anteriores.

<!-- -->

        CREATE TABLE IF NOT EXISTS hbond_site_atoms (
            struct_id INTEGER,
            site_id INTEGER,
            atm_x REAL,
            atm_y REAL,
            atm_z REAL,
            base_x REAL,
            base_y REAL,
            base_z REAL,
            bbase_x REAL,
            bbase_y REAL,
            bbase_z REAL,
            base2_x REAL,
            base2_y REAL,
            base2_z REAL,
            FOREIGN KEY(site_id, struct_id) REFERENCES hbond_sites(site_id, struct_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, site_id));

-   **hbond\_site\_environment** : la energía y la geometría de los enlaces de hidrógeno dependen de su contexto estructural. La tabla hbond\_site\_environment reúne medidas de enterramiento, estructura secundaria y enlaces de hidrógeno totales.
    -   *sasa\_r100* , *sasa\_r140* , *sasa\_r200* : el área de superficie accesible al solvente del átomo pesado del sitio polar con sondas de agua de 1.0A, 1.4A y 2.0A.
    -   *hbond\_energy* : la mitad de la energía total de todos los enlaces de hidrógeno en el sitio polar.
    -   *num\_hbonds* : el número de enlaces de hidrógeno en el sitio polar.

<!-- -->

        CREATE TABLE IF NOT EXISTS hbond_site_environment (
            struct_id INTEGER,
            site_id INTEGER,
            sasa_r100 REAL,
            sasa_r140 REAL,
            sasa_r200 REAL,
            hbond_energy REAL,
            num_hbonds INTEGER,
            FOREIGN KEY(struct_id, site_id) REFERENCES hbond_sites(struct_id, site_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, site_id));

-   **hbond\_sites\_pdb** : el formato de archivo PDB almacena información de identificación, geométrica y experimental sobre cada átomo. Aquí se almacena la información del átomo pesado del sitio polar.
    -   *chain* , *resNum* , *icode* : el identificador PDB del átomo pesado. NOTA: el *icode* es necesario para identificar un átomo de forma única. NOTA: la numeración de Rosetta y la numeración del PDB pueden ser distintas.
    -   *heavy\_atom\_temperature* : el factor de temperatura, que mide el desorden del átomo pesado.
    -   *heavy\_atom\_occupancy* : la ocupación del átomo pesado.

<!-- -->

       CREATE TABLE IF NOT EXISTS hbond_sites_pdb (
            struct_id INTEGER,
            site_id INTEGER,
            chain TEXT,
            resNum INTEGER,
            iCode TEXT,
            heavy_atom_temperature REAL,
            heavy_atom_occupancy REAL,
            FOREIGN KEY(struct_id, site_id) REFERENCES hbond_sites(struct_id, site_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, site_id));

-   **hbond\_chem\_types** : etiquetas de texto para las clasificaciones de tipo químico
    -   *chem\_type* : la columna *HBChemType* de la tabla *hbond\_sites* hace referencia a esto.
    -   *label* : una etiqueta del tipo químico con la forma \<a|d\>\<código-de-tipo-químico-de-tres-letras\>: \<tipos-de-aminoácido-de-una-letra-donde-se-encuentra-este-tipo\>. Por ejemplo, *hbdon\_HXL* tiene *dHXL: s,t* como etiqueta.

<!-- -->

        CREATE TABLE IF NOT EXISTS hbond_chem_types (
            chem_type TEXT,
            label TEXT,
            PRIMARY KEY(chem_type));

-   **hbonds** : un *enlace de hidrógeno* se define como un *hbond\_site* donante y un *hbond\_site* aceptor cuya energía de enlace es negativa.
    -   *HBEvalType* : el tipo de evaluación de hbond codifica el contexto químico del enlace de hidrógeno.
    -   *energy* : la energía hbond se calcula evaluando los parámetros geométricos del enlace de hidrógeno.
    -   *envWeight* : si se especifica en HBondOptions, la energía de un enlace de hidrógeno puede depender del entorno de solvente, calculado a partir del número de vecinos en el grafo de vecinos de 10A.
    -   *score\_weight* : el peso de este enlace de hidrógeno en la función de puntuación proporcionada. Cada HBEvalType se asocia a un HBondWeighType como una columna del archivo HBEval.csv de un conjunto de parámetros de hbond. Luego el HBondWeighType se asocia a un ScoreType mediante hb\_eval\_type\_weight. Para obtener la energía total, multiplica *energy* \* *envWeight* \* *score\_weight* .
    -   *donRank* : donRank es el rango del HBond en el sitio donante. Vale 0 si es el único hbond en el sitio donante. En caso contrario, donRank es *i* , donde este hbond es el *i*-ésimo hbond más fuerte en su donante, comenzando por *i* =1.
    -   *accRank* : accRank es el rango del HBond en el sitio aceptor. Vale 0 si es el único hbond en el sitio aceptor. En caso contrario, accRank es *i* , donde este hbond es el *i*-ésimo hbond más fuerte en su aceptor, comenzando por *i* =1.

<!-- -->

        CREATE TABLE IF NOT EXISTS hbonds (
            struct_id INTEGER,
            hbond_id INTEGER,
            don_id INTEGER,
            acc_id INTEGER,
            HBEvalType INTEGER,
            energy REAL,
            envWeight REAL,
            score_weight REAL,
            donRank INTEGER,
            accRank INTEGER,
            FOREIGN KEY (struct_id, don_id) REFERENCES hbond_sites (struct_id, site_id) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, acc_id) REFERENCES hbond_sites (struct_id, site_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, hbond_id));

-   **hbond\_geom\_coords** : los parámetros geométricos de un enlace de hidrógeno se usan para evaluar la energía de la interacción.
    -   *AHdist* : la distancia entre los átomos *aceptor* e *hidrógeno*.
    -   *cosBAH* : el coseno del ángulo definido por los átomos *base* , *aceptor* e *hidrógeno*.
        -   NOTA: el ángulo es el ángulo exterior: cosBAH=1 cuando es lineal y cosAHD=0 cuando es perpendicular.
        -   NOTA: si se establece la opción `        -corrections:score:hbond_measure_sp3acc_BAH_from_hvy       `, el átomo base de los aceptores Sp3 es el átomo pesado; en caso contrario, es el átomo de hidrógeno. (Aparte histórico: en Score12 se usaba el átomo de hidrógeno como base para forzar la separación entre el hidrógeno unido covalentemente y el hidrógeno que forma el enlace de hidrógeno.)

    -   *cosAHD* : el coseno del ángulo definido por los átomos *aceptor* , *hidrógeno* y *donante*.
        -   NOTA: el ángulo es el ángulo exterior: cosAHD=1 cuando es lineal y cosAHD=0 cuando es perpendicular

    -   *chi* : el ángulo torsional definido por los átomos *abase2* , *base* , *aceptor* e *hidrógeno*. NOTA: el valor está en radianes, [-pi, pi].

<!-- -->

        CREATE TABLE IF NOT EXISTS hbond_geom_coords (
            struct_id INTEGER,
            hbond_id INTEGER,
            AHdist REAL,
            cosBAH REAL,
            cosAHD REAL,
            chi REAL,
            FOREIGN KEY(struct_id, hbond_id) REFERENCES hbonds(struct_id, hbond_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, hbond_id));

-   **hbond\_lennard\_jones** : la energía de atracción de Lennard-Jones ( *atrE* ), la energía de repulsión ( *repE* ) y la energía de solvatación ( *solv* ) se calculan sobre pares de átomos. Debido al gran número de estos pares de átomos, informar de la geometría y la energía de cada instancia es demasiado costoso. Sin embargo, como los términos LJ pueden contar doblemente la energía de interacción entre átomos que forman enlaces de hidrógeno, aquí se informa explícitamente de las interacciones LJ solo entre los átomos que forman enlaces de hidrógeno.
    -   *don\_acc* : energía LJ entre los átomos *donante* y *aceptor*
    -   *don\_acc\_base* : energía LJ entre los átomos *donante* y *base del aceptor*
    -   *h\_acc* : energía LJ entre los átomos *hidrógeno* y *aceptor*
    -   *h\_acc\_base* : energía LJ entre los átomos *hidrógeno* y *base del aceptor*
        -   Nota: para comparar estas energías con las energías de los enlaces de hidrógeno, deben ponderarse con el conjunto de pesos de la ScoreFunction.

<!-- -->

        CREATE TABLE IF NOT EXISTS hbond_lennard_jones (
            struct_id INTEGER,
            hbond_id INTEGER,
            don_acc_atrE REAL,
            don_acc_repE REAL,
            don_acc_solv REAL,
            don_acc_base_atrE REAL,
            don_acc_base_repE REAL,
            don_acc_base_solv REAL,
            h_acc_atrE REAL,
            h_acc_repE REAL,
            h_acc_solv REAL,
            h_acc_base_atrE REAL,
            h_acc_base_repE REAL,
            h_acc_base_solv REAL,
            FOREIGN KEY (struct_id, hbond_id) REFERENCES hbonds (struct_id, hbond_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, hbond_id));

OrbitalFeatures
---------------

OrbitalFeatures almacena información sobre las interacciones químicas en las que intervienen orbitales. Los orbitales son electrones localizados atómicamente que pueden formar interacciones débiles y dependientes de la orientación con grupos funcionales polares y aromáticos y con otros orbitales. La geometría de los orbitales se define en los conjuntos de tipos de residuo de la base de datos. Siguiendo el término de energía de orbitales, los orbitales se definen entre residuos cuyos centros de acción están como máximo a 11A.

-   **HPOL\_orbital** : interacciones entre orbitales e hidrógenos polares. Se excluyen las interacciones intrarresiduo.
    -   *polar hydrogens* : los hidrógenos polares se identifican mediante *res2.Hpos\_polar\_sc()*
    -   *orbName1* : es algo como *LP10* y es la segunda columna de la etiqueta ORBITALS en los archivos de parámetros de residuos.
    -   *dist* : es la distancia entre el orbital y el hidrógeno polar
    -   *angle* : es el coseno del ángulo definido por el átomo al que está unido el orbital, el orbital y el hidrógeno polar.

<!-- -->

        CREATE TABLE IF NOT EXISTS HPOL_orbital (
            struct_id TEXT,
            resNum1 INTEGER,
            orbName1 TEXT,
            resNum2 INTEGER,
            hpolNum2 INTEGER,
            resNum1 INTEGER,
            resName2 TEXT,
            htype2 TEXT,
            OrbHdist REAL,
            cosAOH REAL,                                                                                                                                                   
            cosDHO REAL,                                                                                                                                                   
            chiBAOH REAL,                                                                                                                                                  
            chiBDHO REAL,                                                                                                                                                  
            AOH_angle REAL,                                                                                                                                                
            DHO_angle REAL,                                                                                                                                                
            chiBAHD REAL,                                                                                                                                                  
            cosAHD REAL,
            FOREIGN KEY (struct_id, resNum1) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, resNum2) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, resNum1, orbName1, resNum2, hpolNum2));

-   **HARO\_orbital** : interacciones entre orbitales e hidrógenos aromáticos. Se excluyen las interacciones intrarresiduo.
    -   *aromatic hydrogens* : los hidrógenos aromáticos se identifican mediante *res2.Haro\_index()*
    -   *orbName1* : es algo como *LP10* y es la segunda columna de la etiqueta ORBITALS en los archivos de parámetros de residuos.
    -   *dist* : es la distancia entre el orbital y el hidrógeno aromático
    -   *angle* : es el coseno del ángulo definido por el átomo al que está unido el orbital, el orbital y el hidrógeno aromático.

<!-- -->

        CREATE TABLE IF NOT EXISTS orbital_orbital_interactions (
            struct_id TEXT,
            resNum1 INTEGER,
            orbName1 TEXT,
            resNum2 INTEGER,
            haroNum2 INTEGER,
            resName1 TEXT,
            orbNum1 INTEGER,
            resName2 TEXT,
            htype2 TEXT,
            orbHdist REAL,
            cosAOH REAL,
            cosDHO REAL,
            chiBAOH REAL,
            chiBDHO REAL,
            AOH_angle REAL,
            DHO_angle REAL,
            chiBAHD REAL,
            cosAHD REAL,
            FOREIGN KEY (struct_id, resNum1) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, resNum2) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, resNum1, orbName1, resNum2, haroNum2));

-   **orbital\_orbital** : interacciones entre orbitales e hidrógenos polares. Se excluyen las interacciones intrarresiduo. Para evitar contar dos veces, *resNum1 \< resNum2* .
    -   *polar hydrogens* : los hidrógenos polares se indexan desde *1' hasta* res2.n\_orbitals()
    -   *orbName1* : es algo como *LP10* y es la segunda columna de la etiqueta ORBITALS en los archivos de parámetros de residuos.
    -   *dist* : es la distancia entre el orbital y el segundo orbital
    -   *angle* : es el coseno del ángulo definido por el átomo al que está unido el orbital, el orbital y el segundo orbital.

<!-- -->

        CREATE TABLE IF NOT EXISTS orbital_orbital (
            struct_id TEXT,
            resNum1 INTEGER,
            orbName1 TEXT,
            resNum2 INTEGER,
            orbNum2 INTEGER,
            resName1 TEXT,
            orbNum1 INTEGER,
            resName2 TEXT,
            orbName2 TEXT,
            orbOrbdist REAL,
            cosAOO REAL,
            cosDOO REAL,
            chiBAOO REAL,
            chiBDOO REAL,
            AOO_angle REAL,
            DOO_angle REAL,
            chiBAHD REAL,
            cosAHD REAL,
            FOREIGN KEY (struct_id, resNum1) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, resNum2) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, resNum1, orbName1, resNum2, orbNum2));

SaltBridgeFeatures
------------------

SaltBridgeFeatures representa puentes salinos e interacciones relacionadas según la definición de:

﻿Donald JE, Kulp DW, DeGrado WF. Salt bridges: Geometrically specific, designable interactions. Proteins: Structure, Function, and Bioinformatics. 2010:n/a-n/a. Available at: [http://doi.wiley.com/10.1002/prot.22927](http://doi.wiley.com/10.1002/prot.22927) [Accessed November 14, 2010].

-   **salt\_bridges** : una fila representa el centro de un oxígeno del grupo aceptor ( *ASN* , *ASN* , *GLN* , *GLU* ) que está a menos de 6A del centro del grupo donante ( *HIS* , *LYS* , *ARG* ). Nota: el centro de *HIS* es el punto medio entre los nitrógenos del anillo.
    -   *psi* : el ángulo del oxígeno alrededor del grupo donante [-180, 180)
    -   *theta* : ángulo del oxígeno fuera del plano del grupo donante
    -   *rho* : distancia entre el centro del grupo donante y el oxígeno.
    -   *orbital* : *syn* o *anti* , el orbital del oxígeno aceptor (según el ángulo torsional alrededor del enlace aceptor-base del aceptor).

<!-- -->

        CREATE TABLE IF NOT EXISTS salt_bridges (
            struct_id INTEGER,
            don_resNum INTEGER,
            acc_id INTEGER,
            psi REAL,
            theta REAL,
            rho REAL,
            orbital TEXT,
            FOREIGN KEY (struct_id, don_resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, acc_id) REFERENCES hbond_sites (struct_id, site_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, don_resNum, acc_id));

ChargeChargeFeatures
--------------------

ChargeChargeFeatures representa las interacciones entre grupos cargados en conformaciones moleculares. La interacción principal es a través del potencial de Coulomb, que es proporcional a q1\*q2/R\^2. Sin embargo, como la carga no siempre está centrada en el átomo y los grupos pueden apantallar la interacción, también es importante medir los ángulos. Para cada sitio cargado hay tres átomos definidos a partir de la tabla hbond\_site\_atoms: q1 = atm, B1 = base, C1 = bbase, y de forma similar para q2.

-   **charge\_charge\_pair** : una fila representa dos grupos polares cargados ( *ASP* , *GLU* , *LYS* , *ARG* , *HIS* ) a menos de 8A.
    -   *q{1,2}\_charge* : si es un donante, 1; si es un aceptor, -1
    -   *B1q1q2\_angle* : el ángulo de enlace en q1 formado por B1 y q2
    -   *B2q2q1\_angle* : el ángulo de enlace en q2 formado por B2 y q1
    -   *q1q2\_distance* : la distancia entre los átomos q1 y q2
    -   *B1q1\_torsion* : el ángulo de torsión definido por C1-B1-q1-q2
    -   *B2q2\_torsion* : el ángulo de torsión definido por C2-B2-q2-q1

<!-- -->

        CREATE TABLE IF NOT EXISTS charge_charge_pairs (
            struct_id INTEGER,
            q1_site_id INTEGER,
            q2_site_id INTEGER,
            B1q1q2_angle REAL,
            B2q2q1_angle REAL,
            q1q2_distance REAL,
            B1q1_torsion REAL,
            B2q2_torsion REAL,
            FOREIGN KEY (struct_id, q1_site_id) REFERENCES hbond_sites (struct_id, site_id) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, q2_site_id) REFERENCES hbond_sites (struct_id, site_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, q1_site_id, q2_site_id));

LoopAnchorFeatures
------------------

        <LoopAnchorFeatures min_loop_length="5" max_loop_length="7"/>

Este reporter examina todas las ventanas disponibles de un número especificado de residuos y calcula la traslación y la rotación para superponer de forma óptima el punto de aterrizaje sobre el de despegue del loop. Los datos de traslación y rotación pueden usarse después para comparar distintas «clases» de anclajes de loop.

-   **min\_loop\_length** : el tramo mínimo de residuos sobre el que calcular la traslación y la rotación.
-   **max\_loop\_length** : el tramo máximo de residuos sobre el que calcular la traslación y la rotación.

<!-- -->

        CREATE TABLE IF NOT EXISTS loop_anchors (
            struct_id INTEGER,
            residue_begin INTEGER,
            residue_end INTEGER,
            FOREIGN KEY (struct_id, residue_begin)
            REFERENCES residues (struct_id, resNum)
            DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, residue_end)
            REFERENCES residues (struct_id, resNum)
            DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, residue_begin, residue_end));

        CREATE TABLE IF NOT EXISTS loop_anchor_transforms (
            struct_id INTEGER,
            residue_begin INTEGER,
            residue_end INTEGER,
            x REAL,
            y REAL,
            z REAL,
            phi REAL,
            psi REAL,
            theta REAL,
            FOREIGN KEY (struct_id, residue_begin, residue_end)
            REFERENCES loop_anchors (struct_id, residue_begin, residue_end)
            DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, residue_begin, residue_end));
