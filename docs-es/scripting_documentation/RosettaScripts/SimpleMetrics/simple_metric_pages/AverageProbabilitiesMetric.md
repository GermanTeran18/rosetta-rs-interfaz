# AverageProbabilitiesMetric
*Volver a la página de [[SimpleMetrics]].*
## AverageProbabilitiesMetric

[[include:simple_metric_AverageProbabilitiesMetric_type]]

### Descripción general
Una métrica para promediar varias `PerResidueProbabilitiesMetrics`.

### Detalles
Como otras `PerResidueProbabilitiesMetrics`, las probabilidades se pueden escribir como logits en un PSSM al estilo psi-blast con [[SaveProbabilitiesMetricMover]], y usarse como entrada para [[FavorSequenceProfileMover]]. Esta métrica por sí sola no requiere compilar con `extras=tensorflow,torch`, pero las predicciones de modelos que normalmente se le dan como entrada sí lo requieren. Consulta [[Building Rosetta with TensorFlow and Torch]] para ver la configuración de compilación.

### Ejemplo
En este ejemplo predecimos las probabilidades de aminoácidos para la cadena A de nuestra proteína con ProteinMPNN y ESM, promediamos ambas predicciones y usamos las probabilidades promedio para calcular una única puntuación para nuestra proteína.
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        ----------------- Define models to use -----------------------------
        <ProteinMPNNProbabilitiesMetric name="mpnn" residue_selector="res"/>
        <PerResidueEsmProbabilitiesMetric name="esm" residue_selector="res" model="esm2_t33_650M_UR50D"/>
        ----------------- Average the probabilities ------------------------
        <AverageProbabilitiesMetric name="avg" metrics="mpnn,esm"/>
        ----------------- Analyze predictions without re-calculation -------
        <PseudoPerplexityMetric name="perplex" metric="avg" use_cached_data="true"/>
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <RunSimpleMetrics name="predictions" metrics="avg"/>
        <RunSimpleMetrics name="analysis" metrics="perplex"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="predictions"/>
        <Add mover_name="analysis"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

### Referencia
La implementación en Rosetta no está publicada por el momento.

##Véase también

* [[PseudoPerplexityMetric]]: Calcula la puntuación de pseudoperplejidad para cualquier PerResidueProbabilitiesMetric
* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[PerResidueEsmProbabilitiesMetric]]: Predice probabilidades con la familia de modelos de lenguaje ESM
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
