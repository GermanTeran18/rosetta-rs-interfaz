# iFAQ
## Preguntas poco frecuentes

Esta es una lista de algunas de las preguntas menos frecuentes sobre Rosetta.

En realidad es un cajón de sastre para pequeños fragmentos de documentación que (todavía) no han encontrado un lugar en otra parte.

Véase también:
* [[FAQ]]: preguntas frecuentes 
* [[Glossary]]: definiciones breves de términos relacionados con Rosetta.
* [[RosettaEncyclopedia]]: explicaciones más extensas de conceptos relacionados con Rosetta. 

[[_TOC_]]

#### ¿Qué es RosettaDesign?

RosettaDesign identifica secuencias de baja energía para cadenas principales de proteínas especificadas, y se ha usado anteriormente para estabilizar proteínas y crear nuevas estructuras de proteínas. Visita nuestro servidor de RosettaDesign: http://rosettadesign.med.unc.edu

#### ¿Qué es RosettaDock?

RosettaDock predice la estructura de un complejo proteína-proteína a partir de las estructuras individuales de los monómeros que lo componen. Consulta <http://rosie.rosettacommons.org/docking/> para ver el servidor actual.

#### ¿Qué es RosettaNMR?

RosettaNMR combina el método de predicción de estructuras de novo de Rosetta con datos experimentales limitados de RMN para predecir rápidamente la estructura de proteínas. Las restricciones de RMN de RDC y NOE se han usado con éxito en RosettaNMR para determinar pliegues globales.

#### ¿Qué es RosettaLigand?

RosettaLigand emplea los modos de todos los átomos de Rosetta para predecir las interacciones proteína-molécula pequeña.

#### ¿Dónde puedo encontrar createTemplate.pl?

Puedes encontrar un paquete opcional llamado BioTools en la página de descarga del software. El archivo createTemplate.pl está en este paquete.

#### ¿Cuál es el valor de la temperatura que se usa en las simulaciones de Rosetta?

Rosetta usa "REU" como unidad de energía. (Véase [[Units in Rosetta]].) Por lo tanto, la temperatura también está en unidades arbitrarias.  

#### No pude encontrar el archivo "pNNMAKE.gnu" que se usa al ejecutar make_fragments.pl para crear fragmentos.

pNNMAKE.gnu no es un archivo preexistente. Debes generarlo después de descargar el paquete rosetta_fragments. Tras entrar en el directorio rosetta_fragment/nnmake, escribe "make" para compilar y se generará el archivo pNNMAKE.

#### ¿Cómo puedo obtener las coordenadas de los fragmentos de mis bibliotecas de fragmentos?

Las coordenadas de todos los fragmentos están precalculadas en el archivo vall_cst_coord.dat.*. Los campos de este archivo son:

1 nombre del PDB de origen del fragmento 2 cadena de origen del fragmento 3 residuo de origen del fragmento 5-7 coordenadas de HN (x,y,z) 8-10 coordenadas de HA 11-21 coeficientes para evaluar restricciones de RDC 22-24 coordenadas de N 25-27 coordenadas de CA 28-30 coordenadas de CB 31-33 coordenadas de C 34-36 coordenadas de O

Todos los fragmentos de las bibliotecas de fragmentos se identifican por el nombre del PDB de origen, la cadena y los residuos, lo que permite extraer las coordenadas relevantes del archivo de datos vall_coord_cst.dat.*.


#### ¿Qué grafo de interacción debo usar?

Para ganar velocidad, el Packer usa un "grafo de interacción" (Interaction Graph) para guardar en caché las energías de interacción entre residuos. (Véase [[packing-options]] para las opciones de línea de comandos que controlan el packer.) Dependiendo del protocolo que uses, mantener este grafo de interacción puede consumir una cantidad considerable de tiempo y memoria. Por eso hay disponibles distintos grafos de interacción (IG).

* El grafo de interacción por defecto (el Pairwise Decomposable Interaction Graph) es bueno para aplicaciones generales de reempaquetado.
* Para diseño, el Linear Memory Interaction Graph (`-linmem_ig`) reduce tanto la memoria como el tiempo de ejecución respecto al grafo de interacción por defecto
* El Lazy Interaction Graph (`-lazy_ig`) es en todos los casos más rápido que el Linear Memory Interaction Graph, pero a costa de un mayor uso de memoria.
* El Double Lazy Interaction Graph (`-double_lazy_ig`) solo es útil para el diseño multiestado.

#### El annealer Multicool da puntuaciones más bajas, así que debe ser mejor para relax, ¿verdad?

No. El algoritmo FastRelax depende del comportamiento estocástico del packer para lograr un muestreo adecuado del espacio conformacional. El annealer Multicool (la opción `-multi_cool_annealer`) es demasiado convergente y no da suficiente variabilidad en los resultados para obtener buenos resultados de relax.
