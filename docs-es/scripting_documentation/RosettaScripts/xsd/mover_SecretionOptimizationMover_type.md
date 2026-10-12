<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Este es el SecretionOptimizationMover, también llamado el Degreaser (desengrasador). Usa un modelo de Hessa et al. 2007 para identificar regiones con bajo potencial de inserción transmembrana (dG_ins,pred, o simplemente dG en este Mover) y rediseñarlas para eliminarlas manteniendo la estabilidad estructural cerca del sitio de la mutación. Este Mover es semiexhaustivo y permite al usuario fijar parámetros como cuánto cambio de dG_ins,pred es necesario o cuánta diferencia de puntuación es tolerable. Con todas las opciones por defecto, se hace un máximo de tres mutaciones en una Pose, en la región con el dG_ins,pred inicial más bajo, de modo que el cambio de dG_ins,pred sea el mayor. Otras opciones permiten un uso más complejo de este Mover. Consulta el preprint con resultados experimentales disponible en https://www.biorxiv.org/content/10.1101/2022.08.04.502842v1

```xml
<SecretionOptimizationMover name="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)"
        max_mutations="(3 &non_negative_integer;)"
        aas_allowed="(DEKRQN &string;)" chain_to_degrease="(A &string;)"
        dG_ins_threshold="(2.7 &real;)" dG_tolerance="(0.27 &real;)"
        score_tolerance="(0 &real;)" dump_multis="(false &bool;)"
        dump_singles="(false &bool;)" dump_dir="(. &string;)"
        repack_shell="(8.0 &real;)" largest_ddg="(true &bool;)"
        smallest_dscore="(false &bool;)" scorefxn="(&string;)" />
```

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **max_mutations**: número máximo de mutantes puntuales que se introducen en cada región transmembrana. Debería tomar los X mutantes con mayor efecto en ddG_ins.
-   **aas_allowed**: especificación de aminoácidos de una letra (sin delimitadores) para los residuos permitidos
-   **chain_to_degrease**: cadena de un solo carácter que se desengrasa; por defecto, la cadena A
-   **dG_ins_threshold**: Qué cuenta como región transmembrana. +2.7 parece alto, pero algunas de estas regiones problemáticas tienen un dG_ins mayor que 2.0. El valor 2.7 se determinó de forma más o menos empírica.
-   **dG_tolerance**: cuánto efecto necesita tener un mutante concreto. El valor 0.27 se determinó como una especie de compromiso razonable.
-   **score_tolerance**: cuánto puede cambiar la puntuación total de la Pose por una mutación. En realidad, descubrí que muchas MEJORAN la puntuación de las Poses, así que ahora está en 0. +1.0 solo me dio un 20 % más de resultados y +3.0 solo un 40 %. También puede depender de tu aplicación. Ponlo muy alto para obtener tantas salidas como sea posible. +45 REU parece tolerable para el diseño de proteínas de unión.
-   **dump_multis**: si quieres los PDB de cada uno de los mutantes combinados, ponlo en true. Escribe directamente en disco, así que evítalo si ejecutas trabajos paralelos grandes.
-   **dump_singles**: si quieres cada uno de los mutantes puntuales intermedios, ponlo en true. Escribe directamente en disco, así que evítalo si ejecutas trabajos paralelos grandes.
-   **dump_dir**: directorio donde se vuelcan los PDB. Por defecto es el lugar desde el que ejecutas el script (¿quizá no sea buena idea?)
-   **repack_shell**: distancia alrededor de los residuos diseñables en la que se reempaqueta. 8.0 parece una distancia estándar.
-   **largest_ddg**: genera la Pose con el mayor ddG_ins; activado por defecto
-   **smallest_dscore**: genera la Pose con la menor puntuación; desactivado por defecto
-   **scorefxn**: Nombre de la función de puntuación a usar

---
