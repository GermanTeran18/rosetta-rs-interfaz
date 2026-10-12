# SlideTogether
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SlideTogether

```xml
<SlideTogether name="&string" chains="&string"/>
```

La traslación y rotación iniciales pueden mover el ligando a un punto demasiado lejos de la proteína para el docking. Por tanto, tras una traslación y rotación iniciales de baja resolución del ligando, es necesario acercar la molécula pequeña y la proteína. Si no se hace esto, el docking de alta resolución será inútil. Simplemente especifica qué cadena se mueve. Este mover desplaza entonces la molécula pequeña hacia la proteína 2 Å cada vez, hasta que ambas chocan (lo que se evidencia por una puntuación repulsiva). Luego retrocede la molécula pequeña. Esto se repite con tamaños de paso decrecientes: 1 Å, 0.5 Å, 0.25 Å, 0.125 Å.


##Véase también

* [[TransformMover]]: diseñado para sustituir a TranslateMover, RotateMover y SlideTogetherMover
* [[TranslateMover]]
* [[RotateMover]]
* [[I want to do x]]: guía para elegir un mover

