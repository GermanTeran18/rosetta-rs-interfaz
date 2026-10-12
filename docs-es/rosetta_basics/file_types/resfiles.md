#Sintaxis y convenciones del resfile

Autores: Matthew O'Meara y Steven Lewis

Esta página describe el formato, la sintaxis y las convenciones del resfile. El resfile contiene información que se introduce en el [[PackerTask|Packer-Task]] y controla el Packer. Lo lee la TaskOperation [[ReadResfile|ReadResfileOperation]]. Los detalles internos de los comandos pueden encontrarse en la guía sobre las opciones a nivel de residuo [[Cómo escribir nuevos comandos de resfile|resfile-reader]].

[[_TOC_]]

Sintaxis y semántica del resfile
====================

La sintaxis del formato resfile en forma EBNF extendida es la siguiente.

```
<RESFILE> ::= <HEADER> | [<HEADER>] START\n <BODY> ;

<HEADER> ::= {{<COMMAND>}*\n}* ;

<BODY> ::= {<RESIDUE_IDENTIFIER> {<COMMAND>}*\n}* ;

<RESIDUE_IDENTIFIER> ::= <SINGLE_RESID> | <RANGE_RESID> | <CHAIN_RESID> ;

<SINGLE_RESID> ::= <PDBNUM>[<ICODE>] <CHAIN> ;

<RANGE_RESID> ::= <PDBNUM>[<ICODE>] - <PDBNUM>[<ICODE>] <CHAIN> ;

<CHAIN_RESID> ::= '*' <CHAIN> ;

<PDBNUM> ::= [-]{digits}+ ;

<ICODE> ::= {A-Za-z} ;

<COMMAND> ::= <COMMAND_ID> {<COMMAND_PARAMS>}* ;

<COMMAND_ID> ::= ? see command types below ? ;

<COMMAND_PARAMS> ::= ? see command types below ? ;
```

En todo el resfile se siguen las siguientes convenciones:

-   El resfile no distingue entre mayúsculas y minúsculas (excepto en el carácter de cadena; véase el comentario más abajo).
-   Los comentarios comienzan con el símbolo '\#' y continúan hasta el final de la línea.
-   Los tokens están delimitados por espacios en blanco (ten en cuenta, sin embargo, que el código de inserción va unido al PDBnum)
-   El orden en que se especifican los residuos en el cuerpo no importa.
-   El orden en que se especifican los comandos no importa.

Encabezado
------

Especifica en la sección \<header\> los comandos que deben aplicarse por defecto a todos los residuos que no se especifican en el cuerpo. NOTA: Los comandos de esta sección no se aplican a ningún residuo que tenga una línea en la sección del cuerpo. Por ejemplo, si los comandos del encabezado incluyen "EX 1" y el residuo 10 tiene el comportamiento "ALLAAxc" en el cuerpo, entonces el residuo 10 NO recibirá el comportamiento EX 1. Las opciones de línea de comandos (p. ej., "-ex1") se aplicarán a todos los residuos y pueden usarse cuando el usuario quiere especificar rápidamente un comportamiento global.

Ejemplo de sección de encabezado:

```
# These commands will be applied to all residue positions that lack a specified behavior in the body:
ALLAA # allow all amino acids
EX 1 EX 2 # allow extra chi rotamers at chi- id 1 and 2 (note: multiple commands can be on the same line.)
USE_INPUT_SC # allow the use of the input side chain conformation ( see below for more detailed description of commands)
start
#... the body would continue here.
```

Cuerpo
----

Especifica en la sección \<body\> las restricciones a nivel de residuo que se enviarán al packer y a otros lugares. Cada línea debe tener uno de los siguientes formatos,

### Identificación de residuos

#### Identificación de un solo residuo

Para especificar comandos para un solo residuo, usa la siguiente forma

```
<PDBNUM>[<ICODE>] <CHAIN> <COMMANDS>
```

Si la Pose a la que pertenece el resfile tiene información de pdb asociada (p. ej., se leyó de un archivo pdb), entonces \<PDBNUM\>[\<ICODE\>] corresponde a las columnas 22-26. Si la Pose no tiene información de pdb (p. ej., si se generó de novo o a partir de un silent file), \<PBDNUM\> es el índice del residuo en la Pose y no debe especificarse \<ICODE\>. \<PDBNUM\> puede ser positivo, cero o negativo. \<ICODE\> es un carácter opcional [A-Z] \(sin distinguir mayúsculas y minúsculas\) que aparece en algunos pdb para representar inserciones o deleciones en la secuencia, a fin de mantener un esquema de numeración coherente para el resto de la secuencia.

Para dar cabida a estructuras con un gran número de cadenas, siguiendo el PDB, la cadena puede ser cualquier carácter [A-Za-z], donde los caracteres en mayúscula y en minúscula se tratan como cadenas distintas. Por ejemplo

```
10 _ PIKAA W # Allow only Trp at residue 10 in the unlabeled chain
40 B PIKAA X[A20]X[B47]X[B48] # Disallow residues except for noncanonical types A20, B47, and B48.  Note that a PackerPalette must be specified that allows design with residue types A20, B47, and B48.
40 B PIKAA X[DA20]X[DB47]X[DB48] # Disallow residues except for the D- stereoisomer of the noncanonical types A20, B47, and B48 (these were originally D20, E47, and E48).  Noted that the PackerPalette must also allow design with DA20, DB47, and DB48.
40A Q ALLAA # Residue 40, insertion code A, on chain Q, use any residue type
```

#### Identificación de un intervalo de residuos

Para especificar comandos para una secuencia de residuos a la vez, usa la forma

```
<PDBNUM>[<ICODE>] - <PDBNUM>[<ICODE>] <CHAIN> <COMMANDS>
```

Consulta la sección sobre cómo especificar un solo residuo, más arriba, para ver comentarios sobre el formato de los identificadores \<PDBNUM\>, \<ICODE\> y \<CHAIN\>.

Para determinar qué residuos caen dentro del intervalo especificado se usa la secuencia de residuos de la Pose. NOTA: es un error que el primer residuo no vaya antes que el segundo.

#### Identificación de una cadena

Para especificar comandos para todos los residuos de una cadena concreta, usa la siguiente forma

```
* <CHAIN> <COMMANDS>
```

Consulta la sección sobre cómo especificar un solo residuo, más arriba, para ver comentarios sobre el formato de los identificadores \<PDBNUM\>, \<ICODE\> y \<CHAIN\>.

#### Residuos especificados varias veces

Si un residuo se especifica en varios niveles, p. ej., como residuo individual, en un intervalo y como parte de una cadena completa, la especificación más concreta tiene prioridad sobre las demás. Si un residuo se especifica varias veces en el mismo nivel, p. ej., en varios comandos de residuo individual, todos los comandos se usan conjuntamente. Nota: el orden en que se especifican los comandos no es importante.

Por ejemplo,

```
NATRO
START

* A NATAA
3C - 20 A APOLAR
15 A PIKAA Y
```

Esta tarea establece que el residuo 15 de la cadena A sea una tirosina, que todos los residuos entre el residuo 3C (PDBnum=3, icode='C') y el residuo 20, excepto el residuo 15 de la cadena A, sean apolares, que el resto de los residuos de la cadena A sean su aminoácido nativo pero empaquetables, y que el resto de los residuos de la Pose conserven su rotámero fijo.

El cuerpo del resfile anterior podría haberse escrito así:

```
15 A PIKAA Y
3C - 20 A APOLAR
* A NATAA
```

Comandos
========

Comandos para controlar la identidad de la secuencia
------------------------------------------------

Cada comando restringe los aminoácidos permitidos en cada posición. Si se combinan varios comandos, solo se incluyen los aminoácidos que permite cada comando individualmente. Esto es consecuencia de la propiedad conmutativa de las operaciones sobre la clase PackerTask.

NOTA: Debe recordarse que los comandos del resfile son restrictivos, no permisivos. Aunque los residuos no permitidos no se reempaquetarán ni se rediseñarán, varios protocolos añaden restricciones adicionales que pueden limitar aún más las identidades de las mutaciones. En particular, muchos protocolos prohibirán rediseñar cisteínas de puentes disulfuro, incluso cuando se listan explícitamente como mutables en el resfile.

- ALLAA ................ permite los 20 aminoácidos INCLUIDA la cisteína (igual que ALLAAwc)

- ALLAAwc .............. permite los 20 aminoácidos ( por defecto )

- ALLAAxc .............. permite todos los aminoácidos excepto la cisteína

- POLAR ................ permite solo aminoácidos polares canónicos (DEHKNQRST)

- APOLAR ............... permite solo aminoácidos apolares canónicos (ACFGILMPVWY)

- PROPERTY \<property\> .. no permite ningún tipo de residuo que carezca de la propiedad dada

- NOTAA \<list of AAs\> .. no permite solo los aminoácidos especificados ( Usa códigos de una letra, sin delimitadores, como ACFYRT.  Para los NCAA, usa X[\<full name\>]. )

- PIKAA \<list of AAs\> .. permite solo los aminoácidos especificados ( Usa códigos de una letra, sin delimitadores, como ACFYRT.  Para los NCAA, usa X[\<full name\>].)

- NATAA ................ permite solo el aminoácido nativo (NATive Amino Acid): reempaqueta sin diseñar

- NATRO ................ conserva el rotámero de entrada ( no empaqueta en absoluto) (NATive ROtamer)

```
NATRO # default command that applies to everything without a non- default setting; do not repack

start

10 A POLAR # consider polar amino acids at position 10
11 A POLAR PIKAA ACDEFGH # allow mutations to those in the intersection of two sets:
# ........................ the polar amino acids and {ALA, CYS, ASP, GLU, PHE, GLY & HIS}
# ........................ the intersection set {ASP, GLU, HIS}
```

Comandos para tipos de residuos no canónicos
---------------------------------------

Los tipos de residuos no canónicos obedecen las mismas reglas que los canónicos: los comandos del resfile y las `TaskOperation`s solo pueden desactivar tipos.  Por defecto, en ausencia de cualquier `TaskOperation`, los 20 aminoácidos canónicos están permitidos en cualquier posición.  Si quieres diseñar con aminoácidos no canónicos, debes por tanto especificar una [[PackerPalette|PackerPalette]] que incluya tipos de residuo adicionales.  Consulta la documentación de `PackerPalette` para ver los detalles.  Una vez especificada la paleta ampliada, los residuos de la paleta están activados por defecto (en ausencia de cualquier `TaskOperation`) y pueden desactivarse con `TaskOperations` igual que los residuos canónicos.  El comando `PIKAA` puede usarse con este fin: para especificar un residuo no canónico que se conservará, usa `X[###]`, donde `###` es el nombre completo del residuo (p. ej., `DALA` para la D-alanina).

```
NATRO # default command that applies to everything without a non- default setting; do not repack

start

10 A PIKAA ACDEFGHIKLMNPQRSTVWYX[ET1] # allow all 20 amino acids, plus noncanonical ET1
11 A PIKAA X[R2] # disallow all 20 amino acids, allow only noncanonical R2
15 A PIKAA ATSGX[SM1] # allow only ALA, THR, SER, GLY, and noncanonical SM1
56 A PIKAA X[R2]X[T6]X[OP5] #allow only noncanonicals R2, T6, and OP5 (notice separate X statements within the same PIKAA command)
```

Comandos para controlar la libertad conformacional:
---------------------------------------

```
- NATRO ....................................... fix NATive ROtamer ( fix identity and conformation )
- EX (ARO) <chi-id> ( LEVEL <sample level> ) .. ( see below for detailed description )
- EX_CUTOFF <num-neighbors> ................... about how to specify EX commands )
- USE_INPUT_SC ................................ include native rotamer
```

Comandos varios para controlar el packer:
--------------------------------------------------

```
-   AUTO .......... add the behavior 'AUTO'
-   SCAN .......... add the behavior 'SCAN'
-   NO_ADDUCTS .... disallow DNA adducts
-   TARGET <AA> ... specify target amino acid ( use one letter codes )
```

Estos comandos varios tienen significado para protocolos concretos, pero no para todos.

Comandos de rotámeros extra:
-----------------------

El packer considera un muestreo discreto de las conformaciones de las cadenas laterales; muestrea de forma discreta de la biblioteca de rotámeros de Dunbrack y, por defecto, muestrea solo en el centro de los pozos de los rotámeros. Las opciones «extra» siguientes controlan la inclusión de muestras discretas adicionales.

-   El comando "EX \<chi-id\>" especifica que se considerarán muestras extra para un ángulo chi concreto ( solo se permiten los números 1-4 ) para residuos ENTERRADOS (véase EX\_CUTOFF más abajo). Hay opciones adicionales que pueden darse al comando EX, pero basta con indicar solo "EX \<chi-id\>" para que signifique «Considera rotámeros adicionales para el chi \<chi-id\> a +/- 1 desviación estándar de la media del ángulo chi de cada pozo de rotámero para residuos enterrados.»
    -   La opción ARO puede incluirse en el comando EX, p. ej., "EX ARO \<chi-id \>", limitando así el efecto del comando solo a los aminoácidos aromáticos (FHWY). Por ejemplo, si quieres considerar rotámeros extra en chi 1 para todos los residuos y en chi 2 solo para los residuos aromáticos, los dos comandos juntos en la cadena "EX 1 EX ARO 2" lo indican. NOTA: Usar "EX ARO \<chi-id\>" no aumenta el número de rotámeros de los aminoácidos FHWY más que simplemente usar "EX \<chi-id\>"; ambos comandos indicarían que deben muestrearse rotámeros adicionales a +/- 1 desviación estándar para residuos enterrados. NOTA: la opción ARO puede combinarse con la opción LEVEL (más abajo)
    -   La opción LEVEL \<sample-level\> puede incluirse en el comando EX y especifica cuántos ángulos chi extra se muestrean para cada rotámero permitido. Cuanto mayor sea el nivel de muestreo dado, más rotámeros construirá el packer.
        -   0 ...... sin ángulos chi extra
        -   1 ...... muestrea a 1 desviación estándar
        -   2 ...... muestrea a 1/2 desviación estándar
        -   3 ...... muestrea a dos desviaciones estándar completas
        -   4 ...... muestrea a dos 1/2 desviaciones estándar
        -   5 ...... muestrea a cuatro 1/2 desviaciones estándar
        -   6 ...... muestrea a tres 1/3 desviaciones estándar
        -   7 ...... muestrea a seis 1/4 desviaciones estándar

    -   NOTA: Al combinar varios niveles EX para un único chi de un único aminoácido, se toma el valor máximo. Esto significa que el nivel del chi 1 de PHE con los comandos "EX 1 LEVEL 4 EX ARO 1 LEVEL 3" será 4 y no 3. Cuando se dan opciones de chi extra sin la restricción ARO, se aplican a todos los residuos, incluidos los residuos aromáticos.

