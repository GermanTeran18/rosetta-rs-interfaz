#El canon de Rosetta

_En el principio Rosetta fue creado a partir del Centroid y el Fragment._  
_Y el Pose Fullatom estaba sin Conformación, y Nulo; y las tinieblas_ cubrían _la superficie de energía potencial. Y los Estudiantes de Baker se movían sobre la faz de la estructura de las proteínas._  
_Y dijo Rosetta: Hágase el criterio de Metropolis: y hubo convergencia._  
_Y vio Rosetta el embudo de plegamiento, y vio que era bueno._ 
_Y así los Estudiantes de Baker separaron los modelos de los decoys._  

Rosetta tiene una historia académica relativamente larga, y hay un conjunto sustancial de artículos que son fundamentales tanto para el contenido de la base de código como para los logros de sus usuarios.
Hemos destilado estas referencias en un canon básico: los artículos que damos por hecho que todos hemos leído, los artículos que desearíamos haber leído, los artículos que deberíamos haber leído y, en los casos afortunados, los artículos que hemos leído.

Están organizados por campo, según el orden en que Rosetta entró en cada campo, y en orden cronológico dentro de cada grupo.

[[_TOC_]]

Predicción de la estructura de proteínas
-----------------
* Simons K, Kooperberg C, Huang E, Baker D (1997)  
[Assembly of Protein Tertiary Structures from Fragments with Similar Local Sequences using Simulated Annealing and Bayesian Scoring Functions.] (http://www.ncbi.nlm.nih.gov/pubmed/9149153) (enlace a PubMed)  
J. Mol. Biol. 268:209-225  
Simons et al. describen el método de combinar el recocido simulado con bibliotecas de fragmentos para generar estructuras similares a las nativas.

* Simons K, Ruczinski I, Kooperberg C, Fox B, Bystroff C, Baker D (1999)  
[Improved Recognition of Native-Like Protein Structures Using a Combination of Sequence-Dependent and Sequence-Independent Features of Proteins.] (http://www.ncbi.nlm.nih.gov/pubmed/) (enlace a PubMed)  
Proteins 34:82-95  
Simons et al. describen el desarrollo de una función de puntuación mejorada que contiene términos de empaquetado de estructura secundaria.

* Simons KT, Bonneau R, Ruczinski I, Baker D (1999)  
[Ab initio protein structure prediction of CASP III targets using ROSETTA.] (http://www.ncbi.nlm.nih.gov/pubmed/10526365) (enlace a PubMed)  
Proteins Suppl 3:171-6  
El primer uso del algoritmo de Rosetta que predijo con éxito estructuras de proteínas ab initio con un RMSD de hasta 6.4, 6.0 y 3.8Å.

* Raveh B, London N, Schueler-Furman O (2010)  
[Sub-angstrom modeling of complexes between flexible peptides and globular proteins.] (http://www.ncbi.nlm.nih.gov/pubmed/20455260) (enlace a PubMed)  
Proteins 78:2029-40  
Raveh et al. describen algoritmos para predecir el estado unido de péptidos flexibles en bolsillos de proteínas.

* DiMaio F, Leaver-Fay A, Bradley P, Baker D, Andre I (2011)  
[Modeling symmetric macromolecular structures in Rosetta3.] (http://www.ncbi.nlm.nih.gov/pubmed/21731614) (enlace a PubMed)  
PLoS One 6:e20450  
DiMaio et al. describen un marco de trabajo para modelar de manera eficiente oligómeros muy simétricos usando un único monómero, la interfaz entre monómeros y las relaciones matemáticas entre las subunidades.


Puntuación
--------------

**Véase también [[Scorefunction History#publications timeline]]**

* Rohl CA, Strauss CE, Misura KM, Baker D (2004) [Protein structure prediction using Rosetta.](http://www.ncbi.nlm.nih.gov/pubmed/15063647) (enlace a PubMed)  
Methods in Enzymology.  
Este artículo, a menudo llamado la **revisión de Rohl**, es una ventana a la función de puntuación temprana de Rosetta y sigue siendo una excelente referencia sobre las primeras formas de los términos de la función de puntuación. Puede ser algo difícil de encontrar en línea, pero circulan fotocopias en papel por la mayoría de los laboratorios de Rosetta.

* Kuhlman B, Dantas G, Ireton GC, Varani G, Stoddard BL, Baker D (2003)  
[Design of a novel globular protein fold with atomic-level accuracy.] (http://www.ncbi.nlm.nih.gov/pubmed/14631033) (enlace a PubMed)  
Science 302:1364-8  
Este artículo, a menudo llamado el **artículo de Top7**, es principalmente un artículo de diseño (véase más abajo), pero es importante para la puntuación porque introduce términos de energía relacionados con la secuencia (energías de referencia, p_aa_pp, etc.).
El material suplementario es el más relevante para la puntuación.

* Leaver-Fay A, O'Meara MJ, Tyka M, Jacak R, Song Y, Kellogg EH, Thompson J, Davis IW, Pache RA, Lyskov S, Gray JJ, Kortemme T, Richardson JS, Havranek JJ, Snoeyink J, Baker D, Kuhlman B (2013)  
[Scientific benchmarks for guiding macromolecular energy function improvement.] (http://www.ncbi.nlm.nih.gov/pubmed/23422428) (enlace a PubMed)  
Methods Enzymol 523:109-43  
Leaver-Fay et al. describen OptE, una metodología que usa benchmarks de recuperación de secuencia y de recuperación de rotámeros para mejorar los conjuntos de pesos de las funciones de puntuación.  Esto se usó en un [artículo aparte](http://www.ncbi.nlm.nih.gov/pubmed/25866491) para generar [[Talaris2013/4|score-types]], la función de energía de Rosetta de propósito general más avanzada actualmente.

* REF2015: Park H, Bradley P, Greisen Jr. P, Liu Y, Mulligan VK, Kim DE, Baker D, DiMaio F (2016)
[Simultaneous Optimization of Biomolecular Energy Functions on Features from Small Molecules and Macromolecules.]
(https://www.ncbi.nlm.nih.gov/pubmed/27766851) (enlace a PubMed)
J Chem Theory Comput. 2016;12(12):6201–6212. PubMed PMID 27766851

* Revisión: Alford RF, Leaver-Fay A, Jeliazko JR, O'Meara MJ, DiMaio FP, Park H, Shapovalov MV, Renfrew PD, Mulligan VM, Kappel K, Labonte JW, Pacella MS, Bonneau R, Bradley P, Dunbrack RL, Das R, Baker D, Kuhlman B, Kortemme T, Gray JJ (2017) [The Rosetta all-atom energy function for macromolecular modeling and design.](http://pubs.acs.org/doi/abs/10.1021/acs.jctc.7b00125)(enlace a ACS) J Chem Theory Comput. 2017;13(6):3031-3048


Docking
--------------
* Gray JJ, Moughon S, Wang C, Schueler-Furman O, Kuhlman B, Rohl CA, Baker D (2003)  
[Protein-protein docking with simultaneous optimization of rigid-body displacement and side-chain conformations.] (http://www.ncbi.nlm.nih.gov/pubmed/12875852) (enlace a PubMed)  
J Mol Biol 331:281-99  
Gray et al. realizan el primer esfuerzo en Rosetta por acoplar el docking de cuerpo rígido con la optimización de cadenas laterales; con ello, obtienen con frecuencia embudos de unión que normalmente reproducen al menos el 25 % de los contactos de unión.

* Chaudhury S, Gray JJ (2008)  
[Conformer selection and induced fit in flexible backbone protein-protein docking using computational and NMR ensembles.] (http://www.ncbi.nlm.nih.gov/pubmed/18640688) (enlace a PubMed)  
J Mol Biol 381:1068-87  
Chaudhury y Gray presentan algoritmos que reproducen tanto la formación tradicional de complejos de llave y cerradura (docking de cuerpo rígido) como modelos más sofisticados (selección de conformeros mediante EnsembleDock; ajuste inducido mediante minimización de la cadena principal en el socio más pequeño del complejo; una combinación de ambos) y validan el protocolo EnsembleDocking demostrando que existen conformeros aptos para el docking en el conjunto no unido.

* Sircar A, Chaudhury S, Kilambi KP, Berrondo M, Gray JJ (2010)  
[A generalized approach to sampling backbone conformations with RosettaDock for CAPRI rounds 13-19.] (http://www.ncbi.nlm.nih.gov/pubmed/20535822) (enlace a PubMed)  
Proteins 78:3115-23  
Sircar et al. describen su uso de los algoritmos EnsembleDock y SnugDock para generar mejores modelos de docking para la competición CAPRI.

Diseño
--------------
* Kuhlman B, Dantas G, Ireton GC, Varani G, Stoddard BL, Baker D (2003)  
[Design of a novel globular protein fold with atomic-level accuracy.] (http://www.ncbi.nlm.nih.gov/pubmed/14631033) (enlace a PubMed)  
Science 302:1364-8  
Kuhlman et al. demuestran el diseño computacional de una proteína con un pliegue completamente nuevo.
La importancia de este resultado radica en que los esfuerzos de diseño previos consistían en estabilizar o modificar pliegues existentes y conocidos; la capacidad de crear una proteína _de novo_ era totalmente original.

* Guntas G, Purbeck C, Kuhlman B (2010)  
[Engineering a protein-protein interface using a computationally designed library.] (http://www.ncbi.nlm.nih.gov/pubmed/20974935) (enlace a PubMed)  
Proc Natl Acad Sci U S A 107:19296-301  
Se usó el diseño computacional en veinte posiciones de aminoácidos para dirigir parcialmente dos bibliotecas de proteínas, que superaron con creces a la biblioteca de control en la que se permitían todos los residuos: las primeras produjeron múltiples proteínas de unión en el rango nanomolar medio, mientras que la segunda no pudo producir proteínas de unión por debajo de cincuenta micromolar tras cuatro rondas de selección.

Análisis mutacional
-------------------
* Kortemme T, Kim DE, Baker D (2004)  
[Computational alanine scanning of protein-protein interfaces.] (http://www.ncbi.nlm.nih.gov/pubmed/14872095) (enlace a PubMed)  
Sci STKE 2004:pl2  
Kortemme et al. presentan un algoritmo de barrido de alanina para interfaces proteína-proteína que predice correctamente el 79 % de los residuos de puntos calientes (hot spots).

* Kellogg EH, Leaver-Fay A, Baker D (2011)  
[Role of conformational sampling in computing mutation-induced changes in protein structure and stability.] (http://www.ncbi.nlm.nih.gov/pubmed/21287615) (enlace a PubMed)  
Proteins 79:830-8  
Kellogg et al. exploran métodos para calcular el cambio de estabilidad correspondiente a una mutación puntual en una proteína con distintos muestreos conformacionales y elecciones de función de puntuación.

Docking de ligandos
--------------
* Meiler J, Baker D (2006)  
[ROSETTALIGAND: protein-small molecule docking with full side-chain flexibility.] (http://www.ncbi.nlm.nih.gov/pubmed/16972285) (enlace a PubMed)  
Proteins 65:538-48  
La incorporación original de moléculas de ligando a Rosetta, debida a Meiler y Baker, permitió la optimización de rotámeros en el socio proteico y obtiene una correlación de 0.63 entre la energía de interacción y la energía de unión experimental.

* Davis IW, Baker D (2009)  
[RosettaLigand docking with full ligand and receptor flexibility.](http://www.ncbi.nlm.nih.gov/pubmed/19041878) (enlace a PubMed)  
J Mol Biol 385:381-92  
Davis y Baker incorporan la flexibilidad del receptor mediante la minimización de la cadena principal y obtienen orientaciones correctas del ligando en cross-docking dentro de 2A de RMSD en el 64 % de los casos.

* Lemmon G, Meiler J. (2012)
[Rosetta Ligand docking with flexible XML protocols.](http://www.ncbi.nlm.nih.gov/pubmed/22183535) (enlace a PubMed)  
Methods Mol Biol. 2012;819:143-55  
La lógica de RosettaLigand pasó a XML.

Modelado de loops
--------------
* Wang C, Bradley P, Baker D (2007)
[Protein-protein docking with backbone flexibility.](http://www.ncbi.nlm.nih.gov/pubmed/17825317) (enlace a PubMed)  
Mol Biol. 2007 Oct 19;373(2):503-19.  
El título es algo engañoso.
Este artículo es valioso por introducir en Rosetta el [[FoldTree|foldtree-overview]] y el cierre de loops por [[CCD|loopmodel-ccd]] (descenso cíclico de coordenadas).

* Mandell DJ, Coutsias EA, Kortemme T (2009)  
[Sub-angstrom accuracy in protein loop reconstruction by robotics-inspired conformational sampling.] (http://www.ncbi.nlm.nih.gov/pubmed/19644455) (enlace a PubMed)  
Nat Methods 6:551-2  
Mandell et al. describen el algoritmo de cierre cinemático de loops para remodelar la geometría de los loops de proteínas.

ARN
--------------
* Das R, Baker D (2007)  
[Automated de novo prediction of native-like RNA tertiary structures.] (http://www.ncbi.nlm.nih.gov/pubmed/17726102) (enlace a PubMed)  
Proc Natl Acad Sci U S A 104:14664-9  
Das y Baker describen la predicción exitosa de estructuras de ARN a partir de datos de secuencia.
Reproducen el 90 % de los pares de bases Watson-Crick y más de un tercio de las características no canónicas.

* Sripakdeevong P, Kladwang W, Das R (2011)  
[An enumerative stepwise ansatz enables atomic-accuracy RNA loop modeling.] (http://www.ncbi.nlm.nih.gov/pubmed/22143768) (enlace a PubMed)  
Proc Natl Acad Sci U S A 108:20573-8  
Sripakdevong et al. presentan un ansatz mediante el cual enumeran y puntúan conformaciones de loops de ARN, lo que permite resolver "puzzles de ARN" hasta entonces intratables.

Diseño de enzimas
--------------
* Jiang L, Althoff EA, Clemente FR, Doyle L, Röthlisberger D, Zanghellini A, Gallaher JL, Betker JL, Tanaka F, Barbas CF 3rd, Hilvert D, Houk KN, Stoddard BL, Baker D (2008)
[De novo computational design of retro-aldol enzymes.] (http://www.ncbi.nlm.nih.gov/pubmed/18323453) (enlace a PubMed)  
Science 319:1387-91

* Siegel JB, Zanghellini A, Lovick HM, Kiss G, Lambert AR, St Clair JL, Gallaher JL, Hilvert D, Gelb MH, Stoddard BL, Houk KN, Michael FE, Baker D (2010)  
[Computational design of an enzyme catalyst for a stereoselective bimolecular Diels-Alder reaction.] (http://www.ncbi.nlm.nih.gov/pubmed/20647463) (enlace a PubMed)  
Science 329:309-13  
Siegel et al. diseñan una Diels-Alderasa estereoselectiva y quimioselectiva, obtienen su estructura cristalina e ilustran que las mutaciones en el supuesto sitio de unión pueden ajustar su especificidad de sustrato. 

Desarrollo de Rosetta
-------------
* Leaver-Fay A, Tyka M, Lewis SM, Lange OF, Thompson J, Jacak R, Kaufman K, Renfrew PD, Smith CA, Sheffler W, Davis IW, Cooper S, Treuille A, Mandell DJ, Richter F, Ban YE, Fleishman SJ, Corn JE, Kim DE, Lyskov S, Berrondo M, Mentzer S, Popović Z, Havranek JJ, Karanicolas J, Das R, Meiler J, Kortemme T, Gray JJ, Kuhlman B, Baker D, Bradley P (2011)  
[ROSETTA3: an object-oriented software suite for the simulation and design of macromolecules.] (http://www.ncbi.nlm.nih.gov/pubmed/21187238) (enlace a PubMed)  
Methods Enzymol 487:545-74  
Este es el **artículo de Rosetta3**, que describe la transición de Rosetta++, en C++ pero monolítico, a Rosetta3, en C++ [orientado a objetos](https://en.wikipedia.org/wiki/Object-oriented_programming). Introduce muchas de las principales clases modernas.

* Cooper S, Khatib F, Treuille A, Barbero J, Lee J, Beenen M, Leaver-Fay A, Baker D, Popović Z, Players F (2010)  
[Predicting protein structures with a multiplayer online game.] (http://www.ncbi.nlm.nih.gov/pubmed/20686574) (enlace a PubMed)  
Nature 466:756-60  
El desarrollo del juego [[FoldIt]] por parte de Cooper et al. mostró que la intuición humana altamente paralela es una herramienta útil para, en fin, plegarlo (las proteínas).

* Chaudhury S, Lyskov S, Gray JJ (2010)  
[PyRosetta: a script-based interface for implementing molecular modeling algorithms using Rosetta.](http://www.ncbi.nlm.nih.gov/pubmed/20061306) (enlace a PubMed)  
Bioinformatics 26:689-91  
Chaudhury et al. desarrollaron una interfaz de scripting basada en Python para las funcionalidades de Rosetta ([[PyRosetta]]), que permite a los usuarios componer protocolos fácilmente sin interactuar con la capa de C++.

* Sarel J. Fleishman , Andrew Leaver-Fay, Jacob E. Corn, Eva-Maria Strauch, Sagar D. Khare, Nobuyasu Koga, Justin Ashworth, Paul Murphy, Florian Richter, Gordon Lemmon, Jens Meiler, David Baker (2011)  
[[RosettaScripts: A Scripting Language Interface to the Rosetta Macromolecular Modeling Suite|http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0020161]] (enlace a PubMed)  
PLoS ONE 6(6): e20161  
Fleishman et al. desarrollan una interfaz de tipo XML para acceder directamente a las funcionalidades a nivel de protocolo (y por ello requiere una versión compilada de Rosetta en C++).
[[RosettaScripts]] permite al usuario evitar programar en C++, lo que a su vez permite el desarrollo rápido de nuevos protocolos.

Peptidomiméticos
---------------
* Drew K, Renfrew PD, Craven TW, Butterfoss GL, Chou FC, Lyskov S, Bullock BN, Watkins A, Labonte JW, Pacella M, Kilambi KP, Leaver-Fay A, Kuhlman B, Gray JJ, Bradley P, Kirshenbaum K, Arora PS, Das R, Bonneau R (2013)  
[Adding diverse noncanonical backbones to rosetta: enabling peptidomimetic design.] (http://www.ncbi.nlm.nih.gov/pubmed/23869206) (enlace a PubMed)  
PLoS One 8:e67051  
Drew et al. crean modos personalizados de muestreo de la cadena principal para incorporar andamios peptidomiméticos a Rosetta, lo que permite diseñar foldámeros no naturales derivados de aminoácidos.

* Renfrew PD, Craven TW, Butterfoss GL, Kirshenbaum K, Bonneau R (2014)  
[A rotamer library to enable modeling and design of peptoid foldamers.] (http://www.ncbi.nlm.nih.gov/pubmed/24823488) (enlace a PubMed)  
J Am Chem Soc 136:8772-82  
Renfrew et al. demuestran que los residuos de peptoides (glicinas N-alquiladas o N-ariladas) tienen conformaciones de cadena lateral que encajan limpiamente en bins de rotámeros, igual que los péptidos, y presentan dos métodos para construir bibliotecas de rotámeros que los modelen.

##Véase también

* [[Rosetta overview]]: visión general de los conceptos principales de Rosetta
* [[FAQ]]: preguntas frecuentes
* [[Glossary]]: definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de términos de Rosetta
* [[Rosetta Timeline]]: versiones de Rosetta y otros hitos
* [[Scorefunction History]]: una historia de la función de puntuación de Rosetta

<!--- Este comentario es una optimización para motores de búsqueda (grep))
canon
canon
canon
canon
canon
canon
canon
canon
canon
canon
canon
canon
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
papers
--->
