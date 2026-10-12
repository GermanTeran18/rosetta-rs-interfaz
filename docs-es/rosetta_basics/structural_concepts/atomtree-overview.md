#Descripción general y conceptos de AtomTree

Metadatos
========

Este documento fue escrito el 18 de septiembre de 2007 por Ian W. Davis y se actualizó por última vez el 18 de septiembre de 2007.

El código relevante está en core::kinematics y core::kinematics::tree. («Kinematics» se ocupa de la conversión entre coordenadas cartesianas y [[coordenadas internas|internal coordinates]], que a menudo se discute en términos de brazos robóticos.) 



Quiralidad y convenciones
==========================

Rosetta usa un sistema de coordenadas dextrógiro, igual que los archivos PDB: si el eje X apunta a la derecha y el eje Y apunta hacia arriba, el eje Z sale de la pantalla hacia ti. Las matrices de rotación premultiplican las coordenadas que transforman, es decir, Mv = v'. Las matrices son de 3x3 (en lugar de coordenadas «homogéneas» de 4x4), por lo que la rotación y la traslación se especifican como dos objetos separados, una matriz y un vector.

El árbol de átomos
=============

El árbol de átomos es una estructura de datos para rastrear y manipular tanto las coordenadas cartesianas (xyz) como las internas (longitud, ángulo, diedro) de los átomos, manteniendo ambas sincronizadas. Es un árbol en el sentido de la informática / teoría de grafos: hay un átomo que actúa como raíz del árbol, y todos los demás átomos tienen exactamente un padre y cero o más hijos.

Los árboles no pueden contener ciclos, por lo que cualquier estructura cíclica debe «cortarse» omitiendo un enlace. Esto ocurre con más frecuencia en las estructuras de anillo (Phe, Tyr, Trp, His, bases de los ácidos nucleicos), aunque las conexiones de largo alcance como los puentes disulfuro también introducen ciclos.

Stubs
=====

Un «stub» es un sistema de coordenadas local. Cada átomo del árbol de átomos tiene un stub asociado, que define un sistema de coordenadas local con dicho átomo en el origen. Un objeto Stub contiene la posición del átomo del stub en el sistema de coordenadas global y una matriz de rotación de 3x3 que rota las coordenadas del sistema local al global. (Para ir en sentido contrario, el átomo del stub está siempre en el origen del sistema de coordenadas del stub y la traspuesta de la matriz rota las coordenadas del sistema global al local.)

Un stub suele definirse con tres átomos. El primero marca el origen, el segundo fija la dirección del eje X y el tercero fija el plano X-Y y la dirección general del eje Y. (Se usan productos vectoriales para obtener ejes verdaderamente ortogonales.)

Jumps
=====

Matemáticamente, un jump contiene la misma información que un stub: la rotación y la traslación para pasar de un sistema de coordenadas a otro. Sin embargo, los stubs relacionan un sistema de coordenadas local con el global, mientras que los jumps relacionan dos sistemas de coordenadas locales entre sí. Es decir, un jump especifica la posición y orientación de cuerpo rígido, de seis grados de libertad, de un grupo respecto de otro. Los jumps suelen especificar la relación entre grupos químicamente independientes, como una proteína y su ligando (no enlazado).

JumpAtoms frente a BondedAtoms
=========================

La raíz del árbol de átomos y la pseudo-raíz de cada nuevo grupo independiente (p. ej. un ligando asociado a una proteína) es un JumpAtom, relacionado con su padre en el árbol (o con el origen global, en el caso de la raíz) mediante un Jump. Todos los demás átomos son BondedAtoms, descendientes de algún JumpAtom y conectados a él por una serie de enlaces químicos. La posición de cada átomo enlazado se especifica en coordenadas esféricas relativas al sistema de coordenadas (stub) de su padre.

Cada átomo enlazado necesita conocer dos stubs: su «stub de entrada», que establece su padre y que es el sistema en el que se especifican sus coordenadas internas; y su propio stub con él mismo en el origen, que establece para determinar los stubs de entrada de sus hijos.

[[Coordenadas internas|Internal coordinates]], el caso simple
=====================================

El caso más simple surge en una cadena larga y no ramificada de átomos, como en un hidrocarburo de cadena lineal o en la cadena lateral de la lisina. Considera un átomo hijo A con padre B, el padre de B es C y el padre de C es D. Las coordenadas internas de A se dan como la distancia, d, desde B; el ángulo, theta, entre los vectores C-\>B y B-\>A (es decir, 180 - theta es el ángulo de enlace C-B-A); y el ángulo de torsión A-B-C-D, que se llama phi.

Un enunciado equivalente es que d, theta y phi especifican la posición de A en coordenadas esféricas, relativas a su sistema de coordenadas de stub de entrada. El vector desde el origen hasta A mide d unidades de largo, forma un ángulo theta con el eje X, y su proyección en el plano Y-Z forma un ángulo phi con el eje Y. Dicho de otro modo, para construir la posición de A, se empieza con un vector de d unidades de largo a lo largo del eje X positivo, se rota theta alrededor del eje Z (colocándolo en algún lugar del plano X-Y) y luego se rota phi alrededor del eje X para obtener la posición final.

Otro enunciado equivalente es que, para generar el stub de A a partir del stub de B (el stub de entrada de A), se posmultiplica la matriz del stub de B, M\_B, por las matrices que rotan alrededor de X por phi y alrededor de Z por theta, y luego se traslada el centro del stub de B, v\_B, por esa matriz multiplicada por el vector (d,0,0). Es decir,

```
M_A = M_B * M_phi * M_theta
v_A = v_B + M_A * (d,0,0)
```

Ahora el centro del stub de A, v\_A, es la posición del átomo A en el sistema de coordenadas global.

Coordenadas internas, el truco del hermano anterior
================================================

Las cosas se complican en una cadena ramificada, cuando un átomo padre tiene más de un hijo (p. ej. el extremo de la cadena lateral de la leucina). Las coordenadas internas del primer hijo se manejan como arriba. Sin embargo, el ángulo diedro de cada hijo posterior se especifica relativo a su hermano anterior, como una torsión impropia. P. ej. para el hijo A2 el diedro es A2-B-C-A1; para el hijo A3 el diedro es A3-B-C-A2; etc.

Esto significa que cada hijo del padre tiene un stub de entrada distinto, que se deriva del stub del padre por rotación (aunque la rotación == 0 para el primer hijo). Por esta razón, al actualizar las coordenadas cartesianas de los átomos enlazados, el stub del padre en realidad es modificado por cada hijo por turno, que aplica su rotación phi ANTES de copiar el objeto Stub y aplicar los demás cambios para generar su propio stub (que a su vez será modificado por sus hijos).

Esto significa que los input\_stub\_atoms del primer hijo son los mismos que los stub\_atoms del padre, pero input\_stub\_atom3 de los hijos posteriores no es igual a stub\_atom3 del padre.

La razón de esta elaborada configuración es la eficiencia. La operación más común en Rosetta es rotar alrededor de algún enlace, pero si el diedro de cada átomo se definiera relativo a su bisabuelo, rotar alrededor de un enlace exigiría actualizar la coordenada diedra de todos los hijos del átomo hijo del enlace. Al especificar la mayoría de los diedros como DESPLAZAMIENTOS rotacionales respecto del anterior, todos los hijos «van montados» unos sobre otros y solo hace falta actualizar el diedro del primero de ellos para lograr una rotación alrededor del enlace. Esto es especialmente importante, por ejemplo, al minimizar torsiones, donde permitimos que varíe el phi del primer hijo y mantenemos fijos los phi de los demás hijos; sin el truco del hermano anterior, ¡todos esos grados de libertad tendrían que ser libres y, aun así, estar atados entre sí!

Casos especiales
=============

Surgen casos especiales cerca de la raíz del árbol o inmediatamente después de un jump, cuando nos falta un átomo bisabuelo (enlazado) para definir el sistema de coordenadas del stub. Lee el código para ver los detalles, pero básicamente los tres primeros átomos del árbol acaban actuando como puntos de referencia del stub unos para otros. En al menos un caso esto significa que el stub tiene que «darse la vuelta» porque apunta en el sentido equivocado: hacia arriba en el árbol de átomos en lugar de hacia abajo.

También surgen casos especiales con grupos muy pequeños (1 o 2) de átomos enlazados que están conectados con el resto de la estructura solo mediante jumps. El grupo local de átomos enlazados es insuficiente para definir un sistema de coordenadas incluso con las reglas de casos especiales anteriores, por lo que algunas partes del stub se toman del átomo padre del lado de origen del jump.

Si un padre tiene algunos hijos unidos mediante jumps y otros unidos mediante enlaces, todos los hijos por jump van antes que los hijos enlazados. Como los jumps no modifican los stubs de su padre al calcular sus coordenadas, esto evita que los grupos de jump roten cuando rota el enlace padre - abuelo.