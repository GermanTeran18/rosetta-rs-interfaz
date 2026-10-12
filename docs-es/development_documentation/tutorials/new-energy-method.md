#Cómo añadir un nuevo término de puntuación.

Metadatos
========

Este documento fue escrito por Andrew Leaver-Fay el 15/8/2008 y revisado el 24/8/2009.

La clase ScoreFunction es un contenedor de EnergyMethods. Los EnergyMethods hacen todo el trabajo duro de evaluar las energías de residuos y de pares de residuos; la ScoreFunction gestiona la lógica para puntuar solo aquellos residuos cuyas energías de interacción necesitan recalcularse. Al repartir las responsabilidades entre las dos clases, reducimos la duplicación de código y facilitamos añadir nuevos términos de puntuación.

Primer paso
========

El primer paso para añadir un nuevo método de energía es decidir en qué lugar de la jerarquía de métodos de energía debe vivir tu nueva clase. Hay siete clases base de métodos de energía de las que se puede derivar. Estas son:

-   ContextIndependentOneBodyEnergy
-   ContextDependentOneBodyEnergy
-   ContextIndepenedentTwoBodyEnergy
-   ContextDependentTwoBodyEnergy
-   ContextIndependentLRTwoBodyEnergy
-   ContextDependentLRTwoBodyEnergy
-   WholeStructureEnergy

LR arriba es la abreviatura de "long ranged" (largo alcance). Las energías de dos cuerpos sin LR en su nombre son de corto alcance (pero no llevan SR en el nombre por brevedad).

Las energías de dos cuerpos de corto alcance deben definir una distancia de interacción: la distancia entre dos átomos pesados a partir de la cual las energías de interacción son cero. Con esta distancia de interacción, la ScoreFunction construirá un grafo disperso que conecta todos los residuos vecinos. Este es el EnergyGraph que se guarda en el objeto Energies del Pose. La ScoreFunction calcula un único EnergyGraph, usando la distancia máxima de interacción definida por sus métodos de energía de dos cuerpos de corto alcance. Precaución: si defines un nuevo método de energía de corto alcance con una distancia de interacción muy grande, el EnergyGraph quedará conectado de forma más densa. Para cada par de residuos adyacentes en el EnergyGraph se llama a todos los métodos de energía de dos cuerpos para calcular su energía de interacción. Cuanto mayor sea la distancia de interacción (incluso para un solo método de energía), más lenta se vuelve la puntuación.

Las energías de dos cuerpos de largo alcance deben definir un contenedor de energía y un conjunto de iteradores const y no const para ese contenedor. Esta interfaz permite que las energías de largo alcance controlen exactamente cómo se evalúan. Las energías de largo alcance pueden evaluarse entre todos los pares de residuos – O(n2) – o solo para un subconjunto de residuos. Por ejemplo, las restricciones en mini se modelan como energías de largo alcance: el número de interacciones de pares evaluadas depende del número de restricciones de pares. Si tienes solo un puñado de restricciones, solo tienes que evaluar un puñado de energías de restricción. Las clases de restricciones construyen un grafo con tantas aristas como pares que interactúan, y la ScoreFunction itera sobre ese grafo.

Un método de energía es dependiente del contexto o independiente del contexto según si el entorno de un residuo (o de un par de residuos) afecta a la energía que se calcula. Las energías independientes del contexto pueden guardarse para reutilizarse si el residuo (o el par de residuos) no se mueve internamente (o uno respecto del otro). La lógica de la ScoreFunction trata los métodos de energía de manera distinta según sean dependientes o independientes del contexto.

Algunos ejemplos de métodos de energía dependientes del contexto: el término de entorno de un residuo depende del número de c-beta a menos de 10 angstroms; los términos de puentes de hidrógeno dependen 1) del número de vecinos del donante y del aceptor y 2) en el caso de los puentes de hidrógeno cadena principal/cadena lateral, de la presencia de un puente de hidrógeno cadena principal/cadena principal para el grupo de la cadena principal.

Segundo paso
========

El segundo paso, después de haber elegido la clase base de la que derivar, es ampliar la enumeración ScoreType. La enumeración ScoreType está en src/core/scoring/ScoreType.hh. Cada método de energía define uno o más tipos de puntuación; cada tipo de puntuación corresponde exactamente a un método de energía. Dos métodos de energía no pueden compartir un mismo tipo de puntuación. El tipo de puntuación representa una posición en un arreglo EnergyMap en la que los métodos de energía pueden escribir. La ScoreFunction también usa los EnergyMaps para guardar el conjunto de pesos. La energía total de una estructura puede calcularse como un producto escalar entre un EnergyMap que contiene la suma de las energías sin ponderar de la estructura y un EnergyMap que contiene los pesos de cada uno de los términos.

La enumeración ScoreType está dividida en dos: la primera parte de la enumeración se reserva para las energías de dos cuerpos de corto alcance y la segunda parte es para todos los demás métodos de energía. La entrada n\_shortranged\_2b\_score\_types de la enumeración es el divisor entre ambas. Si defines un método de energía de dos cuerpos de corto alcance, ya sea dependiente o independiente del contexto, añade tu nuevo tipo de puntuación en la primera parte de la lista; de lo contrario, añádelo en la segunda parte.

El objeto EnergyMap es un arreglo que contiene una entrada por cada elemento de la enumeración ScoreType. También hay una segunda clase relacionada, el TwoBodyEnergyMap. El TwoBodyEnergyMap contiene entradas para los elementos de la enumeración ScoreType hasta la posición n\_shortranged\_2b\_score\_types. El mapa de energía de dos cuerpos es un poco más pequeño que un mapa de energía completo. (Antes de un cambio reciente que redujo la sobrecarga de memoria del EnergyGraph, cada arista (un EnergyEdge) del EnergyGraph contenía un objeto TwoBodyEnergyMap. Tras el cambio, cada EnergyEdge contiene solo un arreglo pequeño con espacio suficiente para almacenar los componentes activos de dos cuerpos. La importancia de contar con un TwoBodyEnergyMap distinto ha desaparecido con este cambio reciente.)

Las dos ventajas principales son que escribir y leer en los mapas de energía es una operación O(1) (un map de la STL es O(ln n) con una constante muy grande para n pequeño) y que el tamaño de un mapa de energía se conoce en tiempo de compilación, por lo que pueden asignarse en la pila (sin llamar a new ni a delete). El acceso O(1) al contenido del EnergyMap es muy importante, ya que los EnergyMethods devuelven los resultados de cada cálculo de energía de interacción en un EnergyMap.

Cuando amplíes la enumeración ScoreType, también debes actualizar el archivo ScoreTypeManager.cc, que define una correspondencia entre cadenas y tipos de puntuación.

El paso final para incorporar tu nuevo EnergyMethod a la puntuación es crear una clase EnergyMethodCreator que cree una nueva instancia de tu clase EnergyMethod en respuesta a una llamada a su función virtual "create\_energy\_method". El Creator también debe devolver una lista de los ScoreTypes de los que se encarga tu EnergyMethod en su función "score\_types\_for\_method". El ScoringManager invocará la función "create\_energy\_method" para crear una nueva instancia de tu EnergyMethod siempre que una ScoreFunction necesite una instancia de tu clase.

La razón por la que el ScoringManager es el responsable de crear los EnergyMethods es hacer que la interfaz de la ScoreFunction sea lo más intuitiva posible: un método de energía está activo en una ScoreFunction si tiene un peso distinto de cero para alguno de los tipos de puntuación que define. El método set\_weight de la clase ScoreFunction obtiene una nueva instancia del EnergyMethod del ScoringManager si los pesos de ese método eran cero anteriormente. Todo lo que el usuario tiene que hacer para asegurarse de que se evalúe un término concreto de la ScoreFunction es asignarle un peso distinto de cero; el usuario no tiene que instanciar además el EnergyMethod responsable de ese término. Esa instanciación ocurre entre bastidores.

Tu clase EnergyMethodCreator debe registrarse en el ScoringManager para estar lista para responder a las solicitudes de creación de EnergyMethods. Este paso de registro debe ocurrir en el momento de la carga: el periodo entre el inicio de la carga del programa en memoria y el comienzo de main(). Aunque no lo creas, ¡ocurre mucho trabajo antes de que empiece main()! En el momento de la carga, el sistema operativo inicializará todos los datos estáticos (alcanzables\*). El sistema de registro aprovecha esta inicialización de datos estáticos. Debes añadir una nueva instancia de EnergyMethodCreator al archivo init.cc de la biblioteca en la que vivirá tu nueva clase (p. ej., core/init.cc si tu EnergyMethod vive en core). En el momento de la carga, se invocará el constructor por defecto de tu clase cuando se inicialice la instancia que vive en init.cc. Usa este evento de construcción para registrar tu clase en el ScoringManager. Tu clase debe invocar el método "factory\_register" del ScoringManager, pasando una nueva instancia de tu clase. Cuidado: tendrás que asegurarte de que la segunda instancia de tu clase (la que se pasa en la llamada a factory\_register) no intente crear una tercera instancia, o tendrás una regresión infinita.

