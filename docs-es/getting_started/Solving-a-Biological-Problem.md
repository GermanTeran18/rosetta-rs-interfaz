#Resolver un problema biológico

Hay muchos problemas biológicos que se pueden abordar con Rosetta. 
Estos temas suelen partir de la idea central de que la **secuencia** confiere **estructura**, que a su vez confiere **función**.
Por ejemplo, Rosetta se utilizó inicialmente para la predicción de estructuras de proteínas _de novo_ (secuencia->estructura), mientras que las aplicaciones actuales pueden llegar hasta el diseño de enzimas (función->secuencia).

En términos generales (para la mayoría de los problemas biológicos), los desafíos computacionales son dobles. 
Primero, ¿podemos muestrear adecuadamente el espacio donde vive la solución a nuestro problema?
Segundo, ¿podemos identificar dicha solución, si la hemos muestreado?
Esto debe tenerse en cuenta al decidir qué protocolo aplicar a tu problema, cuántos modelos generar y qué función de puntuación usar.

Si esta página no tiene un problema que se parezca al tuyo, puede que no hayas determinado [[cuál es el problema|Determining-what-a-problem-is]], o que no podamos resolverlo. 
Si estás pensando en tu problema desde el ángulo de muestrear un grado de libertad específico, consulta [[esta página|I want to do X]].

[[_TOC_]]

#Tipos de problemas biológicos

## Predicción de la estructura de proteínas

La pregunta general que se responde a continuación: dada una secuencia, ¿puedo predecir la estructura de la proteína?
Hay dos enfoques para predecir la estructura de una proteína solo a partir de la secuencia: _de novo_ y modelado comparativo o por homología.
También hay otros enfoques más especializados para tareas concretas, como el modelado por homología de anticuerpos, el modelado de homooligómeros simétricos y el modelado de proteínas de membrana.

### Modelado de novo

La predicción de estructuras _de novo_ es útil para modelar una proteína con poca homología. 
En el algoritmo _de novo_, la secuencia de la proteína se inicia en una conformación extendida y se «pliega» mediante cambios en los ángulos phi/psi muestreados de bibliotecas de fragmentos de n residuos.
La predicción de estructuras _de novo_ es precisa al modelar una proteína globular pequeña (<100 residuos).

