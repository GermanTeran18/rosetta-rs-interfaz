# MonteCarloTest
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MonteCarloTest

Asociado con GenericMonteCarlo. Simplemente comprueba el criterio MC del GenericMonteCarloMover indicado y guarda el Pose actual si se acepta.

```xml
<MonteCarloTest name="(&string)" MC_name="(&string)"/>
```

-   MC\_name: nombre de un GenericMonteCarloMover definido previamente

Es útil junto con MonteCarloRecover (abajo) si ejecutas una trayectoria formada por muchos tipos distintos de movers y quieres decidir en cada punto si el Pose ha mejorado.


##Véase también

* [[GenericMonteCarloMover]]
* [[SubroutineMover]]
* [[MonteCarloUtilMover]]
* [[MonteCarloRecoverMover]]
* [[GenericSimulatedAnnealerMover]]
* [[LoopOverMover]]
* [[MultiplePoseMover]]
* [[MultipleOutputWrapperMover]]
* [[I want to do x]]: guía para elegir un mover
