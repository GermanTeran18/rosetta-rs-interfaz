#Node Manager

Autor: Jack Maguire

[[_TOC_]]

El node manager es una clase diseñada para ayudar a las job queens derivadas con su tediosa contabilidad.
Esta clase está pensada para que tengas una por cada nodo de tu dígrafo de trabajos.
Internamente, el node manager tiene los siguientes elementos:

##Resultados que se conservan

Hay un vector bidimensional ordenado de resultados.
Cada fila del arreglo se llama partición.
El usuario (el desarrollador de la job queen) especifica cuántos resultados de trabajos quiere para cada partición.

Al informar de un resultado, el usuario declara en qué partición debe ir ese resultado.
Una vez que el resultado se ordena en su partición correcta, el último elemento (el peor) de
esa partición se elimina si hay más elementos de los que el usuario especificó.

El usuario puede acceder a estos resultados con `results_to_keep()`,
que crea una representación unidimensional del vector 2D,
o con `get_nth_job_result_id()`, que devuelve el ResultID del n-ésimo elemento.
Se prefiere `get_nth_job_result_id()` a `results_to_keep()`
porque la primera permite que el node manager siga aceptando nuevos resultados,
mientras que la segunda congela el vector de resultados para evitar la invalidación de iteradores.

##Resultados que se descartan

Cuando un resultado de trabajo se elimina del vector bidimensional de resultados que se conservan,
se añade a una `std::list` de resultados de trabajos que se descartan.
La queen derivada puede acceder a esta lista con `append_job_results_that_should_be_discarded()`.

##Contadores de los distintos estados de envío de trabajos

El node manager lleva la cuenta de:

- El número de trabajos que se han enviado para este nodo.

- El siguiente id de trabajo local que se enviará

- El número de resultados recibidos.*


*También hay una funcionalidad integrada para dejar de enviar trabajos de un nodo del DAG antes de tiempo cuando llegan suficientes resultados.
De esto se encargan los argumentos "result_threshold" del constructor.

#Clases derivadas

Se han creado dos clases derivadas para simplificar la interfaz:

##SimpleNodeManager

Esta clase solo crea 1 partición,
así que el vector bidimensional es básicamente un vector unidimensional.
La interfaz de esta clase está diseñada de modo que nunca necesites especificar
un argumento de partición.

##EvenlyPartitionedNodeManager

Esta clase permite varias particiones,
pero exige que las particiones tengan requisitos simétricos.
El número de resultados que se conservan se divide por igual entre las particiones.
Lo mismo ocurre con el umbral de resultados.
Esto permite un constructor algo más cómodo para el usuario,
pero ninguno de los demás métodos cambia.

##Véase también

* [[Usar un Node Manager en la práctica|node_managers]]
* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: la página de inicio de la documentación de desarrollo
* [[Rosetta tests]]: enlaces a páginas sobre cómo ejecutar y escribir pruebas en Rosetta
* [[Rosetta overview]]: visión general de los conceptos principales de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de conceptos adicionales de Rosetta.
* [[Glossary]]: define los términos clave de Rosetta
