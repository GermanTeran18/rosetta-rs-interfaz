## Integración de datos de espectroscopía de resonancia electrón-electrón doble (DEER)

### Resumen

La espectroscopía de resonancia paramagnética electrónica, EPR por sus siglas en inglés, es una herramienta experimental que informa sobre la dinámica de las proteínas y la heterogeneidad estructural. Una aplicación muy utilizada es la resonancia electrón-electrón doble (DEER, también llamada PELDOR), que se usa para medir distancias a escala nanométrica entre pares de sondas de espín unidas a las cadenas principales de las proteínas mediante marcaje de espín dirigido a sitio (SDSL). El método de energía DEEREnergy, que forma parte del módulo más amplio RosettaDEER, permite integrar estos datos con Rosetta para el modelado de estructuras de proteínas.

Documentación escrita por Diego del Alamo (del.alamo@vanderbilt.edu). Última edición: 1 de junio de 2021. Si usas este término de puntuación, cita «Rapid Simulation of Unprocessed DEER Decay Data for Protein Fold Prediction» de del Alamo et al, Biophysical Journal (2020).

[[_TOC_]]

### El término de puntuación DEEREnergy

#### Enfoque general

El método de puntuación DEEREnergy compara los datos experimentales, proporcionados por el usuario, con datos simulados a partir de un modelo de proteína. Como con todos los términos de puntuación de Rosetta, las puntuaciones bajas indican que los datos simulados concuerdan bien con los datos experimentales, mientras que las puntuaciones más altas indican desacuerdo o discrepancias entre el modelo y los datos. La simulación y la puntuación se llevan a cabo en varios pasos, que se explican con más detalle en las secciones siguientes.

1. Al inicio del programa, el usuario proporciona los datos como entrada.
2. Durante la puntuación, se introducen marcadores de espín ficticios sobre la proteína para simular la distribución de distancias. Si se proporcionan como entrada los datos brutos en el dominio del tiempo, la distribución de distancias simulada se convierte además en una traza temporal.
3. Se calcula una puntuación comparando los datos simulados y los experimentales. El término de puntuación concreto lo especifica el usuario.

### Cómo proporcionar datos experimentales mediante la línea de comandos

El término de puntuación de DEEREnergy es ```epr_deer_score```. Como con todos los términos de puntuación de Rosetta, se puede pasar al programa con la opción de línea de comandos ```-score:set_weights epr_deer_score X```, donde ```X``` es el peso deseado. Se pueden especificar uno o más archivos con datos experimentales mediante la opción de línea de comandos ```-epr_deer:input_files file1.txt file2.txt ... fileN.txt```. El formato de estos archivos se explica más abajo. 

Hay cuatro enfoques para integrar datos experimentales de DEER como restricciones:
* **Pasar un valor de distancia concreto:** la distancia media de la distribución de distancias simulada (en ángstroms) se comparará con el valor proporcionado, y se devolverá el cuadrado de la diferencia.
* **Pasar un intervalo de valores de distancia:** la distancia media de la distribución de distancias simulada (en ángstroms) se comparará con el intervalo de distancias. La puntuación devuelta es cero si este valor cae dentro del intervalo. Si el valor cae fuera del intervalo, la puntuación es igual al cuadrado de la diferencia entre él y el límite inferior o el superior, el que esté más cerca.
* **Pasar una distribución de distancias experimental:** la distribución de distancias simulada se compara directamente con la distribución experimental mediante una de varias funciones (por defecto: logaritmo de la verosimilitud negativo).
* **Pasar una traza DEER experimental:** la distribución de distancias simulada se transforma al dominio del tiempo y, según las opciones especificadas por el usuario, se modifica aún más antes de compararla con los datos experimentales. La puntuación es igual a la suma de los residuos al cuadrado.

**Se recomienda encarecidamente que una tarea de modelado se ciña a un enfoque de puntuación concreto.** Los rangos dinámicos de estas funciones de puntuación no son similares, y se puede dar más énfasis a los datos proporcionados con un enfoque que con otro. No obstante, se pueden combinar según sea necesario si hace falta.

#### Formato del archivo de entrada para comparar con un valor de distancia concreto

Esta sección describe cómo dar formato a los datos para puntuar con la primera opción anterior. La comparación con la distancia experimental media sigue siendo el enfoque más utilizado para integrar datos de distancias de DEER en el modelado. Este es un ejemplo de cómo dar formato al archivo correctamente:
```
# Simple integration of distance restraints.
# Distance values should be provided in angstroms
# Lines starting with '#' are ignored
PAIR	20	155	30.2
PAIR	20	355	45.0
PAIR	155A	355A	18.6
```

La segunda y la tercera columna son los residuos y la cuarta columna es la distancia de interés. En este caso, la puntuación es la desviación cuadrática entre este valor de distancia y la distancia media de la distribución de distancias simulada. Por ejemplo, al puntuar la tercera restricción, una distancia media simulada de 21.6 entre los residuos 155 y 355 devolverá una puntuación de 9.0. Ten en cuenta que los números de residuo pueden incluir varias cadenas (p. ej., pasando 20B para indicar el residuo 20 de la cadena B).

#### Formato del archivo de entrada para comparar con intervalos de distancias

Puede haber circunstancias en las que la configuración por defecto no sea adecuada para un proyecto de modelado de interés. En esos casos, se pueden proporcionar controles más detallados. Para ello, los datos de la restricción deben dividirse en dos líneas de la siguiente manera:

```
# One distance value is provided as a restraint
DESC	1	DEFAULT 20	DEFAULT	155
BOUNDS	1	30.2	30.2	1.0

# A range of distances are possible:
# Lower bound is 43.0, upper bound is 47.0. 
DESC	2	DEFAULT 20	DEFAULT	355
BOUNDS	2	43.0	47.0	1.0

# The deviation is divided by 4.0 before squaring
# The penalty is not as steep
DESC	3	DEFAULT 155A	DEFAULT	355A
BOUNDS	3	16.6	20.6	4.0
```

En este formato, la línea DESC contiene los residuos con marcaje de espín (columnas 3 y 5), la biblioteca de rotámeros de los marcadores de espín que se usan (```DEFAULT```, que se explica más abajo; columnas 4 y 6) y el índice de la restricción (columna 2). La línea BOUNDS indica los límites inferior (columna 3) y superior (columna 4) de la restricción, así como la pendiente de la función de penalización (columna 5). Ten en cuenta que también hay que proporcionar el índice de la restricción (columna 2) para hacer corresponder la restricción con la información de los residuos.

#### Formato del archivo de entrada para comparar distribuciones de distancias completas

Los valores de distancia individuales se pueden proporcionar de la siguiente manera:
```
# Case where an entire distribution is passed as a restraint.
DESC	4	DEFAULT 20	DEFAULT	233
DIST	4	15.0	0.01
DIST	4	15.5	0.05
DIST	4	16.0	0.11
DIST	4	16.5	0.18
DIST	4	17.0	0.27
# etc
```

Aquí la línea DESC es la misma que se describió antes (véase «Añadir opciones»), y especifica tanto los residuos con marcaje de espín implicados en la restricción como la biblioteca de rotámeros que se usa para modelar el propio marcador de espín. La línea DIST contiene información sobre la distancia (columna 3) y la amplitud (columna 4) de la distribución de distancias. Como con la línea BOUNDS mencionada arriba, también hay que proporcionar el índice de la restricción. Al leer estos datos, la amplitud total de la distribución se normalizará automáticamente a 1.0. Por defecto, DEEREnergy usa dos intervalos (bins) por ángstrom, y todos los valores de entrada se redondearán en consecuencia. Para modificar este valor, consulta la sección «Controles detallados» más abajo.

#### Formato del archivo de entrada para comparar trazas DEER

Para simular trazas DEER a partir de datos de distancias, la distribución de distancias se multiplica por una matriz núcleo de acoplamiento dipolar (consulta Fabregas Ibañez y Jeschke 2019 para una excelente introducción a los detalles teóricos de este paso). Para ahorrar tiempo de cálculo, esta matriz núcleo se calcula una vez cuando se inicia Rosetta y se guarda en memoria. En cada ronda de puntuación, la distribución se multiplica por esta matriz núcleo para simular la señal espectroscópica experimental. Después de este paso, según si los datos tenían corrección de fondo, puede haber un paso adicional en el que la traza DEER simulada se manipula aún más para una comparación óptima con los datos experimentales.

Las trazas DEER experimentales se pueden pasar de la siguiente manera:
```
# Experimental DEER trace between residues 53 and 95
DESC 7 DEFAULT 53 DEFAULT 95
DECAY 7 0	1
DECAY 7 0.00528221	1.00086
DECAY 7 0.0132822	0.997666
DECAY 7 0.0212822	0.995706
DECAY 7 0.0292822	0.991671
DECAY 7 0.0372822	0.988712
DECAY 7 0.0452822	0.98526
# etc
```

En este caso, la columna 3 es el tiempo (en microsegundos) y la columna 4 es la señal normalizada de decaimiento del acoplamiento dipolar. **Ten en cuenta que Rosetta siempre añade como referencia un punto de tiempo cero con una señal normalizada de 1.0**. La señal no se normalizará, no se corregirá su fase ni se ajustará de ninguna manera en el dominio del tiempo; lo que se introduce en el programa se usa directamente para el modelado. Por defecto, _no_ se supone que los datos tengan corrección de fondo, y se supone que la señal de fondo es homogénea en tres dimensiones.

Cuando se usan datos de decaimiento DEER para problemas de refinamiento, en lugar de predicción de estructuras _de novo_, recomendamos tratar la desviación estándar de la distribución de distancias como un parámetro de ajuste. Por defecto esto está desactivado, ya que aumenta significativamente el tiempo de cálculo y no aporta ninguna mejora cuando los modelos están lejos de la conformación objetivo. Sin embargo, cuando los modelos están relativamente cerca de la conformación de interés, este enfoque permite identificar con más eficacia los modelos de tipo nativo. Esto se explica más abajo (véase «Opciones adicionales»).

#### Elección de los marcadores de espín

Los ejemplos anteriores usan el marcador de espín ```DEFAULT```. La otra opción, ```DEFAULT_FAST```, es aproximadamente cuatro veces más rápida de calcular pero conlleva un ligero coste en exactitud. Por tanto, se recomienda usar ```DEFAULT_FAST``` exclusivamente para problemas de plegamiento _de novo_. **Ambas bibliotecas están parametrizadas a partir de bibliotecas de rotámeros del marcador de espín de metanotiosulfonato.** Por tanto, no se recomienda usar este método para restringir proteínas con datos recogidos entre otros marcadores, como IDSL/V1, marcadores bifuncionales o aminoácidos no canónicos paramagnéticos.

#### Más de dos residuos por restricción

Si más de dos residuos tienen marcaje de espín para una restricción dada, también pueden enumerarse en la línea ```DESC``` de esa restricción. Esto puede ser relevante en casos como los homooligómeros con doble marcaje:
```
DESC 8 DEFAULT 20A DEFAULT 55A DEFAULT 20B DEFAULT 55B
```

En este caso, la distribución de distancias entre los cuatro residuos de interés (los residuos 20 y 55 de ambos monómeros) sería la suma de cada una de las seis distribuciones por pares. Hacer esto tiene varias salvedades. Primero, implica que cada residuo está marcado al 100%, lo cual puede no ser siempre cierto. Segundo, las trazas DEER simuladas no tendrán los «picos fantasma» artificiales a distancias cortas que se esperan cuando tres o más espines están muy próximos (consulta von Hagens et al PCCP 2013 para los detalles teóricos).

### Controles detallados

Se pueden pasar modificaciones adicionales a través del archivo de datos de DEER, con la intención de aplicarlas solo a restricciones o conjuntos de datos concretos. Algunas opciones son específicas de las trazas de decaimiento, mientras que otras son independientes de cómo se proporcionen los datos. Esto se consigue escribiendo una línea que empieza por ```INFO```,  seguida del índice del conjunto de datos:
```
# General options for all types of data:
# Adjust the bins per angstrom computed for the distribution
# Set to 2 by default
INFO 1 BINS_PER_ANGSTROM 10

# Multiplies the score returned for this dataset by this value
# Set to 1.0 by default
INFO 2 RELATIVE_WEIGHT 0.5

# Options specific to decay traces:
# Use background-corrected data
INFO 7 BACKGROUND NONE

# Background is not evenly distributed in three dimensions
# This can happen with membrane proteins
INFO 8 BACKGROUND NON_3D

# Treat standard deviation of the distribution as a fitting parameter
# Default: false
INFO 9 FIT_STDEV TRUE

# Passes the standard deviation of the experimental noise.
# Normalizes the residuals when DEER traces have different noise levels
# Default: 1.0
INFO 10 NOISE 0.05
```
