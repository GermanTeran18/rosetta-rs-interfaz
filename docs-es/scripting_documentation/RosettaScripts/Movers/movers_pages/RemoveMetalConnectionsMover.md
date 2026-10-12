#RemoveMetalConnectionsMover

##RemoveMetalConnectionsMover

Documentación y mover de Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org). Documentación añadida el Día del Recuerdo de 2020. 

[[_TOC_]]

### Descripción
Este mover complementa la función de la opción de línea de comandos `-in:auto_setup_metals` o del [[SetupMetalsMover]] al ofrecer una forma de _eliminar_ los enlaces añadidos automáticamente entre los metales y los residuos que coordinan metales, y de eliminar los tipos variantes correspondientes. Ten en cuenta que, por ahora, este mover _no_ elimina las restricciones de metales. Estas deben eliminarse con el [[ClearConstraintsMover]]. 

### Configuración y opciones
[[include:mover_RemoveMetalConnectionsMover_type]]

###Ejemplo
El siguiente script aplica restricciones de unión a metales al Pose de entrada, luego lo relaja con el mover [[FastRelax|FastRelaxMover]], después elimina las restricciones de metales, introduce una mutación, vuelve a añadir las restricciones de metales y relaja de nuevo:

```xml
<ROSETTASCRIPTS>
        <SCOREFXNS>
                <ScoreFunction name="r15_cst" weights="ref2015_cst.wts" >
                        <Reweight scoretype="metalbinding_constraint" weight="1.0" />
                </ScoreFunction>
        </SCOREFXNS>
        <MOVERS>
                <SetupMetalsMover name="setup_metals" metals_detection_LJ_multiplier="1.0" />
                <FastRelax name="frlx1" scorefxn="r15_cst" />
		<RemoveMetalConnectionsMover name="remove_metal_bonds" />
		<ClearConstraintsMover name="clear_csts" />
		<MutateResidue name="introduce_mutation" target="63" new_res="ALA" /> #We suppose that residue 63 was a metal-binding residue. 
        </MOVERS>
        <PROTOCOLS>
                <Add mover="setup_metals" />
                <Add mover="frlx1" />
		<Add mover="remove_metal_bonds" />
		<Add mover="clear_csts" />
		<Add mover="introduce_mutation" />
		<Add mover="setup_metals" />
		<Add mover="frlx1" />
        </PROTOCOLS>
</ROSETTASCRIPTS>

```

###Véase también
* [[Trabajo con metaloproteínas en Rosetta|Metals]]
* [[AddConstraintsToCurrentConformationMover]]
* [[ClearConstraintsMover]]
* [[SetupMetalsMover]]
