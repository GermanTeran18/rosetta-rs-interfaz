#MultistageRosettaScripts

#Opciones de Stage

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

[[_TOC_]]

##Esqueleto

```xml
<Stage
    num_runs_per_input_struct=“(uint)”
    total_num_results_to_keep=“(uint)”
    result_cutoff=“(uint)”
    max_num_results_to_keep_per_instance=“(uint)”
    max_num_results_to_keep_per_input_struct=“(uint)”
    merge_results_after_this_stage=“(bool)”
>

    <Add mover=“” filter=“”/>
    <Add mover_name=“” filter_name=“”/>
    <Sort filter=“” negative_score_is_good=“true”/>

</Stage>

```

##num_runs_per_input_struct

Es el equivalente en M.R.S. de la opción de línea de comandos `-nstruct`.
En el primer stage, el número que se indica aquí declara el número
de veces que se ejecutará el stage para cada estructura definida por las etiquetas `<Job>`.
Por ejemplo, si `num_runs_per_input_struct=40` y
hay 5 estructuras de entrada (Poses definidas por las etiquetas `<Job>`),
el stage acabará ejecutándose un total de 200 veces.

En cada stage adicional, el número que se indica aquí declara el número de
veces que se ejecutará el stage para cada resultado del stage anterior.
Si `num_runs_per_input_struct=5` en el stage actual y
`total_num_results_to_keep=10` en el stage anterior,
el stage actual acabará ejecutándose un total de 50 veces.

##total_num_results_to_keep

Este número define el máximo de resultados de trabajos del stage actual que sobrevivirán
y pasarán al siguiente stage (o se escribirán como salida, si es el último stage).
A diferencia de `num_runs_per_input_struct`, esta opción no se ve afectada por el número de estructuras de entrada.
La combinación de `num_runs_per_input_struct=40`, `total_num_results_to_keep=10` y
5 estructuras de entrada da como resultado 200 trabajos, de los cuales solo 10 resultados sobrevivirán hasta la siguiente ronda.

##max_num_results_to_keep_per_input_struct

Un motivo habitual de duda a la hora de poner num_runs_per_input_struct mayor que 1 en
un stage que no es el inicial es que podría producir muchos resultados casi duplicados.
Para mantener la diversidad, puedes usar esta opción para limitar el número de
resultados que se conservan y que derivan de la misma estructura (resultado del stage anterior).

Un valor de 0 significa que no hay límite (que es el valor por defecto).

##result_cutoff

Esta opción permite que un stage deje de enviar trabajos una vez que han llegado un cierto número de resultados.
Por ejemplo, supón que estás haciendo docking de dos proteínas y tienes alguna idea de cómo quieres que interactúen.
Puedes ejecutar tu mover de docking como de costumbre (con o sin restricciones)
y añadir después del mover de docking uno o más filtros.
El trabajo no devolverá un resultado salvo que supere todos estos filtros
(incluido el de `<Sort>`).
Ahora puedes poner `num_runs_per_input_struct` en un número muy grande y `result_cutoff` en 1000,
y Rosetta seguirá muestreando hasta encontrar 1000 resultados que superen todos tus filtros.

##max_num_results_to_keep_per_instance

Algunos movers pueden devolver varios resultados ([[HBNet|HBNetMover]], por ejemplo).
Esto es difícil de gestionar de forma ordenada.
El formato actual solo permite que el último mover de un stage devuelva varios resultados.
Esta opción define un tope para una instancia de ese mover.
Si este valor es 10, por ejemplo,
una única instancia de HBNet solo podría devolver hasta 10 resultados.
Así, si tienes `num_runs_per_input_struct=1000` y `max_num_results_to_keep_per_instance=2`,
puedes obtener un máximo de 2000 resultados.

##merge_results_after_this_stage

Por defecto, todos los resultados de un stage se echan en el mismo conjunto,
se ordenan y se eligen los mejores para sobrevivir.
Esta opción permite crear un conjunto separado para cada estructura de entrada de cada etiqueta `<Job>` hasta cierto punto.

Supón que tienes 2 estructuras de entrada de etiquetas `<Job>` y
3 stages: (1) Docking, (2) Diseño, (3) Minimización.
Quizá quieras una proporción 50/50 de resultados hasta el último stage.
Si pones `merge_results_after_this_stage="true"/>` en la etiqueta del segundo stage,
tendrás una proporción 50/50 de trabajos hasta después del paso de diseño.
Todos los resultados del paso de diseño irán al mismo conjunto
y los trabajos del stage 3 no tendrán necesariamente una proporción 50/50.

[[/images/multistage_rosetta_scripts/merge_results_after_this_stage.png]]

`merge_results_after_this_stage` solo se puede poner en true en un stage.
Si no aparece nunca en ningún stage,
los resultados siempre se colocarán en el mismo conjunto.
Los valores de `total_num_results_to_keep` y
`result_cutoff` se dividen a partes iguales entre los conjuntos.
Por ejemplo, si `result_cutoff="100"` y tienes 4 estructuras de entrada de etiquetas `<Job>`,
el stage no se detendrá antes de tiempo salvo que cada uno de los 4 conjuntos tenga al menos 25 resultados,
y Rosetta conservará total_num_results_to_keep/4 resultados de cada conjunto.

##Add

`<Add>` significa aquí exactamente lo mismo que en los
[[rosetta scripts tradicionales|RosettaScripts]].
Admite hasta 1 mover (se puede usar `mover_name` o `mover`)
y hasta 1 filtro (`filter_name` o `filter`).
Si se dan un mover y un filtro,
el mover se aplica antes que el filtro.

##Sort

`<Sort>` es similar a `<Add>`, pero
solo admite un filtro (`filter_name` o `filter`).
La métrica que mide este filtro se usa para ordenar los resultados
de este stage y determina cuáles se conservan y cuáles se descartan.
Se supone que los números más negativos son mejores para esta métrica,
pero esto se puede cambiar poniendo `negative_score_is_good="false"`.

##Véase también

* [[Rosetta Scripts multietapa|MultistageRosettaScripts]]
* [Tutorial introductorio de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
* [Tutorial avanzado de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

