Comparación de estructuras
====================

*Un ensayo de Charlie Strauss*

Al usar Rosetta, a menudo se quiere comparar conjuntos de
estructuras. Hay distintos casos de uso que requieren estrategias
diferentes. Las consideraciones incluyen las siguientes.

¿Estás comparando estructuras experimentales o estructuras modelo? Métodos
como DALI y CE, que funcionan bien para comparar estructuras experimentales,
tienen un rendimiento muy pobre con estructuras modelo de baja resolución, probablemente porque
ciertas características de las proteínas que buscan, como los puentes de hidrógeno y
los tipos de SS perfectos, están ausentes en las estructuras modelo. La mejor opción para
el solapamiento entre un modelo y una estructura experimental es [Mammoth](http://dx.doi.org/10.1110/ps.0215902) (también conocido como Mastodon).

¿Estás comparando modelos que tienen todos la misma secuencia? Aquí no
hay ambigüedad de alineamiento. Para estructuras cercanas en RMSD, el RMSD
es una medida de similitud bastante buena. Cuando las estructuras se solapan mal,
los valores grandes de RMSD dejan de ser útiles como orden de similitud. Un
error de matriz de distancias con bandas (banded Distance Matrix Error) funciona algo mejor cuando
el RMSD es grande. Cuando se conoce el alineamiento, una medida aún más robusta
en rangos grandes y pequeños es MaxSub, que busca el
mayor subconjunto de la proteína bien solapado. Rosetta tiene un
modo integrado que usa la versión de Mammoth de la medida de comparación MaxSub. Esto
no realiza el procedimiento completo de Mammoth de intentar descubrir el
alineamiento, sino solo la parte MaxSub de Mammoth.

¿Estás comparando modelos a alta resolución? El RMSD es bastante bueno como
medida general.

¿Estás comparando modelos con estructuras de longitudes muy distintas?
El valor E de Mammoth hace una normalización primitiva pero eficaz de la
relación entre el tamaño de la región máxima solapada y la longitud de
las proteínas comparadas. Este número es bastante robusto frente a las variaciones del tamaño
de la proteína, pero bueno, nada es perfecto.

¿Quieres saber cómo comparar valores de RMSD en comparaciones hechas
entre proteínas de distinta longitud? Por ejemplo, ¿solapar dos proteínas de 30
residuos con un rmsd de 4 angstroms es más o menos significativo estadísticamente
que solapar dos proteínas de longitud 100 con una resolución de 7 angstroms?
Hay varias formas de intentar normalizarlo.
Skolnick tiene algunas sugerencias útiles. Mammoth tiene la suya integrada. Pero
una medida extremadamente fácil de entender, rápida y poco rigurosa es el RMS100
(<https://doi.org/10.1110/ps.690101>).
Esta renormaliza cualquier RMSD al valor que tendría si las
proteínas tuvieran longitud 100 y el mismo nivel de significancia estadística.
Recomiendo usarla antes de probar algo sofisticado.

¿Qué significa comparar dos estructuras? Casi todo el mundo
aprecia mal la sutileza de este asunto. El punto de partida para
pensar en ello es que se quiere ver cuán bien se pueden solapar
dos estructuras distintas. Normalmente esto se reduce a encontrar el número
máximo de residuos superponibles con cierto nivel de precisión.
Superponible suele significar que el RMSD es menor que algún valor, aunque
algunos métodos como DALI usan otras medidas que permiten distorsión. Hay
un dilema evidente sobre qué es mejor: un solapamiento más largo a baja
resolución o una región solapada más corta a mayor resolución. También hay
dilemas sobre si se deben permitir huecos largos (lo que
aumenta los solapamientos aleatorios) o si se debe dar más peso a la precisión local (estructura SS) que
a la precisión global. Y está el hecho de que, cuando no se conoce el alineamiento,
el problema es NP-difícil y puede que no sea posible resolver el
alineamiento óptimo global para un criterio de coincidencia dado. Por último,
está el problema de cómo comparar medidas de proteínas de distintas
longitudes.

Cuando se conoce el alineamiento: además del RMSD y el DME, el método
más sofisticado y de uso más extendido es MaxSub. GDT es otra medida
que resuelve el equilibrio entre alta resolución y gran número de
residuos, usando varias resoluciones distintas, calculando el número máximo
de residuos solapados en cada una y formando luego un promedio ponderado
de estos en un solo número. Cuando no se conoce el alineamiento, algunos métodos
populares son DALI, CE, SAL y Mammoth. Estos intentan descubrir
el solapamiento óptimo.

 Una idea clave que parece haber eludido a casi todos los métodos, salvo
Mammoth, es que encontrar la superposición máxima no es realmente la
pregunta que querías responder. Lo que de verdad querías saber es si dos
proteínas eran estructuralmente similares, y eso es más que la
superposición máxima. En particular, en realidad no quieres saber el
número de residuos solapados, ya que este varía según el
criterio: más no es mejor. Lo que importa es la significancia
estadística del resultado. Es muy, muy frecuente que
un algoritmo encuentre una superposición mejor que otro en una proteína dada.
SAL, por ejemplo, tiende a encontrar la mayor de todas en general, pero
otros lo superan en algunas proteínas. Pero lo que de verdad quieres es
algo cuya puntuación de significancia estadística tenga poca varianza. Es decir,
no sirve de nada un método que informa de alguna puntuación escalar ordenable
de la calidad de un solapamiento si la correlación entre esa puntuación y
la comparación real hecha por un humano es pobre o tiene mucha varianza. Cuando
tiene mucha varianza, significa que no basta con considerar la mejor coincidencia
como la mejor, sino que hay que ir muy abajo en la lista de coincidencias ordenadas
para tener mucha confianza en el resultado. Las pruebas han mostrado que Mammoth está mucho
más correlacionado con las clasificaciones humanas que otros métodos, aunque
a menudo informa de un número menor de residuos "solapables". Es fundamental
entender esto, y por eso me inclino con fuerza por la medida de
Mammoth. Sin embargo, si tu único objetivo son las medidas de solapamiento puro, recomiendo
SAL. SAL también es especialmente bueno para el modelado comparativo. DALI es
algo mejor para comparar dos estructuras experimentales.

##Véase también

* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Resources for learning biophysics and computational modeling]]
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[PyMOL]]: una herramienta para visualizar macromoléculas
