# LoopCreationMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## LoopCreationMover

(Este es un Mover de desarrollo y no está disponible en las versiones publicadas.)

Para una forma más común y pública de crear loops, usa Remodel. Aquí hay un enlace al tutorial:
https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling#modeling-missing-loops

También existe un `LoopBuilderMover`, cuya documentación puede encontrarse aquí: [[LoopBuilderMover]]

**!!!!ADVERTENCIA!!!!!** Este código está en desarrollo muy activo y puede cambiar

Construye loops para conectar elementos de la estructura de la proteína. El protocolo se divide en dos pasos independientes: la adición de residuos del loop a la Pose, seguida del cierre del loop. Estas tareas las realizan LoopInserter y LoopCloser respectivamente (ambas son subclases de mover).

 **INSERTADORES DE LOOPS (LOOP INSERTERS)**

Los LoopInserters se encargan de construir loops entre los residuos loop\_anchor y loop\_anchor+1

-   LoophashLoopInserter

    ```xml
    <LoophashLoopInserter name=(&string) loop_anchor=(&integer) loop_sizes=(&integer) modify_flanking_regions=(1/0) />
    ```

    -   loop\_anchor: número de residuo inicial del insertador de loops; por ejemplo, con 'loop\_anchor=18', insertará loops entre loop\_anchor (=18) y loop\_anchor+1 (=19). Son posibles varios loop\_anchors, como 'loop\_anchor=18, 35, 67', cuando hay 3 huecos. Los números de residuo se renumerarán automáticamente a medida que se ejecuta el mover.
    -   loop\_sizes: tamaño del loop recién añadido; por ejemplo, con 'loop\_sizes=2,3,4,5', añadirá loops de tamaño 2\~5
    -   max\_torsion\_rms: RMSD de torsión máximo para la comparación entre los segmentos anterior y posterior al loop, entre el antiguo y el nuevo (usa una cantidad generosa para permitir que el lado que no es ancla quede muy abierto, p. ej. 100)
    -   min\_torsion\_rms: RMSD de torsión mínimo para la comparación entre los segmentos anterior y posterior al loop, entre el antiguo y el nuevo
    -   modify\_flanking\_regions: si "modify\_flanking\_regions=1", aplica las torsiones del fragmento de loophash al residuo lh\_fragment\_begin de la Pose (el valor predeterminado es 0, que aplica las torsiones del fragmento de loophash al residuo loop\_anchor()+1 de la Pose).
    -   num\_flanking\_residues\_to\_match: número de residuos antes y después del loop que se va a construir para calcular la compatibilidad geométrica (valor predeterminado=3).
    -   max\_lh\_radius: radio máximo dentro del cual se buscan segmentos de loophash

-   FragmentLoopInserter: intenta encontrar fragmentos individuales cuyos extremos tengan un RMSD bajo respecto de los residuos flanqueantes del loop que se va a construir.

    ```xml
    <FragmentLoopInserter name=(&string) loop_anchor=(&int)/>
    ```

 **CERRADORES DE LOOPS (LOOP CLOSERS)**

Los LoopClosers se encargan de cerrar los loops recién construidos. Son simplemente envoltorios de algoritmos comunes de cierre de loops (es decir, KIC y CCD) integrados en la interfaz de LoopCloser (a fecha de 18/04/2013, se recomienda CCD para esta aplicación).

-   CCDLoopCloser - usa CCD para cerrar el loop recién construido

    ```xml
    <CCDLoopCloser name=(&string) />
    ```

    -   max\_ccd\_moves\_per\_closure\_attempt: máximo de movimientos de ccd por intento de cierre (normalmente basta con max\_ccd\_moves\_per\_closure\_attempt=10000).
    -   max\_closure\_attempts: número máximo de intentos de cierre. Obviamente, un número alto como 100 aumentaría la probabilidad de un cierre exitoso.

 **LOOP CREATION MOVER**

-   LoopCreationMover

    ```xml
    <LoopCreationMover name=(&string) loop_closer=(&LoopCloser name) loop_inserter=(&LoopInserter name) />
    ```

    -   attempts\_per\_anchor: si 'attempts\_per\_anchor=10', intenta cerrar 10 veces por ancla. (se recomienda usarlo, pero attempts\_per\_anchor=0 por defecto)
    -   dump\_pdbs: si "dump\_pdbs=1", guarda pdbs después de cada adición de residuos, de cada refinamiento y del cierre del loop
    -   filter\_by\_lam (filtrar por el loop analyzer mover): si "filter\_by\_lam=1", descarta los loops no deseables según [total\_loop\_score=rama+omega+peptide\_bond+chainbreak (de este loop) \<= lam\_score\_cutoff\_ (= 0 por defecto)]. (se recomienda usarlo, pero filter\_by\_lam=0 por defecto)
    -   include\_neighbors: si "include\_neighbors=1", incluye los vecinos del loop en el empaquetado/rediseño y luego los calcula
    -   loop\_closer: el nombre de un loop\_closer; por ejemplo, con 'loop\_closer=ccd', usa \<CCDLoopCloser name=ccd/\>
    -   loop\_inserter: el nombre de un loop\_inserter; por ejemplo, con 'loop\_inserter =lh', usa \<LoophashLoopInserter name=lh/\>

 *ResourceManager*

Con loop\_sizes=2,3,4,5 en el insertador de loops, los loop\_sizes de ResourceOptions deben ser 8,9,10,11 (ya que LOOP CREATION MOVER usa además 3 residuos (valor predeterminado) hacia delante y 3 residuos hacia atrás para calcular la compatibilidad geométrica).

```xml
<JD2ResourceManagerJobInputter>
        <ResourceOptions>
                <LoopHashLibraryOptions tag="lh_lib_options" loop_sizes="8,9,10,11"/>
        </ResourceOptions>
...
</JD2ResourceManagerJobInputter>
```


##Véase también

* [[RosettaScriptsLoopModeling]]
* [[Aplicación loopmodel|loopmodel]]
* [[Formato de archivo de loops|loops-file]]
* [[Formato de archivo de fragmentos|fragment-file]]
* [[Documentación del Resource Manager|ResourceManager]]
* [[LoopBuilderMover]]
* [[LoopCreationMover]]
* [[LoopFinderMover]]
* [[LoopLengthChangeMover]]
* [[LoopModelerMover]]
* [[LoopMoverFromCommandLineMover]]
* [[LoopProtocolMover]]
* [[LoopRemodelMover]]
