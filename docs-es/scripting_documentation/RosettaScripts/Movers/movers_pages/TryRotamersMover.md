# TryRotamers
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## TryRotamers

Produce un conjunto de rotámeros a partir de un residuo dado. Se usa después de [AtomTree](#AtomTree) para generar rotámeros inversos de un residuo dado.

[[include:mover_TryRotamers_type]]


-   explosion: rango de 0 a 4 de cuánta explosión extra de rotámeros se incluye. En este contexto, explosión extra significa EX\_FOUR\_HALF\_STEP\_STDDEVS (+/- 0.5, 1.0, 1.5, 2.0 sd). (Por defecto se incluye EX\_ONE\_STDDEV (+/- 1.0 sd) para todos los chi1,2,3,4.)
    -   1 = explota chi1
    -   2 = explota chi1,2
    -   3 = explota chi1,2,3
    -   4 = explota chi1,2,3,4
-   pdb\_num/res\_num: consulta la [[documentación principal de RosettaScripts|RosettaScripts#rosettascripts-conventions_specifying-residues]] para más información.
-   shove: usa el tipo de átomo shove (que reduce el potencial repulsivo en los átomos de la cadena principal) para una lista separada por comas de identidades de residuo, p. ej., shove=3A,40B.
-   automatic\_connection: ¿debe TryRotamers configurar por sí mismo el fold tree de rotámeros inversos?

Cada pasada por TryRotamers colocará el siguiente rotámero en la posición dada. Aumenta los valores de -nstruct según corresponda para obtenerlos todos. Una vez colocados todos los rotámeros, TryRotamers hará que fallen las ejecuciones posteriores del protocolo con los mismos ajustes.


##Véase también

* [[PackRotamersMover]]
* [[PackRotamersMoverPartGreedyMover]]
* [[Fixbb]]: aplicación para empaquetar rotámeros
* [[MinPackMover]]
* [[PrepackMover]]
* [[RepackMinimizeMover]]
* [[RotamerTrialsMover]]
* [[RotamerTrialsMinMover]]
* [[RotamerTrialsRefinerMover]]
* [[I want to do x]]: guía para elegir un mover
