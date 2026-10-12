#Archivo de loops


Propósito de la aplicación
===========================================

Las definiciones de loops se usan para identificar los residuos de un loop en el [[modelado de loops|loopmodel]].

Formato de archivo
======

```
column1  "LOOP":     Literally the string LOOP, identifying this line as a loop
                     In the future loop specification files may take other data.
column2  "integer":  Loop start residue number
column3  "integer":  Loop end residue number
column4  "integer":  Cut point residue number, >=startRes, <=endRes. Default or 0: let LoopRebuild choose cutpoint randomly.
column5  "float":    Skip rate. default - never skip
column6  "boolean":  Extend loop. Default false
```

Los números de residuo en los archivos de definición de loops usan la _numeración de Rosetta_, no la del PDB.

Ejemplo
=======

Por ejemplo: una línea válida en un archivo de loops (la línea por sí sola es un archivo válido):

```
LOOP 23 30 26
```
Loop de los residuos 23-30 con el punto de corte en 26.

Nombre
====

Las opciones `-loop_file` de Rosetta (y otras) solo toman un nombre o una ruta de archivo, así que cualquier nombre sirve siempre que lo especifiques.  Por ejemplo:

```
my_protein.loops 
loopsfile
loop_file
top7.loops
loops.txt
```


##Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Structure prediction applications]]: Lista de aplicaciones de predicción de estructuras, incluidas las aplicaciones de modelado de loops
* [[Algoritmos de modelado de loops|loopmodel-algorithms]]
* [[Structure prediction applications]]: Contiene enlaces a varias aplicaciones de modelado de loops
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

<!--
The purpose of this remaining text is to improve the searchability of this page: 
loops file 
loops file 
loops file 
loop file 
loop file 
loop file
loop file 
loop file 
loop file
loop file 
loop file 
loop file
//-->
