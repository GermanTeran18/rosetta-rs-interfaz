# Translate
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## Translate

```xml
<Translate name="&string" chain="&string" distribution="[Uniform|Gaussian]" angstroms="(&float)" cycles="(&int)"/>
```

El mover Translate sirve para realizar un movimiento aleatorio grueso de una molécula pequeña en el espacio xyz. Este movimiento puede ser a cualquier punto dentro de una esfera de radio especificado por "angstroms". La cadena que se mueve debe coincidir con la del archivo PDB (un código de 1 letra). "cycles" especifica el número de intentos de hacer tal movimiento sin caer encima de otra molécula. Se acepta el primer movimiento aleatorio que no produce una puntuación repulsiva positiva. El movimiento aleatorio puede elegirse de una distribución uniforme o gaussiana. Este mover usa una rejilla atractivo-repulsiva para consultar la puntuación a toda velocidad.

##Véase también

* [[TransformMover]]: diseñado para sustituir a TranslateMover, RotateMover y SlideTogetherMover
* [[RigidBodyTransMover]]
* [[RotateMover]]
* [[SlideTogetherMover]]
* [[I want to do x]]: guía para elegir un mover

