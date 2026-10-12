# NormalModeRelax
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## NormalModeRelax

NormalModeRelax relaja una estructura siguiendo las direcciones de coordenadas derivadas del Modelo de Red Anisotrópica (ANM). Funciona así: a) genera coordenadas extrapoladas, b) aplica restricciones de coordenadas a esas coordenadas y c) ejecuta una minimización o FastRelax. La implementación actual prueba varios modos normales y devuelve el que tiene mejor puntuación. 

```xml
<NormalModeRelax name="&string"
       cartesian="(true &bool)"
       centroid="(true &false)"
       scorefxn="('' &string)"
       nmodes="(5 &Size)"
       mix_modes="(false &bool)"
       pertscale="(1.0 &Real)"
       randomselect="(false &bool)"
       relaxmode="('min' &string, see below for options)"
       outsilent="('' &string)"
       nsample="(nmodes &Size)"
       cartesian_minimize="(false &bool)" />
```

-   cartesian: usa el modelo normal cartesiano, que se recomienda frente al modo normal torsional 
-   centroid: usa la descripción centroide en el Mover. En este caso no se permite relaxmode = "relax".  
-   scorefxn: función de puntuación para relajar los Poses y elegir entre varias soluciones. Para el modo centroide, stage4
-   nmodes: cuántos modos normales se prueban.
-   mix\_modes: si se usa una mezcla de modos.
-   pertscale: cuánto se perturba la cadena principal, en Å. 
-   randomselect: elige al azar entre las estructuras muestreadas en lugar de tomar la de mejor puntuación.
-   relaxmode: la forma de relajar la estructura. "relax" llama a FastRelax y "min" al minimizador.  
-   cartesian\_minimize: usa minimización cartesiana para el relax o la minimización.
-   nsample: cuántas estructuras se prueban. Solo funciona cuando mix_modes = true; de lo contrario probará 2*nmodes.
-   outsilent: especifica el nombre del silent file de salida donde se guardan todas las estructuras muestreadas. Por defecto el Mover no genera ningún silent file. 

Este mover también puede recibir un MoveMap opcional (consulta la documentación de [[FastRelax|FastRelaxMover]] para más detalles) para definir el subconjunto de residuos al que se debe aplicar. Definir el MoveMap será útil para controlar el comportamiento de las heteromoléculas durante la etapa de relax o de minimización. Si no hay MoveMap, el mover se aplica a todo el Pose.

Consulta:
https://en.wikipedia.org/wiki/Anisotropic_Network_Model
Anisotropy of fluctuation dynamics of proteins with an elastic network model, A.R. Atilgan et al., Biophys. J. 80, 505 (2001)


