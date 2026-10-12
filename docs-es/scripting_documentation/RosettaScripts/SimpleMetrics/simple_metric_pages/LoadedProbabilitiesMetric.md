# LoadedProbabilitiesMetric
*Volver a la página de [[SimpleMetrics]].*
## LoadedProbabilitiesMetric

### Descripción general
Una métrica para cargar un archivo de pesos de probabilidades en una PerResidueProbabilitiesMetric, que luego se puede usar más adelante. El archivo de pesos se puede crear guardando una métrica con [[SaveProbabilitiesMetricMover]] o de forma manual. El formato es `POSENUMBER RESIDUETYPE WEIGHT`; más abajo hay un ejemplo.

[[include:simple_metric_LoadedProbabilitiesMetric_type]]

### Ejemplo
Carga probabilidades desde un archivo especificado y las usa para puntuar el pdb actual con [[PseudoPerplexityMetric]]. Las primeras líneas del archivo `probs.weights` tienen este aspecto:
```
#POSNUM RESIDUETYPE WEIGHT
1 ALA 0.000125
1 CYS 0.0
1 ASP 0.0
1 GLU 0.0
1 PHE 0.002197
1 MET 0.972065
1 ASN 0.0
....
```

```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        <LoadedProbabilitiesMetric name="loaded_probs" filename="probs.weights"/>
        <PseudoPerplexityMetric name="perplex" metric="loaded_probs" use_cached_data="true"/>
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <RunSimpleMetrics name="load" metrics="loaded_probs"/>
        <RunSimpleMetrics name="score" metrics="perplex"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="load"/>
        <Add mover_name="score"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```
### Referencia
La implementación en Rosetta no está publicada por el momento.

##Véase también
* [[SaveProbabilitiesMetricMover]]: Un mover para guardar una PerResidueProbabilitiesMetric en un archivo de pesos/pssm
* [[PseudoPerplexityMetric]]: Calcula la puntuación de pseudoperplejidad para cualquier PerResidueProbabilitiesMetric
* [[AverageProbabilitiesMetric]]: Promedia varias PerResidueProbabilitiesMetrics
* [[PerResidueEsmProbabilitiesMetric]]: Predice probabilidades con la familia de modelos de lenguaje ESM
* [[ProteinMPNNProbabilitiesMetric]]: Predice probabilidades con el modelo ProteinMPNN
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
