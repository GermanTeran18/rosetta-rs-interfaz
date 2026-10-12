#¿Qué son las «coordenadas internas» y por qué las usa Rosetta?

_Esto es un ensayo, pero siéntete libre de llenarlo de enlaces según haga falta._

En términos cartesianos, cada átomo de cada residuo representa tres grados de libertad.
La posición de cada átomo varía de forma independiente y podría optimizarse por separado.
De hecho, en la [[minimización cartesiana|Cartesian minimization]], ciertos protocolos de Rosetta hacen precisamente eso.

El problema es que, en términos generales, ¡3N grados de libertad son simplemente demasiados!
Así que obtenemos una aproximación a estos grados de libertad que nos facilita mucho la vida y nos exige buscar en mucho menos espacio.
Quizá quieras recordar aquí la idea del álgebra lineal de _cambiar de base_.
Si tienes un espacio vectorial, normalmente hay varias maneras de representar cada punto de ese espacio, cada una de las cuales es una base.
Por ejemplo, en R<sup>3</sup> puedes usar (1,0,0), (0,1,0) y (0,0,1) como base, pero cualquier otro conjunto de tres vectores linealmente independientes también sirve.
Pero, lo que es importante, siempre se necesitarán _tres_ vectores linealmente independientes para generar R<sup>3</sup>.

De manera similar, habrá, por defecto, exactamente tantas coordenadas internas como coordenadas cartesianas: las longitudes de enlace, los ángulos y los diedros corresponden a cada una de las coordenadas x, y y z de cada átomo.
Pero a la escala de las fuerzas que normalmente influyen en el plegamiento de las proteínas, las constantes de resorte asociadas a los ángulos y las longitudes de enlace no son accesibles a la distorsión.
Así que cada longitud y ángulo de enlace que mantenemos aproximadamente fijo elimina un grado de libertad del conjunto.

Apoyarse en las coordenadas internas proporciona un subconjunto diminuto de todo el espacio cartesiano y permite aproximar soluciones a problemas intratables.

Ciertos protocolos dependen de las coordenadas cartesianas y de la minimización, y eso está bien. Pero a menos que haya una razón de peso para hacerlo, o a menos que tengas motivos para creer que en tu muestreo inicial ya te has acercado lo suficiente a la respuesta deseada como para que la mayoría de los grados de libertad estén bien restringidos y el resto se pueda optimizar.
Esto se hace eco de un motivo común en Rosetta en particular y en la simulación Monte Carlo en general (en cualquier circunstancia en la que haya que muestrear un espacio grande y conformarse con no hacerlo de forma exhaustiva):
Es mucho mejor muestrear los grados de libertad de manera asíncrona.
Por eso, por ejemplo, muchos protocolos tienen dos fases ([[baja y alta resolución|centroid-vs-fullatom]]).
Aprovechar el conjunto reducido de variables que ofrece el apoyarse en coordenadas internas es esencial para los algoritmos de muestreo de Rosetta.


##Véase también

* [[Atomtree overview]]
* [[Rosetta overview]]