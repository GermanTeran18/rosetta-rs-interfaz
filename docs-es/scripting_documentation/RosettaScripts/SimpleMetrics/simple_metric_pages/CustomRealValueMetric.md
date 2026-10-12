# CustomRealValueMetric
*Volver a la página de [[SimpleMetrics]].*
## CustomRealValueMetric

Añadido por Vikram K. Mulligan (vmulligan@flatironinstitute.org) el 29 de junio de 2022.

[[_TOC_]]

### Descripción

CustomRealValueMetric permite al usuario añadir a un Pose un valor de coma flotante arbitrario, indexado por una etiqueta.  El valor se escribirá en el archivo PDB, o puede ser consultado por métricas que realizan aritmética.  Esto también ofrece un medio para almacenar valores que no calculan las métricas en PyRosetta ni desde C++ de Rosetta, así como para pasar valores desde la línea de comandos y almacenarlos en los Poses.

### Ejemplo con valores personalizados definidos desde la línea de comandos

```xml
<ROSETTASCRIPTS>
	<SIMPLE_METRICS>
            <CustomRealValueMetric name="my_metric" value="%%external_val%%" />
	</SIMPLE_METRICS>
	<PROTOCOLS>
            <Add metrics="my_metric" />
	</PROTOCOLS>
</ROSETTASCRIPTS>
```

```sh
~/Rosetta/main/source/src/rosetta_scripts.default.linuxgccrelease -parser:protocol my_script.xml -script_vars external_val=25.3 -in:file:s first_file.pdb
~/Rosetta/main/source/src/rosetta_scripts.default.linuxgccrelease -parser:protocol my_script.xml -script_vars external_val=-12.9 -in:file:s second_file.pdb
```

Lo anterior produciría dos salidas.  En el primer caso, el valor 25.3 se almacenaría en el primer Pose y, en el segundo, el valor -12.9 se almacenaría en el segundo.  Esto podría ser útil en casos en los que se usa software externo (programas de dinámica molecular, otros paquetes de modelado molecular, modelos de aprendizaje profundo, etc.) para realizar algún análisis de un Pose, pero se quiere que Rosetta pueda leer el valor producido.

### Todas las opciones (documentación autogenerada)

[[include:simple_metric_CustomRealValueMetric_type]]

## Véase también

* [[CustomStringValueMetric]]


