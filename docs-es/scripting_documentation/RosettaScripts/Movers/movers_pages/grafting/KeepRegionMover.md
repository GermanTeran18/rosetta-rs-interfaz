# KeepRegionMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## KeepRegionMover

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com

PI: Roland Dunbrack

###Propósito
Conserva una región del Pose actual y elimina todo lo demás.  El número de residuo se analiza en el momento de apply (sección PROTOCOLS), por lo que no tiene por qué existir necesariamente en la sección de definición (sección MOVERS) (es decir, para injerto de proteínas).

[[include:mover_KeepRegionMover_type]]


##Véase también

* [[I want to do x]]: Guía para elegir un mover
* [[DeleteRegionMover]]
* [[InsertPoseIntoPoseMover]]
