#interface_energy: energía en la interfaz entre dos conjuntos de residuos 
Metadatos
========

Autor: Andrea Bazzoli (ndrbzz [at] gmail.com)

Última actualización: julio de 2017

Código
====

El código de la aplicación se encuentra en `src/apps/public/analysis/interface_energy.cc`.

Propósito de la aplicación
===================

Dados dos conjuntos de residuos, o «caras», calcula su energía de interfaz como la suma de las energías por pares de residuos de todos los pares de residuos (R1, R2), con R1 perteneciente a la cara n.º 1 y R2 perteneciente a la cara n.º 2.

Uso
=====

### Línea de comandos
````
interface_energy -s <POSE> -face1 <FACE1> -face2 <FACE2> -score:hbond_bb_per_residue_energy
````
\<FACE1\> y \<FACE2\> son rutas a dos archivos que definen la cara n.º 1 y la cara n.º 2, respectivamente. Cada archivo especifica un residuo por línea indicando, en ese orden, el ID de cadena del residuo, el número de secuencia y el código de inserción en el archivo PDB de entrada.

### Ejemplo de entrada
El siguiente \<FACE1\> define una cara formada por los residuos 58, 59 y 60 de la cadena H:
````
H 58 _
H 59 _
H 60 _
````

El siguiente \<FACE2\> define una cara formada por los residuos 94 y 95 de la cadena A:
````
A 94 _
A 95 _
````
Ten en cuenta que un código de inserción en blanco se indica con un guion bajo (_).

Salida (en pantalla)
==================
* Energías por pares de todos los pares de residuos (R1, R2) para cada uno de varios tipos de energía (de corto alcance, de largo alcance dependiente del contexto y de largo alcance independiente del contexto).
* Energía de interfaz total, calculada como la suma de esas contribuciones por pares.

Por ejemplo, la salida para las dos caras anteriores (dado cierto Pose de entrada) es la siguiente:
````
##### PAIRWISE SHORT-RANGE ENERGIES #####
ILE58_H(51) --- HIS94_A(220): 0
ILE58_H(51) --- PRO95_A(221): 0
ASN59_H(52) --- HIS94_A(220): 0
ASN59_H(52) --- PRO95_A(221): 0
TRP60_H(53) --- HIS94_A(220): -0.92086
TRP60_H(53) --- PRO95_A(221): -0.962562

##### PAIRWISE ENERGIES FOR CI_LR_2B METHOD IN CHARGE OF dslf_ss_dst #####
ILE58_H(51) --- HIS94_A(220): 0
ILE58_H(51) --- PRO95_A(221): 0
ASN59_H(52) --- HIS94_A(220): 0
ASN59_H(52) --- PRO95_A(221): 0
TRP60_H(53) --- HIS94_A(220): 0
TRP60_H(53) --- PRO95_A(221): 0

##### PAIRWISE ENERGIES FOR CI_LR_2B METHOD IN CHARGE OF rama_prepro #####
ILE58_H(51) --- HIS94_A(220): 0
ILE58_H(51) --- PRO95_A(221): 0
ASN59_H(52) --- HIS94_A(220): 0
ASN59_H(52) --- PRO95_A(221): 0
TRP60_H(53) --- HIS94_A(220): 0
TRP60_H(53) --- PRO95_A(221): 0

##### TOTAL INTERFACE ENERGY: -1.88342
````
En la notación usada para especificar un residuo, después de los descriptores evidentes, el número entre paréntesis indica el índice del residuo en el Pose.

Ten en cuenta que los tipos de energía inactivos, que por tanto no aportan energía (como las energías de largo alcance dependientes del contexto en el ejemplo anterior), no se incluyen en la salida.

Referencias
==========
[1] Bazzoli A, Vance DJ, Rudolph MJ, Rong Y, Angalakurthi SK, Toth IV RT, Middaugh CR, Volkin DB, Weis DD, Karanicolas J, Mantis NJ. _Using homology modeling to interrogate binding affinity in neutralization of ricin toxin by a family of single domain antibodies_. Proteins: Structure, Function, and Bioinformatics, doi:
10.1002/prot.25353, 2017.

Véase también
========
[[Interface analyzer]]: calcula energías de unión, áreas superficiales enterradas y otras métricas para las interfaces entre dos o más cadenas de un PDB.

[[Residue Energy Breakdown]]: descompone las energías de la estructura por pares.