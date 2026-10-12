# SwitchResidueTypeSetMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SwitchResidueTypeSetMover

Cambia los conjuntos de residuos (p. ej., todos los átomos-\>centroide, o viceversa).

```xml
<SwitchResidueTypeSetMover name="&string" set="(&string)"/>
```

-   set: qué conjunto se usa (opciones: centroid, centroid_rot, fa\_standard...)

Normalmente, RosettaScripts asume que los Poses son de todos los átomos. En algunos casos se necesita un Pose centroide, p. ej., para la puntuación centroide, y en esos casos se usa este mover.


##Véase también

* [[PrepareForFullatomMover]]
* [[PrepareForCentroidMover]]
* [[Centroid vs fullatom]]
* [[I want to do x]]: guía para elegir un mover

