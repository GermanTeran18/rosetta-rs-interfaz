#Diseño 3D de RNA: *rna\_design*

Metadatos
========

Autor: Rhiju Das

Este documento actualiza al formato de documentación más reciente la documentación escrita en 2008 por Rhiju Das (rhiju [at] stanford.edu). Última actualización: abril de 2011.

Código y demo
=============

El código central de la aplicación *rna\_design* está en `       apps/public/rna/rna_design.cc      `, con rutinas centrales que se ejecutan a través del packer de Rosetta.

Para un ejemplo de demo "mínimo" de diseño de RNA:

`       demos/public/RNA_Design      ` [en la versión publicada]

También hay un buen servidor para este código en [rnaredesign.stanford.edu](http://rnaredesign.stanford.edu)

Referencias
==========

 Yesselman, J.D., and Das, R. (2015) "RNA-Redesign: A web server for fixed-backbone 3D design of RNA." Nucleic Acid Research 43 (W1): W498 - W501. [Artículo.](https://daslab.stanford.edu/site_data/pub_pdf/2015_Yesselman_NAR.pdf) [Enlace.](http://nar.oxfordjournals.org/content/43/W1/W498) [Servidor.](http://rnaredesign.stanford.edu)

Das, R., Karanicolas, J., and Baker, D. (2010), "Atomic accuracy in predicting and designing noncanonical RNA structure". Nature Methods 7:291-294. [Artículo.](http://www.stanford.edu/~rhiju/DasKaranicolasBaker2010ALL.pdf) [Enlace.](http://www.nature.com/nmeth/journal/v7/n4/abs/nmeth.1433.html)

(Hay una separata disponible en <https://daslab.stanford.edu/publications/>.)

Propósito
===========================================

Este código sirve para diseñar secuencias de RNA con cadena principal fija, a partir de una cadena principal de entrada.

Algoritmo
=========

Esta aplicación realiza una optimización combinatoria del tipo y la conformación de las nucleobases, junto con las torsiones del 2'-OH, en el contexto de una cadena principal de RNA preespecificada. Es muy similar al algoritmo de diseño de proteínas con cadena principal fija de Rosetta y se ha usado para probar el nuevo potencial de RNA de Rosetta. Por desgracia, por ahora no está muy optimizada en velocidad; el precálculo de las energías de los rotámeros tarda un rato. Las ejecuciones sobre cadenas principales de RNA de más de \~diez nucleótidos tardan muchos minutos u horas; las mejoras del algoritmo que se implementen en versiones futuras acelerarán esto en gran medida.

Limitaciones
===========

-   Por ahora este método no incluye ninguna optimización de las posiciones de la cadena principal.
-   Este método todavía no admite el diseño de un subconjunto de posiciones de nucleótidos.
-   Para ver una muestra de cómo hacer ambas cosas de forma eficaz, consulta el nuevo marco [[stepwise|stepwise]].

Archivos de entrada
===========

Archivo requerido
-------------

Solo el archivo PDB con la cadena principal deseada.

Cómo ejecutar con este archivo.
---------------------------

```
rna_design.<exe> -s chunk001_uucg_RNA.pdb   -nstruct 3  -ex1:level 4 -dump -score:weights farna/rna_hires.wts
```

Esta demo rediseña un tetraloop 'UUCG' sobre una "hélice" de RNA de un solo par de bases, como caso de prueba pequeño de 6 nucleótidos. A modo de ilustración, solo se generan 3 diseños. Tarda unos 15 segundos en ejecutarse. La secuencia de salida típica es cuuggg (la nativa es cuucgg).

Opciones
=======

```
-in:file:s                                       Name(s) of single PDB file(s) to process. [FileVector]
-nstruct                                         Number of times to process each input PDB. [Integer]
-ex1:level <n>                                   Use extra chi1 sub-rotamers for all residues that pass
                                                 the extrachi_cutoff.
                                                 [Boolean]
                                                 The integers that follow the ex flags specify the pattern
                                                 for chi dihedral angle sampling.
                                                 There are currently 8 options; they all include the original
                                                 chi dihedral angle No. 4 means: EX_TWO_HALF_STEP_STDDEVS
                                                 [-1,-1/2,0,1/2,1 standard deviations].
-dump                                            Generate pdb output,default:false. [Boolean]
-score:weights farna/rna_hires.wts               Name of weights file, default is standard. [String]
-sample_chi                                      Sample chi (glycosidic torsion angle).
-disable_o2star_rotamers                         Turn off sampling of 2'-OH proton position.
-database                                        (Optional) Path to rosetta databases. Default is based on location of rosetta executables. [PathVector]
```

Consejos
====

¿Qué significan las puntuaciones?
------------------------

La pregunta más común que recibimos es qué significan los términos de las "líneas SCORE" de los silent files. Aquí va un resumen breve, con más explicación en los artículos citados arriba.

```
***Energy interpreter for fullatom silent output:
score                                            Final total score
fa_atr                                           lennard-jones attractive
fa_rep                                           lennard-jones repulsive
fa_intra_rep                                     Lennard-jones repulsive between atoms in the same residue
lk_nonpolar                                      lazaridis-karplus non-polar solvation energy
hack_elec_rna_phos_phos                          Simple electrostatic repulsion term between phosphates
hbond_sr_bb_sc                                   backbone-sidechain hbonds close in primary sequence
hbond_lr_bb_sc                                   backbone-sidechain hbonds distant in primary sequence
hbond_sc                                         sidechain-sidechain and sidechain-backbone hydrogen bond energy
ch_bond                                          Carbon hydrogen bonds
geom_sol                                         Geometric Solvation energy for polar atoms
rna_torsion                                      RNA torsional potential.
atom_pair_constraint                             Atom pair distance constraints score?
angle_constraint                                 (not in use)
rms                                              rmsd
```

Salidas esperadas
================

Si usas los archivos de opciones de ejemplo, también se generan otros archivos de salida.

```
start.pdb:                                       Idealized structure
S_000*.pdb:                                      Output of the rna denovo design.
chunk001_uucg_RNA.sequence_recovery.txt:         This is a simple report for design identity of each RNA residue and structure.
chunk001_uucg_RNA.pack.txt:                      Total score and sequence for each output model
chunk001_uucg_RNA.pack.out:                      Scores (with breakdown by score component) for each re-designed sequence
```

##Véase también

* [[RNA applications]]: La página de inicio de las aplicaciones de RNA
* [[Design Applications]]: Lista de aplicaciones de diseño
* [[RNA]]: Guía para trabajar con RNA en Rosetta
* [[Fixbb]]: Aplicación para diseño de proteínas con cadena principal fija
* [[Application Documentation]]: Página de inicio de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
* [RiboKit](http://ribokit.github.io/): Paquetes de modelado y análisis de RNA mantenidos por el laboratorio Das
