#Referencia del espacio de nombres utility::keys

Claves y contenedores accedidos por clave para una búsqueda de objetos rápida y segura.

Descripción detallada
---------------------

El paquete utility::keys proporciona clases de claves y contenedores accedidos por clave. Las claves están pensadas para usarse como "índices" con nombre para buscar objetos. Las claves son como enums más seguros y flexibles cuando el valor entero de la clave no tiene significado en el código. Las claves tienen un valor de índice oculto al que solo pueden acceder los contenedores, lo que obliga a escribir el código de la aplicación en términos de claves con nombre en lugar de números de índice "mágicos" o enums poco seguros. Esto hace que añadir nuevas claves o cambiar su orden sea seguro y rápido. Las jerarquías de clases de claves añaden una capacidad de la que carecen los enums, y es que las clases de claves guardan cadenas identificadoras adicionales. Además, las claves se pueden añadir a colecciones de claves en archivos fuente distintos, lo cual es importante para que las aplicaciones sean "enchufables".

El índice oculto permite usar contenedores rápidos basados en vectores en lugar de contenedores mucho más lentos basados en mapas o en tablas hash. Se proporcionan contenedores especiales para una búsqueda rápida basada en vectores cuando el contenedor solo contiene un subconjunto de las claves posibles.

Key es la clase de interfaz raíz de todos los tipos de claves.

AutoKey asigna un índice único a cada clave de un tipo AutoKey. AutoKey tiene argumentos de plantilla para el tipo de objeto al que se accede por clave y para una clase que se considera el cliente o usuario de las claves, lo que da al desarrollador un control detallado de los tipos de claves y las colecciones. AutoKey está pensada para colecciones fijas de claves que se crean secuencialmente una sola vez: si creas AutoKeys en un bucle, los índices asignados acabarán desbordándose.

UserKey es como AutoKey, pero el índice se puede fijar en el momento de la creación y luego solo pueden acceder a él desde fuera las clases contenedoras amigas (friend). UserKey está pensada para colecciones de claves que se pueden crear varias veces o para las que el usuario necesita controlar los índices asignados.

AutoKey y UserKey son clases base abstractas: las clases de claves abstractas y concretas de la aplicación que derivan de ellas pueden especificar las clases contenedoras amigas que pueden acceder a su índice oculto y cualquier dato o comportamiento especial que necesiten.

VariantKey se puede usar para guardar una clave de cualquier tipo derivado de un tipo de clave base.

Se proporcionan clases KeyTuple para combinar 2, 3 o 4 claves de cualquier tipo en una sola metaclave. Las clases KeyVector son similares, pero para claves del mismo tipo. Ten en cuenta que std::pair podría cumplir este papel para 2 claves y boost::tuple para varias, pero las clases KeyTuple y KeyVector ofrecen una interfaz coherente y natural sin crear una dependencia de la biblioteca Boost.

Las claves de una colección se pueden añadir a la clase KeyLookup asociada para ofrecer una forma de buscar claves por sus identificadores y de iterar sobre las claves.

Se proporcionan dos tipos de contenedores que usan las claves: los que comparten un mapa de índices común con todos los contenedores de ese tipo de clave, valor y cliente, y aquellos en los que cada contenedor tiene su propio mapa de índices. Estos contenedores se comportan en gran medida como mapas hash, salvo que realizan exactamente dos búsquedas de índice rápidas por cada búsqueda del usuario por clave, lo que da un rendimiento mayor que el de los mapas hash habituales.

ClassKeyVector se comporta como un vector indexado por su tipo de clave y en el que todos los contenedores de ese tipo ClassKeyVector comparten la misma correspondencia entre las claves activas y el vector interno. Un argumento de plantilla de clase cliente, además de los argumentos de tipo de clave y de valor, permite un control detallado de las colecciones de claves que comparten un mapa de índices. El mapa de índices de ClassKeyVector es estático, de modo que el tamaño del mapa (el índice más alto de cualquier clave activa) y la dispersión de las claves activas no suelen ser un problema de almacenamiento.

ClassKeyMap es como ClassKeyVector, salvo que guarda un std::pair con la clave y el valor asociado, para usarlo cuando se necesita la clave de cada elemento mientras se itera por el contenedor.

SmallKeyVector se comporta como un vector indexado por su tipo de clave en el que cada SmallKeyVector tiene su propio conjunto de claves activas y su propio mapa entre las claves activas y el vector interno. El mapa de índices es un miembro de cada SmallKeyVector, por lo que no es eficiente en espacio para conjuntos de claves grandes con subconjuntos de claves activas dispersos. En ese caso debe usarse en su lugar un mapa hash, cuando el uso de almacenamiento pese más que la ventaja de velocidad de búsqueda de SmallKeyVector.

SmallKeyMap es como SmallKeyVector, salvo que guarda un std::pair con la clave y el valor asociado, para usarlo cuando se necesita la clave de cada elemento mientras se itera por el contenedor.

##Véase también

* [[Espacio de nombres utility|namespace-utility]]
  * [[utility::io|namespace-utility-io]]
  * [[utility::factory|namespace-utility-factory]] **YA NO EXISTE**
  * [[utility::options|namespace-utility-options]]
* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores
