#Tutorial de Features: script de gráficos

Tutorial de un script de gráficos sencillo
===========================

Este es un tutorial breve que explica cómo crear un gráfico a partir de conjuntos de datos de features.

Introducción
------------

El script representa en un gráfico de barras el número total de residuos de cada fuente de muestras. El código completo de este script está en el benchmark científico de features ( rosetta/main/tests/scientific/cluster/features/scripts/analysis/plots/EXAMPLE\_PLOT.R ).

El script usa SQL para extraer el número de residuos de cada fuente de muestras a un data.frame de R y luego declara qué aspecto debe tener el gráfico usando ggplot2:

[[/images/EXAMPLE_PLOT_110311_with_abrelaxlr5_110211_top4400_110211.png]]

El código
--------

Esta es la parte esencial del script.

        query_str <- "SELECT count(*) AS num_residues FROM residues;"            # define SQL query string 
        feat_data <- query_sample_sources(sample_sources, query_str)             # apply the query to each sample source

        plot_id <- "EXAMPLE_PLOT"                                                # define the name of the plot
        plot <- ggplot(data=feat_data) +                                         # define a plot of the feat_data
            geom_bar(aes(x=sample_source, y=num_residues, fill=sample_source)) + # map the data to the x, y, and fill values that define the bars
            theme_bw() +                                                         # having the "black and white" theme
            opts(title="Dataset Size") +                                         # specify the title of the plot
            opts(labels=list(x="Number of Residues", y="Count"))                 # specify the axis labels
        save_plots(sample_sources, plot_id, output_formats)                      # generate the last defined ggplot2 plot

Cómo funciona el script
--------------------

#### Este archivo ya no existe.

Para ejecutar este script, llama a *compare\_sample\_sources.R* así:

        Rosetta/main/tests/scientific/cluster/features/compare_sample_sources.R \
           --script scripts/analysis/plots/EXAMPLE_PLOT.R \
           /path/to/features_SampleSource1.db3 \
           /path/to/features_SampleSource2.db3

Extraer los datos
------------

El primer paso es extraer la información relevante de los conjuntos de datos de features.

        query_str <- "SELECT count(*) AS num_residues FROM residues;"            # define SQL query string 

Esto define una cadena con el texto de una sentencia de consulta SQL. El símbolo *\<-* es la sintaxis de R para la asignación de variables. Si se ejecutara esta consulta sobre una base de datos de features, por ejemplo desde una shell, devolvería una tabla con una fila y una columna:

        $sqlite3 features_SampleSource1.db3
        sqlite3> .header ON;
        sqlite3> SELECT count(*) AS num_residues FROM residues;
        num_residues
        1007248

Esto consulta la tabla *residues* y aplica la función *COUNT* para obtener el número total de filas devueltas. Como cada fila de la tabla *residues* corresponde a un residuo distinto extraído del conjunto de estructuras de entrada que define la fuente de muestras, el número devuelto es el número total de residuos de la fuente de muestras.

Como nos interesa comparar las features *entre* distintas fuentes de muestras, usamos la función *query\_sample\_sources* para aplicar la consulta a cada una y devolver todos los resultados de una sola vez.

        feat_data <- query_sample_sources(sample_sources, query_str)             # apply the query to each sample source

sample\_sources es una variable global inicializada por compare\_sample\_sources.R que contiene información sobre cada una de las bases de datos de features que se le pasaron. *query\_sample\_sources* devuelve un *data.frame* de *R* con los resultados de aplicar la consulta SQL a cada una de las fuentes de muestras. Para tener claro de dónde proceden los datos, hay una columna adicional, *sample\_source*, que indica el sample\_source\_id.

Como ejemplo, si este script se ejecutara con las dos fuentes de muestras features\_top4400\_110211.db3' y 'features\_abrelaxlr5\_110211.db3', contendría los siguientes datos:

        summary(feat_data)
              sample_source num_residues
        1    top4400_110211      1007248
        2 abrelaxlr5_110211       778320

Declarar los gráficos
---------------

Aquí vamos a hacer gráficos llamados EXAMPLE\_PLOT.

        plot_id <- "EXAMPLE_PLOT"

Para ello usamos el paquete de visualización de datos *ggplot2* de R. La idea central es asignar las columnas de los datos de entrada a las propiedades que definen los elementos visuales del gráfico. En este tutorial, los datos de entrada son el data.frame *feat\_data*, que tiene las columnas *sample\_source* y *num\_residues* .

La información esencial necesaria para definir un gráfico de barras es la identidad de cada barra ( *x* ), la altura de cada barra ( *y* ) y el color de cada barra ( *fill* ). Por tanto, queremos definir la siguiente asignación:

         sample_source ---> x
         num_residues  ---> y
         sample_source ---> fill

En la dimensión *fill*, cada fuente de muestras se asigna a un color distinto. Para expresar esta intención en código:

        plot <- ggplot(data=feat_data) +                                         # define a plot of  
            geom_bar(aes(x=sample_source, y=num_residues, fill=sample_source)) + # map the data to the x, y, and fill values that define the bars

El resto de la información para especificar el gráfico sirve para que quede bonito

-   Usar el tema «blanco y negro»
-   Añadir un título
-   Añadir etiquetas a los ejes

<!-- -->

            theme_bw() +                                                         # having the "black and white" theme
            opts(title="Dataset Size") +                                         # specify the title of the plot
            opts(labels=list(x="Number of Residues", y="Count"))                 # specify the axis labels

Generar los gráficos
--------------------

Una vez declarado EXAMPLE\_PLOT, para aplicar los datos y generar los gráficos llamamos a *save\_plots* :

        save_plots(sample_sources, plot_id, output_formats)                     # generate the last defined ggplot2 plot

La variable *sample\_sources* es la misma que se usó para extraer las features más arriba.

La variable *output\_formats* la define el script controlador compare\_sample\_sources.R. Incluye información sobre qué formatos de salida se deben generar: si es un archivo «pdf», «png» o «svg», las dimensiones del gráfico, etc. Por defecto se usa el formato de salida *output\_web\_raster*, que genera un archivo con el formato

         <plot_id>_with_<sample_source1>_<sample_source2>_..._<yymmdd>.<output_format_extension>''.

en el directorio de salida:

        [1] "Saving Plot: build/output_web_raster/EXAMPLE_PLOT_110311_with_top4400_110211_abrelaxlr5_110211.png"


##Véase también

* [[Features reporter overview]]: la página de inicio de FeaturesReporter
* Tutoriales de R para FeaturesReporters
  * [[FeaturesTutorialRBasics]]
  * [[FeaturesTutorialGGplots2Basics]]
  * [[FeaturesTutorialPlotTuning]]
* [[FeaturesTutorials]]: tutoriales para usar FeaturesReporters
* [[FeatureReporters]]: lista de FeatureReporters implementados
* [[Página de inicio de RosettaScripts|RosettaScripts]]
* [[RosettaScripts database connection options]]
* [[Database IO]]: entrada/salida a bases de datos usando Rosetta