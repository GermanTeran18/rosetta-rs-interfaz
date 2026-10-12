# Sigmoid
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Sigmoid

Parte del algoritmo de diseño de lógica difusa:
Warszawski S, Netzer R, Tawfik DS, Fleishman SJ. A 'fuzzy'-logic language for encoding multiple physical traits in biomolecules. J Mol Biol 2014. 

Consulta el filtro Operator para más detalles.

Transforma el valor de un filtro según una sigmoide: $$f(x) = 1 / ( 1 + (steepness)e^{ (x - offset - baseline) } ) )$$

El punto medio del filtro está en offset, y steepness determina lo empinada que es la subida en el punto medio.

```xml
<Sigmoid name="(&string)" filter="(&string)" threshold="(0 &Real)" steepness="(1.0 &Real)" offset="(0.0 &Real)" negate="(0 &bool)" baseline_checkpoint="(''&string)"/>
```

-   threshold: los valores por encima de este umbral pasan como verdaderos
-   negate: sustituye x por 1-x en la evaluación (como el operador booleano NOT).
-   baseline\_checkpoint: nombre del archivo para llevar el seguimiento del valor de la línea base. 
-   baseline: el valor del filtro cuando se llama a un método llamado reset\_baseline. Esto permite al usuario tener un ajuste dinámico del offset que se usa para calcular la transformación (véanse más detalles abajo).

La función de arriba alcanza asintóticamente 0 para x alto y 1 para x bajo. El offset se puede modificar durante la ejecución con la función reset\_baseline, pero por ahora esto solo está disponible para el filtro Operator.

La línea base solo se puede fijar dentro del código de Rosetta y se dispara con el reset\_baseline del filtro Operator. A su vez, el reset\_baseline del filtro Operator se dispara con GenericMonteCarloMover en la primera iteración por el mover. Las llamadas posteriores a Operator (y, a través de él, a Sigmoid) se evalúan con esta línea base. De este modo, el usuario puede determinar a priori el offset como un umbral por encima o por debajo del valor inicial del filtro al comienzo de GenericMonteCarlo. Por ejemplo, supón que estás optimizando la energía de unión, pero no sabes cuál será la energía de unión al comienzo de GenericMonteCarlo. Fijas el offset en 2, y si la energía de unión se evalúa en -10 al inicio de la simulación de Monte Carlo, el offset pasa a ser -8.

Si fijas baseline\_checkpoint con un nombre de archivo, la línea base se guardará en un archivo y se leerá de él en caso de fallo o recuperación. Esto es útil si una trayectoria larga de MC fue interrumpida y hay que reiniciarla. La lectura de la línea base desde el archivo de checkpoint solo se dispara si el ensayo de MC es mayor que 1. Si es 1, la línea base se calcula y se escribe en el archivo de checkpoint.

## Véase también

* [[BoltzmannFilter]]
* [[CompoundStatementFilter]]
* [[CombinedValueFilter]]
* [[CalculatorFilter]]
* [[IfThenFilter]]
* [[OperatorFilter]]
* [[ReplicateFilter]]


