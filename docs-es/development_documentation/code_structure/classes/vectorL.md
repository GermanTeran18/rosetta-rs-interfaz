#Referencia de la clase utility::vectorL

Descripción detallada
---------------------

vectorL es una plantilla de clase que se comporta de forma idéntica a std::vector, salvo que sus elementos se indexan a partir del valor del primer argumento de la plantilla en lugar de a partir de 0. vectorL está pensado para usarse en lugar de std::vector en dominios donde la indexación desde 0 no es natural.

vectorL pretende ser un contenedor como std::vector, pero con nombres (índices) de elemento distintos. Dando prioridad al punto de vista del contenedor sobre la distinción de indexación, vectorL se escribió para interoperar con std::vector de varias maneras:

-   Se puede construir (explícitamente) un vectorL a partir de un std::vector
-   Se puede asignar un vectorL a partir de un std::vector
-   Se puede convertir explícitamente un vectorL en una referencia a un std::vector
-   Se puede intercambiar el contenido de un vectorL con un std::vector en tiempo constante
-   Se puede comparar un vectorL con un std::vector
-   Los elementos se asignan y se comparan desde el principio de cada contenedor hasta el final, no según el número de índice correspondiente.

vectorL usa automáticamente un tipo de índice con signo cuando el índice inferior es negativo y uno sin signo en caso contrario. Esto significa que, cuando el índice inferior es negativo, el índice máximo posible se reduce aproximadamente a la mitad debido al rango de los tipos de tamaño con signo.

 Observaciones   

Los vectores basados en vectorL pueden mostrar una pequeña pérdida de rendimiento en comparación con std::vector, debido a la necesidad de restar el índice inferior del índice especificado al indexar en el objeto base std::vector. En las pruebas se ha visto que esta pérdida es mínima cuando es detectable.

A diferencia de std::vector, el operador de indexación operator[] comprobará los errores de límites en las compilaciones de depuración.

vector0.fwd.hh y vector1.fwd.hh proporcionan typedefs para los tipos de valor comunes.

vectorL.hh incluye vectorL\_bool.hh, que contiene la especialización para bool (con todas las mismas rarezas que std::vector\< bool \>), y se proporcionan especializaciones análogas para [[vector1]] y [[vector0]].

Usa a.swap( b ), swap( a, b ) o utility::swap( a, b ) para intercambiar dos vector1 o un [[vector1]] con un std::vector. std::swap( a, b ) funcionará, pero puede ser muy lento si tu compilador no admite las sobrecargas de std::swap.

vectorL hereda de std::vector. Aunque std::vector no está diseñado para servir como clase base, este uso es seguro porque vectorL no tiene miembros de datos adicionales.

 Nota   
-   std::vector con índices que empiezan en L y algunos extras
-   El índice inferior debe estar en el rango de ssize\_t
-   El tipo de índice es std::size\_t o ssize\_t según el signo de L
-   Cuando L es negativo, los operadores de indexación solo pueden alcanzar los primeros max( ssize\_t ) elementos, e intentar indexar más allá provocará un fallo de aserción
-   Se puede construir y asignar a partir de std::vector, e intercambiar con std::vector
-   Se puede comparar con std::vector: compara el contenido ignorando los índices
-   Se puede convertir explícitamente a std::vector
-   Aquí es seguro heredar de forma privada de std::vector

##Véase también

* [[Documentación del espacio de nombres utility|namespace-utility]]
* [[Documentación de std::vector de C++|http://www.cplusplus.com/reference/vector/vector/]]
* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores
