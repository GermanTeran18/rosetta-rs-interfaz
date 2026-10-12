#RosettaRemodel

[[_TOC_]]

* Consulta también la documentación de [[Remodel]].

Metadatos
========

Este documento fue editado por última vez el 14 de enero de 2016 por Jared Adolf-Bryfgogle. El código fue escrito por Possu Huang y Andrew Ban. El investigador principal correspondiente es William Schief (schief@scripps.edu).

Puedes encontrar un tutorial introductorio de modelado de loops [aquí](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling).

Código y demostraciones
=======================

La aplicación remodel se inicia desde la aplicación en `       rosetta/main/source/src/apps/public/remodel.cc      ` . Esta aplicación usa clases de la biblioteca protocols, que se encuentra en el directorio `       rosetta/main/source/src/protocols/forge/remodel      ` .

# Referencias


Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de RosettaDesign:

-   [RosettaRemodel: A Generalized Framework for Flexible Backbone Protein Design.](http://www.ncbi.nlm.nih.gov/pubmed/21909381) Huang PS, Ban YE, Richter F, Andre I, Vernon R, Schief WR, Baker D. PLoS One. 2011;6(8):e24109. Epub 2011 Aug 31.

Propósito
=========

La aplicación remodel es una forma alternativa de usar las herramientas de modelado de loops de Rosetta, hecha a medida para el diseño. Los componentes básicos de la herramienta consisten en una etapa de construcción (a nivel de centroide) y una etapa de diseño. Generalmente hay una etapa de "diseño parcial" para dirigir la simulación a que cumpla los requisitos de empaquetado. Las instrucciones se dan mediante un archivo blueprint que contiene la descripción de la tarea, y cualquier otro archivo que haga falta (por ejemplo, un archivo de definición de restricciones o un PDB con un segmento de una estructura que se va a insertar en el PDB inicial).

Algoritmo
=========

Remodel opera en varias etapas. El protocolo comienza en la etapa de construcción, en la que lee el archivo blueprint (que se describe más abajo) que indica lo que se hará con la estructura de entrada. Un archivo blueprint consta de tres columnas:

```
1 N .
```

donde la primera columna es el número de residuo en el PDB inicial, la segunda columna es un código de una sola letra (normalmente de aminoácido) y la última columna especifica la instrucción de construcción. __Si reemplazas el "." por "E", "L", "H", "I" o "D", Remodel construirá residuos con estructura secundaria de hebra extendida, loop, hélice, insertada o aleatoria, respectivamente__. Esta notación controla la estructura secundaria que se usa al recolectar fragmentos de la base de datos de fragmentos (conocida como "vall"). Se puede generar un archivo blueprint por defecto ejecutando el siguiente comando:

```
rosetta/tools/remodel/getBlueprintFromCoords.pl -pdbfile [starting pdb] > [blueprint file]
```

A continuación se muestran algunos ejemplos de archivos blueprint y lo que harán con la estructura inicial.

Tareas básicas de remodelado
----------------------------

### Diseño de cadena principal fija

```
4 I . PIKAA A
5 L . ALLAA
6 N . POLAR
7 G .
```

Este blueprint realizará diseño en las posiciones 4, 5 y 6 y dejará fija la posición 7.

### Remodel (sin cambio de longitud)

```
4 I . PIKAA A
5 L H
6 N H
7 G .
```

Esto realizará diseño en la posición 4 y reconstruirá los residuos 5 y 6 usando fragmentos helicoidales.

### Extensión

```
4 I . PIKAA A
5 L H 
0 x H
0 x H
6 N H 
7 G . 
```

Inserta dos residuos entre los residuos 5 y 6, usando también fragmentos helicoidales. Las cadenas laterales de este segmento helicoidal recién construido se diseñarán automáticamente. Nota: debes permitir el remodelado de los residuos que flanquean la extensión. En este ejemplo, los residuos 5 y 6 deben remodelarse para que el protocolo funcione correctamente.

### Deleción

```
4 I . PIKAA A
5 L H ALLAA 
7 G H APOLAR
8 A .
```

Con solo eliminar una línea y dar asignaciones de construcción a las posiciones anterior y posterior a la deleción, se acortará el PDB y se reconectará (si es posible, dada la holgura de la estructura) el resto de la estructura. Puede ser necesario incluir más posiciones en la asignación de reconstrucción para asegurar que haya suficientes elementos que puedan moverse para reconectar la unión.

### Estructura de novo
#### Extensión del extremo C

```
1 A .
2 A .
0 X H
0 X H
0 X H
0 X H
```

Construye, a partir de un tallo (stub) de 2 aminoácidos (residuos 1 + 2), la estructura secundaria que desees. En el blueprint anterior se crea una hélice de 4 residuos y sus cadenas laterales se diseñan automáticamente. Aunque la segunda columna tiene alaninas, esto no afectará el diseño final. En el archivo blueprint, la segunda columna solo se usa para extensiones ("x") o si se desean fragmentos sesgados por secuencia (con la opción -remodel:use\_blueprint\_sequence). En este caso, todas las posiciones se diseñarán automáticamente porque no se hicieron asignaciones manuales de resfile para las posiciones. Si se hace una sola asignación manual de resfile, RosettaRemodel pasa al modo de diseño manual y a todas las posiciones que se están reconstruyendo se les deben dar especificaciones de resfile.

#### Extensión del extremo N
Se pueden anteponer extremos N, pero se debe dar "1" como número de residuo, ya que "0" produce un error. No estoy seguro de que los desarrolladores de remodel respalden al 100% este enfoque, pero funciona. Aquí se permite que el extremo N original sea flexible, pero esto también puede funcionar sin ese ajuste (1 V . en lugar de 1 V L PIKAA V).

```
1 x L PIKAA A
1 x L PIKAA P
1 x L PIKAA Q
1 x L PIKAA V
1 V L PIKAA V
2 D .
3 K .
4 V .
```

Diseño de disulfuros
--------------------

Remodel se puede usar para diseñar disulfuros con la opción "-remodel:build\_disulf". El protocolo está pensado para reconstruir (mediante cambios en la cadena principal) regiones de una estructura de modo que se pueda formar un buen disulfuro con otro residuo de la región que no se está remodelando. Intentará construir y buscar todos los posibles disulfuros entre la región de construcción y el rango de "aterrizaje" (pero no dentro de la región de construcción). La región de construcción se asigna en el archivo blueprint (especificando una o más posiciones que se van a remodelar) y, por defecto, el rango de aterrizaje son todas las posiciones no remodeladas. Se puede especificar un rango de aterrizaje personalizado con la opción "-remodel:disulf\_landing\_range". Remodel seguirá ejecutándose hasta que logre construir un buen disulfuro (según sus criterios de puntuación). Si se le pide a Remodel que encuentre disulfuros en una estructura de entrada y no es posible ningún buen disulfuro, se producirá un bucle infinito. Asegúrate de supervisar las ejecuciones de búsqueda de disulfuros para terminarlas manualmente si es necesario.

Nota: el protocolo NO está pensado para explorar una estructura de cadena principal fija en busca de todos los pares de posiciones que podrían formar un disulfuro, pero se puede usar para hacer algo cercano a eso. Con la opción "-remodel:bypass\_fragments" no se hará ningún cambio en la cadena principal de la región de construcción y el protocolo buscará buenos disulfuros entre los residuos de la región de construcción y los residuos de aterrizaje. También se puede usar otra aplicación de Rosetta, 'design\_disulfide', para buscar todos los posibles pares de posiciones adecuados para un disulfuro en una estructura dada.

En la salida del log de Remodel habrá líneas como las siguientes:

```
protocols.forge.remodel.RemodelDesignMover: DISULF possible 22.8416
protocols.forge.remodel.RemodelDesignMover: DISULF 30x5
protocols.forge.remodel.RemodelDesignMover: match_rt 1.04513
```

Estas líneas te indican la calidad del enlace disulfuro. La primera es la distancia CA al cuadrado; solo las evalúa si están a menos de 5 A. La segunda indica que es entre los residuos 30 y 5, y la tercera línea indica cuánto se diferencia este par del disulfuro más cercano de la base de datos. Se puede ajustar más el valor de match\_rt\_limit para obtener "mejores" disulfuros, pero esto corre el riesgo de que no se pueda construir ninguno. En el potencial de disulfuros de Rob, este ajuste corresponde a una medida de RMSD entre tu cadena principal y un disulfuro real de la base de datos. Los disulfuros de la base de datos se recolectan con estructuras idealizadas, por lo que la precisión no es subangstrom. Alrededor de 1A es bastante bueno.

Se recomienda mucho usar el esquema de refinamiento pose relax para refinar disulfuros (incluyendo la opción "-remodel:use\_pose\_relax true" en la línea de comandos).

Diseño de disulfuros (automático)

```
1 M .
2 A .
3 R .
4 I .
5 L L
6 N L
7 G L
8 E .
9 T .
10 Y .
```

Intenta encontrar disulfuros con un umbral de puntuación respecto a disulfuros observados estructuralmente ("-remodel:match\_rt\_limit", por defecto 0.4) entre los residuos de construcción 5, 6 y 7 y los residuos no remodelados 1, 2, 3, 4, 8, 9 y 10, remodelando los residuos 5, 6 y 7 con fragmentos de loop. El "rango de aterrizaje" por defecto son todos los residuos no remodelados, pero se puede especificar una región concreta con la opción -remodel:disulf\_landing\_range.

Diseño de disulfuros (región limitada)

```
4 I .
5 L L
6 N L
7 G L
8 E .
...
88 K . DS_start
89 N .
90 E . DS_stop
```

Encuentra disulfuros entre los residuos de construcción 5, 6, 7 y los residuos de aterrizaje 88, 89 y 90. Se puede obtener este mismo comportamiento usando el archivo blueprint del ejemplo anterior con la opción -remodel:disulf\_landing\_range 88-90.

Diseño de disulfuros (par específico)

```
4 I .
5 L L DM_start DM_stop
6 N L
7 G L
8 E .
...
88 K . DS_start DS_stop
89 N .
```

Construye un disulfuro entre los residuos 5 y 88, si es posible. Si no es posible, Remodel se ejecutará en un bucle infinito.

Inserción de dominios
---------------------

Remodel también se puede usar para insertar dominios. Se debe especificar un archivo PDB que contenga los residuos que se van a insertar con la opción ```-remodel:domainFusion:insert_segment_from_pdb```. El archivo PDB que contiene el segmento que se va a insertar no necesita estar renumerado.

Nota: es necesario permitir que los residuos que flanquean la inserción se remodelen; de lo contrario, se producirán errores. Las identidades de estas posiciones se pueden fijar a sus tipos nativos (como en el ejemplo siguiente), pero sus cadenas principales deben poder remodelarse para acomodar el segmento insertado. Según la longitud de la inserción, puede que haya que remodelar más de un residuo a cada lado del segmento insertado para que el cierre del loop tenga éxito. En otras palabras, si solo se permite remodelar un residuo a cada lado de la inserción, puede que Remodel no logre "plegar" el segmento insertado de forma que la cadena se pueda conectar. El protocolo seguirá intentándolo indefinidamente hasta que se encuentre una solución de "loop cerrado" o hasta que el proceso se termine manualmente.

```
4 I .
5 L L PIKAA L
0 x I NATAA
0 x I NATAA
0 x I NATAA
0 x I NATAA
6 N L PIKAA L
7 G .
```

Inserta el segmento de 4 residuos contenido en el archivo especificado con la opción -remodel:domainFusion:insert\_segment\_from\_pdb entre los residuos 5 y 6, y remodela los residuos 5 y 6 para acomodar la secuencia insertada. En este ejemplo, Remodel conservará las identidades de los aminoácidos del segmento insertado gracias a las especificaciones NATAA de la cuarta columna. De igual modo, Remodel conservará las identidades de los aminoácidos que flanquean el segmento insertado.

Esquema especial de configuración de enlazadores de par

Me han pedido recientemente que proporcione una configuración en la que se puedan construir varios enlazadores simultáneamente en dos cadenas distintas. Más concretamente, para una configuración de tipo ensamblaje de dominios en la que una interfaz de dímero se mantiene constante mientras se enlazan dos dominios adicionales a cada una de las parejas de unión. Este caso especial requiere que Remodel reconozca que la Pose de entrada consta de dos cadenas y permite la inserción de fragmentos sin mantener un salto a lo largo del segmento. Para lograrlo, usa dos opciones: el PDB inicial ya contiene todos los dominios; ahora solo hay que construir enlazadores para ensamblarlos en una configuración plausible.

```
-remodel:two_chain_tree [start of the second chain]  
-remodel:no_jumps
```

Docking con anclaje (tethered)

Se puede reconstruir un segmento de la estructura sin restringirlo a criterios de cierre. Esto es útil para cosas como acoplar una hélice a una cadena principal, y se puede construir una nueva conexión una vez que la hélice esté en su sitio. Normalmente solo se necesita "-remodel:bypass\_closure", y se introducirá un corte en el extremo C del rango de asignación del blueprint, pero se puede cambiar al extremo N si la hélice, o cualquier estructura, necesita construirse hacia atrás. Se recomienda usarlo solo cuando se reconstruye un único segmento.

```
-remodel:RemodelLoopMover:bypass_closure
-remodel:RemodelLoopMover:force_cutting_N
```

Remodel con restricciones
-------------------------

Remodel usa la configuración de restricciones del protocolo de diseño de enzimas ("EnzDes"), porque separa la definición de las posiciones de los residuos de las restricciones que se les van a aplicar. Esta configuración permite que el blueprint sirva también como archivo de definición de posiciones de restricciones y que todas las extensiones y deleciones se manejen con elegancia. Ten en cuenta que la restricción de construcción definida aquí solo se usará en la etapa de centroide.

Para configurar restricciones de construcción hay que hacer dos cosas. Primero, se debe crear un archivo de texto de definición de restricciones, siguiendo el [[formato de restricciones de enzdes|match-cstfile-format]] . Ten en cuenta que los átomos de la cadena principal necesitan una declaración manual adicional de "is\_backbone"; de lo contrario no se aplicarán en la etapa de construcción. Además, los campos [[atom_type|Rosetta-AtomTypes]] esperan tipos de átomo de Rosetta.

```
  CST::BEGIN
    TEMPLATE::   ATOM_MAP: 1 atom_type: Nbb
    TEMPLATE::   ATOM_MAP: 1 is_backbone
    TEMPLATE::   ATOM_MAP: 1 residue3: ALA CYS ASP GLU PHE GLY HIS ILE LYS LEU MET ASN PRO GLN ARG SER THR VAL TRP TYR
  
    TEMPLATE::   ATOM_MAP: 2 atom_type: OCbb
    TEMPLATE::   ATOM_MAP: 2 is_backbone
    TEMPLATE::   ATOM_MAP: 2 residue3: ALA CYS ASP GLU PHE GLY HIS ILE LYS LEU MET ASN PRO GLN ARG SER THR VAL TRP TYR
  
    CONSTRAINT:: distanceAB:    2.80   0.20 100.00  0
  CST::END
```

Este bloque describe una configuración de restricción entre un átomo de nitrógeno de la cadena principal y un átomo de oxígeno de la cadena principal para que queden a una distancia de enlace de hidrógeno (2.8 Ãƒ). La etiqueta residue3 lista todos los tipos de aminoácidos, de modo que cuando se aplica la restricción simplemente se ignora la identidad del aminoácido. En su lugar se puede usar un código de una sola letra si se usa "residue1".

Notas sobre la especificación del archivo cst: la designación [[atom_type|Rosetta-AtomTypes]] requiere un solo nombre, y la conectividad se buscará automáticamente en el archivo params del residuo. Pero si se usa "atom\_name", habría que especificar explícitamente tres átomos para que las torsiones y los ángulos se puedan establecer correctamente. Por ejemplo:

```
ATOM_MAP: 1
atom_name N CA C
```

y

```
ATOM_MAP: 2
atom_type Obb
```

dada una restricción TORSION\_A, restringirá la torsión entre O-N-CA-C.

Los términos que se pueden usar son los siguientes: distanceAB, torsion\_A, torsion\_B, torsion\_AB, angle\_A, angle\_B:

La asignación ATOM\_MAP residue1 (o residue3) debe coincidir con el tipo de átomos que definen. En el ejemplo anterior se puede aplicar una restricción de cadena principal a todos los tipos de aminoácidos, por lo que se listan los 20 aminoácidos. Pero si se requiere una restricción de cadena lateral, asegúrate de usar solo los residuos que puedan satisfacer esas descripciones (por ejemplo, el átomo NE2 solo existe en GLN).

Lo segundo que hay que hacer para configurar las restricciones de construcción es etiquetar en el archivo blueprint las posiciones que corresponden a los residuos definidos en el archivo de restricciones.

```
  10 K .
  11 T .
  12 L . CST1A
  13 K .
  14 G H
  15 E H
  16 T H
  17 T H CST1B
  18 T H
```

En este ejemplo, el átomo Nbb de la posición 12 tendrá una restricción de enlace de hidrógeno con el átomo OCbb de la posición 17. El residuo etiquetado como "A" corresponde a "Atom Map: 1" en el bloque de definición de restricciones, y "B" corresponde a "Atom Map: 2" (por desgracia, esta conversión entre A, B y 1, 2 es necesaria para que el número de restricciones no esté limitado a 26, A...Z. Si tienes más de una restricción que configurar para cada posición, simplemente continúa con la definición (pero asegúrate de duplicar la entrada CST en el archivo de restricciones; cada bloque corresponde a CST1A/B, CST2A/B, ..., etc.).

```
  10 K .
  11 T .
  12 L . CST1A CST2B
  13 K .
  14 G H
  15 E H CST2A
  16 T H
  17 T H CST1B
  18 T H
```

En este segundo caso, el Nbb y el OCbb de la posición 12 están restringidos con el OCbb de la posición 15 y el Nbb de la posición 17, respectivamente.

Una vez que las restricciones y los archivos blueprint estén etiquetados correctamente, para usarlos simplemente agrega "-enzdes:cstfile [constraint file name]" a la línea de comandos.

```
4 I . PIKAA A CST1A
5 L H ALLAA
6 N H POLAR CST1B
7 A .
```

Reconstruye los residuos 5 y 6 con fragmentos helicoidales y aplica restricciones entre los residuos 4 y 6 en el proceso de construcción, seguido de protocolos de diseño manual. La geometría deseada del par restringido se especifica en el archivo de restricciones aparte.

Filtros de restricciones

Al ejecutar una construcción con definición de restricciones, Remodel usa automáticamente un filtro de restricciones y solo genera decoys que satisfacen tus restricciones, dentro de 10 unidades de energía. La rigurosidad se puede ajustar cambiando los pesos del término de restricción; por ejemplo, en el cstfile definido a continuación

```
    CONSTRAINT:: distanceAB:    2.80   0.30 100.00  0
```

se define un peso de restricción de 100.00. En la práctica, cualquier violación de esta restricción de distancia será mayor que las 10 unidades de energía permitidas. Para suavizar este filtro, simplemente se puede cambiar la línea:

```
    CONSTRAINT:: distanceAB:    2.80   0.30   1.00  0
```

el cambio en el peso de la restricción da, en la práctica, 1/100 de la penalización. Después de cada ronda de construcción, el log indicará cuál es la violación de atom\_pair y el usuario podrá ajustar el peso según ella.

Usos avanzados
==============

Diseño
------

Hay distintas etapas para diseñar una estructura recién construida. En una etapa de acumulación (la "estructura parcial"), Remodel cuenta vecinos para identificar qué residuos están enterrados y en esta etapa solo usa las posiciones enterradas. Hay 6 modos de diseño distintos. La decisión entre ellos depende de si se añade una cuarta columna al blueprint y de dos opciones adicionales:

Si no hay ninguna asignación de comando de resfile en la cuarta columna (salvo asignaciones CST), Remodel usa diseño automático. El diseño automático elegirá automáticamente las posiciones del núcleo y usará solo aminoácidos hidrofóbicos. Para controlar si los residuos vecinos se incluyen, se reempaquetan o se rediseñan, usa las siguientes opciones:

-find\_neighbors solo reempaquetará todos los vecinos, tanto en modo automático como manual; de lo contrario, solo se rediseñarán las posiciones reconstruidas descritas en el archivo blueprint.
 -find\_neighbors -design\_neighbors rediseñará todos los vecinos.

Para el diseño manual, el archivo blueprint también maneja el diseño de posiciones mediante comandos de resfile, por lo que se puede especificar:

```
  1 N .
  2 K H PIKAA K
  0 x H ALLAA
  0 x H APOLAR
  3 G H ALLAA
  4 W .
  5 K .
```

Si usas el modo manual, se recomienda asignar todas las posiciones incluidas en el segmento de reconstrucción (pero no necesariamente en otros lugares); de lo contrario se convertirán en valinas (el residuo por defecto que se construye durante la fase de centroide). Sin embargo, esta asignación no se limita a los residuos que se van a reconstruir. Funciona igual que un resfile: puedes cambiar cualquier residuo sobre la marcha.

Además, también se deben incluir las opciones normales de diseño, como -ex1 -ex2, para controlar este comportamiento de diseño.

Confirmación con KIC
--------------------

[Esta función está por probar]

 Tras construir la estructura con CCD\_refinement, todavía no se sabe cuál sería la mejor secuencia para producir experimentalmente. Una función nueva consiste en comprobar esas secciones con un método ortogonal; si los resultados convergen, hay una mayor probabilidad de que el loop sea plausible. Actualmente usamos CCD para construir y KIC para el paso de refinamiento. Si se emite "-remodel:run\_confirmation", las estructuras generadas por CCD se probarán en un paso de refinamiento con KIC usando las secuencias diseñadas en el paso de CCD. La región de construcción se ampliará en 2 residuos (para reducir el sesgo) a ambos lados, y todo el segmento se reconstruirá con el protocolo KIC\_refine. La etapa de confirmación está configurada actualmente como una comprobación de evaluación y no como un filtro, así que las estructuras que no superen la prueba se producirán igualmente. El RMSD de los átomos CA del loop respecto a la estructura refinada con CCD se informará tanto en el archivo de log como en la sección REMARKs (si se activa "-preserve\_header true"). Se pueden filtrar posteriormente las estructuras según esta información.

También se pueden intercambiar los métodos para construir con KIC y refinar con CCD mediante "-swap\_refine\_confirm\_protocols".

Agrupamiento
------------

Al especificar -remodel:num\_trajectory, Remodel puede tomar decisiones sobre el paso de refinamiento seleccionando solo las estructuras únicas que puntúan bien al salir de la etapa de diseño parcial. Recopila todas las estructuras, las agrupa y solo usa los modelos de menor energía (que presumiblemente tienen los mejores contactos en el núcleo) para realizar el refinamiento de todos los átomos. Por defecto no se realiza agrupamiento.

```
-use_clusters false <= this will ask the program to refine all the structures generated at centroid level.
```

Esta función se puede activar con

```
-use_clusters true
```

Pero asegúrate de fijar un número de trayectorias mayor que uno. Una sola estructura no puede formar un clúster y Remodel no generará ninguna salida.

Si se usa la estrategia de agrupamiento, se puede usar "-cluster\_radius [real number]" para fijar cuán distintos deben verse los clústeres.

Puntos de control
-----------------

Remodel tiene su propio esquema de puntos de control (checkpointing), en el que las estructuras se escriben en disco y se pueden reintroducir en el programa cuando el proceso se reinicia, como cuando un trabajo es desalojado de un clúster pero se reinicia más tarde.

Los puntos de control se pueden activar con la opción: "-checkpoint".

Los puntos de control están relacionados con la opción "-save\_top [number]", ya que el punto de control recupera el mismo número de estructuras escritas por -save\_top. (Si tu primera pasada del protocolo no generó el número de estructuras especificado en -save\_top, solo se recuperarán las generadas.) Este esquema solo se usa para asegurar que las mejores estructuras de una simulación no se pierdan cuando un proceso se termina. También generará un archivo de texto que marca el número de trayectorias ya terminadas, de modo que se retoma desde donde se dejaron las num\_trajectories, por así decirlo.

## Predicción simulada (mock prediction; aún no disponible)


Aunque no tiene todos los extras para realizar una predicción exhaustiva cuando se conoce una secuencia, el protocolo Remodel se puede usar para ejecutar una "predicción simulada" en la que se dan las secuencias de aminoácidos y solo se quiere predecir su estructura final usando fragmentos sesgados por secuencia (todavía genéricos o asignados a mano, y sin predicción de estructura secundaria a partir de un alineamiento múltiple de secuencias) y confiando en gran medida en el refinamiento de todos los átomos para obtener una estructura para una secuencia conocida. En este caso, se activaría "-mock\_prediction", que reemplaza la función de puntuación de diseño por la (score4L) usada para tareas generales de predicción de loops. También se debe usar "-remodel:use\_blueprint\_sequence", de modo que los fragmentos elegidos de la base de datos vall se sesguen hacia las secuencias conocidas. Pero al hacerlo, asegúrate de asignar en la *SEGUNDA* columna del archivo blueprint los aminoácidos de tu secuencia objetivo, y usa PIKAA para forzar manualmente que los aminoácidos finales usados en el refinamiento coincidan con la secuencia necesaria para una estructura predicha.

# Limitaciones


Una limitación importante del protocolo Remodel es que los archivos PDB de entrada deben estar numerados a partir de 1. Se puede crear un PDB numerado a partir de 1 con la aplicación fixbb usando la opción -renumber\_pdb y un resfile que tenga NATRO como comportamiento por defecto.

Si un PDB inicial tiene varias cadenas, Remodel trabaja con la primera cadena.  Usa la opción "-chain " seguida del nombre de la cadena (p. ej. A) para indicar la cadena objetivo. Las demás partes pueden conservar su designador de cadena y el protocolo no las tocará; permanecerán presentes durante toda la simulación. Ten en cuenta que, por el momento, siempre se debe usar el campo -chain, incluso si el modelo o el modelo objetivo tiene una sola cadena.  Si hay ADN, se considerará en la puntuación pero no se moverá durante la ejecución. Además, si tienes algo distinto de proteína, el agrupamiento por átomos CA no funcionará, por lo que se debe desactivar el agrupamiento agregando "-use\_clusters false" a la línea de comandos.

# Archivos de entrada

### Estructuras - OBLIGATORIO


Siempre se debe dar al menos un archivo PDB de entrada. En la línea de comandos se debe especificar un solo PDB o una lista de PDB. Si se hace diseño de novo, este es el PDB del tallo (stub). El código de remodel también es compatible con PDB que contienen ADN.
> El archivo PDB debe estar numerado consecutivamente, empezando en 1

```
-s <pdb1> <pdb2>                                              A list of one or more PDBs to run fixbb upon
-l <listfile>                                                 A file that lists one or more PDBs to run fixbb upon, one PDB per line
-run::chain <letter>                                          Chain id of the chain to remodel

```

### Ubicación de la base de datos - OBLIGATORIO


```
-database <path/to/rosetta/main/database>                  Specifies the location of the rosetta_database
```

### Blueprint - OBLIGATORIO


```
-remodel:blueprint <blueprint>                                A file that specifies what operations should be performed to the input structure(s)
```

# Opciones


Opciones de Remodel
-------------------

```
-remodel::num_trajectory <int>                                 the number of centroid level sampling trajectories to run (default: 10)
-remodel::dr_cycles <int>                                      number of design/refine cycles to run (default: 3)

-remodel::quick_and_dirty                                      only do fragment sampling; bypass refinement of final structures which is slow. useful in early stages of design when one wants to sample different 
                                                               loop lengths to find appropriate setup (default: false)
-remodel::bypass_fragments                                     skip creation of fragments for remodelling; do refinement only. no extensions or deletions are honored in the blueprint (default: false)
-remodel::use_blueprint_sequence                               find fragments which have the same amino acid sequence and secondary structure as what is specified in the second column of the blueprint file (default: false)
-remodel::use_same_length_fragments                            harvest fragments that match the length of the segment being rebuilt (default: true)

-remodel::build_disulf                                         use Remodel to find residue pairs - between the "build" and "landing" residues - which would make good disulfide bonds (default: false)
-remodel::match_rt_limit <float>                               the score cutoff to use for determining how closely a potential disulfide must match observed disulfide distributions (default: 0.4)
-remodel::disulf_landing_range <range>                         the range within which remodel attempts to find disulfides for positions in the "build" region (default: none)

-remodel::use_pose_relax                                       add fast relax to the refinement stage (instead of the default minimization step), but use constraints in a similar way (default: false)
-remodel::run_confirmation                                     run kinemtic loop closure on the rebuild segments to see how well they match to what was build with CCD (default: false)
-remodel::swap_refine_confirm_protocols                        swap protocols used for refinement and confirmation test; i.e. use kinematic loop closure instead of CCD closure (default: false)
-remodel::repeat_structure                                     build identical repeats this many times (default: 1)

-symmetry::symmetry_definition                                 text file describing symmetry setup (default: none)

-enzdes::cstfile <constraint file>                             use constraints specified in given file during remodelling
-remodel::cstfilter                                            threshold to put on the atom_pair_constraint score type filter during the centroid build phase refinement (default: 10)

-remodel::domainFusion:insert_segment_from_pdb <segment.pdb>   segment PDB file to be inserted into the input structure
```

```
-remodel::checkpoint                                           turns on checkpointing, for use in preemptive scheduling environments. writes out the best pdbs collected after each design step. (default: false)
-remodel::save_top <int>                                       the number of structures to be processed in accumulators/clusters (default: 5)

-remodel::no_jumps                                             will setup simple foldtree and fold through it during centroid build (default: false)
-remodel::use_clusters                                         specifies whether to perform clustering during structure aggregation (default: false)

-remodel::core_cutoff <int>                                    number of neighbors required to consider core in auto design (default: 15)
-remodel::boundary_cutoff <int>                                number of neighbors required to consider boundary in auto design (default: 10)

-remodel::generic_aa <letter>                                  residue type to use as placeholder during centroid phase (default: V)
-remodel::cen_sfxn                                             score function to be used for centroid phase building (default: remodel_cen)
-remodel::cen_minimize                                         centroid minimization after fragment building (default: false)

-remodel::two_chain_tree                                       label the start of the second chain (default: none)
-remodel::repeat_structure                                     build identical repeats this many times (default: 1)

-remodel::lh_ex_limit                                          loophashing neighboring bin expansion limit (default: 5)
-remodel::lh_filter_string                                     loophash ABEGO filter target fragment type. list sequentially for each loop. (default: none)
-remodel::lh_cbreak_selection                                  loophash with cbreak dominant weight (default: 10)
-remodel::lh_closure_filter                                    filter for close rms when bypass_closure is used (default: false)
```

```
-remodel::design::no_design                                            skips all design steps. WARNING: will only output centroid level structures and dump all fragment tries (default: false)
-remodel::silent                                               dumps all structures by silent-mode WARNING: will work only during no_design protocol (see -no_design) (default: false)
-remodel::allow_rare_aro_chi                                   allow all aromatic rotamers, not issuing AroChi2 filter (default: false)
-remodel::skip_partial                                         skip design stage that operate only on burial positions (default: false)
-remodel::design_neighbors                                     during automatic design mode, design neighbors (default: false)
-remodel::find_neighbors                                       during automatic design mode, find neighbors for design/repack (default: false)

-remodel::RemodelLoopMover::max_linear_chainbreak              if linear chainbreak is <= this value, loop is considered closed (default: 0.07)
-remodel::RemodelLoopMover::randomize_loops                    randomize loops prior to running main protocol (default: true)
-remodel::RemodelLoopMover::allowed_closure_attempts           the allowed number of overall closure attempts (default: 1)
-remodel::RemodelLoopMover::use_loop_hash                      centroid build with loop hash (default: false)
-remodel::RemodelLoopMover::loophash_cycles                    the number of loophash closure cycles to perform (default: 8)
-remodel::RemodelLoopMover::simultaneous_cycles                the number of simultaneous closure cycles to perform (default: 2)
-remodel::RemodelLoopMover::independent_cycles                 the number of independent closure cycles to perform (default: 8)
-remodel::RemodelLoopMover::boost_closure_cycles               the maximum number of possible lockdown closure cycles to perform (default: 30)
-remodel::RemodelLoopMover::force_cutting_N                    force a cutpoint at N-term side of blueprint assignment (default: false)
-remodel::RemodelLoopMover::bypass_closure                     skip the loop closure check during the centroid phase; sets linear_chainbreak term weight to zero. for tethered docking purpose (default: false)
-remodel::RemodelLoopMover::cyclic_peptide                     circularize structure joining N and C-term (default: false)
-remodel::RemodelLoopMover::temperature                        temperature for monte carlo (default: 2.0)

-run:show_simulation_in_pymol                                  show the trajectory in PyMOL (every X seconds) (default: 0)

-vall <fragment_database_file>                                 database file of fragments. e.g. vall.dat.2006-05-05"
```

Remodel permite cambiar entre distintos constructores, pero por defecto se usa RemodelLoopMover como protocolo constructor. Es ligeramente distinto de los otros constructores porque no presupone conocimiento de los tipos de aminoácidos a nivel de centroide. Para puntuar las estructuras a nivel de centroide solo se usan "vdw", "rama" y "rg". Como la identidad de un aminoácido no se conoce hasta que se construye la cadena principal, se usan centroides de VALINA como tipo de aminoácido genérico, a modo de marcador de posición para el volumen de la cadena lateral. Esta asignación se puede cambiar con la opción "-generic\_aa A", que cambia el aminoácido genérico a ALANINA. Para distintos tipos de tareas de construcción (como construir hélices u hojas), también conviene activar las opciones relevantes de estructura secundaria para activar su puntuación durante la fase de modo centroide.

Para hélices:

```
-remodel:hb_srbb 1.0                                          turn on short-range backbone-backbone hydrogen bond term during centroid scoring (default: 0.0)
```

Para hojas:

```
-remodel:hb_lrbb 1.0                                          turn on long-range backbone-backbone hydrogen bond term during centroid scoring (default: 0.0)
-remodel:rsigma 1.0                                           turn on rsigma scoring term during centroid scoring (default: 0.0)
-remodel:ss_pair 1.0                                          turn on secondary structure pair term during centroid scoring (default: 0.0)
```

Otros pesos de la función de puntuación de centroide:

```
-remodel:vdw                                                  change weight for centroid vdw energy (default: 1.0)
-remodel:rama                                                 change weight for centroid rama energy (default: 0.1)
-remodel:cbeta                                                turn on cbeta term during centroid scoring (default: 0.0)
-remodel:cenpack                                              turn on cenpack term during centroid scoring (default: 0.0)
-remodel:rg                                                   turn on rg term during centroid scoring (default: 0.0)
```

Los valores de los pesos se pueden ajustar libremente. Pero las puntuaciones solo se usan si el peso es distinto de cero.

Rotámeros
---------

```
-ex1                                                          Increase chi1 rotamer sampling for buried* residues +/- 1 standard deviation - RECOMMENDED
-ex2                                                          Increase chi2 rotamer sampling for buried* residues +/- 1 standard deviation - RECOMMENDED
-ex3                                                          Increase chi3 rotamer sampling for buried* residues +/- 1 standard deviation
-ex4                                                          Increase chi4 rotamer sampling for buried* residues +/- 1 standard deviation

-ex1:level <int>                                              Increase chi1 sampling for buried* residues to the given sampling level***
-ex2:level <int>                                              Increase chi1 sampling for buried* residues to the given sampling level
-ex3:level <int>                                              Increase chi1 sampling for buried* residues to the given sampling level
-ex4:level <int>                                              Increase chi1 sampling for buried* residues to the given sampling level

-extrachi_cutoff <int>                                        Set the number of Cbeta neighbors (counting its own) at which a residue is considered buried.
                                                              A value of "1" will mean that all residues are considered buried for the purpose of rotamer building.
                                                              Use this option when you want to use extra rotamers for less buried positions.

-use_input_sc                                                 Include the side chain from the input PDB.  Default: false
                                                              Including the input sidechain is "cheating" if your goal is to measure sequence recovery,
                                                              but a good idea if your goal is to eventually synthesize the designed sequence
```

\* Los residuos enterrados son aquellos con \>= un umbral (por defecto: 18) de vecinos a menos de 10 Angstroms (distancia Cbeta). Este umbral se puede controlar con la opción -extrachi\_cutoff.

\*\* Los residuos aromáticos son HIS, TYR, TRP y PHE. Nota: incluir -ex1 y -ex1\_aro a la vez no aumenta el muestreo de los residuos aromáticos más que incluir solo la opción -ex1. Sin embargo, si se incluyen en la línea de comandos tanto -ex1 como -ex1\_aro:level 4, los residuos aromáticos tendrán más muestras de rotámeros chi1 que los no aromáticos. Ten en cuenta también que -ex1\_aro *solo puede aumentar* el muestreo de los residuos aromáticos por encima del de los no aromáticos. -ex1:level 4 y -ex1\_aro:level 1 juntos tienen el mismo efecto que -ex1:level 4 solo.

Función de energía
------------------

```
-packing:soft_rep_design                                      use soft_rep_design energy function weights which linearize vdW repulsive energy
```

Otras opciones
--------------

```
-overwrite                                                    Overwrite the output files, if they already exist. Not used by default.

-min_type <string>                                            When combined with the -minimize_sidechains flag, specifies the line-search algorithm to use in the
                                                              gradient-based minimization . "dfpmin" by default dfpmin_armijo_nonmonotone recommended.
```

Consejos
========

-   Se recomiendan las opciones -ex1 y -ex2 para obtener estructuras de salida bien empaquetadas.
-   Un resfile de dos líneas, en el que la primera línea es "NATAA" y la segunda es "start", basta para decir "solo reempaqueta la secuencia de entrada". Esto optimiza solo los rotámeros de las cadenas laterales de las estructuras de entrada y deja la secuencia igual.
-   Si estás rediseñando con muchos rotámeros (\>6K), usar el grafo de interacción de memoria lineal ahorrará tiempo y memoria. Agrega la opción "-linmem\_ig 10" para activar el grafo de interacción de memoria lineal.

Ejemplos de líneas de comandos
==============================

Los archivos de entrada de todos estos ejemplos se encuentran en la carpeta de pruebas de integración de RosettaRemodel, `       rosetta/main/tests/integration/tests/remodel/      ` .

```
rosetta/main/source/bin/remodel.macosgccrelease -database rosetta/main/database/ -s 2ci2.renumbered.pdb -remodel:blueprint blueprint.2ci2.remodel -run:chain A -remodel:num_trajectory 2 -remodel:quick_and_dirty -overwrite
```

```
blueprint.2ci2.remodel (excerpt):
36 G .
37 T L
38 I L
39 V L
40 T L
41 M L
42 E L
43 Y L
44 R L
45 I .
```

Usa Remodel para muestrear conformaciones alternativas de la cadena principal (y cambiar la identidad) de los residuos de loop 37-44, pero con el modo quick\_and\_dirty (que desactiva el cierre de loops con CCD y acorta considerablemente el tiempo de ejecución). Para mantener fija la identidad de los residuos, se debe agregar la asignación de resfile PIKAA X al final de la línea de cada uno de los residuos que se están remodelando.

```
rosetta/main/source/bin/remodel.macosgccrelease -database rosetta/main/database/ -s 2ci2.renumbered.pdb -remodel:blueprint blueprint.2ci2.disulfides -remodel:build_disulf -remodel:match_rt_limit 6.0 
-remodel:disulf_landing_range 1 65 -remodel:bypass_fragments -remodel:use_clusters false -no_optH false -remodel:num_trajectory 1 -remodel:save_top 5 -remodel:use_pose_relax true -correct -overwrite 
-mute core.pack > log
```

Usa Remodel para encontrar disulfuros en el PDB 2ci2.renumbered.pdb entre los residuos 7-14 y el resto de la proteína, con una coincidencia de puntuación de 6.0 o menos respecto a las distribuciones de distancia de disulfuros observadas, generando como máximo 5 posibles estructuras con disulfuros. Las estructuras de salida habrán sido relajadas con Rosetta FastRelax, por lo que tendrán pequeñas desviaciones respecto a la estructura inicial. Sin embargo, como está presente la opción "-remodel:bypass\_fragments", no se harán grandes cambios en la cadena principal de los residuos remodelados. La opción -remodel:disulf\_landing\_range 1 65 no es necesaria; Remodel determinará el rango de aterrizaje a partir del archivo blueprint si no se especifica en la línea de comandos.

NOTA: En este caso num\_trajectory es 1, pero hemos pedido que se generen las 5 mejores estructuras. Esto se debe a que hay más de un disulfuro posible en esta estructura, y Remodel los considerará todos en la única trayectoria. Sin embargo, solo generará los 5 mejores. Si solo son posibles 4, solo se generarán 4.

```
rosetta/main/source/bin/remodel.macosgccrelease -database rosetta/main/database/ -s 2ci2.renumbered.pdb -remodel:blueprint blueprint.2ci2.disulfides -remodel:build_disulf -remodel:match_rt_limit 1.5 -remodel:use_clusters false
-no_optH false -remodel:num_trajectory 3 -remodel:save_top 3 -remodel:use_pose_relax true -correct -overwrite -mute core.pack > log
```

Usa Remodel para **construir** disulfuros en el PDB 2ci2.renumbered.pdb, con una puntuación de **1.5** o mejor respecto a las distribuciones de distancia de disulfuros observadas, generando como máximo 3 posibles estructuras con disulfuros, y usa fast relax para minimizar las estructuras con disulfuros. Ten en cuenta que en este ejemplo no está presente "-remodel:bypass\_fragments", por lo que Remodel cambiará la cadena principal de los residuos 7-14 para encontrar mejores disulfuros. De hecho, Remodel recorrerá 3 trayectorias en las que remodelará los residuos especificados en el archivo blueprint y luego comprobará si hay disulfuros entre la región reconstruida y la región de aterrizaje. Se generarán las 3 mejores estructuras con disulfuros.

```
rosetta/main/source/bin/remodel.macosgccrelease -database rosetta/main/database/ -s 2ci2.renumbered.pdb -remodel:blueprint blueprint.2ci2.domaininsertion -remodel:domainFusion:insert_segment_from_pdb 2ci2.insert.pdb
-remodel:quick_and_dirty -run:chain A -remodel:num_trajectory 3 -overwrite
```

```
blueprint.2ci2.domaininsertion (excerpt):
39 V .
40 T L PIKAA T
41 M L PIKAA M
42 E L PIKAA E
43 Y L PIKAA Y
0 x I NATRO
0 x I NATRO
0 x I NATRO
0 x I NATRO
0 x I NATRO
0 x I NATRO
0 x I NATRO
0 x I NATRO
0 x I NATRO
0 x I NATRO
44 R L PIKAA R
45 I .
```

Inserta los residuos de 2ci2.insert.pdb entre los residuos 43 y 44 y remodela los residuos flanqueantes 40-43 y 44 (todos especificados en el archivo blueprint, del que se muestra un extracto) de la estructura inicial 2ci2.renumbered.pdb usando el modo quick-and-dirty, y genera 3 modelos putativos. Observa en el extracto del archivo blueprint que se ha especificado NATRO para los residuos insertados. Si se omitiera esta etiqueta, los residuos insertados se remodelarían y podrían cambiar de identidad. Además, como se ha especificado NATRO para los residuos insertados, Remodel pasa al modo de diseño manual. Esto significa que todos los demás residuos remodelados se convertirán en valinas (o en el aminoácido que se especifique con la opción "-remodel:generic\_aa") a menos que también se agreguen comportamientos de residuo correspondientes para esos residuos. En el ejemplo anterior queremos reconstruir los residuos que flanquean la inserción, pero conservar la identidad de residuo de tipo silvestre, de ahí los tokens PIKAA.

Salidas esperadas
=================

REMODEL MANEJA SU PROPIA E/S DE ARCHIVOS y solo usa el job\_distributor para lanzar el proceso. Normalmente el distribuidor de trabajos escribirá un archivo al final de una ejecución, por lo general con el formato XXXX\_0001.pdb; ¡ESE ARCHIVO NO ES FIABLE SI USAS -num\_trajectory MAYOR QUE 1! En su lugar, busca archivos que se llamen simplemente 1.pdb, 2.pdb, etc. Debido al almacenamiento en caché interno de estructuras tanto en la etapa de agrupamiento como en la de acumulación de estructuras, el protocolo Remodel genera internamente más estructuras de las que espera el job\_distributor. Si se usó una trayectoria, 1.pdb tendrá la misma información que XXXX\_0001.pdb del job\_distributor. Una vez que el acumulador o el agrupamiento termina, debido a la ordenación interna, la estructura de menor energía, según score12, se genera como XXXX\_0001.

Posprocesamiento
================

Los archivos PDB de salida se pueden ver en un programa de gráficos moleculares como PyMOL. El log de salida se puede revisar para ver detalles específicos del protocolo (energías de ruptura de cadena, número de trayectorias, etc.).

Solución de problemas
=====================

Si obtienes un fallo de segmentación (seg fault) justo después de leer el blueprint, puede deberse a que tienes una línea vacía al final del archivo. El archivo blueprint debe terminar en la última definición y no tener líneas en blanco.

Si ves errores que se quejan de que algún residuo no existe o de que el ResfileReader generó problemas, es muy probable que tengas una definición de cadena en tu archivo PDB y estés ejecutando el modo de diseño manual. La solución más fácil es asegurarte de establecer <code> -run:chain </code>. Es un error conocido (y se está corrigiendo actualmente): ¡probablemente necesitas esta opción INCLUSO SI SOLO TIENES UNA CADENA EN TU POSE!

Para diseño de novo, asegúrate de que tu PDB del tallo (stub) tenga al menos dos residuos.

Para las extensiones, es importante asignar estructura secundaria a los residuos flanqueantes; de lo contrario se producirán errores.

¿Por qué algunas de mis posiciones se convierten en alanina o valina? Esto puede ocurrir porque asignaste algunas posiciones para construir manualmente, pero olvidaste asignar todas las posiciones de reconstrucción. Actualmente, una vez que estás en modo manual, todo se controla manualmente (excepto los residuos vecinos, que se pueden elegir automáticamente).

Novedades desde la última versión
=================================

RosettaRemodel se publica por primera vez con Rosetta v3.4.


##Véase también

* [Tutorial de modelado de loops](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling)
* [[Documentación adicional de remodel | Remodel ]]: Agrupamiento, puntos de control y consejos para solucionar problemas.
* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta
