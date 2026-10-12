# VirtualRoot
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## VirtualRoot

Vuelve a enraizar el FoldTree del Pose en un residuo virtual (nuevo). Resulta útil para la minimización en el contexto de marcos absolutos (restricciones de coordenadas, información de densidad electrónica, etc.).

```xml
<VirtualRoot name="(&string)" removable="(&bool false)" remove="(&bool false)" />
```

Por defecto, el mover añade un residuo raíz virtual al Pose si todavía no existe uno. Si más adelante quieres eliminar la raíz virtual, añádela con un mover cuyo parámetro removable sea true y después usa otro mover VirtualRoot con remove en true para quitarla.

Actualmente VirtualRoot con remove en true es muy conservador al eliminar residuos raíz virtuales: no eliminará el residuo si ya no es el residuo raíz, si un cambio en la longitud del Pose hace que el residuo raíz quede en otra posición numérica, o si el residuo raíz virtual no fue añadido por un mover VirtualRoot con "removable" activado. No dependas del comportamiento de las eliminaciones que no hacen nada, ya que el mover podría volverse más permisivo en el futuro.

##Véase también

* [[FoldTree overview]]
* [[FoldTreeFromLoopsMover]]
* [[HotspotDisjointedFoldTreeMover]]
* [[I want to do x]]
