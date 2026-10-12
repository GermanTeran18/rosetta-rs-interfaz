#Aplicación extract\_atomtree\_diffs

Metadatos
========

Autor: Lucas Nivon

Este documento fue escrito el 21 de septiembre de 2010 por Lucas Nivon, basándose en gran parte en la documentación de ligand\_dock de Ian W. Davis.

Código y demostración
=====================

Consulta `       rosetta/tests/integration/tests/extract_atomtree_diffs      ` para ver un ejemplo de "silent file" en formato atomtree\_diff y un ejemplo de uso. Ten en cuenta que difiere de un silent file que no esté en formato atomtree-diff, porque guarda una estructura de referencia al principio, seguida de un diff de cada estructura respecto a la estructura de referencia.

Referencias
==========

-   Ian W. Davis and David Baker (2009). "ROSETTALIGAND docking with full ligand and receptor flexibility" J Mol Biol. Vol. 385, issue 2. Pages 381-392.

Propósito de la aplicación
===========================================

Esta aplicación extrae un PDB, con su puntuación de Rosetta asociada, de un silent file con formato atomtree\_diff.

Algoritmo
=========

El silent file con formato atomtree\_diff guarda muchos PDB de forma compacta. Guarda el registro PDB completo de una primera estructura, la de referencia, y para todas las estructuras siguientes guarda solo la diferencia (diff) entre el atomtree de la estructura y la estructura de referencia. Esta aplicación puede extraer todas las estructuras de un silent file en PDB separados (el comportamiento por defecto) o solo las estructuras deseadas (especificadas con la opción "tags").

Limitaciones
===========

Esta aplicación sirve solo para extraer PDB de silent files con formato atomtree\_diff, no de silent files "estándar". Los silent files con formato atomtree\_diff los genera, por ejemplo, la aplicación ligand\_dock.

Modos
=====

El modo por defecto extrae todas las estructuras de un silent file. Si usas las opciones "tags", la extracción se limita a las estructuras especificadas.

Archivos de entrada
===========

Esta aplicación requiere un silent file atomtree\_diff (\*\_silent.out). Si hay un ligando, requiere el archivo de especificación del ligando (\*.params) junto con las conformaciones asociadas del ligando (\*\_confs.fa.pdb.gz o simplemente \*.pdb).

-   silent file atomtree\_diff (p. ej., `        rosetta/main/tests/integration/tests/extract_atomtree_diffs/inputs/7cpa_no_ligand_CP1_silent.out       `)
-   archivos .params del ligando y los confórmeros del ligando en PDB asociados (consulta [[ligand_dock|ligand-dock]] para ver detalles y ejemplos en: `        rosetta/main/tests/integration/tests/extract_atomtree_diffs/inputs/CP1.fa.params and CP1_confs.fa.pdb.gz       `)

Un ejemplo de línea de comandos para extraer solo una estructura (usando los archivos de `       rosetta/main/tests/integration/tests/extract_atomtree_diffs      `):

```
~/rosetta/main/source/bin/extract_atomtree_diffs.linuxgccrelease -database /path/to/rosetta/main/database -extra_res_fa inputs/CP1.fa.params -s inputs/7cpa_no_ligand_CP1_silent.out -tags 7cpa_no_ligand_CP1_0_0012
```

Una ejecución de Rosetta producirá un silent file en formato atomtree diff que contiene el punto final de cada trayectoria. Estos silent files se pueden concatenar sin problema para obtener un único archivo de salida por ligando. Eso sí, asegúrate de usar `       -out:prefix      ` y/o `       -out:suffix      ` en cada proceso para garantizar que los nombres de las etiquetas (tags) sean únicos.

Esta aplicación usa el formato "atomtree diff" (de Ian Davis), que es muy eficiente: una estructura de referencia más unos \~10 kb por cada estructura adicional. Esto es importante para cualquier protocolo, como el docking de ligandos, que puede producir estructuras de salida con rapidez (p. ej., una por minuto o más rápido) y en el que volcar PDB completos saturaría el sistema de archivos compartido. Después de la estructura de referencia inicial en formato PDB, las entradas de un silent file atomtree diff tienen este aspecto:

```
POSE_TAG 7cpa_0_0_0001
SCORES 7cpa_0_0_0001 angle_constraint 0 atom_pair_constraint 0 chainbreak 0 coordinate_constraint 7.16583 dihedral_constraint 0.742443 ... total_score -1006.22
MUTATE 66 LEU_p:protein_cutpoint_lower
MUTATE 67 GLY_p:protein_cutpoint_upper
...
FOLD_TREE  EDGE 1 307 -1  EDGE 1 308 1  EDGE 1 309 2
66 5 0.032845
66 8 -0.916
66 9 1.628
...
309 72 3.141216 1.048102
309 73 -3.139298 1.047107
309 74 -3.140680 1.055816
JUMP 1 0.921608570732 -0.387947033110 -0.011607835912 -0.173665196042 -0.385443938354 -0.906241342066 0.347099469947 0.837215665099 -0.422601334682 5.8930 5.1449 -27.6719
JUMP 2 0.042857484863 0.122530593587 0.991538950131 -0.877881019816 0.478410411182 -0.021175304449 -0.476957179459 -0.869545704439 0.128070749413 3.8597 8.9944 -31.2992
END_POSE_TAG 7cpa_0_0_0001
```

