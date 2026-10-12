GlycanClashCheck
================

Metadatos
=====
Aplicación creada por el Dr. Jared-Adolf-Bryfogle (jadolfbr@gmail.com); , en colaboración con el Dr. Sebastian Raemisch (raemisch@scripps.edu) y el Dr. Jason W. Labonte (JWLabonte@JHU.edu);

Investigadores principales: laboratorio del Dr. William Schief (schief@scripps.edu) y del Dr. Jeff Gray (jgray@jhu.edu)

Referencia
=========
**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]]


Descripción
===========

Una aplicación piloto específica para choques entre glicanos que cuantifica los choques entre ramas de glicanos concretas y otras cadenas, así como los choques entre una rama de glicano y otra.  No cuenta los choques dentro de una misma rama de glicano.  No reproduce los archivos de entrada y añade la información al scorefile de salida para permitir ejecuciones con MPI.


Definición de choque
============

 Un átomo choca si lo hace con CUALQUIER otro átomo
 Se cuentan los choques (duros y blandos) por residuo

 - Duro:
  - distancia <= LJ1 + LJ2
 - Blando:
  - distancia <= (LJ1 + LJ2) * (1 - S).  S está entre 0 y 1. Aquí usamos .33 por defecto.

-> Definición intuitiva, fácil de concebir y aun así cuantitativa


Opciones relevantes:
======
```
-glycan_branches, vector
 - Required. Vector of glycan branches.  
 - Rosetta Residue numbering or PDB like RosettaScripts

-chech_chains, vector
 - Required. A list of [glycan or protein] chains to compute chain-based clashes.  
 - If not given, will only compute glycan-glycan clashes!

-ignore_hydrogens, boolean
 - Should we calculate only heavy-heavy atom clashes?

-soft_clash, Real
  - When we calculate atom-atom distances using LJ distances, 
  - clash if distance < (atomI_LJ + atomJ_LJ)*(1 - soft_clash)
```


##Véase también

### Componentes de RosettaScripts
* [[GlycanTreeModeler]] - modela árboles de glicanos usando información conocida sobre carbohidratos.  Sirve tanto para el modelado de novo completo como para el refinamiento.
* [[SimpleGlycosylateMover]] - glicosila Poses con árboles de glicanos.  
* [[GlycanResidueSelector]] - selecciona residuos concretos de cada árbol de glicano de interés.

### Otros
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar los archivos ejecutables de Rosetta
