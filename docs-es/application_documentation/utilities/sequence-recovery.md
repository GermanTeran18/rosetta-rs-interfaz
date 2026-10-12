#La aplicación sequence\_recovery

Metadatos
========

Este documento se actualizó por última vez el 22 de junio de 2010 por Ron Jacak. El investigador principal (PI) correspondiente es Brian Kuhlman (bkuhlman@email.unc.edu).

Código y demostración
=============

El código de la aplicación sequence\_recovery está en `       src/apps/public/sequence_recovery.cc      `. Hay una demostración de la aplicación en `       demo/sequence_recovery/      `.

Referencias
==========

Las pruebas de recuperación de secuencia se han usado ampliamente durante el desarrollo de Rosetta. Las siguientes publicaciones muestran resultados que se pueden obtener con esta aplicación:

-   Computational Protein Design with Explicit Consideration of Surface Hydrophobic Patches. R. Jacak, A. Leaver-Fay, and B. Kuhlman. *Submitted* .
-   [Native protein sequences are close to optimal for their structures.](http://www.ncbi.nlm.nih.gov/pubmed/10984534) B. Kuhlman and D. Baker. PNAS 2000 Sep 12;97(19):10383-8.

Propósito
========

Esta aplicación recibe como entrada un conjunto de proteínas nativas y un conjunto correspondiente de proteínas rediseñadas, y produce una tabla de recuperaciones de secuencia del núcleo, global y de la superficie por tipo de aminoácido. También se produce una tabla del aminoácido nativo y del tipo de residuo en el que Rosetta mutó esas posiciones. La salida se explica con más detalle en las secciones siguientes.

Algoritmo
=========

La recuperación de secuencia se mide leyendo ambos conjuntos de estructuras y calculando después el porcentaje de identidad entre ellos iterando sobre todos los residuos. El algoritmo es muy sencillo. Ambos conjuntos de estructuras se leen como objetos Pose y se guardan en vectores de Pose. El algoritmo itera sobre cada residuo de cada Pose del vector de estructuras nativas y comprueba si ese residuo es el mismo en la proteína diseñada correspondiente. Además del porcentaje de identidad global, también calcula el porcentaje de identidad para las posiciones del núcleo y de la superficie. Las posiciones del núcleo se definen como aquellas con \>= 24 vecinos (distancia CBeta dentro de 10 Angstroms) y las de la superficie como aquellas con \<= 16 vecinos (distancia CBeta dentro de 10 Angstroms). Se puede proporcionar opcionalmente un task factory para que el porcentaje de identidad se calcule solo para un subconjunto de posiciones dentro de las estructuras suministradas.

Limitaciones
===========

La aplicación supone que el orden de los PDB es idéntico en ambas listas de estructuras, es decir, que cada estructura PDB nativa tiene una estructura rediseñada correspondiente y que las estructuras figuran en el mismo orden.

Archivos de entrada
===========

Estructuras - OBLIGATORIO
---------------------

Hay que suministrar al menos dos listas de archivos PDB. Es aceptable tener un solo archivo PDB en cada lista, si se quiere medir la recuperación de secuencia de una sola proteína. Si se desea la recuperación de secuencia de varios PDB, las estructuras de cada lista deben estar en el mismo orden.

```
-native_pdb_list <listfile>     The list of native proteins to compare against
-redesign_pdb_list <listfile>   The list of redesigned proteins to compare to the native proteins
```

Archivo de etiquetas (tag file)
--------

Por defecto, la aplicación mide la recuperación de secuencia en todas las posiciones. Se puede especificar con la opción -parse\_tagfile un archivo que contenga operaciones de tarea (task operations) para aplicarlas a cada Pose y restringir qué residuos se incluyen en la medición de la recuperación de secuencia. Más abajo, en los ejemplos, se muestra un archivo de etiquetas de ejemplo. La mayoría de los usuarios querrá usar el comportamiento por defecto.

```
-parse_tagfile <file>           An XML file containing a set of task operations to limit which residues are included in calculating
                                percent identity
```

Opciones
=======

Ubicación de la base de datos - OBLIGATORIO
----------------------------

```
-database <path/to/rosetta/main/database>   Specifies the location of the rosetta database
```

Otras opciones
-------------

```
-se_cutoff                      The maximum number of neighbors a residue can have to be considered surface exposed (default: 16).
-seq_recov_filename             The name of the file to output the sequence recovery table to (default: sequencerecovery.txt)
-sub_matrix_filename            The name of the file to output the substitution matrix to (default: submatrix.txt)
-ignore_unrecognized_res        Command line option to exclude unrecognized residues
```

Un ejemplo de línea de comandos para ejecutar la aplicación sequence\_recovery sería el siguiente:

```
sequencerecovery.macosgccrelease -database /path/to/rosetta/main/database/ -native_pdb_list seqrecovery.list -redesign_pdb_list redesigned.list
-ignore_unrecognized_res
```

Un ejemplo de línea de comandos para ejecutar la aplicación sequence\_recovery usando un tagfile para restringir el cálculo solo a los residuos de la superficie (aunque esto ya se hace por defecto) sería el siguiente:

```
sequencerecovery.macosgccrelease -database path/to/rosetta/main/database -native_pdb_list seqrecovery.list -redesign_pdb_list redesigned.list
-parse_tagfile taskoperations.tagfile -ignore_unrecognized_res
```

Ejemplo de taskoperations.tagfile

```
<TASKOPERATIONS>
  <RestrictNonSurfaceToRepacking name=rnstr surface_exposed_nb_count_cutoff=16 exclude_interfaces_from_restriction=false/>
</TASKOPERATIONS>
```

Otro ejemplo en el que querrías usar la opción tagfile sería calcular el número de residuos nativos recuperados entre todos los residuos de la interfaz en un conjunto de complejos proteína-proteína rediseñados. El tagfile especificaría una operación de tarea que restringe el conjunto de residuos considerados a solo los que están en la interfaz entre las dos proteínas.

Consejos
====

La forma más fácil de preparar los archivos de lista de estructuras es ejecutar los siguientes comandos:

```
ls *.pdb > natives.list;   sort natives.list -o natives.list;
ls *.pdb > redesigns.list; sort redesigns.list -o redesigns.list;
```

Salidas esperadas
================

La aplicación sequence\_recovery produce dos archivos de texto: 1) un archivo que contiene la recuperación de la secuencia nativa del núcleo, global y de la superficie por tipo de aminoácido y 2) una tabla que muestra el desglose de qué residuos se diseñaron en lugar de cada tipo.

