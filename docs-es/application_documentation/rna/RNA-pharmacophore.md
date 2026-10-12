#Comandos de RNA pharmacophore

Metadatos
=========

Este documento se actualizó por última vez el 28 de mayo de 2015 por Ragul Gowthaman (ragul@ku.edu).

El investigador principal responsable es John Karanicolas (johnk@ku.edu).

Propósito y algoritmo
=====================

Construcción de farmacóforos de hotspots

Para seleccionar las bases de ARN profundamente enterradas, se calculó el área de superficie accesible al solvente (SASA) de cada base del ARN en presencia y en ausencia de la proteína. Una base se conservaba si el cambio de SASA al formarse el complejo era mayor que un valor de corte preestablecido (46.81 Å2 para adenina, 31.09 Å2 para citosina, 45.06 Å2 para guanina y 52.66 Å2 para uracilo); estos valores corresponden a las medianas de 344 complejos proteína-ARN no redundantes obtenidos de la base de datos de interfaces proteína-ARN (PRIDB) en marzo de 2013 (http://pridb.gdcb.iastate.edu/download/RB344.txt).
También se incluyen los grupos polares del ARN que participan en enlaces de hidrógeno intermoleculares (definidos con la función de energía de Rosetta).

Los mapas de interacción resultantes se agrupan después con una versión modificada del algoritmo del árbol de expansión mínima de Kruskal. Primero se construye un grafo completo, en el que los vértices son los anillos y los pesos de las aristas son las distancias euclidianas entre vértices. Luego se toman las aristas en orden ascendente y se agrupan los vértices extremos de esa arista si no se genera ningún ciclo. El agrupamiento se detiene cuando la distancia es mayor que un valor de corte especificado por el usuario (predeterminado 5.0 Å). Después, los átomos donadores/aceptores se asignan a los anillos más cercanos si la distancia es menor que otro valor especificado por el usuario (predeterminado 5.0 Å). Por último, se generan las plantillas de farmacóforo si el grupo contiene al menos dos anillos. 

Referencias
===========

Xia Y*, Gowthaman R*, Lan L, Rogers S, Wolfe A, Gomez C, Ramirez O, Tsao BW, Marquez RT, Yu J, Pillai M, Neufeld KL, Aubé J, Xu L, and Karanicolas J. (2015). Rationally designing inhibitors of the Musashi protein–RNA interaction by hotspot mimicry (in review)
*Los autores contribuyeron por igual

Opciones de la línea de comando
===============================

**Comando de ejemplo**

```
RNA_pharmacophore.macosclangrelease -input_protein protein.pdb -input_rna rna.pdb 
```

***Opciones de RNA_pahrmacophore***

```

   -min_num_ring                Minimum number of ring moieties required to be present in the output clusters, default=2
   -ring_ring_dist_cutoff       ring - ring distance cutoff to include in the cluster, default=5
   -ring_atm_dist_cutoff        ring - atom distance cutoff to include in the cluster, default=5

General Rosetta Options
   -database                   Path to rosetta databases

```

##Véase también

* [[RNA applications]]: la página principal de las aplicaciones de ARN
* [[Utilities Applications]]: lista de aplicaciones de utilidades
* [[Tools]]: herramientas basadas en Python para usar en Rosetta
* [[RNA]]: guía para trabajar con ARN en Rosetta
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta