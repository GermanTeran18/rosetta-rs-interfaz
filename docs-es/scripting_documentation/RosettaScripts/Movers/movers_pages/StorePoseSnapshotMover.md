# StorePoseSnapshot
Página creada por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker, 26 de junio de 2015.<br/>
Volver a la página de [[Mover|Movers-RosettaScripts]].<br/>
## StorePoseSnapshot

La numeración secuencial de residuos de Rosetta puede causar quebraderos de cabeza en protocolos en los que se insertan o eliminan residuos y en los que luego se quiere hacer referencia a residuos situados después del punto de inserción o eliminación. El mover StorePoseSnapshot pretende ser un medio para que el usuario guarde una instantánea con nombre o «Pose de referencia» en un punto concreto de un protocolo y luego use la numeración de residuos del Pose <i>en ese punto del protocolo</i> para movers y filtros que se apliquen más adelante, cuando los índices del Pose pueden haber sido alterados por inserciones o eliminaciones.

La sintaxis del mover es muy sencilla:

```xml
<StorePoseSnapshot name="(&string)" reference_pose_name="(&string)" />
```

-   reference_pose_name: el nombre de la instantánea o del objeto Pose de referencia. Se pueden guardar muchas instantáneas distintas (aplicando diferentes movers StorePoseSnapshot en distintos puntos del protocolo) y después referirse a ellas con nombres distintos.

Este es un ejemplo de cómo podría usarse el mover con otros movers que aprovechan los Poses de referencia. En este script importamos un Pose, guardamos una instantánea, eliminamos los residuos 5 a 8 y luego mutamos un residuo que habría estado en la posición 10 de la estructura original (pero que ahora estará en la posición 6, ya que se eliminaron 4 residuos). Después eliminamos los residuos 3 a 5 y mutamos el residuo <i>anterior</i> al que solía estar en la posición 10 (pero que ahora está en la posición 3, así que el residuo que lo precede es la posición 2). 

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
	</SCOREFXNS>
	<TASKOPERATIONS>
	</TASKOPERATIONS>
	<FILTERS>
	</FILTERS>
	<MOVERS>
		<StorePoseSnapshot name="storesnapshot1" reference_pose_name="ref1" />
		<DeleteRegionMover name="delete5to8" start_res_num="5" end_res_num="8" /> 
		<MutateResidue name="mutate_old_10" target="refpose(ref1,10)" new_res="LEU" />
		<DeleteRegionMover name="delete3to5" start_res_num="3" end_res_num="5" /> 
		<MutateResidue name="mutate_res_before_old_10" target="refpose(ref1,10)-1" new_res="LYS" />
	</MOVERS>
	<APPLY_TO_POSE>
	</APPLY_TO_POSE>
	<PROTOCOLS>
		<Add mover="fullatom" />
		<Add mover="storesnapshot1" />
		<Add mover="delete5to8" />
		<Add mover="mutate_old_10" />
		<Add mover="delete3to5" />
		<Add mover="mutate_res_before_old_10" />
	</PROTOCOLS>
</ROSETTASCRIPTS>
```

Los movers y filtros que pueden usar la numeración del Pose de referencia analizan entradas con la forma ```refpose(<reference_pose_name>,<index_in_reference_pose>)±<offset>```, donde el desplazamiento (offset) permite al usuario especificar que el residuo diana está N residuos antes o después de un residuo concreto que corresponde a un índice del Pose de referencia. Ten en cuenta que, como esta es una función nueva y experimental, por ahora solo [[MutateResidue|MutateResidueMover]] admite la numeración de residuos del Pose de referencia como entrada, aunque es fácil modificar otros movers para que lo permitan (consulta [[esta nota|A note on parsing residue selections in movers and filters]] en la documentación para desarrolladores para saber cómo hacerlo).

<b>Advertencia:</b> ¡Los Poses de referencia no se han probado con simetría! ¡Úsalos bajo tu propio riesgo con Poses simétricos!

##Véase también

* [[DeleteRegionMover]]
* [[InsertPoseIntoPoseMover]]
* [[KeepRegionMover]]
* [[ReplaceRegionMover]]
* [[I want to do x]]: guía para elegir un mover de RosettaScripts

