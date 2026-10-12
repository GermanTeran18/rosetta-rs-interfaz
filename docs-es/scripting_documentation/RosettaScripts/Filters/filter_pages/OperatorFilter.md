# Operator
## Operator

Parte del algoritmo de diseño de lógica difusa:

* Warszawski S, Netzer R, Tawfik DS, Fleishman SJ. A "fuzzy"-logic language for encoding multiple physical traits in biomolecules. J Mol Biol 2014. 

Los valores de los filtros Sigmoid se combinan en una sentencia de lógica difusa mediante el filtro Operator, que
define los operadores (AND y OR) que se aplican a los valores Sigmoid combinados.
Los filtros Operator se pueden combinar jerárquicamente dentro de otros filtros Operator, lo que da un marco completo para definir cualquier combinación de operadores booleanos que actúen sobre ocupaciones fraccionales calculadas. Finalmente, el filtro Operator se alimenta al mover GenericMonteCarlo. En cada iteración, GenericMonteCarlo invoca el mover RandomMutation, que define el conjunto de posiciones permitidas y las identidades de aminoácido permitidas en cada posición. Cuando se invoca el mover RandomMutation, se introduce una mutación puntual aleatoria según las definiciones de posiciones e identidades permitidas del usuario, y las cadenas laterales a 6Å de la mutación se someten a un reempaquetado combinatorio. Luego GenericMonteCarlo llama al filtro Operator y compara el valor obtenido del filtro Operator con el valor del Pose aceptado actualmente. GenericMonteCarlo también guarda en memoria el Pose con la mejor
evaluación de Operator y al final de la trayectoria devuelve ese mejor Pose. Para implementar una política de recocido simulado, dividimos la simulación de Monte Carlo en tres pasos de Monte Carlo separados, que empiezan con temperatura alta y terminan con temperatura cero.


suma, multiplica, o busca el máximo o el mínimo de una lista de filtros

```xml
<Operator name="(&string)" filters="(comma-separated list of filters&string)" threshold="(0&Real)" operation="(one of: SUM/NORMALIZED_SUM/PRODUCT/MIN/MAX/SUBTRACT/ABS/BOOLEAN_OR &string)" negate="(0&bool)" logarithm="(0&bool)"/>
```

Evalúa la lista de filtros con el operador y devuelve si superan o no el umbral. NORMALIZED\_SUM devuelve la suma dividida por el número de filtros. SUBTRACT acepta solo dos filtros y devuelve el primero - el segundo. ABS acepta solo un filtro y devuelve el valor absoluto del report\_sm de ese filtro. BOOLEAN\_OR(x,y) = x + y - x\*y

Se permiten operadores de operadores, lo que da una forma de generar cualquier sentencia.

-   filters: lista de filtros definidos previamente sobre los que se realiza la operación
-   negate: multiplica el valor devuelto por -1. Útil en optimización
-   logarithm: toma el valor log(x) del operador resultante. Recomendamos usar esta opción en el marco de diseño de lógica "difusa" con el operador PRODUCT, ya que transforma el valor del operador en un término de energía, adecuado para el mover GenericMonteCarlo que viene a continuación. 

## Véase también:

* [[BoltzmannFilter]]
* [[CompoundStatementFilter]]
* [[CombinedValueFilter]]
* [[CalculatorFilter]]
* [[IfThenFilter]]
* [[SigmoidFilter]]
* [[ReplicateFilter]]


