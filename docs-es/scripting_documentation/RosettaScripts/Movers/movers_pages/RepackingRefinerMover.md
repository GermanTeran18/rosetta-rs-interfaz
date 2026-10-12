# RepackingRefiner
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RepackingRefiner

Reempaqueta las cadenas laterales dentro y alrededor del loop que se está muestreando. Este mover usa 
el algoritmo estándar de reempaquetado de Rosetta, que ejecuta una búsqueda de Monte Carlo 
de la disposición de cadenas laterales de menor puntuación sobre un scaffold de cadena principal fija.
Este mover es uno de los refiners predeterminados en el paso fullatom de LoopModeler.

```xml
<RepackingRefiner name="(&string)" task_operations="(&string)" scorefxn="(&string)" loop_file="(&string)"/>
```

Opciones:

* [[task_operations|TaskOperations-RosettaScripts]]: los residuos que se empaquetan y/o diseñan. Por defecto, cualquier residuo 
  a menos de 10 Å del loop se reempaquetará y no se diseñará ningún residuo. Si 
  indicas tus propias task operations, por defecto no se reempaquetará nada, así que 
  asegúrate de dejar que se reempaqueten los residuos dentro de una capa razonable alrededor del loop.

* scorefxn: la función de puntuación que se usa para el empaquetado. Es obligatoria si no se usa como 
  subetiqueta de algún otro LoopMover.

* [[loop_file|loops-file]]: consulta [[LoopModelerMover]].

Subetiquetas:

* Loop: consulta [[LoopModelerMover]].

Advertencias:

* El Pose de entrada debe tener cadenas laterales, es decir, debe estar en modo fullatom.

* Consulta [[LoopModelerMover]].


##Véase también

* [[LoopModelerMover]]
* [[RosettaScriptsLoopModeling]]
* [[Formato de archivo de loops|loops-file]]
* [[Aplicación loopmodel|loopmodel]]
* [[LoopRemodelMover]]
* [[PackRotamersMover]]