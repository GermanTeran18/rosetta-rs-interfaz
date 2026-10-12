#Comandos de make_exemplar

Metadatos
========

Esta aplicación de Rosetta3 fue creada y documentada por David Johnson, et al.

Propósito y algoritmo
=====================

Esta aplicación recibe un archivo PDB y un residuo o par de residuos objetivo especificados, genera un PocketGrid (localizado), identifica el exemplar y lo escribe en un archivo. Consulta el artículo de 2013 para ver los detalles del algoritmo de PocketGrid y el de 2015 para los detalles del algoritmo de creación de exemplars.

Referencias
==========

Johnson DK and Karanicolas J. Druggable protein interaction sites are more predisposed to surface pocket formation than the rest of the protein surface. PLoS Comput Biol. 2013;9(3):e1002951
Johnson DK and Karanicolas J. Selectivity by small-molecule inhibitors of protein interactions can be driven by protein surface fluctuations. PLoS Comput Biol. 2015;11(2):e1004081

Opciones de línea de comandos
====================

**Comando de ejemplo**

```
make_exemplar.linuxgccrelease -database ~/Rosetta/main/database -in:file:s input.pdb -central_relax_pdb_num 97:A,143:A -pocket_grid_size 12 -pocket_static_grid -pocket_filter_by_exemplar
```

***Opciones de make_exemplar***

```
General Rosetta Options
   -database                      Path to rosetta databases
   -in:file:s                     Input pdb file(s)

Pocket Identification Options
   -pocket_num_angles             Number of different pose angles to measure pocket score at, default is 1, but at least 100 is recommended to reduce grid and orientation artifacts
   -pocket_grid_size              Defines the dimensions of the PocketGrid centered on the target residue(s), or 10 Angstroms by default
   -pocket_psp                    Mark Pocket-Solvent-Pocket events as well, default=false
   -pocket_sps                    Unmark Solvent-Pocket-Solvent events, default=true
   -pocket_surface_dist           Distance to consider pocket point being "surface" and excluded from "deep volume"
   -pocket_max_spacing            Maximum residue-residue distance to be considered a pocket, default is 12 Angstroms
   -pocket_min_size               Minimum pocket size to score, in cubic Angstroms, default is 10 cubic Angstroms
   -pocket_max_size               Maximum pocket size to report, in cubic Angstroms, 0 for no limit (default)
   -pocket_probe_radius           Radius of surface probe molecule, default 1.0 Angstroms
   -pocket_side                   Include only side chain residues for target surface, default=false
   -pocket_filter_by_exemplar     Additional filter generates an exemplar and then restricts the pocket to that exemplars, defaul=false
   -pocket_limit_exemplar_color   During clustering of exemplar atoms into exemplars, do not allow exposed color elements that are farther than 3 Angstroms apart to cluster together, creating a more concise exemplar, default=true
   -pocket_limit_small_exemplars  Ignore exemplars with fewer than 5 hydrophobic atoms, default=true
   -pocket_ignore_buried          Ignore pockets that are not solvent exposed, default=true
   -pocket_only_buried            Identify only pockets buried in the protein core (automatically sets -pocket_ignored_buried false), default=false
   -pocket_static_grid            By default the PocketGrid expands if pocket points are identified near the edge, this flag disables the autoexpanding feature.
   -pocket_grid_spacing           Defines the spacing of the PocketGrid, 0.5 by default
```

Consejos
====

* Las cuadrículas grandes crean exemplars grandes, que son inútiles para cualquier cosa relacionada con la inhibición de interacciones proteína-proteína mediante moléculas pequeñas, por lo que se debe definir -pocket_static_grid.
* Del mismo modo, siempre se debe usar -pocket_filter_by_exemplar.
* A veces un bolsillo puede ser demasiado poco profundo para obtener un buen exemplar con los valores por defecto. En esos casos, reducir -pocket_surface_dist permitirá identificar bolsillos menos profundos.
* La detección de exemplars ha cambiado desde la publicación de los artículos de Johnson y Karanicolas de 2015 y 2016. Para restaurar la funcionalidad usada en esos artículos, hay que usar las siguientes opciones: -pocket_limit_exemplar_color false -pocket_limit_small_exemplars false

## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
