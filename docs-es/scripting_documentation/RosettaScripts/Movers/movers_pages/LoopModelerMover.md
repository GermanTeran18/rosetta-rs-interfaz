# LoopModeler
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## LoopModeler

LoopModeler realiza una simulación completa de modelado de loops, incluidos los 
pasos de construcción, centroide y todos los átomos descritos arriba. Cada uno de estos pasos puede 
habilitarse, deshabilitarse y configurarse de otras formas. Por defecto, no hace falta 
especificar nada y se realizará una simulación estándar de modelado de loops.

Para el paso de construcción del loop, el algoritmo predeterminado hace 10K intentos de crear 
una cadena principal cerrada inicial mediante cierre cinemático (KIC). Para ambos pasos de 
refinamiento, el algoritmo predeterminado usa un algoritmo de Monte Carlo con recocido simulado 
sin rampa de la función de puntuación (se puede habilitar la rampa de los términos rama y repulsivo). En modo centroide, hay 5 ciclos de recocido y, en cada uno, la 
temperatura baja de 2.0 a 1.0 a lo largo de 20 pasos multiplicados por la longitud del/de los loop(s) 
que se muestrea(n). Los movimientos de Monte Carlo son KIC seguido de minimización 
por gradiente. En modo de todos los átomos, hay 5 ciclos de recocido y, en cada uno, la 
temperatura baja de 1.5 a 0.5 a lo largo de 20 pasos multiplicados por la longitud del loop. 
Los movimientos de Monte Carlo son KIC seguido de reempaquetado de cadenas laterales (una vez cada 20 
movimientos) o de pruebas de rotámeros (en los demás casos), seguido de minimización por gradiente de los 
grados de libertad tanto de la cadena principal como de las cadenas laterales.

Ten en cuenta que LoopModeler es en realidad solo un envoltorio de los movers descritos en 
el resto de esta sección. Su función es proporcionar valores predeterminados razonables y 
facilitar la modificación de algunos de ellos sin afectar a otros. Si 
estás dispuesto a especificar manualmente los parámetros predeterminados, podrías ejecutar la 
misma simulación componiendo otros movers. Este enfoque sería más 
extenso, pero en cierto modo también sería más flexible.

```xml
<LoopModeler name="(&string)" config="('' &string)" loops_file="(&string)" fast="(no &bool)" 
scorefxn_cen="(&string)" scorefxn_fa="(&string)" task_operations="(&string)" auto_refine="(yes &bool)" loophash_perturb_sequence="(false &bool)" loophash_seqposes_no_mutate="('' &string)">

    <Loop start="(&int)" stop="(&int)" cut="(&int)" skip_rate="(0.0 &real)" rebuild="(no &bool)"/>

    <(Any LoopMover tags)/>...

    <Build skip="(no &bool)" (any LoopBuilder option or subtag)/>

    <Centroid skip="(no &bool)" (any LoopProtocol option or subtag)/>

    <Fullatom skip="(no &bool)" (any LoopProtocol option or subtag)/>

</LoopModeler>
```

Opciones:

* config: establece la configuración base que se usará. Las configuraciones base proporcionan
  valores predeterminados para cada parámetro de la simulación, pero en la práctica 
  difieren sobre todo en cómo configuran el movimiento local de la cadena principal que se usa en los pasos de 
  refinamiento. Por ahora, esta opción debe ser "kic", "kic_with_frags"
  o "loophash_kic". "kic" es el valor predeterminado y ejecuta el algoritmo tal como se 
  describió arriba. "kic_with_frags" es similar a "kic", pero usa fragmentos 
  en lugar de muestras de Ramachandran para hacer los movimientos de la cadena principal. "loophash_kic" usa loophash
  para encontrar un fragmento existente que pueda cerrar aproximadamente el hueco y usarlo
  como estimación inicial para el cierre cinemático. Si usas "kic_with_frags", también debes 
  especificar archivos de fragmentos en la línea de comandos con las opciones `-loops:frag_sizes` 
  y `-loops:frag_files`. Si usas "loophash_kic", también debes especificar
  la ruta a la base de datos de loophash con la opción de línea de comandos `-lh:db_path` y
  los tamaños de los fragmentos de loophash con la opción de línea de comandos `-lh:loopsizes`. Puedes
  usar varios tamaños de fragmentos de loophash, pero el tamaño mínimo es 6 y el máximo
  es `2 + (longitud del loop que se va a modelar)`.

* loops_file: la ruta a un archivo de loops que especifica qué regiones de la cadena principal se 
  modelan. Ten en cuenta que esta opción se ignorará silenciosamente si se indican una o más subetiquetas
  Loop. Puede que haga falta indicar los puntos de corte en el archivo de loops o en las subetiquetas de loop para la inicialización, 
  pero se sobrescribirán durante la simulación.

* fast: si se habilita, la simulación usará un número 
  muy reducido de ciclos. Está pensada solo para depurar.

* scorefxn_cen: la función de puntuación que se usa en el paso de refinamiento centroide.

* scorefxn_fa: la función de puntuación que se usa en el paso de refinamiento con todos los átomos.

* task_operations: la(s) operación(es) de tarea que se usan para el empaquetado de cadenas laterales en el 
  paso de refinamiento con todos los átomos. Por defecto, se empaquetarán todos los residuos situados a menos de 10A del loop. 
  Si especificas tus propias operaciones de tarea, solo se empaquetarán o diseñarán los residuos 
  que especifiques, por lo que eres responsable de elegir una capa de 
  empaquetado razonable.

