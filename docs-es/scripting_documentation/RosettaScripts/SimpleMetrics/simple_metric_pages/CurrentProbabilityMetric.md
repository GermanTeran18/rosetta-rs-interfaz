# CurrentProbabilityMetric
*Volver a la página de [[SimpleMetrics]].*
## CurrentProbabilityMetric

[[include:simple_metric_CurrentProbabilityMetric_type]]

### Descripción general
Una PerResidueRealMetric que devuelve solo la probabilidad de la secuencia presente actualmente en el Pose a partir de una PerResidueProbabilitiesMetric (pasando de longitud\*20 a longitud\*1 probabilidades). Útil para filtrar o visualizar probabilidades. Esta métrica por sí sola no requiere compilar con `extras=tensorflow,torch`, pero las predicciones de modelos que normalmente se le dan como entrada sí lo requieren. Consulta [[Building Rosetta with TensorFlow and Torch]] para ver la configuración de compilación.


### Ejemplo
Este ejemplo predice las probabilidades de aminoácidos para la cadena A de nuestra proteína con ProteinMPNN y luego devuelve solo las probabilidades de la secuencia actual a partir de ellas. Además, usa la opción metric_to_bfactor del mover [[RunSimpleMetrics]], que permite visualizar fácilmente los valores en ChimeraX/PyMol. 
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        <ProteinMPNNProbabilitiesMetric name="prediction"/>
        <CurrentProbabilityMetric name="current" metric="prediction" custom_type="probs"/>
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <RunSimpleMetrics name="analysis" metrics="current" metric_to_bfactor="probs"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="analysis"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```
### Referencia
La implementación en Rosetta no está publicada por el momento.

##Véase también

* [[PseudoPerplexityMetric]]: Calcula la puntuación de pseudoperplejidad para cualquier PerResidueProbabilitiesMetric
* [[AverageProbabilitiesMetric]]: Promedia varias PerResidueProbabilitiesMetrics
* [[PerResidueEsmProbabilitiesMetric]]: Predice probabilidades con la familia de modelos de lenguaje ESM
* [[ProteinMPNNProbabilitiesMetric]]: Predice probabilidades con el modelo ProteinMPNN
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
