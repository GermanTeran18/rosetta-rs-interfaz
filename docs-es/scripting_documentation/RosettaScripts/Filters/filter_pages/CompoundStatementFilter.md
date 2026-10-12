# Filtro CompoundStatement
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Filtro CompoundStatement

Es un filtro especial que usa filtros definidos previamente para construir una sentencia lógica compuesta con las operaciones `NOT`, `AND`, `OR`, `XOR`, `NAND`, `NOR`, `ANDNOT` y `ORNOT`. Al hacer sentencias compuestas de sentencias compuestas, se puede definir esencialmente cualquier sentencia lógica.

```xml
<CompoundStatement name="(&string)" invert="(false &bool)">
    <(&OPERATION) filter_name="(true_filter &string)"/>
    ....
</CompoundStatement>
```

donde (&OPERATION) es cualquiera de las operaciones definidas arriba en mayúsculas. Ten en cuenta que las operaciones se realizan en el orden en que están definidas. No se aplica ninguna regla de precedencia, así que cualquier precedencia debe escribirse explícitamente haciendo sentencias compuestas de sentencias compuestas. Con invert=true, el valor booleano final se invierte. Si, por ejemplo, se evalúan varias sentencias AND y cada una da true, el filtro devolverá false.

Ten en cuenta que la primera OPERATION especificada en la sentencia compuesta se trata como una negación si es `NOT`, `ANDNOT` u `ORNOT`.

## Véase también

* [[BoltzmannFilter]]
* [[CombinedValueFilter]]
* [[CalculatorFilter]]
* [[IfThenFilter]]
* [[OperatorFilter]]
* [[ReplicateFilter]]
* [[SigmoidFilter]]