-   El comando EX\_CUTOFF \<num-neighbors\> especifica el número de vecinos (contándose a sí mismo) que cada residuo debe tener dentro de un radio de 10 ångström para considerarse «enterrado» a efectos de incluir rotámeros extra. Rosetta no incluirá rotámeros extra para posiciones de superficie a menos que se le indique explícitamente que lo haga (fijando EX\_CUTOFF en un valor pequeño \>= 1). El comando EX\_CUTOFF del resfile permite controlar por posición dónde deben considerarse rotámeros extra; la opción de línea de comandos -extrachi\_cutoff \<num-neighbors\> puede usarse para aplicar el mismo umbral a todos los residuos.

Aquí hay algunos ejemplos:

```
10 B EX 1 EX 2
9 B EX 3 # WARNING: probably want to include EX 1 and EX 2 if EX 3 is specified!
8 B EX ARO 2
7 B EX ARO 3 # ERROR: ARO only works for chi ids 1 and 2
6 B EX 1 LEVEL 7
13 B EX 1 EX ARO 1 LEVEL 4 # include extra rotamers at chi 1 for all amino acids,
# but use sample level 4 for the aromatic amino acids
```

Este resfile proporcionará capacidad de empaquetado en la mayoría de las posiciones, rotámeros fijos en unas pocas y capacidad de diseño en unas pocas. Observa el uso generoso de comentarios para mayor claridad. NOTAA C equivale a ALLAAxc.

```
NATAA # this default command applies to all residues that are not given non-default commands

start

#anchor
81 - 82 B NATAA #anchor
83 - 86 B NATRO #anchor

#loops
#133 B NOTAA C #loop
134 - 142 B NOTAA C #loop
#143 B NOTAA C #loop
#144 B NOTAA C #loop
#145 B NOTAA C #loop
#77 B NOTAA C #loop
#78 B NOTAA C #loop
#79 B NOTAA C #loop
80 B NOTAA C #loop
#ANCHOR
87 B NOTAA C #loop
88 B NOTAA C #loop
#89 B NOTAA C #loop
```

##Comandos obsoletos:

Cuando se introdujeron las [[PackerPalettes|PackerPalette]], los comandos de resfile que antes eran necesarios y que rompían la conmutatividad de las TaskOperation dejaron de ser necesarios.  Como resultado, el lector de resfile ya no reconoce los siguientes comandos:

```
- EMPTY ................ Disallow all canonical amino acids (for use with non canonicals).  This throws away all previously applied task operations, and so will break the commutativity of task operations.  DEPRECATED AND NO LONGER RECOGNIZED.

- RESET ................ Resets the task to its default state of canonicals ON and non-canonicals OFF (for use with non canonicals)  This throws away all previously applied task operations, and so will break the commutativity of task operations.  DEPRECATED AND NO LONGER RECOGNIZED.

- NC \<ResidueTypeName\> . Allow the specific possibly non canonical residue type; one residue type per NC command.  Note that "GLY:N_Methylation" is a special case that is entered as "SAR" (sarcosine) with this command.  DEPRECATED AND NO LONGER RECOGNIZED.
```

En su lugar, las `PackerPalette`s permiten a los usuarios definir la «paleta» de tipos de residuo permitidos para el diseño, y las `TaskOperation`s quedan ahora restringidas a podar el conjunto permitido en una posición dada.  Consulta la documentación de [[PackerPalette|PackerPalette]] para ver los detalles.

##Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Packer Task]]: Descripción del PackerTask
* [[Rosetta overview]]: Resumen de los conceptos clave de Rosetta
* [[Options overview]]: Resumen de los principales grupos de opciones de Rosetta
* [[Full options list]]
* [[Escribir nuevos comandos de resfile|resfile-reader]]

<!--- search engine optimization
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile
resfile -->
