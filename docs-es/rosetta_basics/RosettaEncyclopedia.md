# Enciclopedia de Rosetta

[[_TOC_]]

### Muestreo de cadena rota (Jumping) 

El muestreo de cadena rota (Jumping) es una herramienta importante para mejorar el muestreo de proteínas con hebras beta de alto orden de contacto y para permitir volver a muestrear topologías específicas de hebras beta durante RASREC. Para formar un contacto hebra-hebra específico entre dos residuos i y j, la cadena se corta en cualquier lugar (preferiblemente en regiones de loop) entre los residuos i y j. Las dos cadenas independientes se ponen entonces en contacto en los residuos i y j usando una de las orientaciones relativas de cuerpo rígido que se encuentran en la base de datos de hebra-hebra (main/database/scoring/score_functions/jump_templates_SSpairs_v2.dat). El muestreo generalizado de fragmentos implementado en ROSETTA3 permite además muestrear otras orientaciones relativas de cuerpo rígido de la base de datos de hebra-hebra durante las etapas de ensamblaje de fragmentos de los protocolos de cálculo de estructuras. Los fragmentos tomados de la base de datos de hebra-hebra se caracterizan por su dirección (paralela, antiparalela) y su plegamiento (los átomos CA apuntan hacia dentro o hacia fuera). Como el intercambio de conformaciones entre estas clases sería demasiado disruptivo durante el plegamiento, seleccionamos una de las 4 clases para cada posición de salto al comienzo de una simulación de plegamiento y luego intercambiamos fragmentos para cada posición de salto según la identidad de su clase.
La posición y la clase de los contactos hebra-hebra pueden definirse mediante archivos de entrada. Es posible definir varios pares para saltos, incluidas varias clases (dirección, plegamiento) para el mismo par de residuos. En ese caso, los pares y las clases de contacto específicos se seleccionan al azar al comienzo de cada trayectoria de plegamiento y después se mantienen constantes.

La topología de hebras beta es el conjunto de pares de residuos unidos por enlaces de hidrógeno de la cadena principal y para los cuales ambos residuos están en conformación extendida (lámina beta). Estos pares suelen organizarse en tramos paralelos o antiparalelos, a los que llamamos contactos hebra-hebra. Los contactos hebra-hebra antiparalelos que comienzan con el emparejamiento de los residuos i, j tienen también los pares i+1, j-1, i+2, j-2, etc. Por tanto, tiene sentido definir una cantidad invariante, llamada registro, para cada par i,j como r=j-i para j>i. En los contactos hebra-hebra paralelos el registro se define como r=i+j. A veces se omite un residuo, lo que crea un abultamiento y provoca un cambio del registro dentro de un único contacto hebra-hebra. ROSETTA3 tiene un formato de archivo condensado para describir con precisión esas topologías. Un archivo de topología de este tipo puede crearse con la aplicación r_pdb2top, usando como entrada estructuras en formato pdb o silent. Si se usan varias estructuras como entrada, el programa crea una descripción de topología para cada estructura de entrada y además puntúa las topologías de modo que las que tienen un consenso alto entre los modelos de entrada se clasifican mejor. Esta puntuación se describe en detalle en la ref. [Lange2012a].

Con el archivo de configuración del broker (-broker:setup) se puede añadir un TemplateJumpClaimer para muestrear topologías específicas de láminas beta. Dado un archivo de topología (r_pdb2top) con topologías específicas y clasificadas, el TemplateJumpClaimer seleccionará al azar, para cada trayectoria, una topología de entre las mejor clasificadas (de un archivo de topología creado con r_pdb2top). De la topología seleccionada elige a continuación al azar un subconjunto de los contactos hebra-hebra que se impondrán mediante saltos. Para cada contacto hebra-hebra elegido se elige al azar un par de residuos para el salto residuo-residuo real. El plegamiento y la dirección de este salto vienen dados por la topología. La opción -templates:topology_rank_cutoff controla qué topologías del archivo de entrada pueden elegirse.

Si no se dispone de topologías de hebras beta, también se puede definir simplemente una lista de pares residuo-residuo, incluida su clase de contacto (dirección, plegamiento), para imponerlos como saltos hebra-hebra. Si se da un archivo así, el TemplateJumpClaimer seleccionará saltos de esta lista y usará la información de estructura secundaria (proporcionada por un archivo psi-pred) para evitar seleccionar pares incompatibles (como dos pares dentro del mismo contacto hebra-hebra). Este mecanismo se usa durante la etapa temprana del protocolo RASREC.

Por cada salto que fija un contacto hebra-hebra, el protocolo tiene que introducir una ruptura de cadena artificial para evitar la circularidad en el AtomTree. Esta ruptura de cadena tiene que cerrarse antes de que la estructura pueda refinarse en la etapa de relax. Para preparar el cierre, aumentamos progresivamente una penalización de energía de ruptura de cadena. Durante las etapas ab initio stageI a stageIII se usa el término de energía linear_chainbreak. Durante la etapa IV se activa además overlap_chainbreak. El peso del término de energía linear-chainbreak se calcula como W=S*IC, donde IC viene dado por la opción -jumps::increase_chainbreaks
con valor por defecto 1.0, y S depende de las etapas como sigue: 0.25/3, 2.5/3*IP, 0.5/3*IP, (1.5*IP+2.5)/3 para las etapas stageII, stageIIIa, stageIIIb y stageIV, respectivamente, e IP el progreso intraetapa (0...1, para las etapas de varios bloques stageIII y stageIV).

[Lange2012a] Resolution-adapted recombination of structural features significantly improves sampling in restraint-guided structure calculation., Lange, Oliver F., and Baker David, Proteins, 2012/00/01, Volume 80, Issue 3, p.884 - 895, (2012)

### Energía de ruptura de cadena

La energía de ruptura de cadena (chainbreak) se usa para penalizar rupturas de cadena no físicas, como las que ocurren durante la construcción de loops, el cierre de loops y el jumping ab initio. Estos protocolos introducen rupturas de cadena para evitar circularidades en el AtomTree. Esto permite usar la cinemática del sistema para mantener fijos grados de libertad seleccionados y así abrir otros grados de libertad a un muestreo amplio. Por ejemplo, en la construcción de loops, un salto conecta los dos extremos de la región de loop muestreada e introduce una nueva ruptura de cadena en algún lugar del loop entre los extremos del salto. El efecto es que la región de loop pasa a constar de dos cadenas peptídicas terminales que pueden moverse sin afectar al resto de la conformación de la proteína. Con este principio de muestreo de cadena rota, el espacio conformacional del loop puede muestrearse ampliamente. Sin embargo, después el loop tiene que volver a cerrarse. Rosetta ofrece movers dedicados al cierre cinemático de loops, pero estos pueden crear loops bastante distorsionados si el loop no es ya suficientemente parecido a uno cerrado. Por eso, el primer paso del cierre suele ser emplear una energía de penalización para loops abiertos mientras se continúa el muestreo basado en energía (p. ej., MonteCarlo, TrialMove). Esta energía de penalización la dan los ScoreType chainbreak, linear_chainbreak y overlap_chainbreak.

    * chainbreak Una penalización cuadrática de la distancia entre los extremos de la cadena
    * linear_chainbreak Una penalización lineal de la distancia entre los extremos de la cadena
    * overlap_chainbreak Una penalización lineal de la orientación de los planos peptídicos en los extremos de la cadena 

Para calcular distancias y orientaciones se introducen átomos virtuales en los extremos de cadena respectivos usando las variantes de tipo de residuo. Para un punto de corte en el residuo i son

    * protein_cutpoint_upper introduce el átomo virtual OVU1 (para emparejarlo con el átomo C del residuo i
    * protein_cutpoint_lower introduce los átomos virtuales OVL1 y OVL2 (para emparejarlos con los átomos N y CA del residuo i+1) 

Para calcular la distancia y el solapamiento de orientación, los átomos C(i), N(i+1) y CA(i+1), y sus contrapartes virtuales correspondientes (OVU1, OVL1 y OVL2), respectivamente, se identifican entre sí para calcular distancias y diferencias en la orientación del plano peptídico.

### Restricciones

Las constraints deberían llamarse en realidad restraints, pero el uso incorrecto del nombre tiene su historia en Rosetta. Una restricción en Rosetta se implementa como un potencial de sesgo, a menudo armónico, que causa una penalización de energía si un cierto parámetro se aleja mucho de su valor fijado. Si se optimiza la energía total durante una simulación estructural, una restricción puede así aumentar el número de estructuras finales en las que el parámetro respectivo está cerca del valor fijado de la restricción. Si de verdad se quiere restringir un cierto grado de libertad, es decir, que una cierta longitud sea exactamente el valor especificado o que una torsión no se mueva, se suele imponer esto seleccionando con cuidado el conjunto de movimientos (de modo que un grado de libertad interno concreto no se mueva) y cambiando la cinemática de modo que la longitud, el ángulo o la torsión de interés se conviertan en un grado de libertad interno (véanse FoldTree y AtomTree).

### Determinista

En general, Rosetta no es determinista. Rosetta es un conjunto de algoritmos y protocolos, pero el algoritmo subyacente de muchos protocolos se llama Markov Chain Monte Carlo (MCMC) y es estocástico (aleatorio). De forma abstracta, los algoritmos MCMC permiten a los usuarios extraer muestras de una distribución sin conocimiento explícito de toda la estructura de la distribución (aunque se requiere algún conocimiento sobre las restricciones de la distribución). Rosetta se construyó para realizar cambios estructurales y puntuaciones de forma eficiente, de modo que las trayectorias individuales sean computacionalmente baratas. Así, no se espera que una trayectoria individual, como un único trabajo ab initio, dé una predicción muy buena. Con suficientes ensayos (muestreo adecuado), uno o más ensayos darán estimaciones muy buenas (de baja puntuación) de la estructura desconocida.
Al ser un algoritmo estocástico, el resultado real (con un muestreo adecuado) es una distribución de estructuras. Sin embargo, el espacio de búsqueda de casi todas las preguntas sobre conformaciones de proteínas es demasiado grande para extraer fácilmente características estadísticas. Pueden usarse muchas técnicas estadísticas para analizar el conjunto de estructuras (decoys) que produce un protocolo de Rosetta, pero ninguna es universalmente aplicable. De forma simplista, esto significa que cada nueva trayectoria tiene la posibilidad de producir una estructura de baja puntuación (lo más probable, parecida a la nativa) y, por tanto, más trayectorias dan una mayor probabilidad de producir una estructura realista.
Normalmente 800 o más trayectorias bastan para producir resultados útiles, aunque depende de la aplicación. Al desarrollar nuevos algoritmos, construye un conjunto de estructuras de benchmark con el que comparar. Como es habitual en el software de bioinformática, algunos parámetros de cualquier algoritmo se ajustarán a partir de un conjunto de prueba. Esto no significa que los ensayos individuales en Rosetta sean inútiles. Como mínimo, la salida es indicativa del muestreo realizado por el algoritmo. Varias herramientas de Rosetta son deterministas (como la minimización). Al probar nuevos protocolos o Movers, intenta averiguar si la aplicación tiene mucha variabilidad o realiza pequeños cambios aleatorios.

### FoldTree y AtomTree 

La cinemática del modelo molecular, es decir, cómo están conectados los átomos, se representa en una estructura de grafo no cíclico llamada AtomTree. Si tu sistema molecular es una proteína de una sola cadena, la raíz del árbol es el átomo N de la cadena principal del extremo N-terminal. El átomo CA se considera un hijo de este nitrógeno y un punto de ramificación. Una rama del árbol se adentra en la cadena lateral, mientras que la otra rama avanza a lo largo de la cadena principal de la proteína. Las aristas del árbol (es decir, las conexiones entre átomos) almacenan las coordenadas internas que representan la conformación de la estructura. En Rosetta domina la representación en coordenadas internas, y las coordenadas xyz se calculan como datos derivados, empezando por (0,0,0) para el átomo raíz y avanzando por el árbol aplicando las 3 coordenadas internas (longitud de enlace, ángulo y torsión) almacenadas en cada arista. Las proteínas pueden tener geometría ideal, es decir, las longitudes y los ángulos de enlace se fijan en valores estándar (dependientes del residuo), y para estas proteínas solo hay que registrar el grado de libertad de torsión. Mientras solo se manipulen los grados de libertad de torsión, la proteína permanece en geometría ideal, lo que demuestra la ventaja de la representación en coordenadas internas frente a una representación cartesiana.

Si la Pose contiene varias cadenas peptídicas, una arista especial llamada Jump conecta el extremo C-terminal de la primera cadena con el extremo N-terminal de la segunda. Como no hay restricciones cinemáticas para una arista Jump, esta arista almacena los 6 grados de libertad completos de traslación y rotación.
 Como generalización de este concepto, Rosetta permite colocar aristas jump en medio de las cadenas de proteína. En este caso hay que introducir rupturas de cadena en consecuencia para evitar ciclos en el AtomTree. Estas aristas jump intracadena permiten, p. ej., remodelar loops sin mover el resto de la estructura. Una segunda aplicación importante de los saltos intracadena es el modelado de topologías de láminas beta, donde los emparejamientos de hebras predeterminados se imponen durante toda la simulación mediante saltos.

El FoldTree es una abstracción de baja resolución del AtomTree. Los nodos del Fold-Tree son residuos en lugar de átomos. Además, tramos consecutivos enteros de residuos se resumen en una sola arista peptídica, de modo que un Fold-Tree consta solo de aristas peptídicas y aristas jump entre residuos. En la forma más simple, una proteína de una sola cadena sin saltos intracadena, el Fold-Tree contendría una sola arista peptídica que va del residuo 1 al N. Si se quiere remodelar un loop de, digamos, los residuos 42-52 con un salto de 41-53 y una ruptura de cadena en 48, el fold-tree correspondiente contendría las aristas peptídicas 1-41, 41-48, 53-48 y 53-N, y una arista jump 41-53. Obsérvese la dirección de plegamiento invertida para 53-48.

### Ensamblaje de fragmentos (Abinitio)

El ensamblaje de fragmentos describe el protocolo básico de Rosetta para la predicción de estructuras de novo. Los fragmentos proporcionados mediante una biblioteca de fragmentos se seleccionan al azar y se insertan en la cadena principal de la proteína.

En este contexto, un fragmento es una conformación concreta de la cadena principal de una proteína, de ARN o de ADN. Normalmente, los fragmentos son la conformación de unidades monoméricas consecutivas cortas (p. ej., residuos, bases), pero el concepto también se ha generalizado para permitir la descripción de conformaciones de cadena rota, como los residuos de dos hebras beta en contacto[1]. En el primer caso, la conformación de un fragmento se caracteriza por un conjunto de torsiones de la cadena principal (p. ej., ángulos phi, psi, omega) y, en el segundo, la conformación consiste en torsiones de la cadena principal y transformaciones de cuerpo rígido (Jump).

Antes de que pueda comenzar el ensamblaje de fragmentos, hay que construir una biblioteca de fragmentos. Es decir, para cada conjunto de grados de libertad (p. ej., torsiones de la cadena principal de la proteína, Jumps) en el que deba tener lugar el muestreo conformacional, hay que obtener fragmentos. Para el protocolo estándar de predicción de estructuras de proteínas de novo, usamos el fragment picker para seleccionar fragmentos de 3 y 9 residuos de longitud de una biblioteca maestra precalculada de estructuras de proteínas de alta resolución (esta biblioteca se llama vall). El fragment_picker se basa en la observación de que la secuencia por sí sola ya determina la conformación de tramos cortos de la cadena principal de la proteína[ref]. En CS-Rosetta, la calidad (es decir, exactitud y precisión) de los fragmentos seleccionados mejora enormemente al usar información de desplazamientos químicos además de la información de secuencia[Lange2012a]. Normalmente elegimos 200 fragmentos por posición.

Para el muestreo de saltos beta, los fragmentos se clasifican en 4 tipos según la dirección (paralela, antiparalela) y el plegamiento (hacia dentro, hacia fuera) del contacto hebra-hebra. Un archivo de la base de datos de Rosetta tiene aprox. 1000 conformaciones en cada categoría, tomadas de estructuras de proteínas de alta resolución. Para su selección no se usa más información que la categoría. 

[Lange2012a] Resolution-adapted recombination of structural features significantly improves sampling in restraint-guided structure calculation.,
Lange, Oliver F., and Baker David, Proteins, 2012/00/01, Volume 80, Issue 3, p.884 - 895, (2012)

#### Biblioteca de fragmentos 

La biblioteca de fragmentos es un archivo que contiene muchas conformaciones posibles (fragmentos) para un conjunto dado de grados de libertad. Una biblioteca de fragmentos para la cadena principal de la proteína (protocolo abrelax) contiene un conjunto de fragmentos para cada posición (solapante). La biblioteca de fragmentos se genera con la aplicación fragment_picker.

#### Movimientos de fragmentos

El movimiento de fragmento típico es el reemplazo de los ángulos de torsión de un tramo de residuos consecutivos por los ángulos de torsión almacenados en la biblioteca de fragmentos. Los movimientos de este tipo se muestrean aplicando a la Pose objetos del tipo FragmentMover.
La biblioteca de fragmentos se prepara para una proteína específica y es específica de posición. El protocolo abrelax estándar usa los primeros 200 fragmentos de 3 residuos almacenados en una biblioteca de fragmentos de 3 residuos y los primeros 25 fragmentos de 9 residuos almacenados en la biblioteca de 9 residuos respectiva. Las bibliotecas de fragmentos se indican con las opciones (-abinitio:frags3 y -abinitio:frags9). Sin embargo, al protocolo no le importa el tamaño exacto de los fragmentos, de modo que las mismas opciones (o sus alias -abinitio:frags_small -abinitio:frags_large) pueden usarse para dar cualquier tipo de biblioteca de fragmentos. Los fragmentos de 9 residuos o grandes se usan durante las etapas ab initio I-III y los fragmentos de 3 residuos o más pequeños se usan durante la etapa IV para lograr un muestreo más fino.

Ten en cuenta que el comportamiento por defecto del fragment_picker es generar 200 fragmentos de cada tamaño (de 3 y de 9 residuos), de modo que los 175 fragmentos de 9 residuos de menor clasificación se ignoran. Si quieres incluir todos los fragmentos en tu biblioteca de fragmentos, sea como sea, puedes usar la opción ( -abinitio:number_9mer_frags 0 ).

Es importante ser consciente de que el proceso de selección de fragmentos puede elegir fragmentos de estructuras de proteínas homólogas. Si usas ROSETTA para modelar una estructura desconocida, es por supuesto una ventaja que haya información de homólogos disponible y puedas conservar los fragmentos homólogos. Si, en cambio, estás haciendo un benchmark de un protocolo para hacerte una idea de lo bien que funciona ROSETTA, o para desarrollar nuevos protocolos, quizá quieras eliminar los fragmentos homólogos.

### Distribuidor de trabajos (JD2) 

La mayoría de los protocolos de Rosetta toman 0 o 1 estructuras de entrada y generan exactamente 1 estructura de salida. Normalmente se quieren ejecutar estos protocolos repetidamente y, preferiblemente, distribuir esa carga de trabajo entre varios procesadores. El distribuidor de trabajos (Job-Distributor) se encarga de los aspectos técnicos de esto en distintas plataformas y sistemas de colas y de proporcionar una interfaz común para todas las aplicaciones.

(Ten cuidado: existe una versión obsoleta del distribuidor de trabajos que también conduce a una interfaz y un comportamiento ligeramente distintos. El
 distribuidor de trabajos con el que debes trabajar exclusivamente tiene el espléndido nombre de JD2. Si usas una aplicación obsoleta, puede que seas víctima del distribuidor de trabajos llamado «jobdist». Si es así, insiste de forma impertinente a tu desarrollador de Rosetta favorito hasta que actualice la aplicación a JD2. No es difícil hacerlo.)

### Move (movimiento)

Un move es un cambio en la conformación de la molécula en la Pose. Un move invalida las energías almacenadas en caché en el objeto Pose y, por tanto, requiere volver a aplicar la ScoreFunction a la Pose. Un TrialMover es un move seguido de una evaluación de la energía y de la aplicación del criterio de Metropolis. Si el trial-move es rechazado por el criterio de Metropolis, la Pose se restablece a la conformación anterior (previa al move).

Como el move es un concepto tan central, Rosetta proporciona la abstracción de clase llamada Mover. Un objeto de tipo Mover puede aplicarse a una Pose y cambia su estado y/o su conformación. Los objetos Mover permiten preestablecer ciertos parámetros (p. ej., un tamaño de paso o un residuo pivote) y normalmente se aplican a la Pose varias veces durante el muestreo. La ventaja del objeto Mover es que puede pasarse a código que implementa un protocolo de optimización genérico, como el recocido simulado.

Como un mover es simplemente un objeto que puede cambiar el estado de una Pose de alguna manera predefinida, los objetos Mover también se usan con frecuencia para tareas de configuración, como añadir un conjunto de restricciones a la Pose.

### Pose
La Pose es el contenedor del sistema molecular, incluida su estructura química, cinemática y conformacional. La Pose también contiene el objeto Energies, que almacena la información de energía después de aplicar una función de puntuación. Las restricciones experimentales, como las restricciones de distancia (ConstraintSet), los datos de RDC (acoplamiento dipolar residual) y de PCS (desplazamiento pseudocontacto), también se almacenan a menudo en el objeto Pose para hacerlos accesibles a la puntuación incluso en lo profundo de las subrutinas del programa. 

Contiene los residuos numerados de 1 a N. Aunque haya varias cadenas presentes (como, p. ej., en docking), la numeración será consecutiva y empezará en 1. La Pose contiene tu molécula en una conformación concreta y recuerda los valores de energía de la última puntuación aplicada a la Pose. Así, al escribir la Pose en un archivo (como PDB o mediante SilentIO) se obtiene la estructura y la información de las puntuaciones. En formato PDB, las puntuaciones se escriben después de las coordenadas. En formato Silent-IO, las puntuaciones se escriben antes de las coordenadas, en una línea especial que comienza con la palabra “SCORE:”

### Modelo de proteína 

Rosetta representa las proteínas como un polímero de residuos. La definición química de los residuos se llama ResidueType y se define en archivos params de la base de datos o de tu directorio local. Los aminoácidos estándar están, por supuesto, predefinidos en la base de datos. Además de la posibilidad de definir nuevos ResidueType, también se pueden definir parches (patches) de tipo de residuo. Estos últimos son particularmente útiles para definir pequeñas modificaciones de los residuos (p. ej., los átomos adicionales en los residuos terminales, la fosforilación y otras modificaciones postraduccionales, pero también la adición de átomos virtuales, p. ej., para permitir el cálculo de energías de ruptura de cadena)

    * Modelo centroid: La representación de baja resolución
    * Modelo fullatom: La representación de todos los átomos

#### Modelo centroid

El modo de baja resolución de Rosetta se denomina a menudo modo centroid, porque los átomos de la cadena lateral de cada aminoácido se representan mediante una única esfera centroide. Para añadir un toque de incoherencia, la representación del modo centroid tiene también un átomo CB explícito, pero no átomos HA ni HB. Como los átomos HA son a menudo fuentes importantes de restricciones (NOE) en la determinación de estructuras por RMN, y su posición en geometría ideal es conocida, se ha implementado una variante centroid que contiene también átomos HA explícitos. Esta variante se activa con la opción -residues:patch_selectors CENTROID_HA (véase Parches de ResidueType de uso frecuente).

#### Modelo fullatom

En la representación de todos los átomos de ROSETTA, cada átomo se representa explícitamente. Cabe destacar que los nombres de los protones son bastante distintos de los usados en la comunidad de RMN (<https://bmrb.io/standards/>). Hay dos diferencias principales: a) si solo hay 2 protones en un carbono con hibridación sp3, Rosetta los numera 1, 2, mientras que la comunidad de RMN los numera 2, 3. b) Rosetta pone el número que diferencia los protones unidos al mismo carbono delante del nombre del átomo, mientras que la comunidad de RMN pone este número al final del nombre del átomo. El resto del nombre del átomo se obtiene normalmente tomando el nombre del carbono y sustituyendo C->H. CD1 –> nHD1, donde n=1,2,3 es el número de identificación del protón.

RMN 			Rosetta

HB2, HB3 		1HB, 2HB

HG12, HG13 		1HG1, 2HG1

HD11, HD12, HD13 	1HD1, 2HD1, 3HD1

... 			...

### Protocolo

Un protocolo no es una definición estricta en Rosetta. Un protocolo describe normalmente un conjunto de código de alto nivel que combina el uso de Poses, ScoreFunctions y Movers. Un protocolo a menudo se lee como una receta de cocina:

    * aplica los Movers X e Y. 
    * repite 10 veces aplicaciones del Mover Z, minimización y puntuación final. 
    *conserva la Pose de menor puntuación de los 10 ciclos 
	
Un protocolo de recocido simulado demuestra la utilidad de la abstracción Mover, ya que permite especificar el protocolo sin especificar el movimiento exacto usado durante el muestreo:

    * inicializa la temperatura T=10000 
    * LOOP 
    * registra la Pose actual para el paso de Metropolis 
    * aplica un movimiento 
    * vuelve a la Pose guardada según el criterio de Metropolis 
    * reduce la temperatura en dT=10 
    * repite durante 1000 pasos desde LOOP Protocols

Los protocolos suelen implementarse en C++, pero también pueden implementarse usando los enlaces de Python (REF) o usando XML dentro del marco de Rosetta-scripts (REF).

### Base de datos de Rosetta 

La base de datos contiene parámetros y ajustes comunes que no son específicos de un sistema concreto.
 Eres responsable de indicar a la aplicación de Rosetta dónde se encuentra la base de datos (p. ej., con la opción -database ). Una alternativa cómoda es establecer la variable de entorno ROSETTA3_DB en tu .bashrc o .cshrc. Los usuarios de Bash, por ejemplo, insertarían la línea export ROSETTA3_DB=$HOME/rosetta/main/database si hubieran instalado la distribución de Rosetta en su directorio personal.

### ScoreFunction 

La ScoreFunction es una lista de pesos para términos de puntuación predefinidos (p. ej., vdw, env, fa_atr...). Los términos de puntuación representan una cierta interacción física cuyo cálculo se ha implementado como un EnergyMethod en Rosetta. La puntuación total de una Pose se calcula como la suma ponderada de las contribuciones individuales de los términos distintos de cero de la ScoreFunction. Al cambiar un peso de 0.0 a un valor distinto de cero se activa el cálculo de puntuación respectivo.

Las ScoreFunctions se cambian a menudo a lo largo de un protocolo, lo que simplemente significa que un conjunto de pesos se intercambia por otro conjunto de pesos (p. ej., véase Ensamblaje de fragmentos (Abinitio) ).

Algunos conjuntos de pesos predefinidos pueden encontrarse en la base de datos de Rosetta, en scoring/weights/.... Muchas aplicaciones de Rosetta respetan las opciones -score:weights y -score:patch para elegir el archivo de pesos (de la base de datos o del directorio local) y permiten la aplicación sucesiva de parches. Por desgracia, el uso de estas opciones concretas no es coherente en todas las aplicaciones, y otras requieren especificar más de una ScoreFunction. En este último caso, las opciones estándar se suelen usar para especificar la ScoreFunction empleada para calcular la puntuación de la estructura de salida final.

Pueden añadirse nuevos términos de puntuación como un nuevo EnergyMethod en Rosetta, pero esto es algo complicado y requiere conocimientos de C++.
Sin embargo, la mayoría de las cosas pueden lograrse cambiando los pesos de los términos de puntuación.

### Silent files

El formato silent file es un formato (de trayectoria) propio de Rosetta que se usa para almacenar conjuntos de estructuras. Normalmente son las estructuras finales de un protocolo de determinación de estructuras, pero también pueden ser estructuras recogidas de varias ejecuciones en un cierto punto de control intermedio o una trayectoria completa de una sola ejecución. 

Un fotograma de un silent file lo controla la clase SilentStruct y es casi una serialización completa de un objeto Pose. El fotograma contiene la secuencia anotada para reconstruir la identidad química de la Pose (modificaciones de residuos, estados de protonación y ligandos) y la reconstrucción de los grados de libertad internos. Si se usa un FoldTree no trivial, una entrada correspondiente permite reconstruir la cinemática. Existen distintas clases SilentStruct para dar cuenta de la distinta naturaleza de las estructuras que hay que almacenar. Las Poses ideales solo requieren guardar los ángulos de torsión de la cadena principal y de las cadenas laterales, lo que gestiona ProteinSilentStruct. Las Poses no ideales, como las que aparecen después de, p. ej., la construcción de loops, las almacena BinarySilentStruct. El ARN se almacena en instancias de las clases correspondientes RNASilentStruct y RNABinarySilentStruct. 

Además de la información química, cinemática y conformacional, el fotograma contiene también un conjunto de puntuaciones. Se encuentran en una línea que comienza con 'SCORE:' y generalmente van precedidas de 'score', que es la suma ponderada de los términos de puntuación individuales y depende de la ScoreFunction usada por última vez para puntuar la Pose antes de almacenarla. Además de las puntuaciones, que tienen que ser un ScoreType real, la línea de puntuación puede contener también otra información que se ha añadido durante la ejecución de un protocolo mediante varios mecanismos, incluidos PoseEvaluator, PoseMetric y Filter.

 Los encabezados de columna que identifican los términos de puntuación se dan en la segunda línea del silent file. Los encabezados de columna no suelen repetirse en cada línea de puntuación, lo que puede causar problemas si el número de columnas cambia debido a un comportamiento heterogéneo del protocolo (p. ej., el muestreo se termina en distintas etapas de filtrado). En esos casos es aconsejable usar la opción de línea de comandos -out:file:silent_print_all_score_headers. 

Cada fotograma de un silent file tiene un identificador único, al que en lenguaje coloquial se le llama decoy-tag. El decoy-tag está al final de cada línea que pertenece al fotograma respectivo, lo que permite usar grep para extraer fotogramas de la estructura silent. Cada fotograma de un silent file es independiente, por lo que se pueden usar herramientas sencillas de Python para gestionar silent files (p. ej., extraer subconjuntos de decoys, concatenar archivos, etc.). Las herramientas más importantes proporcionadas son silent_data.py, extract_decoys.py y extract_pdbs. La primera permite extraer la información de puntuación del silent file, extract_decoys.py permite filtrar las estructuras contenidas en el silent file y extract_pdbs permite extraer estructuras de un silent file y guardarlas en formato PDB. 

Ten en cuenta que pueden surgir problemas si a) los decoy-tags no son únicos (p. ej., tras la concatenación) o b) el número de columnas de la línea SCORE: cambia.  Las herramientas de Python proporcionadas pueden manejar un número cambiante de columnas si se proporciona una nueva línea de encabezado SCORE antes de cada cambio de columnas (véase más arriba; -out:file:silent_print_all_score_headers). Sin embargo, los comandos grep simples pueden perder el encabezado SCORE modificado, y por eso deben usarse con cuidado. 

El formato de trayectoria se usa ahora ampliamente en la comunidad de Rosetta y se recomienda frente al uso de archivos PDB individuales.


##Véase también

* [[FAQ]]: Preguntas frecuentes
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Rosetta canon]]: Lista de artículos importantes de Rosetta
* [[Resources for learning biophysics and computational modeling]]
* [[Rosetta Timeline]]: Historia de Rosetta
* [[Units in Rosetta]]: Explica las unidades de medida usadas en Rosetta
* [[Solving a Biological Problem]]: Guía para aplicar Rosetta a tu problema biológico

<!--- search optimization
pose
pose
pose
pose
pose
pose
pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

pose
pose
pose
pose
pose
pose

encyclopedia
encyclopedia
encyclopedia
encyclopedia
encyclopedia
encyclopedia
encyclopedia
encyclopedia

--->
