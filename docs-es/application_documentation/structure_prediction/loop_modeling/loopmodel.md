#Aplicación de modelado de loops

Metadatos
========

Este documento fue actualizado por última vez el 26 de marzo de 2015 por Shane Ó Conchúir. La versión original de la aplicación fue creada por Michael Tyka et al., y el primer algoritmo de cierre de loops (CCD) fue implementado por Chu Wang et al. en 2007.  El algoritmo de cierre cinemático (KIC) para el cierre de loops, inspirado en la robótica, fue añadido por Daniel J. Mandell et al. en 2009, y el algoritmo refinado KIC de nueva generación, por Amelie Stein y Tanja Kortemme en 2013. El último desarrollo algorítmico en modelado de loops es KIC con fragmentos, añadido por Roland A. Pache y Tanja Kortemme en 2014. 

Puedes encontrar un tutorial introductorio sobre modelado de loops [aquí](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling).


Referencias
==========

-   Stein A, Kortemme T. (2013). Increased sampling of near-native protein conformations. *PLoS One*. 2013 May 21;8(5):e63090. doi: 10.1371/journal.pone.0063090. Print 2013. PMID: 23704889

-   Mandell DJ, Coutsias EA, Kortemme T. (2009). Sub-angstrom accuracy in protein loop reconstruction by robotics-inspired conformational sampling. *Nat Methods*. 2009 Aug;6(8):551-2. doi: 10.1038/nmeth0809-551. PMID: 19644455

-   Qian, B., Raman, S., Das, R., Bradley, P., McCoy, A.J., Read, R.J. and Baker D. (2007). High resolution protein structure prediction and the crystallographic phase problem. *Nature*. 2007 Nov 8;450(7167):259-64. Epub 2007 Oct 14. PMID: 17934447

-   Wang, C., Bradley, P. and Baker, D. (2007) Protein-protein docking with backbone flexibility. *J Mol Biol*. 2007 Oct 19;373(2):503-19. Epub 2007 Aug 2. PMID: 17825317


Propósito y algoritmo
=====================

Este protocolo se desarrolló originalmente para combinarse con el refinamiento de estructura de todos los átomos de Rosetta (modo relax) y agilizar la tarea de modelado comparativo. Desde entonces ha evolucionado hasta convertirse en un protocolo general para modelar loops en estructuras de proteínas. Actualmente están disponibles los siguientes algoritmos (se pueden seleccionar con opciones específicas; consulta las páginas de documentación de estos distintos algoritmos para más detalles):

-  [[CCD|loopmodel-ccd]]: inserción de fragmentos con descenso cíclico de coordenadas para cerrar rupturas de cadena

-  [[KIC|loopmodel-kinematic]]: cierre cinemático inspirado en la robótica combinado con muestreo aleatorio de las torsiones del loop que no son pivote a partir del espacio de Ramachandran

-  [[KIC de nueva generación|next-generation-KIC]]: versión refinada de KIC; usa muestreo de omega, distribuciones de Ramachandran dependientes de los vecinos y aumento gradual de los términos de puntuación rama y fa_rep para lograr un mayor rendimiento en la reconstrucción de loops y aumentar el muestreo de conformaciones de menos de un angstrom (algoritmo recomendado si no hay datos de fragmentos)

-  [[KIC con fragmentos|KIC_with_fragments]]: modelado de loops basado en fragmentos con cierre cinemático; combina la capacidad de muestreo de KIC con los grados de libertad phi/psi/omega acoplados de los datos de fragmentos de proteínas para lograr un mayor rendimiento en la reconstrucción de loops y el mejor muestreo hasta ahora de conformaciones de menos de un angstrom (algoritmo recomendado si hay datos de fragmentos) 


Archivos de entrada
===========

Los archivos de entrada comunes incluyen:
-   PDB inicial: archivo pdb de plantilla con coordenadas reales para todos los residuos, además del primer y el último residuo de cada región de loop.

-   Archivo de loops:
    ```
    column1  "LOOP":     The loop file identify tag
    column2  "integer":  Loop start residue number
    column3  "integer":  Loop end residue number
    column4  "integer":  Cut point residue number, >=startRes, <=endRes. Default: 0 (let the loop modeling code 
                         choose the cut point)
                         Note: Setting the cut point outside the loop can lead to a segmentation fault. 
    column5  "float":    Skip rate. Default: 0 (never skip modeling this loop)
    column6  "boolean":  Extend loop (i.e. discard the native loop conformation and rebuild the loop from scratch,
                         idealizing all bond lengths and angles). Default: 0 (false)
    ```
    **NOTA:** Los índices de residuos en los archivos de definición de loops se refieren a la *numeración de Rosetta* (numerada de forma continua desde '1', incluso entre cadenas en proteínas de varias cadenas). Puede ser útil renumerar las estructuras iniciales con la numeración de Rosetta para que las definiciones de loop y los índices de residuos del PDB coincidan.

-   Archivos de fragmentos (para CCD y KIC con fragmentos)


Opciones de línea de comandos
====================

Según el algoritmo de loops que elijas ([[CCD|loopmodel-ccd]]/[[KIC|loopmodel-kinematic]]/[[KIC de nueva generación|next-generation-KIC]]/[[KIC con fragmentos|KIC_with_fragments]]), se aplican distintos conjuntos de opciones. 
Consulta la documentación del algoritmo correspondiente para más detalles. 

Para una lista completa de todas las opciones de modelado de loops disponibles, consulta la [[lista completa de opciones|full-options-list]]


Captura de protocolo
================

Puedes descargar una captura de protocolo de algunos de los algoritmos de modelado de loops anteriores (KIC, KIC de nueva generación, KIC con fragmentos) desde el sitio web [[Macromolecular modeling and design benchmarks|https://kortemmelab.ucsf.edu/benchmarks/captures/loop_modeling]]. 
La [[página de modelado de loops|https://kortemmelab.ucsf.edu/benchmarks/benchmarks/loop_modeling]] también enumera los parámetros sugeridos para los distintos protocolos.


loopmodel MPI
=============

El ejecutable loopmodel tiene una implementación MPI independiente de la implementación JD2 que sirve a la mayor parte de Rosetta. Como de costumbre, basta con compilar Rosetta con mpi (añade extras=mpi a la línea de comandos de scons al compilar) para activar MPI. Al ejecutar loopmodel.mpi.\*\*\*, esperará que hayas creado de antemano los directorios de salida, llamados ./output\_\#, donde \# es el rango del procesador empezando desde cero (y necesitas uno por cada procesador). Así, para un trabajo MPI de 8 procesadores, crea output\_0, output\_1, ..., output\_7.

## Véase también

* [Tutorial de modelado de loops](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling)
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura, incluido el modelado de loops
* [[Fragment file]]: Formato de archivo de fragmentos (necesario para la predicción de estructura ab initio)
* [[Loops file]]: Formato de archivo para especificar loops en el modelado de loops
* [[Loop modeling algorithms|loopmodel-algorithms]]
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
