# PeptideInternalHbondsMetric
*Volver a la página de [[SimpleMetrics]].*
Página creada el 23 de abril de 2020 por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org).

## PeptideInternalHbondsMetric

PeptideInternalHbondsMetric cuenta los enlaces de hidrógeno entre residuos que están dentro de una selección de residuos o, si no se proporciona ninguna selección de residuos, dentro de un Pose.  A diferencia de [[HbondMetric]], PeptideInternalHbondsMetric omite del recuento los enlaces de hidrógeno entre residuos que están a una distancia, especificada por el usuario, en términos de conectividad covalente.  Esto es especialmente útil, por ejemplo, para encontrar enlaces de hidrógeno de largo alcance de la cadena principal en macrociclos peptídicos.

[[include:simple_metric_PeptideInternalHbondsMetric_type]]

##Véase también

* [[PeptideInternalHbondsFilter]]: Un filtro envoltorio sencillo para PeptideInternalHbondMetric, para filtrar según el recuento.
* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
