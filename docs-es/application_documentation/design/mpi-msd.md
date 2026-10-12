#Diseño multiestado y distribución de la carga con MPI, "mpi\_msd"

Metadatos
========

Este documento fue creado el 14 de abril de 2008 por Andrew Leaver-Fay. La aplicación `       mpi_msd      ` la mantiene el laboratorio de Brian Kuhlman. Envía tus preguntas a (bkuhlman@email.unc.edu)

Código y demostración
=====================

Consulta `       rosetta/main/tests/integration/tests/mpi_multistate_design      ` para ver un ejemplo rápido de una trayectoria de diseño multiestado. Este ejemplo realiza diseño de un solo estado usando el marco de diseño multiestado. Consulta también `       rosetta/demos/private/andrew/multistate      ` para ver un ejemplo más elaborado. En este directorio, el archivo "README" dirige tu atención a un conjunto de archivos de entrada para un problema de diseño multiestado bastante complejo: rediseñar la interfaz de un homodímero para que forme un heterodímero. Este ejemplo tarda unos 80 minutos en ejecutarse con 10 CPU y MPI.

La mayoría de las clases de la aplicación mpi\_msd están en `       rosetta/main/source/src/protocols/pack_daemon      ` .

Referencias
===========

Esta implementación del diseño multiestado, que no es la primera, fue publicada (o probablemente se publicará) aquí:

A. Leaver-Fay, R. Jacak, B. Stranges, and B. Kuhlman B (2011) "A generic algorithm for multistate protein design." PLoS-ONE, RosettaCon2010 special collection

Propósito
===========================================

Esta aplicación optimiza una única secuencia para que se comporte de distintas maneras en distintos contextos. Modela los distintos contextos mediante varios estados; las energías de estos estados se pueden combinar luego con una función de aptitud (fitness) para capturar qué tan bien cumple esa secuencia los objetivos de diseño de la tarea. La aplicación distribuye su trabajo entre varias CPU con MPI, de modo que puede ejecutarse con bastante rapidez incluso cuando se modelan cientos de estados.

Algoritmo
=========

La optimización de una única secuencia en múltiples contextos involucra varios componentes: un algoritmo genético, una noción de estado, una función de aptitud y un algoritmo de optimización de rotámeros.

Algoritmo genético
------------------

El ciclo externo consiste en un algoritmo genético que explora el espacio de secuencias. Cada secuencia se representa como una cadena de texto, y todas las cadenas que considerará el algoritmo genético tendrán la misma longitud. Corresponde a los "archivos de correspondencia" asignar las posiciones de las secuencias del ciclo externo a los residuos de los distintos estados (más sobre esto adelante).

Hay tres parámetros que describen el comportamiento del algoritmo genético: el tamaño de la población, el número de generaciones que se ejecuta y el porcentaje de secuencias hijas generadas por mutaciones de cruce (crossover) frente a mutaciones puntuales.

Tamaño de la población. Controla el número de secuencias del conjunto de secuencias que se examinan y a las que se permite "reproducirse" al pasar de la generación i a la generación i+1. Recomendamos usar un tamaño de población de 100.

El número de generaciones. Al pasar de la generación i a la generación i + 1, la mejor mitad de la población de la generación i se propaga, y el resto de las secuencias creadas en la generación i+1 son mutantes puntuales y mutantes de cruce de la generación i. El número de generaciones controla cuánto tiempo se dedica a optimizar secuencias; esto es importante porque a menudo hacen falta muchas generaciones para madurar una secuencia hasta lograr una aptitud muy buena.

Estados y el archivo de la función de aptitud
---------------------------------------------

Esta parte de la documentación se divide en varias secciones. Esta es la lista.

### Sección: Tabla de contenidos

```
   Overview
   Entity and Entity Elements and the Entity Resfile
   States: an Overview
   Correspondence File Format
   Secondary resfile
   STATE command
   STATE vector command
   State-Vector File Format
   Expression Syntax
     POSE_ENERGY command
     POSE_ENERGY_VECTOR command
   SCALAR_EXPRESSION command
   VECTOR_VARIABLE command
   VECTOR_EXPRESSION command
   ENTITY_FUNCTION command
   FITNESS command
```

### Sección: Resumen

Esta sección describe el formato del archivo de declaración de estados y definición de la función de aptitud. Empieza describiendo qué es un estado dentro de este marco y cómo se define. Luego entra en detalle en cada uno de los siete comandos que componen este archivo de definición de la función de aptitud

Hay siete comandos en un archivo de aptitud:

```
STATE
STATE_VECTOR
SCALAR_EXPRESSION
VECTOR_VARIABLE
VECTOR_EXPRESSION
ENTITY_FUNCTION
FITNESS
```

