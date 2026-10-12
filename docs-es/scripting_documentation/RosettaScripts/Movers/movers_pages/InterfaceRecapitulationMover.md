# InterfaceRecapitulation
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## InterfaceRecapitulation

Prueba un mover de diseño según su capacidad de recapitular la secuencia nativa. Es similar al filtro SequenceRecovery (véase más abajo), salvo que este mover engloba específicamente un mover de diseño.

```xml
<InterfaceRecapitulation name="(&string)" mover_name="(&string)"/>
```

El mover especificado debe derivar de la clase base [[DesignRepackMover]] o [[PackRotamersMover]] y hacer que la tarea del packer muestre qué residuos se han diseñado. Después, el mover calcula cuántos residuos tenían permitido diseñarse y el número de residuos que han cambiado, y produce la tasa de recapitulación de la secuencia. Para la comparación se usa la Pose del momento del análisis (parse).


##Véase también

* [[ProteinInterfaceMSMover]]: mover para el diseño multiestado de interfaces de proteínas
* [[DnaInterfacePackerMover]]
* [[InterfaceAnalyzerMover]]
* [[InterfaceScoreCalculatorMover]]
* [[I want to do x]]: guía para elegir un mover
