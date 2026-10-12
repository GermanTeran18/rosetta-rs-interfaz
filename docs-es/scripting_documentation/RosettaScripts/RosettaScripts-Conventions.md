#Convenciones de RosettaScripts

*Nota: Esta página no es una lista completa de todas las convenciones de RosettaScripts*

Resumen
--------

RosettaScripts se está convirtiendo en una herramienta importante en la comunidad de Rosetta, y la mayoría de los movers y filtros de Rosetta ya existen en forma de módulo analizable por RosettaScripts. La ausencia de un archivo XML estándar de RosettaScripts creó una situación en la que cada módulo (mover o filtro) realizaba funciones idénticas de formas distintas. Este documento se diseñó para corregir ese problema: una forma estándar permitirá que otras aplicaciones (pyRosetta, RosettaDiagrams) trabajen con RosettaScripts de manera mucho más elegante y hará mucho más fácil incluso escribirlo directamente en el código.

Convenciones
-----------

### Índices de residuo

Internamente, Rosetta asigna a cada residuo o ligando de una estructura un índice único, que empieza en 1.  La mayoría de los movers y filtros permiten al usuario especificar índices de residuo con la numeración de Rosetta.  Además, muchos permiten especificar índices de residuo con la numeración PDB (un índice y una letra de cadena, <i>p. ej.</i> ```47C```), aunque esto debe usarse con cuidado, ya que presupone, primero, que la estructura de entrada procede de un archivo PDB y, segundo, que la numeración no ha cambiado a lo largo del protocolo.<br/><br/>
Recientemente se ha añadido una nueva función experimental que permite al usuario especificar índices de residuo a partir de algún estado de referencia de un Pose.  Por ejemplo, supongamos que vamos a importar una estructura, insertar un número desconocido de residuos en un loop alrededor de la posición 35 y luego mutar un residuo que antes estaba en la posición 50, pero que ahora podría tener cualquiera de un rango de índices.  Antes de insertar los residuos, se puede guardar en el Pose una "instantánea" o Pose de referencia con el **mover [[StorePoseSnapshot|StorePoseSnapshotMover]]**, y tras insertar los residuos, el usuario puede decir: "quiero mutar el residuo que antes era el residuo 50".  La sintaxis para esto es ```refpose(<refpose_name>,<index_in_refpose>)```.  Además, se pueden especificar posiciones relativas.  Por ejemplo, un usuario podría decir: "quiero mutar el residuo que está dos residuos antes del que era el residuo 50".  La sintaxis para esto es ```refpose(<refpose_name>,<index_in_refpose>)±<offset>```.<br/><br/>
Actualmente, solo el mover **[[MutateResidue|MutateResidueMover]]** y el filtro **[[HbondsToResidue|HbondsToResidueFilter]]** se han modificado para aprovechar esta nueva función.  Sin embargo, los movers se pueden modificar muy fácilmente para respetar los Poses de referencia.  Consulta [[esta nota de la documentación para desarrolladores|A note on parsing residue selections in movers and filters]] para ver cómo hacerlo.

### Funciones de puntuación

Todos los atributos de función de puntuación deben empezar por *scorefxn*. Si se usan 2 funciones de puntuación (por ejemplo, de baja y alta resolución), debe añadirse un guion bajo: *scorefxn\_low*, *scorefxn\_high*.

### Task Operations

Un atributo de task operations debe llamarse *task\_operations* y contendrá una lista de todas las task operations separadas por comas (sin espacios).

### Movers / filtros contenidos

Hay varias formas de incluir otros módulos en tu propio módulo:

#### Un mover / filtro

Usa el atributo *mover\_name* o *filter\_name* dentro de la etiqueta de tu protocolo.

#### Varios movers / filtros

Usa las etiquetas \<Add mover\_name=.../\> o \<Add filter\_name=.../\>. Por ejemplo:

    <Your_Mover some_attr="...">
        <Add mover_name="looper"/>
        <Add filter_name="minimizer"/>
    </Your_Mover>

#### Operaciones lógicas

Evita usar operaciones lógicas dentro de tu etiqueta, ya que solo sobrecargará el esquema. Si quieres habilitar operaciones lógicas que contengan filtros, usa el filtro CompoundStatement. Por ejemplo, el siguiente código:

    <SomeMover ... >
        <AND filter_name="filter1"/>
        <AND filter_name="filter2"/>
    </SomeMover>

Debería ser:

    <CompoundStatement name="compoundFilter" .. >
        <AND filter_name="filter2"/>
        <AND filter_name="filter1"/>
    </CompoundStatement>
    <SomeMover ... filter_name="compoundFilter"/>

O

    <CompoundStatement name="compoundFilter" .. >
        <AND filter_name="filter2"/>
        <AND filter_name="filter1"/>
    </CompoundStatement>
    <SomeMover ... >
        <Add filter_name="compoundFilter"/>
    </SomeMover>

##Véase también

* [[RosettaScripts]]: La página principal de RosettaScripts
* [[Movers de RosettaScripts|Movers-RosettaScripts]]
* [[Filtros de RosettaScripts|Filters-RosettaScripts]]
* [[TaskOperations de RosettaScripts|TaskOperations-RosettaScripts]]
* [[I want to do x]]: Guía para realizar perturbaciones estructurales concretas con RosettaScripts
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
