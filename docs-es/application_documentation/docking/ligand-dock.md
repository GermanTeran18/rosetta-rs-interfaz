#Aplicación Ligand\_dock


##NOTA: Ya no se recomienda usar esta aplicación para el docking de ligandos. Usa [[RosettaScripts]] en su lugar. Consulta [[HighResDockerMover]] como ejemplo.

Metadatos
=========

Este documento fue escrito el 4 de febrero de 2008 por Ian W. Davis.

Última edición el 6/10/14 por Jared Adolf-Bryfogle.

Puedes encontrar un tutorial introductorio sobre el docking de ligandos [aquí](https://www.rosettacommons.org/demos/latest/tutorials/ligand_docking/ligand_docking_tutorial).


Ejecuciones de ejemplo
======================

Consulta `       rosetta/main/tests/integration/tests/ligand_dock_7cpa      ` para ver un ejemplo de ejecución de docking y sus archivos de entrada. Ten en cuenta que las opciones que aparecen allí NO reflejan las mejores prácticas actuales, y que las opciones de este documento son una guía mejor.

Referencias bibliográficas
==========================

-   Jens Meiler and David Baker (2006). "ROSETTALIGAND: Protein-Small Molecule Docking with Full Side-Chain Flexibility" Proteins 65, 538-548.
-   Ian W. Davis and David Baker (2008). "ROSETTALIGAND docking with full ligand and receptor flexibility" J Mol Biol 385, 381-392.
-   Ian W. Davis et al. (2009). "Blind docking of pharmaceutically relevant compounds using RosettaLigand" Protein Sci 18, 1998-2002.

Errores conocidos y limitaciones
================================

Seguro que hay muchos. En particular, actualmente está diseñada para un único ligando como un único residuo, que debe ser el último del archivo. Gordon Lemmon, Kristian Kaufmann y Andrew Leaver-Fay están implementando ligandos de varios residuos (junio de 2008).  

Ten en cuenta que gran parte del desarrollo continuo de RosettaLigand se realiza en la interfaz de RosettaScripts. Consulta Combs, DeLuca, et al (2013). "Small molecule ligand docking into comparative models with Rosetta." Nature Protocols.    


**Consejos para ejecutar RosettaLigand mediante [[RS | Movers-RosettaScripts#ligand-centric-movers]]**

_ScoreFunction_


Asegúrate de usar la opción -restore_pre_talaris_defaults y la función de puntuación del artículo.  También puedes experimentar con orbitals_talaris1013 (con la opción -add_orbitals y sin -restore_pre_talaris_defaults), aunque todavía no se ha optimizado para este fin.

Si usas otras funciones de puntuación, asegúrate de añadir estos términos:

   coordinate_constraint 1.0
   atom_pair_constraint 1.0
   angle_constraint 1.0
   dihedral_constraint 1.0
   chainbreak 1.0

_Generación de confórmeros_


Generar confórmeros de tu ligando es muy importante.  Sin embargo, hay una gran variedad de herramientas disponibles para hacerlo.  Consulta Ebejer et al, "Freely Available Conformer Generation Methods: How Good Are They?" J Chem Info and Modeling.  Además, MOE y openeye omega parecen funcionar bien y son populares en la bibliografía si tienes licencia.

Cómo llevarlos a Rosetta:

Actualmente, regeneras las conformaciones del ligando con la herramienta de generación de confórmeros que prefieras (yo uso MOE, a algunas personas les gusta openeye omega, hay muchas opciones) y luego escribes esas conformaciones como un archivo pdb, con las conformaciones separadas por registros TER.  Después añades una línea PDB_ROTAMERS a tu archivo params, así:

PDB_ROTAMERS path.pdb

donde path.pdb es el archivo pdb que contiene tus rotámeros. Esta ruta es relativa al archivo params (yo suelo guardarlos en el mismo directorio).  Estos confórmeros se importarán como una biblioteca de rotámeros de un solo residuo y el packer puede muestrearlos, o se pueden muestrear manualmente (como ocurre en el docking de baja resolución)


Propósito de la aplicación
===========================================

Esta aplicación toma una estructura receptora (normalmente una proteína) y una molécula pequeña, e intenta encontrar una conformación y una orientación relativa de cada una que minimicen la función de puntuación de Rosetta. Las aplicaciones típicas incluyen el diseño de fármacos basado en la estructura y, quizá, un paso del diseño de enzimas. El cribado virtual puede ser posible, pero requerirá enormes recursos computacionales. Tanto el cribado virtual como la predicción de afinidad requieren formas robustas de comparar puntuaciones entre ligandos distintos, que tienen tamaños diferentes (más átomos = más posibles interacciones favorables) y números diferentes de enlaces rotables (lo que afecta a la entropía de la unión); todavía no he abordado este problema. Con este código solo se han probado receptores proteicos y ligandos similares a fármacos. Los ligandos deberían tener, en general, menos de 40 átomos distintos de hidrógeno y menos de 10 enlaces rotables. Se pueden usar ligandos más grandes y más flexibles, pero los resultados suelen empeorar cuanto mayor es el ligando.

Algoritmo
=========

El algoritmo es similar al de Meiler & Baker 2006, salvo que con muchos menos ciclos de refinamiento; los detalles completos del algoritmo de docking de cadena principal flexible aparecen en Davis & Baker 2008. La posición de partida del ligando se puede especificar de forma explícita (`-docking:ligand:start_from X Y Z`) o implícita (coordenadas iniciales del archivo PDB). Después se perturba normalmente en una cantidad relativamente grande, especificada por el usuario (ver las opciones de ejemplo, más abajo), para explorar todo el bolsillo de unión. Luego comienza la minimización Monte Carlo: durante 6 ciclos, el ligando se perturba ligeramente, se reempaquetan las cadenas laterales y, si la energía no ha aumentado demasiado, se minimizan todos los grados de libertad. Los ciclos 1 y 4 reciben un reempaquetado completo; los demás solo reciben pruebas de rotámeros. Si se proporcionan rotámeros del ligando, el ligando también puede empaquetarse. Cada ciclo va seguido de una aceptación o rechazo de Monte Carlo. Al final, se recupera el Pose de menor energía y se minimiza más. Si se va a minimizar la cadena principal de la proteína, esta solo se mueve durante esta minimización final. La interpretación de las puntuaciones de salida se describe más abajo.

Descripción general
===================

Esta es una «lista de comprobación» para preparar un experimento de docking de ligandos. Más abajo se dan los detalles de todos los pasos.

1.  Reformatear las estructuras de partida
    1.  Receptor proteico en formato PDB, sin aguas ni cofactores; cada ion metálico debe tener un ID de cadena único.
    2.  Los cofactores, si los hay, deben estar en formato .sdf o .mol2, con las coordenadas tomadas del archivo PDB original.
    3.  Los ligandos que se van a acoplar deben estar en formato .sdf o .mol2, un ligando por archivo. Si intentas reproducir un modo de unión conocido, deben usarse las coordenadas de ese ligando.

2.  Preparar los ligandos y los cofactores
    1.  Generar confórmeros si se desea. Todos los confórmeros deben estar en el mismo .sdf / .mol2; un archivo por compuesto. Los tautómeros / protómeros cuentan como compuestos distintos.
    2.  Asignar cargas parciales si se desea. Solo se usan las cargas de la primera entrada del archivo. Las cargas solo se pueden leer de archivos .mol2.
    3.  Convertir el .sdf / .mol2 en un archivo .params y uno o más archivos .pdb. El .params describe los tipos de átomo, las cargas y los enlaces rotables; los archivos .pdb contienen las coordenadas del ligando.
    4.  Crear una biblioteca de confórmeros del ligando si se desea. Concatenar las coordenadas deseadas en formato PDB y añadir una línea "PDB\_ROTAMERS ..." al archivo .params.

3.  Preparar los receptores
    1.  Reempaquetar todo el receptor en presencia de cofactores pero en ausencia de ligandos.
    2.  Elegir el resultado de menor energía para usarlo como estructura reempaquetada.
    3.  Yo reempaqueto ejecutando [[relax]] con la opción de secuencia

4.  Generar los archivos de entrada para Rosetta
    1.  Archivos .params de los ligandos
    2.  Bibliotecas de confórmeros de los ligandos (normalmente \*\_confs.pdb)
    3.  PDB de entrada: proteína reempaquetada + conformación del ligando generada
    4.  PDB nativo: coordenadas experimentales de la proteína y del ligando (opcional, para calcular el RMSD)
    5.  PDB no unido: proteína experimental sin ligando (opcional)
    6.  Archivo de opciones de Rosetta (normalmente FLAGS.txt)

5.  Ejecutar las trayectorias de docking
6.  Analizar los resultados
    1.  Concatenar los archivos silent.out para obtener uno por cada emparejamiento ligando/receptor.
    2.  Extraer la información de puntuación y de RMSD; hacer gráficos de dispersión.
    3.  Agrupar en clústeres las conformaciones del ligando.
    4.  Estimar la confianza del docking.

Preparación automática de RosettaLigand (ARLS)
==============================================

-Obsoleto- (sigue funcionando, simplemente ya no se recomienda en general)
La mayoría de los pasos para preparar una ejecución de docking de RosettaLigand se han automatizado con el script `       arls.py      ` (`rosetta/main/source/src/apps/public/ligand_docking/`, ejecútalo con –help para ver instrucciones breves). Para quienes prefieran un enfoque manual, los pasos individuales se detallan en las secciones siguientes.

Las entradas de ARLS son estructuras *apo* de proteínas (.pdb) y archivos de cofactores y de ligandos (.mol, .sdf o .mol2). Yo suelo usar PyMOL para editar las proteínas, [OpenBabel](http://openbabel.org/) para convertir los ligandos PDB a SDF y [Avogadro](https://avogadro.cc/) para corregir cualquier error del SDF (todos son gratuitos). También necesitas un archivo con una línea por cada caso de docking, que indique el nombre de la proteína, el nombre o nombres de los cofactores, si los hay, y el nombre del ligando (sin extensiones de archivo). Este archivo muestra el docking de varios compuestos en una estructura apo de la farnesil transferasa, incluyendo en la mayoría de los casos un pirofosfato de farnesilo como cofactor:

```
1fpp 1mzc_FPP 1o5m
1fpp 1mzc_FPP 1s63
1fpp          1s64
1fpp 1mzc_FPP 1sa4
```

En el mismo directorio se encuentran 1fpp.pdb, 1mzc\_FPP.sdf, 1o5m.sdf, 1s63.sdf, etc.

Ejecutar ARLS con esta lista produce una colección de scripts que automatizan las etapas del proceso de docking:

-   1\_setup.sh – Crea los archivos de parámetros y las bibliotecas de rotámeros de los cofactores y los ligandos. Usa Omega de OpenEye para generar confórmeros, si está disponible.
-   2\_prepack\_minimize.sh – Prepara la(s) proteína(s) para el docking reempaquetando las cadenas laterales y minimizando. Opcional pero recomendado. Usará varios procesadores si se le da -jN a arls.py.
-   3\_tarball\_pre.sh – Reúne los archivos de entrada generados para transferirlos a un clúster de cómputo como SYD.
-   4\_dock\_condor.sh – Crea la estructura de directorios de salida y el script de envío CONDOR.dock para los trabajos de docking. Por ahora no se admiten otros sistemas de colas, pero al menos puedes usarlo como guía.
-   5\_concat.sh – Reúne la salida de los procesos individuales en un archivo por cada par proteína-ligando y crea un tarball para copiarlo y analizarlo.
-   6\_analyze\_results.sh – Automatiza algunos pasos de análisis habituales. Extrae tablas de puntuaciones en estilo hoja de cálculo, usa R para graficar la energía de unión frente al RMSD, estima si cada docking ha tenido éxito y extrae los PDB de los Poses con mejor puntuación.

Además, las opciones de Rosetta que controlan los pasos de prepaquetado y de docking se escriben en algunos archivos \*.flags. El significado de la mayoría de las opciones está comentado en esos archivos.

ARLS usa una variedad de otros binarios y scripts para hacer su trabajo. Normalmente debería poder encontrar el código fuente de Rosetta, pero puede que necesite ayuda para encontrar /path/to/rosetta/main/database y las herramientas de OpenEye; consulta –mini, –database y –openeye. Si no tienes las herramientas de OpenEye, debes usar –skip-omega y –skip-charges. En ese caso, tendrás que asegurarte de que los archivos de entrada de moléculas pequeñas ya contengan todos los confórmeros que quieras considerar. También debes proporcionar cargas parciales (usa el formato .mol2); de lo contrario obtendrás las cargas predeterminadas de Rosetta (de proteína).

Preparación del ligando de molécula pequeña para el docking
===========================================================

Rosetta define la topología del ligando, los enlaces rotables, los tipos de átomo, las cargas parciales, etc. en un archivo .params; las coordenadas iniciales se almacenan en formato PDB. Se ha proporcionado un script llamado `       molfile_to_params.py      ` en `       rosetta/main/source/scripts/python/public/      ` para ayudar a generar estos archivos a partir de un formato típico de molécula pequeña (.mol, .sdf o .mol2).

En la mayoría de los casos se parte de una conformación 3D aleatoria o de una fórmula química 2D o 1D (p. ej., SMILES) y hay que generar una biblioteca de conformaciones plausibles y de baja energía. Yo uso Omega de OpenEye, así:

```
~/openeye/bin/omega2 -in 1t3r.sdf -out 1t3r_confs.mol2 -commentEnergy -includeInput
```

Luego uso la implementación AM1-BCC de OpenEye para calcular las cargas parciales. (Debes tener una licencia válida y las bibliotecas de OpenEye y los enlaces de Python instalados para usar assign\_charges.py; puedes sustituirlo por otro programa que prefieras.) Los pasos posteriores solo usan las cargas parciales del primer confórmero del archivo .mol2, así que no tiene sentido calcular las cargas de todos los confórmeros. Si todas las cargas se dejan en cero o sin asignar (es decir, si omites este paso), se usarán las cargas parciales predeterminadas de los tipos de átomo de Rosetta.

```
~/rosetta/main/source/src/apps/public/ligand_docking/assign_charges.py < 1t3r_confs.mol2 > 1t3r_charges.mol2
```

Se pueden añadir al archivo registros especiales para especificar la raíz del árbol de átomos o dividir la molécula en varios residuos, pero por ahora no suelen usarse. Por lo demás, `       molfile_to_params.py      ` se controla con parámetros de la línea de comando.

```
~/rosetta/main/source/scripts/python/public/molfile_to_params.py -n DAR -k 1t3r.kin -p 1t3r 1t3r_charges.mol2
```

`       -n      ` indica el código de tres letras que se usará como nombre de residuo del PDB, `       -p      ` controla el nombre de los archivos de salida y `       -k      ` genera una ilustración kinemage del ligando (opcional, pero útil para depurar; consulta [http://kinemage.biochem.duke.edu](http://kinemage.biochem.duke.edu) para descargar KiNG y visualizarla).

Si quieres usar todos los confórmeros en el packer de Rosetta durante la ejecución de docking, debes concatenarlos todos en un solo archivo y añadir una línea PDB\_ROTAMERS al final del archivo .params. De lo contrario, solo se usará la conformación del PDB de entrada.

Como uso `       -includeInput      ` con Omega, tengo que omitir las coordenadas cristalográficas del ligando (`       1t3r_0001.pdb      `) de la biblioteca de confórmeros del ligando. En los benchmarks de docking, esas coordenadas se pueden usar para la estructura de referencia («nativa»), de modo que Rosetta calcule valores de RMSD con sentido.

```
mkdir conf1
mv 1t3r_0001.pdb conf1/
cat 1t3r_????.pdb > 1t3r_confs.pdb
echo "PDB_ROTAMERS 1t3r_confs.pdb" >> 1t3r.params
```

Al ejecutar Rosetta, los archivos 1t3r.params y 1t3r\_confs.pdb deben estar en el mismo directorio.

Preparación del receptor proteico para el docking <a name="ligand_rpkmin" />
=================================================

Durante el docking solo se reempaquetan las cadenas laterales cercanas a la posición inicial del ligando, para ahorrar tiempo. Esto significa que *todas* las cadenas laterales deben reempaquetarse antes del docking, de modo que se resuelvan los choques preexistentes (según la función de energía de Rosetta). De lo contrario, un ligando colocado cerca de los residuos con choques les permitirá reempaquetarse y ganar así una gran bonificación de energía que no refleja con precisión su afinidad de unión en esa posición. Para ello se proporciona el programa `       ligand_rpkmin      `; se deben usar las mismas opciones `       -ex#      ` que se usarán durante el docking.

```
~/rosetta/main/source/bin/ligand_rpkmin.macosgccrelease -database ~/rosetta/main/database/ -ex1 -ex2 -ex1aro -extrachi_cutoff 1 \
  -no_optH false -flip_HNQ -docking:ligand:old_estat -docking:ligand:soft_rep -nstruct 10 -s 1t3r.pdb
```

El PDB de entrada debe constar de la(s) cadena(s) de proteína, cada una con su propio ID de cadena, seguida de los iones metálicos (los nombres de residuo del PDB deben estar alineados a la derecha, p. ej. " ZN" o " MG") o de los cofactores, también con sus propios ID de cadena únicos. Los archivos de parámetros de los cofactores deben prepararse igual que los de los ligandos y aquí se deben usar las coordenadas PDB generadas (el confórmero \*\_0001.pdb serán las coordenadas de entrada si usaste -includeInput con Omega). Las bibliotecas de confórmeros de los cofactores no son necesarias y normalmente no son deseables (sin línea PDB\_ROTAMERS en el archivo .params). Los ligandos que se van a acoplar deben omitirse para evitar sesgar el docking hacia la estructura conocida. Algunas cadenas laterales pueden reempaquetarse hacia el bolsillo de unión; el algoritmo de docking las apartará según sea necesario.

Como el reempaquetado es estocástico, normalmente genero 10 estructuras por receptor y elijo la de menor energía:

```
$ awk '/^pose / {print FILENAME, $NF}' 1t3r*.pdb | sort -nk2
    1t3r_0010.pdb -623.12
    1t3r_0008.pdb -622.922
    1t3r_0007.pdb -622.865
    1t3r_0003.pdb -622.818
    1t3r_0001.pdb -622.749
    1t3r_0002.pdb -622.446
    1t3r_0009.pdb -622.234
    1t3r_0005.pdb -621.866
    1t3r_0004.pdb -621.73
    1t3r_0006.pdb -619.961
$ cp 1t3r_0010.pdb 1t3r_input.pdb
```

Cuando empecemos a introducir flexibilidad de la cadena principal, también habrá que preminimizar la cadena principal, posiblemente con un protocolo relax. (Como la flexibilidad de la cadena principal que hemos introducido hasta ahora afecta a pocos residuos, y estos están restringidos, por ahora no parece que necesitemos preminimizar la cadena principal de la proteína.)

El PDB de entrada para el docking debe constar de la(s) cadena(s) de proteína seguida(s) del residuo del ligando en una cadena aparte; en general, esto significa simplemente añadir uno de los PDB del ligando del paso anterior al PDB de la proteína ya limpio. Antes de empezar, hay que eliminar del PDB cualquier otra información, aunque la información de puntuación de Rosetta y similares se suele ignorar sin problemas. Los ligandos cofactores pueden dejarse en su sitio siempre que el ligando que se va a acoplar sea el último del archivo; no se moverán. Las aguas y los iones también pueden dejarse en el PDB (después de la proteína y antes del ligando) si se proporcionan los archivos .params adecuados para ellos. Los registros "TER" actualmente los ignora el lector de PDB, así que cada cofactor, ion, molécula de agua, etc. debe tener su propio identificador de cadena único.

Por lo general, uso como entrada del docking el primer confórmero generado por Omega más las coordenadas de la proteína reempaquetada. Usar las coordenadas cristalizadas del ligando puede dar resultados artificialmente buenos en los benchmarks de docking.

```
cat params/1t3r_0002.pdb >> 1t3r_input.pdb
```

Para un experimento de cross-docking, necesitas 3 estructuras de entrada:

-   "input": proteína reempaquetada más un confórmero de ligando aleatorio (p. ej. lig\_0002.pdb)
-   "native": coordenadas de la proteína cocristalizada con el ligando cocristalizado (lig\_0001.pdb)
-   "unbound": proteína cocristalizada sin ligando (nombre confuso que viene del docking proteína-proteína)

La entrada es imprescindible y se proporciona con la opción `       -s      `. La nativa es opcional; permite a Rosetta calcular valores de RMSD con sentido y se proporciona con `       -native      `. Si no se proporciona una nativa, se usará la entrada para calcular los RMSD. La no unida también es opcional; le indica a Rosetta qué conformaciones de cadena lateral se observaron en la estructura cristalina (se favorecerán durante el reempaquetado). La no unida se especifica con `       -unboundrot      `.

Para el cross-docking es importante no incluir las coordenadas del ligando cocristalizado ni en el PDB de entrada ni en el PDB no unido: si lo haces, sesgarás el docking al darle a Rosetta la conformación bioactiva del ligando como uno de sus rotámeros. Es seguro incluir las coordenadas del ligando cocristalizado en el PDB «nativo»; solo se usan para calcular el RMS y no influirán en el curso del docking.

Uso en una ejecución de producción
==================================

A menudo hacen falta entre 2000 y 10000 trayectorias de docking en total para tener una seguridad razonable de que el ligando se acopla correctamente, según lo bien que se conozca la ubicación del sitio de unión. (El docking contra toda la superficie de la proteína podría requerir muchas más trayectorias).

Normalmente ejecuto en el gran clúster «syd» del laboratorio Baker, que usa Condor para la planificación, y suelo ejecutar de 5 a 10 procesos por ligando con `       -nstruct      ` de 500 a 1000. Cada proceso debe tener su propio directorio de salida para no saturar los servidores de archivos NFS. Por ejemplo, una entrada de mi script de envío de Condor:

```
Executable = /work/davis/ligand_dock.linuxiccrelease
Universe = vanilla
Initialdir = /work/davis/projects/jnk_sampl

Arguments = @FLAGS.txt -in:file:s input/jnk_pp_1_001.pdb -out:path:pdb work/jnk_pp_1_001/$(Process) -run:seed_offset $(Process) -out:suffix _$(Process)
Queue 10
```

El archivo FLAGS.txt (sirve cualquier nombre) contiene la mayoría de las opciones que especifican el comportamiento. En este caso, defino el sitio de unión que quiero muestrear con 6 esferas, cada una con un radio de 5A. Se ejecutarán 5000 trayectorias en total (10 x 500). Sobre todo para ligandos grandes, normalmente ejecuto 5000 trayectorias por cada esfera de 5A (o volumen equivalente: dos esferas de 4A, etc.). Las esferas describen dónde puede colocarse el NBR\_ATOM del ligando; es probable que otras partes del ligando sobresalgan de estas esferas. Por defecto, el NBR\_ATOM se elige cerca del centro del ligando, así que puedes pensar en él como el centro de masa del ligando.

```
-in
 -path
  ## On a large cluster, the database should be on a local scratch disk
  ## to avoid over-taxing NFS.
  -database /scratch/USERS/davis/rosetta/main/database
  ## "Fallback" database locations can also be specified,
  ## in case the primary database is missing on some nodes:
  -database /work/davis/rosetta/main/database
 -file
  ## You must supply .params files for any residue types (ligands)
  ## that are not present in the standard Rosetta database.
  -extra_res_fa input/jnk.pp.1_001.params input/jnk.pp.1_002.params  # ...
  ## If you weren't supplying the input file(s) on the command line,
  ## this is where you would put them:
  #-s input/jnk_pp_1_001.pdb  # ...
  ## To get meaningful RMS values in the output, either the input PDB must have
  ## the ligand in the correct place, or you must supply another file that does:
  #-native jnk_1_native.pdb
-out
 ## These channels generate a LOT of output,
 ## especially with -improve_orientation.
 -mute protocols.geometry.RB_geometry core.scoring.dunbrack.SingleLigandRotamerLibrary core.scoring.rms_util
 ## Number of trajectories to run (per input structure given with -s)
 -nstruct 500
 ## With multiple processes, ensures a unique name for every output structure.
 ## Each process should get a different string here, so you can't really
 ## put it in the FLAGS.txt file, it has to go in the Condor script:
 #-suffix 3
 -file
  ## I prefer output structures with Rosetta numbering, from 1 to N residues.
  ## To keep the original PDB numbering, omit this flag:
  -renumber_pdb
 -path
  ## Where to write the silent.out file.  Specified in my Condor script.
  #-pdb work/jnk_pp_1_001/3
-run
 ## Recording the SVN revision of the code in your output files
 ## makes it easier to figure out what you did later.
 -version
 ## MT is now the default random number generator, actually.
 #-rng mt19937
 ## Do nothing for 0 - N seconds on startup.  If many processes are started
 ## at once, this helps avoid too much I/O as they all load the database.
 -random_delay 240
-packing
 ## If your PDB file does not have hydrogens in the right places, use this:
 #-no_optH false
 ## Includes the input sidechain conformations as rotamers when repacking,
 ## but they can be "lost" if any other rotamer is chosen at that position.
 #-use_input_sc
 ## Instead, use -unboundrot to permanently add the rotamers from one or more
 ## PDB files.  Their rotamer ("Dunbrack") energies are also adjusted to be
 ## equal to the best rotamer at that position, thereby favoring the native.
 ## Since most sidechains do not change position much upon ligand binding,
 ## including this knowledge generally improves docking results:
 -unboundrot jnk_apo_native.pdb
 ## Controls the number of (protein) rotamers used.
 -ex1
 -ex1aro
 -ex2
 ## Ensures that extra rotamers are used for surface residues too.
 -extrachi_cutoff 1
-docking
 ## Flags to control the initial perturbation of the ligand,
 ## and thus how much of the binding pocket to explore.
 ##
 ## Random perturbation of up to N Angstroms in X, Y, and Z,
 ## drawn from a uniform distribution.
 ## This gives a cube, but points outside the sphere of radius N are discarded,
 ## resulting in uniform positional sampling within the sphere.
 -uniform_trans 5   # angstroms
 ## Randomize the starting orientation and conformer (respectively) of the
 ## ligand.  Unnecessary if using -improve_orientation.
 #-randomize2
 #-random_conformer
 ## An alternative to -uniform_trans and -randomize2.
 ## Random perturbations in X, Y, and Z and the 3 Euler angles,
 ## drawn from a Gaussian distribution.
 ## I *believe* that the three Gaussians in X, Y, and Z actually give a
 ## spherically isotropic distribution of positions, but large angles
 ## clearly give unreasonable results (use -randomize2 instead).
 ## This can be used for positional perturbation only (instead of
 ## -uniform_trans) by setting the angle component to zero.
 #-dock_pert 30 5  # rot degrees, trans angstroms
 -ligand
  ## Instead of choosing an orientation and conformer at random,  try all
  ## available conformers in N random orientations, and try to maximize
  ## shape complementarity to the protein (keeping in mind that sidechains
  ## may move later, etc etc.  See the paper or code for details.)
  ## We find this *significantly* improves search, and costs just a few seconds.
  -improve_orientation 1000
  ## Let ligand rotatable bonds minimize, with harmonic restraints
  ## where one standard deviation is 10 degrees:
  -minimize_ligand
  -harmonic_torsions 10
  ## In the final minimization, let the backbone minimize with harmonic
  ## restraints on the Calphas (stddev = 0.3 A).
  ## Only stretches of residues near the ligand are minimized,
  ## typically 20 - 40 in total.  (40 - 80 residues are repacked.)
  -minimize_backbone
  -harmonic_Calphas 0.3
  ## Use soft-repulsive scoring during search (but not final minimization).
  ## This slightly improves search.  Hard-rep is used for final scoring,
  ## however, because it gives better discrimination.
  -soft_rep
  ## Like Rosetta++, only evaluate the Coloumb term between protein and ligand.
  -old_estat
  ## The 6-cycle protocol with repacks in cycles 1 and 4.
  -protocol abbrev2
  ## In each trajectory, one of the following points will be chosen at random
  ## as the starting point for the ligand centroid (followed by other
  ## perturbations like -uniform_trans, etc).
  -start_from 20.0 28.4 26.0
  -start_from 23.3 18.9 26.0
  -start_from 28.7 14.0 19.6
  -start_from 16.9 16.0 32.7
  -start_from 21.3 10.8 31.1
  -start_from 25.6  4.4 32.5
  ## By supplying multiple .params files that have the same 3-letter residue
  ## name, the same heavy atoms, but different proton configurations, you can
  ## sample different protomers / tautomers within the packing steps.
  ## In many cases this gives a negligible increase in run time (nice).
  ## However, I'm unaware of any cases (so far) where it actually helped
  ## to improve docking results, so use at your own risk.
  #-mutate_same_name3
```

Análisis de las salidas
=======================

Cada proceso producirá un «silent file» que contiene el punto final de cada trayectoria. Estos silent files se pueden concatenar sin riesgo para dar un único archivo de salida por ligando. Eso sí, asegúrate de usar `       -out:prefix      ` y/o `       -out:suffix      ` en cada proceso para garantizar etiquetas únicas.

Actualmente se almacenan en mi propio formato «atomtree diff», que es muy eficiente: una estructura de referencia más unos \~10 kb por cada estructura adicional. Esto es importante porque cada proceso puede ejecutar una trayectoria en 30 segundos y volcar PDB completos saturaría el sistema de archivos compartido. Tras la estructura de referencia inicial en formato PDB, las entradas de docking tienen este aspecto:

```
POSE_TAG 7cpa_0_0_0001
SCORES 7cpa_0_0_0001 angle_constraint 0 atom_pair_constraint 0 chainbreak 0 coordinate_constraint 7.16583 dihedral_constraint 0.742443 ... total_score -1006.22
MUTATE 66 LEU_p:protein_cutpoint_lower
MUTATE 67 GLY_p:protein_cutpoint_upper
...
FOLD_TREE  EDGE 1 307 -1  EDGE 1 308 1  EDGE 1 309 2 
66 5 0.032845
66 8 -0.916
66 9 1.628
...
309 72 3.141216 1.048102
309 73 -3.139298 1.047107
309 74 -3.140680 1.055816
JUMP 1 0.921608570732 -0.387947033110 -0.011607835912 -0.173665196042 -0.385443938354 -0.906241342066 0.347099469947 0.837215665099 -0.422601334682 5.8930 5.1449 -27.6719
JUMP 2 0.042857484863 0.122530593587 0.991538950131 -0.877881019816 0.478410411182 -0.021175304449 -0.476957179459 -0.869545704439 0.128070749413 3.8597 8.9944 -31.2992
END_POSE_TAG 7cpa_0_0_0001
```

La etiqueta "7cpa\_0\_0\_0001" es un «tag» que sirve para identificar de forma única cada resultado de docking, como el nombre de un archivo en un directorio. Mi programa `       extract_atomtree_diffs      ` se puede usar para convertir las entradas de estos archivos en PDB normales. Por defecto, se extraen todas las estructuras del silent file, pero puedes extraer solo las de mejor puntuación (por ejemplo) indicando los tags en la línea de comando con la opción `       -tags      `.

El script suministrado `       best_ifaceE.py      ` leerá un silent file e imprimirá los tags de los Poses con mejor puntuación. En el shell Bash puedes usar esta salida directamente para obtener los 10 mejores Poses:

```
~/rosetta/main/source/bin/extract_atomtree_diffs.macosgccrelease -database ~/rosetta/main/database -extra_res_fa input/1t3r.params \
  -s 1t3r_silent.out -tags $(~/rosetta/main/source/src/apps/public/ligand_docking/best_ifaceE.py -n 10 1t3r_silent.out)
```

Los archivos atomtree diff son texto plano y las puntuaciones finales se registran en las líneas SCORES. Se pueden procesar fácilmente con scripts para seleccionar los mejores resultados. A menudo los convierto a una tabla de puntuaciones (CSV o equivalente) y hago el análisis en R; podrías hacer lo mismo en Excel, etc.

```
~/rosetta/main/source/src/apps/public/ligand_docking/get_scores.py < 1t3r_silent.out > 1t3r_scores.tab
```

Las puntuaciones de interés incluyen "total\_score", la energía global de Rosetta del complejo receptor-ligando; "interface\_delta", que estima la energía de unión como la diferencia entre total\_score y la puntuación de los componentes separados; y "ligand\_auto\_rms\_no\_super", el RMSD entre la posición final del ligando y su posición en el archivo PDB de entrada (o `       -native      `), teniendo en cuenta las simetrías químicas (automorfismos). También están presentes los componentes individuales de total\_score, así como los componentes de interface\_delta (con el prefijo "if\_").

He obtenido buenos resultados con el siguiente esquema de clasificación. Primero descarto las estructuras en las que el ligando no toca la proteína (ligand\_is\_touching = 0). Luego me quedo con el 5% superior por energía total (total\_score). Después clasifico el resto por la energía de interacción solo entre la proteína y el ligando (interface\_delta); esta es la diferencia de puntuación entre los componentes juntos y los componentes separados 500A. Entre las estructuras de menor energía, esto elimina algo de ruido no correlacionado debido a pequeñas variaciones de la proteína y se centra en las interacciones proteína-ligando. Este es el esquema de puntuación que implementa `       best_ifaceE.py      `, que se puede ejecutar directamente sobre el silent file para descubrir los «mejores» resultados de docking.

Si la posición inicial del ligando tiene sentido (p. ej., en un benchmark para reproducir un modo de unión conocido), puedes graficar interface\_delta de estas estructuras con mejor puntuación frente a ligand\_auto\_rms\_no\_super y deberías obtener un buen embudo de docking. ligand\_auto\_rms\_with\_super se puede usar para ver cuánta variación conformacional del ligando obtienes en las estructuras de salida. (La diferencia está en si los ligandos se superponen o no; «auto» es la abreviatura de «automorfismo», lo que significa que al calcular el RMS se tienen en cuenta ciertos tipos de simetría química).

Agrupamiento de Poses de ligandos <a name="selectbestuniqueligandposes" />
=================================

Al agrupar los Poses de ligandos y elegir el mejor modelo de cada clúster de baja energía, se puede preparar un pequeño conjunto de posibles modos de unión para investigarlos más a fondo.

Aunque dentro del marco de Rosetta hay una aplicación de agrupamiento (la aplicación "cluster"; consulta [[la documentación|cluster]] ), está escrita para funcionar principalmente con estructuras de proteínas y, por defecto, usa el rmsd de C-alfa como métrica de distancia. Dado que la aplicación ligand\_dock de Rosetta solo realiza un movimiento limitado de la cadena principal, y que la mayoría de los ligandos no tienen átomos C-alfa, es poco probable que los clústeres así obtenidos sean relevantes.

Una alternativa mejor es usar la aplicación "select\_best\_unique\_ligand\_poses", específica del docking de ligandos. Es un enfoque de agrupamiento con un algoritmo voraz, que primero filtra las estructuras por ligand\_is\_touching/total\_score, como en la sección [Análisis de las salidas](#Analysis-of-outputs) de arriba. Luego clasifica las estructuras por la métrica interface\_delta, recorre la lista y genera las estructuras que estén al menos a un umbral dado de rmsd solo del ligando respecto a cualquiera de las estructuras generadas hasta ese momento, hasta un máximo dado. También generará en el directorio de ejecución un archivo "cluster\_rms.tab" con los valores de rmsd entre las estructuras de salida.

La aplicación select\_best\_unique\_ligand\_poses usa las opciones «de estilo jd2» para controlar la entrada y la salida. Ten en cuenta que las métricas ligand\_is\_touching/total\_score/interface\_delta se toman de los archivos de entrada y no se vuelven a calcular, por lo que como entradas solo tienen sentido archivos atom\_tree\_diff y silent file procedentes de la aplicación ligand\_dock.

```
General Options:
   -database                       Path to rosetta databases
     -extra_res_fa                   Location of param files for ligand and cofactors
   -in:file:atom_tree_diff         Input file in atom_tree_diff format
     -in:file:silent                 Input silent file (*1)
     -out:file:atom_tree_diff        Output file for atom_tree_diff format output (default)
     -out:pdb                        Output best unique ligand poses as PDBs instead
     -out:path:pdb                   Directory to place output PDBs in
   -out:file:silent                Output silent structures instead of atom_tree_diffs/PDBs (*2)
     -out:file:silent_struct_type    Type of silent file output ("binary" recommended)
Program-specific Options:
     -docking:ligand:max_poses       Number of structures to output (default 50)
   -docking:ligand:subset_to_keep  Fraction of top total_score structures to keep (default 0.05) (*3)
     -docking:ligand:min_rms         Ignore structure if rmsd to previously output structure is less than this (default 0.8)
```

* (\*1) Por compatibilidad con versiones anteriores de select\_best\_unique\_ligand\_poses, si el archivo pasado a -in:file:silent parece un atom\_tree\_diff, se tratará como tal. Establece explícitamente -in:file:silent_struct_type con el valor adecuado para anular este comportamiento. 
* (\*2) Por compatibilidad con versiones anteriores, si no se establece -out:file:silent_struct_type, el nombre de archivo pasado a -out:file:silent se tratará como si se hubiera pasado a -out:file:atom_tree_diff 
* (\*3) Si -docking:ligand:subset\_to\_keep es mayor que 1.0, se interpretará como el número de mejores total\_score que se conservan, en lugar de como una fracción.

Estimación de la confianza del docking (PRELIMINAR)
===================================================

Se puede calcular un índice de confianza como la correlación entre la puntuación de energía y la distancia (RMSD) al Pose de menor energía. Este método supone que hay un único modo de unión de baja energía. Lecturas adicionales: [Maria I. Zavodszky, Andrew W. Stumpff-Kane, David J. Lee, and Michael Feig. **Scoring confidence index: statistical evaluation of ligand binding mode predictions** , *Journal of computer aided design* 1999, **23** (5):289-299](https://doi.org/10.1007/s10822-008-9258-8)


##Véase también

* [Tutorial de docking de ligandos](https://www.rosettacommons.org/demos/latest/tutorials/ligand_docking/ligand_docking_tutorial)
* [[Docking Applications]]: página principal de las aplicaciones de docking
* [[Preparing ligands]]: notas sobre la preparación de ligandos para usarlos en Rosetta
* [[Non-protein residues]]: notas sobre el uso de moléculas que no son proteínas con Rosetta
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[RosettaScripts]]: página principal de la interfaz RosettaScripts de Rosetta
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
