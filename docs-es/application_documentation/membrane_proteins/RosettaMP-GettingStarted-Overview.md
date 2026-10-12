# Primeros pasos para modelar proteínas de membrana con RosettaMP

## Descripción general

Para modelar proteínas de membrana, Rosetta se apoya en un marco llamado RosettaMP, que representa las características físicas y químicas del entorno de membrana. RosettaMP fue desarrollado por Rebecca Alford y Julia Koehler Leman en el GrayLab de Johns Hopkins en 2015 y se describe en *Alford, Koehler Leman et al. 2015*

[[rosettamp_overview.png]]

[[_TOC_]]
 
## Historia

En 2006 y 2007, Valdimir Yarov-Yarovoy, Patrick Barth y Bjoern Wallner añadieron a Rosetta las primeras aplicaciones de modelado de proteínas de membrana (llamadas RosettaMembrane). Estas aplicaciones introdujeron una función de puntuación de baja y de alta resolución y sentaron las bases del plegamiento ab initio en la bicapa de membrana. Para avanzar en el modelado de proteínas de membrana en Rosetta, necesitábamos un marco totalmente integrado con Rosetta 3. 

En 2014 decidimos crear una maquinaria completamente nueva para el modelado de membranas con el fin de (1) facilitar enormemente el desarrollo de nuevos protocolos para proteínas de membrana, (2) conectar este código con conceptos más recientes como FoldTree, Movers, Graph, ScoreFunctionFactory, etc., (3) mejorar la facilidad de uso y (4) hacer que los protocolos estén disponibles para RosettaScripts, PyRosetta y la línea de comandos. Para más detalles, consulta *Alford, Koehler Leman et al.* 

## Elementos de RosettaMP

Los principales aspectos de esta implementación son los siguientes:
- **MembraneInfo:** MembraneInfo es un centro neurálgico para almacenar datos relacionados con la membrana, como la posición y orientación de la membrana (centro y normal), el grosor, los tramos transmembrana (SpanningTopology) y la lipofilicidad. Muchos de los movimientos de muestreo, funciones de puntuación y protocolos acceden a MembraneInfo, de modo que los protocolos pueden tener en cuenta fácilmente el entorno de membrana. 

- **[[Representación de la membrana: | RosettaMP-KeyElements-MembraneRsd ]]** A diferencia del RosettaMembrane original, la membrana se representa con un tipo de residuo especial (MEM) que se añade al Pose. Almacena el punto central de la membrana, el vector normal de la membrana y el grosor. El valor del grosor almacenado en MEM es la mitad del grosor «real» de la membrana, ya que actualmente la membrana se considera simétrica alrededor de z = 0, que es el centro de la membrana. En el sistema de coordenadas de la membrana (dextrógiro), la membrana se considera actualmente una membrana plana en el plano xy, con la normal de la membrana apuntando en la dirección z positiva. 

- **Membrana fija y móvil:** en el marco RosettaMP, la membrana se puede modelar como fija o móvil durante una simulación. Aunque una membrana flexible es computacionalmente más barata y se recomienda para la mayoría de los protocolos, algunos protocolos necesitan una membrana fija en la que se muevan varios Poses (como MPDocking). 

- **[[Función de energía: | RosettaMP-KeyElements-EnergyFunction]]** Durante la reimplementación del marco de membrana conservamos las ScoreFunctions originales de baja y alta resolución de RosettaMembrane. 

- **[[Movers: | RosettaMP-KeyElements-Movers]]** Hay varios Movers disponibles y se implementarán más según se necesiten. El más importante es el AddMembraneMover, que crea un Pose de membrana a partir de un Pose normal; requiere leer un spanfile. Al usar Movers, fíjate en si son adecuados para tu protocolo, ya que muchos movers son específicos de (1) una membrana fija y una proteína móvil, o (2) una membrana móvil y una proteína fija. 

- **[[Visualización: | RosettaMP-KeyElements-Visualization]]** El marco de membrana está acoplado al PymolMover, que permite la visualización en tiempo real de una simulación de Rosetta con la membrana presente y actualizada.

- **Aplicaciones:** actualmente hay cuatro aplicaciones principales para proteínas de membrana (MPrelax, MPddG, MPdocking y MPdocking simétrico) y vendrán más. No todas las aplicaciones están disponibles para todas las interfaces; consulta *Alford, Koehler Leman et al.* para más información, en especial la Figura 2 de ese artículo. 

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencias

#### Referencia principal de RosettaMP
* Alford RF*, Koehler Leman J*, Weitzner BD, Duran AM, Tilley DC, Elazar A, et al. (2015) An Integrated Framework Advancing Membrane Protein Modeling and Design. PLoS Comput Biol 11(9): e1004398. (*autores con contribución equivalente)

#### Función de energía de membrana de todos los átomos de Rosetta
* Alford RF, Fleming PJ, Fleming KG, Gray JJ (2019) "Protein structure prediction and design in a biologically-realistic implicit membrane" BioRxiv 

#### Nuevas aplicaciones que usan RosettaMP
* Koehler Leman J, Mueller BK, Gray JJ (2018) "Expanding the toolkit for membrane protein modeling in Rosetta" Bioinformatics 33 (5), 754-756

#### Referencias de RosettaMembrane (en su mayoría obsoleto)
* Yarov-Yarovoy V, Schonbrun J, Baker D. (2006 Mar 1) Multipass membrane protein structure prediction using Rosetta. Proteins. 62(4):1010-25.
* Barth P, Schonbrun J, Baker D. (2007 Oct 2) Toward high-resolution prediction and design of transmembrane helical protein structures. Proc Natl Acad Sci U S A. 104(40):15682-7.
* Barth P, Wallner B, Baker D. (2009 Feb 3) Prediction of membrane protein structures with complex topologies using limited constraints. Proc Natl Acad Sci U S A. 106(5):1409-14.
