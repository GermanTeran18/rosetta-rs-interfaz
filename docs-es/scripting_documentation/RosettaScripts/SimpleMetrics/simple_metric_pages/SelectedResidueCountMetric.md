#SelectedResidueCountMetric

*Volver a la página de [[SimpleMetrics]].*

## SelectedResidueCountMetric

Autor: Vikram K. Mulligan (vmullig@uw.edu)

Documentación creada el 24 de abril de 2018.

[[_TOC_]]

## Propósito y descripción

La [[SimpleMetric|SimpleMetrics]] SelectedResidueCountMetric cuenta el número de residuos de un Pose (si no se proporciona un [[residue selector|ResidueSelectors]]) o de una selección (si se proporciona un [[residue_selector|ResidueSelectors]]).

## Uso

```xml
<SelectedResidueCountMetric name="(&string)" residue_selector="(&string)" />
```

* **residue_selector:** El nombre de un [[residue selector|ResidueSelectors]] definido previamente.  Si se proporciona, se cuenta el número de residuos seleccionados.  Si no se proporciona, se cuentan todos los residuos del Pose.

##Véase también

* [[SelectedResiduesMetric]]: Devuelve una cadena con los índices de los residuos seleccionados.
* [[SelectedResiduesPyMolMetric]]: Devuelve una cadena con una selección de PyMol para los índices de los residuos seleccionados.
* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
