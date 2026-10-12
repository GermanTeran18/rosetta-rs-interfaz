#Archivo de restricciones

Metadatos
========

Este documento fue editado por Colin Smith el 4/12/2008. Yi Liu creó la página inicial. Gracias a Oliver y Firas por aportar información.  Última edición de Steven Lewis el 30 de agosto de 2016.

[[_TOC_]]

Descripción general
========

Las restricciones (constraints) de Rosetta son adiciones a la función de puntuación. (Corresponden a los «restraints» de otros programas.) Se usan para puntuar características geométricas y de otro tipo de la estructura que los términos de energía estándar pueden no evaluar. Por ejemplo, añadir un sesgo de puntuación basado en conocimiento experimental.

Cada restricción consta de dos partes: A) lo que se mide y B) cómo ese valor medido se transforma en una bonificación o penalización de puntuación. Estas dos partes pueden combinarse libremente para obtener el comportamiento deseado.

Para que Rosetta reconozca correctamente las restricciones, deben ocurrir dos cosas. Primero, las restricciones mismas deben aplicarse a la Pose (estructura). La forma de hacerlo depende algo del protocolo, pero casi siempre consiste en una opción o parámetro que especifica qué archivo contiene la especificación de la restricción. (El formato de este archivo se describe más abajo.) Por ejemplo, añadiéndolo en tu script xml mediante el [[ ConstraintSetMover|ConstraintSetMover]].

El segundo requisito es que la función de puntuación utilizada tenga un peso distinto de cero para el término de energía de restricción adecuado. El término concreto depende del tipo de restricción que se use. El valor de la penalización o bonificación consiste en la suma de las puntuaciones brutas de las restricciones (a partir del valor medido y de la función de transformación especificada de todas las restricciones) multiplicada por el peso del término de energía adecuado en la función de puntuación. Muchos protocolos que usan restricciones activarán los pesos de las restricciones por ti, pero otros requerirán que especifiques un archivo de pesos de la función de puntuación que tenga términos de restricción distintos de cero.

Formatos de archivo
============

Las restricciones pueden especificarse en un archivo de restricciones basado en líneas con este formato:

```
Constraint_Type1 Constraint_Def1
Constraint_Type2 Constraint_Def2
...
```

En general, el Constraint\_Type contendrá un tipo, que define qué clase de valor se va a restringir (distancia, ángulo, diedro, etc.), y una serie de etiquetas de átomos y/o residuos que definen una cualidad específica que se va a restringir. Se supone que los números de residuo están en la numeración de Rosetta (desde 1, sin huecos), no en la numeración del PDB. Si quieres la numeración del PDB, pasa la letra de la cadena inmediatamente después del número de residuo (sin espacios): el residuo 30 de la cadena A sería "30A". No puedes pasar códigos de inserción mediante este mecanismo; necesitarás la Pose renumerada.  No todos los tipos de restricción admiten la numeración del PDB.

El Constraint\_Def definirá la función con la que se restringe la restricción, para responder a la pregunta: ¿cuál debería ser la puntuación de la restricción cuando el valor restringido tiene una desviación de X unidades?

Tipos de restricción
================

Todos los tipos de restricción se implementan como subclases de la clase core::scoring::constraints::Constraint.

Restricciones simples
------------------

Las restricciones simples restringen el valor de una única métrica

-   AtomPair: 
```
AtomPair Atom1_Name Atom1_ResNum Atom2_Name Atom2_ResNum Func_Type Func_Def
```

    <i>término de energía: atom_pair_constraint</i>

    * Restringe una distancia entre Atom1 y Atom2. AtomPairConstraint es compatible con la numeración del PDB.

-   NamedAtomPair: 
```
NamedAtomPair Atom1_Name Atom1_ResNum Atom2_Name Atom2_ResNum Func_Def
```

	<i>término de energía: atom_pair_constraint</i>

	* Restringe una distancia entre Atom1 y Atom2.
	* Los átomos en las NamedAtomPairConstraints se almacenan como nombres en lugar de números, como en AtomPairConstraint. Por tanto, si los números de átomo cambian mientras las restricciones están en la Pose, la NamedAngleConstraint seguirá restringiendo los átomos correctos, mientras que la AngleConstraint puede restringir átomos no deseados. Hay un pequeño compromiso en eficiencia computacional frente a AngleConstraint. Si sabes que los números de átomo no cambiarán mientras la restricción esté en la Pose, AngleConstraint es una mejor opción, pero si pueden cambiar, NamedAngleConstraint asegurará que se restrinjan los átomos correctos.

-   Angle: 
```
Angle Atom1_Name Atom1_ResNum Atom2_Name Atom2_ResNum Atom3_Name Atom3_ResNum Func_Type Func_Def
```

    <i>término de energía: angle_constraint</i>

    * Ángulo entre el vector Atom2-\>Atom1 y el vector Atom2-\>Atom3; el ángulo (pasado como valor a la Func) parece medirse en radianes
    * NOTA: AngleConstraint usa números de átomo para seguir internamente los átomos restringidos, por eficiencia. Si los números de átomo cambian mientras la AngleConstraint está en la Pose, la restricción podría aplicarse a los átomos equivocados. Si sabes que los números de átomo no cambiarán mientras la restricción esté en la Pose, AngleConstraint es la mejor opción, pero si pueden cambiar (p. ej., por diseño o al cambiar el conjunto de tipos de residuo), NamedAngleConstraint asegurará que se restrinjan los átomos correctos.

-   NamedAngle: 
```
NamedAngle Atom1_Name Atom1_ResNum Atom2_Name Atom2_ResNum Atom3_Name Atom3_ResNum Func_Type Func_Def
```

    <i>término de energía: angle_constraint</i>

    * Ángulo entre el vector Atom2-\>Atom1 y el vector Atom2-\>Atom3; el ángulo (pasado como valor a la Func) parece medirse en radianes
    * Los átomos en las NamedAngleConstraints se almacenan como nombres en lugar de números, como en AngleConstraint. Por tanto, si los números de átomo cambian mientras las restricciones están en la Pose, la NamedAngleConstraint seguirá restringiendo los átomos correctos, mientras que la AngleConstraint puede restringir átomos no deseados. Hay un pequeño compromiso en eficiencia computacional frente a AngleConstraint. Si sabes que los números de átomo no cambiarán mientras la restricción esté en la Pose, AngleConstraint es una mejor opción, pero si pueden cambiar, NamedAngleConstraint asegurará que se restrinjan los átomos correctos.
 
-   Dihedral: 
```
Dihedral Atom1_Name Atom1_ResNum Atom2_Name Atom2_ResNum Atom3_Name Atom3_ResNum Atom4_Name Atom4_ResNum Func_Type Func_Def
```

    <i>término de energía: dihedral_constraint</i>

    * Ángulo diedro de Atom1-\>Atom2-\>Atom3-\>Atom4. El diedro se mide en radianes en el intervalo -pi -\> pi.

-   DihedralPair: 
```
DihedralPair Atom1_Name Atom1_ResNum Atom2_Name Atom2_ResNum Atom3_Name Atom3_ResNum Atom4_Name Atom4_ResNum Atom5_Name Atom5_ResNum Atom6_Name Atom6_ResNum Atom7_Name Atom7_ResNum Atom8_Name Atom8_ResNum Func_Type Func_Def
```

	<i>término de energía: dihedral_constraint</i>

	* Restringe que los ángulos diedros definidos por Atom1-\>Atom2-\>Atom3-\>Atom4 y Atom5-\>Atom6-\>Atom7-\>Atom8 sean idénticos.

-   CoordinateConstraint: 
```
CoordinateConstraint Atom1_Name Atom1_ResNum[Atom1_ChainID] Atom2_Name Atom2_ResNum[Atom2_ChainID] Atom1_target_X_coordinate Atom1_target_Y_coordinate Atom1_target_Z_coordinate Func_Type Func_Def
```

    <i>término de energía: coordinate_constraint</i>

    * Restringe Atom1 a la posición XYZ indicada. Atom2 se usa como átomo de referencia para determinar cuándo se ha movido Atom1 (para que Rosetta sepa cuándo volver a puntuarlo): elige un átomo respecto al cual se moverá Atom1; el átomo raíz del [[FoldTree|foldtree-overview]] es una buena opción.  CoordinateConstraint es compatible con la numeración del PDB.
    * Atom_ResNum[Atom_ChainID] indica un número con una letra opcional, todo junto como un único token


-   LocalCoordinateConstraint: 
```
LocalCoordinateConstraint Atom1_Name Atom1_ResNum Atom2_Name Atom3_Name Atom4_Name Atom234_ResNum Atom1_target_X_coordinate Atom1_target_Y_coordinate Atom1_target_Z_coordinate Func_Type Func_Def
```

    <i>término de energía: coordinate_constraint</i>

    * Restringe Atom1 a la posición XYZ indicada, relativa al sistema de coordenadas definido por los átomos 2/3/4 en lugar del origen. LocalCoordinateConstraint es compatible con la numeración del PDB.

-   AmbiguousNMRDistance: 
```
AmbiguousNMRDistance Atom1_Name Atom1_ResNum Atom2_Name Atom2_ResNum Func_Type Func_Def
```

    <i>término de energía: atom_pair_constraint</i>

    * Distancia entre Atom1 y Atom2. La diferencia con AtomPairConstraint es que los nombres de átomo se analizan de forma especial para detectar hidrógenos ambiguos, que son ambiguos experimentalmente o idénticos por rotación (como los hidrógenos de un metilo). La restricción se aplica a cualquier hidrógeno equivalente al hidrógeno nombrado. La lógica para determinar qué hidrógenos son cuáles está en src/core/scoring/constraints/AmbiguousNMRDistanceConstraints.cc:parse\_NMR\_name.

-   SiteConstraint: 
```
SiteConstraint Atom1_Name Atom1_ResNum Opposing_chain Func_Type Func_Def
```

    <i>término de energía: atom_pair_constraint</i>

    * Restricción de que un residuo interactúa con alguna otra cadena. Las SiteConstraints son un conjunto de restricciones ambiguas de pares de átomos que evalúan si un residuo interactúa con alguna otra cadena o región; en términos generales, que está (o no está) en un sitio de unión. Más concretamente, si tenemos una SiteConstraint sobre un residuo concreto, esa SiteConstraint consiste en un conjunto de restricciones de distancia sobre el C-alfa de ese residuo hasta el C-alfa de todos los demás residuos de un conjunto, que normalmente son residuos específicos de otra cadena u otras cadenas. Tras evaluar cada restricción, solo se usa la restricción que da la puntuación más baja como energía de SiteConstraint de ese residuo. El átomo y el número de residuo identifican qué átomo se comprueba para interacciones con la cadena opuesta. Observa que "Constraint" aparece de forma irregular en su etiqueta.  Actualmente no se pueden establecer mediante un archivo de restricciones regiones para la SiteConstraint distintas de la cadena opuesta completa.

-   SiteConstraintResidues: 
```
SiteConstraintResidues Atom1_ResNum Atom1_Name Res2 Res3 Func_Type Func_Def
```

	<i>término de energía: atom_pair_constraint</i>

	* Restricción de que un residuo interactúa con al menos uno de otros dos residuos. El átomo y el número de residuo identifican qué átomo se comprueba para interacciones con los átomos CA de los otros residuos.

-   MinResidueAtomicDistance:
```
MinResidueAtomicDistance res1 res2 dist

```

	<i>término de energía: atom_pair_constraint</i>

	* Restricción de que al menos un átomo pesado de res1 esté a una distancia de dist o menos de al menos un átomo pesado de res2. Se implementa mediante AmbiguousConstraint (véase más abajo); se usa una función FADE para cada par de átomos.

-   BigBin: 
```
BigBin res_number bin_char sdev
```

    <i>término de energía: dihedral_constraint</i>

	* Especifica bins amplios para residuos concretos mediante una letra. 'O' requiere un ángulo omega de tipo cis (-10 a 10 grados); 'G' requiere phi y psi positivos en [ -100, 100 ]; 'E' requiere phi y psi positivos en [ 100, -90 ]; 'A' requiere phi y psi negativos en [ -50, 30 ]; 'B' requiere phi y psi negativos en [ 100, 175 ].


Restricciones anidadas
------------------

Las restricciones anidadas toman como parámetros una o más restricciones y permiten optimizar a través de varias restricciones. Normalmente en los archivos de restricciones estas se enumeran en varias líneas, con el nombre de la restricción abriendo el bloque de subrestricciones y una línea que empieza con "END" o "End" cerrando el bloque. En general, los tipos de puntuación usados por las restricciones anidadas dependen de las subrestricciones que se usen (normalmente pueden mezclarse).

-   MultiConstraint:
     ```
     MultiConstraint                
     Constraint_Type1 Constraint_Def1
     [Constraint_Type2 Constraint_Def2                
     [...]] 
     END
     ```
    * Suma de todas las restricciones especificadas

-   AmbiguousConstraint:
     ```
     AmbiguousConstraint
     Constraint_Type1 Constraint_Def1
     [Constraint_Type2 Constraint_Def2                
     [...]] 
     END
     ```
    * La más baja de todas las restricciones especificadas
    * Solo se considera la de menor energía

-   KofNConstraint:
     ```
     KofNConstraint k
     Constraint_Type1 Constraint_Def1
     [Constraint_Type2 Constraint_Def2                
     [...]] 
     END
     ```
    * El valor es la suma de las "k" restricciones de menor energía

Tipos de función
==============

Las funciones se indican como "Func\_Type Func\_Def".

-   Especializadas para ángulos:

	-   `CIRCULARHARMONIC  x0 sd       `

	    [[/images/form_1.png]]

	-   `PERIODICBOUNDED period lb ub sd rswitch tag  `
	    * Nota: Establecer `rswitch` en cualquier valor distinto de 0.5 creará una discontinuidad en la derivada. `rswitch` y `tag` no deben tratarse como opcionales.

	     Una restricción BOUNDED tras proyectar el valor medido al intervalo de -period/2 a +period/2. Útil para medidas angulares centradas en cero.

	-   `OFFSETPERIODICBOUNDED offset period lb ub sd rswitch tag  `

	    Una restricción BOUNDED, donde el valor medido es (x - offset) proyectado al intervalo de -period/2 a +period/2. Útil para medidas angulares. (Ten en cuenta que lb y ub se interpretan tras la resta, por lo que el verdadero intervalo de restricción cero va de lb+offfset a ub+offset.)

	-   `AMBERPERIODIC x0 n_period k`
	
	    Una función AMBERPERIODIC es una función coseno del ángulo x, con un máximo en x0 y una periodicidad de n_period.  La amplitud es k y el valor mínimo es 0:
		-	f(x) = k * (1 + cos( ( n_period * x ) - x0 ) )

	-   `CHARMMPERIODIC x0 n_period k`

	    Una función CHARMMPERIODIC penaliza las desviaciones respecto al ángulo x0 con valores de 0 a k, con n_period periodos:
		-	f(x) = 0.5 * k * (1 - cos( n_period * ( x - x0 ) ) )

	-   `CIRCULARSIGMOIDAL xC m o1 o2`

	    Una función CIRCULARSIGMOIDAL penaliza las desviaciones x0 respecto a los ángulos o1 y/o o2 con valores de 0 a 1, con n_period periodos:

		-	f(x) = 1/(1+ M_E ^ (-m*(x0-o1))) - 1/(1+M_E^(-m*(x0-o2)))

	-   `CIRCULARSPLINE weight [36 energy values]`

	    Una función CIRCULARSPLINE configura una spline cúbica periódica entrenada con los valores de energía proporcionados, que representan los centros de treinta y seis bins de 10 grados

-   `HARMONIC  x0 sd`

    [[/images/form_0.png]]

-   `FLAT_HARMONIC  x0  sd  tol`

    Cero en el intervalo de `x0 - tol` a `x0 + tol`. Armónica con parámetro de anchura sd fuera de ese intervalo. Básicamente, un potencial HARMONIC _(véase arriba)_ dividido en x0 con una región de longitud 2*tol de ceros insertada.

-   ` BOUNDED lb ub sd rswitch tag`
    * Nota: Establecer `rswitch` en cualquier valor distinto de 0.5 creará una discontinuidad en la derivada. (Si `tag` no es numérico, `rswitch` puede omitirse y tomará por defecto 0.5.) `tag` NO es opcional. 

    [[/images/form_2.png]]

-   `GAUSSIANFUNC mean sd tag WEIGHT weight`
    * Nota: `tag` NO es opcional, como en BoundFunc/BOUNDED. Si `tag` = NOLOG, se activa un comportamiento no documentado que implica un logaritmo de algún tipo.
    * Nota: La cadena "WEIGHT" seguida de un valor es opcional al final.  Si se proporciona, escala la función gaussiana por un multiplicador constante.  (Por ejemplo, WEIGHT 2.5 escala la función por un factor de 2.5).

    [[/images/form_3.png]]

-   `SOGFUNC  n_funcs [mean1 sdev1 weight1 [mean2 sdev2 weight2 [...]]]       `

    [[/images/form_4.png]]

-   `MIXTUREFUNC  anchor gaussian_param exp_param mixture_param bg_mean bg_sd       `
     * parámetros: que representan la media de h(r), que representan la desviación estándar de h(r)

-   `CONSTANTFUNC  return_val       `

    [[/images/form_5.png]]

-   `IDENTITY`

    - f(x) = x

-   `SCALARWEIGHTEDFUNC  weight Func_Type Func_Def       `

    [[/images/form_6.png]]

-   `SUMFUNC  n_funcs Func_Type1 Func_Def1 [Func_Type2 Func_Def2 [...]]       `

    [[/images/form_7.png]]

-   `SPLINE description histogram_file_path experimental_value weight bin_size`

    o, si se establece la opción `-constraints:epr_distance`:
    
    `SPLINE description experimental_value weight bin_size`

    o, si se desea proporcionar una definición de spline en una sola línea en un archivo de restricciones:

    `SPLINE description NONE experimental_value weight bin_size x_axis <val1> ... <valN> y_axis <val1> ... <valN>`

    En la primera forma, esta función lee un archivo de histograma y crea sobre él una spline cúbica usando el SplineGenerator de Rosetta. Debe especificarse la ruta completa al archivo. La forma básica del archivo de histograma es un archivo *SEPARADO POR TABULADORES* con el siguiente formato:

        x_axis  -1.750  -1.250  -0.750  -0.250  0.250   0.750   1.250   1.750 
        y_axis  0.000   -0.500  -1.000  -2.000  -1.500  -0.500  -0.250  0.000

    Los valores de la línea `x_axis` deben estar en orden ascendente, y se supone que los valores corresponden al centro del bin del histograma y que todas las anchuras de bin son iguales a la especificada en el archivo de restricciones. (En la práctica, el ajuste bin_size solo se usa para los bins de los extremos.) Se supone que los valores vuelven a la línea base en el borde del intervalo de x_axis dado, y que todos los valores de y_axis fuera del intervalo son cero.

    Si el parámetro `description` es `EPR_DISTANCE`, la transformación funcional de la medida *x* es `weight * S(experimental_value - x)`; en caso contrario, la transformación funcional es `weight * S(x)` y `experimental_value` se ignora.

    En la segunda forma, si se da la opción `-constraints:epr_distance` en la línea de comandos, debe omitirse `histogram_file_path` y el potencial basado en conocimiento RosettaEPR se leerá de un archivo de la base de datos de Rosetta. (Véanse Hirst *et al.* (2011) J. Struct Biol. 173:506 y Alexander *et al.* (2013) PLoS One e72851 para los detalles de este potencial.) Véase más abajo un ejemplo de uso con el potencial basado en conocimiento EPR.

    En la tercera forma, si la opción `-constraints:epr_distance` _no_ se usa pero se sustituye `histogram_file_path` por `NONE`, la definición de la spline debe proporcionarse en la misma línea.  _Debe_ incluir `x_axis` seguido de una serie de valores, y `y_axis` seguido de una serie de valores.  Opcionalmente, _puede_ incluir `lb_function <cutoff> <slope> <intercept>` para definir una función lineal para la curva más allá del límite inferior, y `ub_function <cutoff> <slope> <intercept>` para definir una función lineal más allá del límite superior.

-   `FADE  lb ub d wd [ wo ]       `
    * Esto pretende ser básicamente una bonificación suavizada de «pozo cuadrado» de `        wd       ` entre los límites `        lb       ` y `        ub       ` . Se puede añadir a toda la función un desplazamiento opcional `        wo       ` (por defecto 0); esto es útil si quieres que la función sea cero en el «rango dorado» y que dé una penalización en el resto (p. ej., especifica wd de -20 y wo de +20). Para asegurar que la función y su derivada sean continuas, la función se conecta mediante splines cúbicas en las regiones de borde, en franjas de anchura d, entre `        lb       ` y `        lb+d       ` y entre `        ub-d       ` y `        ub       ` :

    [[/images/form_8.png]]

-   `SIGMOID  x0 m       ` 
    * Dos argumentos; x0 es el centro de la función sigmoide y m es su pendiente. Tiene un mínimo/máximo fijos de 0.5. La forma funcional es (1/(1+exp(-m\*( x-x0 ))) - 0.5.

-   `SQUARE_WELL x0 depth`

    - f(x) = 0      para x >= x0
    - f(x) = depth  para x < x0

    
-   `SQUARE_WELL2 x0 width depth [DEGREES]`

    Para medidas angulares. Se supone que los parámetros están en radianes salvo que esté presente la etiqueta opcional DEGREES

    - f(x) = 0 para (x0-width) < x < (x0+width)
    - f(x) = depth para x <= (x0-width) y x >= (x0+width)

-   `LINEAR_PENALTY x0 depth width slope`

    - f(x) = depth para (x0-width) <= x <= (x0+width)
    - f(x) = depth + slope * (abs(x-x0) - width) para abs(x-x0) > width

    (Actualmente tiene un error en los cálculos de minimización.)

-   `KARPLUS A B C D x0 sd`

    - f(x) = ((A*cos(x + D)^2 + B*cos(x + D) + C - x0)/sd)^2

-   `SOEDINGFUNC w1 mean1 sd1 w2 mean2 sd2`

    - f(x) = ln( w1*Gauss(x,mean1,sd1) + w2*Gauss(x,mean2,sd2) ) - ln( w2*Gauss(x,mean2,sd2) )

    donde Gauss(x,mean,sd) es el valor de la distribución normal en x, dadas la media y la desviación estándar

-   `TOPOUT weight x0 limit`

     Armónica cerca de x0, plana más allá de limit

     - f(x) = weight * limit^2 * ( 1 - e^( -(x-x0)^2/limit^2  ) )

-   `ETABLE min max [many numbers]`

	Define una función mediante valores que van de min a max, inclusive, separados por 0.1.
Interpolación lineal para los valores intermedios.

-   `USOG num_gaussians mean1 sd1 mean2 sd2...`

Define una suma sin ponderar de un número dado de gaussianas

-   `SOG num_gaussians mean1 sd1 weight1 mean2 sd2 weight2...`

Define una suma ponderada de un número dado de gaussianas

Todos los tipos de función se implementan como subclases de la clase core::scoring::constraints::Func.

Archivos de ejemplo
============

```
AtomPair CZ 20 CA 6 GAUSSIANFUNC 5.54 2.0 TAG
AtomPair CZ 20 CA 54 GAUSSIANFUNC 5.27 2.0 TAG
AtomPair CZ 20 CA 50 GAUSSIANFUNC 5.26 2.0 TAG
AtomPair CZ 20 CA 10 GAUSSIANFUNC 4.81 2.0 STILL_TAG
AtomPair CZ 20 CA 41 GAUSSIANFUNC 9.90 2.0 I_AM_ANNOYED_BY_THIS_TAG_FIELD
```

```
AtomPair SG 5 V1 32 HARMONIC 0.0 0.2
Angle CB 5 SG 5 ZN 32 HARMONIC 1.95 0.35
AtomPair SG 8 V2 32 HARMONIC 0.0 0.2
Angle CB 8 SG 8 ZN 32 HARMONIC 1.95 0.35
AtomPair NE2 13 V3 32 HARMONIC 0.0 0.2
Angle CD2 13 NE2 13 ZN 32 HARMONIC 2.09 0.35
Dihedral CG 13 CD2 13 NE2 13 ZN 32 CIRCULARHARMONIC 3.14 0.35
AtomPair SG 18 V4 32 HARMONIC 0.0 0.2
Angle CB 18 SG 18 ZN 32 HARMONIC 1.95 0.35
```

```
#discourages residue 16, chain B, from interacting with chain A; encourages residue 47
SiteConstraint CA 16B A SIGMOID 5.0 -2.0
SiteConstraint CA 47B A SIGMOID 5.0 2.0
```

```
AtomPair H  6 HA 134 BOUNDED  1.80 5.25 0.50 NOE ;dist 5.000 1.800
AtomPair HA 7 HA 132 HARMONIC 1.2 0.2
```

```
AtomPair CB 31 CB 43 SPLINE EPR_DISTANCE  6.0 4.0 0.5
AtomPair CB 29 CB 62 SPLINE EPR_DISTANCE 15.0 4.0 0.5
```

Código para leer restricciones
============================

Hay distintos conjuntos de funciones para leer restricciones de todos los átomos y de no todos los átomos, como indican las funciones respectivas que se enumeran a continuación. La única diferencia actual entre las funciones es qué argumentos de línea de comandos se leen. Los valores de los argumentos se procesan de forma idéntica.

Para usar restricciones, deben actualizarse tanto la función de puntuación como los objetos Pose. Las funciones para añadir restricciones a la función de puntuación son:

-   core::scoring::constraints::add\_fa\_constraints\_from\_cmdline\_to\_scorefxn()
-   core::scoring::constraints::add\_constraints\_from\_cmdline\_to\_scorefxn()

Actualmente estas funciones solo fijan los pesos de los términos de la función de puntuación atom\_pair\_constraint, angle\_constraint y dihedral\_constraint al valor del argumento de línea de comandos -constraints:cst\_fa\_weight o -constraints:cst\_weight.

Las funciones para añadir restricciones al objeto Pose son:

-   core::scoring::constraints::add\_fa\_constraints\_from\_cmdline\_to\_pose()
-   core::scoring::constraints::add\_constraints\_from\_cmdline\_to\_pose()

Estas funciones leen un archivo de restricciones aleatorio de la lista definida por el argumento -constraints:cst\_fa\_file o -constraints:cst\_file.

También hay funciones de conveniencia para hacer ambas cosas a la vez:

-   core::scoring::constraints::add\_fa\_constraints\_from\_cmdline()
-   core::scoring::constraints::add\_constraints\_from\_cmdline()

Otros tipos de restricción
======================

Actualmente estos tipos de restricción no pueden especificarse en un archivo. Necesitan tener implementados métodos read\_def y añadirse al constructor de ConstraintFactory.

-   BackboneStub
-   Constant
-   ResidueType
-   Rotamer

Otros tipos de función
====================

Actualmente estos tipos de función no pueden especificarse en un archivo. Necesitan tener implementados métodos read\_data y añadirse al constructor de FuncFactory.

-   ChainbreakDist
-   CharmmPeriodic
-   CircularPower
-   Etable
-   CB\_Angle
-   CBSG\_Dihedral
-   SG\_Dist
-   SGSG\_Dihedral
-   LK\_Sigmoidal

##Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Archivos de restricciones de matching|match-cstfile-format]]: Formato de archivo de restricciones de matching de Rosetta (específicamente para la aplicación match)
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

<!--- Gollum search optimization keywords
constraint file
constraint file
constraint file
cst file
cst file
cst file
restraint file
restraint file
restraint file
restraint file
restraint file
restraint file
restraint file
restraint file
restraint file
--->
