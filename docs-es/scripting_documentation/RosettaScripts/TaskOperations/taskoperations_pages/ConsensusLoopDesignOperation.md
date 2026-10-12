# ConsensusLoopDesign
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ConsensusLoopDesign

ConsensusLoopDesign restringe las identidades de aminoácidos en los loops según los intervalos de torsión ABEGO de los residuos del loop y los perfiles de secuencia comunes de proteínas nativas para loops con los mismos intervalos ABEGO. 

Para cada loop del Pose, se consulta una base de datos usando el espacio de torsión del loop (en intervalos ABEGO) y los elementos de estructura secundaria que une. Para cada loop específico (por ejemplo, un loop de tipo ABEGO "GG" que une dos hebras), la base de datos contiene las frecuencias nativas de los 20 aminoácidos canónicos en cada posición del loop. Estas frecuencias se convierten en valores de enriquecimiento mediante Enrichment(SS, ABEGO, X) = log(Freq_thisloop(SS, ABEGO, X))/log(Freq_allloops(X)), donde Freq_thisloop es la frecuencia con que el aminoácido aparece en la posición, Freq_allloops es la frecuencia con que el aminoácido aparece en todos los loops, X es el número de residuo del loop, SS es la estructura secundaria de los dos elementos que une el loop y ABEGO es el espacio de torsión del loop. Por tanto, un mayor enriquecimiento indica un sesgo del espacio de torsión hacia un aminoácido concreto. Un enriquecimiento <0 indica que un aminoácido concreto se encuentra con menos frecuencia en este loop que en otros. La TaskOperation funciona desactivando todos los aminoácidos con un enriquecimiento por debajo de cierto umbral (es decir, aquellos aminoácidos contra los que existe algún sesgo nativo).

    <ConsensusLoopDesign name="disallow_nonnative_loop_sequences"
                         residue_selector="(&string, '')"
                         include_adjacent_residues="(&bool, false)"
                         enrichment_threshold="(&real, 0.0)"
                         secstruct="(&string, '')"
                         blueprint="(&string, '')"
                         use_dssp="(&bool, true)" />

**residue_selector** - Por defecto, ConsensusLoopDesign trabaja en todos los residuos que DSSP considera "loops" en el Pose. Si se establece, se usa un selector de residuos para elegir las regiones de la proteína en las que se desactivarán residuos. El selector se puede usar para elegir uno o dos loops del Pose en lugar de todos. Ten en cuenta que los residuos que flanquean las regiones de loop también se restringen según los perfiles de secuencia. Por defecto, esta TaskOperation trabaja en todos los loops del Pose.

**include_adjacent_residues** - Si es verdadero, los aminoácidos permitidos en las posiciones que no son de loop y que cada loop une también se restringirán según sus frecuencias en estructuras nativas. Por ejemplo, algunos loops que siguen a hélices prefieren fuertemente la prolina como última posición de la hélice.

**threshold** - Si el valor de enriquecimiento de un aminoácido en una posición concreta está por debajo de este número, se desactivará. 0.5 es más estricto que 0.0.

**secstruct** - Permite al usuario forzar una estructura secundaria concreta sobre el Pose. Si se establece, se ignora use_dssp. La longitud de la estructura secundaria debe coincidir con la longitud del Pose.

**use_dssp** - Si es verdadero, se usará DSSP para determinar qué residuos son loops. Si es falso, se usará la estructura secundaria almacenada en el Pose para determinar los loops. No tiene efecto si se establece la opción "secstruct".

**blueprint** - Si se da el nombre de un archivo blueprint, se leerá el blueprint y su estructura secundaria se usará para establecer la opción "secstruct".


**Ejemplo** Este ejemplo ejecuta fast design con secuencias consenso de loops para un loop (residuos 7-9).

```xml
    <RESIDUE_SELECTORS>
        <Index name="loop1" resnums="7-9" />
    </RESIDUE_SELECTORS>
    <TASKOPERATIONS>
        <ConsensusLoopDesign name="disallow_nonnative_loop_sequences" residue_selector="loop1" />
    </TASKOPERATIONS>
    <MOVERS>
        <FastDesign name="design" task_operations="disallow_nonnative_loop_sequences" />
    </MOVERS>
```

## Salvedades

Ten en cuenta que esta TaskOperation está pensada solo para diseño canónico. No desactivará correctamente los residuos no canónicos (si se han activado con otras TaskOperations), y DSSP tampoco funcionará bien con tipos de estructura secundaria no canónicos (_p. ej._ las hélices levógiras formadas por D-aminoácidos).

##Véase también

* [[Modelado de loops|loopmodel]]: una aplicación para modelar loops
* [[LoopModelerMover]]: un mover de modelado de loops
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