Se pueden incluir comentarios empezando una línea del archivo de aptitud con el símbolo de numeral ("\#"). Cualquier línea que comience con el símbolo de numeral se ignorará. Las líneas en blanco también se ignoran.

### Sección: Entidad, elementos de entidad y el resfile de entidad

Por razones históricas, cada secuencia que examina el algoritmo genético en el ciclo externo se llama una "entidad". Las posiciones de esta secuencia son los elementos de entidad; van de 1 a N, donde N es la longitud de la entidad (todas las entidades tienen la misma longitud). Esta nomenclatura proviene de la implementación del algoritmo genético que produjeron Colin Smith y Justin Ashworth.

Al escribir un archivo de correspondencia (descrito en detalle en la sección Formato del archivo de correspondencia), se declara que los residuos de una estructura determinada corresponden a posiciones concretas de las entidades que optimiza el algoritmo genético. La posición 10 de una entidad de longitud 15 podría corresponder al residuo 15 de la cadena A en un estado y al residuo 15 de la cadena B en otro estado.

Al escribir un archivo de función de entidad (descrito en detalle en la sección Comando ENTITY\_FUNCTION), se puede acceder a los elementos de entidad por su posición (por ejemplo, el elemento de entidad 10) dentro de una entidad determinada.

Para configurar una ejecución de diseño multiestado, el usuario debe pensar en una proteína abstracta, la proteína entidad, que tiene una cadena y N residuos. La secuencia de esta proteína se está optimizando, pero su estructura nunca se considera. En su lugar, la secuencia de la proteína entidad se asigna a los distintos estados del sistema según lo prescriben los archivos de correspondencia. Para describir el espacio de secuencias disponible para la proteína entidad, el usuario debe definir un resfile de entidad. El resfile de entidad controla el conjunto de aminoácidos y rotámeros que se construyen para cada residuo que se declara que corresponde a un elemento de entidad determinado. Si se declara que el residuo 15 de la cadena A en un estado determinado corresponde al elemento de entidad 10, entonces los comandos de resfile del elemento de entidad 10 tomados del resfile de entidad se aplicarán al residuo 15.

El resfile de entidad es casi exactamente igual que un resfile normal (consulta la documentación del formato de resfile aquí: [[Sintaxis y convenciones de resfile|resfiles]]), salvo que va precedido de una línea adicional, que declara el número de residuos de la proteína entidad (N). Después sigue el formato habitual de resfile: se listan los comandos por defecto (si los hay), luego aparece "start" solo en una línea y después se listan los comandos específicos para residuos concretos de la proteína entidad (resid 1..N, cadena A). Por ejemplo, el siguiente es un resfile de entidad válido:

```
16
ALLAAxc EX 1 EX ARO 2
start
3 A PIKAA ACDEFGH EX 1 EX ARO 2
```

En este resfile de entidad hay 16 residuos declarados en la proteína entidad (y 16 posiciones por cada entidad que considerará el algoritmo genético), y todos los residuos de esta proteína, excepto el 3 (elemento de entidad \#3), tienen el comportamiento "ALLAAxc" (todos los aminoácidos permitidos, excepto cisteína) y las instrucciones de construcción de rotámeros "EX 1 EX 2 ARO", que construye rotámeros extra en chi1 para todos los aminoácidos, y rotámeros extra en chi 2 para los aminoácidos aromáticos (FHWY).

No uses los comandos NATRO ni NATAA con resfiles de entidad. Internamente, mientras se consideran los elementos de entidad se construye una Pose de referencia de entidad temporal; el "nativo" de NATRO/NATAA se tomará de esta referencia de polialanina y ocurrirán cosas indeseables.

Si se declara que el residuo 15 de la cadena A en un estado determinado corresponde al elemento de entidad 10, cuando ese estado vaya a construir rotámeros para el residuo 15 de la cadena A, usará el comando "ALLAAxc EX 1 EX ARO 2" tomado del resfile de entidad.

### Sección: Estados, resumen

En esta aplicación, los estados se definen con tres cosas:

-   a) un archivo PDB
-   b) un archivo de correspondencia
-   c) un resfile secundario

El archivo PDB debería ser evidente: define las coordenadas de la cadena principal que se reempaquetarán.

El archivo de correspondencia se describe en detalle en la siguiente sección.

El resfile secundario indica qué residuos, además de los que figuran en el archivo de correspondencia, se deben permitir reempaquetar o rediseñar. Ten mucho cuidado con este archivo, ya que es posible declarar que todo el resto de los residuos del PDB se debe rediseñar; eso sería muy costoso y probablemente generaría resultados no deseados.

### Sección: Formato del archivo de correspondencia

