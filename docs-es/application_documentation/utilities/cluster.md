#Aplicación cluster

Metadatos
========

Este documento fue editado el 25 de mayo de 2014 por Jared Adolf-Bryfogle. Esta aplicación en mini fue creada y documentada por Mike Tyka, et al.

Propósito y algoritmo
=====================

La aplicación "cluster" de Rosetta realiza un agrupamiento sencillo de estructuras (en formato PDB o silent file). El algoritmo se basa en uno de los programas antiguos de Phil Bradley (silent\_cluster\_c). A partir de un subconjunto de estructuras (las primeras 400), el algoritmo encuentra la estructura con el mayor número de vecinas dentro del radio del clúster y crea un primer clúster con esa estructura como centro; las vecinas pasan a formar parte de él y son reclamadas por el clúster. Esas estructuras se retiran del conjunto de estructuras "sin reclamar". Después se repite el algoritmo hasta que todas las estructuras tengan un clúster asignado. El resto de las estructuras se asigna a los clústeres una por una (así se evita calcular una matriz completa de RMS). La regla es que cada estructura se une al clúster cuyo centro le resulta más parecido. Si el clúster más cercano está a más de "cluster\_radius" de distancia, la estructura forma un clúster nuevo. Esta regla se aplica a todas las estructuras restantes. Se puede limitar el tamaño de los clústeres, ordenarlos por energía, etc. (consulta las opciones).

Ten en cuenta que, en ocasiones, la aplicación cluster no puede manejar conjuntos de estructuras muy grandes. Se recomienda usar en su lugar un programa optimizado para ese fin, como [Calibur](http://sourceforge.net/projects/calibur/).

Opciones de línea de comandos
====================

Comando de ejemplo\*

```
cluster.linuxgccrelease @flags > cluster.log
```

cluster acepta todas las opciones generales de archivos de entrada y salida comunes a todas las aplicaciones de Rosetta

```
   -database                 Path to rosetta databases
   -in:file:s                Input pdb file(s)
   -in:file:silent           Input silent file
   -in:file:fullatom         Read as fullatom input structure
   -out:file:silent          Output silent structures instead of PDBs
   -score:weights            Supply a different weights file (default is score12)
   -score:patch              Supply a different patch file (default is score12)
   -run:shuffle              Use shuffle mode
```

Opciones específicas de cluster

```
   -cluster:radius  <float>                    Cluster radius in A (for RMS clustering) or in inverse GDT_TS for GDT clustering. Use "-1" to trigger automatic radius detection
   -cluster:gdtmm                              Cluster by gdtmm instead of rms
   -cluster:input_score_filter  <float>        Ignore structures above certain energy
   -cluster:exclude_res <int> [<int> <int> ..] Exclude residue numbers from structural comparisons
   -cluster:radius        <float>              Cluster radius
   -cluster:limit_cluster_size      <int>      Maximal cluster size
   -cluster:limit_clusters          <int>      Maximal number of clusters
   -cluster:limit_total_structures  <int>      Maximal number of structures in total
   -cluster:sort_groups_by_energy              Sort clusters by energy.

Examples:
cluster -database /path/to/rosetta/main/database -in:file:silent silent.out -in::file::binary_silentfile -in::file::fullatom -native 1a19.pdb
clustered Poses are given output names in the form of:
c.i.j, which denotes the jth member of the ith cluster.
```

Limitaciones
===========
La aplicación solo puede manejar de forma razonable hasta unos 2000 Poses. Pasado ese número, TENDRÁ problemas de memoria.
Consulta [[calibur-clustering]] para ver una aplicación de agrupamiento alternativa que no tiene estos problemas.

## Véase también

* [[La aplicación energy_based_clustering | energy_based_clustering_application]].
* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
