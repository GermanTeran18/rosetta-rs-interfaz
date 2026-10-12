#Comandos de pocket_suggest_target_residues_by_ddg

Metadatos
========

Esta aplicación de Rosetta3 fue creada y documentada por David Johnson, et al.

Propósito y algoritmo
=====================

Esta aplicación recibe un archivo PDB de un complejo proteico y la salida de la predicción de ddg de Robetta, y sugiere residuos objetivo óptimos para la optimización de bolsillos, con el objetivo de inhibir directamente la interacción proteína-proteína. Para ello identifica cuánto ddg estaría contenido en el PocketGrid derivado de cada par de residuos de la interfaz. Los mejores pares de residuos objetivo serán aquellos cuyo PocketGrid contenga más ddg, lo que implica la ubicación más probable para que un inhibidor inhiba la interacción.

Referencias
==========

Johnson DK and Karanicolas J. Selectivity by small-molecule inhibitors of protein interactions can be driven by protein surface fluctuations. PLoS Comput Biol. 2015;11(2):e1004081

Opciones de línea de comandos
====================

**Comando de ejemplo**

```
pocket_suggest_target_residues_by_ddg.linuxgccrelease -database ~/Rosetta/main/database -in:file:s complex.pdb -ddg_list ddg.txt -target_chain_list A
```

***Opciones de pocket_suggest_target_residues_by_ddg***

```
General Rosetta Options
   -database                   Path to rosetta databases
   -in:file:s                  Input pdb file(s)

Other Mandatory Options
   -ddg_list                   Text file of ddg output from Robetta server
   -target_chain_list          List of chains of the protein on which pocket optimization will be performed

```

Consejos
====

* En el archivo ddg_list solo se necesita la salida de ddg relacionada con las cadenas de target_chain_list       

## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
