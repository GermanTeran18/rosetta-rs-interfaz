#Diccionario del SEWING heredado
* **AssemblyScore**: La función de puntuación que se usa al generar y filtrar ensamblajes de SEWING. Se calcula como ClashScore + 10*InterModelMotifScore + InterfaceMotifScore (0 para monómeros) + MotifScore

* **ClashScore**

* **ciclo** (cycle): Durante el ensamblaje, un ciclo solo se cuenta cuando hay una aceptación de Monte Carlo (no solo un intento). Por ejemplo, si el número de ciclos se fija en 50,000, el número real de intentos de Monte Carlo sería incluso mayor.

* **archivo de aristas** (edge file): Ver **archivo de puntuaciones**

* **InterfaceMotifScore**:  Un tipo de MotifScore que se usa (normalmente en el AppendAssemblyMover) para puntuar qué tan bien se empaqueta la proteína diseñada contra un PDB asociado proporcionado.

* **InterModelMotifScore**: Un tipo de MotifScore, pero que se calcula solo entre modelos no adyacentes. Su propósito es promover la formación de proteínas más globulares. Si no se considera el InterModelMotifScore, una lámina plana de hélices que contenga solo interacciones nativas obtiene una puntuación muy favorable.

* **segmentos conectores** (linker segments): Segmentos que el Hasher no puntúa y que no se superponen con otros segmentos. Por ejemplo, una subestructura hélice-loop-hélice contiene un segmento conector (el loop). Cuando hay 5 elementos de estructura secundaria en cada modelo, las 3 estructuras secundarias intermedias son «segmentos conectores».

* **modelo** (nodo/subestructura): Se pueden conectar entre sí mediante sus aristas a través de sus nodos. Por ejemplo, un modelo smotif tiene 2 nodos (extremo N/extremo C) y 3 estructuras secundarias. Es una colección de segmentos. En general, un modelo está formado por 2-5 segmentos. Actualmente, en el SEWING continuo, 3 piezas de estructura secundaria (como HLH o HLE) constituyen un modelo (está en desarrollo activo el uso de 5 piezas de estructura secundaria como modelo para el SEWING continuo). 

* **archivo de modelos** (model file): Archivo de texto que contiene los modelos o subestructuras que se usarán en el ensamblaje de SEWING. Consulta [[SEWING model files]] para ver el formato.

* **ModelTrimmer**: Aplicación que se usa para filtrar modelos de SEWING por tipo de estructura secundaria y longitud de segmento. Consulta la página [[ModelTrimmer]] para más detalles.

* **MotifScore**: Puntuación de diseñabilidad. Básicamente muestra qué tan bien se empaquetan entre sí las partes hidrofóbicas de las estructuras secundarias. Lo creó Will Sheffler, del laboratorio Baker.

* **nodo** (node): El término «nodo» en SEWING puede referirse a dos cosas:
  - A veces, un modelo o subestructura se denomina «nodo». Técnicamente es un nombre incorrecto, porque un modelo es en realidad un clúster de nodos conectados.
  - Los nodos reales del SewGraph son **segmentos** formados por un único elemento de estructura secundaria. No todos los nodos se pueden fusionar con otro nodo a través de su arista. Por ejemplo, un modelo smotif tiene 3 nodos (estructuras secundarias), pero solo dos de ellos (extremo N/extremo C) se pueden fusionar con otros nodos. Un modelo basado en 5 estructuras secundarias tiene 5 nodos (estructuras secundarias), pero solo dos de ellos (extremo N/extremo C) se pueden fusionar con otros nodos.

* **archivo de puntuaciones** (score file; archivo de aristas): Nombre actual de los archivos que contienen información de aristas (no tiene nada que ver con las puntuaciones fa/centroid habituales de Rosetta)
``` 
<example of score file>
4 94 17 3 43 9 29
4 67 13 3 67 13 32
...

<explanation of score file, line 1>
4 and 3 are model_ids (node ids).
94 and 43 are the basis residue numbers of sharing (chimeric) segment between two models (of course, this resnum may happen to be same between two combining models).
17 and 9 are ids of the sharing (chimeric) segment between two models (of course, this 'segment id' may happen to be same between two combining models).
29 is the average_segment_score (= sum/segment_matches.size())
```

* **estructura secundaria** (secondary structure): Hélice, loop o hebra beta (H, L, E)

* **segmento** (segment): Un único elemento de estructura secundaria. Los segmentos se identifican por su ID de modelo y su ID de segmento (ambos enteros) y guardan información sobre su estructura secundaria y sobre si se puede construir a partir de ellos. 

* **sewing_hasher**: Aplicación que se usa para generar los archivos de entrada de SEWING. Consulta la página [[SEWING Hasher application]] para más detalles.

* **subestructura** (substructure): Ver **modelo**

##Véase también
* [[página principal de SEWING|SEWING]]
* [[Glossary]]
