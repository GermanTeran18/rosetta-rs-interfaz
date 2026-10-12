#RestrictInteractionGraphThreadsOperation

Documentación creada el 5 de noviembre de 2019 por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org).

*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*

[[_TOC_]]

## Descripción

Esta es una `TaskOperation` que limita el número de hilos que se pueden solicitar para el precálculo del grafo de interacción. Ten en cuenta que esto solo tiene efecto en las compilaciones multihilo de Rosetta (compiladas con la opción `extras=cxx11thread` añadida al comando `scons`).

En las compilaciones multihilo de Rosetta se mantiene un grupo global de hilos de Rosetta. Por defecto, el número de hilos lanzados por proceso de Rosetta es igual al número de núcleos detectados en el nodo en el que se ejecuta el proceso, pero se puede limitar con la opción de línea de comandos `-multithreading:total_threads <number>`. Al empaquetar, el precálculo del grafo de interacción divide su trabajo entre los hilos disponibles y, por defecto, solicita todos los hilos disponibles del grupo de hilos. El número realmente asignado puede ser menor según la disponibilidad de hilos, pero está garantizado que será al menos 1. Esta `TaskOperation` permite al usuario especificar que se soliciten menos hilos que el total. (Ten en cuenta que los aumentos lineales del rendimiento del empaquetado solo se observan hasta unos 4 hilos; a partir de ahí hay rendimientos decrecientes.)

El número predeterminado de hilos solicitados para configurar el grafo de interacción también se puede controlar en la línea de comandos con la opción `-multithreading:interaction_graph_threads <number>`.

## Efecto en compilaciones de un solo hilo

En las compilaciones de un solo hilo, esta `TaskOperation` no puede tener efecto. El número de hilos que se solicita solo se puede establecer en 1 o en 0, donde 0 significa «solicitar todos los disponibles» (que, en una compilación de un solo hilo, es 1).

## Efecto de varias instancias de esta TaskOperation

La `RestrictInteractionGraphThreadsOperation` solo puede _reducir_ el número de hilos solicitados. Si se aplica más de una, se solicitará el número _menor_ de hilos. (Ten en cuenta que es difícil imaginar una situación en la que tenga sentido aplicar varias `RestrictInteractionGraphThreadsOperation`.)
 
## Uso
### RosettaScripts

[[include:to_RestrictInteractionGraphThreadsOperation_type]]

##Véase también
* [[El gestor de hilos de Rosetta|RosettaThreadManager]]
* [[Compilar y ejecutar Rosetta multihilo|running-rosetta-with-options#running-rosetta-with-multiple-threads]]
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
