# MultipleOutputWrapper
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MultipleOutputWrapper

Este es un envoltorio sencillo que ejecuta el mover o el protocolo ROSETTASCRIPTS que contiene para generar Poses de salida adicionales (derivados) a partir del Pose original.
Este mover está diseñado para funcionar con MultiplePoseMover.
"MoverName" es un marcador de posición del nombre real del mover que se va a usar.
Usa este envoltorio si el mover que quieres usar no puede dar (todavía) más de un Pose de salida.

```xml
<MultipleOutputWrapper name="(&string)" max_output_poses="(&integer)">
    <MoverName .../>
</MultipleOutputWrapper>
```

o

<MultipleOutputWrapper name=(&string) max_output_poses=(&integer)>
<ROSETTASCRIPTS>        ...
    </ROSETTASCRIPTS>
</MultipleOutputWrapper>

-   max\_output\_poses: número máximo de Poses de salida que debe generar este envoltorio (es decir, cuántas veces se ejecuta el mover interno).

##Véase también

* [[MultiplePoseMover]]
* [[GenericMonteCarloMover]]
* [[MonteCarloTestMover]]
* [[MonteCarloUtilMover]]
* [[MonteCarloRecoverMover]]
* [[GenericSimulatedAnnealerMover]]
* [[LoopOverMover]]
* [[SubroutineMover]]
* [[MultiplePoseMover]]
* [[I want to do x]]: guía para elegir un mover
