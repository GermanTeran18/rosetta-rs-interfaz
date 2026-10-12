#Documentación de la aplicación doug\_dock\_design\_min\_mod2\_cal\_cal

Metadatos
========

Autor: P. Douglas Renfrew (renfrew@nyu.edu)

La documentación se actualizó por última vez en diciembre de 2011, por Doug Renfrew (renfrew@nyu.edu). El investigador principal de esta aplicación es Brian Kuhlman (bkuhlman@email.unc.edu).

Código y demo
=============

El mover principal se encuentra en el código de la aplicación en `       rosetta/main/source/src/apps/public/scenarios/doug_dock_design_min_mod2_cal_cal.cc      ` . Las pruebas de integración se encuentran en `       rosetta/main/tests/integration/tests/doug_dock_design_min_mod2_cal_cal/      ` . La demo se encuentra en `       rosetta/demos/public/doug_dock_design_min_mod2_cal_cal/      ` .

Referencias
==========

P. Douglas Renfrew, Eun Jung Choi, Brian Kuhlman, "Using Noncanonical Amino Acids in Computational Protein-Peptide Interface Design" (2011) PLoS One.

Propósito
===========================================

El protocolo DougsDockDesignMinimize (DDDM) se usó en el manuscrito que lo acompaña para rediseñar la interfaz proteína/péptido de la calpaína y un fragmento de su péptido inhibidor, la calpastatina. Una forma modificada se usó como protocolo de ejemplo en la sección avanzada del manual de la versión 3.0 de Rosetta.

Algoritmo
=========

El protocolo tiene dos bucles, llamados bucle interno y bucle externo. El bucle externo controla el número de estructuras generadas y solo escribe las estructuras si se cumplen ciertos filtros. El bucle interno itera entre dos fases: una fase de perturbación y una fase de diseño. Durante la fase de perturbación se usan tres tipos de perturbaciones. Al péptido se le aplican dos tipos: permutación de cuerpo rígido rotacional y traslacional del péptido en el bolsillo de unión de la proteína, y perturbaciones small y shear de los ángulos diedros de la cadena principal en todos los residuos del péptido. El tercer tipo de perturbación se realiza sobre los residuos 1-45 del extremo N, que comprenden el sitio de unión del péptido, y los residuos circundantes de la proteína se perturban con perturbaciones small y shear de los ángulos diedros de la cadena principal. Cada vez que se llama a la función se elige al azar una de las tres perturbaciones, seguida de una optimización gruesa de las cadenas laterales (RotamerTrials). Durante la fase de diseño del protocolo, las posiciones de las cadenas laterales se optimizan con una rutina de optimización de cadenas laterales más intensiva (PackRotamers), seguida de la minimización de los ángulos diedros de la cadena principal y de las cadenas laterales, así como del salto entre el péptido y la proteína. El número de perturbaciones por diseño y la magnitud de las perturbaciones se controlan con las opciones de línea de comandos que se describen más abajo.

Hay tres pasos básicos para ejecutar el protocolo tal como se usó en el manuscrito que lo acompaña.

-   generar los resfiles y las carpetas de entrada
-   ejecutar el protocolo DougsDocDesignMinimize para cada mutación en cada posición
-   ejecutar los scripts de análisis

Se proporciona una salida de ejemplo para una versión reducida de la ejecución completa.

Limitaciones
===========

El protocolo se escribió para esta interacción proteína/péptido concreta y habrá que modificar el código para ejecutar el protocolo en un sistema distinto.

Generar los resfiles y las carpetas de entrada
=====================================

El código del Protein Data Bank de la estructura de calpaína/calpastatina usada en los diseños es 1NX1. Los archivos contienen dos copias de calpaína (cadenas A y B) y dos copias del péptido inhibidor calpastatina (cadenas C y D). Para reducir el tamaño del sistema, los diseños se hicieron solo en la cadena A y la cadena C, porque las cadenas A y C tienen factores B más bajos que las cadenas B y D. La interfaz calpaína/calpastatina es distal respecto a la interfaz calpaína/calpaína, y los residuos que forman la interfaz calpaína/calpaína se mantuvieron fijos durante el protocolo. Además, se eliminaron los átomos de calcio y las moléculas de agua. Rosetta no funciona con moléculas de agua y los iones de calcio no están cerca de la interfaz proteína-péptido. Este pdb de entrada se reempaquetó y se minimizaron tanto los diedros de las cadenas laterales como los de la cadena principal con una versión modificada de la aplicación fixbb. El archivo PDB de entrada se llama 1NX1\_clean\_repack\_min\_all.pdb

Se probó cada uno de los NCAA añadidos en la publicación que lo acompaña en cada posición del péptido. Para hacerlo y mantener organizados todos los pdb de salida, se proporciona un script que crea carpetas y genera resfiles a partir de plantillas para cada secuencia. Para generar los resfiles y las carpetas, ejecuta los siguientes comandos en el directorio de la demo.

```
$ cd run_dir
$ ../scripts/make_folders_resfiles.tcsh
```

**Nota:** Para ahorrar espacio, el script se ha modificado para que solo produzca resfiles y carpetas para la posición 610 del péptido y el tipo de residuo MPA (4-metil-fenilalanina). Para modificar el script de modo que produzca carpetas y resfiles para cada posición, basta con descomentar las líneas que dicen `       #foreach i ( 601 602 603 604 605 606 607 608 609 610 611 )      ` y `       #foreach j ( ABA APA HLU ..... C92 C93 C94 )      ` y comentar la línea que dice `       foreach i ( 610 )" and "foreach j ( MPA )      ` .

Con las plantillas de `       run_dir      `, el script `       make_folders_resfiles.tcsh      ` crea las carpetas y los resfiles para realizar todas las ejecuciones de DDDMI.

Ejecutar el protocolo DougsDockDesignMinimizeInterface
=================================================

Para ejecutar el protocolo hay que modificar archivos de la base de datos. En el archivo `       database/chemical/residue_type_sets/fa_standard/residue_types.txt      ` hay que descomentar todas las rutas a los archivos de parámetros de tipos de residuo bajo el encabezado L-NCAA, quitando el "\#" del principio de la línea. Además, las bibliotecas de rotámeros de los NCAA no se incluyen en la base de datos predeterminada de Rosetta porque ocupan más de 400 MB. Las bibliotecas de rotámeros de los NCAA añadidos en la publicación que lo acompaña se proporcionan como información suplementaria.

**Nota:** Activar todos los tipos de residuo adicionales aumenta drásticamente el número de tipos de residuo y la huella de memoria de Rosetta. La huella de memoria puede reducirse comentando los parches innecesarios en el archivo `       database/chemical/residue_type_sets/fa_standard/patches.txt      `. Para el protocolo DougsDockDesignMinimizeProtocol se pueden comentar sin problema todos menos `       NtermProteinFull.txt      ` y `       CtermProteinFull.txt      `, colocando símbolos "\#" al principio de cada línea de patches.txt excepto en las líneas que dicen `       NtermProteinFull.txt      ` " y " `       CtermProteinFull.txt      ` .

Para ejecutar el protocolo como en la publicación que lo acompaña, ejecuta los siguientes comandos partiendo del directorio de la demo.

```
$ cd run_dir
$ cd pos_610_MPA
$ /PATH/TO/ROSETTA/bin/doug_dock_design_min_mod2_cal_cal.macosgccrelease -database /PATH/TO/rosetta/main/database -s ../../inputs/1NX1_clean_repack_min_all.pdb -resfile ../resfile_pos_603_MPA -nstruct 255 -inner_num 45 -pert_num 25 -ia_ener 100 -use_input_sc -pdb_gz
```

El comando anterior genera 255 estructuras y tardará aproximadamente 5 minutos por estructura, según tu hardware.

**Nota:** La extensión de tu ejecutable puede ser distinta de la anterior. Además, en la publicación la opción de línea de comandos nstruct fue 255. Sin embargo, para ahorrar espacio en la captura del protocolo se usó un nstruct de 10.

Se proporciona un script que ejecutará el comando anterior para cada carpeta creada por el `       make_folders_resfiles.tcsh script      ` .

```
$ cd run_dir
$ ../scripts/run_script.bash
```

**Nota:** Tendrás que establecer la ruta de tu base de datos y de tu ejecutable en run\_script.bash.

Opciones
-------

Hay varias opciones de línea de comandos para controlar la ejecución de la aplicación.

Opciones para controlar las temperaturas de los objetos Monte Carlo usados en el protocolo

-   pert\_mc\_temp: la temperatura de MC que se usa en la fase de perturbación del protocolo DDDM; por defecto 0.8 kT.
-   pert\_pep\_small\_temp: la temperatura del objeto MC interno del mover small de las perturbaciones del péptido; por defecto 0.8 kT.
-   pert\_pep\_shear\_temp: la temperatura del objeto MC interno del mover shear de las perturbaciones del péptido; por defecto 0.8 kT.
-   pert\_ter\_small\_temp: la temperatura del objeto MC interno del mover small de las perturbaciones de los extremos; por defecto 0.8 kT.
-   pert\_ter\_shear\_temp: la temperatura del objeto MC interno del mover shear de las perturbaciones de los extremos; por defecto 0.8 kT.
-   desn\_mc\_temp: la temperatura que se usa en la fase de diseño/minimización del protocolo DDDM; por defecto 0.8 kT.

Opciones para controlar el tamaño de las perturbaciones de la fase de docking

-   pert\_dock\_rot\_mag: la magnitud de rotación de la perturbación de cuerpo rígido en la fase de perturbación del protocolo DDDM; por defecto 0.5.
-   pert\_dock\_trans\_mag: la magnitud de traslación de la perturbación de cuerpo rígido en la fase de perturbación del protocolo DDDM; por defecto 0.25.

Opciones para controlar el tamaño de las perturbaciones de la cadena principal del péptido

-   pert\_pep\_small\_H: el ángulo máximo de perturbación para la estructura secundaria helicoidal en el mover small del péptido; por defecto 1 grado.
-   pert\_pep\_small\_L: el ángulo máximo de perturbación para la estructura secundaria de loop en el mover small del péptido; por defecto 1 grado.
-   pert\_pep\_small\_E: el ángulo máximo de perturbación para la estructura secundaria de hebra en el mover small del péptido; por defecto 1 grado.
-   pert\_pep\_shear\_H: el ángulo máximo de perturbación para la estructura secundaria helicoidal en el mover shear del péptido; por defecto 1 grado
-   pert\_pep\_shear\_L: el ángulo máximo de perturbación para la estructura secundaria de loop en el mover shear del péptido; por defecto 1 grado.
-   pert\_pep\_shear\_E: el ángulo máximo de perturbación para la estructura secundaria de hebra en el mover shear del péptido; por defecto 1 grado.

Opciones para controlar el tamaño de las perturbaciones de la cadena principal en los extremos

-   pert\_ter\_small\_H: el ángulo máximo de perturbación para la estructura secundaria helicoidal en el mover small de los extremos; por defecto 1 grado
-   pert\_ter\_small\_L: el ángulo máximo de perturbación para la estructura secundaria de loop en el mover small de los extremos; por defecto 1 grado.
-   pert\_ter\_small\_E: el ángulo máximo de perturbación para la estructura secundaria de hebra en el mover small de los extremos; por defecto 1 grado.
-   pert\_ter\_shear\_H: el ángulo máximo de perturbación para la estructura secundaria helicoidal en el mover shear de los extremos; por defecto 1 grado
-   pert\_ter\_shear\_L: el ángulo máximo de perturbación para la estructura secundaria de loop en el mover shear de los extremos; por defecto 1 grado.
-   pert\_ter\_shear\_E: el ángulo máximo de perturbación para la estructura secundaria de hebra en el mover shear de los extremos; por defecto 1 grado.

Opciones para controlar el número de iteraciones de cada bucle

-   pert\_pep\_num\_rep: número de iteraciones small y shear para el péptido; por defecto 100.
-   pert\_ter\_num\_rep: número de iteraciones small y shear para el extremo; por defecto 100.
-   pert\_num: número de iteraciones del bucle de perturbación por diseño; por defecto 100.
-   inner\_num: número de iteraciones del bucle interno; por defecto 100.

Opción para controlar el límite de energía de los filtros

-   ia\_ener: límite superior de energía para el punto de control final de diseño/análisis de interfaz; por defecto 0.0.

En su mayor parte, los valores por defecto deberían bastar y son los que se usaron en el artículo. La opción de línea de comandos "ia\_ener" depende del complejo en el que se ejecute el protocolo. Si se establece en un valor excesivamente bajo, el protocolo se ejecutará indefinidamente y nunca escribirá ninguna estructura. Si se establece en 100, como arriba, se permite la salida de todas las estructuras salvo las más agresivas. La opción de línea de comandos nstruct controla el bucle externo.

Posprocesamiento
===============

Cada uno de los archivos pdb de salida contiene información sobre el complejo proteína-péptido que puede usarse para evaluar los diseños. Por ejemplo, al final de `       1NX1_clean_repack_min_all_0004.pdb      ` se muestra lo siguiente. Para cada filtro, el valor se calcula para la proteína y el péptido juntos (COMPLEX), separados por 1000 angstroms (SEPARATE) y la diferencia entre ambos (DIFF). ENERGY es la energía de Rosetta. ENERGY\_COMPLEX es el principal determinante de lo bueno que es un diseño, y ENERGY\_DIFF puede dar una estimación de la energía de unión. SASA es el área de superficie accesible al solvente. SASA\_DIFF indica las secuencias que establecen más contactos proteína-péptido y puede usarse para cribar diseños; por ejemplo, colocar una cadena lateral muy grande en una posición restringida de la interfaz puede empujar al péptido fuera del bolsillo de unión, lo que se reflejaría en un SASA\_DIFF de menor magnitud. HB\_ENER es el componente de enlaces de hidrógeno de la energía de Rosetta. Los valores mayores de HB\_ENER\_DIFF indican que el diseño forma más enlaces de hidrógeno, o mejores, a través de la interfaz proteína-péptido. PACK es la puntuación de RosettaHoles y es una medida de lo bien empaquetada que está la proteína. Un PACK\_COMPLEX mayor que PACK\_SEPARATE es favorable y sugiere que el complejo está mejor empaquetado que la proteína sola. Además, la puntuación de RosettaHoles penaliza los huecos que no pueden ser ocupados por el solvente, por lo que valores mayores de PACK\_DIFF indican que el péptido diseñado es capaz de llenar cavidades de la proteína inaccesibles para el solvente.

```
ENERGY_COMPLEX:    -63.3501
ENERGY_SEPERATE:   -48.599
ENERGY_DIFF:       -14.7512
SASA_COMPLEX:      11774.1
SASA_SEPERATE:     13092.3
SASA_DIFF:     -1318.15
HB_ENER_COMPLEX:   -146.728
HB_ENER_SEPERATE:  -145.037
HB_ENER_DIFF:      -1.69085
PACK_COMPLEX:      0.515277
PACK_SEPERATE:     0.466995
PACK_DIFF:     0.0482824
```

Se proporciona un script que extrae la información de un conjunto de archivos pdb y la ordena según la métrica ENERGY\_COMPLEX.

```
$ cd run_dir
$ cd pos_610_MPA
$ ../../scripts/get_interface_data.tcsh
```

El script produce un archivo llamado out.ALL que contiene una sola línea por cada archivo pdb con las métricas en el orden anterior.

Novedades desde la última versión
=============================

Esta aplicación es nueva en la versión 3.4 de Rosetta.

##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
