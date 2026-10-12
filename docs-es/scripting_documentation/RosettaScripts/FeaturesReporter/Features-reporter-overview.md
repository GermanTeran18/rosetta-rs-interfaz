#Descripción general de los Features reporter

Estas aplicaciones están pensadas para investigadores interesados en evaluar protocolos de predicción de estructuras con respecto a características estructurales locales, o para investigadores interesados en mejorar una función de energía de biología estructural.

Ofrecemos tutoriales que describen un ejemplo de una tarea concreta como forma de orientar a los nuevos usuarios.
Al final de cada tutorial hay referencias donde se ofrece información más detallada.
Si hay algún tutorial concreto que crees que debería estar aquí o que te gustaría ver, ¡añádelo a la lista de tutoriales solicitados que aparece al final!

También documentamos los FeatureReporters individuales y los scripts de R útiles para el posprocesamiento de datos.

-	[[Cómo ejecutar FeatureReporters| FeaturesTutorials]]
-	[[Lista de FeatureReporters implementados | FeatureReporters]]
- [[SimpleMetricFeatures]]: ejecuta un conjunto arbitrario de SimpleMetrics como Features.

<!--- BEGIN_INTERNAL -->
-       [[Escribir nuevos FeatureReporters | FeaturesExtracting]]
-	[[Escribir nuevos scripts de R para análisis| FeaturesRScripts]]
<!--- END_INTERNAL -->

Descripción general
========

Para ayudar en el análisis y la comparación de estructuras nativas de proteínas y de modelos y diseños de Rosetta, se desarrolló el marco de trabajo Rosetta Feature Reporter, que comprende un marco analítico desarrollado en C++ de Rosetta y un marco de comparación y representación gráfica desarrollado en R, un paquete estadístico completo, gratuito y de código abierto. El marco se usó inicialmente para mejorar la función de energía predeterminada de Rosetta y el enlace de hidrógeno (lo que dio lugar a la función de energía talaris2013, que fue la predeterminada durante un tiempo), pero desde entonces se ha ampliado para su uso en numerosas tareas analíticas y comparativas. En este marco, una Feature (característica) es un componente o conjunto de componentes de una estructura que se va a analizar. Estas «características» abarcan energías, distancias de enlaces de hidrógeno, secuencias, etc.  


Un **[[FeaturesReporter|FeaturesExtracting#FeaturesReporter]]** se encarga de leer y escribir una *característica* o un conjunto de *características* en una base de datos relacional (mySQL, SQLITE3, etc.). RosettaScripts se usa para especificar qué FeatureReporters ejecutar sobre un conjunto de estructuras.

Comparar un conjunto de características de dos conjuntos distintos de estructuras se hace en dos pasos. El primero consiste en analizar cada conjunto de estructuras usando un número elegido de FeatureReporters mediante un script XML y la aplicación RosettaScripts. Cada FeatureReporter es su propia clase de C++ de Rosetta y analiza un conjunto de características de la estructura de entrada y escribe una o más tablas en una base de datos relacional.

Una vez creadas dos o más bases de datos para un conjunto de características derivadas de cada estructura de cada conjunto de datos, el segundo paso es comparar los conjuntos de datos con el marco de R de FeatureReporter. Este marco permite especificar las bases de datos de entrada que se van a comparar, así como diversas opciones de salida y el conjunto de scripts de R de Features que se ejecutarán, ya sea desde la línea de comandos o mediante un archivo JSON que especifique los componentes (un formato común de intercambio de datos utilizado por diversos lenguajes y programas de computación). Cada script de R de Features requiere el uso de distintos FeatureReporters para permitir la comparación, y algunos scripts de R requieren usar muchos FeatureReporters. Los gráficos y las tablas generados por el marco de R de FeatureReporter pueden usarse después para deducir similitudes y diferencias entre los conjuntos de datos dados, además de diversas salidas estadísticas.

Una base de datos de features contiene toda la información estructural asociada a un conjunto de estructuras de un lote de estructuras. La jerarquía siguiente describe la organización general de esta base de datos.  

                  protocols      <------------ One row per execution of Rosetta
                     /\
                     ||
             /---> batches <---\    <--------- One row per set of structures
            / |      /\       | \                
           /  |      ||       |  \
          /   |      ||       |   \
         /-----> Structures <------\   <------ One row per structure, uuid 
        /     |    /     \    |     \
     Feature  Feature   Feature   Feature  <-- Each FeatureReporter manages a type of    
     Reporter Reporter  Reporter  Reporter     of structural data. Static data is indexed 
                                               per batch.


- [[FeaturesTutorials]] - tutoriales del marco de análisis Feature Reporter

Referencias
==========


O'Meara, M. J., Leaver-Fay, A., Tyka, M., Stein, A., Houlihan, K., DiMaio, F., Bradley, P., Kortemme, T., Baker, D., Snoeyink, J., [A Combined Covalent-Electrostatic Model of Hydrogen Bonding Improves Structure Prediction with Rosetta](https://dx.doi.org/10.1021/ct500864r)  . Journal of Chemical Theory and Computation, 2015.

Leaver-Fay, A., O'Meara, M. J., Tyka, M., Jacak, R., Song, Y., Kellogg, E. H., Thompson, J., Davis, I. W., Pache, R. A., Lyskov, S., Gray, J. J., Kortemme, T., Richardson, J. S., Havranek, J. J., Snoeyink, J., Baker, D., Kuhlman, B., [Scientific benchmarks for guiding macromolecular energy function improvement](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3724755/). Methods in enzymology, 2013. 523: p. 109.


##Véase también

* [[Página de inicio de RosettaScripts|RosettaScripts]]
* [[RosettaScripts database connection options]]
* [[Database IO]]: entrada/salida a bases de datos usando Rosetta
* [[Rosetta Database Output Tutorial]]
* [[SQLite3 Interface]]: información específica sobre el uso de SQLite3 con Rosetta
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con bases de datos
* [[Database options]]: opciones de línea de comandos relacionadas con bases de datos
