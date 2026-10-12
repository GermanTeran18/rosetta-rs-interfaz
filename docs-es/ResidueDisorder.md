#ResidueDisorder: predicción del orden y el desorden de los residuos de una proteína.
Metadatos
========
Método desarrollado por Stephanie Kim (kim.6088@osu.edu) y Justin Seffernick (seffernick.9@osu.edu).

Código y documentación de Justin Seffernick.

El investigador principal fue Steffen Lindert (lindert.1@osu.edu).

Última actualización en agosto de 2021, por Justin Seffernick. 

Código
====

La aplicación se encuentra en `Rosetta/main/source/src/apps/public/analysis/ResidueDisorder.cc`.

Hay una demostración de predicción de desorden con estructuras _ab initio_ en `Rosetta/demos/public/ResidueDisorder`.

Ten en cuenta que, para ejecutar ResidueDisorder y predecir el desorden intrínseco a partir de la secuencia, antes hay que realizar una predicción de estructura. Esto se puede hacer con Rosetta _ab initio_, RoseTTAFold o AlphaFold. Las estructuras deben relajarse en Rosetta antes de usarlas como entrada. Para ejecutar ResidueDisorder y medir el desorden a partir de la estructura, cada estructura de entrada también debe estar relajada.

Referencias
==========
Kim, S.S.; Seffernick, J.T.; Lindert,S., Accurately Predicting Disordered Regions of Proteins Using Rosetta ResidueDisorder Application. _J. Phys. Chem. B._ **2018**;122,3029-30930.

Seffernick, J.T.; Ren, H.; Kim, S.S.; Lindert, S., Measuring Intrinsic Disorder and Tracking Conformational Transitions Using Rosetta ResidueDisorder. _J. Phys. Chem. B._ **2019**;123 (33), 7103–7112.

Propósito
=======

Rosetta ResidueDisorder es un método para predecir las regiones intrínsecamente desordenadas de las proteínas a partir de la secuencia primaria. Aunque las proteínas suelen representarse como estructuras rígidas y bien plegadas, muchas contienen regiones que probablemente no forman estructuras estables. La aplicación ResidueDisorder (que se usa después de ejecutar la predicción de estructura y el relax) permite predecir el orden o el desorden con resolución de residuo. La predicción de estructura se puede realizar con Rosetta _ab initio_, RoseTTAFold o AlphaFold. 

Además, ResidueDisorder puede medir el desorden de distintas conformaciones del mismo sistema directamente a partir de las coordenadas de, por ejemplo, una simulación de MD (o de cualquier conjunto de estructuras). Con esta metodología, ResidueDisorder también puede predecir eventos de plegamiento y desplegamiento a partir de una trayectoria, basándose en los cambios de desorden.

Algoritmo
=========

Para predecir el desorden intrínseco a partir de la secuencia, primero se generan modelos relajados (Rosetta _ab initio_, RoseTTAFold o AlphaFold, realizados antes de la entrada a la aplicación ResidueDisorder) y se calcula la puntuación promedio de cada residuo. Para medir el desorden directamente a partir de una única estructura, se relaja la estructura y se calculan las puntuaciones de los residuos. Ambos métodos siguen los pasos siguientes. 

Para cada residuo, la puntuación promedio se suaviza sobre un tamaño de ventana (WS), lo que da la puntuación de orden (OS) con resolución de residuo. Por ejemplo, al calcular el OS del residuo N con un WS de 5, el OS se define como la puntuación promedio del residuo N y de los 10 (WS*2) residuos adyacentes (N-5, N-4, N-3, N-2, N-1, N, N+1, N+2, N+3, N+4, N+5). Si N está a menos de 5 residuos del extremo N-terminal o del C-terminal, solo se incluyeron los residuos que existen. Por ejemplo, la puntuación de orden del residuo 2 resultaría de promediar las puntuaciones de los residuos 1, 2, 3, 4, 5, 6 y 7. Luego, cada residuo se predice como ordenado o desordenado, según si la puntuación de orden está por debajo o por encima del valor de corte (CV), respectivamente.

Si la proteína está desordenada en más de un porcentaje de corte terminal (TPC) (porcentaje de residuos predichos como desordenados), o si se usó AlphaFold para el modelado, el algoritmo ha terminado. Sin embargo, si la proteína está desordenada en menos del TPC por ciento, se aplica una optimización de los residuos terminales. El paso de optimización terminal cambia el corte de los residuos que están dentro de un porcentaje de tamaño terminal (TS) de cualquiera de los residuos terminales. Para estos residuos se aplica una línea de corte lineal, de modo que los residuos N-terminal y C-terminal tengan un corte igual al valor de corte terminal (TCV), y los residuos del TPC por ciento tengan un corte igual a CV (igual que todos los demás residuos internos), con una extrapolación lineal. De nuevo, cada residuo se predice como ordenado o desordenado según si la puntuación de orden está por debajo o por encima del nuevo corte.

El algoritmo contiene parámetros para el modelado con las funciones de puntuación Talaris2014 y REF2015, como se muestra en la tabla siguiente. Para obtener los mejores resultados de predicción se recomienda AlphaFold con REF2015.

Método de generación de modelos | Función de puntuación de Rosetta | WS | CV | TPC | TS | TCV | Opciones para ejecutar
------------ | ------------- | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ 
Rosetta ab initio o RoseTTAFold | Talaris2014 | 5 | -1.0 | 60% | 13% | -0.3 | `-restore_talaris_behavior`
Rosetta ab initio o RoseTTAFold | REF2015 | 10 | -1.5 | 40% | 34% | -0.8 | Ninguna adicional
AlphaFold | Talaris2014 | 5 | -1.2 | NA | NA | NA | `-restore_talaris_behavior` y `-AF`
AlphaFold | REF2015 | 10 | -1.8 | NA | NA | NA | `-AF`

Si se realiza la predicción de eventos (a partir de los fotogramas de una trayectoria de MD), se calcula la diferencia entre el desorden promedio de los 25 pasos anteriores a ese punto temporal y el de los 25 pasos posteriores. Se establece una línea de corte para el valor absoluto de la diferencia; por encima de ella se define un evento, que representa un cambio significativo del desorden en ese punto temporal. Esta línea de corte se define como el 60% de la mayor diferencia del sistema. Si el desorden aumenta durante el evento, se define como un evento de desplegamiento, y si el desorden disminuye durante un evento, se define como un evento de plegamiento. Si se detectan eventos en pasos de tiempo adyacentes, se combinan para formar un único evento en el centro del rango.


Archivos de entrada
===========

Antes de usar la aplicación ResidueDisorder para predecir el desorden intrínseco a partir de la secuencia, se deben generar modelos de estructura con plegamiento ab initio de Rosetta (se recomiendan 100), RoseTTAFold (se recomienda al menos uno) o AlphaFold (se recomiendan 5). La única entrada necesaria para ejecutar la aplicación son las estructuras generadas (se recomienda usar la opción `-in:file:l`).

Antes de usar la aplicación ResidueDisorder para medir el desorden a partir de la estructura, cada estructura debe haberse relajado previamente. La única entrada necesaria para ejecutar la aplicación son las estructuras generadas y relajadas (se recomienda usar la opción `-in:file:l`). Si se realiza la detección de eventos, es crucial que estas estructuras se introduzcan en el orden correcto. 


Consejos
====

Para predecir el desorden intrínseco a partir de la secuencia (el comportamiento por defecto de la aplicación), ResidueDisorder se puede ejecutar con cualquier número de estructuras plegadas, pero los números recomendados se muestran arriba. Para usar los parámetros de AlphaFold, incluye la opción `-AF`. La salida por defecto es `ResidueDisorder_default.out`, pero el archivo de salida se puede especificar con `-out:file:o`.

Para medir el desorden a partir de la estructura, se debe indicar la opción `-measure_disorder_from_structure`. Esto tratará cada estructura de entrada por separado, en lugar de promediar el conjunto. El prefijo por defecto de los archivos de salida (uno por cada estructura de entrada) es `ResidueDisorder_default_`, pero el prefijo se puede especificar con `-out:prefix`.

Para predecir eventos, asegúrate de introducir las estructuras en el orden correcto. Se deben indicar las opciones `-measure_disorder_from_structure` y `-predict_events`. Para especificar el prefijo de la salida de cada estructura, usa `-out:prefix`. Para especificar el archivo de salida que contiene los eventos, usa `-out:file:o` (`ResidueDisorder_events_default.out` es la salida por defecto).

Además, asegúrate de que todas las estructuras de entrada tengan la misma secuencia (y longitud, que debe ser de al menos 10 residuos) y contengan una sola cadena.

Para medir el desorden y predecir eventos, la implementación actual está calibrada para usarse con Talaris2014, por lo que se debe indicar la opción `restore_talaris_behavior`. Sin embargo, para la predicción de desorden intrínseco se puede usar REF2015 (véase la tabla de la sección Algoritmo, con las opciones específicas de cada implementación).

Limitaciones
===========

Actualmente, Rosetta ResidueDisorder solo puede predecir el orden de monómeros. Las estructuras de entrada deben tener una sola cadena.

Salidas esperadas
================

ResidueDisorder mostrará (en pantalla) las puntuaciones calculadas por residuo para cada Pose y las puntuaciones promedio por residuo (sobre todos los Poses si se predice el desorden intrínseco a partir de la secuencia). Para la predicción inicial, ResidueDisorder mostrará la puntuación de orden y la predicción (orden o desorden) de cada residuo. Si es necesaria la optimización terminal (menos del TPC% desordenado), ResidueDisorder mostrará las puntuaciones de orden, las predicciones y los cortes finales de la optimización terminal. 

Si se predice el desorden intrínseco a partir de la secuencia (comportamiento por defecto), ResidueDisorder escribe las predicciones finales en formato tabular en un archivo de salida (el nombre es `ResidueDisorder_default.out` por defecto, pero se puede especificar con la opción `-out:file:o`). Los resultados finales tabulados contienen la predicción, la puntuación de orden y la puntuación promedio bruta de los residuos.

Si se mide el desorden a partir de la estructura (`-measure_disorder_from_structure`), ResidueDisorder escribe las predicciones finales en formato tabular en un archivo de salida para cada estructura de entrada (el prefijo es `ResidueDisorder_default_` por defecto, pero se puede especificar con la opción `-out:prefix`). Los resultados finales tabulados contienen la predicción, la puntuación de orden y la puntuación promedio bruta de los residuos.

Si se realiza la detección de eventos (`-measure_disorder_from_structure` y `-predict_events`), además de los resultados de salida de cada estructura (véase arriba), se crea un archivo de salida adicional con los eventos detectados (`ResidueDisorder_events_default` por defecto, pero se puede especificar con la opción `-out:file:o`).


Novedades desde la última versión
=============================

Desde la primera versión se han añadido las capacidades de "medir el desorden a partir de la estructura" y "predecir eventos", así como parámetros para predecir el desorden con estructuras de AlphaFold.

