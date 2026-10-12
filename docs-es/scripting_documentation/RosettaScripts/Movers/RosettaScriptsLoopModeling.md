# Modelado de loops
## Modelado de loops

El objetivo del modelado de loops es predecir la conformación de un tramo 
relativamente corto de cadena principal y cadenas laterales de una proteína.  Por ejemplo, no es raro 
que a las estructuras cristalinas les falte densidad en algunas regiones.  El modelado de loops 
se puede usar para predecir estructuras para esas regiones.  Como otro ejemplo, los modelos 
por homología a menudo tienen que tener en cuenta inserciones o deleciones cortas.  El modelado de loops 
se puede usar para predecir cómo afectan estos cambios de secuencia a la estructura.

El modelado de loops en Rosetta es muy configurable, pero el algoritmo básico funciona 
así:

* Entradas:
 
  Las entradas son una estructura de proteína y un conjunto de índices que especifican dónde empiezan y terminan 
  una o más regiones que se van a modelar (es decir, el loop o los loops).

* Paso 1: construcción inicial
 
  El algoritmo empieza construyendo una cadena principal inicial para cada loop que se muestrea.  Esta cadena principal es solo un punto de partida para el resto del 
  algoritmo, así que solo es realista en el sentido de tener longitudes de enlace 
  razonables y de no chocar completamente con nada.  Ten en cuenta que, si omites 
  este paso, puedes usar el algoritmo de modelado de loops para generar conjuntos.

* Paso 2: refinamiento centroide

  El algoritmo continúa refinando la conformación del loop en el contexto de 
  la función de puntuación centroide.  La función de puntuación centroide representa los 
  átomos de la cadena principal con todo detalle, pero abstrae las cadenas laterales en 
  esferas.  Esto crea un paisaje de energía más suave que es más fácil de explorar 
  de forma amplia.  El paisaje se muestrea con "movimientos locales de la cadena principal" de Monte Carlo, 
  es decir, movimientos que perturban la cadena principal dentro de la región que se muestrea, pero no 
  fuera de ella.
  
* Paso 3: refinamiento de todos los átomos

  El algoritmo termina refinando la conformación del loop en el contexto de 
  la función de puntuación de todos los átomos.  Conceptualmente es muy similar al 
  refinamiento centroide descrito arriba, salvo que ahora todos los átomos se 
  representan con todo detalle y se emplean tanto movimientos de Monte Carlo de las cadenas laterales como de la cadena principal local.

* Salidas:

  Cada simulación de modelado de loops tarda unos 30 minutos y produce una estructura 
  modelo como salida.  Normalmente, para predecir una estructura para un solo loop, 
  generarías al menos 500 de esos modelos y te quedarías con el de menor 
  energía.  También podrías calcular un RMSD de cada modelo respecto al 
  de menor puntuación y buscar embudos en el espacio puntuación frente a RMSD.

## Movers relevantes

* [[LoopModeler|LoopModelerMover]]
* [[LoopBuilder|LoopBuilderMover]]
* [[LoopProtocol|LoopProtocolMover]]
* [[KicMover]]
* [[RepackingRefiner|RepackingRefinerMover]]
* [[RotamerTrialsRefiner|RotamerTrialsRefinerMover]]
* [[MinimizationRefiner|MinimizationRefinerMover]]
* [[PrepareForCentroid|PrepareForCentroidMover]]
* [[PrepareForFullatom|PrepareForFullatomMover]]

##Véase también

* [[Algoritmos de modelado de loops|loopmodel-algorithms]]
* [[Aplicación loopmodel|loopmodel]]
* [[Structure prediction applications]]: una lista de aplicaciones de línea de comandos para predicción de estructuras, incluido el modelado de loops
* [[Formato del archivo de loops|loops-file]]
* [[Formato del archivo de fragmentos|fragment-file]]
