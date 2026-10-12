# PlaceOnLoop
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PlaceOnLoop

Remodela loops mediante cierre cinemático de loops, incluyendo la inserción y la eliminación de residuos. Gestiona la aplicación de restricciones de hotspot a través de estos cambios de secuencia.

```xml
<PlaceOnLoop name="( &string)" host_chain="(2 &integer)" loop_begin="(&integer)" loop_end="(&integer)" minimize_toward_stub="(1&bool)" stubfile="(&string)" score_high="(score12 &string)" score_low="(score4L&string)" closing_attempts="(100&integer)" shorten_by="(&comma-delimited list of integers)" lengthen_by="(&comma-delimited list of integers)"/>
```

Por ahora solo está disponible minimize\_toward\_stub. closing attempts: cuántos ciclos de cierre cinemático de loops se usan. shorten\_by, lengthen\_by: en cuántos residuos se cambia el loop. Por defecto también se añade la opción de no cambiar nada.

En cada intento se elegirá y se probará al azar un cambio de loop. Si el loop no puede cerrarse, se informará del fallo.

Demostrado en JMB 413:1047


##Véase también

* [[RosettaScriptsPlacement]]
* [[RosettaScriptsLoopModeling]]
* [[Aplicación loopmodel|loopmodel]]
* [[Formato de archivo de loops|loops-file]]
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
