# SequenceSimilarityMetric
*Volver a la página de [[SimpleMetrics]].*
## SequenceSimilarityMetric

Autor: Jack Maguire, jackmaguire1444@gmail.com

## Propósito y descripción

Compara las secuencias de la estructura nativa (usando la opción native) con la secuencia de un Pose dado.
Se promedian las puntuaciones BLOSUM62 de cada posición seleccionada.

## Uso

```xml
<SequenceSimilarityMetric name="(&string)" residue_selector="(&string)" apply_selector_to_native="false" normalize="true"/>
```

* **residue_selector:** El nombre de un [[residue selector|ResidueSelectors]] definido previamente.  Si se proporciona, solo se promediarán las puntuaciones BLOSUM62 de los residuos seleccionados. Si no se proporciona, se cuentan todos los residuos del Pose.
* **apply_selector_to_native:** Si es true, aplica el residue selector al Pose nativo en lugar de al Pose dado. Por ejemplo, un selector de capas usará la estructura nativa para determinar qué es núcleo/frontera/superficie, en lugar de la estructura actual.
* **normalize:** Si es true, divide la puntuación final por el número de posiciones. En caso contrario, es simplemente la suma de las puntuaciones BLOSUM62 de las posiciones seleccionadas.

##Véase también

* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
