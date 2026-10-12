# Penalización aproximada por polares enterrados no satisfechos (approximate_buried_unsatisfied_penalty) 

<i>Nota:  Este término es casi exactamente igual que el [[buried_unsatisfied_penalty|rosetta_basics/scoring/BuriedUnsatPenalty]]. Consulta esa página para ver la motivación. Esta página sirve para describir el uso.</i>
[[_TOC_]]

Autor: Brian Coventry (2018)

## Descripción breve

Es un término para penalizar los polares enterrados no satisfechos (buried unsats). 

El enterramiento se define como XÅ por debajo de la superficie molecular, tal como la define la superficie molecular. El Pose se muta a poli-leucina antes de este cálculo para que la profundidad sea independiente de la secuencia.

La satisfacción se define como tener 1-2 enlaces de hidrógeno (hbonds) en todos los átomos polares enterrados. (2-3 para los grupos NH3)

Este término realiza un paso de precálculo de N cuerpos aplicando reglas sencillas (véase «Cómo funciona») para generar tablas de energía de 1 cuerpo y de 2 cuerpos. Estas tablas de energía se cargan luego en el packer de modo que este término parezca descomponible por pares durante el empaquetado.

Sin embargo, este término no es perfecto. Consulta las salvedades.


## Uso

Este es el uso sugerido en el momento de escribir esto (2018):

```xml
<SCOREFXNS>
    <ScoreFunction name="sfxn" weights="beta_nov16" >
        <Reweight scoretype="approximate_buried_unsat_penalty" weight="5.0" />
        <Set approximate_buried_unsat_penalty_hbond_energy_threshold="-0.5" />
        <Set approximate_buried_unsat_penalty_burial_atomic_depth="4.0" />
        # Set this to false if you don't know where you might want prolines
        <Set approximate_buried_unsat_penalty_assume_const_backbone="true" />
    </ScoreFunction>
</SCOREFXNS>
```

Esta es la lista completa de opciones: (las opciones que no aparecen arriba se establecieron con sus valores por defecto)
```xml
<SCOREFXNS>
    <ScoreFunction name="sfxn" weights="beta_nov16" >
        <Reweight scoretype="approximate_buried_unsat_penalty" weight="5.0" />
        <Set approximate_buried_unsat_penalty_hbond_energy_threshold="-0.5" />
        <Set approximate_buried_unsat_penalty_burial_atomic_depth="4.0" />
        <Set approximate_buried_unsat_penalty_burial_probe_radius="2.3" />
        <Set approximate_buried_unsat_penalty_burial_resolution="0.5" />
        <Set approximate_buried_unsat_penalty_oversat_penalty="1.0" />
        <Set approximate_buried_unsat_penalty_assume_const_backbone="true" />
    </ScoreFunction>
</SCOREFXNS>
```

Las opciones anteriores también se pueden establecer desde la línea de comandos con:
-score:approximate_buried_unsat_penalty_\<name_of_option\> value

Además, si se usa este término con la intención de eliminar <b>todos</b> los polares enterrados no satisfechos, sería prudente usar también la operación de tarea [[PruneBuriedUnsats|scripting_documentation/RosettaScripts/TaskOperations/taskoperations_pages/PruneBuriedUnsatsOperation]].

## Definiciones de las opciones

* approximate_buried_unsat_penalty_hbond_energy_threshold - por defecto -0.25 - Umbral de energía para que un enlace de hidrógeno se considere que satisface un polar enterrado. Debe ser un número negativo. (Establecerlo en -0.001 será mucho más rápido en tiempo de ejecución que 0) 
* approximate_buried_unsat_penalty_burial_atomic_depth - por defecto 4.5 - El corte de profundidad atómica para determinar si un átomo polar está enterrado o no. Se mide desde la superficie Sasa.
* approximate_buried_unsat_penalty_burial_probe_radius - por defecto 2.3 - El radio de la sonda para el cálculo de la profundidad atómica.
* approximate_buried_unsat_penalty_burial_resolution - por defecto 0.5 - La resolución para el cálculo de la profundidad atómica.
* approximate_buried_unsat_penalty_oversat_penalty - por defecto 1.0 - La penalización entre átomos que satisfacen ambos el mismo átomo. Si hacemos X = weight_of_approximate_buried_unsat_penalty, en general un polar enterrado no satisfecho vale X, uno satisfecho vale 0, uno satisfecho doblemente vale X * ( setting-1.0 ), uno satisfecho triplemente vale X * ( -2 + 3 * setting ), y uno satisfecho N veces vale X * ( 1 - N + 0.5 * N * (N - 1) ).
* approximate_buried_unsat_penalty_assume_const_backbone - por defecto true - ¿Debemos suponer que los átomos de la cadena principal no cambiarán durante una trayectoria de empaquetado? (es decir, que no hay posiciones que incluyan tanto un aminoácido normal como prolina o n-metil) Si se establece en false, este método de energía tarda más en calcularse. (~ 2X más)

## Justificación de los parámetros de uso sugeridos
Esto es bastante impreciso. ¡Pero creo que más información es mejor que menos información!

* approximate_buried_unsat_penalty_hbond_energy_threshold - sugerido -0.5 - Por debajo de este corte, Rosetta permitirá enlaces de hidrógeno que fuerzan mucho la definición de enlace de hidrógeno. Se preferiría que el método devolviera buenos enlaces de hidrógeno
* approximate_buried_unsat_penalty_burial_atomic_depth - sugerido 4.0 - Con la nueva definición de VBUNS establecida en 5.5 (véase BuriedUnsatFilter), hace falta una región de margen para que, si el Pose se mueve durante la minimización, no aparezcan nuevos polares no satisfechos
* approximate_buried_unsat_penalty_burial_probe_radius - sugerido 2.3 - Se encontró por ensayo y error. Con el Pose de poli-leucina, este es el valor que aún entra en bolsillos poco profundos pero no se infiltra en el núcleo
* approximate_buried_unsat_penalty_burial_resolution - sugerido 0.5 - La profundidad atómica se recalcula en cada invocación de la función de puntuación. Se cede algo de resolución (respecto a 0.25) a cambio de velocidad.
* approximate_buried_unsat_penalty_oversat_penalty - sugerido 1.0 - Cambiar esto tiene un comportamiento extraño.
* approximate_buried_unsat_penalty_assume_const_backbone - sugerido true - Este es el valor por defecto sugerido porque en muchos casos la gente no diseña con prolinas, y establecerlo en false hace que el término de energía tarde el doble.

## Cómo funciona

(Dile a Brian que arregle esta sección)

A Brian se le acabó el tiempo para escribir esto. Lo siguiente es un extracto de github. Sin embargo, la idea básica es que este término no modela explícitamente la satisfacción de los átomos enterrados, sino que la infiere mediante un conjunto de reglas. Estas reglas deben calcularse en el contexto de todos los rotámeros (antes del empaquetado), pero sorprendentemente se pueden descomponer en términos de un cuerpo y de dos cuerpos. Estos términos de uno y dos cuerpos tienen la propiedad emergente de que el número de enlaces de hidrógeno a un polar enterrado no satisfecho deja un ajuste cuadrático a la satisfacción, como indica la siguiente tabla:

```
hbonds:  0     1      2      3      4      5      6      7
score:   1     0      0      1      3      6      10     15
```

Github:

Aunque el término se puede descomponer en un término de puntuación descomponible por pares, no se calcula así. En realidad se calcula en un contexto de N cuerpos (durante prepare_for_packing_with_rotsets()), pero las puntuaciones que se calculan se pueden aplicar por pares. Esto se hará muy evidente en el caso de fallo que se describe más abajo.

Por el momento, supondremos que todos los átomos de los que voy a hablar están en rotámeros que se pueden reempaquetar. Las cosas se complican un poco si algunos de los átomos están en residuos no empaquetables o en la cadena principal (lo que explicaré al final).

---------------------------------------------------------------------------

Se pueden aplicar tres tipos de puntuaciones:

1. Polar enterrado

2. Enlace de hidrógeno a un polar enterrado

3. Sobresaturación entre dos donantes/aceptores de enlaces de hidrógeno de un polar enterrado



Además, hay tres maneras de aplicar una puntuación:

1. Dos cuerpos: el término se aplica solo si dos rotámeros existen al mismo tiempo

2. Un cuerpo: el término se aplica si este rotámero existe

3. Cero cuerpos: el término se aplica siempre (porque el rotámero no es empaquetable)

¿Cómo se aplican las bonificaciones y las penalizaciones?

1. Polar enterrado

* Cada átomo que puede participar en enlaces de hidrógeno y está enterrado aplica una penalización de un cuerpo de +1 al rotámero que contiene el átomo.

2. Enlace de hidrógeno a un átomo polar

* Cada átomo que puede participar en un enlace de hidrógeno con un átomo polar enterrado añade una bonificación de dos cuerpos de -1 a la arista de los dos participantes en el enlace de hidrógeno (el rotámero enterrado y el rotámero que lo satisface)

3. Sobresaturación entre dos participantes en enlaces de hidrógeno con un polar enterrado

* Para un polar enterrado dado, los pares de átomos que forman enlaces de hidrógeno con él reciben una penalización de dos cuerpos de +1 en su arista.

-----------------------------------------------------------------

Veamos cómo funciona esto con 1 aceptor enterrado con 10 residuos a su alrededor.

-----------------------------------------------------------------

Caso 0: 0 enlaces de hidrógeno

BuriedA  --             10 unused residues

Puntuación del caso 0:

1. Polar enterrado: hay 1 polar enterrado, así que +1

2. Enlaces de hidrógeno al polar enterrado: no hay enlaces de hidrógeno al polar enterrado -0

3. Sobresaturaciones: no hubo enlaces de hidrógeno, así que no hay sobresaturaciones +0

Puntuación del caso 0: +1

-----------------------------------------------------------------

Caso 1:

BuriedA  --  HB            9 unused residues

Puntuación del caso 1:

1. Polar enterrado: hay 1 polar enterrado, así que +1

2. Enlaces de hidrógeno al polar enterrado: hay 1 enlace de hidrógeno al polar enterrado -1

3. Sobresaturaciones: hubo 1 participante en enlaces de hidrógeno (0 pares sobresaturados), así que sobresaturaciones +0

Puntuación del caso 1: + 0

-----------------------------------------------------------------

Caso 2:

BuriedA  --  HB  HB           8 unused residues

Puntuación del caso 2:

1. Polar enterrado: hay 1 polar enterrado, así que +1

2. Enlaces de hidrógeno al polar enterrado: hay 2 enlaces de hidrógeno al polar enterrado -2

3. Sobresaturaciones: hubo 2 participantes en enlaces de hidrógeno (1 par sobresaturado), así que sobresaturaciones +1

Puntuación del caso 2: + 0

------------------------------------------------------------------------

Caso 3:

BuriedA  --  HB  HB           8 unused residues

Puntuación del caso 3:

1. Polar enterrado: hay 1 polar enterrado, así que +1

2. Enlaces de hidrógeno al polar enterrado: hay 3 enlaces de hidrógeno al polar enterrado -3

3. Sobresaturaciones: hubo 3 participantes en enlaces de hidrógeno (3 pares sobresaturados), así que sobresaturaciones +3

Puntuación del caso 3: + 1

-----------------------------------------------------------------------------

Caso 10:

BuriedA  --  HB  HB  HB  HB  HB  HB  HB  HB  HB  HB           0 unused residues

