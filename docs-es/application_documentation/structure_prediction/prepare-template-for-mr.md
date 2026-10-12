#Script complementario prepare\_template\_for\_MR.pl

Metadatos
========

Última edición el 26 de octubre de 2010 por Frank DiMaio. Código de Frank DiMaio. Investigador principal: David Baker.

Código y demo
=============

El código de esta aplicación está en src/apps/public/electron\_density/prepare\_template\_for\_MR.pl. Una demo, que muestra el papel de este protocolo en un flujo de trabajo de reemplazo molecular, está en demo/electron\_density/molecular\_replacement. En particular, el paso 1 del flujo de trabajo se ocupa del uso de esta aplicación. (El README de esta carpeta explica cada paso en detalle).

Propósito de la aplicación
===========================================

Este es un script auxiliar para preparar un archivo molde y un archivo de alineamiento con el fin de usar Rosetta para resolver problemas difíciles de reemplazo molecular. A partir de un archivo de alineamiento producido por HHsearch, genera los archivos molde y de alineamiento de entrada que sirven como entrada a la construcción de modelos de Rosetta.

Algoritmo
=========

El script toma un solo argumento: un archivo de alineamiento en formato HHR. El script analiza el archivo .hhr, descarga cada PDB molde y recorta el PDB a los residuos alineados. Además, el script produce un archivo de alineamiento «estilo Rosetta»; el formato se explica en la sección de salidas esperadas.

Este script usa el alineamiento para producir un molde recortado adecuado para una búsqueda inicial de reemplazo molecular. Se eliminan todos los residuos borrados y los residuos alineados que no coinciden se recortan hasta el carbono gamma. En términos funcionales, el recorte del molde hace lo mismo que el software cristalográfico «Sculptor», pero no reasigna los residuos como lo hace Sculptor (y facilita ejecutarlo con distintos alineamientos).

Archivos de entrada
===========

