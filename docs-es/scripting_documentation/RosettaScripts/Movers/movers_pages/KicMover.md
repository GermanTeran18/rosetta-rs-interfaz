# KicMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## KicMover

Genera nuevas conformaciones de la cadena principal para el loop que se está muestreando. Las conformaciones 
se generan con el algoritmo de cierre cinemático (KIC). La idea detrás de KIC 
es que, cada vez que se genera una nueva conformación, todas las torsiones salvo 6 
pueden elegirse como el usuario quiera, p. ej., del espacio de Ramachandran (la elección más 
común), de una biblioteca de fragmentos, según algún algoritmo personalizado, 
etc. Las 6 torsiones restantes se resuelven analíticamente para asegurar que la 
cadena principal permanezca cerrada y que todas las longitudes y ángulos de enlace mantengan valores 
ideales. KIC es un algoritmo muy general, bueno para construir loops desde 
cero, modelar grandes cambios conformacionales, modelar pequeños cambios 
conformacionales y generar conjuntos de cadenas principales.

```xml
<KicMover name="(&string)" loop_file="(&string)"/>
```

Por ahora KicMover no es realmente personalizable, pero espero cambiar 
esto en un futuro no muy lejano (fecha actual: noviembre de 2014). En particular, quiero 
añadir una forma general de especificar distintos algoritmos para perturbar las torsiones, 
elegir los residuos pivote y filtrar las soluciones. Mientras tanto, 
este mover es bastante estático.

Opciones:

* loop_file: consulta LoopModeler.

Subetiquetas:

* Loop: consulta LoopModeler.

Advertencias:

* Consulta LoopModeler.

Referencias:

* Mandell DJ, Coutsias EA, Kortemme T. (2009). Sub-angstrom accuracy in protein 
  loop reconstruction by robotics-inspired conformational sampling. Nature 
  Methods 6(8):551-2.

* Coutsias EA, Seok C, Wester MJ, Dill KA. (2005). Resultants and loop closure. 
  International Journal of Quantum Chemistry . 106(1), 176–189.

##Véase también

* [[GeneralizedKICMover]]: versión robusta para cadenas principales que no son de proteínas
* [[RosettaScriptsLoopModeling]]
* [[Loops file]]: formato de archivo para especificar loops en el modelado de loops
* [[Algoritmos de modelado de loops|loopmodel-algorithms]]
* [[Structure prediction applications]]: lista de aplicaciones de línea de comandos para la predicción de estructuras, incluido el modelado de loops
* [[I want to do x]]: guía para elegir un mover