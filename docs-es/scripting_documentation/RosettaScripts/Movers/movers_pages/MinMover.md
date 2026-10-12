# MinMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MinMover

[[include:mover_MinMover_type]]

## Notas:

-   cartesian: para configurar una función de puntuación para la minimización cartesiana (es decir, si obtienes el error `ERROR: Scorefunction not set up for nonideal/Cartesian scoring`) debes fijar `cart_bonded` en 0.5 y `pro_close` en 0.0. 
-   MoveMap: el MoveMap puede programarse hasta el nivel de grados de libertad individuales. Consulta [[FastRelax|FastRelaxMover]] para más detalles.


##Véase también

* [Tutorial de minimización](https://www.rosettacommons.org/demos/latest/tutorials/minimization/minimization)
* [[SymMinMover]]: versión simétrica de este mover
* [[Minimization overview]]
* [[I want to do x]]: guía para elegir un mover
