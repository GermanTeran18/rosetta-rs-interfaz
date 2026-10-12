#Lista de comprobación de las funciones virtuales de StandardJobQueen que normalmente quieres sobrescribir

Autor: Jack Maguire

[[Volver al recorrido|jd3_derived_jq_home]]

[[Paso 1: Esqueletos para crear el archivo|skeletons]]

La Standard Job Queen tiene muchas funciones virtuales y
no siempre es evidente para el desarrollador qué funciones
debe sobrescribir la job queen derivada.
El objetivo de esta página (y de este tutorial en general) es
ayudar a los desarrolladores a averiguar si la Standard Job Queen
espera o no que la job queen derivada sobrescriba una función virtual determinada.

#Lista de comprobación:

- `initial_job_dag()`

- `parse_job_definition_tags()`

- `determine_job_list()`

- `complete_larval_job_maturation()`

- `note_job_completed()` x 2

- `completed_job_summary()` x 2

- `job_results_that_should_be_discarded()`

- `jobs_that_should_be_output()`

#Opcionales:

- `parse_job_definition_tags()`

- `append_common_tag_subelements()`

- `append_job_tag_subelements()`

- `assign_output_index()`

##Véase también

* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: la página de inicio de la documentación de desarrollo
* [[Rosetta tests]]: enlaces a páginas sobre cómo ejecutar y escribir pruebas en Rosetta
* [[Rosetta overview]]: visión general de los conceptos principales de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de conceptos adicionales de Rosetta.
* [[Glossary]]: define los términos clave de Rosetta
