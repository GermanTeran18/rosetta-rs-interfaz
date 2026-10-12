#Aplicación de diseño de enzimas

Metadatos
========

Autor: Jason Fell (jsfell@ucdavis.edu)

Este documento fue escrito en su mayor parte por Jason Fell (jsfell@ucdavis.edu), última actualización en mayo de 2020. Otros colaboradores son Stephanie C. Contreras, Steve J. Bertolani y Justin B. Siegel. 

Código y demostración
=============

Este script está en rosetta/tools/protein_tools/scripts/RosettaEnzCM.py

Archivos de entrada
===========

Archivos de entrada necesarios:

-   un pdb limpio de cada plantilla
-   un archivo con todos los residuos catalíticos de cada plantilla
-   un archivo con las secuencias alineadas de todas las plantillas y los objetivos en formato fasta

Configuración
=====

Este script comprobará primero que todos los residuos catalíticos de las plantillas estén correctamente alineados entre sí. Si alguno de los residuos catalíticos no está alineado, el script se detendrá y mostrará un error. Una vez comprobados los residuos catalíticos de las plantillas, el script predecirá cuáles son los residuos catalíticos de cada secuencia objetivo.

En esta etapa, si un residuo catalítico predicho es una alanina o una glicina, el script se detendrá e imprimirá un error. Los residuos catalíticos de cada plantilla se escriben en un archivo .data, y todos los residuos catalíticos de los objetivos se escriben en un archivo _residues.txt.

A continuación, el script usará PyRosetta e importará el pdb de cada plantilla. Se miden, en cada plantilla, las distancias de los pares de átomos CA-CA, CB-CB, CA-CB y CB-CA de cada residuo catalítico; luego se promedian estas distancias y se guardan en un archivo _distances.txt. 

Por último, el script combinará los residuos objetivo predichos y las distancias atómicas promedio y creará un archivo <target>.dist_csts con las restricciones de distancia catalítica adecuadas, al que se podrá llamar o añadir contenido con el formato:

AtomPair Cx <Residue1> Cy <Residue2> SCALARWEIGHTEDFUNC 1000 HARMONIC <distance> 1.0

####Sintaxis general:

```
 python RosettaEnzCM.py -c <catalytic-residues> -a <aligned-fasta> -n <output-name>"
```

Las opciones de línea de comandos son:

```
-c File containing catalytic residues
-a aligned fasta sequences
-n optional name for output
```

Los nombres de las plantillas deben ser coherentes en todos los lugares (archivos pdb, alineamiento y archivo de residuos catalíticos).

####Sintaxis de los residuos catalíticos

Un archivo con la información de los residuos catalíticos debe escribirse así:

```
TEMPLATE RES1,RES2,RES3
TEMPLATE RES1,RES2,RES3
```

Donde TEMPLATE es el nombre de tu plantilla (no hace falta .pdb) y cada residuo catalítico va separado por comas y en mayúsculas.

Referencias
========

Bertolani SJ, Siegel JB (2019) A new benchmark illustrates that integration of geometric constraints inferred from enzyme reaction chemistry can increase enzyme active site modeling accuracy. PLoS ONE 14(4): e0214126. 

https://doi.org/10.1371/journal.pone.0214126

##Véase también

* [RosettaCM](https://www.rosettacommons.org/docs/latest/application_documentation/structure_prediction/RosettaCM)

