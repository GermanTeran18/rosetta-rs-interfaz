#RosettaVIP - Aplicación de identificación de vacíos y empaquetado (Void Identification and Packing)

Metadatos
========

Autor: Jim Havranek

Febrero de 2012, por Jim Havranek (havranek [at] genetics.wustl.edu).

Código y demostración
=====================

Este código usa el enfoque de RosettaHoles para identificar cavidades enterradas problemáticas y sugiere un conjunto de mutaciones que, según las predicciones, mejoran la estabilidad, medida por la mejora en RosettaHoles y en las puntuaciones de todos los átomos de Rosetta. El código central está en la aplicación *vip*, en `       src/protocols/vip/VIP_Mover.cc      ` y en `       src/protocols/vip/VIP_Report.cc      ` .

Para ver el flujo de trabajo completo, consulta:

`       demos/public/vip      `

Para un ejemplo de demostración "mínimo" (que omite el paso de relajación posterior a la mutación), consulta:

`       tests/integration/tests/vip/      `

Referencias
===========

Borgo, B., Havranek, J.J. (2012), "Automated selection of stabilizing mutations in designed and natural proteins", Proc. Natl. Acad. Sci. USA, v.109(5) pp.1494-99.

Propósito de la aplicación
===========================================

Este código está pensado para tomar un archivo pdb con las coordenadas de un modelo estructural de una proteína con mal empaquetado hidrofóbico y devolver una lista de mutaciones que, según las predicciones, llenan las cavidades del núcleo de la proteína. Se ha comprobado que esto mejora la estabilidad química y térmica.

Algoritmo
=========

Esta aplicación implementa un ciclo iterativo de tres pasos. Primero, se identifican las cavidades y las posiciones de residuos vecinas. Segundo, en cada una de estas posiciones se realiza un diseño de sitio único de residuos hidrofóbicos con una función de puntuación simplificada que evalúa la complementariedad geométrica de cada cadena lateral con las cavidades vecinas. Por último, las mutaciones más prometedoras se imponen in silico, se realiza una relajación estructural y se conserva la mejor mutación según la función de puntuación de todos los átomos de Rosetta (a menos que no se identifiquen mutaciones favorables). Este procedimiento se repite hasta que no se encuentren cavidades o no se identifiquen nuevas mutaciones beneficiosas.

Limitaciones
============

-   La validación computacional con conjuntos de prueba de mutaciones caracterizadas, así como nuestra propia caracterización de mutaciones predichas, sugiere una tasa de falsos positivos de \~25%. Por ello, las mutaciones deben probarse para verificar que estabilizan.

-   El método escala mal a sistemas de gran tamaño. Esto se puede mitigar en parte restringiendo el alcance del paso de relajación con la opción -cp:local\_relax descrita más abajo.

-   La búsqueda de cavidades se hace con la versión 1 de RosettaHoles, que es estocástica, así que: 1) si no encuentra cavidades, vuelve a ejecutarla y probablemente las encontrará, y 2) ejecuciones distintas pueden dar una secuencia de mutaciones diferente.

Modos
=====

Por ahora solo hay un modo de ejecutar la aplicación vip.

Archivos de entrada
===================

Solo necesitas un archivo pdb de la estructura para la que quieres mutaciones sugeridas, que se pasa al ejecutable con la opción de línea de comandos -s descrita más abajo.

Opciones
========

-   -s input\_file.pdb - Especifica el archivo pdb para el que quieres encontrar mutaciones.

-   -cp:ncycles (Size) - Ejecuta el protocolo iterativo (encontrar mutaciones puntuales, relajar, generar la mejor Pose relajada) un número fijo de veces. Si no usas esta opción, seguirá ejecutándose hasta que ya no encuentre mutaciones favorables. Esto último puede tardar bastante en proteínas grandes.

-   -cp:cutoff (real, valor sugerido 6.0) - Es el umbral para elegir residuos mutables (es decir, la distancia desde la esfera de la cavidad hasta un átomo del residuo que no sea de la cadena principal ni de la superficie). Conviene usar el umbral más pequeño posible, ya que así se muta el menor número de residuos que recubren la cavidad.

-   -sasa\_calculator\_probe\_radius (real, valor sugerido 1.0) - Aumentarlo probablemente te dará hendiduras superficiales además de vacíos enterrados.

-   -cp:pack\_sfxn (función de puntuación) (p. ej. -cp:pack\_sfxn score12\_full) - Te permite usar una puntuación distinta para las pruebas de mutantes puntuales.

-   -cp:relax\_sfxn (función de puntuación) - Te permite usar una puntuación distinta para la etapa de relax.

-   -cp:skip\_relax - Hace que el protocolo omita el paso de relax, que es bastante importante para el algoritmo. Esta opción es útil si lo único que quieres es una lista de posibles mutaciones para (por ejemplo) construir bibliotecas de evolución dirigida.

-   -cp:local\_relax - Restringe el alcance del protocolo de relajación para las posibles mutaciones a los residuos vecinos, según lo determine el EnergyGraph.

-   -cp:output - Esta opción especifica el nombre del modelo final de salida con todas las mutaciones sugeridas (por defecto es "final\_mutant.pdb").

-   -cp:print\_reports - Genera un archivo (reports.txt ) que te indica qué mutaciones identificó el filtro geométrico simple y cuáles siguen siendo buenas después de la relajación.

-   -cp:print\_intermediate\_pdbs - Esta opción genera un pdb de todos los átomos por cada mutación aceptada, con el nombre "vip\_iter\_1.pdb", incrementando el número en cada pasada. El pdb de la última iteración será igual al pdb final.

Línea de comandos
=================

La aplicación se puede ejecutar así:

-   ./(executables\_path)/vip.(arch)(mode) -database (database\_path) -s (input\_file).pdb -cp:ncycles 3 -cp:cutoff 6.0 -sasa\_calculator\_probe\_radius 1.0 -run:silent

Salidas esperadas
=================

Las mutaciones aceptadas se imprimen en la salida estándar. Se genera un modelo estructural con todas las mutaciones aceptadas, según lo especificado por la opción -cp:output. Si se solicita con la opción -cp:print\_reports, se genera un archivo llamado "reports.txt" que lista las mutaciones encontradas en el paso de diseño de sitio único y en el paso de relajación, con las mejoras en las funciones de puntuación anotadas para cada una. Si se solicita con la opción -cp:print\_intermediate\_pdbs, se imprime un pdb después de cada recorrido del ciclo iterativo.

Novedades desde la última versión
=================================

Esta aplicación es nueva desde Rosetta 3.4.

##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta
