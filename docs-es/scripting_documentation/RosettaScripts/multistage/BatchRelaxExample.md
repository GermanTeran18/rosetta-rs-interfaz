#MultistageRosettaScripts

#Ejemplo de relax por lotes

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

- Escrito por Jack Maguire; envía tus preguntas a jackmaguire1444@gmail.com
- Toda la información de aquí es válida a fecha del 13 de febrero de 2018
(Espero acordarme de actualizar esta página con más información cuando se publique este experimento).

Este script se usó para relajar 30,000 resultados de [[abinitio|abinitio]].
Los 30,000 structures pasaron por una repetición de [[FastRelax|FastRelaxMover]].
Los 7,500 mejores resultados (25%) sobrevivieron y pasaron por la segunda repetición.
Después, los 1,875 mejores resultados (25%) pasaron por las 2 repeticiones finales.
Esto fue aproximadamente 3 veces más rápido que pasar los 30,000 por las 4 repeticiones con RosettaScripts tradicionales

```xml
<JobDefinitionFile>
    <Job>
        <Input>
            <PDB listfile="my_pdblist"/>
        </Input>
    </Job>

    <Common>

        <SCOREFXNS>
            <ScoreFunction name="common_sfxn" weights="ref2015.wts"/>
        </SCOREFXNS>

        <TASKOPERATIONS>
            <InitializeFromCommandline name="ifc"/>
            <IncludeCurrent name="ic"/>
            <ExtraRotamersGeneric ex1="true" ex2="true" name="ex1ex2"/>
        </TASKOPERATIONS>

        <FILTERS>
            <ScoreType name="sfxn_filter" score_type="total_score" scorefxn="common_sfxn" threshold="999999"/>
        </FILTERS>

        <MOVERS>
            <FastRelax disable_design="true" name="relax_1" repeats="1" scorefxn="common_sfxn" task_operations="ifc,ic,ex1ex2"/>
            <FastRelax disable_design="true" name="relax_2" repeats="2" scorefxn="common_sfxn" task_operations="ifc,ic,ex1ex2"/>
            <SwitchResidueTypeSetMover name="to_fa" set="fa_standard"/>
        </MOVERS>

        <PROTOCOLS>
            <Stage num_runs_per_input_struct="1" total_num_results_to_keep="7500">
                <Add mover_name="to_fa"/>
                <Add mover_name="relax_1"/>
                <Sort filter_name="sfxn_filter"/>
            </Stage>

            <Stage num_runs_per_input_struct="1" total_num_results_to_keep="1875">
                <Add mover_name="relax_1"/>
                <Sort filter_name="sfxn_filter"/>
            </Stage>

            <Stage num_runs_per_input_struct="1" total_num_results_to_keep="1875">
                <Add mover_name="relax_2"/>
                <Sort filter_name="sfxn_filter"/>
            </Stage>

        </PROTOCOLS>

    </Common>

</JobDefinitionFile>
```
