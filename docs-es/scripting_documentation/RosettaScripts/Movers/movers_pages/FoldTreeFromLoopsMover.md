# FoldTreeFromLoops
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FoldTreeFromLoops

Envoltorio de la función de utilidad fold\_tree\_from\_loops. Define un fold tree a partir de definiciones de loops, de modo que el fold tree sube hasta el extremo N-terminal del loop y el extremo C-terminal, con un salto entre ambos. Los puntos de corte (cutpoints) definen la cinemática dentro del loop.

```xml
<FoldTreeFromLoops name="(&string)" loops="(&string)"/>
```

el formato de loops es: Start:End:Cut,Start:End:Cut...

y se permite tanto la numeración pdb como la de Rosetta. Los puntos de inicio, fin y corte se calculan en el momento de aplicar el mover, por lo que respetarían los cambios de longitud de los loops.



##Véase también

* [[FoldTree overview]]
* [[VirtualRootMover]]
* [[HotspotDisjointedFoldTreeMover]]
* [[Formato de archivo de loops|loops-file]]
* [[LoopModelerMover]]
* [[Aplicación loopmodel|loopmodel]]
* [[LoopBuilderMover]]
* [[LoopCreationMover]]
* [[LoopFinderMover]]
* [[LoopLengthChangeMover]]
* [[LoopModelerMover]]
* [[LoopMoverFromCommandLineMover]]
* [[LoopProtocolMover]]
* [[LoopRemodelMover]]
