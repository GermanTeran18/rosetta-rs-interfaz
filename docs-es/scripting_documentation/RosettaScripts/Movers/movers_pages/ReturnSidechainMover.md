# ReturnSidechainsMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*

Este Mover se usa para devolver conformaciones conocidas de cadenas laterales a un Pose [[centroide|Glossary#centroid]]. Muchos protocolos reciben entrada [[fullatom|Glossary#fullatom]], hacen un paso de «muestreo amplio» / perturbación centroide y luego un paso de refinamiento fullatom (por ejemplo, el modelado de loops). Este Mover se usa para llevar las cadenas laterales de entrada del Pose fullatom original a través de una fase centroide para que los datos no se pierdan. (Obviamente, algunas de esas cadenas laterales serán inapropiadas para la nueva conformación, pero quizá grandes partes sean internamente rígidas y las cadenas laterales cristalográficas sean buenas).

En realidad no es compatible con RosettaScripts, porque [[SaveAndRetrieveSidechainsMover]] ya lo es. Los dos se desarrollaron en paralelo, por accidente, hace años. Sin embargo, ReturnSidechainMover tiene la ventaja de estar en un nivel de biblioteca más bajo de los protocolos (está en .3, como parte de simple_moves), por lo que es una opción más accesible para quien escribe protocolos en C++.  

Recibe su Pose de referencia (aquel del que se devuelven las cadenas laterales) en su constructor.

[[SwitchResidueTypeSetMover]] es su compañero inverso (para poner centroide donde hay fullatom).  

##Véase también

* [[BuildAlaPoseMover]]
* [[SaveAndRetrieveSidechainsMover]]
* [[SwitchResidueTypeSetMover]]
* [[SavePoseMover]]
* [[I want to do x]]: guía para elegir un mover