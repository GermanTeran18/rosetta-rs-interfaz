# MoveMapFactories (RosettaScripts)

[[Volver a RosettaScripts|RosettaScripts]]

El packer se puede controlar con TaskOperations; el equivalente para el minimizador es la MoveMapFactory. Una MoveMapFactory crea un MoveMap a medida para un Pose de entrada; con ResidueSelectors puedes decir "quiero permitir que se muevan las cadenas laterales de la cadena B que estén a menos de 10 A de residuos de la cadena A". La mayor diferencia entre las MoveMapFactories (que construyes explícitamente) y las TaskFactories (que se construyen entre bastidores a partir de una lista de TaskOperations) es que el orden en que se realizan las operaciones del MoveMap importa. Si en tu primera operación dices "activa todos los DOF de cadena lateral" y en tu segunda operación dices "desactiva los DOF de cadena lateral de los residuos 10-20", tendrás un MoveMap que permite todos los DOF de cadena lateral excepto los de los residuos 10-20; si, por el contrario, inviertes el orden de esas dos operaciones, tendrás un MoveMap que permite todos los DOF de cadena lateral: el comando "activar todo" sobrescribirá las instrucciones específicas anteriores para los residuos 10-20. Cuando construyes una MoveMapFactory en RosettaScripts, enumeras una serie de operaciones para varios DOF. Las operaciones se realizarán en el orden en que las enumeres.

[[_TOC_]]


### Ejemplo
    ...
    <RESIDUE_SELECTORS>
        <CDR name="L1" cdrs="L1"/>
    </RESIDUE_SELECTORS>
    <MOVE_MAP_FACTORIES>
        <MoveMapFactory name="movemap_L1" bb="0" chi="0">
            <Backbone residue_selector="L1" />
            <Chi residue_selector="L1" />
        </MoveMapFactory>
    </MOVE_MAP_FACTORIES>

    ...
    <MOVERS>
      <FastRelaxMover name=relax_l1 movemap_factory=movemap_L1 task_operations=.../>
    </MOVERS>
    ...

### Atributos de MoveMapFactory
El MoveMap creado por una MoveMapFactory empieza sin ningún DOF activado. Si quieres activar todos los DOF de un tipo concreto, puedes hacerlo con los siguientes atributos. Estos atributos se procesan antes que las operaciones de las subetiquetas.

-   bb (bool) Activa o desactiva el movimiento de todas las torsiones de la cadena principal
-   chi (bool) "Activa o desactiva el movimiento de todas las torsiones chi
-   nu (bool) "Activa o desactiva el movimiento de todas las torsiones nu
-   branches (bool) "Activa o desactiva el movimiento de todas las torsiones de ramas
-   jumps (bool) "Activa o desactiva el movimiento de todos los DOF de jumps
-   cartesian (bool) Fija la MoveMapFactory para anulaciones cartesianas específicas.  Actualmente solo se usa para glicanos, con el fin de mantener la nomenclatura IUPAC durante los movimientos


### Operaciones

Las operaciones se realizan después de procesar los atributos de la etiqueta MoveMapFactory. Las operaciones se realizan en el orden en que se enumeran. Los distintos tipos de operaciones se pueden enumerar en cualquier orden (presumiblemente, en el orden en que quieres que se realicen). Además, cada tipo de operación se puede enumerar varias veces.

#### Backbone
    <Backbone enable=(&bool true) residue_selector=(&string) bb_tor_index=(&int)/>

Activa (u opcionalmente desactiva) las torsiones de la cadena principal de los residuos identificados por un selector de residuos dado. Si se da bb_tor_index, solo se activa una torsión concreta de los residuos seleccionados. Por ejemplo, para residuos de aminoácido, phi es 1, psi es 2 y omega es 3.

#### Chi

    <Chi enable=(&bool true) residue_selector=(&string)/>

Activa (u opcionalmente desactiva) las torsiones de la cadena lateral de los residuos identificados por un selector de residuos dado.

#### Nu

    <Nu enable=(&bool true) residue_selector=(&string)/>

Activa (u opcionalmente desactiva) las torsiones "nu" de los residuos de carbohidratos identificados por un selector de residuos dado.


#### Branches

    <Branches enable=(&bool true) residue_selector=(&string)/>

Activa (u opcionalmente desactiva) las torsiones de "rama" de los residuos de carbohidratos identificados por un selector de residuos dado.


#### Jumps

    <Jumps enable=(&bool true) jump_selector=(&string)/>

Activa (u opcionalmente desactiva) los Jumps identificados por un selector de jumps dado.


Véase también
========

* [[RosettaScripts]]: la página principal de RosettaScripts
* [[TaskOperations recomendadas para diseño|Recommended_Design_TaskOperations]]
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[Movers de RosettaScripts|Movers-RosettaScripts]]
* [[Filtros de RosettaScripts|Filters-RosettaScripts]]
* [[I want to do x]]: guía para hacer perturbaciones estructurales específicas con RosettaScripts
* [[Scripting Documentation]]: la página principal de la documentación de scripting
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Glossary]]
* [[RosettaEncyclopedia]]
