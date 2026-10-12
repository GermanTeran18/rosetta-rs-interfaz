#Documentación de `rna_score`

Metadatos
========

Autor: Andrew Watkins

Añadido a la documentación: febrero de 2018

Código y demo
=============

El código central de la aplicación `rna_score` está en `       apps/public/rna/util/rna_score.cc      `

Propósito de la aplicación
===========================================

Este código sirve para puntuar silent files que contienen RNA de una forma que ofrece funcionalidad adicional, la que esperan los flujos de trabajo de RNA.

Archivos de entrada
===========

Archivos requeridos
-------------

-   Un silent file (y sus etiquetas) o uno o más archivos PDB que contengan RNA (o, en rigor, cualquier cosa) para puntuar

Consejos
----
+ Se puede informar a este programa de qué PDB pudieron haber contribuido al problema de modelado completo que dio lugar al silent file que se va a puntuar; usa la opción `-original_input` para pasar esos PDB
+ También se respetan las opciones de datos de mapeo químico de RNA (pasando `-rna:data_file`)
+ Convertirá la parte proteica a centroide si se solicita
* Se puede usar para recalcular los RMSD de Poses completos o de subconjuntos del Pose
* Se puede usar con superposición sobre todos los residuos, o sobre un dominio fijo concreto (especialmente útil si vuelves a puntuar un silent file de una ejecución que usó un estándar de superposición del que ahora te arrepientes)

Opciones
=======

```
-in:file:s                     Name of single PDB file with template coordinates
-in:file:native                A native PDB (for RMS calculation)
-stepwise:virtualize_free_moieties_in_native    Will virtualize groups in the native PDB that 
                               aren't making any contacts (thus omitted from RMSD computation)
-in:file:fasta                 The fasta will allow a FullModelInfo setup based on each input 
                               pose, even if some or all of the input poses are incomplete 
                               (necessary for some RNA score terms like `loop_close`)
-rmsd_nosuper                  Calculate RMSD without superimposing to the native (good for 
                               density cases, where there IS a privileged reference frame
-rmsd_residues                 Specification of a subset of residues over which to calculate RMSD
-just_calc_rmsd                Do nothing but calculate RMSD
-color_by_score                Set the temperature of each atom in the `PDBInfo` to the score
                               so that you can color by score in PyMOL
-stepwise:superimpose_over_all    Will superimpose over every residue if true. If false, will try
                               to figure out a reasonable fixed domain to use instead.
-stepwise:alignment_anchor_res    Help out the superimposition by giving a residue from the fixed
                               domain over which superposition should take place
```


##Véase también

* [[RNA applications]]: Lista de aplicaciones de RNA
* [[Utilities Applications]]: Lista de aplicaciones de utilidades
* [[Application Documentation]]: Página de inicio de la documentación de aplicaciones
* [[RNA]]: Guía para trabajar con RNA en Rosetta
* [[Fixbb]]: Aplicación que se usa habitualmente para diseño y/o threading con proteínas
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
