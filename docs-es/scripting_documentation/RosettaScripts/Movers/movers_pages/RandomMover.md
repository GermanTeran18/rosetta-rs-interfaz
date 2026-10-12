# RandomMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RandomMover

Aplica al azar un mover de una lista, según pesos de probabilidad dados. La etiqueta **movers** recibe una lista de nombres de movers separados por comas. La etiqueta **weights** recibe una lista de pesos separados por comas que suman 1. Las longitudes de las listas de movers y de pesos deben coincidir.

```xml
<RandomMover name="( &string)" movers="(&string)" weights="(&string)" repeats="(null &string)"/>
```


##Véase también

* [[GenericMonteCarloMover]]
* [[LoopOverMover]]
* [[SubroutineMover]]
* [[I want to do x]]: guía para elegir un mover
