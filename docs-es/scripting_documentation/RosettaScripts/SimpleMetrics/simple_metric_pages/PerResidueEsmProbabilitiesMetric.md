# PerResidueEsmProbabilitiesMetric
*Volver a la página de [[SimpleMetrics]].*
## PerResidueEsmProbabilitiesMetric

[[include:simple_metric_PerResidueEsmProbabilitiesMetric_type]]

### Descripción general
Usa la familia de modelos de lenguaje de proteínas Evolutionary Scale Modeling (ESM) para predecir probabilidades de aminoácidos para una selección dada. La predicción se basa en la secuencia de la cadena del residuo seleccionado. Enmascarará y predecirá cada residuo seleccionado por el `residue_selector`. Opcionalmente se puede usar `attention_mask_selection` para ocultar otras partes de la secuencia (¡pero NO es la forma de especificar los residuos que se van a predecir!). 

### Detalles
La métrica requiere compilar Rosetta con `extras=tensorflow` (para ver los detalles de compilación, consulta [[Building Rosetta with TensorFlow and Torch]]). El modelo base más pequeño ya está presente, pero los modelos más grandes hay que descargarlos una vez; puedes hacerlo activando la opción `-auto_download` o siguiendo las instrucciones que imprime la métrica. La secuencia que se usa para la predicción puede contener aminoácidos no canónicos; sin embargo, se sustituirán por el token "desconocido", así que quizá quieras usar además `attention_mask_selection` para evitar que alteren tu predicción. 

### Modelos disponibles
Los modelos disponibles actualmente son: `esm2_t6_8M_UR50D`, `esm2_t12_35M_UR50D`, `esm2_t30_150M_UR50D`, `esm2_t33_650M_UR50D`

### Ejemplo
Este ejemplo predice las probabilidades para toda la cadena A usando el modelo esm2_t6_8M_UR50D. La opción `multirun` controla si todas las posiciones se predicen en una sola pasada de inferencia o una por una (en su lugar, pondrías esta opción en false si te quedas sin memoria). Además, especifica que se escriba una matriz de puntuación específica de posición (PSSM) en formato psi-blast con las probabilidades predichas como logits, que se puede usar con [[FavorSequenceProfileMover]] para restringir una ejecución de diseño. Por último, usa [[PseudoPerplexityMetric]] para calcular una única puntuación a partir de todas las probabilidades predichas, que describe la verosimilitud de la secuencia global.

```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        <PerResidueEsmProbabilitiesMetric name="prediction" residue_selector="res" write_pssm="test.pssm" model="esm2_t6_8M_UR50D" multirun="true"/>
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
La implementación en Rosetta no está publicada por el momento.

También deberías citar:

Artículo inicial de ESM

```bibtex
@article{rives2019biological,
  author={Rives, Alexander and Meier, Joshua and Sercu, Tom and Goyal, Siddharth and Lin, Zeming and Liu, Jason and Guo, Demi and Ott, Myle and Zitnick, C. Lawrence and Ma, Jerry and Fergus, Rob},
  title={Biological Structure and Function Emerge from Scaling Unsupervised Learning to 250 Million Protein Sequences},
  year={2019},
  doi={10.1101/622803},
  url={https://www.biorxiv.org/content/10.1101/622803v4},
  journal={PNAS}
}
```

Artículo de ESM-2

```bibtex
@article{lin2022language,
  title={Language models of protein sequences at the scale of evolution enable accurate structure prediction},
  author={Lin, Zeming and Akin, Halil and Rao, Roshan and Hie, Brian and Zhu, Zhongkai and Lu, Wenting and Smetanin, Nikita and dos Santos Costa, Allan and Fazel-Zarandi, Maryam and Sercu, Tom and Candido, Sal and others},
  journal={bioRxiv},
  year={2022},
  publisher={Cold Spring Harbor Laboratory}
}
```

##Véase también

* [[PseudoPerplexityMetric]]: Calcula la puntuación de pseudoperplejidad para cualquier PerResidueProbabilitiesMetric
* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover
