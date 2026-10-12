#Aplicación Relax

Propósito
=======

Relax es el protocolo principal para el refinamiento simple de todos los átomos de estructuras en el campo de fuerza de Rosetta. 
Relax no hace un refinamiento extenso y solo explora el espacio conformacional local alrededor de la estructura inicial. 
Por eso Relax se suele usar junto con protocolos de muestreo más agresivos, como el ensamblaje de fragmentos (abinitio) y el modelado de loops. 
Para evaluar distintas conformaciones según su puntuación de todos los átomos de Rosetta, normalmente hay que aplicar relax.

También puede leer modelos centroid; en ese caso convertirá el modelo en un modelo de todos los átomos y empaquetará las cadenas laterales. Relax no lleva a cabo ningún refinamiento extenso y solo explora la vecindad del espacio conformacional local.

Además, es aconsejable aplicar relax solo a estructuras previamente idealizadas. La idealización evita que las diferencias de puntuación surjan por una geometría no ideal (p. ej., en la posición de antiguas rupturas de cadena introducidas durante una etapa de muestreo agresivo y eliminadas con el cierre de loops).

Referencias
==========

Nivón LG, Moretti R, Baker D (2013) A Pareto-Optimal Refinement Method for Protein Design Scaffolds. PLoS ONE 8(4): e59004. [Artículo](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0059004)

P. Conway*, M. Tyka*, F. DiMaio*, D. Konerding and D. Baker (2013). Relaxation of backbone bond geometry improves protein energy landscape modeling.  Protein Science


Firas Khatib,Seth Cooper,Michael D. Tyka,Kefan Xu, Ilya Makedon,Zoran Popović,David Baker, and Foldit Players (2011). Algorithm discovery by protein folding game players PNAS 2011 108 (47) 18949-18953;

Tyka MD, Keedy DA, Andre I, Dimaio F, Song Y, et al. (2011) Alternate
states of proteins revealed by detailed energy landscape mapping.
Journal of molecular biology 405: 607–618.


Entrada
=====

Relax toma como entrada una o más estructuras en formato silent o PDB. Se aplican todas las opciones de JD2 (consulta la documentación de JD2 para más detalles)

Salida de FoldTree
===============

Relax genera como salida una o más estructuras en formato silent o PDB. Se aplican todas las opciones de salida de JD2 (consulta la documentación de JD2 para más detalles). Como siempre, -nstruct regula el número de salidas por estructura de entrada.

Opciones de línea de comandos
====================

**Comando de ejemplo**

```
relax.linuxgccrelease -database /path/to/rosetta/main/database -in:file:s input.pdb -in:file:fullatom -native 1a19.pdb -out:file:silent default.out -relax:quick
```

Relax acepta todas las opciones generales de E/S de archivos comunes a todas las aplicaciones de Rosetta escritas con JD2 (consulta la documentación de JD2 para más detalles):

```
   -database                 Path to rosetta databases
   -in:file:s                Input pdb file(s)
   -in:file:silent           Input silent file
   -in:file:fullatom         Read as fullatom input structure
   -score:weights            Supply a different weights file from the Rosetta default
   -score:patch              Supply a different patch file from the Rosetta default
   -run:shuffle              Use shuffle mode, treat structures in random order
   -nstruct                  Make how many decoys per input structure ?
```

Opciones específicas de relax

