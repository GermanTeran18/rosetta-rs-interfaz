#FeaturesReporters de un cuerpo

ResidueFeatures
---------------

ResidueFeatures almacena información sobre cada residuo de una conformación.

-   **residues** : conecta la posición en la secuencia con el nombre del residuo y con su ResidueType.
    -   *name3* : el código de aminoácido de tres letras. Si no es un aminoácido canónico, es *UNK* .
    -   *res\_type* : el identificador único del ResidueType del residuo.

<!-- -->

        CREATE TABLE IF NOT EXISTS residues (
            struct_id INTEGER AUTOINCREMENT,
            resNum INTEGER,
            name3 TEXT,
            res_type TEXT,
            FOREIGN KEY (struct_id)
            REFERENCES structures (struct_id)
            DEFERRABLE INITIALLY DEFERRED,
            CONSTRAINT resNum_is_positive CHECK (resNum >= 1),
            PRIMARY KEY(struct_id, resNum));

ResidueConformationFeatures
---------------------------

Almacena la geometría de residuos que tienen cadenas principales canónicas pero posiblemente cadenas laterales no canónicas. La geometría se divide en grados de libertad torsionales de la cadena principal, *nonprotein\_residue\_conformation* , grados de libertad de la cadena lateral, *nonprotein\_residue\_angles* , y coordenadas atómicas, *residue\_atom\_coords* .

Se diferencia de ProteinResidueConformationFeatures en que los ángulos del residuo se almacenan como una consulta *chinum* -\> *chiangle* y como coordenadas atómicas xzy, en lugar de una tabla con espacio para 4 valores chi. Si sabes que solo vas a trabajar con residuos de proteína, puedes ahorrar espacio usando ProteinResidueConformationFeatures.

-   **nonprotein\_residue\_conformation** :
    -   *phi* , *psi* , *omega* : ángulos de los grados de libertad torsionales de la cadena principal

<!-- -->

        CREATE TABLE IF NOT EXISTS nonprotein_residue_conformation (
            struct_id INTEGER AUTOINCREMENT,
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
        struct_id INTEGER AUTOINCREMENT,
        seqpos INTEGER,
        chinum INTEGER,
        chiangle REAL,
        FOREIGN KEY (struct_id, seqpos) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, seqpos));

-   **residue\_atom\_coords** :
    -   *x* , *y* , *z* : coordenadas espaciales del átomo *atomno* en el residuo *seqpos* en el sistema de coordenadas del laboratorio.

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_atom_coords (
        struct_id INTEGER AUTOINCREMENT,
        seqpos INTEGER,
        atomno INTEGER,
        x REAL,
        y REAL,
        z REAL,
        FOREIGN KEY (struct_id, seqpos) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, seqpos, atomno));

ProteinResidueConformationFeatures
----------------------------------

La conformación de los residuos de proteína se describe mediante las coordenadas de cada átomo. Una representación reducida consiste en especificar los valores de cada grado de libertad de ángulo torsional, que incluyen los ángulos torsionales de la cadena principal y de la cadena lateral. Como las proteínas solo tienen aminoácidos canónicos, hay como máximo 4 ángulos torsionales en las cadenas laterales.

-   **protein\_residue\_conformation** : los grados de libertad de la conformación de cada residuo.
    -   *secstruct* : la estructura secundaria del residuo. NOTA: no se calcula con DSSP, sino que se toma de los fragmentos.
	-   *phi* , *psi* , *omega* : ángulos torsionales de la cadena principal
    -   *chi\** : ángulos torsionales de la cadena lateral

<!-- -->

        CREATE TABLE IF NOT EXISTS protein_residue_conformation (
            struct_id INTEGER AUTOINCREMENT,
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
            struct_id INTEGER AUTOINCREMENT,
            seqpos INTEGER,
            atomno INTEGER,
            x REAL,
            y REAL,
            z REAL,
            FOREIGN KEY (struct_id, seqpos) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED);

ProteinBackboneTorsionAngleFeatures
-----------------------------------

El reporter ProteinBackboneTorsionAngleFeatures almacena los grados de libertad de los ángulos de torsión de la cadena principal necesarios para representar proteínas formadas con cadenas principales canónicas.

-   **protein\_backbone\_torsion\_angles** :
    -   *phi* : el ángulo de torsión definido por los átomos *C\_(i-1)* , *N\_i* , *Ca\_i* y *C\_i* (-180, 180)
    -   *psi* : el ángulo de torsión definido por los átomos *N\_i* , *Ca\_i* , *C\_i* y *N\_(i+1)* (-180, 180)
    -   *omega* : el ángulo de torsión definido por *Ca\_i* , *C\_i* , *N\_(i+1)* y *Ca\_(i+1)* (-180, 180)

<!-- -->

        CREATE TABLE IF NOT EXISTS protein_backbone_torsion_angles (
            struct_id INTEGER AUTOINCREMENT,
            resNum INTEGER,
            phi REAL,
            psi REAL,
            omega REAL,
            FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, resNum));

ProteinBondGeometryFeatures
---------------------------

El reporter ProteinBondGeometryFeatures almacena el ángulo de enlace, la longitud de enlace y la torsión de enlace de los aminoácidos canónicos de proteínas.

Sea *i* el número de un átomo de un residuo dado y sea bonded\_neighbors( *i* ) el conjunto de vecinos enlazados del átomo *i* . Entonces, si *j* , *k* están en bonded\_neighbors( *i* ) de modo que *j* \< *k* , ( *j* , *i* , *k* ) es un ángulo de enlace. En otras palabras, existe una fila en bond\_intrares\_angles tal que outAtm1Num = *j* , cenAtmNum = *i* y outAtm2Num = *k* .

-   **bond\_intrares\_angles** :
    -   *cenAtmNum* : número de átomo del átomo central que define el ángulo de enlace
    -   *outAtm{1,2}Num* : números de átomo de los átomos exteriores que definen el ángulo de enlace
    -   *cenAtmName* : el nombre del átomo central
    -   *outAtm{1,2}Name* : los nombres de los átomos exteriores
    -   *ideal* : ángulo ideal definido por *-scoring:bonded\_params* o, por defecto, en *chemical/mm\_atom\_type\_sets/fa\_standard/par\_all27\_prot\_na.prm*
    -   *observed* : ángulo real en la estructura
    -   *difference* : desviación del ángulo respecto al ángulo ideal
    -   *energy* : un potencial armónico alrededor del ángulo ideal, con la constante de resorte definida por el tipo de residuo y las identidades de los átomos. - NOTA: ESTE CÓDIGO NO ESTÁ ACTUALIZADO CON LOS CÁLCULOS DE ENERGÍA CART\_BONDED ACTUALES; LOS RESULTADOS DIFERIRÁN

<!-- -->

            CREATE TABLE IF NOT EXISTS bond_intrares_angles (  
                    struct_id INTEGER AUTOINCREMENT,  
                    resNum INTEGER,  
                    cenAtmNum INTEGER,  
                    outAtm1Num INTEGER,  
                    outAtm2Num INTEGER,  
                    cenAtmName TEXT,  
                    outAtm1Name TEXT,  
                    outAtm2Name TEXT,  
                    ideal REAL,  
                    observed REAL,  
                    difference REAL,  
                    energy REAL,  
                    FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,  
                    PRIMARY KEY (struct_id, resNum, cenAtmNum, outAtm1Num, outAtm2Num));

-   **bond\_interres\_angles** :
    -   *cenResNum* :
    -   *connResNum* :
    -   *cenAtmNum* :
    -   *outAtm{Cen,Conn}Num* :
    -   *cenAtmName* :
    -   *outAtm{Cen,Conn}Name* :
    -   *ideal* : ángulo ideal definido por *-scoring:bonded\_params* o, por defecto, en *chemical/mm\_atom\_type\_sets/fa\_standard/par\_all27\_prot\_na.prm*
    -   *observed* : ángulo real en la estructura
    -   *difference* : desviación del ángulo respecto al ángulo ideal
    -   *energy* : un potencial armónico alrededor del ángulo ideal, con la constante de resorte definida por el tipo de residuo y las identidades de los átomos. - NOTA: ESTE CÓDIGO NO ESTÁ ACTUALIZADO CON LOS CÁLCULOS DE ENERGÍA CART\_BONDED ACTUALES; LOS RESULTADOS DIFERIRÁN

