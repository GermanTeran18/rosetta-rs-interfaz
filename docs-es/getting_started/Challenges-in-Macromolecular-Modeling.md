#Desafíos en el modelado macromolecular

## Introducción
Ningún sistema de modelado, Rosetta incluido, puede producir soluciones perfectas para todos los problemas de modelado.
Salvo por error humano o del operador, los problemas que impiden obtener soluciones perfectas se deben a la puntuación o al muestreo.

El *problema de la puntuación* pregunta si, dado un conjunto de modelos, la función de puntuación puede ordenar los modelos de modo que el modelo con la mejor puntuación sea representativo de la secuencia y la estructura macromoleculares naturales u óptimas.

El *problema del muestreo* pregunta si un conjunto de modelos incluye, para empezar, la secuencia y la estructura naturales u óptimas.

[[_TOC_]]

## El problema de la puntuación
Puede que simplemente estés obteniendo la respuesta equivocada porque la función de puntuación favorece una conformación o una secuencia no nativa.
Esto es bastante fácil de diagnosticar si _conoces_ la conformación o la secuencia nativa.
Basta con puntuar un conjunto relajado derivado de ella y compararlo con el conjunto de tus modelos; si la puntuación del nativo es mucho más alta que la de los modelos, entonces el nativo no se relajó (véase [[aquí|preparing-structures]]) o la función de puntuación tiene defectos.
En tal caso, puedes poner a prueba tu hipótesis sobre la discrepancia implementando una [[restricción|constraint-file]] que, en la práctica, añade un término a la función de puntuación.
Por ejemplo, si unos pocos residuos deberían formar una hebra (según datos experimentales), restringe sus diedros y comprueba si así se producen estructuras similares al nativo.

Cuando no tienes una estructura nativa, no puedes determinar con tanta facilidad si estás puntuando correctamente o no. En el mejor de los casos, podrías obtener alguna evidencia débil si tienes estructuras de proteínas muy emparentadas; si la función de puntuación falla de forma sistemática con ellas en este sentido, puede que tampoco sea una buena opción para tu caso.

## El problema del muestreo
Hay dos razones por las que puede que no estés muestreando la secuencia o la estructura nativa: 
### Muestrear los grados de libertad equivocados
Tu [[elección de protocolo|I want to do x]] es crítica. Si quieres plegar una secuencia de proteína _ab initio_, no construyas un péptido extendido, ejecutes el minimizador y esperes lo mejor.
(De igual modo, no construyas un péptido extendido y ejecutes una trayectoria de Monte Carlo de [[SmallMoves|SmallMover]] durante varias décadas.) 

También hay errores sutiles.
Por ejemplo, quizá tu proteína tiene un enlace peptídico cis (en una posición que no es prolina).
Son raros, pero no son nada inauditos, y en muchas situaciones no muestrearás esa conformación a menos que obligues a Rosetta a considerar esa posibilidad.
Además, ¿qué pasa si tu proteína tiene un ángulo de enlace tensionado debido a una geometría muy restringida? Puede que ni siquiera te des cuenta de que la minimización cartesiana, u otras modalidades de optimización de ángulos y longitudes de enlace, son una opción.

### No muestrear lo suficiente
Con frecuencia, un usuario nuevo no "muestrea lo suficiente". 
Esto significa que el usuario no ha generado suficientes modelos.
Consulta [[Rosetta en distintas escalas|Rosetta-on-different-scales]] para saber más sobre cuánto muestreo se debe hacer.


##Véase también

* [[Rosetta on different scales]]: una guía sobre el número de estructuras que generar para distintos protocolos de Rosetta
* [[Analyzing Results]]: cómo interpretar los resultados generados con Rosetta
* [[Scoring explained]]
* [[I want to do x]]: guía para realizar distintas formas de muestreo en Rosetta
* [[Units in Rosetta]]: trata las unidades de Rosetta, incluidas las unidades de energía
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Resources for learning biophysics and computational modeling]]
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
