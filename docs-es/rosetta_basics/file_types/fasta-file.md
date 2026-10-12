<!-- --- title: Fasta File -->

Los datos de secuencia contienen secuencias de residuos sin datos estructurales. El origen y la exactitud de estos archivos son objeto de investigación, pero los formatos tienden a ser simples.

Nombre
====

```
*.fasta
```

Propósito de la aplicación
===========================================

Información de secuencia generada por el paquete de alineamiento de secuencias FASTA.

Formato
======

El formato de FASTA se describe [aquí](http://www.ncbi.nlm.nih.gov/blast/fasta.shtml)

Ejemplo
=======

En este ejemplo, 2ptl\_ es el identificador (que usa el nombre del PDB). 1-120 describe el intervalo de residuos que contiene el archivo. : Ejemplo B.9. FASTA

```
>2ptl_ 1-120
VTIKANLIFANGSTQTAEFKGTFEKATSEAYAYADTLKKDNGEYTVDVAD
KGYTLNIKFAAAAAVTIKANLIFANGSTQTAEFKGTFEKATSEAYAYADTLKKD
NGEYTVDVADKGYTLNIKFA
```

Algunas aplicaciones, entre ellas [[stepwise|stepwise]] y [[rna_denovo|rna-denovo]], toman varias cadenas como entrada y permiten especificar la cadena y los residuos en etiquetas como `C:10-121` en los encabezados FASTA.

##Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
