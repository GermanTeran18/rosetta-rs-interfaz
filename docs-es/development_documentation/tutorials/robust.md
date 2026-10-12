#Cómo hacer que Rosetta sea robusto frente a PDB mal formados

Autor: Steven Lewis (smlewi@gmail.com)

Este documento fue escrito originalmente el 6 de abril de 2010 por Steven Lewis. Su última actualización fue el 23 de marzo de 2013, por Steven Lewis.

Cuando esto se probó en febrero de 2016, durante el esfuerzo de reescribir el lector de PDB, se vio que la mayoría de estos trucos ya no eran suficientes.

Propósito
===========================================

El lector de PDB de Rosetta es frágil. Hay muchos PDB que Rosetta no puede leer (varios miles fallan al leerse) y muchos más que no se pueden puntuar por alguna razón. Por desgracia, estos PDB defectuosos suelen hacer que Rosetta se bloquee en lugar de terminar con elegancia. Este documento describe cómo "robustecer" Rosetta para que no se bloquee al encontrar un PDB defectuoso.

¿Cuándo lo usaría?
====================

Quizá quieras robustecer Rosetta si vas a hacer un experimento con nstruct pequeño y -l grande. En mi caso, ejecuté con -nstruct 1 contra literalmente todo el PDB, una vez en 2010 (?) y otra en 2012.

¿Por qué no vienen configurados por defecto?
====================================

Los cambios que hay que hacer causan una pérdida de rendimiento significativa en Rosetta (en particular el cambio de vectorL). No deberían dejarse activados por defecto. Una mejor pregunta es por qué nadie mejora el lector de PDB para que capture estos errores con más elegancia. La respuesta es: ¿por qué no lo haces tú y dejas obsoleta esta página?

Vale, me has convencido, ¿cómo lo hago?
====================================

NECESITAS hacer algunos cambios:

-   ejecuta tu código con jd2
-   sustituye todas las instrucciones assert() de utility/vectorL por instrucciones runtime\_assert. Esto hace que los errores de fuera de límites en la clase vector1, el caballo de batalla de Rosetta, se capturen en el assert en lugar de provocar un fallo de segmentación. También podrías compilar en modo debug, o dejar las instrucciones NDEBUG en el modo release. Lo importante es que la comprobación de límites debe estar activada. (Esto es lo que causa la pérdida de rendimiento)
-   (NOTA: ¡se vio que esto no era necesario en noviembre de 2012!) sustituye todos los assert() de la clase Conformation por runtime\_assert, o su equivalente.

Esta combinación de cambios hará que los desbordamientos de vectores lancen excepciones dentro de runtime\_assert, en lugar de bloquearse o causar fallos de segmentación. jd2 capturará las excepciones y tratará el PDB fallido como un trabajo fallido, imprimirá un mensaje de error y pasará limpiamente al siguiente PDB de tu lista.

Hay otros cambios sugeridos:

-   pasa la opción

    ```
    -in:file:obey_ENDMDL 
    ```

    Esto hace que el lector de PDB deje de leer los PDB multimodelo derivados de RMN después del primer modelo.


-   Ignorar los residuos no reconocidos con

    ```
    -ignore_unrecognized_res 
    ```

    es una buena opción para evitar que un ligando bloquee el lector de PDB.

¿Cuántos PDB están mal?
======================

A mediados de noviembre de 2012, el PDB contenía 86008 PDB. De estos, 6460 bloquean el lector de PDB. Otros 40 se bloquearon por runtime\_asserts de vector1, y 6 por contener solo cadenas de un único residuo, en algún lugar del ejecutable AnchorFinder. (Estos 46 podrían no estar mal formados de forma universal, según lo que AnchorFinder haga de manera distinta a tu aplicación).

##Véase también

* [[Running Rosetta with options]]
* [[Guías para entradas que no son proteínas|non-protein-residues]]: notas sobre cómo trabajar con [[aminoácidos no canónicos|Noncanonical Amino Acids]], [[metales|Metals]], [[carbohidratos|Carbohydrates]], _etc._
* [[Opciones en Rosetta|options-overview]]
* [[How to turn on residue types that are off by default]]
* [[Archivos params|Residue Params file]]: notas para añadir nuevos tipos de residuo que todavía no están en la base de datos de Rosetta.
* [[Preparación de estructuras para Rosetta|preparing-structures]]
