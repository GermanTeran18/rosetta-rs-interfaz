# SimpleGlycosylateMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## SimpleGlycosylateMover

[[_TOC_]]

Metadatos
========

Mover creado por el Dr. Jared Adolf-Bryfogle (jadolfbr@gmail.com) y el Dr. Jason Labonte (JWLabonte@jhu.edu)

PIs: Dr. William Schief (schief@scripps.edu) y Dr. Jeffrey Gray (jgray@jhu.edu)

Referencia
=========
**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]]

Descripción
===========

SimpleGlycosylateMover permite glicosilar Poses con el glicano de interés en las posiciones especificadas.  Esto es muy útil, ya que la mayoría de los glicanos no están resueltos en las estructuras cristalográficas.
Suele ser el punto de partida para modelar carbohidratos unidos a proteínas.  Es extremadamente rápido y se puede usar justo antes de [[GlycanRelaxMover]] para crear y modelar los glicanos en una única ejecución de Rosetta.

Si ya hay un glicano presente, se elimina antes de construir el nuevo glicano.  Actualmente no se copia ninguna torsión al nuevo glicano.  Se está trabajando en ello.

El mover admite varios tipos de nombres de glicano, entre ellos nombres IUPAC completos, archivos con nombres IUPAC completos y nombres comunes cortos como 'man9' o 'man5'. 

Se pueden pasar varios nombres al mover (con un conjunto opcional de pesos); entonces, para cada posición, se muestrean las posibles glicosilaciones.  Esto puede ser útil en posiciones heterogéneas, como las que se encuentran en la proteína de la envoltura del VIH.  

Los glicanos deben modelarse después de la glicosilación.  Durante la glicosilación se pueden idealizar las torsiones de los residuos de carbohidrato usando los datos de conformeros que usamos para Glycan Relax.  Esta opción es 'idealize_glycosylations'.  Incluso con esta idealización, la estructura seguirá necesitando un modelado adecuado.  Consulta [[GlycanRelaxMover]] para más información sobre cómo modelar el glicano resultante.
 


Consulta [[Trabajar con glicanos | WorkingWithGlycans ]] para más información.



Detalles
=======

[[include:mover_SimpleGlycosylateMover_type]]


## Véase también
- [[WorkingWithGlycans]]

### Aplicaciones y componentes de RosettaCarbohydrate
- #### Movers
 - [[GlycosyltransferaseMover]] - Un método alternativo para glicosilar un `Pose` que usa secuones y cosustratos de enzimas biológicas concretas.
 - [[GlycanTreeModeler]] - Modela árboles de glicanos usando información conocida sobre carbohidratos.  Sirve tanto para modelado de novo completo como para refinamiento.
 - [[GlycanSampler | GlycanRelaxMover]] - Se usa en GlycanTreeRelax para muestrear torsiones de carbohidratos y cadenas laterales a partir de datos estructurales.

- #### Residue Selectors
 - [[GlycanResidueSelector]] - Selecciona residuos concretos de cada árbol de glicanos de interés, o árboles/ramas concretos.
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