<!-- -->

     
            CREATE TABLE IF NOT EXISTS bond_interres_angles (  
                    struct_id INTEGER AUTOINCREMENT,  
                    cenResNum INTEGER,  
                    connResNum INTEGER,  
                    cenAtmNum INTEGER,  
                    outAtmCenNum INTEGER,  
                    outAtmConnNum INTEGER,  
                    cenAtmName TEXT,  
                    outAtmCenName TEXT,  
                    outAtmConnName TEXT,  
                    ideal REAL,  
                    observed REAL,  
                    difference REAL,  
                    energy REAL,  
                    FOREIGN KEY (struct_id, cenResNum) REFERENCES residues (struct_id, cenResNum) DEFERRABLE INITIALLY DEFERRED,  
                    PRIMARY KEY (struct_id, cenResNum, connResNum, cenAtmNum, outAtmCenNum, outAtmConnNum));

-   **bond\_intrares\_lengths** :
    -   *atm{1,2}Num* : números de átomo de átomos vecinos, normalmente porque están unidos covalentemente
    -   *atm{1,2}Name* : los nombres de los átomos
    -   *ideal* : longitud ideal definida por *-scoring:bonded\_params* o, por defecto, en *chemical/mm\_atom\_type\_sets/fa\_standard/par\_all27\_prot\_na.prm*
    -   *observed* : longitud real en la estructura
    -   *difference* : desviación respecto a la longitud ideal
    -   *energy* : un potencial armónico alrededor de la longitud ideal, con la constante de resorte definida por el tipo de residuo y las identidades de los átomos. - NOTA: ESTE CÓDIGO NO ESTÁ ACTUALIZADO CON LOS CÁLCULOS DE ENERGÍA CART\_BONDED ACTUALES; LOS RESULTADOS DIFERIRÁN

<!-- -->

            CREATE TABLE IF NOT EXISTS bond_intrares_lengths (  
                    struct_id INTEGER AUTOINCREMENT,  
                    resNum INTEGER,  
                    atm1Num INTEGER,  
                    atm2Num INTEGER,  
                    atm1Name TEXT,  
                    atm2Name TEXT,  
                    ideal REAL,  
                    observed REAL,  
                    difference REAL,  
                    energy REAL,  
                    FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,  
                    PRIMARY KEY (struct_id, resNum, atm1Num, atm2Num));

-   **bond\_interres\_lengths** :
    -   *res{1,2}Num* : dos residuos que tienen átomos unidos entre sí
    -   *atm{1,2}Num* : números de átomo de átomos vecinos, uno de cada residuo, normalmente porque están unidos covalentemente
    -   *atm{1,2}Name* : los nombres de los átomos
    -   *ideal* : longitud ideal definida por *-scoring:bonded\_params* o, por defecto, en *chemical/mm\_atom\_type\_sets/fa\_standard/par\_all27\_prot\_na.prm*
    -   *observed* : longitud real en la estructura
    -   *difference* : desviación respecto a la longitud ideal
    -   *energy* : un potencial armónico alrededor de la longitud ideal, con la constante de resorte definida por el tipo de residuo y las identidades de los átomos. - NOTA: ESTE CÓDIGO NO ESTÁ ACTUALIZADO CON LOS CÁLCULOS DE ENERGÍA CART\_BONDED ACTUALES; LOS RESULTADOS DIFERIRÁN