```
   Simple Options:
   -relax:quick              Do a simple, small cycle number (5)  fast relax (DEFAULT)
   -relax:fast               Synonym for -relax:quick
   -relax:thorough           Do a preset, large cycle number (15) fast relax

   Advanced Options:
   -relax:script <file>      Do custom script relax (you can supply a custom script file or a filename from database)
     -relax:jump_move false    Set all jumps to unmovable during minimization. 
     -relax:bb_move false      Set all backbone torsion angles to unmovable during minimization. 
     -relax:chi_move false     Set all chi torsion angles to unmovable during minimization. 
     -in:file:movemap          Read in custom move map (see **, can be used to specifically define which jumps, bb and chi torsion angles are movable and which ones are not. By default, all are movable. Definitions in the custom movemap override the more general jump_move, bb_move and chi_move commands above. ) If the BB is set to move in the middle of a chain, one may want to add the 'chainbreak' term at a value of 100 to the scorefunction weight set used - or relax may break the backbone.
     -relax:respect_resfile    Respect and use the resfile specified with the general option, -packing:resfile, during the packing step.  Added to allow design during the FastRelax protocol.  Does not work with relax:coord_constrain_sidechains.

   Constraints: If you want constraints on for the entire relax run, set ramp_constraints to false (below) along with the other constraint flags. Constraints can be provided using either the cst_fa_file or cst_file options. If both options are used, priority will be given to the cst_fa_file constraints. Default weights for the constraints are 0. Built in options include backbone coordinate constraints, sidechain coordinate constraints and sidechain pairwise constraints. 
   -constraints:cst_fa_file  <filename>      Add constraints from the fullatom constraint file(*)
     -constraints:cst_fa_weight <weight>       Weight to be used for the constraints in the cst_fa_file.
     -constraints:cst_file  <filename>         Add constraints from the constraint file(*)
     -constraints:cst_weight   <weight>        Weight to be used for the constraints in the cst_file.
   -relax:constrain_relax_to_start_coords    Add coordinate constraints to backbone heavy atoms, based on the input structure.
   -relax:constrain_relax_to_native_coords   Add coordinate constraints to backbone heavy atoms, based on the structure passed to -in:file:native.
   -relax:coord_constrain_sidechains         Also add coordinate constraints to sidechain heavy atoms (requires one of previous two options)
   -relax:coord_cst_stdev    <stdev>         Set the strength of coordinate constraints (smaller=tighter)
   -relax:coord_cst_width    <width>         If set, use flat-bottomed constraints instead of harmonic constraints, with a bottom width of <width>
   -relax:sc_cst_maxdist   <dist>            Add pairwise atom constraints to sidechain atoms up to dist apart from one another.
   -relax:ramp_constraints   false           When explicitly set to false, do not ramp down constraints (does not affect ramping in custom scripts). When true, constraints are ramped down during each simulated annealing cycle.
   -relax:dualspace true                     Use the Dualspace protocol for dihedral and cartesian minimization as described by Conway et al. Do 3 FastRelax cycles of internal coordinate relax followed by two cycles of Cartesian relax - cart_bonded energy term is required, pro_close energy term should be turned off, and use of -relax::minimize_bond_angles is recommended.  The -nonideal flag can be used for this.

   Deprecated Modes (don't use):
   -relax:classic            Do an old old deprecated "classic" relax mode (slow and poor performance)
```

(\*) Consulta el [[formato de archivo de restricciones|constraint-file]]

(\*\*) Consulta el [[formato de archivo Movemap|movemap-file]]

Ejemplo
=======

El ejemplo anterior con archivos de entrada se encuentra en demo/relax/. Basta con ejecutar el script run.sh.

Resultados
=======

Relax devuelve estructuras relajadas de todos los átomos. Relax es un protocolo de propósito general y se usa en muchas aplicaciones distintas en las que se necesitan estructuras de todos los átomos al final. En la mayoría de los casos, relax es el último paso de un protocolo más amplio y al usuario le interesan las estructuras de menor energía.

Descripción del algoritmo
========================

En prácticamente todas las situaciones debería bastar con usar -relax:quick o -relax:thorough y no preocuparse por el resto de las opciones.

Los modos fast relax funcionan ejecutando muchos ciclos de reempaquetado de cadenas laterales y minimización, aumentando y reduciendo gradualmente el peso repulsivo del campo de fuerza. Esto «pulsa» la estructura en fases sucesivas de colapso y expansión que «agitan» los átomos hasta un estado de baja energía. No se hace ningún movimiento explícito (se comprobó que no era útil, porque la mayoría de los movimientos se rechazan y no ayudan a reducir la energía). Ten en cuenta que, pese a ello, la estructura puede cambiar hasta 2-3 A respecto a la conformación inicial durante los ciclos de minimización.

El principio básico del protocolo relax es intercalar el empaquetado de cadenas laterales con una minimización basada en gradiente de los grados de libertad de torsión.
Un ciclo típico de relax consta de 4 rondas de reempaquetado seguidas de minimización basada en gradiente en el espacio de torsiones. 
La contribución repulsiva a la energía total se escala al 2 %, 25 %, 55 % y 100 % en la 1.ª, 2.ª, 3.ª y última ronda, respectivamente. Relax se puede ejecutar con un número distinto de ciclos (por defecto es 5) y, de todos los ciclos realizados, se selecciona el Pose de mejor puntuación.

FastRelax es una versión más moderna del algoritmo fast relax inicial, más flexible, que permite definir un script específico de eventos de relax (cómo se intercalan exactamente los ciclos de reempaquetado y minimización y qué parámetros deben tomar). Esto se define en un archivo de script. Un ejemplo de archivo de script tiene este aspecto:

```
repeat 5
ramp_repack_min 0.02  0.01
ramp_repack_min 0.250 0.01
ramp_repack_min 0.550 0.01
ramp_repack_min 1     0.00001
accept_to_best
endrepeat
```

La cadena de comandos anterior haría 5 repeticiones de un perfil de aumento gradual de 0.02, 0.25, 0.550 y 1.0 del peso repulsivo. En cada paso, a un reempaquetado le sigue una minimización con una tolerancia de 0.01, 0.01, 0.01 y 0.00001 respectivamente. En conjunto, el peso pulsaría en este orden: 0.02, 0.25, 0.550, 1.0, 0.02, 0.25, 0.550, 1.0, 0.02, 0.25, 0.550, 1.0, 0.02, 0.25, 0.550, 1.0... Al final se devuelve la estructura de menor energía encontrada con el peso completo.

El script anterior fue el predeterminado hasta el 13 de agosto de 2019,
cuando pasó a ser este:

```
repeat 5
coord_cst_weight 1.0
scale:fa_rep 0.040
repack
scale:fa_rep 0.051
min 0.01
coord_cst_weight 0.5
scale:fa_rep 0.265
repack
scale:fa_rep 0.280
min 0.01
coord_cst_weight 0.0
scale:fa_rep 0.559
repack
scale:fa_rep 0.581
min 0.01
coord_cst_weight 0.0
scale:fa_rep 1
repack
min 0.00001
accept_to_best
endrepeat
```

NOTA: ¡Prácticamente nunca debería hacer falta tocar el script ni los parámetros preestablecidos! ¡No los toques salvo que sepas lo que haces!

Puedes ejecutar scripts de relax distintos del predeterminado con la opción `-relax:script`:

```sh
relax.linuxgccrelease -relax:script ./my_relax_script # local file

relax.linuxgccrelease -relax:script KillA2019 # database file (see below)
```

Descripción del formato de script de Relax:
================================

Los comandos válidos incluyen:

```
repeat <loopcount>
```

inicia una sección que se repite \<loopcount\> veces; termina el bloque con «endrepeat». Los bucles anidados NO están admitidos.

```
endrepeat
```

es el marcador de fin de un bucle. ¡Los bucles *NO* se pueden anidar! (esto no es un lenguaje de programación. Bueno, lo es. Pero uno muy simple.)

```
accept_to_best
```

compara la energía del Pose actual y de best\_pose, y reemplaza el mejor Pose por el Pose actual si su energía es menor.

```
load_best
```

Carga best\_pose en el Pose de trabajo actual, reemplazándolo.

```
load_start
```

Carga el Pose inicial en el Pose de trabajo actual, reemplazándolo.

Establece best\_pose como el Pose actual, sea cual sea la energía del Pose actual.

```
dump <number>
```

Vuelca un archivo pdb llamado dump\_\<number\>.pdb

```
scale:<scoretype> <scale>
```

Escala el valor predeterminado del tipo de puntuación por el número de escala indicado. Por ejemplo, scale:fa\_rep 0.1 tomará el peso original de fa\_rep y lo fijará en 0.1 \* el peso original.

```
weight:<scoretype> <weight>
```

Fija el peso del tipo de puntuación en el número de peso indicado. TAMBIÉN CAMBIA EL PESO PREDETERMINADO. Así, en las rutinas weight, scale, scale la escala usará el peso definido por el usuario, lo que parece tener más sentido. Por ejemplo, weight:fa\_rep 0.2 fijará fa\_rep en 0.2

```
show_weights
```

Muestra los pesos actuales. Si un parámetro no aparece en la salida, su peso es 0. Resulta de máxima utilidad al redirigir stdout a un archivo y con una sola estructura de entrada.

```
coord_cst_weight <scale>
```

Fija el peso de coordinate\_constraint en \<scale\>\*start\_weight. Se usa al emplear las opciones de línea de comandos -constrain\_relax\_to\_native\_coords y -constrain\_relax\_to\_start\_coords.

```
repack
```

Activa un reempaquetado completo

```
min <tolerance>
```

Activa una minimización dfp con una tolerancia dada (0.001 es un valor razonable)

```
ramp_repack_min <scale:fa_rep> <min_tolerance> [ <coord_cst_weight = 0.0> ]
```

Provoca un ciclo típico de aumento gradual, luego reempaquetado y luego minimización; es decir, básicamente combina los tres comandos scale:fa\_rep, repack y min (y posiblemente coord\_cst\_weight)

Estos dos scripts son equivalentes:

```
scale:fa_rep 0.5
repack
min 0.001
```

y

```
ramp_repack_min 0.5 0.001
```

```
batch_shave <keep_proportion>
```

Válido solo para batchrelax; se ignora en FastRelax normal. En Batchrelax eliminará las peores estructuras del conjunto actual y dejará solo \<keep\_proportion\>. Es decir, el comando

```
batch_shave 0.75
```

Eliminará el 75 % peor de las estructuras del conjunto de trabajo actual.

```
exit
```

terminará con efecto inmediato

Un script típico de FastRelax es:

```
repeat 5
ramp_repack_min 0.02  0.01     1.0
ramp_repack_min 0.250 0.01     0.5
ramp_repack_min 0.550 0.01     0.0
ramp_repack_min 1     0.00001  0.0
accept_to_best
endrepeat
```

Scripts de Relax en la base de datos de Rosetta
===================================

Para ver una lista de scripts de relax en la base de datos,
[haz clic aquí](https://www.rosettacommons.org/docs/latest/scripting_documentation/RosettaScripts/Movers/movers_pages/RelaxScript).


Notas especiales sobre BatchRelax
===========================

-   BatchRelax trata la opción -l (lista de PDBs de entrada) de forma distinta a la mayoría de las aplicaciones de Rosetta. En lugar de procesar cada entrada de -l de forma secuencial, todas se agrupan en un único lote grande. Esto tiene la ventaja de que BatchRelax puede recortar el conjunto sin importar el origen del PDB de entrada, pero la desventaja de que -l ya no está disponible para entrada secuencial. Si todos los PDB de entrada de -l no coinciden en secuencia o longitud, obtendrás fallos extraños en PackRotamersMover por PackerTasks no válidos.

Solo para desarrolladores:
====================

Para el desarrollo y la optimización también están presentes estas opciones. Se proporcionan tal cual, sin garantía de funcionalidad ni de propósito. Úsalas con cuidado.

```
  Options specific to the fast relax mode (normally you don't need to meddle with these!)

   -relax:script                Script file
   -relax:script_max_accept     Limit number of best accepts, default = 10000000
```

##Véase también

* [[Preparing structures]]: Página sobre la preparación de estructuras para usarlas en Rosetta con relax.
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura
* [[Design applications]]: Lista de otras aplicaciones que se pueden usar para diseño.
* [[FastRelaxMover]]: Uso de relax con RosettaScripts
* [[FastDesignMover]]: Uso de relax (con opciones de diseño adicionales) con RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
