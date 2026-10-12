# AddSidechainConstraintsToHotspots
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AddSidechainConstraintsToHotspots

Añade restricciones armónicas a los átomos de la cadena lateral de los residuos objetivo (para usarse junto con HotspotDisjointedFoldTree). Guarda los archivos de registro, ya que serán necesarios para la siguiente etapa de la maduración de afinidad.

```xml
<AddSidechainConstraintsToHotspots name="(&string)" chain="(2 &Integer)" coord_sdev="(1.0 &Real)" resnums="(comma-delimited list of residue numbers)"/>
```

-   resnums: los residuos a los que se añaden restricciones. Ten en cuenta que esta lista se tratará además de cualquier residuo que tenga puntos de corte a cualquiera de sus lados.
-   coord\_sdev: la desviación estándar de las restricciones de coordenadas. Cuanto menor sea, más estrictas son las restricciones.


##Véase también

* [[ConstraintSetMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[BestHotspotCstMover]]
* [[AtomCoordinateCstMover]]
* [[ClearConstraintsMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[TaskAwareCstsMover]]
* [[RosettaScriptsPlacement]]: movers relacionados con puntos calientes (hotspots), etc.
* [[DockWithHotspotMover]]
* [[HotspotDisjointedFoldTreeMover]]
* [[MapHotspotMover]]
* [[PlaceStubMover]]
* [[PlaceSimultaneouslyMover]]
* [[PlaceOnLoopMover]]
* [[PlacementMinimizationMover]]
* [[I want to do x]]: guía para elegir un mover
