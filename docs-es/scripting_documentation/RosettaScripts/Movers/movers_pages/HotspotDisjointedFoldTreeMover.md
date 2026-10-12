# HotspotDisjointedFoldTree
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## HotspotDisjointedFoldTree

Crea un foldtree disjunto en el que cada residuo seleccionado tiene cortes en sus lados N-terminal y C-terminal.

```xml
<HotspotDisjointedFoldTree name="(&string)" ddG_threshold="(1.0 &Real)" resnums="('' comma-delimited list of residues &string)" scorefxn="(score12 &string)" chain="(2 &Integer)" radius="(8.0 &Real)"/>
```

-   ddG\_threshold: el procedimiento puede buscar automáticamente residuos de hotspot usando este umbral. Si quieres desactivarlo, especifica un número superior a 100 R.e.u. y define los residuos en resnums
-   chain: cualquier cadena distinta de la cadena 1 no está probada, pero no debería ser muy difícil hacer que funcione.
-   radius: a qué distancia de la proteína diana se considera interfaz. Se usa junto con ddG\_threshold para establecer automáticamente los residuos diana.


##Véase también

* [[FoldTree Overview]]
* [[RosettaScriptsPlacement]]
* [[FoldTreeFromLoopsMover]]
* [[VirtualRootMover]]
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
