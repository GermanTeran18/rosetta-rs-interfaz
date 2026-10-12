#Aplicaciones de RNA

Estas aplicaciones están diseñadas específicamente para trabajar con RNA o con complejos RNA-proteína. Para más información sobre cómo trabajar con RNA en Rosetta, consulta la página [[Trabajar con RNA|RNA]].


###Predicción de estructura de RNA

* [[Predicción de estructura 3D de RNA|rna-denovo-setup]]: Predice estructuras tridimensionales de RNA a partir de su secuencia de nucleótidos. Lee esto primero.
* [RiboKit](https://ribokit.github.io/workflows/3D_modeling/) Qué experimentos y análisis realizar para obtener modelos 3D de RNA.
* [[Predicción de motivos de RNA|rna-denovo]]: Modela motivos de RNA mediante ensamblaje de fragmentos de RNA con refinamiento de todos los átomos (FARFAR).
* [[Enumeración de loops de RNA con stepwise|swa-rna-loop]]: Construye loops de RNA mediante ensamblaje stepwise *determinista*.
* [[Stepwise Monte Carlo|stepwise]]: Versión estocástica del ensamblaje stepwise que se usa para generar modelos 3D de proteínas, RNA, y de loops, motivos e interfaces de proteína/RNA. Esta aplicación no es exclusiva para RNA, pero es compatible con él. 
*  [[Ensamblaje de RNA con restricciones experimentales|rna-assembly]] - Predice estructuras tridimensionales de RNA grandes con ayuda de restricciones experimentales. Nota: está en gran parte obsoleta frente a un flujo de trabajo más reciente (descrito en este [artículo](https://daslab.stanford.edu/site_data/pub_pdf/2015_Cheng_MethEnzym.pdf) y en esta [demo](https://www.rosettacommons.org/demos/latest/public/mohca_seq/README)).
* [[CS Rosetta RNA]]: Refina y puntúa una estructura de RNA usando datos de desplazamiento químico de RMN.  
* [[auto-DRRAFTER]]: Construye coordenadas de RNA dentro de mapas de crio-EM (por ahora, para mapas que no contienen proteínas).
* [[DRRAFTER]]: Construye coordenadas de RNA dentro de mapas de crio-EM de ensamblajes RNA-proteína.
* [[Predicción de estructura de complejos RNA-proteína|rnp-modeling]]: Predice estructuras 3D de complejos RNA-proteína.

###Diseño de RNA

* [[RNA design]]: Optimiza la secuencia de RNA para cadenas principales fijas.  

###Análisis de RNA

* [[RECCES]]: Cálculo de energía libre de RNA con muestreo exhaustivo.
* [[rnp ddg]]: Calcula afinidades de unión relativas de complejos RNA-proteína con el método ΔΔG de Rosetta-Vienna.

###Utilidades de RNA

* [[RNA tools]]: Un conjunto de herramientas para editar PDB, enviar trabajos a un clúster, procesar "silent files" y preparar trabajos de rna_denovo y ERRASER.
* [[ERRASER]]: Refina una estructura de RNA a partir de restricciones de densidad electrónica.  
* [[RNA pharmacophore]]: Extrae y agrupa las características clave presentes en el RNA (anillos, donadores y aceptores de enlaces de hidrógeno) a partir de la estructura de un complejo proteína-RNA.
* [[Threading de RNA|rna-thread]] - Hace threading de una nueva secuencia de nucleótidos sobre una estructura de RNA existente.  
* [[Sample around nucleobase]]: Genera tablas de energías de interacción entre una nucleobase de adenosina y una sonda especificada por el usuario.
* [[RNA score]]: una aplicación de puntuación sencilla con enlaces a los flujos de trabajo de RNA preferidos. No es intrínsecamente superior a `score_jd2`, pero suele ser más cómoda.
* [[RNA chemical modifications]]: explicación de cómo modelar RNA con nucleótidos modificados químicamente.

##Véase también
* [RiboKit](https://ribokit.github.io) Flujos de trabajo generales para modelado y análisis de RNA
* [[Application Documentation]]: Página de inicio de la documentación de aplicaciones
* [[RNA]]: Guía para trabajar con RNA en Rosetta
* [[Structure Prediction Applications]]: Lista de aplicaciones de predicción de estructura
* [[Design Applications]]: Lista de aplicaciones de diseño
* [[Analysis Applications]]: Lista de aplicaciones de análisis
* [[Utilities Applications]]: Lista de aplicaciones de utilidades
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
