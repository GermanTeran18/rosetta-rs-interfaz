#ModelTrimmer
##Propósito
La aplicación ModelTrimmer sirve para filtrar los modelos de un archivo de modelos de [[SEWING]] existente: recorta los modelos y deja solo los relevantes, para acelerar la 'comparación de modelos' y el 'ensamblaje de modelos'.

##Entrada
ModelTrimmer requiere un archivo de modelos de SEWING, que se genera con la [[aplicación SEWING Hasher|SEWING Hasher application]] como se describe [[aquí|Model-generation]]. También se requiere un archivo PDB de entrada (con -in:file:s), aunque no se usa.
##Salida
ModelTrimmer produce un nuevo archivo de modelos de SEWING que se ha recortado con los filtros especificados en las opciones de línea de comandos.
##Opciones de línea de comandos
```
-in:file:s                      The input PDB (ignored, but still required)
-sewing:model_file_name         The name of the input SEWING model file
-sewing:new_model_file_name     The name of the output trimmed model file
-sewing::remove_any_dssp        Remove any model that contain this DSSP (H,E,L) (Default "")
-sewing::min_helix_length       Remove any model that has less helical residues than this (Default 0)
-sewing::max_helix_length       Remove any model that has more helical residues than this (Default 1000)
-sewing::min_strand_length      Remove any model that has less strand residues than this (Default 0)
-sewing::max_strand_length      Remove any model that has more strand residues than this (Default 1000)
-sewing::min_loop_length        Remove any model that has less loop residues than this (Default 0)
-sewing::max_loop_length        Remove any model that has more loop residues than this (Default 1000)
-sewing::leave_models_with_E_terminal_ss Remove any model whose two terminal secondary structures are not beta-strands
-sewing::leave_parallel_way_H_bonded_models_by_terminal_strands_only (b-a-b)
-sewing::leave_antiparallel_way_H_bonded_models_by_terminal_strands_only (b-a-b)
-sewing::model_should_have_at_least_one_E Model should have at least one 'E' segment
-sewing::model_should_have_at_least_one_E_at_terminal_segment Model should have at least one 'E' segment at terminal segment
```
###Ejemplo
Un ejemplo de línea de comandos para ModelTrimmer:
```
/path/to/rosetta/main/source/bin/ModelTrimmer.default.linuxgccrelease @flags_ModelTrimmer
```

Un ejemplo de flags_ModelTrimmer que eliminaría todos los modelos que contienen segmentos helicoidales:
```
-s input_files/1_1_1TEN_A_res-renum.pdb #just for jd2
-mute basic.io core protocols.jd2

-sewing:model_file_name basic.models
-new_model_file_name basic_trimmed.models

-sewing::remove_any_dssp H
```

##Uso
ModelTrimmer se usa para generar archivos de entrada para el protocolo [[SEWING]]. Encontrarás más detalles sobre su uso en la página [[Model generation]].

##Véase también
* [[SEWING Hasher Application]]
* [[SEWING]] La página principal de SEWING
* [[Model generation]]
* [[Utilities Applications]]
