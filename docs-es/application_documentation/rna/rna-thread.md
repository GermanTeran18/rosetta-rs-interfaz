#Documentación de threading y mutación de RNA: *rna\_thread*

Metadatos
========

Autor: Rhiju Das

Añadido a la documentación: junio de 2013

Código y demo
=============

El código central de la aplicación *rna\_thread* está en `       apps/public/rna/rna_thread.cc      `

Para un ejemplo de demo "mínimo" de threading de RNA:

`       demos/public/rna_thread      `

de la mutación de RNA, más sencilla:

`       demos/public/rna_mutate      `

Referencias
==========

Este código de threading se describió por primera vez en:

Cheng, C.Y., Chou, F.-C., and Das, R. (2015) "Modeling complex RNA tertiary folds with Rosetta." Methods in Enzymology 553 : 35 - 64. <a href="/site_data/pub_pdf/2015_Cheng_MethEnzym.pdf" target="_blank">Artículo</a> <a href="http://www.sciencedirect.com/science/article/pii/S0076687914000524" target="_blank">
                                 Enlace </a>

Propósito de la aplicación
===========================================

Este código sirve para hacer threading de nuevas secuencias sobre coordenadas de RNA ya resueltas ('plantillas') para el modelado de RNA por homología.

Algoritmo
=========

Limitaciones
===========

-   Dentro de Rosetta, este código no conserva el fold tree
-   El código no se ha optimizado en velocidad y todavía no está encapsulado en una clase.

Archivos de entrada
===========

Archivos requeridos
-------------

-   El archivo PDB de la plantilla. Debe estar en el formato de RNA de Rosetta (consulta [[Documentación del modelado de estructura 3D de RNA|rna-denovo]] )
-   Un archivo fasta de alineamiento. Ejemplo:

```
> GIR1 group-I like ribozyme in I-DirI gene from D. iridis
gguuggguugggaaguaucauggcuaaucaccaugaugcaaucggguugaacacuuaau----------------------uggguuaaa-acgg-----------------------------------ugggggacgaucccguaacauccguccuaa---------------------------------cggcgacagacugcacggcccu----------------------------------------------gccucuuagguguguucaau---gaacagucguucc------------------gaaaggaagcauccgguaucccaagacaauc

>3bo3_REARRANGE.pdb
----------------------------------------gccgugugccuugc-----gccgggaaaccaga-------uggugucaaauucggcgaaaccuaagcgcccgcccgggcguauggcaacg---------------------ccgagccaagcuucgcagccauugcacuccggcugcgaugaagguguagagacuagacggcacccaccuaaggcaaacgcuauggugc---------------------------------gcaaggcauaaggcauaguccagggaguggcgaagccacacaa----accag---acggcc-------------
```

Si solo quieres mutar la secuencia, puedes darla en la línea de comando con -seq; consulta rna\_mutate más abajo.

Cómo ejecutar con este archivo.
---------------------------

```
rna_thread.<exe> -in:file:fasta 3bo3_REARRANGE_to_GIR1.fasta -s 3bo3_REARRANGE.pdb  -o 3bo3_REARRANGE_to_GIR1_thread.pdb -seq_offset 63
```

Esta demo hace threading de una estructura cristalográfica de un intrón del grupo I (3bo3\_REARRANGE) sobre la ribozima de ramificación similar al grupo I GIR1, y se usó en la quinta prueba de RNA puzzles.

Mutación rápida
------------
Si solo quieres mutar algunas posiciones de un RNA y no quieres crear un archivo fasta, puedes ejecutar una línea de comando como:

```
rna_thread -s rosetta_inputs/1zih_RNA.pdb  -seq gggcgcgagccu -o 1zih_A7G.pdb
```

Consejos
----
+ Al crear tu archivo FASTA o dar una secuencia desde la línea de comando (con `-seq`), asegúrate de que la secuencia de RNA esté en minúsculas.  
+ Por ahora el código solo maneja residuos de RNA 'estándar' en el archivo PDB de entrada. Quizá convenga pasar tu archivo PDB por `make_rna_rosetta_ready.py` (descrito en [[RNA-tools]]) o editar a mano cualquier residuo no estándar (como `GTP`) para pasarlo a nombres de residuo estándar (como `  G`).

Opciones
=======

```
-in:file:s                     Name of single PDB file with template coordinates
-in:file:fasta                 Name of alignment file in FASTA format. First sequence should be
                                target sequence, and second sequence should template sequence
-o                             Name of output PDB file
-seq_offset                    [optional] Integer to be added to residue numbers for output. [default=0]
-seq                           [alternative to -in:file:fasta] sequence of output PDB. Must have
                                same number of residues as template PDB.
```


##Véase también

* [[RNA applications]]: Lista de aplicaciones de RNA
* [[Utilities Applications]]: Lista de aplicaciones de utilidades
* [[Application Documentation]]: Página de inicio de la documentación de aplicaciones
* [[RNA]]: Guía para trabajar con RNA en Rosetta
* [[Fixbb]]: Aplicación que se usa habitualmente para diseño y/o threading con proteínas
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
