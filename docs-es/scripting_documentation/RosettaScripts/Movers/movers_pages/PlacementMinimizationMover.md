# PlacementMinimization
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PlacementMinimization

Este es un mover especial asociado con PlaceSimultaneously, más abajo. Realiza la minimización de cuerpo rígido hacia todos los stubsets.

```xml
<PlacementMinimization name="( &string)" minimize_rb="(1 &bool)" host_chain="(2 &integer)" optimize_foldtree="(0 &bool)" cb_force="(0.5 &Real)">
  <StubSets>
    <Add stubfile="(&string)"/>
  </StubSets>
</PlacementMinimization>
```


##Véase también

* [[PlaceSimultaneouslyMover]]
* [[RosettaScriptsPlacement]]
* [[MinMover]]
* [[SymMinMover]]
* [[Minimization overview]]
* [[AddSidechainConstraintsToHotspotsMover]]
* [[BestHotspotCstMover]]
* [[DockWithHotspotMover]]
* [[HotspotDisjointedFoldTreeMover]]
* [[MapHotspotMover]]
* [[PlaceStubMover]]
* [[PlaceOnLoopMover]]
* [[I want to do x]]: guía para elegir un mover
