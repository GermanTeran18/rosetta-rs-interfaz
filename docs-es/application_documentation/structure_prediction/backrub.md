#Aplicación Backrub

Metadatos
========

Autor: Colin A. Smith

Este documento se actualizó por última vez el 10 de agosto de 2010, por Colin A. Smith. La investigadora principal correspondiente es Tanja Kortemme (kortemme@cgl.ucsf.edu)

Código y demo
=============

El código de la aplicación backrub está en rosetta/main/source/src/apps/public/backrub.cc. Hay una prueba de integración y una demo en rosetta/main/tests/integration/tests/backrub. Los movimientos backrub se realizan con el BackrubMover. Los movimientos de cadena lateral se realizan con el SidechainMover. Los movimientos phi/psi de la cadena principal se realizan con el SmallMover.

El siguiente ejemplo adicional simula el loop 6 de la triosafosfato isomerasa. **Ten en cuenta que el resfile usa la numeración de residuos del PDB. Los residuos pivote se especifican con la numeración interna absoluta de residuos.**

```
cat << END_RESFILE > 2YPI.resfile
NATRO
start
3   A NATAA
7   A NATAA
95  A NATAA
96  A NATAA
129 A NATAA
131 A NATAA
134 A NATAA
139 A NATAA
164 A NATAA
165 A NATAA
167 A NATAA
168 A NATAA
170 A NATAA
172 A NATAA
174 A NATAA
177 A NATAA
179 A NATAA
180 A NATAA
183 A NATAA
208 A NATAA
211 A NATAA
216 A NATAA
219 A NATAA
220 A NATAA
223 A NATAA
230 A NATAA
END_RESFILE
backrub -database /path/to/rosetta/main/database -s 2YPI.pdb -ignore_unrecognized_res -resfile 2YPI.resfile
        -pivot_residues 127 128 129 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178
```

Referencias
==========

