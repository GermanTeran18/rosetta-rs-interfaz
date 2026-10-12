#PolarGroupBurialPyMolStringMetric

*Volver a la página de [[SimpleMetrics]].*

## PolarGroupBurialPyMolStringMetric

Autor: Vikram K. Mulligan (vmullig@uw.edu)

Documentación creada el 24 de abril de 2018.

[[_TOC_]]

## Propósito y descripción

La [[SimpleMetric|SimpleMetrics]] PolarGroupBurialPyMolStringMetric se creó para complementar el término de puntuación [[buried_unsatisfied_penalty|BuriedUnsatPenalty]].  Genera una cadena de comandos de PyMol para colorear los grupos polares de un Pose según su enterramiento.  El Pose se colorea de gris, con los grupos polares expuestos en la superficie en cian y los grupos enterrados en naranja.  Los comandos generados se escriben junto con los archivos PDB de salida.

PolarGroupBurialPyMolStringMetric toma una función de puntuación como entrada y ajusta su definición de "enterramiento" a la que usa el término de puntuación [[buried_unsatisfied_penalty|BuriedUnsatPenalty]].  Consulta la documentación de ese término de puntuación para ver las opciones de la función de puntuación que se pueden modificar para cambiar la definición de enterramiento.

## Uso

```xml
<PolarGroupBurialPyMolStringMetric name="(&string)" verbose="(false &bool)" scorefxn="(&string)" />
```

* **verbose:** Si es true, los comandos de PyMol también se escriben en el tracer.  False por defecto.
* **scorefxn:** Una función de puntuación definida previamente, que se usa para establecer la definición de "enterramiento".  Consulta la documentación del término de puntuación [[buried_unsatisfied_penalty|BuriedUnsatPenalty]] para ver los ajustes que se pueden modificar en la función de puntuación para cambiar la definición de enterramiento.  Entrada obligatoria.

##Véase también

* El término de puntuación [[buried_unsatisfied_penalty|BuriedUnsatPenalty]]
* [[Términos de guía centrados en el diseño|design-guidance-terms]]
* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
