#Aplicaciones de utilidad

Estas aplicaciones sirven principalmente para apoyar a otras aplicaciones de Rosetta o para ayudar a preparar o analizar ejecuciones de Rosetta.

### General
- [[Build peptide]]: construye péptidos extendidos o estructuras de proteínas a partir de secuencias. 

- [[CA to allatom]]: construye modelos de todos los átomos a partir de trazados de solo carbonos alfa.  

- [[Cluster]]: agrupa estructuras por similitud estructural.

- [[constel]]: "constelaciones" de átomos para el rescate químico de estructuras.  

- [[Crear definición de simetría|make-symmdef-file-denovo]]: crea archivos de definición de simetría de Rosetta para un grupo puntual.  
    * [[Crear definición de simetría a partir de una estructura|make-symmdef-file]]: crea archivos de definición de simetría de Rosetta a partir de PDB de plantilla. 

- [[Fragment picker|app-fragment-picker]]: elige fragmentos para usarlos junto con otras aplicaciones de Rosetta que trabajan con fragmentos.  
    * [[Fragment picker antiguo|fragment-picking-old]]: la versión anterior del fragment picker.  
    * [[Fragment picker de conjuntos de estructuras|Structure-Set-Fragment-Picker]]: elige fragmentos de un conjunto definido de estructuras. 
- [[Loops from density]]: crea archivos de loops de Rosetta para las regiones de una proteína con mal ajuste local a la densidad electrónica.

- [[Crear exemplars|make-exemplar]]: crea un exemplar para bolsillos de superficie de una proteína que tocan un residuo objetivo.

- [[OptE|opt-e-parallel-doc]]: reajusta los pesos de referencia de una función de puntuación para optimizar métricas dadas.  

- [[Sugerencia de residuos objetivo para bolsillos|pocket-suggest-targets]]: sugiere el mejor par de residuos objetivo para la optimización de bolsillos con el fin de inhibir una interacción proteína-proteína.

- [[Servidor de PyMol|PyMol server]]: observa lo que hace un programa de Rosetta en ejecución usando PyMol.

- [[Sequence recovery]]: calcula las mutaciones y la recuperación de la secuencia nativa en ejecuciones de diseño de Rosetta.

- [[Pocket relax|pocket-relax]]: relax seguido de minimización de todos los átomos y puntuación sin PocketConstraint. Es útil al realizar la optimización de bolsillos.

###Aminoácidos no canónicos
* [[Crear biblioteca de rotámeros|make-rot-lib]]: genera bibliotecas de rotámeros para aminoácidos no canónicos.  
* [[Unfolded state energy calculator]]: determina la energía de referencia de los aminoácidos no canónicos en el estado desplegado.  

###Utilidades para anticuerpos
* [[Antibody Design Strategy Analysis]]: una herramienta basada en PyRosetta para analizar y/o comparar estrategias de diseño de anticuerpos.

* [[CDR Cluster Identification]]: una aplicación que empareja cada CDR de un anticuerpo con los clústeres de CDR de North/Dunbrack según la menor distancia diedra al centro de cada clúster.

* [[CDR Cluster Constrained Relax]]: una aplicación para relajar CDR usando restricciones armónicas circulares basadas en los clústeres de CDR identificados.

##Véase también

* [[Tools]]: herramientas basadas en Python para usar con Rosetta
* [[Rosetta Servers]]: servidores que dan acceso a algunas aplicaciones de Rosetta
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[RosettaScripts]]
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos usando Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar archivos ejecutables de Rosetta
