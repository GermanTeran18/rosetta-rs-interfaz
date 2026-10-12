#DRRAFTER: De novo RNP modeling in Real-space through Assembly of Fragments Together with Experimental density in Rosetta

**Se ha verificado que esta documentación es compatible con las versiones semanales de Rosetta: 2018.12, 2018.17, 2018.19, 2018.21 y 2018.26.**

##Metadatos

Autora: Kalli Kappel (kkappel at alumni dot stanford dot edu)  
Última actualización: julio de 2018

##Propósito de la aplicación

DRRAFTER se usa para construir coordenadas de ARN en mapas de crio-EM de complejos de ribonucleoproteínas.

##Código y demo
El código de DRRAFTER está disponible en las versiones semanales de Rosetta a partir de la 2018.12. **DRRAFTER NO está disponible en Rosetta 3.9**.  
 
DRRAFTER.py, el script de python para preparar las ejecuciones de DRRAFTER, se encuentra en `ROSETTA_HOME/main/src/apps/public/DRRAFTER/`. Este script prepara una línea de comando para la aplicación rna_denovo. DRRAFTER.py también se puede usar para estimar la precisión de los modelos de DRRAFTER. Este modo depende de la aplicación drrafter_error_estimation, que también se encuentra en `ROSETTA_HOME/main/src/apps/public/DRRAFTER/`.  

Hay una demo de DRRAFTER disponible en `ROSETTA_HOME/demos/public/drrafter/`. Las instrucciones de la demo están disponibles [aquí](https://www.rosettacommons.org/demos/latest/public/drrafter/README).

## Instalación de DRRAFTER
1. Descarga Rosetta [aquí](https://www.rosettacommons.org/software/license-and-download). Necesitarás obtener una licencia antes de descargar Rosetta (gratuita para usuarios académicos). DRRAFTER está disponible en las versiones semanales de Rosetta a partir de la 2018.12. **DRRAFTER NO está disponible en Rosetta 3.9.** 
2. Si no usas los binarios precompilados (están disponibles para Mac y Linux y puedes obtenerlos descargando fuente+binarios en el paso 1), instala Rosetta siguiendo las instrucciones disponibles [aquí](https://www.rosettacommons.org/docs/latest/build_documentation/Build-Documentation). 
3. Asegúrate de tener instalado python (v2.7).
4. Instala las herramientas de ARN de Rosetta. Consulta las instrucciones y la documentación [aquí] (https://www.rosettacommons.org/docs/latest/application_documentation/rna/RNA-tools).
5. Comprueba que la variable de entorno ROSETTA esté definida (deberías haberla definido durante la instalación de las herramientas de ARN). Escribe `echo $ROSETTA`. Esto debería devolver la ruta de tu directorio de Rosetta. Si no devuelve nada, vuelve al paso 4 y asegúrate de seguir los pasos de configuración de las herramientas de ARN.  
6. Prepara los ejecutables de DRRAFTER. Escribe:
```
ln -s $(ls $ROSETTA/main/source/bin/rna_denovo* | head -1 ) $ROSETTA/main/source/bin/rna_denovo
```
Luego escribe: 
```
ln -s $(ls $ROSETTA/main/source/bin/drrafter_error_estimation* | head -1 ) $ROSETTA/main/source/bin/drrafter_error_estimation
``` 
Por último, escribe:
```
ln -s $(ls $ROSETTA/main/source/bin/extract_pdbs* | head -1 ) $ROSETTA/main/source/bin/extract_pdbs
```
7. Añade la ruta del script de DRRAFTER a tu $PATH (también puedes escribir la ruta completa del script DRRAFTER.py cada vez que lo uses). Se encuentra en `main/source/src/apps/public/DRRAFTER/` dentro de tu directorio de Rosetta. Por ejemplo, añade la siguiente línea a tu `.bashrc`:
```
export PATH=$PATH:$ROSETTA/main/source/src/apps/public/DRRAFTER/
```

##El flujo de trabajo de DRRAFTER
A continuación se describe el flujo de trabajo general de DRRAFTER:

**Paso 1**: ajustar estructuras de proteínas conocidas al mapa de densidad. Normalmente, esto implica reunir estructuras cristalinas ya resueltas de subcomponentes proteicos y luego ajustarlas a la densidad en, por ejemplo, Chimera.  

**Paso 2**: ajustar hélices de ARN ideales al mapa de densidad. Las hélices de ARN se pueden generar en Rosetta con el script `rna_helix.py` (consulta la documentación de las herramientas de ARN: [RNA tools](https://www.rosettacommons.org/docs/latest/application_documentation/rna/RNA-tools)). Comando de ejemplo (tras configurar las herramientas de ARN): 
```
rna_helix.py -seq ggcg cgcc -o RNA_helix.pdb -resnum E:1-4 E:20-23 -extension static.linuxgccrelease
```
(*Nota*: puede que tengas que cambiar la extensión; consulta la [documentación de las herramientas de ARN](https://www.rosettacommons.org/docs/latest/application_documentation/rna/RNA-tools#some-useful-tools_rna-modeling-utilities) para más detalles.)    

**Paso 3**: identificar las regiones en las que faltan coordenadas de ARN.  

**Paso 4**: usar DRRAFTER para construir las coordenadas de ARN que faltan y evaluar la precisión de los modelos. Las secciones siguientes describen cómo realizar este paso.  

**Paso 5**: inspeccionar visualmente al menos los 10 mejores modelos de DRRAFTER según la puntuación. Presta atención a los modelos que no encajan bien en la densidad, a los modelos de ARN construidos sobre densidad de proteína o a los modelos «distorsionados». ¡Este paso es esencial!   

##Cómo usar DRRAFTER para construir las coordenadas de ARN que faltan
Todas las ejecuciones de DRRAFTER se preparan con DRRAFTER.py. A continuación se muestra una línea de comando de ejemplo:
```
DRRAFTER.py -fasta fasta.txt -secstruct secstruct.txt -start_struct protein_and_RNA_helix_fit_into_density.pdb -map_file my_map.mrc -map_reso 7.0 -residues_to_model E:1-23 -include_as_rigid_body_structures protein_fit_into_density.pdb RNA_helix.pdb -absolute_coordinates_rigid_body_structure protein_fit_into_density.pdb -job_name my_run -dock_into_density
```
Esto creará un archivo llamado DRRAFTER_command, que contiene la línea de comando de Rosetta para ejecutar DRRAFTER. Se puede ejecutar escribiendo:
```
source ./DRRAFTER_command
```

Para obtener los mejores resultados, se deben generar al menos 2000-3000 modelos. Hay algunas herramientas para preparar trabajos en un clúster como parte de las [herramientas de ARN](https://www.rosettacommons.org/docs/latest/application_documentation/rna/RNA-tools).  
   
Los diez modelos con mejor puntuación se pueden extraer en formato PDB del archivo de salida comprimido con el siguiente comando:
```
extract_lowscore_decoys.py my_run.out 10
```
**Estos modelos deben inspeccionarse visualmente.** Consulta la sección de solución de problemas más abajo para ver posibles soluciones a los problemas.  
  
La precisión de estos modelos se puede estimar después con el siguiente comando:
```
DRRAFTER.py -final_structures my_run.out.1.pdb my_run.out.2.pdb my_run.out.3.pdb my_run.out.4.pdb my_run.out.5.pdb my_run.out.6.pdb my_run.out.7.pdb my_run.out.8.pdb my_run.out.9.pdb my_run.out.10.pdb -estimate_error
```
Esto imprimirá en la pantalla información sobre la estimación del error. El RMSD medio por pares describe la «convergencia» de la ejecución, es decir, cuánto se parecen entre sí las estructuras finales. Los valores estimados de RMSD (desviación cuadrática media) respecto a las coordenadas «verdaderas» se basan en este valor de convergencia. El RMSD mínimo estimado predice la mejor precisión de las estructuras finales. El RMSD medio estimado predice la precisión media, en términos de RMSD, de las estructuras finales. La estructura mediana es la estructura final con el RMSD medio por pares más bajo respecto a las demás estructuras finales. La estimación de precisión de este modelo también se imprime en la pantalla. Todos los números están en unidades de Å.  

**Además, abre estas estructuras en PyMOL o Chimera para evaluar visualmente la convergencia del modelado.**

##Entradas y opciones de DRRAFTER

####`-h`

Imprime un mensaje de ayuda con todas las opciones de `DRRAFTER.py`. Estas opciones también se describen a continuación.

####`-fasta`

Obligatoria para preparar una ejecución de DRRAFTER. Es un archivo en formato FASTA de tu sistema. Debe incluir todos los residuos de proteína y de ARN. Los residuos de proteína se indican con códigos de una letra en mayúscula. Los residuos de ARN se indican con códigos de una letra en minúscula («a», «u», «g» y «c»). **¡Las proteínas deben aparecer antes que el ARN!**  
  
*Ejemplo:*  
```
>DRRAFTER_demo_1wsu  A:136-258 E:1-23
SETQKKLLKDLEDKYRVSRWQPPSFKEVAGSFNLDPSELEELLHYLVREGVLVKINDEFYWHRQALGEAREVIKNLASTGPFGLAEARDALGSSRKYVLPLLEYLDQVKFTRRVGDKRVVVGN
ggcguugccggucuggcaacgcc
```

####`-secstruct` 

Obligatoria para preparar una ejecución de DRRAFTER. Un archivo con la estructura secundaria del complejo en notación de puntos y paréntesis (dot-bracket). La estructura secundaria de la proteína debe indicarse con puntos. La estructura secundaria debe tener la misma longitud que la secuencia del archivo fasta. Para los residuos de ARN, esta estructura secundaria se impondrá durante la ejecución de DRRAFTER. Las estructuras secundarias de ARN se pueden predecir computacionalmente con paquetes como [ViennaRNA](https://www.tbi.univie.ac.at/RNA/). Si no se conoce la estructura secundaria, puede ser necesario probar varias estructuras secundarias distintas en trabajos de DRRAFTER separados (o, idealmente, determinar la estructura secundaria mediante experimentos bioquímicos).
  
*Ejemplo:*  
```
...........................................................................................................................(((((((((.....)))))))))
```
####`-rosetta_directory`
La ruta de los ejecutables de Rosetta. No es necesaria si la ubicación de los ejecutables de Rosetta está en tu PATH.
  
*Ejemplo:*  
/home/src/Rosetta/main/source/bin/  

####`-start_struct`
Es un único archivo PDB que contiene todas las estructuras de proteína y de ARN que se han ajustado al mapa de densidad (pasos 1-2 del flujo de trabajo de DRRAFTER, arriba). Para obtener los mejores resultados, debe contener todas las estructuras de proteína que quieras modelar. Esta estructura proporciona las coordenadas de partida de la ejecución de DRRAFTER.

####`-residues_to_model`
Los residuos de ARN que se deben modelar en la ejecución de DRRAFTER. Debe incluir cualquier hélice de ARN que hayas ajustado a la densidad y a la que quieras permitir moverse durante la ejecución.  

*Ejemplo:*  
A:1-10  
Esto significaría que se construirán los residuos 1-10 de la cadena A.

####`-map_file`
Obligatoria para preparar una ejecución de DRRAFTER. El archivo del mapa de densidad en formato mrc o ccp4.

####`-map_reso`
Obligatoria para preparar una ejecución de DRRAFTER. La resolución del mapa.  

####`-include_as_rigid_body_structures`
Esta opción toma una lista de archivos PDB que deben tratarse como cuerpos rígidos durante la ejecución de DRRAFTER. Cada una de las hélices de ARN que se ajustaron a la densidad y que están en la región que se está construyendo debe proporcionarse como un archivo separado. Las estructuras de proteína a las que se debe permitir hacer docking durante la ejecución también deben proporcionarse aquí, de nuevo como archivos separados. Cada una de estas estructuras también debe estar presente en el archivo `-start_struct`.  

####`-absolute_coordinates_rigid_body_structure`
Este argumento opcional toma un único archivo PDB. Debe ser una de las estructuras que se proporcionan a la opción `-include_as_rigid_body_structures`. Establecerá el marco de coordenadas absoluto del sistema. Si no se especifica `-dock_into_density`, esta estructura no se moverá de su posición inicial. ¡Esta estructura debe estar ajustada al mapa de densidad! Si no se proporciona ninguna estructura como `-include_as_rigid_body_structures`, esta opción puede omitirse.

####`-constrain_rigid_bodies_only`
Para las restricciones de coordenadas, solo restringe los residuos de `-include_as_rigid_body_structures`. Por defecto, se colocarán restricciones de coordenadas que penalizan desviaciones de más de 10 Å en todos los residuos de `-start_struct`. Esta tolerancia de distancia se puede controlar con `-cst_dist`. Las restricciones se pueden desactivar con `-no_csts`.

####`-no_csts`
Desactiva las restricciones de coordenadas de la ejecución.

####`-cst_dist`
La tolerancia de distancia para las restricciones de coordenadas. Las desviaciones mayores que esta distancia se penalizarán. Predeterminado: 10 Å.

####`-ref_pdb_for_coord_csts`
Una estructura de referencia opcional para las restricciones de coordenadas. Si no se proporciona, las restricciones de coordenadas se basarán en `-start_struct`.

####`-dock_into_density`
Esta opción activa los movimientos de docking de todos los `-include_as_rigid_body_structures`, incluida la absolute_coordinates_rigid_body_structure. Esta opción no debe activarse si no se especifica `-absolute_coordinates_rigid_body_structure`.

####`-no_dock_each_rigid_body_separately`
Esta opción cambia la forma en que se configura la cinemática de la ejecución. Sin esta opción, a cada una de las estructuras proporcionadas como -include_as_rigid_body_structures (posiblemente con la excepción de `-absolute_coordinates_rigid_body_structure` si no se especifica `-dock_into_density`) se le permitirá moverse como un cuerpo rígido durante la ejecución. Con esta opción, las estructuras pasadas a `-include_as_rigid_body_structures` dentro de la misma cadena no se someterán a movimientos de docking. Si no se especifica esta opción, todos los `-include_as_rigid_body_structures` (incluidas todas las hélices de ARN) deben estar presentes en `-start_struct`.

####`-no_initial_structures`
No inicia la ejecución desde la estructura proporcionada en `-start_struct`.

####`-cycles`
El número de ciclos de Monte Carlo que se ejecutarán. Si no se especifica un valor, el número de ciclos se determinará según el número de residuos de ARN que se están modelando.

####`-docking_move_size`
Un número entre 0.0 y 1.0 que controla la magnitud de los movimientos de docking durante la ejecución de DRRAFTER. 0.0 corresponde a los movimientos de docking menos agresivos y 1.0 a los más agresivos.

####`-include_residues_around`
Residuos (p. ej., A:1-5 B:2) que deben incluirse en la ejecución de DRRAFTER; no tienen por qué ser residuos de `-residues_to_model`. También se incluirán otros residuos situados dentro de `-dist_cutoff` de estos residuos.

####`-dist_cutoff`
Predeterminado: 20 Å. Se incluirán en la ejecución de DRRAFTER los residuos de la estructura de partida que estén dentro de este umbral de distancia respecto a los residuos de `-include_as_rigid_body_structures` o a los residuos indicados en `-include_residues_around`.

####`-extra_flags`
Opciones adicionales que se aplicarán durante la ejecución de DRRAFTER. Se puede indicar cualquiera de las opciones disponibles para `rna_denovo` (consulta la documentación [aquí](https://www.rosettacommons.org/docs/latest/application_documentation/rna/rna-denovo#options)).  
Esta opción se puede usar junto con `'nstruct'` para establecer el número de estructuras que se construyen por trabajo de DRRAFTER (predeterminado=500 en trabajos normales, predeterminado=10 cuando se indica la opción `-demo_setting`). Por ejemplo, lo siguiente establece en 2000 el número de estructuras construidas por trabajo de DRRAFTER: `-extra_flags 'nstruct 2000'`.

####`-job_name`
El nombre de tu trabajo. Determina los nombres de los archivos de salida.

####`-demo_setting`
Activa configuraciones para que la demo se ejecute rápidamente. Esta opción NO debe usarse en ejecuciones reales.

####`-estimate_error`
Ejecuta un cálculo de estimación del error. Si se especifica esta opción, también debe proporcionarse `-final_structures`.

####`-final_structures`
Debe ser una lista de (idealmente diez) modelos finales de DRRAFTER en formato PDB para la estimación del error. Normalmente, deben ser los diez modelos de DRRAFTER con mejor puntuación.

##Solución de problemas

**Problema:** se están construyendo coordenadas de ARN en una densidad que creo que pertenece a una proteína (¡pero no tengo una estructura de esa proteína!).  
**Solución:** segmenta tu mapa de densidad: elimina la densidad de las regiones en las que no quieres construir coordenadas de ARN. Esto se puede hacer en Chimera.
  
**Problema:** se están construyendo coordenadas de ARN en una densidad que sé que pertenece a una proteína (¡incluso ajusté una estructura de proteína al mapa de densidad!).   
**Solución:** para minimizar el coste computacional, se eliminan los residuos de proteína que no están cerca de la región en la que se construyen las coordenadas de ARN que faltan. Si las coordenadas de ARN acaban construyéndose en la densidad de estos residuos de proteína eliminados, hay varias soluciones posibles:
* Cambia el valor de -dist_cutoff. Por defecto es 20 Å, lo que significa que se eliminarán los residuos que estén a más de 20 Å de los residuos de ARN que se están modelando (proporcionados en -start_struct) o de los residuos indicados en -include_residues_around. Esto no se aplica a los residuos de -include_as_rigid_body_structures.
* Incluye la estructura completa de la proteína en -include_as_rigid_body_structures. Así se garantiza que no se elimine ningún residuo de la proteína. 
* Prueba a especificar más residuos en -include_residues_around. Los residuos que estén dentro de -dist_cutoff de los residuos especificados se conservarán durante la ejecución de DRRAFTER.  
  
**Problema:** al ejecutar `DRRAFTER.py` obtengo un error que dice que mi secuencia y mi estructura secundaria no tienen la misma longitud.  
**Solución:** `DRRAFTER.py` lee todos los caracteres `(`, `)`, `[`, `]`, `{` y `}` de tu archivo de estructura secundaria (a diferencia de `rna_denovo`, que solo lee la primera línea del archivo). Revisa tu archivo de estructura secundaria para asegurarte de que contenga ÚNICAMENTE la estructura secundaria exacta de tu complejo. Recuerda también que debes especificar la «estructura secundaria» de los residuos de proteína (usa simplemente puntos).