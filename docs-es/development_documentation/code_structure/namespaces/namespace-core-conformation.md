#Espacio de nombres core::conformation

Información geométrica sobre estructuras moleculares individuales. 

Espacios de nombres
-------------------

[[idealization|namespace-core-conformation-idealization]] Valores ideales de longitud de enlace, ángulos de enlace y ángulos de torsión.

Descripción detallada
---------------------

Información geométrica sobre estructuras moleculares individuales.

La capa de conformación contiene la representación topológica y posicional de las estructuras moleculares y la lógica necesaria para actualizar las posiciones cuando se han hecho cambios conformacionales. La capa de conformación no representa la lógica para hacer cambios conformacionales ("movimientos") con el fin de lograr un objetivo, ni para evaluar la energía de una conformación.

Los objetos de conformación usan claves con nombre para la identificación y la búsqueda en contenedores indexados por clave. Esto hace el código más legible, elimina la necesidad de conocer los números de índice que corresponden a un tipo de objeto y aísla el código de los cambios o adiciones a la lista de tipos. Las colecciones de claves contienen claves fijas de cada tipo. Las colecciones de claves se pueden extender con facilidad: se pueden añadir nuevas claves en cualquier lugar de las listas de claves, y las listas se pueden reorganizar sin romper las aplicaciones.


##Véase también

* [[src Index Page]]: Explica la organización del código de Rosetta en el directorio `src`
* Más espacios de nombres en core:
  * [[Espacio de nombres core::chemical|namespace-core-chemical]]
  * [[core::conformation::idealization|namespace-core-conformation-idealization]] **YA NO EXISTE**
  * [[core::fragments|namespace-core-fragments]]
  * [[core::io::pdb|namespace-core-io-pdb]]
  * [[core::scoring|namespace-core-scoring]]
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores
