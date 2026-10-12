# IsoelectricPointMetric
*Volver a la página de [[SimpleMetrics]].*
## IsoelectricPointMetric

Autora: Sharon Guffy (sharonguffy@gmail.com)

IsoelectricPointMetric sirve para predecir el punto isoeléctrico de una proteína a partir de su secuencia, usando uno de varios algoritmos disponibles. Ten en cuenta que esta métrica no es compatible por ahora con aminoácidos no canónicos ni con moléculas que no son proteínas.
Algoritmos disponibles:

* IPC_protein
  * Cita: Lukasz P. Kozlowski. IPC – Isoelectric Point Calculator. Biol Direct. 2016; 11: 55.
  * Sitio web: [[http://isoelectric.org]]
  * Notas: Optimizado para proteínas. Los benchmarks indican que supera a la mayoría de los demás algoritmos, incluidos los disponibles mediante IsoelectricPointMetric.
* IPC_peptide
  * Cita: Lukasz P. Kozlowski. IPC – Isoelectric Point Calculator. Biol Direct. 2016; 11: 55.
  * Sitio web: [[http://isoelectric.org]]
  * Notas: Optimizado para péptidos pequeños.
* Nozaki_Tanford
  * Cita: Nozaki Y, Tanford C. The solubility of amino acids and two glycine peptides in aqueous ethanol and dioxane solutions: establishment of a hydrophobicity scale. J Biol Chem. 1971;246(7):2211–2217.
  * Notas: valores de pKa basados en el pKa de grupos de cadena lateral en compuestos modelo similares a los aminoácidos
* Patrickios
  * Cita: Patrickios CS, Yamasaki EN. Polypeptide amino acid composition and isoelectric point. II. Comparison between experiment and theory. Anal Biochem. 1995;231(1):82–91. doi: 10.1006/abio.1995.1506.
  * Notas: Modelo muy simplificado, calculado sobre péptidos pequeños. En general no se recomienda su uso con proteínas.
* Bjellqvist
  * Cita: B. Bjellqvist, G. J. Hughes, C. Pasquali, N. Paquet, F. Ravier, J. C. Sanchez, S. Frutiger, D. Hochstrasser, Electrophoresis 14 (1993) 1023–1031.
  * Sitio web: https://web.expasy.org/compute_pi/, entre otros
  * Notas: Uno de los conjuntos de valores de pKa más usados para calcular el pI.
* EMBOSS
  * Autor: Alan Bleasby (European Bioinformatics Institute, Wellcome Trust Genome Campus, Hinxton, Cambridge CB10 1SD, UK). 
  * Sitio web: [[http://www.bioinformatics.nl/cgi-bin/emboss/iep]]
  * Notas: Algoritmo usado por el programa EMBOSS. 
* ProMoST
  * Cita: Halligan BD1, Ruotti V, Jin W, Laffoon S, Twigger SN, Dratz EA. Nucleic Acids Res. 2004 Jul 1;32(Web Server issue):W638-44.
  * Sitio web: [[http://proteomics.mcw.edu/promost.html]]
  * Notas: Usa un algoritmo más complejo que tiene en cuenta la identidad de los residuos terminales tanto para los valores de pKa de los extremos como para los de las cadenas laterales. Se desarrolló para determinar los efectos de las modificaciones postraduccionales sobre el pI; ten en cuenta que IsoelectricPointMetric no reconoce por ahora estas modificaciones.


[[include:simple_metric_IsoelectricPointMetric_complex_type]]

##Véase también

* [[RunSimpleMetrics]]: Ejecuta un conjunto de SimpleMetrics y escribe los datos en el archivo de puntuaciones
* [[DihedralDistanceMetric]]: Calcula la distancia de ángulos diedros a partir de estadística direccional
* [[SimpleMetricFilter]]: Filtra según una SimpleMetric arbitraria
* [[SimpleMetricFeatures]]: Ejecuta [[Features | Features-reporter-overview]] sobre un conjunto de SimpleMetrics
* [[SimpleMetrics]]: SimpleMetrics disponibles
* [[Mover|Movers-RosettaScripts]]: Movers disponibles
* [[I want to do x]]: Guía para elegir un mover