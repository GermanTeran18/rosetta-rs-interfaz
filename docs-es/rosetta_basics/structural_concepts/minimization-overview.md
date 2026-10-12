#Descripción general y conceptos de la minimización

Metadatos
========
Este documento fue escrito el 3 de octubre de 2007 por Ian W. Davis y fue actualizado por última vez el 22 de diciembre de 2015 por Vikram K. Mulligan.

La información fue proporcionada por Jim Havranek.

Puedes encontrar un tutorial introductorio sobre la minimización [aquí](https://www.rosettacommons.org/demos/latest/tutorials/minimization/minimization).

El código relevante está en core::optimization, especialmente la clase core::optimization::Minimizer. 

Variantes de la minimización en Rosetta
==================================

Todos los algoritmos de minimización eligen un vector como dirección de descenso, determinan un paso a lo largo de ese vector, y luego eligen una nueva dirección y repiten. Las distintas maneras de hacer esas cosas dan lugar a diferentes eficiencias, en términos de evaluaciones de la función y de memoria.

«linmin» es un algoritmo de descenso más pronunciado (steepest descent) de **un solo paso** con una búsqueda de línea exacta. Es decir, la dirección de descenso es el gradiente de la función de energía (vector de derivadas parciales primeras), y el paso llega hasta el verdadero mínimo (local) de la función a lo largo de esa línea.

Las invocaciones repetidas de linmin generalmente convergen muy lentamente en comparación con los métodos que aproximan la matriz de segundas derivadas (Hessiana), descritos más abajo.  Por esta razón, no se recomienda la invocación iterada de linmin para ejecuciones de producción.  Sin embargo, para fines de benchmark o de prueba, «linmin_iterated» invoca linmin repetidamente, recalculando el vector gradiente tras cada búsqueda de línea.  Por lo tanto, es un algoritmo de descenso más pronunciado relativamente puro, y puede servir de alternativa en casos en que las aproximaciones de la Hessiana funcionan mal.  El algoritmo «linmin_iterated» solo necesita llamarse una vez e iterará internamente.

La minimización por gradiente conjugado acumula una pequeña cantidad de información de los pasos anteriores, modificando la dirección de búsqueda para rendir (algo) mejor que un algoritmo de descenso más pronunciado puro. Rosetta++ incluía una implementación de FRPR (Fletcher-Reeves-Polak-Ribiere), pero no se ha portado a Rosetta3 porque nadie la usaba.

Los métodos cuasi-Newton acumulan más información de muchas iteraciones del gradiente de la función de energía para aproximar la matriz de segundas derivadas (Hessiana) (o, con más precisión, su inversa). Esta información se usa para modificar la dirección de descenso (tras el primer paso) de modo que ya no es necesariamente directamente cuesta abajo por el gradiente, pero la minimización converge (mucho) más rápido. En Rosetta, esta es la familia de funciones «dfpmin». Aunque lleva el nombre del método de actualización DFP (Davidon-Fletcher-Powell), en realidad usa el método de actualización BFGS (Broyden-Fletcher-Goldfarb-Shanno), que se considera ampliamente mejor. Recientemente también se ha añadido a Rosetta una variante de memoria limitada (L-BFGS). (Antes no se incluía porque el costo de mantener en memoria la matriz Hessiana completa de N x N (N = número de DOF) no parecía prohibitivo, y Paul Tseng encontró que la versión de memoria limitada daba peores soluciones. La implementación más reciente en máquinas modernas mejora el rendimiento, especialmente para la minimización cartesiana.)

A diferencia de linmin, todos los algoritmos dfpmin/lbfgs son algoritmos de **varios pasos**, por lo que solo necesitan llamarse una vez para llegar al mínimo (local) de una función (e iterarán internamente).

«dfpmin» usa una búsqueda de línea exacta y, según Jim, requiere \~10 evaluaciones de la función por búsqueda de línea.

«dfpmin_armijo» usa una búsqueda de línea inexacta, en la que el paso a lo largo de la dirección de búsqueda solo necesita mejorar la energía en cierta cantidad y también hacer el gradiente cierta cantidad más plano (pero sin llegar necesariamente al mínimo). Esto resulta significativamente más eficiente, ya que una vez que arranca solo hacen falta 2-3 evaluaciones de la función por búsqueda de línea, y se necesitan aproximadamente el mismo número de búsquedas de línea que con dfpmin exacto.

«dfpmin_armijo_nonmonotone» usa una búsqueda de línea aún menos exacta a lo largo de la dirección de descenso, de modo que el paso solo necesita ser mejor que uno de los últimos puntos visitados. Esto permite *aumentos* temporales de la energía, de modo que la búsqueda puede escapar de mínimos locales poco profundos y de cuencas planas. Jim estima que esto es varias veces más eficiente que dfpmin exacto.

«dfpmin_strong_wolfe» usa el algoritmo de minimización de línea de More-Thuente, que impone tanto las condiciones de Armijo como las de Wolfe. Esto da una mejor aproximación parabólica a un mínimo y puede ejecutarse algo más rápido que armijo.

«lbfgs_armijo» usa la implementación del minimizador L-BFGS con las condiciones de búsqueda de línea inexacta de Armijo. 

«lbfgs_armijo_nonmonotone» usa la implementación del minimizador L-BFGS con las condiciones de búsqueda de línea aún más inexactas.

«lbfgs_strong_wolfe» usa la implementación del minimizador L-BFGS con las condiciones de Wolfe.

Recomendaciones
==============

Las recomendaciones actuales son usar el minimizador lbfgs_armijo_nonmonotone, o una de las otras variantes lbfgs (cf. Andrew Leaver-Fey). Las recomendaciones anteriores eran usar dfpmin\_strong\_wolfe o dfpmin\_armijo\_nonmonotone (cf. Jim). La implementación actual de L-BFGS parece ser equivalente a dfpmin en resultados, con mejoras en el rendimiento de tiempo de ejecución y memoria.

Se recomienda *encarecidamente* el uso de minimizadores basados en lbfgs para la minimización en el espacio de coordenadas cartesianas o para la minimización con longitudes y ángulos de enlace flexibles, ya que las variantes de dfpmin dan un rendimiento pésimo. (Se imprimirá un mensaje de advertencia si se da una mala elección de minimizador.)

El significado de la tolerancia
========================

Rosetta tiene al menos dos tipos de «tolerancia» para la minimización de funciones: la tolerancia «regular» (a falta de un nombre mejor) y la tolerancia absoluta. La tolerancia «regular» es una tolerancia *fraccionaria* sobre el *valor* de la función que se minimiza; es decir, una tolerancia de 1e-2 significa que el valor mínimo de la función encontrado estará dentro del 1% del verdadero valor mínimo. La tolerancia absoluta se especifica sin tener en cuenta el valor actual de la función; es decir, una tolerancia absoluta de 1e-2 significa que el valor mínimo de la función encontrado será igual al mínimo real más o menos 1e-2, y punto.

Los minimizadores usan la tolerancia fraccionaria por defecto. Para invocar el uso de las variantes de tolerancia absoluta, añade «\_atol» al final del tipo de minimizador. Por ejemplo, para usar la versión de tolerancia absoluta del minimizador «lbfgs_armijo_nonmonotone», usa en su lugar el tipo de minimizador «lbfgs_armijo_nonmonotone_atol».

[Esta discusión se aplica solo a linmin_iterated, dfpmin, lbfgs y sus variantes. Otros minimizadores pueden tener nociones distintas de tolerancia.]