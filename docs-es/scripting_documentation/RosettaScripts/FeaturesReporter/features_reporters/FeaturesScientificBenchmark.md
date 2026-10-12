#Benchmark científico de Features

Una feature (característica) es una medida de una estructura molecular que se representa geométricamente. Algunos ejemplos son las propiedades medidas por componentes de las ScoreFunctions de Rosetta, como ángulos de torsión, y distancias y ángulos de enlaces de hidrógeno. Ejemplos más complejos son el volumen de huecos o las distribuciones radiales de densidad.

Explorar features en estructuras experimentales y predichas suele implicar pasos comunes:

1.  reunir conjuntos de datos
2.  extraer features
3.  seleccionar, filtrar y comparar usando varios tipos de features
4.  crear gráficos y estadísticas

Realizar estos pasos a mano a menudo no es demasiado difícil. Sin embargo, normalmente el contexto y el propósito de la investigación evolucionan. Así, con el tiempo hay que rehacer el análisis con nuevos conjuntos de datos, usando otras features y generando otros gráficos y estadísticas. Si el análisis original no estaba bien organizado, cada vez será tan difícil como la primera.

El benchmark científico de Features está diseñado para ayudarte a investigar features de modo que repetir el análisis sea fácil y directo. Ofrece:

-   [[Conjuntos de datos de referencia|FeaturesDatasets]] prácticos
-   Un marco de trabajo de Rosetta/C++ para facilitar la [[extracción de features|FeaturesExtracting]] de Poses a bases de datos relacionales
-   [[Feature Reporters|FeatureReporters]] para organizar y gestionar los datos de features
-   [[Scripts de R|FeaturesRScripts]] y [[tutoriales|FeaturesTutorials]] para ayudar con los tipos comunes de análisis de features.

Además, los [[análisis de features aportados|FeaturesTestingServer]] pueden ejecutarse automáticamente en el [[Testing Server]] para poder supervisar la calidad científica de Rosetta.

 Aquí están las diapositivas de un [tutorial](http://garin.med.unc.edu/~momeara/features_tutorial.pdf) (\~5Mb), que se presentó en el taller de desarrolladores de Rosetta de enero.


##Véase también

* [[Scientific Benchmarks]]
* [[Rosetta tests]]: la página de inicio de las pruebas