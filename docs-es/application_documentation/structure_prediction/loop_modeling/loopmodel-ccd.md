#Modelado de loops CCD basado en fragmentos

Metadatos
========

Autores: Sinisa Bjelic y TJ Brunette

Este documento fue actualizado por última vez el 11 de agosto de 2010 por TJ Brunette y Sinisa Bjelic. El investigador principal correspondiente a esta aplicación es David Baker (dbaker@u.washington.edu) .

Puedes encontrar un tutorial introductorio de modelado de loops [aquí](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling).

Código y demo
=============

La aplicación para este método es `       rosetta/main/source/bin/loopmodel.*      ` . Los movers principales de loops ccd son perturb\_ccd, que está en `       rosetta/main/source/src/protocols/loops/LoopMover_CCD.cc      `, y quick\_ccd, que está en `       LoopMover_QuickCCD.cc      ` . Ambos protocolos generan loops ensamblándolos a partir de fragmentos mediante muestreo de Monte Carlo y usan CCD para cerrar los loops. El método más utilizado actualmente para el modelado de loops basado en fragmentos es quick\_ccd. La opción -loops:remodel quick\_ccd\_moves ya no es de uso generalizado, pero existe por compatibilidad con versiones anteriores.

Un ejemplo de uso que remodela loops de 10 y 5 residuos está en la prueba de integración loop\_modeling, que se encuentra aquí:

```
rosetta/main/tests/integration/tests/loop_modeling
```

Referencias
==========

Para el modelado de loops CCD (opciones que contienen 'ccd'), cita por favor

```
Wang C, Bradley P, Baker D (2007).
Protein-protein docking with backbone flexibility. J. Mol. Biol. 373, 503.
```

El algoritmo CCD original se describe en

```
Canutescu A, Dunbrack R., Jr (2003).
Cyclic coordinate descent: A robotics algorithm for protein loop closure. Protein Sci. 12, 963.
```

Propósito
=======

En la predicción de estructura de proteínas, a menudo hay que ajustar un segmento de proteína para conectar dos segmentos fijos. Por ejemplo, el modelado de loops se usa para cerrar rupturas de cadena durante el protocolo de jumping de Rosetta (Bradley, 2005) y para remodelar loops durante el protocolo de modelado por homología (Qian, 2007).

Algoritmo
=========

El modelado de loops se realiza con dos algoritmos distintos: CCD (descenso cíclico de coordenadas, Cyclic coordinate descent) y KIC (cierre cinemático, Kinematic closure). Aquí solo se describe CCD; la explicación del segundo se encuentra en la documentación de KIC correspondiente. El objetivo de ambos algoritmos es explorar el espacio conformacional del loop usando una representación centroid de las cadenas laterales de la proteína y una representación explícita de la cadena principal, seguida de una búsqueda de mayor resolución con representaciones explícitas de todos los átomos y del hidrógeno.

La etapa centroid del modelado de loops genera loops realizando inserciones de fragmentos con muestreo de Monte Carlo y una puntuación que premia las cadenas cerradas, y se usa CCD para cerrar el loop al final de la simulación. Como los fragmentos son necesarios para el muestreo, hay que generarlos con fragment picker (consulta la documentación de fragment picker) o descargarlos del servidor web Robetta. Los fragmentos se cargan con las siguientes opciones:

```
-loops:frag_sizes (defines the number of residues in each fragment file)
-loops:frag_files    (defines the name of each fragment file)
```

Existe una opción alternativa, -loops:vall\_file, que permite al usuario elegir fragmentos sobre la marcha con un método de puntuación basado en la identidad de secuencia para seleccionarlos. En la mayoría de los casos, esta opción dará resultados menos óptimos para una secuencia de entrada dada, ya que los fragmentos elegidos no aprovecharán la información de perfil de secuencia ni de estructura secundaria.

Archivos de entrada
===========

Archivo de definición de loops especificado con
 *(adaptado de la documentación de modelado cinemático de loops)*

```
-loops:loop_file
```

y compartido por todos los protocolos de modelado de loops. Para cada loop que se vaya a modelar, incluye lo siguiente en una línea:

```
column1  "LOOP":     The loop file identify tag
column2  "integer":  Loop start residue number
column3  "integer":  Loop end residue number
column4  "integer":  Cut point residue number, >=startRes, <=endRes. default - let the loop modeling code choose cutpoint
column5  "float":    Skip rate. default - never skip
column6  "boolean":  Extend loop. Default false
```

Puedes encontrar un ejemplo de archivo de definición de loops en rosetta/main/tests/integration/tests/kinematic\_looprelax/input/4fxn.loop, que tiene este aspecto:

```
LOOP 88 95 92 0 1
```

Opciones
=======

####Opciones usadas en el modelado de loops

Control del modelado de loops: una serie de opciones de tipo cadena de texto controlan qué tipo de modelado de loops se obtiene. El ejecutable contiene muchos modos distintos de modelado de loops; se usan selecciones de cadenas de texto para indicarle qué caminos seguir.

Opciones necesarias para invocar el modelado de loops CCD
---------------------------------------------

```
-in:file:s
input pdb file that loop modelling is done on (any "jd2" input options can be used) 

-loops:remodel
legal=['no', 'perturb_ccd', 'perturb_kic', 'quick_ccd',
       'quick_ccd_moves', 'old_loop_relax', 'sdwindow']
Centroid version of loopmodeling.
    peturb_kic: for the kic loopclosure
    perturb_ccd:  original fragment/ccd loop closure method
    quick_ccd: faster fragment/ccd loop closure method

older unused methods: quick_ccd_moves, old_loop_relax, sdwindow

The preferred method CCD looprelax is quick_ccd

-loops:refine
legal=['no','refine_ccd','refine_kic']
Method for performing full-atom refinement on loops.
The preferred method for full-atom refinment is refine_kic

-loops:loop_file
Loop definition file(s). When multiple files are given a *random* one will be picked
each time when this parameter is requested.
```

Opciones de ajuste de fragmentos
------------------------

```
-loops:vall_file
vall database file for picking crude fragments on the fly
without inputting pregenerated fragments
default='vall_file'

-loops:frag_sizes
lengths of fragments to be used in loop modeling
default=['9','3','1']

-loops:frag_files
fragment libraries files
default=['frag9', 'frag3', 'frag1']
```

Opciones adicionales para un control detallado
----------------------------------------

Opciones adicionales que fijan el muestreo de la estructura y de los loops.

```
-loops:relax
legal=['no','fastrelax','shortrelax','fullrelax','seqrelax','minirelax']
does a relax on the structure - minimization in the torsion space
default = 'no'

-loops:extended
force extended on loops (phi-psi angles set to 180 degrees),
independent of loop input file
legal=['true','false']
default='false'
```

Opciones generales para una ejecución de ROSETTA
---------------------------------

```
-nstruct
number of outputs. [Integer]

-database
Path to Rosetta databases. [PathVector]
```

Posprocesamiento
===============

Salidas esperadas
----------------

Para ejecuciones de producción se recomienda usar las siguientes opciones. `       -loops::remodel quick_ccd -loops::refine refine_kic -loops::relax fastrelax -relax::fastrelax_repeats 8 -loops::extended      ` y generar al menos 1000 modelos con `       -nstruct 1000      ` .

quick\_ccd también puede remodelar extremos terminales. Para ello, fija el punto de corte en el archivo de loops igual al último residuo de la cadena. Por ejemplo, en una proteína de 80 residuos, si quieres remodelar los primeros 10 residuos, el archivo de loops tendría 1 10 10 0 0.

Para modelar un extremo C, fija como primer residuo el residuo ANTERIOR al loop para evitar rupturas de cadena. Por ejemplo, si quieres modelar el extremo C de los residuos 259 a 267, tu archivo de loops debería verse así: 258 267 267 0 1.

quick\_ccd no requiere restricciones, pero usar restricciones de homólogos o de datos experimentales puede producir resultados más precisos. La salida consiste en un pdb y un scorefile. El trabajo concluye con el siguiente comando:

```
protocols.looprelax: ===
protocols::checkpoint: Deleting checkpoints of Loopbuild
```

Análisis de datos
--------------

Para fines de benchmark, crear un gráfico de puntuación frente a rmsd para todos los decoys y buscar «embudos de energía» cercanos al estado nativo es una buena forma de probar el rendimiento de los protocolos en un sistema, y puede ayudar a determinar si los errores se deben a la puntuación o al muestreo. Para la predicción a ciegas y el refinamiento, esos gráficos pueden seguir siendo útiles para buscar convergencia o varios mínimos en el paisaje de energía. Los decoys también pueden agruparse por pares para buscar regiones muy pobladas del espacio conformacional que puedan representar conformaciones alternativas de baja energía. (del cierre de loops KIC)

Novedades desde la última versión
=============================

Desde la última versión no se ha hecho ninguna mejora.

##Véase también

* [Tutorial de modelado de loops](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling)
* [[Loopmodel]]: La página principal de la aplicación loopmodel
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura, incluido el modelado de loops
* [[Fragment file]]: Formato de archivo de fragmentos (necesario para la predicción de estructura ab initio)
* [[Loops file]]: Formato de archivo para especificar loops en el modelado de loops
* [[Loop modeling algorithms|loopmodel-algorithms]]
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
