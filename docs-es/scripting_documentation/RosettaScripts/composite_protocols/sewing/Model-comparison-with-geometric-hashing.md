#Comparación de modelos con hash geométrico
##Nota: esta página es de LegacySEWING.
**Esta página está obsoleta. Para obtener información sobre la versión actual de SEWING, visita la página [[Structural Comparison of Substructures]].

Una vez generado un archivo de modelos (consulta [[Model Generation]]), los modelos deben compararse estructuralmente entre sí con un algoritmo de hash geométrico implementado en la [[aplicación SEWING Hasher|SEWING Hasher application]].

opciones de sewing_hasher para el hash
```
-sewing:mode hash               Set the sewing mode to 'hash' for geometric hashing
-sewing:model_file_name         The name of the file to read models from
-sewing:score_file_name         The name of the score file to output (used in later stages of SEWING)
-sewing:num_segments_to_match   The exact of model segments to look for structural matches for. Any matches with less than, or more than, this number of segment matches will fail. For continuous SEWING, only a value of 1 is supported
-sewing:min_hash_score          The minimum number over overlapping atoms **per segment** that is considered a structure match (recommended value: >=10)
-sewing:max_clash_score         The tolerance for number of atoms/segment of different atom types that end up in the same quarter-angstrom bin during geometric hashing (recommended value: 0)
```

Un ejemplo de línea de comandos para comparar archivos de modelos:
```
/path/to/rosetta/bin/sewing_hasher.linuxgccrelease \
-sewing:mode hash \
-sewing:model_file_name pdb.models \
-sewing:score_file_name pdb.scores \
-sewing:num_segments_to_match 1 \
-sewing:min_hash_score 20 (default: 10) \ (here 20 atoms (N,CA,C,O) should be superimposed between two superimposing terminal secondary structures)
-sewing:max_clash_score 0
```

Por el coste computacional, se recomienda ejecutar el comando anterior con un gran número de procesadores usando MPI. El resultado será un archivo de puntuaciones de texto plano por cada proceso MPI (por ejemplo, pdb.scores.0, pdb.scores.1, etc.). En la mayoría de las bases de datos de tamaño de producción, los archivos de puntuaciones resultantes serán muy grandes. Para aumentar la velocidad durante el ensamblaje, es necesario convertir todo el conjunto de archivos de puntuaciones de texto plano en un único archivo de puntuaciones binario. Para hacer esta conversión, primero combina los archivos de puntuaciones de texto plano:
```
cat pdb.scores.* > pdb.scores
```

Luego, usa el ejecutable sewing_hasher para convertir este archivo de texto plano a binario (consulta [[SEWING Hasher Application]]):
```
/path/to/rosetta/bin/sewing_hasher.linuxgccrelease \
-sewing:mode convert \
-sewing:model_file_name pdb.models \
-sewing:score_file_name pdb.scores
```

El resultado final debe ser un archivo de puntuaciones llamado pdb.scores.bin; este es el archivo de puntuaciones que se usará durante el ensamblaje de esqueletos de SEWING.

##Véase también
* [[Model Generation]] para otro uso de la aplicación sewing_hasher
* [[SEWING]]: La página principal de SEWING
* [[SEWING Hasher Application]]
* [[ModelTrimmer]]: Se usa para preparar los archivos de modelos de SEWING para el hash
