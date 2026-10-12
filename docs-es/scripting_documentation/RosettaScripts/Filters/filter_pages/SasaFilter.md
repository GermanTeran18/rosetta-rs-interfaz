# Sasa
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Sasa

Calcula la sasa específicamente en la interfaz. Si es \*\*mayor\*\* que threshold, pasa. Sin embargo, también tiene la opción de upper\_threshold: falla si está por encima del upper\_threshold.

```xml
<Sasa name="(sasa_filter &string)" threshold="(800 &float)" upper_threshold="(1000000000000000 &float)" hydrophobic="(0&bool)" polar="(0&bool)" jump="(1 &integer)" sym_dof_names("" &string)/>
```

-   upper\_threshold: tamaño máximo permitido
-   hydrophobic: ¿calcular la SASA solo hidrofóbica?
-   polar: ¿calcular la SASA solo polar?
-   jump: a través de qué jump se calcula la SASA total
-   sym\_dof\_names: usa sym\_dof\_names que controlan los jumps maestros para determinar a través de qué jump(s) se calcula la SASA total. Para usar con simetrías multicomponente.

hydrophobic/polar se calculan clasificando cada átomo como polar (aceptor/donador o hidrógeno polar) o hidrofóbico (todo lo demás) y sumando la delta de SASA de cada categoría. Ten en cuenta que por ahora solo se puede calcular la sasa total a través de jumps distintos del 1. Intentar calcular la sasa hidrofóbica o polar a través de cualquier otro jump provocará una salida durante el análisis del script.

## Véase también

* [[Docking proteína-proteína|docking-protocol]]
* [[TotalSasaFilter]]
* [[DSasaFilter]]
* [[NetChargeFilter]]
* [[PackStatFilter]]
* [[InterfaceBindingEnergyDensityFilter]]


