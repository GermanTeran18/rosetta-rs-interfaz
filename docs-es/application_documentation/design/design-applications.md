#Aplicaciones para el diseño de macromoléculas

##Diseño general de proteínas
* [[Diseño con cadena principal fija|fixbb]]: optimiza la colocación y la identidad de los rotámeros de las cadenas laterales sobre cadenas principales fijas.
* [[Diseño con cadena principal fija y hpatch|fixbb-with-hpatch]]: diseño con cadena principal fija con una penalización para los parches hidrofóbicos de superficie.
* [[Relax]]: si se le proporciona un resfile y la opción `-relax:respect_resfile`, la aplicación relax puede usarse para diseño. 
* [[Diseño multiestado|mpi-msd]]: optimiza proteínas para varios contextos deseados y no deseados.
* [[Anchored design]]: diseña interfaces usando un "ancla" de interacciones conocidas.  
    * [[Anchored pdb creator]]: prepara los archivos iniciales para AnchoredDesign.  
    * [[Anchor finder]]: encuentra interacciones que puedan servir de "anclas" para AnchoredDesign. 
- [[RosettaRemodel]]: rediseña la cadena principal y la secuencia de loops de proteínas y de elementos de estructura secundaria. 
    * [[Remodel]]: documentación adicional de remodel
-  [[Diseño stepwise|stepwise]]: optimiza simultáneamente la secuencia y la estructura de segmentos pequeños de ARN y de proteína. Forma parte de la aplicación stepwise.
-  [[SEWING]]: construye nuevas estructuras proteicas a partir de elementos grandes (p. ej., motivos hélice-loop-hélice) de proteínas nativas.

##Diseño de bibliotecas

* [[Sequence tolerance]]: optimiza proteínas para aplicaciones con bibliotecas (p. ej., presentación en fagos o en levaduras).  
* [[Servidor SwiftLib|http://rosettadesign.med.unc.edu/SwiftLib/]]: herramienta web para la optimización rápida de codones degenerados.

##Mejora de la estabilidad

* [[Escaneo de mutaciones puntuales|pmut-scan-parallel]]: identifica mutantes puntuales estabilizadores.  
* [[Supercharge]]: remodela proteínas para que tengan cargas netas altas en la superficie, con el fin de contrarrestar la agregación.
* [[Identificación y empaquetado de huecos|vip-app]] (RosettaVIP): identifica y rellena cavidades de una proteína.

##Estructura secundaria

* [[Diseño de sustitutos de enlaces de hidrógeno|hbs-design]]: diseña proteínas de unión estabilizadas con hélices alfa.
* [[Beta strand homodimer design]]: encuentra proteínas con hebras beta expuestas en la superficie y luego diseña un homodímero que se forme a través de esa hebra beta.  

##Diseño de interfaces proteína-proteína

* [[Diseño proteína-proteína|docking-protocol]]: diseño de interfaces proteína-proteína con RosettaScripts.
* [[Zinc heterodimer design]]: diseña heterodímeros mediados por zinc.  

##Enzimas

* [[Enzyme Design]]: diseña una proteína alrededor de una molécula pequeña, con restricciones catalíticas. 

##Péptidos

* [[Pepspec]]: evalúa y diseña interacciones péptido-proteína.

##Moléculas pequeñas

* [[Match]]: coloca una molécula pequeña en una cavidad de una proteína de modo que cumpla ciertas restricciones geométricas.  

* [[OOP design]]: diseña proteínas con residuos de oligooxopiperazina.  

* [[DougsDockDesignMinimize|doug-dock-design-min-mod2-cal-cal]]: rediseña la interfaz proteína/péptido de la calpaína y un fragmento de su péptido inhibidor, la calpastatina.

* [[theta ligand]]: calcula la fracción de ligando expuesta al solvente en un complejo proteína-ligando.

##ARN

* [[RNA design]]: optimiza la secuencia de ARN para cadenas principales fijas.  
*  [[Diseño stepwise|stepwise]]: optimiza simultáneamente la secuencia y la estructura de segmentos pequeños de ARN y de proteína. Forma parte de la aplicación stepwise.

##ADN

* [[Rosetta DNA]] (RosettaDNA): diseña y modela interacciones de proteínas con el ADN. 

##Véase también

##Véase también

* [[Servidor Rosetta Design (enlace externo)|http://rosettadesign.med.unc.edu/]]: servidor web para el diseño con cadena principal fija
* [[Rosetta Servers]]: servidores que dan acceso a algunas aplicaciones de Rosetta
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[RosettaScripts]]
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar los archivos ejecutables de Rosetta