* auto_refine: por defecto, tanto el paso centroide como el de todos los átomos ejecutan automáticamente 
  un movimiento de refinamiento después de cada movimiento de la cadena principal. En modo centroide, el 
  movimiento de refinamiento es solo minimización por gradiente. En modo de todos los átomos, el 
  movimiento de refinamiento es reempaquetado de cadenas laterales/pruebas de rotámeros seguido de minimización 
  por gradiente. Estos movimientos de refinamiento automáticos suelen ser prácticos, 
  porque te permiten cambiar el movimiento de muestreo real (p. ej., KIC, CCD, 
  backrub, etc.) sin tener que preocuparte por lo que el modelado de loops hace normalmente 
  entre bastidores. Pero si quieres especificar manualmente tus propios movimientos de 
  refinamiento, tienes que deshabilitar auto_refine. Ten en cuenta también que esta 
  opción puede especificarse para todo el LoopModeler o individualmente en 
  las subetiquetas Centroid o Fullatom.

* loophash_perturb_sequence: si se pone en true, la secuencia del fragmento de
  loophash sustituirá la secuencia del loop.

* loophash_seqposes_no_mutate: posiciones de la secuencia que LoopHashKIC no debe mutar. 

Subetiquetas:

* Loop: especifica un loop que se modelará. Esta etiqueta puede especificarse varias veces para 
  muestrear varios loops. La tasa de omisión (skip rate) controla con qué frecuencia se 
  omite ese loop al elegir un loop al azar para muestrear. La opción rebuild controla 
  si el paso de construcción se omite o no para ese loop. Son los mismos 
  campos que pueden especificarse en un archivo de loops.

* Cualquier LoopMover: las subetiquetas de LoopMover dadas dentro de una etiqueta LoopModeler controlan los 
  movimientos locales de Monte Carlo de la cadena principal que se usan en las etapas de refinamiento centroide y de todos los átomos. 
  Por ejemplo, esto podría usarse para utilizar backrub en lugar de KIC en una 
  simulación de modelado de loops por lo demás predeterminada. La definición técnica de un 
  LoopMover es cualquier cosa en C++ que herede de LoopMover, pero la definición práctica 
  es cualquier Mover descrito en esta página. Puedes especificar etiquetas de LoopMover 
  antes, después y/o dentro de las etiquetas Centroid y Fullatom. Si 
  especificas más de un LoopMover, se ejecutarán en el orden indicado.  
  Si especificas un LoopMover dentro de las etiquetas Centroid o Fullatom, solo se 
  aplicará a ese modo.

* Build: configura el paso de construcción. Si "skip" está habilitado, ninguno de los loops 
  se reconstruirá. También puedes proporcionar a esta etiqueta cualquier opción o subetiqueta 
  que LoopBuilder entienda.

* Centroid: configura el paso de refinamiento centroide. Si "skip" está habilitado, este 
  paso se omitirá. También puedes proporcionar a esta etiqueta cualquier opción o 
  subetiqueta que LoopProtocol entienda. Esto incluye opciones para 
  controlar cuántos movimientos se hacen y cómo debe funcionar el recocido.

* Fullatom: configura el paso de refinamiento con todos los átomos. Si "skip" está habilitado, este 
  paso se omitirá. También puedes proporcionar a esta etiqueta cualquier opción o 
  subetiqueta que LoopProtocol entienda. Esto incluye opciones para 
  controlar cuántos movimientos se hacen y cómo debe funcionar el recocido.

Ejemplos:

Ejecutar el algoritmo estándar de modelado de loops descrito al inicio de esta sección:

```xml
<LoopModeler name="modeler"/>
```

Usar una biblioteca de fragmentos para muestrear conformaciones del loop:

```xml
<LoopModeler name="modeler" config="kic_with_frags"/>
```

Usar loop hash para muestrear conformaciones del loop y también la secuencia del loop:

```xml
<LoopModeler name="modeler" config="loophash_kic" loophash_perturb_sequence="true" loophash_seqposes_no_mutate="17,32,69" />
```

Ejecutar una simulación de prueba rápida con un número muy reducido de iteraciones:

```xml
<LoopModeler name="modeler" fast="yes"/>
```

Generar un conjunto de cadenas principales omitiendo el paso inicial de construcción:

```xml
<LoopModeler name="modeler">
    <Build skip="yes"/>
</LoopModeler>
```

Advertencias:

* LoopModeler solo puede modelar cadenas principales canónicas de proteínas. Los polímeros 
  no canónicos y los ligandos pueden estar presentes en la Pose; simplemente no pueden formar parte de 
  las regiones que se modelan.

* LoopModeler ignora el [[fold tree|foldtree-overview]] de la Pose de entrada y crea el suyo propio según 
  las necesidades de los movimientos de la cadena principal que se van a realizar. El fold tree 
  original se restaura justo antes de que LoopModeler termine.


##Véase también

* [[RosettaScriptsLoopModeling]]
* [[Algoritmos de modelado de loops|loopmodel-algorithms]]
* [[Aplicación loopmodel|loopmodel]]
* [[Formato de archivo de loops|loops-file]]
* [[Formato de archivo de fragmentos|fragment-file]]
* [[LoopBuilderMover]]
* [[LoopCreationMover]]
* [[LoopFinderMover]]
* [[LoopLengthChangeMover]]
* [[LoopModelerMover]]
* [[LoopMoverFromCommandLineMover]]
* [[LoopProtocolMover]]
* [[LoopRemodelMover]]
