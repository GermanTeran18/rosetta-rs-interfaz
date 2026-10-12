## RosettaScripts JD3

Esta aplicación usa un archivo llamado `job_definition_file` para ejecutar un RosettaScript con distintas entradas o configuraciones en una sola ejecución. Es extremadamente útil para hacer benchmarks. Se llama RosettaScripts JD3 porque usa un nuevo marco de distribución de trabajos (Job Distribution) en Rosetta, creado por Andrew Leaver-Fay.

## Referencia


**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]]


[[_TOC_]]

## Comando de ejemplo


`rosetta_scripts_jd3.macosclangrelease -job_definition_file my_jd_file.xml`


## Archivo de definición de trabajos


Este archivo enumera la configuración de cada trabajo y los archivos xml usados. Puedes combinarlos libremente. Solo se permite cambiar ciertas opciones globales. Si quieres probar distintas configuraciones, usa la opción script_vars del XML para controlar los distintos trabajos. 

Este es un ejemplo con distintos PDB, script vars, etc. 
En general, debes tener Input y Output para cada trabajo, además del protocolo del parser indicado. 

Ten en cuenta que los guiones bajos dobles, `__`, se usan para denotar los espacios de nombres de las opciones globales usadas en cada trabajo, por ejemplo `parser__protocol` y `parser__script_vars`.

### Ejemplo

```xml
<JobDefinitionFile>
   <Job>
      <Input>
         <PDB filename="pdbs/pareto/1gai_refined.pdb.gz"/>
      </Input>
      <Output>
         <PDB filename_pattern="glycan-build_100_hybrid-build-two_171A/glycan-build_100_hybrid-build-two_171A_$"/>
      </Output>
      <Options>
         <parser__protocol value="xmls/glycan_tree_relax.xml"/>
         <parser__script_vars value="branch=171A cartmin=0 layer_size=2 window_size=0 glycan_sampler_rounds=100 quench_mode=0 map=maps/1gai_2mFo-DFc_map.ccp4 symmdef=pdbs/symmetrized_structures/1gai_crys.symm shear=1 rounds=1 conformer_probs=0 gaussian_sampling=1 hybrid_protocol=1 exp=hybrid-conformer-build-two match=1"/>
         <in__file__native value="pdbs/pareto/1gai_refined.pdb.gz" />
      </Options>
   </Job>
   <Job>
      <Input>
         <PDB filename="pdbs/pareto/1gai_refined.pdb.gz"/>
      </Input>
      <Output>
         <PDB filename_pattern="glycan-build_100_hybrid-build-one_171A/glycan-build_100_hybrid-build-one_171A_$"/>
      </Output>
      <Options>
         <parser__protocol value="xmls/glycan_tree_relax.xml"/>
         <parser__script_vars value="branch=171A cartmin=0 layer_size=1 window_size=0 glycan_sampler_rounds=100 quench_mode=0 map=maps/1gai_2mFo-DFc_map.ccp4 symmdef=pdbs/symmetrized_structures/1gai_crys.symm shear=1 rounds=1 conformer_probs=0 gaussian_sampling=1 hybrid_protocol=1 exp=hybrid-conformer-build-one match=1"/>
         <in__file__native value="pdbs/pareto/1gai_refined.pdb.gz" />
      </Options>
   </Job>
   <Job>
      <Input>
         <PDB filename="pdbs/pareto/1jnd_refined.pdb.gz"/>
      </Input>
      <Output>
         <PDB filename_pattern="glycan-build_100_gs-final_200A/glycan-build_100_gs2_200A_$"/>
      </Output>
      <Options>
         <parser__protocol value="xmls/gs.xml"/>
         <parser__script_vars value="branch=200A cartmin=0 layer_size=2 window_size=1 glycan_sampler_rounds=100 quench_mode=0 map=maps/1jnd_2mFo-DFc_map.ccp4 symmdef=pdbs/symmetrized_structures/1jnd_crys.symm shear=1 rounds=1 conformer_probs=0 gaussian_sampling=1 exp=gs-final"/>
         <in__file__native value="pdbs/pareto/1jnd_refined.pdb.gz" />
      </Options>
   </Job>
   <Job>
      <Input>
         <PDB filename="pdbs/pareto/1jnd_refined.pdb.gz"/>
      </Input>
      <Output>
         <PDB filename_pattern="glycan-build_50_hybrid-gs-even-final_200A/glycan-build_50_hybrid-gs-even2_200A_$"/>
      </Output>
      <Options>
         <parser__protocol value="xmls/gtm_gs.xml"/>
         <parser__script_vars value="branch=200A cartmin=0 layer_size=2 window_size=1 glycan_sampler_rounds=50 quench_mode=0 map=maps/1jnd_2mFo-DFc_map.ccp4 symmdef=pdbs/symmetrized_structures/1jnd_crys.symm shear=1 rounds=1 conformer_probs=0 gaussian_sampling=1 exp=hybrid-gs-even-final"/>
         <in__file__native value="pdbs/pareto/1jnd_refined.pdb.gz" />
      </Options>
   </Job>
</JobDefinitionFile>
```

