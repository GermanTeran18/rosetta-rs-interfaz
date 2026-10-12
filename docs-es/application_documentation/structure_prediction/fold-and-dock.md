#Fold And Dock

Metadatos
========

Autor: Ingemar Andre

Este documento fue editado el 22 de agosto de 2010 por Ingemar André. Esta aplicación en Rosetta fue creada por Ingemar André. El protocolo fold-and-dock original en rosetta++ fue escrito por Rhiju Das e Ingemar André.

Código y demo
=============

El código de la aplicación fold-and-dock está en `       rosetta/main/source/src/protocols/topology_broker/FoldAndDockClaimer.cc      ` . Consulta `       rosetta/main/tests/integration/tests/fold_and_dock      ` para ver un ejemplo del protocolo fold-and/dock y de los archivos de entrada. Ejecútalo sin -run:test\_cycles para ver un ejemplo de predicción en un caso real. Fold-and-dock usa el marco del topology broker y el ejecutable real es la aplicación minirosetta, `       rosetta/main/source/src/apps/public/boinc/minirosetta.cc      `

Referencias
==========

Das R, André I, Shen Y, Wu Y, Lemak A, Bansal S, Arrowsmith CH, Szyperski T, Baker D. Simultaneous prediction of protein folding and docking at high resolution. Proc Natl Acad Sci U S A. 2009 Nov 10;106(45):18978-83. Epub 2009 Oct 28.

Propósito de la aplicación
===========================================

La aplicación predice la estructura de ensamblajes proteicos homooligoméricos simétricos a partir de la secuencia de una subunidad. Es una combinación del protocolo abinitio y del [[protocolo de ensamblaje simétrico|sym-dock]] .

Algoritmo
=========

El protocolo comienza generando una configuración inicial de ensamblaje simétrico, descrita por el archivo de definición de simetría que se da como entrada a Rosetta, usando una conformación extendida de las subunidades. Después se aleatoriza la posición de cuerpo rígido para obtener un estado inicial sin sesgo. El protocolo continúa con un ensamblaje de fragmentos según el protocolo abinitio estándar, pero lo combina con movimientos adicionales que sirven para optimizar la orientación de unión de las subunidades en el ensamblaje. Incluyen movimientos para poner las cadenas en contacto (slide-into-contact), aleatorizaciones de cuerpo rígido y movimientos para cambiar el punto de anclaje con el que las subunidades se anclan al sistema de coordenadas. La fracción de estos movimientos respecto a los movimientos de inserción de fragmentos se puede controlar con opciones. El ensamblaje de fragmentos se realiza mediante el marco del topology broker y llama al mismo código de ensamblaje de fragmentos que usa el abinitio normal. Consulta la documentación de ab-initio para una explicación adicional de cómo funciona el ensamblaje de fragmentos en Rosetta.

Según el usuario, el protocolo puede pasar después a la etapa de refinamiento de todos los átomos llamando al código de relax. El código de relax es sensible a la presencia de simetría y relaja la proteína manteniendo la simetría global del sistema.

Limitaciones: el protocolo solo funciona con estructuras simétricas. Lo más probable es que no funcione con proteínas de más de 120 residuos, a menos que haya datos experimentales adicionales.

Archivos de entrada
===========

-   fold-and-dock necesita que se le dé la secuencia de la proteína en formato fasta. Es la secuencia de una sola subunidad.

-   Además, hay que especificar la ubicación de las bibliotecas de fragmentos.

-   Hay que dar un archivo de definición de simetría que defina la simetría del sistema simulado. Normalmente no tienes conocimiento previo de la configuración de cuerpo rígido; usa el script [[make_symmdef_file_denovo|make-symmdef-file-denovo]] para generar el archivo de entrada de simetría para los tipos de simetría comunes (cíclica o diédrica). Si quieres simular una simetría que make\_symmdef\_file\_denovo no codifica, la definición de simetría se puede escribir a mano. Esto puede ser complicado, y la alternativa es analizar un complejo proteico con la misma simetría en la base de datos PDB y generar a partir de esa proteína un archivo de definición de simetría. Después, asegúrate de que la orientación inicial esté bien aleatorizada editando el archivo de definición.

