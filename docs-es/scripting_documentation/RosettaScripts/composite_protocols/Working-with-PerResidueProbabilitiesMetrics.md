# Trabajar con PerResidueProbabilitiesMetrics
[[Volver a RosettaScripts|RosettaScripts]]

[[_TOC_]]

##Visión general
Esta página describe flujos de trabajo con PerResidueProbabilitiesMetrics, que proporcionan probabilidades de aminoácidos predichas por, por ejemplo, ProteinMPNN o la familia de modelos de lenguaje ESM. Por ejemplo, se pueden usar para puntuar una estructura de proteína dada, para analizar la conservación de residuos o para muestrear mutaciones directamente a partir de ellas.

##Configuración de la compilación
Para ejecutar modelos de aprendizaje automático tendrás que compilar con `extras=torch,tensorflow`; para más detalles, consulta [[Building Rosetta with TensorFlow and Torch]]. Como alternativa, puedes usar los [contenedores docker disponibles](https://hub.docker.com/r/rosettacommons/rosetta), p. ej. `docker run -it rosettacommons/rosetta:ml`. Todos los demás metrics/movers/taskops no requieren extras por sí mismos.

##Predicción con modelos de aprendizaje automático
Los modelos disponibles actualmente son [[ProteinMPNN|ProteinMPNNProbabilitiesMetric]] y la [[familia de modelos de lenguaje ESM|PerResidueEsmProbabilitiesMetric]]. Ambos modelos predicen probabilidades de aminoácidos para una selección de residuos dada; ESM usa solo la secuencia, mientras que ProteinMPNN usa tanto la cadena principal como la secuencia para hacer las predicciones. Para más detalles sobre las opciones disponibles y las referencias de los artículos, consulta la documentación de cada uno.

```xml
<ROSETTASCRIPTS> 
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        ----------------- Define models to use -----------------------------
        <ProteinMPNNProbabilitiesMetric name="mpnn" residue_selector="res"/>
        <PerResidueEsmProbabilitiesMetric name="esm" residue_selector="res" model="esm2_t33_650M_UR50D"/>
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <RunSimpleMetrics name="predictions" metrics="mpnn,esm"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="predictions"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```
##Promediar, guardar y cargar probabilidades
###Promediar probabilidades
Varios PerResidueProbabilitiesMetrics se pueden [[promediar|AverageProbabilitiesMetric]], lo que es útil para el muestreo o la puntuación combinados posteriores. Se puede proporcionar un peso para cada metric, para aumentar o reducir la importancia de metrics concretos. En el ejemplo siguiente promediamos las predicciones de ProteinMPNN y ESM (con el doble de peso en ESM) y luego puntuamos nuestra proteína.
```xml
<ROSETTASCRIPTS> 
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        ----------------- Define models to use -----------------------------
        <ProteinMPNNProbabilitiesMetric name="mpnn" residue_selector="res"/>
        <PerResidueEsmProbabilitiesMetric name="esm" residue_selector="res" model="esm2_t33_650M_UR50D"/>
        ----------------- Average predictions without re-calculation -------
        <AverageProbabilitiesMetric name="avg" metrics="mpnn,esm" weights="1,2" use_cached_data="true"/>
        ----------------- Analyze predictions without re-calculation -------
        <PseudoPerplexityMetric name="avg_perplex" metric="avg" use_cached_data="true" custom_type="avg"/>
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <RunSimpleMetrics name="predictions" metrics="mpnn,esm"/>
        <RunSimpleMetrics name="analysis" metrics="avg,avg_perplex"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="predictions"/>
        <Add mover_name="analaysis"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

###Guardar probabilidades
Todas las PerResidueProbabilities se pueden [[guardar|SaveProbabilitiesMetricMover]] en un formato de archivo de pesos o en una PSSM (matriz de puntuación específica de posición) al estilo de psi-blast. Esto es útil para separar las predicciones del modelo del muestreo posterior de secuencias/mutaciones (archivo de pesos), o para [[restringir durante el diseño|FavorSequenceProfileMover]] (archivo PSSM).
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        ----------------- Define model to use for prediction -----------------------------
        <PerResidueEsmProbabilitiesMetric name="esm" residue_selector="res" model="esm2_t33_650M_UR50D" multirun="true"/>
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
###Cargar probabilidades
Los archivos de pesos de probabilidades guardados con el [[SaveProbabilitiesMetricMover]] o creados manualmente se pueden [[cargar|LoadedProbabilitiesMetric]] en un PerResidueProbabilitiesMetric. Las primeras líneas del archivo `probs.weights` tienen este aspecto:
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
##Analizar probabilidades
###Puntuación
Para puntuar un Pose con las probabilidades predichas se puede usar el [[PseudoPerplexityMetric]]; cuanto más bajo, mejor, siendo 1 el valor más bajo posible.
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        <PerResidueEsmProbabilitiesMetric name="prediction" residue_selector="res" model="esm2_t33_650M_UR50D"/>
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
###Conservación
Para obtener la conservación de las posiciones en relación con las probabilidades predichas se puede usar el [[ProbabilityConservationMetric]]. Proporciona la entropía de Shannon relativa, cuyo valor devuelto va de 0 (sin conservación, todos los aminoácidos son igual de probables) a 1 (totalmente conservada, solo se predice un aminoácido). El ejemplo siguiente también escribe los valores en la columna del factor B del PDB, lo que permite una visualización sencilla en PyMol/ChimeraX.
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
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
###Obtener las mejores mutaciones puntuales
Se puede usar un [[metric|BestMutationsFromProbabilitiesMetric]] que calcula las mutaciones con la mayor probabilidad delta respecto de los residuos actuales a partir de un PerResidueProbabilitiesMetric para identificar rápidamente mutaciones puntuales con probabilidad de tener un gran impacto. El ejemplo usa el modelo de lenguaje ESM para predecir probabilidades de aminoácidos y luego obtiene las diez mutaciones más probables que sean al menos tan probables como el aminoácido presente.
```xml
<ROSETTASCRIPTS>
    <RESIDUE_SELECTORS>
        <Chain name="res" chains="A" />
    </RESIDUE_SELECTORS>
    <SIMPLE_METRICS>
        ----------------- Define models to use -----------------------------
        <PerResidueEsmProbabilitiesMetric name="esm" residue_selector="res" model="esm2_t33_650M_UR50D"/>
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
##Usar probabilidades predichas para el diseño de proteínas
###Muestrear una secuencia/mutaciones a partir de probabilidades y hacer threading sobre el Pose
Las probabilidades predichas se pueden usar para diseñar (cambiar) toda la secuencia de un Pose o un número de mutaciones especificado por el usuario, empezando por las posiciones que más difieren de las predicciones, con [[este mover|SampleSequenceFromProbabilities]]. En el ejemplo siguiente muestreamos diez mutaciones a partir de probabilidades predichas por ESM, donde cada mutación necesita tener al menos una probabilidad de 0.0001 y una probabilidad delta respecto de la actual de 0.0 (es decir, al menos tan probable como el aminoácido actual en una posición concreta). Hay una opción de temperatura tanto para la elección de la posición como para la de los aminoácidos, donde T<1 produce un comportamiento más determinista y T>1 más diversidad. También restringimos la elección de mutaciones con un resfile que especifica el comportamiento de empaquetado de residuos y/o aminoácidos. 
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
        <PerResidueEsmProbabilitiesMetric name="esm" residue_selector="res" model="esm2_t30_150M_UR50D" multirun="true"/>
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

###Restringir los aminoácidos disponibles durante el diseño según las probabilidades
Para limitar el espacio de búsqueda durante el diseño, los aminoácidos predichos como improbables se pueden desactivar con esta [[TaskOperation|RestrictAAsFromProbabilities]]. El ejemplo siguiente carga probabilidades de un archivo de pesos y restringe a los aminoácidos que tengan al menos una probabilidad de 0.0001 y una probabilidad delta de 0 (es decir, al menos tan probables como el aminoácido actual en esa posición). 
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
###Restringir el diseño con probabilidades
Otra forma de informar a Rosetta de las probabilidades predichas es convertirlas en restricciones de ResidueType. Para ello, un PerResidueProbabilitiesMetric debe guardarse como una PSSM al estilo de psi-blast, que se puede usar con el [[FavorSequenceProfileMover]], p. ej.:
```xml
<ROSETTASCRIPTS>
    <SCOREFXNS>
        --------------- Setup a scorefunction with ResidueType constraints turned on -------------
	<ScoreFunction name="beta" weights="beta"/>
	<ScoreFunction name="beta_cst" weights="beta">
		<Reweight scoretype="res_type_constraint" weight="1.0"/>
	</ScoreFunction>
    </SCOREFXNS>
    <MOVERS>
        -------------------------- Setup ResidueType constraints ----------------------------
	<FavorSequenceProfile name="favor" scaling="global" weight="15" pssm="probabilities.pssm" scorefxns="beta_cst" chain="1"/>
        -------------------------- Setup your favorite design mover -------------------------
	<PackRotamersMover name="design" scorefxn="beta_cst"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="favor"/>
        <Add mover_name="design"/>
    </PROTOCOLS>
    <OUTPUT scorefxn="beta" />
</ROSETTASCRIPTS>
```