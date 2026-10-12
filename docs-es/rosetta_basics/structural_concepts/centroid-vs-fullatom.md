#Modos centroid y de todos los átomos

TODO: completar los detalles de esta página

En un mundo ideal con tiempo y potencia de cómputo infinitos, podríamos realizar todas nuestras simulaciones con todos los átomos. En la práctica, intentar realizar un muestreo extenso de la cadena principal incluyendo todos los átomos de las cadenas laterales es, como mucho, poco práctico. 

El primer problema es que tener todos los átomos es costoso, porque el cálculo de las interacciones entre todos los pares de átomos crece rápidamente (n<sup>2</sup>) con el número de átomos. 
El problema mayor es que el espacio conformacional con todos los átomos es **muy escabroso**, por lo que la mayoría de los movimientos son rechazados por [[Monte Carlo]].

Para sortear este problema, los Poses se suelen convertir al modo [[centroid|Glossary#centroid]] en las partes de un protocolo que requieren un muestreo extenso (por ejemplo, las etapas iniciales de la predicción de estructuras *[[ab initio|abinitio-relax]]*).  En el modo centroid, la cadena principal sigue teniendo todos los átomos, pero la representación de cada cadena lateral se simplifica a un único «átomo» de tamaño variable. Para las cadenas principales de proteínas, esta representación conserva cinco átomos de la cadena principal por cada aminoácido: el nitrógeno (N), el carbono alfa (CA), el carbono carbonílico (C), el oxígeno carbonílico (O) y el hidrógeno polar del nitrógeno. La cadena lateral se reemplaza por el átomo «CEN», cuyo radio y propiedades (polaridad, carga, etc.) se determinan por la identidad del residuo.

Las funciones de puntuación centroid son algo vagas, de la misma manera que la representación de la proteína es algo difusa. 
Esto tiene una desventaja a la hora de interpretar sus resultados, pero una enorme ventaja en que el paisaje energético es mucho menos escabroso y es más fácil muestrear conformaciones muy distintas.

Tras el muestreo a gran escala en modo centroid, los Poses generalmente se convierten de nuevo a su representación con todos los átomos para refinarlos, lo que normalmente implica alguna combinación de [[reempaquetado de cadenas laterales|Rosetta-overview#packer]] y [[minimización|minimization-overview]]. Esto permite a Rosetta puntuar con más precisión las interacciones entre cadenas laterales y otros detalles más finos de la estructura de la proteína.

##Véase también

* [[Centroid score terms]]
* [[Rosetta overview]]
* [[Glossary]]
* [[Scoring explained]]
* [[Score types]]
* [[CenRotModel]]

<!--- Gollum search optimization keywords
centroid
centroid
centroid
centroid
centroid
centroid
centroid
centroid
centroid
centroid
centroid
centroid
centroid
centroid
centroid
full atom
full atom
full atom
full atom
full atom
full atom
full atom
full atom
full atom
full atom
full atom
full atom
full atom
full atom
full atom
full atom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom
fullatom 
--->


