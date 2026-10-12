# ResidueSummaryMetric
*Volver a la página de [[SimpleMetrics]].*
## ResidueSummaryMetric


**ResidueSummaryMetric** toma una [[PerResidueRealMetric | SimpleMetrics#PerResidueRealMetric]] y resume los datos de varias maneras, como la media, la suma o el número de residuos por encima, por debajo o iguales a un cierto valor. Esta métrica es en sí misma una [[RealMetric | SimpleMetrics#RealMetric]] y se puede usar como tal en filtros, features reporters, etc.

[[include:simple_metric_ResidueSummaryMetric_type]]

##Véase también

* [[PerResidueRealMetrics | SimpleMetrics#PerResidueRealMetric]]: Lista de PerResidueRealMetrics que puede usar esta métrica.
* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[CompositeEnergyMetric]]: Calcula términos de puntuación individuales de una función de puntuación
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
