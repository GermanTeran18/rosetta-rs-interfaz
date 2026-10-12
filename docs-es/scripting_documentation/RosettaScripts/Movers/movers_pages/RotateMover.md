# Rotate
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## Rotate

```xml
<Rotate name="&string" chain="&string" distribution="[Uniform|Gaussian]" degrees="(&int)" cycles="(&int)"/>
```

El mover Rotate sirve para realizar una rotación aleatoria gruesa en todos los grados de libertad rotacionales. Normalmente se elige 360 para "degrees" y 1000 para "cycles". Rotate acumula Poses que superan un filtro atractivo y uno repulsivo y que son suficientemente distintos entre sí (según un filtro de RMSD). De esta colección de Poses diversos se elige 1 al azar. "cycles" representa el número máximo de intentos de encontrar Poses diversos con puntuaciones atractivas y repulsivas aceptables. Si se acumula pronto un número suficiente de Poses, se harán menos rotaciones de las especificadas por "cycles". Este mover usa una rejilla atractivo-repulsiva para consultar la puntuación a toda velocidad.


##Véase también

* [[TransformMover]]: diseñado para sustituir a TranslateMover, RotateMover y SlideTogetherMover
* [[TranslateMover]]
* [[SlideTogetherMover]]
* [[I want to do x]]: guía para elegir un mover
