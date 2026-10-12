#La aplicación sequence\_tolerance

Metadatos
========

Autor: Colin A. Smith

Este documento fue actualizado por última vez el 26 de marzo de 2015 por Shane Ó Conchúir. La investigadora principal correspondiente es Tanja Kortemme (kortemme@cgl.ucsf.edu).

Código y demostración
=====================

El código de la aplicación sequence\_tolerance está en src/apps/public/sequence\_tolerance.cc. Una prueba de integración y demostración se encuentra en rosetta/main/tests/integration/tests/sequence\_tolerance. Las clases abstractas del algoritmo genético están en el espacio de nombres protocols::genetic\_algorithm. Las subclases concretas están en el espacio de nombres protocols::multistate\_design.

Referencias
===========

-   Smith CA, Kortemme T. Structure-Based Prediction of the Peptide Sequence Space Recognized by Natural and Synthetic PDZ Domains. *J Mol Biol* . [http://dx.doi.org/10.1016/j.jmb.2010.07.032](http://dx.doi.org/10.1016/j.jmb.2010.07.032)

-   Humphris EL, Kortemme T. *Structure* . Prediction of protein-protein interface sequence diversity using flexible backbone computational protein design. 2008 Dec 10;16(12):1777-88. [http://dx.doi.org/10.1016/j.str.2008.09.012](http://dx.doi.org/10.1016/j.str.2008.09.012)

Propósito
===========================================

Los usos generales de esta aplicación son la predicción de especificidad y el diseño de bibliotecas (por ejemplo, para phage display, yeast display u otras técnicas de selección). Para ello, la aplicación determina las puntuaciones de un gran número de secuencias sobre una estructura de entrada dada. Las puntuaciones se pueden reponderar para enfatizar las interacciones inter o intramoleculares.

Algoritmo
=========

Cuando esta aplicación se inicia, precalcula las energías de rotámeros de un cuerpo y de dos cuerpos para todos los aminoácidos especificados en las posiciones definidas en el resfile. Se usa un algoritmo genético que toma una población inicial de secuencias y genera generaciones sucesivas de secuencias que, en conjunto, deberían tener menor puntuación que las generaciones anteriores.

Cada vez que se calcula la puntuación de una secuencia dada, se usa recocido simulado (simulated annealing) para optimizar los rotámeros de esa secuencia. Las configuraciones de rotámeros se optimizan con una función de puntuación que pondera por igual todas las interacciones estructurales. Después de optimizar los rotámeros, la puntuación de la secuencia se puede reponderar para enfatizar o restar énfasis a cadenas individuales, así como a las interacciones entre cadenas.

La primera generación se siembra con la secuencia que resulta de la optimización completa de rotámeros usando todos los aminoácidos permitidos en el resfile proporcionado. Opcionalmente se pueden generar secuencias adicionales mutando esta secuencia. El resto de la población inicial consiste en secuencias aleatorias.

En las generaciones siguientes, la secuencia con mejor aptitud (fitness; véase -seq\_tol:fitness\_master\_weights) siempre se propaga a la siguiente generación. Las demás secuencias se generan por mutación y recombinación de secuencias de la generación anterior. Las secuencias para mutación y recombinación se eligen mediante selección por torneo, en la que se eligen al azar dos secuencias de la población parental y se selecciona la de mejor aptitud.

Limitaciones
============

Aunque esta aplicación usa clases diseñadas para incorporar múltiples estados, actualmente no admite diseño multiestado.

Archivos de entrada
===================

-   La estructura inicial debe estar en formato PDB y se puede especificar con la opción -s. Solo se puede usar una única estructura.

-   El muestreo de cadenas laterales se controla con la opción de línea de comandos -resfile. Consulta la [[documentación de resfiles|resfiles]] para más información sobre cómo crear un resfile. Se deben especificar al menos dos aminoácidos como diseñables. Ten presente el tamaño combinatorio del espacio de secuencias (es decir, 20\^2, 20\^3, etc.) al establecer el tamaño de la población y el número de generaciones. En diseños con un tamaño combinatorio pequeño, la enumeración directa es la mejor forma de evaluar todas las secuencias. Esto no se hace automáticamente, pero se puede lograr suministrando un archivo de generaciones personalizado (véase más abajo).

Opciones
========

Opciones generales y de empaquetado
-----------------------------------

-   -database [file path] - la ubicación de la base de datos de Rosetta 3

-   -in:file:s [file path] - la estructura usada para el empaquetado

-   -packing:resfile [file path] - define qué residuos se pueden mutar o reempaquetar

-   -ex1, -ex2, -extrachi\_cutoff [num residues], etc. - aumentan la resolución de la biblioteca de rotámeros

Opciones de puntuación y repuntuación de secuencias
---------------------------------------------------

-   -score:weights - especifica pesos y opciones personalizados de la función de puntuación para usar con el empaquetado

-   -seq\_tol:fitness\_master\_weights [real vector] - pesos maestros de la función de aptitud usados en la optimización del algoritmo genético (por defecto, sin ponderar)

La mejor forma de entender cómo funciona la función de aptitud es examinar un ejemplo de salida de una proteína de dos cadenas:

```
app.sequence_tolerance: Residue Decomposition: [Set 1 (A): [1, 2, ...], Set 2 (B): [104, 105, ...]]
app.sequence_tolerance: Fitness Function Master Weights: [1, 1, 1, 2]
app.sequence_tolerance: Fitness of Starting Structure:
---------------------------------------------------------------------
Score Type                  Other        A        B      A-B    Total
---------------------------------------------------------------------
fa_atr                      0.000 -266.124  -10.049  -43.778 -319.952
...
hbond_sr_bb               -17.074    0.000    0.000    0.000  -17.074
hbond_lr_bb               -24.484    0.000    0.000    0.000  -24.484
...
---------------------------------------------------------------------
Total                     -41.558  -57.662    4.319  -17.429 -112.330
```

Según los identificadores de cadena dados en el archivo PDB, los residuos de la proteína se descomponen en varios conjuntos, cuyos números absolutos de residuo se listan en la primera línea anterior. La función de aptitud se construye de modo que las energías dentro de esos conjuntos y entre ellos se puedan ponderar de forma independiente. Se define como un vector de números reales que fijan los pesos de esos componentes de energía. Cada elemento del vector corresponde a una columna de la tabla anterior.

El primer peso de la función de aptitud corresponde a aquellos elementos de la función de energía que no se descomponen en energías por residuo o por par de residuos. En la salida anterior se llama "Other". En la función de puntuación estándar, los únicos términos para los que esto ocurre son los de enlaces de hidrógeno cadena principal-cadena principal de corto y largo alcance. Salvo en algunos residuos de prolina, estos términos no cambian con la mutación de cadenas laterales.

Los siguientes pesos de la función de aptitud corresponden a las energías dentro de cada conjunto de residuos. En la salida anterior se llaman "A" y "B". En una proteína de tres cadenas habría tres de estos pesos.

Los últimos pesos de la función de aptitud corresponden a las energías entre cada par de conjuntos de residuos. En la salida anterior solo hay uno de estos pesos, llamado "A-B". Para una proteína de tres cadenas A, B y C habría tres de estos pesos: A-B, A-C y B-C. La expansión continúa con ese mismo patrón para proteínas con más cadenas.

En la función de aptitud anterior, las interacciones entre las cadenas A y B se ponderan al doble. La mejor forma de saber qué elemento del vector de pesos de la función de aptitud corresponde a cada conjunto o interacción entre conjuntos es ejecutar primero la aplicación sequence\_tolerance y luego usar la tabla de salida como referencia.

Opciones del algoritmo genético
-------------------------------

-   -ms:pop\_size [integer] - número de secuencias por generación (por defecto 100; en Humphris 2008 se usó 2000)

-   -ms:generations [integer] - número de generaciones (por defecto 20; en Humphris 2008 se usó 5)

-   -ms:pop\_from\_ss [integer] - número de secuencias de la población inicial que se crean por mutación de la secuencia determinada por el rediseño completo (por defecto 0)

-   -ms:mutate\_rate [real] - probabilidad de aleatorizar cada residuo cuando se muta una secuencia (por defecto 0.5)

-   -ms:fraction\_by\_recombination [real] - fracción de secuencias que se generan por recombinación de secuencias de la generación anterior (por defecto 0.5)

-   -ms:num\_packs [integer] - número de veces que se llama al recocido simulado para encontrar la mejor configuración de rotámeros de una secuencia dada (por defecto 1)

Opciones de salida
------------------

Los archivos de punto de control (checkpoint) sirven tanto para conservar el estado de la simulación como para dejar después un registro de qué secuencias se evaluaron. Para activar los puntos de control, deben especificarse tanto -ms:checkpoint:prefix como -ms:checkpoint:interval.

-   -ms:checkpoint:prefix [string] - prefijo que se agrega al principio de los nombres de los archivos de punto de control

-   -ms:checkpoint:interval [integer] - frecuencia, en número de secuencias evaluadas, con la que se escriben los archivos de punto de control (por defecto 0; se sugiere 200)

-   -ms:checkpoint:gz - comprime los archivos de punto de control con gzip (recomendado)

-   -ms:checkpoint:rename - renombra los archivos de punto de control cuando el algoritmo genético termina, de modo que las ejecuciones posteriores generen una salida nueva (no recomendado)

-   -seq\_tol:unsat\_polars - para cada secuencia, calcula con BuriedUnsatisfiedPolarsCalculator el número de átomos polares enterrados con enlaces de hidrógeno no satisfechos y lo agrega al archivo de punto de control (hace la ejecución más lenta)

-   -seq\_tol:surface - para cada secuencia, calcula con SurfaceCalculator la puntuación de superficie y la agrega al archivo de punto de control (hace la ejecución más lenta)

-   -ms:numresults [integer] - número de secuencias para las que se generan estructuras de salida, empezando por la de menor puntuación (por defecto 1)

Consejos
========

Como se indicó antes, las publicaciones anteriores han usado un tamaño de población de 2,000 y 5 poblaciones. Sin embargo, con esta implementación no se ha intentado optimizar los parámetros del algoritmo genético.

Se recomiendan bibliotecas de rotámeros de mayor resolución. Las siguientes opciones se han usado en publicaciones: -ex1 -ex2 -extrachi\_cutoff 0. Aunque las opciones -ex1aro -ex2aro se usaron en la línea de comandos de la publicación, son redundantes y no son necesarias.

Las ejecuciones con un tamaño de población de 2,000 y 5 generaciones para un artículo reciente de predicción de especificidad de PDZ (Smith & Kortemme 2010) tardaron en promedio 33.5 minutos por estructura. Cada simulación se ejecutó en un solo núcleo de un clúster heterogéneo de estaciones de trabajo Xeon de 8 núcleos con procesadores E5345, E5430 y E5520.

Salidas esperadas
=================

La aplicación sequence\_tolerance produce comparativamente poca salida impresa. Sí proporciona estadísticas resumidas de cada generación evolucionada. Por ejemplo:

```
app.sequence_tolerance: Generation 2:
app.sequence_tolerance: Distinct new entities: 1914
app.sequence_tolerance: Duplicate new entities: 4
app.sequence_tolerance: Entities from previous generation: 82
app.sequence_tolerance: Entities resurrected from earlier generations: 0
app.sequence_tolerance: Fitness Percentiles: 0%=-129.236 25%=-116.689 50%=-113.139 75%=-94.8569 100%=2234.36
app.sequence_tolerance: Best new entity:
MultiStateEntity with traits: AA:106:L AA:107:A AA:108:Y AA:109:W AA:110:V and fitness -127.504
 SingleState 1 with fitness: -127.504
```

Los dos primeros recuentos indican el número de secuencias únicas y duplicadas evaluadas por primera vez en la generación dada. Los dos recuentos siguientes indican el número de secuencias incluidas en esta generación que estaban presentes en la generación inmediatamente anterior o en generaciones previas. También se da un resumen de la distribución de las aptitudes, que incluye la mejor, el primer cuartil, la mediana, el tercer cuartil y la peor aptitud. Por último, se muestra la mejor secuencia evaluada por primera vez en esta generación.

Archivos de punto de control
----------------------------

La mayor parte de la salida relevante de la aplicación sequence\_tolerance se encuentra en los archivos de punto de control. El primer archivo, prefix.ga.generations, contiene todas las secuencias de cada generación, listadas con una salida como la siguiente:

```
generation 1
AA:106:F AA:107:A AA:108:T AA:109:F AA:110:V
AA:106:M AA:107:I AA:108:G AA:109:I AA:110:H
...
AA:106:Y AA:107:E AA:108:H AA:109:R AA:110:S
generation 5
AA:106:F AA:107:A AA:108:T AA:109:F AA:110:V
AA:106:R AA:107:G AA:108:W AA:109:T AA:110:G
...
AA:106:N AA:107:D AA:108:E AA:109:N AA:110:F
```

Cada generación empieza con una línea "generation N". En las líneas siguientes, cada secuencia de esa generación está delimitada por espacios y sus residuos tienen el formato AA:absolute\_residue\_number:one\_letter\_amino\_acid\_type.

El segundo archivo, prefix.ga.entities, contiene todas las secuencias de todas las generaciones, listadas con una salida como la siguiente:

```
traits AA:106:N AA:107:D AA:108:Q AA:109:H AA:110:N fitness -83.2501 states 1
 fitness -83.2501 metrics 1 fitness_comp Real[ -34.1734 -36.8645 1.63354 -6.92286 ]
traits AA:106:D AA:107:H AA:108:M AA:109:H AA:110:W fitness 648.546 states 1
 fitness 648.546 metrics 1 fitness_comp Real[ -34.1734 -10.28 6.03952 343.48 ]
...
```

Arriba se muestran los datos de dos secuencias, cada una en dos líneas. El formato de salida es algo redundante, ya que está diseñado para guardar información de varios estados estructurales por cada secuencia. (Esta redundancia es una de las razones por las que se recomienda la compresión.) Para esta aplicación solo se usa un estado. La secuencia tiene el mismo formato que en el archivo de generaciones. La aptitud ponderada ("fitness") se da dos veces. También se dan los componentes sin ponderar ("fitness\_comp") de la puntuación de aptitud.

Enumeración de secuencias y salida de estructuras
-------------------------------------------------

Además del posprocesamiento, también se puede generar de antemano archivos de punto de control para lograr varias tareas, entre ellas la enumeración de secuencias y la salida de estructuras. Para cualquiera de las dos, debes crear un archivo prefix.ga.generations, en el formato mostrado arriba, que contenga una sola generación con todas las secuencias que se van a evaluar o a generar como salida. Luego ejecuta sequence\_tolerance con -ms:generations igual a 1 y -ms:pop\_size igual al número de secuencias de tu archivo de generaciones. Antes de ejecutar sequence\_tolerance debe existir un archivo prefix.ga.entities vacío; de lo contrario, el archivo de generaciones de entrada se sobrescribirá con secuencias aleatorias. Tras ejecutar sequence\_tolerance con un resfile compatible, se creará un archivo prefix.ga.entities con las puntuaciones de todas las secuencias que especificaste. Para generar estructuras, simplemente agrega -ms:numresults con el número de estructuras que quieras obtener, hasta el número de secuencias especificado en el archivo de generaciones.

Por ejemplo, este es un archivo de generaciones, myprefix.ga.generations, que se podría usar para calcular la puntuación y generar estructuras de las tres secuencias dadas:

```
generation 1
AA:106:F AA:107:N AA:108:E AA:109:W AA:110:I
AA:106:F AA:107:E AA:108:T AA:109:W AA:110:V
AA:106:F AA:107:D AA:108:T AA:109:W AA:110:V
```

Esta es la línea de comandos que se usaría para ejecutar sequence\_tolerance:

```
sequence_tolerance -database /path/to/rosetta/main/database -s mystructure_0001_low.pdb
-resfile myresfile.resfile -ex1 -ex2 -ex1aro -ex2aro -extrachi_cutoff 0
-seq_tol:fitness_master_weights 1 1 1 2 -ms:generations 1 -ms:pop_size 3
-ms:checkpoint:prefix myprefix -ms:checkpoint:interval 200
-out:prefix myprefix -ms:numresults 3
```

Si no te interesa generar estructuras, cambia -ms:numresults 3 por -ms:numresults 0.

Posprocesamiento
================

Los archivos de punto de control están diseñados para ser analizados y procesados computacionalmente. En analysis/apps/sequence\_tolerance.R se proporcionan varias funciones de R para hacerlo. Incluye funciones para leer los archivos de punto de control \*.ga.entities y \*.ga.generations. También tiene una función para escribir archivos de punto de control \*.ga.generations para la enumeración de secuencias y la salida de estructuras (véase inmediatamente arriba). Por último, contiene una función para reponderar un conjunto de secuencias con distintos pesos de la función de aptitud. Consulta los comentarios sobre cada función para saber cómo se usan.

Para determinar el perfil de secuencias toleradas de una proteína dada, la aplicación sequence\_tolerance se ejecuta normalmente varias veces, una por cada miembro de un conjunto de estructuras de cadena principal. El archivo sequence\_tolerance.R tiene una función de conveniencia para procesar esa salida, llamada process\_specificity(). La forma más sencilla de ejecutarla es cambiar a un directorio que contenga todos los archivos de entidades que quieras procesar, ejecutar R y ejecutar los siguientes comandos:

```
> source("path/to/analysis/apps/sequence_tolerance.R")
> process_specificity()
```

Produce varios archivos de salida:

-   specificity\_boxplot.pdf - un diagrama de caja (boxplot) por página de las frecuencias de cada residuo
-   specificity\_boxplot.png - todos los diagramas de caja de todos los residuos en una sola imagen
-   specificity\_boxplot\_resnum.png - un diagrama de caja por imagen para cada residuo
-   specificity\_pwm.txt - una matriz de pesos de posición (PWM) de todos los residuos
-   specificity\_sequences.fasta - un archivo FASTA con 100 secuencias que se puede usar para producir un logo de secuencia con WebLogo u otro programa

La función process\_specificity() tiene varios parámetros, cuyos valores por defecto son los que se vio que funcionan bien para la predicción de especificidad de péptidos de PDZ de tipo silvestre. Los pesos de la función de aptitud se pueden cambiar con "fitness\_coef". La temperatura de Boltzmann (por defecto 0.228) o el umbral de secuencias se pueden cambiar con "temp\_or\_thresh". El tipo de ponderación de secuencias se puede cambiar especificando la cadena "boltzmann" (por defecto) o "cutoff" en el parámetro "type". Por último, el percentil de corte para combinar PWM de distintas estructuras de cadena principal (por defecto 0.5) se puede cambiar con "percentile". En Smith y Kortemme (2010) se da una explicación más detallada de los parámetros y del análisis realizado.

Si quieres seguir la pauta determinada para la predicción de especificidad en mutantes, aumenta la temperatura por defecto en 0.021 por cada mutación fija que hagas en la estructura inicial. Por ejemplo, con una mutación ejecutarías esto en su lugar:

```
> process_specificity(temp_or_thresh=0.249)
```

Captura del protocolo
=====================

Se puede descargar una versión revisada y mantenida de la captura de protocolo original de sequence tolerance desde el sitio web de 
[[benchmarks de modelado y diseño macromolecular|https://kortemmelab.ucsf.edu/benchmarks/captures/sequence_tolerance]]. La [[página de sequence tolerance|https://kortemmelab.ucsf.edu/benchmarks/benchmarks/sequence_tolerance]] también describe el rendimiento esperado para 
los conjuntos de benchmark publicados.

Novedades desde la última versión
=================================

Esta es la primera versión publicada, no hay cambios.


##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta
