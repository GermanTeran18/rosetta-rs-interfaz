#Generación de ensamblajes

Generar esqueletos de novo (o ensamblajes, «Assemblys») en el marco de SEWING se logra mediante un sencillo recorrido de un grafo. Los nodos de este grafo, llamado SewGraph, son los Modelos extraídos en el [[paso 1|model-generation]] del protocolo. Las aristas son las coincidencias estructurales encontradas en el [[paso 2|model-comparison-with-geometric-hashing]] de SEWING.
El ensamblaje de esqueletos está implementado dentro de un Mover y, por tanto, se puede usar mediante la interfaz de [[RosettaScripts]]. Actualmente hay varios Movers implementados, cada uno diseñado para lograr distintos objetivos de diseño. El AssemblyMover base tiene un puñado de métodos centrales que los distintos submovers implementan o sobrescriben de forma selectiva.

----------------------
[[_TOC_]]

##AssemblyMover
El AssemblyMover es la clase base abstracta de la que derivan todos los demás AssemblyMovers (no necesariamente de forma directa). En esencia, esta clase tiene implementados algunos métodos básicos que facilitan construir ensamblajes a partir del SewGraph y luego crear Poses a partir de esos ensamblajes. A continuación se describen algunas de las funciones relevantes:


* **generate_assembly** - Una función virtual pura. Es la función que los movers hijos sobrescribirán para crear realmente los ensamblajes
* **add_starting_model** - Añade al ensamblaje un modelo inicial al azar
* **follow_random_edge_from_node** - Añade un nuevo modelo al ensamblaje siguiendo una arista desde el nodo dado
* **get_fullatom_pose** - Genera una Pose de todos los átomos a partir del ensamblaje
* **get_centroid_pose** - Genera una Pose centroid a partir del ensamblaje
* **refine_assembly** - Refina una Pose usando información del ensamblaje. Por defecto, usa una estrategia de diseño basada en FastRelax. Se usan restricciones de tipo de residuo para dar una bonificación a los residuos «nativos» en cada posición (debido a la superposición estructural durante la creación del ensamblaje, esto puede favorecer varios tipos de residuo en una posición dada).

----------------------
###Movers de SEWING accesibles desde RosettaScripts:

* [[MonteCarloAssemblyMover]]
* [[AppendAssemblyMover]]
* [[RepeatAssemblyMover]]
* [[EnumerateAssemblyMover]] (???)


----------------------

##Opciones de línea de comandos

Las siguientes opciones se aplican a todos los movers de SEWING (ver más abajo), salvo que se indique lo contrario. Las opciones específicas de cada mover están documentadas en las páginas de cada Mover.

###Opciones obligatorias
```
-s                              The input PDB (ignored, but still required,
                                for many SEWING Movers)
-sewing:model_file_name         The name of the SEWING model file
-sewing:score_file_name         The name of the SEWING edge file

```

En la implementación actual, las siguientes opciones también son obligatorias para puntuar ensamblajes de SEWING con el MotifScore, y se muestran con sus valores recomendados:

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

###Opciones opcionales

```
-sewing:assembly_type generate  The type of Assembly to generate 
                                (allows 'continuous' and 'discontinuous')
                                (Default=continuous)
-sewing:base_native_bonus       The bonus in Rosetta energy units to give 
                                'native' residues during design (default 1)
-sewing:neighbor_cutoff         The cutoff for favoring natives. Any residue
                                with fewer neighbors in the Assembly will not
                                be favored (default: 16)
-sewing:skip_refinement         If true, no full-atom refinement will be run on the 
                                completed Assembly (Default = false)
-sewing:skip_filters            If true, all filters will be skipped during Assembly 
                                generation (Default = false)
-sewing:dump_every_model        Dump all models regardless of whether they
                                pass score filters; useful for debugging
                                (Default false)
```

###Opciones sin usar o experimentales

```

-sewing:max_ss_num      Maximum number of secondary structure 
                        elements and loops that compose
                        a substructure. For instance, this
                        number would be 3 for a helix-turn-helix
                        motif. (still under development)
-sewing:num_edges_to_follow     The maximum number of edges from the SewGraph 
                                that will be followed. For instance, following  
                                4 edges in a graph of helix-loop-helix motifs 
                                will produce a 5-helix bundle. Currently not in  
                                use, and applies only to NodeConstraintAssemblyMover.
```

----------------------
##Subetiquetas

La mayoría de los movers de SEWING (excepto [[RepeatAssemblyMover]]) admiten subetiquetas que imponen restricciones al ensamblaje o a segmentos individuales. Estas subetiquetas se describen en la página [[RequirementSet]].


##Véase también
* [[SEWING]]: La página principal de SEWING.
* [[Model Generation]]: Generación de un archivo de modelos (archivo de nodos) para usar con las aplicaciones de SEWING
* [[Model comparison with geometric hashing]]: Generación de un archivo de aristas para usar con las aplicaciones de SEWING
* [[SEWING Dictionary]]: Define los términos clave de SEWING.
