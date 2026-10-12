Algunas de las clases y funciones de Rosetta son casi duplicadas por razones históricas o por diferencias sutiles en los problemas que están diseñadas para resolver. Esta página explica por qué existen estas clases casi duplicadas y para qué problemas son adecuadas las clases y funciones en cuestión.

## Sospechosos por investigar
* Filtros de átomos enterrados sin satisfacer (Scott Boyken es la mejor persona de contacto)
* mecanismos de detección de interfaces

## Movers

### Modelado de loops

|Nombre del mover | Razón de existir | Problemas adecuados que resuelve|
|---|---|---|
|[[LoopmodelWrapper | scripting_documentation/RosettaScripts/xsd/mover_LoopmodelWrapper_type
]] | Contenedor (wrapper) del código heredado de modelado de loops para la [[aplicación de modelado de loops | loopmodel]], de modo que se pueda usar a través de la interfaz de RosettaScripts| Usa este mover cuando quieras reproducir el comportamiento de la [[aplicación de modelado de loops | loopmodel]]. Como el código de este mover va a quedar obsoleto, se recomienda usar [[LoopModeler|LoopModelerMover]]|
|[[LoopModeler|LoopModelerMover]] | Una versión refactorizada del código heredado de modelado de loops. Debe usarse a través de la interfaz de RosettaScripts. | Para problemas de modelado de loops de proteínas, usa este mover. |
|[[Cierre cinemático generalizado (GeneralizedKIC)|GeneralizedKICMover]] | Un protocolo generalizado para modelar loops en cualquier polímero | Usa este mover cuando trabajes con polímeros cuyas cadenas principales sean distintas de las de las proteínas L|


## Filtros