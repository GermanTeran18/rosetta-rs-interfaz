#Formato del archivo movemap

Metadatos
========

Este documento fue editado por Frank DiMaio el 11/5/2010.

Descripción general
========

Ciertos protocolos (p. ej., [[backrub]]) aceptan un movemap especificado por el usuario, que indica al algoritmo qué ángulos de torsión y grados de libertad de cuerpo rígido pueden moverse. Por ejemplo, puede que no se quiera mover cadenas laterales muy conservadas en aplicaciones de modelado o que se quieran preservar ciertas interacciones en aplicaciones de diseño. Este documento describe brevemente el formato usado para especificar estos grados de libertad.

Formatos de archivo
============

Cada línea del archivo movemap identifica un salto, un residuo o un intervalo de residuos, seguido de los grados de libertad permitidos. Estas entidades pueden especificarse de la siguiente manera:

```
RESIDUE r      # a single residue, 'r'
RESIDUE s t    # all residues s through t
JUMP k         # jump #k
```

Por ejemplo:

```
RESIDUE 36 48 BBCHI  # set res 36-48 bb & chi movable
RESIDUE 89 NO        # set res 89 unmovable
JUMP 1 YES           # set jump 1 movable
```

Especificar un '\*' como número de residuo o de salto establece el valor por defecto:

```
RESIDUE * CHI        # set all residues chi movable
JUMP * NO            # set all jumps unmovable
```

Prioridad:

-   El movimiento permitido de residuos específicos siempre tiene prioridad sobre los valores por defecto.
-   Si un residuo aparece más de una vez, la última aparición en el archivo determina el movimiento permitido.

Establecer 'CHI' implica que BB no es móvil, por lo que no hagas esto:

```
RESIDUE * CHI
RESIDUE * BB
```

Haz esto en su lugar:

```
RESIDUE * BBCHI
```

Notas:

-   Los residuos se numeran con la «numeración de Rosetta»: el primer residuo es el \#1 y los ID de residuo se incrementan a través de las cadenas.
-   Con los lectores de entrada por defecto, el salto \#1 conecta las cadenas 1 y 2, el salto \#2 conecta las cadenas 1 y 3, etc. Sin embargo, los protocolos pueden (y a menudo lo hacen) cambiar estos saltos o incluso introducir saltos intracadena. En general, lo habitual será especificar solo un valor por defecto para el movimiento de los saltos.
-   Si no se especifica un residuo o un valor por defecto, se usa el valor por defecto del movemap (que es específico del protocolo)
-   Si no se da un valor para un salto (p. ej., si se da solo "JUMP 4\\n"), por defecto es móvil (YES)

Archivos de ejemplo
============

Este ejemplo procede de un ejercicio de modelado por homología en el que se remodela una proteína de unión a ADN con el ADN presente. Los residuos 1-117 son los residuos de la proteína, y 118-132 y 133-147 son las dos cadenas de ADN. El salto 1 conecta la proteína con el ADN, mientras que el salto 2 conecta las dos cadenas de ADN.

El ejemplo siguiente permite que se muevan todas las torsiones de la proteína, mientras que el ADN permanece fijo. Se permite que se mueva la orientación de cuerpo rígido de la proteína respecto al ADN, mientras que la orientación relativa de las dos cadenas de ADN no puede cambiar.

```
RESIDUE * BBCHI
RESIDUE 118 147 NO
JUMP * YES
JUMP 2 NO
```

##Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Movemap|RosettaEncyclopedia#movemap]]: Definición de MoveMap en el glosario
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
