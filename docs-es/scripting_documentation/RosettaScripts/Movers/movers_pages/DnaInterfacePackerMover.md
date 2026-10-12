# DnaInterfacePacker
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## DnaInterfacePacker

```xml
<DnaInterfacePacker name="(&string)" scorefxn="(&string)" task_operations="(&string,&string,&string)" binding="(0, &bool)" base_only="(false, &bool)" minimize="(0, &bool)" probe_specificity="(0, &bool)" reversion_scan="(false, &bool)"/>
```

-   binding: calcula la energía de unión
-   base\_only: considera solo la interacción con las bases del ADN
-   minimize: minimiza las cadenas laterales de la proteína en la interfaz
-   probe\_specificity: calcula la energía de unión de la proteína diseñada a dianas de ADN alternativas y calcula una puntuación de especificidad
-   reversion\_scan: revierte las mutaciones que no contribuyen a la puntuación de especificidad

##Véase también

* [[Rosetta DNA]]: aplicación de línea de comandos para modelar interacciones proteína-ADN
* [[ProteinInterfaceMSMover]]
* [[InterfaceAnalyzerMover]]
* [[InterfaceRecapitulationMover]]
* [[InterfaceScoreCalculatorMover]]
* [[I want to do x]]: guía para elegir un mover
