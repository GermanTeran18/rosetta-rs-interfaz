# Cierre de loops

El cierre de loops (Loop Closing) está relacionado con los protocolos de [[modelado de loops|loopmodel]], pero no es idéntico a ellos. El cierre de loops se dedica a cerrar una ruptura de cadena no física introducida durante el ensamblaje de fragmentos con cadena rota (jumping), mientras que el modelado de loops introduce primero una ruptura de cadena para mejorar el muestreo en una región de loop y después elimina esa misma ruptura. Ten en cuenta que los benchmarks de construcción de loops se suelen realizar sobre estructuras cristalinas en las que solo se perturba un loop. Hemos comprobado que incluso las perturbaciones pequeñas del núcleo estructural, como las que hay en las estructuras generadas de novo, lo cambian todo. En consecuencia, vimos que aplicar los protocolos estándar de modelado de loops de Rosetta (p. ej., CCD, KIC) no funcionaba bien en el contexto de los protocolos de generación de estructuras de novo.
Si hay varias rupturas de cadena, el cierre de loops se llevará a cabo para cada ruptura de forma individual. Al intentar cerrar un loop mientras hay otras rupturas de cadena, el muestreo de torsiones de la cadena principal se restringe a la zona alrededor de la ruptura que no contiene ningún otro residuo de jump. Estos son los extremos libres (hojas) del FoldTree. Al elegir qué ruptura cerrar primero, seleccionamos antes las que tienen extremos libres más largos, porque su eliminación también reducirá el número de residuos de jump y, por tanto, podría liberar los extremos libres de otras rupturas. 

#### El protocolo de ventana deslizante

[[/images/sliding_windows.jpg]]

Para una ruptura de cadena dada generamos entonces ventanas de longitud variable y con distintos desplazamientos respecto a la posición de la ruptura, con la esperanza de encontrar el tramo óptimo de residuos (del loop) alrededor de la ruptura, el que mejor pueda alojar una conformación que cierre el loop con longitudes y ángulos de enlace ideales (Figura). El protocolo general está implementado en la clase SlidingWindowLoopClosure. Las ventanas se ordenan por tamaño y se muestrean empezando por las más pequeñas. Para cada ventana se generan 200 conformaciones de loop mediante ensamblaje de fragmentos. Las primeras 100 conformaciones se muestrean sin puntuación, usando un Pose reducido al loop muestreado y sus dos residuos de anclaje. Las 100 conformaciones siguientes se generan con una ScoreFunction reducida, definida en loop_fragsample.wts (rosetta_database: vdw=1.0, pair=1.0, env=1.0, linear_chainbreak=1.0, overlap_chainbreak=1.0), pero se muestrean en el contexto del Pose completo.
Las conformaciones generadas en ventanas de distinta longitud y desplazamiento se filtran para excluir las que tienen choques gravísimos y luego se vuelven a puntuar con la ScoreFunction completa tal como se usó en la etapa anterior de ensamblaje de fragmentos (abinitio), incluidas las puntuaciones de restricciones. Se selecciona la conformación de loop de mejor puntuación si supera a la conformación inicial (que también se ha guardado).

#### El BreadthFirstSlidingWindowLoopClosure, más rápido

Este protocolo se activa con la opción -loops:alternative_closure_protocol.
Los benchmarks mostraron que pudimos acelerar bastante el protocolo SlidingWindow sin pérdida de rendimiento si primero se recorren rápidamente todas las ventanas de distinto tamaño y desplazamiento para encontrar las que son aptas para el cierre. Después, el muestreo más exhaustivo se concentra en esas ventanas preseleccionadas. Así, el algoritmo de búsqueda en anchura realiza primero el muestreo rápido sin puntuación en el Pose reducido en todas las ventanas y luego pasa a muestrear con puntuación (loop_fragsample.wts) solo las ventanas que produjeron una proporción fijada (-fast_loops:window_accept_ratio) de conformaciones de loop aceptables en el muestreo sin puntuación.

#### Cierre de loops por idealización

Nuestros resultados también mostraron que el protocolo de idealización de ROSETTA puede ser un cierre de loops eficiente si los loops de los decoys iniciales ya están suficientemente cerca de una conformación cerrada ideal. Esto último suele ocurrir si se usa el protocolo de muestreo RASREC junto con las puntuaciones linear_chainbreak y overlap_chainbreak. Las opciones -loops:idealize_before_loop_close y -loops:idealize_after_loop_close activan el protocolo de idealización antes y después de que se ejecute el protocolo de cierre de loops basado en fragmentos descrito arriba. Si la idealización se ejecuta antes del cierre de loops, la conformación inicial idealizada a menudo supera (por puntuación) a las conformaciones recién generadas y se selecciona en esos casos. También vimos que, si el protocolo de idealización es capaz de producir una conformación de alta calidad y con puntuaciones bajas, suele ser más precisa que las conformaciones generadas por el muestreo de loops basado en fragmentos. Si la idealización no tuvo éxito antes del cierre de loops dedicado, normalmente tiene bastantes más probabilidades de tenerlo después. Además, si la estructura ya está cerca de lo ideal, el protocolo de idealización necesita menos tiempo de ejecución, de modo que sigue siendo eficiente ejecutar la idealización antes y después del cierre de loops. Por otra parte, ejecutar la idealización después del cierre de loops permite omitir la ejecución del cierre de loops CCD, que (casi siempre) encuentra una conformación ideal (pero a menudo mala) al resolver las ecuaciones cinemáticas. Por eso comprobamos que es mejor ejecutar el cierre de loops con las opciones -loops:non_ideal_loop_closing (que omite el paso ccd) y -loops:idealize_after_loop_close. 

##Véase también

* [[Loopmodel]]: La página de la aplicación loopmodel
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura, incluido el modelado de loops
* [[Loops file]]: Formato de archivo para especificar loops en el modelado de loops
* [[Loop modeling algorithms|loopmodel-algorithms]]
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta




