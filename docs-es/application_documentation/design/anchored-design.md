#Aplicación AnchoredDesign

#####Metadatos

Autor: Steven Lewis (smlewi - at - gmail.com)

Código y documentación de Steven Lewis (smlewi - at - gmail.com).
El investigador principal fue Brian Kuhlman, (bkuhlman - at - email.unc.edu) .

Ejemplos de ejecución y ubicación del código
===============================
<!-- this is not in backticks for code boxes because it shatters the wrapping-->
El código fuente del ejecutable está en Rosetta/main/source/src/apps/public/interface_design/anchored_design/AnchoredDesign.cc. 
La mayor parte del código está en las bibliotecas de Rosetta/main/src/protocols/anchored_design/. 
Hay una [[prueba de integración|integration tests]] en Rosetta/main/main/tests/integration/tests/AnchoredDesign/ que funciona como una pequeña demo. 
Hay demos más extensas y con más documentación en `Rosetta/demo/protocol_capture/anchored_design`, `Rosetta/demo/public/anchored_design` y `Rosetta/demo/public/domain_insertion`, que están en línea en TODO: añadir los enlaces a las tres demos en línea.

Referencias
==========

-   [Lewis SM, Kuhlman BA. Anchored design of protein-protein interfaces. PLoS One. 2011;6(6):e20872. Epub 2011 Jun 17.](http://www.ncbi.nlm.nih.gov/pubmed/21698112) (enlace a PubMed)

Este artículo describe cómo funciona el código y las pruebas de referencia computacionales de los aspectos del protocolo que no son de diseño.

-   [Gulyani A, Vitriol E, Allen R, Wu J, Gremyachinskiy D, Lewis S, Dewar B, Graves LM, Kay BK, Kuhlman B, Elston T, Hahn KM. A biosensor generated via high-throughput screening quantifies cell edge Src dynamics. Nat Chem Biol. 2011 Jun 12;7(7):437-44. doi: 10.1038/nchembio.585.](http://www.ncbi.nlm.nih.gov/pubmed/21666688) (enlace a PubMed)

Este artículo describe la generación de un biosensor cuyo modo de actividad se explica con la ayuda de modelos derivados de AnchoredDesign.

Propósito y algoritmo
=====================

AnchoredDesign es el protocolo principal del que se trata aquí. Este protocolo está pensado para diseñar interfaces entre estructuras diana conocidas y nuevos compañeros de unión, usando un "ancla" formada por residuos injertados de un compañero de unión conocido de la diana en el nuevo andamiaje. La idea es que esto reduzca el espacio conformacional que hay que explorar y evite el problema del docking, sin dejar de dar libertad para diseñar la interfaz según sea necesario. El ancla debe injertarse en un loop de superficie del andamiaje (consulta la [[aplicación AnchoredPDBCreator|anchored-pdb-creator]]). El remodelado de loops del loop de ancla moverá el andamiaje respecto a la diana, exponiendo distintas partes de sus superficies entre sí. También está implementado el remodelado de loops de otros loops de superficie (sin ancla). Esto nos permite diseñar una nueva interfaz con cadena principal flexible entre nuevos compañeros de unión.

Archivos de entrada
===========

Consulta las ejecuciones de ejemplo de arriba para un uso más específico.  TODO: ancla de página

AnchoredDesign requiere como entradas una estructura inicial, una especificación del ancla y una especificación de loops (consulta la [[aplicación de modelado de loops|loopmodel]] y el [[archivo de loops|loops file]]). La estructura inicial debe tener el ancla injertada en el andamiaje (consulta la [[aplicación AnchoredPDBCreator|anchored-pdb-creator]] y su documentación), y el ancla debe estar correctamente acoplada (docking) respecto a la diana. La interacción ancla/diana NO CAMBIARÁ, ya que se obtuvo de una estructura cristalina. La relación entre el andamiaje y el resto del sistema se trata de forma flexible; el andamiaje debe estar conectado al ancla, pero no importa que el andamiaje choque terriblemente con la diana (el protocolo lo resolverá).

Ten en cuenta que el protocolo AnchoredDesign respeta los campos start, end, cut y extended del [[archivo de loops|loops file]]. Ignora el campo skip_rate.

La especificación del ancla es un archivo de una línea con tres valores delimitados por espacios en blanco: la letra de la cadena y los residuos inicial y final del ancla. Así:

`       B 442 445      `

Asumirá que existe PDBInfo, así que si tienes silent files, prueba a numerar desde 1.

Opciones
=======

AnchoredDesign tiene su propio espacio de nombres de opciones y también admite las opciones generales de Rosetta (empaquetado, etc.)

Opciones de AnchoredDesign

-   anchor - string - archivo del ancla
-   refine_only - boolean - no ejecuta el paso de perturbación
-   show_extended - boolean - muestra el pdb de "loops extendidos"; se usa como comprobación al hacer benchmarks de predicción de estructuras
-   perturb_temp - real - temperatura de Monte Carlo para la fase de perturbación
-   perturb_cycles - unsigned integer - número de ciclos de la fase de perturbación
-   perturb_show - boolean - si es true, escribe los Poses centroid tras la perturbación
-   debug - debug - modo de depuración (comprobaciones extra y volcados de pdb)
-   refine_temp - real - temperatura de Monte Carlo para la fase de refinamiento
-   refine_cycles - unsigned integer - número de ciclos de la fase de refinamiento
-   refine_repack_cycles - unsigned integer - realiza un reempaquetado/minimización cada N ciclos del modo de refinamiento
-   allow_anchor_repack - boolean - desactivada por defecto; permite reempaquetar el ancla
-   vary_cutpoints - boolean - desactivada por defecto; elige automáticamente nuevos puntos de corte en cada trabajo. Muy útil para ejecuciones grandes o con MPI.
-   no_frags - boolean - desactiva todos los movimientos de fragmentos (por defecto se toman los fragmentos de un archivo de fragmentos de estilo antiguo o se generan automáticamente con el fragment picker)
-   VDW_weight - real - peso del término de puntuación VDW en modo centroid; el valor por defecto es 1, pero estoy probando si 2 da mejores resultados

Estas cuatro opciones booleanas permiten desactivar el cierre de loops KIC o CCD en las etapas de perturbación y refinamiento:

-   perturb_KIC_off
-   perturb_CCD_off
-   refine_KIC_off
-   refine_CCD_off

AnchoredDesign tiene un subespacio de nombres para el filtrado:

-   filters::score - real - no escribe trayectorias con una puntuación superior a este valor
-   filters::sasa - real - no escribe trayectorias cuyos delta sasa de la interfaz sean inferiores a este valor
-   filters::omega - boolean - no escribe trayectorias en las que alguna torsión omega de un loop se desvíe más de 30 grados de trans

Estas opciones activan el muestreo por vecindad en el cierre cinemático de loops. (Por defecto se usan muestras aleatorias de la distribución de Ramachandran para las torsiones del loop que no son pivote; estas opciones, en cambio, perturban ligeramente el loop existente). 
Esto casi con seguridad está desactualizado debido al desarrollo del cierre de loops [[Next Generation KIC]].

-   loops::vicinity_sampling - bool - activa el muestreo por vecindad
-   loops::vicinity_degree - real - rango en grados de la perturbación; por defecto es 1 grado

Opciones generales: se respetan todas las opciones del espacio de nombres packing que carga el PackerTask. Se respetan las opciones del espacio de nombres jd2. Se respeta cualquier cosa de muy bajo nivel, como las rutas de la base de datos.

-   packing::resfile - string - un [[resfile|resfiles]], si quieres usar uno
-   in::file::frag3 - string - fragmentos, si los tienes
-   run::min_type - string - tipo de minimizador. Se usa dfpmin_armijo_nonmonotone para producción.
-   loops::loop_file - string - [[archivo de loops|loops file]]

Las opciones de PoseMetricCalculator incluyen:

-   pose_metrics::interface_cutoff - real - profundidad de la interfaz para determinar dónde reempaquetar
-   pose_metrics::neighbor_by_distance_cutoff - real - profundidad de vecindad del loop para determinar dónde reempaquetar

Consejos
====

-   Tienes tres opciones para los fragmentos. Si no dices nada, se generan fragmentos automáticamente (conviene al diseñar los loops). Se usa el fragment picker para elegir los 4000 mejores fragmentos de loop y se usan en todos los marcos de loop. Si pasas un archivo de fragmentos, se usa ese (conviene para secuencias conocidas). Si pasas no\_frags, no se usan fragmentos.
-   AnchoredDesign admite el filtrado. Todos son filtros posteriores al protocolo. Por defecto no hay ningún filtro activo; al pasar un argumento se activan de forma independiente. Un filtro fallido provoca que se devuelva FAIL_RETRY al distribuidor de trabajos, lo que desencadena volver a ejecutar ese nstruct desde un nuevo punto del RNG. El filtrado NO acelera tus trayectorias.
-   AnchoredDesign usa LoopAnalyzerMover e InterfaceAnalyzerMover para informar de la calidad de la interfaz y de los loops. Esta información se añade a los PDB de salida.
-   Sugiero -unmute protocols.loops.CcdLoopClosureMover, para obtener información extra sobre qué loop está intentando CCD. KIC informa por defecto.

Modelado de fluoróforos
====================

Esta sección describe los cambios para los experimentos de modelado de fluoróforos ([Gulyani A, Vitriol E, Allen R, Wu J, Gremyachinskiy D, Lewis S, Dewar B, Graves LM, Kay BK, Kuhlman B, Elston T, Hahn KM. A biosensor generated via high-throughput screening quantifies cell edge Src dynamics. Nat Chem Biol. 2011 Jun 12;7(7):437-44. doi: 10.1038/nchembio.585.](http://www.ncbi.nlm.nih.gov/pubmed/21666688) (enlace a PubMed)).

En estos experimentos se unió químicamente un colorante a una cisteína de un loop. En Rosetta esto se modeló como un [[aminoácido no canónico|noncanonical-amino-acids]] (el conjugado colorante-cisteína). Hay que hacer algunos cambios para acomodar un aminoácido no canónico en un loop flexible. Estos cambios se centran sobre todo en sustituir los términos dunbrack y rama para ese residuo:

-   Tienes que crear el archivo params y la [[biblioteca de rotámeros|make-rot-lib]] para el conjugado fluoróforo no canónico. Eso queda fuera del alcance de esta documentación. Yo usé el estilo de archivo pdb de rotámeros, no el estilo de biblioteca de Dunbrack.
-   Usa la opción AnchoredDesign::akash::dye_pos para indicar al protocolo la ubicación del colorante. El movemap usado durante la minimización evitará que este residuo se minimice (para reflejar que no existe un gráfico de Ramachandran de ese residuo).
-   Si usas el modelado de loops KIC y NO usas el muestreo por vecindad, modifica la función src::core::scoring::Ramachandran::random_phipsi_from_rama(AA const res_aa, Real & phi, Real & psi). Debes hacer que detecte el caso en que res_aa es aa_unk y lo restablezca a algún otro tipo de residuo apropiado para tu residuo no canónico (o alanina, que probablemente basta). Tendrás que modificar la firma de la función para quitar el const del parámetro AA (o hacer una copia interna, lo que prefieras).

Anclaje mediante restricciones
========================

El código puede mantener el ancla en su sitio mediante restricciones, en lugar del bloqueo rígido a través del FoldTree. Mantendrá un ancla rígida en la fase de perturbación centroid pase lo que pase (no me fío tanto de la función de puntuación centroid), pero permitirá el movimiento interno de la cadena principal del ancla, así como el movimiento de cuerpo rígido, en modo con todos los átomos. Sugiero usar restricciones fuertes y ajustadas para mantener el ancla en su sitio. Usa estas opciones:

-   allow_anchor_repack (como arriba, para permitir el reempaquetado si la cadena principal es libre)
-   constraints:cst_file - filename - para especificar restricciones
-   constraints:cst_weight - Real - peso del término de puntuación de las restricciones
-   anchor_via_constraints - boolean - para activar el modo de restricciones

Salidas esperadas
================

AnchoredDesign debería producir nstruct estructuras de resultado. Si usaste el JobOutputter predeterminado, obtendrás PDB con la información de puntuación incrustada y un scorefile que resume la mayor parte de la información de puntuación.

Posprocesamiento
===============

Hay tres clases de salida etiquetadas al final de los PDB o en el scorefile:

-   términos de la función de puntuación
-   salida de LoopAnalyzerMover,
-   salida de InterfaceAnalyzerMover.

La función de puntuación te indica lo que las funciones de puntuación estándar de Rosetta consideran mejor, y es útil para la primera ordenación de estructuras. Por lo general, solo las estructuras del mejor porcentaje por total_score deben analizarse más. Aun así, deben examinarse los demás términos de la función de puntuación (listados al final del PDB y en el scorefile) para descartar modelos que tengan puntuaciones especialmente malas en cualquier ámbito: un modelo que es bastante bueno en conjunto, pero tiene un choque grave (fa_rep) en un residuo concreto, puede merecer ser descartado.

A continuación, usa la salida de LoopAnalyzerMover para filtrar los cierres de loop malos (que la función de puntuación de Rosetta detecta de forma insuficiente).  Puedes leer sobre él [[aquí|LoopAnalyzerMover]].

Por último, InterfaceAnalyzer también coloca resultados al final del archivo PDB; puedes leer sobre él aquí: [[Documentación de la aplicación InterfaceAnalyzer|interface-analyzer]] . De nuevo, descarta los modelos con interfaces deficientes según lo determinado por InterfaceAnalyzer.

Opciones para modos de prueba, depuración y experimentales
================================================

No se recomienda el uso público de estos modos.

-   -delete_interface_native_sidechains (booleano, por defecto false): esta opción elimina las cadenas laterales nativas cercanas a la interfaz de la entrada reempaquetando sin -use_input_sc. Generalmente se recomienda -use_input_sc para AnchoredDesign, con el fin de conservar rotámeros minimizados; este paso de olvido es útil en benchmarks para evitar que se filtre información no deseada del complejo inicial.
-   -RMSD_only_this (file): esta opción toma la ruta de una segunda estructura de entrada. AnchoredDesign omite sus pasos de modificación y solo hace las comparaciones finales de RMSD (con esta estructura).
-   -super_secret_fixed_interface_mode (booleano, por defecto false): esta opción activa un modo con un FoldTree alterado que no ancla la interfaz. Funcionalmente permite el rediseño "normal" de loops de interfaz (algo que el ejecutable de diseño de loops no hace, aunque RosettaScripts sí).
-   -randomize_input_sequence (booleano, por defecto false): esta opción aleatoriza la secuencia de entrada de las posiciones diseñables a algo dentro de su rango mutacional definido en el resfile. Fuerza HIS_D en lugar de HIS para evitar la aparición doble de HIS; todos los residuos canónicos y no canónicos permitidos se ponderan por igual (a menos que tengas residuos no canónicos que finjan ser histidina). Es útil porque, incluso con el modo de extensión del loop, el término rama de la función de puntuación centroid "sabrá" cómo debería ser un loop de la secuencia de entrada aunque no haya cadenas laterales. AnchoredDesign normalmente solo toca la secuencia después del modo centroid, lo que puede ser demasiado tarde para evitar la recuperación no deseada de un loop o estructura nativos.

Cambios desde la última versión
==========================

Rosetta 3.3 es la primera versión. Se añadieron modos de benchmark para la 3.4 (creo). Para la 3.5 ya se habían creado varias opciones de prueba.

##Véase también

* [[AnchorFinder | anchor-finder ]]: localiza anclas plausibles en interfaces proteína-proteína.
* [[AnchoredPDBCreator | anchored-pdb-creator ]]: crea la entrada para esta aplicación.

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
