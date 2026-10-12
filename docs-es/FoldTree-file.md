El FoldTree
============

En Rosetta, un FoldTree es una representación de la conectividad de una estructura. Aunque para cada aplicación de Rosetta se genera un FoldTree por defecto, para fines específicos se puede querer generar un FoldTree personalizado (se recomienda mucho leer más sobre [[el FoldTree|foldtree-overview]] y seguir el [tutorial de FoldTree] (https://www.rosettacommons.org/demos/latest/tutorials/fold_tree/fold_tree)).


Cómo pasar un archivo FoldTree
==============================

Se puede definir un FoldTree personalizado mediante un archivo FoldTree y proporcionarlo a Rosetta por la línea de comandos (con la opción ``-fold_tree``) o mediante la interfaz de RosettaScripts, por ejemplo con el [[AtomTreeMover | AtomTreeMover]]

Formato de archivo
===========

```
FOLD_TREE EDGE <start position> <stop position> <edge type> EDGE <start position> <stop position> <edge type>
```

Donde las posiciones de inicio y fin son los números internos de Rosetta de las posiciones límite que definen un segmento.
El tipo de arista (edge type) puede ser -1, que especifica una arista "polimérica" (en la que una cadena de residuos está conectada por enlaces covalentes); -2, que especifica una arista covalente "no polimérica" (en la que hay que especificar los dos átomos conectados después del tipo de arista, en el orden de los residuos especificados); o un número entero positivo que especifica un número de salto (jump).

EJEMPLO
=======
```
FOLD_TREE EDGE 1 18 -1 EDGE 18 32 1 EDGE 32 19 -1 EDGE 32 50 -1 EDGE 50 163 2 EDGE 163 51 -1 EDGE 163 164 -2 C1 SG
```
Este FoldTree define una estructura con las siguientes propiedades:
 - posiciones unidas covalentemente por conexiones poliméricas: 1-18, 19-32 (observa que se permite el orden inverso, porque en este punto del archivo la posición 32 ya está definida por un salto, mientras que la 19 todavía está "separada" del árbol), 32-50, 51-163.
 - posiciones conectadas por un salto: (1) 18-32; (2) 50-163
 - las posiciones 163-164 están unidas covalentemente a través del átomo C1 de la posición 163 y del átomo SG de la posición 164
