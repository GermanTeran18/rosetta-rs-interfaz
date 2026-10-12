#Rna Denovo: modelado de estructura 3D de RNA

#Aviso de obsolescencia

Desde mediados de 2020, la mejor opción para el modelado de RNA completo con ensamblaje de fragmentos es [[FARFAR2]], que usa el mismo ejecutable y muchas de las mismas opciones. FARFAR2 aporta un nuevo conjunto de valores por defecto y algunos cambios de comportamiento, por lo que esta documentación estará algo desactualizada. 

#Propósito de la aplicación
Producir modelos <i>de novo</i> de motivos pequeños de RNA mediante ensamblaje de fragmentos de RNA con refinamiento de todos los átomos (FARFAR, por sus siglas en inglés).

Ten en cuenta que la mayor parte de la funcionalidad de rna_denovo/FARFAR está disponible ahora en un [servidor ROSIE FARFAR](http://rosie.rosettacommons.org/rna_denovo), si quieres hacer algunas pruebas sencillas.

#Código y demo


El código central de la aplicación *rna\_denovo* está en `       src/protocols/rna/RNA_DeNovoProtocol.cc      ` .

Para un ejemplo de demo "mínimo" del protocolo de ensamblaje de fragmentos de RNA y minimización de todos los átomos, con sus archivos de entrada, consulta

`       demos/public/RNA_Denovo      `

#Referencias
Cheng, C.Y., Chou, F.-C., and Das, R. (2015) "Modeling complex RNA tertiary folds with Rosetta." Methods in Enzymology 553:35-64 [Artículo.](https://daslab.stanford.edu/site_data/pub_pdf/2015_Cheng_MethEnzym.pdf) [Enlace.](http://www.sciencedirect.com/science/article/pii/S0076687914000524)

Das, R., Karanicolas, J., and Baker, D. (2010), "Atomic accuracy in predicting and designing noncanonical RNA structure". Nature Methods 7:291-294. [para el refinamiento de alta resolución] [Artículo.](http://www.stanford.edu/~rhiju/DasKaranicolasBaker2010ALL.pdf) [Enlace.](http://www.nature.com/nmeth/journal/v7/n4/abs/nmeth.1433.html)


#Propósito de la aplicación

Este código sirve para obtener modelos tridimensionales de novo de RNA de cadena sencilla o de motivos de RNA de varias cadenas, con la perspectiva de alcanzar una precisión alta (casi a resolución atómica). La aplicación encaja en los flujos de trabajo de modelado 3D de RNA descritos en el sitio de [Ribokit](https://ribokit.github.io/).

#Algoritmo

El algoritmo de modelado de estructura de RNA de Rosetta se basa en el ensamblaje de fragmentos cortos (de 1 a 3 nucleótidos) tomados de estructuras cristalinas de RNA existentes, cuyas secuencias coinciden con subsecuencias del RNA objetivo. El algoritmo de ensamblaje de fragmentos de RNA (FARNA) es un proceso de Monte Carlo guiado por una función de energía de baja resolución basada en conocimiento. Después, los modelos se pueden refinar con un potencial de todos los átomos para obtener estructuras más realistas, con enlaces de hidrógeno más limpios y menos choques; las energías resultantes también discriminan mejor las conformaciones similares a la nativa de las no nativas. Al protocolo de dos pasos se le ha llamado FARFAR (Fragment Assembly of RNA with Full Atom Refinement).

#Limitaciones


-   Se ha demostrado que este método alcanza precisión atómica para motivos pequeños (12 residuos o menos); el cuello de botella actual para RNA más grandes es la dificultad de lograr un muestreo conformacional completo (como en otras aplicaciones de Rosetta, por ejemplo el modelado de novo de proteínas). Hay trabajo en curso para resolver este problema, pero exige un gran costo computacional (consulta [[stepwise]]).

-   Para RNA más grandes, lo más eficiente parece ser hacer solo el ensamblaje de fragmentos sin refinamiento, especificando la estructura secundaria (como se describe más abajo). Aunque es improbable alcanzar precisión atómica, se pueden lograr modelos precisos a resolución de nucleótido o de hélice, sobre todo con restricciones experimentales. Consulta también: [[Ensamblaje de RNA con restricciones experimentales por pares|rna-assembly]] y, más actualizado, [[Preparación de RNA de novo|rna-denovo-setup]].

-   Como en la mayoría de los demás modos de Rosetta, no se garantiza que el conjunto final de modelos sea un conjunto de Boltzmann. Se está avanzando en esa dirección para RNA con la aplicación [[recces]].

#Modos


-   Por defecto, el código ejecuta un ensamblaje de fragmentos con Monte Carlo, optimizado en un potencial de baja resolución basado en conocimiento.

-   Se recomienda encarecidamente ejecutar con "-minimize\_rna", que permite el refinamiento en el potencial de alta resolución de Rosetta y da modelos con pocos choques estéricos y enlaces de hidrógeno más "limpios".

-   Hay variantes del código que permiten solo puntuar o solo minimizar en el potencial de alta resolución de Rosetta. Se describen más abajo en Consejos.

#Archivos de entrada


##Archivo requerido

FARNA (rna_denovo) puede aceptar la secuencia y la estructura secundaria desde la línea de comando y no requiere ningún archivo. Sin embargo, usar archivos de entrada puede ayudar a organizar las ejecuciones.

##Archivos adicionales opcionales:

-   El [[archivo fasta|fasta file]]: es un archivo de secuencia de tu RNA. Sus líneas de encabezado también pueden especificar las cadenas y la numeración de las estructuras de salida. IMPORTANTE: el archivo fasta se lee con la maquinaria general de Rosetta para analizar archivos fasta, que supone proteína para las letras mayúsculas. Por eso, usa letras minúsculas para los residuos de RNA.

-   El [[archivo de estructura secundaria|rna-secondary-structure-file]]: contiene la estructura secundaria del RNA en notación punto-paréntesis, si se conoce.

-   Un archivo PDB nativo, si quieres RMSD de todos los átomos pesados. Debe estar en el [formato PDB de Rosetta para RNA](#File-Format).

##Cómo incluir estos archivos.

Una línea de comando de ejemplo es la siguiente:

```
rna_denovo.<exe> -sequence "ucaggu aagcag" -secstruct "(....( )....)" -nstruct 2 -out:file:silent test.out -minimize_rna 
```

o, si quieres aportar la secuencia y la estructura secundaria en archivos:

```
rna_denovo.<exe> -fasta chunk002_1lnt_.fasta -secstruct_file chunk002_1lnt_.secstruct -nstruct 2 -out:file:silent test.out -minimize_rna 
```

El código tarda cerca de 1 minuto en generar dos modelos.

El archivo fasta tiene el nombre del RNA en la primera línea (después de \>) y la secuencia en la segunda. Las letras válidas son a, c, g y u. **Importa si son mayúsculas o minúsculas**: usa letras minúsculas para especificar residuos de RNA. Hay archivos fasta y secstruct de ejemplo en `demos/public/rna_denovo` .

#Opciones
## Opciones de uso frecuente
```
-in:fasta                                        Fasta-formatted sequence file. [FileVector]
-sequence                                        Sequence on command line (put in quotes; fasta input is preferred)
-secstruct_file                                  RNA sec struct to model in dot-parens notation
-secstruct                                       RNA sec struct on command line (put in quotes;  
                                                  secstruct_file input is preferred)
-out:file:silent                                 Name of output file [scores and torsions, compressed format]. default="default.out" [String]
-in:native                                       Native PDB filename. [File].
-out:nstruct                                     Number of models to make. default: 1. [Integer]
-minimize_rna                                    High resolution optimize RNA after fragment assembly.[Boolean]
-vary_geometry                                   Vary bond lengths and angles (with harmonic constraints near Rosetta ideal) for backbone and sugar degrees of freedom [Boolean]
```
## Opciones útiles
```
-cycles                                          Number of Monte Carlo cycles.[default 10000]. [Integer]
-bps_moves                                       Base pair step moves. For adjacent base pairs within stems or that are
                                                 obligate pairs, draw sequence-matched fragments that encompass both
                                                 pairs. Adjacent means that base pairs have contiguous residues on one 
                                                 strand, and at most 3 intervening residues on the other.   
-output_lores_silent_file                        If high resolution minimizing, output intermediate low resolution models. [Boolean]
-dump                                            Generate pdb output. [Boolean]
-vall_torsions                                   Source of RNA fragments. [default: 1jj2.torsions]. [Boolean]
-jump_library_file                               Source of base-pair rigid body transformations if base pairs are specified.
                                                   [default: 1jj2_RNA_jump_library.dat] [String]
-obligate_pair                                   Residue pairs that must form a base pair (possibly non canonical)
-secstruct_general                               Specification of -obligate_pair in dot-parens format
-obligate_pair_explicit                          Residue pairs that must form a base pair, with  specification of base 
                                                   edges (W/H/S/X) and orientation (A/P/X for antiparallel/
                                                   parallel/unknown; C/T/X allowed too for cis/trans)

-cst_file                                        Specify constraints (typically atom pairs) in Rosetta-style constraint file. [String]
-output_lores_silent_file                        if doing full-atom minimize, also save models after fragment assembly but before refinement (file will be called *.LORES.out) [Boolean]
-dump                                            output pdbs that occur during the run, even if using silent file output.
```
## Opciones avanzadas
```
Advanced 
-s                                               Input PDBs to be used as fixed 'chunks' in fragment assembly
-in:file:silent                                  List of input files (in 'silent' format) that specify potential template structures or 'chunks'
-input_res                                       Positions at which 'chunks' are applied. If there is more than one chunk file, specify indices for
                                                   the first file and then the second file, etc.
                                                 (Used to be called -chunk_res.)
-fixed_stems                                     Seed each stem with a Watson-Crick base pair 
                                                  instead of having the strands find each other
-cutpoint_closed                                 Positions at which to force transient chainbreaks (may be needed
                                                  if you get fold-tree errors)
-cutpoint_open                                   Positions at which strands end (better to specify separate strands
                                                  in FASTA file, or with spaces between strings in sequence)
-data_file                                       RDAT or legacy-format file with RNA chemical mapping data
```

## Opciones que normalmente no se usan (por completitud)
```
-filter_lores_base_pairs                         Filter for models that satisfy structure parameters. [Boolean] True by default.
-params_file                                     RNA params file name.[String]. For Example: -params_file chunk002_1lnt_.prm
                                                  Deprecated by -working_res option above.
-in:database                                     Path to rosetta databases. Default is based on location of rosetta executables. [PathVector]
-output_res_num                                  Numbering (and chain) of residues in output PDB or silent file. 
                                                  Better to specify in headers in .fasta file.
-staged_constraints                              Apply constraints in stages depending on sequence separation
-close_loops                                     Attempt closure across chainbreaks by cyclic coordinate descent after fragment moves [Boolean] Defaults to true.
```
#Consejos


##Formato de archivo 
<a name="File-Format" />

Ten en cuenta que en versiones antiguas de Rosetta, los PDB pueden tener los tipos de residuo marcados como rA, rC, rG y rU y nombres de átomo inusuales. Las versiones de Rosetta posteriores a la 3.5 usan nombres de residuos y átomos que coinciden con la nomenclatura estándar de BMRB/NDB. Si tienes un archivo PDB "estándar", hay un script de Python para convertirlo al formato actual de Rosetta:

```
tools/rna_tools/bin/make_rna_rosetta_ready.py <pdb file>
```

##¿Puedo especificar pares que no sean Watson-Crick? 
<a name="Can-I-specify-non-Watson-Crick-pairs?" />

También puedes especificar pares de bases que deben forzarse, incluso a costa de crear cortes de cadena temporales, en el archivo params, con una opción como

```
-obligate_pair_explicit 2 11 W W A
```

Esto permite también especificar pares de bases que no son Watson-Crick. En la línea anterior puedes cambiar las W por H (borde Hoogsteen) o S (borde del azúcar), y la A por P (de antiparalelo a paralelo). Los bordes de las bases son esencialmente los mismos que se definen en la clasificación de Leontis y Westhof. Lo segundo (A/P) se determina por la orientación relativa de las normales de las bases. [La clasificación cis/trans de Leontis y Westhof sería una alternativa a A/P, pero nos pareció que A/P es más cómoda de calcular y de evaluar visualmente. Puedes indicar C/T para cis/trans y se convertirá mediante una tabla de consulta.] Los pares de bases se toman de una biblioteca de pares de bases extraída del modelo cristalográfico de la subunidad ribosomal grande 1JJ2.

Al especificar pares, si no hay suficientes cortes de cadena para que se formen todos los pares, el código intentará elegir una suite de RNA (que no sea de un tallo) donde poner un punto de corte, que se puede cerrar durante el ensamblaje de fragmentos con la opción -close\_loops. Si quieres preespecificar dónde se elegirá este punto de corte, añade una opción como

```
-cutpoint_closed 6
```
##Uso de fuentes alternativas de fragmentos


Por defecto, el ensamblaje de fragmentos de RNA usa torsiones de enlace derivadas de la estructura cristalina de la subunidad ribosomal grande 1jj2, que se extrajeron de antemano en 1jj2.torsions (disponible en la base de datos). Si quieres usar torsiones tomadas de otro PDB (o conjunto de PDB), el siguiente comando hace el trabajo.

```
rna_database.<exe>  -vall_torsions -s my_new_RNA1.pdb my_new_RNA2.pdb -o my_new_set.torsions
```

El archivo resultante es solo un archivo de texto con los ángulos de torsión del RNA enumerados para cada residuo. Luego, al crear modelos, usa la siguiente opción con la aplicación rna\_denovo:

```
-vall_torsions my_new_set.torsions
```

De forma similar, la base de datos de geometrías de pares de bases se puede crear con `rna_database -jump_library` y luego especificarse en la aplicación rna\_denovo con `-jump_library_file`.

Por último, una base de datos de geometrías de pasos de pares de bases (consulta [más abajo](#Can-I-use-base-pair-steps?)) se puede crear con `rna_database -bps_database`. Por defecto, esto crea archivos para los pasos de pares de bases canónicos estándar. Para analizar también los pasos de pares de bases no canónicos, usa `-general_bps`; y `-use_lores_base_pair_classification` capta todos los pares, incluidos los que se mantienen en su sitio por contactos base-fosfato pero sin enlaces de hidrógeno base-base (como ocurre en el loop sarcina/ricina). 

##¿Puedo usar fragmentos que aprovechen nuestra rica base de datos de apareamientos de bases? 
<a name="Can-I-use-base-pair-steps?" />

Sí: con la opción `-bps_moves` puedes pedir a la aplicación que intente tomar de una base de datos de "pasos de pares de bases". Hay dos tipos de estos pasos. 

Primero, en los tallos (especificados por el archivo de estructura secundaria), los pares de bases adyacentes forman pasos de pares de bases que involucran cuatro nucleótidos (i,i+1,j,j+1), donde (i,j+1) e (i+1,j) están apareados. Hay un conjunto de estos pasos en la base de datos de Rosetta, extraído del ribosoma. El fold tree del RNA se preparará con las conexiones de salto y los puntos de corte adecuados para poder sustituir esas conformaciones de paso de bases durante el ensamblaje de fragmentos.

Segundo, si has especificado pares obligados, pero con bordes y orientaciones de apareamiento desconocidos ('X' en el archivo params), se prepararán fragmentos especiales para esos pares que involucren nucleótidos adyacentes en la secuencia. Por ejemplo, si tu archivo params contiene una opción como:
```
-secstruct_general .((....)..).
```
o 
```
-obligate_pair 2 11  3 8 
```
usar la opción `-bps_moves` activará movimientos que sustituyen fragmentos con la misma secuencia para los nucleótidos en (2,3,8,11). Esto ocurre si, en al menos una cadena, el paso de pares de bases involucra residuos inmediatamente contiguos (2 y 3 en este ejemplo). En la otra cadena, el paso de pares de bases debe involucrar residuos contiguos o con no más de 3 residuos de "protuberancia" intermedios (8 y 11 en este ejemplo). Ten en cuenta que estos pasos de pares de bases suelen incluir pares no canónicos.  Hay una demo de esta funcionalidad aplicada al modelado del loop sarcina/ricina en `demos/public/RNA_Denovo_with_base_pair_steps/`

Nota: para los pares no canónicos, por ahora no permitimos especificar bordes y orientaciones: con ese nivel de especificación la base de datos queda muy escasa. Ten en cuenta también que, si hay un paso de pares de bases que incluye un par dentro de un tallo Watson/Crick y un "par obligado" más general, el apareamiento del tallo puede acabar siendo no Watson-Crick, lo cual ocurre a menudo de todos modos con los pares de bases en el borde de los tallos.


##¿Qué significan las puntuaciones?

Una pregunta frecuente: ¿qué significan los términos de las "líneas SCORE" de los silent files? Aquí va un resumen breve; hay más explicación en el artículo de Das de 2010 citado arriba.

```
***Energy interpreter for low resolution silent output:
score                                              Final total score
rna_rg                                           Radius of gyration for RNA
rna_vdw                                          Low resolution clash check for RNA
rna_base_backbone                                Bases to 2'-OH, phosphates, etc.
rna_backbone_backbone                            2'-OH to 2'-OH, phosphates, etc.
rna_repulsive                                    Mainly phosphate-phosphate repulsion
rna_base_pair_pairwise                           Base-base interactions (Watson-Crick and non-Watson-Crick)
rna_base_pair                                    Base-base interactions (Watson-Crick and non-Watson-Crick)
rna_base_axis                                    Force base normals to be parallel
rna_base_stagger                     Force base pairs to be in same plane
rna_base_stack                                   Stacking interactions
rna_base_stack_axis                              Stacking interactions should involve parallel bases.
atom_pair_constraint                             Harmonic constraints between atoms involved in Watson-Crick base
                                                 pairs specified by the user in the params file
rms                                              all-heavy-atom RMSD to the native structure

***Energy interpreter for fullatom silent output:
score                                            Final total score
fa_atr                                           Lennard-jones attractive between atoms in different residues
fa_rep                                           Lennard-jones repulsive between atoms in different residues
fa_intra_rep                                     Lennard-jones repulsive between atoms in the same residue
lk_nonpolar                                      Lazaridis-karplus solvation energy, over nonpolar atoms
hack_elec_rna_phos_phos                          Simple electrostatic repulsion term between phosphates
hbond_sr_bb_sc                                   Backbone-sidechain hbonds close in primary sequence
hbond_lr_bb_sc                                   Backbone-sidechain hbonds distant in primary sequence
hbond_sc                                         Sidechain-sidechain hydrogen bond energy
ch_bond                                          Carbon hydrogen bonds
geom_sol                                         Geometric Solvation energy for polar atoms
rna_torsion                                      RNA torsional potential.
atom_pair_constraint                             Harmonic constraints between atoms involved in Watson-Crick base pairs
                                                 specified by the user in the params file
angle_constraint                                 (not in use)

N_WC                                             number of watson-crick base pairs
N_NWC                                            number of non-watson-crick base pairs
N_BS                                             number of base stacks

[Following are provided if the user gives a native structure for reference]
rms                                              all-heavy-atom RMSD to the native structure
rms_stem                                         all-heavy-atom RMSD to helical segments in the native structure, defined by 'STEM' entries in the parameters file.
f_natWC                                          fraction of native Watson-Crick base pairs recovered
f_natNWC                                         fraction of native non-Watson-Crick base pairs recovered
f_natBP                                          fraction of base pairs recovered
```

##¿Cómo solo puntúo?
<a name="How-do-I-just-score?" />

Para obtener la puntuación de un PDB de entrada, puedes ejecutar el protocolo 'denovo' pidiendo que no haya ciclos de ensamblaje de fragmentos ni rondas de minimización:

```
rna_score.<exe> -database <path to database>  -s <pdb file> [<pdb file 2> ...] -out:file:silent SCORE.out  [-native <native pdb>]
```

Si quieres minimizar con el potencial de RNA de baja resolución (usado en FARNA), añade la opción '-score:weights rna\_lores.wts'. Luego puedes revisar la puntuación en SCORE.out:

```
 grep SCORE SCORE.out
```

Pero esto no se recomienda si intentas puntuar un modelo depositado en el PDB o creado con otro software; consulta la siguiente sección, [¿Cómo solo minimizo?](#How-do-I-just-minimize?)

##¿Cómo obtengo solo los RMSD respecto de una nativa?

`rna_score` puede tomar tus modelos (en formato 'silent') y calcular el RMSD de todos los átomos pesados conservando todos los términos de energía de la ejecución. Prueba:

```
rna_score -just_calc_rmsd -in:file:silent <input file > -out:file:silent <output file> -native <native PDB>
```

##¿Cómo solo minimizo? 
<a name="How-do-I-just-minimize?" />

Si tomas un PDB creado fuera de Rosetta, choques muy pequeños pueden ser penalizados con fuerza por el potencial de todos los átomos de Rosetta. En lugar de puntuar, probablemente convenga hacer una minimización corta; ejecuta:

```
rna_minimize.<exe> -database <path to database>  -s <pdb file> [<pdb file 2> ...] -out:file:silent MINIMIZE.out  [-native <native pdb>]
```

Si quieres minimizar con el potencial de RNA de baja resolución (usado en FARNA), añade la opción '-score:weights rna\_lores.wts'. Luego revisa las puntuaciones en MINIMIZE.out.

```
 grep SCORE MINIMIZE.out
```

Puedes extraer modelos de los silent files como se describe en [Extracción de modelos a formato PDB](#Extraction-Of-Models-Into-PDB-Format), pero además obtendrás modelos con los mismos nombres que tu entrada y el sufijo '\_minimize.pdb'.

##Otras opciones

Para construir modelos de RNA más grandes, consulta estas secciones: [[Ensamblaje de RNA con restricciones experimentales por pares|rna-assembly]] y [[Preparación de RNA denovo|rna-denovo-setup]].

#Posprocesamiento

##Extracción de modelos a formato PDB
<a name="Extraction-Of-Models-Into-PDB-Format" />

Los modelos de la ejecución anterior se guardan en formato comprimido en el archivo test.out, junto con líneas que representan los componentes de la puntuación. Puedes ver los modelos en formato PDB con el comando de conversión.

```
rna_extract.<exe>  -in:file:silent test.out -in:file:silent_struct_type  rna -database <path to database>
```

##¿Cómo puedo agrupar modelos?
<a name="How-can-I-cluster-models?" />

Hay un ejecutable para el agrupamiento; por ahora exige que todos los modelos estén en un silent file y tengan puntuaciones. (Si no tienes un silent file así, usa el ejecutable rna\_score descrito en [¿Cómo solo puntúo?](#How-do-I-just-score?) ). Esta es la línea de comando:

```
 rna_cluster.<exe>   -database <path to database>    -in:file:silent <silent file with models> -out:file:silent <silent file with clustered models>   [-cluster:radius <rmsd threshold>] [-nstruct <maximum number of clusters>]
```

El agrupamiento funciona recorriendo los modelos por orden de energía; si un modelo difiere más que el umbral de RMSD de los clústeres existentes, genera un clúster nuevo.

#Novedades desde la última versión

Escrito en 2008. 

Últimas actualizaciones: noviembre de 2011 y agosto de 2014, por Rhiju Das (rhiju [at] stanford.edu).
Se añadieron las aplicaciones rna\_minimize, rna\_helix, rna\_cluster. Se actualizó el potencial de torsión para que sea suave.

En 2015-2016 se está llevando a cabo una refactorización interna. [[Enlace al plan|farna-refactor]] (solo para desarrolladores)

##Véase también

* [RiboKit](https://ribokit.github.io/workflows/3D_modeling/): Flujos de trabajo para el modelado 3D de RNA guiado por datos experimentales.
* [[RNA applications]]: La página de inicio de las aplicaciones de RNA
* [[Structure Prediction Applications]]: Lista de aplicaciones de predicción de estructura
* [[Application Documentation]]: Página de inicio de la documentación de aplicaciones
* [[RNA]]: Guía para trabajar con RNA en Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
* [RiboKit](http://ribokit.github.io/): Paquetes de modelado y análisis de RNA mantenidos por el laboratorio Das
