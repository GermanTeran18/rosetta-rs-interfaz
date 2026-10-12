Puedes encontrar un tutorial introductorio sobre cómo puntuar biomoléculas con Rosetta [aquí](https://www.rosettacommons.org/demos/latest/tutorials/scoring/scoring). Esta página pretende ser útil de forma general para entender cómo puntúa Rosetta las conformaciones de macromoléculas.


## Clases necesarias ##

### EnergyMethod ###

Un método de energía (EnergyMethod) es el caballo de batalla de la puntuación en Rosetta.

Un EnergyMethod puede corresponder a varios ScoreTypes.  Por ejemplo, el [[EnergyMethod de enlaces de hidrógeno|hbonds]] corresponde a varios [[tipos de puntuación|score types]], incluidos hbond_sr_bb, hbond_lr_bb, hbond_bb_sc y hbond_sc.

* `EnergyGraph`: almacena las energías entre residuos para los pares de residuos que interactúan.

* `EnergyEdge`: cada arista almacena las interacciones de un par individual de residuos

* `EnergyMap`: asigna los tipos de puntuación a sus valores

* `ScoreFunction`: la clase principal responsable de puntuar un Pose. 

##Definiciones relacionadas con EnergyMethod

* **Energías de un cuerpo**: energías intrarresiduo. Se almacenan por separado del EnergyGraph.

* **Energías de dos cuerpos**: energías entre residuos evaluadas entre pares de residuos. Se almacenan en el EnergyGraph.

* **Energías de estructura completa**: estas energías se aplican (como ya habrás adivinado) a toda la estructura.

* **Dependiente del contexto**: la energía de un residuo o de un par de residuos depende de la conformación de los residuos circundantes. Por ejemplo, la fuerza de un [[enlace de hidrógeno|hbonds]] entre dos residuos depende del número de vecinos que tenga cada residuo.

* **Independiente del contexto**: la energía de un residuo o de un par de residuos no depende del entorno (p. ej. la energía de Lennard-Jones).

* **Corto alcance**: hay una distancia de corte más allá de la cual se considera que esta energía es cero (es decir, la energía no se evalúa entre dos residuos a menos que estén dentro de esa distancia de corte).  Por ejemplo, las [[energías de enlaces de hidrógeno|hbonds]] son de corto alcance.

* **Largo alcance**: no hay distancia de corte; la energía se evalúa para todos los pares de residuos aplicables.  Normalmente solo se evalúan entre ciertos pares de residuos (p. ej. [[AtomPairConstraints|constraint-file]]

##Jerarquía de EnergyMethods

###Energías de un cuerpo

####Energías de un cuerpo independientes del contexto

####Energías de un cuerpo dependientes del contexto

###Energías de dos cuerpos

####Energías de dos cuerpos de corto alcance

######Energías de dos cuerpos de corto alcance independientes del contexto

######Energías de dos cuerpos de corto alcance dependientes del contexto

####Energías de dos cuerpos de largo alcance

######Energías de dos cuerpos de largo alcance independientes del contexto

######Energías de dos cuerpos de largo alcance dependientes del contexto

###Energías de estructura completa

##Descripción general del algoritmo de puntuación

1. Determinar qué energías habrá que volver a puntuar:
   1. Para los pares de residuos que se han movido uno respecto del otro, quitar del EnergyGraph el EnergyEdge de ese par (esas energías hay que reevaluarlas).
   2. Detectar qué pares de residuos están cerca entre sí (dentro del corte de las energías de dos cuerpos de corto alcance)
   3. Para los pares de residuos que a) están dentro de la distancia de corte y b) cuya distancia mutua ha cambiado, añadir una arista para ese par al EnergyGraph.
2. Para cada par de residuos, evaluar las energías de *corto alcance*:
   1. Puntuar las energías de dos cuerpos dependientes del contexto
   2. Si los residuos se han movido uno respecto del otro, puntuar las energías de dos cuerpos independientes del contexto
3. Para cada residuo:
   1. Puntuar las energías de un cuerpo dependientes del contexto
   2. Si el residuo ha tenido cambios en sus grados de libertad internos (p. ej. si se ha reempaquetado su cadena lateral), puntuar las energías de un cuerpo independientes del contexto
4. Puntuar las energías de dos cuerpos de largo alcance si son dependientes del contexto y/o si los residuos se han movido uno respecto del otro.
5. Puntuar las energías de estructura completa



##Véase también

* [Tutorial de puntuación](https://www.rosettacommons.org/demos/latest/tutorials/scoring/scoring)
* [[Rosetta overview]]
* [[Units in Rosetta]]: describe las unidades de energía de Rosetta
* [[Funciones de puntuación y términos de puntuación|score-types]]
* [[Términos de puntuación adicionales|score-types-additional]]
* [[Términos de guía para el diseño|design-guidance-terms]]
* [[Término de energía de enlaces de hidrógeno|hbonds]]
* [[AACompositionEnergy]]
* [[Funciones de puntuación para residuos y moléculas no canónicos|NC-scorefunction-info]]
* [[Añadir nuevos términos de puntuación|new-energy-method]]
