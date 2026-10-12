# BestMutationsFromProbabilitiesMetric
*Volver a la página de [[SimpleMetrics]].*
## BestMutationsFromProbabilitiesMetric

[[include:simple_metric_BestMutationsFromProbabilitiesMetric_type]]

### Descripción general
Una métrica para calcular las mutaciones con mayor diferencia de probabilidad respecto a los residuos actuales a partir de una `PerResidueProbabilitiesMetric`. Devuelve las posiciones más probables y su diferencia de probabilidad como AAActual-Posición-AAMutación (p. ej. A89T) en **numeración del Pose**. Esta métrica por sí sola no requiere compilar con `extras=tensorflow,torch`, pero las predicciones de modelos que normalmente se le dan como entrada sí lo requieren. Consulta [[Building Rosetta with TensorFlow and Torch]] para ver la configuración de compilación.

### Ejemplo
El ejemplo usa el modelo de lenguaje ESM para predecir probabilidades de aminoácidos y luego obtiene las diez mutaciones más probables que sean al menos tan probables como el aminoácido presente actualmente.
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        ----------------- Define models to use -----------------------------
        <PerResidueEsmProbabilitiesMetric name="esm" residue_selector="res" model="esm2_t33_650M_UR50D" write_pssm="esm.pssm"/>
        ----------------- Analyze predictions without re-calculation -------
        <BestMutationsFromProbabilitiesMetric name="esm_mutations" metric="esm" use_cached_data="true" max_mutations=10 delta_cutoff=0.0 />
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <RunSimpleMetrics name="inference" metrics="esm"/>
        <RunSimpleMetrics name="analysis" metrics="esm_mutations"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="inference"/>
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
