# SaveProbabilitiesMetricMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SaveProbabilitiesMetricMover


### Descripción general
Guarda un PerResidueProbabilitiesMetric en un archivo de pesos y/o en un archivo de matriz de puntuación específica de posición (PSSM). El archivo de pesos puede cargarse como [[LoadedProbabilitiesMetric]] y la PSSM puede usarse con [[FavorSequenceProfileMover]] para añadir restricciones de ResidueType en una ejecución de diseño.

[[include:mover_SaveProbabilitiesMetricMover_type]]

### Ejemplo
Aquí usamos el modelo de lenguaje ESM para predecir probabilidades de aminoácidos y las guardamos tanto como PSSM como archivo de pesos.

```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        ----------------- Define model to use for prediction -----------------------------
        <PerResidueEsmProbabilitiesMetric name="esm" residue_selector="res" model="esm2_t30_150M_UR50D" multirun="true"/>
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <RunSimpleMetrics name="inference" metrics="esm"/>
        -------------------------- Setup saving ---------------------------------------------
        <SaveProbabilitiesMetricMover name="save" metric="esm" filename="probs" filetype="both" use_cached_data="true"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="inference"/>
        <Add mover_name="save"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

### Referencia
Por ahora no está publicado.

##Véase también

##Véase también
* [[LoadedProbabilitiesMetric]]: carga un archivo de pesos de probabilidad guardado como PerResdidueProbabilitiesMetric
* [[PseudoPerplexityMetric]]: calcula la pseudo-perplejidad de cualquier PerResidueProbabilitiesMetric
* [[AverageProbabilitiesMetric]]: promedia varios PerResidueProbabilitiesMetrics
* [[PerResidueEsmProbabilitiesMetric]]: predice probabilidades con la familia de modelos de lenguaje ESM
* [[ProteinMPNNProbabilitiesMetric]]: predice probabilidades con el modelo ProteinMPNN
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: movers disponibles
* [[I want to do x]]: guía para elegir un mover