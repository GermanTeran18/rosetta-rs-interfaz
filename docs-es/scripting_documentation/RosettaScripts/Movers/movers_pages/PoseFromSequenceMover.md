# [[ PoseFromSequenceMover ]]
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## [[ PoseFromSequenceMover ]]

[[include:mover_PoseFromSequenceMover_type]]


El objetivo de este mover es permitirte construir un Pose con la secuencia que elijas sin 
necesitar `-s` ni `-in:file:fasta`

Si esta es la primera etapa de tu script de Rosetta, en general debes añadir la opción de línea de comandos `-input_empty_pose true` para que Rosetta empiece con el Pose creado por este mover, en lugar de crear uno a partir del PDB o del FASTA proporcionado.

Una de las ventajas de este mover es que puedes crear fácilmente Poses de varias cadenas proporcionando un archivo FASTA con varias secuencias, es decir:

```
>Thiswillbechain1
SEGVENCE
>Thiswillbechain2
POTBELLG
```

dará un Pose con dos cadenas: `SEGVENCE` y `POTBELLG`

Esto es especialmente útil con Poses largos y complicados que se pasan al mover Hybridize, donde es útil conocer las identidades de las cadenas del Pose al generar las entradas.