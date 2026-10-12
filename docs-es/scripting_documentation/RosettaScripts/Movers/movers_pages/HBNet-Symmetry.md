#HBNet Symmetry

*Volver a la página de [[HBNet|HBNetMover]]. Volver a la página de [[Movers|Movers-RosettaScripts]]. Volver a la página de [[RosettaScripts|RosettaScripts]].*<br>

HBNet es totalmente funcional con la maquinaria de [[Symmetry]] de Rosetta, y la simetría se detecta automáticamente, pero hay varias cosas que conviene tener en cuenta y casos especiales en la detección y el procesamiento de redes para Poses simétricas:

* Como en la mayor parte de Rosetta, las funciones simétricas llevan la cuenta de los residuos independientes (unidad asimétrica; ASU) y las operaciones sobre la ASU se propagan después a las copias/clones simétricos
* Las energías rotámero-rotámero se almacenan en las aristas del InteractionGraph (IG) que corresponden a los residuos independientes y, si existen varias interacciones simétricas, lo que se almacena es la suma de todas esas interacciones; esto significa que puede no haber ningún puente de hidrógeno entre los residuos 10 y 23, pero si los hay entre rotámeros de la posición 10 y la 123 (donde 123 es un clon simétrico de 23), habrá una arista entre 10 y 23; la mayor parte de esto se gestiona automáticamente, pero al modificar el código es especialmente importante llevar la cuenta de esta información al evaluar la satisfacción y otras métricas de las redes.
* Para los rotámeros que forman puentes de hidrógeno con copias simétricas de sí mismos, estas energías se almacenan en las energías de un cuerpo del IG; HBNet usa una forma propia de rellenar las energías de un cuerpo de su IG para poder detectar estos casos durante el recorrido del IG.
* Algunas métricas necesitan aplicarse a la Pose completa y no solo a la ASU, y el código tiene salvaguardas especiales para ello.