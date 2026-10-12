#Tutoriales de Features

Estos tutoriales están pensados para investigadores interesados en evaluar protocolos de predicción de estructuras con respecto a características estructurales locales, o para investigadores interesados en mejorar una función de energía de biología estructural. Cada tutorial recorre un ejemplo de una tarea concreta como forma de orientar a los nuevos usuarios. Al final de cada tutorial hay referencias donde se ofrece información más detallada.

[[_TOC_]]

Ejecutar el análisis de Features
=========

- [[Generar una base de datos de features|FeaturesTutorialRunSciBench]]
    -   El benchmark científico de features está en el clúster RosettaTests. Ejecutarlo localmente suele ser un buen punto de partida para un análisis en profundidad. Este tutorial va desde descargar el código fuente hasta mirar los gráficos.

- [[Ejecutar los scripts de R de features para comparar fuentes de muestras|FeaturesTutorialRunFeaturesAnalysis]]
    -   Los scripts de análisis de features son scripts de R que extraen features, estiman distribuciones y comparan las distribuciones mediante gráficos y estadísticas

- [[Conceptos básicos de SQL|FeaturesTutorialSQLBasics]]
    -   Para trabajar con features, es extremadamente útil tener algún conocimiento de los fundamentos del lenguaje de consulta estructurado. Este tutorial presenta parte de SQL y cómo se puede usar para examinar y comparar features


<!--- BEGIN_INTERNAL -->
Crear código para nuevos análisis de Features
========================================

Usar la herramienta de diagnóstico de features para analizar distribuciones de features puede ser muy potente: se pueden examinar rápidamente nuevas relaciones entre distintas características estructurales y el análisis se puede aplicar a nuevos conjuntos de datos de conformaciones a medida que avanza la investigación. Sin embargo, usar la herramienta requiere invertir un poco de esfuerzo en familiarizarse con las herramientas subyacentes. Debería ser posible, con un esfuerzo mínimo, tomar un análisis existente y ampliarlo para examinar nuevas características estructurales.

Estos tutoriales empiezan con ejemplos sencillos de cómo interactuar con las herramientas subyacentes, ofrecen recursos para seguir estudiando y destacan conceptos que pueden ser un obstáculo. Los ejemplos provienen del trabajo con características estructurales de estructuras de proteínas.

-   [[Implementar un FeaturesReporter|FeaturesExtracting]]
    -   Muestra cómo crear un nuevo FeaturesReporter usando la clase base y extrayendo features en paralelo

-   [[Escribir un script de gráficos sencillo|FeaturesTutorialPlotScript]]
    -   Este tutorial muestra la estructura de un script básico de análisis de features y cómo encajan sus componentes.



Recursos generales para desarrolladores
=================================================

-   [[Conceptos básicos de R|FeaturesTutorialRBasics]]
    -   R es un lenguaje de scripting muy extendido en la comunidad de estadística y visualización de datos. A pesar de sus idiosincrasias, tiene un impulso considerable y vale la pena aprender un poco. Este tutorial presenta cómo encontrar ayuda sobre el lenguaje (porque «R» no se puede buscar en Google).

-   [[Conceptos básicos de ggplot2|FeaturesTutorialGGplots2Basics]]
    -   ggplot2 es un paquete de R que implementa la «Grammar of Graphics» como enfoque para visualizar datos de forma eficiente. Usar ggplot2 tiene una curva de aprendizaje conceptual, así que este tutorial recorre algunos de los distintos tipos de gráficos y muestra cómo se hacen.

-   [[Ajustar los gráficos a calidad de publicación|FeaturesTutorialPlotTuning]]
    -   Este tutorial es una mezcla de consejos técnicos y artísticos para afinar los gráficos del análisis de features.

<!--- END_INTERNAL -->

##Véase también

* [[Features reporter overview]]: la página de inicio de FeaturesReporters
* [[FeatureReporters]]: lista de FeatureReporters implementados
* [[Página de inicio de RosettaScripts|RosettaScripts]]
* [[RosettaScripts database connection options]]
* [[Database IO]]: entrada/salida a bases de datos usando Rosetta
* [[Rosetta Database Output Tutorial]]
* [[SQLite3 Interface]]: información específica sobre el uso de SQLite3 con Rosetta
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con bases de datos
* [[Database options]]: opciones de línea de comandos relacionadas con bases de datos