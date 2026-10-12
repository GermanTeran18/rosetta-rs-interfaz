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

Todo archivo fasta de ARN de Rosetta se verá un poco distinto de los archivos FASTA ordinarios. Por un lado, habrá información de cadena en la línea de encabezado (la que empieza con un corchete angular derecho) y puede haber varias cadenas. Por otro, la secuencia de ARN estará toda en minúsculas (para permitir especificar residuos de proteína en mayúsculas y ARN en minúsculas). En tercer lugar, los nucleótidos modificados químicamente pueden especificarse sustituyendo una letra ordinaria como `u` por un código especial `X`, que luego se modifica con un «nombre completo de residuo» como `X[5MU]` (que se traduce como «5-metiluridina»).

Ejemplo
=======

```
>foobar A:1-6
gX[5MC]ggau

>foobar B:1-6
auccX[7MG]c
```

Este formato lo usan aplicaciones como [[stepwise|stepwise]], [[ERRASER2]] y [[FARFAR2]].

## Una lista incompleta de nucleótidos modificados químicamente compatibles

ICY - isocitidina  
IGU - isoguanidina  
INO - inosina  

### 2'OMe
A2M - 2'-O-metiladenosina  
OMC - 2'-O-metilcitidina  
OMG - 2'-O-metilguanosina  
OMU - 2'-O-metiluridina  

### Otras modificaciones en 2'
5JO - 2'-O-prop-2-in-1-iladenosina  
A44 - 2'-O-metoxietiladenosina  
C43 - 2'-O-metoxietilcitidina  
C5L - 2'-O-metoxietil-5-metilcitidina  
G48 - 2'-O-metoxietilguanosina  
U36 - 2'-O-metoxietiluridina  

### 2'F
FMA - 2'-fluoroadenosina  
FMC - 2'-fluorocitidina  
FMG - 2'-fluoroguanosina  
FMU - 2'-fluorouridina  

### OP1 => SP1
SRA - adenosina-tiomonofosfato (enantiómero 1)  
SRC - citidina-tiomonofosfato (enantiómero 1)  
SRG - guanosina-tiomonofosfato (enantiómero 1)  
SRU - uridina-tiomonofosfato (enantiómero 1)  

### OP1 => SP2
SSA - adenosina-tiomonofosfato (enantiómero 2)  
SSC - citidina-tiomonofosfato (enantiómero 2)  
SSG - guanosina-tiomonofosfato (enantiómero 2)  
SSU - uridina-tiomonofosfato (enantiómero 2)  


### Bases modificadas
1AP - 2,6-diaminopurina  
1MA - 1-metil-6-hidroadenosina  
2MA - 2-metiladenosina  
2MG - 2-metilguanosina  
2MU - 2'O-,5-dimetiluridina  
4OC - 2'O-,5-dimetilcitidina  
5MC - 5-metilcitidina  
5MU - 5-metiluridina  
BRU - 5-bromo-2'O-desoxiuridina  
5BU - 5-bromouridina  
7MG - 7-metil-8-hidroguanosina  
G7M - 7-metil-guanosina  
7DA - 7-deaza-2'O-desoxiadenosina  
M2G - 2-dimetilguanosina  
MA6 - 6-dimetiladenosina  
PSU - pseudouridina  
UR3 - 3-metiluridina  
6MZ - 6-metiladenosina  
1MG - 1-metilguanosina  
4SU - 4-tiouridina  
3TD - 3-metilpseudouridina  
H2U - dihidrouridina  
MIA - 2-metiltio-6-isopenteniladenosina  
5FU - 5-fluorouridina  
5IU - 5-iodouridina  
2AP - 2-aminopurina  
PUR - purina  
6MG - 6-metilguanosina  
5FC - 5-fluorocitidina  
8OG - 8-oxo-2'-desoxiguanosina  
OMI - 2'O-metilinosina  
CFM - 2'O-metil-5-formilcitidina  
PPU - puromicina  
AET - N6-metil,N6-carbamoiltreoniladenosina  
T6A - N6-carbamoiltreoniladenosina  
3MC - 3-metilcitidina  
52C - 2',5-metilcitidina  
RIA - 2'-(5'-fosfo)ribosiladenosina  
QUO - queuosina  
YYG - wibutosina  
O2W - 2'-metilwibutosina  
NMT - 2'-metilcarbamoil-5-metiluridina  
M3G - 2,2,2'-trimetilguanosina  

## Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
