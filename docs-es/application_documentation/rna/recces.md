#RECCES: Reweighting of Energy-function Collection with Conformational Ensemble Sampling

Metadatos
=========

Autor: Fang-Chieh Chou

Mayo de 2015, por Fang-Chieh Chou (fcchou [at] stanford.edu).

Código y demo
=============

La aplicación principal de RECCES es `main/source/src/apps/public/rna_util/recces_turner.cc`. Viene acompañada de un conjunto de códigos en python en `tools/recces`. Se incluye un archivo README para los códigos en python. La función de puntuación optimizada de RECCES es `main/database/scoring/stepwise/rna/turner.wts`.

Para una demostración mínima de RECCES, consulta: `demos/public/recces/`. 
También está disponible la [documentación en línea de la demo de RECCES](https://www.rosettacommons.org/demos/latest/public/recces/README).

Propósito de la aplicación
==========================

Este código ofrece una forma de calcular la energía libre de una molécula de ARN
usando un muestreo exhaustivo para tener en cuenta la entropía conformacional. RECCES también
permite reponderar rápidamente la función de puntuación almacenando en caché las subpuntuaciones de
cada conformación muestreada.

Algoritmo
=========

RECCES usa métodos de Monte Carlo con simulated tempering para muestrear de forma eficiente el
ensamble conformacional. Para el cálculo se usan los términos de puntuación estándar de Rosetta; después, los términos se reponderan para ajustarlos a los datos experimentales de plegamiento

Limitaciones
============

-   Por ahora, RECCES solo funciona con dúplex de ARN y extremos colgantes (dangling ends). Aunque
es posible extender el marco a otros motivos de ARN no canónicos e incluso a aplicaciones con
proteínas, ese trabajo aún no se ha realizado.

-   Los términos de puntuación que se almacenan en caché están actualmente fijados en el código fuente 
(recces_turner.cc) y en los scripts de Python; por tanto, añadir nuevos términos de puntuación 
requiere editar el código, lo cual no es cómodo. En el futuro se puede hacer más 
general incluyendo un archivo `current_score_terms` tanto para el código de 
Rosetta como para el de Python.

Modos
=====

Por ahora solo hay un modo de ejecutar RECCES.

Archivos de entrada
===================

RECCES no requiere ningún archivo de entrada específico. Se puede usar un archivo de función de puntuación distinto
para la simulación de simulated tempering, en lugar del estándar
`stepwise/rna/turner.wts` (pero si los términos de puntuación son distintos de los de ese
turner.wts, hay que modificar el código fuente).

Tutorial
========

Consulta `demos/public/recces/` para ver la demo más reciente de ejecución de RECCES.


Opciones
========

A continuación se muestra una lista de los argumentos disponibles para la aplicación `recces_turner`.

```
-seq1 <String>
The sequence of the first strand (or the full sequence if it is single-stranded).

-seq2 <String>
The sequence of the second strand (skip if it is single-stranded).

-n_cycle <Int>
The number of Monte Carlo cycles.

-temps <Double/List of Doubles>
The simulation temperature. If it is a single value, the code performs
standard Monte Carlo at the given temperature. If the input is a list of
values, the code will run simulated tempering (ST).

-st_weights <List of Doubles>
The ST weights for simulations. Need to be specified if multiple temperatures
are given. Can be determined by short pre-runs (see demo).

-out_prefix <String>
Prefix for the RECCES output files.

-save_score_terms
If this option is supplied, RECCES will cache the values for each score terms.
Otherwise only the score histograms are returned.

-a_form_range <Double>
The sampling range for A-form conformations (duplex). Default is 60
(+/- 60 degress from ideal values).

-dump_pdb
If suppiled, the program will dump pdb files for examination.

-n_intermediate_dump <Int>
Dump the given amount of pdb structures for illustration purposes.
```

Salidas esperadas
=================

Cada ejecución de RECCES generará uno o varios (según se use ST o no)
histogramas de puntuación. Si se usa `-save_score_terms`, también escribe los
términos de puntuación almacenados en caché para cada conformación muestreada. El resultado se puede analizar
con los scripts de Python (consulta la demo y `tools/recces/README`).


##Véase también

* [[RNA applications]]: la página principal de las aplicaciones de ARN
* [[Analysis Applications]]: lista de aplicaciones de análisis
* [[RNA]]: guía para trabajar con ARN en Rosetta
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta