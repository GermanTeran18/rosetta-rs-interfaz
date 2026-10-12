# SymFoldandDockSlideTrialMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SymFoldandDockSlideTrialMover

[[include:mover_SymFoldandDockSlideTrialMover_type]]

Desliza las subunidades simétricas hasta que entren en contacto según el tipo de deslizamiento fijado en la información de simetría del Pose, de forma similar al mover [[SymDockingInitialPerturbation]] con el deslizamiento habilitado:


* ORDERED_SEQUENTIAL: deslizará a lo largo de cada jump, uno tras otro, en el orden estándar.
* SEQUENTIAL: deslizará a lo largo de cada jump, uno tras otro, en orden aleatorio.
* RANDOM: elige al azar el jump a lo largo del cual se desliza.