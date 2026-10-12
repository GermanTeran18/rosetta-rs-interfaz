#Referencia del espacio de nombres utility::factory

**>>>Este espacio de nombres ya no existe<<<**

Un sistema de fábrica de clases enchufable.

Descripción detallada
---------------------

Para cada tipo abstracto de producto, la fábrica puede crear objetos de sus subtipos concretos que se hayan registrado en la fábrica. El tipo que se va a crear se selecciona pasando a la función create de la fábrica una clave de un tipo registrado.

La clase abstracta del producto controla los tipos de la clave, del puntero devuelto (de modo que se pueda usar un puntero inteligente con semántica de propiedad como [[utility::pointer::owning_ptr|owning-pointers]], si se desea) y la firma de la función de creación que llama la fábrica.

El registro se realiza fácilmente definiendo objetos de la plantilla de clase Registrant, ya sea como miembros estáticos o como objetos de espacio de nombres que se definen al iniciar el programa. El Registrant tiene constructores que aceptan pares de clave y puntero a función de creación, con tipos definidos por los typedefs del producto abstracto. Las funciones de creación deben ser funciones miembro estáticas o funciones globales.

La fábrica admite el registro de punteros a las claves, de modo que se puedan registrar claves globales que quizá aún no se hayan construido. Las claves se mueven automáticamente al registro sin punteros antes de cualquier uso del registro.

Debido a las limitaciones del mecanismo de enlazado de C++, los objetos Registrant definidos en fuentes de una biblioteca estática no se enlazan a una aplicación a menos que se necesite algo más del archivo objeto. Por esta razón, las definiciones de los Registrant deben incluirse en un archivo que se sepa que necesitan todas las aplicaciones que usen la fábrica: si esto no es posible, deben enlazarse directamente a la aplicación y no colocarse en una biblioteca. Para las bibliotecas dinámicas haría falta un mecanismo distinto, específico de cada plataforma, que no se admite aquí.

##Véase también

* [[Espacio de nombres utility|namespace-utility]]
  * [[utility::io|namespace-utility-io]]
  * [[utility::keys|namespace-utility-keys]]
  * [[utility::options|namespace-utility-options]]
* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores
