#MultistageRosettaScripts

#Ejemplo de sobrecarga del DataMap

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

- Escrito por Jack Maguire; envía tus preguntas a jackmaguire1444@gmail.com
- Toda la información de aquí es válida a fecha del 13 de febrero de 2018

Este script es artificial y sirve para mostrar cómo sobrecargar la [[información del DataMap|XML#DataMap Info]].

Hay dos cosas principales que conviene notar:

1. Cada estructura de entrada tiene un resfile distinto. Esto no es un problema porque todos usan el mismo nombre «rrf».
Cuando se analiza la etiqueta `FastRelax`, se usará la operación de tarea «rrf» que corresponda al trabajo en ejecución.

2. El tercer trabajo usa en realidad un protocolo FastRelax completamente distinto.
El diseño está habilitado y se elimina la operación de tarea ExtraRotamersGeneric «ex1ex2».
Cuando se ejecuten los stages, se usará el mover que se llame «relax» para ese trabajo concreto.

Siempre que un elemento tenga el mismo nombre que un elemento declarado antes, se ignora el nuevo.
En la primera etiqueta Job, solo hay un Mover llamado «relax».
Sin embargo, la tercera etiqueta Job tiene dos Movers llamados «relax» (uno en el bloque Job y otro en el bloque Common).

```xml
<JobDefinitionFile>
    <Job>
        <RESIDUE_SELECTORS>
            <ReadResfile name="rrf" filename="resfile1"/>
        </RESIDUE_SELECTORS>
        <Input>
            <PDB filename="../S1.pdb"/>
        </Input>
    </Job>

    <Job>
        <RESIDUE_SELECTORS>
            <ReadResfile name="rrf" filename="resfile2"/>
        </RESIDUE_SELECTORS>
        <Input>
            <PDB filename="../S2.pdb"/>
        </Input>
    </Job>

    <Job>
        <RESIDUE_SELECTORS>
            <ReadResfile name="rrf" filename="resfile3"/>
        </RESIDUE_SELECTORS>
        <MOVERS>
            <FastDesign disable_design="false" name="relax" repeats="1" scorefxn="common_sfxn" task_operations="ifc,ic,rrf"/>
        </MOVERS>
        <Input>
            <PDB filename="../S3.pdb"/>
        </Input>
    </Job>

    <Common>

        <SCOREFXNS>
            <ScoreFunction name="common_sfxn" weights="beta_nov16_cart.wts"/>
        </SCOREFXNS>

        <TASKOPERATIONS>
            <InitializeFromCommandline name="ifc"/>
            <IncludeCurrent name="ic"/>
            <ExtraRotamersGeneric ex1="true" ex2="true" name="ex1ex2"/>
        </TASKOPERATIONS>

        <FILTERS>
            <ScoreType name="beta16_filter" score_type="total_score" scorefxn="common_sfxn" threshold="999999"/>
        </FILTERS>

        <MOVERS>
            <FastRelax disable_design="true" name="relax" repeats="1" scorefxn="common_sfxn" task_operations="ifc,ic,ex1ex2,rrf"/>
        </MOVERS>

        <PROTOCOLS>
            <Stage num_runs_per_input_struct="10" total_num_results_to_keep="3">
                <Add mover_name="relax"/>
                <Sort filter_name="beta16_filter"/>
            </Stage>

            <Stage num_runs_per_input_struct="10" total_num_results_to_keep="2">
                <Add mover_name="relax"/>
                <Sort filter_name="beta16_filter"/>
            </Stage>

            <Stage num_runs_per_input_struct="10" total_num_results_to_keep="1">
                <Add mover_name="relax"/>
                <Sort filter_name="beta16_filter"/>
            </Stage>

        </PROTOCOLS>

    </Common>

</JobDefinitionFile>
```
