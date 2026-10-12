# Filtro CombinedValue
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Filtro CombinedValue

Es un filtro especial que calcula una suma ponderada a partir de filtros definidos previamente.

```xml
<CombinedValue name="(&string)" threshold="(0.0 &Real)">
    <Add filter_name="(&string)" factor="(1.0 &Real)" temp="(&Real)"/>
    <Add
</CombinedValue>
```

Por defecto, el valor es la suma directa de los valores calculados (no de los resultados lógicos) de los filtros enumerados. Se puede especificar un factor de ponderación multiplicativo para cada filtro con el parámetro `     factor    `. (Por comodidad, se puede dar `     temp    ` en lugar de `     factor    `, lo que divide el valor del filtro en vez de multiplicarlo.)

En contextos de valor de verdad, el filtro se evalúa como verdadero si la suma ponderada es menor o igual que el `     threshold    ` dado.

## Véase también

* [[BoltzmannFilter]]
* [[CompoundStatementFilter]]
* [[CalculatorFilter]]
* [[IfThenFilter]]
* [[OperatorFilter]]
* [[ReplicateFilter]]
* [[SigmoidFilter]]


