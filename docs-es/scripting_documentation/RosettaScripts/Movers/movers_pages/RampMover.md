# RampMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RampMover

Aplica repetidamente un mover dado mientras aumenta progresivamente la puntuación desde un valor bajo hasta uno alto.

```xml
<RampingMover name="(&string)" start_weight="(&real)" end_weight="(&real)" outer_cycles="(&real)" inner_cycles="(&real)" score_type="(&string)" ramp_func="(&string)" montecarlo="(&string)" mover="(&string)"/>
```

-   start\_weight: peso inicial de la rampa
-   end\_weight: peso final de la rampa
-   outer\_cycles: número de incrementos en los que se aumenta la puntuación
-   inner\_cycles: número de veces que se llama al mover interno en cada incremento de la rampa de puntuación
-   score\_type: nombre del término de puntuación que se aumenta progresivamente
-   ramp func: la función de rampa que se usa; las opciones válidas son linear, geometric o inverse\_geometric
-   montecarlo: el nombre del objeto montecarlo que se usa
-   mover: nombre del mover interno que se usa.


##Véase también

* [[GenericSimulatedAnnealerMover]]
* [[GenericMonteCarloMover]]
* [[LoopOverMover]]
* [[I want to do x]]: guía para elegir un mover
