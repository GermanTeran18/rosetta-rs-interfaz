#Modelado comparativo de estructuras de proteínas

Este documento describe el modelado comparativo con la aplicación minirosetta.
Para un enfoque más reciente para realizar modelado comparativo en Rosetta, consulta [[RosettaCM]]


Metadatos
========

Autor: James Thompson

Este documento fue actualizado por última vez el 21 de noviembre de 2010 por James Thompson (tex@uw.edu) . El investigador principal es David Baker (dabaker@uw.edu) . El protocolo de modelado comparativo de Rosetta fue desarrollado principalmente por los siguientes miembros de Rosetta Commons:

-   Carol Rohl
-   Dylan Chivian
-   Bin Qian
-   Srivatsan Raman
-   Michael Tyka
-   Frank DiMaio
-   James Thompson

Código y demo
=============

El código para ejecutar el modelado comparativo está en `       rosetta/main/source/src/protocols/comparative_modeling      ` y `       rosetta/main/source/src/protocols/loops      ` . Consulta el directorio `       rosetta/tests/integration/tests/threading      ` para ver un ejemplo de línea de comandos y de archivos de entrada.

Puedes encontrar un tutorial introductorio sobre modelado comparativo [aquí](https://www.rosettacommons.org/demos/latest/tutorials/rosetta_cm/rosetta_cm_tutorial).

Referencias
==========

-   Srivatsan Raman, Robert Vernon, James Thompson, Michael Tyka, Ruslan Sadreyev,Jimin Pei, David Kim, Elizabeth Kellogg, Frank DiMaio, Oliver Lange, Lisa Kinch, Will Sheffler, Bong-Hyun Kim, Rhiju Das, Nick V. Grishin, and David Baker. (2009) Structure prediction for CASP8 with all-atom refinement using Rosetta. *Proteins* 77 Suppl 9:89-99.
-   Dylan Chivian and David Baker. (2006). Homology modeling using parametric alignment ensemble generation with consensus and energy-based model selection. *Nucleic Acids Research* 34(17)e112.

Propósito de la aplicación
===========================================

Esta aplicación se desarrolló para construir modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado.

Algoritmo
=========

El enfoque de modelado comparativo de Rosetta se divide en cuatro pasos. El primer paso es la generación de alineamientos con una o más estructuras molde. Actualmente usamos programas externos para ello, entre ellos BLAST, PSI-BLAST, HMMER y HHSearch. Para más información sobre el problema del alineamiento en relación con el modelado comparativo, consulta Chivian y Baker (2006). El segundo paso es la generación de un modelo incompleto a partir de la estructura molde, copiando las coordenadas de las regiones alineadas y reconstruyendo las partes que faltan mediante modelado de loops. Para más información, consulta la documentación de la aplicación de modelado de loops. El tercer paso es un refinamiento de todos los átomos del modelo de la proteína con la función de energía de todos los átomos de Rosetta. El último paso es una selección de los modelos mediante agrupamiento. Los formatos de archivo y las opciones de línea de comandos se detallan más abajo en la sección [Opciones](#Options) más abajo).

El protocolo estándar actual consiste en generar 10,000 modelos independientes con el protocolo detallado en este documento, seleccionar el 10 % de modelos de menor energía y luego elegir clústeres con la aplicación «Cluster»."

Archivos de entrada
===========

-   Archivo fasta. Contiene la secuencia de aminoácidos de la proteína en formato fasta.

-   Archivos de fragmentos. Genera bibliotecas de fragmentos estructurales con el servidor web disponible públicamente ( <http://old.robetta.org/> ) o con una instalación local del paquete rosetta\_fragments.

-   Estructura nativa (opcional). La estructura PDB nativa puede usarse para benchmarks. Si se usa, se calcula el RMSD respecto a la nativa para cada modelo y se proporciona como una columna adicional en la línea de puntuación.

-   Archivo psipred\_ss2 de predicción de estructura secundaria de Psipred (opcional). El archivo de predicción de estructura secundaria de Psipred puede usarse para elegir los puntos de ruptura de cadena para el modelado de loops, y es opcional.

-   Un archivo pdb molde para el threading

-   Un archivo de alineamiento de secuencias

Opciones
=======

El modelado comparativo se puede ejecutar con la aplicación minirosetta con las siguientes opciones (para ver todos los comandos relevantes, ejecútala con la opción -help):

```
./bin/minirosetta.linuxgccrelease
-run:protocol threading

-in:file:fasta t288_.fasta                                                    Query FASTA sequence
-in:file:fullatom
-out:file:fullatom

-loops:frag_files aat288_09_05.200_v1_3.gz aat288_03_05.200_v1_3.gz none     Fragment files
-loops:frag_sizes 9 3 1                                                      Number of residues in each fragment file

-in:file:native native.pdb                                                  Native structure (optional)
-in:file:psipred_ss2 t288_.psipred_ss2                                        PSIPRED-SS2 File (optional)
-in:file:fullatom

-idealize_after_loop_close                                                    Idealize structure after closing loops

-loops:extended
-loops:build_initial
-loops:remodel quick_ccd                                                     Method for rebuilding loops
-loops:relax fastrelax                                                       Protocol for full-atom refinement
-relax:fastrelax_repeats 8                                                    Number of full-atom refinement cycles

-in:file:alignment t288_.result.filt.valid                                    Alignment file
-cm:aln_format grishin                                                        Alignment file format
#-cm:aln_format general                                                       if general format is used
-in:file:template_pdb 1be9A.pdb                                               List of template PDBs
-database path/to/rosetta/main/database                                       Path to rosetta database
-nstruct 1                                                                    Number of output structures
-out:file:silent t288_.silent.out                                             Use silent file output, use filename after this flag, default=default.out
(or -out:pdb)                                                                 Use PDB file output, default=false
-out:path /my/path                                                            Path where PDB output files will be written to, default '.'
```

El formato de archivo «grishin» para los alineamientos de secuencias se muestra a continuación:

```
## t288_ 1be9A_4
# hhsearch_3 33
scores_from_program: 0.000000 0.998400
2 VPGKVTLQKDAQNLIGISIGGGAQYCPCLYIVQVFDNTPAALDGTVAAGDEITGVNGRSIKGKTKVEVAKMIQEVKGEVTIHYNKLQ
9 EPRRIVIHRGS-TGLGFNIIGGED-GEGIFISFILAGGPADLSGELRKGDQILSVNGVDLRNASHEQAAIALKNAGQTVTIIAQYKP
--
```

Las dos primeras líneas representan el identificador de las secuencias de la consulta y del molde, y 1be9A.pdb debe proporcionarse en la línea de comandos con la opción -in:file:template_pdb (indicada arriba). La cadena «1be9A\_4» debe ser un identificador único para el alineamiento de secuencias. Los identificadores de alineamiento se guardan en los silent files, y cada estructura de un silent file debe guardar qué alineamiento se usó como molde para construir el modelo.

Si proporcionas el archivo de alineamiento en formato general, usa la opción -cm:aln_format general
El formato general tiene este aspecto:

score 123.456
t288_		1 VIAFRCPRSFMDQPLAEHFSPFRVQHMDLSNS------VIEVSTL
1be9A 	1 ILSLRRSLSYVIQGMANIESLNLSGCYNLTDNGLGHAFVQEIGSL

1be9A.pdb debe proporcionarse en la línea de comandos

Consulta las [[opciones de extracción de AbinitioRelax|abinitio-relax#Options]] y las [[opciones de agrupamiento de AbinitioRelax|abinitio-relax#Options]] para saber cómo extraer PDBs y agrupar silent files del modelado comparativo.

##Véase también

* [Tutorial de modelado comparativo](https://www.rosettacommons.org/demos/latest/tutorials/rosetta_cm/rosetta_cm_tutorial)
* [[Minirosetta]]: Más información sobre la aplicación MiniRosetta
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura
  * [[NonlocalAbinitio]]: Aplicación para predecir la estructura de una proteína a partir de información estructural previa
  * [[Abinitio Relax]]: Aplicación para predecir la estructura de una proteína basándose únicamente en su secuencia de aminoácidos
    * [[Abinitio]]: Más detalles sobre esta aplicación
  * [[Membrane abinitio]]: Ab initio para proteínas de membrana.  
  * [[Metalloprotein ab initio|metalloprotein-abrelax]]: Modelado ab initio de metaloproteínas.  
  - [[Backrub]]: Crea conjuntos de cadenas principales mediante cambios pequeños y locales en la cadena principal.  
  - [[Comparative modeling|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado.  
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
