#Aplicaciones de predicción de estructura

##Aplicaciones de predicción de estructura

Aunque la mayoría de estas aplicaciones se centran en la predicción, muchas tienen opciones que también permiten el diseño.

[[_TOC_]]

### Predicción de estructura
- [[Modelado ab initio|abinitio-relax]]: Predice estructuras tridimensionales de proteínas a partir de sus secuencias de aminoácidos.
    * [[Abinitio]]: Más documentación sobre el protocolo abinitio
    * [[NonlocalAbinitio]]: Aplicación para predecir la estructura de una proteína a partir de cierta información sobre la estructura de la proteína.
    * [[Membrane abinitio]]: Ab initio para proteínas de membrana.  
    * [[Metalloprotein ab initio|metalloprotein-abrelax]]: Modelado ab initio de metaloproteínas.  
- [[Backrub]]: Crea conjuntos de cadenas principales mediante cambios pequeños y locales en la cadena principal.  
- [[Modelado comparativo|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado.  
- [[Floppy tail]]: Predice estructuras de regiones largas y flexibles en el extremo N o C.
- [[Fold-and-dock]]: Predice estructuras tridimensionales de homooligómeros simétricos.  
- [[Protocolos de reemplazo molecular|mr-protocols]]: Usa Rosetta para construir modelos para el reemplazo molecular en cristalografía de rayos X.  
    * [[Prepare template for MR]]: Script de preparación para los protocolos de reemplazo molecular.  
- [[Relax]]: Optimiza «localmente» las estructuras, incluida la asignación de posiciones de las cadenas laterales.
- [ ARN ](#RNA): consulta más abajo las aplicaciones, incluidas FARFAR y ERRASER (refinamiento cristalográfico).  
- [[RosettaNMR con restricciones paramagnéticas|RosettaNMR with Paramagnetic Restraints]]: Predicción de estructura en RosettaNMR usando desplazamientos químicos de la cadena principal y restricciones paramagnéticas derivadas de etiquetas de iones metálicos.
- [[trRosetta]]: Predicción de estructura sin fragmentos, usando restricciones generadas a partir de la secuencia o de un alineamiento múltiple de secuencias, y la potencia de las redes neuronales profundas.  Fue el n.º 2 en la competición CASP14 de 2020, solo por detrás de AlphaFold2.  

###Modelado de loops
-  [[Descripción general del modelado de loops|loopmodel]]
-  [[Modelado de loops CCD|loopmodel-ccd]]: Muestrea conformaciones de loops usando fragmentos y el algoritmo de cierre CCD.
-  [[Modelado cinemático de loops|loopmodel-kinematic]]: Muestrea conformaciones de loops usando el algoritmo de cierre cinemático.
-  [[Next-generation KIC]]: Una versión más reciente del modelado de loops con cierre cinemático.
-  [[KIC con fragmentos|KIC_with_fragments]]: La versión más reciente del modelado de loops, que combina el cierre cinemático con el muestreo de grados de libertad acoplados a partir de fragmentos.
-  [[Loop closing]]: Cierre de rupturas de cadena introducidas durante el modelado.
-  [[Ensamblaje stepwise de loops de proteínas|swa-protein-main]]: Genera modelos tridimensionales de novo de segmentos de proteínas    :  [[Ensamblaje stepwise de loops largos|swa-protein-long-loop]]: Para loops de más de 4-5 residuos. Consulta también  [[Stepwise Monte Carlo|stepwise]].
-  [[Stepwise Monte Carlo|stepwise]]: Genera modelos 3D de loops, motivos e interfaces de proteínas, ARN y proteína/ARN. Versión estocástica del ensamblaje stepwise. 

###ARN y ARN/proteína <a name="RNA" />
-  [[Predicción de estructura de ARN|rna-denovo-setup]]: Predice estructuras tridimensionales de ARN a partir de su secuencia de nucleótidos. Lee esto primero. 
 *  [[RNA tools]]: Herramientas útiles para ARN y ARN/proteína, incluida la edición general de PDB, el envío a clústeres y la preparación de trabajos.
 *  [[Threading de ARN|rna-thread]]: Hace threading de una nueva secuencia de nucleótidos sobre una estructura de ARN existente.  
 *  [[Predicción de motivos de ARN|rna denovo]]: Modela motivos de ARN con ensamblaje de fragmentos de ARN y refinamiento de todos los átomos (FARFAR).
-  [[Enumeración stepwise de loops de ARN|swa-rna-loop]]: Construye loops de ARN con ensamblaje stepwise determinista. Consulta también  [[Stepwise Monte Carlo|stepwise]].
-  [[Stepwise Monte Carlo|stepwise]]: Genera modelos 3D de loops, motivos e interfaces de proteínas, ARN y proteína/ARN. Versión estocástica del ensamblaje stepwise. 
-  [[Ensamblaje de ARN con restricciones experimentales|rna-assembly]]: Predice estructuras tridimensionales de ARN grandes con ayuda de restricciones experimentales. Nota: en gran parte obsoleto por la nueva canalización (la documentación llegará pronto).
-  [[ERRASER]]: Refina una estructura de ARN a partir de restricciones de densidad electrónica.  
-  [[Sample around nucleobase]]: Visualización de funciones de energía mediante el barrido de moléculas sonda alrededor de una nucleobase.
-  [[RECCES]]: Cálculo de energía libre de ARN con muestreo exhaustivo.
-  [[RNA pharmacophore]]: Extrae y agrupa las características clave presentes en el ARN (anillos, donadores y aceptores de enlaces de hidrógeno) a partir de la estructura de un complejo proteína-ARN.

###Modelado de anticuerpos
- [[Antibody protocol]] (RosettaAntibody3): Descripción general del protocolo de modelado de anticuerpos.  
    * [[Antibody Python script]]: El script de preparación.  
    * [[Injerto de loops CDR|antibody-assemble-cdrs]]: Injerta plantillas de CDR de anticuerpos sobre la plantilla del marco para crear un modelo de anticuerpo aproximado.  
    * [[Modelado de CDR H3|antibody-model-CDR-H3]]: Determina estructuras de anticuerpos combinando docking VL-VH y modelado del loop H3.

###Modelado de TCR
- [[Protocolo TCRmodel|TCRmodel]]: Aplicación para modelar receptores de células T a partir de la secuencia.  

##Véase también

* [[Minirosetta]]: Más información sobre la aplicación MiniRosetta
* [[Rosetta Servers]]: Servidores que dan acceso a algunas aplicaciones de Rosetta
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
