#FeaturesReporters químicos -->

AtomTypeFeatures
----------------

        <AtomTypeFeatures/>

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

ResidueTypesFeatures
--------------------

Los ResidueTypes almacenan información sobre la naturaleza química del residuo. La información se lee de */path/to/rosetta/main/database/chemical/residue\_type\_sets/\<residue\_type\_set\_name\>/residue\_types/* .

-   **residue\_type** :
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *fa\_standard* o *centroid* .
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
            name TEXT,
            version TEXT,
            name3 TEXT,
            name1 TEXT,
            aa TEXT,
            lower_connect INTEGER,
            upper_connect INTEGER,
            nbr_atom INTEGER,
            nbr_radius REAL,
            PRIMARY KEY(residue_type_set_name, name));

-   **residue\_type\_atom** : se identifica cada átomo del tipo de residuo.
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *fa\_standard* o *centroid* .
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
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *fa\_standard* o *centroid* .
    -   *atom1* , *atom2* : los átomos que participan en el enlace, donde el índice de átomo de *atom1* es menor que el índice de átomo de *atom2* .
    -   *bond\_type* : el [tipo](Glossary#residuetype) de enlace químico.

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
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *fa\_standard* o *centroid* .
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
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *fa\_standard* o *centroid* .
    -   *chino* : el índice del grado de libertad chi
    -   *atom1* , *atom2* , *atom3* , *atom3* , *atom4* : los átomos que definen el grado de libertad torsional

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_chi (
            residue_type_set_name TEXT,
            residue_type_name TEXT,
            atom1 TEXT,
            atom2 TEXT,
            atom3 TEXT,
            atom4 TEXT,
            chino INTEGER,
            FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(residue_type_set_name, residue_type_name, atom1, atom2));

-   **residue\_type\_chi\_rotamer** : los grados de libertad torsionales chi se agrupan en conformaciones discretas de rotámeros. Cada fila es un intervalo para un grado de libertad torsional chi.
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *fa\_standard* o *centroid* .
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
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *fa\_standard* o *centroid* .
    -   *chino* : el índice del grado de libertad torsional chi
    -   *sample* : el ángulo de muestra más o menos cada ángulo de muestra adicional. P. ej., el hidrógeno del hidroxilo de la tirosina está controlado por el tercer grado de libertad torsional chi con dos intervalos torsionales, trans a 180 grados y cis a 0 grados, ambos en el plano del anillo aromático. Para aumentar el muestreo conformacional se añaden 8 intervalos de rotámero adicionales de +/- 1 grado y +/- 20 grados para cada intervalo de muestra.
    -   *extra* : ¿este intervalo de muestra es un intervalo de rotámero adicional?

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_proton_chi (
            residue_type_set_name TEXT,
            residue_type_name TEXT,
            chino INTEGER,
            sample REAL,
            is_extra INTEGER,
            FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(residue_type_set_name, residue_type_name, chino, sample));

-   **residue\_type\_property** :
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *fa\_standard* o *centroid* .
    -   *property* : propiedades asociadas al ResidueType, p. ej. PROTEIN, POLAR o SC\_ORBITALS

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_property (
            residue_type_set_name TEXT,
            residue_type_name TEXT,
            property TEXT,
            FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(residue_type_set_name, residue_type_name, property));

-   **residue\_type\_variant\_type** :
    -   *residue\_type\_set\_name* : el nombre del ResidueTypeSet, p. ej. *fa\_standard* o *centroid* .
    -   *variant\_type* : tipos de variante asociados al ResidueType, p. ej. DEPROTONATED, DISULFIDE o MODRES

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_type_variant_type (
           residue_type_set_name TEXT,
           residue_type_name TEXT,
           variant_type TEXT,
           FOREIGN KEY(residue_type_set_name, residue_type_name) REFERENCES residue_type(residue_type_set_name, name)DEFERRABLE INITIALLY DEFERRED,
           PRIMARY KEY(residue_type_set_name, residue_type_name, variant_type));

UnrecognizedAtomFeatures
------------------------

           <UnrecognizedAtomFeatures neighbor_distance_cutoff="(&Real 12.0)"/>

UnrecognizedAtom almacena información sobre átomos no reconocidos. Esta información se guarda en el PDBInfo y normalmente se rellena cuando hay un residuo en un archivo PDB que no coincide con ningún archivo de parámetros de residuo reconocido y que se guarda con la opción *-in:remember\_unrecognized\_res* .

-   **unrecognized\_residues** : detalles sobre los residuos no reconocidos
    -   *residue\_number* : el número del residuo no reconocido. NOTA: los residuos no reconocidos no se almacenan en la tabla residues.
    -   *name3* : abreviatura de tres letras del tipo de residuo.
    -   *max\_temperature* : el factor B más alto de cualquier átomo del residuo no reconocido. Aquí también se podría añadir la ocupación.

<!-- -->

        CREATE TABLE unrecognized_residues(
                struct_id INTEGER AUTOINCREMENT,
                residue_number INTEGER,
                name3 TEXT,
                max_temperature REAL,
                FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
                PRIMARY KEY (struct_id, residue_number));

-   **unrecognized\_atoms** : detalles atómicos sobre los residuos no reconocidos
    -   *atom\_name* : p. ej., la columna del nombre de átomo del PDB
    -   *coord\_{x,y,z}* : las coordenadas atómicas

<!-- -->

        CREATE TABLE unrecognized_atoms(
                struct_id INTEGER AUTOINCREMENT,
                residue_number INTEGER,
                atom_name TEXT,
                coord_x REAL,
                coord_y REAL,
                coord_z REAL,
                temperature REAL,
                FOREIGN KEY (struct_id) REFERENCES structures(struct_id) DEFERRABLE INITIALLY DEFERRED,
                PRIMARY KEY (struct_id, residue_number, atom_name));

-   **unrecognized\_neighbors** : contactos cercanos entre residuos y residuos no reconocidos; se puede usar como filtro para reunir estadísticas en bloque del Protein Data Bank sin representar adecuadamente ligandos, etc.
    -   *closest\_contact* : distancia entre el ACTCOORD del residuo y el átomo más cercano de cada residuo no reconocido. Solo se consideran los contactos que están dentro de *neighbor\_distance\_cutoff* , que por defecto es 12A.

<!-- -->

        CREATE TABLE unrecognized_neighbors(
                struct_id INTEGER AUTOINCREMENT NOT NULL,
                residue_number INTEGER NOT NULL,
                unrecognized_residue_number REAL NOT NULL,
                closest_contact REAL NOT NULL,
                FOREIGN KEY (struct_id, residue_number) REFERENCES residues(struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
                PRIMARY KEY (struct_id, residue_number));
