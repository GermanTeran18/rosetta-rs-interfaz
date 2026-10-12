# RotamerTrialsRefiner
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RotamerTrialsRefiner

Usa pruebas de rotámeros para optimizar rápidamente las cadenas laterales dentro y alrededor del loop 
que se está muestreando. Las pruebas de rotámeros son un algoritmo voraz para empaquetar cadenas laterales.
Cada residuo se considera una sola vez y se coloca en su rotámero óptimo 
dadas las conformaciones actuales de todos sus vecinos. Este mover es uno de los 
refiners predeterminados en el paso fullatom de LoopModeler.

```xml
<RotamerTrialsRefiner name="(&string)" task_operations="(&string)" scorefxn="(&string)" loop_file="(&string)"/>
```

Opciones:

* task_operations: los residuos que se optimizan. Por defecto, cualquier residuo 
  a menos de 10 Å del loop se someterá a pruebas de rotámeros. Si indicas 
  tus propias task operations, por defecto no se reempaquetará nada, así que asegúrate 
  de dejar que se reempaqueten los residuos dentro de una capa razonable alrededor del loop.

* scorefxn: la función de puntuación que se usa para las pruebas de rotámeros. Es obligatoria si no se 
  usa como subetiqueta de algún otro LoopMover.

* loop_file: consulta LoopModeler.

Subetiquetas:

* Loop: consulta LoopModeler.

Advertencias:

* El Pose de entrada debe tener cadenas laterales, es decir, debe estar en modo fullatom.

* Consulta LoopModeler.

##Véase también

* [[Fixbb]]: aplicación para empaquetar rotámeros
* [[PackRotamersMover]]
* [[SymPackRotamersMover]]: versión simétrica de este mover
* [[PackRotamersMoverPartGreedyMover]]
* [[TryRotamersMover]]
* [[RotamerTrialsMover]]
* [[RotamerTrialsMinMover]]
* [[PrepackMover]]
* [[RepackMinimizeMover]]
* [[MinPackMover]]
* [[I want to do x]]: guía para elegir un mover

