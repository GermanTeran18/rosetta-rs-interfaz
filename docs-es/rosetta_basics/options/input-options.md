<!-- --- title: Input Options -->

Para entender las opciones básicas de entrada, completa [este tutorial](https://www.rosettacommons.org/demos/latest/tutorials/input_and_output/input_and_output#controlling-input).

Esta es una lista de las opciones de entrada de uso común. En la mayoría de estas opciones no es necesario indicar los grupos de opciones (in:path, etc.). Los grupos de opciones solo hay que indicarlos para las opciones que tienen el mismo nombre que otras opciones de otros grupos.  Rosetta te avisará si ese es el caso.

Varios
====

```
-in:ignore_unrecognized_res     Do not abort if unknown residues are found in PDB file;  instead, ignore them.
                                default='false' [Boolean].
-ignore_zero_occupancy          By default, Rosetta will ignore atoms in input PDB files whose occupancy
                                is 0.  To read those atoms/residues anyway, pass false to this option. 
                                default='true' [Boolean].
-in:ignore_waters               Ignore only WAT water molecules. Default=false. [Boolean].
-in:path:database               Database file input search paths.
                                 If the database option is not given or the database is not found, 
                                 the ROSETTA3_DB environment variable is tried [PathVector]
-in:file:residue_type_set       ResidueTypeSet for input files', default = 'fa_standard. [String]
```

Opciones comunes de archivos PDB de entrada
============================

```
-in:file:s                      Name(s) of single PDB file(s) to process. [FileVector]
-in:file:l                      File(s) containing list(s) of PDB files to process. [FileVector]
-in:path                        Paths to search for input files.
                                 Useful in combination with PDB lists that do not have full paths. [FileVector]
-in:file:native                 Native PDB filename. [File]
-in:file:native_exclude_res     Residue numbers to be excluded from RMS calculation. [IntegerVector]
-in:file:no_detect_pseudobonds  By default, Rosetta automatically detects pseudobonds on file import.
                                 If this is set to true, this auto-detection is disabled.  False by
                                 default. [Boolean]
-in:file:fullatom               Enable full-atom input of PDB or centroid structures. 
                                 Usually not needed for already full-atom PDB structures [Boolean]
-in:file:centroid_input         Enable centroid inputs of PDBs.  default = 'false' [Boolean]
-in:auto_setup_metals           Enable automatic setup of covalent bonds to metal ions and appropriate
                                constraints on PDB import.
-in:read_only_ATOM_entries      Read only the ATOM entries from the PDB.  Skip all others.  
                                Works for PDB and mmCIF, not silent files. 
```

Opciones de moléculas pequeñas
============================

Consulta también [[Residue Params file]]
```
-in:file:extra_res_fa              Full atom "params" files for small molecules or non-standard residues
                                   [FileVector]                          
-in:file:extra_res_path            Directory containing non-standard residue params files. [PathVector]
-in:file:extra_res_cen             Centroid-mode "params" files for small molecules or non-standard
                                   residues [FileVector]
-in:file:remap_pdb_atom_names_for  When reading PDBs, use geometry to load atoms (instead of atom names)
                                   for the residues with the given three letter codes [StringVector]
```

Entrada de bases de datos relacionales
============================
Consulta [[aquí | Database-options ]] para más información
```
-in:use_database                          Indicate that structures should be read from the given database
-in:select_structures_from_database       An sql query to select which structures should be extracted. 
                                           ex:  "SELECT tag FROM structures WHERE tag = '7rsa';"
```

Opciones de archivos de entrada de fragmentos y secuencias
======================================

```
-in:file:fasta          Fasta-formatted sequence file. [FileVector]
-in:file:frag3          Fragments file with residue length of 3 [String]
-in:file:frag9          Fragments file with residue length of 9 [String]
```

Opciones de silent files de entrada
=======================

```
-in:file:silent                           Silent input filename(s). [FileVector]
-in:file:silent_list                      Silent input filename list(s) - like -l is to -s. [FileVector]
-in:file:tags                             Instead of using all the structures in the input silent file(s)
                                          use just the listed structures. [StringVector]
-in:file:tagfile                          Like -in:file:tags, but instead of listing the tags on the command line,
                                          read the tags from the specified file. [FileName]
-in:file:silent_optH                      Call optH when reading a silent file. [Boolean]
-in:file:silent_structure_type            Type of SilentStruct object to use in silent-file input'.
                                          Default='protein', [String]
-in:file:silent_read_through_errors       Try to salvage damaged silent files
-in:file:silent_score_prefix              Prefix that is appended to all scores read in from a silent-file',
                                          default='' [String]
```

Puntuación
=======

```
-in:file:repair_sidechains  Attempt a repack/minmize to repair sidechain problems.
                            Such as proline geometry and his tautomerization' default = 'false'
                            [Boolean]
```

##Ensemble Job Inputter

Un Job Inputter alternativo dentro del marco de JD2 (el sistema actual de distribución de trabajos), pensado específicamente para trabajar con un conjunto (ensemble) de estructuras de entrada.  Es sencillo. Tiene dos modos: Seed Ensemble y Grid Ensemble. 

Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com); investigador principal: William Schief

###Seed Ensemble

Elige al azar los archivos iniciales de la lista de estructuras dada con -s y -l

-jd2:seed_ensemble_weights (RealVector)

 - Asigna pesos a los PDB de entrada y activa el modo seed_ensemble y el JobInputter.  Después usamos el muestreador ponderado para elegir el PDB de entrada de cada nstruct.  Los pesos pueden ser el tamaño del clúster, la energía, que te guste más una estructura que otra, etc. Deben coincidir en número con las entradas.

-jd2:seed_ensemble_weight_file (File)

 - Un archivo que especifica los pesos que se usarán para cada estructura de entrada.  Activa el modo seed_ensemble y el JI. Dos columnas: nombre base con extensión (o ruta relativa o ruta completa) y peso.  Las que no figuren en el archivo tendrán por defecto el peso 0.  Se puede dar una línea [ALL weight] para asignar un peso dado a todos los PDB de entrada. Se usa, por ejemplo, para dar más peso a una estructura concreta:

```
#name weight
ALL 1
awesome_model.pdb 3

```

-jd2:seed_ensemble (Bool)

 - Activa el modo seed ensemble, pero simplemente elige al azar el PDB de entrada para cada nstruct.  En el modo seed ensemble, el número de PDB de entrada puede ser mayor que nstruct.


###Grid Ensemble
Usa los archivos de entrada dados con -s y -l y nstruct para cubrir una cuadrícula.

-in:jd2:grid_ensemble (Bool)

 - Activa el componente básico del JI.  Aquí, en lugar de muestrear nstruct para cada PDB de entrada, solo muestreamos nstruct en total, sea cual sea el número de PDB de entrada (con nstruct repartido lo más uniformemente posible entre los PDB de entrada).  

_NOTA: El Ensemble Job Inputter no funciona actualmente con silent files._

##Véase también

* [Tutorial sobre cómo controlar la entrada y la salida](https://www.rosettacommons.org/demos/latest/tutorials/input_and_output/input_and_output)
* [[Options overview]]: descripción de las opciones de Rosetta
* [[Output options]]
* [[Full options list]]
* [[File types list]]: enlaces a la documentación de los distintos tipos de archivo que usa Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