Véase: [Tutorial de modelado ab initio](https://www.rosettacommons.org/demos/latest/tutorials/denovo_structure_prediction/Denovo_structure_prediction), [Tutorial sobre plegamiento de proteínas con el Broker](https://www.rosettacommons.org/demos/latest/tutorials/advanced_denovo_structure_prediction/folding_tutorial) y [[Ab initio|abinitio-relax]].

### Modelado comparativo (modelado por homología)

En cambio, el modelado comparativo suele tener éxito cuando la secuencia objetivo (la secuencia de interés) tiene un alto grado de homología de secuencia (>50%) con una proteína cuya estructura ya se ha determinado. 
Normalmente, la secuencia de la proteína de interés se enhebra (thread) sobre la estructura determinada y las áreas de baja homología se modelan mediante cierre de loops (véase más abajo) u otra técnica.

Véase: [Tutorial de modelado comparativo](https://www.rosettacommons.org/demos/latest/tutorials/rosetta_cm/rosetta_cm_tutorial), [[Modelado comparativo|minirosetta-comparative-modeling]] (posiblemente desactualizado) y [[Modelado comparativo con RosettaScripts|http://www.ncbi.nlm.nih.gov/pubmed/24035711]] (usa RosettaScripts) para más información.

### Protocolos especializados

* [[Plegamiento y docking simétricos de proteínas homooligoméricas.|fold-and-dock]]
* [[Modelado por homología de fragmentos variables de anticuerpos.|antibody-protocol]]
* [[Modelado ab initio de proteínas de membrana.|membrane-abinitio]]

## Docking proteína–proteína

Otra pregunta general que se puede abordar con Rosetta es: dadas la proteína A y la proteína B, ¿puedo generar un modelo plausible de las interacciones proteína–proteína?
Este problema puede confundirse con el de la predicción de la estructura de proteínas cuando se desconoce la estructura de la proteína A, de la proteína B o de ambas.
La flexibilidad de las proteínas puede influir en el docking de proteínas al aumentar los grados de libertad. 
Por ejemplo, un RMSD alto entre los estados unido y no unido dificulta predecir el estado unido a partir de los estados no unidos. 
Por otro lado, la información bioquímica se puede incorporar como restricciones [[(véase abajo)|Solving-a-Biological-Problem#Incorporating-Experimental-Data]] en la función de puntuación durante el docking para (con suerte) mejorar la precisión del modelo.

En general, hay tres tipos de docking: global, local y refinamiento local. 
Todos se ejecutan mediante el [[protocolo de docking|docking-protocol]], pero difieren en las opciones. Consulta este [tutorial introductorio](https://www.rosettacommons.org/demos/latest/tutorials/Protein-Protein-Docking/Protein-Protein-Docking) sobre docking proteína-proteína.

El **docking global** implica una colocación inicial aleatoria de ambos compañeros, una fase de baja resolución con centroides y traslaciones de cuerpo rígido (relativamente) grandes, y una fase de alta resolución con todos los átomos, con perturbaciones menores y reempaquetado y minimización de cadenas laterales.

El **docking local** es idéntico al docking global, salvo que la colocación inicial de los compañeros no es aleatoria, con lo que se asegura que las interacciones se muestrean alrededor de la configuración inicial.

El **docking de refinamiento local** solo usa la fase de alta resolución con todos los átomos.

Consulta el [[protocolo de docking|docking-protocol]] para más información sobre cómo ejecutar una simulación de docking.
**Nota:** las cadenas laterales deben [[prempaquetarse|docking-prepack-protocol]] antes del docking para minimizar globalmente las energías de las cadenas laterales, ya que el docking solo empaqueta las cadenas laterales de la interfaz.

### Docking de dos compañeros con estructuras conocidas

En este caso, se han determinado estructuras de resolución (casi) atómica para ambos compañeros de interacción. 
Las estructuras deben prepararse para el docking de la manera estándar (véase [[preparación de estructuras|preparing-structures]], [[prempaquetado|docking-prepack-protocol]]).
Luego el [[protocolo de docking|docking-protocol]] buscaría la estructura del complejo con energía mínima.

El docking puede emular varios modelos biofísicos de interacciones proteína–proteína, que se enumeran a continuación.

#### Docking según el modelo de llave y cerradura

El modelo de llave y cerradura supone que las proteínas interactúan de forma rígida; dos proteínas deben tener complementariedad de forma para interactuar.
Suponiendo que no se espera que los dos compañeros proteicos tengan movimientos de la cadena principal al unirse, el problema se puede abordar con docking de cadena principal rígida.

#### Docking según el modelo de selección de conformeros

Según el modelo de selección de conformeros, las proteínas se ven como un conjunto estadístico de conformaciones que incluye las conformaciones unida y no unida de cada compañero.
Para que se forme el complejo unido, las conformaciones unidas de cada compañero deben encontrarse entre sí. 
Para modelar este comportamiento computacionalmente, se puede generar un conjunto de estructuras para ese compañero (o para ambos) usando el [[protocolo relax|relax]]. 
Para que sea útil en el docking, un conjunto de estructuras no debe desviarse más de un Angstrom de RMSD respecto al modelo inicial.
Estos conjuntos de estructuras se pueden muestrear durante el protocolo de docking.

#### Docking según el modelo de ajuste inducido

El modelo de ajuste inducido ofrece una alternativa a los dos modelos anteriores.
El ajuste inducido sostiene que, en un encuentro, las proteínas se afectan mutuamente.
Esto se modela computacionalmente minimizando los grados de libertad de la cadena principal (además de la minimización habitual de los grados de libertad de las cadenas laterales) en la fase de alta resolución del protocolo de docking.
A fecha del 9 de junio de 2015, hay una opción `-bb_min_res` que se puede usar para especificar los residuos con grados de libertad de la cadena principal durante la minimización, pero la minimización de la cadena principal durante el docking no se ha probado a fondo.

#### Docking según el modelo de selección de conformeros y ajuste inducido

Es simplemente una combinación de los dos modelos anteriores.
Computacionalmente, se implementan tanto un conjunto de estructuras como la minimización de la cadena principal.

### Docking de dos compañeros en el que se desconoce una estructura

Este problema es algo más complicado y más difícil.
Los resultados son menos precisos debido a la necesidad adicional de modelar una proteína por homología o _de novo_.
El mejor enfoque es introducir un conjunto de modelos de la proteína de estructura desconocida.
Hay una salvedad: el docking de conjuntos intercambia modelos según el criterio de Metropolis, por lo que el conjunto no puede tener demasiada diversidad o resultará completamente inútil.

### Docking de dos compañeros con dos estructuras desconocidas 

Es plausible, pero **no se recomienda**. 
El éxito sería extremadamente improbable debido a la gran cantidad de muestreo necesaria para (A) modelar con precisión un compañero, (B) modelar con precisión el otro compañero y (C) modelar con precisión la interacción entre los dos compañeros.

### Docking de homooligómeros

El [[docking simétrico|sym-dock]] es útil para ensamblar varias subunidades según una simetría específica definida en un [[archivo de simetría|make-symmdef-file-denovo]].

## Docking proteína–péptido

El docking proteína–péptido es útil para determinar la estructura de un péptido corto y flexible en el contexto de un receptor.
Rosetta tiene métodos de [[docking proteína–péptido|flex-pep-dock]] que funcionan mejor partiendo de un modelo aproximado con una posición inicial cercana al sitio de unión del péptido; lo ideal es estar a menos de cinco Angstrom de RMSD de la cadena principal.
Por ello, en general no es tratable muestrear simultáneamente las conformaciones del péptido y todos los posibles sitios de unión de la superficie de la proteína.
Rosetta también puede muestrear conformaciones de moléculas peptidomiméticas, como oligooxopiperazinas, hélices sustitutas de enlaces de hidrógeno, péptidos grapados, peptoides, péptidos beta y más.

## Docking proteína–ligando 

¿Puedo predecir cómo interactuará una molécula pequeña con mi proteína? 
Como en el docking proteína–proteína, cuanto mejores sean tus estructuras iniciales, más probable es que produzcas un modelo preciso (véase arriba).
[[RosettaLigand|ligand-dock]] o [[RosettaLigand con RosettaScripts|http://dx.doi.org/10.1007%2F978-1-61779-465-0_10]] se pueden usar para predecir interacciones proteína–ligando.
RosettaLigand se ejecuta mediante el ejecutable (actualmente está desactualizado).
Es preferible hacer el docking de ligandos con RosettaScripts. 
Un método alternativo es usar [[Docking Approach using Ray Casting (DARC)|DARC]]. 
A diferencia de RosettaLigand, que explora las interacciones proteína–ligando de manera biológica mediante traslaciones y rotaciones (corrígeme si me equivoco), DARC evalúa la complementariedad de forma de un ligando para un bolsillo de la superficie de la proteína.

## Diseño de proteínas

Mientras que la predicción de la estructura de proteínas busca identificar estructuras de baja energía en el espacio, el diseño de proteínas busca identificar las identidades de los aminoácidos en el espacio de secuencias.
El diseño de proteínas se puede usar para estudiar tanto cómo la secuencia confiere estructura (es decir, predecir la secuencia de aminoácidos de un plegamiento dado) como cómo la estructura confiere función (es decir, predecir la secuencia de aminoácidos para una función dada).
Debido a la amplitud de estos desafíos, los protocolos son específicos o se generan a medida con una de las [[interfaces de scripting de Rosetta|Scripting-Documentation]].
En términos generales, el diseño de proteínas se puede realizar con el uso de un [[resfiles]] y opciones siempre que se reempaqueten las cadenas laterales.

### Rediseño de proteínas

Se puede imaginar un problema de diseño sencillo en el que se busca estabilizar una estructura de proteína conocida.
Una suposición razonable es que no habrá grandes cambios en el plegamiento de la proteína.
Por lo tanto, este problema se aborda con [[diseño de cadena principal fija|fixbb]], donde se muestrean las identidades de los aminoácidos de las cadenas laterales para identificar las que minimizan la energía sobre la cadena principal actual. 
Además, si el diseño produce una secuencia de aminoácidos que favorece los residuos hidrofóbicos, entonces el [[diseño de cadena principal fija se puede ejecutar teniendo en cuenta los parches hidrofóbicos de la superficie|fixbb-with-hpatch]].
Sin embargo, las nuevas funciones de puntuación han limitado este problema.

Otros problemas de diseño de interés pueden incluir: 
- buscar [[mutaciones puntuales estabilizadoras|pmut-scan-parallel]], 
- predicción de especificidad y diseño de bibliotecas con [[tolerancia de secuencia|sequence-tolerance]]
- [[diseño multiestado|mpi-msd]] de distintas funciones en distintos contextos
- [[RosettaRemodel|rosettaremodel]] es un marco generalizado para el diseño de cadena principal flexible
    - [[Más documentación de RosettaRemodel|Remodel]]
- mejorar la solubilidad y la reversibilidad del plegamiento con [[carga superficial|supercharge]]
- mejorar el empaquetado hidrofóbico mediante [[identificación de huecos y empaquetado|vip-app]]

### Diseño de interfaces de proteínas

[[Anchored Design|anchored-design]]
[[Diseño de péptidos|pepspec]]

### Diseño de enzimas

[[Diseño de enzimas|enzyme-design]]

## Modelado de loops de proteínas

El modelado de loops es un elemento complejo y central de la predicción de estructuras y el diseño de proteínas.
Hay dos problemas biológicos típicos:
- modelar loops en regiones de baja densidad electrónica en estructuras cristalinas
- modelar loops en regiones de baja homología o sin estructura secundaria en modelos de homología
Existe una variedad de herramientas para abordar estas tareas.
Para ver un resumen del modelado de loops en Rosetta, consulta [[esto|loopmodel]].

### Modelado de loops en regiones de baja densidad electrónica

Para el refinamiento explícito de datos de cristalografía, consulta [[aquí|density-map-scoring]].

[[loops from density|loops-from-density]] es un script que toma datos electrónicos mal ajustados y un umbral que sugiere qué parte del Pose estás dispuesto a reconstruir, y genera archivos «loops» de entrada para el modelado de loops. 

Para modelar loops ausentes en estructuras de proteínas existentes, puedes usar cualquiera de los métodos de la sección siguiente.

### Modelado de loops en regiones de baja homología o sin estructura secundaria

¿Qué pasa si estoy construyendo un modelo de homología y hay regiones con baja homología o sin estructura secundaria predicha?
Estos son los problemas típicos que resuelven los algoritmos de modelado de loops.
La mayoría de los algoritmos de modelado de loops de Rosetta están contenidos en un único ejecutable y se ejecutan configurando distintas opciones.
El método más rápido, pero menos preciso, es el descenso de coordenadas cíclico ([[CCD|loopmodel-ccd]]).
CCD cierra un loop resolviendo iterativamente los ángulos phi/psi que sitúan el extremo móvil más cerca del ancla objetivo tras la inserción de fragmentos.
En general no se recomienda CCD, pero se puede usar en casos concretos (p. ej., cuando el tiempo es un factor limitante).
El método de modelado de loops aceptado actualmente (10 de junio de 2015) es KIC de nueva generación ([[NGK|next-generation-KIC]]).
El muestreo KIC se puede mejorar o combinar con fragmentos ([[KIC con fragmentos|KIC_with_fragments]]).
También existe un método alternativo de modelado de loops, el Monte Carlo stepwise, que se puede aplicar a proteínas y **ARN**.
Por desgracia, el modelado de loops stepwise (para [[proteínas|swa-protein-main]] y [[ARN|stepwise]]) tiende a ser lento.

Consulta el [[servidor de benchmarks del laboratorio Kortemme|https://guybrush.ucsf.edu/benchmarks/benchmarks/loop_modeling]] para ver una comparación.

#### ¿Qué pasa si estoy modelando una proteína con una región desordenada?

Probablemente no deberías hacerlo con Rosetta, si es que lo haces. 
Las proteínas desordenadas son dinámicas en el contexto de una célula.
Es improbable que cualquier modelo estático _in silico_ de una proteína o región proteica desordenada sea muy preciso.
Las funciones de puntuación de Rosetta están parametrizadas con proteínas cristalizadas, no con proteínas desordenadas. 
Sin embargo, si tienes una pregunta específica, como «¿puede mi cola desordenada de 20 residuos interactuar de forma plausible con esta otra región de mi proteína?»
entonces puedes empezar a abordar esta pregunta con [[FloppyTail|floppy-tail]].

## Modelado de ácidos nucleicos

* [[ERRASER]] refina estructuras de ARN a partir de densidad electrónica (datos cristalográficos); constituye un flujo de trabajo de _erraser_minimize_, _swa_rna_analytical_closure_ y _swa_rna_main.
Requiere el uso del programa de refinamiento PHENIX.

## Resolución de estructuras cristalinas

* Para el refinamiento explícito de datos de cristalografía, consulta [[aquí|density-map-scoring]].

* [[mr_protocols|mr-protocols]] se suele usar _junto con_ Phaser / PHENIX; usa el modelado comparativo de Rosetta para reconstruir huecos e inserciones en la plantilla, así como la densidad faltante, a partir de fragmentos, seguido de relajación con restricciones a la densidad experimental.
Luego puedes usar Phaser / PHENIX de nuevo para volver a puntuar con los datos cristalográficos.

* [[ERRASER]] refina estructuras de ARN a partir de densidad electrónica (datos cristalográficos); constituye un flujo de trabajo de _erraser_minimize_, _swa_rna_analytical_closure_ y _swa_rna_main.
Requiere el uso del programa de refinamiento PHENIX.

## Resolución de estructuras de RMN

* Los [[archivos de desplazamientos químicos|chemical-shift-file]] proporcionan datos a una variedad de protocolos, a menudo denominados colectivamente [[CS-ROSETTA]], que incorporan restricciones de RMN para refinar estructuras

## ¿Y si mi pregunta no tiene respuesta? 

Puede que tu pregunta no se pueda responder. O quizá puedas construir un protocolo con [[RosettaScripts]] o [[PyRosetta]].  Consulta [[esta página|I want to do X]] para más detalles.

##Véase también

* [[Incorporating Experimental Data]]
* [[I want to do x]]: guías para tipos específicos de perturbaciones estructurales usando RosettaScripts
* [[Resources for learning biophysics and computational modeling]]
* [[Getting Started]]: una página para quienes son nuevos en Rosetta
* [Tutoriales introductorios de Rosetta](https://www.rosettacommons.org/demos/latest/Home#tutorials)
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Commands collection]]: una lista de ejemplos de líneas de comando para ejecutar los ejecutables de Rosetta
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Scripting Documentation]]: interfaces de scripting de Rosetta
* [[FAQ]]: preguntas frecuentes
* [[Glossary]]: definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de términos de Rosetta
* [[Rosetta overview]]: resumen de los conceptos principales de Rosetta
