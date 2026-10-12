#auto-DRRAFTER: modelado automático de coordenadas de ARN en mapas de crio-EM

##Metadatos

Autora: Kalli Kappel (kkappel at alumni dot stanford dot edu)  
Última actualización: marzo de 2020

##Propósito de la aplicación

auto-DRRAFTER se usa para construir coordenadas de ARN en mapas de crio-EM. A diferencia de DRRAFTER, no requiere una colocación manual inicial de las hélices. Por ahora, auto-DRRAFTER solo funciona con sistemas que contienen únicamente ARN.

##Referencia
auto-DRRAFTER se describe en [este artículo](https://www.biorxiv.org/content/10.1101/717801v1):  
Kappel, K.\*, Zhang, K.\*, Su, Z.\*, Kladwang, W., Li, S., Pintilie, G., Topkar, V.V., Rangan, R., Zheludev, I.N., Watkins, A.M., Yesselman, J.D., Chiu, W., Das, R. (2019). Ribosolve: Rapid determination of three-dimensional RNA-only structures. bioRxiv.

##Código y demo
El código de auto-DRRAFTER estará disponible en las versiones semanales de Rosetta posteriores a la 2019.47 (no está disponible en la 2019.47). **auto-DRRAFTER NO está disponible en Rosetta 3.11**.

Todos los scripts de auto-DRRAFTER se encuentran en `ROSETTA_HOME/main/src/apps/public/DRRAFTER/`.

Hay una demo de auto-DRRAFTER disponible en `ROSETTA_HOME/main/demos/public/drrafter/` (disponible en las versiones posteriores a la 2020.03). Las instrucciones de la demo se encuentran [aquí](https://www.rosettacommons.org/demos/latest/public/auto-drrafter/README). ***Se recomienda encarecidamente completar la demo entera Y leer toda la documentación de esta página antes de intentar ejecutar auto-DRRAFTER con tu ARN.***

##En esta página:
[Preparación de auto-DRRAFTER](#setting-up-auto-DRRAFTER): hazlo antes de ejecutar auto-DRRAFTER.   
[Archivos de entrada necesarios](#required-input-files): describe los archivos de entrada que tendrás que preparar.   
[Ejecución de auto-DRRAFTER](#running-auto-drrafter): describe los pasos para ejecutar auto-DRRAFTER.   
[Preparación manual de una ejecución de auto-DRRAFTER](#manually-setting-up-an-auto-drrafter-run): es útil si sabes algo sobre la estructura de tu ARN (como dónde encaja una parte de la estructura en el mapa de densidad) y/o quieres ejecutar auto-DRRAFTER a través del servidor ROSIE.   

##Preparación de auto-DRRAFTER
  
1. Descarga Rosetta aquí <https://www.rosettacommons.org/software/license-and-download>. Necesitarás obtener una licencia antes de descargar Rosetta (gratuita para usuarios académicos). auto-DRRAFTER estará disponible a partir de las versiones semanales de Rosetta *posteriores* a la 2019.47. **auto-DRRAFTER NO está disponible en Rosetta 3.11 (estará disponible en la 3.12)**.  
2. Si no usas los binarios precompilados (están disponibles para Mac y Linux y puedes obtenerlos descargando fuente+binarios en el paso 1), instala Rosetta siguiendo las instrucciones disponibles [aquí] (https://www.rosettacommons.org/docs/latest/build_documentation/Build-Documentation).  
3. Asegúrate de tener python instalado e instala networkx y mrcfile. Por ejemplo, escribe: `pip install networkx mrcfile`
4. Instala EMAN2 versión 2.22 (https://blake.bcm.edu/emanwiki/EMAN2/Install). Confirma que `e2proc3d.py` y `e2segment3d.py` estén instalados escribiendo:   
```
e2proc3d.py –h
```
```
e2segment3d.py –h
``` 
Deberías ver las instrucciones de uso de cada uno de estos comandos.  
5. Instala las herramientas de ARN de Rosetta. Consulta las instrucciones y la documentación [aquí] (https://www.rosettacommons.org/docs/latest/application_documentation/rna/RNA-tools).  
6. Comprueba que la variable de entorno ROSETTA esté definida (deberías haberla definido durante la instalación de las herramientas de ARN). Escribe echo $ROSETTA. Esto debería devolver la ruta de tu directorio de Rosetta. Si no devuelve nada, vuelve al paso 5 y asegúrate de seguir los pasos de configuración de las herramientas de ARN.  
7. Añade la ruta de los scripts de auto-DRRAFTER a tu $PATH (también puedes escribir la ruta completa de los scripts cada vez que los uses). Se encuentran en main/source/src/apps/public/DRRAFTER/ dentro de tu directorio de Rosetta. Un ejemplo para bash:  
```
export PATH=$PATH:$ROSETTA/main/source/src/apps/public/DRRAFTER/
```  

##Archivos de entrada necesarios
Se necesitan los siguientes archivos de entrada:  
`fasta.txt`: el archivo FASTA con la secuencia completa de tu molécula de ARN. Debe contener una línea que empiece por '>' e indique la cadena y los números de residuo de la secuencia, p. ej., A:1-35. La secuencia de ARN debe especificarse con letras minúsculas. *Por ahora, auto-DRRAFTER solo puede manejar ARN de una sola cadena.*  
`secstruct.txt`: un archivo con la estructura secundaria del complejo en notación de puntos y paréntesis (dot-bracket). La estructura secundaria debe tener la misma longitud que la secuencia del archivo fasta. Esta estructura secundaria se impondrá durante el modelado con auto-DRRAFTER. Recomendamos verificar bioquímicamente las estructuras secundarias predichas con [M2-seq](https://doi.org/10.1073/pnas.1619897114).  
`map.mrc`: el archivo del mapa de densidad en formato mrc.  
`job_submission_template.sh`: debe ser un script de envío de trabajos para el clúster en el que planeas ejecutar tu trabajo. Por ejemplo, podría ser algo así:   
```
#!/bin/bash
#SBATCH -J JOB_NAME
#SBATCH -o /dev/null
#SBATCH -e /dev/null
#SBATCH -p owners
#SBATCH -t 48:00:00
#SBATCH -n 1
#SBATCH -N 1
```
Como alternativa, `job_submission_template.sh` puede ser simplemente un archivo en blanco si planeas ejecutar el trabajo en tu portátil. Los trabajos típicos de auto-DRRAFTER no se pueden ejecutar en un portátil.  


##Ejecución de auto-DRRAFTER
A continuación se describe el flujo de trabajo de auto-DRRAFTER.  
####**Paso 1**: aplicar un filtro paso bajo al mapa de densidad y determinar el nivel de umbral.  
```
python $ROSETTA/main/source/src/apps/public/DRRAFTER/auto-DRRAFTER_setup.py -map_thr 30 -full_dens_map input_files/map.mrc -full_dens_map_reso 10.0 -fasta input_files/fasta.txt -secstruct input_files/secstruct.txt -out_pref mini_example -rosetta_directory $ROSETTA/main/source/bin/ -nstruct_per_job 100 -cycles 1000 -fit_only_one_helix -rosetta_extension .static.linuxgccrelease -just_low_pass
```  

`-map_thr` es el umbral de densidad con el que se realizará la detección de las ubicaciones óptimas de colocación de hélices. Es el valor que intentamos averiguar en este paso, así que el número que pongamos aquí todavía no importa.   
`-full_dens_map` es nuestro mapa de densidad.   
`-full_dens_map_res` es la resolución del mapa de densidad en Å.  
`-fasta` es el archivo fasta con la secuencia de nuestra molécula de ARN.  
`-secstruct` es la estructura secundaria de la molécula de ARN en notación de puntos y paréntesis.  
`-out_pref` es el prefijo de los archivos de salida que genera auto-DRRAFTER (usaremos `mini_example` en el resto de las instrucciones).  
`-rosetta_directory` es la ubicación de los ejecutables de Rosetta.  
`-rosetta_extension` es la extensión de tus ejecutables de Rosetta.  
`-repeats` es el número de intentos independientes de colocar las hélices. 10 suele ser un buen número para esta opción.  

Esto creará un único archivo: `mini_example_lp20.mrc`. Es el mapa de densidad con filtro paso bajo, que se usará para determinar las colocaciones iniciales de las hélices.

####**Paso 2**: abre el mapa de densidad con filtro paso bajo (`mini_example_lp20.mrc`) en Chimera.   
Cambia el umbral del mapa de densidad (con la barra deslizante del histograma de densidad). Debes encontrar el umbral más alto con el que se puedan distinguir claramente los «nodos terminales» en el mapa de densidad, pero con el que el mapa de densidad siga estando totalmente conectado. Ten en cuenta que este umbral solo se usa para la colocación inicial de las hélices y no tiene ningún efecto en los pasos de modelado posteriores.  

####**Paso 3**: preparar la ejecución de auto-DRRAFTER.   
Escribe:  
```
python $ROSETTA/main/source/src/apps/public/DRRAFTER/auto-DRRAFTER_setup.py -map_thr 30 -full_dens_map input_files/map.mrc -full_dens_map_reso 10.0 -fasta input_files/fasta.txt -secstruct input_files/secstruct.txt -out_pref mini_example -rosetta_directory $ROSETTA/main/source/bin/ -nstruct_per_job 100 -cycles 1000 -fit_only_one_helix -rosetta_extension .static.linuxgccrelease
```  

Es el mismo comando que usamos en el paso 1, salvo que hemos quitado la opción `–just_low_pass` y el valor de `-map_thr` debe actualizarse con el valor que determinaste en el paso 2. Según las colocaciones de hélices que resulten, puede que quieras cambiar de nuevo el umbral.   

Esto imprimirá un mensaje parecido a este:  

```
Low-pass filtering the map to 20A.
Converting density map to graph.
Possible end nodes in the map: 
3 4 
You can visualize the end nodes in mini_example_init_points.pdb
You can specify which of these end nodes you'd like to use with -use_end_node
Converting secondary structure to graph.
Mapping secondary structure to density map.
Setting up DRRAFTER runs.
Making full helix H0
Making full helix H1
```

Por lo general es buena idea abrir `mini_example_init_points.pdb` y tu mapa de densidad en PyMol o Chimera y comprobar que los posibles nodos terminales que se indican en este mensaje tengan sentido (aquí `3` y `4`, que puedes identificar como los residuos número 3 y 4 de `mini_example_init_points.pdb`). Si una de estas posiciones de nodo terminal te gusta de verdad, quizá quieras especificar que se use de forma explícita. Por ejemplo, si nos gustara de verdad el nodo terminal `3`, podríamos especificar que se use este nodo terminal volviendo a ejecutar el comando anterior y añadiendo la opción `–use_end_node 3`.   

Después, auto-DRRAFTER convierte la estructura secundaria del ARN (la que especificamos) en un grafo en el que las hélices se representan como aristas y las uniones y los loops se representan como nodos. A continuación, este grafo de estructura secundaria se mapea sobre el grafo del mapa de densidad.   
Luego, auto-DRRAFTER prepara las ejecuciones de DRRAFTER para cada uno de estos mapeos. Esto implica construir hélices ideales de forma A para todas las regiones helicoidales de la estructura secundaria, añadir coordenadas provisionales para todas las horquillas sobre estas hélices de ARN ideales y crear todos los archivos de entrada específicos que requiere DRRAFTER.   
**`auto-DRRFTER_setup.py` creará los siguientes archivos**:  

`settings_mini_example.txt`: este archivo enumera todas las configuraciones que se usaron para preparar esta ejecución de auto-DRRAFTER.  

`all_aligned_mini_example_*.REORDER.pdb`: son las posibles colocaciones de hélices en el mapa de densidad. Cada modelo se usará en una ejecución de DRRAFTER distinta.  

`command_mini_example_*_R1`: los comandos de las ejecuciones de DRRAFTER para los posibles alineamientos de las hélices en el mapa de densidad.  

`fasta_mini_example.txt`: el archivo fasta de las ejecuciones de DRRAFTER. Es básicamente el mismo que el archivo fasta de entrada, pero la numeración se ha cambiado para empezar en 0; es simplemente una convención de auto-DRRAFTER. Un paso final al terminar el modelado con auto-DRRAFTER volverá a asignar estos números de residuo a los números de residuo de entrada.    

`flags_mini_example_*_R1`: estos archivos contienen todas las opciones que se usarán en las dos ejecuciones de DRRAFTER para los distintos alineamientos de hélices en el mapa de densidad.

`mini_example_H*.pdb`: hélices ideales de forma A.   

`mini_example_H*_full.out.1.pdb`: las mismas hélices ideales de forma A de arriba con coordenadas provisionales añadidas para las horquillas.   

`mini_example_auto_fits.txt`: este archivo enumera todos los posibles alineamientos de hélices en el mapa de densidad. Cada alineamiento está numerado y aparece en una línea distinta de este archivo.   

`mini_example_init_points.pdb`: este archivo PDB contiene todos los puntos que se colocaron en el mapa de densidad para convertirlo en un grafo.   

`secstruct_mini_example.txt`: el archivo de estructura secundaria de las ejecuciones de DRRAFTER.

####**Paso 4**: enviar o ejecutar los trabajos de DRRAFTER.   
Escribe:  
```
python $ROSETTA/main/source/src/apps/public/DRRAFTER/submit_jobs.py -out_pref mini_example -curr_round R1 -njobs 25 -template_submission_script input_files/job_submission_template.sh -queue_command source
```  

`-out_pref` es el prefijo que se usa para todos los archivos de salida de esta ejecución; debe ser el mismo –out_pref que se usó en los comandos de preparación.   
`-curr_round`: es la ronda de modelado que se está realizando en este momento. Aún no hemos hecho ningún modelado, así que es la ronda 1. Siempre debe ser una ‘R’ seguida de un número que indique el número de ronda.   
`-njobs`: es el número de trabajos que se ejecutarán. Cada trabajo construirá el número de modelos que se especificó en el comando de preparación anterior (-nstruct_per_job), en este caso 10 estructuras por trabajo. Por tanto, construiremos 20 modelos en total (10 estructuras por trabajo x 2 trabajos).
`-template_submission_script`: debe ser un script de envío de trabajos para el clúster en el que planeas ejecutar tu trabajo. Aquí no lo ejecutamos en un clúster (esta demo se puede ejecutar en un portátil), así que el script de envío de trabajos es simplemente un archivo en blanco.   
`-queue_command`: es el comando que se usará para enviar los archivos de trabajo a un sistema de colas de un clúster. Si quieres ejecutarlo localmente, puedes usar «source». También puede ser algo como `sbatch` o `qsub`, según el clúster que uses.   

Este comando tardará varias horas (normalmente 12-24), según el número de modelos construidos por trabajo (y, por supuesto, de la rapidez con que se ejecuten tus trabajos en el clúster que uses).   

Esto creará los siguientes archivos de salida:   

`job_files/`: un directorio que contiene todos los archivos de envío de trabajos.
`out_mini_example_*_R1/`: estos directorios contienen todos los modelos de DRRAFTER construidos para cada alineamiento de hélices.   

####**Paso 5**: preparar la siguiente ronda de modelado.

```
python $ROSETTA/main/source/src/apps/public/DRRAFTER/auto-DRRAFTER_setup_next_round.py -out_pref mini_example -curr_round R1 -rosetta_directory $ROSETTA/main/source/bin/ -rosetta_extension .static.linuxgccrelease
```  

Esto imprimirá en la pantalla algo así:  

```
Setting up next round
Overall convergence 0.373
Density threshold: 38.779
```  

Este paso reúne todos los modelos del paso anterior y calcula la convergencia de los diez modelos con mejor puntuación en conjunto (de todos los alineamientos). Ese es el valor de «Overall convergence» que se imprime. Luego se prepara la siguiente ronda de modelado a partir de los modelos construidos en la ronda anterior. Las regiones de los modelos que han convergido bien se mantendrán fijas en la siguiente ronda de modelado.  

En este paso se escriben varios archivos. Los archivos clave que debes conocer son:

`mini_example_all_models_all_fits_R1.out.*.pdb`: son los mejores modelos en conjunto, según la puntuación, de todos los distintos alineamientos de la primera ronda de modelado. 

`command_mini_example_*_R2`: son los archivos de comandos de la siguiente ronda de modelado. Los nombres de archivo indicarán la siguiente ronda de modelado que debe realizarse (en este caso `R2`, pero si los archivos de salida hubieran sido `command_mini_example_*_FINAL_R2`, la siguiente ronda sería en cambio `FINAL_R2`).  

`flags_mini_example_*_R2`: estos archivos contienen todas las opciones que se usarán en las dos ejecuciones de DRRAFTER para los distintos alineamientos de hélices en el mapa de densidad.   

`all_fit_mini_example_*_R2.REORDER.pdb`: estos archivos PDB contienen las colocaciones iniciales de hélices para la siguiente ronda de modelado.  

`convergence_mini_example_all_models_R1.txt`: este archivo enumera la convergencia de los modelos con mejor puntuación en conjunto.   

Archivos en general menos importantes, pero útiles de conocer para depurar:   

`mini_example_*_R1_CAT_ALL_ROUNDS.out.*.pdb`: son los modelos con mejor puntuación de cada una de las colocaciones iniciales de hélices.   
  

**El «Density threshold» (que se imprime en la pantalla al ejecutar este paso) es muy importante.** Es el valor que se usa para determinar si las regiones del ARN que han convergido bien se mantendrán realmente fijas durante la siguiente ronda de modelado. El valor que se imprime en la pantalla es el que se determinó automáticamente. A veces, sobre todo con mapas de mayor resolución (mejor que unos ~6 Å) o con mapas relativamente ruidosos, este valor seleccionado automáticamente es demasiado alto. Esto puede hacer que las regiones que han convergido bien y que encajan razonablemente en el mapa de densidad no se mantengan fijas en las rondas de modelado posteriores, lo que hace mucho más difícil que los modelos converjan en conjunto. Puedes comprobar si esto podría ser un problema en tu caso examinando los modelos con mejor puntuación de cada alineamiento de la última ronda (`mini_example_*_R1_CAT_ALL_ROUNDS.out.*.pdb`), así como los archivos PDB que contienen las regiones que se mantendrán fijas en la siguiente ronda de modelado (`all_fit_mini_example_*_R2.REORDER.pdb`). Si hay regiones de tus modelos que parecen bastante bien convergidas, pero no aparecen en los archivos `all_fit_mini_example_*_R2.REORDER.pdb`, quizá quieras volver a ejecutar este paso y usar la opción `-dens_thr` para seleccionar un valor más bajo del umbral de densidad. Con frecuencia tiene sentido probar a reducir el umbral de densidad en un ~50% (es decir, si el umbral de densidad se seleccionó automáticamente en 38.779 como se muestra arriba, prueba con `-dens_thr 19` la primera vez que vuelvas a ejecutar `auto-DRRAFTER_setup_next_round.py`). Si sigues viendo un problema similar, puedes reducir aún más el umbral de densidad.    


####Los pasos 4 y 5 deben iterarse. 
`-curr_round` debe actualizarse cada vez, hasta que el modelado esté completo (debe haber dos rondas sucesivas de modelado `FINAL`, p. ej., `FINAL_R2` y luego `FINAL_R3`).


####**Paso final**: finalizar los modelos.  
Escribe:   
```
python $ROSETTA/main/source/src/apps/public/DRRAFTER/finalize_models.py -fasta input_files/fasta.txt -out_pref mini_example -final_round FINAL_R6
```  
`-fasta` es el fasta que se usó para preparar la ejecución en el paso 1.
`-out_pref` es el mismo –out_pref que se usó para preparar la ejecución en el paso 1
`-final_round` es la última ronda de modelado que se acaba de completar (algo como `FINAL_R6`).   

Esto debería imprimir `Done finalizing models` en la pantalla, lo que indica que el modelado ha terminado. Esto crea los modelos finales: `mini_example_all_models_all_fits_FINAL_R6.out.*.pdb`. Estos modelos deben inspeccionarse con cuidado en el contexto del mapa de densidad.

##Preparación manual de una ejecución de auto-DRRAFTER
A veces puedes saber dónde debe encajar una parte de tu estructura de ARN en tu mapa de densidad. Si es así, quizá quieras usar esa información durante el modelado con auto-DRRAFTER. Esta sección describe cómo hacerlo.  

###Creación de los archivos de entrada
Esta sección sustituiría los pasos 1-3 del flujo de trabajo anterior. Tenemos que crear los siguientes siete conjuntos de archivos:

1. `helix_fit_in_map.pdb`: este archivo PDB debe contener una parte de la estructura de ARN ajustada al mapa de densidad. La numeración debe coincidir con la de tu archivo fasta (ver más abajo).  

2. `fasta_mini_example.txt`: el archivo fasta de las ejecuciones de DRRAFTER. La numeración debe empezar en 0 y debe coincidir con la numeración de todos los archivos PDB. Todos los residuos de ARN deben indicarse con letras minúsculas (`a`,`c`,`g`,`u`).       

3. `secstruct_mini_example.txt`: el archivo de estructura secundaria de las ejecuciones de DRRAFTER en notación de puntos y paréntesis. La longitud de la estructura secundaria debe coincidir exactamente con la longitud de la secuencia de tu archivo fasta.   

4. `flags_mini_example_R1`: este archivo contiene todas las opciones que se usarán en la ejecución de DRRAFTER. **Es muy importante preparar este archivo correctamente. Lee con atención el ejemplo de abajo.**   
                                         
    ```
    -fasta <fasta_mini_example.txt>
    -secstruct_file <secstruct_mini_example.txt>
    -s <helix_fit_in_map.pdb> <helix_1.pdb helix_2.pdb helix_3.pdb ...>
    -edensity:mapfile <input_files/map.mrc>
    -edensity:mapreso <10.0>
    -out:file:silent <mini_example_R1.out>
    -cycles <30000>
    -dock_into_density <false>
    -nstruct <100>
    -new_fold_tree_initializer true
    -ft_close_chains false
    -bps_moves false
    -minimize_rna true
    -minimize_protein_sc true
    -rna_protein_docking true
    -rnp_min_first true
    -rnp_pack_first true
    -rnp_high_res_cycles 2
    -minimize_rounds 1
    -ignore_zero_occupancy false
    -convert_protein_CEN false
    -FA_low_res_rnp_scoring true
    -ramp_rnp_vdw true
    -docking_move_size 0.5 
    -dock_each_chunk_per_chain false
    -mute protocols.moves.RigidBodyMover
    -mute protocols.rna.denovo.movers.RNA_HelixMover
    -use_legacy_job_distributor true
    -no_filters
    -set_weights linear_chainbreak 20.0
    -jump_library_file RNA18_HUB_2.154_2.5.jump 
    -vall_torsions RNA18_HUB_2.154_2.5.torsions
    -score:weights stepwise/rna/rna_res_level_energy4.wts 
    -restore_talaris_behavior
    -edensity:cryoem_scatterers
    ```

    Las opciones más importantes que tendrás que modificar son:  
    * **`-fasta <fasta_mini_example.txt>`**: debes reemplazar `fasta_mini_example.txt` por tu archivo fasta.  
    * **`-secstruct_file <secstruct_mini_example.txt>`**: debes reemplazar `secstruct_mini_example.txt` por tu archivo de estructura secundaria.  
    * **`-s <helix_fit_in_map.pdb> <helix_1.pdb helix_2.pdb helix_3.pdb ...>`**: son todas las partes de la estructura de ARN de las que tienes archivos PDB. Es importante que tengas un archivo PDB distinto para cada una de las hélices de ARN de tu estructura. Tendrás que crearlos con `rna_helix.py` (consulta las instrucciones [aquí](https://www.rosettacommons.org/docs/wiki/application_documentation/rna/RNA-tools#some-useful-tools_rna-modeling-utilities); asegúrate de tener [primero configuradas las herramientas de ARN](https://www.rosettacommons.org/docs/wiki/application_documentation/rna/RNA-tools#setup)). **¡El orden de estos archivos es importante!** El archivo PDB que se ajustó a tu mapa de densidad debe aparecer primero. Todas las demás hélices deben ir a continuación (no hace falta que estén ajustadas al mapa de densidad: auto-DRRAFTER ignorará la colocación relativa de todos los archivos PDB menos el primero de la lista).  
    * **`-edensity:mapfile <input_files/map.mrc>`**: reemplaza `input_files/map.mrc` por tu archivo de mapa de densidad.  
    * **`-edensity:mapreso <10.0>`**: reemplaza `10.0` por la resolución de tu mapa de densidad.  
    * **`-out:file:silent <mini_example>_R1.out`**: reemplaza `mini_example` por el prefijo que quieras para el archivo de salida. Debe coincidir con el nombre de tus archivos fasta y de estructura secundaria (p. ej. fasta_**mini_example**.txt, secstruct_**mini_example**.txt y **mini_example**_R1.out).  
    * **`-cycles <30000>`**: reemplaza 1000 por el número de ciclos de Monte Carlo que quieras por estructura. `30000` suele ser un buen número.   
    * **`-dock_into_density <false>`**: esta opción controla si se permitirá o no que la estructura de ARN que ajustaste al mapa de densidad se mueva dentro del mapa de densidad durante la ejecución. Si estás muy seguro de la colocación, esta opción debe establecerse en `false`. Si estás menos seguro, puedes establecerla en `true`.  
    * **`-nstruct <100>`**: reemplaza 100 por el número de estructuras que quieras construir por trabajo y por ronda de modelado. (Esto es distinto del número de estructuras que quieres construir por ronda. Por ejemplo, si ejecutas 10 trabajos, cada uno con `-nstruct 100`, tendrás 10x100=1000 modelos en esa ronda).   
No deberías necesitar cambiar ninguna de las demás opciones de este archivo.  
        
5. `command_mini_example_R1`: los comandos de las ejecuciones de DRRAFTER para los posibles alineamientos de las hélices en el mapa de densidad. Por ejemplo:   
```
$ROSETTA/main/source/bin/rna_denovo @flags_mini_example_R1
```

6. `helix_1.pdb`, `helix_2.pdb`, etc.: hélices ideales de forma A para todas las regiones helicoidales de tu ARN. Son todos los archivos que aparecen en la opción `-s` de tu archivo `flags` (ver arriba). Tendrás que crearlos con `rna_helix.py` (consulta las instrucciones [aquí](https://www.rosettacommons.org/docs/wiki/application_documentation/rna/RNA-tools#some-useful-tools_rna-modeling-utilities); asegúrate de tener [primero configuradas las herramientas de ARN](https://www.rosettacommons.org/docs/wiki/application_documentation/rna/RNA-tools#setup)).     

7. `mini_example_auto_fits.txt`: este archivo debe contener una sola línea que diga:
```
SINGLE_FIT
```
Esto indica que la ejecución se ha preparado manualmente y que solo hay una colocación posible del ARN dentro del mapa de densidad (a diferencia de los muchos alineamientos posibles que crearía `auto-DRRAFTER_setup.py`).   

8. `job_submission_template.sh`: este archivo se describe [más arriba](#required-input-files).

###Una nota importante sobre los archivos anteriores
Lo otro importante que conviene tener en cuenta es que los nombres de todos los archivos anteriores son importantes. Cada vez que «mini_example» aparezca en el nombre de uno de los archivos anteriores, debe reemplazarse por el `-out_pref` que planees usar en los pasos posteriores del flujo de modelado de auto-DRRAFTER.  

###Cómo seguir ejecutando auto-DRRAFTER
Tras preparar estos archivos, puedes continuar con el paso 4 de las instrucciones de «Ejecución de auto-DRRAFTER» [más arriba](#running-auto-drrafter).