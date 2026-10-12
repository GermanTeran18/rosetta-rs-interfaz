#Aplicación Match

Metadatos
========

Autores: Florian Richter, Andrew Leaver-Fay

Este documento fue escrito por Florian Richter y Andrew Leaver-Fay en agosto de 2010. La sección sobre la generación de rejillas de ligando fue escrita por Lucas Nivon. La aplicación `       match      ` la mantiene el laboratorio de David Baker. Envía tus preguntas a (dabaker@u.washington.edu)

Código y demo
=============

El ejecutable del matcher se compila a partir de rosetta/main/source/src/apps/public/match/match.cc. Las clases que constituyen el matcher están en el directorio (y los subdirectorios de) rosetta/main/source/src/protocols/match/ y rosetta/main/source/src/protocols/toolbox/match\_enzdes\_util/. Los detalles de muchas de las clases se describen con más detalle en las etiquetas doxygen, y se recomiendan como fuente de más detalles de los que se pueden dar en este documento. Las demos del matcher están en rosetta/main/tests/integration/tests/match/.

Referencias
==========

El algoritmo del matcher se publicó en:

Alexandre Zanghellini, Lin Jiang, Andrew M. Wollacott, Gong Cheng, Jens Meiler, Eric A. Althoff, Daniela Rothlisberger, and David Baker. (2006) "New algorithms and an in silico benchmark for computational enzyme design" Protein Science. 15. 2785–2794.

Como se indica en Matcher.cc, este protocolo fue portado a Rosetta 3.x por Andrew Leaver-Fay y Florian Richter. Algunas de las funciones adicionales disponibles en la versión de Rosetta 3.x se describen en:
 Richter F, Leaver-Fay A, Khare SD, Bjelic S, Baker D (2011) De Novo Enzyme Design Using Rosetta3. PLoS ONE 6(5): e19230. doi:10.1371/journal.pone.0019230

Propósito de la aplicación
===========================================

En resumen:

La aplicación matcher puede recorrer una cadena principal de proteína ("andamiaje") para encontrar posiciones en las que se pueda introducir un sitio de unión para una molécula pequeña deseada (o una biomolécula, en el caso más general), la diana. La diana consta de una molécula y un conjunto de interacciones deseadas de cadenas laterales con esa molécula. Por ejemplo, la diana podría tener un grupo amino con el que el usuario quiere formar un enlace de hidrógeno desde el carboxilo de una cadena lateral. Esa interacción se especifica mediante un archivo de restricciones (\*.cst); este archivo puede usarse tanto para el matching como, más adelante, para el diseño de enzimas. La salida del matcher será un conjunto de Poses de la diana en el andamiaje, con las cadenas laterales deseadas colocadas según se especifica en el archivo de restricciones; si el matcher no encuentra coincidencias, no habrá salidas. El matcher puede usarse con un gran conjunto de andamiajes de cadena principal de proteína como una serie de trabajos independientes, pero cada trabajo solo examinará un único andamiaje.

En detalle:

El algoritmo del matcher se concibió originalmente en el ámbito del diseño de enzimas. El estado de transición de la reacción deseada es contactado por varios aminoácidos, cada uno con una geometría particular. El objetivo del matcher es encontrar un conjunto de posiciones de la cadena principal en un andamiaje proteico dado donde esos aminoácidos puedan injertarse de modo que contacten con el estado de transición con la geometría deseada.

Consideremos un caso en el que el estado de transición es contactado por una asparagina, un aspartato y una histidina. El usuario que diseña una enzima para este estado de transición conoce la geometría que describe la orientación del estado de transición respecto a cada una de estas cadenas laterales; lo que no sabe es en qué proteína ni en qué posiciones debe introducir estos aminoácidos. El usuario le dará al matcher una descripción de la geometría entre los aminoácidos y el estado de transición, la "geometría externa". Esta geometría tiene la forma de 6 parámetros: 3 diedros, 2 ángulos y 1 distancia (más sobre esto después). Dadas las coordenadas de una cadena lateral concreta y la geometría que describe el estado de transición respecto a la cadena lateral, se pueden calcular las coordenadas del estado de transición. En cierto sentido, el estado de transición puede "crecer" desde el extremo de una cadena lateral con la geometría deseada.

(Normalmente, el usuario especificará muchos valores posibles distintos para cada uno de los 6 parámetros, y el matcher considerará entonces todas las combinaciones de esos valores. Por ejemplo, la distancia ideal podría ser 2.0 A, pero el usuario podría pedirle al matcher que considere además los valores 1.95 y 2.05 A. Cada asignación de valores a estos 6 parámetros especifica por completo las coordenadas del estado de transición.)

El matcher examina cada restricción geométrica de una en una. Construye rotámeros para uno o más aminoácidos capaces de satisfacer una geometría deseada (p. ej., tanto ASP como GLU si se necesita un grupo ácido) en cada una de varias posiciones del sitio activo y, para cada rotámero, hace crecer el estado de transición. El matcher hace una comprobación rápida de colisiones entre los átomos del estado de transición y la cadena principal de la proteína, y rechaza las conformaciones del estado de transición que colisionan. Si la conformación está libre de colisiones, el matcher mide las coordenadas del estado de transición como un punto en un espacio de 6 dimensiones. (No es casualidad que haya 6 parámetros geométricos y que haya 6 dimensiones en el espacio que describe las coordenadas del estado de transición). Con esta coordenada de 6 dimensiones, el matcher puede recuperar las coordenadas del estado de transición: la coordenada 6-D y las coordenadas euclídeas completas del estado de transición son interconvertibles. El matcher también puede agrupar la coordenada en bins. Si dos coordenadas en 6-D están cerca, se asignarán al mismo bin. Esta es la idea fundamental del algoritmo de matching: el matcher hará crecer el estado de transición desde distintos residuos catalíticos y, cuando las coordenadas 6-d de distintos residuos catalíticos se asignan al mismo bin, el matcher ha encontrado un conjunto de conformaciones del estado de transición que son compatibles con más de una geometría catalítica.

Cada colocación libre de colisiones del estado de transición se llama "hit". Si hay N restricciones geométricas que se le pide al matcher que satisfaga, un conjunto de N hits, uno por restricción, que caen en el mismo bin se llama "match".

En el caso general, el Matcher construye hits para cada una de varias restricciones geométricas. El andamiaje proteico del ejemplo de diseño de enzimas se generaliza a cualquier andamiaje polimérico macromolecular. Los rotámeros de proteína del ejemplo de diseño de enzimas se generalizan a un conjunto de conformaciones del compañero "upstream" (aguas arriba). El estado de transición del ejemplo de diseño de enzimas se generaliza a un compañero "downstream" (aguas abajo), que a su vez puede tener múltiples conformaciones. "Upstream" y "Downstream" se refieren al orden en que se calculan las coordenadas de los dos compañeros. Las coordenadas upstream se construyen primero y las downstream después. Los cambios en las coordenadas del compañero upstream se propagan a las coordenadas del compañero downstream. En teoría, el compañero downstream también podría ser una proteína entera, y podría tener su propio conjunto de estados rotaméricos. Por ejemplo, se podría querer hacer coincidir un donante de enlaces de hidrógeno del andamiaje con una cadena lateral de serina de la proteína diana (downstream). El compañero downstream debería entonces poder examinar muchos rotámeros de serina para cada conformación del rotámero upstream. Sin embargo, el matcher todavía no está preparado para manejar proteínas enteras como compañeros downstream.

Un hit se representa en dos partes: una discreta y una continua. La parte discreta consta de cuatro enteros: 1. el índice del punto de construcción en el andamiaje, 2. el índice del rotámero en el compañero upstream, 3. el índice de la geometría externa y 4. el índice del rotámero en el compañero downstream. La parte continua consta de 6 valores de doble precisión que representan la coordenada del compañero downstream en 6D. Los tres primeros valores son las coordenadas x, y y z de un átomo concreto del compañero downstream. Los otros tres valores son los valores phi, psi y theta que describen el sistema de coordenadas en este átomo. Estos tres parámetros de "ángulos de Euler" describen tres rotaciones: Z(psi) \* X(theta) \* Z(phi) \* I. Se describen con más detalle en rosetta/main/source/src/numeric/HomogeneousTransform.hh, y la clase hit está en rosetta/main/source/src/protocols/match/Hit.hh "Phi" y "psi" aquí no tienen nada que ver con los ángulos de la cadena principal de la proteína. Cuando se agrupa un hit en bins, hay dos conjuntos de parámetros que describen la anchura que deben tener los bins en cada dimensión: las anchuras de bin euclídeas son para las coordenadas xyz y las anchuras de bin de Euler son para los ángulos de Euler. Las anchuras de bin euclídeas están en Angstroms y las anchuras de bin de Euler están en grados.

Algoritmo
=========

En resumen:

Una ejecución de matching toma un pdb de andamiaje que no contiene ligando, una especificación de la diana (archivo params y conjunto de posibles confórmeros en formato pdb) y una descripción de las restricciones deseadas (también llamada geometría externa) entre las cadenas laterales del andamiaje y la diana. Un archivo de restricciones tendrá varias restricciones específicas; por ejemplo, la restricción 1 desde un grupo carboxilo de Glu hasta una amida del ligando y la restricción 2 desde un OH de Tyr hasta un grupo C=O del ligando (usaremos estas restricciones de ejemplo en los párrafos siguientes). En el caso general, el andamiaje es "upstream" y la molécula diana (una molécula pequeña o una biomolécula) es "downstream".

El matching se realiza en dos pasos principales: la generación de hits a partir de cada restricción y después la enumeración de matches para encontrar hits compatibles de cada restricción. Dos hits "coinciden" (match) si ambos describen el ligando en el mismo bin en 6D (más sobre esto abajo).

En la generación de hits, cada restricción se examina en serie. La cadena lateral deseada se construye desde cada posición permitida del sitio activo (especificada en el archivo pos), probando todos los rotámeros y todas las geometrías cadena lateral-ligando permitidas del archivo de restricciones. Siempre que se encuentra una colocación del ligando que no choca con la cadena principal, el matcher registra un "hit". El hit, es decir, un objeto con 3 dimensiones espaciales y 3 dimensiones de ángulos de rotación que describe una colocación del ligando, se coloca en un bin en 6D, y ese bin se usa como clave de una tabla hash. Si dos hits están en el mismo bin 6D, significa que están prácticamente en el mismo punto del espacio y tienen una orientación casi idéntica. Si los espaciados de la rejilla son grandes, la desviación permitida dentro de un bin hash es correspondientemente grande. Esa colocación podría conducir a un match desde esa posición; p. ej., tiene la geometría correcta desde el carboxilo de Glu 50 hasta el NH de amida del ligando para la restricción 1. Sin embargo, para formar un match ese hit debe estar en el mismo bin 6D que otro hit de cada una de las demás restricciones. Si una restricción dada no genera hits, el matcher se detiene: se necesita un hit de cada restricción para obtener un match, así que, si una restricción no genera hits, no son posibles los matches.

Si cada restricción genera al menos un hit, el matcher pasa a la enumeración de matches. Se examina el mapa hash en el que se colocan todos los hits para encontrar los bins con hits de todas las restricciones. Un bin que contiene al menos un hit de cada restricción geométrica produce matches; un match es una combinación de hits que están todos en el mismo bin 6D; es posible que un bin contenga muchos hits y muchísimos matches.

En detalle:

Hay dos etapas de matching: 1) la generación de hits, donde se calculan las colocaciones geométricamente compatibles del compañero downstream, y 2) la enumeración de matches, donde se enumeran y se escriben las combinaciones de hits que caen en los mismos bins en 6D.

1.1 Generación de hits con el algoritmo de matching clásico desarrollado por Zanghellini et al.

Esta sección esboza el algoritmo de la rutina de "matching clásico". Los bucles descritos abajo son un poco distintos en las rutinas de "matching secundario".

