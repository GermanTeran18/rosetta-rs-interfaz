#Ensamblaje de RNA con restricciones experimentales por pares

Metadatos
========

Autor: Rhiju Das

Noviembre de 2011, por Rhiju Das (rhiju [at] stanford.edu).

Código y demo
=============
**NOTA IMPORTANTE: ya hay disponible un flujo de ensamblaje terciario más eficiente, descrito brevemente en la Información Suplementaria del artículo de MOHCA-seq [aquí](http://dx.doi.org/10.7554/eLife.07600) y en el capítulo de Methods in Enzymology [aquí](https://daslab.stanford.edu/site_data/pub_pdf/2015_Cheng_MethEnzym.pdf). Consulta también [[rna-denovo-setup]].**


Este código permite modelar RNA grandes con varias hélices, ensamblando modelos de hélices y de motivos no canónicos mediante una especie de estrategia jerárquica de construcción. El código central de las aplicaciones *rna\_denovo* y *rna\_helix* está en `       src/protocols/rna/RNA_DeNovoProtocol.cc      ` y en `       src/protocols/rna/RNA_HelixAssembler.cc      ` .

Para el flujo de trabajo completo, consulta:

`       rosetta_demos/public/RNA_Assembly      `

NOTA: Este flujo de trabajo está en gran parte obsoleto; pronto se documentará uno nuevo, basado en el uso de datos de MOHCA-seq y en la experiencia de las pruebas de RNA puzzles. Algo de información aquí: [[http://biorxiv.org/content/early/2014/04/25/004556]].

Referencias
==========

Kladwang, W., VanLang, C.C., Cordero P., and Das, R. (2011) "A two-dimensional mutate-and-map strategy for non-coding RNA structure", Nature Chemistry 3: 954-962. [Artículo](http://www.stanford.edu/~rhiju/KladwangVanlangCorderoDas_NatChem_2011_ALL.pdf) [Enlace](http://www.nature.com/nchem/journal/v3/n12/abs/nchem.1176.html)

Propósito de la aplicación
===========================================

Este código sirve para tomar una secuencia de RNA y su estructura secundaria y generar modelos tridimensionales de novo de las hélices y de los motivos entre hélices, y luego construir el modelo completo a partir de esas partes.

Algoritmo
=========

Este método encadena FARFAR (modelado de novo de Rosetta) para los motivos no canónicos entre hélices y un método rápido de construcción de hélices con un procedimiento de ensamblaje (que también usa el código de modelado de novo de Rosetta) para crear modelos 3D grandes de RNA.

Limitaciones
===========

-   El protocolo es algo inflexible, porque los motivos se modelan por separado unos de otros: si en el modelo global final se produce una interacción entre loops, los loops aislados no la modelarán correctamente. Estamos trabajando en métodos iterativos para resolver este problema del ensamblaje global de novo. Por ahora el protocolo parece funcionar bien si hay restricciones experimentales que, por ejemplo, conecten los loops.

-   Actualmente el método funciona mejor (resolución a nivel de hélice, \~6-9 A de RMSD) cuando se le dan restricciones experimentales por pares; por eso se publicó por primera vez usando la información abundante del método de sondeo químico mutate-and-map para RNA del laboratorio de Das.

-   Se supone que la estructura secundaria no tiene anidamiento (cualquier interacción de pseudonudo no se modelará, a menos que se especifique como restricción durante el ensamblaje global; ten en cuenta que esto aún no se ha probado de forma exhaustiva).

-   Por limitaciones de memoria, el número de modelos de cada submotivo se limita a unos pocos miles. Al ensamblarlos, esto puede dar pocas estructuras buenas que cumplan todas las restricciones y una aparente "sobreconvergencia" en el trabajo de ensamblaje final. Por eso se recomienda hacer al menos dos ejecuciones totalmente independientes de los trabajos de motivos y de ensamblaje. Es probable que las versiones futuras lo eviten con un procedimiento iterativo de reconstrucción y refinamiento.

Modos
=====

Por ahora solo hay un modo de ejecutar RNA Assembly.

Archivos de entrada
===========

Archivo requerido
-------------

Necesitas dos archivos:

-   El [[archivo fasta|fasta file]]: es un archivo de secuencia de tu RNA. El archivo fasta tiene el nombre del RNA en la primera línea (después de \>) y la secuencia en la segunda. Las letras válidas son a, c, g y u. Hay un archivo fasta de ejemplo en `        main/tests/integration/tests/rna_denovo/       ` .

-   El archivo de estructura secundaria secstruct: la estructura secundaria que supones. Este archivo debe ser un archivo de texto con una sola línea que contenga la estructura secundaria del RNA en notación punto-corchete. Por ejemplo, '((....))' denota una estructura de horquilla en la que se aparean las dos primeras y las dos últimas bases.

Archivos adicionales opcionales:
--------------------------

-   Un [[archivo de restricciones|constraint file]]. Puede especificar bases que deberían hacer contacto, a partir de información experimental o filogenética. Más abajo hay un ejemplo.
-   Un archivo PDB nativo, si quieres RMSD de todos los átomos pesados. Debe estar en el [[formato|rna-denovo#File-Format]] PDB de Rosetta para RNA.

Cómo ejecutar el trabajo
------------------

El flujo de trabajo general se puede preparar con un script de Python, disponible en el directorio rosetta\_demos/RNA\_Assembly/.

```
  python scripts/setup_rna_assembly_jobs.py  add.fasta add_secstruct.txt 1y26_RNA.pdb  add_mutate_map_threetertiarycontacts.cst
```

Los dos primeros argumentos son obligatorios: el archivo de secuencia y el de estructura secundaria [ya sea en notación punto/corchete o especificando los pares Watson/Crick como pares de números]. Los dos últimos argumentos son opcionales; aportan el PDB nativo y las restricciones, que aquí provienen de una estrategia "mutate-and-map" de alto rendimiento para determinar la estructura del RNA.

Quizá debas cambiar la ruta de tu ejecutable de Rosetta en setup\_rna\_assembly\_jobs.py [en cuyo caso deberías recibir una advertencia].

Después ejecuta los comandos de Rosetta de:

```
 README_STEMS  [creates helical stems]
 README_MOTIFS  [creates interhelical noncanonical motifs]
 README_ASSEMBLE [assembles the stems and motifs]
```

Puedes ver ejemplos de estos archivos y de su salida en example\_output/. Ten en cuenta que puedes reducir o aumentar el número de modelos por motivo con 'nstruct'; para una ejecución rápida, podrías cambiarlos a 2. En la práctica querrás generar 2000-4000 modelos de MOTIF y luego varios miles de modelos de ASSEMBLE. [Puedes usar un solo modelo de STEM por hélice, ya que se supone que es una hélice ideal.] La construcción de tallos helicoidales debería tardar solo unos segundos por hélice. El modelado de motivos tardará más: cerca de 1 minuto por modelo. Los trabajos de ensamblaje final tardarán de 2 a 3 minutos por modelo para un RNA de 100 nt, y más para moléculas más grandes.

Líneas de comando con más detalle.
---------------------------

El flujo de trabajo anterior debería funcionar, pero vale la pena mirar las líneas de comando de Rosetta en los archivos README para ver qué ocurre. Primero, se pueden crear hélices ideales de forma A con la línea de comando:

```
rna_helix.<exe> -database <path to database> -nstruct 1 -fasta stem2_add.fasta -out:file:silent stem2_add.out
```

donde el archivo stem2\_add.fasta contiene la secuencia de la hélice P2, según lo determine tu estructura secundaria. Se ve así:

```
>stem2_add.fasta
uccuaauuggga
```

Luego, para cada loop de RNA o motivo de unión que interconecta estas hélices, se crearán 4,000 modelos con FARFAR. Por ejemplo, en el riboswitch de adenina, dos loops (L2 y L3) y la unión que une la adenina son las partes de motivo no helicoidales. La línea de comando para construir L2 sobre la hélice P2 es:

```
rna_denovo.<exe> -database  <path to database> -native motif2_1y26_RNA.pdb -fasta motif2_add.fasta -params_file motif2_add.params -nstruct 100 -out:file:silent motif2_add.out -cycles 5000 -mute all -close_loops -close_loops_after_each_move -minimize_rna -close_loops -in:file:silent_struct_type rna -in:file:silent  stem2_add.out -input_res  1-6 16-21
```

Aquí, la opción opcional “-native”, que introduce la estructura cristalográfica del motivo, permite calcular el RMSD, pero no se usa para construir el modelo. El archivo motif2\_add.params define el tallo P2 dentro de esta ejecución de construcción del motivo:

```
STEM    PAIR 6 16 W W A PAIR 5 17 W W A PAIR 4 18 W W A PAIR 3 19 W W A PAIR 2 20 W W A PAIR 1 21 W W A
OBLIGATE PAIR 1 21 W W A
```

Por último, los modelos de motivos y hélices construidos por separado se ensamblan mediante el procedimiento Monte Carlo de FARNA. Aquí no se hace refinamiento por su costo en RNA grandes. Lo más importante para obtener una estructura precisa son las restricciones. Esta es la línea de comando:

```
rna_denovo.<exe> -database  <path to database> -native 1y26_RNA.pdb -fasta add.fasta -in:file:silent_struct_type binary_rna  -cycles 10000 -nstruct 200 -out:file:silent add_assemble.out -params_file add_assemble.params -cst_file add_mutate_map_threetertiarycontacts_assemble.cst -close_loops  -in:file:silent  stem1_add.out stem2_add.out stem3_add.out motif1_add.out motif2_add.out motif3_add.out -input_res   1-9 63-71 13-18 28-33 42-47 55-60 1-18 28-47 55-71 13-33 42-60
```

En la línea de comando anterior, las definiciones de hélices y loops las da add\_assemble.params:

```
CUTPOINT_CLOSED  9 18 47
STEM  PAIR 1 71 W W A  PAIR 2 70 W W A  PAIR 3 69 W W A  PAIR 4 68 W W A  PAIR 5 67 W W A  PAIR 6 66 W W A  PAIR 7 65 W W A  PAIR 8 64 W W A  PAIR 9 63 W W A
OBLIGATE PAIR 9 63 W W A

STEM  PAIR 13 33 W W A  PAIR 14 32 W W A  PAIR 15 31 W W A  PAIR 16 30 W W A  PAIR 17 29 W W A  PAIR 18 28 W W A
OBLIGATE PAIR 18 28 W W A

STEM  PAIR 42 60 W W A  PAIR 43 59 W W A  PAIR 44 58 W W A  PAIR 45 57 W W A  PAIR 46 56 W W A  PAIR 47 55 W W A
OBLIGATE PAIR 47 55 W W A
```

El archivo de restricciones add\_mutate\_map\_threetertiarycontacts\_assemble.cst codifica regiones en contacto terciario (aquí incluida la hélice corta de dos pares de bases) inferidas a partir de los datos de mutate-and-map:

```
[ atompairs ]
N3 10 N3 39 FADE -100 10 2 -20.0
N3 10 N1 40 FADE -100 10 2 -20.0
N1 11 N3 39 FADE -100 10 2 -20.0
N1 11 N1 40 FADE -100 10 2 -20.0
N1 12 N1 40 FADE -100 10 2 -20.0
N3 10 N3 39 FADE -100 10 2 -20.0
N1 25 N3 49 FADE -100 10 2 -20.0
N1 25 N3 50 FADE -100 10 2 -20.0
N1 26 N3 48 FADE -100 10 2 -20.0
N1 26 N3 49 FADE -100 10 2 -20.0
N1 26 N3 50 FADE -100 10 2 -20.0
N3 27 N3 49 FADE -100 10 2 -20.0
N3 27 N3 50 FADE -100 10 2 -20.0
N3 35 N1 40 FADE -100 10 2 -40.0
N1 34 N3 41 FADE -100 10 2 -40.0
```

Estas restricciones dan una bonificación de –20.0 kcal/mol si los pares de átomos especificados están a menos de 8 Å; más allá de 10.0 Å, la función interpola hasta cero mediante un spline cúbico. Ten en cuenta que la numeración de Rosetta aquí empieza en 1 para el primer nucleótido del dominio de unión a adenina de 71 nucleótidos, y está desplazada en 12 respecto de la numeración de la estructura cristalina 1Y26.

Opciones
=======

Algunas opciones son similares a las del modelado de novo de RNA, pero no se han probado de forma exhaustiva. Consulta [[Documentación del modelado de estructura 3D de RNA|rna-denovo]].

Salidas esperadas
================

Al final del protocolo, tus modelos finales estarán en un silent file llamado \*\_assemble.out. Puedes ver las puntuaciones, agruparlos y extraer archivos PDB. Consulta [[Documentación del modelado de estructura 3D de RNA|rna-denovo]].

Novedades desde la última versión
=============================

Esta aplicación es nueva desde Rosetta 3.4.

##Véase también

* [[RNA Denovo]]: La página principal de la aplicación rna_denovo
* [[RNA applications]]: La página de inicio de las aplicaciones de RNA
* [[Structure Prediction Applications]]: Lista de aplicaciones de predicción de estructura
* [[RNA applications]]: La página de inicio de las aplicaciones de RNA
* [[Structure Prediction Applications]]: Lista de aplicaciones de predicción de estructura
* [[Application Documentation]]: Página de inicio de la documentación de aplicaciones
* [[RNA]]: Guía para trabajar con RNA en Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
