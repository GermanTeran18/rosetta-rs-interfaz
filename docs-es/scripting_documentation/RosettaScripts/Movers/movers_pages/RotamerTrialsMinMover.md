# RotamerTrialsMinMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RotamerTrialsMinMover

Este mover recorre cada posición reempaquetable/rediseñable del Pose, toma por turno cada rotámero permitido, lo minimiza en el contexto del Pose actual y evalúa la energía. Después, cada posición se actualiza al rotámero minimizado de menor energía. No considera cambios coordinados en varios residuos y puede necesitar varias invocaciones para converger.

Además de la función de puntuación, el mover recibe una lista de task operations para especificar qué residuos considerar. (Consulta [[TaskOperations (RosettaScripts)|TaskOperations-RosettaScripts]].)

```xml
<RotamerTrialsMinMover name="&string" scorefxn="(&string)" task_operations="(&string,&string,&string)" nonideal="(&bool)"/>
```
##Véase también

* [[Fixbb]]: aplicación para empaquetar rotámeros
* [[MinPackMover]]
* [[PrepackMover]]
* [[RepackMinimizeMover]]
* [[Minimization overview]]
* [[PackRotamersMover]]
* [[SymPackRotamersMover]]: versión simétrica de este mover
* [[PackRotamersMoverPartGreedyMover]]
* [[TryRotamersMover]]
* [[RotamerTrialsMover]]
* [[RotamerTrialsRefinerMover]]
* [[I want to do x]]: guía para elegir un mover
