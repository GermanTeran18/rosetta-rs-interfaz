# PlaceSimultaneously
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PlaceSimultaneously

Coloca residuos hotspot simultáneamente sobre un scaffold, en lugar de hacerlo de forma iterativa como en PlaceStub. Es más rápido, lo que permite más muestreo de la cadena principal, y debería ser útil para colocar más de 2 hotspots.

```xml
<PlaceSimultaneously name="(&string)" chain_to_design="(2 &Integer)" repack_non_ala="(1 &bool)" optimize_fold_tree="(1 &bool)" after_placement_filter="(true_filter &string)" auction="(&string)" stub_score_filter="(&string)" stubscorefxn="backbone_stub_constraint &string" coor_cst_cutoff="100 &Real"/>
     <DesignMovers>
        <Add mover_name="(null_mover &string)" use_constraints="(1 &bool)" coord_cst_std="(0.5 &Real)"/>
     </DesignMovers>
     <StubSets explosion="(0 &integer)" stub_energy_threshold="(1.0 &Real)"  max_cb_dist="(3.0 &Real)" cb_force="(0.5 &Real)">
        <Add stubfile="(& string)" filter_name="(&string)"/>
     </StubSets>
     <StubMinimize min_repeats_before_placement="(0&Integer)" min_repeats_after_placement="(1&Integer)">
       <Add mover_name="(null_mover &string)" bb_cst_weight="(10.0 &Real)"/>
     </StubMinimize>
     <NotifyMovers>
       <Add mover_name="(&string)"/>
     </NotifyMovers>
</PlaceSimultaneously>
```

La mayoría de las opciones son similares a las de PlaceStub arriba. Las diferencias se indican a continuación:

-   explosion: qué chis se «explotan»
-   stub\_energy\_threshold: tras la colocación y la minimización, qué umbral de energía se usa para cada uno de los hotspots.
-   after\_placement\_filter: después de que pasen todos los filtros de colocación individuales, se llama a este (¿puede ser redundante?)
-   min\_repeats: cuántas repeticiones de minimización (sobre los movers StubMinimize) tras la colocación
-   a los movers definidos bajo NotifyMovers no se les permitirá cambiar las identidades ni los rotámeros de sus residuos hotspot más allá de lo que PlaceSimultaneously haya decidido. Esto es útil para evitar perder los residuos hotspot en los movers de diseño tras la colocación.
-   los filtros especificados en la sección StubSets pueden ser fijados por PlaceSimultaneously durante su ejecución. Esto permite fijar filtros específicamente para los residuos hotspot colocados. Uno de estos filtros es AtomicContact.
-   rb\_stub\_minimization: un mover StubMinimization que se ejecutará antes de PlaceSimultaneously.
-   auction: un mover Auction que se ejecutará antes de PlaceSimultaneously.
-   stub\_score\_filter: un StubScoreFilter que se ejecutará antes de PlaceSimultaneously.
-   stubscorefxn es la función de energía que se usa para el hotspot; por defecto es backbone\_stub\_constraint, para reproducir los resultados antiguos. Usar "backbone\_stub\_linear\_constraint" hará que placesimultaneously use un protocolo distinto. La diferencia es que, en lugar de elegir al azar un tipo de la biblioteca de stubs, este protocolo elegirá solo el tipo de residuo de la biblioteca de stubs que, al ser colocado por el packer, tenga la menor desviación (energía de restricción de coordenadas) respecto a la conformación de la biblioteca de stubs.
-   coor\_cst\_cutoff es el umbral de energía de restricción de coordenadas entre los residuos hotspot añadidos y el de la biblioteca de stubs. Se usa con stubscorefxn=backbone\_stub\_linear\_constraint. PlaceSimultaneously falla si los residuos colocados se desvían más allá de este umbral.

rb\_stub\_minimization, auction y stub\_score\_filter permiten al usuario especificar los primeros movimientos y pasos de filtrado de PlaceSimultaneously antes de llamar propiamente a PlaceSimultaneously. De este modo, una configuración puede descartarse rápidamente si no es compatible con la colocación (mediante el filtrado de Auction). Si la configuración pasa estos filtros y movers, PlaceSimultaneously puede ejecutarse dentro de bucles de docking y colocación, hasta que se identifique un diseño que produzca un ddg y un sasa razonables.


##Véase también

* [[AuctionMover]]: mover especial asociado con PlaceSimultaneously
* [[RosettaScriptsPlacement]]
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