Los archivos de correspondencia son el pegamento central del diseño multiestado: especifican el significado de la secuencia de la entidad. El resfile de entidad especificará cuántas posiciones hay en la proteína entidad, pero no da significado a esas posiciones. El significado se confiere a los elementos de entidad declarando cómo esas posiciones son seguidas por residuos concretos en estados concretos. Es imposible configurar un problema de diseño multiestado con este software sin considerar cuidadosamente lo que se indica en los archivos de correspondencia, así que no te saltes este paso.

El archivo de correspondencia puede contener un número arbitrario de líneas; cada línea puede estar en blanco o tener el siguiente formato.

```
<entity-element-id> <residue-id ( insertion-code )> <chain-id>
```

donde entity-element-id es un entero; residue-id es un entero que puede terminar con el código de inserción (por ejemplo, 15A) y debe especificar el número de residuo del PDB (por ejemplo, si el pdb empieza en el residuo 10 y te interesa el quinto residuo de este PDB, y ese residuo es el 14, debes decir "14", no "5"); chain-id es un carácter que se refiere a una cadena concreta del PDB, o un guion bajo ("\_") si la cadena no tiene etiqueta.

Archivos de correspondencia de ejemplo: considera la tarea de heterodimerización en la que se diseñan dos monómeros de modo que el monómero "A" se una al monómero "B", pero no a sí mismo, y el monómero "B" se una al monómero "A", pero no a sí mismo. Entonces hay cinco arreglos de estos dos monómeros: el monómero A, el monómero B, el heterodímero AB, el homodímero AA y el homodímero BB.

Digamos que hay 3 posiciones en cada monómero que se están diseñando. Esto da 6 posiciones en la proteína entidad. Impongamos también la convención de que los tres primeros elementos de entidad corresponden a la especie química "A" y los tres últimos elementos de entidad corresponden a la especie química "B". Supongamos además que los tres residuos que se diseñan son los residuos 10, 15 y 20 de las cadenas A y B de los PDB que modelaremos.

Entonces se usarán los siguientes archivos de correspondencia para cada uno de los cinco arreglos

```
<begin A monomer correspondence file>
1 10 A
2 15 A
3 20 A
<end>
```

```
<begin B monomer correspondence file>
4 10 A
5 15 A
6 20 A
<end>
```

(Observa que ambos monómeros se modelan usando un PDB de una sola cadena que solo tiene la cadena A)

```
<begin AB heterodimer correspondence file>
1 10 A
2 15 A
3 20 A
4 10 B
5 15 B
6 20 B
<end>
```

```
<begin AA homodimer correspondence file>
1 10 A
2 15 A
3 20 A
1 10 B
2 15 B
3 20 B
<end>
```

(Observa que el residuo 10 de la cadena A y el de la cadena B corresponden ambos al elemento de entidad 1: deben corresponder al mismo elemento de entidad, o estas dos cadenas podrían terminar con secuencias distintas, y entonces el "homodímero AA" no estaría representado por un homodímero real. El archivo de correspondencia es responsable de definir el hecho de que una especie química terminará siendo un homodímero. Esa tarea no la maneja ninguna otra parte del marco de diseño multiestado.)

```
<begin BB homodimer correspondence file>
4 10 A
5 15 A
6 20 A
4 10 B
5 15 B
6 20 B
<end>
```

(De nuevo, observa que el residuo 10 de las cadenas A y B se asignan para corresponder al mismo elemento de entidad.)

### Sección: Resfile secundario

El resfile secundario indica qué residuos, además de los que ya figuran en el archivo de correspondencia, se deben permitir reempaquetar. El resfile secundario tiene exactamente el mismo formato que un resfile normal (consulta la documentación del formato de resfile aquí: [[Sintaxis y convenciones de resfile|resfiles]]). El resfile secundario especifica comportamientos para cada residuo de la proteína, pero, si se declara que un residuo concreto (el residuo 10, por ejemplo) corresponde a un elemento de entidad concreto (el elemento de entidad 6, por ejemplo), entonces en ese residuo se usa el comportamiento de resfile de ese elemento de entidad (por ejemplo, el comportamiento del resfile de entidad para el elemento de entidad 6 se aplica al residuo 10) en lugar del comportamiento del resfile secundario. El hecho de que el comportamiento de este resfile sea reemplazado por el del resfile de entidad en algunas posiciones es la razón por la que se le llama "secundario".

Por ejemplo, continuando con el ejemplo de heterodimerización descrito arriba, se podría usar el siguiente resfile secundario para modelar (todos) los estados de dímero:

```
<begin resfile>
NATRO
start
9  A NATAA EX 1 EX 2
11 A NATAA EX 1 EX 2
14 A NATAA EX 1 EX 2
16 A NATAA EX 1 EX 2
19 A NATAA EX 1 EX 2
21 A NATAA EX 1 EX 2
9  B NATAA EX 1 EX 2
11 B NATAA EX 1 EX 2
14 B NATAA EX 1 EX 2
16 B NATAA EX 1 EX 2
19 B NATAA EX 1 EX 2
21 B NATAA EX 1 EX 2
<end resfile>
```

que declara 6 residuos adicionales en las cadenas A y B (digamos que son los únicos vecinos inmediatos de los 3 residuos (10, 15 y 20) que se están rediseñando).

NOTA: El "NATRO" como comando por defecto es crítico, ya que indica que cualquier residuo que no figure en este archivo ni en el archivo de correspondencia debe mantenerse fijo. Si no se da ningún comando por defecto, se aplica el comando "ALLAA", lo que significa que se considerarán todos los aminoácidos en todas las posiciones para todos los residuos salvo los que figuran en estos dos archivos. Se optimizarían todas las posiciones en cada paso del protocolo de diseño multiestado, y esto sería muy lento y consumiría cantidades enormes de memoria.

### Sección: Comando STATE

Un estado se define con tres archivos

-   1) un archivo PDB
-   2) un archivo de correspondencia
-   3) un resfile secundario

el comando STATE tiene la siguiente sintaxis:

```
STATE <varname> <pdbfilename> <correspondencefilename> <secondaryrefilename>
```

que declara un nuevo estado que se debe modelar y declara la variable escalar, llamada "varname", a la que se asignará la energía del estado después de que sus rotámeros se hayan empaquetado con una secuencia particular.

### Sección: Comando STATE\_VECTOR

El comando STATE_VECTOR tiene la siguiente sintaxis:

```
STATE_VECTOR <varname> <statevectorfile>
```

donde este comando declara un conjunto de estados, uno por cada línea del archivo de vector de estados, y declara una variable vectorial llamada varname. El formato del archivo de vector de estados se describe en la siguiente sección.

### Sección: Formato del archivo de vector de estados

El formato del archivo de vector de estados es un conjunto de tripletas ordenadas, una por línea, que consisten en 1) el nombre de un archivo pdb, 2) el nombre de un archivo de correspondencia y 3) el nombre de un archivo de resfile secundario. Cada línea se convierte en un estado. Internamente, a cada línea de este archivo se le asigna un nombre según la posición en la que aparece en el archivo. Esto es importante al examinar la salida del diseño multiestado.

Por ejemplo, si el archivo de aptitud contuviera esta línea:

```
<snip fitness file begin>
STATE_VECTOR ab_vect_variable AB.states
<end>
```

y el archivo AB.states contuviera:

```
<begin AB.states>
Conf1.pdb AB.corr AB.2res
Conf2.pdb AB.corr AB.2res
Conf3.pdb AB.corr AB.2res
<end AB.states>
```

entonces, al concluir el diseño multiestado, si se crea el archivo llamado "msd\_output\_1\_ab\_vect\_variable\_2.pdb", el "2" de este nombre de archivo se refiere al segundo estado definido en el archivo AB.states, de modo que sabrás que la conformación de la cadena principal proviene de "Conf2.pdb". (El nombre de variable de este archivo de estados también se usa para nombrar el archivo, "ab\_vect\_variable")

NOTA: nada impide que el "mismo estado" se defina varias veces; por ejemplo, el siguiente es un archivo de vector de estados válido:

```
<begin AB.states>
Conf1.pdb AB.corr AB.2res
Conf1.pdb AB.corr AB.2res
Conf1.pdb AB.corr AB.2res
<end AB.states>
```

entonces, al concluir el diseño multiestado, si se crea el archivo llamado "msd\_output\_1\_ab\_vect\_variable\_2.pdb", el "2" de este nombre de archivo se refiere al segundo estado definido en el archivo AB.states, de modo que sabrás que la conformación de la cadena principal proviene de "Conf2.pdb". (El nombre de variable de este archivo de estados también se usa para nombrar el archivo, "ab\_vect\_variable")

NOTA: nada impide que el "mismo estado" se defina varias veces; por ejemplo, el siguiente es un archivo de vector de estados válido:

```
<begin AB.states>
Conf1.pdb AB.corr AB.2res
Conf1.pdb AB.corr AB.2res
Conf1.pdb AB.corr AB.2res
<end AB.states>
```

En este caso, se incluirán en la trayectoria de diseño tres estados con cadenas principales, archivos de correspondencia y resfiles secundarios idénticos. Esto es útil cuando se usan algoritmos estocásticos para empaquetar los rotámeros, de modo que se use una trayectoria estocástica distinta para cada uno de los estados. (Todos los algoritmos de empaquetado de esta implementación del diseño multiestado son estocásticos).

### Sección: Sintaxis de expresiones

