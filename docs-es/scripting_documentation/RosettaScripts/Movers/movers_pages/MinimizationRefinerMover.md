# MinimizationRefiner
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MinimizationRefiner

Realiza una minimización por gradiente sobre el loop que se está muestreando. Se permite 
el movimiento tanto de los átomos de la cadena lateral como de la cadena principal, y no se usan restricciones. Este mover 
es un refiner predeterminado en los pasos centroide y fullatom de LoopModeler, y a menudo 
representa la mayor parte del tiempo de ejecución de LoopModeler.

```xml
<MinimizationRefiner name="(&string)" scorefxn="(&string)" loops_file="(&string)"/>
```

Opciones:

* scorefxn: la función de puntuación que se usa para las pruebas de rotámeros. Es obligatoria si no se 
  usa como subetiqueta de algún otro LoopMover.

* loop_file: consulta LoopModeler.

Subetiquetas:

* Loop: consulta LoopModeler.

Advertencias:

* Consulta LoopModeler.


##Véase también

* [[LoopModelerMover]]
* [[RosettaScriptsLoopModeling]]
* [[MinMover]]
* [[I want to do x]]: guía para elegir un mover