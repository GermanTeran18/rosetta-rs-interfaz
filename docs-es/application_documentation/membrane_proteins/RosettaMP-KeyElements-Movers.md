# Movers de inicialización, muestreo, etc. (RosettaMP)

[[_TOC_]]

## Descripción general
El marco RosettaMP admite un conjunto de movers que inicializan elementos de RosettaMP e implementan movers de muestreo que tienen en cuenta el entorno de membrana. Cada mover que existe actualmente en el código y que admite la interfaz de RosettaScripts se detalla en las páginas siguientes: 

## Movers de inicialización

 - **[[AddMembraneMover | RosettaMP-Movers-AddMembrane ]]** Inicializa el marco RosettaMP añadiendo una representación de la membrana al Pose
 - **[[SymmetricAddMembraneMover | RosettaMP-Movers-SymmetricAddMembrane ]]** Inicializa el marco RosettaMP con un Pose simétrico 
 - **[[AddMPLigandMover | RosettaMP-Movers-AddMPLigand ]]** Añade un único ligando a un Pose que ya cuenta con el marco RosettaMP

## Movers para cambiar la posición de la membrana 

- **[[MembranePositionFromTopology | RosettaMP-Movers-MembranePositionFromTopology ]]** Calcula la posición de la membrana a partir de los tramos transmembrana
- **[[SetMembranePositionMover | RosettaMP-Movers-SetMembranePosition ]]** Establece la posición de la membrana en un centro y una normal dados
- **[[RandomMembranePositionMover | RosettaMP-Movers-RandomMembranePosition ]]** Muestrea una posición aleatoria de la membrana
- **[[FlipMover | RosettaMP-Movers-Flip ]]** Refleja el Pose respecto al plano xy de la membrana
- **[[TiltMover | RosettaMP-Movers-Tilt ]]** Inclina un único tramo o compañero respecto al número de jump
- **[[SpinAroundPartnerMover | RosettaMP-Movers-SpinAroundPartner ]]** Gira la proteína alrededor del segundo compañero en el plano xy
- **[[OptimizeMembranePositionMover | RosettaMP-Movers-OptimizeMembranePosition ]]** Optimiza la posición de la membrana mediante una búsqueda determinista (depende de la función de puntuación)

## Movers para docking

- **[[ MPDockingMover | RosettaMP-Movers-MPDocking ]]** Hace docking de dos proteínas de membrana
- **[[MPDockingSetupMover | RosettaMP-Movers-MPDockingSetup]]** Lee 2 Poses y 2 spanfiles, los concatena y los imprime. Por ahora solo funciona con 2 Poses

## Movers para muestrear la incrustación de la proteína

- **[[TransformIntoMembraneMover| RosettaMP-Movers-TransformIntoMembrane ]]** Transforma la proteína a coordenadas de membrana
- **[[TranslationRotation | RosettaMP-Movers-TranslationRotation ]]** Traslada y rota la proteína desde un centro/normal antiguo a un centro/normal nuevo
- **[[OptimizeProteinEmbeddingMover | RosettaMP-Movers-OptimizeProteinEmbedding]]** Optimiza la incrustación de la proteína en la membrana.

## Movers de visualización

- **[[VisualizeEmbeddingMover | RosettaMP-Movers-VisualizeEmbedding ]]** Añade residuos de incrustación al Pose para visualizar la incrustación de tramos, cadenas o de toda la proteína
- **[[VisualizeMembrane | RosettaMP-Movers-VisualizeMembrane ]]** Añade una serie de pseudoátomos para visualizar la membrana como planos de pseudoátomos en programas de visualización (muy costoso)

## Otros movers

- **[[MPLipidAccessibilityMover | RosettaMP-Movers-MPLipidAccessibility]]** Calcula qué residuos son accesibles a los lípidos y guarda esa información en los factores B.
- **[[RangeRelaxMover | RosettaMP-Movers-RangeRelax]]** Relaja una proteína de membrana relajándola iterativamente por rangos.

## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol; 11(9).


## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))
