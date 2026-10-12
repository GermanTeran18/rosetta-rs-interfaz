#¿Qué son las pruebas unitarias?

El propósito de las [[pruebas unitarias|http://en.wikipedia.org/wiki/Unit_testing]] (enlace a Wikipedia) es asegurar que pequeños fragmentos de código se ejecuten _correctamente_. 
Escribir buenas pruebas unitarias es muy importante, pero es algo en lo que la comunidad tradicionalmente ha fallado: nuestra cobertura de pruebas unitarias es muy pobre y muchas de las pruebas que tenemos son superficiales. 
Las buenas pruebas unitarias resultan fáciles cuando se usa el [[desarrollo guiado por pruebas|http://en.wikipedia.org/wiki/Test-driven_development]] (enlace a Wikipedia), pero este tipo de habilidad de programación es un desafío para los biofísicos profesionales y programadores aficionados que forman nuestra base de desarrolladores.

TODO: Andrew LF ha dado presentaciones sobre la importancia de las pruebas unitarias y del desarrollo guiado por pruebas; sería excelente incluirlas aquí (estaba previsto para XRW2015, pero se acabó el tiempo.)

##¿Por qué es mala la cobertura de pruebas y qué podemos hacer al respecto?
_esta sección se convirtió a partir de un correo que SML escribió a JJ sobre las pruebas unitarias del código de FloppyTail._

Mucho código de Rosetta no puede probarse con pruebas unitarias porque no tiene unidades de un tamaño que se pueda probar.
 Las pruebas unitarias sirven para examinar funciones cortas y demostrablemente correctas. 
Las pruebas unitarias son para cuando puedes calcular a mano el resultado esperado del código y programarlo como
datos de comparación. 
(Tenemos un cierto número de pruebas unitarias que no funcionan así, sino que "capturan" la salida y la comparan de una ejecución a otra; esas son en realidad pruebas de regresión, es decir, [[[pruebas] de integración|integration tests]].)

Muchos [[Mover]]s, sobre todo los movers de escala de protocolo, tienen solo dos tipos de funciones: funciones monstruosas gigantes
(init_on_new_input/initialize/etc. y apply) y getters/setters triviales.
Escribir pruebas unitarias para las funciones triviales sin duda es posible y tiene cierto valor. 

Imaginemos que apply() crea una gran cantidad de Movers y luego los vuelca en un SequenceMover al que llama repetidamente bajo control de Monte Carlo como bucle principal del protocolo. 
Imaginemos que init_on_new_input lee del sistema de opciones y de otras entradas para construir MoveMaps, FoldTrees y PackerTasks/TaskFactories que dependen de PoseMetricCalculators, ScoreFunctions y todo lo demás que apply() necesitará.

Escribir una prueba unitaria para apply tal como está no es posible: está llena de decisiones de Monte Carlo y sus resultados no se pueden precalcular. 
Se prueba adecuadamente con una prueba de integración.

Escribir una prueba unitaria (en realidad una serie de varias pruebas unitarias) para init_on_new_input es factible. 
El propósito de la función es construir los calculadores subyacentes, los MoveMaps, etc. 
Podrías construir manualmente los objetos que init_on_new_input debe crear en diversas circunstancias, luego dejar que init_on_new_input se ejecute y ver si crea el MISMO MoveMap, la MISMA PackerTaskFactory (con TaskOperations incrustadas... con PoseMetricCalculators incrustados...), etc. 
Esto sin duda sería muy valioso. 

En cambio, podrías refactorizar este código de modo que tenga funciones de un tamaño que se pueda probar:
refactorizar init_on_new_input en funciones separadas para los distintos objetos que crea (o los distintos flujos de cómo elige qué mover), y refactorizar apply() para que la creación de Movers esté separada de
los bucles for de Monte Carlo. 
Esta refactorización haría MUCHO más simple escribir pruebas unitarias y te dejaría con mejor código. 
Por supuesto, también te deja en la poco envidiable posición de realizar una refactorización importante sin cobertura de pruebas que respalde tus cambios (salvo la prueba de integración). 
Se esperaría que la prueba de integración tuviera muchos cambios "cosméticos" pero ningún cambio de "trayectoria" tras una refactorización.

Así que, en resumen, **escribe funciones pequeñas y granulares** desde el principio, y las pruebas unitarias serán fáciles. 
Escribir buenas pruebas unitarias para código sin tales funciones es imposible.

##Véase también
* [[Ejecutar pruebas unitarias|run-unit-test]]
* [[Escribir pruebas unitarias|writing-unit-tests]]
* [[UMoverTest|mover-test]], una herramienta para probar con pruebas unitarias las clases Mover
* [[UTracer]], una herramienta para simplificar la escritura de pruebas unitarias comparando texto _en masse_

* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]
