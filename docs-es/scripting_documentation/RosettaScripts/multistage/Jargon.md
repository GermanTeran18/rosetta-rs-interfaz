#MultistageRosettaScripts

#Jerga de M.R.S.

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

[[_TOC_]]

Muchas de las [[opciones de Stage|StageOptions]] son bastante largas,
pero su comportamiento no siempre queda claro solo por el nombre.
Para que los nombres se entiendan mejor, esta página explica
el vocabulario que tenía en mente cuando escribí estas opciones.

##Trayectoria

Una trayectoria es la secuencia de movers y filtros por la que pasa una única Pose.

[[/images/multistage_rosetta_scripts/MRS_jargon_trajectory.png]]

##Estructura de entrada

En el Stage 1, cada archivo de entrada definido en las etiquetas `<Job>` es una estructura de entrada.
En los Stages 2 y siguientes, cada resultado del stage anterior es una estructura de entrada.
Intenté indicarlas gráficamente a continuación colocando estrellas negras al comienzo de cada stage.

[[/images/multistage_rosetta_scripts/MRS_jargon_input_struct.png]]

##Resultado

Las Poses que genera un stage son los resultados de ese stage.

[[/images/multistage_rosetta_scripts/MRS_jargon_result.png]]

##Instancia

Una instancia es un único stage para una única Pose.

[[/images/multistage_rosetta_scripts/MRS_jargon_instance.png]]

##Véase también

* [[Rosetta Scripts multietapa|MultistageRosettaScripts]]
* [Tutorial introductorio de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
* [Tutorial avanzado de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