<!-- -->

     
            CREATE TABLE IF NOT EXISTS bond_interres_lengths (  
                    struct_id INTEGER AUTOINCREMENT,  
                    res1Num INTEGER,  
                    res2Num INTEGER,  
                    atm1Num INTEGER,  
                    atm2Num INTEGER,  
                    atm1Name TEXT,  
                    atm2Name TEXT,  
                    ideal REAL,  
                    observed REAL,  
                    difference REAL,  
                    energy REAL,  
                    FOREIGN KEY (struct_id, res1Num) REFERENCES residues (struct_id, res1Num) DEFERRABLE INITIALLY DEFERRED,
                    PRIMARY KEY (struct_id, res1Num, atm1Num, atm2Num));

-   **bond\_intrares\_torsions** :

chemical/mm\_atom\_type\_sets/fa\_standard/mm\_torsion\_params.txt

            CREATE TABLE IF NOT EXISTS bond_intrares_torsions (
                    struct_id INTEGER AUTOINCREMENT,
                    resNum INTEGER,
                    atm1Num INTEGER,
                    atm2Num INTEGER,
                    atm3Num INTEGER,
                    atm4Num INTEGER,
                    atm1Name TEXT,
                    atm2Name TEXT,
                    atm3Name TEXT,
                    atm4Name TEXT,
                    ideal REAL,
                    observed REAL,
                    difference REAL,
                    energy REAL,
                    FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
                    PRIMARY KEY (struct_id, resNum, atm1Num, atm2Num, atm3Num, atm4Num));

RotamerFeatures
---------------

El reporter RotamerFeatures almacena la conformación de cadena lateral predicha a partir de los ángulos de torsión de la cadena principal y la desviación observada respecto a ella. Actualmente está restringido a aminoácidos canónicos y al uso con la biblioteca de Dunbrack. Las bibliotecas *dun08* y *dun10* definen conformaciones semirrotaméricas para *ASP* , *GLU* , *PHE* , *HIS* , *ASN* , *GLN* , *TRP* y *TYR* , donde el último ángulo de torsión se trata como una variable continua.

Para la biblioteca *dun02*, véase ﻿

-   Dunbrack RL, Cohen FE. Bayesian statistical analysis of protein side-chain rotamer preferences. Protein science : a publication of the Protein Society. 1997;6(8):1661-81.
-   ﻿Dunbrack RL. Rotamer libraries in the 21st century. Current opinion in structural biology. 2002;12(4):431–440.

Para la biblioteca *dun10*, véase

-   ﻿Shapovalov MV, Dunbrack RL. A smoothed backbone-dependent rotamer library for proteins derived from adaptive kernel density estimates and regressions. Structure (London, England : 1993). 2011;19(6):844-58. artid=3118414&tool=pmcentrez&rendertype=abstract [Accessed July 24, 2011].

-   **residue\_rotamers** :
    -   *rotamer\_bin* : la biblioteca de Dunbrack divide el espacio de conformaciones de la cadena lateral en conformaciones rotaméricas discretas. En las conformaciones totalmente rotaméricas se basa en todos los ángulos de torsión de la cadena lateral; en las semirrotaméricas, en todos excepto el último.
    -   *nchi* : el número de ángulos de torsión rotaméricos del residuo. Por ejemplo, *nchi* de la tirosina es 1 en la biblioteca *dun10*.
    -   *semi\_rotameric* : valor booleano, verdadero si la cadena lateral es de un aminoácido semirrotamérico.
    -   *chi{1,2,3,4}\_mean* : el valor esperado de los ángulos de torsión rotaméricos dada la conformación de la cadena principal y los ángulos de torsión semirrotaméricos (si es semirrotamérico). Son datos interpolados de forma bilineal/trilineal registrados en intervalos de 10 grados.
    -   *chi{1,2,3,4}\_standard\_deviation* : la desviación estándar de los ángulos de torsión rotaméricos dada la conformación de la cadena principal y los ángulos de torsión semirrotaméricos (si es semirrotamérico).
    -   *chi{1,2,3,4}\_deviation* : la desviación del ángulo respecto a la media.
    -   *rotamer\_bin\_probability* : la probabilidad de estar en el intervalo de rotámero.

