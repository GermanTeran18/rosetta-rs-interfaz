# LoopLengthChange
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## LoopLengthChange

Cambia la longitud de un loop sin cerrarlo.

```xml
<LoopLengthChange name="(&string)" loop_start="(&resnum)" loop_end="(&resnum)" delta="(&int)"/>
```

-   loop\_start, loop\_end: dónde empieza y termina el loop.
-   delta: cuánto se cambia. Los valores negativos significan acortar el loop.

##Véase también

* [[RosettaScriptsLoopModeling]]
* [[Aplicación loopmodel|loopmodel]]
* [[Formato de archivo de loops|loops-file]]
* [[LoopBuilderMover]]
* [[LoopCreationMover]]
* [[LoopFinderMover]]
* [[LoopModelerMover]]
* [[LoopMoverFromCommandLineMover]]
* [[LoopProtocolMover]]
* [[LoopRemodelMover]]
