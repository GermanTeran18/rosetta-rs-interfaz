<!-- --- title: JumpSelectors -->

*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*

# JumpSelectors
----------------

Los JumpSelectors seleccionan un subconjunto de Jumps del FoldTree de un Pose. Su método apply() toma un Pose y devuelve un JumpSubset (un utility::vector1\< bool \>). Este vector1 tendrá tantos elementos como jumps hay en el Pose de entrada, y su i-ésima entrada será "true" si se ha seleccionado el jump i. 

La forma más habitual de usar un JumpSelector es con una [[MoveMapFactory |MoveMapFactories-RosettaScripts]], con la que puedes construir un MoveMap que permita minimizar algunos jumps mientras mantiene fijos otros jumps. También se pueden usar para seleccionar residuos, p. ej., con JumpDownstreamSelector o JumpUpstreamSelector (próximamente).

Los JumpSelectors se pueden declarar en su propio bloque, fuera del bloque de TaskOperation. Por ejemplo:
```xml
    <JUMP_SELECTORS>
        <JumpIndex name="jump1" jump="1"/>
        <Interchain name="interchain"/>
    </JUMP_SELECTORS>
```
Algunos JumpSelectors pueden anidar otros JumpSelectors en su definición; p. ej.,
```xml
    <JUMP_SELECTORS>
        <Or name="interchain_and_jump1">
           <JumpIndex jump="1"/>
           <Interchain/>
        </Or>
    </JUMP_SELECTORS>
```
En este caso, la estructura documentada del JumpSelector Or se indicará como
```xml
    <Or name=(%string)>
        <(Selector)/>
    </Or>
```
Con la subetiqueta <(Selector)> se indica que se puede anidar dentro de ella cualquier JumpSelector,
incluido un selector Or (si así lo quisieras).


[[_TOC_]]

### JumpSelectors lógicos

#### NotJumpSelector

    <Not name="(&string)" selector="(&string)">

o

    <Not name="(&string)">
        <(Selector) .../>
    </Not>

-   El NotJumpSelector requiere exactamente un selector.
-   El NotJumpSelector invierte el estado booleano que devuelve la función apply del selector que contiene.
-   Si se da la opción "selector", se recuperará del DataMap un JumpSelector declarado previamente (en un bloque JUMP\_SELECTORS del archivo XML)
-   Si no se da la opción "selector", se debe declarar una subetiqueta que contenga un JumpSelector anónimo o sin nombre. Este subselector no terminará en el DataMap.  Por ejemplo, es posible anidar un selector Index bajo un selector Not para decir "dame todos los jumps excepto el Jump 2"
    ```xml
    <Not name="all_but_jump2">
       <JumpIndex jump="2"/>
    </Not>
    ```
Cualquier JumpSelector se puede definir como subetiqueta del selector Not.  Sin embargo, no puedes pasar el subselector por su nombre salvo mediante la opción "selector".

#### AndJumpSelector

    <And name="(&string)" selectors="(&string)">
       <(Selector1)/>
       <(Selector2)/>
        ...
    </And>

-   El AndJumpSelector puede recibir un número arbitrario de selectores.
-   El AndJumpSelector aplica un *AND* lógico a los vectores JumpSubset que devuelven las funciones apply de cada uno de los JumpSelectors que contiene.  <b>En la práctica, esto significa que devuelve la <i>intersección</i> de los conjuntos seleccionados: los jumps que están en el conjunto 1 Y en el conjunto 2.</b>  (No lo confundas con el selector "or", que devuelve la unión de los dos conjuntos: los jumps que están en el conjunto 1 O en el conjunto 2.)
-   La opción "selectors" debe ser una cadena de nombres de selectores declarados previamente, separados por comas. Estos selectores se recuperarán del DataMap.
-   La opción "selectors" no es obligatoria, ni tampoco lo son las subetiquetas; pero al menos una de las dos debe darse. Se pueden dar ambas, si se desea.
-   Los selectores declarados en las subetiquetas se añadirán al conjunto de selectores del AndJumpSelector, pero no se añadirán al DataMap.

#### OrJumpSelector

    <Or name="(&string)" selectors="(&string)">
       <(Selector1)/>
       <(Selector2)/>
        ...
    </Or>

-   El OrJumpSelector puede recibir un número arbitrario de selectores.
-   El OrJumpSelector aplica un *OR* lógico a los vectores JumpSubset que devuelven las funciones apply de cada uno de los JumpSelectors que contiene.  <b>En la práctica, esto significa que devuelve la <i>unión</i> de los conjuntos seleccionados: los jumps que están en el conjunto 1 O en el conjunto 2.</b>  (No lo confundas con el selector "and", que devuelve la intersección de los dos conjuntos: los jumps que están en el conjunto 1 Y en el conjunto 2.)
-   La opción "selectors" debe ser una cadena de nombres de selectores declarados previamente, separados por comas. Estos selectores se recuperarán del DataMap.
-   La opción "selectors" no es obligatoria, ni tampoco lo son las subetiquetas; pero al menos una de las dos debe darse. Se pueden dar ambas, si se desea.
-   Los selectores declarados en las subetiquetas se añadirán al conjunto de selectores del OrJumpSelector, pero no se añadirán al DataMap.

### JumpSelectors independientes de la conformación

#### JumpIndex

    <JumpIndex jump="(&int)"/>

-   Solo puede seleccionar un único jump

#### Interchain

    <Interchain/>

-   Este selector selecciona todos los jumps que conectan dos cadenas

#### JumpForResidue

```xml
    <JumpForResidue name="chainb_jump" residue_selector="chainB" allow_multiple_results="true"/>
```

-   JumpForResidue selecciona el jump que construye los residuos que se le pasan
-   `residue_selector`: se seleccionarán los jumps que construyen los residuos seleccionados por este selector de residuos
-   `allow_multiple_results`: si es false, se comprobará que todos los residuos que se pasan los construye el mismo jump


#### ExclusivelySharedJumpSelector

```xml
    <ExclusivelySharedJumpSelector name="name" residue_selector="sele"/>
```

-   ExclusivelySharedJumpSelector selecciona el jump que construye TODOS los residuos que se le pasan, y SOLO esos

Ejemplo:
```xml
<ROSETTASCRIPTS>
  <RESIDUE_SELECTORS>
    <Chain name="sele" chains="1,3"/>
  </RESIDUE_SELECTORS>

  <MOVERS>
    <EnsureExclusivelySharedJumpMover name="ensure_jump" residue_selector="sele"/> 
  </MOVERS>

  <JUMP_SELECTORS>
    <ExclusivelySharedJumpSelector name="js" residue_selector="sele"/>
  </JUMP_SELECTORS>

  <RESIDUE_SELECTORS>
    <JumpDownstream name="downstream" jump_selector="js"/>
  </RESIDUE_SELECTORS>

  <SIMPLE_METRICS>
    <SelectedResiduesPyMOLMetric name="starting_pymol_selection" residue_selector="sele" custom_type="start"/>
    <SelectedResiduesPyMOLMetric name="final_pymol_selection" residue_selector="downstream" custom_type="final"/>
  </SIMPLE_METRICS>

  <PROTOCOLS>
    <Add mover_name="ensure_jump"/>
    <Add metrics="starting_pymol_selection,final_pymol_selection" />
  </PROTOCOLS>
</ROSETTASCRIPTS>
```

####Véase también

* [[MoveMapFactory |MoveMapFactories-RosettaScripts]]

##Véase también

* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Operaciones de tareas | TaskOperations-RosettaScripts]]: otras TaskOperations en RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para hacer perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de maneras personalizables
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
