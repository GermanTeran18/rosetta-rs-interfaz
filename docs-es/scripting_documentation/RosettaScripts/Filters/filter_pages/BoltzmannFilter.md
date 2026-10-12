# Boltzmann
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Boltzmann

Devuelve la suma ponderada de Boltzmann de un conjunto de filtros positivos y negativos. La aptitud (fitness) se define en realidad como -F, con rango [-1-0] (-1 es lo más óptimo, 0 lo menos).

```xml
<Boltzmann name="(&string)" fitness_threshold="(0&real)" temperature="(0.6 &real)" positive_filters="(&comma delimited list)" negative_filters="(&comma delimited list)" anchors="(&comma delimited list of floats)" triage_threshold="(-9999 &int)" norm_neg="(false &bool)"/>
```

-   fitness\_threshold: por debajo de qué umbral de aptitud se permite.
-   temperature: el factor de ponderación de Boltzmann (en realidad, kT y no T).
-   positive\_filters: una lista de filtros predefinidos que se usan como estados positivos. Se invocan los métodos report\_sm de los filtros, así que no hay que preocuparse por sus umbrales.
-   negative\_filters: igual que lo anterior, pero para los negativos.
-   anchors: un ancla por cada estado positivo para limitar la deriva de su energía. No especificar anclas es válido. Un valor muy alto del ancla equivale, en la práctica, a no tener ancla.
-   triage\_threshold: por encima de qué umbral (p. ej., delta de puntuación/delta de ddg) un estado negativo se cuenta en el cálculo de la aptitud de Boltzmann. Esto evita la dilución de los estados negativos.
-   norm\_neg: normaliza la aptitud del estado de mutación en relación con el estado original. Cuando se usa triage\_threshold cambia el número de estados negativos, por lo que se necesita norm\_neg para comparar mutaciones en la misma posición.

Útil para equilibrar objetivos opuestos.

## Véase también

* [[CompoundStatementFilter]]
* [[CombinedValueFilter]]
* [[CalculatorFilter]]
* [[OperatorFilter]]
* [[ReplicateFilter]]
* [[SigmoidFilter]]



