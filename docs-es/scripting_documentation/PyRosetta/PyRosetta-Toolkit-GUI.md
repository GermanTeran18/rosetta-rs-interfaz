<!-- --- title: Pyrosetta Toolkit GUI -->Documentación de la GUI PyRosetta Toolkit

 **Autor:**   
Jared Adolf-Bryfogle (jadolfbr@gmail.com)

![[images/pyrosetta_toolkit_main.png]]

Metadatos
-------
*Obsoleto*

Última edición: 1/10/18. Código de Jared Adolf-Bryfogle \< [jadolfbr@gmail.com](mailto:jadolfbr@gmail.com) \>. 

El investigador principal de esta aplicación es Roland Dunbrack \< [Roland.Dunbrack@fccc.edu](mailto:Roland.Dunbrack@fccc.edu) \>

Código y demo
-------------

Lamentablemente, el PyRosetta Toolkit no se ha portado a PyRosetta-4 y solo se distribuye y es compatible con PyRosetta-3. 

La aplicación está disponible en PyRosetta-3 en <code>app/pyrosetta_toolkit</code> 

Configuración de PyRosetta:

-   [http://www.pyrosetta.org/faq\#TOC-1.-How-do-I-obtain-and-install-PyRosetta-](http://www.pyrosetta.org/faq#TOC-1.-How-do-I-obtain-and-install-PyRosetta-)

Configuración opcional de la integración con PyMOL:

-   Consulta <http://www.pyrosetta.org/documentation/pymol_mover-tutorial>

Configuración opcional de la integración con SCWRL:

-   Obtén SCWRL de: [http://dunbrack.fccc.edu/scwrl4/](http://dunbrack.fccc.edu/scwrl4/)
-   Copia el ejecutable o binario en el directorio <code>pyrosetta/apps/pyrosetta_toolkit/SCWRL del directorio del sistema operativo correspondiente.

Ejecuta el programa:

-   Usa <code>pyrosetta_toolkit</code> después de ejecutar SetPyRosettaEnvironment.sh (crea un alias).  

Referencias
----------

Jared Adolf-Bryfogle and Roland Dunbrack (2013) "[The PyRosetta Toolkit: A Graphical User Interface for the Rosetta Software Suite. ](http://www.plosone.org/article/info%3Adoi%2F10.1371%2Fjournal.pone.0066856)" PloS-ONE RosettaCON2012 special collection 

Propósito
-------

Esta GUI se usa para configurar tipos de archivo específicos de Rosetta, hacer modelado interactivo usando Rosetta como base, ejecutar protocolos de Rosetta y analizar los resultados de decoys.

Limitaciones
-----------

Esta aplicación no ejecuta todas las aplicaciones de Rosetta. Sin embargo, ejecuta las más comunes. Aunque está implementado el multiprocesamiento, las ejecuciones de producción completas de muchas aplicaciones de Rosetta suelen requerir un clúster. Consulta siempre la documentación de Rosetta correspondiente en RosettaCommons. Las opciones de todos los protocolos se pueden añadir mediante el Option System Manager o mediante su interfaz específica del protocolo. Por ahora no se admite la simetría.

Menús
-----

### Menú File

Carga primero un Pose mediante este menú, ya sea desde un archivo o directamente desde el RCSB. Si tienes PyMOL configurado, enviará el Pose a PyMOL después de cargarlo en Rosetta. Cargar un Pose abrirá por defecto la ventana de limpieza de PDB para preparar el PDB para su importación a Rosetta.

Funciones de limpieza de PDB:

-   renombrar aguas
-   eliminar aguas
-   eliminar hetatm
-   renombrar residuos de ADN
-   renombrar átomos de DM
-   cambiar las ocupancias a 1.0
-   renumerar el Pose desde 1 + teniendo en cuenta las inserciones
-   comprobar que Rosetta puede leer todos los residuos

-   Importaciones actuales: sesión de la GUI, lista de rutas de params, archivo de loops
-   Exportaciones actuales: sesión de la GUI, lista de rutas de params, archivo de loops, Resfile básico, Blueprint básico, archivo de secuencia de SCWRL, FASTA (Pose + regiones)

### Ventana principal

La ventana principal se usa para ejecutar protocolos comunes, algunos análisis, configurar la salida de decoys y, por último, fijar una región.

La región predeterminada es toda la proteína. Para especificar loops para el modelado de loops, regiones para minimización o residuos para reempaquetado, etc., añade una región:

-   Cadena: se puede añadir con solo especificar la cadena
-   Extremo N-terminal: deja en blanco el cuadro de entrada 'start' o introduce cualquier cadena de texto, y especifica la cadena y el número de residuo final
-   Extremo C-terminal: deja en blanco el cuadro de entrada 'end' o introduce cualquier cadena de texto, y especifica la cadena y el número de residuo inicial
-   Residuo: haz que el inicio y el final sean el mismo residuo.

Secuencia:

-   En la parte inferior de la pantalla se puede encontrar una secuencia del Pose o de la región. Al colocar el cursor en la parte izquierda de un residuo se mostrará su número de residuo, su cadena y su resnum de Rosetta. Esto se puede colorear en PyMOL y usar para seleccionar residuos en la ventana de control por residuo descrita más abajo.

Opciones de salida:

-   El directorio de salida predeterminado es el directorio del Pose actual. Este y otras opciones de salida de decoys se pueden fijar en las áreas superior derecha e inferior derecha de la ventana principal.
-   Los múltiples procesadores solo se usan en ejecuciones de protocolos de \>1 decoy, así como en algunas funciones del menú PDBList.

Protocolos:

-   Algunos protocolos comunes de minimización se pueden ejecutar desde la ventana principal, además de desde el menú de protocolos (Repack, Minimize, Relax, SCWRL).

### Menú Options

-   Option System manager:
-   : : Configura las opciones de línea de comandos de Rosetta con el Option System Manager
-   Configure Score Function:
-   : : La función de puntuación predeterminada es score12prime. La función de puntuación fijada aquí la usan todos los protocolos. Consulta la sección de protocolos para más información. Usa esta ventana para cambiar la función de puntuación o los pesos de cualquier término.
-   : : En esta ventana se pueden dar más conjuntos de pesos seleccionando options-\>show ALL scorefunctions
-   Set General Protocol Options:
-   : : Se puede fijar un número de rondas para todos los protocolos. Por defecto, si se fija más de una ronda, se aplica el criterio de Boltzmann al Pose tras cada ronda con la función de puntuación actual. Esto es especialmente útil para el empaquetado o el diseño. Aquí puedes controlar la temperatura, el comportamiento de lo que ocurre en cada ronda y si se recupera el Pose de menor energía al final de la ejecución.

### Menú Visualization
![[images/pyrosetta_toolkit_pymol.png]]
Integración con PyMOL mediante el PyMOL Mover. Un Pose se puede mostrar en PyMOL en cualquier momento. Se pueden colorear las regiones y se puede habilitar el PyMOL Observer, que actualiza PyMOL ante cambios estructurales y energéticos del Pose actual.

-   Botón Advanced PyMOL Visualization
-   : : Esta es una ventana sencilla que se puede usar mientras se usa PyMOL. Es pequeña para que puedas incorporarla a tu flujo de trabajo de modelado.
-   : : Para las energías, el azul es energía baja y el rojo es energía alta. Por ahora no se puede cambiar el espectro, pero se añadirá en el futuro.
-   : : Las etiquetas de energías pueden ser útiles, aunque lentas. Usa los comandos de PyMOL para quitarlas una vez enviadas.

### Menú Advanced

El Ligand/NCAA/PTM Manager

-   Muchos residuos no canónicos están desactivados por defecto en Rosetta, y esta ventana te permitirá habilitarlos y también diseñar residuos hacia ellos.
-   Aquí también se ofrece la optimización de la función de energía. Como el término de puntuación electrostático predeterminado de la función de puntuación predeterminada es de naturaleza estadística, no funcionará para residuos no canónicos. Como mínimo, cambiarlo al término de puntuación coulómbico es una representación más realista físicamente del sistema.
-   La función de puntuación mm\_std ( Douglas Renfrew, Eun Jung Choi, Brian Kuhlman, 'Using Noncanonical Amino Acids in Computational Protein-Peptide Interface Design' (2011) PLoS One. ) está siendo sometida actualmente a pruebas amplias con proteínas y otros sistemas, pero parece funcionar muy bien para el diseño con NCAA y los rotámeros.
-   La función de puntuación de orbitales, desarrollada por Steven Combs et al (laboratorio Meiler), también es una gran alternativa, independiente del residuo. Las pruebas de todos estos cambios de función de puntuación continúan.

Design Toolbox

-   Esta es una ventana que te permite construir un resfile para el Pose cargado. Puedes hacerlo para residuos individuales o para una región del Pose. Consulta el menú de ayuda o el artículo para información sobre qué son los valores de esta ventana.
-   El cuadro situado más a la izquierda es para categorías de residuos. Sirve para una selección y un diseño sencillos. Usa la categoría etc para las opciones típicas de resfile de Rosetta (NATRO,NATAA,ALLAA). Al hacer clic en una de las categorías se llenará el cuadro de la derecha. Aquí eliges realmente los tipos de residuo que quieres abrir haciendo doble clic sobre ellos. Al seleccionarlos, se limitará el diseño solo a los elegidos. Los residuos que has elegido pasan luego al cuadro más inferior. Al cambiar el número de residuo seleccionado, cambiará lo que va en este cuadro, de modo que puedes editar tu diseño actual. Al hacer doble clic en un residuo del cuadro, se elimina.
-   Haz clic en el botón Write Resfile para abrir un cuadro de diálogo de guardar como.

Enable constraints

-   Pedirá un archivo de restricciones. Para más información, consulta el manual de RosettaCommons.

Insert data into B factor Column

-   Esta es principalmente una utilidad de análisis, pero puede ser útil para la visualización de datos, especialmente para publicaciones.
-   Los datos deben estar en un archivo de texto o csv, delimitados por un espacio, una tabulación, una columna o una coma.
-   Los datos deben tener al menos 3 columnas: número de residuo del pdb, cadena, datos que se insertarán y, opcionalmente, nombre del átomo
-   La interfaz de esta función de utilidad te permitirá elegir las columnas de cada pieza requerida así como el delimitador. Usará tu Pose cargado actualmente y generará un nuevo Pose con los datos en la columna del factor B. Carga el Pose en PyMOL o en tu visualizador favorito para ver los datos.

Per Residue control and Analysis

-   Esta es una gran ventana de modelado interactivo. Aquí puedes hacer muchas tareas de modelado, incluida la mutación de residuos individuales, añadir variantes como fosforilaciones/acetilaciones, reempaquetar rotámeros, cambiar diedros, etc. También puedes analizar probabilidades de rotámeros y energías de residuos individuales.

Movers de análisis:

-   Interface Analyzer
-   Loop Analyzer
-   Packing Analyzer
-   VIP

### Menú Protocols

-   Todos los protocolos requieren un Pose cargado. Las opciones no dadas en la interfaz principal ni en la interfaz específica del protocolo se pueden fijar con el Option System Manager. Consulta el manual de RosettaCommons para todos los protocolos, así como las referencias listadas allí y dentro de la GUI.
-   La función de puntuación predeterminada es score12prime. Los ligandos/NCAA/PTM pueden requerir modificaciones de la función de puntuación. Usa el menú Advanced para hacer estas modificaciones. Los protocolos basados en centroid y otros protocolos específicos requieren funciones de puntuación distintas. Se dan a continuación, y la GUI te lo indicará si no están fijadas.

Implementados actualmente:

High/Low Resolution Docking

-   Pedirá los compañeros de docking con la misma notación que la aplicación de docking.
-   Función de puntuación: usa la función de puntuación interchain\_cen para baja resolución y docking para alta resolución.

High/Low Resolution Loop Modeling (KIC/CCD)

-   Pedirá las opciones de fragset (CCD) / extend.
-   El cutpoint predeterminado está cerca del medio del loop.
-   Función de puntuación: usa centroid + el parche score4L para baja resolución.

Fixedbb Design (UI)

-   Pedirá un resfile.

Floppytail (UI)

Grafting (UI)

-   Injerta una región de una proteína en otra.
-   Se ofrecen muchas opciones. Todas se describen en la interfaz. Al elegir un método de injerto se mostrará una descripción de ese método.
-   Se supone que el Pose cargado es aquel en el que vas a injertar. Puedes elegir el Pose donante desde la interfaz. Ambos pueden ser el mismo archivo PDB.
-   Si la región no está ya eliminada, se eliminará al injertar.

FastRelax

ClassicRelax

PackRotamers (Rosetta)

PackRotamers (SCWRL)

Minimizer

-   El minimizador predeterminado de Rosetta es dfpmin. Usa el sistema de opciones para fijar otro estableciendo '-run:min\_tolerance'
-   La aplicación Relax usa dfpmin\_armijo\_nonmonotone. Visita [[Minimization Overview]] para más información.
-   La tolerancia predeterminada de Rosetta es 0.000001. Usa el sistema de opciones para fijar un valor distinto estableciendo -run:min\_tolerance.

Enlaces a servidores:

-   ROSIE
-   Fragments
-   Backrub
-   Interface Alanine Scan
-   DNA Interface Scan
-   Scaffold Select

### Menú PDBList

Una PDBList es simplemente una lista de rutas completas a archivos PDB, una en cada línea. La GUI la usa para analizar decoys. Aquí residen los métodos para crear y usar una PDBList.

Funciones principales:

-   Lowest Energy: obtiene los Poses de menor energía de una PDBList
-   Energy vs RMSD: calcula Energía vs RMSD + genera un archivo que se puede graficar en cualquier aplicación de gráficos.
-   Output FASTA: genera un FASTA con la secuencia de cada Pose o solo de la región dada
-   Design Statistics: usa FASTA para calcular estadísticas de diseño de una ejecución de diseño de Rosetta. Genera archivos de texto y un gráfico de R. Necesita un Pose de referencia cargado. Todavía no funciona con inserciones y deleciones durante el diseño.

Consejos
----

-   -Fija las opciones predeterminadas (de línea de comandos) mediante la ventana del Option System Manager
-   -Fija la función de puntuación predeterminada mediante la ventana de la función de puntuación; la usan todos los protocolos.
-   -Guarda y carga sesiones de la GUI con el menú File
-   -Usuarios avanzados: para añadir ventanas y funciones personales a la GUI, consulta el html para desarrolladores en el directorio pyrosetta\_toolkit/documentation.

### Configuración de Bashrc

Esto es para que no tengas que ejecutar source SetPyRosettaEnvironment.sh cada vez que quieras usar Toolkit. Lleva unos minutos, pero vale la pena. Para más información sobre qué es un shell bash: [http://superuser.com/questions/49289/what-is-bashrc-file](http://superuser.com/questions/49289/what-is-bashrc-file)

Para hacerlo:

1. Añade una línea a tu bashrc o zshrc si usas zsh (\$HOME/.bashrc) o (\$HOME/.bash\_profile en mac) (\$HOME/.zshrc si usas el shell zsh): `source full/path/to/SetPyRosettaEnvironment.sh` (Este archivo se encuentra en el directorio de PyRosetta)

### Configuración de PyMOL

Configuración para que el servidor de pymol se ejecute y escuche cada vez que se abra PyMOL.


1.  Añade una línea en el archivo \$HOME/.pymolrc (puede ser un archivo nuevo): `        run full/path/to/PyMOLPyRosettaServer.py       ` (Este archivo se encuentra en el directorio de PyRosetta)

Cambios desde la última versión
--------------------------

Esta será la primera versión

##Véase también