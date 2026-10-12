#Abinitio Relax

Metadatos
========

Autor: David E Kim
Este documento se actualizó por última vez en octubre de 2014, por Jared Adolf-Bryfogle. El investigador principal es David Baker (dabaker@uw.edu) . La aplicación AbinitioRelax fue desarrollada por numerosos miembros de Rosetta Commons, principalmente:

-   Kim Simons
-   Richard Bonneau
-   Kira Misura
-   Phil Bradley
-   Oliver Lange
-   Michael Tyka
-   Robert Vernon

Un tutorial introductorio de _ab initio_ se puede encontrar [aquí](https://www.rosettacommons.org/demos/latest/tutorials/denovo_structure_prediction/Denovo_structure_prediction).

[[_TOC_]]

Código y demo
=============

El ejecutable ab initio está en `       main/source/src/apps/public/AbinitioRelax.cc      ` . El código fuente del protocolo ab initio está en `       main/source/src/protocols/abinitio/AbrelaxApplication.cc      ` . Consulta el directorio `       demos/abinitio      ` para ver un ejemplo de ejecución ab initio que incluye archivos de entrada, archivos de salida esperados y un registro de ejecución de ejemplo. El comando de ejemplo está en `       demos/abinitio/readme.txt      ` . Los archivos de entrada están en `       demos/abinitio/input_files      ` . Los archivos de salida esperados están en `       demos/abinitio/output_files      ` . Un registro de ejecución de ejemplo está en `       demos/abinitio/log      ` .

Referencias
==========

-   Srivatsan Raman, Robert Vernon, James Thompson, Michael Tyka, Ruslan Sadreyev,Jimin Pei, David Kim, Elizabeth Kellogg, Frank DiMaio, Oliver Lange, Lisa Kinch, Will Sheffler, Bong-Hyun Kim, Rhiju Das, Nick V. Grishin, and David Baker. (2009) [Structure prediction for CASP8 with all-atom refinement using Rosetta.](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3688471/) *Proteins* 77 Suppl 9:89-99.
-   Bradley P, Misura KM, Baker D (2005). [Toward high-resolution de novo structure prediction for small proteins.](https://www.sciencemag.org/content/309/5742/1868.full) *Science* 309, 1868-71.
-   Bonneau R, Strauss CE, Rohl CA, Chivian D, Bradley P, Malmstrom L, Robertson T, Baker D. (2002) [De novo prediction of three-dimensional structures for major protein families.](http://www.sciencedirect.com/science/article/pii/S0022283602006988) *J Mol Biol* 322(1):65-78.
-   Bonneau R, Tsai J, Ruczinski I, Chivian D, Rohl C, Strauss CE, Baker D. (2001) [Rosetta in CASP4: progress in ab initio protein structure prediction.](http://onlinelibrary.wiley.com/doi/10.1002/prot.1170/full) *Proteins* Suppl 5:119-26.
-   Simons KT, Ruczinski I, Kooperberg C, Fox B, Bystroff C, Baker D. (1999) [Improved recognition of native-like protein structures using a combination of sequence-dependent and sequence-independent features of proteins.](http://onlinelibrary.wiley.com/doi/10.1002/(SICI)1097-0134(19990101)34:1%3C82::AID-PROT7%3E3.0.CO;2-A/full) *Proteins* 34(1) 82-95.
-   Simons KT, Kooperberg C, Huang E, Baker, D. (1997) [Assembly of protein tertiary structures from fragments with similar local sequences using simulate anealing and Bayesian scoring functions.](http://www.sciencedirect.com/science/article/pii/S0022283697909591) *J Mol Biol* 268:209-25.

Propósito de la aplicación
===========================================

Esta aplicación se desarrolló para predecir la estructura tridimensional de una proteína a partir de su secuencia de aminoácidos.

Algoritmo
=========

La aplicación AbinitioRelax consta de dos pasos principales. El primero es una búsqueda de grano grueso, basada en fragmentos, a través del espacio conformacional, usando una función de puntuación "centroide" basada en conocimiento que favorece características propias de las proteínas (Abinitio). El segundo paso, opcional, es un refinamiento de todos los átomos con el campo de fuerza de todos los átomos de Rosetta (Relax). El paso "Relax" requiere considerablemente más cómputo y tiempo que el primero. La ejecución de ejemplo descrita arriba, en la sección [Código y demo](#Code-and-Demo), tarda alrededor de 8 minutos en generar un modelo de una proteína de 117 residuos en un computador moderno. Una sola ejecución de AbinitioRelax puede generar un número de modelos definido por el usuario mediante una opción de línea de comando (consulta la sección [Opciones](#Options) más abajo). Para aumentar el muestreo conformacional, esta aplicación se paraleliza fácilmente ejecutando numerosos trabajos, cada uno con una semilla de números aleatorios única (consulta la sección [Opciones](#Options) más abajo). Normalmente esto se hace enviando varios trabajos a un clúster de computación o a una red distribuida. Como la función de energía de todos los átomos es muy sensible a interacciones atómicas imperfectas y habrá más ruido con un muestreo insuficiente, la convergencia hacia la estructura nativa puede requerir una cantidad considerable de muestreo. Además, para aumentar la probabilidad de muestrear la topología correcta, también se puede ejecutar un conjunto diverso de secuencias homólogas, preferiblemente con cambios de secuencia que puedan tener un mayor impacto en el muestreo, como deleciones y diferencias en posiciones conservadas, ya que un homólogo puede converger hacia la estructura nativa con un muestreo bastante menor (consulta la referencia de Bradley *et al*).

Archivos de entrada
===========

-   Archivo fasta. Contiene la secuencia de aminoácidos de la proteína en formato fasta. Ejemplo: `        rosetta_demos/abinitio/input_files/1elwA.fasta       ` .

-   Archivos de fragmentos. Genera bibliotecas de fragmentos estructurales con el servidor web disponible públicamente ( <http://old.robetta.org/> ) o con una instalación local del paquete rosetta\_fragments. Ejemplo: `        rosetta_demos/abinitio/input_files/aa1elwA03_05.200_v1_3       ` y `        rosetta_demos/abinitio/input_files/aa1elwA09_05.200_v1_3       ` .

-   Estructura nativa (opcional). La estructura PDB nativa puede usarse para benchmarking. Cuando se usa, se calcula el RMSD respecto de la nativa para cada modelo y se da como una columna adicional en la línea de puntuación. Ejemplo: `        rosetta_demos/abinitio/input_files/1elw.pdb       `

-   Archivo psipred\_ss2 de predicción de estructura secundaria de Psipred (opcional). El archivo de predicción de estructura secundaria de Psipred es necesario cuando se usan las opciones -use\_filters y -kill\_hairpins (véase más abajo). Nota: el servidor web de fragmentos ejecuta Psipred y proporciona el archivo de salida psipred\_ss2. Ejemplo: `        rosetta_demos/abinitio/input_files/1elwA.psipred_ss2. `
Ten en cuenta que el formato de archivo de estas opciones cambió entre Rosetta3.4 y 3.5 (la demo también está desactualizada).  Consulta [esta](https://forum.rosettacommons.org/content/killhairpin-error) publicación para más información.

Opciones <a name="Options" />
=======

AbinitioRelax
-------------

Puedes ejecutar la aplicación AbinitioRelax con las siguientes opciones (para enumerar todos los comandos relevantes, ejecuta con la opción -help):

```
../../bin/AbinitioRelax.linuxgccrelease
-in:file:native ./input_files/1elw.pdb              Native structure (optional)
(or -in:file:fasta ./input_files/1elwA.fasta)       Protein sequence in fasta format (required if native structure is not provided)
-in:file:frag3 ./input_files/aa1elwA03_05.200_v1_3  3-residue fragments (fragments file)
-in:file:frag9 ./input_files/aa1elwA09_05.200_v1_3  9-residue fragments (fragments file)
-database path/to/rosetta/main/database             Path to rosetta database
-abinitio:relax                                     Do a relax after abinitio ("abrelax" protocol), default=false.

-nstruct 1                                          Number of output structures
-out:file:silent 1elwA_silent.out                   Use silent file output, use filename after this flag, default=default.out
(or -out:pdb)                                       Use PDB file output, default=false
-out:path /my/path                                  Path where PDB output files will be written to, default '.'
```

Hay varios ajustes opcionales que se han probado y evaluado a fondo para lograr un rendimiento óptimo (recomendamos usar estas opciones):

```
-use_filters true                               Use radius of gyration (RG), contact-order, and sheet filters. This option conserves computing
                                                by not continuing with refinement if a filter fails. A caveat is that for some sequences, a large
                                                percentage of models may fail a filter. The filters are meant to identify models with non-protein
                                                like features. The names of models that fail filters start with F_.
-psipred_ss2 ./input_files/1elwA.psipred_ss2    psipred_ss2 secondary structure definition file (required for -use_filters)
-abinitio::increase_cycles 10                   Increase the number of cycles at each stage in ab initio by this factor.
-abinitio::rg_reweight 0.5                      Reweight contribution of radius of gyration to total score by this scale factor.
-abinitio::rsd_wt_helix 0.5                     Reweight env,pair,cb for helix residues by this factor.
-abinitio::rsd_wt_loop 0.5                      Reweight env,pair,cb for loop residues by this factor.
-relax::fast                                    Do a fastrelax which is significantly faster than the traditional relax protocol without a significant
                                                performance hit.
-kill_hairpins ./input_files/1elwA.psipred_ss2  Setup hairpin killing in score (kill hairpin file or psipred file). This option is useful for all-beta
                                                or alpha-beta proteins with predicted strands adjacent in sequence since hairpins are often sampled too
                                                frequently.  Note that the file format has changed from 3.4 to 3.5.  See Input Files section.
```

Para ejecutar varios trabajos en un clúster son útiles las siguientes opciones:

```
-constant_seed                                  Use a constant seed (1111111 unless specified with -jran)
-jran 1234567                                   Specify seed. Should be unique among jobs (requires -constant_seed)

-seed_offset 10                                 This value will be added to the random number seed. Useful when using time as seed and submitting many
                                                jobs to a cluster.  If jobs are started in the same second they will still have different initial seeds
                                                when using a unique offset. If using Condor (http://www.cs.wisc.edu/condor), the Condor process id,
                                                $(Process), can be used for this. For example "-seed_offset $(Process)" can be used in the condor submit file.
```

La línea de comando estándar para un rendimiento óptimo se muestra a continuación (nstruct debe establecerse según cuántos modelos quieras generar):

```
../../bin/AbinitioRelax.linuxgccrelease \
        -database /path/to/rosetta/main/database \
        -in:file:fasta ./input_files/1elwA.fasta \
        -in:file:native ./input_files/1elw.pdb \
        -in:file:frag3 ./input_files/aa1elwA03_05.200_v1_3 \
        -in:file:frag9 ./input_files/aa1elwA09_05.200_v1_3 \
        -abinitio:relax \
        -relax:fast \
        -abinitio::increase_cycles 10 \
        -abinitio::rg_reweight 0.5 \
        -abinitio::rsd_wt_helix 0.5 \
        -abinitio::rsd_wt_loop 0.5 \
        -use_filters true \
        -psipred_ss2 ./input_files/1elwA.psipred_ss2 \
        -kill_hairpins ./input_files/1elwA.psipred_ss2 \
    -out:file:silent 1elwA_silent.out \
        -nstruct 10
```

Uso con la red neuronal trRosetta
-------------------------------------

La red neuronal trRosetta (Yang _et al_. (2020) _Proc Natl Acad Sci USA_ 117(3):1496-1503 (doi 10.1073/pnas.1914677117)) predice distancias y orientaciones entre residuos a partir de un alineamiento múltiple de secuencias de entrada.  Esto es útil para guiar la predicción de estructura.  La aplicación AbinitioRelax puede añadir automáticamente restricciones generadas por trRosetta.  Para activarlo, añade las opciones:

```
-use_trRosetta_constraints
-trRosetta:msa_file <filename>
```

El archivo de alineamiento múltiple de secuencias (MSA) que se da con la opción `-trRosetta:msa_file` debe estar en formato .a3m y puede generarse con HHBlits u otro programa; consulta el [[mover trRosettaProtocol|trRosettaProtocol]] para ver un ejemplo.

Esta funcionalidad requiere que Rosetta se haya compilado con la opción `extras=tensorflow` o `extras=tensorflow_gpu` y se haya enlazado con las bibliotecas de la API de C de Tensorflow. Los detalles para hacerlo se encuentran en la documentación del [[mover trRosettaProtocol|trRosettaProtocol]].

Aunque el muestreo conformacional basado en fragmentos y restringido con trRosetta tiende a ser más lento que la predicción de estructura basada en minimización con la [[aplicación trRosetta|trRosetta]], ofrece una exploración más amplia del paisaje conformacional cerca del estado nativo, lo que puede ser útil en algunos casos.  También podría ser más precisa para estructuras más grandes.

Esta funcionalidad fue implementada en marzo de 2021 por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitue.org).  Actualmente no está publicada.  Para más información, consulta la [[aplicación trRosetta|trRosetta]], el [[mover trRosettaProtocol|trRosettaProtocol]] y [[trRosettaConstraintGenerator]].

Extracción de modelos PDB de un silent file de salida con la aplicación score
---------------------------------------------------------------------------

La salida resultante del comando anterior es un silent file de salida (1elwA\_silent.out) que contiene los modelos PDB y la información de puntuación de Rosetta en un formato compacto. Para extraer los modelos PDB del silent file en archivos PDB individuales puedes usar la aplicación de puntuación [[score.linuxgccrelease|score-commands]]. Como alternativa, puedes usar la opción -out:pdb para generar los modelos en archivos de formato PDB.

Agrupamiento con la aplicación cluster
----------------------------------------

Los modelos de un único silent file de salida se pueden agrupar con la aplicación de agrupamiento [[cluster.linuxgccrelease|cluster]].

La aplicación cluster extrae del silent file de salida los archivos PDB de los miembros de los clústeres.

También recomendamos el uso del programa Calibur para agrupar modelos.  Consulta http://www.biomedcentral.com/1471-2105/11/25 y http://sourceforge.net/projects/calibur/


Consejos
====

La aplicación AbinitioRelax funciona mejor con proteínas monoméricas pequeñas, de menos de 100 residuos de longitud. Es posible obtener predicciones precisas para algunas proteínas de hasta unos 150 residuos; sin embargo, las proteínas más grandes requieren bastante más cómputo, ya que el espacio conformacional aumenta enormemente. No es raro muestrear entre 20,000 y 200,000 modelos para converger hacia la estructura nativa. Las siguientes referencias dan información relevante sobre el problema del muestreo:

-   Bradley P, Misura KM, Baker D (2005). Toward high-resolution de novo structure prediction for small proteins. *Science* 309, 1868-71.
-   Kim DE, Blum B, Bradley P, Baker D (2009). Sampling bottlenecks in de novo protein structure prediction. *J Mol Biol* 393, 249-60.

Abinitio funciona bien con restricciones experimentales proporcionadas por el usuario, usando las opciones -cst\_file \$filename y -cst\_weight \#weight. Consulta la documentación sobre los [[archivos de restricciones|constraint-file]] para más información.

Bioinformática
--------------

Como se dijo arriba, conviene intentar identificar secuencias homólogas para ejecutarlas junto con la secuencia objetivo (consulta la referencia de Bradley *et al*). Los homólogos se pueden identificar con herramientas de búsqueda como PSI-BLAST sobre la base de datos de secuencias no redundante (base de datos nr del NCBI) o Pfam. Usar un visor de alineamientos de secuencias como Jalview es muy útil para elegir un conjunto óptimo de homólogos y también para ayudar en la selección de modelos. Normalmente buscamos un conjunto diverso de homólogos (hasta 10) con diferencias en posiciones conservadas y deleciones que puedan representar un loop truncado o una región desordenada. Pequeños cambios en la secuencia pueden tener un gran impacto en las topologías que se muestrean; por ejemplo, un residuo polar en una posición hidrofóbica conservada puede tener un gran efecto, es decir, puede que no se muestree la topología nativa porque la puntuación de todos los átomos de Rosetta desfavorecerá mucho un residuo polar enterrado en un núcleo hidrofóbico. También es importante identificar y recortar los extremos desordenados con programas disponibles públicamente como Disopred o metaPrDOS. Las secuencias señal también deben identificarse y recortarse con programas disponibles públicamente como SignalP. Este protocolo no está desarrollado para proteínas de membrana. Si se predicen hélices transmembrana con programas como TMHMM, consulta nuestra aplicación [[Membrane ab initio|membrane-abinitio]].

Salidas esperadas
================

Genera archivos pdb y un archivo de energía, o un silent file de salida. Ejemplo: `       rosetta_demos/abinitio/input_files/S_00000001.pdb      ` , `       rosetta_demos/abinitio/input_files/score.fsc      ` y `       rosetta_demos/abinitio/output_files/default.out      ` (silent file de salida).

Posprocesamiento
===============

Recomendamos generar entre 20,000 y 30,000 modelos de la secuencia objetivo y de hasta 10 homólogos, y luego usar la [[aplicación cluster|cluster]] o [Calibur](http://sourceforge.net/projects/calibur/) para identificar las conformaciones muestreadas con más frecuencia. En un caso general, al menos uno de los 5-10 clústeres principales por tamaño puede tener modelos con el RMSD más bajo respecto de la estructura nativa.

En un caso ideal, tu secuencia tendrá muchos homólogos identificados con herramientas de búsqueda como PSI-BLAST. Los alineamientos de secuencias pueden ser muy útiles para la selección de modelos. Por ejemplo, las posiciones hidrofóbicas conservadas probablemente representen el núcleo de la proteína, así que se pueden descartar los modelos que tengan cadenas laterales expuestas en esas posiciones. La misma lógica se aplica a las posiciones polares conservadas, que muy probablemente estén en la superficie. Además, los pares de cisteínas conservados pueden representar puentes disulfuro. Herramientas como Jalview para ver alineamientos y PyMOL para ver modelos son extremadamente útiles para la selección de modelos en este sentido.

Los gráficos de puntuación frente a RMSD pueden ser útiles para identificar la convergencia hacia la estructura nativa de la secuencia objetivo y de los homólogos. Por ejemplo, el modelo de menor puntuación se puede usar para la opción de entrada `       -in:file:native      ` al volver a puntuar modelos con la aplicación de puntuación [[score.linuxgccrelease|score-commands]]. Un gráfico de puntuación frente a RMSD del archivo de puntuaciones resultante puede mostrar convergencia (un embudo de energía) hacia el modelo de menor puntuación. Si existe un embudo de energía, el modelo de menor puntuación tiene más probabilidades de estar cerca de la estructura nativa.  Consulta https://www.rosettacommons.org/node/3813 y https://www.rosettacommons.org/content/how-make-benchmark para ver discusiones sobre cómo crear gráficos de puntuación frente a RMSD.  La [[interfaz gráfica PyRosetta Toolkit|PyRosetta Toolkit GUI]] también se puede usar para obtener la salida de puntuación frente a RMSD y el conjunto de estructuras de menor energía encontradas durante una ejecución 

Los modelos de menor puntuación que están en un clúster y que tienen una topología representada en el PDB también tienen más probabilidades de ser correctos. Para buscar en la base de datos del PDB se pueden usar herramientas de comparación estructura-estructura como Dali o Mammoth.


##Véase también

* [Tutorial introductorio del protocolo Ab Initio](https://www.rosettacommons.org/demos/latest/tutorials/denovo_structure_prediction/Denovo_structure_prediction)
* [Plegamiento de proteínas con el tutorial del Broker](https://www.rosettacommons.org/demos/latest/tutorials/advanced_denovo_structure_prediction/folding_tutorial)
* [[Abinitio]]: Más detalles sobre esta aplicación
* [[Fasta file]]: Formato de archivo fasta
* [[Fragment file]]: Formato de archivo de fragmentos (requerido para la predicción de estructura abinitio)
* [[ROBETTA (enlace externo)|http://robetta.bakerlab.org/]]: Servidor que ofrece plegamiento y predicción de estructura *ab initio*, así como selección de fragmentos, para usuarios académicos
* [[Structure prediction applications]]: Una lista de otras aplicaciones que se usan para predecir estructuras
  * [[NonlocalAbinitio]]: Aplicación para predecir la estructura de una proteína dada cierta información estructural previa
  * [[Membrane abinitio]]: Ab initio para proteínas de membrana.  
  - [[Modelado comparativo|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado (usa la aplicación minirosetta).
    * [[Minirosetta]]: Más información sobre la aplicación minirosetta.
  * [[Metalloprotein ab initio|metalloprotein-abrelax]]: Modelado ab initio de metaloproteínas.  
  - [[Backrub]]: Crea conjuntos de cadenas principales mediante cambios pequeños y locales de la cadena principal.  
  - [[Modelado comparativo|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado.  
  - [[Floppy tail]]: Predice estructuras de regiones N-terminales o C-terminales largas y flexibles.
  - [[Fold-and-dock]]: Predice estructuras tridimensionales de homooligómeros simétricos.  
  - [[Protocolos de reemplazo molecular|mr-protocols]]: Usa Rosetta para construir modelos para el reemplazo molecular en cristalografía de rayos X.  
    * [[Prepare template for MR]]: Script de preparación para los protocolos de reemplazo molecular.  
  - [[Relax]]: Optimiza "localmente" las estructuras, incluida la asignación de las posiciones de las cadenas laterales.
  - [[Aplicación trRosetta|trRosetta]]: Predicción de estructura sin fragmentos usando la red neuronal trRosetta. 
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
