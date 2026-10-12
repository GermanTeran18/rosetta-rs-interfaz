# SequenceRecovery
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SequenceRecovery

Calcula la fracción de recuperación de secuencia de un Pose en comparación con un Pose de referencia. Es similar al mover [[InterfaceRecapitulationMover]], pero no requiere un mover de diseño. En su lugar, el usuario puede dar una lista de operaciones de tarea que describen qué residuos son diseñables en el Pose. Funciona con Poses simétricos y con Poses con "bloques de construcción" simétricos. También puede filtrar según el número de mutaciones (o informarlo en el archivo de puntuación) en lugar de la tasa de recuperación, si se desea, usando las opciones report\_mutations y mutation\_threshold. Si la opción verbose=1, escribirá en el tracer las mutaciones específicas. El Pose de referencia contra el que se calculará la tasa de recuperación se puede definir con la opción de línea de comandos -in:file:native. Si esa opción no se define, se usará como referencia el Pose inicial.

```xml
<SequenceRecovery name="(&string)" rate_threshold="(0.0 &Real)" task_operations="(comma-delimited list of operations &string)" mutation_threshold="(100 &Size)" report_mutations="(0 &bool)" scorefxn="('talaris2013' &string)" verbose="(0 &bool)" />
```

-   rate\_threshold: umbral inferior de la tasa de recuperación aceptable para que un diseño pase. Falla si la tasa real está por debajo de este umbral.
-   task\_operations: definen los residuos diseñables.
-   scorefxn: define la función de puntuación que se usa para puntuar las mutaciones enumeradas en los informes.
-   mutation\_threshold: umbral superior del número de mutaciones para un diseño aceptable. Solo importa si report\_mutations es true.
-   report\_mutations: por defecto es false. Si es true, actuará como filtro del número de mutaciones en lugar de la tasa.
-   verbose: por defecto es false. Si es true, escribirá en el tracer las posiciones e identidades mutadas.

## Véase también

* [[Diseño en Rosetta|application_documentation/design/design-applications]]
* [[Operaciones de tareas|TaskOperations-RosettaScripts]]
* [[InterfaceRecapitulationMover]]
* [[PackRotamersMover]]