Los comandos SCALAR\_EXPRESSION, VECTOR\_VARIABLE, VECTOR\_EXPRESSION y FITNESS dependen de una "sintaxis de expresiones". Las expresiones se definen recursivamente mediante las siguientes reglas de producción, dadas en una sintaxis similar a EBNF:

```
EXP ::= TERM (  ( '+' | '-' ) TERM )*
TERM ::= FACTOR ( ('*' | '/') FACTOR )*
FACTOR ::= '(' EXP ')' | variable | literal | function '(' EXP ( ',' EXP )* ')'
```

El propósito de los componentes TERM y FACTOR de esta gramática es codificar las reglas de precedencia aritmética: la multiplicación y la división tienen precedencia sobre la suma y la resta. Las expresiones entre paréntesis y las funciones tienen la precedencia más alta. ¿Qué significa esto? La expresión "5 + 3 \* 2" se evaluaría a 11 y no a 16, porque la multiplicación entre 3 y 2 tiene precedencia sobre la suma entre 5 y 3. En cambio, la expresión "(5 + 3) \* 2" se evaluaría a 16 y no a 11.

Las funciones disponibles son: abs, exp, ln, vmax, vmin, pow, sqrt, eq, gt, gte, lt, lte, and, or, not e ite. Algunas funciones operan sobre expresiones escalares y otras sobre expresiones vectoriales; no se deben dar expresiones vectoriales como entradas a funciones que operan sobre expresiones escalares, ni expresiones escalares como entradas a funciones que operan sobre expresiones vectoriales.

Estas funciones (y, entre paréntesis, el número de argumentos que esperan) son

```
abs  (1) : the absolute value of an expression (scalar -> scalar)
exp  (1) : the exponential function; exp(x) is e raised to the power of x. (scalar -> scalar)
ln   (1) : the natural logorithm of an expression (scalar -> scalar)
vmax (1) : the vector maximum (vector -> scalar)
vmin (1) : the vector minimum (vector -> scalar)
pow  (2) : raise the first argument to the power of the second argument.
           pow( x, y ) = x ^ y.  ( scalar X scalar -> scalar )
sqrt (1) : the square root function (scalar->scalar)
eq   (2) : pseudo-boolean equality function; returns 1.0 if its two arguments are equal
           and 0.0 otherwise (scalar X scalar -> scalar )
gt   (2) : pseudo-boolean greater-than function; returns 1.0 if the first argument is
           greater than the second argument ( scalar X scalar -> scalar )
gte  (2) : pseudo-boolean greater-than-or-equal-to function: returns 1.0 if the first
           argument is greater than or equal to the second argument ( scalar X scalar -> scalar )
lt   (2) : pseudo-boolean less-than function; returns 1.0 if the first argument is
           less than the second argument ( scalar X scalar -> scalar )
lte  (2) : pseudo-boolean less-than-or-equal-to function: returns 1.0 if the first
           argument is less than or equal to the second argument ( scalar X scalar -> scalar )
and  (2) : pseudo-boolean logical and: returns 1.0 if both the first and second arguments are
           non-zero and 0.0 otherwise (scalar X scalar -> scalar )
or   (2) : pseudo-boolean logical or: returns 1.0 if either the first or the second arguments
           are non-zero (or both) and 0.0 otherwise (scalar X scalar -> scalar )
not  (1) : pseudo-boolean locial not: returns 1.0 if its argument evaluates to 0.0 and 0.0 if
           its argument evalutes to a non-zero value (scalar X scalar -> scalar )
ite  (3) : if-then-else function: returns the value of the second argument if the first argument
           evaluates to a non-zero value, and returns the value of the third argument otherwise
           (scalar X scalar X scalar -> scalar )
```

Nombres de variables: los nombres de variable válidos deben empezar con una letra, pero pueden incluir dígitos y guiones bajos.

Los literales son numerales con formato científico: por ejemplo "10" o "-2.3" o "6.4e-5"

PRECAUCIÓN: incluye espacios alrededor de todo. La cadena "3-4" se tokenizaría como "Literal(3) Literal(-4)" y esto produciría un error de análisis (¡confuso!). En cambio, la cadena "3 - 4" se tokenizaría como "Literal(3) MinusSign Literal(4)" y esto se analizaría correctamente.

### Sección: Comando POSE\_ENERGY

El comando POSE\_ENERGY te permite calcular la puntuación de un archivo PDB una sola vez al principio de la ejecución e incluir esa puntuación como constante en cálculos posteriores. Esto puede ser útil si quieres restar la diferencia entre dos conformaciones distintas de la cadena principal de la misma especie química.

La sintaxis del comando POSE\_ENERGY es

```
POSE_ENERGY <varname> <pdb>
```

### Sección: Comando POSE\_ENERGY\_VECTOR

Al igual que el comando POSE\_ENERGY, el comando POSE\_ENERGY\_VECTOR te permite calcular la puntuación de estructuras y usar esas puntuaciones en cálculos posteriores. Este comando crea una variable vectorial en lugar de una variable escalar, de modo que, por ejemplo, se podría usar en comandos VECTOR\_EXPRESSION.

La sintaxis del comando POSE\_ENERGY\_VECTOR es

```
POSE_ENERGY_VECTOR <varname> <listfilename>
```

donde el contenido de \<listfilename\> debe contener una lista de pdb, uno por línea. Las líneas vacías y las que empiezan con '\#' se ignoran.

### Sección: Comando SCALAR\_EXPRESSION

La sintaxis del comando de expresión escalar es:

```
SCALAR_EXPRESSION <varname> = <expression>
```

donde expression es una expresión bien formada, y este comando declara la variable escalar llamada "varname", que se puede usar en expresiones posteriores.

### Sección: Comando VECTOR\_VARIABLE

El comando de variable vectorial permite al usuario combinar variables escalares en variables vectoriales. Esto puede ser útil si el usuario quiere usar las funciones de "máximo vectorial" o "mínimo vectorial" sobre un conjunto de variables escalares. (Para evitar confusiones entre las funciones de máximo y mínimo vectoriales, no se permiten las funciones de máximo y mínimo escalares.)

La sintaxis de este comando es:

```
VECTOR_VARIABLE <varname> = <scalar_varname>( <scalar_varname2>*)
```

Donde "\*" denota cero o más apariciones de un nombre de variable separado por espacios en blanco, es decir, se permite una lista de nombres de variables escalares de longitud arbitraria, delimitada por espacios en blanco, en el lado derecho del signo igual. Este comando declarará una nueva variable vectorial llamada "varname".

Por ejemplo, si las variables escalares "best\_AA" y "best\_BB" se hubieran definido antes en el archivo, el siguiente comando declararía una nueva variable vectorial "homodimers":

```
VECTOR_VARIABLE homodimers = bestAA bestBB
```

y luego homodimers se podría usar en un comando vmin posterior, por ejemplo

```
SCALAR_EXPRESSION best_homodimer = vmin( homodimers )
```

### Sección: Comando VECTOR\_EXPRESSION

El comando de expresión vectorial se puede usar para definir operaciones más complicadas con variables vectoriales. El comando en sí es bastante más complicado que los comandos de vectores escalares. Puede operar sobre múltiples variables vectoriales simultáneamente, siempre que esas variables vectoriales tengan la misma longitud.

La sintaxis del comando es:

```
VECTOR_EXPRESSION FOR <localvar> IN <vectorvar>( , <localvar2> IN <vectorvar2>)* : <newvarname> = <expression>
```

donde las variables de iteración "localvar", "localvar2", etc. pueden aparecer en la expresión del lado derecho del signo igual, pero no deben haberse declarado como variables no locales en ninguna instrucción previa que declare variables (es decir, pueden haber aparecido como variables locales en comandos VECTOR\_EXPRESSION anteriores). Esto crea la nueva variable vectorial con el nombre "newvarname."

Ejemplo 1: si la variable vectorial "trpcage" se hubiera declarado antes, se podría declarar una nueva variable vectorial de la siguiente manera:

```
VECTOR_EXPRESSION FOR x IN trpcage : trpcage_plus_2 = x + 2
```

donde cada entrada de esta nueva variable vectorial, trpcage\_plus\_2, tiene un valor 2 unidades mayor que su valor correspondiente en la función original.

Ejemplo 2: si las variables vectoriales "trpcage1" y "trpcage2" tuvieran la misma longitud, se podría declarar una nueva variable vectorial de la siguiente manera:

```
VECTOR_EXPRESSION FOR x IN trpcage1 , y IN trpcage2 : trpcage_plus_2 = x + y + 2
```

Un comando así sería útil si se hubieran creado dos archivos de vector de estados de modo que las conformaciones de la cadena principal coincidieran entre posiciones correspondientes y solo quisieras comparar energías entre estados que provienen de las mismas conformaciones de cadena principal.

### Sección: Comando ENTITY\_FUNCTION

El comando ENTITY\_FUNCTION es un punto de partida en el archivo de aptitud para el procesamiento de un archivo completamente distinto, un archivo de función de entidad. El comando ENTITY\_FUNCTON simplemente declara una nueva variable escalar y apunta al archivo de función de entidad. Su sintaxis es

```
ENTITY_FUNCTION <entvarname> <entfuncfilename>
```

Dada la entidad (una asignación de secuencia), las funciones definidas en este archivo se evaluarán y su resultado se almacenará en la nueva variable llamada "entvarname".

