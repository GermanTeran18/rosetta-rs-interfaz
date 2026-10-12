# ReplicateFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## ReplicateFilter

```xml
<ReplicateFilter name="(&string)" filter_name="(&string)" replicates="(&integer 1)" upper_cut="(&real 0)" lower_cut="(&real 0)" median="(&bool 0)" threshold="(&real 0)" />
```

Repite un filtro dado el número de veces indicado. Luego recorta los valores más altos y más bajos que indican upper\_cut y lower\_cut, respectivamente. Si upper/lower cut son menores que uno, se interpretan como una fracción que se quita, redondeada hacia abajo, y si son mayores que uno, como un número absoluto de réplicas que se quitan. Luego promedia los valores restantes. Por defecto usa la media de los valores, aunque si median es true usará la mediana. En contextos de valor de verdad se evaluará como verdadero si el valor resultante es menor que el umbral dado.

## Véase también

* [[BoltzmannFilter]]
* [[CompoundStatementFilter]]
* [[CombinedValueFilter]]
* [[CalculatorFilter]]
* [[OperatorFilter]]
* [[SigmoidFilter]]


