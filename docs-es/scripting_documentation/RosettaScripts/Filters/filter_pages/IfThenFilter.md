# IfThenFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## IfThenFilter

```xml
<IfThenFilter name="(&string)" threshold="(&Real 0)" lower_threshold="(&bool False)">
    <IF testfilter="(&string)" inverttest="(&bool False)" valuefilter="(&string)" value="(&Real)" weight="(&Real 1)"/>
    <IF testfilter="(&string)" inverttest="(&bool False)" valuefilter="(&string)" value="(&Real)" weight="(&Real 1)"/>
    ....
    <ELSE valuefilter="(&string)" value="(&Real 0)" weight="(&Real 1)"/>
</IfThenFilter>
```

Se evalúa a un valor que depende del valor verdadero/falso de otros filtros. Cada una de las cláusulas IF se evalúa en orden. Si el testfilter se evalúa como verdadero, el resultado numérico del IfThenFilter es el valor numérico devuelto por el valuefilter, multiplicado por el peso correspondiente. (Si inverttest es true, un testfilter falso provocará la evaluación del valuefilter.) Como alternativa, puedes omitir el valuefilter y dar un valor literal con el parámetro value (que también se multiplicará por el peso dado). Si ninguna de las cláusulas IF devuelve verdadero en sus testfilters, se usa como valor el resultado numérico del valuefilter de la cláusula ELSE (o el valor literal correspondiente) multiplicado por el peso.

Para la prueba de valor de verdad, por defecto se devuelve verdadero si el valor es menor o igual que el umbral dado. Si lower\_threshold es true, IfThenFilter devuelve verdadero si el valor es mayor o igual que el umbral.

## Véase también

* [[CompoundStatementFilter]]
* [[CombinedValueFilter]]
* [[CalculatorFilter]]
* [[BoltzmannFilter]]
* [[OperatorFilter]]
* [[SigmoidFilter]]
* [[ContingentFilter]]


