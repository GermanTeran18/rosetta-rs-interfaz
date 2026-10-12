#Punteros de acceso

*Para ver pautas sobre el uso de punteros propietarios y de acceso o punteros inteligentes, consulta la página [[how to use pointers correctly]].*

Los punteros de acceso (access_ptr) forman parte de un sistema de punteros inteligentes.  access_ptr es un envoltorio simple de puntero que no se puede eliminar (directamente) y que sirve para apuntar a objetos de acceso que no son de su propiedad. Los objetos access_ptr se pueden guardar en contenedores de la STL y son tan pequeños y rápidos como los punteros sin procesar. Aún es posible eliminar el puntero envuelto, así que esto no es una protección infalible contra un mal uso deliberado.

Esta página albergó en su día documentación sobre el sistema de punteros inteligentes obsoleto de Rosetta basado en [[ReferenceCount]].

##Véase también

* [[Owning pointer|owning-pointers]]
* [[How to use pointers correctly]]
* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[ReferenceCount]]: Se usaba antes para los punteros propietarios y de acceso (ahora obsoleto)
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores
