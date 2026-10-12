<!-- --- title: Featuresdatabaseschema -->Esquema de la base de datos de Features
========================

Cada base de datos de features contiene información sobre las features extraídas de las estructuras de entrada.

See the FeaturesReporters [[organization|FeatureReporters]]

Puedes ver un esquema gráfico basado en lo siguiente [[aquí|Features-schema]] .

AtomTypesFeatures
-----------------

        <AtomTypesFeatures/>

La información química a nivel atómico almacenada en el AtomTypeSet de Rosetta. Incluye los parámetros base del término de Van der Waals de Lennard Jones y del modelo de solvatación de Lazaridis Karplus.

-   **atom\_types** : el tipo de átomo del conjunto de tipos de átomo, junto con los parámetros de Lennard Jones y de Lazaridis Karplus
    -   *atom\_type\_set\_name* : el nombre del conjunto de tipos de átomo. Para los tipos de átomo almacenados en la base de datos, los parámetros están en el siguiente directorio */path/to/rosetta/main/database/chemical/atom\_type\_sets/\<atom\_type\_set\_name\>*
    -   *name* : el nombre del tipo de átomo
    -   *lennard\_jones\_{radius/well\_depth}* : los parámetros base del término de Van der Waals de Lennard Jones.
    -   *lazaridis\_karplus\_{lambda, degrees\_of\_freedom, volume}* : los parámetros base del modelo de solvatación de Lazaridis Karplus

<!-- -->

        CREATE TABLE IF NOT EXISTS atom_types (
            atom_type_set_name TEXT,
            name TEXT,
            element TEXT,
            lennard_jones_radius REAL,
            lennard_jones_well_depth REAL,
            lazaridis_karplus_lambda REAL,
            lazaridis_karplus_degrees_of_freedom REAL,
            lazaridis_karplus_volume REAL,
            PRIMARY KEY(atom_type_set_name, name));

-   **atom\_type\_property\_values** : una enumeración de las propiedades válidas que puede tener un átomo. Cada propiedad es verdadera o falsa, excepto las propiedades de hibridación, que son UNKNOWN (representado como no presente) o, como máximo, uno de los tipos de hibridación.
    -   *property* : propiedades válidas para usar en la tabla *atom\_type\_properties* (véase más abajo).

<!-- -->

        CREATE TABLE IF NOT EXISTS atom_type_property_values (
            property TEXT,
            PRIMARY KEY(property));

        INSERT INTO atom_type_property_values VALUES ( 'ACCEPTOR' );
        INSERT INTO atom_type_property_values VALUES ( 'DONOR' );
        INSERT INTO atom_type_property_values VALUES ( 'POLAR_HYDROGEN' );
        INSERT INTO atom_type_property_values VALUES ( 'AROMATIC' );
        INSERT INTO atom_type_property_values VALUES ( 'H2O' );
        INSERT INTO atom_type_property_values VALUES ( 'ORBITALS' );
        INSERT INTO atom_type_property_values VALUES ( 'VIRTUAL' );
        INSERT INTO atom_type_property_values VALUES ( 'SP2_HYBRID' );
        INSERT INTO atom_type_property_values VALUES ( 'SP3_HYBRID' );
        INSERT INTO atom_type_property_values VALUES ( 'RING_HYBRID' );

-   **atom\_type\_properties** : las propiedades de un átomo.
    -   *atom\_type\_set\_name* , *atom\_type* : cómo se identifica el tipo de átomo
    -   *property* : una clave externa hacia la tabla *atom\_type\_property\_values* (véase más arriba).

<!-- -->

        CREATE TABLE IF NOT EXISTS atom_type_properties (
            atom_type_set_name TEXT,
            name TEXT,
            property TEXT,
            FOREIGN KEY(atom_type_set_name, name) REFERENCES atom_types (atom_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(property) REFERENCES atom_type_property_values (property) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(atom_type_set_name, name));

-   **atom\_type\_extra\_parameters** : parámetros numéricos adicionales que se pueden asociar a un tipo de átomo.
    -   *atom\_type\_set\_name* , *atom\_type* : cómo se identifica el tipo de átomo
    -   *parameter* : el nombre del parámetro asociado al tipo de átomo.
    -   *value* : el valor del parámetro asociado al tipo de átomo.

<!-- -->

        CREATE TABLE IF NOT EXISTS atom_type_extra_parameters (
            atom_type_set_name TEXT,
            name TEXT,
            parameter TEXT,
            value REAL,
            FOREIGN KEY(atom_type_set_name, name) REFERENCES atom_types (atom_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(atom_type_set_name, name));

AtomAtomPairFeatures
--------------------

        <AtomAtomPairFeatures min_dist="(&real 0)" max_dist="(&real 10)" nbins="(&integer 15)"/>

Las distancias entre pares de átomos son un indicador del empaquetado de una estructura. Como hay un gran número de pares de átomos, aquí la información se resume mediante distribuciones de pares de átomos para cada par de tipos de átomo (AtomType de Rosetta -\> tipo de elemento). Consulta AtomInResidueAtomInResiduePairFeatures para ver una agrupación alternativa de las interacciones átomo-átomo.

-   **atom\_pairs** : distribución agrupada en intervalos de pares de tipos de átomo
    -   *atom\_type* : el AtomType del átomo central. Es un subconjunto de los AtomTypes definidos en el AtomTypeSet de todos los átomos (rosetta/main/database/chemical/atom_type_sets/fa_standard/atom_properties.txt) : *CAbb* , *CObb* , *OCbb* , *CNH2* , *COO* , *CH1* , *CH2* , *CH3* , *aroC* , *Nbb* , *Ntrp* , *Nhis* , *NH2O* , *Nlys* , *Narg* , *Npro* , *OH* , *ONH2* , *OOC* , *Oaro* , *Hpol* , *Hapo* , *Haro* , *HNbb* , *HOH* y *S* .
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

        CREATE TABLE IF NOT EXISTS atom_pairs (
            struct_id INTEGER,
            residue_type1 TEXT,
            atom_type1 TEXT,
            residue_type2 TEXT,
            atom_type2 TEXT,
            distance_bin TEXT,
            count INTEGER,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED,
            CONSTRAINT dist_is_nonnegative CHECK (count >= 0),
            PRIMARY KEY (struct_id, residue_type1, atom_type1, residue_type2, atom_type2, distance_bin));

BetaTurnDetectionFeatures
-------------------------

        <BetaTurnDetectionFeatures/>

Este reporter examina todas las ventanas disponibles de cuatro residuos, determina si hay un giro β, determina el tipo de giro β y luego escribe en una base de datos el número del residuo inicial y el tipo de giro.

        CREATE TABLE IF NOT EXISTS beta_turns (
            struct_id INTEGER,
            residue_begin INTEGER,
            turn_type TEXT,
            FOREIGN KEY (struct_id, residue_begin) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, residue_begin));

GeometricSolvationFeatures
--------------------------

-   **geometric\_solvation** : la puntuación exacta de solvatación geométrica, que se calcula integrando la energía de enlace de hidrógeno no ocupada por otros átomos.
    -   *hbond\_site\_id* : un donante o aceptor de enlace de hidrógeno
    -   *geometric\_solvation\_exact* : la versión no descomponible por pares de la puntuación de solvatación geométrica.

<!-- -->

        CREATE TABLE IF NOT EXISTS geometric_solvation (
            struct_id INTEGER,
            hbond_site_id TEXT,
            geometric_solvation_exact REAL,
            FOREIGN KEY (struct_id, hbond_site_id) REFERENCES hbond_sites(struct_id, site_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, hbond_site_id));

HBondFeatures
-------------

HBondFeatures (rosetta/main/source/src/protocols/features/HBondFeatures.hh) mide la geometría de los enlaces de hidrógeno. La referencia más actual es [Tanja Kortemme, Alexandre V. Morozov, David Baker, An Orientation-dependent Hydrogen Bonding Potential Improves Prediction of Specificity and Structure for Proteins and Protein-Protein Complexes, (JMB 2003)](https://doi.org/10.1016/s0022-2836(03)00021-4) .

Las features asociadas a los enlaces de hidrógeno incluyen

-   **hbond\_sites** : conceptualmente, son grupos funcionales con carga positiva y negativa que pueden formar enlaces de hidrógeno.
    -   *atmNum* : en los grupos funcionales donantes, atmNum es el número de átomo del hidrógeno polar. En los grupos funcionales aceptores, atmNum es el número de átomo de un átomo aceptor.
    -   *HBChemType* : la cadena HBChemType correspondiente a un HBAccChemType o a un HBDonChemType (véase rosetta/main/source/src/core/scoring/hbonds/types.hh), según si el sitio es donante o aceptor.

<!-- -->

        CREATE TABLE hbond_sites (
            struct_id INTEGER,
            site_id INTEGER,
            resNum INTEGER,
            atmNum INTEGER,
            is_donor BOOLEAN,
            chain INTEGER,
            resType TEXT,
            atmType TEXT,
            HBChemType TEXT,
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
            -   Nota: el átomo padre se define en la columna 6 de ICOOR\_SECTION en cada archivo de parámetros de tipo de residuo (véase rosetta/main/database/chemical/residue_type_sets/fa_standard/residue_types) .

        -   El vector unitario de la base al aceptor se define por el [tipo de hibridación (véase rosetta/main/database/chemical/atom_type_sets/fa_standard/atom_properties.txt) del átomo aceptor y los átomos anteriores.

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
    -   *HBEvalType* : el tipo de evaluación de hbond (rosetta/main/source/src/core/scoring/hbonds/hbonds_geom.cc) codifica el contexto químico del enlace de hidrógeno.
    -   *energy* : la energía hbond se calcula evaluando los parámetros geométricos del enlace de hidrógeno.
    -   *envWeight* : si se especifica en HBondOptions (rosetta/main/source/src/core/scoring/hbonds/HBondOptions.hh), la energía de un enlace de hidrógeno puede depender del entorno de solvente, calculado a partir del número de vecinos en el grafo de vecinos de 10A.
    -   *score\_weight* : el peso de este enlace de hidrógeno en la función de puntuación proporcionada. Cada HBEvalType se asocia a un HBondWeighType (rosetta/main/source/src/core/scoring/hbonds/types.hh) como una columna del archivo HBEval.csv (rosetta/main/database/scoring/score_functions/hbonds/standard_params/HBEval.csv) de un conjunto de parámetros de hbond. Luego el HBondWeighType se asocia a un ScoreType mediante hb\_eval\_type\_weight (rosetta/main/source/src/core/scoring/hbonds/hbonds.cc). Para obtener la energía total, multiplica *energy* \* *envWeight* \* *score\_weight* .
    -   *donRank* : 0 si es el único hbond en el sitio donante. En caso contrario, *i* , donde este hbond es el *i*-ésimo hbond más fuerte en el donante.
    -   *accRank* : 0 si es el único hbond en el sitio aceptor. En caso contrario, *i* , donde este hbond es el *i*-ésimo hbond más fuerte en el aceptor.

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
    -   *cosAHD* : el coseno del ángulo definido por los átomos *aceptor* , *hidrógeno* y *donante*.
    -   *chi* : el ángulo torsional definido por los átomos *abase2* , *base* , *aceptor* e *hidrógeno*.

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

HBondParameterFeatures
----------------------

Los parámetros del potencial de enlace de hidrógeno se especifican en la base de datos de Rosetta como conjuntos de parámetros (rosetta/main/database/scoring/score_functions/hbonds). Cada conjunto de parámetros especifica polinomios, funciones de atenuación y cuáles se aplican a qué tipos químicos de enlace de hidrógeno. Para indicar el conjunto de parámetros, usa *-hbond\_params \<database\_tag\>* en la línea de comandos o establece *score\_function.energy\_method\_options().hbond\_options()-\>params\_database\_tag(\<database\_tag\>)* . Consulta la clase HBondDatabase (rosetta/main/source/src/core/scoring/hbonds/HBondDatabase.hh) para más información.

-   **hbond\_fade\_interval** : la interacción limitada entre dimensiones geométricas se controla mediante funciones de atenuación sencillas de la forma \_\_/----\\\_\_. Consulta la clase FadeInterval (rosetta/main/source/src/core/scoring/hbonds/FadeInterval.hh) para más información.
    -   *database\_tag* : el conjunto de parámetros de enlace de hidrógeno
    -   *name* : el nombre del intervalo de atenuación al que hace referencia la tabla *hbond\_evaluation\_types*
    -   *junction\_type* : el tipo de unión indica cómo se debe interpolar la función entre los nodos. Actualmente las opciones son *piecewise\_linear* y *smooth*, que usa una spline cúbica con derivada cero en los nodos.
    -   *min0* , *fmin* , *fmax* , *max0* : las coordenadas x de los nodos

<!-- -->

        CREATE TABLE IF NOT EXISTS hbond_fade_interval(
            database_tag TEXT,
            name TEXT,
            junction_type TEXT,
            min0 REAL,
            fmin REAL,
            fmax REAL,
            max0 REAL,
            PRIMARY KEY(database_tag, name));

-   **hbond\_polynomial\_1d** : polinomios unidimensionales para cada dimensión geométrica usada para calcular la energía del enlace de hidrógeno. Consulta la clase Polynomial\_1d (rosetta/main/source/src/core/scoring/hbonds/polynomials.hh) para más información.
    -   *database\_tag* : el conjunto de parámetros de enlace de hidrógeno
    -   *name* : el nombre del polinomio al que hace referencia la tabla *hbond\_evaluation\_types*.
    -   *dimension* : la dimensión geométrica con la que se debe usar el polinomio.
    -   *xmin* , *xmax* : el polinomio se trunca más allá de los valores *xmin* y *xmax*.
    -   *root1* , *root2* : los valores donde el polinomio es igual a 0.
    -   *degree* : el número de coeficientes del polinomio. Por ejemplo, 10x\^2 - 3x + 1 tendría grado 3.
    -   *a\_\** : los coeficientes del polinomio, ordenados de la potencia más alta a la más baja.

<!-- -->

        CREATE TABLE IF NOT EXISTS hbond_polynomial_1d (
            database_tag TEXT,
            name TEXT,
            dimension TEXT,
            xmin REAL,
            xmax REAL,
            root1 REAL,
            root2 REAL,
            degree INTEGER,
            c_a REAL,
            c_b REAL,
            c_c REAL,
            c_d REAL,
            c_e REAL,
            c_f REAL,
            c_g REAL,
            c_h REAL,
            c_i REAL,
            c_j REAL,
            c_k REAL,
            PRIMARY KEY(database_tag, name));

-   **hbond\_evaluation\_types** : asocia a los tipos de enlace de hidrógeno (tipo químico del donante, tipo químico del aceptor, separación en la secuencia) los intervalos de atenuación, polinomios y tipos de peso que se usarán para evaluar y asignar la energía del enlace de hidrógeno.
    -   *database\_tag* : el conjunto de parámetros de enlace de hidrógeno
    -   *don\_chem\_type* : el componente de tipo químico del donante del tipo de enlace de hidrógeno. Es el valor usado en la columna hbond\_site.HBChemType cuando el sitio es un donante de enlace de hidrógeno.
    -   *acc\_chem\_type* : el componente de tipo químico del aceptor del tipo de enlace de hidrógeno. Es el valor usado en la columna hbond\_site.HBChemType cuando el sitio es un aceptor de enlace de hidrógeno.
    -   *separation* : el componente de tipo de separación en la secuencia del tipo de enlace de hidrógeno. Se usa como indicador de la participación en motivos locales de secuencia, como los enlaces de hidrógeno dentro de una hélice. NOTA: la separación se define como *acc\_resNum* - *don\_resNum* cuando ambos residuos son polímeros y están en la misma cadena, y como infinito en caso contrario.
    -   *AHdist\_{short/long}\_fade* : las funciones de atenuación que se aplican a las evaluaciones del polinomio AHdist. La distinción corto/largo permite una dependencia angular distinta para los enlaces de hidrógeno con diferentes longitudes de enlace. La distinción sigue en espíritu el comportamiento descrito originalmente en Kortemme 2003.
    -   *{cosBAH/cosAHD}\_fade* : las funciones de atenuación que se aplican a las evaluaciones de los polinomios cosBAH/cosAHD.
    -   *AHdist* : polinomio que se usa para evaluar el grado de libertad geométrico de la distancia aceptor -- hidrógeno.
    -   *cosBAH\_{short/long}* : polinomios que se usan para evaluar el coseno del grado de libertad geométrico base del aceptor -- aceptor -- hidrógeno.
    -   *cosAHD\_{short/long}* : polinomios que se usan para evaluar el coseno del grado de libertad geométrico aceptor -- hidrógeno -- donante.
    -   *weight\_type* : en qué posición del vector de puntuación se debe acumular la energía del enlace de hidrógeno. Consulta WeightType para ver los tipos permitidos.

<!-- -->

       CREATE TABLE IF NOT EXISTS hbond_evaluation_types (
            database_tag TEXT,
            don_chem_type TEXT,
            acc_chem_type TEXT,
            separation TEXT,
            AHdist_short_fade TEXT,
            AHdist_long_fade TEXT,
            cosBAH_fade TEXT,
            cosAHD_fade TEXT,
            AHdist TEXT,
            cosBAH_short TEXT,
            cosBAH_long TEXT,
            cosAHD_short TEXT,
            cosAHD_long TEXT,
            weight_type TEXT,
            FOREIGN KEY(database_tag, AHdist_short_fade) REFERENCES hbond_fade_interval(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, AHdist_long_fade)  REFERENCES hbond_fade_interval(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosBAH_fade)       REFERENCES hbond_fade_interval(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosAHD_fade)       REFERENCES hbond_fade_interval(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, AHdist)            REFERENCES hbond_polynomial_1d(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosBAH_short)      REFERENCES hbond_polynomial_1d(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosBAH_long)       REFERENCES hbond_polynomial_1d(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosAHD_short)      REFERENCES hbond_polynomial_1d(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosAHD_long)       REFERENCES hbond_polynomial_1d(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (database_tag, don_chem_type, acc_chem_type, separation));

JobDataFeatures
---------------

Almacena datos de tipo *string*, *string* - *string* y *string* - *real* asociados a un trabajo. Por ejemplo, el código de docking de ligandos lo hace así cuando usa el DatabaseJobOutputter.

-   **job\_string\_data**
    -   *data\_key* : asocia claves etiquetadas con una estructura

<!-- -->

        CREATE TABLE IF NOT EXISTS string_data (
             struct_id INTEGER,
             data_key TEXT,
             FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
             PRIMARY KEY (struct_id, data_key));

-   **job\_string\_string\_data** :
    -   *data\_key* , *data\_value* : asocia cadenas de texto etiquetadas con una estructura

<!-- -->

        CREATE TABLE IF NOT EXISTS string_string_data (
             struct_id INTEGER,
             data_key TEXT,
             data_value TEXT,
             FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
             PRIMARY KEY (struct_id, data_key));

-   **job\_string\_real\_data** :
    -   *data\_key* , *data\_value* : asocia números reales etiquetados con una estructura

<!-- -->

        CREATE TABLE IF NOT EXISTS string_real_data (
             struct_id INTEGER,
             data_key TEXT,
             data_value REAL,
             FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
             PRIMARY KEY (struct_id, data_key));

LoopAnchorFeatures
------------------

        <LoopAnchorFeatures min_loop_length=5 max_loop_length=7/>

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

OrbitalFeatures
---------------

OrbitalFeatures almacena información sobre las interacciones químicas en las que intervienen orbitales. Los orbitales son electrones localizados atómicamente que pueden formar interacciones débiles y dependientes de la orientación con grupos funcionales polares y aromáticos y con otros orbitales. La geometría de los orbitales se define en los conjuntos de tipos de residuo de la base de datos. Siguiendo el término de energía de orbitales, los orbitales se definen entre residuos cuyos centros de acción están como máximo a 11A.

-   **orbital\_polar\_hydrogen\_interactions** : interacciones entre orbitales e hidrógenos polares. Se excluyen las interacciones intrarresiduo.
    -   *polar hydrogens* : los hidrógenos polares se identifican mediante *res2.Hpos\_polar\_sc()*
    -   *orbName1* : es algo como *LP10* y es la segunda columna de la etiqueta ORBITALS en los archivos de parámetros de residuos.
    -   *dist* : es la distancia entre el orbital y el hidrógeno polar
    -   *angle* : es el coseno del ángulo definido por el átomo al que está unido el orbital, el orbital y el hidrógeno polar.

<!-- -->

        CREATE TABLE IF NOT EXISTS orbital_polar_hydrogen_interactions (
            struct_id TEXT,
            resNum1 INTEGER,
            orbNum1 INTEGER,
            orbName1 TEXT,
            resNum2 INTEGER,
            hpolNum2 INTEGER,
            dist REAL,
            angle REAL,
            FOREIGN KEY (struct_id, resNum1) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, resNum2) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, resNum1, orbNum1, resNum2, hpolNum2));

-   **orbital\_aromatic\_hydrogen\_interactions** : interacciones entre orbitales e hidrógenos aromáticos. Se excluyen las interacciones intrarresiduo.
    -   *aromatic hydrogens* : los hidrógenos aromáticos se identifican mediante *res2.Haro\_index()*
    -   *orbName1* : es algo como *LP10* y es la segunda columna de la etiqueta ORBITALS en los archivos de parámetros de residuos.
    -   *dist* : es la distancia entre el orbital y el hidrógeno aromático
    -   *angle* : es el coseno del ángulo definido por el átomo al que está unido el orbital, el orbital y el hidrógeno aromático.

<!-- -->

        CREATE TABLE IF NOT EXISTS orbital_aromatic_hydrogen_interactions (
            struct_id TEXT,
            resNum1 INTEGER,
            orbNum1 INTEGER,
            orbName1 TEXT,
            resNum2 INTEGER,
            haroNum2 INTEGER,
            dist REAL,
            angle REAL,
            FOREIGN KEY (struct_id, resNum1) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, resNum2) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, resNum1, orbNum1, resNum2, haroNum2));

-   **orbital\_polar\_hydrogen\_interactions** : interacciones entre orbitales e hidrógenos polares. Se excluyen las interacciones intrarresiduo. Para evitar contar dos veces, *resNum1 \< resNum2* .
    -   *polar hydrogens* : los hidrógenos polares se indexan desde *1' hasta* res2.n\_orbitals()
    -   *orbName1* : es algo como *LP10* y es la segunda columna de la etiqueta ORBITALS en los archivos de parámetros de residuos.
    -   *dist* : es la distancia entre el orbital y el segundo orbital
    -   *angle* : es el coseno del ángulo definido por el átomo al que está unido el orbital, el orbital y el segundo orbital.

<!-- -->

        CREATE TABLE IF NOT EXISTS orbital_orbital_interactions (
            struct_id TEXT,
            resNum1 INTEGER,
            orbNum1 INTEGER,
            orbName1 TEXT,
            resNum2 INTEGER,
            orbNum2 INTEGER,
            dist REAL,
            angle REAL,
            FOREIGN KEY (struct_id, resNum1) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, resNum2) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, resNum1, orbNum1, resNum2, orbNum2));

PairFeatures
------------

PairFeatures mide las distancias entre residuos.

-   **residue\_pairs** : la información almacenada aquí sigue el EnergyMethod 'pair'. La forma funcional del EnergyMethod pair se describe en [Simons, K.T., et al, Improved Recognition of Native-Like Protein Structures Using a Combination of Sequence-Dependent and Sequence-Independent Features of Proteins, (Proteins 1999).](http://www.ncbi.nlm.nih.gov/pubmed/10336385,)
    -   *resNum{1/2}* : los índices de residuo de Rosetta de los residuos implicados. Nota: cada par se registra una sola vez y resNum1 \< resNum2.
    -   *res{1/2}\_10A\_neighbors* : número de vecinos de cada residuo, usado como indicador del enterramiento. (Estas columnas se trasladarán pronto a la tabla **residue\_burial**.)
	-   Un *centro de residuo* se representa mediante actcoord, que se define como el centro geométrico promedio de los ACT\_COORD\_ATOMS especificados en el archivo de parámetros del [[tipo de residuo|Glossary#residuetype]] para cada tipo de residuo.
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
            CONSTRAINT res1_10A_neighbors_is_positive CHECK (res1_10A_neighbors >= 1),
            CONSTRAINT res2_10A_neighbors_is_positive CHECK (res2_10A_neighbors >= 1),
            CONSTRAINT actcoord_dist_is_nonnegative CHECK (actcoord_dist >= 0));

PdbDataFeatures
---------------

PdbDataFeatures registra la información almacenada en el formato de estructura del Protein Data Bank.

        <PdbDataFeatures/>

-   **residue\_pdb\_identification** : identifica los residuos usando la nomenclatura del PDB. Ten en cuenta que esta numeración tiene relevancia biológica y, por tanto, puede ser negativa, saltarse números, etc. Al usar *DatabaseInputer* o *DatabaseOutputter* con el distribuidor de trabajos de Rosetta, esta tabla se asigna al objeto PDBInfo.
    -   *struct\_id* , *residue\_number* : hace referencia a la clave primaria de la tabla residues
    -   *chain\_id* : columna 21 del registro ATOM
    -   *insertion\_code* : columna 26 del registro ATOM
    -   *pdb\_residue\_number* : PDB identification 22-25

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_pdb_identification (
            struct_id INTEGER,
            residue_number INTEGER,
            chain_id TEXT,
            insertion_code TEXT,
            pdb_residue_number INTEGER,
            FOREIGN KEY (struct_id, residue_number)
                REFERENCES residues (struct_id, resNum)
                DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, residue_number));

-   **residue\_pdb\_confidence** : resume las medidas de confianza a nivel atómico (factores B y ocupación) al nivel del residuo, con la intención de usarlas para filtrar residuos.
    -   *max\_\*\_temperature* : la temperatura máxima (columnas 60-65 del registro ATOM) sobre distintos subconjuntos de átomos: todos, cadena principal, cadena lateral.
    -   *min\_\*\_occupancy* : la ocupación mínima (columnas 54-59 del registro ATOM) sobre distintos subconjuntos de átomos: todos, cadena principal, cadena lateral.

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_pdb_confidence (
            struct_id INTEGER,
            residue_number INTEGER,
            max_temperature REAL,
            max_bb_temperature REAL,
            max_sc_temperature REAL,
            min_occupancy REAL,
            min_bb_occupancy REAL,
            min_sc_occupancy REAL,
            FOREIGN KEY (struct_id, residue_number)
                REFERENCES residues (struct_id, resNum)
                DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, residue_number));

PoseCommentFeatures
-------------------

Se puede asociar información textual arbitraria a un Pose en forma de comentarios *(key, val)*. PoseCommentsFeatures almacena esta información como una feature.

-   **pose\_comments** : se extraen todos los comentarios del Pose usando.

<!-- -->

        CREATE TABLE IF NOT EXISTS pose_comments (
            struct_id INTEGER,
            key TEXT,
            value TEXT,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, key));

PoseConformationFeatures
------------------------

PoseConformationFeatures mide la información a nivel de conformación de un Pose. Junto con ProteinResidueConformationFeatures, se pueden reconstruir las coordenadas atómicas. Para facilitar la creación de Poses a partir de los datos de estructura de conformación almacenados en la base de datos de features, PoseConformationFeatures tiene un método *load\_into\_pose*.

-   **pose\_conformations** : esta tabla almacena información sobre la secuencia de residuos de la conformación.
	-   *annotated\_sequence* : la cadena de [[secuencia anotada|Glossary#annotated-sequence]] de los tipos de residuo que componen la conformación
    -   *total\_residue* : el número de residuos de la conformación
    -   *fullatom* : el ResidueTypeSet es *FA\_STANDARD* si es verdadero y *CENTROID* si es falso.

<!-- -->

        CREATE TABLE IF NOT EXISTS pose_conformations (
            struct_id INTEGER PRIMARY KEY,
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
            struct_id INTEGER,
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
            struct_id INTEGER,
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
            struct_id INTEGER,
            end_pos INTEGER,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED);

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

ProteinBackboneTorsionAngleFeatures
-----------------------------------

El reporter ProteinBackboneTorsionAngleFeatures almacena los grados de libertad de los ángulos de torsión de la cadena principal necesarios para representar proteínas formadas con cadenas principales canónicas.

-   **protein\_backbone\_torsion\_angles** :
    -   *phi* : el ángulo de torsión definido por los átomos *C\_(i-1)* , *N\_i* , *Ca\_i* y *C\_i* (-180, 180)
    -   *psi* : el ángulo de torsión definido por los átomos *N\_i* , *Ca\_i* , *C\_i* y *N\_(i+1)* (-180, 180)
    -   *omega* : el ángulo de torsión definido por *Ca\_i* , *C\_i* , *N\_(i+1)* y *Ca\_(i+1)* (-180, 180)

<!-- -->

        CREATE TABLE IF NOT EXISTS protein_backbone_torsion_angles (
            struct_id TEXT,
            resNum INTEGER,
            phi REAL,
            psi REAL,
            omega REAL,
            FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, resNum));

ProteinResidueConformationFeatures
----------------------------------

La conformación de los residuos de proteína se describe mediante las coordenadas de cada átomo. Una representación reducida consiste en especificar los valores de cada grado de libertad de ángulo torsional, que incluyen los ángulos torsionales de la cadena principal y de la cadena lateral. Como las proteínas solo tienen aminoácidos canónicos, hay como máximo 4 ángulos torsionales en las cadenas laterales.

-   **protein\_residue\_conformation** : los grados de libertad de la conformación de cada residuo.
    -   *secstruct* : la estructura secundaria del residuo. NOTA: no se calcula con DSSP, sino que se toma de los fragmentos.
    -   *phi* , *psi* , *omega* : ángulos torsionales de la cadena principal
    -   *chi\** : ángulos torsionales de la cadena lateral

<!-- -->

        CREATE TABLE IF NOT EXISTS protein_residue_conformation (
            struct_id INTEGER,
            seqpos INTEGER,
            secstruct STRING,
            phi REAL,
            psi REAL,
            omega REAL,
            chi1 REAL,
            chi2 REAL,
            chi3 REAL,
            chi4 REAL,
            FOREIGN KEY (struct_id, seqpos) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED);"

-   **residue\_atom\_coords** : las coordenadas atómicas de cada residuo. Nota: si todos los residuos son ideales, esta tabla no se rellena.
    -   *x* , *y* , *z* : coordenadas atómicas en el sistema de coordenadas del laboratorio.

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_atom_coords (
            struct_id INTEGER,
            seqpos INTEGER,
            atomno INTEGER,
            x REAL,
            y REAL,
            z REAL,
            FOREIGN KEY (struct_id, seqpos) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED);

ProteinRMSDFeatures
-------------------

Calcula la desviación cuadrática media (RMSD) átomo a átomo entre la conformación sobre la que se informa y una conformación guardada previamente. El uso de este mover es más complejo que el de otros feature movers:

        <ROSETTASCRIPTS>
            <MOVERS>
                <SavePoseMover name=spm_init_struct reference_name=init_struct/>
                <ReportToDB name=features_reporter db="features_SAMPLE_SOURCE_ID.db3" sample_source="SAMPLE_SOURCE_DESCRIPTION">
                    <ProteinRMSDFeatures reference_name=init_struct/>
                </ReportToDB>
            </MOVERS>
            <PROTOCOLS>
                <Add mover_name=spm_init_struct/>
                <Add mover_name=features_reporter/>
            </PROTOCOLS>
        </ROSETTASCRIPTS>

-   **protein\_rmsd** :
    -   *reference\_tag* : la etiqueta de la estructura con la que se compara esta estructura
    -   *protein\_CA* : se consideran los átomos C-alfa de los residuos de proteína
    -   *protein\_CA\_or\_CB* : se consideran los átomos C-alfa y C-beta de los residuos de proteína
    -   *protein\_backbone* : se consideran los átomos de la cadena principal (N, C-alfa, C) de los residuos de proteína
    -   *protein\_backbone\_including\_O* : se consideran los átomos de la cadena principal y los átomos de oxígeno del carbonilo de los residuos de proteína
    -   *protein\_backbone\_sidechain\_heavy\_atom* : se consideran los átomos que no son hidrógeno de los residuos de proteína
    -   *heavyatom* : se consideran todos los átomos que no son hidrógeno
    -   *nbr\_atom* : se consideran los átomos vecinos (el átomo C-beta en las proteínas canónicas); véase la etiqueta NBR\_ATOM en los archivos de topología de residuos
    -   *all\_atom* : se consideran todos los átomos

<!-- -->

        CREATE TABLE IF NOT EXISTS protein_rmsd (
            struct_id INTEGER,
            reference_tag TEXT,
            protein_CA REAL,
            protein_CA_or_CB REAL,
            protein_backbone REAL,
            protein_backbone_including_O REAL,
            protein_backbone_sidechain_heavyatom REAL,
            heavyatom REAL,
            nbr_atom REAL,
            all_atom REAL,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, reference_tag));

ProtocolFeatures
----------------

Un protocolo se representa como toda la información necesaria para reproducir los resultados de la ejecución de la aplicación de Rosetta. Las features asociadas a cada ejecución de la aplicación se vinculan, en última instancia, con una sola fila de la tabla protocols. Ten en cuenta que, como *struct\_id* es una clave primaria autoincremental de la tabla structures, a menudo los resultados de distintas ejecuciones de la aplicación se adjuntan, pero no se fusionan.

-   **protocols** :
    -   *command\_line* : la línea de comandos completa usada para ejecutar Rosetta
    -   *specified\_options* : las opciones no predeterminadas especificadas en el sistema de opciones.
    -   *svn\_url* : la URL del repositorio SVN usado para el código fuente de Rosetta.
    -   *svn\_version* : el número de revisión SVN del repositorio svn.
    -   *script* : el contenido del script XML de rosetta\_scripts, si se ejecutó mediante el sistema rosetta\_scripts.

<!-- -->

        CREATE TABLE IF NOT EXISTS protocols (
            protocol_id INTEGER PRIMARY KEY AUTOINCREMENT,
            command_line TEXT,
            specified_options TEXT,
            svn_url TEXT,
            svn_version TEXT,
            script TEXT);

RadiusOfGyrationFeatures
------------------------

Mide el radio de giro de cada estructura. El radio de giro mide cuán compacta es una estructura en O(n). Es el desplazamiento esperado de la masa respecto al centro de masa. La página de Wikipedia tiene algo de [información](http://en.wikipedia.org/wiki/Radius_of_gyration) . Véase también Lobanov MY, Bogatyreva NS, Galzitskaya OV. [Radius of gyration as an indicator of protein structure compactness](https://doi.org/10.1134/S0026893308040195) . Molecular Biology. 2008;42(4):623-628.

-   **radius\_of\_gyration** :
    -   *radius\_of\_gyration* : sea *C* el centro de masa y *ri* la posición del residuo *i*-ésimo de *n* residuos; entonces el radio de giro se define como *Rg = SQRT{SUM\_{ri}(ri-C)\^2/(n-1)}* . Nota: el factor de normalización es *n-1* para ser coherente con r++. Se ignoran los átomos con tipo de variante "REPLONLY".

<!-- -->

        CREATE TABLE IF NOT EXISTS radius_of_gyration (
            struct_id INTEGER,
            radius_of_gyration REAL,
            FOREIGN KEY(struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id));

ResidueBurialFeatures
---------------------

Las medidas de enterramiento son importantes para determinar los efectos de solvatación y desolvatación.

-   **residue\_burial** :
    -   *ten\_a\_neighbors* : el número de residuos a menos de 10 Å (sin contar el propio residuo). La distancia se mide desde el NBR\_ATOM del archivo de parámetros del tipo de residuo, que suele ser el átomo C-beta.
    -   *twelve\_a\_neighbors* : el número de residuos a menos de 12 Å.
    -   *neigh\_vect\_raw* : la longitud del desplazamiento medio de los residuos vecinos. La región de inclusión se establece con las opciones *score:NV\_lbound* y *score:NV\_ubound* , cuyos valores predeterminados son 3.3 y 11.1 Å. Sigue el trabajo de [Durham E, et al. Solvent Accessible Surface Area Approximations for Protein Structure Prediction](http://www.ncbi.nlm.nih.gov/pubmed/19234730) .
    -   *sasa\_r100* , *sasa\_r140* , *sasa\_200* : el área de superficie accesible al solvente con distintos tamaños de sonda (1.0A, 1.4A, 2.0A).

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_burial (
            struct_id TEXT,
            resNum INTEGER,
            ten_a_neighbors INTEGER,
            twelve_a_neighbors INTEGER,
            neigh_vect_raw REAL,
            sasa_r100 REAL,
            sasa_r140 REAL,
            sasa_r200 REAL,
            FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, resNum));

ResidueConformationFeatures
---------------------------

Almacena la geometría de residuos que tienen cadenas principales canónicas pero posiblemente cadenas laterales no canónicas. La geometría se divide en grados de libertad torsionales de la cadena principal, *nonprotein\_residue\_conformation* , grados de libertad de la cadena lateral, *nonprotein\_residue\_angles* , y coordenadas atómicas, *residue\_atom\_coords* .

Se diferencia de ProteinResidueConformationFeatures en que los ángulos del residuo se almacenan como una consulta *chinum* -\> *chiangle* y como coordenadas atómicas xzy, en lugar de una tabla con espacio para 4 valores chi. Si sabes que solo vas a trabajar con residuos de proteína, puedes ahorrar espacio usando ProteinResidueConformationFeatures.

-   **nonprotein\_residue\_conformation** :
    -   *phi* , *psi* , *omega* : ángulos de los grados de libertad torsionales de la cadena principal

<!-- -->

        CREATE TABLE IF NOT EXISTS nonprotein_residue_conformation (
            struct_id INTEGER,
            seqpos INTEGER,
            phi REAL,
            psi REAL,
            omega REAL,
            FOREIGN KEY (struct_id, seqpos) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, seqpos));

-   **nonprotein\_residue\_angles** :
    -   *chinum* : el índice del grado de libertad torsional chi en la cadena lateral del residuo
    -   *chiangle* : el ángulo del grado de libertad torsional chi en la cadena lateral del residuo

<!-- -->

        CREATE TABLE IF NOT EXISTS nonprotein_residue_angles (
        struct_id INTEGER,
        seqpos INTEGER,
        chinum INTEGER,
        chiangle REAL,
        FOREIGN KEY (struct_id, seqpos) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, seqpos));

-   **residue\_atom\_coords** :
    -   *x* , *y* , *z* : coordenadas espaciales del átomo *atomno* en el residuo *seqpos* en el sistema de coordenadas del laboratorio.

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_atom_coords (
        struct_id INTEGER,
        seqpos INTEGER,
        atomno INTEGER,
        x REAL,
        y REAL,
        z REAL,
        FOREIGN KEY (struct_id, seqpos) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, seqpos, atomno));

ResidueFeatures
---------------

ResidueFeatures almacena información sobre cada residuo de una conformación.

-   **residues** : conecta la posición en la secuencia con el nombre del residuo y con su ResidueType.
    -   *name3* : el código de aminoácido de tres letras. Si no es un aminoácido canónico, es *UNK* .
    -   *res\_type* : el identificador único del ResidueType del residuo.

<!-- -->

        CREATE TABLE IF NOT EXISTS residues (
            struct_id INTEGER,
            resNum INTEGER,
            name3 TEXT,
            res_type TEXT,
            FOREIGN KEY (struct_id)
            REFERENCES structures (struct_id)
            DEFERRABLE INITIALLY DEFERRED,
            CONSTRAINT resNum_is_positive CHECK (resNum >= 1),
            PRIMARY KEY(struct_id, resNum));

ResidueScoresFeatures
---------------------

        <ResidueScoresFeatures scorefxn="(&scorefxn)"/>

ResidueScoresFeatures almacena la puntuación de una estructura a nivel de residuo. Los términos que evalúan un solo residuo se almacenan en *residue\_scores\_1b* . Los términos que evalúan pares de residuos se almacenan en *residue\_scores\_2b* . Los términos que dependen de toda la estructura se almacenan mediante StructureScoresFeatures.

