# BestHotspotCst
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## BestHotspotCst

Elimina las restricciones BackboneStub de hotspot de todos los residuos salvo los best\_n mejores, y luego vuelve a aplicar restricciones solo a esos best\_n residuos con la constante de fuerza cb\_force dada. Es útil para reducir un conjunto de restricciones derivado de hotspots y evitar que varios residuos queden "frustrados" durante la minimización.

```xml
<BestHotspotCst name="(&string)" chain_to_design="(2 &integer)" best_n="(3 &integer)" cb_force="(1.0 &Real)"/>
```

-   best\_n: cuántos residuos se eligen. Si hay menos de best\_n residuos con restricciones, solo se elegirán esos pocos residuos.
-   chain\_to\_design: en qué cadena se vuelven a aplicar las restricciones
-   cb\_force: fuerza sobre Cbeta que se usa al volver a aplicar las restricciones


##Véase también

* [[RosettaScriptsPlacement]]: movers relacionados con hotspots, etc.
* [[AddSidechainConstraintsToHotspotsMover]]
* [[ConstraintSetMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[ClearConstraintsMover]]
* [[AddConstraintsToCurrentConformationMover]]
* [[TaskAwareCstsMover]]
* [[DockWithHotspotMover]]
* [[HotspotDisjointedFoldTreeMover]]
* [[MapHotspotMover]]
* [[PlaceStubMover]]
* [[PlaceSimultaneouslyMover]]
* [[PlaceOnLoopMover]]
* [[PlacementMinimizationMover]]
* [[I want to do x]]: guía para elegir un mover
