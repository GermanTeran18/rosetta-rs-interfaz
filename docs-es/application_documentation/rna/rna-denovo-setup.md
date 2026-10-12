#Modelado de estructura 3D de RNA
==================================

Propósito de la aplicación
===========================================

Este código permite construir modelos tridimensionales de novo de RNA de hasta ~300 nt, a partir de la estructura secundaria y de restricciones experimentales. Se puede realizar de forma razonablemente automática, pero la revisión manual de los submodelos a lo largo del camino de construcción puede mejorar la precisión. Se está preparando un flujo de trabajo totalmente automatizado (una iteración anterior se describe en la documentación de [[rna assembly]]).

Aquí hay un video de modelos creados mediante la aplicación iterativa de este flujo de trabajo de modelado sobre la ribozima GIR1 con cápsula de lariat, como parte de unas pruebas de predicción a ciegas (RNA puzzle 5):

[![Animación del modelado de RNA puzzle 5 en Youtube](http://img.youtube.com/vi/F9hqByhhpuU/0.jpg)](http://www.youtube.com/watch?v=F9hqByhhpuU)

Algoritmo
=========

Esta página de documentación hace hincapié en la preparación de varios trabajos que, en conjunto, permiten modelar pliegues complejos de RNA. Cada uno de los "subtrabajos" es la creación de una hélice, un trabajo de modelado comparativo de RNA ([[rna_thread|rna-thread]]) o una ejecución con la aplicación de modelado de novo FARFAR (ensamblaje de fragmentos de RNA con refinamiento de todos los átomos). Si lo deseas, los submodelos se pueden injertar para formar piezas más grandes. 

Los archivos de entrada, el algoritmo, etc. de la aplicación FARFAR se describen por separado [[aquí|rna denovo]], pero no es necesario entender en detalle esos formatos de archivo para modelar. 

Limitaciones
===========

-   Este método se desarrolló para permitir el modelado integrativo de pliegues complejos de RNA en los que algunas partes se pueden modelar por homología y otras por modelado de novo. Todavía depende de restricciones para contactos de largo alcance, como los pseudonudos, que pueden obtenerse del análisis filogenético o de enfoques de mapeo químico multidimensional como MOHCA-seq o mutate-and-map.

-   El método todavía no es un único flujo automatizado.

Código y demo
=============

El código envoltorio principal está disponible al instalar [[RNA tools|rna-tools]].

Los RNA puzzles han ofrecido bancos de prueba útiles para el modelado de hélices, el modelado por homología de motivos, el modelado de novo y el injerto en estructuras de RNA más grandes. Hay ejemplos de los cuatro pasos en:

`       demos/public/rna_puzzle      `

Referencias
==========
Los ejemplos de predicciones a ciegas realizadas con este flujo de trabajo, incluido el del video anterior, están en:

Miao, Z., et al. (2015) "RNA-Puzzles Round II: Assessment of RNA structure prediction programs applied to three large RNA structures." RNA 21 (6) : 1066 - 1084. [Artículo.](https://daslab.stanford.edu/site_data/pub_pdf/2015_Miao_RNA.pdf) [Enlace.](http://rnajournal.cshlp.org/content/21/6/1066)

Algunos manuscritos recientes que describen este flujo de trabajo en detalle son:

Cheng, C.Y., Chou, F.-C., Kladwang, W., Tian, S., Cordero, P., and Das, R. (2015) "Consistent global structures of complex RNA states through multidimensional chemical mapping." eLife 4 : e07600. [Artículo.](https://daslab.stanford.edu/site_data/pub_pdf/2015_Cheng_eLife.pdf) [Enlace.](http://elifesciences.org/content/4/e07600)
	
Cheng, C.Y., Chou, F.-C., and Das, R. (2015) "Modeling complex RNA tertiary folds with Rosetta." Methods in Enzymology 553 : 35 - 64 [Artículo.](https://daslab.stanford.edu/site_data/pub_pdf/2015_Cheng_MethEnzym.pdf) [Enlace.](http://www.sciencedirect.com/science/article/pii/S0076687914000524)


Archivos de entrada
===========

Archivos requeridos
-------------

Necesitas dos archivos de entrada para modelar la estructura de pliegues complejos de RNA:

-   El [[archivo fasta|fasta file]]: es un archivo de secuencia de tu RNA.
-   El [[archivo de estructura secundaria|secondary structure file]]: archivo de texto con la estructura secundaria en notación punto-paréntesis.

Archivos adicionales opcionales:
--------------------------
-   Cualquier archivo PDB que contenga plantillas para threading.
-   Un archivo PDB nativo, si quieres RMSD de todos los átomos pesados. Debe estar en el [formato PDB de Rosetta para RNA](#File-Format).

Crear modelos
===========
A continuación hay ejemplos para una secuencia tomada de RNA puzzle 11, una horquilla larga con varios submotivos. El archivo fasta `RNAPZ11.fasta` era así:

```
>RNAPZ11 A:1-57
gggaucugucaccccauugaucgccuucgggcugaucuggcuggcuaggcggguccc
```

y el archivo de estructura secundaria `RNAPZ11.secstruct` para el problema completo era así:

```
((((((((((.((((...(((((((....))).)))).))..))...))))))))))
gggaucugucaccccauugaucgccuucgggcugaucuggcuggcuaggcggguccc
```

Hay cuatro hélices: H1, H2, H3 y H4.

Paso 1. Crear las hélices
---------------------------

Las hélices actúan como conectores entre motivos. Puede ser útil construirlas de antemano y mantenerlas fijas en cada ejecución de motivos, ya que el injerto (Paso 4 más abajo) requiere superponer partes compartidas de motivos construidos por separado.

Una línea de comando de ejemplo es la siguiente:

```
rna_helix.py  -o H2.pdb -seq cc gg -resnum 14-15 39-40
```

Esta aplicación genera la hélice con las cadenas A y B, pero quitar las cadenas evita cierta confusión en los pasos posteriores, así que puedes ejecutar:

```
replace_chain_inplace.py  H2.pdb A
```

Para preparar los scripts de Python anteriores, sigue las instrucciones para configurar [[RNA tools|rna-tools]].
Los archivos de ejemplo y la salida están en:

`       demos/public/rna_puzzle/step1_helix/      `

Paso 2. Usar threading para construir subpiezas
---------------------------

En el problema anterior hay una pieza que es un motivo muy conocido, el loop apical UUCG.

Vamos a modelarlo haciendo threading a partir de un ejemplar
del motivo de la base de datos cristalográfica. Hay uno aquí:

Descarga 1f7y.pdb desde `http://pdb.org/pdb/explore/explore.do?structureId=1f7y`.

Extrae el motivo de interés:
```
pdbslice.py  1f7y.pdb  -subset B:31-38 uucg_
```

Haz threading sobre nuestra secuencia real:
```
rna_thread -s uucg_1f7y.pdb  -seq ccuucggg -o uucg_1f7y_thread.pdb
```

Hagamos que la numeración coincida con nuestro caso de prueba real:

```
renumber_pdb_in_place.py uucg_1f7y_thread.pdb 24-31
```

Los archivos de ejemplo y la salida están en:

`       demos/public/rna_puzzle/step2_thread/      `

Paso 3. Modelar de novo con FARFAR los loops, uniones y contactos terciarios de estructura desconocida
---------------------------
Para construir motivos, o varios motivos juntos, usaremos el modelado de novo de Rosetta. En este ejemplo modelaremos los motivos entre H2 y H4, usando nuestras hélices H2 y H4 de partida como condiciones de contorno fijas. Ten en cuenta que también existe un método más avanzado, el [[modelado stepwise|stepwise]], para modelado de alta resolución (y que en realidad es más fácil de ejecutar que el ensamblaje de fragmentos), pero apenas se ha probado en la construcción de pliegues complejos grandes de RNA; para motivos que tengan algún tipo de homología con uniones o motivos existentes, FARFAR debería ser mejor y más rápido.

El ensamblaje de fragmentos de RNA con refinamiento de todos los átomos (FARFAR) puede mapear los números de nuestro problema de modelado completo a subproblemas, según los define la opción `-working_res`: 
```
rna_denovo.<exe> -fasta RNAPZ11.fasta \
    -secstruct_file RNAPZ11_OPEN.secstruct \
   -working_res A:14-25 A:30-40 \
   -s H2.pdb H4.pdb \
   -fixed_stems \
   -tag H2H3H4_run1b_openH3_SOLUTION1 \
   -native example1.pdb 
```

No necesitas aportar un nativo si no lo tienes; solo sirve
para calcular RMSD como referencia.

[Nota histórica: también hay un script `rna_denovo_setup.py` que se usaba para preparar archivos de entrada de `rna_denovo` antes de que este pudiera manejar el mapeo de residuos. Puede que lo veas en flujos de modelado de RNA de Rosetta más antiguos.]

La salida de ejemplo, tras un par de estructuras, va a `H2H3H4_run1b_openH3_SOLUTION1.out`.

Para obtener resultados convergentes, quizá tengas que hacer una ejecución completa en un clúster; hay algunas herramientas disponibles para los sistemas de colas
 `condor`, `qsub` y `slurm` como parte de [[rna tools|rna-tools]].

Extrae los 10 modelos de menor energía:

extract_lowenergy_decoys.py H2H3H4_run1b_openH3_SOLUTION1.out 10

Inspecciónalos en Pymol, usando, por ejemplo, los comandos disponibles en [RiboVis](https://ribokit.github.io/RiboVis/). (Para un flujo automatizado, también puedes agrupar estas ejecuciones y llevar adelante solo los 5 mejores clústeres.)
Hay archivos de demostración en:
`       demos/public/rna_puzzle/step3_farfar/      `

Algunas opciones útiles de `rna_denovo_setup.py`

```
Required:
-sequence                sequence supplied directly [string]
  OR
-fasta                   Fasta-formatted sequence file -- but concatenate all RNA chains in one sequence!

Commonly used options
-secstruct               secondary structure in dot-parentheses notation (enclose in quotes)
 OR
-secstruct_file          file containint secondary structure on top line (can have sequence or anything else on later lines)
-offset                  integer specifying how much to add to each sequence position to get conventional numbering (default: 0)
-cutpoint_open           positions of any strand breaks
-working_res             which residues to model in the desired sub-problem (example: '122-135 166-190', default is all res.)
-fixed_stems             set up de novo modeling fold tree so that helices are connected by rigid-body transforms (default:false, but now recommended)
-s                       list of PDB files to use; must have residue numbers corresponding to location in full modeling problem (default: no input files)

Less commonly used options, but useful
-nstruct                 number of structures for each FARFAR denovo modeling run to produce (default: 500)
-tag                     string to put in front of all input files and final output file (default: name of working directory)
-native_pdb              file with reference PDB for RMSD values (optional)

Advanced options
-out_script              name of output script with Rosetta command line (default: "README_FARFAR")
-silent                  any *input* Rosetta silent files with multiple options for a subset of residues
-input_silent_res        residue numbers that go with the silent files
-no_minimize             do not carry out full-atom refinement, just fragment assembly under lo res score function.
-working_native_pdb      supply a reference PDB file that has just working_res only.
-cst_file                constraint file in old 'section-based' Rosetta constraint format
-data_file               data file with, e.g., DMS data in 'DMS position value' format, or in RDAT format.
-cutpoint_closed         specify that transient chain breaks occur at specific positions, rather than chosen randomly at loops
-extra_minimize_res      positions that may be in input residues (specified in -s or -silent) but should be minimized
-extra_minimize_chi_res  positions that may be in input residues (specified in -s or -silent) but side-chains should be minimized
-virtual_anchor          poorly named; creates a virtual anchor necessary for rigid-body sampling of separate parts of the pose
-obligate_pair           specify pairs of positions that must be in base pairs (perhaps at the expense of transient chain breaks elsewhere)
-obligate_pair_explicit  like obligate pair, but specify sets of 5: <pos1> <pos2> <W/H/S> <W/H/S> <A/P>, where W/H/S means Watson-Crick/Hoogsteen/sugar edge; and A/P means antiparallel/parallel base normals.  
-chain_connection        specify that pairings must occur between two sets of residues: SET1 <positions in set 1> SET2 <positions in set 2>
```

Paso 4. Construir piezas más grandes por injerto o con más FARFAR <a name="rna-graft" />
---------------------------
Una vez que tengas varios modelos de subpiezas, se pueden combinar de dos maneras.

Una opción es ejecutar más trabajos de FARFAR (repetir el Paso 3), pero aportando soluciones de sub-PDB mediante `-s <pdb1> <pdb2> ...` a trabajos de modelado más grandes. Esto es especialmente potente si se puede preparar un conjunto de trabajos en el que cada nuevo trabajo construya un elemento periférico o una unión adicional sobre un modelo bien convergido de un subconjunto modelado en un trabajo anterior: una construcción stepwise, análoga a lo que se explora en el [[modelado stepwise de alta resolución|stepwise]].

Como alternativa, puedes injertar rápidamente dos PDB a partir de la superposición de residuos compartidos, ya sea con el comando `align` de Pymol o con las siguientes líneas de comando de Rosetta:

```
rna_graft -s H2H3H4_run1b_openH3_SOLUTION1.pdb  uucg_1f7y_thread.pdb  H1H2_run2_SOLUTION1.pdb -o full_graft.pdb
```
Hay archivos de demostración en:
`       demos/public/rna_puzzle/step4_graft/      `



##Véase también

* [RiboKit](https://ribokit.github.io/workflows/3D_modeling/): Flujos de trabajo para el modelado 3D de RNA guiado por datos experimentales.
* [[RNA Denovo]]: La página principal de la aplicación rna_denovo
* [[RNA applications]]: La página de inicio de las aplicaciones de RNA
* [[Structure Prediction Applications]]: Lista de aplicaciones de predicción de estructura
* [[RNA]]: Guía para trabajar con RNA en Rosetta
* [[Application Documentation]]: Página de inicio de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
