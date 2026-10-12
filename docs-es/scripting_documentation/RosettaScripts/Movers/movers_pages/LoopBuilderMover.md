# LoopBuilder
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## LoopBuilder

LoopBuilder construye los átomos de la cadena principal en las regiones de loop donde faltan. Sin embargo, de algún modo deben estar en el PDB original: ¡este mover NO crea los átomos ni los residuos en sí! 
Las cadenas principales creadas por LoopBuilder tendrán longitudes de enlace ideales, ángulos de enlace 
ideales y torsiones elegidas de una distribución de Ramachandran. Además, no deberían 
chocar demasiado con la proteína circundante. Aparte de eso, estas cadenas 
principales no están optimizadas en absoluto. Pero están listas para ser optimizadas por 
otros movers. Internamente, LoopBuilder usa KIC para construir las cadenas principales.  

Ten en cuenta que LoopModeler llama a LoopBuilder, y que es más habitual usar 
LoopModeler que usar LoopBuilder directamente.

```xml
<LoopBuilder name="(&string)" max_attempts="(10000 &int)" loop_file="(&string)">

    <Loop start="(&int)" stop="(&int)" cut="(&int)" skip_rate="(0.0 &real)" rebuild="(no &bool)"/>

</LoopBuilder>

```

Opciones:

* max_attempts: construir una cadena principal puede requerir muchos intentos, porque en cada 
  intento KIC puede no encontrar una solución o encontrar una solución que choque
  con la proteína circundante. Dicho esto, el número predeterminado de intentos es 
  dos o tres órdenes de magnitud mayor de lo que normalmente se necesita, así que no se me 
  ocurre ninguna situación en la que tengas que cambiarlo.

* [[loop_file|loops-file]]: consulta [[LoopModeler|LoopModelerMover]].

Subetiquetas:

* Loop: consulta [[LoopModeler|LoopModelerMover]].

Advertencias:

* Consulta LoopModeler.

##Véase también

* [[RosettaScriptsLoopModeling]]
* [[Aplicación loopmodel|loopmodel]]
* [[Formato de archivo de loops|loops-file]]
* [[LoopBuilderMover]]
* [[LoopCreationMover]]
* [[LoopFinderMover]]
* [[LoopLengthChangeMover]]
* [[LoopModelerMover]]
* [[LoopMoverFromCommandLineMover]]
* [[LoopProtocolMover]]
* [[LoopRemodelMover]]
