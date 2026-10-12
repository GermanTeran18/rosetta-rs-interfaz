# RigidBodyTransMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RigidBodyTransMover

Traslada cadenas.

     <RigidBodyTransMover name="(&string)" jump="(1 &int)" distance="(1.0 &Real)" x="(0.0 &Real)" y="(0.0 &Real)" z="(0.0 &Real)" />

-   jump: se trasladará la cadena situada después del jump especificado.
-   distance: la distancia que se traslada a lo largo del eje
-   x,y,z: especifican el eje a lo largo del cual se traslada. El vector se normalizará a longitud unitaria antes de usarse. Con todo ceros (el valor por defecto), la dirección se fija automáticamente en el momento de aplicar sobre el eje entre los centros aproximados de los dos componentes que se separan.


##Véase también

* [[TransformMover]]
* [[TranslateMover]]
* [[I want to do x]]: guía para elegir un mover