------------------------------

### Entrada

#### RCSB (archivos PDB)
El Inputter de PDB acepta CUALQUIER tipo de archivo de RCSB: `.pdb`, `.cif` y `.mmtf`

_Ejemplo para un solo PDB_:

```xml
      <Input>
         <PDB filename="pdbs/pareto/1gai_refined.pdb.gz"/>
      </Input>
```

_Ejemplo para varios PDB (PDBLIST)_ 
- Nota: un archivo pdb por línea, igual que con la opción `-l` de todas las demás aplicaciones-

```xml
      <Input>
         <PDB listfile="my_pdb_list.txt"/>
      </Input>
```

##### Opciones
Opción | Descripción
------------ | -------------
`listfile` | Indica la ruta de un archivo de lista de pdbs
`filename` | Indica la ruta de un solo pdb. 
`path` | Indica la ruta del PDB o la ruta de cada PDB que aparece en el archivo de lista

------------------------------

#### Silent files de Rosetta

Ejemplo:
```xml
      <Input>
         <Silent silent_files="silent1,silent2"/>
      </Input>
```

##### Opciones

Opción | Descripción
------------ | -------------
`silent_files` | Lista de silent files separados por comas.
`tags` | Lista de etiquetas (tags) separadas por comas que especifican el subconjunto de Poses que se deben procesar de los silent files de entrada. Si no se usa este atributo ni el atributo 'tagfile', se usan todos los Poses de los silent files de entrada.
`tagfile`| Nombre de archivo cuyo contenido enumera un conjunto de etiquetas separadas por espacios en blanco que especifican el subconjunto de Poses que se deben procesar de los silent files de entrada. Si no se usa este atributo ni el atributo 'tags', se usan todos los Poses de los silent files de entrada.
`skip_failed_simulations` | Omite el procesamiento de los Poses de entrada si la etiqueta empieza por 'W_'

------------------------------

### Salida

#### Archivos PDB
Escribe archivos PDB clásicos usando `filename` o `filename_pattern`

```xml
      <Output>
         <PDB filename_pattern="glycan-build_50_hybrid-gs-even-final_200A/glycan-build_50_hybrid-gs-even2_200A_$"/>
      </Output>
```

##### Opciones
Opción | Descripción
------------ | -------------
`filename` | El nombre del archivo en el que se escribe la estructura de salida. Solo funciona correctamente si hay una única estructura de entrada; de lo contrario, las estructuras de salida se apilarían unas sobre otras. No se puede combinar con el atributo 'filename_pattern', que normalmente es preferible a este.
`filename_pattern` | Si quieres nombrar los archivos pdb de salida de un trabajo con alguna permutación de la etiqueta de entrada (es decir, el nombre del pdb de entrada) y algo que identifique algo particular del trabajo (por ejemplo, '1abc_steal_native_frags_0001.pdb'), usa la cadena filename_pattern. La etiqueta original del trabajo se sustituirá por el signo de dólar. Por ejemplo, '$_steal_native_frags' produciría pdbs con nombres como '1abc_steal_native_frags_0001.pdb'. A estos nombres se les añadirán las opciones Prefix y Suffix.
`path` | Indica el directorio en el que se debe escribir el archivo .pdb de salida. Ten en cuenta que la ruta de salida no pasa a formar parte del nombre del trabajo; por lo tanto, si tienes dos trabajos con el mismo nombre escritos en directorios distintos, tu archivo de registro y tu archivo de puntuaciones (y cualquier otro outputter secundario de Poses) no distinguirán para cuál de los dos trabajos están escribiendo la salida
`overwrite` | Si se establece en 'true', los trabajos se ejecutarán aunque exista un archivo de salida con el nombre que produciría este trabajo, y ese archivo de salida preexistente se sobrescribirá con el nuevo archivo de salida.
`pdb_gz` | ¿Debe escribirse el archivo PDB de salida como .gz?
`prefix`| Establece el prefijo del PDB de salida. Se puede combinar con el atributo 'filename_pattern'. Anula cualquier opción de prefijo establecida en la línea de comandos.
`suffix` | Establece el sufijo del PDB de salida. Se puede combinar con el atributo 'filename_pattern'. Anula cualquier opción de prefijo establecida en la línea de comandos."

------------------------------

#### Archivos mmTF

Ejemplo:
      <Output>
         <mmTF filename_pattern="glycan-build_50_hybrid-gs-even-final_200A/glycan-build_50_hybrid-gs-even2_200A_$"/>
      </Output>

