# ProbabilityConservationMetric
*Volver a la página de [[SimpleMetrics]].*
## ProbabilityConservationMetric

[[include:simple_metric_ProbabilityConservationMetric_type]]

### Descripción general
Una métrica para calcular la conservación de una posición a partir de ciertas probabilidades predichas (usando la entropía de Shannon relativa). El valor devuelto está entre 0 (sin conservación, todos los aminoácidos son igual de probables) y 1 (totalmente conservado, solo se predice un aminoácido). Esta métrica por sí sola no requiere compilar con `extras=tensorflow,torch`, pero las predicciones de modelos que normalmente se le dan como entrada sí lo requieren. Consulta [[Building Rosetta with TensorFlow and Torch]] para ver la configuración de compilación.


### Ejemplo
Este ejemplo predice las probabilidades de aminoácidos para la cadena A de nuestra proteína con ProteinMPNN y luego calcula la conservación a partir de ellas. Además, usa la opción `metric_to_bfactor` del mover [[RunSimpleMetrics]], que permite visualizar fácilmente los valores en ChimeraX/PyMol.
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        <ProteinMPNNProbabilitiesMetric name="prediction"/>
        <ProbabilityConservationMetric name="conservation" metric="prediction" custom_type="score"/>
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <RunSimpleMetrics name="run" metrics="conservation" metric_to_bfactor="score"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="run"/>
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
