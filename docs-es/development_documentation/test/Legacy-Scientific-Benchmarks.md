Benchmarks científicos
======================

# **ESTA PÁGINA CONTIENE INFORMACIÓN HEREDADA SOBRE LAS PRUEBAS CIENTÍFICAS ANTERIORES A SU REIMPLEMENTACIÓN EN 2018**

Consulta [[Scientific Benchmarks]] para ver información sobre el conjunto actual de benchmarks científicos

----

Los benchmarks científicos son pruebas que comparan las predicciones de estructura generadas por Rosetta
con observaciones experimentales. Evaluar la precisión de las
predicciones de Rosetta permitirá

-   Informar a los investigadores sobre la fiabilidad de Rosetta como
    modelador molecular
-   Orientar el ajuste de Rosetta para mejorar las predicciones estructurales

Los benchmarks científicos sirven para medir el realismo físico de la
función de energía y lo bien que un protocolo muestrea estructuras
físicamente realistas.

Benchmarks científicos
======================

Tipos de benchmarks científicos
-------------------------------

Hay dos tipos de benchmarks científicos:

-   **Benchmarks científicos quincenales** (biweekly):
    - *Ten en cuenta que, en la práctica, los benchmarks quincenales se ejecutan en la medida de lo posible (repetidamente, cuando terminan).
    -   Están pensados para ser una de estas dos cosas:
        -   pruebas unitarias que puedan detectar errores y cambios no intencionados en la
            función de energía y los protocolos que las pruebas de
            integración no pueden detectar debido a la variación entre ejecuciones.
        -   pruebas rápidas de la precisión predictiva de la función de energía y
            del protocolo.
    -   Estas pruebas tardan menos de 128 horas en ejecutarse en una sola CPU y se ejecutan con regularidad.
    -   Las pruebas quincenales se encuentran en main/tests/scientific/biweekly/.  Están organizadas de manera similar a las [[pruebas de integración|integration tests]].

    -   ----------------------------
    -   [[Balance detallado|DetailedBalanceScientificBenchmark]]
    -   RNA de novo
    -   Diseño de RNA
    -   [[Recuperación de rotámeros|RotamerRecoveryScientificBenchmark]]
    -   Recuperación de secuencia
    -   ab initio
    -   [[Docking|DockingScientificBenchmark]]
    -   Diseño de interfaces de DNA
    -   [[Features|FeaturesScientificBenchmark]]
    -   Docking de ligandos
    -   Loop
    -   Membrana
    -   Relax

-   -   ----------------------------

-   **Benchmarks científicos de clúster** (benchmarks científicos de la función de energía): Están pensados para probar
    la calidad de una función de energía con un amplio conjunto de pruebas que
    representan protocolos realistas de predicción científica. Están
    pensados para que los ejecute un investigador que quiera probar una
    función de energía candidata a convertirse en la función de energía estándar de
    Rosetta.

    -   Estas pruebas se encuentran en main/tests/scientific/cluster/.
    -   A diferencia de las pruebas quincenales, estas pruebas deben proporcionar dos scripts de bash en lugar de uno:
    	- El script "submit" se llama primero y se espera que prepare y envíe el 
	número adecuado de trabajos para ejecutar tu prueba y luego termine.
	- El script "analyze" se ejecuta cuando esos trabajos han terminado. Crea el archivo de registro (log)
	y el archivo yaml adecuados y los coloca en la carpeta "/output". Cualquier archivo adicional que
	quieras guardar como "resultados" también debe guardarse allí.
    -   Cada prueba debe poder ejecutarse en menos de 50,000 horas de CPU
    -   ----------------------------
    -   Discriminación de decoys con LoopHash
    -   Docking de ligandos
    -   Relax en densidad electrónica
    -   Docking flexible de péptidos
    -   Diseño flexible de monómeros
    -   Escaneo de mutantes puntuales
    -   Predicción de loops
    -   NMR

Uso
===

### Cómo crear un benchmark científico local

*Si tu prueba requiere crear una nueva aplicación, súbela (commit) a esta ubicación: source/src/apps/benchmark/scientific/*

​1) Crea una carpeta en main/test/scientific/tests/\<test\_name\>.  
   Cada prueba individual puede tener los siguientes subdirectorios:
-   /input : guarda todos los datos de entrada. 
-   /output : guarda los datos de salida importantes. El contenido de esta carpeta se guardará junto con el registro (log) y el yaml en la base de datos y será accesible desde la web.
-   /tmp : lugar para archivos temporales (como unos \~1000 decoys, si los necesitas). El contenido de esta carpeta será ignorado por el daemon de pruebas y no se guardará en ningún sitio. (También puedes guardar archivos temporales en /input si de verdad lo necesitas; solo asegúrate de no sobrescribir ningún archivo de entrada).
   
​2) Reúne una pequeña muestra de datos experimentales, como estructuras cristalográficas
o datos de NMR, para la nueva prueba.

​3) Escribe un script llamado 'command' que genere predicciones de estructura
y/o procese las estructuras de entrada y los datos experimentales para generar
resultados en bruto.

​4) Escribe otro script para analizar los resultados del paso 3) y generar
estadísticas numéricas y/o gráficos. Haz que este script de análisis escriba un
archivo **.results.yaml**, que contenga texto yaml válido y tenga al menos
un campo booleano, '\_isTestPass'. Aquí tienes un ejemplo

       { 'rotamer_recovery_rate_at_all_positions' : .37, '_isTestPass' : True }

Con este archivo, cuando las pruebas se ejecutan en el servidor de pruebas, los resultados
se pueden procesar y presentar en la página web de pruebas.

Haz también que el script de análisis escriba un archivo **.results.log**, que contenga resultados en forma de texto legible por personas. El contenido
de este archivo se añadirá al correo de las pruebas nocturnas (Nightly Tests) que se envía a la
lista de correo *Rosetta-logs*.

### Cómo ejecutar benchmarks científicos locales

Para ejecutar los benchmarks científicos locales, ve a test/scientific y
ejecuta

      scientific.py -d path/to/database -j<num_processors>

Esto generará, para cada prueba, un directorio
test/scientific/statistics/\<test\_name\> que contiene la información de registro
del protocolo, estadísticas y gráficos. Cada prueba debería tardar aproximadamente una hora
en ejecutarse. Además, cada prueba se ejecuta con regularidad en el servidor de pruebas
(Testing Server), posiblemente con datos de entrada o un protocolo más extensos.

### Cómo crear un benchmark científico de clúster

​1) Reúne un conjunto de datos de entrada más extenso o reúne
los parámetros para un protocolo más extenso que se pueda usar cuando la prueba
se ejecute en el clúster del servidor de pruebas en JHU.

​2) Añade los datos de entrada a
[mini.data](https://svn.rosettacommons.org/trac/browser/trunk/mini.data#tests/scientific)
según haga falta.

​3) Pide a sergey que cree el enlace simbólico para la prueba, de modo que se
ejecute automáticamente en el servidor de pruebas

​4) Supervisa los resultados del servidor de pruebas y verifica que la nueva
prueba se ejecuta correctamente.

Benchmarks de funciones de puntuación
=====================================

Recuperación de rotámeros (UNO)
-------------------------------

**Nombre del creador:** Matthew O'Meara

**Tarea de predicción / Descripción:** Dada la conformación nativa de
toda la estructura excepto una única cadena lateral, predecir la conformación
de esa cadena lateral. [[Benchmark de recuperación de rotámeros|RotamerRecoveryScientificBenchmark]]

**Datos experimentales utilizados:** Las estructuras de entrada son una selección del
conjunto Top5200 de Richardson. El conjunto Top5200 se construyó de la siguiente
manera. Daniel Keedy y otros del laboratorio Richardson agruparon todas las
estructuras del PDB del 5 de abril de 2007 en clústeres de homología de secuencia del 70%.
Cada estructura con una resolución de 2.2A o mejor y que no fue filtrada a mano se pasó por MolProbity. Luego, de cada grupo se
seleccionó la estructura con la mejor resolución promedio y la mejor puntuación de MolProbity,
siempre que tuviera una resolución de al menos 2.0A. Para este benchmark se seleccionaron todas las estructuras de
Top5200 con entre 50 y 200 residuos y una resolución menor que
1.2A. Esto deja 152 estructuras con 17463 residuos.

**Cómo interpretar los resultados:** Con la comparación
[[ChiDiff|RotamerRecoveryScientificBenchmark#RRComparerChiDiff]],
la puntuación es el máximo de las diferencias de ángulo para cada uno
de los ángulos de torsión. Un residuo se considera recuperado si todas las diferencias
de ángulo son menores que 20. Las puntuaciones informadas incluyen:

-   la recuperación promedio de todos los residuos
-   la recuperación promedio de cada tipo de aminoácido
-   la recuperación promedio de residuos enterrados (23 \< \#10A\_nbrs), intermedios (17
    \<= \#10A\_nbrs \< 23) y expuestos (\#10A\_nbrs \< 17)
-   la recuperación promedio de cada aminoácido en cada nivel de enterramiento

La significancia se determina mediante una prueba de permutaciones o un análisis bootstrap.

**Resultados preliminares:** Consulta [Leaver-Fay et al., Methods in Enzymology
2013](http://www.sciencedirect.com/science/article/pii/B9780123942920000060)

**Advertencias:** ...

**Costo computacional aproximado:** ...

**Cómo ejecutarlo:** ...

Predicción de la estabilidad de proteínas (DDG)
-----------------------------------------------

**Nombre del creador:** Será un esfuerzo conjunto. Shane O'Connor, del laboratorio Kortemme,
administrará el sistema de benchmarking.

**Tarea de predicción / Descripción:** Dadas mediciones experimentales de DDG
en ensayos de estabilidad de proteínas, predecir el DDG en Rosetta.

**Datos experimentales utilizados:** Nuestro conjunto de datos experimentales proviene principalmente
de la extensa base de datos ProTherm, del Instituto de Tecnología de Kyushu,
en Japón. Un número menor de registros proviene de [Guerois et
al.](http://www.ncbi.nlm.nih.gov/pubmed/12079393) y de [un artículo sobre
protocolos de DDG de Rosetta](http://www.ncbi.nlm.nih.gov/pubmed/21287615) de
Liz Kellogg, Andrew y David Baker. En la actualidad tenemos tres conjuntos
curados que toman distintos subconjuntos (a veces usando valores promedio de
varios experimentos con la misma proteína o mutación) del conjunto total de
valores de DDG. Estos conjuntos curados fueron recopilados por Guerois et al., Kellogg
et al. y [Potapov et
al.](http://www.ncbi.nlm.nih.gov/pubmed/19561092). Existen otros conjuntos curados
en la bibliografía que esperamos incorporar con el tiempo.

Definiremos nuestros propios conjuntos de datos curados para la competición (shootout). Los detalles
se publicarán cuando los conjuntos estén definidos en concreto, aunque espero que
haya un gran solapamiento con los conjuntos anteriores. El conjunto de Guerois tiene poco menos de 1,000 mutaciones
puntuales distintas, el de Kellogg tiene unas 1,200 y el
de Potapov unas 2,100. El conjunto completo de mutaciones puntuales y valores de
DDG asociados almacenado en nuestra base de datos ronda las 4,000.

**Cómo interpretar los resultados:**

El análisis se ejecuta con un paquete de Python. En la actualidad tenemos scripts de
análisis básicos que generan diagramas de dispersión de los valores experimentales frente a los
predichos y calculan el coeficiente de correlación de Pearson y
los valores de error absoluto medio. Se añadirán análisis más refinados (mutaciones de grande a pequeño,
mutaciones a x, etc.), así como más medidas estadísticas.

**Resultados preliminares:** Ninguno por ahora.

**Advertencias:** Actualmente requiere un clúster SGE para ejecutarse (ver más abajo).

**Costo computacional aproximado:** No hay datos útiles por ahora. Actualmente
ejecutamos las predicciones con el protocolo 16 del artículo de Kellogg et al.
en un clúster Sun Grid Engine. Medimos el tiempo desde el inicio del trabajo en
nuestro planificador hasta que termina, lo que incluye el tiempo de espera en el clúster así
como el tiempo de cómputo. Esto podría refinarse. Además de los cambios en la función
de puntuación, nuestro objetivo es probar distintos protocolos para la competición, por lo que
los tiempos pueden variar.

**Cómo ejecutarlo:**

Ejecutamos los trabajos con un planificador de Python que se comunica con una base de datos
MySQL y envía los trabajos al clúster SGE. El planificador se encarga
de los pasos intermedios (el paso de archivos y de valores de argumentos de línea de comandos
entre los pasos del protocolo). Actualmente esto no es portable a laboratorios
que no tengan acceso a un clúster SGE, por lo que este componente de back-end deberá abstraerse
en el futuro. El análisis se ejecuta con una API sencilla (en Python) a la
base de datos, que llama a R para generar la salida en PDF.

Para evitar la necesidad de usar una base de datos MySQL, una posibilidad es
volcar los datos relevantes a una base de datos SQLite, que sería más fácil de
configurar. Sin embargo, esto requeriría añadir a nuestro código una capa de abstracción
de bases de datos que actualmente no existe.

Configuración de los conjuntos de fragmentos de los benchmarks científicos
==========================================================================

Los conjuntos de fragmentos, o conjuntos infile, viven en el directorio BENCH\_HOME/fragments.
Cada conjunto de fragmentos tiene que estar en un directorio distinto. En estos
directorios de conjuntos de fragmentos es necesaria una estructura de directorios
específica del tipo de benchmark. Más abajo se dan los detalles. Una vez configurados los directorios,
hay que importar el conjunto de fragmentos a la base de datos. Esto
se hace (actualmente) cada vez que alguien carga la página de resumen de fragmentos
(accesible desde el menú principal); solo se importa el conjunto de fragmentos.
Edita el conjunto de fragmentos recién importado: necesita una descripción y un
tipo de benchmark. Una vez configurado el conjunto de fragmentos, importa los fragmentos con
el comando bench.pl -mode fragment -submode insert\_fragmentset -id
\<id\>, donde \<id\> es el id del conjunto de fragmentos.

Ab Initio
---------

Un conjunto de fragmentos, por ejemplo abinitio\_set01
(BENCH\_HOME/fragments/abinitio\_set01), tiene un subdirectorio de 5 letras para
cada objetivo. En el repositorio CVS hay un ejemplo, 1a32\_.tbz. Para
configurarlo, crea el directorio BENCH\_HOME/fragments/abinitio\_set01 y
descomprime el archivo (tar -xvjf 1a32\_.tbz) en ese directorio.

##Véase también

* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]
* [[RosettaEncyclopedia]]
* [[Glossary]]
