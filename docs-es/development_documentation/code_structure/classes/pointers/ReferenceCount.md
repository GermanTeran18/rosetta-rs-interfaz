#ReferenceCount

ReferenceCount fue la clase central del sistema de punteros inteligentes que Rosetta3 usó hasta 2015. 
Casi todas las clases de Rosetta heredan en última instancia de esta clase; con ese criterio, es nuestra clase más importante. 
Luki Goldschmidt nos hizo pasar a un [[sistema de punteros inteligentes más reciente|development_documentation/tutorials/How-to-use-pointers-correctly]], que eliminó el propósito del antiguo ReferenceCount como clase que guardaba la variable de cuántos punteros apuntan a un objeto en el sistema de punteros inteligentes.
La clase se mantiene como una clase vacía.
Esto se debe en parte a que, al ser la raíz de herencia última de casi todas las clases, era demasiado difícil eliminarla. 
Sigue ofreciendo un beneficio al DataCache del Pose, como punto de referencia común de todas las clases que se pueden colocar en dicho DataCache.

#Véase también
* [[Owning pointer|owning-pointers]]
* [[Access pointers]]
* [[How to use pointers correctly]]
* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores

<!--- search optimization
ReferenceCount
ReferenceCount
ReferenceCount
--->
