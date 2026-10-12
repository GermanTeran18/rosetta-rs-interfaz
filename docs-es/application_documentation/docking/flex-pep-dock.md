#FlexPepDock

Metadatos
========

Autores: Barak Raveh, Nir London, Nawsad Alam, Ora Schueler-Furman

Última actualización: 11 de marzo de 2019 por Alisa Khramushin; investigadora principal: Ora Schueler-Furman (ora.furman-schueler@mail.huji.ac.il).

Código y demostración
=====================

-   Código fuente de la aplicación: `        rosetta/main/source/src/apps/public/flexpep_docking/FlexPepDocking.cc       `
-   Código fuente del mover principal: `        rosetta/main/source/src/protocols/flexpep_docking/FlexPepDockingProtocol.cc       `
-   Para ver una demostración de una ejecución básica del protocolo de refinamiento y de una ejecución con un ancla alternativa con optimización de baja resolución, consulta la carpeta de integración ( `        rosetta/main/tests/integration/tests/flexpepdock/       ` ).
-   Para ver una demostración de una ejecución básica del protocolo ab-initio, consulta la carpeta de captura de protocolo `        rosetta/demos/protocol_capture/flex_pep_dock_abinitio       ` . El archivo README contiene toda la información necesaria para hacer una nueva ejecución sobre una interacción péptido-proteína de consulta.

Referencias
===========

Las referencias principales de los protocolos FlexPepDock Refinement, FlexPepDock *ab-initio* y PIPER-FlexPepDock incluyen más antecedentes científicos, detalles técnicos en profundidad sobre los protocolos y una evaluación de su rendimiento en distintos conjuntos de datos de complejos péptido-proteína:

Protocolo de refinamiento:

```
Raveh B*, London N* and Schueler-Furman O
Sub-angstrom Modeling of Complexes between Flexible Peptides and Globular Proteins.
Proteins, 78(9):2029–2040 (2010).
```

Protocolo *ab-initio*:

```
Raveh B, London N, Zimmerman L and Schueler-Furman O
Rosetta FlexPepDockab-initio: Simultaneous Folding, Docking and Refinement of Peptides onto Their Receptors.
PLoS ONE, 6(4): e18934 (2011).
```

PIPER-FlexPepDock (protocolo de docking global):

```
Alam N, Goldstein O, Xia B, Porter KA, Kozakov D, Schueler-Furman O 
High-resolution global peptide-protein docking using fragments-based PIPER-FlexPepDock. PLoS Comput Biol 13(12): e1005905 (2017).
```

Propósito de la aplicación
===========================================

Una amplia gama de procesos reguladores de la célula están mediados por péptidos flexibles que se pliegan al unirse a proteínas globulares. El protocolo FlexPepDock Refinement y los protocolos FlexPepDock *ab-initio* están diseñados para crear modelos de alta resolución de complejos entre péptidos flexibles y proteínas globulares. Ambos protocolos se evaluaron con un gran conjunto de datos de interacciones péptido-proteína, que incluye casos difíciles como el docking a modelos de receptor sin unir (forma libre) (consulta las [Referencias](#References) ).

Además, el protocolo PIPER-FlexPepDock se desarrolló para los casos en que no se dispone de información sobre el péptido más allá de su secuencia. En este protocolo, el plegamiento del péptido se desacopla de su docking al receptor. El protocolo se validó en un conjunto de benchmark representativo de complejos péptido-proteína de alta resolución resueltos por cristalografía (consulta las [Referencias](#References) ).

**Protocolos de refinamiento, *ab-initio* y de docking global:**

-   El protocolo de refinamiento (Refinement) está pensado para casos en los que se dispone de un modelo aproximado y de grano grueso de la interacción. El protocolo optimiza iterativamente la cadena principal del péptido y su orientación de cuerpo rígido respecto a la proteína receptora, además de una optimización de cadenas laterales sobre la marcha.

-   El protocolo *ab-initio* amplía considerablemente el protocolo de refinamiento y está pensado para casos en los que no se dispone de información sobre la conformación de la cadena principal del péptido. Pliega y acopla simultáneamente el péptido sobre la superficie del receptor, partiendo de cualquier conformación arbitraria (por ejemplo, extendida) de la cadena principal. Se supone que el péptido está colocado inicialmente cerca del sitio de unión correcto, pero el protocolo es robusto frente a la orientación inicial exacta.

-   PIPER-FlexPepDock está diseñado para casos en los que se desconoce el sitio de unión, partiendo solo de un receptor en formato PDB y de una secuencia de péptido. Un conjunto de fragmentos que representan el conjunto conformacional del péptido se acopla como cuerpo rígido al receptor y se refina después a alta resolución con el protocolo Refinement.

Algoritmo
=========

**Protocolo de refinamiento:** La entrada del protocolo es un modelo inicial aproximado del complejo péptido-proteína en formato PDB (coordenadas aproximadas de la cadena principal del péptido en el sitio de unión del receptor). Opcionalmente se pueden proporcionar como parte del modelo de entrada las coordenadas iniciales de las cadenas laterales (como las cadenas laterales cristalográficas de un receptor sin unir). Un paso preliminar del protocolo de refinamiento consiste en el preempaquetado de la estructura de entrada, para eliminar choques internos en el monómero de proteína y en el péptido (consulta el modo de prepack más abajo). En la parte principal del protocolo, la cadena principal del péptido y su orientación de cuerpo rígido se optimizan respecto a la proteína receptora con el enfoque de Monte Carlo con Minimización, además de una optimización de cadenas laterales sobre la marcha. Una preoptimización opcional de baja resolución (centroide) puede mejorar aún más el rendimiento. La parte principal del protocolo se repite *k* veces. Luego el usuario ordena los modelos de salida según su puntuación de energía. El protocolo de refinamiento se describe en detalle en la sección de Métodos de Raveh, London et al., Proteins 2010 (consulta las [Referencias](#References) ).

**Protocolo *ab-initio*:** La entrada del protocolo *ab-initio* es: (1) un modelo del complejo péptido-proteína en formato PDB similar al del protocolo de refinamiento, pero partiendo de una conformación arbitraria (por ejemplo, extendida) de la cadena principal del péptido. Se requiere que el péptido esté colocado inicialmente cerca del bolsillo de unión real, pero la orientación inicial exacta puede variar. Un paso preliminar del protocolo *ab-initio* es la generación de bibliotecas de fragmentos para la secuencia del péptido, con fragmentos de 3, 5 y 9 residuos (estos se pueden generar automáticamente con un script a partir de la estructura inicial, como se muestra en los archivos de la demostración de `       rosetta/main/demos/protocol_capture/flex_pep_dock_abinitio/      ` ). Otro paso preliminar es el preempaquetado, como en el protocolo de refinamiento. El primer paso de la parte principal del protocolo consiste en una simulación de Monte Carlo para el plegamiento y el docking *de novo* del péptido sobre la superficie de la proteína en modo de baja resolución (centroide), usando una combinación de inserciones de fragmentos, perturbaciones aleatorias de la cadena principal y movimientos de transformación de cuerpo rígido. En el segundo paso, el modelo de baja resolución resultante se refina con FlexPepDock Refinement. Como en el protocolo de refinamiento independiente, el usuario ordena luego los modelos de salida según su puntuación de energía, o también los somete a agrupamiento para mejorar el rendimiento. Nuestro protocolo *ab-initio* se describe en detalle en la sección de Métodos de Raveh, London, Zimmerman et al., PLoS ONE 2011 (consulta las [Referencias](#References) ).

**PIPER-FlexPepDock**: la entrada del protocolo es un receptor en formato PDB y un archivo FASTA con la secuencia del péptido que contiene el motivo de unión. El protocolo consta de 3 pasos principales: generación del conjunto de fragmentos con el Fragment picker de Rosetta (ten en cuenta que los fragmentos se recortan del PDB, incluidas las cadenas laterales), docking exhaustivo de cuerpo rígido de estos fragmentos basado en FFT con PIPER, y refinamiento flexible de alta resolución realizado por FlexPepDock, seguido de agrupamiento y selección de los representantes mejor clasificados. Para una descripción más detallada, consulta las [Referencias](#References)

Para más información, consulta los siguientes consejos sobre el [uso correcto de FlexPepDock](#When-you-should-/-should-not-use-FlexPepDock:).

Modos
-----

-   **Modo de prepack** (opción -flexpep\_prepack):
     El modo de preempaquetado optimiza las cadenas laterales de cada monómero según la [[función de energía de Rosetta|score-types]]. A menos que sepas lo que haces, recomendamos encarecidamente preempaquetar las estructuras de entrada y aplicar uno de los protocolos de docking de péptidos a las estructuras preempaquetadas resultantes, ya que esto puede mejorar considerablemente la selección de modelos (véase más abajo en *Más consejos*). Sin embargo, en los casos en que las cadenas laterales ya hayan sido optimizadas previamente por Rosetta con la misma función de puntuación, este paso se puede omitir.

-   **Modo *ab-initio* de baja resolución** (opción -lowres\_abinitio):
     Esta es la parte principal del protocolo de docking de péptidos *ab-initio*, para el plegamiento y el docking *ab-initio* simultáneos del péptido sobre la superficie de la proteína. Este modo se suele usar junto con el modo de refinamiento ( opción -pep\_refine ); en ese caso, el péptido se pliega primero *de novo* y luego se refina.

-   **Modo de refinamiento** ( opción -pep\_refine )
     Refinamiento de alta resolución, partiendo de un modelo aproximado del complejo. Este protocolo se puede usar junto con la opción lowres\_preoptimize, véase más abajo. También se usa para refinar la estructura de baja resolución que resulta del protocolo *ab-initio* de baja resolución (estos dos modos se pueden usar juntos)  

     _Nota importante: para la mayoría de los archivos de entrada, recomendamos encarecidamente ejecutar el modo de prepack (más abajo) antes de ejecutar los protocolos *ab-initio* o de refinamiento._

-   **Modo de repuntuación** (-flexpep\_score\_only)
     Este modo vuelve a puntuar las estructuras PDB de entrada y genera en el archivo de puntuaciones estadísticas detalladas sobre ellas.

-   **Modo de minimización** (-flexPepDockingMinimizeOnly)
     Realiza una minimización corta de la interfaz péptido-proteína sin pasar por la simulación de docking (incluidos todos los ángulos de torsión de las cadenas laterales, todos los ángulos de torsión de la cadena principal del péptido y la orientación de cuerpo rígido del péptido respecto al receptor). *Para la minimización no se requiere prepack.*

Para el paso de refinamiento en PIPER-FlexPepDock usa:

-    **Modo de refinamiento** (-lowres_preoptimize, -flexPepDocking:pep_refine)

-    **Modo de repuntuación** (-flexPepDocking:flexpep_score_only)

-    **Minimización** (-min_receptor_bb)

Archivos de entrada
===================

FlexPepDock requiere las siguientes entradas:

-   **Estructura inicial:**
     Una estructura inicial aproximada de un complejo péptido-proteína, con o sin coordenadas de cadenas laterales. En el modo *ab-initio*, la conformación inicial de la cadena principal del péptido puede ser arbitraria (por ejemplo, extendida). Consulta `        main/tests/integration/tests/flexpepdock/input/1ER8_rb1_tor10_5.pdb       ` para ver un ejemplo de estructura inicial en el modo de refinamiento, o `       main/demos/protocol_capture/flex_pep_dock_abinitio/input_file/2b1z.start.pdb       ` para el modo *ab-initio*. La forma exacta de crear la conformación inicial puede variar según la aplicación concreta. Por ejemplo, si existen estructuras similares (esto es común en péptidos de unión con especificidad múltiple, como en los dominios PDZ y muchos péptidos señal), la estructura inicial se puede construir a partir de un modelo de homología de una estructura similar con la herramienta de Rosetta para modelado comparativo, o con cualquier otra herramienta de modelado por homología. Si solo se conoce el sitio de unión, la cadena inicial del péptido se puede crear a partir de un archivo FASTA con la [[utilidad BuildPeptide de Rosetta|build-peptide]] o con herramientas externas como PyMol Builder. Luego la cadena se puede colocar manualmente en las cercanías del sitio de unión (por ejemplo, en una conformación extendida de la cadena principal) con herramientas externas como PyMol y Chimera. Alternativamente, el péptido se puede colocar manualmente en una orientación completamente arbitraria respecto a la proteína receptora, y llevarlo a las cercanías del sitio de unión con FlexPepDock o con la aplicación de docking de Rosetta, junto con un archivo de restricciones para colocar el péptido cerca del sitio de unión especificado, mediante restricciones de distancia adecuadas.

-   **Estructura nativa:**
     Es una estructura de referencia para las comparaciones de RMSD y las estadísticas de los modelos finales, en caso de que se disponga de una estructura nativa. Si no se proporciona una nativa, se usa en su lugar la estructura inicial como referencia.
     Consulta `        rosetta/main/tests/integration/tests/flexpepdock/input/1ER8.pdb       ` para ver un ejemplo en el modo de refinamiento, o `        rosetta/demos/protocol_capture/flex_pep_dock_abinitio/input_file/2b1z.native.pdb       ` para el modo *ab-initio*.

-   **Archivos de fragmentos (para el docking *ab-initio*):**
     Al usar el protocolo *ab-initio* se deben proporcionar archivos de fragmentos de Rosetta de 3, 5 y 9 residuos para la secuencia del péptido (si la longitud del péptido es menor que 9, usa bibliotecas de 3 y 5 residuos). Ten en cuenta que no se requieren fragmentos para el receptor, pero los archivos de fragmentos del péptido deben reindexarse para tener en cuenta los residuos del receptor que los preceden. Por ejemplo, si el receptor tiene 100 residuos, el índice del primer residuo en el archivo de fragmentos del péptido debe ser 101. El script de captura de protocolo `        rosetta/demos/protocol_capture/flex_pep_dock_abinitio/scripts/frags/shift.sh       ` se puede usar para desplazar los índices de un archivo de fragmentos. La captura de protocolo también permite la generación y el desplazamiento automáticos de todo el archivo de fragmentos (consulta el archivo README). Consulta ejemplos de ejecuciones más abajo en la sección de [Consejos](#Tips).

-   **Archivo de restricciones (opcional):**
     Como en cualquier otro protocolo de Rosetta, consulta la página de documentación del [[archivo de restricciones|constraint file]] para más información.

PIPER-FlexPepDock requiere:
-   **Estructura inicial:**
    Estructura del receptor libre (conformación unida o sin unir).

-   **Secuencia del péptido:**
    En formato FASTA o de texto simple. Para el benchmark se usaron péptidos de hasta 13 aminoácidos.

-   **Estructura nativa (opcional):**
    Si se conoce la estructura del complejo, se puede proporcionar como estructura 'nativa'. De lo contrario, después del paso de refinamiento se usará la estructura de mayor puntuación como estructura de referencia para el cálculo de RMSD.

-   **Estructura secundaria del péptido (opcional):**
    Si se conoce la estructura secundaria del péptido o se predijo con otra herramienta, se puede dar como entrada al protocolo en un archivo de texto que contenga solo las letras C, H o E (para espiral, hélice o hebra beta, respectivamente).

Opciones
========

Ten en cuenta que las opciones -flexpep\_prepack y -flexPepDockingMinimizeOnly' son mutuamente excluyentes con -lowres\_abinitio y -pep\_refine, ya que denotan modos de funcionamiento completamente distintos (-pep\_refine y -lowres\_abinitio se suelen usar juntos, para el modelado *ab-initio* de péptidos seguido de refinamiento).

I. Opciones comunes de FlexPepDock:
----------------------------

|  Opción  |  Descripción  |  Tipo  |  Valor por defecto  |
|:-------|:--------------|:-------|:----------|
| -receptor_chain| identificador de cadena de la proteína receptora. Se admite un receptor de varias cadenas (ten en cuenta que, si se usa esta opción con un receptor de varias cadenas, el archivo PDB debe contener primero las cadenas del receptor de forma consecutiva y solo después la cadena del péptido).| String| primera cadena de la entrada|
| -peptide_chain| identificador de cadena de la proteína péptido|  String| segunda cadena de la entrada|
|-lowres_abinitio| Modelo de plegamiento y docking ab-initio de baja resolución.| Boolean| false|
|-pep_refine|Modo de refinamiento. (equivale a las opciones obsoletas -rbMCM -torsionsMCM)| Boolean| false|
|-lowres_preoptimize| Realiza una ronda preliminar de optimización en modo centroide antes del refinamiento. Más detalles en [Consejos](#Tips).| Boolean| false|
|-flexpep_prepack|Modo de preempaquetado. Optimiza las cadenas laterales de cada monómero por separado (sin ningún docking).| Boolean|false|
|-flexpep_score_only| Lee un complejo, lo puntúa y genera estadísticas de la interfaz| Boolean| false|
|-flexPepDockingMinimizeOnly| Modo de minimización. Realiza solo una minimización corta del complejo de entrada|Boolean|false|
| -ref_startstruct| Estructura inicial alternativa para las estadísticas de puntuación, en lugar de la estructura inicial original (útil como referencia para repuntuar ejecuciones anteriores con la opción -flexpep_score_only.)| File| N/A|
|-peptide_anchor| Establece manualmente el residuo ancla del péptido. Se recomienda cambiar el valor por defecto solo si se sospecha firmemente que la región crítica para la unión del péptido está extremadamente alejada de su centro de masa.| Integer| Residuo más cercano al centro de masa del péptido.|
|-design_peptide | Dentro del refinamiento, diseña las posiciones del péptido que miran hacia la proteína | Boolean| False |

II. Opciones comunes de Rosetta relevantes
---------------------------------

Puedes encontrar más información sobre las opciones comunes de Rosetta en las [[páginas relevantes del manual de Rosetta|Rosetta-Basics]]. En particular, las opciones relacionadas con el distribuidor de trabajos (jd2), la función de puntuación, los archivos de restricciones y los resfiles de empaquetado son idénticas a las de cualquier otro protocolo de Rosetta.

|  Opción  |  Descripción  |  Tipo  |  Valor por defecto  |
|:-------|:--------------|:-------|:----------|
| -in::file::s  Or -in:file:silent| Especifica la estructura inicial (in::file::s para formato PDB, in:file:silent para formato silent file).| File | N/A |
| -in::file::silent_struct_type  -out::file::silent_struct_type|Formato del silent file que se lee o se escribe. Para la salida en silent file, usa el tipo binario, ya que otros tipos podrían no admitir la forma ideal| String | N/A |
|-native|Especifica la estructura nativa con la que comparar en los cálculos de RMSD. Cuando no se da la nativa, se usa la estructura inicial como referencia.| File | N/A |
|-nstruct|Número de modelos que se generan en la simulación| Number | 1 |
|-unboundrot|Agrega a la biblioteca de rotámeros los rotámeros específicos de posición de la estructura especificada (se suele usar para incluir rotámeros del receptor sin unir)| File | N/A |
|-use_input_sc|Incluye las conformaciones de rotámeros de la estructura de entrada durante el reempaquetado de cadenas laterales. A diferencia de la opción -unboundrot, no se agregan todos los rotámeros de la estructura de entrada a la biblioteca de rotámeros cada vez; solo se conservan las conformaciones aceptadas al final de cada ronda y las demás se pierden.| Boolean | False |
|-ex1/-ex1aro -ex2/-ex2aro -ex3 -ex4|Agrega rotámeros extra de cadena lateral (muy   recomendado). Las opciones -ex1 y -ex2aro se usaron en nuestras propias pruebas, por lo que se recomiendan como valores por defecto.| Boolean | False |
|-database|La base de datos de Rosetta | Directory | N/A |
|-frag3 / -flexPepDocking:frag5 / -frag9|Archivos de fragmentos de 3, 5 y 9 residuos para el docking de péptidos ab-initio (fragmentos de 9 residuos para péptidos más largos que 9).| File | N/A |

III. Opciones para expertos
-----------------

|  Opción  |  Descripción  |  Tipo  |  Valor por defecto  |
|:-------|:--------------|:-------|:----------|
|-rep_ramp_cycles|El número de ciclos externos del protocolo. En cada ciclo, la energía repulsiva de Rosetta se aumenta gradualmente y la energía atractiva se reduce, antes de aplicar los ciclos internos de Monte Carlo con Minimización (MCM).|Integer|10|
|-mcm\_cycles|Número de ciclos internos de los procedimientos de Monte Carlo con Minimización (MCM) tanto de cuerpo rígido como de ángulos de torsión.|Integer|8|
|-smove\_angle\_range|Define el tamaño de las perturbaciones de los movimientos small/shear.|Real|6.0|
|-extend\_peptide|inicia el protocolo con el péptido en conformación extendida (ignora la conformación original del péptido; extiende a partir del residuo ancla)|Boolean|false|
|-rbMCM|Realiza el refinamiento de cuerpo rígido mediante Monte Carlo con Minimización (obsoleto)|Boolean|false|
|-torsionsMCM|Realiza el refinamiento de la cadena principal del péptido mediante Monte Carlo con Minimización (obsoleto)|Boolean|false|
|-frag3/5/9\_weight|Peso relativo de las distintas bibliotecas de fragmentos en los ciclos de inserción de fragmentos ab-initio.|Real|1.0 / 0.25 / 0.1|

Consejos
========

Ejemplos
------------

-   **Refinamiento - una ejecución típica en tres pasos:**
    1.  preempaqueta tu complejo inicial

        ```
         FlexPepDocking.{ext}
        -database ${rosetta_db} -s start.pdb -native native.pdb -flexpep_prepack
         -ex1 -ex2aro [-unboundrot unbound.pdb]
        ```
    2.  genera 100 (o más) modelos con la opción -lowres\_preoptimize, y 100 modelos adicionales (o más) sin esta opción, en dos ejecuciones separadas (la baja resolución se puede omitir si tienes prisa)

        ```
        FlexPepDocking.{ext}
        -database ${rosetta_db} -s start_0001.pdb -native native.pdb
        -out:file:silent decoys.silent -out:file:silent_struct_type binary
        -pep_refine -ex1 -ex2aro -use_input_sc
        -nstruct 100 -unboundrot unbound_receptor.pdb [ -lowres_preoptimize ]
        ```
    3.  Abre el archivo de puntuaciones de salida de ambas ejecuciones (score.sc por defecto), ordénalo por la puntuación del modelo (segunda columna) y elige como modelos candidatos los de mayor puntuación.

-   **Ejecución del protocolo FlexPepDock *ab-initio*:**
     Ejecutar el protocolo *ab-initio* es algo más complicado, ya que los archivos de fragmentos del péptido deben generarse con antelación y sus índices de residuo deben desplazarse para tener en cuenta los residuos del receptor (porque los archivos de fragmentos suponen una indexación continua de los residuos entre cadenas). Afortunadamente, la carpeta de captura de protocolo `        rosetta/demos/protocol_capture/flex_pep_dock_abinitio/README       ` contiene toda la información sobre cómo automatizar este proceso. Para ejecuciones manuales se necesita lo siguiente:
    1.  Crea la estructura inicial de tu complejo (consulta la sección de [Archivos de entrada](#Input-Files) para más información).
    2.  Preempaqueta tu complejo inicial como en FlexPepDock Refinement
    3.  Prepara archivos de fragmentos de 3, 5 y 9 residuos para el péptido con el fragment picker, como en cualquier otra aplicación de Rosetta (no se requieren bibliotecas de fragmentos para el receptor).
    4.  Suponiendo que la cadena del receptor precede a la cadena del péptido, desplaza la indexación del archivo de fragmentos para tenerlo en cuenta. En UNIX, esto se puede hacer ejecutando la siguiente secuencia de comandos:
        ```
        set ifragfile=<input frag file name>
        set ofragfile=<output frag file name>
        set nResReceptor=<# receptor residues>
        awk '{if ( substr ( $0,1,3 ) == "pos" ) {print substr ( $0,0,18 ) sprintf ("%4d",substr ( $0,19,4 ) + '"$nResReceptor"' ) substr ( $0,23,1000 ) ; } else {print ; }}' $ifragfile > $ofragfile
        ```
    5.  Genera 50,000 (u otro número de tu elección) modelos de salida con el protocolo FlexPepDock *ab-initio*:
        ```
        FlexPepDocking.{ext}
        -database ${rosetta_db} -s start.pdb -native native.pdb
        -out:file:silent decoys.silent -out:file:silent_struct_type binary
        -lowres_abinitio -pep_refine -ex1 -ex2aro -use_input_sc
        -frag3 <frag3 file> -flexPepDocking:frag5 <frag5 file> -frag9 <frag9 file>
        -nstruct 50000 -unboundrot unbound_receptor.pdb
        ```
    6.  Puedes ordenar los modelos según la puntuación por defecto (segunda columna del archivo de puntuaciones). Sin embargo, nuestros benchmarks indican que ordenar los modelos según una nueva puntuación, llamada *puntuación reponderada* (rewighted-score), puede ser útil (busca la columna con la etiqueta "reweighted\_sc" en el archivo de puntuaciones).
    7.  También encontramos que es útil agrupar los 500 mejores modelos con la aplicación de agrupamiento de Rosetta y elegir los clústeres con representantes de menor energía, y que a menudo se encuentran buenas soluciones entre los 1 a 10 primeros clústeres. El agrupamiento se puede hacer (en UNIX) con el script `           demos/protocol_capture/flex_pep_dock_abinitio/scripts/clustering/cluster.sh          `, suponiendo que los modelos se guardan en un silent file, de la siguiente manera.
        ```
        cluster.sh pdb-id 500 2 <scorefile> <reference-pdb> <models-silent-file> <score-type-column>
        ```
        El último parámetro es el número de columna de la puntuación según la cual quieres elegir los 500 mejores modelos. Recomendamos usar para ello la columna con la etiqueta "reweighted\_sc", como se describió antes.

-   **Ejecución del protocolo PIPER-FlexPepDock:**
    1. Generación de fragmentos con el fragment picker:   
El script make_fragments.pl se usa para ejecutar PSI-BLAST y PSIPRED y generar la estructura secundaria del péptido y el perfil de similitud de secuencia:
    ```
    make_fragments.pl -verbose peptide.fasta
    ```
El fragment picker de Rosetta se usa para asignar, a partir de la base de datos vall de fragmentos de proteínas de alta resolución, fragmentos coherentes con la estructura secundaria predicha y con el perfil de secuencia:
    ```
    fragment_picker.linuxgccrelease -database ${rosetta_db} -in:file:vall vall.jul19.2011 -in:file:checkpoint pep_seq.checkpoint -frags:frag_sizes 6 -frags:n_candidates	2000 -frags:n_frags 50 -frags:ss_pred pep_seq.psipred_ss2 psipred -frags:scoring:config psi_L1.cfg -frags:bounded_protocol true
    ```
Estos fragmentos asignados se extraen del Protein Data Bank (incluidas las cadenas laterales). Los residuos no idénticos se mutan con el protocolo de diseño fixbb de Rosetta:
    ```
    fixbb.linuxgccrelease -database ${rosetta_db} -in:file:s fragment_1.pdb -resfile mutation_resfile -ex1 -ex2 -use_input_sc
    ```
    2. Docking con PIPER:

        Paso I: preprocesamiento del receptor de entrada y de los fragmentos con pdbprep.pl y pdbnmd.pl:
        ```
        perl pdbprep.pl receptor.pdb
        perl pdbnmd.pl receptor.pdb '?'
        ```
        Cada uno de los 50 fragmentos se procesa de forma similar.

        Paso II: ejecución del docking FFT de PIPER:
        ```
        piper.acpharis.omp.20120803 -vv -c1.0 -k4 --msur_k=1.0 --maskr=1.0 -T FFTW_EXHAUSTIVE -R 70000 -t 1 -p atoms.0.0.4.prm.ms.3cap+0.5ace.Hr0rec -f coeffs.0.0.4.motif -r rot70k.0.0.4.prm receptor_nmin.pdb fragment1_nmin.pdb >piper.log
        ```
        Cada uno de los fragmentos se acopla al receptor. 

        Paso III: se extraen los 250 modelos de PIPER con mayor puntuación:
        ```
        python apply_ftresult.py -i PIPER_model_ID ft.000.00 rot70k.0.0.4.prm fragment1_nmin.pdb --out-prefix PIPER_model_ID
        ```
        Donde PIPER_model_ID es un valor entero asignado a cada transformación de un fragmento.
    3. Refinamiento con FlexPepDock

        Paso I: preempaquetado del modelo de PIPER

        En el modelo acoplado por PIPER, el receptor se reemplaza por un receptor preempaquetado. Se usa un único receptor preempaquetado.

        Paso II: ejecución del refinamiento
        ```
        FlexPepDocking.mpi.linuxgccrelease -database ${rosetta_db} -in:file:s PIPER_model_1.pdb -scorefile score.sc -min_receptor_bb -lowres_preoptimize -pep_refine -flexpep_score_only -ex1 -ex2aro -use_input_sc -unboundrot free_receptor.pdb 
        ```
        Donde PIPER_model_1.pdb es el modelo preempaquetado.

    4. Agrupamiento:
    El 1% de los modelos refinados con mayor puntuación (125) se agrupa con la aplicación cluster de Rosetta:
    ```
    cluster.linuxgccrelease -in:file:silent decoys.silent top_model_list -in:file:silent_struct_type binary -database ${rosetta_db} -cluster:radius 2.0 -in:file:fullatom -tags `cat top_refined_list` -silent_read_through_errors
    ```
    Los clústeres se ordenan según los decoys de mayor puntuación de cada clúster, con base en la puntuación reponderada, y los 10 clústeres mejor clasificados se seleccionan como modelos putativos. 

Más consejos
------------

-   **Preempaqueta siempre:**
     A menos que sepas lo que haces, preempaqueta siempre la estructura de entrada (con el modo de preempaquetado) antes de ejecutar el protocolo de docking de péptidos. Nuestro protocolo de docking se centra en la interfaz entre el péptido y el receptor. Sin embargo, ordenamos las estructuras según su energía global. Por eso es importante crear un fondo energético uniforme en las regiones que no son de la interfaz. La causa principal de diferencias energéticas irrelevantes entre modelos es el uso de rotámeros de cadena lateral subóptimos en esas regiones. Por lo tanto, se recomienda mucho preempaquetar las cadenas laterales de cada monómero antes del docking, y esto puede mejorar significativamente el orden final de los modelos.

-   **Selección de modelos:**
     Para obtener buenos resultados, se recomienda generar un gran número de modelos (al menos 200 para refinamiento; 50,000 o más para *ab-initio*). La selección de modelos debe hacerse según su puntuación. Aunque en algunos casos puede bastar seleccionar el modelo de mayor puntuación, se recomienda inspeccionar los 5 o 10 modelos de mayor puntuación. Nuestras pruebas indican que, al menos para el docking de péptidos *ab-initio*, usar la columna del archivo de puntuaciones con la etiqueta "reweighted\_sc" puede ser mejor que usar la puntuación por defecto (score-12). El agrupamiento también puede ayudar (consulta los ejemplos de ejecución anteriores y la captura de protocolo del protocolo *ab-initio*).

-   **Preoptimización de baja resolución**
     Para el refinamiento, la opción -lowres\_preoptimize se puede usar para agregar un paso preventivo de optimización en modo centroide antes de realizar el refinamiento de alta resolución y todos los átomos. Como regla general, se recomienda usar esta opción cuando la calidad de la estructura inicial está menos definida (aproximadamente más de 3A de RMSD de la cadena principal del péptido), y por lo tanto tiene sentido muestrear un rango más amplio. En teoría, esta opción también se puede especificar de forma independiente (sin las opciones -rb\_mcm o torsion\_mcm). En ese caso solo se realizará muestreo de baja resolución seguido de reempaquetado de cadenas laterales. Este modo de operación no se ha probado. Tampoco se probó este paso al usar el protocolo *ab-initio* (ya que parece redundante).

-   **La opción de rotámeros sin unir:**
     En muchos casos, el receptor (o el péptido) sin unir puede contener conformaciones de cadenas laterales más parecidas a la estructura final unida que las de la biblioteca de rotámeros. Para conservar esta información útil, se puede especificar una estructura cuyas conformaciones de cadenas laterales se agregarán a la biblioteca de rotámeros durante el preempaquetado o el docking, lo que puede mejorar las probabilidades de obtener un resultado de baja puntuación cercano al nativo. Esta opción se desarrolló originalmente para el protocolo RosettaDock.

-   **Opciones de rotámeros extra:**
     Se recomienda mucho usar las opciones de rotámeros extra de Rosetta que aumentan el número de rotámeros usados para el preempaquetado (en nuestras propias ejecuciones usamos las opciones -ex1 y -ex2aro, pero siéntete libre de experimentar con otras si crees que sabes lo que haces. De lo contrario, usa -ex1 y -ex2aro).

-   **Calidad del modelado de cadenas laterales**
     Nuestro benchmark del protocolo de refinamiento indica que las cadenas laterales de los residuos del motivo del péptido (residuos conservados que permiten la unión del péptido) se modelan mejor que los residuos que no son del motivo, a menudo con resolución subangstrom (por supuesto, suponiendo que el péptido esté modelado correctamente en general).

Cuándo debes / no debes usar FlexPepDock:
---------------------------------------------

-   **Del refinamiento al docking ciego:**
     Ni el refinamiento ni los protocolos *ab-initio* están pensados para un docking totalmente ciego. El protocolo *ab-initio* supone que el péptido está ubicado en las cercanías del sitio de unión, pero no supone nada sobre la conformación inicial de la cadena principal del péptido. El protocolo de refinamiento es más restrictivo: está pensado para obtener modelos de péptido de alta resolución a partir de una estructura inicial de grano grueso, que debe parecerse en cierta medida a la solución nativa (alrededor de 5A de RMSD de la cadena principal respecto al péptido nativo, aunque en algunos casos el protocolo funciona bien con estructuras iniciales de hasta 12A de RMSD de la cadena principal respecto a la nativa). 

    Para un docking totalmente ciego se recomienda usar PIPER-FlexPepDock, ya que está diseñado específicamente para manejar estos casos y no hace suposiciones ni sobre la conformación de la cadena principal del péptido ni sobre el sitio de unión.

    Alternativamente, el sitio de unión aproximado se puede estimar con métodos computacionales disponibles de predicción de interfaces, o con procedimientos experimentales como la mutagénesis dirigida o con homólogos conocidos. Para el refinamiento, a menudo se puede obtener un modelo aproximado de, por ejemplo, interacciones de receptores homólogos o de péptidos con secuencias similares. Puede ser útil usar un archivo de restricciones para forzar al péptido a llegar a las cercanías de un sitio de unión conocido o para forzar interacciones específicas.

-   **Asignación de estructura secundaria:**
     Formalmente, ninguno de los protocolos requiere una asignación inicial de estructura secundaria. El protocolo *ab-initio* puede beneficiarse implícitamente de una predicción precisa de la estructura secundaria al construir las bibliotecas de fragmentos, pero no es necesario. En cambio, aunque el protocolo de refinamiento está diseñado para permitir una flexibilidad sustancial de la cadena principal del péptido, no cambia bien entre estructuras secundarias (de conformación de hebra a hélice, etc.). Por eso, para el refinamiento puede ser útil asignar inicialmente al péptido una estructura secundaria canónica con base en información previa (predicciones computacionales, estructuras de homólogos, etc.) e información experimental (experimentos de CD, etc.). Por supuesto, el protocolo *ab-initio* se puede usar en los casos en que no se dispone de esa información.

-   **Modelo del receptor:**
     Nuestro protocolo permite total flexibilidad de las cadenas laterales del receptor y mostró funcionar bastante bien al acoplar a receptores sin unir o a conformaciones alternativas. Sin embargo, se supone que la cadena principal del receptor no cambia demasiado en la interfaz, ya que todavía no modelamos la flexibilidad de la cadena principal del receptor. Esperamos que en futuras extensiones del protocolo se agregue flexibilidad de la cadena principal del receptor.

-   **Longitud del péptido:**
     Nuestros benchmarks consisten en péptidos de longitud 5-15, y nuestros protocolos funcionaron bien en este benchmark independientemente de la longitud del péptido. También experimentamos esporádicamente con péptidos más grandes (hasta 30 residuos), pero no tenemos resultados de benchmark detallados para estos.

     Para PIPER-FlexPepDock el rango óptimo de longitud del péptido es algo más corto: no se recomienda usar péptidos de más de 12 residuos, ya que los péptidos demasiado largos pueden albergar conformaciones irrelevantes alrededor del motivo que podrían dificultar la detección del sitio durante el paso de docking de cuerpo rígido, mientras que los péptidos demasiado cortos (de menos de 6 aminoácidos) pueden mostrar una señal débil y ruidosa. 

-   **Tiempo de ejecución típico:**
     En nuestras pruebas, producir 200 modelos con el protocolo de refinamiento suele tardar 10 horas de CPU (aproximadamente 3 minutos por modelo). Se obtiene una aceleración sustancial ejecutando procesos en paralelo con las opciones adecuadas del [[distribuidor de trabajos|jd2]] (por ejemplo, para usar MPI). El protocolo *ab-initio* requiere un número mucho mayor de modelos (experimentamos con 50,000 modelos), pero el tiempo de ejecución por modelo es similar (3-4 minutos). El tiempo de ejecución puede aumentar o disminuir, dependiendo principalmente del tamaño del receptor (para péptidos de longitud 5-15).

-   **Receptores de varias cadenas:**
     Para que FlexPepDock maneje correctamente receptores de varias cadenas, el archivo PDB debe contener primero las cadenas del receptor de forma consecutiva, seguidas de la cadena del péptido, y las cadenas de ligando van al final.
     Para PIPER-FlexPepDock, todas las cadenas de un receptor de varias cadenas deben llamarse igual, como si fueran una sola cadena (para que PIPER las maneje correctamente), seguidas de la cadena del péptido.

Salidas esperadas
=================

La salida de una ejecución de FlexPepDock es un archivo de puntuaciones (score.sc por defecto) y k estructuras de modelos (según lo especifique la opción -nstruct y las demás opciones comunes de entrada y salida de Rosetta). La puntuación de cada modelo está en la segunda columna del archivo de puntuaciones. La selección de modelos debe hacerse según las columnas de puntuación o de puntuación reponderada (que mostraron un rendimiento superior en los benchmarks *ab-initio*).


**Interpretación de los términos de puntuación específicos de FlexPepDock:** (para los términos de puntuación comunes de Rosetta, consulta también la [[página del manual relevante|score-types]]).

|**total\_score** <sup>\*</sup>|**Puntuación total del complejo**|
|:-----------------------------|:-----------------------------|
|**reweighted\_sc** <sup>\*</sup>|Puntuación reponderada del complejo, en la que los residuos de la interfaz tienen peso doble y los residuos del péptido tienen peso triple|
|I\_bsa|Área superficial enterrada de la interfaz|
|I\_hb|Número de enlaces de hidrógeno a través de la interfaz|
|I\_pack|Estadísticas de empaquetado de la interfaz|
|I\_sc|Puntuación de la interfaz (suma de la energía aportada por los residuos de la interfaz de ambas proteínas)|
|pep\_sc|Puntuación del péptido (suma de la energía aportada por el péptido a la puntuación total; consiste en la energía interna del péptido y la energía de la interfaz)|
|I\_unsat|Número de donantes y aceptores de enlaces de hidrógeno enterrados e insatisfechos en la interfaz.|
|rms (ALL/BB/CA)|RMSD entre el modelo de salida y la estructura nativa, sobre todos los átomos del péptido (pesados/de cadena principal/C-alfa)|
|rms (ALL/BB/CA)\_if|RMSD entre el modelo de salida y la estructura nativa, sobre todos los átomos de la interfaz del péptido (pesados/de cadena principal/C-alfa), donde la interfaz incluye cualquier residuo cuyo átomo C-beta (C-alfa en el caso de la glicina) esté a menos de 8 Angstrom de un átomo C-beta de la proteína compañera|
|rms (ALL/BB/CA/SC)\_CAPRI\_if|RMSD entre el modelo de salida y la estructura nativa, sobre los residuos de la interfaz del péptido y del receptor, donde la interfaz se define de forma similar a rms (ALL/BB/CA)\_if|
|rms (ALL/BB/SC)\_allIF| RMSD entre el modelo de salida y la estructura nativa, sobre los residuos de la interfaz del péptido y del receptor, donde la interfaz incluye cualquier par de residuos de una proteína en los que algún átomo que no sea hidrógeno esté a menos de 4 Angstrom de un átomo que no sea hidrógeno de la proteína compañera|  
|startRMS(all/bb/ca)|RMSD entre las estructuras inicial y nativa, sobre todos los átomos del péptido (pesados/de cadena principal/C-alfa)|


Posprocesamiento
================

Salvo la selección de modelos por puntuación total o por puntuación reponderada, y posiblemente el agrupamiento (consulta la sección de [Consejos](#Tips)), no se necesitan pasos especiales de posprocesamiento. Para el protocolo *ab-initio*, el archivo README de la captura de protocolo en `   rosetta/demos/protocol_capture/flex_pep_dock_abinitio/  ` contiene toda la información necesaria para el agrupamiento. Sin embargo, los usuarios avanzados pueden usar opcionalmente directamente los [[comandos de la aplicación cluster|cluster]] de Rosetta para evaluar si los modelos de mayor puntuación convergen a una solución de consenso. Para FlexPepDock Refinement, el agrupamiento es un paso opcional y no se considera parte integral del protocolo de refinamiento, como se describe y se prueba en Raveh *et al.*

##Véase también

* [[Servidor FlexPepDock (enlace externo)|http://flexpepdock.furmanlab.cs.huji.ac.il/]]: Servidor web que ejecuta FlexPepDock para usuarios académicos.
* [[Aplicaciones de docking|Docking Applications]]: Página principal de las aplicaciones de docking
* [[Preparing structures]]: Notas sobre la preparación de estructuras para usarlas en Rosetta
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[RosettaScripts]]: Página principal de la interfaz RosettaScripts de Rosetta
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comandos de ejemplo para ejecutar archivos ejecutables de Rosetta
