# TaskAwareMinMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## TaskAwareMinMover

[[include:mover_TaskAwareMinMover_type]]

Realiza minimización. Acepta TaskOperations mediante la opción task\_operations, p. ej.

    task_operations=(&string,&string,&string)

para configurar qué posiciones se minimizan. Las opciones

    chi=(&bool) and bb=(&bool) jump=(0 &bool) scorefxn=(score12 &string)

controlan la libertad de jumps, cadenas laterales o cadena principal. Por defecto se minimizan las cadenas laterales. Las opciones type y tolerance se pasan al MinMover subyacente.

Para permitir la minimización de la cadena principal, el residuo debe ser diseñable. Si el residuo solo es empaquetable, solo se minimizará la cadena lateral.


##Véase también

* [[TaskAwareSymMinMover]]: la versión simétrica de este mover
* [[MinMover]]: la versión de este mover no sensible a tareas
* [[Task operations en RosettaScripts|TaskOperations-RosettaScripts]]
* [[TaskAwareCstsMover]]
* [[Minimization overview]]
* [[I want to do x]]: guía para elegir un mover