El formato de cada línea atomtree diff es el siguiente ( `       rosetta/main/source/src/core/io/atom_tree_diffs/atom_tree_diff.cc      `):
 Formato: resno atomno phi [theta [d]], solo para los átomos cuyos grados de libertad (DOF) han cambiado.
 Phi va primero porque los diedros cambian con más frecuencia.
 Theta va a continuación porque, en la mayoría de los casos, los ángulos de enlace no cambian, así que se puede omitir.
 D va al final y requiere la menor precisión, porque no controla un efecto de brazo de palanca.

La etiqueta "7cpa\_0\_0\_0001" es un "tag", que sirve para identificar de forma única cada resultado de docking, como el nombre de un archivo en un directorio. Por defecto se extraen todas las estructuras del silent file, pero puedes extraer solo las de mejor puntuación (por ejemplo) indicando los tags en la línea de comandos con la opción `       -tags      `.

El script incluido `       best_ifaceE.py      ` lee un silent file e imprime los tags de los Poses con mejor puntuación. En el shell Bash puedes usar esta salida directamente para obtener los 10 mejores Poses:

```
~/rosetta/main/source/bin/extract_atomtree_diffs.macosgccrelease -database /path/to/rosetta/main/database -extra_res_fa input/1t3r.params \
  -s 1t3r_silent.out -tags $(~/rosetta/main/source/src/apps/public/ligand_docking/best_ifaceE.py -n 10 1t3r_silent.out)
```

Los archivos atomtree diff son texto plano y las puntuaciones finales se registran en las líneas SCORES. Estas se pueden procesar fácilmente con scripts para seleccionar los mejores resultados. Puede resultar útil convertirlas en una tabla de puntuaciones (CSV o equivalente) y hacer el análisis en R; también se podría hacer lo mismo en Excel, etc.

```
~/rosetta/main/source/src/apps/public/ligand_docking/get_scores.py < 1t3r_silent.out > 1t3r_scores.tab
```

Lo siguiente se aplica a la salida del docking de ligandos:

Entre las puntuaciones de interés están "total\_score", la energía global de Rosetta del complejo receptor-ligando; "interface\_delta", que estima la energía de unión como la diferencia entre total\_score y la puntuación de los componentes separados; y "ligand\_auto\_rms\_no\_super", el RMSD entre la posición final del ligando y su posición en el PDB de entrada (o en el PDB de `       -native      `), teniendo en cuenta cualquier simetría química (automorfismos). También figuran los componentes individuales de total\_score, así como los componentes de interface\_delta (con el prefijo "if\_").

Ian Davis informa de buenos resultados con el siguiente esquema de clasificación. Primero, descarta las estructuras en las que el ligando no toca la proteína (ligand\_is\_touching = 0). Después, quédate con el 5 % superior por energía total (total\_score). Luego ordena el resto por la energía de interacción solo entre la proteína y el ligando (interface\_delta); es la diferencia de puntuación entre los componentes juntos y los componentes separados 500A. Entre las estructuras de menor energía, esto elimina parte del ruido no correlacionado debido a pequeñas variaciones en la proteína y se centra en las interacciones proteína-ligando. Este es el esquema de puntuación que implementa `       best_ifaceE.py      `, que se puede ejecutar directamente sobre el silent file para descubrir los "mejores" resultados de docking.

Si la posición inicial del ligando es significativa (p. ej., en un benchmark para reproducir un modo de unión conocido), grafica interface\_delta de estas estructuras de mayor puntuación frente a ligand\_auto\_rms\_no\_super y deberías obtener un buen embudo de docking. Se puede usar ligand\_auto\_rms\_with\_super para ver cuánta variación conformacional del ligando obtienes en las estructuras de salida. (La diferencia es si los ligandos se superponen o no; "auto" es la abreviatura de "automorfismo", lo que significa que al calcular el RMS se tienen en cuenta ciertos tipos de simetría química.)

Opciones
=======

Especifica el silent file de entrada. Si hay un ligando, especifica el archivo params correspondiente. El comportamiento por defecto genera PDB para todas las estructuras del silent file, pero para extraer solo los archivos deseados, indícalos con la opción -tags

-   -s [silent file]
-   -extra\_res\_fa [archivo params del ligando]
-   -tags [el nombre del tag deseado]
-   Ten en cuenta que los tags se pueden leer a mano directamente en el archivo silent.out, ya que cada estructura empieza con una línea POSE\_TAG que especifica el nombre del tag de esa estructura. Los tags deseados pueden provenir de otro script, como bestifaceE.py (por ejemplo: `~/rosetta/main/source/src/apps/public/ligand_docking/best_ifaceE.py -n 10 1t3r_silent.out`).

Consejos
====

Usa la opción -tags para especificar qué estructura extraer.

Salidas esperadas
================

Esta aplicación produce archivos PDB con puntuación de Rosetta.

## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Antiguo fragment picker | fragment-picking-old]]: el fragment picker antiguo.
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