Puntuación del caso 10:

1. Polar enterrado: hay 1 polar enterrado, así que +1

2. Enlaces de hidrógeno al polar enterrado: hay 10 enlaces de hidrógeno al polar enterrado -10

3. Sobresaturaciones: hubo 10 participantes en enlaces de hidrógeno (45 pares sobresaturados), así que sobresaturaciones +45

Puntuación del caso 10: + 36

-----------------------------------------------------------------------------

Caso de fallo: este es el caso 2, pero el packer decidió empaquetar solo los dos participantes en enlaces de hidrógeno y *no* el aceptor enterrado

( nothing ) -- HB  HB      8 unused residues

Puntuación del caso de fallo:

1. Polar enterrado: hay 0 polares enterrados, así que +0

2. Enlaces de hidrógeno al polar enterrado: hay 0 enlaces de hidrógeno al polar enterrado -0

3. Sobresaturaciones: hubo 2 participantes en enlaces de hidrógeno (1 par sobresaturado), así que sobresaturaciones +1

Puntuación del caso de fallo: + 1

El caso de fallo demuestra que:

1. Este es realmente un término de dos cuerpos (la penalización por sobresaturación se sigue aplicando aunque el polar enterrado no esté y los enlaces de hidrógeno no existan en realidad.)

2. El término de puntuación es una aproximación (claramente aquí llegó a una conclusión errónea)

----------------------------------------------------------------------------------

¿Y si algunos de los átomos forman parte de la cadena principal o no son empaquetables?

Hay una manera relativamente sencilla de gestionarlo. Simplemente se reduce el orden del término de *cuerpos y se aplica la penalización o bonificación al residuo reempaquetable.

Ejemplo: el átomo polar enterrado forma parte de la cadena principal y todo lo demás es empaquetable

1. Su penalización por enterramiento se convierte de un cuerpo a cero cuerpos y la penalización se aplica a la puntuación total

2. Los participantes en enlaces de hidrógeno con este átomo polar ven convertidas sus aristas de dos cuerpos a un cuerpo y reciben la bonificación total como energía de un cuerpo.

3. Las sobresaturaciones con este átomo polar siguen siendo todas empaquetables, así que se les aplica la penalización en sus aristas de dos cuerpos

Y luego se puede imaginar el caso en que todo este esquema de puntuación ocurre en territorio no empaquetable. En esta situación, todas las penalizaciones y bonificaciones se convierten en energías de cero cuerpos y se aplican a la puntuación total.


## Salvedades

(Dile a Brian que arregle esta sección)

Las serinas, que en la naturaleza pueden aceptar 3 enlaces de hidrógeno, aquí se ven obligadas a aceptar 1-2.

La penalización por sobresaturación se aplica aunque el átomo enterrado no esté presente. (La situación no es tan mala como podría imaginarse. Supongamos que dos rotámeros A y B satisfacen una serina enterrada. La serina tendrá al menos 10 rotámeros que quedan todos satisfechos por A y B. Si este término de puntuación se hubiera programado de forma ingenua, A y B tendrían una penalización por sobresaturación de 10+ porque no comprueban si existe la serina. Sin embargo, el código es lo bastante inteligente como para contarlo como una penalización de 1. (Toma la penalización máxima por sobresaturación que se produce a causa de un rotámero en cada posición de la secuencia))

## Cómo visualizar la región de enterramiento

El siguiente código de python se puede usar para visualizar la región de enterramiento:

```python
import pyrosetta
pyrosetta.init()

pose = pyrosetta.pose_from_file("my_pose.pdb")

probe_radius = 2.3
depth = 5.5
resolution = 0.5

atomic_depth = pyrosetta.rosetta.core.scoring.atomic_depth.AtomicDepth( pose, probe_radius, True, resolution )

atomic_depth.visualize_at_depth( depth, "my_atomic_depth.pdb.gz" )

```