El bucle externo de la etapa de generación de hits recorre todas las restricciones geométricas. En el caso de hacer matching en paralelo con OpenMP, conviene señalar que cada restricción geométrica se procesa por completo antes de empezar la siguiente.

Dentro del bucle sobre todas las restricciones geométricas hay un bucle sobre todas las "posiciones de construcción". Es decir, el usuario debe especificar qué residuos del andamiaje proteico merece la pena considerar. El usuario puede especificar posiciones de construcción distintas para cada restricción geométrica, o puede usar una sola lista de posiciones de construcción para todas las restricciones geométricas.

Dentro del bucle sobre todos los puntos de construcción hay un bucle sobre todos los aminoácidos que se pueden construir para la restricción geométrica dada. Dentro de este bucle hay un bucle sobre todos los rotámeros que se pueden construir para cada aminoácido. Dentro de este bucle hay un bucle sobre todas las formas posibles de hacer crecer el ligando desde un rotámero (p. ej., al hacer crecer un ligando desde un ASP, se pueden usar tanto OD1 como OD2, por lo que este bucle iterará sobre ambos átomos). Consideremos en este punto que tenemos un aminoácido concreto en un punto de construcción concreto, que hemos elegido un rotámero concreto de este aminoácido y que, desde este rotámero, hemos seleccionado un átomo (en realidad tres átomos; p. ej., al construir desde un ASP, o bien los tres átomos ( CG, CD, OD1 ) O los tres átomos ( CG, CD, OD2 )) desde el cual construir.

El siguiente bucle recorre todas las combinaciones de parámetros que describen la "geometría externa" que conecta la proteína con el ligando. Hay 6 parámetros que describen esta geometría: 3 diedros, 2 ángulos y 1 distancia. Para cada una de las combinaciones de la geometría externa, el matcher construye las coordenadas de tres átomos del estado de transición. A partir de aquí, el matcher considerará todas las conformaciones posibles del ligando, construyendo los átomos restantes del ligando con las coordenadas de los tres átomos que se construyeron en el paso anterior de construcción de la geometría externa. Cada una de las conformaciones del ligando en este punto podría convertirse en un hit. Hay cinco criterios que se usan para determinar si un hit no debe guardarse para seguir considerándolo:

a) Algún átomo del ligando colisiona con la cadena principal. Esta comprobación se realiza con una clase BumpGrid: un conjunto de rejillas 3D (cada una representada por una instancia de la clase Bool3DGrid), una para cada uno de los distintos radios atómicos del ligando, donde cada rejilla refleja la suma de Minkowski del átomo del ligando (la sonda) y los átomos de la cadena principal. Un vóxel de la rejilla del tipo de átomo i con radio ri contendrá "true" si todos los puntos dentro del vóxel están a menos de ( ri + rj ) de algún átomo j con radio rj, y "false" en caso contrario. Para hacer una comprobación de colisión de un átomo concreto del ligando con un radio concreto, el matcher selecciona primero la rejilla correspondiente. Luego calcula el vóxel 3D que contiene el centro del átomo del ligando. Si el valor de ese vóxel en la rejilla 3D es "true", el átomo está en colisión con la cadena principal; si es "false", el átomo no está en colisión con la cadena principal. Esta es una comprobación muy rápida. La tolerancia de colisión está integrada en esta rejilla en el momento de su construcción, de modo que, con una tolerancia t y un átomo sonda i con radio ri, todos los puntos de un vóxel deben estar a una distancia menor que ( ri + rj - t ) de algún átomo j con radio rj. La opción -bump\_check \<tolerance\> controla cuánta tolerancia de colisión se permite.

b) Algún átomo del ligando colisiona con algún átomo del residuo upstream. La tolerancia de colisión de esta comprobación se controla con la opción -updown\_collision\_tolerance \<tolerance\> o, si no se usa esta opción, con el valor especificado en la opción -bump\_check \<tolerance\>.

c) Esta no es la primera restricción geométrica que se examina y la coordenada 6D del ligando (la coordenada 6D consta de 3 coordenadas euclídeas y 3 coordenadas de Euler) cae en una región de 6D que no puede conducir a un match productivo. Si no puede conducir a un match productivo, no hay razón para almacenarla. ¿Cómo funciona esto? El matcher lleva la cuenta de todos los vóxeles 6D que podrían ser productivos. Mientras el matcher examina la restricción geométrica i, el vóxel v podría ser productivo si y solo si cada restricción geométrica 1..(i-1) produjo un hit que cayó en v. Ten en cuenta que en la ronda 1 todos los hits superan esta prueba. La estructura de datos responsable de guardar estos vóxeles es el OccupiedSpaceHash, que está en src/protocols/match/OccupiedSpaceHash.hh.

d) La coordenada euclídea 3D del hit queda fuera de la caja delimitadora 3D del OccupiedSpaceHash. Esta caja delimitadora debe especificarse de antemano (consulta la descripción de la opción -grid\_boundary \<fname\>)

e) Uno o más átomos críticos del ligando quedan fuera del sitio activo del andamiaje (también llamado "rejilla del ligando"). Los átomos críticos del ligando se enumeran en el archivo de entrada controlado por la opción -required\_active\_site\_atom\_names \<fname\>. Hay dos formas de definir el sitio activo: mediante una rejilla de ligando al estilo Rosetta++ o enumerando los residuos del sitio activo de la estructura.

Si el hit supera los cinco filtros, se añadirá a una lista de hits. El contenido de esta lista llegará finalmente al bucle for más externo.

Cuando termina el bucle sobre todas las posiciones de construcción, el Matcher actualiza el OccupiedSpaceHash con todos los hits de la restricción geométrica en foco. Si es la primera restricción geométrica, todos los hits se añaden al OccupiedSpaceHash; si no es la primera restricción geométrica, cada vóxel del OccupiedSpaceHash que no fue ocupado por un hit de esta ronda se marca como improductivo. Después, se eliminan todos los hits de rondas anteriores (rondas 1..(i-1)) cuyos vóxeles en 6D han sido marcados como improductivos.

