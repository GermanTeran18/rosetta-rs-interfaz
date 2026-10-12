#Aplicación PeptiDerive

Metadatos
========

Autores: Nir London, Barak Raveh, Dana Movshovitz-Attias, Yuval Sadan, Orly Marcu, Ora Schueler-Furman

La documentación se actualizó por última vez el 19 de agosto de 2018, por Orly Marcu. Las preguntas sobre esta documentación deben dirigirse a Ora Furman: (oraf@ekmd.huji.ac.il).

Código y demostración
=============

La aplicación PeptiDerive se encuentra en `apps/public/analysis/PeptideDeriver.cc`. Usa JD2 para invocar la clase `PeptideDeriverFilter`, definida en `protocols/analysis/PeptideDeriverFilter.hh`.

Una prueba unitaria de esta aplicación está en `test/protocols/analysis/PeptideDeriverFilterTests.cxxtest.hh`.

PeptiDerive también está disponible como [[filtro de RosettaScripts|Filters RosettaScripts#PeptideDeriver]].

Referencias
==========

Trabajo original publicado como:

London N., Raveh B., Movshovitz-Attias D., Schueler-Furman O. (2010) "Can self-inhibitory peptides be derived from the interfaces of globular protein-protein interactions?", Proteins. V 78, pp 3140–9.

Artículo sobre el servidor basado en ROSIE:

Sedan Y., Marcu O., Lyskov S., Schueler-Furman O. (2016) "Peptiderive server: derive peptide inhibitors from protein–protein interactions", NAR V 44(Web Server issue), pp W536–W541.


Propósito
=======

PeptiDerive es una aplicación sencilla que deriva, a partir de una interfaz dada, el tramo lineal que aporta la mayor parte de la energía de unión (aproximada como la puntuación sobre la interfaz). En cierto sentido, es el análogo computacional de un micro-array de péptidos, ya que explora distintos péptidos posibles extraídos de una proteína en sus interacciones con sus compañeros. Este protocolo se ha ampliado para detectar y modelar péptidos cíclicos (cerrados mediante un puente disulfuro o un enlace peptídico entre sus extremos) que se pueden generar a partir de una interfaz dada.

Una ejecución previa de este protocolo en dos benchmarks muy confiables mostró que la fracción de interfaces que podrían inhibirse potencialmente con un péptido o un peptidomimético ronda el 50 % de las interacciones probadas. Otras simulaciones con FlexPepDock de algunos de los péptidos derivados indican que adoptan una conformación similar cuando se recortan y cuando están dentro de la proteína completa. Esto no considera realmente la entropía conformacional, solo evalúa la estabilidad local (London, Raveh, Movshovitz-Attias & Schueler-Furman (2010). Can self-inhibitory peptides be derived from the interfaces of globular protein-protein interactions? Proteins, 78:314. doi:10.1002/prot.22785).
Además, el análisis con PeptiDerive de un conjunto de estructuras de complejos resueltas, en las que también hay estructuras resueltas de moléculas pequeñas unidas a uno de los compañeros, indica que estas moléculas se dirigen a los mismos sitios que identifica este protocolo sencillo (las moléculas provienen de cribados in vitro, no de diseño de fármacos, por supuesto) (London, Raveh & Schueler-Furman (2013). Druggable protein–protein interactions—from hot spots to hot segments. Current Opinion in Chemical Biology. doi:10.1016/j.cbpa.2013.10.011)


Algoritmo
=========

PeptiDerive usa un protocolo sencillo para seleccionar y evaluar péptidos derivados de interfaces proteína-proteína. Dada la estructura del complejo de una interacción entre las proteínas A y B, se realiza una minimización corta de la estructura con la función de energía de Rosetta para eliminar choques locales sin cambiar la estructura de forma significativa. Luego, una ventana deslizante de aminoácidos, cuya longitud define el usuario (por ejemplo, una ventana de 10 aminoácidos), recorre la cadena de la proteína. Cada fragmento de la longitud indicada se extrae de su contexto proteico, se le añaden las cargas de los extremos y luego se estima la energía de interacción de este péptido con el otro compañero. El péptido que aporta la mejor energía de interacción se elige para representar esta interacción (el péptido puede estar en cualquiera de los dos compañeros proteicos).

Se obtiene una estimación aproximada de la energía de unión evaluando la energía de interfaz, definida como la energía de un péptido en complejo con la proteína compañera comparada con la energía del péptido y la proteína por separado. La energía de unión de un péptido derivado de la proteína A hacia la proteína receptora B se calcula como

*<center>&Delta;&Delta;G<sub>A<sub>pep</sub>B</sub> = &Delta;G<sub>A<sub>pep</sub>B</sub> - &Delta;G<sub>A<sub>pep</sub></sub> - &Delta;G<sub>B</sub></center>*

El péptido que aporta el mejor valor de *&Delta;&Delta;G<sub>A<sub>pep</sub>B</sub>* se elige para representar esta interacción. La contribución relativa de este péptido a la energía de unión total se obtiene comparando su energía de unión con la energía de unión estimada del complejo proteico completo,

*<center>&Delta;&Delta;G<sub>AB</sub> = &Delta;G<sub>AB</sub> - &Delta;G<sub>A</sub> - &Delta;G<sub>B</sub></center>*

*<center>contribución a la energía de unión &prop; &Delta;&Delta;G<sub>A<sub>pep</sub>B</sub> / &Delta;&Delta;G<sub>AB</sub></center>*

Esta estimación aproximada se usa para filtrar los péptidos inhibidores candidatos.

Para cada uno de los péptidos que contribuyen de forma significativa a la energía de unión (lo define el usuario; por defecto: más del 35 % de la puntuación de interfaz), se genera sobre la marcha un péptido cíclico, ya sea mediante la formación de un puente disulfuro o de un enlace peptídico. Si la distancia entre los residuos flanqueantes del péptido (los que están justo antes y después del segmento de interés) es razonable para formar un puente disulfuro (es decir, átomos C𝛽 a 3-5Å, o átomos C𝛂 a 4.5-6.5Å en el caso de glicinas) y la geometría de los dos residuos se ajusta a la de estructuras conocidas que forman disulfuros (evaluada mediante una puntuación de coincidencia con el potencial de disulfuros de Rosetta), el protocolo muta a continuación los residuos adyacentes al loop a cisteínas, forma un puente disulfuro, minimiza la cadena principal del péptido para formar un enlace disulfuro optimizado y vuelve a evaluar la ganancia de energía por la formación del enlace disulfuro y la energía de unión del nuevo péptido cíclico a su compañero. Solo se informan los péptidos con un cambio en la energía del enlace disulfuro de hasta 1 unidad de energía de Rosetta (REU) al ciclizarse (esta opción se puede modificar mediante la opción -max_dslf_energy). En paralelo, para cada péptido se calcula la distancia entre el átomo de nitrógeno del residuo N-terminal y el carbono del residuo C-terminal, y los péptidos con distancias N-C de hasta 5Å se conservan como candidatos para la ciclización cabeza-cola. La cadena principal del péptido ciclizado se minimiza y luego se vuelve a evaluar la energía de unión del nuevo péptido cíclico a su compañero. Estas perturbaciones las realiza el [[PeptideCyclizeMover|PeptideCyclizeMover]]. Los péptidos cíclicos se aceptan y se entregan en la salida solo si la energía de unión estimada del péptido cíclico es negativa.
 
Limitaciones
===========

* La puntuación de interfaz es una medida que no tiene en cuenta directamente la entropía conformacional de un péptido, que puede ser mayor que la entropía conformacional de un «segmento peptídico» dentro de un dominio globular; por eso, las constantes de unión efectivas de un péptido en ensayos de unión competitiva pueden ser menores de lo esperado.
* La puntuación de interfaz no tiene en cuenta un cambio conformacional entre los monómeros en el complejo unido y sus conformaciones en estado no unido; por eso, la energía de unión de todo el complejo PPI y la del péptido derivado
con sus compañeros proteicos pueden diferir algo (ya sea hacia abajo o hacia arriba), según la magnitud del cambio conformacional al unirse.
* La entrada del método es la estructura de un complejo; el desempeño puede ser peor con modelos de PPI que con estructuras cristalográficas resueltas.

Archivos de entrada
===========

El programa espera un archivo PDB con varias cadenas.

Para evitar problemas de análisis, asegúrate de que tu archivo PDB contenga solo registros `ATOM` y `TER`, es decir, que no incluya heteroátomos (HETATM) y que la columna de ocupación esté rellena (sin conformaciones dobles ni ocupación 0.00).

Para usar residuos fosforilados, asegúrate de que:

  * tengan el nombre correcto (es decir, `TYR`/`SER`/`THR` y no `PTR`/`SEP`)
  * las coordenadas del residuo modificado (así como los fosfatos) se incluyan como registros `ATOM` (y no `HETATM`)

A continuación tienes un ejemplo de cómo debería verse una fosfo-serina:

    ATOM   5776  N   SER B  10     -19.024  43.939 120.740  1.00  0.00
    ATOM   5777  CA  SER B  10     -20.442  43.615 120.653  1.00  0.00
    ATOM   5778  C   SER B  10     -20.869  42.699 121.792  1.00  0.00
    ATOM   5779  O   SER B  10     -20.125  41.804 122.194  1.00  0.00
    ATOM   5780  CB  SER B  10     -20.750  42.972 119.314  1.00  0.00
    ATOM   5781  OG  SER B  10     -22.089  42.569 119.219  1.00  0.00
    ATOM   5782  P   SER B  10     -22.461  41.858 117.817  1.00  0.00
    ATOM   5783  O1P SER B  10     -24.008  41.465 117.873  1.00  0.00
    ATOM   5784  O2P SER B  10     -21.536  40.564 117.675  1.00  0.00
    ATOM   5785  O3P SER B  10     -22.170  42.912 116.653  1.00  0.00


Opciones
=======

Nota: esta sección se añadió por comodidad, pero puede estar desactualizada. Lo mejor es consultar también la [[lista completa de opciones|full options list]], para asegurarte de que estás viendo el listado de opciones más actualizado.

| Nombre de la opción | Tipo           | Descripción                                                  | Valor por defecto |
|---------------------|----------------|--------------------------------------------------------------|---------|
| `pep_lengths`       | lista de números | Longitud(es) de los péptidos derivados                       | 10      |
| `skip_zero_isc`     | true/false     | Acelera la derivación al omitir los péptidos con puntuación de interfaz 0 | true |
| `dump_peptide_pose` | true/false     | Escribe el Pose con el péptido recortado (el mejor para cada par de cadenas) | false |
| `dump_cyclic_poses` | true/false     | Escribe cada Pose de péptido cíclico (los que se modelan; esto lo determina -optimize_cyclic_threshold) | false |
| `dump_prepared_pose` | true/false    | Escribe cada Pose receptor-compañero tal como lo ve PeptiDerive, es decir, tras la preparación (minimización y detección de disulfuros) | false |
| `dump_report_file`  | true/false     | Envía la salida de PeptideDeriver a un archivo (<input_name>.peptiderive.txt) | true |
| `restrict_receptors_to_chains` | lista de caracteres | Usa como receptores solo las cadenas indicadas aquí. Si está vacía, se consideran todas las cadenas. | vacío  |
| `restrict_partners_to_chains` | lista de caracteres | Usa como compañeros solo las cadenas indicadas aquí. Si está vacía, se consideran todas las cadenas. Para cada par receptor-compañero, se deriva un péptido del compañero. | vacío |
| `do_minimize` | true/false | Realiza una minimización antes de todo. | true |
| `optimize_cyclic_threshold` | número real | Porcentaje de la puntuación de interfaz total (isc) a partir del cual se optimiza el péptido cíclico, medido sobre la puntuación de interfaz del péptido | 0.35 |
| `report_format`             | cadena      | El formato del informe. Puede ser `basic` (formato fácil de analizar automáticamente) o `markdown` (formato bonito y legible, pero extenso). | `markdown` |

Consejos
====

*Documentación pendiente*

Salidas esperadas
================

Según el valor de la opción `report_format`, PeptiDerive entrega uno de dos formatos

Markdown
--------

La salida en Markdown es legible y se explica por sí sola. Es lo que recomendamos para ejecuciones con una estructura (o unas pocas).

Ten en cuenta que la numeración de los residuos es secuencial, y no la numeración de los autores. Para el formato del contenido de la columna *Disulfide info*, consulta la descripción del formato *Basic* para `disulfide_info`.


Basic
-----

El formato de informe `basic` está despojado de casi todos los elementos descriptivos, pero es fácil de analizar automáticamente y es el que usamos actualmente para ejecuciones masivas.

La salida tiene el siguiente formato:

```
> chain_pair: receptor= [receptor_chain_id] partner= [partner_chain_id] total_isc= [total_interface_score]
>> peptide_length: [sliding_window_length]
[entry_type] [seq_res_num] [peptide_interface_score] [disulfide_info]
```

  - `total_interface_score` es el *&Delta;&Delta;G<sub>AB</sub>* del complejo (consulta el [[Algoritmo|PeptiDerive#Algorithm]], arriba).
  - `entry_type` es

    - `0` para una entrada de la ventana deslizante (una por residuo, salvo los últimos *N*, donde *N* es el tamaño de la ventana deslizante, 
          y los péptidos sin contribución a la unión)
    - `1` para indicar el mejor péptido (lineal) según la puntuación para el par de cadenas y la longitud de ventana deslizante actuales
    - `2` para indicar el mejor péptido cíclico según la puntuación (ídem)

  - `seq_res_num` es el número secuencial de residuo, dentro de una cadena, de la primera posición del péptido (y no la numeración de los autores)
  - `peptide_interface_score` es el *&Delta;&Delta;G<sub>A<sub>pep</sub>B</sub>*
  - `disulfide_info` es una cadena de texto que describe los residuos de un posible péptido cíclico, si se determinó que era relevante, y, si se modeló (según si la puntuación lineal relativa supera `optimize_cyclic_threshold`), la puntuación de interfaz del péptido cíclico. 

En el futuro esperamos crear un `FeatureReporter` para permitir agregar la salida a una base de datos.

##Véase también

* [[Aplicaciones de análisis | analysis-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
