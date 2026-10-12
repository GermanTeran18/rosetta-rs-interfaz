#AlignmentFileGeneratorMover

El AlignmentFileGeneratorMover se usa para generar archivos de alineamiento para el protocolo de diseño SEWING y se puede acceder a él mediante [[RosettaScripts]]

----------------------
[[_TOC_]]

##Opciones de línea de comandos

El AlignmentFileGeneratorMover usa la utilidad MotifHasher diseñada por Will Scheffler. Las opciones de línea de comandos que requiere esta utilidad se encuentran en la página [[AssemblyMover|AssemblyMover#command-line-flags] .

Este mover también requiere una estructura de entrada que se usará para generar todos los alineamientos posibles con un archivo de segmentos dado. Esta estructura de entrada se proporciona con la opción ```-s```.

##Opciones de RosettaScripts
* ```model_file_name``` : Ruta al archivo de segmentos usado para generar el archivo de aristas (consulta [[Generación de archivos de segmentos|segment-file-generation]])
* ```edge_file_name``` : Ruta al archivo de aristas (consulta [[Generación del archivo de aristas|structural-comparison-of-substructures#edge-file]]) 
* ```recursive_depth``` : Determina a cuántos nodos de distancia del segmento inicial se quieren generar alineamientos
* ```match_segments``` : Designa qué segmentos de la estructura de entrada pueden formar alineamientos
* ```pose_segment_starts``` : Una lista, separada por comas, del primer residuo de cada segmento del Pose
* ```pose_segment_ends``` : Una lista, separada por comas, del último residuo de cada segmento del Pose
* ```set_segments_from_dssp``` : Determina los límites de los segmentos según la estructura secundaria del Pose; se puede usar en lugar de las opciones ```pose_segment_starts``` y ```pose_segment_ends```
* ```required_resnums``` : Los números de los residuos de la estructura de entrada que deben conservarse; se puede usar un selector de residuos en su lugar

##Subtags

Al AlignmentFileGeneratorMover se le puede dar un subtag [[Ligands]].

##Ejemplo
Este es un ejemplo de tag de RosettaScripts para una estructura de entrada HLH a la que se añadirá tanto en la hélice del extremo N como en la del extremo C.

*Aviso: por ahora no puedo confirmar que este script xml funcione realmente, pero debería...*

```xml
<AlignmentFileGeneratorMover 
    name="AFG"
    model_file_name="smotifs_H_1_100_L_1_100_H_1_100.segments"
    edge_file_name="smotifs_H_1_100_L_1_100_H_1_100.edges"
    match_segments="1,3"
    set_segments_from_dssp="true"
/>
```


##Véase también
* [[SEWING]] La página principal de SEWING
* [[Comparación estructural de subestructuras|structural-comparison-of-substructures]]