#Formato de archivo de restricciones geométricas para matching y diseño de enzimas

Autor: Florian Richter (floric@u.washington.edu)

Metadatos
========

Este documento fue escrito por Florian Richter (floric@u.washington.edu) en agosto de 2010. Las aplicaciones `       enzyme_design      ` y `       match      ` las mantiene el laboratorio de David Baker. Envía tus preguntas a dabaker@u.washington.edu

Referencias
==========

Richter F, Leaver-Fay A, Khare SD, Bjelic S, Baker D (2011) De Novo Enzyme Design Using Rosetta3. PLoS ONE 6(5): e19230. doi:10.1371/journal.pone.0019230

Propósito de la aplicación
===========================================

El formato de archivo de restricciones geométricas de match / enzdes (en adelante, 'cstfile') se usa para especificar en Rosetta la disposición deseada de un sitio de unión o sitio activo. Una disposición así suele consistir en

1.  una serie de aminoácidos y un ligando de molécula pequeña o sustrato, y
2.  cómo se colocan espacial y geométricamente estos distintos aminoácidos y el ligando unos respecto a otros.
     El matcher usa esta información del cstfile para intentar injertar el sitio deseado en una estructura de proteína, y el código de enzyme\_design (en adelante, 'enzdes') la usa para restringir los sitios activos a la geometría deseada durante el empaquetado de rotámeros y la minimización. Pueden encontrarse cstfiles de ejemplo en las pruebas de integración del matcher ( `        Rosetta/main/tests/integration/tests/match/inputs/1n9l_CHbN/Est_CHbkupb_d2n_match.cst       ` , `        Rosetta/main/tests/integration/tests/match/inputs/1c2t/1c2t_xtal_BUHis.cst       ` , `        Rosetta/main/tests/integration/tests/match/inputs/6cpa/6cpa_xtal.cst       ` ), de enzdes ( `        Rosetta/main/tests/integration/tests/enzdes/inputs/Est_CHba_d2n.cst       ` ) y de cstfile\_to\_theozyme\_pdb `        Rosetta/main/tests/integration/tests/cstfile_to_theozyme_pdb/inputs/CTP_RKRE_1acid2acid.cst       `
     Mientras que el matcher solo es capaz de encontrar sitios que contengan un ligando y una serie de residuos de proteína que interactúan con este ligando o con otro residuo de proteína, en enzdes un cstfile también puede usarse para restringir geometrías entre una interfaz proteína-proteína, entre dos ligandos o dentro de una sola proteína. La aplicación pública rosetta/rosetta\_source/src/apps/public/enzdes/CstfileToTheozymePDB.cc puede crear un modelo .pdb de la geometría de la theozima especificada en un cstfile. Al desarrollar una theozima se recomienda ejecutar esta aplicación para confirmar que el cstfile codifica correctamente la geometría deseada. Los detalles sobre el uso de esta aplicación se encuentran más abajo, en la sección "Uso del ejecutable CstfileToTheozymePDB".

Descripción del formato cstfile
============

Una vez que el usuario ha decidido cómo debe ser la interacción deseada (en términos de la relación geométrica entre un residuo catalítico y el sustrato, o entre dos residuos catalíticos), hay que escribir un archivo formado por bloques con el siguiente formato. Para cada interacción entre dos residuos, tiene que haber un bloque. El ejemplo siguiente describe la interacción entre una histidina y un ligando abreviado con el nombre D2N. En este cstfile, tiene que haber un bloque con el siguiente formato para cada interacción catalítica:

```
CST::BEGIN
  TEMPLATE::   ATOM_MAP: 1 atom_name: C6 O4 O2
  TEMPLATE::   ATOM_MAP: 1 residue3: D2N

  TEMPLATE::   ATOM_MAP: 2 atom_type: Nhis,
  TEMPLATE::   ATOM_MAP: 2 residue1: H

  CONSTRAINT:: distanceAB:    2.00   0.30 100.00  1        0
  CONSTRAINT::    angle_A:  105.10   6.00 100.00  360.00   1
  CONSTRAINT::    angle_B:  116.90   5.00  50.00  360.00   1
  CONSTRAINT::  torsion_A:  105.00  10.00  50.00  360.00   2
  CONSTRAINT::  torsion_B:  180.00  10.00  25.00  180.00   4
  CONSTRAINT:: torsion_AB:    0.00  45.00   0.00  180.00   5
CST::END
```

La información de este bloque define restricciones entre tres átomos del residuo 1 y tres átomos del residuo 2. Pueden especificarse hasta seis parámetros ( una distancia, dos ángulos, 3 diedros ).

Los registros indican lo siguiente:

'CST::BEGIN' y 'CST::END' indican el principio y el final del bloque de definición respectivo de esta interacción catalítica.

Los registros 'TEMPLATE:: ATOM\_MAP:':
 Estos indican qué átomos se restringen y de qué tipo de residuo son. El número de la columna 3 de estos registros indica a qué residuo catalítico se refiere el registro. Tiene que ser 1 o 2.
 La etiqueta 'atom\_name' especifica exactamente cuáles 3 átomos del residuo se restringirán. Tiene que ir seguida de los nombres de tres átomos que formen parte del residuo catalítico. En el ejemplo anterior, para el residuo catalítico 1, el átomo 1 es C6, el átomo 2 es O4 y el átomo 3 es O2. La etiqueta 'atom\_type' es una alternativa a la etiqueta 'atom\_name'. Permite una definición más flexible de los átomos restringidos. Tiene que ir seguida del [[tipo de átomo de Rosetta|Rosetta AtomTypes]] del primer átomo restringido del residuo. Si se usa esta etiqueta, Rosetta fijará el 2.º átomo restringido como el átomo base del primer átomo restringido, y el tercer átomo restringido como el átomo base del 2.º átomo restringido. ( Nota: los átomos base de cada átomo se definen en los registros ICOOR del archivo .params de ese tipo de residuo ). El uso de la etiqueta 'atom\_type' tiene dos ventajas: primero, permite restringir distintos tipos de residuo con el mismo archivo. Por ejemplo, si se va a restringir un enlace de hidrógeno catalítico, pero al usuario no le importa si está mediado por un SER-OH o un THR-OH. Segundo, si un residuo catalítico contiene más de un átomo del mismo tipo (como en el caso de ASP o GLU ), pero no importa cuál de estos átomos media la interacción restringida, usar esta etiqueta hará que Rosetta evalúe la restricción para todos estos átomos por separado y elija el de menor puntuación; es decir, la ambigüedad de la restricción se resolverá automáticamente.

La etiqueta 'residue1' o 'residue3' especifica qué tipo de residuo se restringe. 'residue3' tiene que ir seguida del nombre del residuo en abreviatura de 3 letras. 'residue1' tiene que ir seguida del nombre del residuo en abreviatura de 1 letra. Por comodidad, si varios tipos de residuo similares pueden cumplir la restricción (p. ej., ASP o GLU ), la etiqueta 'residue1' puede ir seguida de una cadena de códigos de 1 letra de los residuos permitidos ( p. ej., ED para ASP/GLU, o ST para SER/THR ).

Los registros 'CONSTRAINT::':
 Estos registros especifican el valor y la fuerza reales de la restricción aplicada entre los dos residuos especificados en el bloque. Cada uno de estos registros va seguido de una cadena y 4 números. La cadena puede tener los siguientes valores permitidos: 'distanceAB' significa la distancia Res1:Atom1 = Res2:Atom1, es decir, la distancia entre el átomo 1 del residuo 1 y el átomo 1 del residuo 2. 'angle\_A' es el ángulo Res1:Atom2 - Res1:Atom1 - Res2:Atom1 'angle\_B' es el ángulo Res1:Atom1 - Res2:Atom1 - Res2:Atom2 'torsion\_A' es el diedro Res1:Atom3 - Res1:Atom2 - Res1:Atom1 - Res2:Atom1 'torsion\_AB' es el diedro Res1:Atom2 - Res1:Atom1 - Res2:Atom1 - Res2:Atom2 'torsion\_B' es el diedro Res1:Atom1 - Res2:Atom1 - Res2:Atom2 - Res2:Atom3. La figura 1 siguiente muestra de forma gráfica cómo se obtienen los parámetros de distancia, ángulo y torsión.

![Visualización de la lógica de las restricciones del matcher](https://new.rosettacommons.org/docs/wiki/rosetta_basics/images/matcher_cst_visual.png)
**Figura 1.** Definición de la geometría de interacción entre el átomo **1** del **residuo 1** y el átomo **1'** del **residuo 2**.

Cada una de estas cadenas va seguida de 4 (opcionalmente 5 ) columnas de números: x0, xtol, k, covalente/periodicidad y número de muestras. La 1.ª columna, x0, especifica la distancia óptima x0 del valor respectivo. La 2.ª columna, xtol, especifica la tolerancia permitida xtol del valor. La 3.ª columna especifica la constante de fuerza k, o la intensidad de este parámetro concreto. Si x es el valor del parámetro restringido, la penalización de puntuación aplicada será: 0 si |x - x0| \< xtol y k \* ( |x - x0| - xtol ) en caso contrario
 Esta 3.ª columna solo es relevante para enzdes, y el matcher no usa el número que contiene.

La 4.ª columna tiene un significado especial en el caso del parámetro distanceAB. Especifica si la interacción restringida es covalente o no. 1 significa covalente, 0 significa no covalente. Si la restricción se especifica como covalente, Rosetta no evaluará el término vdW entre Res1:Atom1 y Res2:Atom1 ni sus vecinos [1,3].
 Para los otros 5 parámetros, la 4.ª columna especifica la periodicidad per de la restricción. Por ejemplo, si x0 es 120 y per es 360, la función de restricción tendrá su mínimo en 120 grados. Si x0 es 120 y per es 180, la función de restricción tendrá dos mínimos, uno en 120 grados y otro en 300 grados. Si x0 es 120 y per es 120, la función de restricción tendrá 3 mínimos, en 120, 240 y 360 grados.
 La 5.ª columna es opcional y especifica cuántas muestras colocará el matcher, si usa el algoritmo de matching clásico ( véase la documentación del matcher ), entre el valor x0 y x0 +- tol. Enzdes no usa los números de esta columna. El matcher interpreta el valor de esta columna como el número de puntos de muestreo entre x0 + xtol y x0 - xtol. Es decir, en el ejemplo anterior, para angleA, el matcher muestreará los valores 99.10, 105.10 y 111.10 grados. Para torsionA, muestreará 95, 100, 105, 110 y 115 grados. En general, si el valor de esta columna es n, el matcher muestreará 2n+1 puntos para el parámetro respectivo. Ten en cuenta que el número de muestras también está influido por la periodicidad, ya que el matcher muestreará alrededor de cada x0. Por ejemplo, para torsion\_AB en el bloque anterior, habrá 2\*5+1 = 11 muestras por cada mínimo, y como hay dos mínimos ( 0 y 180 grados ), habrá un total de 22 muestras para este parámetro, en los siguientes valores: 0, 9, 18, 27, 36, 45, 135, 144, 153, 162, 171, 180, 189, 198, 207, 216, 225, 315, 324, 333, 342, 351.
 Al determinar cuántos valores distintos muestrear para cada parámetro, es importante recordar que el número de colocaciones distintas del ligando que se intentan por cada rotámero de proteína construido es igual al producto de las muestras de cada uno de los 6 parámetros. Por ejemplo, en el bloque anterior hay una muestra para distanceAB, 3 muestras para angle\_A, 3 muestras para angle\_B, 5 muestras para torsion\_A, 18 muestras para torsion\_B y 22 muestras para torsion\_AB, lo que significa que, por cada rotámero de proteína, el matcher intentará colocar el ligando en un total de 1\*3\*3\*5\*18\*22 = 17820 conformaciones distintas.

Instrucciones específicas del matcher en el cstfile
====================================

Varias otras características de una ejecución del matcher pueden dictarse mediante bloques en el cstfile.

1.  Algoritmo de matching que se usará para un bloque dado
     El matcher conoce dos algoritmos para encontrar el sitio activo deseado: el matching clásico y el matching secundario. Consulta la documentación del matcher para ver una descripción y una comparación de estos dos algoritmos. Por defecto, el matcher realiza matching clásico con el ligando. Para provocar un matching secundario en una restricción o interacción dada, hay que añadir las siguientes líneas al bloque del cstfile de esa restricción:

    ```
      ALGORITHM_INFO:: match
        SECONDARY_MATCH: DOWNSTREAM
      ALGORITHM_INFO::END
    ```

     Esto provocará un matching secundario con el ligando para esta restricción. Para provocar un matching secundario con un residuo de proteína que se hizo coincidir en otro bloque de restricción, la etiqueta SECONDARY\_MATCH tiene que cambiarse por

    ```
      ALGORITHM_INFO:: match
        SECONDARY_MATCH: UPSTREAM_CST 2
      ALGORITHM_INFO::END
    ```

     El número de la última columna de la línea 'SECONDARY\_MATCH: UPSTREAM\_CST 2' define en qué bloque del cstfile está el residuo diana upstream/de proteína. Naturalmente, el matching secundario upstream solo puede ocurrir con un residuo de un bloque anterior del cstfile.

2.  Nivel de muestreo de los rotámeros de proteína
     En general, el nivel de muestreo de rotámeros de proteína en el matcher lo determinan los valores de las opciones de línea de comandos -packing:ex1 etc. Sin embargo, es posible anularlos para bloques de restricción individuales añadiendo las siguientes líneas a un bloque de restricción:

    ```
      ALGORITHM_INFO:: match
        CHI_STRATEGY:: CHI 1 EX_FOUR_HALF_STEP_STDDEVS
        CHI_STRATEGY:: CHI 2 EX_ONE_STDDEV
            IGNORE_UPSTREAM_PROTON_CHI
      ALGORITHM_INFO::END
    ```

     Puede encontrarse documentación detallada sobre cómo especificar el muestreo de rotámeros para residuos individuales del matching en los comentarios detallados de rosetta/rosetta\_source/src/protocols/match/Matcher.cc, antes de la función 'initialize\_from\_file'. La instrucción 'IGNORE\_UPSTREAM\_PROTON\_CHI' puede ser muy útil al hacer matching de una cadena lateral de SER, THR, CYS o TYR, si la interacción se define a través del átomo pesado O/S y no del protón. Debe tenerse en cuenta que el matcher puede muestrear conformaciones rotaméricas que no están disponibles en las bibliotecas de rotámeros estándar de Rosetta. Al usar esta característica, hay que ser consciente de que los rotámeros catalíticos podrían no estar disponibles en las etapas de posprocesamiento, cuando se diseñan los matches.

3.  Modificación de las posiciones de matching según características estructurales.
     Es posible modificar las posiciones del andamio que se consideran para un residuo upstream mediante instrucciones en el bloque del cstfile de ese residuo. Esto puede resultar muy práctico al hacer matching contra un gran número de andamios.
     Las propiedades que pueden usarse actualmente para discriminar ciertas posiciones de matching son la estructura secundaria, los bfactors y el número de vecinos a 10A.

ejemplos: añadir lo siguiente a un bloque de un cstfile

```
  ALGORITHM_INFO:: match_positions
    bfactor absolute <value>
  ALGORITHM_INFO::END
```

significará que solo se harán coincidir las posiciones del posfile en las que el calpha tenga un bfactor menor que value, para la restricción en cuyo bloque del cstfile esté esta información.

Actualmente son posibles las siguientes otras opciones:

```
bfactor relative
```

solo se permiten las posiciones con un bfactor relativo de

(value tiene que cumplir 0 \< value \< 1 ) , donde relativo significa el ca-bfactor dividido por el mayor ca-bfactor observado en el pdb

```
ss ss_char H 
```

solo se permiten las posiciones que están en una hélice (para obtener lámina/loop, sustituye H por E/L )
ss ss\_motif helix\_nterm solo se harán coincidir las posiciones en el extremo N-terminal de una hélice

```
num_neighbors min_neighbors <minval> max_neighbors <maxval> 
```

solo se harán coincidir las posiciones que tengan entre minval y maxval vecinos
 num\_neighbors max\_neighbors \<val\> solo se harán coincidir las posiciones que tengan menos de val vecinos
 num\_neighbors min\_neighbors \<val\> debería ser obvio

todas estas opciones pueden combinarse; es decir, si añades lo siguiente a un bloque de tu cstfile

```
  ALGORITHM_INFO:: match_positions
    ss ss_motif helix_nterm
    bfactor relative 0.4
    num_neighbors min_neighbors 7 max_neighbors 20
  ALGORITHM_INFO::END
```

Solo se harán coincidir las posiciones del posfile que estén en el extremo N-terminal de una hélice, sean relativamente rígidas y no estén demasiado expuestas pero tampoco demasiado enterradas. El código de estas exclusiones reside en `       Rosetta/main/source/src/protocols/match/MatchPositionModifiers.hh/cc      `

Uso del ejecutable CstfileToTheozymePDB
===================================

Este ejecutable toma un cstfile y construye un modelo pdb de los residuos y la geometría especificados en él. Para cada interacción deseada (cada bloque del cstfile) se construirá un conjunto de rotámeros del residuo deseado y se colocará según la geometría especificada. El uso es simplemente:

```
CstfileToTheozymePDB.<extension> -extra_res_fa <.params file of ligand> -match:geometric_constraint_file <cstfile> -database <rosetta database>
```

Consulta la prueba de integración cstfile\_to\_theozyme\_pdb para ver un ejemplo.

ADVERTENCIA: Al usar esta aplicación hay que tener en cuenta cuatro cosas; la más importante es que los parámetros de muestreo de los cstfiles usados con esta aplicación deben fijarse lo más pequeños posible.

1.  El número de pasos de muestreo de todos los grados de libertad (5.ª columna de los registros CONSTRAINT) debe fijarse siempre en 0. La razón es que, durante la construcción del modelo 3D, se construye un conjunto de rotámeros por cada combinación de pasos de muestreo. En el ejemplo presentado antes, se construirían y escribirían en disco 17820 conformaciones distintas de un conjunto de rotámeros de HIS. El modelo pdb resultante estaría por tanto muy cargado y, si los parámetros de muestreo fueran aún mayores, podría llenar rápidamente el disco.
2.  Los cstfiles usados con esta aplicación deben tener especificados los seis grados de libertad en cada bloque de restricción. La razón es que, para cada interacción, el conjunto de rotámeros se coloca usando como referencia el ligando o un rotámero anterior. Esto significa que, si hay bloques en el cstfile que tienen algunos grados de libertad sin definir y que han de hacerse coincidir mediante matching secundario, habrá que añadir parámetros para los grados de libertad sin definir para esta aplicación.
3.  Esta aplicación no hace cálculos de energía. Esto podría significar que los modelos producidos tengan choques, según la geometría de la theozima, los rotámeros del ligando y dónde terminen las cadenas principales de los rotámeros de las cadenas laterales. Esto no significa necesariamente que una theozima no pueda dar matches sin choques.
4.  Las posiciones de las cadenas laterales se calcularán respecto al primer rotámero del ligando. Las posiciones de las cadenas laterales que interactúan con otras cadenas laterales (interacciones upstream-upstream) también se calcularán respecto al primer rotámero de cadena lateral.

En resumen, esta aplicación debe usarse para asegurarse de que Rosetta entiende la geometría de un cstfile de la manera en que el usuario la imagina. Al usar en matching o en enzdes cstfiles desarrollados con la ayuda de esta aplicación, no hay que olvidar ajustar el cstfile en cuanto a los parámetros de muestreo y/o el matching secundario con algunos grados de libertad sin definir.

##Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Match]]: Documentación de la aplicación match
* [[Archivos de restricciones|constraint-file]]: Formato de archivo de restricciones de Rosetta (no para la aplicación match)
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
