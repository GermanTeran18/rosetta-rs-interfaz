# RestrictAAsFromProbabilities
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*

`TaskOperation` que restringe los aminoácidos diseñables según las probabilidades de una PerResidueProbabilitiesMetric. No modifica qué posiciones son diseñables.

[[include:to_RestrictAAsFromProbabilities_type]]
 
## Ejemplo
Carga las probabilidades de un archivo de pesos y restringe a los aminoácidos que tengan al menos una probabilidad de 0.0001 y una probabilidad delta de 0 (es decir, que sean al menos tan probables como el aminoácido actual en esa posición).
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        <LoadedProbabilitiesMetric name="loaded_probs" filename="probs.weights"/>
    </SIMPLE_METRICS>
    <TASKOPERATIONS>
        <RestrictAAsFromProbabilities name="restrict_to_probs" metric="loaded_probs" prob_cutoff="0.0001" delta_prob_cutoff="0.0" use_cached_data="true"/>
    </TASKOPERATIONS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <PackRotamersMover name="design" scorefxn="beta" task_operations="restrict_to_probs" />
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="load"/>
        <Add mover_name="design"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

##Véase también
* [[ProhibitResidueProperties]]
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
