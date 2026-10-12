#MultiStructureFeaturesReporters

ProteinRMSDFeatures
-------------------

Calcula la desviación cuadrática media (RMSD) átomo a átomo entre la conformación sobre la que se informa y una conformación guardada previamente. Hay varias formas de especificar la estructura de referencia, que se consideran en el siguiente orden

-   Usando el **SavePoseMover** :

<!-- -->

        <ROSETTASCRIPTS>
            <MOVERS>
                <SavePoseMover name=spm_init_struct reference_name=init_struct/>
                <ReportToDB name=features_reporter database_name="features_SAMPLE_SOURCE_ID.db3" batch_description="SAMPLE_SOURCE_DESCRIPTION">
                    <ProteinRMSDFeatures reference_name=init_struct/>
                </ReportToDB>
            </MOVERS>
            <PROTOCOLS>
                <Add mover_name=spm_init_struct/>
                <Add mover_name=features_reporter/>
            </PROTOCOLS>
        </ROSETTASCRIPTS>

-   Usando `    -in:file:native   `
-   Usando el gestor de recursos (pendiente)

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
            struct_id INTEGER AUTOINCREMENT,
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

ProteinRMSDNoSuperpositionFeatures
----------------------------------

Igual que lo anterior, pero no superpone los Poses antes de calcular el RMSD.

    CREATE TABLE protein_rmsd_no_superposition(
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
            FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (struct_id, reference_tag));

RotamerRecoveryFeatures
-----------------------

RotamerRecoverFeatures es un envoltorio del benchmark científico [[rotamer_recovery|RotamerRecoveryScientificBenchmark]] para poder incluirlo como una feature.

        <RotamerRecoveryFeatures scorefxn="(&string)" protocol="(&string)" comparer="(&string)" mover="(&string)"/>

Consulta el enlace anterior para ver las explicaciones de los parámetros. Dale al features reporter un protocolo (cadena RRProtocol) o cualquier otro mover. La especificación del Pose con el que comparar funciona igual que en ProteinRMSDFeatures (opción -native, SavePoseMover, etc.)

-   **rotamer\_recovery** : la recuperación de rotámeros (rotamer\_recovery) de una feature indica cuán similar es la conformación óptima de Rosetta a la conformación de entrada cuando la conformación óptima de Rosetta está sesgada hacia la conformación de entrada.
    -   **struct\_id** , **resNum** : son las claves primarias de la tabla *residues* del reporter ResidueFeatures
    -   **divergence** : es la *puntuación* que devuelve el *RRProtocol*.

<!-- -->

        CREATE TABLE IF NOT EXISTS nchi (
            name3 TEXT,  
            nchi INTEGER,
            PRIMARY KEY (name3));

        INSERT OR IGNORE INTO nchi VALUES('ARG', 4);
        INSERT OR IGNORE INTO nchi VALUES('LYS', 4);
        INSERT OR IGNORE INTO nchi VALUES('MET', 3);
        INSERT OR IGNORE INTO nchi VALUES('GLN', 3);
        INSERT OR IGNORE INTO nchi VALUES('GLU', 3);
        INSERT OR IGNORE INTO nchi VALUES('TYR', 2);
        INSERT OR IGNORE INTO nchi VALUES('ILE', 2);
        INSERT OR IGNORE INTO nchi VALUES('ASP', 2);
        INSERT OR IGNORE INTO nchi VALUES('TRP', 2);
        INSERT OR IGNORE INTO nchi VALUES('PHE', 2);
        INSERT OR IGNORE INTO nchi VALUES('HIS', 2);
        INSERT OR IGNORE INTO nchi VALUES('ASN', 2);
        INSERT OR IGNORE INTO nchi VALUES('THR', 1);
        INSERT OR IGNORE INTO nchi VALUES('SER', 1);
        INSERT OR IGNORE INTO nchi VALUES('PRO', 1);
        INSERT OR IGNORE INTO nchi VALUES('CYS', 1);
        INSERT OR IGNORE INTO nchi VALUES('VAL', 1);
        INSERT OR IGNORE INTO nchi VALUES('LEU', 1);
        INSERT OR IGNORE INTO nchi VALUES('ALA', 0);
        INSERT OR IGNORE INTO nchi VALUES('GLY', 0);

        CREATE TABLE IF NOT EXISTS rotamer_recovery (
            struct_id INTEGER AUTOINCREMENT,
            resNum INTEGER,
            divergence REAL,
            recovered INTEGER,
            PRIMARY KEY(struct_id, resNum));
