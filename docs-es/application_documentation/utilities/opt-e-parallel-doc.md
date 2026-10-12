#La aplicación optE\_parallel

Metadatos
========

Autor: Andrew Leaver-Fay

Este documento fue escrito por Andrew Leaver-Fay en octubre de 2013. El código de optE\_parallel lo mantiene el laboratorio Kuhlman de la UNC. Envía tus preguntas a (aleaverfay@gmail.com).

Código y demostración
=============

La aplicación optE está en Rosetta/main/source/src/apps/public/weight\_optimization/optE\_parallel.cc, que sirve simplemente de envoltorio para el código de Rosetta/main/source/src/protocols/optimize\_weights/. En particular, la clase controladora principal es IterativeOptEDriver, que está implementada en el archivo .cc con el mismo nombre.

Puedes encontrar una demostración del procedimiento de recuperación del perfil de secuencia en el directorio Rosetta/demos/public/optE. Este directorio contiene un directorio "inputs" y un directorio "run". Consulta el script csh "launch\_optE.scr" para ver un ejemplo de cómo configurar y lanzar un trabajo de optE.

Referencias
==========

Andrew Leaver-Fay, Matthew J. O'Meara, Mike Tyka, Ron Jacak, Yifan Song, Elizabeth H. Kellogg, James Thompson, Ian W. Davis, Roland A. Pache, Sergey Lyskov, Jeffrey J. Gray, Tanja Kortemme, Jane S. Richardson, James J. Havranek, Jack Snoeyink, David Baker, Brian Kuhlman. (2013) "Scientific Benchmarks for Guiding Macromolecular Energy Function Improvement." Methods in Enzymology. Volume 523. Chapter 6. Pages 109-143.

Propósito
=======

La aplicación optE\_parallel tiene dos propósitos. a) Ajustar las energías de referencia para maximizar la recuperación de secuencia y minimizar la divergencia KL del perfil de secuencia de aminoácidos, mediante rondas iterativas de rediseño (normalmente, de la proteína completa). b) Ajustar los propios pesos (así como las energías de referencia) con un enfoque de máxima verosimilitud, en el que los pesos se optimizan para maximizar la verosimilitud de diversas observaciones experimentales (p. ej., secuencias nativas, rotámeros nativos, ddG de mutación). El primer escenario produce energías de referencia de alta calidad que, al usarse en benchmarks de recuperación de secuencia, dan altas tasas de recuperación de secuencia. El segundo escenario no vale demasiado y no se recomienda su uso. Sus deficiencias están documentadas extensamente en el artículo de Methods In Enzymology citado arriba.

Algoritmo
=========

Procedimiento de recuperación del perfil de secuencia
------------------------------------

A partir de un conjunto de archivos PDB de entrada, el procedimiento de optimización de las energías de referencia realiza un rediseño iterativo sobre esos archivos PDB, cambiando las energías de referencia en cada ronda. Después de cada ronda de rediseño, optE modifica las energías de referencia: aumenta las de los aminoácidos que aparecieron en las estructuras diseñadas más a menudo que en las estructuras de entrada y reduce las de los aminoácidos que aparecieron en las estructuras diseñadas con menos frecuencia que en las estructuras de entrada. Por eso este procedimiento se denomina "recuperación del perfil de aminoácidos" o "recuperación del perfil". Opcionalmente, se puede usar un archivo XML de RosettaScripts que defina un conjunto de TaskOperations para restringir el diseño a un subconjunto de las posiciones de las estructuras de entrada. Esto sirve para optimizar las energías de referencia para regiones concretas de las proteínas, p. ej., en las interfaces proteína-proteína.

Hay 20 aminoácidos cuyas energías de referencia se ajustan, pero como la única propiedad importante de las energías de referencia es la diferencia entre las de dos aminoácidos, en la práctica solo hay 19 parámetros libres. Por eso todas las energías de referencia pueden desplazarse hacia arriba o hacia abajo en un valor constante sin afectar a su uso en diseño. Elegimos desplazar las energías de referencia para que sumen 0.

El código funciona con un bucle interno y otro externo. En el bucle interno, las energías de referencia se ajustan al alza o a la baja según los resultados de la ronda de diseño anterior y luego se rediseñan todas las proteínas de entrada. Si ejecutas con MPI, este paso se paralelizará entre los procesadores disponibles. Cuando termina el diseño, se miden la tasa de recuperación de secuencia y la entropía cruzada (la divergencia KL + la entropía). Para el bucle interno se calcula una puntuación construida con la suma ponderada SRR + w\*XE (SRR = tasa de recuperación de secuencia, XE = entropía cruzada, w = -0.1). Si esta puntuación es mayor que la de la iteración anterior del bucle externo, el bucle interno termina. Cada vez que el bucle interno termina (ya sea porque ha llegado a seis iteraciones o porque la puntuación ha aumentado respecto a la iteración anterior del bucle externo), su conjunto de pesos se escribe en el directorio weightdir/ y su puntuación se asigna como la puntuación de la iteración actual del bucle externo. Cada archivo de pesos que se escribe en disco representa o bien un punto en el que la puntuación mejoró, o bien un punto en el que se ha invertido un esfuerzo significativo. Se genera un archivo de pesos por cada iteración del bucle externo. En las dos primeras iteraciones del bucle externo, el bucle interno realiza al menos cuatro iteraciones. Tanto el número de iteraciones del bucle interno como el del externo se pueden controlar desde la línea de comandos.

Optimización de pesos y energías de referencia por máxima verosimilitud
-----------------------------------------------------------

OptE se diseñó originalmente para ajustar tanto los pesos como las energías de referencia mediante un procedimiento iterativo, y la estructura de la rutina de ajuste de las energías de referencia toma su forma del procedimiento de máxima verosimilitud. La estructura de este procedimiento oscila entre la optimización de la función objetivo y el rediseño de la proteína completa. Cada oscilación representa una iteración del bucle externo. (El "bucle interno" describe el comportamiento de la fase de rediseño de la proteína completa). En la fase de optimización de la función objetivo, los pesos y las energías de referencia se optimizan con una combinación de procedimientos de enjambre de partículas y de minimización basada en gradientes. La naturaleza de la función objetivo se describe con detalle en el artículo de Methods in Enzymology. El conjunto de pesos que resulta de la fase de optimización de la función objetivo se mezcla luego, en distintos niveles, con el conjunto de pesos de la iteración anterior del bucle externo, y se mide la tasa de recuperación de secuencia del conjunto de pesos resultante. Este procedimiento de mezcla y su justificación se describen con más detalle en el artículo de Methods In Enzymology. El bucle interno continúa hasta que la tasa de recuperación de secuencia mejora respecto a la iteración anterior del bucle externo, o hasta que se han completado seis iteraciones.

Cuando se ejecuta de esta manera, el usuario debe proporcionar una lista de los pesos que se mantendrán fijos (los pesos fijos) y una lista de los pesos que pueden cambiar (los pesos libres). OptE no impone directamente ninguna limitación sobre dónde pueden explorar los pesos libres y fijos, lo que puede dar lugar a pesos que crecen mucho o que se vuelven negativos. En particular, el peso tanto del término de Ramachandran (rama) como del componente repulsivo del término de Lennard-Jones (fa\_rep), cuando se les permite flotar, a menudo se vuelven negativos. Para evitar este problema, el usuario puede proporcionar restricciones armónicas de fondo plano arbitrarias que se aplican a los pesos y que se incluirán en la función objetivo.

Limitaciones
===========

Limitaciones del procedimiento de optimización de las energías de referencia
----------------------------------------------------------

OptE sigue iterando incluso después de haber empezado a converger. A veces el mejor conjunto de pesos (el de mayor puntuación) aparece después de la 10.ª iteración del bucle externo y a veces después de la 6.ª. El conjunto de pesos recomendado es el que tiene la mayor puntuación. La iteración se puede deducir del archivo de registro buscando la última aparición de la palabra "accepting."

Ejecuciones independientes de optE producirán energías de referencia muy similares, y estas energías de referencia pueden dar tasas de recuperación de secuencia parecidas, pero las diferencias entre estas tasas probablemente sean estadísticamente significativas. Es decir, el benchmark estocástico de recuperación de secuencia es sorprendentemente preciso, de modo que la desviación estándar suele ser inferior al 0.05 %. Por otro lado, las tasas de recuperación de secuencia que resultan de ejecuciones independientes de optE tendrán una desviación estándar de aproximadamente el 0.5 %. Se recomienda ejecutar optE por triplicado.

Sorprendentemente, resulta que las estrategias de muestreo están estrechamente ligadas al conjunto de energías de referencia que necesitas. Si quieres usar el min-packer, optE tiene que ejecutarse con el min packer. Si quieres usar el packer discreto con las opciones -ex1 -ex2, optE tiene que ejecutarse con el packer discreto y -ex1 -ex2. OptE usará el packer discreto por defecto (las opciones de rotámeros extra hay que indicarlas en la línea de comandos) y hay que indicarle que use el min-packer.

Limitaciones del procedimiento de optimización de pesos y energías de referencia por máxima verosimilitud
----------------------------------------------------------------------------------------

Aunque el procedimiento de optimización por máxima verosimilitud selecciona conjuntos de pesos basándose únicamente en la recuperación de secuencia, y el procedimiento de optimización de las energías de referencia selecciona pesos basándose tanto en la recuperación de secuencia como en la recuperación del perfil de secuencia, el procedimiento de optimización de las energías de referencia produce tasas de recuperación de secuencia (drásticamente) más altas.

Opciones
=======

Opciones para el procedimiento de optimización por recuperación del perfil de secuencia
-----------------------------------------------------------------

Se recomiendan las siguientes opciones para el procedimiento de ajuste de las energías de referencia:

-   `        -s </path/to/listfile>       ` : el listfile debe contener la ruta del conjunto de archivos PDB sobre los que se realizará la recuperación de secuencia
-   `        -optE:fit_reference_energies_to_aa_profile_recovery       ` : activa el procedimiento de recuperación del perfil de secuencia.
-   `        -optE::optimize_nat_aa       ` : un remanente del protocolo de máxima verosimilitud; es obligatoria, pero no hace nada en particular.
-   `        -mute all       ` : desactiva toda la salida de los tracers
-   `        -unmute protocols.optimize_weights.IterativeOptEDriver core.pack.min_pack       ` : activa estos tracers para obtener mensajes de salida útiles en el archivo de registro
-   `        -ex1       ` : amplía el muestreo de rotámeros en +/- 1 desviación estándar alrededor de chi 1 para los residuos enterrados
-   `        -ex2       ` : amplía el muestreo de rotámeros en +/- 1 desviación estándar alrededor de chi 2 para los residuos enterrados
-   `        -linmem_ig 10       ` : usa el grafo de interacción sobre la marcha de memoria lineal, ya que es más rápido y usa menos memoria que el grafo de interacción de energías de pares precalculadas
-   `        -optE:free </path/to/free_wts.txt>       ` : enumera el conjunto de términos de la función de puntuación cuyos pesos pueden variar libremente. Debe ser un archivo vacío.
-   `        -optE:fixed </path/to/fixed_wts.txt>       ` : enumera el conjunto de términos de la función de puntuación cuyos pesos deben mantenerse fijos, e indica el peso de cada uno.
-   `        -mpi_weight_minimization       ` : distribuye la minimización de pesos entre todos los trabajos de MPI, lo que hace que el código se ejecute algo más rápido, aunque no se dedica un tiempo significativo a la minimización de pesos.
-   `        -starting_refEs </path/to/score12prime.wts>       ` : inicializa el procedimiento de optimización de las energías de referencia con las energías de referencia que figuran en el archivo de entrada.
-   `        -optE:no_design_pdb_output       ` : no vuelca los PDB con las secuencias rediseñadas que se generan en cada iteración del bucle externo. Estos archivos PDB no suelen ser demasiado interesantes y pueden ocupar mucho espacio en disco.

Otras opciones útiles para el procedimiento de recuperación del perfil de secuencia
--------------------------------------------------------------

Las siguientes opciones son útiles a veces cuando se ejecuta el procedimiento de ajuste de las energías de referencia

-   `        -no_optH true       ` : no ejecuta optimizeH sobre los PDB a medida que se leen.
-   `        -ignore_unrecognized_res       ` : para la lectura de PDB de entrada; no termina simplemente porque los PDB de entrada contengan residuos que Rosetta no reconoce
-   `        -skip_set_reasonable_fold_tree       ` : evita la llamada a set\_reasonable\_fold\_tree cuando se crea un Pose a partir de un archivo PDB. Puede ser necesaria o no para el conjunto de PDB de entrada que estés usando.
-   `        -optE:n_design_cycles       ` : fija el número de iteraciones que optE debe dar en el bucle externo
-   `        -optE:design_with_minpack       ` : al realizar el rediseño de secuencia en el bucle interno, usa el min packer en lugar del packer discreto.
-   `        -multi_cool_annealer <int>       ` : usa el multicool annealer en los pasos de diseño (más lento; no parece producir mejores energías de referencia). "10" es el valor recomendado para esta opción entera.
-   `        -optE:optE_soft_rep       ` : usa en optE los parámetros softrep de Lennard-Jones.
-   `        -optE:no_hb_env_dependence       ` : desactiva la dependencia del entorno en el término de enlace de hidrógeno
-   `        -optE:no_hb_env_dependence_DNA       ` : desactiva la dependencia del entorno en el término de enlace de hidrógeno para el ADN
-   `        -optE:optE_no_protein_fa_elec       ` : desactiva las interacciones electrostáticas proteína/proteína (pero no proteína/ADN)
-   `        -optE:constant_logic_taskops_file <xmlfile>       ` : un archivo en formato utility::tag que optE usa para construir una tarea que no cambiará con el contexto del Pose después del diseño

Consejos para ejecutar OptE
=====================

Aquí tienes una serie de recomendaciones para gestionar el control de trabajos de optE y, en general, sacarle el máximo partido.

-   Compila la aplicación optE\_parallel con la opción "extras=mpi" en tu línea de comandos de scons. Aunque OptE puede ejecutarse en un solo procesador, es muy lento. (Lamento no poder responder preguntas sobre cómo compilar con mpi en ningún sistema en particular ni sobre cómo lanzar trabajos de mpi. Estos detalles varían de un sistema a otro y no tengo consejos para la gran mayoría de los sistemas. Sí ofreceré un consejo: si scons te dice algo como "Could not find mpiCC", pero al copiar y pegar la línea de comandos de mpiCC que scons estaba ejecutando funciona perfectamente, entonces tienes que descomentar dos líneas del archivo main/source/tools/build/user.settings: la primera, en la línea 25 ("\#import os" –\> "import os"), y la segunda, en la línea 38 ("\#"program\_path" : os.environ["PATH"].split(":")," –\> ""program\_path" : os.environ["PATH"].split(":"), " ).

-   Crea un directorio nuevo cada vez que ejecutes optE. Si ejecutas optE en un directorio donde ya lo habías ejecutado antes, sobrescribirás tus resultados anteriores; o, si usas un conjunto distinto de archivos de entrada (en ese directorio) cada vez que ejecutas, te costará llevar la cuenta de qué archivos corresponden a cada trabajo.

-   Como optE espera a que termine cada simulación de diseño antes de pasar a la siguiente ronda, puedes desperdiciar mucho tiempo de CPU esperando a que termine un PDB muy grande de tu conjunto de diseño (es decir, los otros N-1 nodos no hacen nada mientras esperan al último). Si tienes muchas CPU inactivas, esto no es realmente un problema. En caso contrario, recomiendo usar N/2 CPU para diseñar N estructuras, ordenando tus PDB de entrada por tamaño y luego intercalándolos de modo que el más grande y el más pequeño queden juntos en el archivo de lista que se pasa a la opción `        -s       `. IterativeOptEDriver asignará grupos de dos PDB a cada procesador y los asignará en el orden en que aparecen en el archivo de lista de entrada. Es decir, si estás entrenando con 26 archivos PDB y los PDB son A.pdb, B.pdb... Z.pdb, donde A.pdb es el más pequeño y Z.pdb es el más grande, usa 13 procesadores para el trabajo de optE y ordena tu archivo de lista de esta manera:

```
/path/to/Z.pdb
/path/to/A.pdb
/path/to/Y.pdb
/path/to/B.pdb
...
```

-   Mantén un archivo de opciones aparte para las opciones que controlan cómo debe comportarse optE y otro para las opciones que controlan la función de puntuación, de modo que sea fácil tomar las opciones de la función de puntuación y usarlas en otros contextos (p. ej., un benchmark de recuperación de secuencia o un benchmark de recuperación de rotámeros).

-   Lleva una hoja de cálculo de Excel con todos tus trabajos de optE, el sha-1 de Rosetta que usaste, el contenido de todos los archivos de entrada que lee optE (p. ej., el archivo fixed.wts y el archivo free.wts), todas las opciones que usaste en la línea de comandos, la tasa de recuperación de secuencia del conjunto de pesos de mayor puntuación y la entropía cruzada del conjunto de pesos de mayor puntuación.

-   Aquí tienes un script csh útil para crear los directorios en los que optE espera escribir su salida y para lanzar optE. Edítalo según sea necesario.

```
#!/bin/csh -f

@ num_procs = 27;
@ i = 0

#clean up
rm -rf workdir_* weightdir logdir

while ( $i < $num_procs )
   mkdir workdir_$i
   #echo "making directory workdir_" $i
   @ i = $i + 1
end
mkdir weightdir
mkdir logdir

bsub -n $num_procs -q week -o logdir/optE_log -a mvapich mpirun /nas02/home/l/e/leaverfa/GIT/main/source/bin/optE_parallel.mpi.linuxgccrelease @optE_seqprof.flags @score.flags > submission.log
```

Salidas esperadas
================

OptE espera ejecutarse en un directorio que contenga varios subdirectorios:

-   weightdir: el directorio donde se escribirán los pesos
-   logdir: el directorio donde se escribirá el "minimization\_dat"; directorio recomendado para redirigir stdout a un archivo.
-   rundir\_{0..N-1}: los N directorios necesarios para que cada nodo MPI pueda escribir en un directorio separado

Todos los archivos de pesos se escriben en el directorio weightdir.

Posprocesamiento
===============

El script find\_best\_weight\_set.py identifica el conjunto de pesos con la mayor puntuación, que debe considerarse la salida de optE. Este script se encuentra en el directorio Rosetta/demos/public/optE/scripts/.

Novedades desde la última versión
=============================

Próximamente habrá más.

## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
