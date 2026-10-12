#Comparación estructural de subestructuras
Una vez generado un [[archivo de segmentos|segment-file-generation]], hay que comparar los segmentos para determinar qué subestructuras son estructuralmente compatibles. En el SEWING con hash, esto se hace antes de generar un ensamblaje y usa un algoritmo de hash geométrico. Esta información se guarda en un archivo de aristas y (opcionalmente) en un archivo de alineamiento.

Este paso solo es necesario en una ejecución de SEWING con hash. En una ejecución de SEWING sin hash (recomendada para subestructuras helicoidales) puedes pasar directamente al siguiente paso, la [[generación del ensamblaje|AssemblyMover]].

##Archivo de aristas
Un archivo de aristas guarda los ids de segmento de todos los segmentos estructuralmente compatibles dentro del archivo de segmentos proporcionado. A continuación se muestra un ejemplo de archivo de aristas:

```
There will be an edge file here
```

###Aplicación generadora de archivos de aristas
####Opciones de línea de comandos
#####Opciones obligatorias
* ```-model_file_name``` : Ruta del archivo de segmentos, consulta [[Generación de archivos de segmentos|segment-file-generation]]
* ```-edge_file_name``` : Ruta donde guardar el archivo de aristas generado

#####Opciones opcionales
* ```-max_clash_score``` : Número máximo de átomos en choque que se permiten durante el alineamiento
* ```-min_hash_score``` : El número mínimo de átomos alineados para determinar si dos segmentos son estructuralmente compatibles
* ```-boxes_per_dimension``` : El número de intervalos que se consideran en el hash geométrico. 3 y 5 son los únicos valores aceptables
* ```-hash_opposite_termini``` : El hash se hará entre segmentos con extremos opuestos (N con C o C con N )

####Ejemplo

```
./edge_file_generator.default.xxx -model_file_name smotifs_H_1_100_L_1_100_H_1_100.segments -edge_file_name smotifs_H_1_100_L_1_100_H_1_100.edges -boxes_per_dimension 3
```




##Archivo de alineamiento
Un archivo de alineamiento guarda los residuos concretos que se pueden usar para crear un alineamiento con un segmento proporcionado.  Usar un archivo de alineamiento es completamente opcional, pero puede ser útil en ejecuciones de [[AppendAssembly|AppendAssemblyMover]] en las que se añadirán varias veces elementos al segmento inicial mientras se genera el ensamblaje. A continuación se muestra un ejemplo de archivo de alineamiento:

```
There will be an alignment file here
```

Un archivo de alineamiento se puede generar mediante [[RosettaScripts]] con el [[AlignmentFileGeneratorMover]].



##Véase también
* [[SEWING]] Página principal de SEWING
* [[Segment File Generation]]
* [[AlignmentFileGeneratorMover]]
* [[AssemblyMover]]
