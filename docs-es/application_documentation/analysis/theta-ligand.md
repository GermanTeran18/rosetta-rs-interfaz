#Comandos de theta_lig

Metadatos
========

Autor: Ragul Gowthaman (g.ragul at gmail.com)

Este documento fue actualizado por última vez el 28 de mayo de 2015, por Ragul Gowthaman.

El investigador principal correspondiente es John Karanicolas (johnk@ku.edu).

Propósito y algoritmo
=====================

Esta aplicación toma archivos PDB de una proteína y de un ligando y entrega el valor «theta-lig», que es la fracción del ligando que está expuesta al solvente en el complejo. Consulta el artículo citado para más detalles.

Referencias
==========

Gowthaman R, Deeds EJ, and Karanicolas J. (2013) The structural properties of non-traditional drug targets present new challenges for virtual screening. J. Chem. Inf. Model, 53(8), p. 2073-81.

Opciones de línea de comandos
====================

**Comando de ejemplo**

```
~/Rosetta/main/source/bin/theta_lig.macosgccrelease -input_protein_ligand_complex protein_ligand_complex.pdb -input_protein protein.pdb -input_ligand LIGAND_0001.pdb -extra_res_fa LIGAND.params

```


```
General Rosetta Options
   -database                   Path to rosetta databases

```

-input_protein_ligand_complex : archivo PDB del complejo proteína-ligando

-input_protein : archivo PDB de la proteína unida
 
-input_ligand : archivo PDB del ligando unido  


Consejos
====
Para generar el archivo de parámetros del ligando se puede usar el script 'molfile_to_params.py'.

Rosetta/main/source/scripts/python/public/molfile_to_params.py -p LIGAND LIGAND.mol2


##Véase también

* [[Aplicaciones de análisis | analysis-applications]]: otras aplicaciones de diseño
* [[Preparación de ligandos | Preparing ligands ]]: notas sobre cómo preparar ligandos para usarlos en Rosetta
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta