# MutationsFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## MutationsFilter

Determina los residuos mutados del Pose actual en comparación con un Pose de referencia. Se puede usar para detener trayectorias, si se desea, fijando un mutation\_threshold o un rate\_threshold. Los residuos considerados se restringen mediante operaciones de tarea. Por defecto solo se consideran los residuos diseñables, pero también se pueden considerar los residuos empaquetables si se usa la opción packable=true (útil, por ejemplo, si se usa un resfile para mutar algunas posiciones durante el protocolo, pero solo se permitió considerar un aminoácido durante el reempaquetado. Una posición así solo se considera empaquetable). Informa el número de mutaciones o la tasa de mutación (el número de mutaciones dividido por el número de posiciones diseñables, o empaquetables). Funciona con Poses simétricos y con "bloques de construcción" simétricos. El Pose de referencia contra el que se calculará la tasa de recuperación se puede definir con la opción de línea de comandos -in:file:native.

```xml
<MutationsFilter name="(&string)" rate_threshold="(0.0 &Real)" task_operations="(comma-delimited list of operations &string)" mutation_threshold="(100 &Size)" report_mutations="(0 &bool)" packable="(0 &bool)" verbose="(0 &bool)" write2pdb="(0 &bool)" />
```

-   rate\_threshold: umbral inferior de la tasa de recuperación aceptable para que un diseño pase. Falla si la tasa real está por debajo de este umbral.
-   task\_operations: definen los residuos diseñables o empaquetables.
-   mutation\_threshold: umbral superior del número de mutaciones para un diseño aceptable. Solo importa si report\_mutations es true.
-   report\_mutations: por defecto es false. Si es true, actuará como filtro del número de mutaciones en lugar de la tasa.
-   verbose: por defecto es false. Si es true, escribirá en el tracer las posiciones e identidades mutadas.
-   write2pdb: por defecto es false. Si es true, escribirá en el pdb de salida las posiciones e identidades mutadas.
-   packable: por defecto es false. Si es true, además de las posiciones diseñables también considerará las mutaciones en posiciones empaquetables.

## Véase también

* [[TaskOperations-RosettaScripts]]
* [[ClashCheckFilter]]
* [[DesignableResiduesFilter]]
* [[GetRBDOFValuesFilter]]
* [[InterfacePackingFilter]]
* [[OligomericAverageDegreeFilter]]
* [[SymUnsatHbondsFilter]]
