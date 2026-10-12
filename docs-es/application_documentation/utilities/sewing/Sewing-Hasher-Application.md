#Aplicación Sewing Hasher
##Nota: esta página es para LegacySEWING.
**Esta página está desactualizada. Para obtener información sobre la versión actual de sewing, visita la página [[Segment File Generation]]. Si realizas SEWING con hash, visita la página [[Structural Comparison of Substructures]]. Si no sabes qué significa eso, empieza en la página principal de [[SEWING]].**
##Propósito
Esta aplicación sirve para generar archivos de modelos y archivos de aristas (edge) que se usarán en el protocolo [[SEWING]]. También sirve para convertir archivos de aristas de SEWING a un formato binario más eficiente en memoria.
##Referencias
Science. 2016;352(6286):687-90
Design of structurally distinct proteins using strategies inspired by evolution.
Jacobs TM, Williams B, Williams T, Xu X, Eletsky A, Federizon JF, Szyperski T, Kuhlman B.
##Entrada
Los archivos de entrada que requiere la aplicación sewing_hasher dependen del modo con el que se ejecute (consulta los detalles en la sección de opciones de línea de comandos más abajo). Entre las posibles entradas requeridas están: una base de datos (creada con el marco de [[FeatureReporters]]) que se usará al generar modelos de SEWING; una lista de PDB que se usarán al generar modelos de SEWING; un archivo de modelos de SEWING; un archivo de aristas de SEWING; y/o un archivo PDB.
##Salida
La salida de sewing_hasher también varía según el modo usado. Entre las posibles salidas están un archivo de modelos de SEWING, un archivo de aristas de SEWING (texto), un archivo de alineamientos de SEWING o un archivo binario de aristas de SEWING.
##Opciones de línea de comandos

###Opciones específicas de SEWING
```
-sewing:mode   Mode used to run the application. Options are:
               generate: Used to generate a model file
               generate_five_ss_model: Generate a model file with five segments per model (under development)
               hash:     Used to generate an edge file
               pregenerate_alignments: Used to generate an alignment file
               convert:  Convert an edge file from text to binary format
               test:     Prints the name of the edge file and exits
-sewing:model_file_name Name of output model file (for generate mode) or input model file (for all other modes)
-sewing:score_file_name Name of SEWING edge file to output (hash mode) or input (align/convert modes)
-sewing:min_hash_score  Minimum number of overlapping atoms per segment to generate an edge
-sewing:max_clash_score Maximum number of clashing atoms (in the same bin but not superimposed) per alignment
-sewing:num_segments_to_match How many segments to overlay to generate alignments (default 1)
-sewing:match_segments  Which segments of each substructure should be scored by the hasher? 
                        (ex: 1 3 to score helices in a helix-loop-helix motif)
-sewing:max_models      Maximum number of models to hash (for testing only)
-sewing:starting_model  Specify a specific model ID to begin hashing
-sewing:num_procs       Number of processors to split up hashing with (hash mode only)
```
###Opciones de entrada de estructuras
Estas opciones son obligatorias para ciertos modos de sewing_hasher.

```
-in:file:l     In generate mode, can be used to provide a list of PDBs containing SEWING models.
               In align mode, can be used to list starting PDBs for which to generate alignment files
-inout:dbms:database_name  In generate mode, used to provide a Features database containing SEWING models
-in:file:s     In align mode, can be used to list a single starting PDB for which to generate an alignment file.

```



##Uso

Para ver instrucciones sobre cómo usar la aplicación sewing_hasher para preparar archivos de entrada para SEWING, consulta las páginas [[Model generation]] y [[Model comparison with geometric hashing]]. 
**Nota: actualmente solo el modo hash admite la ejecución en varios procesadores**


##Véase también
* [[Model Generation]] Más información sobre la generación de modelos de LegacySEWING
* [[Model comparison with geometric hashing]] Más información sobre la generación de archivos de puntuación de LegacySEWING
* [[ModelTrimmer]] Aplicación que sirve para podar modelos de archivos de modelos de SEWING (LegacySEWING)
* [[SEWING]] La página principal de SEWING
* [[SEWING Dictionary]]
* [[Utilities Applications]]




