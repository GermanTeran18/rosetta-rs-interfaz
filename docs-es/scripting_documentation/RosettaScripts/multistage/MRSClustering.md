#MultistageRosettaScripts

#Agrupamiento

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

[[_TOC_]]

Para mantener la diversidad entre trayectorias,
puedes agrupar los resultados según una métrica de tu elección.

##Formato XML

```xml
<PROTOCOLS>
	<Stage total_num_results_to_keep="1000">
		<Add mover="my_fast_design_mover"/>
		<Sort filter="my_sfxn_filter"/>
	</Stage>

	<Cluster total_num_results_to_keep="100">
		 <Sequence>
	</Cluster>

	<Stage total_num_results_to_keep="50">
		<Add mover="any_mover"/>
		<Sort filter="any_filter"/>
	</Stage>
<PROTOCOLS>
```

##Métricas

El protocolo de agrupamiento no tendrá todas las Poses cargadas en memoria
mientras agrupa. En su lugar, se guardan instantáneas de ciertas características de la Pose
y se usan para definir lo parecidas que son dos Poses.
Estas características se llaman métricas de agrupamiento (Cluster Metrics) y las elige el usuario.

[[Cómo crear mi propia métrica de agrupamiento|HowToMakeClusterMetrics]]

###Sequence

Esta métrica guarda la secuencia primaria de una Pose
o de un subconjunto de la Pose, si se proporciona un selector de residuos.
Mide la similitud contando el número de
posiciones que tienen el mismo nombre de residuo de una letra.
Puede ser útil para agrupar asignaciones posteriores a una etapa de diseño.

En el futuro, podría tener la opción de usar la matriz BLOSUM62
para que no todas las mutaciones cuenten por igual.

```xml
<Sequence selector="&string (optional)">
```

###Jump

Esta métrica guarda las 6 dimensiones de un salto dado y las usa para definir su similitud con otras Poses.
Puede ser útil para agrupar asignaciones posteriores a una etapa de docking.

```xml
<Jump jump_number="&uint (default is 1)">
```

##Véase también

* [[Rosetta Scripts multietapa|MultistageRosettaScripts]]
* [Tutorial introductorio de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
* [Tutorial avanzado de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
