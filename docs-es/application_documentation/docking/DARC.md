# DARC

# Metadatos
Autor: Ragul Gowthaman (ragul@ku.edu)

Este documento fue actualizado por última vez el 28 de mayo de 2015 por Ragul Gowthaman.
 
El investigador principal correspondiente es John Karanicolas (johnk@ku.edu).

[[_TOC_]]

# DARC

## Referencias

Gowthaman R*, Miller SA*, Rogers S, Khowsathit J, Johnson DK, Liu C, Xu L, Anbanandam A, Aubé J, Roy A, and Karanicolas J. (2015). DARC: mapping surface topography by ray-casting for effective virtual screening at protein interaction sites. (in review)
*Los autores contribuyeron por igual

Gowthaman R, Lyskov S, and Karanicolas J. (2015). DARC 2.0 : Improved docking and virtual screening at protein interaction sites. (in review)

Khar KR, Goldschmidt L, Karanicolas J (2013) Fast Docking on Graphics Processing Units via Ray-Casting. PLoS ONE 8(8): e70661. doi:10.1371/journal.pone.0070661

## Instrucciones para ejecutar el protocolo DARC

Docking Approach using Ray Casting (DARC) es un método computacional basado en estructura 
para realizar cribado virtual mediante el docking de moléculas pequeñas en bolsillos de la superficie de proteínas. 
En esta demostración, DARC se usa para acoplar una molécula pequeña en un bolsillo centrado en el residuo 61 
de la proteína, la ubiquitina-proteína ligasa E3 Mdm2 (PDB:4ERF). 

## Generación de los archivos de entrada

### Archivos de la proteína

4ERF.pdb se descargó del Protein Data Bank. Elimina el agua, el ligando y cualquier otro HETATM 
presente en la proteína, y elimina las cadenas redundantes. Aunque Rosetta construirá sobre la marcha, antes de usarlos, 
los átomos que falten, incluidos los hidrógenos, en los archivos PDB de proteína de entrada, necesitamos preparar 
la proteína para generar la cuadrícula del potencial electrostático. 
Esta es una forma de volcar la proteína después de construir los átomos que faltan y agregar los hidrógenos:
`$ Rosetta/main/source/bin/score.linuxgccrelease -in:file:s 4ERF.pdb -out:output -no_optH false`
que da como salida la proteína 4ERF_0001.pdb

### Archivos del ligando

Los archivos de entrada están incluidos en la carpeta inputs, pero a continuación se explica 
cómo se obtuvieron o generaron. 4ERF.pdb se descargó del Protein Data Bank.
La molécula pequeña usada para el docking se encontró en ZINC, la base de datos de compuestos 
disponibles comercialmente en [[http://zinc.docking.org/]]. Descargamos ZINC13989607 en formato mol2. 
El nombre del archivo es zinc_13989607.mol2

Como las cargas asignadas a los átomos son las mismas para todos los confórmeros, es rápido asignar las cargas antes de generar los confórmeros. 
Las cargas se agregaron al compuesto con el programa molcharge de OpenEye 
[[http://www.eyesopen.com/]] con el siguiente comando:

```
$ OpenEye/bin/molcharge -in zinc_13989607.mol2 -out zinc_13989607_charged.mol2 -method am1bccsym
```

Si tienes el compuesto en formato SMILES 2D, primero conviértelo a formato 3D y luego agrega las cargas.
Puedes usar openbabel o un programa de OpenEye para convertir del formato SMILES al formato mol2

```
$ OpenEye/bin/omega2 -in zinc_13989607_charged.mol2 -out zinc_13989607_conformers.mol2 -maxconfs 100
```

Luego necesitamos generar los archivos de parámetros del compuesto para usarlos en Rosetta.
Guarda los nombres de los compuestos en un archivo de texto para generar los parámetros. A continuación, los archivos de parámetros de los compuestos se generan con batch_molfile_to_params.py, que es una aplicación de python de Rosetta. El comando para generar los archivos de parámetros es:

```
$ echo zinc_13989607_conformers.mol2 > molfile_list.txt
```

```
$ Rosetta/main/source/scripts/python/public/batch_molfile_to_params.py -d Rosetta/main/database --script_path=Rosetta/main/source/scripts/python/public/molfile_to_params.py molfile_list.txt
```

Los archivos de salida son
params/zinc_13989607_conformers/000_conformers.pdb
params/zinc_13989607_conformers/000.params

## Otros archivos de entrada para DARC

Para ejecutar DARC necesitamos generar un archivo RAY para la proteína de entrada. Para generar este archivo ray necesitamos dar la proteína en formato PDB y especificar un residuo objetivo en la interfaz. Podemos especificar más de un residuo en la interfaz. El comando para ejecutar DARC es el siguiente:

```
$ Rosetta/main/source/bin/make_ray_files.macosclangrelease -database Rosetta/main/database/ -protein 4ERF_0001.pdb -central_relax_pdb_num 61 -darc_shape_only -round_pocketGrid_center false -pocket_static_grid true
```

La salida de este comando será un archivo ray llamado “ray_4ERF_0001_61.txt”.

Para usar el centro de masa de cualquier residuo como puntos de origen para lanzar rayos:

```
$ Rosetta/main/source/bin/make_ray_files.macosclangrelease -database Rosetta/main/database/ -pocket_static_grid -protein 4ERF_0001.pdb -central_relax_pdb_num 61 -darc_shape_only -set_origin 5 -origin_res_num 85:A
```

salida : ray_4ERF_0001_61.txt

Para usar múltiples puntos de origen para lanzar rayos:

```
$ Rosetta/main/source/bin/make_ray_files.macosclangrelease -database Rosetta/main/database/ -pocket_static_grid -protein 4ERF_0001.pdb -central_relax_pdb_num 61 -darc_shape_only -set_origin 5 -origin_res_num 85:A -multiple_origin
```

salida : ray_4ERF_0001_61,54.txt

Para usar un ligando unido para centrar la cuadrícula:

```
$ Rosetta/main/source/bin/make_ray_files.macosclangrelease -database Rosetta/main/database/ -pocket_static_grid -protein 4ERF_0001.pdb -central_relax_pdb_num 61 -darc_shape_only -set_origin 5 -origin_res_num 85:A -bound_ligand 4ERF_XTL_0001.pdb -extra_res_fa 4ERF_XTL.params -lig_grid
```

salida : ray_4ERF_0001_61.txt

Para incluir cálculos de electrostática:

Para los cálculos de electrostática, primero necesitamos cambiar el tamaño de la cuadrícula del potencial electrostático (generada con openeye '4ERF.agd') para que coincida con el tamaño de la cuadrícula del bolsillo de la interfaz. Este paso se puede realizar al generar el archivo ray.

Para generar la cuadrícula del potencial electrostático, podemos usar los ejemplos de Listings que se proporcionan en el manual del kit de herramientas zap.

```
$ OpenEye/bin/Listing_2 -in 4ERF_0001.pdb -out 4ERF.agd -buffer 2 -grid_spacing 0.5 -epsout 80 -epsin 1
```

salida : 4ERF.agd

```
$ Rosetta/main/source/bin/make_ray_files.macosclangrelease -database Rosetta/main/database/ -pocket_static_grid -protein 4ERF_0001.pdb -central_relax_pdb_num 61,54 -set_origin 5 -origin_res_num 85:A -multiple_origin -bound_ligand 4ERF_XTL_0001.pdb -extra_res_fa 4ERF_XTL.params -lig_grid -espGrid_file 4ERF.agd
```

salida : ray_4ERF_0001_61,54.txt
salida : DARC_4ERF.agd

La salida de este comando será un archivo ray llamado “ray_4ERF_0001_61,54.txt” y un archivo de cuadrícula del potencial electrostático llamado “DARC_4ERF.agd”, que usamos como entrada para ejecutar el docking con DARC. 
 
## Ejecución de DARC

En el segundo paso ejecutamos realmente los cálculos de docking usando el archivo ray generado previamente. Llama a DARC para ejecutar los cálculos de docking usando el archivo ray generado previamente y la cuadrícula del potencial electrostático correspondiente. Usa la opción -num_particles para aumentar o disminuir el muestreo. Un número alto de partículas tardará más en terminar. 
Para obtener los mejores resultados, sugerimos al menos 100 partículas y 100 ejecuciones para acoplar un solo confórmero o para el docking iterativo (uno por uno) de confórmeros del ligando. Para el muestreo sobre la marcha de confórmeros del ligando sugerimos al menos 500 partículas y 500 ejecuciones. Aquí damos los ligandos de entrada para cribarlos contra el archivo ray, de la siguiente manera: 

Para acoplar un solo confórmero del ligando:

```
$  Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 4ERF_XTL_0001.pdb -extra_res_fa 4ERF_XTL.params -ray_file ray_4ERF_0001_61.txt -espGrid_file DARC_4ERF_0001.agd
```

Para acoplar múltiples confórmeros del ligando:

```
$  Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 000_conformers.pdb -extra_res_fa 000.params -ray_file ray_4ERF_0001_61.txt -espGrid_file DARC_4ERF_0001.agd
```

Para ejecutar DARC solo con forma (sin incluir la puntuación de electrostática):

```
$  Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 000_conformers.pdb -extra_res_fa 000.params -ray_file ray_4ERF_0001_61.txt -espGrid_file -darc_shape_only
```

Para buscar confórmeros sobre la marcha:

```
$  Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 000_conformers.pdb -extra_res_fa 000.params -ray_file ray_4ERF_0001_61.txt -espGrid_file DARC_4ERF_0001.agd -search_conformers true
```

La salida de la ejecución de DARC es un modelo acoplado del complejo proteína-ligando llamado “DARC_4ERF_0001_000.pdb”

Para minimizar el modelo acoplado:
Podemos hacer la minimización de todos los átomos de los modelos de DARC por separado en Rosetta o como opción adicional al ejecutar el propio DARC. Para minimizar los modelos de DARC inmediatamente después del docking agregamos la opción “-minimize_output_complex”:

```
$  Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 000_conformers.pdb -extra_res_fa 000.params -ray_file ray_4ERF_0001_61.txt -espGrid_file DARC_4ERF_0001.agd -minimize_output_complex
```

## Otras opciones de DARC

```
-use_connolly_surface   : use this flag to make ray files with connolly surface insted of pocketshell generated by pocketgrid

-num_particles          : set the number of particles used durin particle swarm optimization

-num_runs		: set the number of particles used durin particle swarm optimization

-missing_point_weight	: weight for rays misses the pocket

-steric_weight		: weight for rays missesthe ligand

-extra_point_weight	: weight for ligand moves away from the pocket

-esp_weight 		: electrostatics weight

-pocket_static_grid 	: no autoexpansion of the pocket grid (set ON for DARC)
```

## Ejemplo: comandos para una ejecución de muestra de DARC con la proteína MDM2 PDB:[[4ERF|http://www.rcsb.org/pdb/explore/explore.do?structureId=4ERF]]

```
$ cd run_dir
```

Copia 4ERF.pdb, 000_conformers.pdb, 000.params, 4ERF.agd, DARC_4ERF.agd, 4ERF_0001.pdb, 4ERF_XTL_0001.pdb y 4ERF_XTL.params en run_dir. 
Ejecuta DARC con el siguiente comando:

DARC SOLO FORMA:

```
$ Rosetta/main/source/bin/score.linuxgccrelease -in:file:s 4ERF.pdb -out:output -no_optH false
$ Rosetta/main/source/bin/make_ray_files.macosclangrelease -pocket_static_grid -protein 4ERF_0001.pdb -central_relax_pdb_num 61 -darc_shape_only
$ Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 4ERF_XTL_0001.pdb -extra_res_fa 4ERF_XTL.params -ray_file ray_4ERF_0001_61.txt -darc_shape_only -num_particles 50 -num_runs 50
```

DARC FORMA Y ELECTROSTÁTICA:

`$ Rosetta/main/source/bin/make_ray_files.macosclangrelease -pocket_static_grid -protein 4ERF_0001.pdb -central_relax_pdb_num 61 -espGrid_file 4ERF.agd
$ Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 4ERF_XTL_0001.pdb -extra_res_fa 4ERF_XTL.params -ray_file ray_4ERF_0001_61.txt -espGrid_file DARC_4ERF.agd -num_particles 50 -num_runs 50`

DARC MUESTREANDO CONFÓRMEROS SOBRE LA MARCHA:

`$ Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 000_conformers.pdb -extra_res_fa 000.params -ray_file ray_4ERF_0001_61.txt -espGrid_file DARC_4ERF.agd -num_particles 500 -num_runs 500 -search conformers true`

DARC MUESTREANDO CONFÓRMEROS ITERATIVAMENTE UNO POR UNO:

`$ Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 000_conformers.pdb -extra_res_fa 000.params -ray_file ray_4ERF_0001_61.txt -espGrid_file DARC_4ERF.agd -num_particles 500 -num_runs 500 -search conformers false`

## Ejecución de DARC en la GPU

DARC está adaptado para ejecutarse en sistemas con GPU. En promedio, ejecutar DARC en un sistema con GPU es 190 veces más rápido que ejecutarlo en CPU.
Los resultados de DARC ejecutado en sistemas con CPU y con GPU deben ser los mismos (con la misma entrada y una semilla constante). 

Primero asegúrate de haber compilado Rosetta con la opción 'extras=opencl' para ejecutar en sistemas con GPU

```
$ cd Rosetta/main/source
$ ./scons.py mode=release extras=opencl bin
```

Luego usa los ejecutables opencl en lugar de los ejecutables por defecto, con la opción '-gpu 1', es decir, llama a DARC.opencl.macosclangrelease 
en lugar de DARC.macosclangrelease. Todas las demás opciones son las mismas que en CPU.
Este es un ejemplo de comando para GPU:

```
$ Rosetta/main/source/bin/score.opencl.linuxgccrelease -in:file:s 4ERF.pdb -out:output -no_optH false -gpu 1
$ Rosetta/main/source/bin/make_ray_files.opencl.macosclangrelease -pocket_static_grid -protein 4ERF_0001.pdb -central_relax_pdb_num 61 -darc_shape_only -gpu 1
$ Rosetta/main/source/bin/DARC.opencl.macosclangrelease -protein 4ERF_0001.pdb -ligand 000_conformers.pdb -extra_res_fa 000.params -ray_file ray_4ERF_0001_61.txt -darc_shape_only -gpu 1 -num_particles 500 -num_runs 500 -search_conformers true
```


Archivos de salida:

La ejecución de DARC producirá este archivo de salida:
DARC_4ERF_0001_LG1.pdb es la Pose acoplada final para un solo confórmero.
DARC_4ERF_0001_000.pdb es la Pose acoplada final para múltiples confórmeros.


## Análisis de los resultados

Ejecuta:
```
$ Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 4ERF_XTL_0001.pdb -extra_res_fa 4ERF_XTL.params -ray_file ray_4ERF_0001_61.txt -espGrid_file DARC_4ERF.agd -num_particles 10 -num_runs 10
```

La salida debería verse similar a esta:

```
core.init: Rosetta version 1e0e3a1462814b2fa93580e9e1b1f7ab81736efc 2014-11-19 15:22:07 -0600 from git@github.com:RosettaCommons/main.git

core.init: command: /Users/ragul/Rosetta/main/source/bin/DARC.macosclangrelease -protein 4ERF_0001.pdb -ligand 4ERF_XTL_0001.pdb -extra_res_fa 4ERF_XTL.params -ray_file ray_4ERF_0001_61.txt -espGrid_file DARC_4ERF.agd -num_particles 10 -num_runs 10

core.init: 'RNG device' seed mode, using '/dev/urandom', seed=590325598 seed_offset=0 real_seed=590325598

core.init.random: RandomGenerator:init: Normal mode, seed=590325598 RG_type=mt19937

core.init: Resolved executable path: /Users/ragul/Rosetta/main/source/bin/DARC.macosclangrelease

core.init: Looking for database based on location of executable: /Users/ragul/Rosetta/main/database/
core.chemical.ResidueTypeSet: Finished initializing fa_standard residue type set.  Created 738 residue types
core.pack.task: Packer task: initialize from command line() 

origin_space : 7.25

Reading ligand 4ERF_XTL_0001.pdb

core.pack.task: Packer task: initialize from command line()
 
Starting PSO

Time for DARC runs: 0.589119

SCORES : 4ERF_0001_LG1	Conformer 1 has DARC Score : 4.29993
```

En este caso, la puntuación de DARC de la Pose acoplada final es 4.29993. Esta puntuación se puede usar para comparar con otros ligandos que se acoplen con el mismo archivo ray. Cuanto menor sea la puntuación, mejor será la coincidencia entre el bolsillo de la proteína y el ligando. 'DARC_4ERF_0001_LG1.pdb' es el archivo de salida que contiene la Pose acoplada final para un solo confórmero.

Si usamos la opción '-minimize_output_complex', el modelo se minimizará y obtendremos como salida el archivo 'mini_4ERF_0001_LG1.pdb'.

NOTA: Para obtener los mejores resultados, usa siempre las siguientes opciones al llamar a la aplicación make_ray_files:
-pocket_static_grid true
-round_pocketGrid_center false

##Véase también

* [[Aplicaciones de docking|Docking Applications]]: Página principal de las aplicaciones de docking
* [[Preparing ligands]]: Notas sobre la preparación de ligandos para usarlos en Rosetta
* [[Non-protein residues]]: Notas sobre el uso de moléculas que no son proteínas con Rosetta
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[RosettaScripts]]: Página principal de la interfaz RosettaScripts de Rosetta
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comandos de ejemplo para ejecutar archivos ejecutables de Rosetta
