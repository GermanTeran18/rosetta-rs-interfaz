#Tutorial de Features: ejecutar el análisis de features

Comparar fuentes de muestras toma una o más bases de datos de features y un conjunto de scripts de análisis, y genera gráficos y estadísticas.

Comparar fuentes de muestras
==============================

El script `compare_sample_sources.R` (ubicado en `rosetta/main/tests/features/`) ejecuta scripts de análisis de features sobre bases de datos de features. Recibe como entrada:

-   Rutas a una o más bases de datos de features como *sample\_sources*
-   Uno o más scripts de análisis
-   Un directorio de salida y formatos de salida
-   Otras opciones

Luego pasa esta información de configuración a cada script de análisis. Normalmente el script de análisis generará los gráficos y las estadísticas en

        path_to_output_dir/<sample_source1>[_<sample_source2>[_...]]/<output_format>/

Hay varias formas de ejecutar `compare_sample_sources.R` , que se describen a continuación. Si más adelante se te olvidan, prueba

       compare_sample_sources.R --help


Ejecutar un script cada vez
------------------------

Para ejecutar un solo script de análisis sobre una o más bases de datos,

       cd project/features
       path/to/rosetta/main/tests/features/compare_sample_sources.R [OPTIONS] --script <analysis_script.R> path/to/features_<ss_id1>.db3 [path/to/features_<ss_id2>.db3 [...]]

Nota:

-   La ruta de búsqueda de `--script` es `[".", "path/to/rosetta/main/tests/features"]` .
-   Esto generará los resultados en `project/features/build/`
-   Esto generará `project/features/compare_sample_sources_iscript.R` . En una sesión interactiva de R,

<!-- -->

        >source("compare_sample_sources_iscript.R")

devolverá el script y te permitirá seguir con un análisis interactivo.

Ejecutar un archivo de configuración
------------------------

Para ejecutar uno o más análisis de features con un archivo de configuración JSON:

       cd project/features
       path/to/rosetta/main/tests/features/compare_sample_sources.R --config analysis_configurations/<features_analysis>.json

Las ventajas de ejecutar `compare_sample_source.R` desde un script de configuración incluyen:

-   la línea de comandos para ejecutar un análisis de features puede ser larga y complicada, mientras que en el archivo de configuración .json tiene una disposición más limpia, lo que facilita compartirla y volver a ejecutarla.
-   Es posible ejecutar varios análisis de features a la vez.
-   Puedes dar a las sample\_sources nombres más descriptivos que los nombres de la base de datos. Esto es importante porque acaban en las leyendas de los gráficos, etc.
-   Puedes pasar parámetros adicionales a los scripts de análisis para hacer gráficos más estructurados, etc.

El formato de la configuración del análisis usa el formato [`.json`](http://www.json.org/), que son básicamente diccionarios y listas de Python anidados con números y cadenas como hojas. Muchos lectores de texto y lenguajes de programación pueden entender archivos JSON (p. ej., python, subl, PyCharm). Este es un script de ejemplo que sirvió para generar la figura 3 del artículo [Rosetta Scientific Benchmarking](http://contador.med.unc.edu/features/paper/features_optE_methenz_120710.pdf):

    {  
        "output_dir" : "build/general_analysis",  
        "sample_source_comparisons" : [  
            {  
                "sample_sources" : [  
                    {  
                        "database_path" : "/home/momeara/scr2/data/sp2_8b/top8000_sp2_r47244_120205/features_top8000_sp2_r47244_120205.db3",  
                        "id" : "Native",  
                        "reference" : true  
                    },  
                    {  
                        "database_path" : "/home/momeara/scr2/dun10_vs_bicubic/top8000_relax_r46440_111213/features_top8000_relax_r46440_111213.db3",  
                        "id" : "Relaxed Native Score12",  
                        "reference" : false,  
                        "model" : "Score12"  
                    },  
                    {  
                        "database_path" : "/home/momeara/scr2/data/sp2_no_lj_correction/top8000_relax_sp2_no_lj_correction_r48561_120518/features_top8000_relax_sp2_no_lj_correction_r48561_120518.db3",  
                        "id" : "Relaxed Native NewHB",  
                        "reference" : false,  
                        "model" : "NewHB"  
                    },  
                    {  
                        "database_path" : "/home/momeara/scr2/data/sp2_8b/top8000_relax_sp2_r47244_120205/features_top8000_relax_sp2_r47244_120205.db3",  
                        "id" : "Relaxed Native NewHB LJcorr",  
                        "reference" : false,  
                        "model" : "NewHB"  
                    }  
                ],  
                "analysis_scripts" : [  
                    "scripts/analysis/plots/hbonds/hydroxyl_sites/OHdonor_AHdist.R"  
                ],  
                "output_formats" : [  
                    "output_small_eps"  
                ]  
            }  
        ]  
    }  

Notas:
 
-   En el bloque `sample_sources`, `database_path` e `id` son las únicas etiquetas obligatorias. Las etiquetas adicionales se pasan al script de análisis como columnas del parámetro `sample_sources` de la función `run`.
-   `analysis scripts` , `output_dir` y `output_formats` se interpretan igual que si estuvieran en la línea de comandos.
-   Esto también genera un `compare_sample_sources_iscript.R`


Estructura de directorios sugerida
--------------------------

Cuando uso una base de datos de features sqlite3, me gusta configurar la siguiente estructura de directorios. (Nota: genero los directorios sample\_source como resultado de una ejecución en clúster usando `rosetta/main/tests/features/features.py` y las plantillas de `rosetta/main/tests/features/sample_sources/`. Esto se describe en detalle [[aquí|FeaturesTutorialRunSciBench]].)

        project/
           sample_source_id1_r#######_YYMMDD/                   #e.g. Top8000
               features_sample_source_id1_r#######_YYMMDD.db3   #experimental, X-ray 
               features.xml
               flags
               <log_files>
           sample_source_id2_r#######_YYMMDD/                   #e.g. Top8000_relax
               features_sample_source_id2_r#######_YYMMDD.db3   #relaxed natives
               features.xml
               flags
               <log_files>
           sample_source_id3_r#######_YYMMDD/                   #e.g. Top8000_relax_new
               features_sample_source_id3_r#######_YYMMDD.db3   #relaxed_natives with
               features.xml                                     #alternative score function
               flags
               <log_files>
           features/                                            #run compare_sample_sources.R from here
               compare_sample_sources_iscript.R                 #autogenerated to re-run interactively
               analysis_configurations/
                    feature_analysis1.json                      #These are passed in
                    feature_analysis2.json                      #with the --config flag
                    feature_analysis3.json
               build/
                     sample_source_id1_sample_source_id2_sample_source_id3/
                           analysis_script_id1/
                                output_pdf_huge/
                                    <plots.pdf>
                                output_pdf_print/
                                    <plots.pdf>
                                ...
                           analysis_script_id2/
                                ...

Notas y reflexiones sobre la estructura de directorios:

-   Mantener las bases de datos y el análisis de datos en un directorio `    project   ` ayuda a mantener la separación cuando se hacen distintos proyectos o iteraciones importantes del proyecto, y lo mantiene separado del código base de `rosetta`. ¡Es mucho más fácil preparar commits y actualizar revisiones si tu espacio de trabajo no está mezclado! Y cuando lo dejas en buen estado, es más fácil empaquetarlo y compartirlo con colaboradores, publicarlo, etc.
-   Mantener los archivos `flags` , `features.xml` y de registro junto con la base de datos de features facilita recordar cómo se generó y volver a ejecutarla en caso de que haya que actualizarla.
-   Incluir el número de revisión SVN/GIT y la fecha de ejecución en el nombre de la base de datos ayuda a no extraviar ni usar la base de datos de features equivocada. El formato del código de fecha es un truco que aprendí de Jack Snoeyink para que ordenar los archivos lexicográficamente también los ordene por fecha.
-   Mantener juntos los `analysis_configurations` facilita compartir y volver a ejecutar los scripts de análisis.
-   La estructura del directorio de salida de build la genera compare\_sample\_sources.R. Preferiría que, en lugar de tener cada gráfico o dato estadístico en una estructura de directorios, se pudiera etiquetar con diversa metainformación. Probé a poner los gráficos en una base de datos SQLite3 y a generar automáticamente páginas web navegables, pero explorar archivos y Preview es difícil de superar. Parte del desafío es que las versiones vectoriales de los gráficos son mucho más nítidas cuando hay muchos datos en una página, pero los archivos pueden hacerse grandes, especialmente en los diagramas de dispersión. Si alguien tiene ideas para resolver el problema de la navegación de gráficos, yo (Matt O'Meara) estaría interesado en escucharlas.

