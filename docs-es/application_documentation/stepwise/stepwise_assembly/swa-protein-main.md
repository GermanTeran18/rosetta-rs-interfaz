#Construcción enumerativa de un loop de proteína [parte del modelado por ensamblaje stepwise]

Metadatos
========

Autor: Rhiju Das

Escrito en 2013. Última actualización: abril de 2013, por Rhiju Das (rhiju [at] stanford.edu).

Código y demo
=============

El código central de la aplicación *swa\_protein\_main* está en `       src/apps/swa/protein/swa_protein_main.cc      ` y en varios archivos de `       src/protocols/swa/      ` .

Para una demo "mínima", consulta:

`       demos/public/swa_protein_main/      `

Referencias
==========

Das, R. (2013) "Atomic-accuracy prediction of protein loop structures enabled by an RNA-inspired ansatz", PLoS ONE 8(10): e74830. doi:10.1371/journal.pone.0074830 [Enlace](http://dx.doi.org/10.1371/journal.pone.0074830)

Consulta también:

Sripakdeevong, P., Kladwang, W., and Das, R. (2011) "An enumerative stepwise ansatz enables atomic-accuracy RNA loop modeling", PNAS 108:20573-20578. [Artículo](http://www.stanford.edu/~rhiju/Sripakdeevong_StepwiseAnsatz_2011.pdf) [Enlace](http://dx.doi.org/10.1073/pnas.1106516108)

Propósito de la aplicación
===========================================

Este código sirve para obtener modelos tridimensionales de novo de segmentos de proteína con precisión atómica, sin necesidad de información de entrada de las cadenas laterales circundantes. Se ha probado en aplicaciones de modelado de loops en modelado ab initio y comparativo. Se está ampliando para refinar y encontrar configuraciones alternativas de segmentos de proteína problemáticos en cristalografía, y para crear modelos de novo de proteínas completas.

**Se ha desarrollado una versión más rápida y fácil de este método, llamada Monte Carlo stepwise, descrita [[aquí|stepwise]]**

Algoritmo
=========

El algoritmo construye un loop de novo enumerando los ángulos phi, psi y omega; cerrando la cadena con CCD; empaquetando las cadenas laterales de todas las configuraciones 'razonables'; y minimizando las configuraciones agrupadas de menor energía resultantes. Debería dar una enumeración completa de la cadena principal para un loop de hasta 5 residuos de longitud.

Limitaciones
===========

-   Esta demo es para loops cortos (\<6 residuos), en los que la enumeración completa se puede hacer en un solo trabajo de Rosetta. Ejecutar el 'ensamblaje StepWise' en un loop más largo requiere un flujo de trabajo más complejo que construye el loop por todos los caminos posibles de construcción residuo a residuo. Este flujo de trabajo completo se describe en documentación aparte; consulta [[Construcción enumerativa de un loop de proteína mediante recursión sistemática|swa-protein-long-loop]].

-   Como en la mayoría de los demás modos de Rosetta, no se garantiza que el conjunto final de modelos sea un conjunto de Boltzmann. Sin embargo, se espera que los modelos generados *sean* un conjunto completo de las configuraciones de menor energía que resultan de una búsqueda razonablemente completa del espacio conformacional.

-   No se está realizando minimización ni muestreo de tau [ángulo de enlace CA].

Modos
=====

Se describirán los siguientes modos:

-   Modelado de loops [ `        -rebuild       ` ]. Es el propósito principal de la aplicación.

-   Agrupamiento [ `        -cluster       ` ]. Útil en la etapa final del modelado.

-   Preempaquetado (avanzado). Este modo prepara cadenas laterales iniciales en modelos de partida sin cadenas laterales. Puede ser importante si quieres comparar energías y configuraciones de cadenas laterales entre distintas estrategias de modelado de loops; lo mejor es partir de los mismos preempaquetados iniciales.

Archivos de entrada
===========

Archivos requeridos
-------------

Solo necesitas dos archivos de entrada para ejecutar el modelado de loops con `       swa_protein_main      `:

-   El [[archivo fasta|fasta file]]: es el archivo de secuencia de tu modelo completo (proteína más loop construido).

-   El archivo PDB de entrada. No hay problema en introducirlo sin cadenas laterales y sin loops. También puedes incluir un loop de partida (sus longitudes y ángulos de enlace se usarán para todos los modelos).

Archivos adicionales opcionales:
--------------------------

-   Un archivo PDB nativo, si quieres RMSD de CA, de la cadena principal y de todos los átomos pesados.
-   Un archivo de disulfuros. ¡Importante para el empaquetado de cadenas laterales! Cada línea debe contener dos números por cada par de residuos unidos por un puente disulfuro.

Cómo incluir estos archivos.
---------------------------

Una línea de comando de ejemplo es la siguiente:

```
swa_protein_main -rebuild  -s1 noloop5-8_2it7_stripsidechain.pdb   -input_res1 1-4 9-28   -sample_res 5 6  -bridge_res 7 8  -cutpoint_closed 7 -superimpose_res 1-4 9-28  -fixed_res 1-4 9-28   -calc_rms_res 5-8  -jump_res 1 28  -ccd_close  -out:file:silent_struct_type binary  -fasta 2it7.fasta  -n_sample 18  -nstruct 400  -cluster:radius 0.100  -extrachi_cutoff 0  -ex1  -ex2  -score:weights score12.wts  -pack_weights pack_no_hb_env_dep.wts  -in:detect_disulf false  -add_peptide_plane  -native 2it7.pdb  -mute all  -out:file:silent 2it7_rebuild.out -disulfide_file 2it7.disulf
```

Observa que `       1-4 9-28      ` es una abreviatura permitida de `       1 2 3 4 9 10 11 ... 28      ` . Ten en cuenta que la numeración se refiere a los números del modelo completo, cuya secuencia se especifica en el archivo .fasta.

El código tarda unos 2 minutos en generar unos 90 modelos de loops. Obtenemos un 'silent file' con todos los modelos, `       2it7_rebuild.out      ` .

Para extraer modelos de un silent file, puedes usar el comando habitual de Rosetta `       extract_pdbs      `:

```
extract_pdbs -in:file:silent 2it7_rebuild.out -tags S_0
```

Supongamos que queremos agrupar estos modelos de forma más gruesa, por ejemplo a 1 Angstrom de RMSD, lo que sería apropiado para casos de precisión atómica. Esta es la línea de comando:

```
swa_protein_main -cluster_test -in:file:silent 2it7_rebuild.out  -cluster:radius 1.0  -calc_rms_res 5-8 -out:file:silent 2it7_CLUSTERED.out  -score_diff_cut  20.000
```

El archivo de salida tiene algunos REMARKS que describen las etiquetas de origen y el nombre del archivo agrupado. El agrupamiento funciona recorriendo los modelos por orden de energía; si un modelo difiere más que el umbral de RMSD de los clústeres existentes, genera un clúster nuevo.

Salidas esperadas
================

De la ejecución anterior obtenemos un 'silent file' con todos los modelos, `       2it7_rebuild.out      ` .

Tras el agrupamiento, obtenemos un archivo `       2it7_CLUSTERED.out      `

Opciones
=======

```
Required:
-rebuild [or -cluster_test]                      Mode of loop building.
-fasta                                           Fasta-formatted sequence file. [File]
-s1  [or -silent1 and -tags1]                    Input PDB or decoy from silent file with starting model [File]
-input_res1                                      Which residues are given in input file. [IntegerVector]

Required for rebuilding internal loops:
-bridge_res                                      Residues whose phi, psi torsions will be optimized during loop closure.  [IntegerVector]
                                                 Must specify exactly 3 positions if using analytical loop closure (KIC-style).
-jump_res                                        Pair of residues across which to specify jump.  [IntegerVector]
                                                 First and last residues in protein are reasonable choices.

Recommended for -rebuild:
-ccd_close                                       Use CCD instead of analytical loop closure. Now strongly suggested!
-n_sample                                        Number of 'rotamers' in phi or psi torsion angles. Default is 18, corresponding to
                                                  360/18 = 20 degree increments [Integer]
-fixed_res                                       Residues that should not move upon backbone minimization.  [IntegerVector]
                                                  Typically give the non-loop residues here.
-out:file:silent                                 Name of output file [scores and torsions, compressed format]. default="default.out" [String]
-out:file:silent_struct_type                     You should specify this as "binary" for most modeling cases, to retain information on non-ideal bond
                                                  lengths and bond angles.
-nstruct                                         Maximum number of models to make. default: 400. [Integer]
-in:native                                       Native PDB filename. [File].
-superimpose_res                                 Which residues to superimpose over before calculating RMSD.  [IntegerVector]
-rmsd_res                                        Which residues to calculated RMSD over.  [IntegerVector]
-cluster:radius                                  How finely to cluster loops (based on backbone RMSD) before minimizing and again
                                                  before output. In Angstroms. Default 0.25 A, but use 0.1 A to reach atomic accuracy. [Real]
-extrachi_cutoff                                 How many neighbors a residue must have before using the full rotamer list ('extrachi').
                                                  suggest setting to zero to get complete sampling. [Integer]
-ex1                                             Generate extra rotamers to generate at chi1 level. Recommended.
-ex2                                             Generate extra rotamers to generate at chi2 level. Recommended.
-pack_weights                                    Energy function to use in side-chain packing and first energy filter. Recommended:
                                                   pack_no_hb_env_dep.wts, which lowers fa_rep, increases side-chain hbonds, and turns
                                                   off weaker Hbonds for surface-exposed residues. [File]
-score:weights                                   Energy function to use in minimization & final scoring. Recommended: score12.wts. [File]
-in:detect_disulf                                Specify as false to avoid weird errors with input proteins with potential disulfides.
-disulfide_file                                  Specify disulfide-bonded pairs explicitly, including any involving loop residues.
-add_peptide_plane                               Adds methyl group to N-terminal of second loop fragment to simulate preceding Calpha, and
                                                    carbon to C-terminal of first loop fragment to simulate next Calpha (acetylation).
                                                    These additions permit sampling and optimization of 'edge' phi and psi torsions.

Less commonly used:
-s2  [or -silent2 and -tags2]                    Input PDB or decoy from silent file with second starting model. These will be 'combined'
                                                   with models specified by -s1. [File]
-input_res2                                      Which residues are given in second input file. [IntegerVector]


Used in clustering:
-cluster_test                                    Cluster models [supply this instead of -rebuild]
-silent_read_through_errors                      Useful in big runs in the rare cases that silent files have some kind of errors due to concatenation.
-score_diff_cut                                  How far up to go in energy, compared to lowest energy model in file.

Used in prepack mode:
-use_packer_instead_of_rotamer_trials            Do full side-chain combinatorial optimization, not just one-by-one rotamer trials of residues.
```

Consejos
====

¿Qué significan las puntuaciones?
------------------------

Los componentes de la puntuación son los de la función de energía estándar de proteínas ('score12'), con las siguientes adiciones:

```
all_rms                                          all-heavy-atom RMSD to the native structure in loop (specified by -rms_res)
backbone_rms                                     RMSD over C, CA, N, O to the native structure in loop (specified by -rms_res)
rms                                              RMSD over CA to the native structure in loop (specified by -rms_res)
score_orig                                       Score before minimization [you probably won't use this.]
nclust                                           How many models went into cluster [not in use]
```

¿Cómo hago un preempaquetado?
-----------------

Si tomas un PDB creado fuera de Rosetta, choques muy pequeños pueden ser penalizados con fuerza por el potencial de todos los átomos de Rosetta. En lugar de puntuar, probablemente convenga hacer una minimización corta; ejecuta:

```
swa_protein_main  -rebuild  -s1 noloop5-8_2it7_stripsidechain.pdb   -input_res1 1-4 9-28  -superimpose_res 1-4 9-28  -fixed_res 1-4 9-28   -calc_rms_res 5-8  -jump_res 1 28   -out:file:silent_struct_type binary  -fasta 2it7.fasta  -n_sample 18  -nstruct 400  -cluster:radius 0.100  -extrachi_cutoff 0  -ex1  -ex2  -score:weights score12.wts  -pack_weights pack_no_hb_env_dep.wts  -in:detect_disulf false  -add_peptide_plane  -native 2it7.pdb  -mute all   -out:file:silent noloop5-8_2it7_prepack.out  -disulfide_file 2it7.disulf -use_packer_instead_of_rotamer_trials
```

Cómo incluir restricciones
---------------------

Puede ser útil, en ejecuciones que refinan una estructura (por ejemplo, la estructura experimental) o en modelado por homología, para mantenerse cerca de una estructura de partida. Puedes generar un archivo de restricciones así:

```
generate_CA_constraints.py 2it7.pdb -cst_res 5-8 -coord_cst -anchor_res 1 -fade > 2it7_coordinate2.0.cst
```

Este script de Python está disponible en `       rosetta/tools/SWA_protein_python/generate_dag/      `

Para incorporarlo al modelado de loops anterior, incluye en la línea de comando de `       swa_protein_main      ` la opción `       -cst_file2it7_coordinate2.0.cst      `

Novedades desde la última versión
=============================

Esta documentación se ha añadido al mismo tiempo que la publicación de la demo [después de Rosetta 3.5].

* [[Modelado de loops de RNA con ensamblaje stepwise|swa-rna-loop]]
* [[Aplicación Stepwise MonteCarlo|stepwise]]
* [[Visión general de las clases de Stepwise|stepwise-classes-overview]]
* [[Structure prediction applications]]: Incluye enlaces a estas y otras aplicaciones de modelado de loops
* [[RosettaScripts]]: La página de inicio de RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