El archivo de función de entidad es bastante más complicado, básicamente tan complicado como la propia función de aptitud. Su propósito es agregar restricciones a nivel de secuencia a la función de aptitud; estas restricciones pueden examinar las identidades de aminoácidos de los elementos de entidad, pero no tienen acceso a las asignaciones de rotámeros de ninguno de los estados.

El archivo de elementos de entidad predefine un conjunto de variables de elementos de entidad cuyos valores los determina la entidad dada. Estas variables se llaman "ee\_1" a "ee\_\<N\>" (donde N es el número de residuos de la proteína entidad). Por ejemplo, si hay 6 residuos en la proteína entidad, es válido referirse a las variables de elementos de entidad "ee\_1", "ee\_2", "ee\_3", "ee\_4", "ee\_5" y "ee\_6". Estas variables contendrán los valores numéricos de los códigos de 1 letra (1 para "ALA/A", 2 para "CYS/C", 20 para "TYR/Y"), que pueden o no ser útiles. Esto significa que es posible comparar si dos entidades tienen asignado el mismo aminoácido (por ejemplo, la expresión "eq( ee\_1, ee\_4 )" se evaluaría a 1.0 si a estas dos posiciones de la entidad se les asignan los mismos aminoácidos). Probablemente no sea útil intentar sumar o multiplicar estos valores.

Hay cuatro comandos disponibles en el archivo de función de entidad:

```
AA_SET
SET_CONDITION
SUB_EXPRESSION (equivalent to the fitness-function file's "SCALAR_EXPRESSION" command)
```

y

```
SCORE (equivalent to the fitness-function file's "FITNESS" command).
```

El archivo de función de entidad debe definir exactamente un comando "SCORE", y el valor al que se evalúe la expresión de SCORE es el que se asignará a la variable ("entvarname" arriba) en el archivo de función de aptitud.

La sintaxis de estos cuatro comandos es la siguiente.

El comando AA\_SET permite al usuario definir un conjunto de aminoácidos, lo que puede resultar cómodo.

```
AA_SET <setname> = { A1 (, A2)* }
```

que declarará un nuevo conjunto de aminoácidos con nombre, llamado "setname", y "A1" y "A2" son códigos de aminoácido de una letra, en mayúsculas o minúsculas. Por ejemplo, el siguiente conjunto es válido:

```
AA_SET polar = { D, E, H, K, N, Q, R, S, T }
```

de modo que más adelante es posible preguntar si un elemento de entidad concreto es miembro de un conjunto. Para hacer esa pregunta se debe usar el comando SET\_CONDITION.

La sintaxis del comando SET\_CONDITON es:

```
SET_CONDITON <varname> = <ee_X> IN [ { A1 (, A2)* } | <setname> ]
```

que declarará una variable escalar seudobooleana llamada "varname" cuyo valor será 1.0 si se cumple la condición del conjunto y 0.0 en caso contrario. Por ejemplo, ambos comandos SET\_CONDITON siguientes son válidos:

```
SET_CONDITON ee1_is_aromatic = ee1 IN { H, P, Y, W }
SET_CONDITON ee1_is_polar = ee1 IN polar
```

suponiendo que el conjunto "polar" se haya declarado previamente.

El comando SUB\_EXPRESSION define una expresión escalar del mismo modo que lo hace el comando "SCALAR\_EXPRESSION" de FITNESS\_FUNCTION. En la función de entidad no hay expresiones vectoriales disponibles. La sintaxis de este comando es:

```
SUB_EXPRESSION <varname> = <expression>
```

donde la nueva variable "varname" no debe haberse declarado previamente en el archivo de función de entidad, pero puede haberse declarado en el archivo de función de aptitud (las variables no se comparten entre estos dos archivos).

por ejemplo, continuando con el ejemplo de la tarea de heterodimerización de arriba, para contar la carga neta de la cadena A (suponiendo un pH de 7 y que, además de los tres residuos que se diseñan, la cadena A tiene una carga neta de 0), se podrían combinar los siguientes comandos:

```
<begin entity-function file snippet>

AA_SET pos_aas = { K, R }
AA_SET neg_aas = { D, E }

SET_CONDITON ee1_pos = ee_1 in pos_aas
SET_CONDITON ee2_pos = ee_2 in pos_aas
SET_CONDITON ee3_pos = ee_3 in pos_aas
SET_CONDITON ee1_neg = ee_1 in neg_aas
SET_CONDITON ee2_neg = ee_2 in neg_aas
SET_CONDITON ee3_neg = ee_3 in neg_aas

SUB_EXPRESSION chainA_charge = ee1_pos + ee2_pos + ee3_pos - ee1_neg - ee2_neg - ee3_neg

<end snippet>
```

La sintaxis del comando SCORE, que debe aparecer una vez en el archivo, es:

