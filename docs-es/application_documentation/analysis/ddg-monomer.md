#Aplicación ddg\_monomer

Metadatos
========

Autores: Andrew Leaver-Fay y Elizabeth Kellogg

Lanzada inicialmente en Rosetta3.3

La documentación se actualizó por última vez el 13 de agosto de 2025, por Rachel Clune. Las preguntas sobre esta documentación deben dirigirse al Slack de Rosetta Commons (how_do_i_do_x, documentation o debugging, según la pregunta) o a un nuevo [Issue] (https://github.com/RosettaCommons/rosetta/issues) o [Discussion] (https://github.com/RosettaCommons/rosetta/discussions).

_Nota:_ [ThermoMPNN](https://github.com/Kuhlman-Lab/ThermoMPNN) es un método de aprendizaje automático que se puede usar para calcular el ddG de una mutación; para información de benchmarking, consulta este [artículo](https://www.pnas.org/doi/10.1073/pnas.2314853121) de H. Dieckhaus, et al. Esta herramienta puede funcionar mejor que ddg\_monomer en algunas situaciones; considera si es mejor para tu aplicación. 

Código y demostración
=============

La aplicación ddg\_monomer se encuentra en rosetta/main/source/src/apps/public/ddg/ddg\_monomer.cc (este archivo se llamaba antes «fix\_bb\_monomer\_ddg.cc», pero se renombró porque ahora mueve la cadena principal). Este archivo contiene la función main(). Las subrutinas centrales que invoca este archivo se encuentran en la clase ddGMover, definida en rosetta/main/source/src/protocols/moves/ddGMover.hh y rosetta/main/source/src/protocols/moves/ddGMover.cc.

Una aplicación auxiliar, minimize\_with\_cst, se encuentra en rosetta/main/source/src/apps/public/ddg/minimize\_with\_cst.cc.

Un script auxiliar para generar uno de los archivos de entrada que necesita la aplicación ddg\_monomer se encuentra en rosetta/main/source/src/apps/public/ddg/convert\_to\_cst\_file.sh.

Una prueba de integración de esta aplicación se encuentra en rosetta/main/tests/integration/tests/ddG\_of\_mutation/. La prueba de este directorio ejecuta una trayectoria acortada para predecir las energías del tipo silvestre y del mutante. Para convertirla en un ejemplo de ejecución de producción, fija en 50 el valor de la opción «-ddg:iterations» indicada en el archivo «rosetta/main/tests/integration/tests/ddG\_of\_mutations/flags».

Referencias
==========

El nuevo algoritmo para realizar una relajación limitada de la cadena principal se publicó en:

E. Kellogg, A. Leaver-Fay, and D. Baker, (2011) "Role of conformational sampling in computing mutation-induced changes in protein structure and stability", Proteins: Structure, Function, and Bioinformatics. V 79, pp 830–838. [Texto completo](https://pmc.ncbi.nlm.nih.gov/articles/PMC3760476/). 

El algoritmo más antiguo, de cadena principal fija y con función de puntuación de repulsión suave (análogo al descrito en la fila 4 de [Kellogg 2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3760476/), pero con pesos entrenados para reproducir experimentos de mutación por escaneo de alaninas; los pesos están en [rosetta/main/database/scoring/weights/ddg\_monomer.wts](https://github.com/RosettaCommons/rosetta/blob/main/database/scoring/weights/ddg_monomer.wts)) se publicó en:

Kortemme et al. (2002) "A simple physical model for binding energy hot spots in protein-protein complexes", PNAS 22, 14116-21. [Texto completo](https://www.pnas.org/doi/10.1073/pnas.202485799). 

Propósito
===========================================

El propósito de esta aplicación es predecir el cambio de estabilidad (el ddG) de una proteína monomérica inducido por una mutación puntual. La aplicación toma como entrada la estructura cristalográfica del tipo silvestre (que primero debe haberse preminimizado) y genera un modelo estructural del mutante puntual. El ddG es la diferencia de [[energía de Rosetta|Units in Rosetta]] entre la estructura del tipo silvestre y la del mutante puntual. Más precisamente, se deben generar 50 modelos de la estructura del tipo silvestre y 50 de la del mutante, y el ddG más preciso se toma como la diferencia entre el promedio de las 3 mejores estructuras del tipo silvestre según la puntuación y el de las 3 mejores estructuras del mutante puntual.

Rosetta sigue la convención de que los valores negativos de ddG indican mayor estabilidad, _es decir_, ddG = energía del mutante - energía del tipo silvestre. 

Para convertir aproximadamente los valores que entrega este método a kcal/mol, se necesita un factor de escala de 2.94. Para más información sobre cómo se determinó este factor, consulta el final de la Sección III de la información suplementaria del artículo de [Park, et al.](https://pubs.acs.org/doi/10.1021/acs.jctc.6b00819)

Algoritmo
=========

Esta aplicación se puede usar principalmente de dos maneras: una de alta resolución y otra de baja resolución. Son casi igual de precisas, con coeficientes de correlación de 0.69 y 0.68 en un conjunto de 1210 mutaciones. Están descritas por los protocolos de las filas 16 y 3 de [Kellogg,2011], respectivamente.

A) Protocolo de alta resolución:

Este protocolo permite un pequeño grado de libertad conformacional de la cadena principal. El protocolo optimiza de la misma manera, y durante el mismo número de iteraciones (se recomiendan 50), tanto la estructura de entrada inicial del tipo silvestre como la estructura generada para el mutante puntual. Comienza optimizando los rotámeros de todos los residuos de la proteína con el módulo estándar de optimización de cadenas laterales de Rosetta (el packer). Después de esta optimización inicial de cadenas laterales siguen tres rondas de minimización basada en gradiente, donde el componente repulsivo del término de Lennard-Jones (van der Waals) se reduce de peso en la primera iteración (10 % de su intensidad normal), se pondera con un valor intermedio en la segunda iteración (33 % de su intensidad normal) y se pondera con su valor estándar en la tercera. Este reempaquetamiento seguido de minimización se ejecuta varias veces, siempre a partir de la misma estructura. Se escriben las puntuaciones y, opcionalmente, los PDB.

Restricciones de distancia: el protocolo de alta resolución se apoya en restricciones de distancia Calfa-Calfa como parte de la optimización, para evitar que la cadena principal se aleje demasiado de la conformación inicial. Estas restricciones de distancia se pueden generar externamente antes de ejecutar el protocolo. Si no se especifican, las restricciones se generan automáticamente a partir de la estructura de entrada, pero los resultados obtenidos en el artículo publicado usaron restricciones basadas en la estructura cristalográfica de alta resolución. Las restricciones usadas para generar los datos de la fila 16 en [Kellogg2011] se dieron como restricciones de distancia entre todos los pares de Calfa a menos de 9 Å entre sí en la estructura del tipo silvestre; para cada restricción armónica, el valor ideal fue la distancia en la estructura cristalográfica original (no en la estructura preminimizada que se debe dar como entrada) y la desviación estándar de la restricción armónica se fijó en 0.5 Å. Por ejemplo, la restricción de distancia entre el C-alfa del residuo 1 y el C-alfa del residuo 2 del PDB 1hz6 se describe en el archivo de restricciones de entrada con la línea «AtomPair CA 2 CA 1 HARMONIC 3.79007 0.5».

Las restricciones de distancia se pueden generar con este script de shell:

```
./convert_to_cst_file.sh mincst.log > input.cst
```

Este script de shell simplemente toma la salida del registro de minimización (de la preminimización de la estructura de entrada) y la convierte al formato de archivo de restricciones adecuado. (Más abajo se explica cómo obtener el registro de minimización.)

Preminimización de las estructuras de entrada: la estructura del tipo silvestre determinada experimentalmente (solo se han usado estructuras cristalográficas) debe preminimizarse para reducir los choques, que de otro modo introducen mucho ruido en el proceso de relajación. Las estructuras se minimizan, cadena principal y cadenas laterales, con restricciones armónicas de distancia sobre todos los átomos C-alfa a menos de 9 Å en la estructura cristalográfica. Normalmente se genera un conjunto de restricciones a partir de las estructuras cristalográficas y se usan tanto en la minimización inicial como en la posterior minimización de cadena principal y cadenas laterales del ddg.

El comando para realizar la preminimización es el siguiente (añade opciones para modificar la función de puntuación según corresponda):

```
/path/to/minimize_with_cst.linuxgccrelease -in:file:l lst  -in:file:fullatom -ignore_unrecognized_res -fa_max_dis 9.0 -database /path/to/rosetta/main/database/ -ddg::harmonic_ca_tether 0.5 -ddg::constraint_weight 1.0 -ddg::out_pdb_prefix min_cst_0.5 -ddg::sc_min_only false > mincst.log
```

Esta aplicación solo acepta una lista de estructuras pdb, indicada con -in:file:l lst. Las estructuras minimizadas resultantes tendrán un prefijo indicado con -ddg::out\_pdb\_prefix. En este caso las estructuras tendrán el prefijo «min\_cst\_0.5» seguido del nombre del pdb de entrada original.

Como se explicó en la sección anterior, para obtener restricciones basadas en la estructura cristalográfica, ejecuta el script de shell ./convert\_to\_cst\_file.sh sobre el archivo de registro de salida (mincst.log)

B) Protocolo de baja resolución:

Este protocolo solo permite flexibilidad conformacional de las cadenas laterales. Optimiza los rotámeros de los residuos en la vecindad de la mutación, es decir, aquellos con átomos CBeta a menos de 8 Å del átomo CBeta del residuo mutado (o el Calfa en el caso de la glicina). Se optimiza el mismo conjunto de residuos tanto en la estructura del tipo silvestre como en la del mutante. La optimización se realiza 50 veces (valor recomendado) tanto para el tipo silvestre como para el mutante puntual, y se escriben las puntuaciones (y, opcionalmente, los PDB).

Limitaciones
===========

El protocolo de alta resolución está diseñado para limitar la cantidad de flexibilidad conformacional que se permite a las cadenas principales de las proteínas, porque el ruido que se filtra en el protocolo al aumentar la flexibilidad tiende a ahogar la señal que se podría ganar al explorar una región mayor del espacio conformacional. El resultado es que este protocolo probablemente no sea adecuado para modelar varias mutaciones simultáneamente cuando se esperaría movimiento de la cadena principal.

Archivos de entrada
===========

Numeración del PDB:

Todos los PDB deben renumerarse de modo que su primer residuo sea el residuo 1 y la numeración sea consecutiva, de manera que, si faltan residuos en la estructura (por ejemplo, por falta de densidad), esos residuos simplemente se omitan en la numeración. La numeración de todos los residuos, tanto en el archivo de restricciones de distancia como en el archivo con la lista de mutaciones, debe seguir esta numeración.

Hay dos archivos de entrada principales: a) archivos de restricciones para pares de átomos calfa y b) archivos con la lista de mutaciones, que describen qué conjunto de mutaciones puntuales se considerarán para una cadena principal de entrada.

a) Archivos de restricciones para pares de átomos calfa

El archivo de restricciones debe listar todos los pares de átomos calfa a menos de 9 Å, con la distancia medida en la estructura experimental original (no preminimizada). Cada línea debe tener este aspecto:

```
AtomPair CA <res1> CA <res2> HARMONIC <xtal-distance> 0.5
```

Por ejemplo, aquí hay algunas líneas de un archivo real de restricciones de distancia de entrada

```
AtomPair CA 2 CA 1 HARMONIC 3.79007 0.5
AtomPair CA 3 CA 1 HARMONIC 6.65019 0.5
AtomPair CA 3 CA 2 HARMONIC 3.80767 0.5
AtomPair CA 4 CA 1 HARMONIC 8.66838 0.5
AtomPair CA 4 CA 2 HARMONIC 6.2647 0.5
```

b) Archivos con la lista de mutaciones: los archivos que especifican las mutaciones pueden seguir cualquiera de dos formatos.

1.  Las mutaciones pueden seguir el formato de resfile (descrito en [[Sintaxis y convenciones de los resfile|resfiles]]). Cada mutación especificada se realizará como un mutante simple. Por ejemplo, un resfile como el siguiente

```
1 A PIKAA AWTL
```

mutará el residuo 1 a alanina, luego mutará el residuo 1 a triptófano, y así sucesivamente.

si escribes algo como

```
1 A NONPOLAR
```

mutará el residuo 1 a todos los residuos no polares.

Si, por ejemplo, se especifica ALLAA en una posición determinada, la posición se mutará a los otros 19 aminoácidos y se calculará el ddg de cada una de estas 19 mutaciones. Las palabras clave EX 1 y EX 2 no tienen efecto sobre cómo se refinan las estructuras.

Puedes pasar el resfile de la forma habitual, con -resfile my\_input\_resfile

Si necesitas especificar más de una mutación a la vez, puedes usar el formato alternativo para especificar mutaciones.

```
total 3 #this is the total number of mutations being made.
2 # the number of mutations made
G 1 A # the wild-type aa, the residue number, and the mutant aa
W 6 Y # the wild-type aa, the residue number, and the mutant aa
1 #the number of mutations
F 10 Y # the wild-type aa, the residue number, and the mutant aa
```

El total y el aminoácido del tipo silvestre son fuentes de información redundantes, pero se usan para verificar dos veces la especificación del usuario y evitar errores.

Este formato alternativo se pasa con -ddg::mut\_file my\_input\_mutfile

Opciones
=======

A) Opciones del protocolo de alta resolución:

Las siguientes opciones son necesarias o recomendadas para que este ejecutable se comporte como el protocolo de la fila 16 de [Kellogg2011].

```
-in:file:s <pdbfile of the preminimized wildtype structure> # the PDB file of the structure on which point mutations should be made
-ddg::mut_file <mutfile> # the list of point mutations to consider in this run
-ddg:weight_file soft_rep_design # Use soft-repulsive weights for the initial sidechain optimization stage
-ddg:minimization_scorefunction <weights file> # optional -- the weights file to use, if not given, then the current default scorefunction will be used.
-ddg::minimization_patch <weights patch file > # optional -- the weight-patch file to apply to the weight file; does not have to be given
-database /path/to/rosetta/main/database #the full oath to the database is required
-fa_max_dis 9.0 # optional -- if not given, the default value of 9.0 Angstroms is used.
-ddg::iterations 50 # 50 is the recommended number of iterations
-ddg::dump_pdbs true # write out PDB files for the structures, one for the wildtype and one for the pointmutant for each iteration
-ignore_unrecognized_res # optional -- if there are residues in the input PDB file that Rosetta cannot recognize, ignore them instead of quitting with an error message
-ddg::local_opt_only false # recommended: local optimization restricts the sidechain optimization to only the 8 A neighborhood of the mutation (equivalent to row 13)
-ddg::min_cst true # use distance restraints (aka constraints) during the backbone minimization phase
-constraints::cst_file <cbeta-distance-constraint-file> # the set of constraints to use during minimization which should reflect distances in the original (non-pre-relaxed) structure
-ddg::suppress_checkpointing true # don't checkpoint LIZ DOES CHECKPOINTING WORK AT ALL?
-in::file::fullatom # read the input PDB file as a fullatom structure
-ddg::mean false # do not report the mean energy
-ddg::min true # report the minimum energy
-ddg::sc_min_only false # do not minimize only the backbone during the backbone minimization phase
-ddg::ramp_repulsive true # perform three rounds of minimization (and not just the default 1 round) where the weight on the repulsive term is increased from 10% to 33% to 100%
-mute all # optional -- silence all of the log-file / stdout output generated by this protocol
-unmute core.optimization.LineMinimizer # optional -- unsilence a particular tracer
-ddg::output_silent true # write output to a silent file
```

