# ForceDisulfides
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ForceDisulfides

[[include:mover_ForceDisulfides_type]]

El forzado de disulfuros usa la función estándar de Rosetta, Conformation.fix\_disulfides( .. ), que solo establece el tipo de residuo en disulfuro y crea la conexión. El paso (opcional) de reempaquetado es necesario para materializar la geometría del enlace disulfuro. El reempaquetado se realiza en capas de 6 A alrededor de cada cisteína afectada, usando la función de puntuación especificada.

Por defecto, los disulfuros especificados se añaden al conjunto de disulfuros existentes. Puede usarse la opción `remove_existing` para eliminar todos los disulfuros existentes. (Las nuevas cisteínas libres se añadirán a la lista de residuos alrededor de los cuales se reempaqueta.) La opción `remove_existing` también puede usarse sin la opción `disulfides` para eliminar todos los disulfuros de la Pose.

##Véase también

* [[DisulfideMover]]
* [[DisulfidizeMover]]
* [[RemodelMover]]
* [[I want to do x]]: guía para elegir un mover