La única entrada, un archivo de alineamiento .hhr, suele provenir de la interfaz web de HHsearch ( [http://toolkit.tuebingen.mpg.de/hhpred](http://toolkit.tuebingen.mpg.de/hhpred) ). Tras enviar la secuencia a través de su sitio web, exporta los resultados a un archivo .hhr. Los resultados pueden recortarse para que solo se incluyan los alineamientos con un valor e y una cobertura de secuencia razonables.

El archivo HHR recortado debería verse más o menos así:

```
Query         1XXX 
Match_columns 134
No_of_seqs    101 out of 418
Neff          6.7 
Searched_HMMs 22773
Command       /cluster/toolkit/production/bioprogs/hhpred/hhsearch -cpu 4 -v 1 -i /cluster/toolkit/production/tmp/production/417840/9488624.hhm -d /cluster/toolkit/production/databases/hhpred/new_dbs/pdb70_21Aug10/db/pdb.hhm -o /cluster/toolkit/production/tmp/production/417840/9488624.hhr -p 20 -P 20 -Z 100 -B 100 -seq 1 -aliw 80 -global -ssm 2 -norealign -sc 1 -dbstrlen 10000 -cs /cluster/toolkit/production/bioprogs/csblast/data/clusters.prf 

 No Hit                             Prob E-value P-value  Score    SS Cols Query HMM  Template HMM
  1 2qo4_A Liver-basic fatty acid  100.0       0       0  292.6  21.2  126    2-133     1-126 (126)


No 1  
>2qo4_A Liver-basic fatty acid binding protein; liver bIle acid-binding protein, BABP, FABP, cholic acid, cholate, bIle acid, lipid-binding, transport; HET: CHD; 1.50A {Danio rerio} PDB: 2qo6_A* 2qo5_A* 2ftb_A* 2ft9_A*
Probab=100.00  E-value=0  Score=292.58  Aligned_cols=126  Identities=31%  Similarity=0.488  Sum_probs=0.0

Q ss_pred             CcccEEEEEEeccCHHHHHHHcCCCHHHHhhhhcCCceEEEEEeCCEEEEEEEccceEEEEEEECCCcEEeecccCCCCE
Q 1CRB_ChainA       2 VDFNGYWKMLSNENFEEYLRALDVNVALRKIANLLKPDKEIVQDGDHMIIRTLSTFRNYIMDFQVGKEFEEDLTGIDDRK   81 (134)
Q Consensus         2 ~~f~G~wkl~~sENfde~Lk~lGv~~~~Rk~a~~~~p~~eI~~~Gd~~tikt~t~~kt~~~~F~lGeefee~~~t~dg~~   81 (134)
                      |+|+|+|+|++|||||+||+|||||+++|++|+.++|+++|+||||+|+|++.+++++.+++|+|||||||+  ++||++
T Consensus         1 MaF~G~wkl~~sENfd~flkalGv~~~~rk~a~~~~p~~~I~~~Gd~~~ikt~s~~kt~~~~F~lGeefee~--~~dG~k   78 (126)
T 2qo4_A            1 MAFSGTWQVYAQENYEEFLRAISLPEEVIKLAKDVKPVTEIQQNGSDFTITSKTPGKTVTNSFTIGKEAEIT--TMDGKK   78 (126)
T ss_dssp             -CCCEEEEEEEEESHHHHHHHTTCCHHHHHHTTTCCCEEEEEEETTEEEEEEEETTEEEEEEEETTBEEEEE--CTTSCE
T ss_pred             CCccEEEEEEeccCHHHHHHHcCCCHHHHhhhhcCCceEEEEEeCCEEEEEEEcCCeeEEEEEECCCcEEEE--cCCCCE


Q ss_pred             EEEEEEEECCEEEEEEECCCCCeEEEEEEECCEEEEEEEECCEEEEEEEEEC
Q 1CRB_ChainA      82 CMTTVSWDGDKLQCVQKGEKEGRGWTQWIEGDELHLEMRAEGVTCKQVFKKV  133 (134)
Q Consensus        82 ~k~~~t~eg~kLv~~~~~~~~~~~~~re~~g~~l~~t~~~~~V~~~R~ykrv  133 (134)
                      +|++++||||+|++    ..++...+||++||+|++||+++||+|+|+|+||
T Consensus        79 ~k~~~t~eg~kLv~----~~~~~~~~Re~~g~~l~~t~~~~~v~~~R~ykrv  126 (126)
T 2qo4_A           79 LKCIVKLDGGKLVC----RTDRFSHIQEIKAGEMVETLTVGGTTMIRKSKKI  126 (126)
T ss_dssp             EEEECEEETTEEEE----ECSSCEEEEEEETTEEEEEEEETTEEEEEEEEEC
T ss_pred             EEEEEEEECCEEEE----EECCCcEEEEEECCEEEEEEEECCEEEEEEEEEC
```

Limitaciones
===========

-   El script no admite ningún otro formato de entrada.

-   Si hhsearch devuelve PDBs obsoletos, el script intenta encontrar el reemplazo, pero no está garantizado. Quizá tengas que editar a mano el archivo .hhr para que apunte al PDBID actualizado correcto.

Consejos
====

-   Antes de ejecutar el script, mira el archivo de alineamiento .hhr. Intenta recortar los alineamientos que solo cubren una pequeña parte de la secuencia objetivo; probablemente no vale la pena el tiempo que lleva ejecutarlos.

-   Inspecciona visualmente los moldes recortados antes de ejecutar. ¿Se insertaron huecos en medio de hélices o hebras? Si es así, puede que el molde o el alineamiento no sean buenos.

Salidas esperadas
================

El script generará 2 archivos:

(1) El archivo PDB recortado. Este archivo debe usarse como entrada de un programa de reemplazo molecular (como PHASER) para encontrar un conjunto inicial de posibles soluciones para refinar.

(2) Un archivo de alineamiento para usar en Rosetta. El archivo de alineamiento tiene este aspecto:

```
## 1CRB_ 2qo4.PHASER.1.pdb
# hhsearch
scores_from_program: 0 1.00
2 DFNGYWKMLSNENFEEYLRALDVNVALRKIANLLKPDKEIVQDGDHMIIRTLSTFRNYIMDFQVGKEFEEDLTGIDDRKCMTTVSWDGDKLQCVQKGEKEGRGWTQWIEGDELHLEMRAEGVTCKQVFKKV
0 AFSGTWQVYAQENYEEFLRAISLPEEVIKLAKDVKPVTEIQQNGSDFTITSKTPGKTVTNSFTIGKEAEIT--TMDGKKLKCIVKLDGGKLVCRTD----RFSHIQEIKAGEMVETLTVGGTTMIRKSKKI
--
```

La primera línea es '\#\#' seguida de: (1) un código para el archivo de salida (2) el nombre del PDB molde. Si el molde se renombra más tarde (por el programa de reemplazo molecular, por ejemplo), habría que cambiarlo.

La segunda línea identifica el origen del alineamiento; la tercera déjala tal cual.

La cuarta línea es la secuencia objetivo y la quinta es la del molde... el número es un «desplazamiento» que identifica dónde empieza la secuencia. Sin embargo, el número no usa el resid del PDB, sino que simplemente cuenta residuos *empezando en 0* . La sexta línea es '–'.

Posprocesamiento
===============

Los modelos se suelen usar para una búsqueda de reemplazo molecular; los modelos resultantes y los archivos .ali se usan luego como entradas del protocolo de reconstrucción y refinamiento de MR de Rosetta (consulta [[esta página|mr-protocols]] ).

Para más información sobre los pasos posteriores a este script, consulta los pasos 2-5 del tutorial en /demo/electron\_density/molecular\_replacement.
