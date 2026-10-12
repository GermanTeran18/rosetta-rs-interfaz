# RestrictToInterfaceVector
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## RestrictToInterfaceVector

Restringe la tarea a los residuos definidos como interfaz por core/pack/task/operation/util/interface\_vector\_calculate.cc, que calcula los residuos en una interfaz entre dos cadenas de proteína o un salto. El cálculo se hace de la forma siguiente. Primero se usa el grafo de puntos para encontrar todos los residuos dentro de un umbral grande (CB\_dist\_cutoff) de residuos de la otra cadena. Para estos residuos cercanos a la interfaz se usan dos métricas para decidir si realmente pueden ser residuos de interfaz. La primera métrica consiste en iterar por todos los átomos de cadena lateral del residuo de interés y comprobar si su distancia es menor que el umbral de átomos cercanos (nearby\_atom\_cutoff); si es así, es un residuo de interfaz. Si un residuo no pasa esa comprobación, se trazan dos vectores: un vector CA-CB y un vector de CB a un átomo CB de la cadena vecina. Luego se halla el producto escalar entre estos dos vectores y, si el ángulo entre ellos (vector\_angle\_cutoff) es menor que cierto umbral, se clasifican como interfaz. El vector no puede ser más largo que otra distancia (vector\_dist\_cutoff).

Hay dos formas de usar esta tarea; la primera es usar saltos:

```xml
  <RestrictToInterfaceVector name="(& string)" jump="(1 & int,int,int... )" CB_dist_cutoff="(10.0 & Real)" nearby_atom_cutoff="(5.5 & Real)" vector_angle_cutoff="(75.0 & Real)" vector_dist_cutoff="(9.0 & Real)"/>
```

-   jump - toma una lista de saltos separados por comas entre los que buscar la interfaz; encontrará la interfaz a través de todos los saltos definidos

O bien puedes usar cadenas:

```xml
  <RestrictToInterfaceVector name="(& string)" chain1_num="(1 & int)" chain2_num="(2 & int)" CB_dist_cutoff="(10.0 & Real)" nearby_atom_cutoff="(5.5 & Real)" vector_angle_cutoff="(75.0 & Real)" vector_dist_cutoff="(9.0 & Real)"/>
```

-   chain1\_num - número de cadena de la cadena a un lado de la interfaz. Opcionalmente acepta una lista de números de cadena separados por comas.
-   chain2\_num - cadena al otro lado de la interfaz respecto de chain1. Opcionalmente acepta una lista de números de cadena separados por comas.

Tags comunes (véanse las descripciones anteriores):

-   CB\_dist\_cutoff - distancia; conviene mantenerla entre 8.0 y 15.0
-   nearby\_atom\_cutoff - distancia; debe estar entre 4.0 y 8.0
-   vector\_angle\_cutoff - ángulo en grados; debe estar entre 60 y 90
-   vector\_dist\_cutoff - distancia; debe estar entre 7.0 y 12.0

Ten en cuenta que si especificas una lista de números de cadena en las opciones chain1\_num y chain2\_num, la interfaz se calculará entre los dos conjuntos. En otras palabras, si chain1\_num=1,2 y chain2\_num=3,4, la interfaz se calculará entre las cadenas 1 y 3, 1 y 4, 2 y 3, y 2 y 4. La interfaz entre las cadenas 1 y 2 y entre la 3 y la 4 no se calculará.


##Véase también

* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
