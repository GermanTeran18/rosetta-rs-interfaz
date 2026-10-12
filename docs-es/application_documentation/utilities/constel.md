#constel: "Constelaciones" de átomos para el rescate químico de estructuras
Metadatos
========

Autor: Andrea Bazzoli (ndrbzz [at] gmail.com)

Última actualización: julio de 2020

Código
====

El código de la aplicación está en `src/apps/public/constel.cc`.

Propósito de la aplicación
===================
Extrae "constelaciones" de átomos de una estructura proteica. Una constelación se define como la disposición 3D de los átomos que pierde un grupo de residuos espacialmente contiguos al mutar a un residuo más pequeño. (Dos residuos se consideran "espacialmente contiguos" si sus cadenas laterales interactúan con una energía atractiva de van der Waals sin ponderar [fa_atr] inferior a –0.375.)

Una vez extraídas, las constelaciones pueden servir como plantillas para compuestos que rescaten la estructura y la actividad de la proteína o del complejo proteico mutado.

Uso
=====
Las opciones específicas de la aplicación se dividen en opciones de "búsqueda" y opciones de "filtrado".

### Opciones de búsqueda: combinaciones aceptadas
La aplicación requiere una, y solo una, de las 6 combinaciones de opciones de búsqueda siguientes (SEA#1 a SEA#6): 

**SEA#1** extrae todas las constelaciones de 2 residuos formadas por un residuo objetivo:
````
-constel:pair_target_resnum <PDB_NUM>
-constel:target_chain <PDB_CHAIN>
````
* \<PDB_NUM\> es el número del residuo objetivo en el archivo PDB.
* \<PDB_CHAIN\> es el identificador de cadena del residuo objetivo en el archivo PDB.

**SEA#2** extrae todas las constelaciones de 2 residuos formadas por todos los residuos:
````
-constel:pair_all_res
````

**SEA#3** extrae todas las constelaciones de 3 residuos formadas por un residuo objetivo:
````
-constel:triple_target_resnum <PDB_NUM>
-constel:target_chain <PDB_CHAIN>
````
* \<PDB_NUM\> es el número del residuo objetivo en el archivo PDB.
* \<PDB_CHAIN\> es el identificador de cadena del residuo objetivo en el archivo PDB.

**SEA#4** extrae todas las constelaciones de 3 residuos formadas por todos los residuos:
````
-constel:triple_all_res
````

**SEA#5** extrae todas las constelaciones de 2 residuos que coinciden con un tipo objetivo de mutación de 2 residuos de grande a pequeño: 
````
-constel:pair_target_mutations <A><B>_<C><D>
````
* \<A\>, \<B\>, \<C\> y \<D\> son códigos de una letra de tipos de aminoácido. \<A\>\<B\>\_\<C\>\<D\> representa el tipo de mutación objetivo de 2 residuos, donde \<A\>\<B\> denota la mutación del tipo de aminoácido \<A\> (más grande) al tipo \<B\> (más pequeño), y \<C\>\<D\> denota la mutación del tipo de aminoácido \<C\> (más grande) al tipo \<D\>
(más pequeño).

**SEA#6** extrae una única constelación objetivo: 
````
-constel:target_cnl <CNL_FILE>
````
* \<CNL_FILE\> es la ruta de un archivo de entrada que especifica la constelación. El archivo tiene el siguiente formato:
````
<CID_1> <RNU_1> <ICO_1> <AASTA_1> <AAEND_1>
...
<CID_N> <RNU_N> <ICO_N> <AASTA_N> <AAEND_N>
````
* \<CID_i\>, \<RNU_i\>, \<ICO_i\>, \<AASTA_i\> y \<AAEND_i\> son, respectivamente, el identificador de cadena, el número de residuo, el código de inserción, el tipo de aminoácido inicial (más grande) y el tipo de aminoácido final (más pequeño) del i-ésimo residuo que contribuye a la constelación (i=1,...,N; N=2 o N=3).
* \<AASTA_i\> y \<AAEND_i\> son códigos de una letra de tipos de aminoácido. 
* \<CID_i\>, \<RNU_i\> y \<ICO_i\> son los que figuran en el archivo PDB de entrada del Pose.
* Un identificador de cadena en blanco en el archivo PDB de entrada se especifica con ',' (coma).
* Un código de inserción en blanco en el archivo PDB de entrada se especifica con '_' (guion bajo).

### Opciones de filtrado:
La aplicación acepta una o más de las 10 combinaciones de opciones de filtrado siguientes (FIL#1 a FIL#10). Todos los filtros están inactivos por defecto.

**FIL#1** retira de las constelaciones los átomos más cercanos a lo que queda de su residuo tras la mutación. Así se evita el choque entre los residuos mutados y el compuesto de rescate:
````
-constel:cnl_stripped
````

**FIL#2** filtra por área de superficie accesible al solvente (SASA):
````
-constel:max_atom_sasa <X>
````
* \<X\> es la SASA máxima permitida para un átomo de una constelación (ángstroms cuadrados). Por defecto es 999999.9.

**FIL#3** extrae solo las constelaciones compartidas por dos o más cadenas: 
````
-constel:chain_interface
````

**FIL#4** extrae solo las constelaciones que contienen al menos un anillo aromático:
````
-constel:aromatic
````

**FIL#5** extrae solo las constelaciones que no contienen ninguno de los residuos de una lista de residuos prohibidos: 
````
-constel:cnl_exclude <FORBIDDEN>
````
* \<FORBIDDEN\> es la ruta de un archivo que enumera los residuos prohibidos. El archivo tiene el siguiente formato:
````
<RNU_1> <CID_1> 
...
<RNU_N> <CID_N> 
````
* \<RNU_i\> y \<CID_i\> son, respectivamente, el número y el identificador de cadena del i-ésimo residuo prohibido en el archivo PDB de entrada del Pose (i=1,...,N).

**FIL#6** extrae solo las constelaciones cercanas al extremo N o C de una cadena proteica:
````
-constel:prox_ct_max <DCT>
-constel:prox_tt_max <DTT>
-constel:prox_nres <TNUM>
````
* \<DCT\> es la distancia máxima permitida (ángstroms) entre una constelación y el extremo N o C de cualquiera de las cadenas a las que pertenece la constelación. La posición de la constelación es la de su centro de masa; la posición de cada residuo terminal es la de su átomo CA. Por defecto es 0, lo que significa que esta combinación de opciones está inactiva.
* \<DTT\> es la distancia máxima permitida (ángstroms) entre los extremos N y C de cualquiera de las cadenas a las que pertenece una constelación. Por defecto es 10.
* \<TNUM\> es el número de residuos que forman los extremos N y C. Por defecto es 10.

**FIL#7** extrae solo las constelaciones que, en principio, son compatibles con el rescate mediante un compuesto que contenga un grupo indol y un grupo carboxilo:
````
-constel:indole_coo
````

**FIL#8** extrae solo las constelaciones que, en principio, son compatibles con el rescate mediante triptamina:
````
-constel:tryptamine
````

**FIL#9** extrae solo las constelaciones que, en principio, son compatibles con el rescate mediante anfetamina:
````
-constel:amphetamine
````

**FIL#10** extrae solo las constelaciones que, en principio, son compatibles con el rescate mediante histamina:
````
-constel:histamine
````

Salida 
======
Un conjunto de archivos PDB, cada uno de los cuales describe una constelación distinta. Por ejemplo, la salida de la línea de comandos
````
constel.linuxclangrelease -s 2awl.pdb -constel:triple_target_resnum 69 -constel:target_chain A -constel:max_atom_sasa 15 -constel:aromatic
````
es un conjunto de 160 archivos de constelaciones:
````
...
constel_Q0069GA_F0084AA_V0150GA.pdb
constel_Q0069GA_F0084AA_Y0092AA.pdb
constel_Q0069GA_F0084AA_Y0092FA.pdb
constel_Q0069GA_F0084AA_Y0092GA.pdb
constel_Q0069GA_F0084AA_Y0092LA.pdb
constel_Q0069GA_F0084GA_I0152AA.pdb
constel_Q0069GA_F0084GA_I0152GA.pdb
constel_Q0069GA_F0084GA_I0152VA.pdb
constel_Q0069GA_F0084GA_I0161AA.pdb
constel_Q0069GA_F0084GA_I0161GA.pdb
constel_Q0069GA_F0084GA_I0161VA.pdb
constel_Q0069GA_F0084GA_L0201AA.pdb
constel_Q0069GA_F0084GA_L0201GA.pdb
constel_Q0069GA_F0084GA_N0185AA.pdb
...
````
Los nombres de los archivos de salida tienen el formato "constel\_\<M1\>\_\<M2\>(\_\<M3\>).pdb". \<Mi\> denota la mutación del i-ésimo residuo de la constelación (i=1,2,3) y tiene el formato \<S\>\<IIII\>\<E\>\<C\>, donde \<S\> es el tipo de aminoácido inicial, \<IIII\> es un número de cuatro dígitos, rellenado con ceros, que indica el número del residuo, \<E\> es el tipo de aminoácido final y \<C\> es el identificador de cadena del residuo.

Cada archivo de salida empieza con una línea HEADER que resume la constelación y después enumera los registros ATOM de la constelación. En el ejemplo anterior, el archivo constel_Q0069GA_F0084AA_Y0092LA.pdb tiene el siguiente contenido:
````
HEADER    1st MUTATION: A:Q69G 2nd MUTATION: A:F84A 3rd MUTATION: A:Y92L
ATOM      1  CB  GLN A  69      27.786  23.666   8.084  1.00  9.49           C  
ATOM      2  CG  GLN A  69      28.268  24.943   7.384  1.00 14.82           C  
ATOM      3  CD  GLN A  69      28.124  26.209   8.214  1.00 17.44           C  
ATOM      4  OE1 GLN A  69      27.286  26.296   9.111  1.00 19.60           O  
ATOM      5  NE2 GLN A  69      28.920  27.217   7.883  1.00 18.31           N  
ATOM      6  CG  PHE A  84      27.462  21.466  11.574  1.00  7.47           C  
ATOM      7  CD1 PHE A  84      26.557  22.537  11.710  1.00  6.59           C  
ATOM      8  CD2 PHE A  84      28.838  21.727  11.593  1.00  4.88           C  
ATOM      9  CE1 PHE A  84      27.024  23.868  11.862  1.00  6.87           C  
ATOM     10  CE2 PHE A  84      29.330  23.043  11.744  1.00  9.75           C  
ATOM     11  CZ  PHE A  84      28.423  24.118  11.878  1.00  9.03           C  
ATOM     12  CE1 TYR A  92      22.400  23.144  10.666  1.00  9.42           C  
ATOM     13  CE2 TYR A  92      23.040  20.837  11.071  1.00 12.92           C  
ATOM     14  CZ  TYR A  92      23.118  22.004  10.294  1.00 12.27           C  
ATOM     15  OH  TYR A  92      23.886  22.013   9.152  1.00 11.00           O  
````


Referencias
==========
Khowsathit J, Bazzoli A, Cheng H, and Karanicolas J. _Computational design of an allosteric antibody switch by deletion and rescue of a complex structural constellation_ (2020) ACS Cent Sci 6(3):390–403. https://doi.org/10.1021/acscentsci.9b01065
