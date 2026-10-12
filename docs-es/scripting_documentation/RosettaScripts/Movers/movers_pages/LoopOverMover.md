# LoopOver
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## LoopOver

Permite repetir un mover en bucle usando como condición de parada un número de iteraciones o un filtro (lo que ocurra primero). Combinar el mover ParsedProtocol (antes llamado mover DockDesign) con este bucle puede ser útil, por ejemplo, cuando hacer ciertos movimientos es costoso y quieres agotar otros movimientos más cortos.

```xml
<LoopOver name=(&string) mover_name=(&string) filter_name=( false_filter &string) iterations=(10 &Integer) drift=(true &bool) ms_whenfail=("MS_SUCCESS" &string) />
```

* drift:

    * true: el estado del Pose al final de la iteración anterior será el estado inicial de la siguiente iteración. 
    * false: el estado del Pose al inicio de cada iteración se restablece al estado que tenía cuando se llamó al mover por primera vez. 

Ten en cuenta que «salirse por el final» de las iteraciones revertirá al Pose de entrada original, incluso si drift es true.

* ms_whenfail: abreviatura de «Mover state when fail» (estado del mover en caso de fallo); fija el estado del mover LoopOver cuando se agotan las iteraciones y el filtro devuelve false. Si esta opción se deja en "MS_SUCCESS" (el valor por defecto) puede haber dos resultados: si la opción "drift" está activa, LoopOver devolverá el Pose tras aplicar el mover interno; si "drift" no está activa, devolverá el Pose de entrada. Si ms_whenfail="FAIL_DO_NOT_RETRY", Rosetta terminará con un error a menos que el filtro devuelva True. Para ver más valores de ms_whenfail consulta src/protocols/moves/MoverStatus.cc.

El código está en src/protocols/protein_interface_design/movers/LoopOver.cc

Este mover está en parte obsoleto en favor del mover más general GenericMonteCarlo.


##Véase también

* [[GenericMonteCarloMover]]
* [[RandomMover]]
* [[MonteCarloTestMover]]
* [[MonteCarloUtilMover]]
* [[MonteCarloRecoverMover]]
* [[GenericSimulatedAnnealerMover]]
* [[SubroutineMover]]
* [[MultiplePoseMover]]
* [[MultipleOutputWrapperMover]]
* [[I want to do x]]: guía para elegir un mover
