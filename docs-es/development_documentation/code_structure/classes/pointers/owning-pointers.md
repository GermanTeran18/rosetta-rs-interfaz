#Punteros propietarios

*Para ver pautas sobre el uso de punteros propietarios y de acceso o punteros inteligentes, consulta la página [[how to use pointers correctly]].*

Los punteros propietarios, o punteros inteligentes, son punteros que conservan el conocimiento de cuántos punteros activos hay hacia el objeto que contienen.
Esto tiene dos propósitos.
Primero, el objeto apuntado no se eliminará mientras no se eliminen todos los punteros propietarios (lo que evita fallos de segmentación).
Segundo, el objeto apuntado se eliminará automáticamente cuando se eliminen todos los punteros propietarios que apuntan a él (lo que evita fugas de memoria).

Esta página albergó en su día documentación sobre el sistema de punteros inteligentes obsoleto de Rosetta basado en [[ReferenceCount]].

##Véase también

* [[Access pointer|access-pointers]]
* [[How to use pointers correctly]]
* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[ReferenceCount]]: Se usaba antes para los punteros propietarios y de acceso (ahora obsoleto)
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores
