# SequenceMetric
*Volver a la página de [[SimpleMetrics]].*
## SequenceMetric

## Referencia
**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]]

Modificado el 20 de diciembre de 2018 por Vikram K. Mulligan (vmulligan@flatironinstitute.org) para añadir más opciones de salida.

[[include:simple_metric_SequenceMetric_type]]

Ten en cuenta que la opción `three_letter` ha quedado obsoleta en favor de la opción `output_mode`, que ofrece las opciones "oneletter", "threeletter", "basename" o "fullname".  A continuación se dan ejemplos de cada una. Ten en cuenta que las distinciones son especialmente importantes para los no canónicos: algunos no canónicos, como la ornitina, no tienen un código de tres letras distinto para el equivalente D.

| Tipo de salida | Ejemplo |
| ----------- | ------- |
| oneletter   | RSTLNEXXYYS                                                                      |
| threeletter | ARG,SER,THR,LEU,ASN,GLU,ORN,ORN,DTY,TYR,DSE                                      |
| basename    | ARG,SER,THR,LEU,ASN,GLU,ORN,DORN,DTYR,TYR,DSER                                   |
| fullname    | ARG:NtermProteinFull,SER,THR,LEU,ASN,GLU,ORN,DORN,DTYR,TYR,DSER:CtermProteinFull |

##Véase también

* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
