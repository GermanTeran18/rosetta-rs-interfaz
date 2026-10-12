#Aplicación de diseño de enzimas

Metadatos
========

Autor: Florian Richter (floric@u.washington.edu)

Este documento fue escrito en su mayor parte por Florian Richter (floric@u.washington.edu), con última actualización en julio de 2010. Otros colaboradores son Sinisa Bjelic (sinibjelic@gmail.com) y Lucas Nivon (nivon@u.washington.edu). La aplicación `       enzyme_design      ` la mantiene el laboratorio de David Baker. Envía tus preguntas a dabaker@u.washington.edu

Código y demo
=============

El ejecutable de la aplicación está en rosetta/main/source/src/apps/public/enzdes/enzyme\_design.cc La mayor parte del código reside en rosetta/main/source/src/protocols/enzdes/ y rosetta/main/source/src/protocols/toolbox/match\_enzdes\_util/. El mover más básico es EnzdesFixBBMover, rosetta/main/source/src/protocols/enzdes/EnzdesFixBBProtocol.hh/cc

Un ejemplo básico de uso es la prueba de integración de enzdes, que se encuentra en rosetta/main/tests/integration/tests/enzdes/ Para hacer una ejecución de producción, el archivo de opciones de la prueba de integración de enzdes debe ampliarse con las opciones de empaquetado de rotámeros deseadas (ex1, ex2, use\_input\_sc, linmem\_ig ), el número n (normalmente 2-4) de ciclos iterativos de diseño/minimización que el usuario quiera hacer (-design\_min\_cycles n ) y, por supuesto, el número de estructuras que el usuario quiera producir (-nstruct). Todas las opciones relativas a enzdes están en la documentación de opciones, [[página de documentación de opciones|full-options-list]] , sección enzdes

Puedes encontrar un tutorial sobre diseño de proteínas [aquí](https://www.rosettacommons.org/demos/latest/tutorials/protein_design/protein_design_tutorial).

Referencias
==========

Richter F, Leaver-Fay A, Khare SD, Bjelic S, Baker D (2011) De Novo Enzyme Design Using Rosetta3. PLoS ONE 6(5): e19230. doi:10.1371/journal.pone.0019230
 El protocolo y el algoritmo son muy similares a los de Rosetta 2.x, que se usó para generar los diseños de los artículos de aldolasa y kemp:
 Lin Jiang et al., "De novo computational design of retro-aldol enzymes," Science (New York, N.Y.) 319, no. 5868 (March 7, 2008): 1387-1391.
 Daniela Röthlisberger et al., "Kemp elimination catalysts by computational enzyme design," Nature 453, no. 7192 (May 8, 2008): 190-195.

Prólogo
========

Gran parte del código de diseño de enzimas se basa en la funcionalidad de docking de ligandos. Consulta la documentación de esa aplicación para ver las instrucciones sobre cómo preparar la molécula pequeña que quieras (ligandos, sustratos, cofactores, etc.) para usarla en Rosetta (p. ej., preparar los archivos .params y las bibliotecas de rotámeros necesarios) .

Propósito de la aplicación
===========================================

Esta aplicación toma una estructura de entrada que contiene un ligando o sustrato en contacto con una proteína y reempaqueta o rediseña la proteína a su alrededor. Opcionalmente, se pueden especificar contactos catalíticos especiales entre el ligando y la proteína, y esta aplicación puede usarse para optimizarlos ( consulta la sección Configuración de las restricciones catalíticas).

NOTA: NO contiene el algoritmo RosettaMatch, que sirve para colocar un ligando en un andamiaje proteico para el diseño de enzimas de novo.

Aunque el código se ha probado con más detalle para el caso de un ligando en un sitio de unión de una proteína, también funcionará para problemas relacionados, es decir, para cualquier sistema con varias cadenas, donde una cadena es el receptor proteico y la otra puede ser otra proteína o un ligando. También se admiten sistemas con una cadena proteica y varios ligandos, cofactores o iones metálicos, pero es aconsejable colocar el sustrato real en último lugar en el archivo pdb.

Configuración
=====

La configuración de un cálculo de diseño de enzimas requiere dos cosas: preparar los archivos de entrada del ligando y configurar las restricciones catalíticas. Los archivos .params y los confórmeros del ligando se gestionan igual que en la aplicación de docking de ligandos. Por lo tanto, para preparar los archivos de entrada del ligando, CONSULTA EL MANUAL DE DOCKING DE LIGANDOS. En especial, la sección sobre cómo preparar el ligando de molécula pequeña para el docking es de lectura imprescindible antes de empezar a trabajar con el diseño de enzimas de Rosetta. Se encuentra aquí: [[documentación de LigandDocking|ligand-dock]] .

Configuración de las restricciones catalíticas

1) ¿Qué son las restricciones catalíticas de Rosetta? Los residuos del sitio activo de una enzima suelen poder dividirse en dos conjuntos: los residuos responsables de los pasos químicos de una reacción (los llamados residuos catalíticos) y los residuos responsables de la unión al sustrato. Evaluar lo favorable que es para la catálisis una conformación dada del sitio activo requiere cálculos de nivel cuántico. Como la función de energía en la que se basa Rosetta solo consta de términos clásicos, por sí sola no puede distinguir las conformaciones del sitio activo que favorecen la catálisis de las no catalíticas. Para sortear este problema, en los cálculos de diseño de enzimas de Rosetta se usan restricciones predefinidas que penalizan las conformaciones no catalíticas de los residuos catalíticos. Estas restricciones deben definirse de modo que produzcan una penalización si un residuo catalítico está en una conformación no catalítica. En la práctica, las restricciones catalíticas son un conjunto de distancias, ángulos y diedros entre un residuo catalítico y un sustrato que deben tener un valor predefinido para que el sitio activo sea catalítico. Estos valores pueden derivarse de cálculos de mecánica cuántica de la reacción, de estructuras cristalinas de una enzima relacionada en complejo con un sustrato o un análogo del estado de transición (si existen) o de la simple intuición química.

2) Especificación de las restricciones catalíticas

Una vez que el usuario ha decidido cómo deben ser las restricciones catalíticas (en términos de la relación geométrica entre un residuo catalítico y el sustrato, o entre dos residuos catalíticos), hay que especificarlas en un archivo de restricciones (o cstfile, para abreviar). La documentación del formato cstfile se encuentra en [[Documentación del formato cstfile.|match-cstfile-format]] Se puede encontrar un ejemplo de cstfile en `       rosetta/main/tests/integration/tests/enzdes/inputs/Est_CHba_d2n.cst      ` . Describe la interacción entre una cisteína y un ligando abreviado con el nombre D2N.

Declaración de los residuos catalíticos en el pdb de entrada:

Falta un dato en el cstfile: qué residuos del pdb de entrada son los catalíticos. Esto debe especificarse en los registros REMARK del pdb de entrada correspondiente. Para cada bloque del cstfile, tiene que haber una línea con el siguiente formato en la sección REMARK del pdb de entrada:

```
REMARK 666 MATCH TEMPLATE X D2N    0 MATCH MOTIF A CYS   10  1  1
```

La penúltima columna (13) declara con qué bloque del cstfile está asociada la línea. Las columnas 5, 6 y 7 especifican la cadena, el nombre (en formato de 3 letras) y el número de residuo en la cadena del residuo de plantilla A del bloque. Las columnas 10, 11 y 12 especifican la cadena, el nombre (en formato de 3 letras) y el número de residuo en la cadena del residuo de plantilla B del bloque. (Nota: si el número de residuo de una posición determinada se establece en 0, se restringirá todo residuo con el nombre de 3 letras especificado). La línea de ejemplo anterior corresponde al bloque de ejemplo del cstfile mostrado arriba (de la prueba de integración de diseño de enzimas). La histidina A37 y un ligando abreviado D2N con id de pdb X900 estarán restringidos según los parámetros especificados en el primer bloque del cstfile.

La razón de declarar las restricciones y los residuos exactos que se van a restringir en dos lugares distintos es la siguiente: permite usar el mismo .cstfile para cualquier número de coincidencias (matches) que tengan el mismo tipo de sitio activo pero estén en andamiajes distintos o en puntos de unión distintos del mismo andamiaje.

Opciones de línea de comandos relativas a la configuración de las restricciones de enzdes: una vez creado el cstfile y añadidas las líneas REMARK adecuadas al pdb o pdbs iniciales, la opción -enzdes::cstfile \<nombre/ruta del cstfile\> activará el uso de las restricciones catalíticas en el cálculo.

Algoritmo
=========

De forma simplificada, un cálculo de diseño de enzimas de Rosetta con fixbb consta de 4 pasos:

1.  Determinar qué residuos se diseñan y cuáles se reempaquetan
2.  optimizar las interacciones catalíticas
3.  ciclos de diseño de secuencia/minimización (con restricciones catalíticas, si se especifican)
4.  empaquetado de rotámeros/minimización sin restricciones con secuencia fija

#### 1\.  Determinar qué residuos se diseñan y cuáles se reempaquetan 

Hay dos formas de hacerlo: usar un resfile estándar de Rosetta para especificar exactamente qué residuos se permiten en cada posición o la detección automática de la región de diseño. Si solo hay un pequeño número de estructuras iniciales distintas, probablemente sea mejor invertir el tiempo y usar la intuición para decidir qué posiciones de la proteína se rediseñan o reempaquetan y qué aminoácidos se permiten. Consulta la documentación de los resfiles para ver información sobre el formato del archivo, etc. [[documentación de los resfiles|resfiles]]

Si hay muchas estructuras de entrada que diseñar, también es posible determinar automáticamente qué residuos se rediseñan. Rosetta puede dividir los residuos de la proteína en 5 grupos de distancia creciente al ligando:

1. los residuos cuyo Calpha esté a una distancia de cut1 angstroms de cualquier átomo pesado del ligando se establecerán como diseñables
2. los residuos cuyo Calpha esté a una distancia de cut2 de cualquier átomo pesado del ligando y cuyo Cbeta esté más cerca de ese átomo del ligando que el Calpha se establecerán como diseñables. cut2 tiene que ser mayor que cut1
3. los residuos cuyo Calpha esté a una cierta distancia cut3 de cualquier átomo pesado del ligando se establecerán como reempaquetables. cut3 tiene que ser mayor que cut2
4. los residuos cuyo Calpha esté a una distancia de cut4 de cualquier átomo pesado del ligando y cuyo Cbeta esté más cerca de ese átomo del ligando se establecerán como reempaquetables. cut4 tiene que ser mayor que cut3
5. todos los residuos que no estén en ninguno de los 4 grupos anteriores se mantienen estáticos.

Los residuos declarados como catalíticos en el pdb de entrada siempre serán reempaquetables (salvo que se desactive con una opción). En las posiciones de residuo establecidas como diseñables se permitirá cualquier aminoácido excepto la cisteína. Los valores de los distintos cortes que se usan habitualmente en el laboratorio de Baker son: 6.0 (cut1), 8.0 (cut2), 10.0(cut3), 12.0(cut4)

Opciones de línea de comandos que afectan a esta etapa:
```
 -resfile <name of resfile>            specifies the use of a resfile
 -enzdes:detect_design_interface       invokes automatic detection of designable region
 -enzdes:cut1 <value>                  value used for cut1
 -enzdes:cut2 <value>                  value used for cut2
 -enzdes:cut3 <value>                  value used for cut3
 -enzdes:cut4 <value>                  value used for cut4
 -enzdes:fix_catalytic_aa              prevents catalytic residues from being repacked
```
Además, estas dos formas de declarar las regiones de diseño y de reempaquetado pueden combinarse, es decir, un resfile y el mecanismo detect\_design\_interface pueden usarse a la vez. Si el comportamiento por defecto en el resfile se establece en 'AUTO', el comportamiento de cada residuo que no esté declarado específicamente en el resfile se determinará según la lógica de -detect\_design\_interface.

#### 2\.  Optimizar las interacciones catalíticas

**2 A:**

 Esta etapa consiste en una minimización basada en gradiente de la estructura de entrada antes del diseño. Durante esta minimización, todos los residuos del sitio activo que no son catalíticos (es decir, que no están restringidos) se mutan a alanina (es decir, el sitio activo se reduce al sustrato y a los residuos catalíticos solamente) y se usa una función de energía reducida, sin términos de atracción de vdW ni de solvatación, para la minimización. El propósito de esta etapa es mover el sustrato a una posición en la que las interacciones catalíticas sean lo más ideales posible.

Opciones de línea de comandos que afectan a esta etapa
```
 -enzdes:cst_opt             will invoke this stage
 -enzdes:bb_min              optional but recommended. allows the backbone to be slightly flexible during the minimization
 -enzdes:chi_min             optional but recommended. allows the dihedrals of the catalytic residues to move during the minimization
```
 En la minimización de la cadena principal, solo se permitirá mover los ángulos phi/psi de la cadena principal de los residuos de la región diseñable o reempaquetable. Se crea un FoldTree especial para contener el movimiento de la cadena principal en el sitio diseñado, es decir, no habrá cambios conformacionales en las regiones que no son reempaquetables ni diseñables.

**2 B:**

Una alternativa a la optimización de restricciones basada en gradiente es el muestreo Monte Carlo de cuerpo rígido del ligando. Se invoca con

```
-enzdes:cst_predock 
-enzdes:trans_magnitude <value>
-enzdes:rot_magnitude <value>
-enzdes:dock_trials <value>
```

las opciones trans\_magnitude (en Angstrom) y rot\_magnitude (en grados) establecen el mayor desplazamiento y la mayor rotación posibles, respectivamente, del ligando durante cst\_predock. Los valores se muestrean con una distribución gaussiana de media cero y una desviación estándar. El número de movimientos de cuerpo rígido lo determina dock\_trials. El centro de rotación y traslación se determina identificando primero qué restricciones de distancia hay entre los átomos del ligando y la proteína, y usando después las coordenadas de esos átomos del ligando para calcular el centro de rotación y traslación. Si hay más de un átomo restringido, se calcula una posición media y el ligando se mueve alrededor de ella. Esto asegura el muestreo más eficiente del ligando respecto a las restricciones. Durante el muestreo, todos los residuos designados para el diseño se mutarán a alanina para permitir que el ligando muestree todo el sitio activo antes del diseño.

NOTA: ejecutar esta parte del cálculo no tiene sentido si no se especifica un cstfile (es decir, si no se declara ningún residuo catalítico). Si se invoca esta etapa sin restricciones catalíticas existentes, el ligando podría ser expulsado del sitio activo, porque no hay restricciones catalíticas que lo mantengan allí y el campo de fuerzas usado en esta etapa está dominado por interacciones repulsivas. Además, para evitar que la cadena principal del sitio activo se mueva considerablemente durante la minimización basada en gradiente, los Calpha de la cadena principal están restringidos a menos de 0.5A de sus posiciones originales.

#### 3\.  Ciclos de diseño de secuencia/minimización

Aquí es donde ocurre el diseño de secuencia propiamente dicho. En las posiciones diseñables se emplea el algoritmo Monte Carlo estándar de selección de secuencia de Rosetta para encontrar una nueva secuencia de menor energía. Las restricciones catalíticas se emplean en todo momento. La estructura resultante se minimiza después. Estos dos pasos suelen repetirse iterativamente un pequeño número de veces (3-4).

Opciones de línea de comandos que afectan a esta etapa
```
 -enzdes:cst_design                     will invoke this stage
 -enzdes:design_min_cycles              how many iterations of design/minimization will be done
 -enzdes:lig_packer_weight              determines the relative importance of protein-substrate interactions (variable weight specified by this flag) vs. protein-protein interactions (weight of 1) in the sequence selection calculation
 -enzdes:cst_min                        necessary to invoke minimization after the sequence design
 -enzdes:bb_min                         same as for stage 2
 -enzdes:chi_min                        same as for stage 2
 -packing:ex1                           optional but highly recommended. improved rotamer sampling around the first dihedral for every amino acid
 -packing:ex2                           optional but highly recommended. improved rotamer sampling around the second dihedral for every amino acid
 -packing:use_input_sc                  optional but highly recommended. include the input rotamer of every sidechain in the calculation
 -packing:soft_rep_design               triggers use of the soft-repulsive force field in design. see note below.
 -packing:linmem_ig 10                  optional but highly recommended. speeds up the sequence design step while at the same time reducing memory requirements.
 -packing:unboundrot <file vector>      optional. pdb files that contain additional rotamers to use in the packer. as opposed to ligand docking, for enzdes it doesn't matter whether the files given to this option also contain the ligand.
```

Sobre el uso del potencial de repulsión suave:

1) El potencial de repulsión suave de Rosetta es una función de energía en la que el término de repulsión de vdW se escala a distancias más cortas, es decir, la distancia de interacción óptima entre dos átomos es menor que en la función de energía normal. Usar este potencial durante el empaquetado de rotámeros introducirá leves choques en la estructura, ya que se seleccionarán combinaciones de rotámeros en las que los átomos están más cerca que la distancia vdw óptima. Por lo tanto, al usar el potencial de repulsión suave, cada paso de empaquetado debe ir seguido de una minimización basada en gradiente con el potencial normal para aliviar los choques.
 La razón por la que se usa esta estrategia es superar las limitaciones de la discretización conformacional que introduce la aproximación de rotámeros. Especialmente en cadenas laterales grandes con efectos de palanca de chi1 o chi2, pequeñas desviaciones en estos ángulos pueden producir desplazamientos notables en los átomos de la cadena lateral (0-1A). La resolución de la función de energía de Rosetta, igual que la de otras funciones de energía de modelado molecular, es lo bastante alta como para que estos pequeños desplazamientos puedan afectar de forma significativa a la puntuación de una conformación dada. Esto, a su vez, puede tener el efecto no deseado de que el algoritmo Monte Carlo rechace durante el empaquetado de rotámeros una conformación en la que los rotámeros estándar de Dunbrack chocan ligeramente pero en la que pequeños cambios en los chi conducirían a un empaquetado ajustado. En cambio, usar el potencial de repulsión suave tolerará pequeños choques, y la esperanza es que la minimización posterior pueda convertir una estructura con leves choques en una estructura muy bien empaquetada.

2) ADVERTENCIA: el último ciclo de diseño usará automáticamente el campo de fuerzas estándar, por lo que, cuando soft\_rep\_design esté activado, design\_min\_cycles debe ser mayor que 1. ¡Si design\_min\_cycles = 1, solo se ejecutará un ciclo sin soft\_rep, como si soft\_rep nunca se hubiera activado!

#### 4\.  Empaquetado de rotámeros/minimización sin restricciones con secuencia fija

Una vez que Rosetta ha diseñado una nueva secuencia, se hace un reempaquetado/minimización final sin las restricciones catalíticas. Esto sirve para comprobar si la secuencia diseñada realmente sostiene los residuos catalíticos en su conformación diseñada; es decir, en un buen diseño, los residuos catalíticos deben estar en una buena conformación sin restricciones artificiales que los mantengan allí.

Opciones de línea de comandos que afectan a esta etapa:
```
 -enzdes:no_unconstrained_repack           will prevent this stage from being invoked
 -packing:ex1                              same as for stage 3
 -packing:ex2                              same as for stage 3
 -packing:use_input_sc                     same as for stage 3
 -enzdes:cst_min                           same as for stage 3
 -enzdes:bb_min                            same as for stage 2+3
 -enzdes:chi_min                           same as for stage 2+3
```

y clasificación de los resultados
=======================

En un proyecto típico de diseño de enzimas, a menudo se diseñan cientos o miles de estructuras de entrada. Normalmente estas estructuras de entrada proceden de un matching y pueden ser muy parecidas entre sí (es decir, con pequeñas desviaciones en la colocación del ligando ). También se recomienda rediseñar cada estructura inicial varias veces, ya que el algoritmo estocástico Monte Carlo puede dar resultados ligeramente distintos cada vez.

La pregunta entonces es, después de haber producido cientos o miles de modelos de diseño, cuáles expresar finalmente; es decir, cómo analizar, puntuar y clasificar todas las estructuras producidas para encontrar el puñado de las mejores. No hay una forma perfecta o ideal de hacerlo, y en el párrafo siguiente se describe solo una de las muchas posibilidades.

Salidas esperadas
================

Este protocolo producirá -nstruct pdbs de salida para cada pdb de entrada y, si se solicita, un scorefile con una línea por cada pdb de salida. Al terminar con éxito una ejecución, se imprimirá el mensaje "Finished all [numstruct] structures in [numseconds] seconds."

####Evaluación de los resultados:
Cada archivo PDB que escribe Rosetta tiene las puntuaciones desglosadas por residuo y tipo de puntuación añadidas después de los registros de átomos. Se puede simplemente seleccionar el PDB que tenga la mejor puntuación global, o la mejor puntuación del ligando, o la mejor puntuación de restricciones, etc. Sin embargo, las puntuaciones de Rosetta no capturan necesariamente todas las características importantes de un diseño dado. La aplicación enzyme\_design está configurada para evaluar cada estructura de salida con respecto a las siguientes propiedades y métricas adicionales: -número de enlaces de hidrógeno (en toda la proteína y en los residuos catalíticos) -número de polares enterrados no satisfechos en los residuos catalíticos (toda la proteína/residuos catalíticos) -contactos no locales (es decir, contactos entre residuos que están lejos en la secuencia, tanto para toda la proteína como para los residuos catalíticos) -puntuación a través de la interfaz entre proteína y ligando -packstat de la estructura diseñada con y sin el ligando presente. Si la opción -out:file:o \<filename\> está activa, se escribirá un scorefile que contiene una línea por cada estructura de salida. Un ejemplo del formato de este scorefile está en el archivo enz\_score.out que produce la prueba de integración de enzdes. Las etiquetas de columna del scorefile tienen el siguiente significado:

####Sintaxis general:
pm = las etiquetas de columna que terminan en "\_pm" se determinan con una calculadora de métricas de Pose

Los residuos catalíticos o restringidos son SR1, SR2, SRN para N residuos. Por ejemplo, si solo hay un residuo catalítico, solo SR1. Ten en cuenta que, si el mismo residuo catalítico participa en varias interacciones (como en una tríada), aparecerá varias veces.

El ligando es el SR(N+1) y es el último SR; por ejemplo, si hay un residuo catalítico, es SR2.

* total\_score: energía (excluida la energía de restricciones)
* fa\_rep: energía repulsiva con todos los átomos
* hbond\_sc: energía de enlaces de hidrógeno de cadena lateral
* all\_cst: toda la energía de restricciones
* tot\_pstat\_pm: estadísticas de empaquetado, 0-1, 1 = completamente empaquetado
* total\_nlpstat\_pm: estadísticas de empaquetado sin el ligando presente
* tot\_burunsat\_pm: residuos polares enterrados no satisfechos; mayor = más polares enterrados no satisfechos (solo un recuento)
* tot\_hbond\_pm: número total de enlaces de hidrógeno
* tot\_NLconst\_pm: número total de contactos no locales ( dos residuos forman un contacto no local si están a más de 8 residuos de distancia en la secuencia pero interactúan con una puntuación de Rosetta inferior a -1.0 )

Para cada residuo catalítico y para el ligando hay un conjunto de columnas con el prefijo SR\_\<i\>\_. La primera columna, SR\_\<i\>, da la posición en la secuencia de SRN (p. ej., 176 significa el residuo 176). También están presentes las siguientes columnas: SR\_\<i\>\_total\_score, SR\_\<i\>\_fa\_rep, SR\_\<i\>\_hbond\_sc, SR\_\<i\>\_all\_cst, SR\_\<i\>\_hbond\_pm, SR\_\<i\>\_burunsat\_pm, SR\_\<i\>\_pstat\_pm, SR\_\<i\>\_nlpstat\_pm, que son las puntuaciones que tiene el residuo dado en estas categorías.

Para el ligando hay dos columnas adicionales. (El "1\_2" de los términos siguientes se refiere a las cadenas que se usaron para calcular las cifras, normalmente la primera cadena (proteína) y la segunda cadena (ligando). Si hay varias cadenas de proteína, o si el ligando no es la última cadena, estas cifras pueden no representar con exactitud las cifras totales de la unión.)

* SR\_\<N+1\>\_interf\_E\_1\_2: energía de interfaz entre el ligando y el resto de la proteína
* SR\_\<N+1\>\_dsasa\_1\_2: fracción del área superficial del ligando que queda cubierta por la proteína, es decir, una medida de lo bien enterrado que está el ligando.

Si la opción -enzdes:final\_repack\_without\_ligand está activa, la estructura generada se reempaquetará sin el ligando, para comprobar si estaría en una conformación distinta en el estado apo. En esta etapa se eliminan todas las restricciones. Aparecerán las siguientes columnas adicionales en el scorefile:

* nlr\_totrms: el rmsd CA-CB medio de los residuos que rodean el ligando entre el estado con ligando y el estado apo.
* nlr\_SR\<1-N\>\_rms: rmsd CA-CB de los residuos catalíticos entre el estado con ligando y el estado apo.

####Clasificación de los resultados:

Averiguar cuáles de los modelos, normalmente numerosos, se deben expresar no es trivial. Como se ha descrito arriba, si se usa la opción de scorefile, cada diseño se evalúa automáticamente respecto a unas cuantas docenas de criterios. Idealmente, se querría elegir solo uno o unos pocos diseños para expresar. Por lo tanto, los diseños deben clasificarse según algunos criterios. No hay una respuesta clara sobre cuáles deben ser esos criterios. Un enfoque que se usa actualmente en el grupo de Baker es el siguiente: primero se elige un subconjunto de los 4-5 criterios más importantes, es decir, total\_score, energía de unión del ligando/SR\_interface\_E\_1\_2, puntuación total de restricciones de los residuos catalíticos (all\_cst), packstat y polares enterrados no satisfechos del ligando. Después, para cada uno de estos criterios se decide un valor mínimo que deben superar todos los diseños considerados para su expresión ( es decir, total\_score debe ser menor que la puntuación de Rosetta correspondiente del andamiaje sin diseñar, ligand\_binding energy debe ser \< -10.0 y all\_cst debe ser \< 1.0 ). El script 'DesignSelect.pl' (en rosetta/main/source/src/apps/public/enzdes ) puede usarse entonces para recorrer el archivo de salida y seleccionar solo las estructuras que cumplan todos los criterios requeridos.

Para usar DesignSelect.pl se necesita un archivo de salida de Rosetta, así como un archivo que indique los requisitos necesarios. Por ejemplo, si el archivo de salida design.out contiene datos de varios diseños de Rosetta, para un sitio activo con 3 residuos de proteína (es decir, el ligando es el residuo 'catalítico' 4) y se quieren seleccionar solo los que tengan una energía de unión del ligando \< -10.0 y una puntuación de restricciones catalíticas \< 1.0, y luego clasificar los diseños seleccionados por puntuación total, hay que escribir un archivo de requisitos con las siguientes líneas:
```
req all_cst value < 1.0
req SR_4_interf_E_1_2 value < -10.0
output sortmin total_score
```

Después, ejecutar DesignSelect.pl con los argumentos:
```
 DesignSelect.pl -d design.out -c <requirements file> -tag_column last > filtered_designs.out
```

dará un archivo filtered\_designs.out que contiene solo los diseños deseados, ordenados por total\_score. La opción -tag\_column indica a los scripts cuál de las columnas contiene el nombre o la descripción de cada diseño. Puede tomar un número arbitrario o 'last' si la última columna del archivo -d contiene el nombre del diseño, como ocurre en los scorefiles de Rosetta.

Opciones de línea de comandos que afectan a esta etapa

```
-out:file:o                           will trigger writing of scorefile that has additional info about the design as described above.
-enzdes:no_packstat_calculation       will prevent the computationally intensive calculation of the packstat scores. This can be used in quick test calculations, where the packstat scores are not of interest.
-enzdes:final_repack_without_ligand   will trigger a repack of the structure without the ligand.
```

Limitaciones
===========

Como se ha mencionado, este código necesita un match como entrada, es decir, un pdb con sustrato y residuos catalíticos. No puede calcular teozimas ni encontrar colocaciones de teozimas en un andamiaje.

Modos
=====

Por ahora solo hay un modo, que se describe en este documento. En la próxima versión se añadirá un modo flexbb, que genera un pequeño conjunto localizado de las regiones de la cadena principal que rodean el sitio activo y considera estas distintas cadenas principales durante la etapa de diseño. Además, se está desarrollando un protocolo de remodelado de la cadena principal que permitirá cambios mayores en la cadena principal antes de la etapa de diseño. El marco general de estos modos adicionales será el mismo.

Archivos de entrada
===========

Archivos de entrada necesarios:

-   un archivo pdb que contenga un ligando; un archivo cst que describa la geometría catalítica. Nota: el código funcionará igual de bien sin el cstfile; en ese caso se diseñarán todos los residuos alrededor del ligando (es decir, para el diseño de receptores); opcionalmente, un resfile que declare qué residuos se diseñan y cuáles se reempaquetan; un archivo .params para el ligando y, opcionalmente, una biblioteca de rotámeros para el ligando.

-   se pueden encontrar ejemplos en el directorio de la prueba de integración de enzdes

Opciones
=======

Las opciones de línea de comandos relevantes se describieron en las secciones correspondientes.

Consejos
====

Novedades desde la última versión
=============================

Nueva función para evaluar diseños: la opción -final\_repack\_without\_ligand se ha añadido desde la última versión.

##Véase también

* [Tutorial de diseño de proteínas](https://www.rosettacommons.org/demos/latest/tutorials/protein_design/protein_design_tutorial)
* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
