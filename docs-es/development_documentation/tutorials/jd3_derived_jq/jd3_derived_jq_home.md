#Recorrido: escribir una job queen derivada para JD3

Autor: Jack Maguire,
Creado en enero de 2018

[[_TOC_]]

##[[Lista de comprobación de las funciones virtuales de StandardJobQueen que normalmente quieres sobrescribir|checklist]]

##[[Preguntas frecuentes|jd3_derived_jq_FAQ]]

##Resumen
El objetivo de este tutorial es ayudar a los desarrolladores a ganar experiencia escribiendo su propio protocolo JD3.
Puedes usar [[esta página|https://wiki.rosettacommons.org/index.php/JD3FAQ]]
como referencia de los conceptos de JD3 a lo largo del recorrido.
Enlazaré secciones concretas de esa página cuando sean relevantes,
así que no hace falta que la leas entera ahora.
Dicho esto, leer [[esta sección|https://wiki.rosettacommons.org/index.php/JD3FAQ#Bare-bones_description_of_how_to_create_a_JD3_application]]
sería un buen punto de partida.

Para tener un ejemplo sobre el que trabajar,
imaginemos que queremos un protocolo en el que el mover A y
el mover B se ejecutan ambos sobre la estructura de entrada, y los resultados se combinan y se pasan por el mover C.
[[Consulta el paso 2 si no queda claro a qué me refiero|creating_the_job_dag]]

En general, el código generado en este ejemplo NO está escrito pensando en la eficiencia, el rendimiento ni siquiera en nuestras propias convenciones de codificación.
El objetivo principal es la claridad y la simplicidad/legibilidad.
¡Todos los comentarios son bienvenidos! Envía tus ideas o preguntas a jackmaguire1444@gmail.com

##Cambios en el código desde que se escribió este tutorial

###JobGenealogist ya no recibe local_job_id

Mientras escribía este tutorial, me frustraba que el JobGenealogist
a veces recibiera el global_job_id y otras veces el local_job_id.
Es muy fácil pasar el elemento equivocado sin darse cuenta.
Por eso cambié el JobGenealogist para que solo interactúe con el global_job_id.
Intenté repasar el tutorial y encontrar todo lo que había que actualizar,
pero es muy posible que se me escaparan algunas cosas.
Ten presente este cambio si ves código que no tiene mucho sentido.

-Jack

##Contenido

Junto a cada enlace hay una lista de las funciones virtuales que sobrescribimos en esa sección.

###Preparación

[[Paso 1: Esqueletos para crear el archivo|skeletons]]

[[Paso 2: Crear el DAG de trabajos|creating_the_job_dag]]
`initial_job_dag()`
`parse_job_definition_tags()`

[[Paso 3: Node Managers|node_managers]]

###Generar trabajos

[[Paso 4: Crear larval jobs|larval_jobs]]
`determine_job_list()`

[[Paso 5: Escribir una clase Job|tutorial_job]]

[[Paso 6: Madurar larval jobs|maturing_larval_jobs]]
`complete_larval_job_maturation()`

###Procesar resultados

[[Paso 7: Registrar que un trabajo se completó|note_job_completed]]
`note_job_completed()`

[[Paso 8: Resumen del trabajo completado|completed_job_summary]]
`completed_job_summary()`

[[Paso 9: Descartar resultados de trabajos|discarding_job_results]]
`job_results_that_should_be_discarded()`

[[Paso 10: Escribir los resultados|outputting_results]]
`jobs_that_should_be_output()`

##Contenido adicional

[[Preguntas frecuentes|jd3_derived_jq_FAQ]]

[[Apéndice A: Permitir que el usuario defina su propia función de puntuación en &lt;Common>|appendixA]]
`append_common_tag_subelements()`

[[Apéndice B: Permitir que el usuario defina funciones de puntuación individuales en &lt;Job>|appendixB]]
`append_job_tag_subelements()`

##Clases útiles

[[Node Manager|node_manager]]

[[Job Genealogist|job_genealogist]]

##Véase también

* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: la página de inicio de la documentación de desarrollo
* [[Rosetta tests]]: enlaces a páginas sobre cómo ejecutar y escribir pruebas en Rosetta
* [[Rosetta overview]]: visión general de los conceptos principales de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de conceptos adicionales de Rosetta.
* [[Glossary]]: define los términos clave de Rosetta
