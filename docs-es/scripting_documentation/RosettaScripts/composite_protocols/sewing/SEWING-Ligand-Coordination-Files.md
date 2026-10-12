
#Formato del archivo de coordinación del ligando

[[_TOC_]]

Descripción general
========

El LigandBindingAssemblyMover de SEWING requiere un archivo de coordinación del ligando que indique las coordenadas relativas de un átomo del ligando respecto a los posibles residuos coordinantes en distintos rotámeros, para cada átomo que forme nuevos contactos. Estos archivos se pueden generar con la aplicación [[zinc_statistic_generator]] u otras aplicaciones personalizadas.

Formato del archivo
============

Las dos primeras líneas de un archivo de coordinación del ligando dan información de identificación del archivo: la primera línea es un único carácter (H, E o L) que indica el tipo de estructura secundaria para el que debe usarse el archivo, y la segunda línea da el nombre del residuo del ligando para el que se generó el archivo. 

La tercera línea de un archivo de coordinación del ligando da los encabezados que indican el contenido del resto del archivo:
```
Coord_res_name  Coord_atom_number  Ligand_atom_number  Local_x  Local_y  Local_z  Chi1  Chi2  Chi3  Chi4
```
Estos encabezados indican el nombre del residuo y el número de átomo del residuo que coordinará el átomo del ligando; el número del átomo del ligando que se va a coordinar; las coordenadas del ligando relativas a un sistema de coordenadas formado por los átomos de la cadena principal (N, Calpha y C) para este tipo de residuo y rotámero; y los ángulos chi del residuo coordinante. Si el residuo tiene menos de cuatro ángulos chi, todos los valores restantes serán cero.

Archivos de ejemplo
============

Las siguientes son las primeras líneas de un archivo de coordinación del ligando para zinc que permite residuos HIS o HIS_D coordinantes:

```
H
ZN
Coord_res_name	Coord_atom_number	Ligand_atom_number	Local_x	Local_y	Local_z	Chi1	Chi2	Chi3	Chi4
HIS	7	1	-2.54052	-2.04827	-1.3255	170.3	63.7	0	0
HIS	7	1	-2.54168	-2.08673	-1.30475	170.3	64.5	0	0
HIS	7	1	-2.54274	-2.1249	-1.28347	170.3	65.3	0	0
HIS	7	1	-2.54371	-2.16278	-1.26166	170.3	66.1	0	0
HIS	7	1	-2.54457	-2.20035	-1.23933	170.3	66.9	0	0
HIS	7	1	-2.54533	-2.23762	-1.21649	170.3	67.7	0	0
HIS	7	1	-2.546	-2.27457	-1.19313	170.3	68.5	0	0
```

##Véase también

* [[File types list]]: Lista de tipos de archivo que se usan en Rosetta
* [[LigandBindingAssemblyMover]]: Mover que usa este tipo de archivo
* [[zinc_statistic_generator]]: Aplicación para generar archivos de coordinación del ligando
* [[Rosetta Basics]]: La página principal de Conceptos básicos de Rosetta
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los principales conceptos de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

