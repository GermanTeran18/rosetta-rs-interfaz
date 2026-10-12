# SavePoseMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SavePoseMover

Este mover permite guardar un Pose en cualquier momento de una trayectoria o desde disco, y volver a recuperarlo en cualquier momento para sustituir el Pose actual o pasárselo a un mover o a una SimpleMetric. También puede usarse solo con filtros, p. ej., filtros delta.

```xml
<SavePoseMover name="native" restore_pose="(1, &bool)" reference_name="(&string)" pdb_file="(&string)" />
```

-   restore\_pose: si lo pones en 0, al aplicar el mover el Pose se _guardará_ con el nombre especificado en reference_name. Si lo pones en 1 (el valor por defecto), eliminará el Pose activo actual y _restaurará el Pose guardado previamente_ como reference_name como Pose actual.
-   reference\_name: al guardar un Pose, el Pose actual se guardará con este nombre, para que otras instancias de SavePoseMover u otros movers/filtros puedan referenciarlo. Al restaurar un Pose, este debe ser el nombre usado por un SavePoseMover anterior con restore_pose=0.
-   pdb\_file: opcional. Si está presente, cargará el archivo PDB dado en el Pose referenciado en el momento del parseo, en lugar de usar el Pose actual. Esto puede usarse para fijar un Pose de referencia a una estructura en disco para otros objetos XML, en cuyo caso nunca hace falta aplicar el mover en la sección PROTOCOLS. Si usas el mover en el protocolo, lo más probable es que quieras poner restore\_pose en 1, ya que de lo contrario la estructura cargada desde disco se descartará y se sobrescribirá con el Pose actual.


Este es un ejemplo antiguo para injertar CDRs en un anticuerpo (antes de que se creara el mover AntibodyCDRGrafter). Ten en cuenta que, por ahora, `all=x` deben ser cadenas de texto: `="x"`. 

```
<ROSETTASCRIPTS>
	<MOVERS>
		<SavePoseMover name=save_current reference_name=current/>
		<SavePoseMover name=save_CDR reference_name=CDR/>
		<SavePoseMover name=restore_current restore_pose=1 reference_name=current/>
		<SavePoseMover name=L1 restore_pose=1 reference_name=L1 pdb_file=%%L1%%/>
		<SavePoseMover name=L2 restore_pose=1 reference_name=L2 pdb_file=%%L2%%/>
		<SavePoseMover name=L3 restore_pose=1 reference_name=L3 pdb_file=%%L3%%/>
		<SavePoseMover name=H1 restore_pose=1 reference_name=H1 pdb_file=%%H1%%/>
		<SavePoseMover name=H2 restore_pose=1 reference_name=H2 pdb_file=%%H2%%/>
		<SavePoseMover name=H3 restore_pose=1 reference_name=H3 pdb_file=%%H3%%/>
		<SavePoseMover name=DE restore_pose=1 reference_name=DE pdb_file=%%DE%%/>
		<ParsedProtocol name=save_cdr_restore >
			<Add mover=save_CDR />
			<Add mover=restore_current />
		</ParsedProtocol>
		<ParsedProtocol name=save_current_restore_ab >
			<Add mover=save_current />
			<Add mover=restore_ab />
		</ParsedProtocol>
		<KeepRegionMover name=k_L1 start_pdb_num=24L end_pdb_num=42L nter_overhang=2 cter_overhang=2/>
		<KeepRegionMover name=k_L2 start_pdb_num=57L end_pdb_num=72L nter_overhang=2 cter_overhang=2/>
		<KeepRegionMover name=k_L3 start_pdb_num=107L end_pdb_num=138L nter_overhang=2 cter_overhang=2/>
		<KeepRegionMover name=k_H1 start_pdb_num=24H end_pdb_num=42H nter_overhang=2 cter_overhang=2/>
		<KeepRegionMover name=k_H2 start_pdb_num=57H end_pdb_num=69H nter_overhang=2 cter_overhang=2/>
		<KeepRegionMover name=k_H3 start_pdb_num=107H end_pdb_num=138H nter_overhang=2 cter_overhang=2/>
		<CCDEndsGraftMover name=graft_L1 start_pdb_num=23L end_pdb_num=43L spm_reference_name=CDR copy_pdbinfo=1/>
		<CCDEndsGraftMover name=graft_L2 start_pdb_num=56L end_pdb_num=73L spm_reference_name=CDR copy_pdbinfo=1/>
		<CCDEndsGraftMover name=graft_L3 start_pdb_num=106L end_pdb_num=139L spm_reference_name=CDR copy_pdbinfo=1/>
		<CCDEndsGraftMover name=graft_H1 start_pdb_num=23H end_pdb_num=43H spm_reference_name=CDR copy_pdbinfo=1/>
		<CCDEndsGraftMover name=graft_H2 start_pdb_num=56H end_pdb_num=70H spm_reference_name=CDR copy_pdbinfo=1/>
		<CCDEndsGraftMover name=graft_H3 start_pdb_num=106H end_pdb_num=139H spm_reference_name=CDR copy_pdbinfo=1/>
	</MOVERS>
	<PROTOCOLS>
		<Add mover_name=save_current />
		<Add mover_name=L1/>
    		<Add mover_name=k_L1 />
		<Add mover_name=save_cdr_restore/>
		<Add mover_name=graft_L1/>
		<Add mover_name=save_current/>
		<Add mover_name=L2/>
		<Add mover_name=k_L2/>
		<Add mover_name=save_cdr_restore/>
		<Add mover_name=graft_L2/>
		<Add mover_name=save_current/>
		<Add mover_name=L3/>
		<Add mover_name=k_L3/>
		<Add mover_name=save_cdr_restore/>
		<Add mover_name=graft_L3/>
		<Add mover_name=save_current/>
		<Add mover_name=H1/>
		<Add mover_name=k_H1/>
		<Add mover_name=save_cdr_restore/>
		<Add mover_name=graft_H1/>
		<Add mover_name=save_current/>
		<Add mover_name=H2/>
		<Add mover_name=k_H2/>
		<Add mover_name=save_cdr_restore/>
		<Add mover_name=graft_H2/>
		<Add mover_name=save_current/>
		<Add mover_name=H3/>
		<Add mover_name=k_H3/>
		<Add mover_name=save_cdr_restore/>
		<Add mover_name=graft_H3/>
		<Add mover_name=save_current/>
	</PROTOCOLS>
</ROSETTASCRIPTS>
```

##Véase también

* [[SaveAndRetrieveSidechainsMover]]
* [[DumpPdbMover]]
* [[I want to do x]]: guía para elegir un mover