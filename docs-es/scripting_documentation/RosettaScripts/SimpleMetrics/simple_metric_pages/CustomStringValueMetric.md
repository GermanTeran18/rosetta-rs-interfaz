# CustomStringValueMetric
*Volver a la página de [[SimpleMetrics]].*
## CustomStringValueMetric

Añadido por Vikram K. Mulligan (vmulligan@flatironinstitute.org) el 29 de junio de 2022.

[[_TOC_]]

### Descripción

CustomStringValueMetric permite al usuario añadir a un Pose una cadena de texto arbitraria, indexada por una etiqueta.  El valor se escribirá en el archivo PDB, o puede ser consultado por métricas que acceden a cadenas de texto.  Esto también ofrece un medio para almacenar cadenas que no producen las métricas en PyRosetta ni desde C++ de Rosetta, así como para pasar cadenas desde la línea de comandos y almacenarlas en los Poses.

### Ejemplo con cadenas personalizadas definidas desde la línea de comandos

```xml
<ROSETTASCRIPTS>
	<SIMPLE_METRICS>
            <CustomStringValueMetric name="pose_annotation" value="%%external_val%%" />
	</SIMPLE_METRICS>
	<PROTOCOLS>
            <Add metrics="my_metric" />
	</PROTOCOLS>
</ROSETTASCRIPTS>
```

```sh
~/Rosetta/main/source/src/rosetta_scripts.default.linuxgccrelease -parser:protocol my_script.xml -script_vars external_val=high_quality_pose -in:file:s first_file.pdb
~/Rosetta/main/source/src/rosetta_scripts.default.linuxgccrelease -parser:protocol my_script.xml -script_vars external_val=poor_quality_pose -in:file:s second_file.pdb
```

Lo anterior produciría dos salidas.  En el primer caso, la anotación de Pose "high_quality_pose" se almacenaría en el primer Pose y, en el segundo, la anotación de Pose "low_quality_pose" se almacenaría en el segundo.  Esto podría ser útil en casos en los que se usa software externo (programas de dinámica molecular, otros paquetes de modelado molecular, modelos de aprendizaje profundo, etc.) para realizar algún análisis cualitativo de un Pose, pero se quiere que Rosetta pueda leer la anotación producida.

### Todas las opciones (documentación autogenerada)

[[include:simple_metric_CustomStringValueMetric_type]]

## Véase también

* [[CustomRealValueMetric]]


