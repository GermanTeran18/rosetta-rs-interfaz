# MoveBeforeFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## MoveBeforeFilter

[[include:filter_MoveBeforeFilter_type]]

Ten en cuenta también que hay que tener cuidado al usar un mover computacionalmente caro o un par mover/filtro que da resultados estocásticos. El resultado del mover no se guarda en caché y se volverá a calcular en cada llamada a apply(), report() o report\_sm().

## Véase también

* [[Movers|Movers-RosettaScripts]]
* [[CombinedValueFilter]]


