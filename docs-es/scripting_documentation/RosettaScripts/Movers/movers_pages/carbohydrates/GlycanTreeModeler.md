GlycanTreeModeler
================

[[_TOC_]]

Metadatos
========

Mover creado por el Dr. Jared Adolf-Bryfogle (jadolfbr@gmail.com), el Dr. Sebastian Raemisch (raemisch@scripps.edu) y el Dr. Jason Labonte (JWLabonte@jhu.edu)

PIs: Dr. William Schief (schief@scripps.edu) y Dr. Jeffrey Gray (jgray@jhu.edu)

Referencia
=========

**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]] 

Descripción
===========
Este mover se creó para el modelado de novo y el refinamiento de glicanos.  Lo hace muestreando y construyendo iterativamente los árboles de glicanos a partir de sus raíces. Por defecto (sin un residue selector), selecciona TODOS los residuos de glicano del Pose.  Consulta [[GlycanResidueSelector]] para seleccionar árboles de glicanos concretos y [[GlycanLayerSelector]] para capas de glicanos concretas.

**Ten en cuenta que los valores por defecto que usa internamente el modelador son ahora los valores óptimos hallados en el artículo que se publicará próximamente.  La gran cantidad de opciones que hay aquí sirve sobre todo para benchmarking.  Las dos únicas opciones que deberías necesitar son `-residue_selector` y `scorefxn` (y, opcionalmente, `-refine` para remodelar glicanos)**
 
Detalles
=======

[[include:mover_GlycanTreeModeler_type]]


## Véase también
- [[WorkingWithGlycans]]

- ### Aplicaciones y componentes de RosettaCarbohydrate

- #### Movers
 - [[SimpleGlycosylateMover]] - Glicosila Poses con árboles de glicanos como man5, man9 u otros árboles complejos.  
 - [[GlycanSampler | GlycanRelaxMover]] - Componente usado en GlycanTreeRelax para realizar el muestreo de torsiones y de cadenas laterales.

- #### Residue Selectors
 - [[GlycanResidueSelector]] - Selecciona residuos concretos de cada árbol de glicanos de interés, o árboles/ramas completos.
 - [[GlycanLayerSelector]] - Selecciona capas de glicanos
 - [[RandomGlycanFoliageSelector | rs_RandomGlycanFoliageSelector_type]] - Selecciona al azar un conjunto de residuos de glicano 

- #### Aplicaciones
 - [[GlycanInfo]] - Obtiene información sobre todos los árboles de glicanos de un Pose
 - [[GlycanClashCheck]] - Obtiene datos sobre choques del modelo con y entre glicanos, o entre glicanos y otras cadenas de proteína.


- #### Otros
 - [[Application Documentation]]: Lista de aplicaciones de Rosetta
 - [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
 - [[Comparing structures]]: Ensayo sobre la comparación de estructuras
 - [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
 - [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
 - [[Commands collection]]: Una lista de líneas de comandos de ejemplo para ejecutar los ejecutables de Rosetta
