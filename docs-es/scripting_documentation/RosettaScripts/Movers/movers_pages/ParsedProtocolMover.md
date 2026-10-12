# ParsedProtocol (antes DockDesign)
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## ParsedProtocol (antes DockDesign)

[[include:mover_ParsedProtocol_type]]

-   apply\_probabilities: solo funciona en el modo single\_random. Puedes fijar la probabilidad (0-1) de que se llame a un submover concreto. Las probabilidades deben sumar 1.0, o recibirás un mensaje de error. Ten en cuenta que GenericMonteCarlo lo usa en su modo adaptive\_movers para ajustar dinámicamente las probabilidades de los movers durante una trayectoria de muestreo.

##Véase también

* [[ContingentAcceptMover]]
* [[IfMover]]
* [[GenericMonteCarloMover]]
* [[LoopOverMover]]
* [[Página principal de los filtros de RosettaScripts|Filters-RosettaScripts]]
* [[I want to do x]]: guía para elegir un mover
