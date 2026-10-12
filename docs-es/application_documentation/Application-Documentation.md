#Documentación de aplicaciones

A continuación se muestra una lista de las aplicaciones publicadas actualmente que cuentan con documentación para desarrolladores. Haz clic en una aplicación para
ver una descripción más detallada de su propósito y ejemplos detallados. Si falta una aplicación publicada, por favor
notifica el error en nuestro [sistema de seguimiento de incidencias](https://github.com/RosettaCommons/rosetta/issues).

Si no estás seguro de qué aplicación se ajusta mejor a tu problema biológico, quizás quieras empezar [[aquí|Solving-a-Biological-Problem]].

Puedes encontrar una colección de ejemplos de líneas de comando [[aquí|commands-collection]].

**Tabla de contenidos** 

- [[Interfaces de scripting para la funcionalidad de Rosetta|Application Documentation#scripting]]
- [Predicción de estructura](Application Documentation#Structure-Prediction)
- [Docking](Application Documentation#Docking)
- [Diseño](Application Documentation#Design)
- [Proteínas de membrana](Application Documentation#Membrane-Proteins)
- [Análisis](Application Documentation#Analysis)
- [Interfaz de usuario](Application Documentation#UI)
- [Utilidades](Application Documentation#Utilities)
- [Otras](Application Documentation#Other)

##Interfaces de scripting para la funcionalidad de Rosetta <a name="scripting" />
- [[RosettaScripts]]: una interfaz de scripting basada en XML
- [[RosettaScripts-JD3]]: RosettaScripts que se puede ejecutar con distintas entradas y configuraciones en un solo trabajo
- [[El Topology Broker|BrokeredEnvironment]]: prototipado rápido de protocolos en C++, [[PyRosetta]] y [[RosettaScripts]]
- [[PyRosetta]]: envoltorios (wrappers) de Python para Rosetta

##Predicción de estructura <a name="Structure-Prediction" />
Aunque la mayoría de estas aplicaciones se centran en la predicción, muchas tienen opciones que también permiten diseño.

- [[Modelado ab initio|abinitio-relax]] - predice estructuras tridimensionales de proteínas a partir de sus secuencias de aminoácidos.  
    * [[Membrane abinitio]] - ab initio para proteínas de membrana.  
    * [[Metaloproteínas ab initio|metalloprotein-abrelax]] - modelado ab initio de metaloproteínas.  
- [[Backrub]] - crea conjuntos de cadenas principales usando cambios pequeños y locales de la cadena principal.  
- Modelado comparativo - construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas para el modelado.  
    * [[Protocolo original | minirosetta-comparative-modeling]]
    * [[RosettaCM]]   
    * [[IterativeHybridize]]

- [[Floppy tail]] - predice estructuras de regiones N-terminales o C-terminales largas y flexibles.
- [[Fold-and-dock]] - predice estructuras tridimensionales de homooligómeros simétricos.
- [[Predicción de estructura de haces helicoidales|helical-bundle-predict]] - predice estructuras de heteropolímeros predominantemente helicoidales a partir de la secuencia.  Usa un enfoque sin fragmentos que es adecuado para proteínas y heteropolímeros no naturales sin parientes cercanos de estructura conocida.  Experimental.
- [[Protocolos de reemplazo molecular|mr-protocols]] - usa Rosetta para construir modelos para el reemplazo molecular en cristalografía de rayos X.  
    * [[Prepare template for MR]] - script de preparación para los protocolos de reemplazo molecular.  
- [[Relax]] - optimiza "localmente" las estructuras, incluida la asignación de posiciones de las cadenas laterales.
- [ ARN ](#RNA) - véase más abajo para las aplicaciones, incluidas FARFAR y ERRASER (refinamiento cristalográfico).  
- [[Predicción simple de péptidos cíclicos|simple_cycpep_predict]] - predicción de estructuras de péptidos pequeños (~5-20 residuos) ciclados por la cadena principal, formados por cualquier mezcla de L- y D-aminoácidos.
- [[Aplicación trRosetta|trRosetta]] - predice estructuras de proteínas canónicas de una sola cadena sin fragmentos, usando la red neuronal trRosetta y minimización por descenso de gradiente.
- [[RosettaNMR con restricciones paramagnéticas|RosettaNMR with Paramagnetic Restraints]] - predicción de estructura en RosettaNMR usando desplazamientos químicos de la cadena principal y restricciones paramagnéticas derivadas de etiquetas de iones metálicos.
  
--------------------------

###Modelado de anticuerpos
- [[Antibody protocol]] (RosettaAntibody3) - descripción general del protocolo de modelado de anticuerpos.  
    * [[Injerto de loops CDR|antibody-assemble-cdrs]] - injerta plantillas de CDR de anticuerpos sobre la plantilla del marco para crear un modelo aproximado de anticuerpo.  
    * [[Modelado del CDR H3|antibody-model-CDR-H3]] - determina estructuras de anticuerpos combinando el docking VL-VH y el modelado del loop H3.


------------------------

###Modelado de receptores de células T
- [[Protocolo TCRmodel|TCRmodel]] - descripción general del protocolo TCRmodel.  

------------------------

###Modelado de carbohidratos
* [[WorkingWithGlycans]]

#### Aplicaciones

Aplicación | Descripción
------------ | -------------
[[GlycanRelax]] | Modela árboles de glicanos usando información conocida de carbohidratos.  Funciona para modelado de novo completo o para refinamiento.
[[GlycanInfo]] | Obtiene información sobre todos los árboles de glicanos de un Pose
[[GlycanClashCheck]] | Obtiene datos sobre los choques del modelo con y entre glicanos, o entre glicanos y otras cadenas de proteína.

#### Componentes de RosettaScript

Componente | Descripción
------------ | -------------
[[GlycanRelaxMover]] | Modela árboles de glicanos usando información conocida de carbohidratos.  Funciona para modelado de novo completo o para refinamiento.
[[SimpleGlycosylateMover]] | Glicosila Poses con árboles de glicanos.  
[[GlycanTreeSelector]] | Selecciona árboles de glicanos individuales o todos ellos
[[GlycanResidueSelector]] | Selecciona residuos específicos de cada árbol de glicanos de interés.

---------------------------

###Modelado de loops
-  [[Descripción general del modelado de loops|loopmodel]]
-  [[Modelado de loops con CCD|loopmodel-ccd]] - muestrea conformaciones de loops usando fragmentos y el algoritmo de cierre CCD.
-  [[Modelado cinemático de loops|loopmodel-kinematic]] - muestrea conformaciones de loops usando el algoritmo de cierre cinemático.
-  [[Next-generation KIC]] - una versión más reciente del modelado de loops con cierre cinemático.
-  [[KIC con fragmentos|KIC_with_fragments]] - la versión más reciente del modelado de loops, que combina el cierre cinemático con el muestreo de grados de libertad acoplados a partir de fragmentos.
-  [[Ensamblaje stepwise de loops de proteína|swa-protein-main]] - genera modelos tridimensionales de novo de segmentos de proteína     -  [[Ensamblaje stepwise de loops largos|swa-protein-long-loop]] - para loops de más de 4-5 residuos. Véase también  [[Monte Carlo stepwise|stepwise]].
-  [[Monte Carlo stepwise|stepwise]] - genera modelos 3D de loops, motivos e interfaces de proteína, ARN y proteína/ARN. Versión estocástica del ensamblaje stepwise. 

-----------------------------

###ARN y ARN/proteína
-  [[FARFAR2|FARFAR2]] - predice estructuras completas de ARN en un solo paso
-  [[Predicción de estructura de ARN|rna-denovo-setup]] - predice estructuras tridimensionales de ARN a partir de su secuencia de nucleótidos. Lee esto primero. 
 *  [[RNA tools]] - herramientas útiles para ARN y ARN/proteína, incluida la edición general de PDB, el envío a clústeres y la preparación de trabajos.
 *  [[Enhebrado de ARN|rna-thread]] - enhebra (thread) una nueva secuencia de nucleótidos sobre una estructura de ARN existente.  
 *  [[Predicción de motivos de ARN|rna denovo]] - modela motivos de ARN con ensamblaje de fragmentos de ARN con refinamiento de todos los átomos (FARFAR).
 * [[CS Rosetta RNA]]: refina y puntúa una estructura de ARN usando datos de desplazamiento químico de RMN.
-  [[Enumeración stepwise de loops de ARN|swa-rna-loop]] - construye loops de ARN mediante ensamblaje stepwise determinista. Véase también  [[Monte Carlo stepwise|stepwise]].
-  [[Monte Carlo stepwise|stepwise]] - genera modelos 3D de loops, motivos e interfaces de proteína, ARN y proteína/ARN. Versión estocástica del ensamblaje stepwise. 
-  [[Ensamblaje de ARN con restricciones experimentales|rna-assembly]] - predice estructuras tridimensionales de ARN grandes con la ayuda de restricciones experimentales. Nota: en gran medida obsoleto por un pipeline más reciente (la documentación llegará pronto).
-  [[ERRASER]] - refina una estructura de ARN dadas restricciones de densidad electrónica.  
-  [[ERRASER2]] - una actualización de ERRASER que elimina la necesidad de un entorno de Python concreto y de la evaluación con Phenix, a favor de herramientas exclusivamente internas de Rosetta. Todavía sin publicar; oficialmente "beta".
-  [[DRRAFTER]] - construye coordenadas de ARN en mapas de crio-EM de ensamblajes ARN-proteína.
-  [[auto-DRRAFTER]] - construye automáticamente coordenadas de ARN en mapas de crio-EM (actualmente para mapas que no contienen proteínas).
-  [[Sample around nucleobase]] - visualización de funciones de energía mediante el escaneo de moléculas sonda alrededor de una nucleobase.
-  [[RECCES]] - cálculo de energía libre de ARN con muestreo exhaustivo.
-  [[RNA pharmacophore]] - extrae y agrupa las características clave presentes en el ARN (anillos, donadores y aceptores de puentes de hidrógeno) a partir de la estructura de un complejo proteína-ARN.


---------------------------------

##Docking <a name="Docking" />

###Docking de anticuerpos
- [[Docking de anticuerpos camélidos|antibody-mode-camelid]] - hace docking de anticuerpos camélidos con sus antígenos.
- [[SnugDock | snugdock]] - optimización de la estructura del parátopo durante el docking anticuerpo-antígeno

###Docking de ligandos
- [[Docking de ligandos|ligand-dock]] (RosettaLigand) - determina la estructura de complejos proteína-molécula pequeña.  
   * [[Extract atomtree diffs]] - extrae estructuras del formato de archivo AtomTreeDiff.

- [[Docking con trazado de rayos|DARC]] (DARC) - método de docking para atacar específicamente sitios de interacción de proteínas.

- [[Terpene docking]] - Terdockin: protocolo de docking para terpeno sintasas.
 
###Docking de péptidos
- [[Docking de péptidos flexibles|flex-pep-dock]] - hace docking de un péptido flexible a una proteína.

###Docking proteína-proteína
- [[Docking proteína-proteína|docking-protocol]] (RosettaDock) - determina las estructuras de complejos proteína-proteína usando perturbaciones de cuerpo rígido.  
    * [[Docking prepack protocol]] - prepara estructuras para el docking proteína-proteína.  
    * [[Motif Dock Score]] - docking proteína-proteína eficiente de baja resolución.

- [[Docking simétrico|sym-dock]] - determina la estructura de homooligómeros simétricos.  

- [[Docking con conjugación química|ubq-conjugated]] - determina las estructuras de proteínas conjugadas con ubiquitina.  

###Docking de iones
- [[ Modelado de Mg(2+) | mg-modeler ]] - código básico para el docking de Mg(2+), con o sin aguas explícitas, probado inicialmente en ARN.

###Docking proteína-superficie
- [[Docking de superficies|surface-docking]] - hace docking de una proteína a una superficie metálica o mineral.
 
------------------------------

##Diseño <a name="Design" />

### General 

- [[Diseño de cadena principal fija|fixbb]] - optimiza la posición y la identidad de los rotámeros de cadenas laterales sobre cadenas principales fijas.  
   * [[Diseño de cadena principal fija con hpatch|fixbb-with-hpatch]] - diseño de cadena principal fija con una penalización por parches hidrofóbicos en la superficie.  

- [[Diseño multiestado|mpi-msd]] - optimiza proteínas para múltiples contextos deseados y no deseados.

-------------------------------------------

- [[Anchored design]] - diseña interfaces usando un "ancla" de interacciones conocidas.  
    * [[Anchored pdb creator]] - prepara los archivos iniciales para AnchoredDesign.  
    * [[Anchor finder]] - encuentra interacciones que puedan servir como "anclas" para AnchoredDesign. 

- [[Create clash-based repack shell]] -- complementa un resfile de diseño con residuos que pueden chocar. 

- [[RosettaAntibodyDesign]] - diseña anticuerpos y complejos anticuerpo-antígeno

- [[RECON multistate design]] - diseño de multiespecificidad para optimizar proteínas para el reconocimiento de múltiples dianas.

- [[revert-design-to-native]] - obtiene la contribución energética de los residuos diseñados a la energía de unión predicha

- [[RosettaRemodel]] - rediseña la cadena principal y la secuencia de loops de proteína y de elementos de estructura secundaria. 
    * [[Remodel]] - documentación adicional de remodel

- [[curvedsheetdesign]] - diseña cadenas principales para láminas beta curvas

- [[Sequence tolerance]] - optimiza proteínas para aplicaciones de bibliotecas (por ejemplo, display en fagos o en levaduras).  

-  [[Diseño stepwise|stepwise]] - optimiza simultáneamente la secuencia y la estructura de segmentos pequeños de ARN y proteína. Parte de la aplicación stepwise.

- [[Zinc heterodimer design]] - diseña heterodímeros mediados por zinc.  

- [[Biased forward folding]] - selecciona proteínas diseñadas de novo para la predicción de estructura ab initio.

### Mejora de la estabilidad

- [[Escaneo de mutaciones puntuales|pmut-scan-parallel]] - identifica mutantes puntuales estabilizadores.  

- [[Supercharge]] - reingeniería de proteínas para lograr cargas netas altas en la superficie, para contrarrestar la agregación.

- [[Identificación y empaquetamiento de vacíos|vip-app]] (RosettaVIP) - identifica y rellena cavidades en una proteína.

### Enzimas

- [[Enzyme Design]] - diseña una proteína alrededor de una molécula pequeña, con restricciones catalíticas. 

- [[RosettaEnzCM]] - calcula las distancias atómicas promedio de los residuos catalíticos de las plantillas, para usarlas como restricciones de distancia en RosettaCM. 

### Péptidos
- [[Pepspec]] - evalúa y diseña interacciones péptido-proteína.
- [[Conteo de secuencias de péptidos cíclicos|count-cycpep-sequences]] - cuenta el número de secuencias únicas posibles para un macrociclo dados **P** bloques de construcción posibles y **n** residuos, con opciones para simetría CN y SN.  Evalúa el número con expresiones analíticas derivadas del [lema de Burnside](https://en.wikipedia.org/wiki/Burnside%27s_lemma) y, opcionalmente, lo compara con los recuentos realizados por enumeración de fuerza bruta.

### Moléculas pequeñas

- [[Match]] - coloca una molécula pequeña en un bolsillo de una proteína de modo que cumpla restricciones geométricas dadas.  

- [[OOP design]] - diseña proteínas con residuos de oligooxopiperazina.  

- [[DougsDockDesignMinimize|doug-dock-design-min-mod2-cal-cal]] - rediseña la interfaz proteína/péptido de la calpaína y un fragmento de su péptido inhibidor, la calpastatina.

- [[theta ligand]] - calcula la fracción de ligando expuesta al solvente en un complejo proteína-ligando.
 
  
### ARN

- [[RNA design]] - optimiza la secuencia de ARN para cadenas principales fijas.  

-  [[Diseño stepwise|stepwise]] - optimiza simultáneamente la secuencia y la estructura de segmentos pequeños de ARN y proteína. Parte de la aplicación stepwise.

### ADN

- [[Rosetta DNA]] (RosettaDNA) - diseña y modela interacciones de proteínas con ADN. 

### Estructura secundaria

- [[Diseño de sustitutos de puentes de hidrógeno|hbs-design]] - diseña proteínas de unión alfa-helicoidales estabilizadas.

- [[Beta strand homodimer design]] - encuentra proteínas con hebras beta expuestas en la superficie y luego diseña un homodímero que se forme mediante esa hebra beta.  

--------------------------------

##Proteínas de membrana <a name="Membrane-Proteins" />

### Primeros pasos
- [[ Descripción general | RosettaMP-GettingStarted-Overview]]
- [[ Preparación de las entradas | RosettaMP-GettingStarted-PreparingInputs]]
- [[ Opciones (flags) | RosettaMP-GettingStarted-Options]]

### Elementos clave de RosettaMP
- [[ Representación de la membrana (residuo) | RosettaMP-KeyElements-MembraneRsd ]]
- [[ Embedding | RosettaMP-KeyElements-Embedding ]]
- [[ Movers | RosettaMP-KeyElements-Movers ]]
- [[ Funciones de energía | RosettaMP-KeyElements-EnergyFunction ]]
- [[ Visualización | RosettaMP-KeyElements-Visualization ]]

### Aplicaciones
 - Relax:
    * [[mp_relax|RosettaMP-App-MPFastRelax]] - refinamiento de alta resolución de estructuras de proteínas de membrana con optimización de la posición de la membrana mediante minimización (usa el marco de membrana y FastRelax)
 - ddG:
    * [[mp_ddG|RosettaMP-App-MPddG]] - predicción de cambios de energía libre por mutación usando el marco de membrana
 - Docking:
    * [[mp_dock|RosettaMP-App-MPDock]] - docking proteína-proteína en la membrana (usa el marco de membrana)
    * [[mp_dock_setup|RosettaMP-App-MPDockSetup]] - herramientas de preparación necesarias para ejecutar MPDock
    * [[mp_symdock|RosettaMP-App-MPSymDock]] - ensambla complejos simétricos en el entorno de la membrana (usa el marco de membrana)
 - Visualizador:
    * [[mp_viewer|RosettaMP-App-MPPyMOLViewer]] - aplicación independiente para visualizar en tiempo real simulaciones de proteínas de membrana con pymol (usa el marco de membrana)
 - Herramientas:
    * [[score_jd2|RosettaMP-App-MPScoring]] - configuración para usar score_jd2 con las funciones de puntuación de RosettaMP. 
    * [[mp_span_from_pdb|RosettaMP-App-MPSpanFromPDB]] - calcula los segmentos transmembrana a partir de la estructura PDB
    * [[mp_transform|RosettaMP-App-MPTransform]] - transforma la proteína a coordenadas de membrana.
 - Predicción de estructura:
    * [[helix_from_sequence|RosettaMP-App-HelixFromSequence]] - construye una sola hélice (soluble o transmembrana) a partir de la secuencia
 - Modelado por homología:
    * [[RosettaCM membrane|RosettaCM-membrane]] - modelado por homología con varias plantillas basado en RosettaCM y RosettaMembrane
 - Accesibilidad a lípidos:
    * [[mp_lipid_acc|RosettaMP-LipidAcc]] - calcula la accesibilidad a lípidos por residuo a partir de la estructura
 - Ensamblaje de dominios:
    * [[mp_domain_assembly|RosettaMP-DomainAssembly]] - crea un modelo de longitud completa de una proteína de membrana a partir de estructuras de dominios conocidas
 - RosettaEvolutionaryLigand:
    * [[REvoLd|revold]] - optimiza ligandos de moléculas pequeñas mediante un algoritmo evolutivo que muestrea bibliotecas combinatorias como Enamine REAL.

##Utilidades

- [[mp_utilities | RosettaMP-Utilities]] - diversas utilidades con opciones de membrana.

----------------------------------

##Análisis <a name="Analysis" />

### Puntuación 

- [[Puntuación|score-commands]] - calcula la energía de Rosetta de las estructuras.

- [[Residue energy breakdown]] - descompone las puntuaciones en interacciones intrarresiduo y de pares de residuos.

- [[ddG monomer]] - predice el cambio de estabilidad (el ddG) de una proteína monomérica inducido por una mutación puntual.

- [[flex ddG]] - predice el cambio en la energía de interacción en una interfaz proteína-proteína tras una mutación. Probado en benchmarks para mutaciones puntuales individuales o conjuntos de varias mutaciones. Es más lento que otros protocolos porque incluye más muestreo, pero es especialmente útil para múltiples mutaciones o mutaciones de pequeño a grande en interfaces.

- [[cartesian-ddg]] - una versión distinta del cálculo de ddg, que usa muestreo en espacio cartesiano

- [[Density map scoring]] - puntúa estructuras con información de densidad electrónica.  

### Agrupamiento 

- [[calibur|calibur-clustering]] - (aplicación preferida) agrupa estructuras usando un port de [calibur](http://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-11-25) a Rosetta .   

- [[cluster |Cluster]] - aplicación original de Rosetta++. Falla (_es decir_, produce en silencio resultados sin sentido) con un gran número de decoys.

- [[energy_based_clustering|energy_based_clustering_application]] - un enfoque rápido de agrupamiento basado en la energía, optimizado para grandes cantidades de estructuras.

 

### Restricciones

- [[Constraint Info]] - obtiene información sobre cómo una estructura se ajusta a las restricciones de Rosetta.

### Marco de Feature Reporters
 - [[FeatureReporters]] - marco para el análisis y la comparación de diversas características de estructuras PDB
 - [[FeaturesTutorials]] - tutoriales del marco de análisis Feature Reporter

### Interfaces

- [[Interface analyzer]] - calcula métricas que evalúan interfaces. 

### Péptidos

- [[PeptiDerive]] - deriva, a partir de una interfaz dada, el tramo lineal que aporta la mayor parte de la energía de unión.

### Calidad del empaquetamiento
- [[RosettaHoles]] - evaluación rápida del empaquetamiento del núcleo de proteínas para predicción de estructura, diseño y validación

### Bolsillos de superficie
- [[Medición de bolsillos|pocket-measure]] - mide el "volumen profundo" de un bolsillo de superficie.

### Átomos polares enterrados sin satisfacer
- [[shobuns|shobuns]] - identifica átomos polares enterrados sin satisfacer para el modelo SHO de solvatación polar

### Predicción de desorden de residuos
- [[ResidueDisorder|ResidueDisorder]] - predice el orden o el desorden de cada residuo de una proteína.

### Exposición al solvente de los residuos
- [[PerResidueSolventExposure|PerResidueSolventExposure]] - calcula la exposición al solvente por residuo en forma de número de vecinos

### Predicción de datos de espectrometría de masas resuelta en energía (ERMS) de disociación inducida por superficie (SID)
- [[SID_ERMS_prediction|SID_ERMS_prediction]] - predice el SID ERMS de un complejo proteico.

##Interfaz de usuario <a name="UI" />

[[Workbench|/internal_documentation/ui/workbench]] - interfaz de usuario para enviar trabajos de Rosetta desde un cliente de escritorio

##Utilidades <a name="Utilities" />

Estas aplicaciones sirven principalmente para apoyar a otras aplicaciones de Rosetta o para ayudar a preparar o analizar ejecuciones de Rosetta.

### General
- [[Build peptide]] - construye péptidos extendidos o estructuras de proteínas a partir de secuencias. 

- [[Volcado de un residuo con cápsulas|dump-capped-residue]] - escribe un archivo PDB que contiene un residuo (especificable por nombre), con opciones que pueden controlar el estado del parche polimérico

- [[CA to allatom]] - construye modelos con todos los átomos a partir de trazados que solo contienen C-alfa.  

- [[Crear definición de simetría|make-symmdef-file-denovo]] - crea archivos de definición de simetría de Rosetta para un grupo puntual.  
    * [[Crear definición de simetría a partir de una estructura|make-symmdef-file]] - crea archivos de definición de simetría de Rosetta a partir de PDB plantilla.  

- [[Batch distances]] - calcula el mayor acercamiento para pares de residuos.
 
- [[Selector de fragmentos|app-fragment-picker]] - escoge fragmentos para usarlos junto con otras aplicaciones de Rosetta que usan fragmentos.  
    * [[Selector de fragmentos antiguo|fragment-picking-old]] - la versión anterior del selector de fragmentos.  
    * [[Structure Set Fragment Picker|Structure-Set-Fragment-Picker]] - escoge fragmentos a partir de un conjunto dado de archivos pdb

- [[Make exemplars|make-exemplar]] - crea un ejemplar para bolsillos de superficie de una proteína que tocan un residuo objetivo.

- [[OptE|opt-e-parallel-doc]] - reajusta los pesos de referencia de una función de puntuación para optimizar métricas dadas.  

- [[Sugerencia de residuos objetivo para bolsillos|pocket-suggest-targets]] - sugiere el mejor par de residuos objetivo para la optimización de bolsillos con el fin de inhibir una interacción proteína-proteína.

- [[Relax de bolsillos|pocket-relax]] - relax seguido de minimización con todos los átomos y puntuación sin PocketConstraint. Útil al realizar optimización de bolsillos.

- [[PyMol server]] - observa lo que hace un programa de Rosetta en ejecución usando PyMol.

<!--- BEGIN_INTERNAL -->
- [[Convertidor de tipos de residuo|restype_converter]] - convierte entre sí los formatos de especificación de tipos de residuo de Rosetta.
<!--- END_INTERNAL -->

- [[Sequence recovery]] - calcula las mutaciones y la recuperación del nativo a partir de ejecuciones de diseño de Rosetta.

- [[Corrección del potencial torsional|torsional-potential-corrections]] - elimina interacciones contadas doblemente del potencial torsional de las cadenas laterales

###Aminoácidos no canónicos
 - [[Crear biblioteca de rotámeros|make-rot-lib]] - genera bibliotecas de rotámeros para aminoácidos no canónicos.  
 - [[Unfolded state energy calculator]] - determina la energía de base de los aminoácidos no canónicos en el estado desplegado.  

### Modificaciones postraduccionales
#### Aplicaciones
Aplicación | Descripción
------------ | -------------
[[DNA_methylation]] | Simula la acción de una enzima ADN metiltransferasa virtual sobre un archivo `.pdb`.
[[glycosyltransfer]] | Simula la acción de una glicosiltransferasa (GT) u oligosacariltransferasa (OST) virtual sobre un archivo `.pdb`.
[[phosphorylation]] | Simula la acción de una enzima quinasa virtual sobre un archivo `.pdb`.
[[N-terminal_acetyltransfer]] | Simula la acción de una enzima N-terminal acetiltransferasa (NAT) virtual sobre un archivo `.pdb`.

#### Componentes de mover
 - [[EnzymaticMover]] - documentación sobre el código subyacente usado para las modificaciones postraduccionales en Rosetta.
  
----------------------------------

## Otras <a name="Other" />

- [[Colección de ejemplos de líneas de comando|commands-collection]]

- [[minirosetta]] - la aplicación contenedora (wrapper) "minirosetta" para boinc.

* [[Tools]]: lista de scripts accesorios útiles incluidos con Rosetta

----------------------------------

##Véase también

* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Commands collection]]: una lista de ejemplos de líneas de comando para ejecutar archivos ejecutables de Rosetta
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Scripting Documentation]]: interfaces de scripting de Rosetta
* [[RosettaScripts]]: la página principal de RosettaScripts
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[TACC]]: información para ejecutar Rosetta en el clúster TACC/Stampede.