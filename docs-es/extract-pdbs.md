# [[extract_pdbs]]

[[_TOC_]]

## Descripción del algoritmo

Esta aplicación extrae Poses de un silent file y los exporta como un archivo PDB, según la(s) etiqueta(s). La etiqueta se escribe en la columna 'description' (columna 24) del silent file y tiene el formato 'result_xxxx'.

    ROSETTA='path/to/rosetta'
    silent_file_path='out.silent'
    tags='result_0001 result_0002'

    $ROSETTA/main/source/bin/extract_pdbs.linuxgccrelease -in:file:silent $silent_file_path -in:file:tags $tags

## Opciones

**Opciones generales**

|**Opción**|**Opción corta**|**Descripción**|**Tipo**|
|:-------|:-------|:--------------|:-------|
|-in:file:silent||Silent file de entrada|String|
|-in:file:tags||Etiquetas de los Poses deseados|String|


