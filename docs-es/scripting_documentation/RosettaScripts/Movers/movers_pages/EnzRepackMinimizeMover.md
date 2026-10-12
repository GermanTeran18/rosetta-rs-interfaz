# EnzRepackMinimize
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## EnzRepackMinimize

EnzRepackMinimize, similar en espíritu a [[RepackMinimizeMover]], realiza el diseño/reempaquetado seguido de la minimización de una interfaz proteína-ligando (o de un modelo de estado de transición, TS) con restricciones al estilo del diseño de enzimas (si existen; véase [[AddOrRemoveMatchCstsMover]]), usando las funciones de puntuación y los grados de libertad de minimización especificados. Con las etiquetas adecuadas, puede hacerse solo el diseño/reempaquetado o solo la minimización. Se reempaqueta, diseña y/o minimiza una capa de residuos alrededor del ligando. Si se especifica la optimización con restricciones o cst\_opt, los vecinos del ligando se convierten en Ala, se realiza la minimización y se vuelven a colocar las cadenas laterales vecinas originales.

```xml
<EnzRepackMinimize name="&string" scorefxn_repack="(score12 &string)" scorefxn_minimize="(score12 &string)" cst_opt="(0 &bool)" design="(0 &bool)" repack_only="(0 &bool)" fix_catalytic="(0 &bool)" minimize_rb="(1 &bool)" rb_min_jumps="('' &comma-delimited list of jumps)" minimize_bb="(0 &bool)" minimize_sc="(1 &bool)" minimize_lig="(0 & bool)" min_in_stages="(0 &bool)" backrub="(0 &bool)" cycles="(1 &integer)" task_operations="(comma separated string list)"/>
```

-   scorefxn\_repack: función de puntuación que se usa para el reempaquetado/diseño (definida en la sección SCOREFXNS; valor predeterminado=score12)
-   scorefxn\_minimize: igualmente, función de puntuación que se usa para la minimización (valor predeterminado=score12)
-   cst\_opt: realiza la minimización de las restricciones de enzdes con una función de puntuación reducida y sobre un fondo de polialanina. (valor predeterminado= 0)
-   design: optimiza la secuencia de los residuos situados espacialmente alrededor del ligando (la detección de vecinos debe especificarse en el archivo de opciones o en el resfile; valor predeterminado=0)
-   repack\_only: si es true, solo reempaqueta cadenas laterales sin cambiar la secuencia. (valor predeterminado =0) Si design y repack\_only son ambos false, no reempaqueta en absoluto y solo minimiza.
-   minimize\_bb: minimiza la conformación de la cadena principal de los segmentos de la cadena principal que rodean al ligando (se eligen automáticamente segmentos vecinos contiguos de \>3 residuos; valor predeterminado=0)
-   minimize\_sc: minimiza las cadenas laterales (valor predeterminado=1)
-   minimize\_rb: minimiza la orientación de cuerpo rígido del ligando (valor predeterminado=1)
-   rb\_min\_jumps: especifica qué saltos se minimizan. Si se especifica, tiene prioridad sobre minimize\_rb anterior. Es útil si hay más de un ligando en el sistema y solo quieres optimizar uno de ellos; p. ej., rb\_min\_jumps=1,2 minimizaría solo a través de los saltos 1 y 2.
-   minimize\_lig: minimiza los grados de libertad de torsión internos del ligando (la desviación permitida debe especificarse con una opción; valor predeterminado =0)
-   min\_in\_stages: primero minimiza los grados de libertad que no son de la cadena principal, luego solo los de la cadena principal y después todos juntos (valor predeterminado=0)
-   fix\_catalytic: fija los residuos catalíticos durante el reempaquetado/minimización (valor predeterminado =0)
-   cycles: número de ciclos de reempaquetado-minimización (valor predeterminado=1 ciclo) (Nota: a diferencia de la aplicación enzyme\_design, todos los ciclos usan la función de puntuación proporcionada.)
-   backrub: usa backrub para minimizar (valor predeterminado=0).
-   task\_operations: lista de operaciones de tarea que definen los residuos empaquetables/diseñables, así como los minimizables (los residuos minimizables serán los residuos empaquetables más los residuos circundantes que se necesiten para permitir una minimización eficiente). Si se indican task\_operations explícitas, las opciones design/repack\_only no las cambiarán. (Por lo tanto, es posible que se produzca diseño con la opción repack\_only activada.) -- Si no se indican task\_operations, se usará la tarea predeterminada de enzyme\_design (controlada por la línea de comandos). Ten en cuenta que las opciones predeterminadas diseñan todo y no detectan interfaces, por lo que se recomienda ser explícito con las opciones.


##Véase también

* [[Formato del archivo de restricciones de match|match-cstfile-format]]
* [[AddOrRemoveMatchCstsMover]]
* [[Match]]: la aplicación de línea de comandos match
