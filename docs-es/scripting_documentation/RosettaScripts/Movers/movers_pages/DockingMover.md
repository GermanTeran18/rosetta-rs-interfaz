# Docking
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Docking

Realiza docking tanto en modo centroide como con todos los átomos.

```xml
<Docking name="&string" score_low="(score_docking_low &string)" score_high="(score12 &string)" fullatom="(0 &bool)" local_refine="(0 &bool)" jumps="(1 &Integer vector)" optimize_fold_tree="(1 &bool)" conserve_foldtree="(0 &bool)" design="(0 &bool)" ignore_default_docking_task="(0 &bool)" task_operations="('' comma-separated list)"/>
```

-   score\_low es la función de puntuación que se usa para el docking en modo centroide
-   score\_high es la función de puntuación que se usa para el docking con todos los átomos
-   fullatom: si es true, realiza docking con todos los átomos
-   local\_refine: si es true, omite el modo centroide. ¡Ten en cuenta que fullatom=0 y local\_refine=1 juntos darán como resultado NINGÚN DOCKING!
-   jumps es una lista de números de salto separados por comas sobre los que se realizan los movimientos de cuerpo rígido
-   optimize\_fold\_tree: ¿debe DockingProtocol crear el fold tree de esta Pose? Esto solo debe ponerse en 0 si se usa AtomTree
-   conserve\_foldtree: ¿debe DockingProtocol restablecer el fold tree al de entrada cuando termine?
-   design: habilita el diseño de la interfaz en todas las cadenas posteriores a rb\_jump
-   ignore\_default\_docking\_task: te permite ignorar la tarea de docking predeterminada y usar solo las definidas en tu sección task\_operations


##Véase también

* [[DockingProtocolMover]]
* [[DockWithHotspotMover]]
* [[FlexPepDockMover]]
* [[HighResDockerMover]]
* [[Docking applications]]: aplicaciones de línea de comandos para docking
* [[I want to do x]]: elegir un mover
