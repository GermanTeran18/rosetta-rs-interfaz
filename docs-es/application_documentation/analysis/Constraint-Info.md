#Constraint Info

Descripción del algoritmo
========================

Las [[restricciones de Rosetta|constraint-file]] sirven para ajustar el paisaje de energía de una simulación, ya sea para sesgarla en contra de ciertas estructuras «malas» o para incorporar datos experimentales. Sin embargo, la salida estándar de los protocolos con restricciones entrega solo un valor final de energía para las restricciones, en lugar de un desglose restricción por restricción de cómo se comporta cada estructura en cada una.

La aplicación cst_info toma un archivo de restricciones y una o más estructuras, y entrega en forma de tabla un resumen de cómo se comporta cada estructura en cada restricción, tanto en energía de Rosetta como en la métrica geométrica cruda sobre la que se calcula la restricción.

Entrada
=====

Respeta las opciones de entrada estándar (por ejemplo, -in:file:s, -in:file:silent, etc.). Se pueden especificar varias estructuras de entrada.

El nombre del [[archivo de restricciones|constraint file]] que quieres usar se especifica con -constraints::cst_file o -constraints::cst_fa_file 

El nombre del archivo de salida se especifica con -out:file:scorefile

Salida
===============

Una tabla separada por espacios en blanco, con columnas tanto para la puntuación *sin ponderar* de cada restricción como para la métrica geométrica que calcula cada una (o cero, si la métrica no se puede resumir en un solo número). 

Ejemplo de salida:

```
SCORE: total_score       score  CstFile1_1_measure CstFile1_1_score CstFile1_2_measure CstFile1_2_score CstFile1_3_measure CstFile1_3_score CstFile1_4_measure CstFile1_4_score CstFile1_5_1_measure CstFile1_5_1_score CstFile1_5_2_measure CstFile1_5_2_score CstFile1_5_3_measure CstFile1_5_3_score  CstFile1_5_measure CstFile1_5_score description 
SCORE:       0.000       0.000              21.366           21.930             13.066            0.284              8.035            0.000              9.106            0.000               15.080              2.371               12.417              0.044                9.134              0.000               0.000            0.044 S_0001_1234
SCORE:       0.000       0.000              16.637            5.376             11.355            0.000              9.118            0.000             12.034            0.000               15.228              2.605               16.347              4.725               12.973              0.237               0.000            1.702 S_0002_0533
```

Cada restricción tiene dos columnas correspondientes: una columna «measure», que da la medida geométrica cruda, y una columna «score», que da la puntuación (sin ponderar) de cada restricción. Las multirrestricciones (por ejemplo, restricciones ambiguas, restricciones KofN, etc.) tendrán subencabezados adicionales (por ejemplo, CstFile1_5_2_measure) correspondientes a cada subrestricción dentro de la multirrestricción. 

En la salida del tracer (el texto que se imprime en la terminal) se debería imprimir la definición de cada tipo de restricción

```
protocols.simple_moves.CstInfoMover: ------------ Constraints read for file inputs/file1.cst-------------
protocols.simple_moves.CstInfoMover: # Constraint for 'CstFile1_1' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    13  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CstFile1_2' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    16  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CstFile1_3' is:
protocols.simple_moves.CstInfoMover: AtomPair  N     18  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CstFile1_4' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    19  O     23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CstFile1_5' is:
protocols.simple_moves.CstInfoMover: KofNConstraint 2
protocols.simple_moves.CstInfoMover: AtomPair  CA    33  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: AtomPair  CA    36  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: AtomPair  N     38  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: End_KofNConstraint
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CstFile1_5_1' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    33  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CstFile1_5_2' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    36  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CstFile1_5_3' is:
protocols.simple_moves.CstInfoMover: AtomPair  N     38  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: ----------------------------------------------------
```

Por ejemplo, en esta salida, que CstFile1_2_measure valga 13.066 significa que la distancia entre el átomo CA del residuo 16 y el átomo CA del residuo 23 (`AtomPair  CA    16  CA    23`) es de 13.066 Å. Al convertirla en una puntuación con la función correspondiente (`FLAT_HARMONIC 8 2 4`), la puntuación (sin ponderar) resultante la da CstFile1_2_score: 0.284.

Advertencias y notas
=================

El orden de las restricciones en la salida debería coincidir con el orden de las restricciones en el archivo de restricciones de entrada, pero lo mejor es comprobar el orden en la salida del tracer.

Los valores de puntuación de la tabla corresponden a los valores de puntuación *sin ponderar* (con peso unitario) y no se ven afectados por ninguna opción de función de puntuación que pases.

Líneas de comandos
====================

Comando de ejemplo:

```
cst_info.linuxgccrelease -in:file:s input.pdb -constraints:cst_fa_file fullatom.cst -out:file:scorefile cstinfo.sc
```

Ejemplo
=======

Consulta la prueba de integración en rosetta/main/tests/integration/tests/cst_info para ver un ejemplo.

##Véase también
* [[Formato del archivo de restricciones|constraint file]]: la documentación del archivo de restricciones de Rosetta
* [[CstInfoMover]]: una interfaz de RosettaScripts para esta funcionalidad.
* [[Aplicaciones de análisis | analysis-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta

