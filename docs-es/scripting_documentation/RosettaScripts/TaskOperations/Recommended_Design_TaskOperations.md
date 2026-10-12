# TaskOperations recomendadas para diseño
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## TaskOperations recomendadas para diseño

Al diseñar, hay ciertas TaskOperations recomendadas que normalmente querrás usar. La tabla siguiente reúne consejos de diseñadores con experiencia sobre qué TaskOperations incluir por defecto y por qué conviene asegurarse de incluirlas.

| TaskOperation y persona que la recomienda (nombre(s) y correo(s) del diseñador) | Mejores opciones | Motivos para incluir esta TaskOperation y salvedades |
| ---- | ---- | --------------------------- |
| [[ExtraRotamersGeneric|ExtraRotamersGenericOperation]], recomendada por Vikram K. Mulligan (vmullig@uw.edu) y Chris Bahl (cdbahl@uw.edu) | **ex1="true"** **ex2="true"** | El conjunto predeterminado de rotámeros que se considera para cada residuo diseñable a menudo no es perfecto para el diseño. Con frecuencia querrás rotámeros que se desvíen ligeramente de los que considera el packer. Las opciones **ex1** y **ex2** permiten especificar que, para cada rotámero, se añadan muestras adicionales de chi1 y chi2. Por ejemplo, el muestreo predeterminado de la leucina considera tres valores de chi1 y tres de chi2 (aproximadamente -60, 60 y 180 grados para cada uno), lo que da un total combinatorio de 9 rotámeros por residuo de leucina. Las opciones **ex1** y **ex2** añaden muestras adicionales a cada lado de las existentes, con lo que el número de rotámeros en el caso de la leucina pasa a 81 y quizá permite encontrar configuraciones adicionales bien empaquetadas. Ten en cuenta, sin embargo, que activar rotámeros adicionales aumenta el costo computacional de una ejecución del packer, tanto en memoria como en tiempo de cómputo, porque hay que evaluar muchas más combinaciones de rotámeros. Por eso, en las tareas de diseño más grandes puede convenir omitir esta TaskOperation, pero si el tiempo de cómputo lo permite, debería incluirse. |
| [[LimitAromaChi2|LimitAromaChi2Operation]], recomendada por Chris Bahl (cdbahl@uw.edu) | **include_trp="True"** | Impide ángulos chi2 poco realistas en las cadenas laterales de los aminoácidos aromáticos. (Nota: por ahora no se ha probado con diseño no canónico, pero se recomienda para diseño canónico.) |
| [[IncludeCurrent|IncludeCurrentOperation]], recomendada por Chris Bahl (cdbahl@uw.edu) |  | No descartes los rotámeros del modelo de entrada. Normalmente, este es el comportamiento que se desea. |
| [[ConsensusLoopDesign|ConsensusLoopDesignOperation]], recomendada por Chris Bahl (cdbahl@uw.edu) | **include_adjacent_residues="True"** | Restringe las identidades de aminoácidos en los loops según los intervalos de torsión ABEGO de los residuos del loop y los perfiles de secuencia comunes de proteínas nativas para loops con los mismos intervalos ABEGO. (Nota: esto llama a DSSP para identificar los loops, lo cual no funcionará con estructuras secundarias no canónicas. Tampoco impedirá que se añadan tipos de residuo no canónicos; es decir, está pensado principalmente para diseño canónico.) |
| | `-nblist_autoupdate` | |


## Véase también
* La TaskOperation [[ExtraRotamersGeneric|ExtraRotamersGenericOperation]].
* Las opciones de rotámeros extra en la página de [[sintaxis y convenciones de los resfiles|resfiles]].
