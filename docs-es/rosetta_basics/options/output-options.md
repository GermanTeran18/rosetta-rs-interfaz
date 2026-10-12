<!-- --- title: Output Options -->

[Aquí](https://www.rosettacommons.org/demos/latest/tutorials/input_and_output/input_and_output#controlling-output) hay un tutorial sobre el control básico de la salida.

Esta es una lista de las opciones de salida de uso común.

Opciones generales de salida
====

```
-out:overwrite             Ignore 'CHECKPOINT' file and the overwrite the PDB file(s).
                           [Boolean]
-out:nstruct               Number of times to process each input PDB", default="1"
                           [Integer]
-out:prefix                Prefix for output structure names, like old -series code",
                           Default="". [String]
-out:suffix                Suffix for output structure names
                           Default="". [String]
-out:pdb_gz                Compress (gzip) output pdbs", default="false". [Boolean]
-out:pdb                   Output PDBs", default="false". [Boolean]
-out:nooutput              Surpress outputfiles. Default="false". [Boolean]
-out:output                Force outputfiles. Default="false". [Boolean]
-out:show_accessed_options At the end of the run show options that has been accessed
                           Default="false". [Boolean]
-out:user_tag              Add this tag to structure tags: e.g., a process id.
                           Default="". [String]
-out:no_nstruct_label      Do not append _#### to tag for output structures
```

Bases de datos relacionales
====================
Consulta [[aquí | Database-options ]] para más información
```
-out:use_database          Write out structures to database.
                            Specify database via -inout:dbms:database_name and wanted structures with
                            -in:file:tags [Boolean]
-out:database_filter       Filter to use with database output.  Arguments for filter follow filter name [StringVector]
-out:resume_batch          Specify 1 or more batch ids to finish an incomplete protocol.
                            Only works with the DatabaseJobOutputter.
                            The new jobs will be generated under a new protocol and batch ID
```

Opciones relacionadas con el tracer
=======================

El usuario puede especificar dinámicamente, en tiempo de ejecución, opciones de línea de comandos para silenciar o reactivar canales concretos o todos, y para cambiar el nivel de salida.

```
-mute                      Mute specified chanels, specify 'all' to mute all chanels.
                           Defaule="false" [StringVector]
-unmute                    UnMute specified chanels. Default="false" [StringVector]
```

Control de la salida del tracer desde la línea de comandos. Por ejemplo:

```
# unmute all channels - default behavior, the same as just './a.out'
./a.out -unmute all

# mute all channels, unmute ChannelA and ChannelB
./a.out -mute all -unmute ChannelA ChannelB

# mute ChannelA and  ChannelB
./a.out -mute ChannelA ChannelB

# Set priority of output messages to be between 0 and 10
./a.out -out:level 10

# disable output of channels names
./a.out -chname off
```

Opciones de salida relacionadas con archivos
============================

```
-out:file:o               Output file name. [String]
-out:file:silent          Use silent file output, use filename after this flag.
                          Default="default.out" [String]
-out:file:scorefile       Write a scorefile to the provided filename.
                          Default = "default.sc [String]
-out:file:fullatom        Enable full-atom output of PDB or centroid structures.
                          Default = "false" [Boolean]
```

Opciones de salida relacionadas con rutas
===========================

```
-out:path:all             All Files output Path. Default = '.' [Path]
-out:path:pdb             PDB file output path. [Path]
-out:path:score           Score file output path. [Path]

```

Opciones de salida prácticas para depurar un protocolo
=============================================

```
-inout:write_all_connect_info    Writes explicit CONECT records in the PDB file,
                                 for all bonded atoms, so that bonds are drawn for
                                 anything that's bonded when the structure is viewed
                                 in a program like PyMOL.  (By default, only CONECT
                                 records for noncanonical entities are written.)
                                 Default = "false".  [Boolean]
-inout:connect_info_cutoff       Sets the threshold for writing CONECT records.
                                 Bonded atoms separated by more than this
                                 distance (in Angstroms) have a CONECT record
                                 written.  Set this to 0.0 to write all bonds.
                                 Default = 0.0. [Real]
-inout:skip_connect_info         Prevents the writing of CONECT records in the PDB file.
                                 In the absence of this flag, CONECT records are written
                                 for anything that isn't a canonical L-alpha amino acid or
                                 a canonical nucleic acid.  Default = "false".  [Boolean]
```

##Véase también

* [Tutorial sobre cómo controlar la entrada y la salida](https://www.rosettacommons.org/demos/latest/tutorials/input_and_output/input_and_output#controlling-output)
* [[Options overview]]: descripción de las opciones de Rosetta
* [[Input options]]
* [[Full options list]]
* [[File types list]]: enlaces a la documentación de los distintos tipos de archivo que usa Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Analyzing Results]]: información sobre cómo analizar los resultados generados con Rosetta
