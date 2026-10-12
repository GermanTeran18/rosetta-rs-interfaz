# TotalSasa
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## TotalSasa

Calcula la sasa global del Pose. Si es \*\*mayor\*\* que threshold, pasa. Sin embargo, también tiene la opción de upper\_threshold: falla si está por encima del upper\_threshold.

```xml
<TotalSasa name="(sasa_filter &string)" threshold="(800 &float)" upper_threshold="(1000000000000000 &float)" hydrophobic="(0&bool)" polar="(0&bool)" task_operations="(comma-delimited list of operations &string)" />
```

-   upper\_threshold: tamaño máximo permitido
-   hydrophobic: ¿calcular la SASA solo hidrofóbica?
-   polar: ¿calcular la SASA solo polar?
-   task\_operations: informa la SASA solo de los residuos especificados como empaquetables por las operaciones de tarea dadas. Si no se especifica, se calcula sobre todos los residuos.
-   report\_per\_residue\_sasa: añade la SASA por residuo a la salida del tracer.

hydrophobic/polar se calculan clasificando cada átomo como polar (aceptor/donador o hidrógeno polar) o hidrofóbico (todo lo demás) y sumando la SASA de cada categoría.

## Véase también

* [[Docking proteína-proteína|docking-protocol]]
* [[SasaFilter]]
* [[DSasaFilter]]
* [[NetChargeFilter]]
* [[PackStatFilter]]
* [[InterfaceBindingEnergyDensityFilter]]


