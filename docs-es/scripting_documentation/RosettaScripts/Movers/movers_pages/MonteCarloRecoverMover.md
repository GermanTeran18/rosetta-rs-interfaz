# MonteCarloRecover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MonteCarloRecover

Asociado con GenericMonteCarlo y MonteCarloTest. Recupera un Pose de un GenericMonteCarloMover.

```xml
<MonteCarloRecover name="(&string)" MC_name="(&string)" recover_low="(1 &bool)"/>
```

-   MC\_name: nombre de un GenericMonteCarloMover definido previamente
-   recover\_low: recupera el Pose de menor energía o el último Pose.

Es útil junto con MonteCarloRecover (abajo) si ejecutas una trayectoria formada por muchos tipos distintos de movers y quieres decidir en cada punto si el Pose ha mejorado.


##Véase también

* [[GenericMonteCarloMover]]
* [[MonteCarloTestMover]]
* [[MonteCarloUtilMover]]
* [[SubroutineMover]]
* [[GenericSimulatedAnnealerMover]]
* [[LoopOverMover]]
* [[MultiplePoseMover]]
* [[MultipleOutputWrapperMover]]
* [[I want to do x]]: guía para elegir un mover