```
SCORE <expression>
```

por ejemplo,

```
SCORE -1 * lt( chainA_charge, 1 )
```

devolvería un valor negativo (que es el favorecido) si la cadena A tiene una carga neutra o negativa.

### Sección: Comando FITNESS

En el archivo de la función de aptitud debe aparecer exactamente un comando FITNESS. El valor al que se evalúa la expresión definida en el comando FITNESS para una secuencia determinada es el que usa el algoritmo genético para decidir si esa secuencia se debe propagar a la siguiente generación.

NOTA: Cuanto menor sea la aptitud, mejor. Esto puede parecer contrario a la forma en que suelen operar los algoritmos genéticos, pero tiene sentido en el contexto general de minimizar energías.

La sintaxis del comando FITNESS es:

```
FITNESS <expression>
```

Limitaciones
============

Consulta la sección de discusión de [Leaver-Fay et al.2011], que describe tres problemas importantes en el diseño negativo: el fallo de la optimización de rotámeros, el problema del rotámero faltante y la suposición de cadena principal fija.

Opciones
========

Opciones para controlar el comportamiento del algoritmo genético

```
-ms::pop_size <int>                    # Recommended: 100
-ms::generations <int>                 # Recommended: 15 * the number of residues being designed (i.e. the number on the first line of the entity resfile)
-ms::fraction_by_recombination <float> # Recommended: 0.02
-ms::numresults <int>                  # the number of output sequences to write out
```

Opciones específicas de la aplicación mpi\_msd

```
-msd::entity_resfile <filename>        # Required: The name of the entity resfile
-msd::fitness_file   <filename>        # Required: The name of the fitness-function definition file
-msd::double_lazy_ig_mem_limit <int>   # Limit the amount of memory that each state will consume representing the rotamer pair energies.  In MB.
-msd::dont_score_bbhbonds              # Do not count bb/bb hbonds -- not recommended.
-msd::exclude_background_energies      # Do not include the energies of "background residues" into the state energies -- not recommended.
```

Consejos
========

-   Se recomiendan las opciones -ex1 y -ex2 para obtener estructuras de salida bien empaquetadas, o se pueden dar por residuo en el resfile de entidad o en los resfiles secundarios con los comandos de resfile "EX 1 EX 2".

Salidas esperadas
=================

Se escriben archivos de salida para cada uno de los estados que contribuyen a la función de aptitud. Los archivos de salida se nombran como una concatenación de

-   1) el prefijo "msd\_output\_"
-   2) el nombre de variable dado a la variable STATE o STATE\_VECTOR usada para declarar ese estado
-   3) el índice del diseño (es decir, si se dio -ms::numresults 10, se escribirían 10 conjuntos de estructuras de salida)
-   y 4) el índice del estado (que, si se declaró en un comando STATE\_VECTOR, identificará su posición en el archivo .states de entrada)

La lógica de qué estados contribuyen a la función de aptitud es bastante simple:

En las expresiones aritméticas binarias, por ejemplo `       exp1 + exp2      ` , se considera que contribuyen todos los estados que contribuyen a exp1 y a exp2. En las expresiones de selección lógica, por ejemplo ite( lt( exp1, exp2 ), exp3, exp4 ), el conjunto de estados que contribuyeron a la expresión exp3 se consideraría que contribuye si exp1 fue menor que exp2; de lo contrario, se considera que contribuye el conjunto de estados que contribuyen a exp4. NOTA: los estados que contribuyen a exp1 o a exp2 no se consideran contribuyentes, salvo, por supuesto, que contribuyan a la expresión (exp3 o exp4) que se elija. Nota: a menudo es mejor multiplicar por 0 la energía de un estado o de una variable que deseleccionar esa variable o estado; los estados cuyas energías se multiplican por cero pero que, por lo demás, se consideran contribuyentes a la aptitud seguirán teniendo pdb de salida generados. En las expresiones "vmax" y "vmin", que seleccionan un valor entre un conjunto de muchos, solo se considera que contribuyen a la expresión los estados que contribuyen a ese único valor seleccionado.

Posprocesamiento
================

Si usas el diseño multiestado para diseñar contra una conformación o interacción concreta, es probable que haya introducido choques, y es muy probable que esos choques se puedan resolver relajando esa conformación. Por supuesto, el tipo de relajación posterior que debas realizar depende de tu problema de diseño. Para ver un ejemplo de uso de docking para relajar interfaces proteína/proteína, consulta el Material Suplementario del artículo [Leaver-Fay, et al., 2001].

Novedades en Rosetta3.3
=======================

Esta es la primera vez que se publica la aplicación de diseño multiestado "mpi\_msd".

##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[ProteinInterfaceMSMover]]: mover de RosettaScripts para diseño multiestado
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta
