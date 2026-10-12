#Aplicación MakeRotLib

Metadatos
========

Autor: P. Douglas Renfrew (renfrew@nyu.edu)
Autor: Andrew Watkins (amw579@nyu.edu)

La documentación fue actualizada en febrero de 2016 por Andy Watkins. Vikram K. Mulligan (vmulligan@flatironinstiutute.org) añadió el 9 de noviembre de 2018, y Andy Watkins el 27 de noviembre de 2018, notas sobre cómo el uso actual difiere de lo que se documenta aquí. Vikram K. Mulligan hizo pequeños ajustes el 13 y el 17 de mayo de 2021. El investigador principal (PI) de esta aplicación es Brian Kuhlman (bkuhlman@email.unc.edu).

[[_TOC_]]

Código y demostración
=============

El mover principal está en el código de la aplicación, en `       main/source/src/protocols/make_rot_lib      `. El código de la aplicación está en `       main/source/src/apps/public/ncaa_utilities/MakeRotLib.cc      `. Las pruebas de integración se encuentran en `       main/tests/integration/tests/make_rot_lib/      `. La demostración se encuentra en `       demos/public/make_rot_lib/      `.

Referencias
==========

P. Douglas Renfrew, Eun Jung Choi, Brian Kuhlman, "Using Noncanonical Amino Acids in Computational Protein-Peptide Interface Design" (2011) PLoS One. Se recomienda encarecidamente leer el artículo, ya que ofrece detalles adicionales.

Una versión *muy* temprana de este código se usó para generar una biblioteca de rotámeros de un colorante unido en Gulyani A, Vitriol E, Allen R, Wu J, Gremyachinskiy D, Lewis S, Dewar B, Graves LM, Kay BK, Kuhlman B, Elston T, Hahn KM. A biosensor generated via high-throughput screening quantifies cell edge Src dynamics. Nat Chem Biol. 2011 Jun 12;7(7):437-44. doi: 10.1038/nchembio.585. Erratum in: Nat Chem Biol. 2012 Aug;8(8):737. PubMed PMID: 21666688; PubMed Central PMCID: PMC3135387.

Propósito
===========================================

Este código crea una biblioteca de rotámeros de aminoácidos no canónicos (NCAA) y es el segundo de los tres pasos necesarios para poder usar un NCAA en Rosetta.

Algoritmo
=========

Las bibliotecas de rotámeros son conjuntos de conformaciones habituales de cadenas laterales que, por lo general, corresponden a mínimos locales del panorama de energía conformacional de la cadena lateral. Las conformaciones de las cadenas laterales suelen representarse como un conjunto de ángulos medios y una desviación estándar que indica la variabilidad. Las bibliotecas de rotámeros se usan en Rosetta con dos fines principales: proporcionar puntos de partida para las rutinas de optimización de cadenas laterales, y usar la frecuencia relativa como una pseudoenergía. Tradicionalmente, las bibliotecas de rotámeros se crean recopilando estadísticas de estructuras de proteínas. Rosetta usa las bibliotecas de rotámeros de Dunbrack, que dependen de la cadena principal. Como no hay suficientes estructuras que contengan NCAA, hay que generarlas.

Ejecutar el protocolo MakeRotLib consta de cuatro pasos

-   crear una plantilla de entrada y generar los archivos de opciones de MakeRotLib
-   ejecutar el protocolo MakeRotLib con cada archivo de opciones
-   ensamblar las bibliotecas de rotámeros individuales en un solo archivo
-   modificar el archivo de parámetros de ResidueType para que conozca nuestra nueva biblioteca de rotámeros

Limitaciones
===========

Este código se diseñó originalmente para crear bibliotecas de rotámeros al estilo de Dunbrack 2002 para cadenas laterales no canónicas con una cadena principal de alfa-péptido. Se ha extendido razonablemente bien para manejar cadenas principales de peptoides y de beta-péptidos; además, tiene la capacidad de generar la distribución continua necesaria para un enfoque al estilo de Dunbrack 2010 para un chi no rotamérico (como el chi2 del aspartato).

Archivos de entrada
===========

Rosetta usa principalmente bibliotecas de rotámeros que dependen de la cadena principal. Estas bibliotecas proporcionan conformaciones de cadenas laterales muestreadas en posiciones de residuos cuyos ángulos diedros de la cadena principal caen en intervalos (bins) concretos. En el caso de las bibliotecas de rotámeros de Dunbrack que usa Rosetta, los bins son intervalos de 10 grados tanto para phi como para psi, para un total de 1296 (36\*36) bins de phi/psi.  (Para los beta-aminoácidos, por ahora, empleamos bins de 30 grados, para un total de 1728 (12\*12\*12).) Para replicar esto con los NCAA, necesitamos crear un conjunto de rotámeros de cadena lateral para cada miembro de un conjunto de bins de phi/psi.

El protocolo MakeRotLib recibe como entrada un archivo de opciones. Requiere un archivo de opciones para cada bin de phi/psi. El primer paso para ejecutarlo es crear esos 1296 archivos de opciones. Siguiendo con la captura del protocolo HowToMakeResidueTypeParamFiles, usamos de nuevo la ornitina como ejemplo. La ornitina tiene 3 ángulos diedros de cadena lateral (chi). Queremos muestrear cada ángulo chi de 0 a 360 grados en intervalos de 30 grados y, según la química de la cadena lateral, predecimos que probablemente habrá tres ángulos preferidos para cada ángulo chi, a 60, 180 y 300 grados, para un total de 27 rotámeros (3x3x3). Configuramos nuestra plantilla de archivo de opciones de MakeRotLib como se muestra a continuación.

El archivo `       C40_rot_lib_options_XXX_YYY.in      ` se muestra a continuación.

```
AA_NAME C40
OMG_RANGE 180 180 1
PHI_RANGE XXX XXX 1
PSI_RANGE YYY YYY 1
EPS_RANGE 180 180 1
NUM_CHI 3
NUM_BB 2
CHI_RANGE 1 0  330  30
CHI_RANGE 2 0  330  30
CHI_RANGE 3 0  330  30
CENTROID 300 1 300 1 300 1
CENTROID 300 1 300 1 180 2
CENTROID 300 1 300 1  60 3
CENTROID 300 1 180 2 300 1
CENTROID 300 1 180 2 180 2
CENTROID 300 1 180 2  60 3
CENTROID 300 1  60 3 300 1
CENTROID 300 1  60 3 180 2
CENTROID 300 1  60 3  60 3
CENTROID 180 2 300 1 300 1
CENTROID 180 2 300 1 180 2
CENTROID 180 2 300 1  60 3
CENTROID 180 2 180 2 300 1
CENTROID 180 2 180 2 180 2
CENTROID 180 2 180 2  60 3
CENTROID 180 2  60 3 300 1
CENTROID 180 2  60 3 180 2
CENTROID 180 2  60 3  60 3
CENTROID  60 3 300 1 300 1
CENTROID  60 3 300 1 180 2
CENTROID  60 3 300 1  60 3
CENTROID  60 3 180 2 300 1
CENTROID  60 3 180 2 180 2
CENTROID  60 3 180 2  60 3
CENTROID  60 3  60 3 300 1
CENTROID  60 3  60 3 180 2
CENTROID  60 3  60 3  60 3
TEMPERATURE 1
```

-   AA\_NAME | código de tres letras del aminoácido
-   OMG\_RANGE | rango de omega del enlace peptídico _anterior_ al residuo, expresado como STARTVAL ENDVAL INCREMENT
-   PHI\_RANGE | valor de phi de este bin, expresado como STARTVAL ENDVAL INCREMENT
-   PSI\_RANGE | valor de psi de este bin, expresado como STARTVAL ENDVAL INCREMENT 
-   EPS\_RANGE | rango de omega (denominado "epsilon") del enlace peptídico _posterior_ al residuo, expresado como STARTVAL ENDVAL INCREMENT
-   BB_\_RANGE | se usa opcionalmente para añadir diedros adicionales de la cadena principal. *Ten en cuenta que NUM_BB debe reflejar el número de diedros de la cadena principal sin contar omega y epsilon.*  Los índices de los diedros de la cadena principal se basan en el orden especificado, y PHI\_RANGE, PSI\_RANGE y BB\_RANGE tienen internamente el mismo efecto: fijar el rango del siguiente índice de diedro de la cadena principal. Todos se expresan como STARTVAL ENDVAL INCREMENT.
-   NUM\_BB | número de diedros de la cadena principal _sin contar_ omega (el enlace entre residuos anterior) ni epsilon (el enlace entre residuos posterior)
-   NUM\_CHI | número de ángulos diedros de la cadena lateral: debe ser el mismo que en el archivo de parámetros.
-   CHI\_RANGE | El número de campos CHI\_RANGE debe ser igual al valor especificado para NUM\_CHI.  El rango se expresa como CHINUMBER STARTVAL ENDVAL INCREMENT, donde CHINUMBER especifica el ángulo chi concreto de la cadena lateral; el primero es el más cercano al carbono alfa. 
-   CENTROID | Número de rotámero para chi 1 | valor inicial { número de rotámero para chi 2 | valor inicial }{etc.}: los CENTROID especifican los puntos de partida del agrupamiento por K-medias descrito en la publicación relacionada. Se necesita un campo CENTROID para cada posible rotámero. El número de campos CENTROID define el número de rotámeros que aparecen en la biblioteca de rotámeros resultante.
-   TEMPERATURE | temperatura al estilo de la distribución de Boltzmann para convertir las energías generadas por el protocolo en probabilidades.

-   Introducir los CENTROID es laborioso, sobre todo para residuos con cuatro chi y varios ángulos chi no rotaméricos (por ejemplo, el triptófano tiene doce bins para chi2 en su representación Dun10); especificar a mano un residuo de cuatro chi con dos de esos chi requeriría casi 1500 centroides. Por eso hemos desarrollado una sintaxis alternativa:
-   Las líneas ROTWELLS permiten al usuario generar el producto cartesiano de ciertos pozos de rotámeros, de modo que el archivo anterior sustituiría sus líneas CENTROID por

```
ROTWELLS 1 3  60 180 300 
ROTWELLS 2 3  60 180 300 
ROTWELLS 3 3  60 180 300 
```
-   En las bibliotecas de rotámeros de tipo prolina, donde hay dos rotámeros válidos debido a otras restricciones, "todas las combinaciones posibles" no es deseable, así que el formato CENTROID sigue teniendo su nicho.

Para generar los 1296 archivos de entrada usamos un script incluido que simplemente sustituye XXX e YYY por los valores de phi y psi. El script se ejecuta como se muestra a continuación.  (**Nota: desde el 9 de noviembre de 2018 no es necesario generar miles de archivos de entrada. Los rangos se pueden especificar en un único archivo de entrada.**)

```
$ cd inputs
$ ../scripts/make_inputs C40_rot_lib_options_XXX_YYY.in
```

El número de ángulos chi y el intervalo de muestreo de CHI\_RANGE son los principales determinantes del tiempo de ejecución, ya que determinan el número de rotámeros que se probarán para cada bin de phi/psi. Se recomienda tener al menos 500 muestras por chi. En el ejemplo de la ornitina muestreamos en intervalos de 30 grados cada uno de los 3 ángulos chi, lo que da un total de 1728 (12x12x12) conformaciones probadas por cada bin de phi/psi. Para un residuo con un solo chi bastan bins de 1 grado.

Ejecutar el protocolo MakeRotLib
===============================

El siguiente paso es ejecutar el protocolo MakeRotLib con cada uno de los archivos de entrada que creamos en el primer paso. Esta es la parte del proceso que más tiempo consume y probablemente deba hacerse en un clúster. Como las configuraciones de los clústeres varían, se proporciona un ejemplo para un único archivo de opciones de MakeRotLib. Los otros 1295 deben ejecutarse de forma idéntica.  (**Nota: desde el 9 de noviembre de 2018 no es necesario generar miles de archivos de entrada. Los rangos se pueden especificar en un único archivo de entrada.**)

```
$ cd outputs
$ PATH/TO/ROSETTA/bin/MakeRotLib.default.macosclangrelease -database PATH/TO/rosetta/main/database -options_file ../inputs/C40_rot_lib_options_-60_-40.in >C40_rot_lib_options_-60_-40.log &
```

**Nota:** la extensión de tu ejecutable puede ser distinta.

Las únicas opciones que se pasan al ejecutable son la ruta a la base de datos y el archivo de opciones de MakeRotLib. Cuando termina la ejecución, en el directorio de salida debería haber un archivo llamado `       C40_-60_-40_bbdep.rotlib      `. Esta es la biblioteca de rotámeros dependiente de la cadena principal para un phi de -60 y un psi de -40.

El archivo de registro (log) de la ejecución de Rosetta incluye bastante información útil de salida.

El registro tiene tres secciones principales: `       ROTAMERS      `, `       CENTROIDS      ` y `       FINAL ROTAMERS      `. Cada una muestra los siguientes datos: los ángulos diedros de la cadena principal phi, psi, omega y epsilon, la probabilidad, la energía total, la energía de torsión, la repulsión intrarresiduo, la atracción intrarresiduo, el número de ángulos chi, el número de clúster asignado, el conjunto de ángulos chi de entrada, el conjunto de ángulos chi minimizados, la desviación estándar y la distancia desde ese punto a cada uno de los centroides de los clústeres.

El registro también muestra el número de conformaciones por clúster y la distancia media entre el centro del clúster y los miembros de ese clúster. La falta de conformaciones en un clúster y una distancia media al centroide del clúster grande (\>30) sugieren que ese clúster tiene una energía más alta.

Opciones
-------

Opciones de entrada obligatorias:

-   make\_rot\_lib:options\_file: la ruta al archivo de opciones de rotlib que hicimos antes.

Opciones de entrada opcionales:

-   make\_rot\_lib:output\_logging: si es true (el valor por defecto), se escriben archivos de registro para cada archivo de rotámeros generado.  Sin embargo, los archivos de registro pueden ser bastante más grandes que los archivos de rotámeros y pueden llenar fácilmente el espacio disponible.  Si se establece explícitamente en false, el tamaño de la salida se reduce considerablemente.  (La opción "-mute all" también es útil para esto.)

Salidas esperadas
================

Deberías tener 1296 bibliotecas de rotámeros, una por cada bin de phi/psi.

Ensamblar las bibliotecas de rotámeros individuales en un solo archivo
===============================================================

Después de ejecutar el protocolo MakeRotLib con todos los archivos de opciones de MakeRotLib, las bibliotecas de rotámeros individuales de cada bin de phi/psi deben ensamblarse en un único archivo. Esto se hace con un script incluido, como se muestra a continuación.

```
$ cd outputs
$ ../scripts/make_final_from_phi_psi.pl C40
```

La biblioteca de rotámeros en un solo archivo debería llamarse `       C40.rotlib      `. El archivo debe colocarse en el directorio ncaa\_rotlibs de la base de datos.

```
$ cp C40.rotlibs PATH/TO/DATABASE/rosetta/main/database/ncaa_rotlibs/
```

Modificar el archivo de parámetros de ResidueType
========================================

El último paso es modificar el archivo de parámetros del tipo de residuo para que use la nueva biblioteca de rotámeros. Para ello hay que añadir al archivo de parámetros del tipo de residuo el nombre de la biblioteca de rotámeros, el número de ángulos chi que describe y cuántos bins hay para cada ángulo chi. La biblioteca de rotámeros de la ornitina se llama C40.rotlib, describe 3 ángulos chi y cada uno de esos 3 ángulos chi tiene 3 números de rotámero. Así que usaríamos los siguientes comandos para añadir esa información al archivo que creamos en HowToMakeResidueTypeParamFiles.

```
$ echo "NCAA_ROTLIB_PATH C40.rotlib" >> PATH/TO/rosetta/main/database/chemical/residue_type_sets/fa_standard/residue_types/l-ncaa/ornithine.params
$ echo "NCAA_ROTLIB_NUM_ROTAMER_BINS 3 3 3 3" >> PATH/TO/rosetta/main/database/chemical/residue_type_sets/fa_standard/residue_types/l-ncaa/ornithine.params
```

Novedades desde la última versión
=============================

Esta aplicación es nueva en la versión 3.4 de Rosetta.

## Véase también

## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Calculadora de energía del estado desplegado | unfolded-state-energy-calculator]]: para crear "energías de referencia" para usar NCAA en diseño
* [[Noncanonical Amino Acids]]: cómo trabajar con aminoácidos no canónicos
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
