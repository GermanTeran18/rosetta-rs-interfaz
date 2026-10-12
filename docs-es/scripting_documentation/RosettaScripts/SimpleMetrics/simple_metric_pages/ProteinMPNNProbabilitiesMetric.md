# ProteinMPNNProbabilitiesMetric
*Volver a la página de [[SimpleMetrics]].*
## ProteinMPNNProbabilitiesMetric

[[include:simple_metric_ProteinMPNNProbabilitiesMetric_type]]

### Descripción general
Una métrica para estimar la probabilidad de un aminoácido en una posición dada, según la predice el modelo ProteinMPNN. Esta métrica requiere compilar con `extras=torch`; consulta [[Building Rosetta with TensorFlow and Torch]] para ver la configuración de compilación.

### Nota sobre el uso de procesadores.

Por defecto, ProteinMPNNProbabilitiesMetric usará varios procesadores durante la predicción. (Torch determina automáticamente el número de procesadores que se usan, según el número de procesadores de la máquina.)

Para limitar el número de procesadores que se usan, define las siguientes variables de entorno antes de ejecutar Rosetta (los comandos asumen Bash y que se usa una CPU):
```
export OMP_NUM_THREADS=1
export MKL_NUM_THREADS=1
export TORCH_NUM_THREADS=1
export TORCH_INTRAOP_NUM_THREADS=1
export TORCH_INTEROP_NUM_THREADS=1
```

Esto, por supuesto, aumentará el tiempo de ejecución, pero puede ser necesario en sistemas donde necesites controlar explícitamente el uso de CPU.

### Ejemplo
El ejemplo predice las identidades de aminoácidos para la cadena A usando solo las coordenadas de la cadena A, mientras enmascara la secuencia de la posición 25, y usa las probabilidades predichas para puntuar la secuencia. 
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
        <Index name="mask" resnums="25"/>
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        <ProteinMPNNProbabilitiesMetric name="prediction" residue_selector="res" coord_selector="res" sequence_mask_selector="mask" write_pssm="mpnn.pssm"/>
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
```bibtex
@article{dauparas2022robust,
  title={Robust deep learning--based protein sequence design using ProteinMPNN},
  author={Dauparas, Justas and Anishchenko, Ivan and Bennett, Nathaniel and Bai, Hua and Ragotte, Robert J and Milles, Lukas F and Wicky, Basile IM and Courbet, Alexis and de Haas, Rob J and Bethel, Neville and others},
  journal={Science},
  volume={378},
  number={6615},
  pages={49--56},
  year={2022},
  publisher={American Association for the Advancement of Science}
}
```

##Véase también

* [[PseudoPerplexityMetric]]: Calcula la puntuación de pseudoperplejidad para cualquier PerResidueProbabilitiesMetric
* [[AverageProbabilitiesMetric]]: Promedia varias PerResidueProbabilitiesMetrics
* [[PerResidueEsmProbabilitiesMetric]]: Predice probabilidades con la familia de modelos de lenguaje ESM
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
