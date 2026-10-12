# CartesianMD
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## CartesianMD

CartesianMD ejecuta una simulación de dinámica molecular en Rosetta con una función de energía definida por el usuario. Realiza una simulación NVT (volumen y temperatura constantes) con el termostato de Berendsen. El integrador usa el algoritmo Velocity Verlet. Se recomienda encarecidamente usar el mover con versiones de Rosetta posteriores a febrero de 2016; las versiones anteriores tenían ciertos problemas con este mover.

```xml
<CartesianMD name="&string"
       rattle="(true &false)"
       scorefxn="('' &string)"
       scorefxn_obj="('' &string)"
       nstep="(100 &Size)"
       temp="(300.0 &Real)"
       premin="(50 &Size)"
       postmin="(200 &Size)"
       report="(100 &Size)"
       report_scorecomp="(false &bool)"
       selectmode="('final' &string)"
       schfile="('' &string)" />
```

-   rattle: usa el algoritmo Rattle para restringir las posiciones de los hidrógenos. Esto fija automáticamente el paso de integración en 2 fs. En caso contrario, el paso de integración es 1 fs.
-   scorefxn: especifica la función de puntuación con la que se ejecuta la simulación de DM.
-   scorefxn\_obj: opcional; es idéntica a scorefxn salvo que se especifique otra. Especifica la función de puntuación que se usará como función objetivo para seleccionar una Pose de la trayectoria. Solo se usará cuando selectmode="minobj". 
-   nstep: número de pasos que se simulan. Con Rattle activado (valor predeterminado), cada paso es de 2 fs; por lo tanto, nstep=10000 equivale a 20 ps.
-   temp: temperatura de referencia para la simulación a temperatura constante. Valores recomendados: 150~200 K para talaris2014_cart y ~250 para beta_nov15_cart.
-   premin: pasos de minimización cartesiana antes de la simulación de DM
-   postmin: pasos de minimización cartesiana después de la simulación de DM
-   report: con qué frecuencia informa el mover del estado de la simulación en el registro.
-   report\_scorecomp: si se informa de los componentes de la puntuación en el registro.
-   selectmode: cómo seleccionar una sola Pose de la trayectoria. "final" para tomar la Pose final, "minobj" para tomar la Pose con la menor función objetivo (según scorefxn\_obj). 
-   schfile: usa un archivo de programa (schedule) definido por el usuario. Esto anula cualquier otra opción. 
Sintaxis: "sch [temperature] [nsteps]" para ejecutar la simulación, o "repack" para reempaquetar las cadenas laterales.
Un ejemplo de archivo de programa para ejecutar un recocido simulado:
```
sch 300 10000 
sch 250 10000 
sch 200 10000 
sch 150 10000 
```

Este mover también puede recibir un MoveMap opcional (consulta la documentación de [[FastRelax|FastRelaxMover]] para más detalles) que defina el subconjunto de residuos al que se aplica. Si no hay MoveMap, el mover se aplica a toda la Pose.
