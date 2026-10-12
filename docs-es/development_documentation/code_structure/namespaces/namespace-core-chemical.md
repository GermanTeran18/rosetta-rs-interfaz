#Espacio de nombres core::chemical

Estado químico compartido, como propiedades, por todas las instancias de átomos y moléculas.

El espacio de nombres core::chemical contiene las representaciones de entidades puramente químicas que usa Rosetta: no incluye propiedades posicionales ni conformacionales. Aunque conceptualmente podría existir un grafo topológico o de conectividad de las entidades químicas en una verdadera capa química, la falta de uso para esa capa y las complicaciones de implementación que traería en C++ una capa paralela a la representación de la conformación (p. ej., un enfoque con el patrón Decorator introduce herencia virtual y múltiple) nos llevaron a omitir esa capa. 

##Véase también

* [[src Index Page]]: Explica la organización del código de Rosetta en el directorio `src`
* Más espacios de nombres en core:
  * [[Espacio de nombres core::conformation|namespace-core-conformation]]
  * [[core::conformation::idealization|namespace-core-conformation-idealization]] **YA NO EXISTE**
  * [[core::fragments|namespace-core-fragments]]
  * [[core::io::pdb|namespace-core-io-pdb]]
  * [[core::scoring|namespace-core-scoring]]
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores
