#Descripción general y conceptos de FoldTree

Metadatos
========
Este documento fue escrito el 1 de octubre de 2007 por Ian W. Davis y se actualizó por última vez el 1 de octubre de 2007.

Puedes encontrar un tutorial introductorio sobre FoldTree [aquí](https://www.rosettacommons.org/demos/latest/tutorials/fold_tree/fold_tree).

El código relevante está en core::kinematics. 

El árbol de plegamiento (fold tree)
=============

El fold tree es una representación de grano grueso del [[árbol de átomos|atomtree-overview]] y se implementa en la clase FoldTree. El fold tree especifica las conexiones entre residuos, lo que en la mayoría de los casos (¿en todos?) basta para generar un árbol de átomos entre bastidores.

Aristas de jump frente a aristas «peptídicas»
==============================

El fold tree almacena las conexiones entre residuos como objetos core::kinematics::Edge. El orden es significativo; «start» es el padre y «stop» es el hijo. (Esto significa que start puede tener un número de secuencia mayor que stop, sin embargo.) Las aristas de jump corresponden directamente a jumps en el árbol de átomos, y conectan un átomo de un residuo con otro átomo de otro residuo. (En la práctica, parece que a menudo se usa el primer átomo de cada uno por comodidad.) Las llamadas aristas «peptídicas», en cambio, especifican la conectividad del polímero de forma abreviada: dan solo los residuos inicial y final de una cadena polimérica. No se especifican átomos.

Por ejemplo, una única cadena polipeptídica de 100 residuos plegada de N a C tendría una sola arista de fold tree, de 1 a 100. Si en cambio se plegara desde el medio hacia fuera, tendría dos aristas, de 50 a 1 y de 50 a 100. Si además tuviera una molécula pequeña unida al residuo 33, habría una arista adicional, de 33 a 101 (suponiendo que el residuo del ligando viene después de los 100 residuos de la proteína).

El fold tree es lo bastante inteligente como para fusionar dos aristas peptídicas en una, p. ej. (1-50) + (50-100) = (1-100), pero puede requerir una llamada manual a delete\_extra\_vertices().

Puntos de corte (cutpoints)
=========

Los «cutpoints» son discontinuidades del fold tree (en comparación con la conectividad del polímero). Todos los residuos se consideran cutpoints excepto los que son internos a una arista peptídica o están en el extremo de menor numeración de una arista peptídica. El extremo de mayor numeración de una arista peptídica (sea padre o hijo) *sí* se considera un cutpoint. Por lo tanto, el residuo de numeración más alta del árbol es *siempre* un cutpoint; sin embargo, no se considera un cutpoint al contar el número de cutpoints del árbol. Suponiendo un árbol conexo, entonces, el número de cutpoints es siempre el mismo que el número de aristas de jump.

Salida de FoldTree
===============

una salida típica de fold tree tiene este aspecto: (como la usan los silent files)

```
FOLD_TREE  EDGE 1 14 -1  JEDGE 14 52 1 C N  INTRA_RES_STUB  EDGE 14 42 -1  EDGE 52 47 -1  EDGE 52 58 -1  JEDGE 58 136 2 C N  INTRA_RES_STUB  JEDGE 47 118 4 N N  INTRA_RES_STUB  EDGE 47 43 -1  EDGE 118 124 -1  EDGE 136 125 -1  EDGE 58 67 -1  EDGE 118 117 -1  EDGE 136 143 -1  JEDGE 117 73 3 N N  INTRA_RES_STUB  EDGE 73 68 -1  EDGE 73 98 -1  EDGE 117 99 -1
```

EDGE son aristas normales

JEDGE son aristas de jump

EDGE inicio fin jump_nr/péptido(=-1) átomo-de-jump-inicial átomo-de-jump-final "INTRA_RES_STUB" -- > construye el árbol de átomos de modo que el movimiento de las torsiones de este residuo no estropee tu jump.

Referencias
==========

Para una discusión completa de las distintas topologías de fold tree y sus usos, consulta Wang, Bradley y Baker, JMB 2007.