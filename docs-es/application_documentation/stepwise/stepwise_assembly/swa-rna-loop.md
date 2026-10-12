#Modelado de loops de RNA (problema de llave y cerradura) con ensamblaje stepwise

Metadatos
========

Autores: Parin Sripakdeevong, Rhiju Das

Marzo de 2012, por Parin Sripakdeevong (sripakpa [at] stanford.edu) y Rhiju Das (rhiju [at] stanford.edu).

Código y demo
=============

Este código construye loops de RNA de cadena sencilla con un método de muestreo enumerativo y determinista llamado ensamblaje stepwise. En `       rosetta/demos/public/SWA_RNA_Loop/      ` hay un ejemplo de demo para construir el primer nucleótido (el más 5') de un loop de 6 nucleótidos. Después se puede aplicar recursivamente el mismo protocolo para construir los demás nucleótidos del loop, uno por uno.

(Nota: el método de ensamblaje stepwise construye loops de RNA de longitud completa mediante la construcción recursiva de cada nucleótido de RNA en varios pasos. La naturaleza enumerativa del método hace que el cálculo completo sea costoso computacionalmente; por ejemplo, requiere 15,000 horas de CPU para construir un único loop de RNA de 6 nucleótidos. Aunque este cálculo completo ya es factible en clústeres de computación de alto rendimiento, realizarlo en la demo sería excesivo.)

Los códigos centrales están en la carpeta `       src/protocols/swa_rna/      `. Las aplicaciones están en *apps/public/swa\_rna\_main* y *apps/public/swa\_rna\_util*

Referencias
==========

Sripakdeevong, P., Kladwang, W. & Das, R. (2012), “An enumerative stepwise ansatz enables atomic-accuracy RNA loop modeling”, Proc Natl Acad Sci USA. doi:10.1073/pnas.1106516108

Propósito de la aplicación
===========================================

Este método construye loops de RNA de cadena sencilla con un método de muestreo enumerativo y determinista llamado ensamblaje stepwise. La situación de modelado que se considera aquí es el problema de llave y cerradura. Dado un PDB de plantilla que contiene los nucleótidos que rodean a un loop de RNA ausente, el método de ensamblaje stepwise encuentra la conformación del loop (la llave) que mejor se ajusta a la estructura circundante (la cerradura).

Limitaciones
===========

-   La naturaleza enumerativa del método hace que el cálculo completo sea bastante costoso computacionalmente; por ejemplo, requiere 15,000 horas de CPU para construir un único loop de RNA de 6 nucleótidos. Por eso es inviable realizar el cálculo completo en un computador de escritorio o portátil. En cambio, el cálculo completo solo es factible en clústeres de computación de alto rendimiento.

-   El loop de RNA ausente debe ser de cadena sencilla. El loop más largo probado con éxito hasta ahora tiene 10 nucleótidos de longitud (consulta el artículo citado para más detalles).

-   Actualmente, el método solo optimiza la conformación del loop de RNA ausente. Las coordenadas de los nucleótidos circundantes heredadas de [template\_PDB](#Required-file) se mantienen fijas durante todo el proceso de modelado.

-   Por limitaciones de memoria, la estructura de longitud completa no debe superar los 100 nucleótidos [esto incluye los nucleótidos circundantes heredados de [template\_PDB](#Required-file).

Modos
=====

Por ahora solo hay un modo de ejecutar SWA\_RNA\_Loop.

Archivos de entrada
===========

Archivos requeridos
-------------

Necesitas dos archivos:

-   El archivo template\_PDB: un archivo PDB con las coordenadas de los nucleótidos circundantes en la vecindad del loop de RNA ausente que se va a construir. Recomendamos incluir todos los nucleótidos circundantes dentro de una vecindad de 10 Angstroms del loop de RNA ausente. Hay un ejemplo en rosetta/demos/SWA\_RNA\_loop/rosetta\_inputs/template.pdb. El archivo PDB debe estar en el formato PDB de RNA de Rosetta (consulta la nota sobre el formato PDB para RNA).

-   El [[archivo fasta|fasta file]]: es el archivo de secuencia del RNA de longitud completa. El archivo fasta tiene el nombre del RNA en la primera línea (después de \>) y la secuencia en la segunda. Las letras válidas son a, c, g y u. Hay un archivo fasta de ejemplo en rosetta/demos/SWA\_RNA\_loop/rosetta\_inputs/fasta.

Archivos adicionales:
-----------------

-   El archivo native\_PDB: un archivo PDB con la estructura 'nativa' cristalográfica o de RMN. Este archivo PDB debe contener las coordenadas de los nucleótidos del loop nativo más las de los nucleótidos circundantes heredados de [template\_PDB](#Required-file). El archivo native\_PDB no se usa para guiar el proceso de modelado, solo para informar del RMSD de los modelos de Rosetta generados respecto del loop nativo. Hay un ejemplo en rosetta/demos/SWA\_RNA\_loop/rosetta\_inputs/native.pdb. El archivo PDB debe estar en el formato PDB de RNA de Rosetta (consulta la nota sobre el formato PDB para RNA).

Preprocesamiento de los archivos de entrada
============================

El archivo PDB de entrada se puede convertir al formato PDB de RNA de Rosetta con el siguiente comando:

```
    rosetta/tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_make_rna_rosetta_ready.py IN_PDB.pdb -output_pdb OUT_PDB.pdb
```

Reemplaza 'IN\_PDB.pdb' por el nombre de tu archivo PDB de entrada. Reemplaza 'OUT\_PDB.pdb' por el nombre del archivo en el que quieres que se guarde el PDB convertido.

Cómo ejecutar el trabajo
==================

El paquete SWA\_RNA\_python, ubicado en rosetta/tools/SWA\_RNA\_python/, contiene los scripts necesarios para preparar y ejecutar el protocolo de ensamblaje stepwise. Las instrucciones se dan en los pasos 1)-4) siguientes:

1) Especifica la ubicación de la carpeta bin de Rosetta y de la carpeta de la base de datos de Rosetta editando tu .bashrc o .bash\_profile con una línea como:

```
export ROSETTA='~/rosetta/'
```

2) Añade la ubicación del paquete SWA\_RNA\_python al PYTHON path. Para los usuarios del shell bash, la ubicación se puede añadir directamente al archivo \~/.bashrc:

```
    export PYTHONPATH=$PYTHONPATH:~/rosetta/tools/SWA_RNA_python/
```

3) Una vez especificadas correctamente las rutas, se usa el siguiente comando para preparar todo lo necesario para ejecutar el trabajo de ensamblaje stepwise:

```
    rosetta/tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/setup_SWA_RNA_dag_job_files.py -s template.pdb -fasta fasta -sample_res 3-8 -single_stranded_loop_mode True -local_demo True -native_pdb native.pdb
```

```
    The "-s" flag specifies the template_PDB file
    The "-fasta" flag specifies the @ref fasta file
    The "-sample_res" flag specifies the sequence number of nucleotides in the missing loop. For example, 3-8 means that the missing loop nucleotides are located at sequence position 3 4 5 6 7 and 8.
    The "-single_stranded_loop_mode" flag specifies that the job involve modeling a single-stranded loop (i.e. the lock-and-key problem).
    The "-local_demo" flag indicate that this is demo to be run on a local laptop or desktop. The calculation perform here is to only build the first (5' most) nucleotide of the 6-nucleotides RNA loop.
    The "-native_pdb" flag specifies the native_PDB file and is optional.
```

4) Escribe "source LOCAL\_DEMO" para ejecutar el protocolo de Rosetta.

Las instrucciones anteriores permiten al usuario construir el primer nucleótido (el más 5') de un loop de N nucleótidos. Como ya se dijo, el cálculo completo para construir loops de RNA de longitud completa es bastante costoso computacionalmente y queda fuera del alcance de esta documentación. Sin embargo, el paquete SWA\_RNA\_python está preparado para ejecutar este cálculo completo recursivo en clústeres de computación de alto rendimiento. El paquete emplea un concepto familiar del marco de grafo acíclico dirigido de Map/Reduce para ordenar los pasos del cálculo y asignar recursos para construir recursivamente el loop de RNA de longitud completa en varios pasos, un nucleótido de RNA cada vez. Si algún usuario está interesado, contacta con Parin Sripakdeevong (sripakpa [at] stanford.edu) y con gusto daremos instrucciones adicionales.

Salidas esperadas
================

Las salidas esperadas son dos silent\_files:

```
    A) region_0_1_sample.out: This silent_file contain 108 structures, corresponding to the 108 lowest energy conformations.
    B) region_0_1_sample.cluster.out: Same as A) but after clustering of the models to remove redundant conformations.
```

Posprocesamiento
===============

En ambos silent\_files, la puntuación de energía total está en la columna 'score'. Si se incluyó la opción "native\_pdb", el RMSD (en angstroms) entre el native\_pdb y cada modelo de Rosetta está en la columna 'NAT\_rmsd'.

Por último, usa el siguiente comando para extraer los centros de los 5 clústeres de menor energía:

```
    rosetta/tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_extract_pdb.py -tag S_0 S_1 S_2 S_3 S_4  -silent_file region_0_1_sample.cluster.out
```

Tras ejecutar el comando, los archivos PDB extraídos deberían aparecer en el subdirectorio pose\_region\_0\_1\_sample.cluster.out/.

Novedades desde la última versión
=============================

Esta aplicación es nueva desde Rosetta 3.4.

* [[Modelado de loops de proteínas con ensamblaje stepwise|swa-protein-main]]
  * [[Más información sobre el flujo de trabajo de esta aplicación|swa-protein-long-loop]]
* [[Aplicación Stepwise MonteCarlo|stepwise]]
* [[Visión general de las clases de Stepwise|stepwise-classes-overview]]
* [[Structure prediction applications]]: Incluye enlaces a estas y otras aplicaciones de modelado de loops
* [[RNA applications]]: Aplicaciones para usar con RNA o con RNA y proteínas
* [[RNA]]: Más información sobre cómo trabajar con RNA en Rosetta
* [[RosettaScripts]]: La página de inicio de RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
