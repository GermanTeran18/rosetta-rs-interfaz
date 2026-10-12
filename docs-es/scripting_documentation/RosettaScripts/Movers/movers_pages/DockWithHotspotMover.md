# DockWithHotspotMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## DockWithHotspotMover

Realiza docking en modo centroide con restricciones de hotspot de largo alcance y la función de energía interchain\_cen.

```xml
<DockWithHotspotMover name="&string" hotspot_score_weight="(10 &Real)" centroidscore_filter="(0 &Real)" hotspotcst_filter="40 &Real">
     <HotspotFiles explosion="(0 &integer)" stub_energy_threshold="(1.0 &Real)"  max_cb_dist="(3.0 &Real)" cb_force="(0.5 &Real)">
        <HotspotFile file_name="(hotspot1 &string)" cb_force="1.0 &Real"/>
        <HotspotFile file_name="(hotspot2 &string)" cb_force="1.0 &Real"/>
     </HotspotFiles>
</DockWithHotspotMover>
```

-   hotspot\_score\_weight es la ponderación de las restricciones de hotspot
-   centroidscore\_filter se evalúa cuando la interfaz se muta a alanina y la Pose se convierte a centroide. Solo se conservarán los decoys de docking que superen este umbral.
-   hotspotcst\_filter es un término de penalización resultante de la suma de todas las bibliotecas de stubs. Solo se conservarán los decoys de docking que superen este umbral. El valor predeterminado es 40 para cada biblioteca de stubs.
-   file\_name es el nombre de la biblioteca de stubs. Ponlo en varias líneas si tienes varias bibliotecas de stubs.
-   cb\_force es el factor de ponderación al hacer coincidir la distancia CB. El valor predeterminado es 1.0. Ponlo en 0.0 cuando solo te interese que coincida la cadena principal (Ca, C y N). Es útil para usar puentes de hidrógeno de la cadena principal en la biblioteca de hotspots.


##Véase también

* [[DockingMover]]
* [[DockingProtocolMover]]
* [[FlexPepDockMover]]
* [[HighResDockerMover]]
* [[Docking applications]]: aplicaciones de línea de comandos para docking
* [[RosettaScriptsPlacement]]
* [[AddSidechainConstraintsToHotspotsMover]]
* [[BestHotspotCstMover]]
* [[HotspotDisjointedFoldTreeMover]]
* [[MapHotspotMover]]
* [[PlaceStubMover]]
* [[PlaceSimultaneouslyMover]]
* [[PlaceOnLoopMover]]
* [[PlacementMinimizationMover]]
* [[I want to do x]]: guía para elegir un mover
