# ConsensusDesignMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ConsensusDesignMover

Este mover mutará residuos a los que aparecen con mayor frecuencia en un alineamiento múltiple de secuencias, asegurándose al mismo tiempo de que el nuevo residuo puntúe bien en Rosetta. Toma como entrada una matriz de puntuación específica de posición (pssm) para determinar los residuos que aparecen con mayor frecuencia en cada posición. El usuario define una tarea del packer con los residuos que se diseñarán. En cada una de estas posiciones solo se permitirán, en el diseño posterior, los residuos que aparezcan con la misma frecuencia o con mayor frecuencia (misma puntuación pssm o superior). Después se realiza el diseño con la función de puntuación deseada, añadiendo opcionalmente una restricción de identidad de residuo proporcional a la puntuación pssm (los residuos más frecuentes obtienen mejor energía).

```xml
<ConsensusDesignMover name="&string" scorefxn="(&string)" invert_task="(&bool)" sasa_cutoff="(&float)" use_seqprof_constraints="(&bool)" task_operations="(&string)"/>
```

-   scorefxn: establece la función de puntuación deseada (definida en un bloque \<SCOREFXNS\>)
-   taskoperations: proporciona una operación de tarea que defina los residuos que quieres diseñar (o su inversa). Sin una task\_operation y con invert\_task=0, se diseñará todo.
-   use\_seqprof\_constraints: solo se permiten en la tarea del packer, en la posición i, los residuos que aparecen más a menudo en la pssm que el residuo de tipo silvestre en esa posición. Si use\_seqprof\_constraints = 0, todos ellos se permiten con la misma probabilidad; es decir, no se añade ninguna energía de restricción adicional. Si use\_seqprof\_constraints = 1, los residuos más frecuentes se añaden a la tarea del packer en el residuo i y a cada uno se le concede una restricción de secuencia aproximadamente proporcional a su puntuación pssm. En efecto, los residuos más frecuentes se incluyen en proporción a su frecuencia de aparición en la pssm.
-   sasa\_cutoff: los residuos enterrados (con sasa \< sasa\_cutoff) no se diseñarán. Los residuos de superficie (con sasa \> sasa\_cutoff) sí se diseñarán. Para realizar diseño de consenso en todos los residuos de la tarea, simplemente no indiques sasa\_cutoff o ponlo en 0.
-   invert\_task: un caso de uso común es tomar una tarea del packer de interfaz/ligando y luego hacer diseño de consenso para todo lo que queda fuera de ese diseño (que presumiblemente Rosetta ya ha optimizado para la unión). Ese uso requiere una tarea que sea lo opuesto de la tarea original. Esta opción activa esa tarea invertida.


##Véase también

* [[FavorSequenceProfileMover]]
* [[PSSM2BfactorMover]]
* [[I want to do x]]: guía para elegir un mover
