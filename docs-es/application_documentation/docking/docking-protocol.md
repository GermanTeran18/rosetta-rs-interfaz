#Protocolo de docking (RosettaDock)

Metadatos
========

Autores:
Brian Weitzner (brian.weitzner@jhu.edu), Monica Berrondo (mberron1@jhu.edu), Krishna Kilambi (kkpraneeth@jhu.edu), Robin Thottungal (raugust1@jhu.edu), Sidhartha Chaudhury (sidc@jhu.edu), Chu Wang (chuwang@gmail.com), Jeffrey Gray (jgray@jhu.edu)

Última edición: 17/7/2017 por Nick Marze. Investigador principal correspondiente: Jeffrey Gray (jgray@jhu.edu).

Puedes encontrar un tutorial introductorio sobre docking proteína-proteína [aquí](https://www.rosettacommons.org/demos/latest/tutorials/Protein-Protein-Docking/Protein-Protein-Docking).

[[_TOC_]]

Código y demostración
=====================

-   Código fuente de la aplicación: `        rosetta/main/source/src/apps/public/docking/docking_protocol.cc       `
-   Código fuente del mover principal: `        rosetta/main/source/src/protocols/docking/DockingProtocol.cc       `
-   Para ver demostraciones de algunos casos de uso distintos, consulta las pruebas de integración ubicadas en `        rosetta/main/tests/integration/tests/docking*       ` (docking\_full\_protocol, docking\_local\_refine, docking\_local\_refine\_min, docking\_low\_res, docking\_distance\_constraint, docking\_site\_constraint).

Para ejecutar docking, escribe lo siguiente en una línea de comandos:

```
[path to executable]/docking_protocol.[platform|linux/mac][compile|gcc/ixx]release –database [path to database] @options
```

Nota: estas demostraciones solo generarán un decoy. Para generar un gran número de decoys, tendrás que agregar –nstruct N (donde N es el número de decoys que se van a construir) a la lista de opciones.

Referencias
===========

Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de RosettaDock:

-   Protocolo original: Gray, J. J.; Moughon, S.; Wang, C.; Schueler-Furman, O.; Kuhlman, B.; Rohl, C. A.; Baker, D., Protein-protein docking with simultaneous optimization of rigid-body displacement and side-chain conformations. Journal of Molecular Biology 2003, 331, (1), 281-299.
-   Versión actual (4.0): Marze, NA; Roy Burman, SS; Sheffler, W; Gray, JJ. Efficient flexible backbone protein–protein docking for challenging targets (2018). Bioinformatics 34(20), 3461–3469
-   Wang, C., Schueler-Furman, O., Baker, D. (2005). Improved side-chain modeling for protein-protein docking Protein Sci 14, 1328-1339.
-   Wang, C., Bradley, P. and Baker, D. (2007) Protein-protein docking with backbone flexibility. Journal of Molecular Biology, 2007 Oct 19;373(2):503-19. Epub 2007 Aug 2.
-   S. Chaudhury & J. J. Gray, "Conformer selection and induced fit in flexible backbone protein-protein docking using computational and NMR ensembles," J. Mol. Biol. 381(4), 1068-1087 (2008). [[En línea|http://dx.doi.org/10.1016/j.jmb.2008.05.042]]
-   Chaudhury, S., Berrondo, M., Weitzner, B. D., Muthu, P., Bergman, H., Gray, J. J.; (2011) Benchmarking and analysis of protein docking performance in RosettaDock v3.2. PLoS One, Accepted for Publication
-   Marze, N. A., Jeliazkov, J. R., Roy Burman, S. S., Boyken, S. E., DiMaio, F., Gray, J. J.; (2016) Modeling oblong proteins and water-mediated interfaces with RosettaDock in CAPRI rounds 28-35. Proteins, 2016 Oct 24;85(3):479-486.


Propósito de la aplicación
===========================================

Determinar la estructura de complejos proteína-proteína mediante perturbaciones de cuerpo rígido de las cadenas de proteína.

Algoritmo
=========

**La siguiente descripción está adaptada de Chaudhury, et al., 2011, PLoS One:**

RosettaDock es un algoritmo de docking multiescala basado en Monte Carlo (MC) que incorpora tanto una etapa de baja resolución, en modo centroide y de grano grueso, como una etapa de refinamiento de alta resolución y todos los átomos que optimiza tanto la orientación de cuerpo rígido como la conformación de las cadenas laterales. El algoritmo sigue aproximadamente la teoría biofísica de la formación de un complejo de encuentro seguida de una transición a un estado unido. Normalmente el algoritmo parte de una orientación inicial aleatoria de las dos proteínas (docking global) o de una orientación inicial perturbada aleatoriamente a partir de una Pose inicial definida por el usuario (perturbación local). A partir de ahí, las proteínas compañeras se representan de forma gruesa, donde las cadenas laterales se reemplazan por un único seudoátomo unificado, o centroide. Durante esta fase se hace una búsqueda Monte Carlo de 500 pasos, con pasos adaptativos de rotación y traslación que se ajustan dinámicamente para lograr una tasa de aceptación del 25%. La ScoreFunction usada en esta etapa consiste principalmente en un término de choque ('bump'), un término de contacto y potenciales estadísticos específicos de docking, de entorno del residuo y de pares de residuos.

Una vez completada la etapa en modo centroide, se selecciona la estructura de menor energía a la que se accedió durante esa etapa para el refinamiento de alta resolución. Durante el refinamiento de alta resolución, los seudoátomos centroides se reemplazan por los átomos de las cadenas laterales en sus conformaciones iniciales sin unir. Luego se dan 50 pasos de Monte Carlo+Minimización (MCM) en los que:

1.  La posición de cuerpo rígido se perturba en una dirección aleatoria y con una magnitud especificada por una distribución gaussiana alrededor de 0.1 Å y 3.0˚
2.  Se minimiza la energía de la orientación de cuerpo rígido
3.  Las conformaciones de las cadenas laterales se optimizan con RotamerTrials, seguido de una prueba del criterio de Metropolis.

Cada ocho pasos se realiza una optimización combinatoria adicional de las cadenas laterales con el algoritmo completo de empaquetado de cadenas laterales, seguida de una comprobación adicional del criterio de Metropolis. Para reducir el tiempo dedicado a la minimización de energía, computacionalmente costosa, en movimientos de cuerpo rígido improductivos, la minimización se omite si un movimiento de cuerpo rígido produce un cambio de puntuación superior a +15. La función de puntuación de todos los átomos usada en esta etapa consiste principalmente en términos atractivos y repulsivos de Van der Waals, un término de solvatación, un término explícito de enlaces de hidrógeno, un término estadístico de interacción entre pares de residuos, un término de energía conformacional interna de las cadenas laterales y un término electrostático.

Para objetivos concretos, a menudo se usan diversas estrategias de muestreo de RosettaDock para mejorar la probabilidad de lograr una predicción estructural precisa. Si no se conoce información estructural o bioquímica previa sobre la interacción proteica de interés, se usa docking global para aleatorizar las Poses iniciales de docking. A partir de ahí, se usan filtros de puntuación y agrupamiento para identificar clústeres de estructuras aceptables de baja energía para seguir con el docking y el refinamiento. En la mayoría de los casos se conoce alguna información sobre el complejo, ya sea en forma de complejos proteicos relacionados o de datos bioquímicos o bioinformáticos que identifican regiones probables de interacción en las proteínas compañeras. En estos casos, los usuarios colocan manualmente la Pose inicial de docking en una configuración compatible con esa información y realizan una perturbación local de docking. Además, los usuarios pueden fijar filtros basados en distancia que sesgan el muestreo hacia las Poses de docking compatibles con restricciones especificadas.

Modos
-----

-   **Protocolo completo** - El protocolo completo consiste primero en explorar el espacio conformacional de las proteínas compañeras mediante una búsqueda de baja resolución, seguida de un refinamiento local de todos los átomos mediante un algoritmo de Monte Carlo+Minimización.
-   **Solo docking de baja resolución** - La proteína se representa como la cadena principal más una representación de centroide de las cadenas laterales, es decir, la cadena lateral se representa como un átomo gigante para ahorrar tiempo de CPU. En esta etapa RosettaDock intenta encontrar la orientación aproximada de las proteínas que se acoplan para la búsqueda de alta resolución.
-   **Solo docking de alta resolución (refinamiento local)** - Se representan todos los átomos de la proteína y se optimiza la posición encontrada en la búsqueda de baja resolución. El MCM de cuerpo rígido se alterna con el reempaquetado de las cadenas laterales, de modo que las cadenas laterales puedan ajustarse a una orientación nueva y más favorable, y viceversa. La etapa de alta resolución es la que consume más tiempo de CPU de Rosetta.
-   **Minimización local de alta resolución** - Al igual que en el refinamiento local, se representan todos los átomos de la proteína. Se hace una sola ronda de minimización, en lugar de una serie de ciclos de Monte Carlo+Minimización, para minimizar la energía de la posición de cuerpo rígido. La minimización va seguida de un empaquetado de cadenas laterales.
-   **El docking global o local** se puede lograr usando distintas opciones de perturbación inicial para generar una estructura inicial a partir de la estructura de entrada.
    - El docking global implica aleatorizar las posiciones iniciales de las proteínas, seguido de una fase de baja resolución, una fase de alta resolución y una fase de minimización (es decir, el protocolo completo).
    - El docking local no debe aleatorizar las posiciones iniciales de las proteínas, pero debe incluir una fase de baja resolución, una fase de alta resolución y una fase de minimización.

Archivos de entrada
===================

El único archivo de entrada obligatorio es un [[archivo pdb preempaquetado|docking-prepack-protocol]] que contenga dos proteínas con identificadores de cadena distintos. Las estructuras iniciales deben estar preempaquetadas porque durante el docking las cadenas laterales solo se empaquetan en la interfaz. Ejecutar el protocolo de prepack para docking asegura que las cadenas laterales fuera de la interfaz de docking tengan una conformación de baja energía, lo que proporciona un mejor estado de referencia para la puntuación. Para más información sobre el prepack, consulta la [[documentación del protocolo de prepack para docking.|docking-prepack-protocol]]

**Nota:** Las siguientes opciones deben darse en todas las simulaciones de docking: -ex1 -ex2aro.

Si usas una estructura inicial con más de dos cadenas polipeptídicas, debes incluir la opción -partners. Si se omite esta opción, el docking acoplará las dos primeras cadenas polipeptídicas de la estructura.

**Nota:** Se puede dar un conjunto (ensemble) de estructuras de entrada con las siguientes opciones: `-ensemble1 [partner_1_pdb_list]` o/y `-ensemble2 [partner_2_pdb_list]`. Este archivo de conjunto debe generarse con docking_prepack_protocol. Contiene una lista de pdb preempaquetados seguida de las probabilidades de intercambiarlos.

Opciones estándar de docking
============================


Opciones básicas del protocolo
------------------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-partners [P1\_P2]|Define las proteínas que se acoplan por identificador de cadena para docking de varias cadenas. Por ejemplo, "-partners LH\_A" mueve la cadena A alrededor del dímero de las cadenas L y H.|String|

Opciones de perturbación inicial
--------------------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-randomize1|Aleatoriza la orientación de la primera proteína que se acopla. (Solo funciona con docking de 2 proteínas). (Global).|Boolean|
|-randomize2|Aleatoriza la orientación de la segunda proteína que se acopla. (Solo funciona con docking de 2 proteínas). (Global).|Boolean|
|-spin|Hace girar a la segunda proteína que se acopla alrededor de ejes que van del centro de masa de la primera proteína a la segunda. (Global).|Boolean|
|-dock\_pert [T] [R]|Para crear una estructura inicial a partir de la estructura de entrada, perturba aleatoriamente la estructura de entrada usando una gaussiana para la traslación y la rotación con desviaciones estándar [T] y [R]. El uso recomendado es "-dock\_pert 3 8". (Global y local).|RealVector|
|-uniform\_trans [R]|Reposicionamiento aleatorio uniforme de la segunda proteína alrededor de la primera dentro de una esfera del radio dado, [R].|Real|
|-use\_ellipsoidal\_randomization true|Aleatoriza las proteínas que se acoplan alrededor de elipsoides en lugar de esferas. Se recomienda en todos los casos, pero especialmente cuando las proteínas que se acoplan son alargadas o aplanadas. Se usa junto con -randomize1 y/o -randomize2. (Global)|Boolean|

Opciones de empaquetado
-----------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-norepack1|No reempaqueta las cadenas laterales de la primera proteína que se acopla. (Solo funciona con docking de 2 proteínas).|Boolean|
|-norepack2|No reempaqueta las cadenas laterales de la segunda proteína que se acopla.|Boolean|
|-sc\_min|Realiza pasos extra de minimización de cadenas laterales durante los pasos de empaquetado.|Boolean|

Opciones del protocolo completo
-------------------------------

Modo de docking por defecto. No hacen falta opciones adicionales.

Opciones de solo docking de baja resolución
-------------------------------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-low\_res\_protocol\_only|Ejecuta solo la parte de baja resolución del protocolo (omite todos los pasos de alta resolución y solo genera la estructura de baja resolución).|Boolean|

Opciones de solo docking de alta resolución
-------------------------------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-docking\_local\_refine|Refina la posición de docking solo en alta resolución (omite todos los pasos de baja resolución del protocolo). Usa pequeñas perturbaciones de las posiciones, sin movimientos grandes.|Boolean|

Opciones de minimización local de alta resolución
-------------------------------------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-docking\_local\_refine|Refina la posición de docking solo en alta resolución (omite todos los pasos de baja resolución del protocolo). Usa pequeñas perturbaciones de las posiciones, sin movimientos grandes.|Boolean|
|-dock\_min|Hace una sola ronda de minimización en alta resolución, omitiendo el protocolo mcm.|Boolean|

Opciones comunes de Rosetta relevantes
--------------------------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-s [S] OR -silent [S]|Especifica el nombre del archivo de la estructura inicial, [S] (in:file:s para formato PDB, in:file:silent para formato silent file).|String|
|-native [S]|Especifica el nombre del archivo de la estructura nativa, [S], con la que comparar en los cálculos de RMSD. Si no se da un archivo nativo, todos los cálculos se hacen usando la estructura inicial como nativa.|String|
|-nstruct [I]|Especifica el número de decoys, [I], que se van a generar.|Integer|
|-database [P]|La ruta a la base de datos de Rosetta (por ejemplo, /path/to/rosetta/main/database).|String|
|-use\_input\_sc|Usa los rotámeros aceptados de la estructura de entrada entre ciclos de Monte Carlo+Minimización (MCM). A diferencia de la opción -unboundrot de Rosetta++, no se agregan todos los rotámeros de la estructura de entrada a la biblioteca de rotámeros cada vez, sino solo los aceptados al final de cada ronda; las demás conformaciones se pierden.|Boolean|
|-ex1/-ex1aro -ex2/-ex2aro -ex3 -ex4|Agrega rotámeros extra de cadena lateral (muy recomendado). Las opciones -ex1 y -ex2aro se usaron en nuestras propias pruebas, por lo que se recomiendan como valores por defecto.|Boolean/Integer|
|-constraints:cst\_file [S]|Especifica el nombre del [[archivo de restricciones|constraint file]], [S]. |String|

Opciones para expertos
----------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-dock\_mcm\_trans\_magnitude [T]|La magnitud de la perturbación traslacional durante los pasos MCM en el docking, en Angstroms. Por defecto 0.7 Å |Real|
|-dock\_mcm\_rot\_magnitude [R]|La magnitud de la perturbación rotacional durante los pasos MCM en el docking, en grados. Por defecto 5.0º |Real|
|-docking\_centroid\_outer\_cycles [C]|Número de ciclos que se usan en el ciclo externo del protocolo de docking de baja resolución. Por defecto 10. |Integer|
|-docking\_centroid\_inner\_cycles [C]|Número de ciclos que se usan en el ciclo interno del protocolo de docking de baja resolución. Por defecto 50. |Integer|

Consejos
========

-   La ejecución de docking puede adoptar dos formas. A veces se puede usar información bioquímica y genética para localizar el sitio de unión en una región pequeña de una o ambas proteínas. En este caso se hace una ejecución de perturbación, que explora solo una región pequeña del espacio alrededor del supuesto sitio de unión. Para las predicciones en las que no hay información biológica sobre la interfaz, normalmente se hace una búsqueda global, que explora todo el espacio conformacional de ambas proteínas.

-   El docking global da los mejores resultados cuando hay menos de 450 residuos en el complejo. (consulta [Daily, 2005](http://onlinelibrary.wiley.com/doi/10.1002/prot.20555/abstract) )

-   Las opciones más usadas son -dock\_pert 3 8, que creará estructuras iniciales con traslaciones de 3 Angstroms y rotaciones de hasta 8 grados.

-   Ten en cuenta que siempre se debe ejecutar la [[aplicación Docking Prepack|docking-prepack-protocol]] sobre la estructura inicial para eliminar rotámeros de alta energía que podrían causar un orden erróneo de los decoys.

-   Hay dos puntuaciones que conviene inspeccionar:
    1.  total: La puntuación total es una medida global de la energía del complejo
    2.  I\_sc (puntuación de la interfaz): I\_sc es la puntuación total del complejo menos la puntuación total de cada proteína por separado. Los valores típicos de I\_sc de buenos decoys están en el rango de -5 a -10.

-   Usa siempre las opciones -ex1 y -ex2aro para permitir una selección de rotámeros más fina.

-   Para ejecuciones de perturbación, genera al menos 1,000 decoys. Para ejecuciones globales, genera entre 10,000 y 100,000 (sabemos que esto requiere mucho tiempo de CPU y espacio en disco).

-   Si la puntuación de la interfaz no aparece en el archivo de puntuaciones y quieres agregarla, puedes usar la opción ```-score:docking_interface_score 1 ```

-   Puedes usar el protocolo de docking para calcular RMSD de la interfaz:
```
/path/to/docking_protocol.linuxgccrelease -l input_pdbs.list \
-native native.pdb \
-docking_local_refine \
-dock_min \
-out:file:score_only recalc_rmsd.sc \
-nstruct 1
```

Restricciones
=============

El docking ahora admite AtomPairConstraint, AmbiguousConstraint y SiteConstraint. Para usar una restricción con docking, solo necesitas agregar la opción -constraints:cst\_file [[constraint_file|constraint-file]] . Consulta las pruebas de integración docking\_distance\_constraint y docking\_site\_constraint para ver ejemplos. Una SiteConstraint te permite especificar que un residuo concreto debe estar en contacto con una cadena concreta. Un ejemplo de SiteConstraint es:

    ```
    SiteConstraint CA 4A D FLAT_HARMONIC 0 1 5
    ```

Esto agregará a la ScoreFunction un potencial FLAT\_HARMONIC con los parámetros 0 1 5 (recomendados; consulta [[esta página|constraint-file]] para más información sobre los archivos de restricciones) alrededor de la distancia entre el CA del residuo 4 (numeración PDB) de la cadena A y el CA más cercano de la cadena D. La función FLAT\_HARMONIC con estos parámetros está centrada en 0, con una constante de resorte de 1 y una ventana de 5. Es decir, no hay penalización dentro de 5 alrededor de cero, y a partir de 5 la penalización crece como d^2 por cada d unidades que te pases de 5.  

Si buscas tener SiteContraints para cualquier átomo de un residuo concreto con cualquier átomo de la cadena especificada, consulta las AmbiguousContraints

Si quieres desautorizar ciertos residuos, mira la función SIGMOID.  Como explica Rocco Moretti en una publicación de un foro: Recomendaría probar una función SIGMOID( (1/(1+exp(-slope*( x-x0 ))) - 0.5). Está configurada para dar un valor favorable cerca de cero (y para números negativos) cuando la pendiente es positiva, pero podrías probar una pendiente negativa para dar un valor favorable más lejos de cero. Por ejemplo:
    
    ```
    SiteConstraint CA 16B A SIGMOID 5.0 -2.0
    ```

Daría una restricción sigmoide centrada en 5 con valores desfavorables cerca de cero y favorables por encima de 5 (pendiente -4). Probablemente tendrás que jugar con la pendiente y el umbral para lograr lo que quieres. Ten en cuenta también que una sigmoide nunca llega del todo a cero, así que la restricción siempre querrá separar las cosas, pero con una pendiente suficientemente pronunciada el efecto será despreciable.


Salidas esperadas
=================

Un archivo PDB por cada modelo candidato acoplado generado y un archivo de puntuaciones por cada ejecución que resume todos los modelos generados.

Posprocesamiento
================

Ordena el archivo de puntuaciones por puntuación con la función sort de la línea de comandos. Para simulaciones de docking global, se deben generar al menos 10,000 decoys e idealmente 100,000. Ordena por puntuación (¡presta atención a I\_sc y a la total!) y agrupa los 200 mejores decoys por RMSD entre pares. Como el docking global en Rosetta 3 no se ha probado a fondo, no tenemos scripts disponibles para automatizar este proceso. Recomendamos usar los scripts mencionados en nuestro [tutorial de Rosetta++](http://graylab.jhu.edu/~mdaily/tutorial/postprocess.html) . Algunos scripts pueden requerir alguna modificación.

Novedades desde la última versión
=================================

-   Admite el distribuidor de trabajos moderno [[jd2]].
-   Soporte para foldtrees complejos, incluidas Poses que tienen ligandos.
-   Soporte para [[restricciones|constraint-file]] .

##Véase también

* [Tutorial de docking proteína-proteína](https://www.rosettacommons.org/demos/latest/tutorials/Protein-Protein-Docking/Protein-Protein-Docking): Primeros pasos con el docking
* [[Aplicaciones de docking|Docking Applications]]: Página principal de las aplicaciones de docking
* [[Preparing structures]]: Notas sobre la preparación de estructuras para usarlas en Rosetta
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[RosettaScripts]]: Página principal de la interfaz RosettaScripts de Rosetta
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comandos de ejemplo para ejecutar archivos ejecutables de Rosetta
* [[Motif Dock Score]]: Docking proteína-proteína eficiente de baja resolución.
