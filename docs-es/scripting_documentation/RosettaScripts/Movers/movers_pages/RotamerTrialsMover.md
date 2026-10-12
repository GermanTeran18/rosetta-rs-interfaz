# RotamerTrialsMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RotamerTrialsMover

Este mover recorre cada posición reempaquetable/rediseñable del Pose, toma por turno cada rotámero permitido y evalúa la energía. Después, cada posición se actualiza al rotámero de menor energía. No considera cambios coordinados en varios residuos y puede necesitar varias invocaciones para converger.

Además de la función de puntuación, el mover recibe una lista de task operations para especificar qué residuos considerar. (Consulta [[TaskOperations (RosettaScripts)|TaskOperations-RosettaScripts]].)

```xml
<RotamerTrialsMover name="&string" scorefxn="(&string)" task_operations="(&string,&string,&string)" show_packer_task="(0 &bool)" />
```


##Véase también

* [[Fixbb]]: aplicación para empaquetar rotámeros
* [[SymPackRotamersMover]]: versión simétrica de este mover
* [[PackRotamersMover]]
* [[PackRotamersMoverPartGreedyMover]]
* [[TryRotamersMover]]
* [[PrepackMover]]
* [[RepackMinimizeMover]]
* [[RotamerTrialsMover]]
* [[RotamerTrialsMinMover]]
* [[RotamerTrialsRefinerMover]]
* [[MinPackMover]]
* [[I want to do x]]: guía para elegir un mover
