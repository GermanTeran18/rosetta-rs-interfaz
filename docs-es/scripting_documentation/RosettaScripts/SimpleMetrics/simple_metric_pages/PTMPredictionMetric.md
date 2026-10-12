# PTMPredictionMetric
*Volver a la página de [[SimpleMetrics]].*
## PTMPredictionMetric

### Referencia
Por el momento no está publicado.

### Descripción general
Métrica para predecir 18 modificaciones postraduccionales (PTM) distintas mediante redes neuronales.
La métrica requiere compilar Rosetta con `extras=tensorflow` (para ver los detalles de compilación, consulta [[trRosettaProtocol]]).
Puedes usar esta métrica junto con [[GenericMonteCarloMover]] y [[RandomMutationMover]] para maximizar/minimizar la probabilidad de una modificación en tu proteína de interés.

### Detalles y advertencia
Usamos características locales de secuencia y estructura alrededor del sitio potencialmente modificado para predecir su probabilidad de modificación. No usamos características globales ni de homología (p. ej., secuencia completa, embeddings de ESM, MSAs, localización celular), ya que la métrica no solo está pensada para predecir PTMs sino también para _diseñar_ PTMs en cualquier proteína, ya sea _de novo_ o natural. Esto significa que, por ejemplo, optimizar la probabilidad de un sitio de glicosilación N-ligada no dará como resultado una proteína glicosilada si la proteína carece de una etiqueta de secreción o se expresa en un sistema inadecuado como _E. coli_.

### Ejemplos 
Predicción de glicosilación N-ligada:
```
<ROSETTASCRIPTS>
    <FILTERS>
    </FILTERS>
    <RESIDUE_SELECTORS>
        <Index name="res" resnums="22A,38A,81A,165A,285A,63A,133A,144A,246A"/>
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        <PTMPredictionMetric name="glycosylation_prediction" residue_selector="res" modification="NlinkedGlycosylation" />
    </SIMPLE_METRICS>
    <MOVERS>
        <RunSimpleMetrics name="run" metrics="glycosylation_prediction" override="true"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="run"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```


[[include:simple_metric_PTMPredictionMetric_type]]

##Véase también

* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
