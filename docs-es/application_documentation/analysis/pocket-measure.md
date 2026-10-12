#Comandos de pocket_measure

Metadatos
========

Esta aplicación de Rosetta3 fue creada y documentada por David Johnson, et al.

Propósito y algoritmo
=====================

Esta aplicación toma un archivo PDB y un residuo o par de residuos objetivo especificado, genera un PocketGrid (localizado) y entrega el «volumen profundo» total de todos los bolsillos objetivo y el bolsillo más grande. Consulta el artículo citado para los detalles del algoritmo de bolsillos.

Referencias
==========

Johnson DK and Karanicolas J. Druggable protein interaction sites are more predisposed to surface pocket formation than the rest of the protein surface. PLoS Comput Biol. 2013;9(3):e1002951

Opciones de línea de comandos
====================

**Comando de ejemplo**

```
pocket_measure.linuxgccrelease -database ~/Rosetta/main/database -in:file:s input.pdb -central_relax_pdb_num 97:A,143:A -pocket_num_angles 100
```

***Opciones de pocket_measure***

```
General Rosetta Options
   -database                   Path to rosetta databases
   -in:file:s                  Input pdb file(s)

Pocket Identification Options
   -pocket_num_angles          Number of different pose angles to measure pocket score at, default is 1, but at least 100 is recommended to reduce grid and orientation artifacts
   -pocket_grid_size           Defines the dimensions of the PocketGrid centered on the target residue(s), or 10 Angstroms by default
   -pocket_psp                 Mark Pocket-Solvent-Pocket events as well, default=false
   -pocket_sps                 Unmark Solvent-Pocket-Solvent events, default=true
   -pocket_surface_dist        Distance to consider pocket point being "surface" and excluded from "deep volume"
   -pocket_max_spacing         Maximum residue-residue distance to be considered a pocket, default is 8 Angstroms
   -pocket_min_size            Minimum pocket size to score, in cubic Angstroms, default is 10 cubic Angstroms
   -pocket_max_size            Maximum pocket size to report, in cubic Angstroms, 0 for no limit (default)
   -pocket_probe_radius        Radius of surface probe molecule, default 1.0 Angstroms
   -pocket_side                Include only side chain atoms for target surface, default=false
   -pocket_filter_by_exemplar  Additional filter generates an exemplar and then restricts the pocket to that exemplars, defaul=false
   -pocket_ignore_buried       Ignore pockets that are not solvent exposed, default=true
   -pocket_only_buried         Identify only pockets buried in the protein core (automatically sets -pocket_ignored_buried false), default=false
   -pocket_static_grid         By default the PocketGrid expands if pocket points are identified near the edge, this flag disables the autoexpanding feature.
   -pocket_grid_spacing        Defines the spacing of the PocketGrid, 0.5 by default

Pocket Output Options
   -pocket_dump_pdbs           Generate PDB files of all PocketGrid points marked as pocket, for debugging/visualization of underlying PocketGrid
   -pocket_debug_output        Print any and all debugging output related to pockets, default=false
```

Consejos
====

* Como la orientación de la proteína puede afectar a la identificación exacta del bolsillo, lo que puede tener efectos profundos sobre el volumen medido del bolsillo, se recomienda usar la opción -pocket_num_angles con al menos 100 para generar PocketGrids en múltiples rotaciones y devolver el volumen promedio del bolsillo.


##Véase también

* [[Aplicaciones de análisis | analysis-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