-   **residue\_scores\_1b** : las puntuaciones de un cuerpo de cada residuo de la estructura.
    -   *score\_type* : el tipo de puntuación como cadena
    -   *score\_value* : el valor de la puntuación
    -   *context\_dependent* : 0 si el tipo de puntuación es independiente del contexto y 1 si depende del contexto

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_scores_1b (                                                                                                                      
            struct_id INTEGER,                                                                                                                                              
            resNum INTEGER,                                                                                                                                                 
            score_type TEXT,                                                                                                                                                
            score_value REAL,                                                                                                                                               
            context_dependent INTEGER,                                                                                                                                     
            FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,                                                          
            PRIMARY KEY(struct_id, resNum, score_type)); 

-   **residue\_scores\_2b** : las puntuaciones de dos cuerpos de cada par de residuos de la estructura. Nota: los términos de dos cuerpos intrarresiduo se almacenan en esta tabla con resNum1 == resNum2.
    -   *resNum1* , *resNum2* : la numeración de residuos de Rosetta de los residuos participantes. Nota: *resNum1* \<= *resNum2*
    -   *score\_type* : el tipo de puntuación como cadena
    -   *score\_value* : el valor de la puntuación
    -   *context\_dependent* : 0 si el tipo de puntuación es independiente del contexto y 1 si depende del contexto

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_scores_2b (
            struct_id INTEGER,
            resNum1 INTEGER,
            resNum2 INTEGER,
            score_type TEXT,
            score_value REAL,
            context_dependent  INTEGER,
            FOREIGN KEY (struct_id, resNum1) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, resNum2) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, resNum1, resNum2, score_type));

ResidueSecondaryStructureFeatures
---------------------------------

La estructura secundaria es un esquema de clasificación de los residuos que participan en interacciones regulares entre varios residuos.

-   **residue\_secondary\_structure** :
    -   *dssp* : el esquema de clasificación del Dictionary of Secondary Structure según [Kabsch and Sander, Dictionary of protein secondary structure: pattern recognition of hydrogen-bonded and geometrical features](http://onlinelibrary.wiley.com/doi/10.1002/bip.360221211/abstract) . La [codificación](http://swift.cmbi.ru.nl/gv/dssp/) se describe en su sitio web.

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_secondary_structure(
            struct_id INTEGER,
            resNum INTEGER,
            dssp TEXT,
            FOREIGN KEY(struct_id, resNum) REFERENCES residues(struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, resNum));

ResidueTypesFeatures
--------------------

Los ResidueTypes almacenan información sobre la naturaleza química del residuo. La información se lee de */path/to/rosetta/main/database/chemical/residue\_type\_sets/\<residue\_type\_set\_name\>/residue\_types/* .

-   **residue\_type** :
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *FA\_STANDARD* o *CENTROID* .
    -   *name* : la cadena única que identifica un tipo de residuo en el ResidueTypeSet.
    -   *name3* : abreviatura de tres letras del tipo de residuo
    -   *name1* : abreviatura de una letra del tipo de residuo
    -   *aa* : abreviatura de tres letras del tipo de residuo, donde los residuos no canónicos son *UNK* .
    -   *lower\_connect* , *upper\_connect* : los átomos que se usan para conectar el residuo con el resto de los residuos.
    -   *nbr\_atom* : el átomo usado para los cálculos de vecinos
    -   *nbr\_radius* : una medida del tamaño de un residuo para los cálculos de vecinos (?).

<!-- -->

       CREATE TABLE IF NOT EXISTS residue_type (
            residue_type_set_name TEXT,
            version TEXT,
            name TEXT,
            name3 TEXT,
            name1 TEXT,
            aa TEXT,
            lower_connect INTEGER,
            upper_connect INTEGER,
            nbr_atom INTEGER,
            nbr_radius REAL,
            PRIMARY KEY(residue_type_set_name, name));

-   **residue\_type\_atom** : se identifica cada átomo del tipo de residuo.
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *FA\_STANDARD* o *CENTROID* .
    -   *atom\_index* : el índice del átomo en el residuo.
    -   *atom\_name* : el nombre del átomo en el residuo según la convención de nomenclatura del PDB. P. ej., en los aminoácidos canónicos, el átomo C-beta es *CB1* .
    -   *atom\_type\_name* : el nombre del tipo de átomo del átomo. P. ej., en los aminoácidos canónicos, el átomo C-beta es ' *CB* '. Nota: todos los nombres de átomo tienen exactamente 4 caracteres.
    -   *mm\_atom\_type\_name* : el nombre de mecánica molecular del átomo en el esquema de nomenclatura de CHARMM. P. ej., en los aminoácidos canónicos, el átomo C-beta es *CT2* .
    -   *charge* : la cantidad de carga asociada al átomo.
    -   *is\_backbone* : ¿el átomo forma parte de la cadena principal?

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_atom (
            residue_type_set_name TEXT,
            residue_type_name TEXT,
            atom_index INTEGER,
            atom_name TEXT,
            atom_type_name TEXT,
            mm_atom_type_name TEXT,
            charge REAL,
            is_backbone INTEGER,
            FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(residue_type_set_name, residue_type_name, atom_index));

-   **residue\_type\_bond** : los enlaces covalentes del tipo de residuo
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *FA\_STANDARD* o *CENTROID* .
    -   *atom1* , *atom2* : los átomos que participan en el enlace, donde el índice de átomo de *atom1* es menor que el índice de átomo de *atom2* .
	-   *bond\_type* : el tipo de enlace químico.

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_bond (
            residue_type_set_name TEXT,
            residue_type_name TEXT,
            atom1 INTEGER,
            atom2 INTEGER,
            bond_type INTEGER,
            FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(residue_type_set_name, residue_type_name, atom1, atom2));

-   **residue\_type\_cut\_bond** : enlaces covalentes que forman topologías que no son de árbol, p. ej. (CD-N) en la prolina y (CE1-CZ) en la tirosina.
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *FA\_STANDARD* o *CENTROID* .
    -   *atom1* , *atom2* : los átomos que participan en el enlace de corte, donde el índice de átomo de *atom1* es menor que el índice de átomo de *atom2* .

<!-- -->

       CREATE TABLE IF NOT EXISTS residue_type_cut_bond (
           residue_type_set_name TEXT,
           residue_type_name TEXT,
           atom1 INTEGER,
           atom2 INTEGER,
           FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
           PRIMARY KEY(residue_type_set_name, residue_type_name, atom1, atom2));

-   **residue\_type\_chi** : los grados de libertad torsionales chi del ResidueType
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *FA\_STANDARD* o *CENTROID* .
    -   *chino* : el índice del grado de libertad chi
    -   *atom1* , *atom2* , *atom3* , *atom3* , *atom4* : los átomos que definen el grado de libertad torsional

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_chi (
            residue_type_set_name TEXT,
            residue_type_name TEXT,
            chino INTEGER,
            atom1 TEXT,
            atom2 TEXT,
            atom3 TEXT,
            atom4 TEXT,
            FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(residue_type_set_name, residue_type_name, atom1, atom2));

-   **residue\_type\_chi\_rotamer** : los grados de libertad torsionales chi se agrupan en conformaciones discretas de rotámeros. Cada fila es un intervalo para un grado de libertad torsional chi.
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *FA\_STANDARD* o *CENTROID* .
    -   *chino* : el índice del grado de libertad torsional chi
    -   *mean* : el centro del intervalo de ángulo
    -   *sdev* : la desviación estándar del intervalo respecto a *mean*

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_chi_rotamer (
            residue_type_set_name TEXT,
            residue_type_name TEXT,
            chino INTEGER,
            mean REAL,
            sdev REAL,
            FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(residue_type_set_name, residue_type_name, chino, mean, sdev));

-   **residue\_type\_proton\_chi** : grados de libertad torsionales chi que controlan las coordenadas de los átomos de hidrógeno.
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *FA\_STANDARD* o *CENTROID* .
    -   *chino* : el índice del grado de libertad torsional chi
    -   *sample* : el ángulo de muestra más o menos cada ángulo de muestra adicional. P. ej., el hidrógeno del hidroxilo de la tirosina está controlado por el tercer grado de libertad torsional chi con dos intervalos torsionales, trans a 180 grados y cis a 0 grados, ambos en el plano del anillo aromático. Para aumentar el muestreo conformacional se añaden 8 intervalos de rotámero adicionales de +/- 1 grado y +/- 20 grados para cada intervalo de muestra.
    -   *extra* : ¿este intervalo de muestra es un intervalo de rotámero adicional?

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_proton_chi (
            residue_type_set_name TEXT,
            residue_type_name TEXT,
            chino INTEGER,
            sample REAL,
            is_extra BOOL,
            FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(residue_type_set_name, residue_type_name, chino, sample));

-   **residue\_type\_property** :
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *FA\_STANDARD* o *CENTROID* .
    -   *property* : propiedades asociadas al ResidueType, p. ej. PROTEIN, POLAR o SC\_ORBITALS

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_property (
            residue_type_set_name TEXT,
            residue_type_name TEXT,
            property TEXT,
            FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(residue_type_set_name, residue_type_name, property));

-   **residue\_type\_variant\_type** :
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *FA\_STANDARD* o *CENTROID* .
    -   *variant\_type* : tipos de variante asociados al ResidueType, p. ej. DEPROTONATED, DISULFIDE o MODRES

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_variant_type (
           residue_type_set_name TEXT,
           residue_type_name TEXT,
           variant_type TEXT,
           FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name)DEFERRABLE INITIALLY DEFERRED,
           PRIMARY KEY(residue_type_set_name, residue_type_name, variant_type));

RotamerBoltzmannWeightFeatures
------------------------------

Mide cuán restringido está cada residuo, siguiendo a [Fleishman, Khare, Koga, & Baker, Restricted sidechain plasticity in the structures of native proteins and complexes](http://onlinelibrary.wiley.com/doi/10.1002/pro.604/full) .

-   **rotamer\_boltzmann\_weight** :
    -   *boltzmann\_weight* : se calcula la energía *e\_i* de cada rotámero minimizado en un entorno fijo. Si *E* es la energía de toda la estructura y *temperature=.8* , entonces *boltzmann\_weight* = 1 / (sum\_{i} exp((E-e\_i)/temperature))

<!-- -->

        CREATE TABLE IF NOT EXISTS rotamer_boltzmann_weight (
            struct_id INTEGER,
            resNum INTEGER,
            boltzmann_weight REAL,
            FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, resNum));

RotamerRecoveryFeatures
-----------------------

RotamerRecoverFeatures es un envoltorio del benchmark científico [[rotamer_recovery|RotamerRecoveryScientificBenchmark]] para poder incluirlo como una feature.

        <RotamerRecovery scfxn="(&string)" protocol="(&string)" comparer="(&string)" mover="(&strong)"/>

Consulta el enlace anterior para ver las explicaciones de los parámetros.

-   **rotamer\_recovery** : la recuperación de rotámeros (rotamer\_recovery) de una feature indica cuán similar es la conformación óptima de Rosetta a la conformación de entrada cuando la conformación óptima de Rosetta está sesgada hacia la conformación de entrada.

<!-- -->

          CREATE TABLE IF NOT EXISTS rotamer_recovery (
              struct_id INTEGER,
              resNum INTEGER,
              divergence REAL,
              PRIMARY KEY(struct_id, resNum));

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

StructureFeatures
-----------------

Una estructura es un grupo de residuos organizados espacialmente. La definición corresponde a un Pose en Rosetta. Lamentablemente, en Rosetta no hay una forma bien definida de identificar un Pose. A efectos de la base de datos de features, a cada estructura se le asigna un struct\_id único. Para facilitar la conexión entre las estructuras de la base de datos y las estructuras de Rosetta, el campo tag es único.

-   **structures** : identifica las estructuras de la base de datos de features
    -   *tag* : la etiqueta identifica la estructura en Rosetta. Se buscan en orden las siguientes ubicaciones.
        1.  *pose.pdb\_info()-\>name()*
        2.  *pose.data().get(JOBDIST\_OUTPUT\_TAG)*
        3.  *JobDistributor::get\_instance()-\>current\_job()-\>input\_tag()*

<!-- -->

        CREATE TABLE IF NOT EXISTS structures (
            struct_id INTEGER PRIMARY KEY AUTOINCREMENT,
            protocol_id INTEGER,
            tag TEXT,
            UNIQUE (protocol_id, tag),
            FOREIGN KEY (protocol_id) REFERENCES protocols (protocol_id) DEFERRABLE INITIALLY DEFERRED);

StructureScoresFeatures
-----------------------

StructureScoresFeatures almacena la información de puntuación global de todos los EnergyMethods habilitados.

-   **structure\_scores** :
    -   *score\_value* : el valor de puntuación para el tipo dado.

<!-- -->

        CREATE TABLE IF NOT EXISTS structure_scores (
            struct_id INTEGER,
            score_type_id INTEGER,
            score_value INTEGER,
            FOREIGN KEY (struct_id)
            REFERENCES structures (struct_id)
            DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (score_type_id)
            REFERENCES score_types (score_type_id)
            DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, score_type_id));

ScoreTypeFeatures
-----------------

ScoreTypeFeatures almacena los tipos de puntuación de todos los EnergyMethods.

        <ScoreTypeFeatures scorefxn="(default_scorefxn &string)"/>

-   **score\_types** : almacena información sobre el EnergyMethod asociado a cada tipo de puntuación.
    -   *score\_type\_id* : los valores del enum *core::scoring::ScoreType*.
    -   *score\_type\_name* : la versión en cadena de los valores del enum *core::scoring::ScoreType*.

<!-- -->

        CREATE TABLE IF NOT EXISTS score_types (
            protocol_id INTEGER,
            score_type_id INTEGER PRIMARY KEY,
            score_type_name TEXT,
            FOREIGN KEY (protocol_id)
            REFERENCES protocols (protocol_id)
            DEFERRABLE INITIALLY DEFERRED);
