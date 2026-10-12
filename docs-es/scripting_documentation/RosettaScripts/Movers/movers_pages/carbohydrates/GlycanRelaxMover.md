# GlycanSampler
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## GlycanSampler

[[_TOC_]]

Metadatos
========

Mover/aplicación creado por el Dr. Jared Adolf-Bryfogle (jadolfbr@gmail.com) y el Dr. Jason Labonte (JWLabonte@jhu.edu), en colaboración con el Dr. Sebastian Rämisch (raemisch@scripps.edu)

PIs: Dr. William Schief (schief@scripps.edu) y Dr. Jeffrey Gray (jgray@jhu.edu)


`GlycanSampler` es el componente principal de muestreo de [[GlycanTreeModeler]]

##Referencia
**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]]

##Detalles


[[include:mover_GlycanSampler_type]]



## Véase también
- [[WorkingWithGlycans]]

- ### Aplicaciones y componentes de RosettaCarbohydrate

- #### Movers
 - [[GlycanTreeModeler]] - La mejor forma de modelar árboles de glicanos.  Usa GlycanRelax internamente.
 - [[SimpleGlycosylateMover]] - Glicosila Poses con árboles de glicanos como man5, man9 u otros árboles complejos.  

- #### Residue Selectors
 - [[GlycanResidueSelector]] - Selecciona residuos concretos de cada árbol de glicanos de interés, o árboles/ramas concretos
 - [[GlycanLayerSelector]] - Selecciona capas de glicanos
 - [[RandomGlycanFoliageSelector | rs_RandomGlycanFoliageSelector_type]] - Selecciona al azar un conjunto de residuos de glicano 

- #### Aplicaciones
 - [[GlycanInfo]] - Obtiene información sobre todos los árboles de glicanos de un Pose
 - [[GlycanClashCheck]] - Obtiene datos sobre choques del modelo con y entre glicanos, o entre glicanos y otras cadenas de proteína.


- ### Otros
 - [[Application Documentation]]: Lista de aplicaciones de Rosetta
 - [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
 - [[Comparing structures]]: Ensayo sobre la comparación de estructuras
 - [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
 - [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
 - [[Commands collection]]: Una lista de líneas de comandos de ejemplo para ejecutar los ejecutables de Rosetta