<!-- -->

        CREATE TABLE residue_rotamers IF NOT EXISTS (
            struct_id INTEGER AUTOINCREMENT,
            residue_number INTEGER,
            rotamer_bin INTEGER,
            nchi INTEGER,
            semi_rotameric INTEGER,
            chi1_mean REAL,
            chi2_mean REAL,
            chi3_mean REAL,
            chi4_mean REAL,
            chi1_standard_deviation REAL,
            chi2_standard_deviation REAL,
            chi3_standard_deviation REAL,
            chi4_standard_deviation REAL,
            chi1_deviation REAL,
            chi2_deviation REAL,
            chi3_deviation REAL,
            chi4_deviation REAL,
            rotamer_bin_probability REAL,
            FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, residue_number));

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
            struct_id INTEGER AUTOINCREMENT,
            resNum INTEGER,
            ten_a_neighbors INTEGER,
            twelve_a_neighbors INTEGER,
            neigh_vect_raw REAL,
            sasa_r100 REAL,
            sasa_r140 REAL,
            sasa_r200 REAL,
            FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, resNum));

ResidueSecondaryStructureFeatures
---------------------------------

La estructura secundaria es un esquema de clasificación de los residuos que participan en interacciones regulares entre varios residuos.

-   **residue\_secondary\_structure** :
    -   *dssp* : el esquema de clasificación del Dictionary of Secondary Structure según [Kabsch and Sander, Dictionary of protein secondary structure: pattern recognition of hydrogen-bonded and geometrical features](http://onlinelibrary.wiley.com/doi/10.1002/bip.360221211/abstract) . La [codificación](http://swift.cmbi.ru.nl/gv/dssp/) se describe en su sitio web.

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_secondary_structure(
            struct_id INTEGER AUTOINCREMENT,
            resNum INTEGER,
            dssp TEXT,
            FOREIGN KEY(struct_id, resNum) REFERENCES residues(struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, resNum));

        CREATE TABLE dssp_codes(
            code TEXT NOT NULL,
            label TEXT NOT NULL,
            PRIMARY KEY (code));
        INSERT INTO "dssp_codes" VALUES('H','H: a-Helix');
        INSERT INTO "dssp_codes" VALUES('E','E: b-Sheet');
        INSERT INTO "dssp_codes" VALUES('T','T: HB Turn');
        INSERT INTO "dssp_codes" VALUES('G','G: 3/10 Helix');
        INSERT INTO "dssp_codes" VALUES('B','B: b-Bridge');
        INSERT INTO "dssp_codes" VALUES('S','S: Bend');
        INSERT INTO "dssp_codes" VALUES('I','I: pi-Helix');
        INSERT INTO "dssp_codes" VALUES(' ','Irregular');

BetaTurnDetectionFeatures
-------------------------

        <BetaTurnDetectionFeatures/>

Este reporter examina todas las ventanas disponibles de cuatro residuos, determina si hay un giro β, determina el tipo de giro β y luego escribe en una base de datos el número del residuo inicial y el tipo de giro.

        CREATE TABLE IF NOT EXISTS beta_turns (
            struct_id INTEGER AUTOINCREMENT,
            residue_begin INTEGER,
            turn_type TEXT,
            FOREIGN KEY (struct_id, residue_begin) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, residue_begin));

RotamerBoltzmannWeightFeatures
------------------------------

Mide cuán restringido está cada residuo, siguiendo a [Fleishman, Khare, Koga, & Baker, Restricted sidechain plasticity in the structures of native proteins and complexes](http://onlinelibrary.wiley.com/doi/10.1002/pro.604/full) .

-   **rotamer\_boltzmann\_weight** :
    -   *boltzmann\_weight* : se calcula la energía *e\_i* de cada rotámero minimizado en un entorno fijo. Si *E* es la energía de toda la estructura y *temperature=.8* , entonces *boltzmann\_weight* = 1 / (sum\_{i} exp((E-e\_i)/temperature))

<!-- -->

        CREATE TABLE IF NOT EXISTS rotamer_boltzmann_weight (
            struct_id INTEGER AUTOINCREMENT,
            resNum INTEGER,
            boltzmann_weight REAL,
            FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, resNum));
