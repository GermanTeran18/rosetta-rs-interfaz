# Preparación de los archivos de entrada para las simulaciones de RosettaMP

[[_TOC_]]

## Spanfiles 

### Descripción

Un spanfile es un formato de archivo que usa Rosetta para modelar proteínas de membrana alfa-helicoidales. Contiene el número, la longitud y la posición en la secuencia de las hélices transmembrana. Un spanfile se genera a partir de un archivo FASTA con la herramienta de predicción de hélices transmembrana basada en la secuencia OCTOPUS ([http://octopus.cbr.su.se/](http://octopus.cbr.su.se/)). 

#### Generar el archivo de regiones transmembrana (OCTOPUS):

El archivo de topología de OCTOPUS de entrada se genera en [http://octopus.cbr.su.se/](http://octopus.cbr.su.se/) usando la secuencia de la proteína como entrada.

Archivo de topología de OCTOPUS de ejemplo:

```
##############################################################################
OCTOPUS result file
Generated from http://octopus.cbr.su.se/ at 2008-09-18 21:06:32
Total request time: 6.69 seconds.
##############################################################################

Sequence name: BRD4
Sequence length: 123 aa.
Sequence:
PIYWARYADWLFTTPLLLLDLALLVDADQGTILALVGADGIMIGTGLVGALTKVYSYRFV
WWAISTAAMLYILYVLFFGFTSKAESMRPEVASTFKVLRNVTVVLWSAYPVVWLIGSEGA
GIV

OCTOPUS predicted topology:
oooooMMMMMMMMMMMMMMMMMMMMMiiiiMMMMMMMMMMMMMMMMMMMMMooooooMMM
MMMMMMMMMMMMMMMMMMiiiiiiiiiiiiiiiiiiiiiMMMMMMMMMMMMMMMMMMMMM
ooo
```

#### Convertir el archivo de OCTOPUS al formato de archivo .span:

BRD4.span: archivo de predicción de topología transmembrana generado con el script octopus2span.pl de la siguiente manera:

`octopus2span.pl <OCTOPUS topology file>`

Comando de ejemplo: 
`<path to rosetta>/Rosetta/tools/membrane_tools/octopus2span.pl BRD4.octopus`

Archivo .span de ejemplo:

```
TM region prediction for BRD4 predicted using OCTOPUS
4 123
antiparallel
n2c
   6    26
  31    51
  58    78
  97   117
```

La 1.ª línea es un comentario. La 2.ª línea muestra el número de hélices transmembrana predichas (4 en el ejemplo de líneas de comando de abajo) y el número total de residuos (123 en el ejemplo de abajo). La 3.ª línea muestra la topología predicha de las hélices transmembrana en la membrana (actualmente solo está implementada la topología antiparalela). La 4.ª línea y todas las siguientes muestran los números de residuo inicial y final de cada una de las hélices transmembrana predichas. 

NOTA: el formato actual repite los números una vez, mientras que el formato original los repetía dos veces.

### Opciones

Los spanfiles se leen con la opción `-mp::setup::spanfiles <spanfile 1> <spanfile 2>`. Aunque la mayor parte del marco de membrana solo usa el primer spanfile (¡revisa tu archivo de registro!), algunas aplicaciones específicas pueden usar dos o más: la preparación de MPDocking usa dos. Si tienes dudas, revisa el registro con cuidado. 
 
### Ejemplo

`-mp::setup::spanfiles 1afo.span`

NOTA: la opción del RosettaMembrane original es `-in:file:spanfile 1afo.span`, pero quedará obsoleta. Usa la nueva. 

## Archivo PDB

### Descripción

Algunas aplicaciones requieren una estructura de proteína como entrada, como MPrelax, MP ddg y MPDocking. La documentación de cada aplicación indica lo que se necesita. En general, los PDB no necesitan estar transformados al marco de coordenadas de membrana para que Rosetta funcione. Sin embargo, si hace falta conocer la orientación de la proteína en la membrana, hay dos servidores, además de Rosetta, que ofrecen archivos PDB transformados o las matrices de rotación / traslación necesarias para esa transformación. 

PDBTM ([http://pdbtm.enzim.hu/](http://pdbtm.enzim.hu/)) es un PDB de proteínas transmembrana que se actualiza semanalmente y ofrece los PDB transformados para su descarga. Usa el servidor TMDET ([http://tmdet.enzim.hu/](http://tmdet.enzim.hu/)) para posicionar correctamente la proteína en la membrana. El archivo XML que proporciona contiene tanto las matrices de rotación / traslación como el grosor óptimo de la membrana para esa proteína.  

La base de datos OPM ([http://opm.phar.umich.edu/](http://opm.phar.umich.edu/)) ofrece un servicio similar con el servidor PPM ([http://opm.phar.umich.edu/server.php](http://opm.phar.umich.edu/server.php)), que podría ser más preciso para predecir el grosor óptimo de la membrana de cada proteína. 

En Rosetta hay dos movers que transforman la proteína al marco de coordenadas de membrana, y ambos hacen una transformación sencilla basada en la información de topología de la proteína. **Ten en cuenta que, por ahora, NINGUNO de estos dos movers usa la función de puntuación para el posicionamiento óptimo de alta resolución, aunque esta funcionalidad se añadirá en breve.**

El **MembranePositionFromTopologyMover** usa la topología de la proteína (SpanningTopology del spanfile) y la estructura para calcular una posición y orientación óptimas (centro y normal) de la membrana, representada por el MembraneResidue. Este mover solo debe usarse con una **proteína fija y una membrana flexible** (es decir, un residuo de la proteína está en la raíz del FoldTree).

El **TransformIntoMembraneMover** hace lo contrario: usa la topología de la proteína y la estructura de la proteína para calcular una posición y orientación óptimas de la membrana y luego rota y traslada la proteína a ese marco de coordenadas fijo. Este mover solo debe usarse con una **membrana fija y una proteína flexible** (es decir, el residuo de membrana está en la raíz del FoldTree).

El MembraneResidue puede estar presente como un residuo MEM en el registro HETATOM del archivo PDB y el AddMembraneMover lo lee automáticamente. Si hay más de un residuo de membrana en el PDB, el que debe considerarse se puede indicar con la opción `-mp::setup::membrane_rsd <membrane residue number>`. Un ejemplo de este residuo es el siguiente:
 
```
HETATM 1323 THKN MEM C  81      15.000   0.000   0.000  1.00  0.00           X  
HETATM 1324 CNTR MEM C  81      -1.425  -1.441   0.354  1.00  0.00           X  
HETATM 1325 NORM MEM C  81       1.016  -3.866  14.954  1.00  0.00           X  
```

### Opciones

`-in::file::s <PDB input file>` para leer un archivo PDB

`-mp::setup::membrane_rsd <membrane residue number>` para leer el residuo de membrana de un archivo PDB generado por el nuevo marco de membrana. 

### Ejemplo

`-in::file::s 1afo.pdb`

`-mp::setup::membrane_rsd 81`

## Archivo Lips

### Descripción

Un archivo lips describe la lipofilicidad (es decir, la preferencia por el entorno lipídico) de un residuo en una hélice. Esta información se puede usar para orientar las hélices en la membrana y distinguir los residuos orientados hacia los lípidos de los orientados hacia la proteína. La implementación de Rosetta usa en segundo plano el servidor LIPS de Adamian y Liang. Pronto habrá actualizaciones. 

#### Generar el archivo .lips4.

BRD4.lips4: archivo de predicción de lipofilicidad creado con el script run\_lips.pl de la siguiente manera (ten en cuenta que se necesitan blastpgp y la base de datos nr para ejecutar el script run\_lips.pl)

```
run_lips.pl <fasta file> <span file> <path to blastpgp> <path to nr database> <path to alignblast.pl script>
```

Comando de ejemplo:

```
<path to mini>/mini/src/apps/public/membrane_abinitio/run_lips.pl BRD4.fasta BRD4.span /work/bjornw/Apps/blast/bin/blastpgp /scratch/shared/genomes/nr ~bjornw/mini/src/apps/public/membrane_abinitio/alignblast.pl
```

Archivo lips4 de ejemplo:

```
Lipid exposed data: resnum mean-lipo lipophil entropy
      6  -1.000   3.004   1.211
      9  -1.000   2.268   2.137
     10  -1.000   4.862   1.095
     13  -1.000   1.304   1.552
     16  -1.000   3.328   2.025
  ...
```

### Opciones

`-mp:setup:lipsfile 1afo.lips4`

NOTA: la opción del RosettaMembrane original es `-in:file:lipofile 1afo.lips4`, pero quedará obsoleta. ¡Usa la nueva opción!

### Ejemplo

Un ejemplo de cómo usaba el RosettaMembrane original los archivos lips se encuentra en `Rosetta/main/tests/integration/tests/membrane_abinitio`. Esta funcionalidad aún no se ha probado en el marco de membrana.

## Referencias
* Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press
* Yarov-Yarovoy V, Schonbrun J, Baker D. (2006 Mar 1) Multipass membrane protein structure prediction using Rosetta. Proteins. 62(4):1010-25.
* Barth P, Schonbrun J, Baker D. (2007 Oct 2) Toward high-resolution prediction and design of transmembrane helical protein structures. Proc Natl Acad Sci U S A. 104(40):15682-7.
* Barth P, Wallner B, Baker D. (2009 Feb 3) Prediction of membrane protein structures with complex topologies using limited constraints. Proc Natl Acad Sci U S A. 106(5):1409-14.

## Contacto

- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))
