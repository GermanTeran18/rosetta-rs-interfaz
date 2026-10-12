#Aplicación Terdockin

Metadatos
========

Este documento fue escrito el 30 de octubre de 2019 por Yue Zhang (yuezh@ucdavis.edu).

Terdockin (también llamado docking de terpenos o Terry docking) fue desarrollado originalmente por Terry O'Brien en el laboratorio de Justin B. Siegel para el docking de terpeno sintasas. También puedes inspirarte en este protocolo si intentas hacer docking de varios ligandos.

Código
========

El script XML se encuentra aquí: https://github.com/RosettaCommons/rosetta_scripts_scripts/blob/master/scripts/public/docking/terpeneSynthase_docking.xml.

Archivos de entrada
========
Para ejecutar este protocolo de docking necesitarás los siguientes archivos:

1. Archivo PDB de la proteína. Con los encabezados adecuados para las restricciones. 

2. Archivo params de todos los ligandos. 

3. Archivo de restricciones 

4. Archivo de opciones (flags)

5. Archivo XML

Hay ejemplos de estos archivos en el protocolo de docking de ligandos. El archivo XML se encuentra en el enlace mencionado arriba. La sección Configuración del cálculo incluye los detalles de preparación de cada archivo.

Configuración del cálculo
========
Este es un ejemplo de preparación de archivos para un protocolo típico de docking de terpeno sintasas. 

### Archivo PDB de la proteína

Se recomienda relajar primero la proteína con Rosetta. Añade todos los ligandos al final del archivo PDB. Etiqueta la proteína como cadena A y todos los ligandos como cadenas B, C, D...
Asegúrate de que el encabezado del archivo PDB concuerde con el archivo de restricciones. Ejemplo de formato de archivo:
```
REMARK 666 MATCH TEMPLATE C Y00  1 MATCH MOTIF B X00 1   1  1
REMARK 666 MATCH TEMPLATE B X00  1 MATCH MOTIF A ASP 73  2  1
... 
ATOM      1  N   GLN A   1      56.899  -4.088   0.980  1.00  0.00           N
ATOM      2  CA  GLN A   1      56.216  -4.838  -0.121  1.00  0.00           C   
...
TER
HETATM    1  P1  X00 B   1      30.437 -11.786   3.932  1.00 20.00           P  
HETATM    2  P2  X00 B   1      29.144 -11.943   6.478  1.00 20.00           P  
...
TER
```
### Archivo params de todos los ligandos

Se puede generar a partir de un archivo mol2. 

Consulta las instrucciones aquí: [Preparación de ligandos](https://www.rosettacommons.org/demos/latest/tutorials/prepare_ligand/prepare_ligand_tutorial)

### Archivo de restricciones 

Consulta [Formato del archivo de restricciones geométricas para matching y diseño de enzimas](https://www.rosettacommons.org/docs/latest/rosetta_basics/file_types/match-cstfile-format) para ver los detalles.
Ejemplo de formato de archivo (ten en cuenta que las líneas que empiezan con # están comentadas; puedes reactivarlas según lo necesites. Se necesitan varios bloques si tienes más de una restricción):
```
CST::BEGIN
  TEMPLATE::   ATOM_MAP: 1 atom_name: MG3 O5 P1
  TEMPLATE::   ATOM_MAP: 1 residue3:  X00
	
  TEMPLATE::   ATOM_MAP: 2 atom_name: OD2 CG CB
  TEMPLATE::   ATOM_MAP: 2 residue1:  D
	
  CONSTRAINT:: distanceAB:    2.5   0.3    500 0    3
# CONSTRAINT::    angle_A:   65.8   6.5    50  360. 2
  CONSTRAINT::    angle_B:  145.3  20.0    50  360. 2
# CONSTRAINT::  torsion_A:   83.6  10.0    50  360. 2
  CONSTRAINT:: torsion_AB:  128.7  20.0    50  360. 2
# CONSTRAINT::  torsion_B:  141.0  15.0    50  360. 2
```

### Archivo de opciones (flags)

Consulta [este enlace](https://www.rosettacommons.org/docs/latest/development_documentation/code_structure/namespaces/namespace-utility-options#flagsfile) para ver los detalles sobre cómo escribir un archivo de opciones.
Un archivo de ejemplo se ve así:
```
-score::weights ref2015.wts
-in
 -file
  -s 4xlx_wlig_1.pdb
  -extra_res_fa X00.params
  -extra_res_fa Y00.params
-out
 -file
 -overwrite	
-packing
 -ex1
 -ex1aro
 -ex2
-packing::ex1aro:level 6
-packing::ex2aro
-packing::extrachi_cutoff 1
-packing::use_input_sc
-packing::unboundrot 4xlx_wlig_1.pdb
-packing::flip_HNQ
-packing::no_optH false

-enzdes::minimize_all_ligand_torsions 5.0
-enzdes::bb_min_allowed_dev 0.5
-enzdes::cstfile dock.cst

-run::preserve_header
-run:version
-nblist_autoupdate
-linmem_ig 10
-database /share/siegellab/tiffy/rosetta_bin_linux_2018.09.60072_bundle/main/database/

-jd2::enzdes_out

-mute core.util.prof ## dont show timing info
-mute core.io.database
```

### Archivo XML

El script XML se encuentra aquí: https://github.com/RosettaCommons/rosetta_scripts_scripts/blob/master/scripts/public/docking/terpeneSynthase_docking.xml.

Ejecutar el cálculo 
========
Para ejecutar el cálculo de docking, haz 
```
Rosetta/Path/main/source/bin/rosetta_scripts.default.linuxgccrelease @flags  -parser:protocol XMLfile.xml -nstruct nstruct_number
```

Referencias
========
Artículo de la metodología:

[Predicting Productive Binding Modes for Substrates and Carbocation Intermediates in Terpene Synthases—Bornyl Diphosphate Synthase As a Representative Case](https://pubs.acs.org/doi/abs/10.1021/acscatal.8b00342)

Terrence E. O’Brien, Steven J. Bertolani, Yue Zhang, Justin B. Siegel Dean J. Tantillo

Docking con tres ligandos:

[Switching on a Nontraditional Enzymatic Base—Deprotonation by Serine in the ent-Kaurene Synthase from Bradyrhizobium japonicum](https://pubs.acs.org/doi/abs/10.1021/acscatal.9b02783)

Meirong Jia, Yue Zhang, Justin B. Siegel, Dean J. Tantillo, Reuben J. Peters

Otros ejemplos:

[Mechanistically informed predictions of binding modes for carbocation intermediates of a sesquiterpene synthase reaction](https://pubs.rsc.org/en/content/articlehtml/2016/sc/c6sc00635c)

T. E. O'Brien, S. J. Bertolani, D. J. Tantillo and J. B. Siegel

##Véase también
* [Tutorial de docking de ligandos](https://www.rosettacommons.org/demos/latest/tutorials/ligand_docking/ligand_docking_tutorial)
* [[RosettaScripts]]: página principal de la interfaz RosettaScripts de Rosetta


