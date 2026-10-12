#Documentación de `rna_cluster`

Metadatos
========

Autor: Andrew Watkins

Añadido a la documentación: febrero de 2018

Código y demo
=============

El código central de la aplicación `rna_score` está en `       apps/public/rna/util/rna_score.cc      `

Propósito de la aplicación
===========================================

Este código sirve para agrupar silent files (idealmente, los que contienen RNA) de una manera bastante robusta frente a características que el "SWA legacy clusterer" original no pudo prever, pero que hoy son habituales (por ejemplo, ácidos nucleicos no canónicos o modificados químicamente).

Archivos de entrada
===========

Archivos requeridos
-------------

-   Uno o más silent files que contengan el RNA que se va a agrupar 

Opciones
=======

```
-cluster:radius                A radius in Angstroms separating cluster centers
-cluster:score_diff_cut        What score cutoff (from the minimum score)  of the silent file(s)
                               should be clustered? Defaults to clustering everything (well, within
                               1000000 units)
-cluster:auto_tune             As clustering proceeds, increase radius from 0.1 to 50.0A (default false)
```

Línea de comando de ejemplo
-------------------

```
rna_cluster –in:file:silent swm_rebuild_full_model.out –nstruct 100 –cluster:radius 2.0 –out:file:silent TOP_ENERGY_CLUSTERS/top_energy_clusters.rna_cluster.out -in:file:native t_loop_modified_fixed_NATIVE_1ehz.pdb 
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