A continuación se muestra un ejemplo de salida obtenida al usar la función de energía estándar de Rosetta "score12" sobre un conjunto de 32 proteínas. La primera línea indica lo que representa cada columna.

```
Residue | No.correct core | No.native core | No.designed core | No.correct/No.native core | No.correct/No.designed core | No.correct | No.native | No.designed | No.correct/No.native | No.correct/No.designed | Residue | No.correct surface | No.native surface | No.designed surface | No.correct/No.native surface | No.correct/No.designed surface
ALA 57  103 94  0.55    0.61    118 385 259 0.31    0.46    ALA 9   144 30  0.06    0.30
CYS 0   12  0   0.00    --- 0   27  0   0.00    --- CYS 0   2   0   0.00    ---
ASP 10  20  29  0.50    0.34    80  268 354 0.30    0.23    ASP 49  167 221 0.29    0.22
GLU 2   7   16  0.29    0.12    54  289 308 0.19    0.18    GLU 31  180 158 0.17    0.20
PHE 37  60  69  0.62    0.54    98  193 302 0.51    0.32    PHE 6   23  68  0.26    0.09
GLY 56  69  66  0.81    0.85    302 400 368 0.75    0.82    GLY 164 210 205 0.78    0.80
HIS 10  18  41  0.56    0.24    30  118 176 0.25    0.17    HIS 5   37  32  0.14    0.16
ILE 41  83  70  0.49    0.59    105 242 231 0.43    0.45    ILE 7   33  39  0.21    0.18
LYS 2   11  9   0.18    0.22    62  325 285 0.19    0.22    LYS 30  193 148 0.16    0.20
LEU 66  122 92  0.54    0.72    180 378 454 0.48    0.40    LEU 18  54  174 0.33    0.10
MET 10  31  25  0.32    0.40    20  90  70  0.22    0.29    MET 1   20  5   0.05    0.20
ASN 3   14  11  0.21    0.27    33  206 158 0.16    0.21    ASN 20  110 120 0.18    0.17
PRO 6   18  7   0.33    0.86    61  229 77  0.27    0.79    PRO 29  144 40  0.20    0.73
GLN 3   17  6   0.18    0.50    18  186 172 0.10    0.10    GLN 10  94  110 0.11    0.09
ARG 4   14  20  0.29    0.20    37  185 262 0.20    0.14    ARG 10  85  76  0.12    0.13
SER 20  37  106 0.54    0.19    79  258 348 0.31    0.23    SER 25  119 128 0.21    0.20
THR 19  41  62  0.46    0.31    61  291 225 0.21    0.27    THR 30  145 110 0.21    0.27
VAL 47  98  67  0.48    0.70    107 308 194 0.35    0.55    VAL 8   60  37  0.13    0.22
TRP 10  23  21  0.43    0.48    32  76  145 0.42    0.22    TRP 4   12  56  0.33    0.07
TYR 9   40  27  0.22    0.33    39  158 224 0.25    0.17    TYR 6   23  98  0.26    0.06
Total   412 838     0.492       1516    4612        0.329       Total   462 1855        0.249
```

