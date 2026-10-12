#Introducción a los conceptos importantes de Rosetta

Este documento fue escrito originalmente el 11 de noviembre de 2007 por Chu Wang y se actualizó por última vez el 8 de junio de 2015.

*Para definiciones breves de términos relacionados con Rosetta, consulta el [[glosario|glossary]].*

Este documento se escribió con el propósito de ayudar a los desarrolladores a comprender algunos conceptos clave de Rosetta3. El conocimiento en el que se basa proviene principalmente de mi experiencia personal aprendiendo y usando Rosetta3, y es muy probable que algunas partes de este documento no sean exactas debido a mi comprensión limitada. Además, todo el mérito corresponde a Phil Bradley y Andrew Leaver-Fay, que sentaron una base sólida para Rosetta3, así como a todos los demás desarrolladores de Rosetta3 que han hecho una enorme cantidad de trabajo en su desarrollo. Siéntete libre de añadir, modificar, corregir o actualizar cualquier parte de su contenido según sea necesario.

Filosofía de Rosetta
====================

Un resumen sencillo de cómo funciona Rosetta es que el sistema molecular que se va a modelar tiene un cierto número de grados de libertad (DOF), como phi/psi/chi en el plegamiento de proteínas, la traslación/rotación de cuerpo rígido en el docking y la secuencia de aminoácidos en el diseño. Junto con otros parámetros fijos por suposición predeterminada, estos DOF se traducen en posiciones xyz reales de los átomos en el espacio cartesiano, mediante procesos como «refold» y <a href="#packer">«pack\_rotamers»</a>. Después, se usa una función de energía de base física para evaluar el estado energético del sistema actual a partir de esas posiciones atómicas. El régimen «DOF-XYZ-Energía» se acopla con algoritmos como la minimización Monte Carlo para muestrear el espacio conformacional definido por esos DOF con el fin de localizar la conformación con el estado de menor energía, que presumiblemente debería estar cerca del estado nativo del sistema.

Para una descripción detallada de cómo funciona Rosetta, consulta [[Leaver-Fay et al. 2011, Methods in Enzymology 487:545-74|http://www.ncbi.nlm.nih.gov/pubmed/21187238]].

Pose <a name="pose" />
====

«Pose» en Rosetta3 representa un cierto estado del sistema molecular que se va a modelar o simular, como proteínas, ácidos nucleicos, ligandos químicos pequeños y complejos con cualquier combinación de ellos. Almacena información sobre la composición química y los DOF del sistema. Puede recibir instrucciones sobre qué cambios hay que hacer en los DOF y sabe cómo actualizar las posiciones XYZ de los átomos dados esos cambios. Mantiene información de datos de energía en caché y sabe cómo evaluar su propia energía de manera eficiente, a partir de las posiciones atómicas actualizadas y de los métodos de evaluación de energía que se vayan a usar. En un protocolo de modelado estándar, un Pose se inicializa a partir de una estructura de entrada o desde cero, y luego pasa por una secuencia o combinación de operaciones que cambiarán sus DOF para muestrear el espacio conformacional y evaluar su energía, de modo que se pueda localizar el estado de menor energía. Hay dos componentes esenciales en un objeto Pose, «Conformation» y «Energies»; el primero se encarga de traducir los cambios en los «DOF» a posiciones atómicas XYZ y el segundo es responsable de actualizar los componentes individuales de «Energy» dadas las coordenadas atómicas actualizadas.

Conformation <a name="conformation" />
============

Como se mencionó arriba, la capa «Conformation» mantiene una representación molecular del sistema que se va a modelar y es responsable de traducir cualquier cambio en los DOF del sistema a cambios reales en las coordenadas cartesianas de los átomos. Este objeto tiene tres categorías de datos:

-   representación química del sistema con un conjunto de objetos «Residue», cada uno de los cuales contiene información sobre la composición química o el tipo de los átomos, su conectividad (ambos en el objeto ResidueType) y sus posiciones espaciales.
-   representación cinemática del sistema con el [[Fold-tree|foldtree-overview]] y el [[Atom-tree|atomtree-overview]]. El mérito de esta topología «de árbol» del sistema biomacromolecular es que los DOF torsionales y de cuerpo rígido se pueden unificar bajo una representación general y se pueden habilitar o congelar de manera flexible. Cualquier cambio en los DOF se puede traducir a coordenadas cartesianas XYZ de los átomos según las reglas codificadas en la configuración del árbol cinemático. A la inversa, también se puede derivar un nuevo conjunto de DOF dadas las coordenadas XYZ y la topología del árbol.
-   Datos en caché sobre qué DOF o coordenadas han cambiado desde el último movimiento. Esto sirve para calcular la energía de manera eficiente, ya que si un par de átomos no ha cambiado uno respecto del otro desde la última evaluación de energía, el objeto Energy puede reutilizar algunos datos de energía en caché sin calcular sus energías por pares.

Residue <a name="residue" />
-------

Cada Pose/Conformation se descompone en unidades pequeñas llamadas «Residues», que pueden ser aminoácidos, ácidos nucleicos o cualquier grupo de átomos con ciertas reglas sobre qué son y cómo están conectados, como una fracción de ligando químico pequeño. El contenido químico de un Residue se almacena en un objeto llamado «ResidueType» y, aparte de eso, cada Residue tiene otros datos que almacenan la información real de coordenadas de cada átomo que contiene, así como datos relacionados con las coordenadas, como los ángulos de torsión de la cadena principal y de la cadena lateral, la posición en la secuencia, etc. Por ejemplo, en una proteína puede haber varios residuos de leucina, cada uno de los cuales será un objeto «Residue» individual. Cada Residue de Leu tiene sus propios datos de coordenadas, pero todas las Leu tendrán el mismo ResidueType de Leu, que contiene información sobre cuáles son los átomos, sus nombres, elementos químicos y conectividad. Esta configuración también permite representar un rotámero de cadena lateral simplemente como un Residue.

Capa química <a name="chemical" />
==============

ResidueType <a name="residuetype" />
-----------

ResidueType contiene información relacionada con la representación química de un residuo, por ejemplo, cosas como cuántos átomos tiene, cuál es el índice del primer átomo de hidrógeno y qué átomos podrían ser donadores y aceptores potenciales de enlaces de hidrógeno, etc. Cada ResidueType individual se crea a partir de datos de un [[archivo «params»|Residue-Params-file]]. (consulta /path/to/rosetta/main/database/chemical/residue\_type\_sets/fa\_standard/residue\_types/l-caa/ALA.params para ver un ejemplo), que contiene información sobre cómo definir las propiedades de este ResidueType. La ventaja de usar el archivo params de ResidueType es evidente:

-   Se pueden agrupar según diferentes niveles de representación; por ejemplo, una lisina centroid tendrá menos átomos que una lisina de todos los átomos. Así, todos los residuos centroid se agrupan en un ResidueTypeSet y todos los residuos de todos los átomos se agrupan en otro conjunto. Y según los ResidueTypes que tenga un Pose de Residues, se puede modelar el sistema en diferentes tipos de representaciones, es decir, primero centroid, luego de grano grueso y finalmente de todos los átomos.
-   Se puede crear fácilmente un nuevo ResidueType «parcheándolo» sobre un ResidueType existente. Un ejemplo concreto es crear un ResidueType N/C-terminal, que se diferencia de su tipo base solo en que añade un par de átomos. Esa «diferencia» se codifica en un archivo «patch» (que también se puede encontrar en /path/to/rosetta/main/database/chemical/residue\_type\_set/fa\_standard/patches/...) y se aplica a los ResidueTypes base existentes para crear [[VariantTypes|VariantTypes-and-ResidueProperties]]. Una vez que estos tipos variantes se vinculan a los Residues correspondientes de un Pose, podemos modelar las biomacromoléculas con una representación física/química más precisa.

Además de los datos químicos, un ResidueType también contiene información sobre cómo generar una copia idealizada de un Residue. Sin embargo, para ser coherente con la representación de árbol de átomos de la capa cinemática, las geometrías de ResidueType se codifican en «[[coordenadas internas|internal coordinates]]» en lugar de en «coordenadas cartesianas». Es decir, para cada átomo de este ResidueType se define un conjunto de parámetros que indican cómo generar ese átomo a partir de un conjunto de (tres) átomos de referencia o stub. Estos parámetros, longitud de enlace, ángulo de enlace y ángulo de torsión, son esencialmente DOF en el árbol de átomos. Además de los datos de coordenadas internas, un objeto ResidueType también contiene información sobre cómo se pueden conectar a otros ResidueTypes. Por ejemplo, cada ResidueType de aminoácido tiene dos conexiones poliméricas, «backbone N», que lo conecta con su extremo inferior, y «backbone C», que lo conecta con su extremo superior. Un ResidueType de cisteína podría tener otra conexión no polimérica que permite conectar su azufre con un átomo de azufre de otra cisteína. Los ligandos de varios residuos también se conectan mediante esas conexiones no poliméricas.

AtomType <a name="atomtype" />
--------

Un ResidueType tiene un grupo de átomos, más exactamente, un grupo de nombres de átomos y su atom\_type\_index. Mediante estos atom\_type\_index, las propiedades químicas reales de los átomos individuales (su AtomType), como el elemento químico, las cargas, el radio LJ y el volumen de solvatación LK, se pueden consultar en el AtomTypeSet. En /path/to/rosetta/main/database/chemical/atom\_type\_sets/... hay archivos de entrada con datos de propiedades atómicas, y se puede crear fácilmente un nuevo AtomType proporcionando los datos necesarios en ese archivo. Un objeto AtomTypeSet está vinculado a un ResidueType para que este sepa qué átomos se admiten y pueda consultar sus propiedades según sea necesario.

Capa cinemática
===============

Hemos cubierto la mayor parte de la capa «química» (de Pose a Conformation, a Residue, a ResidueType y a AtomType) y pasemos ahora a la capa «cinemática» para ver cómo los grados de libertad del sistema se traducen realmente en posiciones atómicas para la puntuación. Las piezas de datos esenciales de la capa cinemática son FoldTree y AtomTree, que son obra exclusiva de Phil Bradley.

[[FoldTree|foldtree-overview]] <a name="foldtree" />
--------

FoldTree es una descripción del sistema macromolecular basada en residuos. Para más información, se pueden consultar dos artículos de referencia: [[Bradley et al, Proteins, 2006|http://www.ncbi.nlm.nih.gov/pubmed/17034045]]; [[Wang et al, JMB, 2007|http://www.ncbi.nlm.nih.gov/pubmed/17825317]] o ver [[Descripción general y conceptos de FoldTree|foldtree-overview]] . Cada residuo está conectado a otro residuo del árbol, ya sea mediante una conexión peptídica o una conexión de cuerpo rígido, conocida como «Jump». Los DOF del sistema son los ángulos de torsión de la cadena principal y de la cadena lateral y las transformaciones de cuerpo rígido. Los cambios en estos DOF se pueden propagar adecuadamente en el FoldTree para generar los cambios estructurales deseados.

[[AtomTree|atomtree-overview]] <a name="atomtree"/>
--------

AtomTree proporciona un marco aún más general para modelar el sistema biomacromolecular. Como indica su nombre, representa todos los átomos del sistema con una topología de árbol, en comparación con la representación basada en residuos de FoldTree. Los átomos están conectados entre sí mediante distancias de enlace, ángulos de enlace y ángulos de torsión/impropios, y transformaciones de cuerpo rígido, todos los cuales son DOF potenciales del sistema. (FoldTree puede considerarse un AtomTree especial en el que las longitudes y ángulos de enlace están fijos y solo se permiten DOF torsionales y de cuerpo rígido). AtomTree no solo permite al usuario tratar más DOF, sino que su representación basada en átomos también tiene una gran ventaja para manejar moléculas de tipo no polimérico con conexiones atómicas arbitrarias, como los ligandos químicos pequeños. Para más información, se puede consultar una muy buena descripción general de algunos conceptos importantes para entender AtomTree escrita por Ian Davis ( [[Descripción general y conceptos de AtomTree|atomtree-overview]] ). Aquí hay algunos puntos clave básicos:

-   Cada átomo tiene su propio átomo padre, su lista de hijos y su propia posición XYZ. La coordenada XYZ se puede definir dadas sus tres coordenadas internas, d, theta y phi, es decir, distancia de enlace, ángulo de enlace y ángulo de torsión/impropio, en el contexto de un sistema de coordenadas centrado en su átomo padre. La función «update\_xyz\_coord(root\_atom)» realiza esta tarea y la función «update\_internal\_coords(root\_atom)» realiza la operación inversa.
-   El árbol tiene un átomo raíz que no tiene padre. A partir del átomo raíz y del sistema de coordenadas predeterminado, todos los átomos hijos de la raíz se pueden generar a partir de sus coordenadas internas. Una vez generados, cada uno de ellos se convierte en la raíz del subárbol de átomos que se origina en él. Como todo el sistema molecular se representa mediante un árbol de átomos, recorrer todo el árbol se hace de forma inteligente llamando recursivamente a «update\_xyz\_coord(root\_atom)». De manera similar, las coordenadas internas se pueden actualizar de la misma forma recursiva llamando a la función «update\_internal\_coord(root\_atom)».
-   Los «Atoms» del árbol de átomos se categorizan internamente en dos tipos según cómo están unidos a sus padres, a saber «BondAtom» y «JumpAtom». Las coordenadas internas de un JumpAtom contienen una transformación de cuerpo rígido, en comparación con «d/theta/phi» de un BondAtom.
-   Cualquier coordenada interna de cualquier átomo se puede considerar un grado de libertad y cualquier cambio en este DOF se puede propagar al resto del árbol para actualizar las posiciones xyz de los átomos.

Rosetta3 usa internamente solo AtomTree para manejar la cinemática. FoldTree sigue siendo compatible para definir la representación cinemática del sistema modelado, ya que es cómodo de construir para tareas de modelado basadas en proteínas. Cuando se pasa un FoldTree a Pose/Conformation, se convierte en la representación de AtomTree correspondiente. Por comodidad, se admite la interfaz para fijar los tipos más comunes de DOF; por ejemplo, cuando se llama a pose.set\_psi(18, 70.0), consulta una función de mapeo interna para encontrar la coordenada interna de AtomTree correspondiente de un átomo concreto y la fija en consecuencia. Siempre que hay un cambio en cualquier coordenada interna de AtomTree, se activa una marca que indica que las coordenadas XYZ de los átomos están desactualizadas. Así, la próxima vez que se solicite cualquier operación que dependa de las coordenadas XYZ, como la puntuación o el acceso a la posición de un átomo determinado, se activará un «refold» (update\_xyz\_coords()) para asegurar que los datos de coordenadas XYZ estén correctamente actualizados. De manera similar, AtomTree también proporciona una interfaz para que los usuarios cambien directamente las coordenadas XYZ de cualquier átomo y, en esta situación, se fijará una marca similar que indica que hay que actualizar las coordenadas internas y se activará la función «update\_internal\_coords()» si se van a usar datos de coordenadas internas.

Si todavía lo recuerdas, un objeto Residue también tiene datos de todas las posiciones de sus átomos y de sus torsiones de cadena principal/cadena lateral. La fuente de estos datos se actualizará desde la capa cinemática AtomTree siempre que sea necesario. AtomTree mantiene internamente un mapa de punteros a átomos, de modo que, dados un número de residuo y un número de átomo, se puede buscar un Atom concreto. Después se puede acceder a su posición y se puede asignar cualquier torsión de cadena principal/cadena lateral a una coordenada interna concreta de un átomo determinado.

Existen numerosas funciones miembro para manipular AtomTree, como eliminar, unir o reemplazar un subárbol mediante un enlace o un cuerpo rígido, o cambiar la raíz de un AtomTree. Un ejemplo sería que, durante la construcción de un AtomTree para una proteína, primero se crea un subárbol de Residue y luego se une al AtomTree principal. Otro sería cambiar un Residue de representación centroid a representación de todos los átomos. Como ahora se tratan como residuos distintos en Rosetta, se creará un subárbol para el residuo de todos los átomos y reemplazará al subárbol del residuo centroid en el AtomTree principal.

Lo último que se menciona aquí sobre AtomTree es que el cambio en cualquier DOF se registrará en los datos en caché de Conformation, es decir, esta torsión se ha movido o este cuerpo rígido se ha movido, de modo que se pase a las rutinas de puntuación para una evaluación de energía eficiente y precisa.

[[Puntuación|scoring-explained]] <a name="scoring" />
=======

Todavía no he recorrido a fondo la parte de puntuación/energías y probablemente esto necesite más aportaciones de Andrew y Phil.

Energies <a name="energies" />
--------

El objeto Energies contiene componentes de energía en caché para un Pose/Conformation. Contiene los componentes clásicos de energía de un cuerpo y de dos cuerpos, pero la implementación de su almacenamiento es diferente. Las energías por pares de residuos (de dos cuerpos) se almacenan en un EnergyGraph en el que cada nodo es un residuo y una arista entre dos nodos es la energía de interacción entre esos dos residuos. Este tipo de grafo también se ha aplicado en muchas implementaciones relacionadas con la puntuación, como las distancias por pares de residuos para configurar listas de vecinos. Cuando la estructura se ha movido y se solicita una puntuación, el objeto Energies comprobará si algún dato antiguo en caché es reutilizable y solo actualizará los que sea necesario volver a calcular.

[[ScoreFunction|score-types]] <a name="scorefunction" />
-------------

Una ScoreFunction tiene un conjunto de pesos, cada uno de los cuales corresponde a un componente de energía individual. Cada componente de energía será evaluado por cierto tipo de EnergyMethod; por ejemplo, LJ-atractivo será evaluado por un método de 2 cuerpos independiente del contexto (ci\_2B\_method) y Dunbrack será evaluado por un método de 1 cuerpo independiente del contexto. La lista de todos los EnergyMethods admitidos también la mantiene un objeto ScoreFunction. Cuando se aplica una ScoreFunction a un Pose para evaluar su energía, todos los componentes de energía con peso distinto de cero se calcularán con sus métodos de puntuación correspondientes. Se puede encontrar más información sobre los métodos de energía admitidos actualmente y sus categorías en src/core/scoring/methods/.

ScoreFunctionFactory <a name="scorefunctionfactory />
--------------------

Este objeto facilita principalmente la inicialización de los pesos de una ScoreFunction a partir de un archivo externo y, además, la aplicación de un parche para añadir, quitar o cambiar un subconjunto de los pesos según sea necesario. Se puede encontrar una lista de los pesos de funciones de puntuación definidos en /path/to/rosetta/main/database/scoring/weights.

Relacionado con los protocolos
================

Una vez que un Pose se inicializa, ya sea a partir de una estructura existente o desde cero, se puede pasar a distintas funciones de nivel de protocolo para realizar ciertos tipos de tareas de modelado. Esto incluye, entre otros, MonteCarlo, la minimización basada en gradiente, el packer, rotamer\_trials y un envoltorio de objeto más general llamado «Mover». Estos protocolos de nivel superior están en desarrollo intensivo y se espera que, con la maquinaria proporcionada por Pose y todos sus módulos internos de construcción, los usuarios tengan libertad para construir sus propios protocolos, hechos a medida para sus objetivos de investigación. Aquí hay descripciones muy breves de estos bloques de construcción de nivel superior:

MonteCarlo <a name="montecarlo />
----------

Este objeto se usa para determinar si un cambio hecho a un Pose se aceptará o se rechazará según el cambio en la energía del Pose y una «temperatura» (en realidad aproximadamente equivalente a la temperatura multiplicada por la constante de Boltzmann, en unidades de kcal/mol). Almacena internamente dos Poses, que registran el último estado aceptado y el estado de menor energía visitado hasta el momento, una <a href="#scorefunction">ScoreFunction</a> para fines de puntuación y un factor de temperatura para ajustar la probabilidad de Boltzmann de aceptación/rechazo.

AtomTreeMinimizer <a name="minimizer" />
-----------------

Como la configuración cinemática de un Pose se hace ahora únicamente mediante AtomTree, la función de optimización la lleva a cabo este objeto AtomTreeMinimizer. Este objeto tiene una función miembro llamada «run» que recibe un <a href="#pose">Pose</a>, un <a href="#movemap">MoveMap</a>, una <a href="#scorefunction">ScoreFunction</a> y un objeto envoltorio MinimizerOption para realizar la tarea de minimización de energía. La función objetivo de energía que se va a minimizar proviene evidentemente de ScoreFunction y las variables son los DOF del Pose/Conformation/AtomTree. Qué subconjunto de DOF se minimizará lo especifica este objeto MoveMap, y el tipo de minimización que se llevará a cabo se define en el objeto MinimizerOption (que también tiene el valor de tolerancia de la minimización y otros parámetros relacionados con la minimización). Para más información sobre la minimización, consulta [[Descripción general y conceptos de la minimización|minimization-overview]] .

MoveMap <a name="movemap" />
-------

El propósito de MoveMap es habilitar o deshabilitar ciertos tipos de DOF del sistema. Por ejemplo, omega está fijo pero phi/psi/chi son flexibles. En Rosetta3, MoveMap está aislado de Pose y se pasa por separado al AtomTreeMinimzer. Un MoveMap permite habilitar o deshabilitar un tipo específico de DOF, como las longitudes y ángulos de enlace; o ciertos DOF de un solo residuo, como la torsión de la cadena principal del residuo i; o un DOF individual del AtomTree, como el ángulo de torsión asociado al átomo j del residuo i. Esto da a los usuarios más libertad para controlar qué DOF se optimizan.

Packer y Rotamer\_trials <a name="packer" />
--------------------------

Ambos objetos realizan una optimización de cadenas laterales/secuencia basada en rotámeros dado un Pose. La información sobre qué se debe reempaquetar o rediseñar se envuelve en el objeto [[PackerTask|packer-task]], que puede recibir apoyo de muchas opciones de línea de comandos.

PackerTask <a name="packertask">
----------

El PackerTask controla qué residuos de un Pose se diseñarán, se reempaquetarán o se mantendrán fijos durante el empaquetado de rotámeros. Ten en cuenta que un PackerTask generalmente está pensado para un solo uso, ya que codifica la secuencia del Pose que se usó para crearlo y, por tanto, anularía cualquier mutación hecha entre la creación del PackerTask y el empaquetado. Para protocolos con varias ejecuciones de empaquetado, usa un TaskFactory para crear PackerTasks inmediatamente antes de empaquetar. 

El PackerTask se puede imaginar como una escultura de hielo.  Por defecto, todo se puede empaquetar Y diseñar.  Usando TaskOperations, o tu juego de cinceles, se puede limitar el empaquetado/diseño a ciertos residuos solamente.  Como con el HIELO, una vez que estos residuos se restringen, por lo general no se pueden volver a activar.

Una escultura de hielo, por supuesto, está limitada por el tamaño del bloque de hielo inicial. Si quieres una lista inicial, o paleta, más grande de residuos con los que diseñar, usas un PackerPalette. El DefaultPackerPalette es como un cubito de hielo, pero si usas un PackerPalette modificable, al que puedes añadir residuos, puedes empezar con un iceberg.

TaskFactory <a name="taskfactory" />
-----------

Un TaskFactory se usa para crear PackerTasks que se usarán para el reempaquetado y el diseño de rotámeros. El TaskFactory contiene un conjunto de TaskOperations que le indican qué comportamiento aplicar a cada residuo y un PackerPalette que le indica qué residuos puede usar en el diseño. Esta decisión se toma inmediatamente antes del empaquetado.

TaskOperations <a name="taskoperations" />
--------------

Un TaskFactory usa las TaskOperations para configurar el comportamiento y crear un PackerTask cuando se genera bajo demanda para rutinas que usan el «packer» para reorganizar o mutar cadenas laterales. El PackerTask controla qué residuos son empaquetables, diseñables o se mantienen fijos.  Cuando las usan ciertos Movers (por ahora, el PackRotamersMover y sus subclases), el conjunto de TaskOperations controla lo que ocurre durante el empaquetado, normalmente mediante «máscaras» de restricción.  

Para más información sobre las TaskOperations, consulta la [[página de TaskOperations de RosettaScripts|TaskOperations-RosettaScripts]].

PackerPalette <a name="packerpalette" />
--------------

El PackerTask usa los PackerPalettes para proporcionar una lista inicial de residuos disponibles con los que se puede diseñar en cada posición de un Pose. Por ejemplo, si se quiere diseñar con aminoácidos no canónicos (NCAA), en lugar de limitarse a los 20 de origen natural, se usaría un PackerPalette para añadir los NCAA deseados.

Para más información sobre los PackerPalettes, consulta la [[página de PackerPalettes|PackerPalette]].

Mover <a name="mover" />
-----

El diseño de este objeto ha sido discutido por muchos desarrolladores de Rosetta, con el objetivo de crear una clase prototipo para representar cualquier tipo de operación sobre un Pose que cambie su estructura. La configuración de esta clase permite extenderla fácilmente para crear nuevos tipos compuestos de movimientos a partir de movimientos de un solo tipo. Cada Mover recibe un Pose y tiene un método «apply» que realizará ciertos cambios en el Pose. Ejemplos de movimientos de un solo tipo son SmallMover/ShearMove, que realizarán los movimientos clásicos pequeños/de cizalla de la cadena principal de Rosetta, y RigidBodyMover, que cambiará un DOF de cuerpo rígido (jump). MonteCarlo, la minimización y el packer también se pueden considerar tipos especiales de Movers. Por lo tanto, combinarlos puede crear Movers que realicen tareas como SmallMinTrial o RigidBodyPackerTrial, etc. Un solo Mover o una serie de Movers también se puede aplicar repetidamente durante cierto número de ciclos. Además, un protocolo en sí mismo se puede considerar un Mover compuesto que se construye esencialmente combinando objetos Mover de un solo tipo.

Para una lista de movers, consulta la [[lista de Movers de RosettaScripts|Movers-RosettaScripts]]

##Véase también

* [[Rosetta Basics]]: página principal de los fundamentos de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de conceptos de Rosetta.
* [[Glossary]]: definiciones breves de términos de Rosetta.
* [[Rosetta canon]]: lista de artículos importantes de Rosetta
* [[Symmetry]]: información sobre cómo trabajar con simetría en Rosetta
* [[Resources for learning biophysics and computational modeling]]
* [[Rosetta Timeline]]: historia de Rosetta
* [[Development Documentation]]: página para quienes quieren escribir código nuevo para Rosetta