Los hits de cada ronda se guardan para la etapa de enumeración de matches.

1.2 Generación de hits con matching secundario

Una novedad de esta implementación del algoritmo de matching es la opción de evitar generar nuevos hits y, en su lugar, reutilizar los hits generados en una ronda anterior de generación de hits. Es decir, si una restricción geométrica puede especificarse con menos de 6 grados de libertad (es decir, no importa qué valor se asigne a uno o más de los 6 grados de libertad que describen la restricción geométrica entre la proteína y un ligando) o si una restricción geométrica se especifica entre partes de la proteína (es decir, el ASP que contacta con el ligando en la restricción geométrica 1 tiene que recibir un enlace de hidrógeno de una HIS en la restricción geométrica 2), ahora existe la opción de usar hits existentes de alguna restricción geométrica anterior como fuente de hits para esta restricción geométrica posterior.

El algoritmo de matching secundario se puede activar incluyendo información adicional dentro del bloque ALGORITHM\_INFO (opcional) del ref match\_cstfile\_format "archivo de entrada de restricciones geométricas".

Cuando se realiza el matching secundario en una ronda concreta, se reúnen los hits generados en alguna ronda anterior o en todas las rondas anteriores. Después, el matcher comienza su iteración estándar sobre todas las posiciones de construcción y, para cada posición de construcción, sobre todos los rotámeros. Tras construir un rotámero en una posición de construcción dada, se mide la geometría entre este rotámero y todos los hits anteriores, y los hits que están dentro del rango en todos los parámetros geométricos especificados se consideran hits de esta ronda. También está disponible una versión del matching secundario en la que la interacción deseada entre el nuevo rotámero y la geometría proporcionada en el hit anterior (ya sea una ubicación del compañero downstream o el rotámero de un residuo de una ronda anterior) puede especificarse exigiendo un cierto umbral de energía; los pesos de cada uno de los términos que se quieran considerar y el umbral de energía total de la interacción de pares deben especificarse en el bloque ALGORITHM\_INFO del archivo de restricciones geométricas.

2\.  Enumeración de matches

En esta sección hay tres cosas que describir: a) por qué a esta etapa se la llama enumeración, b) por qué tenemos que buscar matches 64 veces en lugar de una sola, y c) cómo se escriben los matches.

a) Enumeración:

Un match consta de N hits, uno de cada una de las N restricciones geométricas. Los matches se encuentran usando una tabla hash: la coordenada 6D del ligando se agrupa en bins y el bin se convierte en un entero (un entero de 64 bits). El entero se usa como clave en la tabla hash; esta tabla hash asigna índices de bin a un [[utility::vector1|vector1]] \< std::list\< Hit \> \> de N dimensiones, de modo que un Hit generado en la ronda i se inserta en la lista de la i-ésima posición del vector1. Después, todos los vóxeles 6D que contienen matches se pueden encontrar iterando sobre todos los elementos de la tabla hash.

Ahora bien, cada elemento de este mapa hash contiene una lista de Hits. Si hay tres restricciones geométricas y un vóxel concreto contiene 2 Hits de cada una de las tres restricciones geométricas, hay 2 \* 2 \* 2 = 8 matches que pueden resultar de estos 6 Hits. Si hay 3 Hits de cada restricción geométrica, pueden resultar 27 matches. En general, si la restricción geométrica i contiene n\_i(v) hits para el vóxel v, el número total de matches del vóxel v es producto(i=1, i\<=N; n\_i(v)). Se consideran todos los matches posibles en una enumeración de todas las combinaciones de hits. Por eso a esta fase se la llama "enumeración de matches".

b) Hash 64 veces:

Un problema de agrupar hits en bins con hash es que dos hits pueden estar muy cerca el uno del otro en 6D, pero en lados opuestos de un límite de bin definido de forma arbitraria. En 1D, imagina que los bins se definen con una anchura de 1 y un origen en 0. En tal caso, un hit con coordenada 1.125 y otro hit con coordenada 1.35 caerían en el mismo bin (el bin de 1 a 2) y los dos hits se considerarían juntos como parte de un match. Sin embargo, un hit con coordenada 0.95 no cae en el mismo bin que el hit con coordenada 1.125 y, por lo tanto, no se agruparían, aunque estén muy cerca el uno del otro. La solución en 1-D es obvia: hacer el hash dos veces. Una vez con un origen de 0.0 (y bins 0-1, 1-2, 2-3, etc.) y una segunda vez con un origen de 0.5 (y bins 0.5-1.5, 1.5-2.5, 2.5-3.5, etc.). El hit 0.95 y el hit 1.125 se agruparían en el mismo bin en el segundo hash. La elección del origen para el segundo agrupamiento es un paso de 1/2 de la anchura del bin.

Este enfoque en 1D produce 2\^1 = 2 hashes; la solución en 6D produce 2\^6 = 64 hashes. Hay 6 dimensiones a lo largo de las cuales el origen puede desplazarse media anchura de bin, y hay 2\^6 combinaciones de desplazamientos, todas las cuales deben considerarse. Por eso tenemos 64 mapas hash que debemos considerar y por eso el número 64 aparece en tanta parte del código.

Una cosa que conviene señalar de este enfoque es que algunos hits se agruparán juntos varias veces: el hit 1.125 y el hit 1.35 se agrupan juntos con el origen en 0 y con el origen en 0.5. Esto significa que, para evitar escribir un match varias veces, debemos llevar la cuenta de qué matches ya se han escrito; la clase MatchOutputTracker se encarga justamente de eso.

c) Escritura de los matches:

La escritura de los matches se divide en dos partes: el propio Matcher es responsable de iterar sobre las 64 definiciones de origen, hacer el hash de los hits con esa definición de origen, enumerar los matches para ella y asegurarse de que cada match se considere una sola vez. Luego el Matcher le entrega el match a un MatchProcessor, y el MatchProcessor es responsable del resto de los pasos para asegurar que un match se escriba o no.

Hay dos variantes de matches que conviene mencionar, que difieren en cómo se considera que dos matches son el mismo match. En la primera definición, un match se define como la combinación única de N hits de las N restricciones geométricas. En esta definición, el match m y el match m' pueden describir los mismos rotámeros para las N restricciones geométricas, pero diferir en una ubicación del compañero downstream. Si la geometría del compañero downstream se muestrea de forma agresiva, muchos matches parecerán idénticos. La segunda definición es que un match se define como la combinación única de la parte upstream de N hits y la ubicación única del compañero downstream definida por una restricción geométrica concreta. En este caso, varias agrupaciones de hits enumeradas pueden corresponder al mismo match. Esta segunda definición, que en el código se llama "match\_dspos1" porque la posición downstream (ds) está definida por una sola restricción geométrica, reduce considerablemente el número de matches que hay que considerar para su escritura; esto hace que el matching sea más rápido y evita el problema de producir miles de archivos de salida casi idénticos que frustran el posprocesamiento. Como a menudo muchos matches son parecidos entre sí (según la finura y la cantidad de muestras geométricas), por defecto el matcher usa la llamada salida CloudPDB. Consulta el párrafo de CloudPDB en la sección Salidas esperadas. En resumen, los matches serán agrupados por el MatchGrouper, y todos los matches que caigan en el mismo grupo se escribirán en un formato de archivo especial que incluye todas las posiciones del ligando y los rotámeros de la proteína como modelos adicionales.

Según las opciones de línea de comandos, el Matcher enumera los matches con la definición normal de match o con la definición match\_dspos1. Luego entrega el match (o el match\_dspos1) al MatchProcessor mediante el método de interfaz de MatchProcessor "process\_match".

Hay dos clases MatchProcessor: MatchOutputter y MatchConsolidator. La clase MatchOutputter vuelca un match a disco en cuanto lo encuentra; el MatchConsolidator conserva los matches que se le pide procesar, los agrupa y, una vez que el Matcher ha enumerado todos los matches, escribe los X mejores matches de cada grupo, donde "mejor" se interpreta como tener la puntuación más baja según el MatchEvaluator. El usuario establece X con la opción -output\_matches\_per\_group \<X\>.

Tanto el MatchOutputter como el MatchConsolidator dependen de MatchFilters y OutputWriters para filtrar los matches y para escribirlos realmente en un formato concreto.

Entre los filtros de match disponibles se incluyen:
* UpstreamCollisionFilter – descarta los matches en los que las partes upstream del match colisionan entre sí
* UpstreamDownstreamCollisionFilter – descarta los matches en los que las partes upstream y downstream colisionan
* LimitHitsPerRotamerFilter – descarta los matches si un rotámero concreto ya se ha escrito demasiadas veces FLORIAN VERIFY PLEASE

Entre los escritores de salida disponibles se incluyen: (descritos con más detalle abajo)
* PDBWriter
* CloudPDBWriter
* WriteKinemageOutputter

El MatchOutputter y el MatchConsolidator, cuando reciben un match en la invocación de la función process\_match, verifican ambos que el match supera todos los filtros. El MatchConsolidator hace más trabajo en esta etapa, pero al final tanto el MatchOutputter como el MatchConsolidator entregan al OutputWriter un match destinado a la escritura.

Entre la comprobación de que un match supera todos los filtros y la preparación de un match para su escritura, el MatchConsolidator agrupa los matches según sus propiedades. Puntúa cada match de un grupo dado según algún criterio. Hay dos clases responsables de agrupar y puntuar: el MatchGrouper y el MatchEvaluator.

Entre los MatchGroupers disponibles se incluyen:
* SameSequenceGrouper – dos matches pertenecen al mismo grupo si sus hits provienen de los mismos aminoácidos en las mismas posiciones de construcción del andamiaje.
* SameRotamerGrouper – dos matches pertenecen al mismo grupo si sus hits provienen de los mismos rotámeros de los mismos aminoácidos en las mismas posiciones de construcción del andamiaje
* SameChiBinComboGrouper – dos matches pertenecen al mismo grupo si sus hits provienen de los mismos pozos de rotámeros (según la definición de la biblioteca de Dunbrack) de los mismos aminoácidos en las mismas posiciones de construcción del andamiaje.

Entre los MatchEvaluators disponibles se incluyen:
* DownstreamRMSEvaluator – informa de la puntuación de un match como la suma de los cuadrados de las distancias entre todos los átomos de todas las conformaciones downstream; solo está disponible para la definición estándar de match; es incompatible con la definición match\_dspos1. Cuanto más cerca estén los hits entre sí, menor será la puntuación.

Limitaciones
===========

No se garantiza que el Matcher encuentre matches. Cuantas más restricciones geométricas intentes hacer coincidir, más difícil es producir matches.

El tiempo de ejecución es cada vez más lento cuantas más muestras se incluyen; el número de posibles conformaciones del ligando que considerará el matcher es el producto del número de posiciones de construcción, el número de rotámeros por posición de construcción, el número de átomos de lanzamiento por rotámero, el número de geometrías externas por átomo de construcción y el número de rotámeros del ligando. Esto puede resultar muy costoso, tanto en tiempo de ejecución (ya que la mayoría de estas conformaciones, si no todas, deben enumerarse) como en uso de memoria (ya que el uso de memoria para almacenar Hits suele ser el factor limitante). Dicho esto, un muestreo insuficiente puede pasar por alto hits valiosos.

Archivos de entrada
===========

Los siguientes archivos son necesarios para una ejecución de matching, y se pueden encontrar ejemplos de cada uno de ellos en la prueba de integración del matcher:

1.  un pdb del andamiaje
2.  un match\_cstfile que especifique el sitio deseado. Consulta la [[documentación del formato match cstfile|match-cstfile-format]] para más información.
3.  un archivo .params y, opcionalmente, un archivo de confórmeros para el ligando de interés. Consulta la [[documentación de docking de ligandos|ligand-dock]] para más información.
4.  un archivo de posiciones que enumere todas las posiciones de residuos del andamiaje que se considerarán en el matching. La generación automática de un archivo pos se describe en la sección siguiente, "Generación de archivos de rejilla de ligando y pos". Como alternativa, el formato de un archivo pos es lo bastante simple como para que el usuario pueda generarlo a mano; el formato que requiere este archivo se describe en la sección de detalles de MatcherTask::initialize\_scaffold\_active\_site\_from\_command\_line() en src/protocols/match/MatcherTask.cc

Los siguientes archivos son opcionales para una ejecución de matching:

1.  un archivo llamado rejilla de ligando o gridlig. Este archivo especifica la región de la proteína andamiaje en la que se desea que acabe el ligando, normalmente una cavidad o grieta de la superficie. Las posiciones de residuos especificadas en el archivo de posiciones deben estar en la misma región que la rejilla del ligando. La generación automática de un archivo pos a partir de una estructura pdb de andamiaje se describe en la sección siguiente, "Generación de archivos de rejilla de ligando y pos". Las posiciones de residuos especificadas en el archivo de posiciones deben estar en la misma región que la rejilla del ligando. En general, un archivo gridlig es difícil de manipular a mano sin la ayuda de un script o de una interfaz gráfica. El formato de archivo de la rejilla del ligando se describe en MatcherTask::initialize\_active\_site\_definition\_from\_command\_line().
2.  un archivo que especifique qué átomos del ligando tienen que estar en la rejilla. Este archivo simplemente enumera los nombres de todos los átomos del ligando que deben estar en la rejilla del ligando.

Opciones
=======

-   Opciones obligatorias del matcher
    * -s \<scaffold pdb=""\> estructura del andamiaje
    * -match:lig\_name \<name of="" ligand=""\> el nombre del ligando que se va a emparejar
    * o bien -match:scaffold\_active\_site\_residues\_for\_geomcsts \< per geomcst posfile \> o -match:scaffold\_active\_site\_residues \< posfile \>
    * -match:geometric\_constraint\_file \<cstfile\>
    * -extra\_res\_fa \<ligand .params file\>
    * y si se usan archivos gridlig:
        * -match:grid\_boundary \<gridlig file\>=""\> el archivo de rejilla del ligando
        * -match:active\_site\_definition\_by\_gridlig \<gridlig file\>=""\> -required\_active\_site\_atom\_names \<atom name="" file\>=""\>

-   Las siguientes opciones son relevantes para el matcher, pero los valores por defecto deberían funcionar en la mayoría de los proyectos:
    * -match:output\_format \< formato en el que se escriben los matches \>
    * -match\_grouper \< criterio por el que el escritor CloudPDB o el consolidador agrupan los matches \>
    * -output\_matchres\_only \<true/false\> determina si se escribe todo el Pose para cada match o solo el sitio emparejado -enumerate\_ligand\_rotamers \<true/false\> determina si el matcher prueba por separado todos los confórmeros del ligando
    * -only\_enumerate\_non\_match\_redundant\_ligand\_rotamers \<true/false \> si el matcher enumera rotámeros del ligando, esta opción hará que solo enumere aquellos rotámeros del ligando en los que los átomos del ligando que participan en las interacciones de matching estén en posiciones distintas; es decir, según el sistema habrá una aceleración considerable mientras que debería encontrarse el mismo número de matches únicos.

-   Opciones generales de Rosetta recomendadas:
    * Para las ejecuciones de producción del matcher se deben usar todas las opciones habituales de empaquetado de rosettta, es decir, ex1, ex2, use\_input\_sc. Además, si hay muchos confórmeros del ligando, conviene silenciar el canal del tracer protocols.idealize ( -mute protocols.idealize ).

Generación de archivos de rejilla de ligando y pos
====================================

El archivo de rejilla del ligando (\*.gridlig) especifica dónde puede estar la diana (ligando) en el sitio activo. El archivo pos especifica los residuos del sitio activo desde los que se permite que parta cada restricción; p. ej., si el archivo pos solo enumera 50,60, todas las restricciones deben partir del residuo 50 o del residuo 60.
 Estos archivos pueden generarse a partir de un pdb con un ligando (gen\_lig\_grids; los archivos se generan alrededor del espacio que ya ocupa el ligando de tipo silvestre) o a partir de un pdb sin ligando (gen\_apo\_grids; rosetta identifica grandes bolsillos de espacio vacío y genera el gridlig y el archivo pos alrededor de esos bolsillos).

1) gen\_lig\_grids  < a name="gen-lig-grids" />

Puedes encontrar un ejemplo completo que funciona en la prueba de integración asociada:
 rosetta/main/tests/integration/tests/gen\_lig\_grids/

Partiendo de un pdb de andamiaje (1a53.pdb), primero separa una cadena del andamiaje y su ligando asociado. El andamiaje (sin líneas HETATM) debe ser una sola cadena sin otras líneas, solo las líneas ATOM de esa cadena, scaffold.pdb (1a53\_nohet\_1.pdb). El ligando debe ser el ligando de esa cadena, con solo las líneas HETATM y sin otras líneas, ligand.pdb (1a53\_ligand\_1.pdb).

La aplicación gen\_lig\_grids generará un conjunto de rejillas alrededor del bolsillo de unión del ligando, scaffold.pdb\_0.gridlig. Esto se usa como rejilla del ligando en el matcher (con la opción match::grid\_boundary). También generará una lista de posiciones de residuos que están en el sitio de unión del ligando, llamada "archivo pos", p. ej., scaffold.pdb\_0.pos. Esto también se usa como entrada del matcher (con la opción match::scaffold\_active\_site\_residues).

Una línea de comandos genérica:
 gen\_lig\_grids -s scaffold.pdb ligand.pdb -database [database\_path] @flags

Una línea de comandos de ejemplo real usada para el ejemplo rosetta/main/tests/integration/tests/gen\_lig\_grids:
 /path/to/rosetta/main/source/bin/gen\_lig\_grids.linuxiccrelease -s 1a53\_nohet\_1.pdb 1a53\_ligand\_1.pdb @flags

Un ejemplo detallado de opciones (@flags):
```
-ignore_unrecognized_res # ignore any ligands already present in the scaffold.pdb
-grid_delta 0.5 # grid spacing, Angstroms
-grid_lig_cutoff 4.0 # cutoff from ligand, the grid will extend this far away from the ligand
-grid_bb_cutoff 2.25 # cutoff from backbone, the grid will be pruned back this distance from the backbone
-grid_active_res_cutoff 5.0 # distance cutoff for active site residues to be included in the pos file; any amino acid within this distance from a ligand atom will be included in the pos file
```
2) gen\_apo\_grids <a name="gen-apo-grids" />

Puedes encontrar un ejemplo completo que funciona en la prueba de integración asociada:
 rosetta/main/tests/integration/tests/gen\_apo\_grids/

Con gen\_apo\_grids, el pdb del andamiaje no debe tener un ligando. En gen\_apo\_grids, Rosetta identificará las ubicaciones más probables de un sitio de unión de ligando y creará los archivos gridlig/pos correspondientes, usando el algoritmo RosettaHoles. Si hay un ligando, en general el usuario debe usar gen\_lig\_grids, a menos que el sitio de unión del ligando de la estructura cristalina sea indeseable o poco fiable. Partiendo de un pdb de andamiaje (1a53.pdb), primero separa una cadena del andamiaje, que presumiblemente no contiene un ligando. El andamiaje (sin líneas HETATM) debe ser una sola cadena sin otras líneas, solo las líneas ATOM de esa cadena, scaffold.pdb (1a53\_nohet\_1.pdb).

La aplicación gen\_apo\_grids generará un conjunto de archivos gridlig/pos alrededor del mayor vacío enterrado del andamiaje (scaffold.pdb\_1.gridlig, \_1.pos), el segundo mayor vacío (scaffold.pdb\_2.gridlig, \_2.pos), etc. Estos se usan como rejilla del ligando en el matcher (con la opción match::grid\_boundary) y como archivo de posiciones del matcher (con la opción match::scaffold\_active\_site\_residues). En una ejecución posterior del matcher, el usuario puede elegir cuál de estas combinaciones gridlig/archivo pos usar, o simplemente ejecutar el matcher por separado con cada gridlig/archivo pos (en ejecuciones separadas del matcher), o seleccionar solo un subconjunto de gridlig/archivos pos. En el uso habitual, se podría empezar con solo el mayor gridlig (\_1.gridlig, \_1.pos) sobre un conjunto de pdbs de andamiaje y luego ampliar para incluir más gridlig/archivos pos si el número de matches no es satisfactorio.

Una línea de comandos genérica:
```
 gen_apo_grids -s scaffold.pdb -database [database_path] @flags
```
Una línea de comandos de ejemplo real usada para el ejemplo rosetta/main/tests/integration/tests/gen\_apo\_grids:
```
 /path/to/rosetta/main/source/bin/gen_apo_grids.linuxiccrelease -s 1a53_nohet_1.pdb @flags
```
Un ejemplo detallado de opciones (@flags):
```
  -mute all
  -unmute apps.pilot.wendao.gen_apo_grids
  -chname off
  -constant_seed
  -ignore_unrecognized_res
  -packstat:surface_accessibility
  -packstat:cavity_burial_probe_radius 3.0 # if the cavity ball can be touched by probe r>3, then it's not in a pocket
  -packstat:cluster_min_volume 30 # minimum size of a pocket, smaller voids will not be considered
  -packstat:min_cluster_overlap 1.0 # cavity balls must overlap by this much to be clustered
  -packstat:min_cav_ball\radius 1.0 # radius of smallest void-ball to consider
  -packstat:min_surface_accessibility 1.4 # voids-balls must be at least this exposed
```

Solución de problemas: estas aplicaciones deberían estar en rosetta/main/source/bin. Si no es así, asegúrate de que src/pilot\_apps.src.settings.all tiene activada la aplicación piloto bajo el usuario wendao.

Generación manual de archivos pos
------------------------------

Aunque la generación automática descrita arriba creará archivos pos, también se pueden crear manualmente.

Se reconocen dos formatos distintos para los archivos pos: uno con una sola lista de posiciones que se usará para todas las restricciones (especificado con -match:scaffold\_active\_site\_residues) y otro que enumera las posiciones restricción por restricción (especificado con -match:scaffold\_active\_site\_residues\_for\_geomcsts). Ambos toman números de residuo en el formato de numeración de Pose. La numeración de Pose consiste en un valor que se incrementa secuencialmente para cada residuo, empezando por 1. Por ejemplo, si el primer residuo del PDB de entrada es el residuo 26 de la cadena A, el residuo 33 de la cadena A tendría un número de residuo de 8 en el formato de numeración de Pose. (En general se recomienda renumerar los archivos pdb de entrada del matcher para que empiecen en el residuo 1 de la cadena A).

1) Lista única de posiciones. El archivo consta de una lista de números en el formato de numeración de Pose, separados por espacios en blanco.

Ejemplo:

```
104 106 108 109 117 118 137 139 143 144 36 6 85 87 88 89 91 92 97
```

2) Lista de posiciones por restricción. La primera línea del archivo empieza con N\_CST, seguido del número de restricciones geométricas. Esto debe coincidir con el número de restricciones geométricas del archivo .cst. En cada línea siguiente se da el ID de la restricción geométrica, seguido de dos puntos y luego de todos los ID de residuo (en formato de numeración de Pose) que deben considerarse para esa restricción geométrica. Cada restricción geométrica debe aparecer en una línea del archivo, aunque pueden enumerarse en cualquier orden. También es posible especificar que se pueden usar todas las posiciones del andamiaje para una cierta restricción mediante la palabra clave "all".

Ejemplo:

```
N_CST 4
1: 9
3: 12
2: 6 7 9 11 12 14 15 17 18 21 22 23 25 26 38 40 43 46 47 49 53 54 57 60 61
4: all
```

Salidas esperadas
================

Como no es seguro que la geometría de entrada deseada pueda emparejarse con un andamiaje dado, el matcher podría terminar sin escribir ningún match. En cualquier caso, habrá un archivo de log. En toda ejecución del matcher que terminó correctamente, la última línea del archivo de log debe decir: 'Matcher ran for x seconds'. Si no se escribe esta línea, algo salió mal durante el cálculo.
 Si se encontraron matches, el matcher puede escribirlos en tres formatos distintos: Pdb, CloudPdb y kinemage, siendo CloudPdb el formato por defecto recomendado. El formato de salida que se usa lo determina la opción -match:output\_format.
 Al leer esta sección, hay que recordar que un match es simplemente un conjunto de hits, es decir, pares de un rotámero de proteína y una colocación correspondiente del ligando (o, en el caso del matching upstream, pares de dos rotámeros de proteína). Según la densidad de muestreo, tanto de rotámeros de proteína como de colocaciones del ligando, especificada en el cstfile, es posible que varias docenas o cientos de colocaciones del ligando caigan en el mismo bin hash, y enumerar todas las combinaciones posibles de hits a menudo puede conducir a millones de matches muy parecidos.

**Formato de salida CloudPdb:**
 En este formato de salida, el matcher primero agrupará todos los matches. El agrupamiento se hará según el valor especificado para la opción -match:match\_grouper, que se describe abajo. Una vez enumerados y agrupados todos los matches, para cada centro de clúster se escribirá un archivo pdb multimodelo que contiene todos los rotámeros de proteína y colocaciones del ligando únicos de ese clúster. Para los centros de clúster que tengan más de 100 colocaciones únicas del ligando, se escribirá un archivo por cada 100 colocaciones únicas del ligando. El formato de salida CloudPdb es el formato de salida recomendado.

**Formato de salida Pdb:**
  En este formato, cada match se escribirá como un archivo pdb separado. Como se ha mencionado arriba, en los casos en que la combinatoria de la enumeración de matches conduzca a millones de matches, este formato de salida puede llenar rápidamente discos duros enteros. Para evitar que esto ocurra, deben establecerse en true dos opciones al usar este formato de salida.
 -match:output\_matchres\_only hará que los archivos pdb de salida solo contengan los residuos emparejados y el ligando, pero no el resto del andamiaje. Eventualmente se puede usar un script para volver a insertar los matches en el andamiaje completo.
 -match:consolidate\_matches hará que solo se escriba un subconjunto de matches. Los matches se agruparán según el valor de la opción -match:match\_grouper y luego, para cada centro de clúster, se seleccionará al azar un número de matches (determinado por la opción -match:output\_matches\_per\_group ) para su escritura.

Para ambos formatos de salida, CloudPdb y Pdb, la opción -match:grouper es muy importante. Esta opción puede tener los siguientes valores, y los matches pueden agruparse en consecuencia:

* SameSequenceGrouper: se agruparán juntos los matches que tienen la misma secuencia (es decir, los residuos se emparejan en posiciones idénticas )
* SameSequenceAndDSPositionGrouper: se agruparán juntos los matches que tienen la misma secuencia y en los que las colocaciones del ligando no están a más de -match:grouper\_downstream\_rmsd angstroms de distancia. Este es el valor por defecto.
* SameChiBinComboGrouper: se agruparán juntos los matches en los que los rotámeros de la proteína están en el mismo bin de chi
* SameRotamerComboGrouper: se agruparán juntos los matches que tienen los mismos rotámeros de proteína.

**Formato de salida Kinemage**
 andrew

Posprocesamiento
===============

Normalmente los matches se diseñan con el protocolo enzyme\_design: [[Documentación de la aplicación de diseño de enzimas.|enzyme-design]]
  Para ello, deben estar en formato CloudPdb o Pdb. Si están en formato CloudPdb, la aplicación enzyme\_design leerá las colocaciones adicionales del ligando y las considerará todas simultáneamente durante el protocolo de diseño.

Consejos
====

Hay dos aspectos que deben considerarse en todo proyecto de matching: 1) en qué orden especificar los bloques del cstfile y 2) si usar el algoritmo ClassicMatching o SecondaryMatching para un residuo de match dado.

**1) Sobre el orden de los distintos residuos de match / bloques del cstfile**

Como regla general, las restricciones geométricas deben ordenarse por diversidad de muestreo creciente, es decir, la restricción más claramente definida debe ir primero en el cstfile. La razón es que cuanto menos muestreo hay para una restricción, menos hits habrá, y esto significa que hay menos vóxeles activos en el hash de espacio ocupado, lo que a su vez conduce a una generación de hits más rápida en las siguientes rondas de generación de hits ( consulta el criterio c) en la explicación del algoritmo de matching clásico arriba.)

**2) Sobre el uso del matching clásico frente al matching secundario.**

 Cada uno de estos algoritmos tiene ventajas y desventajas. La ventaja del matching clásico es que cada etapa de generación de hits es independiente, es decir, la restricción \#2 puede generar hits sin tener que examinar todos los hits de la restricción 1. Sin embargo, hay que especificar los 6 grados de libertad para el matching clásico. En los casos en que la interacción química deseada está menos bien definida (es decir, un enlace de hidrógeno, donde solo importan la distancia, dos ángulos y quizá un diedro), habrá que muestrear un gran número de valores para los grados de libertad no importantes, para asegurar que se encuentran todos los matches posibles.
 El algoritmo de matching secundario no tiene esta desventaja: los grados de libertad no importantes pueden simplemente dejarse sin especificar, lo que significa que se aceptará cualquier valor. Por otro lado, el algoritmo de matching secundario tiene la desventaja de que, para cada rotámero upstream, necesita examinar todos los hits de las rondas de matching anteriores, lo que podría tardar mucho según el número de hits generados previamente.

Novedades desde la última versión
=============================

Esta es la primera vez que se publica el Matcher. Nunca estuvo disponible en su implementación inicial como parte de Rosetta++.

##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
