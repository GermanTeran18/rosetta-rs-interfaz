#Cómo configurar R para el benchmark científico de Features
=====================================================

El benchmark científico de Features requiere la versión 2.11 de R o superior.

 Es fácil instalar paquetes desde dentro de R:

        > install.packages("package_name")

 Como alternativa, para instalar todo desde el código fuente, véase más abajo. Para más información, consulta la página [R Installation and Administration](http://cran.r-project.org/doc/manuals/R-admin.html) o el [Comprehensive R Archive Network](https://cran.r-project.org/) .

        cd /tmp
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/base/R-2/R-2.12.1.tar.gz

        tar -xzvf R-2.12.1.tar.gz
        rm R-2.12.1.tar.gz
        cd R-2.12.1

        ./configure --prefix=<path_to_install_dir>
        make
        make check
        make install
        cd ..

        #make sure the newly installed R works and is on the path:
        R --version | grep "R version"


        #useful plotting and analysis packages:
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/Hmisc_3.8-3.tar.gz
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/boot_1.2-43.tar.gz

        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/iterators_1.0.3.tar.gz
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/itertools_0.1-1.tar.gz
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/plyr_1.4.tar.gz
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/reshape_0.8.3.tar.gz

        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/proto_0.3-8.tar.gz
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/RColorBrewer_1.0-2.tar.gz
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/colorspace_1.0-1.tar.gz
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/digest_0.4.2.tar.gz
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/ggplot2_0.8.9.tar.gz

        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/DBI_0.2-5.tar.gz
        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/RSQLite_0.9-4.tar.gz

        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/Design_2.3-0.tar.gz

        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/KernSmooth_2.23-4.tar.gz

        wget http://mirrors.ibiblio.org/pub/mirrors/CRAN/src/contrib/logspline_2.1.3.tar.gz

        #installing in the following order should take care of dependencies
        R CMD INSTALL Hmisc_3.8-3.tar.gz
        R CMD INSTALL boot_1.2-43.tar.gz
        R CMD INSTALL iterators_1.0.3.tar.gz
        R CMD INSTALL itertools_0.1-1.tar.gz
        R CMD INSTALL plyr_1.4.tar.gz
        R CMD INSTALL reshape_0.8.3.tar.gz
        R CMD INSTALL proto_0.3-8.tar.gz
        R CMD INSTALL RColorBrewer_1.0-2.tar.gz
        R CMD INSTALL colorspace_1.0-1.tar.gz
        R CMD INSTALL digest_0.4.2.tar.gz
        R CMD INSTALL ggplot2_0.8.9.tar.gz
        R CMD INSTALL DBI_0.2-5.tar.gz
        R CMD INSTALL RSQLite_0.9-4.tar.gz
        R CMD INSTALL Design_2.3-0.tar.gz
        R CMD INSTALL KernSmooth_2.23-4.tar.gz
        R CMD INSTALL logspline_2.1.3.tar.gz

**Entorno de desarrollo integrado**
--------------------------------------

Me ha gustado usar [RStudio](http://www.rstudio.org/) para hacer análisis de datos con R.


##Véase también

* [[FeaturesRScripts]]: página de inicio de los scripts de R para usar con FeaturesReporter
* [[Features reporter overview]]: la página de inicio de FeaturesReporter
* Tutoriales de R para FeaturesReporters
  * [[FeaturesTutorialRBasics]]
  * [[FeaturesTutorialGGplots2Basics]]
  * [[FeaturesTutorialPlotScript]]
  * [[FeaturesTutorialPlotTuning]]
* [[FeaturesTutorials]]: tutoriales para usar FeaturesReporters
* [[FeatureReporters]]: lista de FeatureReporters implementados
* [[Página de inicio de RosettaScripts|RosettaScripts]]
* [[RosettaScripts database connection options]]
* [[Database IO]]: entrada/salida a bases de datos usando Rosetta
* [[Rosetta Database Output Tutorial]]
* [[SQLite3 Interface]]: información específica sobre el uso de SQLite3 con Rosetta
* [[Database support]]: detalles avanzados sobre la interfaz de Rosetta con bases de datos
* [[Database options]]: opciones de línea de comandos relacionadas con bases de datos
