La función de puntuación de Rosetta ha pasado por muchos cambios a lo largo de los años. Esta página documenta algunos de los hitos.

Puedes encontrar un tutorial introductorio sobre cómo puntuar biomoléculas con Rosetta [aquí](https://www.rosettacommons.org/demos/latest/tutorials/scoring/scoring).

¿Qué función de puntuación?
====================

Rosetta nunca ha dependido exclusivamente de una sola función de puntuación (salvo quizá en su encarnación más temprana).  Protocolos populares como [[relax]] y [[ab initio|abinitio relax]] usan distintas funciones de puntuación en diferentes momentos de su ejecución. Desde la llegada del [[diseño|fixbb]] en Rosetta, la mayoría de las aplicaciones se quedan con una sola función de puntuación.

Cronología de publicaciones
=====================
**Consulta también el [[Canon de Rosetta|Rosetta-canon#scoring]]**

* Rohl CA, Strauss CE, Misura KM, Baker D (2004) [Protein structure prediction using Rosetta.](http://www.ncbi.nlm.nih.gov/pubmed/15063647) (enlace a PubMed)  
Methods in Enzymology.  
Este artículo, a menudo llamado la **revisión de Rohl**, es una ventana a la función de puntuación temprana de Rosetta y sigue siendo una excelente referencia para las primeras formas de los términos de la función de puntuación. Puede ser un poco difícil de encontrar en línea, pero circulan fotocopias en papel por la mayoría de los laboratorios de Rosetta.

* Kuhlman B, Dantas G, Ireton GC, Varani G, Stoddard BL, Baker D (2003)  
[Design of a novel globular protein fold with atomic-level accuracy.] (http://www.ncbi.nlm.nih.gov/pubmed/14631033) (enlace a PubMed)  
Science 302:1364-8  
Este artículo, a menudo llamado el **artículo de Top7**, es principalmente un artículo de diseño (véase más abajo), pero es importante para la puntuación porque introduce términos de energía relacionados con la secuencia (energías de referencia, p_aa_pp, etc.) y es la referencia más cercana a «de dónde salió **score12**».
El material suplementario es el más relevante para la puntuación.

* Leaver-Fay A, O'Meara MJ, Tyka M, Jacak R, Song Y, Kellogg EH, Thompson J, Davis IW, Pache RA, Lyskov S, Gray JJ, Kortemme T, Richardson JS, Havranek JJ, Snoeyink J, Baker D, Kuhlman B (2013)  
[Scientific benchmarks for guiding macromolecular energy function improvement.] (http://www.ncbi.nlm.nih.gov/pubmed/23422428) (enlace a PubMed)  
Methods Enzymol 523:109-43  
Leaver-Fay et al. describen OptE, una metodología que usa benchmarks de recuperación de secuencias y de recuperación de rotámeros para mejorar los conjuntos de pesos de las funciones de puntuación.  Esto se usó en el siguiente artículo...

* O'Meara MJ, Leaver-Fay A, Tyka M, Stein A, Houlihan K, DiMaio F, Bradley P, Kortemme T, Baker D, Snoeyink J, Kuhlman B (2015)  
[A Combined Covalent-Electrostatic Model of Hydrogen Bonding Improves Structure Prediction with Rosetta.](http://www.ncbi.nlm.nih.gov/pubmed/25866491) (enlace a PubMed)  
J Chem Theory Comput. 2015;11(2):609-622. PubMed PMID: 25866491  
...para generar [[Talaris2013/4|score-types]], la función de energía de propósito general más avanzada de Rosetta en la actualidad.

* Park H, Bradley P, Greisen Jr. P, Liu Y, Mulligan VK, Kim DE, Baker D, DiMaio F (2016)
[Simultaneous Optimization of Biomolecular Energy Functions on Features from Small Molecules and Macromolecules.]
(https://www.ncbi.nlm.nih.gov/pubmed/27766851) (enlace a PubMed)
J Chem Theory Comput. 2016;12(12):6201–6212. PubMed PMID 27766851

* Alford RF, Leaver-Fay A, Jeliazko JR, O'Meara MJ, DiMaio FP, Park H, Shapovalov MV, Renfrew PD, Mulligan VM, Kappel K, Labonte JW, Pacella MS, Bonneau R, Bradley P, Dunbrack RL, Das R, Baker D, Kuhlman B, Kortemme T, Gray JJ (2017) [The Rosetta all-atom energy function for macromolecular modeling and design.](http://pubs.acs.org/doi/abs/10.1021/acs.jctc.7b00125)(enlace a ACS) J Chem Theory Comput. 2017;13(6):3031-3048

Cronología de las funciones de puntuación
=======================
*Rosetta2 / época anterior a score12 -- ????

* **Score12** fue el estándar de referencia desde el comienzo de la era de Rosetta3 hasta el lanzamiento de Talaris13.  Es sustancialmente similar a la función de puntuación tratada en el [[artículo de Top7|Glossary#top7-top7-paper]] mencionado arriba.  El 12 no tiene un significado particular: era la duodécima función de puntuación listada en la base de datos.

* **Score12_correct** se discutió ampliamente en varias ediciones seguidas de [[RosettaCON|Glossary#RosettaCON]] como un conjunto de términos para mejorar el rendimiento de Score12.  Nunca se adoptó en su totalidad.

* **Talaris13** fue el resultado de una reunión (celebrada en un hotel llamado Talaris) en la que la comunidad usó [[OptE|opt-e-parallel-doc]] y muchas pruebas nuevas de funciones de puntuación para intentar mejorar Score12.  Se denominó 13 tanto por ser sucesora de score12 como porque se desarrolló en 2013.

* **Talaris14** es una corrección de errores de Talaris13.  Uno de los pesos de los enlaces de hidrógeno era incorrecto.  Todos los pesos se reescalaron para ajustarse más al tamaño de la Unidad de Energía de Rosetta de score12; en última instancia las unidades son arbitrarias, pero se quería una mejor comparación con score12.  Se añadió el término YHH_planarity para ayudar a controlar el hidrógeno del alcohol en la tirosina.  Se desarrolló en 2014, pero no se puso en uso hasta 2016.

* **REF2015** se desarrolló como [[beta_nov15|Overview of Seattle Group energy function optimization project]] y se convirtió en la función de puntuación predeterminada en julio de 2017.  Beta_nov16 está en desarrollo a continuación de ella.

##Véase también

* [Tutorial de puntuación](https://www.rosettacommons.org/demos/latest/tutorials/scoring/scoring)
* [[Scoring explained]]
* [[Units in Rosetta]]: describe las unidades de energía de Rosetta
* [[Término de energía de enlaces de hidrógeno|hbonds]]
* [[Funciones de puntuación y términos de puntuación|score-types]]
* [[Términos de puntuación adicionales|score-types-additional]]
* [[Términos de guía para el diseño|design-guidance-terms]]
* [[Funciones de puntuación para residuos y moléculas no canónicos|NC-scorefunction-info]]
* [[Rosetta overview]]: descripción general de los conceptos principales de Rosetta
* [[Rosetta Canon]]: artículos fundamentales de Rosetta
* [[Rosetta Timeline]]: versiones de Rosetta y otros eventos

<!-- SEO
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
score function scorefunction
-->
