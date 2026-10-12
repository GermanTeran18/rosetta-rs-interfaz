# build\_Ala\_pose
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## build\_Ala\_pose

Convierte en alaninas uno o ambos lados de una interfaz (salvo las prolinas y glicinas, que se dejan como en la entrada) dentro de una esfera de radio 'interface\_distance\_cutoff' alrededor de la interfaz. Es útil como paso previo a los pasos de diseño que intentan optimizar una parte concreta de la interfaz. Es menos probable que las alaninas "estorben" a rotámeros realmente buenos.

```xml
<build_Ala_pose name="(ala_pose &string)" partner1="(0 &bool)" partner2="(1 &bool)" interface_cutoff_distance="(8.0 &float)" task_operations="('' &string)"/>
```

-   task\_operations: consulta [RepackMinimize](#RepackMinimize)


##Véase también

* [[MakePolyXMover]]
* [[SaveAndRetrieveSidechainsMover]]
* [[PackRotamersMoverPartGreedyMover]]
* [[PredesignPerturbMover]]
* [[EnzRepackMinimizeMover]]
* [[I want to do x]]: guía para elegir un mover
