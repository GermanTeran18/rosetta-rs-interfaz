#Referencia del espacio de nombres rosetta::scoring

Funciones de energía y métodos de puntuación para calcular la aceptabilidad de los decoys.

Descripción detallada
---------------------

Funciones de energía y métodos de puntuación para calcular la aceptabilidad de los decoys.

La capa de puntuación contiene los objetos función (functores) de energía y los functores de métodos de puntuación que calculan sumas ponderadas de energías (puntuaciones). Los functores de energía y de puntuación viven en jerarquías del patrón Strategy con interfaces abstractas, que desacoplan a los clientes que los llaman de los métodos concretos y ofrecen un diseño "enchufable" que hace sencillo añadir nuevas funciones y modificar las existentes, con una carga baja de recompilación.

La capa de puntuación está diseñada para depender de las capas de conformación y química, pero no de la optimización ni de ninguna capa específica de un protocolo.

##Véase también

* [[src Index Page]]: Explica la organización del código de Rosetta en el directorio `src`
* [[Scoring explained]]: Explicación de la puntuación en Rosetta
* [[Score types]]: Descripción de las funciones de puntuación y los términos de energía de Rosetta
  * [[Tipos de puntuación adicionales|score-types-additional]]
* Más espacios de nombres en core:
  * [[core::chemical|namespace-core-chemical]]
  * [[Espacio de nombres core::conformation|namespace-core-conformation]]
  * [[core::conformation::idealization|namespace-core-conformation-idealization]] **YA NO EXISTE**
  * [[core::fragments|namespace-core-fragments]]
  * [[core::io::pdb|namespace-core-io-pdb]]
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores
