# SymMinMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SymMinMover

La versión simétrica del mover min (admite las mismas etiquetas que la versión asimétrica). Ten en cuenta que, para refinar los grados de libertad simétricos, todos los jumps deben poder moverse con la etiqueta 'jump=ALL'.

```xml
<SymMinMover name="min1" scorefxn="ramp_rep1" bb="1" chi="1" jump="ALL"/>
```


##Véase también

* [[TaskAwareSymMinMover]]: la versión de este mover sensible a tareas
* [[MinMover]]: versión no simétrica de este mover
* [[Symmetry]]: uso de simetría en Rosetta
* [[SymmetryAndRosettaScripts]]
* [[Minimization overview]]
* [[SetupForSymmetryMover]]
* [[SetupNCSMover]]
* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]
* [[DetectSymmetryMover]]
* [[SymPackRotamersMover]]
* [[MakeBundleMover]]
* [[I want to do x]]: guía para elegir un mover