(\*Los "datos estáticos alcanzables" son datos globales contenidos en los archivos .cc que tienen al menos una función encontrada en un recorrido en profundidad de todas las funciones alcanzables desde main(). Cualquier archivo .cc al que no se llegue desde main será eliminado por el enlazador en las compilaciones estáticas.)

Como todo el registro ocurre en el momento de la carga, no hay que preocuparse de que una ScoreFunction solicite una instancia de algún EnergyMethod antes de que el ScoringManager esté listo para crearla. También significa que tu nuevo EnergyMethod será accesible desde cualquier protocolo sin tener que cambiar ningún otro código; no hace falta inyectar llamadas de inicialización del ScoringManager al comienzo de cada main() de cada ejecutable (lo cual sería necesario si el registro en la fábrica se retrasara hasta después del momento de la carga).

Debes tener cuidado de que tu EnergyMethodCreator enumere todos los ScoreTypes que tu EnergyMethod se encarga de calcular. Si enumeras solo algunos, o si más adelante añades nuevos a tu EnergyMethod pero no al EnergyMethodCreator, el ScoringManager podría no instanciar correctamente tu EnergyMethod cuando una ScoreFunction lo solicite en tiempo de ejecución.

Tu clase EnergyMethodCreator debe declararse en un archivo .hh e implementarse en el archivo .cc. Debes hacer \#include de una única cabecera en tu archivo .hh: core/scoring/methods/EnergyMethodCreator.hh. No hagas \#include de ninguna otra cabecera bajo ninguna circunstancia. No implementes ninguna función dentro del archivo .hh bajo ninguna circunstancia.

Tercer paso
==========

El tercer paso para definir un nuevo método de energía es implementar la interfaz de tu nueva clase EnergyMethod. Debes leer con atención la documentación que describe cómo debe implementarse la interfaz. Busca en los archivos .hh de las clases base, subiendo por toda la jerarquía de herencia, las etiquetas doxygen @brief. No es necesario sobrescribir todos los métodos en tu clase derivada. Para las energías de dos cuerpos es necesario implementar residue\_pair\_energy, pero no es necesario implementar el método evaluate\_rotamer\_pair\_energies; la implementación de la clase base de ese método suele ser suficiente. Las funciones virtuales puras (las que no tienen implementación en la clase base) deben implementarse. Las funciones virtuales normales (las que tienen implementación en la clase base) no siempre tienen que sobrescribirse.

Tu clase derivada debe implementar un constructor (no necesariamente un constructor por defecto sin argumentos) y un destructor. En el constructor, tu clase debe invocar el método de la clase base add\_score\_type por cada uno de los tipos de puntuación que define. Si implementas un constructor de copia, invoca también el constructor de copia de la clase base o asegúrate de que tu constructor de copia llame a add\_score\_type. La ScoreFunction exige que cada método de energía declare los tipos de puntuación que pretende definir.

Términos de puntuación basados en datos
========================
Supón que tienes un conjunto rico de datos que se correlaciona con alguna característica estructural.
Un buen ejemplo es la reactividad al dimetilsulfato (DMS), que responde a características estructurales de los residuos de adenosina, en particular alrededor del átomo N1.
Podría imaginarse un potencial de log-odds que compare los valores observados para residuos concretos con los simulados para tu modelo, o una función de puntuación de estilo Boltzmann inverso que compare los valores simulados para tu modelo con la distribución típica en el PDB.
Sea cual sea el caso, sería una lástima que tu única opción fuera una cuadrícula discreta de observaciones.
Históricamente, Rosetta ha contado con herramientas de interpolación para resolver este problema en las bibliotecas de rotámeros (en particular, la interpolación bicúbica de las bibliotecas de rotámeros de Dunbrack recientes).
Esfuerzos recientes han creado versiones con plantillas del código de interpolación de Rosetta: el MathNTensor, el PolycubicSpline y un contenedor general InterpolatedPotential. 
Si tienes algunos datos y quieres derivadas suaves, considera tomar como modelo el RNA_DMS_Potential. 


##Véase también

* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: la página de inicio de la documentación de desarrollo
* [[Funciones de puntuación y términos de puntuación|score-types]]
* [[Términos de puntuación adicionales|score-types-additional]]
* [[Scoring explained]]
* [[Units in Rosetta]]: describe las unidades de energía de Rosetta
* [[Término de energía de puentes de hidrógeno|hbonds]]
* [[Funciones de puntuación para residuos y moléculas no canónicos|NC-scorefunction-info]]
* [[Rosetta overview]]: visión general de los conceptos principales de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de conceptos adicionales de Rosetta.
* [[Glossary]]: define los términos clave de Rosetta
