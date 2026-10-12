#MultistageRosettaScripts

#Checkpointing

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

[[_TOC_]]

Una de las grandes ventajas de los RosettaScripts tradicionales
es que fallar apenas tiene coste.
Si el programa se bloquea al 80% del recorrido, aun así obtienes el 80% de los resultados
y puedes volver a enviar el trabajo para obtener el 20% final.

¡Los Multistage Rosetta Scripts no son así!
Si el programa muere por cualquier motivo antes de que
se escriban las estructuras, ¡no obtienes NADA!

Para evitarlo, planeamos implementar un sistema de checkpointing que
permita guardar y cargar el progreso en caso de que falle el trabajo.

#¡Aún no está implementado!

Todo lo que sigue a partir de aquí es pura especulación.

```xml
<PROTOCOLS>
	<Stage total_num_results_to_keep="1000">
		<Add mover="my_fast_design_mover"/>
		<Sort filter="my_sfxn_filter"/>
	</Stage>

	<Checkpoint filename="cp1"/>

	<Stage total_num_results_to_keep="50">
		<Add mover="any_mover"/>
		<Sort filter="any_filter"/>
	</Stage>

	<Stage total_num_results_to_keep="30">
		<Add mover="any_mover"/>
		<Sort filter="any_filter"/>
	</Stage>

	<Checkpoint filename="cp2" old_filename_to_delete="cp1"/>

	<Stage total_num_results_to_keep="10">
		<Add mover="any_mover"/>
		<Sort filter="any_filter"/>
	</Stage>
<PROTOCOLS>
```

##Cambiar el protocolo al cargar

PENDIENTE: escribir sobre esto

```diff
<PROTOCOLS>
-	<Stage total_num_results_to_keep="1000">
+		<Add mover="my_fast_design_mover"/>
+		<Sort filter="my_sfxn_filter"/>
	</Stage>

-	<Cluster total_num_results_to_keep="60">
+		 <Sequence/>
-	</Cluster>

-	<Checkpoint filename="cp1"/>

-	<Stage total_num_results_to_keep="50">
+		<Add mover="any_mover"/>
+		<Sort filter="any_filter"/>
	</Stage>

-	<Stage total_num_results_to_keep="30">
+		<Add mover="any_mover"/>
+		<Sort filter="any_filter"/>
	</Stage>

-	<Checkpoint filename="cp2" old_filename_to_delete="cp1"/>

-	<Stage total_num_results_to_keep="10">
+		<Add mover="any_mover"/>
+		<Sort filter="any_filter"/>
-	</Stage>

<PROTOCOLS>
```

##Véase también

* [[Rosetta Scripts multietapa|MultistageRosettaScripts]]
* [Tutorial introductorio de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
* [Tutorial avanzado de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

