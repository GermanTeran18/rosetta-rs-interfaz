#Comandos de pocket_relax

Metadatos
========

Esta aplicación de Rosetta3 fue creada y documentada por David Johnson, et al.

Propósito y algoritmo
=====================

Esta aplicación está pensada para automatizar el proceso de optimización de bolsillos, que antes se hacía en dos partes. Se realiza un [[Relax]] y después se desactiva la restricción de bolsillo y se hace una minimización de todos los átomos. Si no se usa la restricción de bolsillo, realiza un relax y una minimización sencillos, que se usan para generar el conjunto de decoys de comparación sin restricciones.

Referencias
==========

Johnson DK and Karanicolas J. Druggable protein interaction sites are more predisposed to surface pocket formation than the rest of the protein surface. PLoS Comput Biol. 2013;9(3):e1002951
Johnson DK and Karanicolas J. Selectivity by small-molecule inhibitors of protein interactions can be driven by protein surface fluctuations. PLoS Comput Biol. 2015;11(2):e1004081

Opciones de línea de comandos
====================

**Comando de ejemplo**

```
pocket_relax.linuxgccrelease -database ~/Rosetta/main/database -in:file:s input.pdb -pocket_max_size 300 -pocket_num_angles 2 -score:patch pocket.wts.patch -cst_fa_file constraints -nstruct 1000 -pocket_zero_derivatives
```

***Opciones de make-exemplar***

```
General Rosetta Options
   -database                   Path to rosetta databases
   -in:file:s                  Input pdb file(s)
   See [[Relax  | application_documentation/relax]] documentation for other options

Pocket Constraint Options
   -score:patch                The PocketConstraint needs to be turned on
   -cst_fa_file                The PocketConstraint target residue and weight is specified here
   -pocket_zero_derivatives    The PocketConstraint has no derivitive, and this flag specifies to return derivitives of 0 during minimization phases of Relax

Pocket Identification Options
   -pocket_num_angles          Number of different pose angles to measure pocket score at, default is 1, but 2 is recommended to reduce grid and orientation artifacts
   -pocket_grid_size           Defines the dimensions of the PocketGrid centered on the target residue(s), or 10 Angstroms by default
   -pocket_psp                 Mark Pocket-Solvent-Pocket events as well, default=false
   -pocket_sps                 Unmark Solvent-Pocket-Solvent events, default=true
   -pocket_surface_dist        Distance to consider pocket point being "surface" and excluded from "deep volume"
   -pocket_max_spacing         Maximum residue-residue distance to be considered a pocket, default is 12 Angstroms
   -pocket_min_size            Minimum pocket size to score, in cubic Angstroms, default is 10 cubic Angstroms
   -pocket_max_size            Maximum pocket size to report, in cubic Angstroms, 0 for no limit (default)
   -pocket_probe_radius        Radius of surface probe molecule, default 1.0 Angstroms
   -pocket_side                Include only side chain residues for target surface, default=false
   -pocket_filter_by_exemplar  Additional filter generates an exemplar and then restricts the pocket to that exemplars, defaul=false
   -pocket_ignore_buried       Ignore pockets that are not solvent exposed, default=true
   -pocket_only_buried         Identify only pockets buried in the protein core (automatically sets -pocket_ignored_buried false), default=false
   -pocket_static_grid         By default the PocketGrid expands if pocket points are identified near the edge, this flag disables the autoexpanding feature.
   -pocket_grid_spacing        Defines the spacing of the PocketGrid, 0.5 by default
```

***Archivo pocket.wts.patch***

```
pocket_constraint = 1.0
```

***Formato del archivo de restricciones***

```
Pocket 0.25 97:A,143:A
```

Consejos
====

* Los artefactos de orientación pueden tener un impacto artificial en el volumen del bolsillo; por eso se sugiere especificar -pocket_num_angles con valor 2 para reducir ese efecto
* -pocket_max_size no es necesario, pero puede ser útil cuando una proteína determinada es capaz de abrir bolsillos enormes que no son relevantes para la inhibición. -pocket_max_size limita esencialmente el volumen que devuelve PocketConstraint; a partir de ese punto, un bolsillo crecerá SOLO cuando sea energéticamente favorable.


## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
