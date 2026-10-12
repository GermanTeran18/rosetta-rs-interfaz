# PseudoPerplexityMetric
*Volver a la página de [[SimpleMetrics]].*
## PseudoPerplexityMetric


### Descripción general
Calcula la pseudoperplejidad a partir de una _PerResidueProbabilitiesMetric_, que es un valor que define la verosimilitud de una secuencia dada la predicción de un modelo (cuanto menor, mejor). Se define como la exponenciación de la media del logaritmo negativo de las probabilidades predichas.

[[include:simple_metric_PseudoPerplexityMetric_type]]

### Ejemplo


```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
        <Index name="mask" resnums="25"/>
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        <PerResidueEsmProbabilitiesMetric name="prediction" residue_selector="res" attention_mask_selection="mask"  write_pssm="test.pssm" model="esm2_t6_8M_UR50D" multirun="true"/>
        <PseudoPerplexityMetric name="perplex" metric="prediction"/>
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <RunSimpleMetrics name="run" metrics="perplex"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="run"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

### Referencia
Por el momento no está publicado.

##Véase también

* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
