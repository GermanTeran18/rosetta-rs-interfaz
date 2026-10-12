#Ensamblaje de modelos
##NOTA: esta página es para LegacySEWING.
**Esta es una página obsoleta. Para la documentación actual del ensamblaje, visita la página de [[AssemblyMover]]**

La generación de cadenas principales de novo (o ensamblajes) en el marco de SEWING se logra mediante un recorrido sencillo de un grafo. Los nodos de este grafo, llamado SewGraph, son los Modelos extraídos en el [[Paso 1|model-generation]] del protocolo. Las aristas son las coincidencias estructurales encontradas en el [[Paso 2|model-comparison-with-geometric-hashing]] de SEWING.
El ensamblaje de cadenas principales está implementado dentro de un Mover y, por tanto, se puede acceder a él mediante la interfaz de [[RosettaScripts]]. Actualmente hay varios Movers implementados, cada uno diseñado para lograr objetivos de diseño distintos. El AssemblyMover base tiene un puñado de métodos centrales que los distintos submovers implementan o sobrescriben de forma selectiva.

----------------------
[[_TOC_]]

##AssemblyMover
El AssemblyMover es la clase base abstracta de la que derivan todos los demás AssemblyMovers (no necesariamente de forma directa). En esencia, esta clase tiene implementados algunos métodos básicos que facilitan construir Ensamblajes a partir del SewGraph y luego crear Poses a partir de esos Ensamblajes. A continuación se resumen algunas de las funciones relevantes:


* **generate_assembly** - Una función virtual pura. Es la función que los movers hijos sobrescribirán para crear realmente los Ensamblajes
* **add_starting_model** - Añade un modelo inicial aleatorio al Ensamblaje
* **follow_random_edge_from_node** - Añade un modelo nuevo al Ensamblaje siguiendo una arista desde el nodo dado
* **get_fullatom_pose** - Genera un Pose de todos los átomos a partir del Ensamblaje
* **get_centroid_pose** - Genera un Pose centroide a partir del Ensamblaje
* **refine_assembly** - Refina un Pose usando información del Ensamblaje. Por defecto, usará una estrategia de diseño basada en FastRelax. Se usan restricciones de tipo de residuo para dar una bonificación a los residuos «nativos» en cada posición (debido a la superposición estructural durante la creación del ensamblaje, esto puede dar lugar a que se favorezcan varios tipos de residuo en una posición dada).

----------------------
###Movers de SEWING accesibles desde RosettaScripts:
**NOTA: esta es una lista de movers heredados de SEWING. Para la documentación de los movers de SEWING refactorizados, consulta la página de [[AssemblyMover]].**

* [[LegacyMonteCarloAssemblyMover]]
* [[LegacyAppendAssemblyMover]]
* [[LegacyRepeatAssemblyMover]]
* [[LegacyEnumerateAssemblyMover]] (???)


----------------------

##Opciones de línea de comandos

Las opciones siguientes se aplican a todos los movers de SEWING (véase más abajo), salvo que se indique lo contrario. Las opciones específicas de cada mover están documentadas en las páginas de cada Mover.

###Opciones obligatorias
```
-s                              The input PDB (ignored, but still required,
                                for many SEWING Movers)
-legacy_sewing:model_file_name         The name of the SEWING model file
-legacy_sewing:score_file_name         The name of the SEWING edge file

```

En la implementación actual, las opciones siguientes también son obligatorias para puntuar Ensamblajes de SEWING con el MotifScore y se muestran con sus valores recomendados:

```xml

-mh:match:ss1 true    # for "explicit" motifs that get dumped at the end,
                      match target SS
-mh:match:ss2 true    # for "explicit" motifs that get dumped at the end,
                      match binder SS
-mh:match:aa1 false   # for "explicit" motifs that get dumped at the end, 
                      match target AA
-mh:match:aa2 false   # for "explicit" motifs that get dumped at the end, 
                      match binder AA

-mh:score:use_ss1 true         # applicable only to BB_BB motifs; match
                               secondary structure on first (target) res
-mh:score:use_ss2 true         # applicable only to BB_BB motifs; match
                               secondary structure on second (binder) res
-mh:score:use_aa1 false        # applicable only to BB_BB motifs; match AA
                               identity on first (target) res
-mh:score:use_aa2 false        # applicable only to BB_BB motifs; match AA
                               identity on second (binder) res"

-mh:path:motifs            Path to .gz file containing motifs used in motifscore
-mh:path:scores_BB_BB      Path to directory containing database used
                           for generating MotifScores

-mh:gen_reverse_motifs_on_load false     # I think the inverse motifs are already in the datafiles

-mh::dump::max_rms 0.4
-mh::dump::max_per_res 20
```

###Optional flags

```
-legacy_sewing:assembly_type generate  The type of Assembly to generate 
                                (allows 'continuous' and 'discontinuous')
                                (Default=continuous)
-legacy_sewing:base_native_bonus       The bonus in Rosetta energy units to give 
                                'native' residues during design (default 1)
-legacy_sewing:neighbor_cutoff         The cutoff for favoring natives. Any residue
                                with fewer neighbors in the Assembly will not
                                be favored (default: 16)
-legacy_sewing:skip_refinement         If true, no full-atom refinement will be run on the 
                                completed Assembly (Default = false)
-legacy_sewing:skip_filters            If true, all filters will be skipped during Assembly 
                                generation (Default = false)
-legacy_sewing:dump_every_model        Dump all models regardless of whether they
                                pass score filters; useful for debugging
                                (Default false)
```

###Opciones sin uso/experimentales

```

-legacy_sewing:max_ss_num      Maximum number of secondary structure 
                        elements and loops that compose
                        a substructure. For instance, this
                        number would be 3 for a helix-turn-helix
                        motif. (still under development)
-legacy_sewing:num_edges_to_follow     The maximum number of edges from the SewGraph 
                                that will be followed. For instance, following  
                                4 edges in a graph of helix-loop-helix motifs 
                                will produce a 5-helix bundle. Currently not in  
                                use, and applies only to NodeConstraintAssemblyMover.
```

----------------------
##Subtags

La mayoría de los movers de SEWING (excepto el [[RepeatAssemblyMover]]) aceptan subtags que imponen restricciones al ensamblaje y/o a segmentos individuales. Estos subtags se describen en la página de [[RequirementSet]].


##Véase también
* [[SEWING]]: la página principal de SEWING.
* [[Model Generation]]: genera un archivo de modelos (archivo de nodos) para usar con las aplicaciones de SEWING
* [[Model comparison with geometric hashing]]: genera un archivo de aristas para usar con las aplicaciones de SEWING
* [[SEWING Dictionary]]: define los términos clave de SEWING.