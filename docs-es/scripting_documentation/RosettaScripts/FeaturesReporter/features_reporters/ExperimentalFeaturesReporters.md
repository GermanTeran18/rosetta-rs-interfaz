#ExperimentalFeaturesReporters

PdbDataFeatures
---------------

PdbDataFeatures registra la información almacenada en el formato de estructura del Protein Data Bank.

        <PdbDataFeatures/>

-   **residue\_pdb\_identification** : identifica los residuos usando la nomenclatura del PDB. Ten en cuenta que esta numeración tiene relevancia biológica y, por tanto, puede ser negativa, saltarse números, etc. Al usar *DatabaseInputer* o *DatabaseOutputter* con el distribuidor de trabajos de Rosetta, esta tabla se asigna al objeto PDBInfo.
    -   *struct\_id* , *residue\_number* : hace referencia a la clave primaria de la tabla residues
    -   *chain\_id* : columna 21 del registro ATOM
    -   *insertion\_code* : columna 26 del registro ATOM
    -   *pdb\_residue\_number* : identificación en el PDB, columnas 22-25

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_pdb_identification (
            struct_id INTEGER AUTOINCREMENT,
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
