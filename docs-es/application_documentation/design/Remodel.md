#Documentación de Remodel

* Consulta también la documentación de [[RosettaRemodel]]
* Para información sobre XML, consulta [[RemodelMover]]

Hay una demo de remodel disponible en la distribución de Rosetta en `Rosetta/demos/public/design_w_flex_loops_using_RosettaRemodel`

**El modo remodel es un atajo a las herramientas de modelado de loops de Rosetta, hecho a medida para fines de diseño.** Los componentes básicos de la herramienta son una etapa de construcción (a nivel centroid) y una etapa de diseño. Por lo general hay una etapa de "diseño parcial" para dirigir la simulación hacia el cumplimiento de los requisitos de empaquetado. Las instrucciones se dan mediante un archivo PDB de entrada, una descripción blueprint de la tarea y, si hace falta, una definición de restricciones y un PDB que contenga un segmento de una estructura que se insertará en el PDB inicial.

opciones que se usan:

     -s [starting pdb -- currently require renumbering from residue 1, but can handle other chains like DNA, see BUILD section below]
     -remodel:blueprint [blueprint file]

La duración de la ejecución se puede controlar con

     -num_trajectory [integer, >= 1]

esta opción determina el número de muestreos a nivel centroid deseados.

El número de estructuras que se procesarán en el acumulador o en los clústeres debe especificarse con:

     -save_top [integer]

probablemente conviene incluir las opciones que se usan en general en las ejecuciones de rosetta

     -no_optH false
     -ex1
     -ex2

también hay otras opciones para casos especiales: (consulta las otras secciones de esta documentación)

     -enzdes:cstfile [constraint file]
     -insert_segment_from_pdb [pdb containing segment]
     

Actualmente el protocolo Remodel está configurado para ejecutar CCD\_refine, pero esto puede desactivarse con -remodel:quick\_and\_dirty

Esto es útil en las primeras etapas del diseño, cuando se quiere muestrear distintas longitudes de loop para encontrar la configuración adecuada.

SALIDA
------

**ACTUALMENTE REMODEL GESTIONA SU PROPIA E/S DE ARCHIVOS y solo usa el job\_distributor para lanzar el proceso. Normalmente el distribuidor de trabajos escribirá un archivo al final de la ejecución, normalmente con el formato XXX\_0001.pdb; ¡NO SE DEBE CONFIAR EN ESTE ARCHIVO SI EJECUTAS -num\_trajectory CON UN VALOR MAYOR QUE 1!!** Busca, en cambio, los archivos que se llaman simplemente 1.pdb, 2.pdb, etc. Debido al almacenamiento en caché interno de las estructuras tanto en la etapa de agrupamiento como en la de acumulación de estructuras, el protocolo Remodel genera internamente más estructuras de las que espera el job\_distributor (que, al parecer, espera una de entrada y una de salida). Si se usó una sola trayectoria, el 1.pdb tendrá la misma información que el XXX\_0001.pdb del job\_distributor. Cuando se usa el acumulador o el agrupamiento, debido a la ordenación que se hace internamente, la estructura de menor energía, según score12, se escribe como XXX\_0001.

CONSTRUCCIÓN
-----

En la etapa de construcción hay que describir la tarea mediante asignaciones en el archivo blueprint (que se explica más abajo). Remodel permite cambiar de constructor, pero por defecto usa RemodelLoopMover como protocolo constructor. Es ligeramente distinto de los otros constructores porque no presupone ningún conocimiento de los tipos de aminoácido a nivel centroid. Para puntuar las estructuras a nivel centroid solo se usaron "vdw", "rama" y "rg".

Como la identidad del aminoácido no se conoce hasta que se construye la cadena principal, se usan centroides de VALINA como tipo de aminoácido genérico, a modo de marcador del volumen de la cadena lateral. Esta asignación se puede cambiar con "-generic\_aa A" \<=esto cambia el aminoácido genérico a ALANINA. [solo se permite el código de una letra, 19 dic. de 2011]

Para distintos tipos de tareas de construcción (como construir hélices o láminas), también conviene activar las opciones relevantes de estructura secundaria para activar su puntuación a nivel centroid.

Para hélices:

     -hb_srbb 1.0  <= the number is the weight for this scoretype

Para láminas:

     -hb_lrbb 1.0
     -rsigma 1.0
     -ss_pair 1.0

Los valores de los pesos pueden ajustarse libremente, pero hace falta un número mayor que 0 para activar la puntuación.

**CADENA (ADN) -- gracias, Fabio (esta sección cambiará en un futuro próximo. El plan actual es tener blueprints específicos de cada cadena)**

En un PDB inicial con varias cadenas, Remodel trabaja sobre la primera cadena. Deja vacío el campo de cadena para esta región o usa la opción "-chain " seguida del nombre de la cadena (p. ej., A) para indicar la cadena diana. Las demás partes pueden conservar su designador de cadena y el protocolo no las tocará, pero seguirán presentes durante toda la simulación. Si hay ADN, se tendrá en cuenta para la puntuación pero no se moverá durante la ejecución. Además, si hay algo que no sea proteína, el agrupamiento por átomos CA no funcionará, así que hay que desactivar el agrupamiento con "-use\_clusters false."

**MOCK\_PREDICTION {todavía no disponible}**

Aunque no tiene todos los extras de una ejecución de predicción exhaustiva cuando se conoce la secuencia, el protocolo Remodel puede usarse para ejecutar una "predicción simulada" (mock prediction), en la que se dan las secuencias de aminoácidos y solo se quiere predecir su estructura final usando fragmentos sesgados por la secuencia (todavía genéricos o asignados a mano y sin predicción de estructura secundaria a partir de un alineamiento múltiple de secuencias), basándose en gran medida en el refinamiento con todos los átomos para obtener una estructura para una secuencia conocida. En este caso, se activaría "-mock\_prediction", que sustituye la función de puntuación de diseño por la que se usa para las tareas generales de predicción de loops (score4L). También debe usarse "-remodel:use\_blueprint\_sequence", de modo que los fragmentos elegidos de la base de datos vall estén sesgados hacia las secuencias conocidas. Pero al hacerlo, asegúrate de asignar a la columna \*SEGUNDA\* del archivo blueprint los aminoácidos de tu secuencia diana, y de usar PIKAA para forzar manualmente que los aminoácidos finales usados en el refinamiento coincidan con la secuencia necesaria para una estructura predicha.

BLUEPRINT
---------

El archivo blueprint puede generarse ejecutando el script getBluePrintFromCoords.pl (en Rosetta/demos/public/design\_w\_flex\_loops\_using\_RosettaRemodel/scripts)
```
getBluePrintFromCoords.pl -pdbfile [starting pdb] \> [blueprint name]
```
El archivo blueprint consta de tres columnas:
```
1 N .
```
(número de residuo en el PDB original, código de una letra del residuo e instrucción de construcción) Si se sustituye el "." por "E", "L", "H" o "D", se puede construir un tipo de estructura secundaria hebra extendida, loop, hélice o una estructura secundaria cualquiera al azar, respectivamente. Esta notación controla la estructura secundaria que se usa al recoger fragmentos de vall.

p. ej.:

     1 N .
     2 K H
     3 G H
     4 W H
     5 K .

Esta asignación reconstruirá los residuos 2-4 usando fragmentos helicoidales.

Basta con eliminar una línea y dar asignaciones de construcción a las posiciones anteriores y posteriores a la eliminación para que el PDB se acorte y el resto de la estructura se vuelva a conectar (si es posible, dada la holgura de la estructura). Puede que haga falta incluir más posiciones en la asignación de reconstrucción para asegurar que haya suficientes elementos que se puedan mover para reconectar la unión.

EXTENSIONES:
-----------

si se va a extender una sección del PDB, se puede usar un código de "extensión":

     1 N .
     2 K H
     0 x H
     0 x H
     3 G H
     4 W .
     5 K .

De este modo, se insertarán 2 residuos entre el residuo original 2 y el 3. Aunque el archivo blueprint admite líneas de comentario, es más sencillo si no añades líneas extra. Así, si usas vi, puedes mostrar el número de línea y la numeración corresponderá a los nuevos números de residuo. **NOTA: hay que tener asignaciones en la tercera columna para los residuos que flanquean la extensión. En nuestro ejemplo, hay que asignar las posiciones 2 y 3.**

CONSTRUCCIÓN con RESTRICCIONES
----------------------

Remodel usa la [configuración de restricciones]( https://www.rosettacommons.org/docs/latest/rosetta_basics/file_types/match-cstfile-format) del protocolo EnzDes, porque separa la definición de las posiciones de los residuos de las restricciones que se les aplican. Esta configuración permite que el blueprint haga también de archivo de definición de posiciones de restricciones y que todas las extensiones y deleciones se gestionen con elegancia. Ten en cuenta que la restricción de construcción definida aquí solo se usará en la etapa centroid.

Para configurar restricciones de construcción, primero hay que crear un archivo de texto de definición de restricciones, siguiendo el formato de enzdes:** (TEN EN CUENTA que los átomos de la cadena principal necesitan una declaración manual adicional de "is\_backbone"; de lo contrario no se aplicarán en la etapa de construcción. Y los atom\_types son atom\_types de Rosetta.)**

     CST::BEGIN
       TEMPLATE::   ATOM_MAP: 1 atom_type: Nbb
       TEMPLATE::   ATOM_MAP: 1 is_backbone
       TEMPLATE::   ATOM_MAP: 1 residue3: ALA CYS ASP GLU PHE GLY HIS ILE LYS LEU MET ASN PRO GLN ARG SER THR VAL TRP TYR
     
       TEMPLATE::   ATOM_MAP: 2 atom_type: OCbb
       TEMPLATE::   ATOM_MAP: 2 is_backbone
       TEMPLATE::   ATOM_MAP: 2 residue3: ALA CYS ASP GLU PHE GLY HIS ILE LYS LEU MET ASN PRO GLN ARG SER THR VAL TRP TYR
     
       CONSTRAINT:: distanceAB:    2.80   0.20 100.00  0
     CST::END

Este bloque describe una configuración de restricción entre dos átomos de la cadena principal, un nitrógeno y un oxígeno, para que queden a una distancia de enlace de hidrógeno (2.8 Å). La etiqueta residue3 enumera todos los tipos de aminoácido, de modo que, al aplicar la restricción, simplemente se ignora la identidad del aminoácido. Puede ser un código de una letra si se usa "residue1".

Notas sobre el archivo cst: la designación "atom\_type" requiere un solo nombre y la conectividad se busca automáticamente en el archivo params. Pero si se usa "atom\_name", habría que especificar explícitamente tres átomos para que las torsiones y los ángulos se puedan establecer correctamente. Por ejemplo: ATOM\_MAP: 1 atom\_name N CA C y ATOM\_MAP: 2 atom\_type Obb; con una restricción TORSION\_A, restringirá la torsión entre O-N-CA-C.

Los términos que se pueden usar son: distanceAB: torsion\_A: torsion\_B: torsion\_AB: angle\_A: angle\_B:

La asignación de residue1 (o residue3) en atom\_map debe coincidir con el tipo de átomos que definen. En el ejemplo anterior, se puede aplicar una restricción de cadena principal a todos los tipos de aminoácido, por lo que enumeramos los 20 aminoácidos. Pero si se requiere una designación de cadena lateral, asegúrate de usar solo los residuos que puedan satisfacer esas descripciones. (p. ej., NE2 existe en GLN, pero no en ALA)

En segundo lugar, las posiciones correspondientes a los residuos definidos en el archivo de restricciones deben etiquetarse en el blueprint:

     10 K .
     11 T .
     12 L . CST1A
     13 K .
     14 G H
     15 E H
     16 T H
     17 T H CST1B
     18 T H

En este ejemplo, el átomo Nbb de la posición 12 tendrá una restricción de enlace de hidrógeno con el átomo OCbb de la posición 17. **El residuo etiquetado como "A" corresponde a "Atom Map: 1" en el bloque de definición de restricciones y "B" corresponde a "Atom Map: 2" (por desgracia, esta conversión entre A, B y 1, 2 es necesaria para que el número de restricciones no esté limitado a 26, A...Z.** Si hay que configurar más de una restricción para cada posición, basta con continuar con la definición (pero asegúrate de duplicar la entrada CST en el archivo de restricciones; cada bloque corresponde a CST1A/B, CST2A/B, ..., etc.):

     10 K .
     11 T .
     12 L . CST1A CST2B
     13 K .
     14 G H
     15 E H CST2A
     16 T H
     17 T H CST1B
     18 T H

En este segundo caso, el Nbb y el OCbb de la posición 12 tienen restricciones con el OCbb de la posición 15 y el Nbb de la posición 17, respectivamente.

Una vez que los archivos de restricciones y de blueprint están correctamente etiquetados, para usarlos basta con indicar "-enzdes:cstfile [nombre del archivo de restricciones]".

También se pueden usar restricciones que no sean de estilo enzdes ( p. ej., -cst_file atompair_angle_dihedrals.cst ); sin embargo, si se usan, se aplican tanto en modo centroid como en modo con todos los átomos, y por lo tanto se producirá un error si se usan átomos que no son de la cadena principal.

 FILTRO DE RESTRICCIONES

Al ejecutar una construcción con definición de restricciones, Remodel usa automáticamente un filtro de restricciones y solo genera decoys que satisfacen tus restricciones, dentro de 10 unidades de energía. Este valor se puede cambiar con una opción (p. ej., -cstfilter 100)

El rigor de cada restricción también se puede ajustar cambiando los pesos del término de restricción; por ejemplo, en el cstfile definido arriba:

       CONSTRAINT:: distanceAB:    2.80   0.30 100.00  0

se definió un peso de restricción de 100.00. En la práctica, cualquier violación de esta restricción de distancia será mayor que las 10 unidades de energía permitidas. Para suavizar este filtro, basta con cambiar la línea:

       CONSTRAINT:: distanceAB:    2.80   0.30   1.00  0

el cambio en el peso de la restricción equivale a una penalización 100 veces menor. Después de cada ronda de construcción, el log indicará cuál es la violación de atom\_pair y el usuario podrá ajustar el peso en función de ella.


DISEÑO
------

Hay distintas etapas para diseñar una estructura recién construida. En una etapa de acumulación (la "estructura parcial"), Remodel cuenta vecinos para identificar qué residuos están enterrados y en esta etapa solo usa las posiciones enterradas.

Hay 6 modos de diseño distintos.

La decisión sobre los interruptores depende de si se añade una cuarta columna al blueprint y de 2 opciones extra:

Si no hay asignación de comandos de resfile en la cuarta columna (excepto las asignaciones CST), se usa el diseño automático. (El diseño automático elige posiciones del núcleo automáticamente y usa solo aminoácidos hidrofóbicos.) Para controlar si los residuos vecinos se incluyen, se reempaquetan o se rediseñan:

-find\_neighbors por sí sola reempaquetará todos los vecinos, tanto en modo automático como manual; de lo contrario, solo se rediseñarán las posiciones reconstruidas que se describen en el archivo blueprint. -find\_neighbors -design\_neighbors rediseñará todos los vecinos.

Para el diseño manual, el archivo blueprint también gestiona el diseño de posiciones mediante comandos de resfile, de modo que se puede especificar:

     1 N .
     2 K H PIKAA K
     0 x H ALLAA
     0 x H APOLAR
     3 G H ALLAA
     4 W .
     5 K .

Si usas el modo manual, **se recomienda asignar todas las posiciones incluidas en el segmento de reconstrucción (pero no necesariamente en otras partes)** ; de lo contrario, se convertirán en valinas. (El residuo de construcción por defecto a nivel centroid.) Sin embargo, esta asignación no se limita a los residuos que se van a reconstruir. Funciona como un resfile: se puede cambiar cualquier residuo sobre la marcha.

además, también deben incluirse las opciones de diseño habituales, como -ex1 -ex2, para controlar este comportamiento de diseño.

así, hasta este punto, con la información dada, ya se puede construir una estructura sencilla con la siguiente línea de comandos:

```
remodel.linuxiccrelease -s input.pdb -remodel:blueprint test.blueprint -ex1 -ex2 -correct -num\_trajectory 10
```

CONFIRMACIÓN CON KIC
----------------

[esta función está pendiente de probar] Después de construir la estructura mediante CCD\_refinement, todavía no se sabe cuál sería la mejor secuencia para producir experimentalmente. Una nueva función consiste en comprobar esas secciones con un método ortogonal; si los resultados convergen, hay más probabilidades de que el loop sea plausible. Actualmente usamos CCD para construir y KIC para el paso de refinamiento. Si se indica "-run\_confirmation", las estructuras generadas por CCD se probarán en un paso de refinamiento con KIC usando las secuencias diseñadas en el paso de CCD. La región de construcción se ampliará 2 residuos (para reducir el sesgo) a cada lado, y todo el segmento se reconstruirá con el protocolo KIC\_refine. La etapa de confirmación está configurada actualmente como una comprobación de evaluación y no como un filtro, por lo que las estructuras que no superen la prueba se producirán igualmente. El RMSD de los átomos CA del loop respecto a la estructura refinada con CCD se informará tanto en el archivo de log como en la sección REMARKs (si se activa "-preserve\_header true"). Se pueden filtrar posteriormente las estructuras según esta información.

 Desde el 1 de mayo de 2010, también se pueden intercambiar los métodos para construir con KIC y refinar con CCD mediante "-swap\_refine\_confirm\_protocols" .

Configuración más avanzada:
====================

AGRUPAMIENTO
---------

Al especificar -num\_trajectory, Remodel puede tomar decisiones sobre el paso de refinamiento persiguiendo solo las estructuras únicas que puntúan bien al salir de la etapa de diseño parcial. Recoge todas las estructuras y las agrupa, y solo usa los modelos de menor energía (que presumiblemente tienen los mejores contactos en el núcleo) para llevar a cabo el refinamiento con todos los átomos.

Para controlar el comportamiento del agrupamiento, el valor por defecto es "false"

       -use_clusters false <=this will ask the program to refine all the structures generated at centroid level.

Esta función se puede activar con

       -use_clusters true

Pero asegúrate de establecer un número de trayectorias mayor que uno. Una sola estructura no puede formar un clúster y Remodel no generará ninguna salida.

y si se usa la estrategia de agrupamiento, se puede usar -cluster\_radius [número real]

para establecer cuán distintos deben ser los clústeres.

PUNTOS DE CONTROL
-------------

Remodel tiene su propio esquema de puntos de control, en el que las estructuras se escribían en disco y podían reintroducirse en el programa cuando se reinicia el proceso, como en el caso de que el proceso sea expulsado de un clúster y se vuelva a insertar más tarde.

los puntos de control se activan con la opción: -checkpoint

y está relacionada con el comando -save\_top [número], ya que los puntos de control recuperan el mismo número de estructuras que escribe el comando -save\_top. (Si tu primera pasada del protocolo no generó el número de estructuras especificado en -save\_top, solo se recuperarán las que se generaron). Este esquema solo sirve para asegurar que las mejores estructuras de una simulación no se pierdan cuando se termina un proceso. También generará un archivo de texto para marcar el número de trayectorias ya terminadas y, por lo tanto, retomar desde donde se quedó num\_trajectories, por así decirlo.

**ADVERTENCIA: para SYD, conviene mantener save\_top en unos 10 archivos solamente. Podría tumbar el sistema de archivos.**

Inserción de dominios
----------------

el uso es simplemente: 1) crear un fragmento del PDB que se quiere insertar en la otra estructura, 2) hacer una definición blueprint de él (llamándolo "I" en lugar de H, E o L) junto con las asignaciones de cómo se quieren conectar los loops, y 3) usar la opción "-insert\_segment\_from\_pdb [nombre del archivo pdb]"

Esquema especial de configuración de conectores por pares
--------------------------------

Hace poco me pidieron una configuración en la que se puedan construir varios conectores en dos cadenas distintas a la vez. En concreto, para una configuración de tipo ensamblaje de dominios en la que una interfaz de dímero se mantiene constante mientras dos dominios extra se unen a cada uno de los compañeros de unión. Este caso especial requiere que Remodel reconozca que el Pose de entrada consta de dos cadenas y permite la inserción de fragmentos sin mantener un salto a través del segmento.

para lograrlo se usan dos opciones: el PDB inicial ya contiene todos los dominios y ahora solo hay que construir los conectores para ensamblarlos en una configuración plausible.

     -remodel:two_chain_tree [start of the second chain]  
     -remodel:no_jumps

Docking con anclaje (tethered docking)
----------------

[se recomienda usarlo solo para reconstruir un único segmento]

-remodel:RemodelLoopMover:bypass\_closure

-remodel:RemodelLoopMover:force\_cutting\_N

se puede reconstruir un segmento de la estructura, pero sin restringirlo a criterios de cierre. Esto es útil para cosas como el docking de una hélice sobre una cadena principal, y se puede construir una nueva conexión una vez que la hélice está en su sitio. Normalmente solo se necesita "bypass\_closure" y se introducirá un corte en el extremo C del rango de asignación del blueprint, pero puede cambiarse al extremo N si la hélice, o cualquier otra estructura, necesita construirse hacia atrás.

Diseño de disulfuros
----------------

-remodel:build\_disulf 

-remodel:disulf\_landing\_range [start] [end] 

-remodel:match\_rt\_limit [float]

Remodel intentará la construcción centroid y buscará todos los posibles disulfuros entre la región de construcción y el rango de aterrizaje (pero no dentro de la región de construcción). La región de construcción se asigna en el archivo blueprint para definir los residuos de partida, que luego se emparejarán con los residuos especificados dentro de "-disulf\_landing\_range".

Se recomienda usar el esquema de refinamiento pose relax para el refinamiento de disulfuros. A veces es deseable simplemente buscar posibles posiciones de disulfuro en la estructura nativa (en lugar de reconstruir un segmento para crearlos); esto puede hacerse combinándolo con la opción "bypass-fragment". La estructura se seguirá minimizando cuando se introduzca el disulfuro, pero todos los sitios posibles provienen de la conformación nativa.

línea de comandos de ejemplo: \~/src/mini/xcode/build/Release/remodel -s scaffonly\_renum.pdb -remodel:blueprint test.blueprint -bypass\_fragments -database \~/minirosetta\_database/ -remodel:use\_clusters false -remodel:build\_disulf -no\_optH false -correct -remodel:match\_rt\_limit 5.0 -remodel:disulf\_landing\_range 1 53 -remodel:num\_trajectory 1 -remodel:save\_top 5 -overwrite -remodel:use\_pose\_relax true

NOTA: en este caso num\_trajectory es 1, pero se pidió escribir 5 estructuras. Esto se debe a que hay más de un posible disulfuro en esta estructura y Remodel los hace todos. (Si solo son posibles 4, solo se generarán 4)

También se puede ajustar más el valor de match\_rt\_limit para producir solo disulfuros "mejores", pero se corre el riesgo de no poder construir ninguno. En el potencial de disulfuros de Rob, es una medida de RMSD desde tu cadena principal hasta un disulfuro real de la base de datos. Los disulfuros de la base de datos se recogen con estructuras idealizadas, por lo que la precisión no es subangstrom. Alrededor de 1 Å es bastante bueno.

en el log encontrarás líneas como:

protocols.forge.remodel.RemodelDesignMover: DISULF possible 22.8416

protocols.forge.remodel.RemodelDesignMover: DISULF 30x5

protocols.forge.remodel.RemodelDesignMover: match\_rt 1.04513

Esto indica la calidad del disulfuro que encuentra. La primera es una distancia CA al cuadrado; solo los evalúa si están a menos de 5 Å. La segunda indica que está entre los residuos 30 y 5; la tercera línea es cuánto difiere este par del disulfuro más cercano de la base de datos.

mostrará líneas como:

protocols.forge.remodel.RemodelDesignMover: central residues: 35,36,37,38,

protocols.forge.remodel.RemodelDesignMover: neighbor residues: 52,53,54,56,

Si no ves números de residuo en los residuos centrales y vecinos, es probable que tu blueprint esté mal asignado.

**ADVERTENCIA: actualmente, el esquema de construcción de disulfuros tiene una trampa mortal integrada. Funciona muy bien si le das posiciones plausibles, pero si no puede encontrar un disulfuro que construir, lo intentará en un bucle infinito. Construir disulfuros perfectos puede ser muy difícil, y por eso se usó esta configuración. Esto es especialmente malo para explorar cadenas principales fijas. Como no se mueven, un fallo en el primer intento garantiza un fallo también en el segundo. Así que asegúrate de detectarlo y matarlo a mano.**

PREGUNTAS FRECUENTES (¿POR QUÉ SE BLOQUEÓ MI EJECUCIÓN?)
===========================

Algunos errores comunes son:

1) si obtienes un fallo de segmentación justo después de leer el blueprint, puede deberse a que hay una línea vacía al final del archivo. El archivo blueprint debe terminar en la última definición y sin líneas en blanco vacías.

2) si ves errores que se quejan de que algún residuo no existe o algún tipo de problema generado por ResfileReader, es muy probable que haya una definición de cadena en tu PDB y estés ejecutando modos de diseño manual. La solución más sencilla es eliminar la cadena de tu PDB inicial y de los PDB de punto de control, si los usas. Los PDB de punto de control heredan la cadena que tenga el PDB inicial, por lo que a veces también hay que corregirlos para remediar este problema.

3) También puede ser que te hayas olvidado de asignar estructuras secundarias alrededor de una extensión.

4) ¿Por qué algunas de mis posiciones se convierten en ALA? Puede ser porque asignaste algunas posiciones para construir manualmente, pero te olvidaste de asignar todas las posiciones de reconstrucción. Actualmente, una vez que estás en modo manual, todo se controla manualmente (excepto los residuos vecinos, que se pueden elegir automáticamente).

5) un error. Esto... tendrás que depurarlo tú mismo o preguntar a Possu.