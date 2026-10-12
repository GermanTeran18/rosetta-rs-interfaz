#Generación de modelos
Esta página describe cómo generar archivos de modelos para el protocolo SEWING antiguo. Para el protocolo SEWING nuevo, visita la página [[Generación de archivos de segmentos|Segment File Generation]].


Primero necesitamos generar un conjunto de modelos. El único mecanismo compatible actualmente para generar modelos es el uso de una [[base de datos de características|FeaturesTutorials]]. 

----------------------

###Construcción de la base de datos de características
La siguiente etiqueta ReportToDB contiene el conjunto mínimo de características.

```xml
<MOVERS>
<ReportToDB name=features database_name=scores.db3>
    <ResidueFeatures />
    <PoseConformationFeatures />
    <ResidueConformationFeatures />
    <ProteinResidueConformationFeatures />
    <ResidueSecondaryStructureFeatures />
    <SecondaryStructureSegmentFeatures />
    <SmotifFeatures />
</ReportToDB>
</MOVERS>
```

Un ejemplo de línea de comandos para generar la «base de datos de características» que se usará para generar los archivos de modelos:
```
/path/to/rosetta/bin/rosetta_scripts.default.linuxgccrelease \
-protocol features.xml \
-dbms:database_name pdb.db3 
```

----------------------

###Generación real de modelos
Después de construir la base de datos de características, generemos modelos reales a partir de esa base de datos. Para ejecutar SEWING, necesitaremos tener estos modelos en el formato de archivo de modelos de SEWING. Para lograrlo, usaremos la [[aplicación SEWING Hasher|SEWING Hasher application]] en modo «generate».

opciones de sewing_hasher para generar modelos
```
-sewing:mode generate           Set to sewing_hasher mode to 'generate' for model generation
-inout:dbms:database_name       The SQL database file to generate models from
-sewing:model_file_name         The name of the model file to be generated
```

Un ejemplo de línea de comandos para generar archivos de modelos:
```
/path/to/rosetta/bin/sewing_hasher.linuxgccrelease \
-sewing:mode generate # it will generate three secondary structures (smotif)' models \
-database_name pdb.db3 \
-sewing:model_file_name pdb.models
```


----------------------

###ModelTrimmer

A menos que el esqueleto objetivo que se va a diseñar sea aleatorio, [[ModelTrimmer]] debe recortar los modelos dejando solo los relevantes, para acelerar el proceso de comparación de modelos y de ensamblaje y para aumentar la calidad de las estructuras de salida. 

El archivo de modelos generado en la ejecución inicial de sewing_hasher se proporciona como entrada, y el usuario puede filtrar los modelos por la longitud y el tipo de sus elementos de estructura secundaria. Puedes encontrar más información sobre esta aplicación en la página de la aplicación [[ModelTrimmer]].

##Véase también
* [[SEWING]] La página principal de SEWING
* [[SEWING Dictionary]]
* [[Model comparison with geometric hashing]]
