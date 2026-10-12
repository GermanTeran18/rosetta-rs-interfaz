# LoopProtocol
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## LoopProtocol

LoopProtocol optimiza una región de la cadena principal de la proteína mediante una simulación 
de Monte Carlo con recocido simulado. La simulación se compone de tres bucles (hablo de bucles en el 
sentido algorítmico, no en el sentido de proteína). El bucle más externo es el bucle "sfxn", o de 
«función de puntuación». En este bucle se aumentan progresivamente los términos repulsivo y rama de 
la función de puntuación, si esa rampa está activada. Dentro del bucle sfxn está el bucle "temp", o de 
«temperatura». En este bucle la temperatura se reduce gradualmente. Como el bucle temp está dentro del 
bucle sfxn, la temperatura vuelve a su valor más alto y empieza a descender de nuevo al comienzo de 
cada iteración de sfxn. Dentro del bucle temp está el bucle "mover". En este bucle se hacen los 
movimientos de Monte Carlo, pero nada varía de forma progresiva. Puedes indicar qué tipo de movimientos 
de Monte Carlo usar mediante subetiquetas.

Cualquier LoopMover puede usarse como subetiqueta, aunque normalmente tiene más sentido usar movers 
sencillos como KicMover o RepackingRefiner que movers complicados como LoopModeler o LoopProtocol. 
Los movers se invocan en el orden en que se especifican. Además, después del mover especificado puede 
invocarse automáticamente un conjunto predeterminado de movers. Estos movers predeterminados se llaman 
«refiners». Su función es permitirte cambiar el algoritmo de muestreo sin tener que preocuparte por los 
pasos de refinamiento que normalmente ocurren en segundo plano, aunque si es necesario pueden 
desactivarse.

Ten en cuenta que LoopModeler llama a LoopProtocol dos veces, una en modo centroide y otra en modo 
todos los átomos (fullatom). Es más habitual usar LoopModeler que usar LoopProtocol directamente.

```xml
<LoopProtocol sfxn_cycles="(1 &int)" temp_cycles="(1 &int ['x'])" mover_cycles="(1 &int)"
ramp_rep="(no &bool)" ramp_rama="(no &bool)" ramp_temp="(yes &bool)" initial_temp="(1.5 &real)" final_temp="(0.5 &real)"
loop_file="(&string)" scorefxn="(&string)" auto_refine="(yes &bool)" fast="(no &bool)">

    <Loop start="(&int)" stop="(&int)" cut="(&int)" skip_rate="(0.0 &real)" rebuild="(no &bool)"/>

    <AcceptanceCheck name="(loop_mover &string)"/>

    <(Any LoopMover tags)/>...

</LoopProtocol>
```

Opciones:

* sfxn_cycles: el número de iteraciones del bucle sfxn.

* temp_cycles: el número de iteraciones del bucle temp. Este número 
  puede ir seguido opcionalmente de una "x", en cuyo caso el número de iteraciones 
  será el número dado multiplicado por la longitud del loop que se está muestreando. Así, si 
  estuvieras muestreando un loop de 12 residuos, podrías indicar temp_cycles="10x" para 
  iterar el bucle de temperatura 120 veces.

* mover_cycles: el número de iteraciones del bucle mover.

* ramp_rep: si se aumenta o no progresivamente el término repulsivo de la función de puntuación 
  durante el bucle sfxn. Si está activado, el peso repulsivo empezará cerca de cero 
  y terminará en el valor que tuviera en la función de puntuación original.

* ramp_rama: si se aumenta o no progresivamente el término de Ramachandran de la función de puntuación 
  durante el bucle sfxn. Si está activado, el peso de Ramachandran empezará cerca de 
  cero y terminará en el valor que tuviera en la función de puntuación original.

* ramp_temp: si se varía o no progresivamente la temperatura durante el bucle temp. Los 
  valores inicial y final se controlan con las opciones initial_temp y final_temp.

* initial_temp: la temperatura inicial. Se ignora si la variación progresiva de la temperatura 
  está desactivada.

* final_temp: la temperatura final. Se ignora si la variación progresiva de la temperatura 
  está desactivada.

* loop_file: consulta LoopModeler
 
* scorefxn: el nombre de la función de puntuación que se usará en la simulación de Monte Carlo. 
  Es obligatorio al usar LoopProtocol por sí solo, pero 
  opcional en el contexto de las subetiquetas Centroid y Fullatom de LoopModeler.

* auto_refine: si está activado, los refiners integrados se invocarán automáticamente 
  después de cualquier mover indicado por el usuario. Normalmente esto es útil, porque 
  facilita cambiar el movimiento de muestreo (p. ej., KIC, CCD, backrub, etc.) 
  sin tener que preocuparte por lo que normalmente ocurre en segundo plano. 
  Pero si quieres indicar manualmente tus propios movimientos de refinamiento, 
  tienes que desactivar auto_refine.

* fast: si está activado, la simulación usará un número muy reducido de 
  ciclos. Solo está pensado para depuración.

Subetiquetas:

* Loop: consulta LoopModeler

* AcceptanceCheck: añade una evaluación de la función de puntuación de Monte Carlo y una comprobación 
  de aceptación entre cualquiera de tus movers. Siempre se hace una comprobación de aceptación después de 
  que se hayan invocado todos tus movers (y los refiners integrados), pero 
  esto te permite añadir comprobaciones de aceptación adicionales entre tus movimientos.

* Cualquier LoopMover: controla cómo se muestrea la cadena principal en la simulación de 
  Monte Carlo del loop. Por ejemplo, podrías querer usar backrub en lugar de KIC (el valor por defecto) 
  para ciertas aplicaciones. La definición técnica de un LoopMover es cualquier cosa en C++ que 
  herede de LoopMover, pero la definición práctica es cualquier Mover descrito en esta página. Si indicas más de un 
  LoopMover, se ejecutarán en el orden dado.

Advertencias:

* Consulta LoopModeler.


##Véase también

* [[RosettaScriptsLoopModeling]]
* [[Aplicación loopmodel|loopmodel]]
* [[Formato de archivo de loops|loops-file]]
* [[Formato de archivo de fragmentos|fragment-file]]
* [[Documentación de Resource Manager|ResourceManager]]
* [[LoopBuilderMover]]
* [[LoopCreationMover]]
* [[LoopFinderMover]]
* [[LoopLengthChangeMover]]
* [[LoopModelerMover]]
* [[LoopMoverFromCommandLineMover]]
* [[LoopProtocolMover]]
* [[LoopRemodelMover]]