B) Opciones del protocolo de baja resolución

Las siguientes opciones son necesarias o recomendadas para que este ejecutable se comporte como el protocolo de la fila 3 de [Kellogg2011].

```
-in:file:s <pdbfile of the preminimized wildtype structure> # the PDB file of the structure on which point mutations should be made
-ddg::mut_file <mutfile> # the list of point mutations to consider in this run
-ddg:weight_file soft_rep_design # Use soft-repulsive weight set
-database /path/to/rosetta/main/database #the full oath to the database is required
-fa_max_dis 9.0 # optional -- if not given, the default value of 9.0 Angstroms is used.
-ddg::iterations 50 # 50 is the recommended number of iterations
-ddg::dump_pdbs true # write out PDB files for the structures, one for the wildtype and one for the pointmutant for each iteration
-ignore_unrecognized_res # optional -- if there are residues in the input PDB file that Rosetta cannot recognize, ignore them instead of quitting with an error message
-ddg::local_opt_only true # repack the residues in an 8 Angstrom shell around the site of the point mutation
-ddg::suppress_checkpointing true # don't checkpoint
-in::file::fullatom # read the input PDB file as a fullatom structure
-ddg::mean true # do not report the mean energy
-ddg::min false # report the minimum energy
-mute all # optional -- silence all of the log-file / stdout output generated by this protocol
-ddg::output_silent true # write output to a silent file
```