##### Opciones
Opción | Descripción
------------ | -------------
`filename` | El nombre del archivo en el que se escribe la estructura de salida. Solo funciona correctamente si hay una única estructura de entrada; de lo contrario, las estructuras de salida se apilarían unas sobre otras. No se puede combinar con el atributo 'filename_pattern', que normalmente es preferible a este.
`filename_pattern` | Si quieres nombrar los archivos mmtf de salida de un trabajo con alguna permutación de la etiqueta de entrada (es decir, el nombre del pdb de entrada) y algo que identifique algo particular del trabajo (por ejemplo, '1abc_steal_native_frags_0001.mmtf'), usa la cadena filename_pattern. La etiqueta original del trabajo se sustituirá por el signo de dólar. Por ejemplo, '$_steal_native_frags' produciría pdbs con nombres como '1abc_steal_native_frags_0001.mmtf'. A estos nombres se les añadirán las opciones Prefix y Suffix.
`path` | Indica el directorio en el que se debe escribir el archivo .pdb de salida. Ten en cuenta que la ruta de salida no pasa a formar parte del nombre del trabajo; por lo tanto, si tienes dos trabajos con el mismo nombre escritos en directorios distintos, tu archivo de registro y tu archivo de puntuaciones (y cualquier otro outputter secundario de Poses) no distinguirán para cuál de los dos trabajos están escribiendo la salida
`overwrite` | Si se establece en 'true', los trabajos se ejecutarán aunque exista un archivo de salida con el nombre que produciría este trabajo, y ese archivo de salida preexistente se sobrescribirá con el nuevo archivo de salida.
`mmtf_gz` | ¿Debe escribirse el archivo mmtf de salida como .gz?
`prefix`| Establece el prefijo del mmtf de salida. Se puede combinar con el atributo 'filename_pattern'. Anula cualquier opción de prefijo establecida en la línea de comandos.
`suffix` | Establece el sufijo del mmtf de salida. Se puede combinar con el atributo 'filename_pattern'. Anula cualquier opción de prefijo establecida en la línea de comandos."

------------------------------

#### Silent files de Rosetta

Un PoseOutputter que escribe las estructuras en un formato específico de Rosetta; un solo silent file puede contener cientos o miles de estructuras de salida, lo que reduce la carga sobre los sistemas de archivos y facilita la gestión de la salida. Ten en cuenta que, si dos Jobs distintos definidos en el archivo de definición de trabajos pretenden escribir sus salidas en el mismo archivo, la configuración del primer Job tendrá prioridad sobre la del segundo. Esta situación se complica aún más si se usa MPI con varios nodos de salida o de archivo: en ese caso se escribirán varios silent files (uno por nodo de salida), y el primer Job que se escriba en un silent file determinará qué configuración tiene prioridad, pero no se puede saber cuál de los dos Jobs se escribirá primero. Para evitar confusiones, se recomienda que cada Job escriba sus salidas en un archivo distinto, o que se usen las mismas opciones para todos los Jobs que escriben en el mismo archivo."

Ejemplo:
```xml
      <Output>
         <SilentFile filename="my_silent_file"/>
      </Output>
```

##### Opciones
Opción | Descripción
------------ | -------------
`filename` | El nombre del silent file de salida en el que se debe escribir.
`buffer_limit` | El número de Poses que se mantienen en memoria entre cada escritura a disco
`path` | Indica el directorio en el que se debe escribir el silent file de salida. Ten en cuenta que la ruta de salida no pasa a formar parte del nombre del trabajo; por lo tanto, si tienes dos trabajos con el mismo nombre escritos en directorios distintos, tu archivo de registro y tu archivo de puntuaciones (y cualquier otro outputter secundario de Poses) no distinguirán para cuál de los dos trabajos están escribiendo la salida

------------------------------

## Opciones de línea de comandos aceptadas por trabajo
Ten en cuenta que solo estas opciones se pueden establecer por `<Job>` en la etiqueta `<Options>`. 
Usa `value=` para establecer la opción o las opciones. Indica una opción por línea, como se muestra a continuación. 

Ejemplo:

```xml
   </Job>
      <Options>
         <parser__protocol value="xmls/glycan_tree_relax.xml"/>

      </Options>
   </Job>
```

### Opciones del parser
```
parser__protocol
parser__script_vars
parser__inclusion_recursion_limit
corrections__restore_talaris_behavior
mistakes__restore_pre_talaris_2013_behavior
in__file__native;
```

### Opciones de ScoreFunction

```
score__empty
score__weights
score__patch
corrections__correct
corrections__hbond_sp2_correction
corrections__score__dun10
corrections__score__score12prime
in__auto_setup_metals
in__include_sugars
score__force_sugar_bb_zero;
```

------------------------------

## SimpleMetrics útiles para benchmarks

El [[ProtocolSettingsMetric]] está diseñado para combinarse con RosettaScripts JD3 y así facilitar la escritura, la ejecución y el análisis, en scripts posteriores, de benchmarks y de protocolos más complejos. 

Usa la opción `job_tag` junto con la opción de trabajo script_vars para separar experimentos específicos. Aparecerá en el scorefile (y en el PDB) como `opt_job_tag`. Es muy útil cuando se combina con pandas. Usa las opciones `get_script_vars` y `get_user_options` para registrar en el scorefile los script_vars establecidos y las opciones por trabajo o globales establecidas, y usarlas luego en gráficos y análisis. Por último, usa `limit_to_options` para escribir en el scorefile solo opciones específicas.  