Ten en cuenta que, para simetrías más complejas, puede que tengas que editar el archivo de definición para elegir en qué orden deben hacerse los movimientos de traslación (sliding-into-contact). Lee la [[Guía del usuario de simetría.|symmetry]] como referencia.

-   El protocolo fold-and-dock usa el marco del topology broker. El broker no forma parte de la versión actual de Rosetta. Sin embargo, todo lo que necesitas hacer es darle a Rosetta un archivo de entrada del broker y dar la opción -broker:setup my\_setup\_file

```
CLAIMER FoldandDockClaimer
END_CLAIMER
```

El archivo fasta y los fragmentos se suministran con más facilidad mediante opciones de línea de comandos, pero también se pueden especificar en el archivo de entrada del broker (consulta la documentación del broker para ver un ejemplo).

Opciones
=======

Opciones generales y de empaquetado
-----------------------

-   -database [file path] - la ubicación de la base de datos de Rosetta3

-   -in:file:fasta [file path] - La secuencia de la proteína de una sola subunidad

-   -file:frag3, -file:frag9 - La ubicación de las bibliotecas de fragmentos

-   -ex1, -ex2, -extrachi\_cutoff [num residues], etc. - aumentan la resolución de la biblioteca de rotámeros. Solo se usan si se llama al protocolo relax al final de fold-and-dock.

Opciones de abinitio
-------

Todas las opciones de abinitio son válidas en fold-and-dock. Consulta la documentación de abinitio para una explicación completa.

Opciones de relax
-------

Todas las opciones de Relax son válidas en fold-and-dock. Consulta la documentación de <relax> para una explicación completa.

Opciones de simetría
----------------

-   -symmetry:initialize\_rigid\_body\_dofs - Inicializa la configuración de cuerpo rígido según el archivo de definición de simetría.
-   -symmetry:perturb\_rigid\_body\_dofs ANGSTROMS DEGREES - Si quieres aplicar una perturbación de cuerpo rígido a la conformación inicial de cuerpo rígido. Rara vez tiene sentido en el contexto de la predicción de estructura de novo.

Opciones obligatorias
----------------

Las siguientes opciones siempre deben darse a Rosetta al ejecutar fold-and-dock.

```
-run:protocol broker    - Tells rosetta application to run the broker
-broker:setup               - The location of broker setup file
-database
-file:frag3
-file:frag9
-in:file:fasta
-symmetry:symmetry_definition
-symmetry:initialize_rigid_body_dofs    - Setup the rigid body system according to the symmetry definition file.
-run:reinitialize_mover_for_each_job    - Since an oligomer is made from a monomer we need to start fresh with a monomer for each simulation.
-out:file:silent_struct_type binary - Currently the only silent file type that is compatible with symmetry.
```

Opciones de fold-and-dock
---------------------

```
-fold_and_dock:rigid_body_cycles - Number of rigid bosy cycles during fold and dock fragment insertion
-fold_and_dock:move_anchor_points  - Move the anchor points that define symmetric coordinate system during symmetry fragment insertion.
-fold_and_dock:set_anchor_at_closest_point - Set the anchor points that define symmetric coordinate system to the nearest point between two consecutive chains during fragment insertion.
-fold_and_dock:rotate_anchor_to_x - Rotate the anchor residue to the x-axis before applying rigid body transformations.
-fold_and_dock:trans_mag_smooth - Translation perturbation size for smooth refineme.
-fold_and_dock:rot_mag_smooth - Rotational perturbation size for smooth refinement.
-fold_and_dock:rb_rot_magnitude - Rotational perturbation size for rigid body perturbations.
-fold_and_dock:rb_trans_magnitude Translational perturbation size rigid body perturbations.
-fold_and_dock:rigid_body_cycles - Number of rigid bosy cycles during fold and dock fragment insertion.
-fold_and_dock:rigid_body_frequency - The fraction of times rigid body cycles are applied during fragment assembly moves.
-fold_and_dock:rigid_body_disable_mc - Dissallow moves to be accepted locally by Monte Carlo criteria within the rigid body mover.
-fold_and_dock:slide_contact_frequency - The fraction of times subunits are slided together during fragment assembly moves.
```

Otras opciones útiles
-----------------------

Para calcular los rmsd respecto a una estructura de referencia, usa evaluadores:

-evaluation:rmsd\_target - El pdb de referencia. Debe ser un oligómero con el mismo número de residuos y la misma secuencia que la estructura que genera Rosetta. -evaluation:rmsd\_column - Nombre de la columna de salida en el scorefile y en el silent file de salida. evaluation:symmetric\_rmsd - Encuentra el rmsd más bajo respecto a la estructura nativa considerando todos los órdenes posibles de las cadenas. Es necesario para obtener el rms correcto en sistemas con más de 2 subunidades. Puede no ser necesario si se realiza una perturbación local o dock\_pert, siempre que la entrada tenga el orden de cadenas correspondiente. El número de cálculos de rms crece exponencialmente con el número de subunidades, así que en sistemas grandes será muy lento.

Consejos
====

Debido a los grados de libertad adicionales necesarios para definir la relación de cuerpo rígido entre las subunidades del ensamblaje, el espacio de conformaciones es mayor en fold-and-dock que en el abinitio normal con una subunidad plegada del mismo tamaño. Sin embargo, la restricción de simetría reduce radicalmente el espacio conformacional. Fold-and-dock requiere más o menos la misma cantidad de muestreo que el abinitio normal, entre 5 y 100 mil modelos. Fold-and-dock sin restricciones experimentales adicionales (como desplazamientos químicos) es eficaz por debajo de los 100 residuos.

Ejecutar fold-and-dock con datos de desplazamiento químico sigue el mismo procedimiento que el abinitio normal. Solo hay que darle a fold-and-dock bibliotecas de fragmentos seleccionadas con datos de desplazamiento químico.

En muchos sistemas no es necesario simular explícitamente todas las subunidades de los sistemas simétricos. Por ejemplo, en un dodecámero con simetría cíclica una subunidad solo interactúa con las subunidades vecinas a su izquierda o a su derecha en el anillo. Con [[make_symmdef_file_denovo|make-symmdef-file-denovo]] puedes añadir la opción -subsystem para generar una definición de simetría más pequeña para un sistema más pequeño. Con el script [[make_symmdef_file|make-symmdef-file]] esto se puede controlar ajustando con precisión la distancia de corte.

Tiempo de CPU: depende mucho del tamaño de la proteína. Para la mayoría de las proteínas será de 1 a 15 minutos por modelo. Por tanto, el tiempo de CPU para generar un paisaje de energía en embudo variaría entre 150 y 10 000 horas de CPU.

Las siguientes opciones han logrado repetir el resultado del benchmark de fold-and-dock del artículo original y son un buen punto de partida.

```
-run:protocol broker
-broker:setup
-nstruct
-out:file:scorefile
-database
-file:frag3
-file:frag9
-in:file:fasta
-symmetry:symmetry_definition
-out:file:silent
-out:file:silent_struct_type binary
-relax:fast
-relax:jump_move
-symmetry:initialize_rigid_body_dofs
-fold_and_dock::rotate_anchor_to_x // May even be a required flag...
-evaluation:rmsd_target
-evaluation:rmsd_column
-evaluation:symmetric_rmsd
-rg_reweight 0.001 // Rewight the rg scoring term. For extended structures like coiled-coils this is crucial. For global structures perhaps not as beneficial.
-rigid_body_cycles 1 // Works in conjuction with rigid_body_disable_mc
-abinitio::recover_low_in_stages 0 // The lowest energy structure is not always selected after each stage.
                This prevents overoptimization of low-resolution energy but may not be optimal for all cases.
-rigid_body_frequency 5
-rigid_body_disable_mc  //  Makes sure that the rigid body moves are accepted by the same Monte Carlo process as the fragment sampling.
                This prevents overoptimization of low-resolution energy but may not be optimal for all cases.
-run:reinitialize_mover_for_each_job
```

Salidas esperadas
================

El protocolo produce un silent file junto con un scorefile. El estado de salida normal del protocolo proviene del distribuidor de trabajos jd2, con un mensaje como «You'll see the jd2 x jobs completed in y seconds message if successfully completed». Si ejecutas con salida pdb, se generarán estructuras pdb adicionales: before\_repack.pdb, init\_dofs.pdb, etc. Las genera, como salida de depuración, el protocolo general de muestreo de fragmentos de Rosetta al que llama fold-and-dock. No uses salida pdb en ejecuciones de producción.

Posprocesamiento
===============

Para fold-and-dock se usan los mismos procedimientos que para el abinitio normal. Si tienes una referencia nativa, genera un gráfico de puntuación frente a rmsd y busca un embudo. Sin estructura de referencia, agrupa los 200-400 modelos de menor energía con la [[aplicación cluster|cluster]] (en algunos casos puede que quieras calcular un rms simétrico durante el agrupamiento. Añade -symmetry:symmetric\_rmsd como opción a la aplicación cluster).


##Véase también

* [[Fasta file]]: Formato de archivo Fasta
* [[Fragment file]]: Formato de archivo de fragmentos (necesario para la predicción de estructura ab initio)
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura
  * [[Abinitio relax]]: Predice la estructura de una proteína a partir de su secuencia
    * [[Abinitio]]: Detalles sobre esta aplicación
  * [[NonlocalAbinitio]]: Aplicación para predecir la estructura de una proteína a partir de información estructural previa
  * [[Membrane abinitio]]: Ab initio para proteínas de membrana.  
  - [[Comparative modeling|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado (usa la aplicación minirosetta).
    * [[Minirosetta]]: Más información sobre la aplicación minirosetta.
  * [[Metalloprotein ab initio|metalloprotein-abrelax]]: Modelado ab initio de metaloproteínas.  
  - [[Backrub]]: Crea conjuntos de cadenas principales mediante cambios pequeños y locales en la cadena principal.  
  - [[Floppy tail]]: Predice estructuras de regiones largas y flexibles en el extremo N o C.
  - [[Fold-and-dock]]: Predice estructuras tridimensionales de homooligómeros simétricos.  
  - [[Molecular replacement protocols|mr-protocols]]: Usa Rosetta para construir modelos para el reemplazo molecular en cristalografía de rayos X.  
    * [[Prepare template for MR]]: Script de preparación para los protocolos de reemplazo molecular.  
  - [[Relax]]: Optimiza «localmente» las estructuras, incluida la asignación de posiciones de las cadenas laterales.
* [[Docking applications]]
  - [[Camelid Antibody Modeling|antibody-mode-camelid]]: Docking de anticuerpos con sus antígenos
  - [[SnugDock | snugdock]]: Optimización de la estructura del paratopo durante el docking anticuerpo-antígeno
  - [[Ligand docking|ligand-dock]] (RosettaLigand): Determina la estructura de complejos proteína-molécula pequeña.  
    * [[Extract atomtree diffs]]: Extrae estructuras del formato de archivo AtomTreeDiff.
    - [[Docking Approach using Ray-Casting|DARC]] (DARC): Método de docking para dirigirse específicamente a sitios de interacción de proteínas.
    - [[Flexible peptide docking|flex-pep-dock]]: Docking de un péptido flexible a una proteína.
    - [[Protein-Protein docking|docking-protocol]] (RosettaDock): Determina las estructuras de complejos proteína-proteína mediante perturbaciones de cuerpo rígido.  
      * [[Docking prepack protocol]]: Prepara estructuras para el docking proteína-proteína.  
    - [[Symmetric docking|sym-dock]]: Determina la estructura de homooligómeros simétricos.  
    - [[Chemically conjugated docking|ubq-conjugated]]: Determina las estructuras de proteínas conjugadas con ubiquitina.  
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
