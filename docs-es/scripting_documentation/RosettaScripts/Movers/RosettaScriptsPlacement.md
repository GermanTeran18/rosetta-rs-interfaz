# Placement 
## Movers y filtros asociados a placement

El método de placement se ha descrito en:

Fleishman, SJ, Whitehead TA, et al. Science 332, 816-821. (2011) y JMB 413:1047

El objetivo de los métodos de placement es ayudar en la tarea de generar diseños de proteínas de unión basados en hot-spots. El punto de partida de todos ellos es una proteína objetivo (normalmente la cadena A), bibliotecas de residuos hot-spot y una proteína andamio.

Algunas palabras clave que se usan en la siguiente sección tienen un significado especial y se explican brevemente aquí.

-   Residuo hot-spot: normalmente, un residuo que forma interacciones optimizadas con la proteína objetivo. El objetivo aquí es encontrar una conformación de baja energía de la proteína andamio que incorpore tantos de esos residuos hot-spot como sea posible.
-   Stub: se usa como sinónimo de residuo hot-spot. Es un residuo desmembrado en una ubicación especificada contra la superficie del objetivo.
-   Placement: posicionamiento de la proteína andamio de modo que incorpore de forma óptima el residuo hot-spot.

SetupHotspotConstraintsMover puede leer una sola vez las bibliotecas de residuos hotspot. En este mover puedes decidir cuántos residuos hotspot se mantendrán en memoria en una ejecución dada. Ese número de residuos se elegirá al azar entre los residuos que se leyeron. De este modo, puedes leer bibliotecas de residuos hotspot arbitrariamente grandes, pero cada trayectoria solo iterará sobre un conjunto menor.

##Véase también

* [[AddSidechainConstraintsToHotspotsMover]]
* [[BestHotspotCstMover]]
* [[DockWithHotspotMover]]
* [[HotspotDisjointedFoldTreeMover]]
* [[MapHotspotMover]]
* [[PlaceStubMover]]
* [[PlaceSimultaneouslyMover]]
* [[PlaceOnLoopMover]]
* [[PlacementMinimizationMover]]
* [[I want to do x]]: guía para elegir un mover
