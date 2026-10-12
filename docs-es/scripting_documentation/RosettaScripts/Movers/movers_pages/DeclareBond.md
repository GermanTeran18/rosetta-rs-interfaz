# DeclareBond

Página creada el 28 de marzo de 2017 por Vikram K. Mulligan (vmullig@uw.edu). Última modificación: 18 de julio de 2017.

*Volver a la página de [[Movers|Movers-RosettaScripts]].*

## DeclareBond

Este mover le indica a Rosetta que existe un enlace químico entre dos átomos de dos residuos distintos. Ten en cuenta que esta es una relación _física_, no una relación _cinemática_: la existencia del enlace significa que no se calcularán las interacciones de van der Waals entre los átomos. No significa que mover la Pose no vaya a estirar o distorsionar el enlace; al contrario, como el mover DeclareBond, por defecto, no altera el FoldTree de la Pose, mover la Pose probablemente _sí_ estirará o distorsionará el enlace.

Este mover suele usarse después de añadir geometría con el [[PeptideStubMover]] y antes de cerrar loops con el [[mover GeneralizedKIC|GeneralizedKICMover]].

Si el mover falla con un error "doesn't have connection", es porque necesitas crear una nueva conexión entre residuos para el residuo donde está tu enlace. Puedes hacerlo dándoles a los residuos conectados sus propios [[archivos params|Residue-Params-file]] con una línea CONNECT para cada conexión.

## Todas las opciones

```xml
<DeclareBond res1=(int) res2=(int) atom1=(string) atom2=(string)
     add_termini=(bool,"true") rebuild_fold_tree=(bool,"false")
     run_kic=(bool,"false") KIC_res1=(int,"0") KIC_res2=(int,"0") name=(string)
/>
```

Etiqueta "DeclareBond":

**res1 (int)**:  residuo que contiene el primer átomo que se conectará con un enlace.

**res2 (int)**:  residuo que contiene el segundo átomo que se conectará con un enlace.

**atom1 (string)**:  nombre del primer átomo.

**atom2 (string)**:  nombre del segundo átomo.

**add\_termini (bool,"true")**:  si es true, se añaden tipos terminales a los residuos de la Pose que tengan extremos sin conectar. Ten en cuenta que el mover DeclareBond elimina los tipos terminales antes de añadir un enlace, por lo que a menudo conviene poner esta opción en true para volver a añadirlos. (El mover también puede usarse como una forma rápida y chapucera de añadir extremos a una Pose, declarando un enlace ya existente con **add_termini="true"**.)

**rebuild\_fold\_tree (bool,"false")**:  ¿reconstruir el fold tree después de declarar este enlace? No se recomienda: es mejor reconstruir el FoldTree manualmente con el [[mover AtomTree|AtomTreeMover]].

**run\_kic (bool,"false")**:  ¿ejecutar KIC para cerrar cualquier ruptura de cadena causada por el enlace químico declarado? No se recomienda. El [[mover GeneralizedKIC|GeneralizedKICMover]] ofrece mucho más control sobre el cierre cinemático.

**KIC\_res1 (int,"0")**:  primer residuo que se usará en KIC si se establece **run_KIC="true"**.

**KIC\_res2 (int,"0")**:  segundo residuo que se usará en KIC si se establece **run_KIC="true"**.

**name (string)**:  el nombre dado a esta instancia.

## Uso típico

Normalmente, basta con declarar el primer y el último átomo. Por ejemplo, para declarar un enlace peptídico entre los residuos 16 y 17, se usaría la siguiente sintaxis:

```xml
<DeclareBond name="connect_16_to_17" res1="16" res2="17" atom1="C" atom2="N" />
```

## Véase también

* [[I want to do x]]: guía para elegir un mover
* [[GeneralizedKIC|GeneralizedKICMover]]
* [[PeptideStubMover]]