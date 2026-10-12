# RollMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RollMover

Rota el Pose alrededor de un eje dado.

```xml
        <RollMover name="(&string)" start_res="(&int)" stop_res="(&int)" min_angle="(&Real)" max_angle="(&Real)"> 
               <axis x="(&Real)" y="(&Real)" z="(&Real)" /> 
               <translate x="(&Real)" y="(&Real)" z="(&Real)" /> 

        </RollMover>
```

-   start\_res: id del primer residuo del objeto que se va a rotar
-   stop\_res: id del último residuo del objeto que se va a rotar
-   min\_angle: ángulo mínimo de giro alrededor del eje
-   max\_angle: ángulo máximo de giro alrededor del eje
-   axis: vector alrededor del cual se rota
-   translate: punto al que se traslada el eje



Rota y/o traslada el Pose sobre un eje/dirección aleatorios

```xml
<RollMover name="(&string)" chain="(&int)" random_roll="(&Bool)" random_roll_angle_mag="(&Real)" random_roll_trans_mag="(&Real)" /> 
```
-   random_roll_angle_mag: la sigma de una rotación gaussiana alrededor de un eje aleatorio
-   random_roll_trans_mag: la sigma de una traslación aleatoria gaussiana en 3D


##Véase también

* [[TransformMover]]
* [[RotateMover]]
* [[I want to do x]]: guía para elegir un mover
