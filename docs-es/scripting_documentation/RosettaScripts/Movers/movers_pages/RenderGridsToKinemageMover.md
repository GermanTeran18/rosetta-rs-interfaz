# RenderGridsToKinemage
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RenderGridsToKinemage

```xml
<RenderGridsToKinemage name="(&string)" file_name="(&string)" grid_name="(&string)" low_color="(&string)" high_color="(&string)" stride="(&int)"/>
```

RenderGridsToKinemage generará un archivo Kinemage que representa una o más rejillas de puntuación. Si quieres generar varias rejillas de puntuación, ejecuta el mover varias veces, indicando cada vez un nombre de rejilla distinto. Este mover está pensado para depuración y solo debe ejecutarse con un único Pose. Además, es muy lento. Los archivos Kinemage pueden verse con King

-   file\_name: el nombre del archivo en el que se escribe el archivo kinemage
-   grid\_name: el nombre de la rejilla en el gestor de puntuación que se va a generar
-   low\_color: 3 números decimales separados por comas que describen el color del valor mínimo de la rejilla. Los números deben estar entre 0.0 y 1.0 y representan rojo, verde y azul. Por ejemplo, un valor de "1.0,0.0,0.0" será rojo.
-   high\_color: 3 números decimales separados por comas que describen el color del valor mínimo de la rejilla. Los colores de los puntos de la rejilla formarán un gradiente suave entre low\_color y high\_color.
-   stride: el «paso» de la rejilla. Si stride es 1, se generará cada punto de la rejilla. Si stride es 5, se generará uno de cada 5 puntos de la rejilla.


##Véase también

* [[TransformMover]]: usa rejillas de puntuación
* [[I want to do x]]: guía para elegir un mover
