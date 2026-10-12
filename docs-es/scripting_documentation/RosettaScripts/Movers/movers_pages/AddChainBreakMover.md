# AddChainBreak
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AddChainBreak

Añade una ruptura de cadena (chainbreak) en la posición especificada.

```xml
<AddChainBreak name="(&string)" resnum="(&string)" change_foldtree="(1 &bool)" find_automatically="(0 &bool)" distance_cutoff="(2.5&Real)" remove="(0 &bool)"/>
```

-   resnum: añade una ruptura de cadena en la posición dada. En concreto, añade el tipo de variante `CUTPOINT_LOWER` al residuo dado y `CUTPOINT_UPPER` a resnum + 1.
-   change\_foldtree: añade un salto (jump) en el punto de corte.
-   find\_automatically: encuentra automáticamente los puntos de corte según la distancia entre los átomos C y N consecutivos.
-   distance\_cutoff: la distancia umbral entre los átomos C y N consecutivos a partir de la cual se decide que existe un punto de corte.
-   remove: si es true, elimina la ruptura de cadena de la posición especificada en lugar de añadirla.

[[include:mover_AddChainBreak_type]]

##Véase también

* [[I want to do x]]: guía para elegir un mover
* [[FoldTree overview]]
* [[AddChainMover]]
* [[AlignChainMover]]
* [[BridgeChainsMover]]
* [[StartFromMover]]
* [[SwitchChainOrderMover]]
