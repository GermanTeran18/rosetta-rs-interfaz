#Archivo de probabilidades de transición entre bins

Autor: Vikram K. Mulligan, laboratorio Baker (vmullig@uw.edu)

Esta página describe el formato, la sintaxis y las convenciones de .bin_params.

Los archivos de probabilidades de transición entre bins (.bin_params) se usan para definir las probabilidades de pasar de un bin de torsión de la cadena principal en el residuo i a otro bin en el residuo i+1.  Para nuestros fines, un bin de torsión de la cadena principal se define como una región del espacio de torsiones de la cadena principal que está dentro de límites rectangulares bien definidos.  Por ejemplo, el bin "B" de las definiciones ABEGO se define como cualquier conformación de la cadena principal en la que phi está entre -180 y 0 grados, psi es mayor que 50 o menor que -125 grados, y omega es mayor que 90 o menor que -90 grados.

Las probabilidades de transición definidas las usan ciertos esquemas de muestreo y también podrían usarse para la puntuación.  Ten en cuenta que el formato está pensado para ser completamente general, de modo que pueda aplicarse a alfa-aminoácidos, beta-aminoácidos, ácidos nucleicos, otros bloques de construcción no canónicos o heteropolímeros mixtos.

## Formato del archivo de probabilidades de transición entre bins

Los archivos de probabilidades de transición entre bins predefinidos están en el directorio database/protocol_data/generalizedKIC/bin_params.  A continuación se muestra un archivo de ejemplo de probabilidades de transición entre bins:

```
#ABBA.binparams
#Created by Vikram K. Mulligan (vmullig@uw.edu), 2 February 2015
#This file defines transition probabilities for the A, B, B', A', O, and O' bins.
#Bins A and B are defined as they are for ABEGO bins (phi < 0, psi -125 to 50, and
#omega 90 to 180 or -180 to -90 for A; phi < 0, psi -180 to -125 or 50 to 180, and
#omega 90 to 180 or -180 to -90 for B).  Bins A' and B' are the mirror image,
#rotated about phi=0, psi=0 (so phi > 0, psi -50 to 125, omega 90 to 180 or -180
#to 90 for A'; phi > 0, psi 125 to 180 or -180 to 50, omega 90 to 180 or -180 to -90
#for B').  Bins O and O' have cis omega angles (omega -90 to 90), and are in the
#negative or positive phi space, respectively.
#Note the defined bins must cover the full mainchain torsion space!
BEGIN
MAINCHAIN_TORSIONS_I 3
MAINCHAIN_TORSIONS_IPLUS1 3
BIN_COUNT_I 6
BIN_COUNT_IPLUS1 6
I_BIN A -180.0 0.0 -125.0 50.0 90.0 -90.0
I_BIN B -180.0 0.0 50.0 -125.0 90.0 -90.0
I_BIN Aprime 0.0 180.0 -50.0 125.0 90.0 -90.0
I_BIN Bprime 0.0 180.0 125 -50.0 90.0 -90.0
I_BIN O -180.0 0.0 -180.0 180.0 -90.0 90.0
I_BIN Oprime 0.0 180.0 -180.0 180.0 -90.0 90.0
SUB_BINS_I L_AA
IPLUS1_BINS_COPY_I
PROPERTIES_I L_AA ALPHA_AA
PROPERTIES_IPLUS1 L_AA ALPHA_AA
NOT_PROPERTIES_I D_AA
NOT_PROPERTIES_IPLUS1 D_AA
NOT_RES_I GLY
NOT_RES_IPLUS1 GLY
MATRIX	1670055	313251	87373	26201	3915	682
MATRIX	363556	1205782	71936	34623	9406	1044
MATRIX	39384	118400	17691	2634	705	63
MATRIX	25528	35553	1949	2328	493	64
MATRIX	3121	5916	176	183	171	70
MATRIX	215	742	75	42	51	20
END
```

