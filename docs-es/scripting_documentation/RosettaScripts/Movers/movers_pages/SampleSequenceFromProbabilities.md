# SampleSequenceFromProbabilities
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SampleSequenceFromProbabilities


### Descripción general
Muestrea secuencias completas o un número especificado de mutaciones a partir de un PerResidueProbabilitiesMetric y las enhebra (thread) sobre el Pose.

[[include:mover_SampleSequenceFromProbabilities_type]]

### Ejemplo
En este ejemplo muestreamos diez mutaciones a partir de probabilidades predichas por ESM, donde cada mutación debe tener al menos una probabilidad de 0.0001 y una probabilidad delta respecto a la actual de 0.0 (es decir, al menos tan probable como el aminoácido actual en una posición dada). Hay una opción de temperatura tanto para la elección de la posición como para la de los aminoácidos, donde T<1 lleva a un comportamiento más determinista y T>1 a más diversidad. También restringimos la elección de mutaciones con un resfile que especifica el comportamiento de empaquetado de los residuos y/o aminoácidos. 

```xml
<ROSETTASCRIPTS>
    <TASKOPERATIONS>
        <ReadResfile name="rrf" filename="./resfile.resfile"/>
    </TASKOPERATIONS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        ----------------- Define model to use for prediction -----------------------------
        <PerResidueEsmProbabilitiesMetric name="esm" residue_selector="res" model="esm2_t30_150M_UR50D" write_pssm="" multirun="true"/>
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        ----------------------- Sample mutations ------------------------------------------
        <SampleSequenceFromProbabilities name="sample" metric="esm" pos_temp="1.0" aa_temp="1.0" prob_cutoff="0.0001" delta_prob_cutoff="0.0" max_mutations="10" task_operations="rrf" use_cached_data="true"/>
        <RunSimpleMetrics name="run" metrics="esm"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="run"/>
        <Add mover_name="sample"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

### Referencia
Por ahora no está publicado.

##Véase también

##Véase también

* [[PseudoPerplexityMetric]]: calcula la pseudo-perplejidad de cualquier PerResidueProbabilitiesMetric
* [[AverageProbabilitiesMetric]]: promedia varios PerResidueProbabilitiesMetrics
* [[PerResidueEsmProbabilitiesMetric]]: predice probabilidades con la familia de modelos de lenguaje ESM
* [[ProteinMPNNProbabilitiesMetric]]: predice probabilidades con el modelo ProteinMPNN
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: movers disponibles
* [[I want to do x]]: guía para elegir un mover