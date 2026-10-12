# PrepareForFullatom
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PrepareForFullatom

Convierte un Pose a modo fullatom como preparación para el modelado 
de loops de alta resolución. LoopModeler lo usa internamente.

```xml
<PrepareForFullatom name="(&string)" force_repack="(no &bool)" scorefxn="(&string)"/>
```

Opciones:

* force_repack: por defecto, al convertir a modo fullatom solo se reempaquetan las cadenas laterales que forman parte del loop y las 
  cadenas laterales que no se pudieron recuperar de la estructura de entrada. 
  Si el Pose de entrada ya está en modo fullatom, la mayoría de las posiciones pueden quedar sin cambios. Al activar esta opción se fuerza a 
  reempaquetar toda la proteína de todos modos.

* scorefxn: el nombre de la función de puntuación que se usa para el reempaquetado. Obligatorio.

##Véase también

* [[PrepareForCentroidMover]]
* [[SwitchResidueTypeSetMover]]
* [[Centroid vs fullatom]]
* [[I want to do x]]: guía para elegir un mover