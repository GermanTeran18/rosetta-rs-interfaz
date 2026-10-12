# MIFSTProbabilitiesMetric
*Volver a la página de [[SimpleMetrics]].*
## MIFSTProbabilitiesMetric

[[include:simple_metric_MIFSTProbabilitiesMetric_type]]

### Descripción general
Una métrica para estimar la probabilidad de un aminoácido en una posición dada, según la predice el modelo Masked Inverse Folding with Sequence Transfer (MIF-ST) de [Yang et al.](https://doi.org/10.1101/2022.05.25.493516). Esta métrica requiere compilar con `extras=torch`; consulta [[Building Rosetta with TensorFlow and Torch]] para ver la configuración de compilación.

### Nota sobre el uso de procesadores.

Por defecto, MIFSTProbabilitiesMetric usará varios procesadores durante la predicción. (Torch determina automáticamente el número de procesadores que se usan, según el número de procesadores de la máquina.)

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
El ejemplo predice las probabilidades de aminoácidos para la cadena A usando solo las coordenadas y la secuencia de la cadena A. Lo hace ejecutando una predicción para cada posición mientras enmascara su tipo de residuo. Con `multirun=true` y `use_gpu=true`, todas las predicciones se agrupan en lotes y se ejecutan en la GPU (si está disponible). Por último, usa estas predicciones para puntuar la secuencia actual con la métrica de pseudoperplejidad.
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        <MIFSTProbabilitiesMetric name="prediction" residue_selector="res" feature_selector="res" multirun="true" use_gpu="true"/>
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
@article {Yang2022.05.25.493516,
	author = {Kevin K. Yang and Hugh Yeh and Niccol{\`o} Zanichelli},
	title = {Masked Inverse Folding with Sequence Transfer for Protein Representation Learning},
	elocation-id = {2022.05.25.493516},
	year = {2023},
	doi = {10.1101/2022.05.25.493516},
	publisher = {Cold Spring Harbor Laboratory},
	URL = {https://www.biorxiv.org/content/early/2023/03/19/2022.05.25.493516},
	eprint = {https://www.biorxiv.org/content/early/2023/03/19/2022.05.25.493516.full.pdf},
	journal = {bioRxiv}
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
