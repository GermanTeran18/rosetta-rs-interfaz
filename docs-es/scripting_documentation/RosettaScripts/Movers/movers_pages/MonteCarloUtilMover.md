# MonteCarloUtil
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MonteCarloUtil

(Este es un Mover de desarrollo y no está disponible en las versiones publicadas.)

Este mover recibe como entrada el nombre de un objeto montecarlo indicado por el usuario y llama sobre él a la función reset o recover\_low.

```xml
<MonteCarloUtil name="(&string)" mode="(&string)" montecarlo="(&string)"/>
```

-   mode: modo del mover de Monte Carlo. Puede ser "reset" o "recover\_low"
-   montecarlo: el objeto de Monte Carlo sobre el que se actúa


##Véase también

##Véase también

* [[GenericMonteCarloMover]]
* [[MonteCarloTestMover]]
* [[MonteCarloRecoverMover]]
* [[GenericSimulatedAnnealerMover]]
* [[SubroutineMover]]
* [[LoopOverMover]]
* [[MultiplePoseMover]]
* [[MultipleOutputWrapperMover]]
* [[I want to do x]]: guía para elegir un mover
