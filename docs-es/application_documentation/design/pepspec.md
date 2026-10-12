#Aplicación Pepspec

Metadatos
========

Autor: Chris King (dr.chris.king@gmail.com)

Última actualización: 13/4/2010; investigador principal: Phil Bradley (pbradley@fhcrc.org)

Código y demostración
=====================

Estas aplicaciones están en src/apps/public/pepspec/pepspec.cc y src/apps/public/pepspec/pepspec\_anchor\_dock.cc . La demostración está en demo/pepspec . Las pruebas de integración están en test/integration/tests/pepspec\_anchor\_dock y test/integration/tests/pepspec .

Referencias
===========

C.A. King and P. Bradley, Structure-based prediction of protein–peptide specificity in rosetta, Proteins 78 (2010), pp. 3437–3449.

Propósito de la aplicación
===========================================

Muchos eventos de señalización celular e interacciones proteína-proteína están mediados por dominios de unión a péptidos y por motivos peptídicos lineales cortos. La aplicación pepspec se puede usar para la predicción basada en estructura de la especificidad proteína-péptido de proteínas que unen péptidos. Para la aplicación principal pepspec, el usuario debe proporcionar un modelo de la proteína de unión a péptidos de interés unida a un péptido o a un único residuo del péptido. Si no se dispone de ese modelo, primero se puede generar una conformación con un solo residuo acoplado mediante la aplicación pepspec\_anchor\_dock. A la aplicación pepspec\_anchor\_dock hay que suministrarle un modelo de la proteína objetivo sin unir y una o más estructuras de complejos proteína-péptido homólogos para estimar una conformación inicial de un único residuo "ancla" del péptido sobre la superficie de la proteína objetivo. Pepspec usa esta configuración proteína-péptido de entrada como punto de partida para realizar diseño de péptidos con cadena principal flexible sobre la superficie de la proteína, generando un gran número de supuestos ligandos peptídicos. Estos péptidos pueden ordenarse luego según la afinidad de unión predicha para producir una matriz de puntuación específica de posición para la proteína objetivo.

Algoritmo
=========

La aplicación pepspec implementa un algoritmo de docking y diseño de péptidos anclado y con cadena principal flexible, en el que la secuencia y la estructura del péptido se optimizan simultáneamente. En lugar de realizar búsquedas globales de docking del péptido, pepspec requiere como entrada una ubicación aproximada de un residuo "ancla" clave del péptido; el resto del péptido se ensambla a partir de fragmentos, como en la predicción de estructuras de novo, y se refina con optimización simultánea de la secuencia. De forma opcional, la flexibilidad de la cadena principal de la proteína se incorpora de manera implícita acoplando sobre un conjunto estructural (ensemble) de la proteína compañera.

Limitaciones
============

Esta aplicación *NO* sirve para predecir la estructura de una proteína completa. Necesitas un modelo de la proteína de unión a péptidos, aunque este modelo puede provenir de experimentos, de modelado por homología o de plegamiento de novo. Esta aplicación *NO* mueve la cadena principal de la estructura de la proteína de entrada. Los conjuntos de cadenas principales se pueden generar con las aplicaciones [[backrub]] o [[relax]]. Esta aplicación *NO* admite docking de novo del residuo ancla del péptido; necesitas, como mínimo, un modelo de un complejo proteína-péptido homólogo a tu proteína objetivo. Para acoplar un solo residuo sin saber dónde puede estar el bolsillo de unión, puedes considerar la aplicación [[docking|ligand-dock]].

Modos
=====

Esta aplicación tiene dos modos principales: docking del ancla y diseño de péptidos. Docking del ancla: si ya tienes una estructura de la proteína objetivo unida a un péptido de N residuos, quizá no necesites este paso. Si necesitas acoplar un residuo ancla a tu proteína, el modo de docking del ancla te permite usar estructuras de complejos proteína-péptido homólogos para predecir la posición del residuo ancla en tu proteína objetivo. Proporcionas una sola estructura de tu proteína objetivo, o un conjunto de estructuras, junto con un conjunto de complejos homólogos. ¡Los homólogos deben estar alineados con la proteína objetivo! El algoritmo usa las posiciones relativas de los residuos ancla de los homólogos para acoplar un nuevo residuo ancla a tu proteína objetivo, y genera las estructuras y los datos de puntuación asociados para usarlos en el siguiente paso. Diseño de péptidos: en la fase de diseño de péptidos, se diseñan péptidos de unión putativos sobre la superficie de la proteína objetivo. El algoritmo toma como entrada uno o más complejos proteína-péptido. El "péptido" puede ser un solo residuo acoplado en la fase anterior. De forma opcional, el péptido existente se extiende desde cada extremo en un número de residuos definido por el usuario, y se hace un muestreo de baja resolución de la cadena principal antes del diseño de secuencia del péptido en alta resolución. El paso de baja resolución usa un péptido poli-A o poli-G de todos los átomos (no de centroide) con una función de puntuación mínima que solo penaliza los choques atómicos y asegura que el péptido permanezca cerca de la superficie de la proteína. La fase de diseño intenta un diseño combinatorio completo de la secuencia, primero con átomos repulsivos suaves y luego con átomos repulsivos completos, seguido de minimización. Después, la secuencia se diversifica mediante una fase de diseño de Monte Carlo + minimización. En esta etapa de diversificación se hacen mutaciones puntuales aleatorias en el péptido, se optimizan las conformaciones de las cadenas laterales circundantes, y la mutación puntual se acepta o se rechaza de forma estocástica con una probabilidad basada en el cambio de la puntuación de unión estimada del péptido. La puntuación de unión se calcula restando la energía de Rosetta del péptido sin unir, con cadena principal fija y cadenas laterales reempaquetadas, de la energía de Rosetta total del complejo proteína-péptido. (Nota: se puede usar en su lugar la energía total de Rosetta con la opción "-pepspec:binding\_score false".) De este modo, cada cadena principal del péptido genera muchas secuencias de péptido distintas. Los datos de secuencia-puntuación se generan para el posprocesamiento, y opcionalmente también se pueden guardar las estructuras de proteína.

Archivos de entrada
===================

Archivos de entrada del docking del ancla
-----------------------------------------

-   Estructura de entrada (lista): pepspec\_anchor\_dock requiere una estructura de entrada de la proteína objetivo que une péptidos. pepspec\_anchor\_dock también acepta una lista de estructuras de entrada si se desea muestrear un conjunto conformacional de la proteína generado previamente.
-   Lista de estructuras de homólogos + datos del péptido: este archivo contiene una lista de estructuras proteína-péptido homólogas, junto con datos sobre qué residuo de la estructura es el residuo ancla del péptido. Cada línea del archivo debe contener tres entradas separadas por tabuladores: el archivo pdb, la cadena del péptido y el número del residuo ancla del péptido. El formato es:

\<homolog\_pdb\_filename\> \<peptide\_chain\> \<peptide\_anchor\_res\>

para cada homólogo. Se recomienda mucho realizar de antemano el alineamiento estructural de los homólogos con tu estructura objetivo. Esto es necesario para asegurar que las coordenadas de los péptidos de los complejos homólogos queden bien superpuestas en el marco de referencia de tu proteína objetivo. Mientras se puedan obtener las coordenadas de la cadena principal del péptido de los homólogos, el resto de la calidad de los modelos PDB de los homólogos es irrelevante. Opcionalmente puedes elegir que Rosetta intente un alineamiento de secuencia y el posterior alineamiento estructural de las proteínas homólogas con tu proteína objetivo (-pepspec:seq\_align), pero el alineamiento puede no ser ideal. Recomiendo usar [Cealign](http://www.pymolwiki.org/index.php/Cealign) .

Archivos de entrada de Pepspec
------------------------------

-   Estructura(s) de entrada: pepspec requiere una estructura de entrada de una proteína acoplada a un polipéptido de N residuos. pepspec también acepta una lista de estructuras de entrada si se desea muestrear un conjunto conformacional. Las estructuras acopladas con un solo residuo se pueden generar con la aplicación pep\_anchor\_dock (véase arriba).
-   Archivo de restricciones (opcional): pepspec puede usar opcionalmente restricciones de coordenadas sobre la cadena principal del péptido. Estas restricciones se pueden generar con la aplicación pep\_anchor\_dock.
-   Estructura nativa (opcional): cuando se conoce la estructura nativa, pepspec puede imprimir información de RMSD de la cadena principal del péptido junto con los datos de puntuación y secuencia.
-   Restricciones del péptido (opcional): se puede usar un archivo de restricciones del péptido (generado automáticamente en la fase de docking del ancla) para sesgar la cadena principal del péptido hacia conformaciones similares a las de los péptidos de los complejos homólogos, mediante una restricción armónica de fondo plano. Cada línea del archivo de restricciones corresponde a una posición del péptido; se pueden borrar líneas del archivo de restricciones para liberar la posición correspondiente del péptido del sesgo durante el muestreo de la cadena principal. Cada línea contiene ocho valores separados por tabuladores: el nombre del átomo, la posición en la secuencia del péptido *relativa al residuo ancla (0)* , las coordenadas xyz, la distancia mínima a las coordenadas xyz (0.0), la desviación estándar (inverso de la "constante del resorte") y la distancia de tolerancia de restricción cero desde el centro del pozo armónico. El formato de los archivos de restricciones del péptido es:

\<atom\_name\> \<peptide\_position\> \<x\_coord\> \<y\_coord\> \<z\_coord\> \<0.0\> \<std\_dev\> \<tolerance\>

Opciones
========

Probablemente solo necesites usar las opciones generales y las típicas. Estas opciones tendrán más sentido después de leer la sección de consejos más abajo.

-option:name [data\_type] - esta es una descripción (default\_value)

Opciones generales
------------------

-   -database [file path] - la ubicación de la base de datos de Rosetta 3
-   -in:file:s [file path] - estructura de entrada única
-   -pepspec:pdb\_list [String] - en lugar de una sola estructura de entrada, usa una lista de estructuras de entrada ()
-   -o [String] - cadena que define la etiqueta usada para nombrar los archivos de puntuación, los pdb y los directorios de pdb de salida
-   -ex1 - aumenta la resolución de chi1 de la biblioteca de rotámeros
-   -ex2 - aumenta la resolución de chi2 de la biblioteca de rotámeros
-   -extrachi\_cutoff 0 - aumenta el muestreo de rotámeros en posiciones expuestas

Opciones del docking del ancla (típicas)
----------------------------------------

-   -pepspec:ref\_pdb\_list [String] - archivo de lista de estructuras homólogas y datos del ancla del péptido ()
-   -pepspec:n\_peptides [Integer] - número de estructuras de salida que se generan (8)
-   -pepspec:anchor\_type [String] - código de aminoácido de tres letras, tipo de residuo del ancla que se va a acoplar (ALA)
-   -pepspec:no\_prepack\_prot [Boolean] - suprime el reempaquetado de todos los rotámeros de la estructura de proteína de entrada (véase la sección de consejos más abajo) (false)

Opciones del docking del ancla (adicionales)
--------------------------------------------

-   -pepspec:clash\_cutoff [Real] - umbral de puntuación repulsiva de VdW para definir choques entre residuos (5.0)
-   -pepspec:prep\_align\_prot\_to [String] - alinea las estructuras objetivo de entrada (cuando se usa un conjunto de entrada) con una estructura ()
-   -pepspec:prep\_use\_ref\_rotamers [Boolean] - copia los ángulos chi del residuo ancla de los péptidos homólogos y suprime la optimización de rotámeros (false)
-   -pepspec:n\_dock\_loop [Integer] - número de iteraciones del ciclo interno de docking (4)
-   -pepspec:n\_anchor\_dock\_std\_devs [Real] - número de desviaciones estándar en las que se permite la desviación traslacional y rotacional respecto a la orientación de cuerpo rígido promedio del residuo ancla de los homólogos (1.0)
-   -pepspec:prep\_trans\_std\_dev [Real] - fija manualmente la magnitud de la perturbación traslacional (Angstroms) del residuo ancla respecto al promedio de los homólogos en el docking (ignora la desviación estándar de los homólogos) (0.5)
-   -pepspec:prep\_rot\_std\_dev [Real] - fija manualmente la magnitud de la perturbación rotacional (grados) del residuo ancla respecto al promedio de los homólogos en el docking (ignora la desviación estándar de los homólogos) (10.0)
-   -pepspec:seq\_align [Boolean] - intenta el alineamiento de secuencia/estructura de los homólogos con la estructura objetivo (NO RECOMENDADO) (false)

Opciones de Pepspec (típicas)
-----------------------------

-   -pepspec:pep\_anchor [Integer] - residuo ancla del péptido ()
-   -pepspec:pep\_chain [String] - cadena del péptido ()
-   -pepspec:n\_prepend [Integer] - número de residuos que se agregan al extremo N del péptido o del residuo ancla (0)
-   -pepspec:n\_append [Integer] - número de residuos que se agregan al extremo C del péptido o del residuo ancla (0)
-   -pepspec:n\_peptides [Integer] - número de estructuras proteína-péptido de salida que se generan (8)
-   -pepspec:homol\_csts [String] - nombre del archivo de restricciones del péptido, generado por pepspec\_anchor\_dock (opcional) ()

Opciones de Pepspec (adicionales)
---------------------------------

-   -score:weights [String] - pesos de la función de puntuación usados para el muestreo de rotámeros, la minimización y la puntuación final (standard.wts)
-   -pepspec:soft\_wts [String] - pesos de la función de puntuación usados para el muestreo de rotámeros con repulsión suave (soft\_rep.wts)
-   -pepspec:cen\_wts [String] - pesos de la función de puntuación usados para el muestreo de baja resolución de la cadena principal del péptido (cen\_ghost.wts)
-   -pepspec:binding\_score [Boolean] - calcula la puntuación de unión, usada para el muestreo MC-min de diversidad de secuencias (true)
-   -pepspec:upweight\_interface [Boolean] - aumenta por un factor de 2 las interacciones de puntuación proteína-péptido (false)
-   -pepspec:run\_sequential [Boolean] - usa todas las estructuras de entrada de la lista de pdb de entrada de forma secuencial, sin elegir al azar (false)
-   -pepspec:n\_build\_loop [Integer] - número de iteraciones del muestreo global de baja resolución de la cadena principal del péptido (1000)
-   -pepspec:n\_cgrelax\_loop [Integer] - número de iteraciones del muestreo local de baja resolución de la cadena principal del péptido (1)
-   -pepspec:interface\_cutoff [Real] - umbral de distancia para la definición de la interfaz proteína-péptido (5.0)
-   -pepspec:use\_input\_bb [Boolean] - conserva la estructura de la cadena principal del péptido de entrada (false)
-   -pepspec:remove\_input\_bb [Boolean] - elimina todos los residuos del péptido excepto el ancla (false)
-   -pepspec:frag\_file [String] - archivo de biblioteca de fragmentos usado en el muestreo global de la cadena principal del péptido (filtered.vall.dat.2006-05-05.gz)
-   -pepspec:gen\_pep\_bb\_sequential [Boolean] - agrega los residuos del péptido uno a uno durante el muestreo global de la cadena principal del péptido (false)
-   -pepspec:input\_seq [String] - construye péptidos de una secuencia dada, sin hacer ningún diseño ()
-   -pepspec:ss\_type [String] - usa solo fragmentos de una estructura secundaria dada en el muestreo global de la cadena principal del péptido ()
-   -pepspec:clash\_cutoff [Real] - umbral de puntuación repulsiva de VdW para definir choques entre residuos (5.0)
-   -pepspec:calc\_sasa [Boolean] - calcula el delta SASA de cada secuencia de salida en el archivo de puntuación (ejecución más lenta) (false)
-   -pepspec:diversify\_pep\_seqs [Boolean] - realiza la diversificación de secuencias MC-min en cada cadena principal del péptido (true)
-   -pepspec:diversify\_lvl [Integer] - controla la cantidad de muestreo en la diversificación de secuencias. El número de secuencias intentadas es el número de residuos del péptido multiplicado por este valor (10)
-   -pepspec:save\_low\_pdbs [Boolean] - guarda un pdb del complejo proteína-péptido por cada péptido diseñado (true)
-   -pepspec:save\_all\_pdbs [Boolean] - además, guarda un pdb por cada secuencia de péptido generada en la etapa de diversificación de secuencias del péptido (false)
-   -pepspec:no\_design [Boolean] - no cambia la secuencia del péptido de entrada (false)

Opciones de benchmarking
------------------------

-   -in:file:native [String] - estructura nativa, para benchmarking ()
-   -pepspec:native\_pep\_anchor [Integer] - residuo ancla del péptido nativo ()
-   -pepspec:native\_pep\_chain [String] - residuo ancla del péptido nativo ()
-   -pepspec:native\_align [Boolean] - alinea la estructura objetivo con la nativa para el análisis de RMSD (false)
-   -pepspec:rmsd\_analysis [Boolean] - genera datos de RMSD de C-alfa del péptido (false)
-   -pepspec:phipsi\_analysis [Boolean] - genera datos de phi/psi del péptido (false)

Consejos
========

-   usa las opciones "-ex1" y "-ex2" para un muestreo extra de rotámeros. Usa "ex1" sin falta. Puedes experimentar con "-ex2" si esperas necesitar muestreo de muchas cadenas laterales largas.
-   usa "-extrachi\_cutoff 0" para asegurar que tus opciones -ex realmente sean efectivas

Consejos para el docking del ancla
----------------------------------

-   La proteína objetivo se preempaquetará automáticamente con esta aplicación. Si los rotámeros de las cadenas laterales de la estructura de entrada ya fueron optimizados por Rosetta, usa -pepspec:no\_prepack\_prot para acelerar la ejecución.
-   Si el docking sigue fallando por choques entre residuos, ¡revisa tu alineamiento estructural! Si todo parece alineado, prueba a aumentar la tolerancia a choques (por defecto 5.0) con -pepspec:clash\_cutoff. Esto puede ocurrir especialmente al intentar acoplar en un sitio activo catalítico. No te preocupes, estos choques se ignorarán en la siguiente fase.
-   Después de la ejecución, quizá quieras usar el archivo de puntuación para filtrar las conformaciones acopladas de alta energía antes de pasar el conjunto de estructuras acopladas a la fase de diseño de péptidos.

Consejos para Pepspec
---------------------

-   Una nota sobre el uso de restricciones del péptido: si usaste la aplicación pepspec\_anchor\_dock para obtener las estructuras iniciales, es posible que el archivo de restricciones de la cadena principal del péptido se haya generado usando como referencia solo uno o dos complejos homólogos. Si es así, o si tienes motivos para creer que los péptidos pueden de hecho unirse con conformaciones de cadena principal no representadas en el conjunto de homólogos, el uso de las restricciones puede impedir que tu simulación llegue a generar la diversidad necesaria de estructuras de cadena principal del péptido. Para evitar el uso de restricciones, simplemente no incluyas una referencia al archivo de restricciones en los argumentos de la línea de comandos (por ejemplo, elimina la línea "-pepspec::homol\_csts \*.cst" de tus argumentos de entrada). Si no usas restricciones, necesitas mucho, MUCHO más muestreo (es decir, un orden de magnitud más).
-   ¡La proteína objetivo *debe* estar preempaquetada antes de intentar el diseño de péptidos! No hacerlo puede dar respuestas absurdas. Si NO usas una estructura de entrada generada en la fase de docking del ancla de pepspec, usa la aplicación [[fixbb]] para reempaquetar todas las cadenas laterales.
-   Por defecto, solo se guarda una estructura por conformación de cadena principal del péptido. Esto se debe a que la fase de diversificación de secuencias generaría un número enorme de estructuras similares. Para guardar una estructura por cada línea del archivo de puntuación, usa -pepspec:save\_all\_pdbs .
-   La etapa de diversificación puede ralentizar bastante la ejecución. Si no te preocupa sobreconverger a una solución (por ejemplo, si solo intentas diseñar un ligando peptídico), puedes suprimir ese comportamiento con el argumento de línea de comandos "-pepspec:diversify\_pep\_seqs false"

Salidas esperadas
=================

Esta aplicación produce estructuras proteína-péptido y archivos de puntuación. Los archivos de puntuación se pueden usar para generar matrices de pesos de posición de especificidad de secuencia con los scripts descritos más abajo. Nota: pepspec generará automáticamente carpetas para las estructuras de salida con el nombre "\<output\_tag\>.pdbs"

Posprocesamiento
================

Se puede generar una matriz de pesos de posición (PWM) a partir de la salida de pepspec con el script gen\_pepspec\_pwm.py que se encuentra en (ROSETTA\_LOCATION)/analysis/apps. Este script ordena todas las secuencias de péptidos por la puntuación de unión de Rosetta y genera una matriz de posiciones del péptido por frecuencias de residuos. Opcionalmente se puede suministrar una PWM de fondo para normalizar la PWM bruta de la salida de pepspec (consulta las Referencias al principio de este documento). Ejecuta 'gen\_pepspec\_pwm.py help' para más información.

-   Las PWM también se pueden generar y visualizar con software de terceros como [WebLogo](http://weblogo.berkeley.edu) .

-   Nota: ¡la PWM de fondo suministrada es válida para normalizar PWM generadas con los pesos de puntuación standard.wts de Rosetta! Usar pesos de puntuación distintos perturbará necesariamente las frecuencias de residuos de la PWM de fondo.

Novedades desde la última versión
=================================

Esta es la primera versión de estas aplicaciones.

##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta
