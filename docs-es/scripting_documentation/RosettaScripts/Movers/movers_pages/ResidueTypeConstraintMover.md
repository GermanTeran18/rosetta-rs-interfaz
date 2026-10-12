# ResidueTypeConstraintMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## ResidueTypeConstraintMover

Añade ResidueTypeConstraint al Pose usando ResidueTypeConstraint
(da un punto de bonificación preferente a los residuos seleccionados)

```xml
<ResidueTypeConstraintMover name="&string" AA_name3="&string" favor_bonus="(0.5 &real)"/>
```

Por ejemplo,

```xml
<ROSETTASCRIPTS>
        <TASKOPERATIONS>
             <ReadResfile name="resfile" filename="c.0.0_resfile_for_ideal_distance_between_sheets.txt"/>
        </TASKOPERATIONS>
        <SCOREFXNS>
                <ScoreFunction name="cart_score" weights="ref2015_cart">
                  <Reweight scoretype="res_type_constraint" weight="1"/>
                </ScoreFunction>
        </SCOREFXNS>
        <FILTERS>
        </FILTERS>
        <MOVERS>
		<SwitchResidueTypeSetMover name="to_fa" set="fa_standard"/>
                <ResidueTypeConstraintMover name="favor_residue" AA_name3="ASP,GLU" favor_bonus="0.5"/>
                <FastRelax name="RelaxDesign" scorefxn="cart_score" task_operations="resfile"/>
        </MOVERS>
        <APPLY_TO_POSE>
        </APPLY_TO_POSE>
        <PROTOCOLS>
           <Add mover="to_fa"/>
           <Add mover="favor_residue"/>
           <Add mover="RelaxDesign"/>
       </PROTOCOLS>
</ROSETTASCRIPTS>
```


##Véase también

* [[FavorSequenceProfileMover]]
* [[I want to do x]]: guía para elegir un mover

