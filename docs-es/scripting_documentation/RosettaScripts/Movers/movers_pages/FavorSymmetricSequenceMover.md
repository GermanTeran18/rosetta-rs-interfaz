# FavorSymmetricSequence
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FavorSymmetricSequence

Añade ResidueTypeLinkingConstraints a la Pose de modo que se favorezca una secuencia simétrica (CATCATCAT) durante el diseño. Debes añadir este mover antes de realizar el diseño de la secuencia.

    <FavorSymmetricSequence penalty="(&real)" name="symmetry_constraints" symmetric_units="(&size)"/> 

-   penalty debe ser un número real positivo y representa la penalización que se aplica a un par de residuos asimétricos.
-   symmetric\_units debe ser un entero positivo que representa el número de unidades simétricas de la secuencia. Debe ser un valor de 2 o mayor.

La puntuación total de las restricciones aparece con el nombre 'res\_type\_linking\_constraint'


##Véase también
* [[SetupForSequenceSymmetryMover]]/[[KeepSequenceSymmetry]]
* [[ResidueTypeConstraintMover]]
* [[I want to do x]]: guía para elegir un mover