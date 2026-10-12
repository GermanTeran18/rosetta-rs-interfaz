#Modelado de Mg(2+)
==================================

Propósito de la aplicación
===========================================

Este código modela iones Mg(2+) en estructuras, incluidas las aguas de los hexahidratos. Tiene varios modos, que van desde orientar los «orbitales» de un Mg(2+) existente que definen su capa de hexahidratación hasta hacer docking de Mg(2+) (y las aguas asociadas) _de novo_ en la estructura.

Haz clic en el enlace de abajo para ver una película del empaquetado de las aguas mientras un Mg(2+) atraviesa una estructura:

[![Trayectoria de un Mg a través de un ARN, con empaquetado de aguas](http://img.youtube.com/vi/SRsyG85Jvsc/0.jpg)](http://www.youtube.com/watch?v=SRsyG85Jvsc)


Algoritmo
=========

La implementación actual del docking de Mg(2+) se basa en una búsqueda enumerativa en rejilla. 

El modelado de la capa de hidratación implica colocar 6 átomos virtuales que marcan las caras de un cubo de 2 Å con el Mg(2+) en su centro. Estos átomos marcan posiciones de «orbital» o de «campo de ligandos» donde podrían ir las seis aguas. La orientación de estos átomos virtuales y luego la colocación o eliminación de aguas cerca de esas posiciones se ha acelerado mediante heurísticas que reproducen la búsqueda enumerativa de esos grados de libertad.

Se han desarrollado funciones de puntuación tanto para el caso de agua explícita como para el de agua implícita. Esta última permite contactos del Mg(2+) mediados por agua con átomos aceptores. Consulta la sección sobre la función de puntuación más abajo.


Limitaciones
============

-   El poder predictivo de estos métodos aún no se ha probado bien. Estas clases deberían ser fáciles de incorporar a métodos de predicción y diseño de estructuras, como los marcos de [[ensamblaje de fragmentos|rna-denovo-setup]] o [[stepwise]].  La aplicación se hace pública para animar a otras personas dentro y fuera de la comunidad de Rosetta a ponerse en contacto con los desarrolladores si tienen casos de uso convincentes para el modelado de Mg(2+) _de novo_, p. ej., para hacer docking de Mg(2+) en estructuras experimentales o para diseñar sitios de unión de iones en sitios catalíticos.

-   No se ha realizado una calibración básica de los pesos de los términos de puntuación (más abajo se describen).

-   Parece probable que incorporar soluciones de la ecuación no lineal de Poisson-Boltzmann, que modela regiones de alto potencial electrostático debido a efectos de largo alcance, complementaría el código actual, que (al estilo clásico de Rosetta).

-   Aún no se ha probado en proteínas ni en interfaces ARN/proteína, aunque el código no debería tener (demasiadas) cosas específicas de ARN fijadas en el código.

Referencias
===========
Este trabajo no está publicado. Escribe a rhiju [at] stanford.edu para obtener información sobre cómo citar o ampliar el modelado de Mg(2+) de Rosetta.


Código y demo
=============

El código principal está disponible en el ejecutable `mg_modeler`, con el código fuente en `src/apps/public/magnesium/mg_modeler.cc`. 

Esta aplicación es básicamente un envoltorio sencillo de las clases `MgScanner` y `MgMonteCarlo`, que deberían ser fáciles de reutilizar en nuevas aplicaciones de predicción y diseño.

Los archivos de prueba y las líneas de comando de ejemplo están disponibles en las pruebas de integración:

```
       main/tests/integration/tests/mg_modeler      
       main/tests/integration/tests/mg_modeler_lores
```      

Archivos de entrada
===================

Necesitas una estructura de partida, en formato PDB, para ejecutar el modelado. Puede contener ya Mg(2+), que servirán como ubicaciones de referencia o posiciones desde las que perturbar. O puede no tener ningún ion Mg(2+) si intentas hacer docking de Mg(2+) _de novo_.

Cómo hacer docking de un Mg(2+)
===============================
Este es el modo de uso principal de mg_modeler.
Línea de comando de ejemplo (disponible en la prueba de integración; consulta la ruta de arriba):

```
mg_modeler -s arich_2r8s_RNA.pdb -out:file:silent arich_mg_hydrate.out -score:weights test_hires2.wts -pose_ligand_res 8
```

Esto lee `arich_2r8s_RNA.pdb`, que contiene el «núcleo de iones metálicos» del ARN en la región del bulto rico en A del dominio P4-P6 de la ribozima del grupo I de _Tetrahymena_. Se prueban las posiciones de Mg(2+) que están a distancia de contacto directo de cualquier átomo electronegativo (aceptor de enlaces de hidrógeno) del residuo 8 (especificado en `-pose_ligand_res`). Las ubicaciones de salida que pasan los filtros de puntuación predeterminados van a un silent file del ARN con el Mg(2+) y las aguas (especificado en `-out:file:silent`). 

Los modelos se pueden extraer del silent file a formato PDB con las utilidades de extracción habituales (consulta extract_lowscore_decoys.py en [[rna-denovo-setup]] o [[extract_pdbs]]).

Ten en cuenta que, durante el barrido, los dos iones Mg(2+) que hay en el PDB de entrada se eliminan (se pueden conservar si el usuario indica `-mg_res`). Sus posiciones se siguen usando para devolver valores de RMSD (calculados como la desviación de la posición del Mg(2+) modelado respecto al Mg(2+) más cercano de la estructura de referencia).

La película de la parte superior de la página muestra lo que ocurre en cada posición de la rejilla durante el docking, pero el Mg(2+) se barre a lo largo de una trayectoria lineal de juguete para facilitar la visualización. (Además, la película no muestra los pasos de minimización).

Otros modos
===========
En lugar de hacer docking («barrer») un Mg(2+) en la estructura, `mg_modeler` da acceso a tres de las funcionalidades componentes de `MgScanner`, sobre todo con fines de prueba, además de un modo piloto (bastante poco probado) para realizar muestreo Monte Carlo del Mg(2+) y las aguas asociadas.

####Modo componente 1. Orientar los marcos de campo de ligandos («orbitales») del Mg(2+)
Averigua dónde deben ir los átomos virtuales alrededor del Mg(2+) y los escribe como V1, V2, ... V6.
```
mg_modeler -fixup  -s 2R8S.pdb   -ignore_unrecognized_res -output_virtual
```
Para este ejemplo, puedes usar simplemente `2R8S.pdb` del PDB. La salida está en `2R8S.mg_fixup.pdb`.

####Modo componente 2. Empaquetar hidrógenos en las aguas existentes que ligan Mg(2+)
Averigua dónde deben ir los hidrógenos en las aguas que contactan con Mg(2+).
```
mg_modeler -pack_water_hydrogens  -s 2R8S.pdb   -ignore_unrecognized_res -output_virtual
```
Las aguas que no contactan con Mg(2+) se eliminan. La salida está en `2R8S.pack_water_hydrogens.pdb`.

La opción adicional `-scored_hydrogen_sampling` hace rotar el agua por todas las orientaciones posibles (mediante la fibración de Hopf de SO(3), eliminando las orientaciones relacionadas por simetría diedra; consulta `numeric/UniformRotationSampler.hh`) para encontrar por fuerza bruta la mejor posición, y elige la mejor orientación con alguna función de puntuación. En realidad, la heurística predeterminada hace un trabajo igual de bueno para encontrar hidrógenos razonables.

####Modo componente 3. Empaquetar aguas alrededor de los Mg(2+) existentes
Averigua dónde deben estar las aguas alrededor de cada Mg(2+):
```
mg_modeler -hydrate  -s 2R8S.pdb   -ignore_unrecognized_res -output_virtual
```
Elimina del PDB cualquier agua antes de hacer la hidratación. La salida está en `2R8S.hydrate.pdb`. 

La opción adicional '-all_hydration_frames' realiza una búsqueda por fuerza bruta sobre todos los marcos octaédricos para las aguas. De nuevo, usa la fibración de Hopf de SO(3), eliminando las orientaciones relacionadas por simetría octaédrica, y alguna función de puntuación de Rosetta; es muy lenta. De nuevo, la heurística predeterminada busca en un subconjunto más limitado de marcos octaédricos y parece hacer un trabajo igual de bueno al determinar la colocación de las aguas.

####Modo de muestreo alternativo. Muestrear la posición del Mg(2+) y del agua por Monte Carlo.

Se estuvo probando un modo en el que las aguas podrían colocarse mediante muestreo Monte Carlo, incluidos movimientos de añadir y eliminar aguas. Línea de comando de ejemplo:
```
time mg_modeler -monte_carlo -s mg.pdb -mute core -temperature 0.7 -constant_seed -output_virtual -cycles 10000  
```
donde `mg.pdb` tiene un único Mg(2+) en el origen. Dejé este modo ahí por diversión: la película parece una «fuente de agua»:

[![Fuente de agua con Mg](http://img.youtube.com/vi/zF0czzuurOI/0.jpg)](http://www.youtube.com/watch?v=zF0czzuurOI)

Probablemente se podría ampliar este modo para muestrear Mg y aguas moviéndose por una estructura, lo que a la larga podría ser útil para el muestreo térmico, etc., pero ahora mismo hay muchas cosas fijadas en el código (¡incluido, creo, que hay un Mg(2+) en el origen!).


Resumen de opciones
===================
Algunas opciones útiles de `mg_modeler`

```
Required:
-s                          Input PDB structure

Commonly used options:
-out:file:silent            silent file for output
-ligand_res                 in scan, look at positions near these residues 
                              (PDB numbering/chains)
   OR                         (If unspecified, search near all residues as 
                               potential ligands.)
-pose_ligand_res            similar to -ligand_res, but use pose number-
                               ing (1,2,..)
-mg_res                     supply PDB residue numbers of Mg(2+) to look 
                               at [leave blank to scan a new Mg(2+)]

Alternative modes
-lores_scan                 do not try hydration or minimization during scan 
                               [good for mg_point, mg_point_indirect score terms]
-fixup                      align the 6 octahedral virtual  'orbitals' for Mg(2+) 
                                specified by mg_res
-pack_water_hydrogens       test mode: strip out non-mg waters, align mg frames, 
                               pack mg waters for specified mg_res
-hydrate                    test mode: strip out waters and hydrate mg(2+) 
                               for specified mg_res
-monte_carlo                test mode: monte carlo sampling of Mg(2+) and 
                               surrounding waters

Advanced options
-minimize_during_scoring    minimize mg(2+) during scoring/hydration of each 
                              position (default: true)
-xyz_step                   increment in Angstroms for xyz scan (default 0.5)
-score_cut                  score cut for silent output (default 5.0 for hires; 
                              -8.0 for lores)
-integration_test           stop after first mg position found -- for testing
-tether_to_closest_res      stay near closest ligand res; helps force unique grid 
                              sampling in different cluster jobs.
-scored_hydrogen_sampling   in -pack_water_hydrogens  test mode, when packing 
                              water hydrogens, use a complete scorefunction 
                              to rank (slow)
-all_hydration_frames       in -hydration test mode, sample all hydration 
                               frames (slow)
-leave_other_waters         in -hydration test mode, do not remove all waters
-minimize                   in -hydration test mode, minimize Mg(2+) after 
                               hydration or hydrogen-packing
-minimize_mg_coord_constraint_distance 
                            harmonic tether to Mg(2+) during minimize (default: 
                               0.2 Angstroms)

Totally advanced options for a mode that is basically untested
-magnesium:montecarlo:temperature     temperature for Monte Carlo (default 
                                        1.0)
-magnesium:montecarlo:cycles          Monte Carlo cycles (default 100000)
-magnesium:montecarlo:dump            dump PDBs from Mg monte carlo (to make 
                                        movies)
-magnesium:montecarlo:add_delete_frequency   
                                      add_delete_frequency for Monte Carlo 
                                        (default 0.1)

```

Funciones de puntuación (en desarrollo)
=======================================
Se usan dos conjuntos de funciones de puntuación.

### `test_lores.wts` 
Contiene algunos términos lores de Mg (desarrollados originalmente en 2012):
```
rna_mg_point          1.0  # contains distance and angle dependent 
                           #   terms for Mg(2+) interacting with hydrogen-bond acceptors
                           #   based on fits to Mg-RNA PDB structures.

rna_mg_point_indirect 1.0  # contains longer-range water-mediated 
                           #   interactions with hydrogen-bond acceptors.
                           #   only distance-dependence in this case. again, based 
                           #   on unpublished fits to Mg-RNA PDB structures

fa_rep                1.0  # prevent clashes of mg(2+) with stuff
geom_sol_fast         0.3  # prevents mg(2+) from occluding polar groups (particularly electropositive groups)
lk_nonpolar           0.3  # probably doesn't do much
NO_HB_ENV_DEP
```
Las derivadas de estos términos no se han implementado, pero sería fácil hacerlo, según cómo se configuraron para los términos hires de Mg (ver más abajo).

### `test_hires2.wts` 
Contiene los términos hires de Mg:
```
fa_rep        0.21 # standard
fa_atr        0.20 # standard
geom_sol_fast 0.17 # standard

mg_lig        1.0 # direct interaction of Mg2+ with hydrogen bond acceptors
mg_sol        0.2 # isotropic solvation penalty for atoms occluding the Mg(2+) -- double counting with explicit water?
mg_ref        1.0 # cost of instantiating Mg(2+) (can yet modulatable by -mg_conc)
hoh_ref       3.0 # cost of instantiating explicit water

hbond_sc      1.0 # standard

NO_HB_ENV_DEP         # standard (for RNA at least)
ENLARGE_H_LJ_WDEPTH   # standard (for RNA at least)
```

Hay más información sobre estos términos en la cabecera de `src/core/scoring/magnesium/MgEnergy.cc`:
```
//
// Enforces Mg(2+) to have 6 octahedrally coordinated ligands.
//
// Octahedral axes ('orbital frame' or 'ligand field') defined by
//  perpendicular virtual atoms V1, V2, V3, V4, V5, V6:
//
//        V2 V6
//         |/
//   V4 -- Mg -- V1
//        /|
//      V3 V5
//
// Basic interaction potential mg_lig is defined in terms of three geometric parameters:
//
//                 Base
//                 /
//   Mg -- V   :Acc
//
//   1.  Dist(  Mg -- Acc )         [should be near 2.1 Angstroms]
//   2.  Angle( Acc -- Mg -- V)     [should be near 0.0; cos angle should be near +1.0]
//   3.  Angle( Mg -- Acc -- Base ) [should be near 120-180 degrees; cos angle should be < -0.5]
//
// Also include terms:
//
//   mg_sol  [penalty for blocking fluid water]
//   mg_ref  [cost of instantiating mg(2+); put into ref?]
//   hoh_ref [cost of instantiating water]
//
//              -- rhiju, 2015
//
// Note: for cost of instantiating water, could instead use:
//
//    h2o_intra, [in WaterAdductIntraEnergyCreator -- check if activated]
// OR pointwater [when Frank's PWAT is checked in from branch dimaio/waterstuff.]
//
// will need to make a decision when dust settles on HOH.
//
//
```


##Véase también

* [[RNA Denovo]]: la página principal de la aplicación rna_denovo
* [[RNA applications]]: la página principal de las aplicaciones de ARN
* [[Structure Prediction Applications]]: lista de aplicaciones de predicción de estructuras
* [[RNA]]: guía para trabajar con ARN en Rosetta
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta