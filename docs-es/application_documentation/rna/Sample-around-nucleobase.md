#Sample around nucleobase
========

Autor: Rhiju Das

Dic. 2014, por Rhiju Das (rhiju [at] stanford.edu).

Desarrollado en el verano de 2012, en el hackathon del laboratorio Das -- Kyle Beauchamp, Fang-Chieh Chou, Rhiju Das, Parin Sripakdeevong. 
Ampliado para incluir fosfato por Rhiju Das en dic. 2014.

### Barrido de una sonda de metilo en el plano de la base
![Barrido xy]( https://cloud.githubusercontent.com/assets/1672331/5621802/c6cf4f38-94ee-11e4-8df0-3658b67b8092.png "Barrido de una sonda de metilo en el plano de la base")

### Barrido de una sonda de metilo desplazada 4.0 Å del plano de la base
![Barrido xy, desplazado 4.0 Å]( https://cloud.githubusercontent.com/assets/1672331/5621812/e36f4a08-94ee-11e4-94d8-29a6d65ced53.png "Barrido de una sonda de metilo desplazada 4.0 Å del plano de la base")

Propósito
=========

Queríamos comparar los potenciales de fuerza media de varios átomos, como una sonda de metilo única, agua, adenosina, etc., alrededor de una adenosina fija con las soluciones de dinámica molecular explícita.


Código y demo
=============

El código está en

` apps/public/rna_util/nucleobase_sample_around.cc`

con muchas funciones auxiliares en

` protocols/toolbox/sample_around/util.cc`

Los archivos de la demo están en

`       Rosetta/demos/public/nucleobase_sample_around      `

Referencias
===========
Sin publicar.

Propósito de la aplicación
===========================================

Genera tablas de energías de interacción entre una nucleobase de adenosina y, por ejemplo, 
 un átomo de carbono simple o un fosfato como sonda.


Modos
=====
Para muestrear un átomo de sonda de «carbono»:

```
 nucleobase_sample_around   [-s a_RNA.pdb]
```

Para muestrear agua (muestreando todas las orientaciones posibles y generando energías libres sumadas según Boltzmann)

```
 nucleobase_sample_around   [-s a_RNA.pdb]  -sample_water  [ -extra_res /path/to/rosetta/main/database/chemical/residue_type_sets/fa_standard/residue_types/water/TP3.params ]
```

Para muestrear una nucleobase

```
 nucleobase_sample_around   [-s a_RNA.pdb]  -sample_another_nucleobase   -copy_nucleobase_nucleobase_file double_A_ready_set.pdb
```

Para muestrear una nucleobase, leyendo una conformación inicial de emparejamiento nucleobase-nucleobase.

```
 nucleobase_sample_around   [-s a_RNA.pdb]  -sample_another_nucleobase   -copy_nucleobase_nucleobase_file double_A_ready_set.pdb
```

Ahora se pueden muestrear fosfatos con las opciones

```
 nucleobase_sample_around -sample_phosphate [-center_on_OP2]
```

El centro del fosfato está en el átomo de fósforo, salvo que el usuario especifique -center_on_OP2 . 
Ten en cuenta que, por una tontería en los tipos de variante disponibles y por el deseo de usar un fosfato de un residue_type de nucleótido real, el fosfato de sonda también tiene un C1' flotante.

Opción añadida recientemente

```
 -nucleobase g [or a,c,u]
```

que usará un nucleótido distinto de la adenosina como nucleótido central alrededor del cual se muestrea


Gráficos
========


El script de gráficos está disponible en `Rosetta/tools/rna_tools/pdb_util/plot_contour.py`
```
plot_contour.py score_xy_0.table score_xy_0.png
plot_contour.py score_xy_1.5.table score_xy_1.5.png
plot_contour.py score_xy_3.table score_xy_3.png
plot_contour.py score_xy_4.table score_xy_4.png
```

Información adicional
=====================
Los resultados del hackathon anterior se resumen en las siguientes diapositivas
https://drive.google.com/file/d/0By0BpYZBGuK-R2dhcEpKN0E4d28/view?usp=sharing 


##Véase también

* [[RNA applications]]: lista de aplicaciones de ARN
* [[Utilities Applications]]: lista de aplicaciones de utilidades
* [[Tools]]: herramientas basadas en Python para usar en Rosetta
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[RNA]]: guía para trabajar con ARN en Rosetta
* [[Fixbb]]: aplicación que se usa habitualmente para diseño y/o threading con proteínas
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