Los archivos de probabilidades de transición entre bins pueden comentarse con el signo de almohadilla (#).  Todo lo que esté después de un carácter de almohadilla se ignora.

Cada archivo de probabilidades de transición entre bins debe definir al menos una matriz de probabilidades de transición entre bins.  Cada matriz de probabilidades define un conjunto de bins para la posición i, un conjunto de bins para la posición i+1, un conjunto de reglas sobre qué tipos de residuos pueden estar en las posiciones i e i+1, y las probabilidades de transición reales (sin normalizar) o los recuentos.  Pueden definirse varias matrices para permitir distintas probabilidades de transición según los distintos tipos de residuos en las posiciones i e i+1.  Por ejemplo, la probabilidad de pasar a las regiones normalmente prohibidas del espacio de Ramachandran es muy baja, a menos que el residuo i+1 sea una glicina.  Cada matriz de transición definida debe estar flanqueada por líneas <b>BEGIN</b> y <b>END</b>.

Después de la <b>línea BEGIN</b>, las dos líneas siguientes definen el número de torsiones de la cadena principal (enlaces rotables) en los residuos i e i+1.  Esto es necesario porque no se supone que se aplique únicamente a alfa-aminoácidos.  En nuestro ejemplo, sin embargo, estamos definiendo transiciones para alfa-aminoácidos, así que el número de torsiones de la cadena principal en ambas posiciones es 3.

```
MAINCHAIN_TORSIONS_I 3
MAINCHAIN_TORSIONS_IPLUS1 3
```

Las dos líneas siguientes especifican el número de bins que se definirán en las posiciones i e i+1.  En este ejemplo, ambas posiciones tendrán seis bins definidos.

```
BIN_COUNT_I 6
BIN_COUNT_IPLUS1 6
```

Una vez especificado que habrá seis bins, ahora tenemos que definir los nombres y los límites de los bins.  Lo hacemos con líneas <b>I_BIN</b> e <b>IPLUS1_BIN</b>, cada una con la siguiente sintaxis:

```
I_BIN <bin_name> <torsion_1_start_of_range> <torsion_1_end_of_range> <torsion_2_start_of_range> <torsion_2_end_of_range> ... <torsion_n_start_of_range> <torsion_n_end_of_range>
```

Los valores de torsión deben estar entre -180 grados y 180 grados.  Si el valor final de un rango es menor que el valor inicial para cualquier rango de torsión, se supone que el bin va desde el inicio del rango hasta 180, luego vuelve a -180 y sube hasta el valor final del rango.  Ten en cuenta que los bins no deben solaparse y deben cubrir todo el espacio de torsiones.

Dentro de cada bin, la probabilidad relativa de un conjunto concreto de valores de torsión de la cadena principal puede no ser igual.  En el caso de los alfa-aminoácidos, los sub-bins pueden definirse automáticamente a partir del mapa de Ramachandran (y estos permiten un muestreo sesgado por Ramachandran dentro de cada bin).  Las líneas <b>SUB_BINS_I</b> y <b>SUB_BINS_IPLUS1</b> definen cómo se configurarán los sub-bins.  Las opciones actuales son:
- "NONE" (<i>es decir,</i> probabilidad uniforme en todo el bin)
- "L_AA" (usa el mapa de Ramachandran de la L-alanina para configurar la distribución de probabilidad de los sub-bins)
- "D_AA" (usa el mapa de Ramachandran de la D-alanina)
- "L_PRO" (usa el mapa de Ramachandran de la L-prolina)
- "D_PRO" (usa el mapa de Ramachandran de la D-prolina)
- "GLY" (usa el mapa de Ramachandran de la glicina).

El número de líneas <b>I_BIN</b> debe coincidir con la línea <b>BIN_COUNT_I</b>, y el número de líneas <b>IPLUS1_BIN</b> debe coincidir con la línea <b>BIN_COUNT_IPLUS1</b>.  La excepción es si los bins de la posición i+1 son idénticos a los de la posición i, en cuyo caso un atajo es incluir una línea <b>IPLUS1_BINS_COPY_I</b>.  Si se incluye una línea <b>IPLUS1_BINS_COPY_I</b>, no se requerirán líneas <b>IPLUS1_BIN</b> ni <b>SUB_BINS_IPLUS1</b>.

Así, para los seis bins de nuestro ejemplo, tenemos las siguientes líneas:

```
I_BIN A -180.0 0.0 -125.0 50.0 90.0 -90.0
I_BIN B -180.0 0.0 50.0 -125.0 90.0 -90.0
I_BIN Aprime 0.0 180.0 -50.0 125.0 90.0 -90.0
I_BIN Bprime 0.0 180.0 125 -50.0 90.0 -90.0
I_BIN O -180.0 0.0 -180.0 180.0 -90.0 90.0
I_BIN Oprime 0.0 180.0 -180.0 180.0 -90.0 90.0
SUB_BINS_I L_AA
IPLUS1_BINS_COPY_I
```

Las líneas siguientes definen las propiedades que los residuos en las posiciones i o i+1 DEBEN tener (líneas <b>PROPERTIES_I</b> y <b>PROPERTIES_IPLUS1</b>) y las propiedades que NO deben tener (líneas <b>NOT_PROPERTIES_I</b> y <b>NOT_PROPERTIES_IPLUS1</b>), para que se les apliquen las reglas definidas por las probabilidades de transición entre bins actuales.  En el presente ejemplo, exigimos que las posiciones i e i+1 sean alfa-aminoácidos y L-aminoácidos, y que no puedan ser D-aminoácidos (lo cual es redundante, pero no importa).

```
PROPERTIES_I L_AA ALPHA_AA
PROPERTIES_IPLUS1 L_AA ALPHA_AA
NOT_PROPERTIES_I D_AA
NOT_PROPERTIES_IPLUS1 D_AA
```

Las líneas siguientes definen las identidades de los residuos para las posiciones i o i+1.  Si hay líneas <b>RES_I</b> o <b>RES_IPLUS1</b>, cada una con una lista de códigos de tres letras, el residuo en la posición i o i+1 DEBE ser uno de los de la lista para que se apliquen las reglas de transición entre bins.  En este caso, no tenemos ninguna lista de residuos obligatorios.  Si se incluyen líneas <b>NOT_RES_I</b> o <b>NOT_RES_IPLUS1</b>, el residuo en la posición i o i+1 NO debe ser uno de los de la lista para que se apliquen las reglas de transición entre bins.  Aquí excluimos la glicina (aunque esto es redundante, ya que ya hemos exigido que las posiciones i e i+1 sean L-aminoácidos).

```
NOT_RES_I GLY
NOT_RES_IPLUS1 GLY
```

Por último, definimos la matriz de transición propiamente dicha, con una línea correspondiente a cada bin de la posición i (en el mismo orden que las líneas de definición <b>I_BIN</b>) y una columna correspondiente a cada bin de la posición i+1 (en el mismo orden que las líneas de definición <b>IPLUS1_BIN</b>).  Los valores de la matriz son recuentos o probabilidades de transición sin normalizar.  El algoritmo los normalizará automáticamente y generará funciones de distribución acumulada para el muestreo aleatorio.

```
MATRIX	1670055	313251	87373	26201	3915	682
MATRIX	363556	1205782	71936	34623	9406	1044
MATRIX	39384	118400	17691	2634	705	63
MATRIX	25528	35553	1949	2328	493	64
MATRIX	3121	5916	176	183	171	70
MATRIX	215	742	75	42	51	20
```

Pueden definirse bloques <b>BEGIN</b> ... <b>END</b> adicionales para tantas matrices de probabilidades de transición entre bins como se desee.  Si un par concreto de residuos i/i+1 cumple los criterios de propiedades e identidad de residuo de más de una matriz de probabilidades de transición entre bins, se usa la primera que se encuentre que coincida (por eso es mejor que las matrices de probabilidades de transición entre bins definan criterios que no se solapen).

##Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Movers generales de RosettaScripts|Movers-RosettaScripts#general-movers]]: Incluye movers que toman un archivo de probabilidades de transición entre bins
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
