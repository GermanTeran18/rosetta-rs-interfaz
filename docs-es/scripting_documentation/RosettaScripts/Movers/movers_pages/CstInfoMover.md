# CstInfoMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## CstInfoMover

_Nota: este es un mover antiguo, anterior al marco más reciente de [[SimpleMetrics]]. Considera usar [[ConstraintsMetric]]
si quieres capturar información sobre las restricciones de una Pose en un formato compatible con los [[archivos .cst|constraint-file]]._

[[include:mover_CstInfoMover_type]]

### Salidas esperadas

Ejemplo de salida del archivo de puntuaciones (scorefile)
```
SCORE: total_score CST_1_measure CST_1_score CST_2_measure CST_2_score CST_3_measure CST_3_score CST_4_measure CST_4_score CST_5_1_measure CST_5_1_score CST_5_2_measure CST_5_2_score CST_5_3_measure CST_5_3_score CST_5_4_1_measure CST_5_4_1_score CST_5_4_2_measure CST_5_4_2_score CST_5_4_3_measure CST_5_4_3_score CST_5_4_measure CST_5_4_score CST_5_5_measure CST_5_5_score CST_5_6_measure CST_5_6_score CST_5_measure CST_5_score description 
SCORE:       0.000        15.292       2.710        10.358       0.000         9.196       0.000         8.190       0.000          15.569         3.184          15.079         2.369          14.456         1.508            10.733           3.002             9.453           0.528             8.175           0.345           0.000         0.345          15.598         3.236          15.574         3.194         0.000       4.222 1a19_0001
```

CstInfoMover añadirá términos de puntuación adicionales a la Pose y al scorefile. Habrá dos columnas por término de puntuación. La columna 'measure' de cada término informa de cuál es la medida geométrica de la restricción, mientras que la columna 'score' informa de cuál es la puntuación *sin ponderar* de la restricción, una vez aplicada la función.

Cada término de puntuación recibe una etiqueta única, según la posición en el archivo de restricciones. Por ejemplo, CST_5_4_2_measure y CST_5_4_2_score son los dos términos de una restricción del archivo de restricciones a la que se dio el prefijo "CST". En este caso, recursive era true y es una sub-subrestricción de una multirrestricción anidada. En concreto, es la quinta restricción del archivo (que es una multirrestricción), la cuarta subrestricción de la multirrestricción (una multirrestricción anidada) y la segunda restricción de esa multirrestricción anidada. Se imprimirán más detalles en la salida del tracer.

Ejemplo de salida del tracer:
```
protocols.simple_moves.CstInfoMover: ------------ Constraints read for file inputs/file1.cst-------------
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_1' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    13  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_2' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    16  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_3' is:
protocols.simple_moves.CstInfoMover: AtomPair  N     18  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_4' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    19  O     23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_5' is:
protocols.simple_moves.CstInfoMover: KofNConstraint 3
protocols.simple_moves.CstInfoMover: AtomPair  CA    33  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: AtomPair  CA    36  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: AtomPair  N     38  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: AmbiguousConstraint
protocols.simple_moves.CstInfoMover: AtomPair  CA    36  CA    43 FLAT_HARMONIC 7 1 2
protocols.simple_moves.CstInfoMover: AtomPair  N     38  CA    43 FLAT_HARMONIC 4 2 4
protocols.simple_moves.CstInfoMover: AtomPair  CA    39  O     43 FLAT_HARMONIC 6 2 1
protocols.simple_moves.CstInfoMover: End_AmbiguousConstraint
protocols.simple_moves.CstInfoMover: AtomPair  CA    39  O     23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: AtomPair  CA    33  CA    43 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: End_KofNConstraint
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_5_1' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    33  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_5_2' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    36  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_5_3' is:
protocols.simple_moves.CstInfoMover: AtomPair  N     38  CA    23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_5_4' is:
protocols.simple_moves.CstInfoMover: AmbiguousConstraint
protocols.simple_moves.CstInfoMover: AtomPair  CA    36  CA    43 FLAT_HARMONIC 7 1 2
protocols.simple_moves.CstInfoMover: AtomPair  N     38  CA    43 FLAT_HARMONIC 4 2 4
protocols.simple_moves.CstInfoMover: AtomPair  CA    39  O     43 FLAT_HARMONIC 6 2 1
protocols.simple_moves.CstInfoMover: End_AmbiguousConstraint
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_5_4_1' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    36  CA    43 FLAT_HARMONIC 7 1 2
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_5_4_2' is:
protocols.simple_moves.CstInfoMover: AtomPair  N     38  CA    43 FLAT_HARMONIC 4 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_5_4_3' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    39  O     43 FLAT_HARMONIC 6 2 1
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_5_5' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    39  O     23 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: # Constraint for 'CST_5_6' is:
protocols.simple_moves.CstInfoMover: AtomPair  CA    33  CA    43 FLAT_HARMONIC 8 2 4
protocols.simple_moves.CstInfoMover: 
protocols.simple_moves.CstInfoMover: ----------------------------------------------------
```

Ten en cuenta que, si no proporcionas un archivo de restricciones (es decir, si informas sobre las restricciones que ya están en la Pose), tendrás que consultar la salida del tracer para ver las definiciones de cada término, ya que no hay garantías de orden para las restricciones de la Pose. Además, si es probable que cada estructura tenga un número distinto de restricciones, quizá quieras añadir la opción `-out:file:scorefile_format json` a la línea de comandos para obtener un scorefile con formato JSON (en lugar de texto tabular), que funciona mejor cuando cada estructura tiene un número distinto de términos de puntuación.

##Véase también

* [[Constraint Info]] - una versión de línea de comandos de la misma funcionalidad.
* [[PoseInfoFilter]] - otra forma en RosettaScripts de obtener información de las restricciones; informa de los detalles de las restricciones al tracer.
* [[I want to do x]]: guía para elegir un mover