Como se puede ver en la tabla de recuperación de la secuencia nativa, la función de energía estándar de Rosetta "score12" obtiene una recuperación global de la secuencia nativa del 32.9 % en un conjunto de 32 proteínas. La recuperación en el núcleo es mucho mayor, con un 49.2 % de los residuos nativos recuperados. Además de ofrecer las recuperaciones de la secuencia nativa del núcleo, global y de la superficie, los usuarios pueden ver qué tipos de residuo recupera Rosetta mejor y peor. Por ejemplo, Rosetta diseñó globalmente menos de un tercio de las prolinas presentes en las estructuras nativas y casi el doble de triptófanos. Estos triptófanos parecen estar colocándose en la superficie, ya que el número de triptófanos en la superficie es casi cuatro veces el de las proteínas nativas. La serina está sobrerrepresentada en el núcleo: hay casi tres veces más serinas en el núcleo de los rediseños que en el núcleo de las estructuras nativas. Esto implica que, o bien Rosetta tiene problemas para acomodar otros residuos en el núcleo (quizá por choques debidos al término de Lennard-Jones), o bien los términos de energía de enlace de hidrógeno tienen un peso demasiado alto y favorecen demasiadas serinas, o bien la penalización de desolvatación de la serina no es lo bastante alta.

La matriz de sustitución correspondiente a la ejecución anterior es la siguiente:

```
AA_TYPE nat_ALA nat_CYS nat_ASP nat_GLU nat_PHE nat_GLY nat_HIS nat_ILE nat_LYS nat_LEU nat_MET nat_ASN nat_PRO nat_GLN nat_ARG nat_SER nat_THR nat_VAL nat_TRP nat_TYR
sub_ALA 118 6   6   2   5   8   1   8   6   7   7   5   15  9   7   19  9   15  6   0
sub_CYS 0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0
sub_ASP 29  3   80  22  4   14  7   6   28  19  4   34  31  13  8   20  12  12  0   8
sub_GLU 26  1   22  54  6   7   9   9   26  13  7   18  12  16  23  17  19  14  3   6
sub_PHE 9   1   12  11  98  5   11  4   15  18  3   4   3   6   9   6   16  11  10  50
sub_GLY 10  1   7   2   2   302 3   1   9   4   1   10  1   4   2   6   0   1   0   2
sub_HIS 7   1   7   9   17  5   30  6   5   18  2   7   8   11  5   5   9   6   5   13
sub_ILE 6   1   4   10  3   2   3   105 10  16  2   5   0   2   8   5   11  34  4   0
sub_LYS 20  0   14  34  1   6   8   7   62  18  4   19  4   20  15  19  16  10  3   5
sub_LEU 8   2   21  31  5   6   6   19  41  180 15  15  17  21  13  7   17  18  5   7
sub_MET 5   1   1   3   1   0   1   4   4   11  20  0   1   4   7   1   1   0   4   1
sub_ASN 22  0   18  5   0   14  5   1   9   5   4   33  7   8   8   12  3   2   0   2
sub_PRO 7   0   2   1   0   0   0   2   2   1   0   0   61  0   0   0   0   0   1   0
sub_GLN 17  0   12  20  3   7   3   6   20  6   1   7   8   18  9   8   18  9   0   0
sub_ARG 13  0   13  22  3   7   6   11  31  15  6   13  6   19  37  21  19  12  1   7
sub_SER 62  3   20  11  2   11  5   4   14  16  3   12  40  6   10  79  30  14  1   5
sub_THR 7   7   6   13  5   2   2   12  16  15  5   8   6   9   5   17  61  27  1   1
sub_VAL 3   0   4   6   1   0   0   27  9   5   2   2   0   4   1   3   18  107 0   2
sub_TRP 4   0   9   10  8   2   6   4   8   6   2   4   5   6   9   2   13  5   32  10
sub_TYR 12  0   10  23  29  2   12  6   10  5   2   10  4   10  9   11  19  11  0   39
```

Posprocesamiento
===============

Los archivos de salida de recuperación de secuencia y de matriz de sustitución se pueden importar fácilmente en Excel (separando por espacios en blanco) para analizar más los resultados.

Novedades desde la última versión
=============================

La aplicación sequence\_recovery se publica por primera vez con Rosetta v3.3.


## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