Salidas esperadas
================

La salida del protocolo ddg es un archivo 'ddg\_predictions.out' que contiene, para cada mutación, el ddg total predicho en [[unidades de energía de Rosetta|Units in Rosetta]] y un desglose de todos los componentes de la puntuación que contribuyen a ese total. Además, las estructuras de salida se escriben en formato silent file o pdb. Si se producen silent files, se usa la siguiente convención de nombres. Todas las estructuras del tipo silvestre se escriben en wt\_\<WT\_AA\>\<RESIDUE\_NUM\>\<MUTANT\_AA\>.out. Las estructuras del tipo silvestre se escriben siempre porque, si se hace una optimización local alrededor del sitio de la mutación, las estructuras del tipo silvestre pueden diferir entre sí debido a distintas definiciones de restricciones o de empaquetamiento. Las estructuras mutantes siguen una convención similar: mut\_\<WT\_AA\>\<RESIDUE\_NUM\>\<MUTANT\_AA\>.out. Por ejemplo, si hiciste una mutación de A a Q en el residuo 123, obtendrías como salida dos silent files: wt\_A123Q.out y mut\_A123Q.out. Esto se hace sin importar el protocolo usado.

Posprocesamiento
===============

Los valores de energía calculados con este método se dan en [[unidades de energía de Rosetta|Units in Rosetta]]. Para convertir estos valores a kcal/mol se necesita un factor de escala de 2.94, según un estudio de [Park, et al.](https://pubs.acs.org/doi/10.1021/acs.jctc.6b00819) (Sección III de la información suplementaria).

Captura del protocolo
================

Una captura del protocolo de la fila 16 del artículo de Kellogg et al. se encuentra en [[GitHub|https://github.com/Kortemme-Lab/ddg]]. Este recurso de benchmarking del Kortemme Lab también indica el desempeño esperado para distintas clases de mutación.

##Véase también

* [[cartesian ddg]]: una aplicación para predecir el ddG de mutaciones puntuales permitiendo cierta relajación de la cadena principal. 
* [[Aplicaciones de análisis | analysis-applications]]: otras aplicaciones de diseño.
* [[Escaneo de mutaciones puntuales| pmut-scan-parallel ]]: detección en paralelo de mutaciones puntuales estabilizadoras mediante diseño.
* [[Application Documentation]]: página principal de la documentación de aplicaciones.
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta.
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta.
* [[Units in Rosetta]]: una descripción de cómo maneja Rosetta las distintas unidades.
