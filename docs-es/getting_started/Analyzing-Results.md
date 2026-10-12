Análisis de resultados
===========

La visión general de un protocolo de Rosetta es extraordinariamente genérica: tomas un conjunto de datos de entrada que especifica grandes partes del espacio de secuencia y de conformación de una proteína hipotética, haces algo de muestreo de los grados de libertad en cuestión y luego eliges los "mejores" resultados obtenidos de ese procedimiento de muestreo.
Este documento trata un aspecto del segundo paso y, sobre todo, el tercer paso.
La pregunta evidente que deja abierta el segundo paso es la cantidad precisa de muestreo necesaria para llegar a un conjunto razonable de estructuras que analizar.
Como en una simulación de dinámica molecular, por lo general puedes determinar si te has acercado tanto como es posible a la "respuesta correcta" dados tus criterios de muestreo.

El ejemplo clásico es el plegamiento _ab initio_, donde se representa la puntuación frente al rmsd respecto a la estructura nativa y se obtiene un "embudo de plegamiento", en el que los rmsd grandes corresponden a malas puntuaciones (y una derivada de la puntuación relativamente baja) y, a medida que el rmsd se acerca al nativo, las puntuaciones mejoran rápidamente, lo que lleva a un grupo de conformaciones casi nativas.
No toda secuencia produce un embudo de plegamiento (es cierto que tampoco toda secuencia produce una proteína plegada en la realidad), pero _en su mayor parte_, un embudo de plegamiento es cierta evidencia de convergencia.
(Sin abrumar con salvedades, _en teoría_ podrías imaginar que el espacio conformacional sea simplemente cincuenta veces mayor que lo que has muestreado en realidad, y que el embudo observado sea apenas un sub-embudo que describe una porción de ese espacio. Así que, como es de esperar, a menos que tengas una verdadera estructura nativa, no puedes saber cuán cerca estás.)
Pero, igual que en una simulación de MD, puedes observar que disminuye la probabilidad de que no hayas convergido, y con eso basta.
Después de todo, solo estás convergiendo respecto de la función de puntuación que usas. Para tu millonésimo decoy de _ab initio_, el error de la función de puntuación es casi con certeza mucho mayor que la imperfección de tu muestreo.
(En diseño con cadena principal fija, probablemente has llegado a ese punto hacia el decoy cien.)

La idea es que lo primero que debes hacer es asegurarte de que estás generando suficientes estructuras.
Como solución alternativa para lograr un muestreo más eficaz con un número determinado de estructuras, puedes dividir tu protocolo en varias fases.
Por ejemplo, supón que estás ejecutando FastRelax con cierta cantidad de diseño.
¡Es un gran protocolo y da resultados estupendos!
Pero si estás rediseñando veinte residuos a ALLAAxc, son muchísimas configuraciones que visitar, además de la minimización de la cadena principal y de las cadenas laterales y del reempaquetado de las cadenas laterales.
Si las limitaciones de la vida real te impiden generar 20 000-100 000 decoys, que sería lo ideal para este espacio, podrías en cambio generar 5000 decoys con FastRelax sin diseño, procesar los resultados para obtener un número menor de estructuras (quizá los 10-20 mejores centroides de clúster, o algo parecido) y luego ejecutar un protocolo de diseño más conservador (como diseño con cadena principal fija) sobre los resultados, para unos cien decoys.

Así que el procesamiento de los resultados puede adoptar muchas formas.
Entre los aspectos más importantes de este proceso se incluyen:
- Agrupamiento (clustering), que tiene dos propósitos. 
    - Primero, tiene poco sentido realizar una segunda etapa de muestreo con dos estructuras casi idénticas generadas en la primera etapa: es una manera muy ineficiente de recorrer el espacio de estructuras.
    - Segundo, el agrupamiento permite obtener una valiosa confirmación de que un resultado es válido. Es más probable que un clúster grande de una energía dada contenga un mínimo global que un clúster mucho más pequeño, aunque el clúster más pequeño tenga una energía algo mejor.
        Esto se debe a que es más probable que el mínimo global tenga más estructuras de baja energía a su alrededor, mientras que los falsos positivos probablemente sean casualidades, estructuralmente hablando.
        Además, la mayor parte de la puntuación de Rosetta sigue siendo bastante gruesa; por ejemplo, a menos que uses el término de energía cart_bonded, las longitudes y los ángulos de enlace son inmutables.
        Por eso es muy probable que el amplio mínimo de la función de puntuación de Rosetta enmascare un mínimo de energía libre más profundo que podrías encontrar con otro método de muestreo ortogonal.
- Elegir los mejores centroides de clúster (o, si ya tienes pocas estructuras bien distribuidas, los mejores modelos) según alguna métrica.
Esta métrica debería corresponder, por lo general, a la _realidad física_ del modelo.
Una función de puntuación global suele ser una buena opción.
Puede diferir de la función de puntuación que usaste para guiar el muestreo.
Por ejemplo, puede que hayas añadido [[restricciones|constraint-file]] a tu función de puntuación para muestrear solo conformaciones cercanas a un sitio de unión.
Pero a la hora de puntuar, te interesa mucho más que tus modelos no tengan choques, tengan pocos rotámeros malos y un buen empaquetado que lo bien que cumplan tus restricciones originales.
Por eso aquí puedes usar una función de puntuación con pocas restricciones, o con otras distintas, para puntuar los modelos.
- Después de seleccionar un porcentaje de tus modelos o centroides según esa puntuación de "realidad física", puede que tengas un objetivo secundario según el cual debas ordenar estos modelos.
En casos como el plegamiento _ab initio_, las dos funciones de puntuación probablemente sean idénticas, ya que solo hay un objetivo: encontrar la estructura correcta para una secuencia.
En casos como el diseño de interfaces, en cambio, primero quieres seleccionar buenos modelos, pero podrías ordenar tus modelos "exitosos" por su energía de interfaz, porque eso refleja mejor tu objetivo funcional.
Por supuesto, mejores energías de interfaz deberían correlacionarse con mejores puntuaciones, pero a veces una buena puntuación se debe a un mejor empaquetado lejos de la interfaz.
De igual modo, unas buenas energías de interfaz en estructuras de baja puntuación pueden carecer por completo de sentido.

##Véase también

* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Units in Rosetta]]: describe las unidades de energía de Rosetta y otras unidades de medida.
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar los archivos ejecutables de Rosetta
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Resources for learning biophysics and computational modeling]]

<!--
Este comentario oculto es un truco de búsqueda para la terrible herramienta de búsqueda Gollum.
analyzing results
analyzing results
analyzing results
analysis
analysis
analyze
analyze
analysing
analysing
-->

