Batch Distances
===============

Propósito y algoritmo
=====================

Esta aplicación simplemente recorre todos los pares de residuos de la proteína de entrada e imprime información sobre el acercamiento átomo-átomo más cercano entre los dos residuos.

Salida
======

Un ejemplo de salida, tal como se imprime en la salida estándar, es el siguiente:

```
  resi_idx  resj_idx  resi  resj   atomi   atomj  burial_i  burial_j      dist    seqsep      pose_tag
         2         3     P     K     N       NZ          7        11    9.0335         1     1f4pA.pdb
         2         3     P     K     CA      CA          7        11    3.8200         1     1f4pA.pdb
         2         3     P     K     C       C           7        11    3.4303         1     1f4pA.pdb
```

Opciones de línea de comandos
====================

Ejemplo de línea de comandos:

```
~/rosetta/main/source/bin/batch_distances.default.linuxgccrelease -s input.pdb -mute all
```

| opción            |  efecto  | 
|-------------------|----------|
| -s / -l / -in:file:silent |  Opciones estándar de entrada de Rosetta para una o más estructuras de entrada. |
| -dist_thresholds  | La distancia máxima a través del espacio entre átomos que se informará. (por defecto: sin límite) | 
| -min_seqsep       | Ignora las interacciones con separaciones de secuencia menores que el valor dado (por defecto: 0) 

Consejos y advertencias
==============

Como la salida se imprimirá en la salida estándar, puede ser útil poner `-mute all` en la línea de comandos para suprimir la salida estándar de Rosetta.

Tal como está escrita actualmente, los hidrógenos se ignoran por completo y solo se imprimirán las distancias entre átomos pesados de tipos de átomo de Rosetta similares. (Esto se puede cambiar con la opción «no documentada» `-james:debug`). Los tipos de átomo que se imprimen se pueden cambiar con la opción `-atom_names` 
