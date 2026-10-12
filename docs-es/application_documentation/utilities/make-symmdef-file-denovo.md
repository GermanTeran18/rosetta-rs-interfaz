#Script de creación de archivos de definición de simetría de novo.

*Autor: Ingemar André*

*Última edición el 20 de agosto de 2010 por Ingemar André. Código de Ingemar Andre.*

Código y demostración
=============

Todo el código está contenido en el script de Python main/source/src/apps/public/symmetry/make_symmdef_file_denovo.py.

Propósito
===========================================

Este script crea automáticamente archivos de definición de simetría correspondientes a la simetría especificada. Actualmente cubre la simetría cíclica y la diédrica.

Limitaciones
===========

Esta rutina no crea archivos de definición de simetría para todos los tipos de simetría. Esos hay que crearlos a mano (consulta [[la guía de definición de simetría|symmetry]]) o a partir de una plantilla, aplicando [[make_symmdef_file|make-symmdef-file]] a un complejo proteico conocido.

Opciones
=======

Si ejecutas el script sin opciones, muestra el rango de opciones posibles.

```
usage: make_symmdef_file_denovo.py [options]

example: make_symmdef_file_denovo.py -symm_type cn -nsub 2
example: make_symmdef_file_denovo.py -symm_type dn -nsub 4
example: make_symmdef_file_denovo.py -symm_type dn -nsub 4 -slide_type RANDOM -slide_criteria_type CEN_DOCK_SCORE
example: make_symmdef_file_denovo.py -symm_type cn -nsub 24 -subsystem

common options:
    -symm_type (cn|dn)                                          : The type of symmetry. Currently cyclic or dihedral symmetry
    -nsub <integer>                                             : number of subunits
    -subsystem                                                  : Simulate a smallers subsystem. For cn 3 consecutive subunits are represented.
                                                                  For dn 6 subunits are represented 3 in the upper ring and 3 in the lower ring
    -slide_type (RANDOM|SEQUENTIAL|ORDERED_SEQUENTIAL)          : Defines how a multidimensional slide should be performed.
                                                                  For dn symmetry there are two sliding directions. A slide
                                                                  can be done by randomly selecting a slide direction for each
                                                                  slide step (RANDOM), randomly deciding on which direction should
                                                                  be slided first but always sequentially go through both (SEQUENTIAL),
                                                                  or define the order yourself (ORDERED_SEQUENTIAL). RANDOM default
    -slide_criteria_type (CEN_DOCK_SCORE|FA_REP_SCORE|CONTACTS) : Defines what the criteria is for abandaning a slide. Either
                                                                  the CEN_DOCK_SCORE, FA_REP_SCORE or the number of contacts. CEN_DOCK_SCORE deafult
    -slide_criteria_val <string|float>                          : Sets the actual value when a slide move is abandoned given the criteria type. By default
                                                                  set to AUTOMATIC, which means that ROSETTA figures it out by itself. Really
                                                                  only useful for the CONTACTS type
```

Salidas esperadas
================

Un ejemplo de línea de comandos para generar un trímero. Se usó el mismo comando para crear la definición de simetría de la prueba de integración de docking simétrico (rosetta/main/tests/integration/tests/symmetric\_docking):

```
make_symmdef_file_denovo.py -symm_type cn -nsub 3
```

Esto produce la siguiente definición de simetría:

```
symmetry_name c3
subunits 3
recenter
number_of_interfaces  1
E = 3*VRT0001 + 3*(VRT0001:VRT0002)
anchor_residue COM
virtual_transforms_start
start -1,0,0 0,1,0 0,0,0
rot Rz 3
virtual_transforms_stop
connect_virtual JUMP1 VRT0001 VRT0002
connect_virtual JUMP2 VRT0002 VRT0003
set_dof BASEJUMP x(50) angle_x(0:360) angle_y(0:360) angle_z(0:360)
```

El formato real del archivo de definición de simetría se describe en la [[Guía del usuario de simetría.|symmetry]]


## Véase también

* [[Tipos de archivos de entrada | file-types-list]] que se usan en Rosetta.
* [[Symmetry]]: sobre el modo de simetría
* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