-   Smith CA, Kortemme T. Structure-Based Prediction of the Peptide Sequence Space Recognized by Natural and Synthetic PDZ Domains. *J Mol Biol* . [http://dx.doi.org/10.1016/j.jmb.2010.07.032](http://dx.doi.org/10.1016/j.jmb.2010.07.032)

-   Smith CA, Kortemme T. Backrub-like backbone simulation recapitulates natural protein conformational variability and improves mutant side-chain prediction. *J Mol Biol* . 2008 Jul 18;380(4):742-56. [http://dx.doi.org/10.1016/j.jmb.2008.05.023](http://dx.doi.org/10.1016/j.jmb.2008.05.023)

-   Friedland GD, Linares AJ, Smith CA, Kortemme T. A simple model of backbone flexibility improves modeling of side-chain conformational variability. *J Mol Biol* . 2008 Jul 18;380(4):757-74. [http://dx.doi.org/10.1016/j.jmb.2008.05.006](http://dx.doi.org/10.1016/j.jmb.2008.05.006)

-   Friedland GD, Lakomek NA, Griesinger C, Meiler J, Kortemme T. A correspondence between solution-state dynamics of an individual protein and the sequence and conformational diversity of its family. *PLoS Comput Biol* . 2009 May;5(5):e1000393. [http://dx.doi.org/10.1371/journal.pcbi.1000393](http://dx.doi.org/10.1371/journal.pcbi.1000393)

-   Davis IW, Arendall WB 3rd, Richardson DC, Richardson JS. The backrub motion: how protein backbone shrugs when a sidechain dances. *Structure* . 2006 Feb;14(2):265-74. [http://dx.doi.org/10.1016/j.str.2005.10.007](http://dx.doi.org/10.1016/j.str.2005.10.007)

-   Betancourt MR. Efficient Monte Carlo trial moves for polypeptide simulations. *J Chem Phys* . 2005 Nov 1;123(17):174905. [http://dx.doi.org/10.1063/1.2102896](http://dx.doi.org/10.1063/1.2102896)

Propósito de la aplicación
===========================================

Esta aplicación sirve para crear conjuntos de cadenas principales de proteínas, modelar la flexibilidad de las proteínas, modelar mutaciones y refinar en detalle las conformaciones de cadena principal y cadena lateral.

Algoritmo
=========

El algoritmo backrub rota segmentos locales de la cadena principal de la proteína como un cuerpo rígido en torno a un eje definido por los átomos inicial y final del segmento. Se inspiró en las observaciones de Davis et al (Structure 2006) sobre conformaciones alternativas de cadena lateral y cadena principal en estructuras cristalinas de alta resolución. Los átomos que se ramifican de la cadena principal en los puntos pivote (cadenas laterales, hidrógenos, oxígenos carbonilo) se actualizan para minimizar la tensión de ángulo de enlace que se genera. Estos movimientos se aceptan o rechazan con el criterio de Metropolis.

Además de los movimientos backrub, las conformaciones de cadena lateral se muestrean directamente a partir de las distribuciones de probabilidad descritas por la biblioteca de rotámeros de Dunbrack, y no a partir de un conjunto discreto de ángulos chi, como suelen hacer muchos algoritmos de muestreo de cadenas laterales. Los movimientos de cadena lateral también se aceptan o rechazan con el criterio de Metropolis.

Limitaciones
-----------

La aplicación backrub no muestrea ni la cadena principal ni la cadena lateral de los residuos de prolina. Mientras un residuo de prolina se especifique como flexible, puede formar parte de segmentos backrub, pero no puede ser el pivote inicial ni el final de un segmento.

Diferencias con la versión publicada descrita en las referencias
-------------------------------------------------------------

Una de las diferencias principales entre esta implementación y la anterior es que backrub ahora está centrado en los átomos y no en los residuos. En lugar de solo los átomos CA, se puede usar como pivote cualquier átomo de la cadena principal. Por continuidad, solo los átomos CA están habilitados como pivotes por defecto.

Esto cambia la forma de especificar los tamaños mínimo y máximo de segmento. En la implementación anterior, el tamaño de segmento más pequeño era de 2 residuos, lo que correspondía a rotar el enlace peptídico (átomos C y N) entre los dos residuos. En esta implementación, eso correspondería a un tamaño de segmento de 4 átomos (CA, C, N y CA). Debido a la implementación centrada en los átomos, el tamaño más pequeño posible es ahora de 3 átomos, que es el valor por defecto. El tamaño de segmento máximo por defecto anterior, 12 residuos, corresponde al nuevo valor por defecto de 34 átomos. Como solo los átomos CA están habilitados como pivotes por defecto, los segmentos posibles serán idénticos a los de la implementación anterior.

Otra diferencia es que esta implementación usa un muestreo continuo de los ángulos chi de las cadenas laterales en lugar de rotámeros fijos. Los ángulos se eligen según las probabilidades de la biblioteca de rotámeros de Dunbrack. Primero se elige un pozo de rotámero según su probabilidad de aparición en el PDB. Después, los ángulos chi individuales se eligen con ángulos aleatorios de distribución gaussiana, con las medias y desviaciones estándar del PDB.

Por último, el muestreo de cadena principal y el de cadena lateral están totalmente desacoplados. Usan movers distintos que se eligen al azar en cada paso de Monte Carlo.

La predicción de las estructuras de mutaciones descrita en Smith y Kortemme (J Mol Biol 2008) y el protocolo de generación de conjuntos y diseño descrito en Friedland et al (PLoS Comput Biol 2009) con Rosetta++ están implementados en: [http://kortemmelab.ucsf.edu/backrub](http://kortemmelab.ucsf.edu/backrub)

Archivos de entrada
===========

-   Las estructuras iniciales deben estar en formato PDB y se pueden especificar con las opciones -s o -l. Se puede especificar un fold tree personalizado en una sola línea del archivo PDB usando el formato de silent file. Puedes encontrar una descripción general de ese formato en la [[documentación de fold tree|foldtree-overview]] .

-   El muestreo de cadenas laterales se controla con la opción de línea de comandos -resfile. Si no se especifica ningún resfile, todas las cadenas laterales se hacen flexibles por defecto. Consulta la [[documentación de resfile|resfiles]] para más información sobre cómo crear uno. Al usar resfiles hay que tener en cuenta varias cosas: primero, por las limitaciones actuales del muestreo de cadenas laterales, las prolinas no se muestrean, aunque se especifiquen en el resfile. Segundo, aunque es posible muestrear distintos aminoácidos con la aplicación backrub, el algoritmo de Monte Carlo a temperatura fija sesgará los aminoácidos seleccionados hacia residuos más pequeños, como la alanina. **Por último, la numeración de residuos en los resfiles se basa en el número de residuo y la letra de cadena del archivo PDB, lo cual es distinto de la opción -pivot\_residues** .

-   También se pueden habilitar movimientos simples phi/psi de la cadena principal especificando un archivo MoveMap con la opción -movemap y dándole un valor mayor que cero a la opción -sm\_prob. Consulta la [[documentación de MoveMap|movemap-file]] para más información.

Opciones
=======

Puedes ejecutar la aplicación backrub con las siguientes opciones:

```
-database                 Database file input search paths
```

Entrada de estructuras
---------------

```
-s                        Name(s) of single PDB file(s) to process
-l                        File(s) containing list(s) of PDB files to process
-ignore_unrecognized_res  Do not abort if unknown residues are found in PDB
                          file; instead, ignore them.
```

Si el archivo PDB contiene una línea que empieza por FOLD\_TREE, se usará el fold tree especificado en esa línea. El mismo fold tree se añadirá, con el mismo formato, a todas las estructuras resultantes. Consulta la documentación de [[fold trees|foldtree-overview]] para más información.

Opciones de simulación
------------------

```
-nstruct                  number of independent simulations generating last 
                          and low output structures (default 1)
-backrub:ntrials          number of Monte Carlo trials to run (default 1000, 
                          10000 recommended)
-mc_kt                    value of kT for Monte Carlo (default 0.6, 0.3-0.4
                          recommended for > 100,000 step simulations)
-mm_bend_weight           weight of mm_bend bond angle energy term (default 1)
-cst_fa_weight            weight of the fullatom constraint terms (defualt 1)
-cst_fa_file              constraints filename(s) for fullatom. When multiple 
                          files are given a *random* one will be picked.
```

Consulta la documentación sobre [[archivos de restricciones|constraint-file]] para más información.

Reempaquetado/minimización inicial
---------------------------

```
-initial_pack             force a repack/minimization at the beginning 
                          regardless of whether mutations are set in the resfile
-minimize_movemap         MoveMap specifying degrees of freedom to be minimized 
                          after initial packing, occurs in three stages:
                          1. CHI only  2. CHI+BB  3. CHI+BB+Jump
```

Muestreo backrub
----------------

```
-pivot_residues           residues for which contiguous stretches can contain
                          segments, in absolute residue numbers (defaults to all
                          residues)
-pivot_atoms              main chain atoms usable as pivots (default CA)
-min_atoms                minimum backrub segment size in atoms (default 3)
-max_atoms                maximum backrub segment size in atoms (default 34)
```

Muestreo de cadenas laterales
-------------------

```
-resfile                  resfile filename(s). only the first is used.
-sc_prob                  probability of making a side chain move (default 0.25)
-sc_prob_uniform          probability of uniformly sampling chi angles (defualt
                          0.1)
-sc_prob_withinrot        probability of sampling within the current rotamer
                          (default 0.0)
```

Muestreo de ángulos de torsión de la cadena principal
-------------------------------

```
-movemap                  MoveMap file specifying flexible torsions
-sm_prob                  probability of making a small move (default 0)
```

Registro de trayectorias
--------------------

```
-backrub:trajectory         record a trajectory
-backrub:trajectory_gz      gzip the trajectory
-backrub:trajectory_stride  write out a trajectory frame every N steps
```

Para más información sobre otras opciones de la aplicación, consulta la [[lista completa de opciones|full-options-list]]

Consejos
====

Hasta la fecha, la generación típica de conjuntos backrub ha usado 10,000 pasos de Monte Carlo a una temperatura de 0.6. A esa temperatura, muchas estructuras se desplegarán si el número de pasos de Monte Carlo aumenta de forma significativa. Muchas estructuras se mantienen estables en simulaciones largas a una temperatura de 0.3-0.4.

Las simulaciones backrub de 10,000 pasos de un artículo reciente sobre la predicción de la especificidad de dominios PDZ (Smith & Kortemme 2010) tardaron en promedio 110 segundos por simulación en generar una sola estructura. Las simulaciones se ejecutaron cada una en un único núcleo de un clúster heterogéneo de estaciones de trabajo Xeon de 8 núcleos con procesadores E5345, E5430 y E5520.

Salidas esperadas
================

Para cada estructura inicial se generará una etiqueta de salida a partir del nombre del archivo de entrada, el sufijo, el prefijo y las etiquetas del usuario, si las hay. La aplicación backrub genera dos archivos, output\_tag\_0001\_low.pdb y output\_tag\_0001\_last.pdb. El índice de cuatro dígitos se incrementa hasta el número de estructuras especificado con -nstruct. El archivo «low» contiene la estructura de menor energía encontrada durante la simulación de Monte Carlo. El archivo «last» contiene la última estructura aceptada durante la simulación de Monte Carlo. Si se dio un fold tree personalizado en el archivo de entrada, se añadirá a cada uno de los archivos de salida.

Posprocesamiento
===============

Una forma útil de posprocesamiento es calcular el RMSD de las estructuras de salida respecto a la estructura de entrada.

Novedades de Rosetta 3.2
===========================

-   Además de reempaquetar para las mutaciones especificadas, la aplicación backrub ahora hará de forma opcional una minimización en tres etapas después del empaquetado. Consulta -minimize\_movemap.

-   Se añadió un tercer tipo de movimiento de cadena lateral, en el que se determina el rotámero más cercano y los ángulos chi se vuelven a muestrear dentro de ese rotámero. Esto aumenta el muestreo de rotámeros de baja probabilidad pero favorecidos energéticamente. Consulta -sc\_prob\_withinrot.

-   Ahora se pueden registrar trayectorias PDB multimodelo para una simulación backrub. Consulta -backrub:trajectory y las opciones asociadas.

##Véase también

* [[Fasta file]]: Formato de archivo Fasta
* [[Fragment file]]: Formato de archivo de fragmentos (necesario para la predicción de estructura ab initio)
* [[BackrubMover]]: El mover backrub de RosettaScripts
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura
  * [[Abinitio relax]]: Aplicación para predecir estructuras de proteínas a partir de secuencias
    * [[Abinitio]]: Más detalles sobre esta aplicación
  * [[NonlocalAbinitio]]: Aplicación para predecir la estructura de una proteína a partir de información estructural previa
  * [[Membrane abinitio]]: Ab initio para proteínas de membrana.  
  - [[Comparative modeling|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado (usa la aplicación minirosetta).
    * [[Minirosetta]]: Más información sobre la aplicación minirosetta.
  * [[Metalloprotein ab initio|metalloprotein-abrelax]]: Modelado ab initio de metaloproteínas.  
  - [[Floppy tail]]: Predice estructuras de regiones largas y flexibles en el extremo N o C.
  - [[Fold-and-dock]]: Predice estructuras tridimensionales de homooligómeros simétricos.  
  - [[Molecular replacement protocols|mr-protocols]]: Usa Rosetta para construir modelos para el reemplazo molecular en cristalografía de rayos X.  
    * [[Prepare template for MR]]: Script de preparación para los protocolos de reemplazo molecular.  
  - [[Relax]]: Optimiza «localmente» las estructuras, incluida la asignación de posiciones de las cadenas laterales.
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
