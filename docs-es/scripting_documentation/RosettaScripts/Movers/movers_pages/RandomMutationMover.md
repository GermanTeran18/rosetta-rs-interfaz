# RandomMutation
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RandomMutation

Introduce una mutación aleatoria en una posición cuyo rediseño está permitido, hacia una identidad de residuo permitida. Los residuos y las identidades de destino se controlan mediante `     task_operations    `. La proteína se reempaquetará según `     task_operations    ` y `     scorefxn    ` para acomodar el aminoácido mutado. El mover puede trabajar con Poses simétricos; simplemente usa [[SetupForSymmetryMover]] y ejecútalo. Averiguará por sí mismo que necesita hacer empaquetado simétrico.

Puede usarse junto con GenericMonteCarlo para generar trayectorias de maduración de afinidad.

```xml
<RandomMutation name="(&string)" task_operations="(&string comma-separated taskoperations)" scorefxn="(score12 &string)"/>
```


##Véase también

* [[GreedyOptMutationMover]]
* [[GenericMonteCarloMover]]
* [[RotamerTrialsMover]]
* [[PackRotamersMover]]
* [[Aplicación de escaneo de mutantes puntuales|pmut-scan-parallel]]
* [[I want to do x]]: guía para elegir un mover
