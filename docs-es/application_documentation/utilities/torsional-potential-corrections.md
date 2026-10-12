#Correcciones del potencial torsional

Metadatos
========

Autores: Patrick Conway y Frank DiMaio

Código
====

La aplicación de correcciones del potencial torsional está en Rosetta/main/source/src/apps/public/weight\_optimization/torsional_potential_correction.cc.

Referencias
==========

PT Conway, F DiMaio (2016). Improving hybrid statistical and physical forcefields through local structure enumeration.  _Protein Science._

Propósito
=======

La herramienta está pensada para hacer correcciones al potencial torsional de la cadena lateral de Rosetta, [[fa_dun | score-types]], cancelando las partes de la distribución que ya explican otros términos. Esta herramienta se usó para generar las correcciones de [[talaris2014 | score-types]], que se describen a continuación.

Usar los términos corregidos de talaris2014
=====================================

Las correcciones se han incluido en las versiones más recientes de Rosetta y se accede a ellas proporcionando las opciones:
```
-dun10_dir rotamer/corrections_conway2016 
-score::weights corrections_conway2016.wts
```

O en RosettaScripts:
```
<SCOREFXNS>
    <fa weights=corrections_conway2016\>
</SCOREFXNS>
```

Aplicar correcciones a una función de puntuación personalizada
==============================================

Las correcciones se realizan en un proceso de tres pasos: 1) construir una biblioteca de fragmentos a partir de una gran biblioteca de estructuras; 2) puntuar cada uno de esos fragmentos con una función de puntuación objetivo (para la que se desean las correcciones); 3) aplicar esas correcciones y escribir una nueva biblioteca torsional de cadenas laterales. La aplicación realiza los tres pasos, y la opción **-mode** especifica cuál se desea.

### 1) construir una biblioteca de fragmentos a partir de una gran biblioteca de estructuras

El siguiente comando realiza este paso:
```
$ROSHOME/source/bin/torsional_potential_corrections.default.linuxgccrelease \
    -mode makefrags \
    -fragfile fragments.out \
    -l infilelist \
    -cluster_radius 0.1 \
    -ignore_unrecognized_res
```

Entradas:

**-l infilelist**

Una lista de archivos PDB de los que tomar fragmentos. Para las correcciones de talaris2014 se usó el conjunto Richardson 8000.

**-cluster_radius 0.1**

El radio de clúster para el agrupamiento de fragmentos.

Salidas:

**-fragfile fragments.out**

Un silent file que contiene los fragmentos individuales (para usarlo como entrada en los pasos siguientes).

### 2) puntuar estos fragmentos con la función de puntuación objetivo

```
$ROSHOME/source/bin/torsional_potential_corrections.default.linuxgccrelease \
   -mode calcscores \
   -fragfile fragments.out \
   -scorefile scores.out \
   -rotmin true \
   -score::weights talaris2014.wts
```

Entradas:

**-fragfile fragments.out**

La salida del paso 1

**-rotmin true**

Una opción que determina si se debe aplicar o no la minimización de cada rotámero. Es más lento pero más preciso.

Salidas:

**-scorefile scores.out**

Un archivo de texto que contiene las puntuaciones de cada fragmento (para usarlo como entrada en el último paso).

**Nota:** este paso consume mucho tiempo; se recomienda ejecutarlo en muchos procesadores, generando varias bibliotecas de fragmentos en el primer paso y ejecutando este paso en paralelo sobre las bibliotecas. Los archivos de puntuación resultantes se pueden concatenar después.


### 3) aplicar las correcciones y escribir una nueva biblioteca torsional
```
$ROSHOME/source/bin/torsional_potential_corrections.default.linuxgccrelease  \
    -mode correctdun \
    -scorefile scores.out \
    -smoothing 10 \
    -cap 3.0 \
    -scale 0.65
```

Entradas:

**-scorefile scores.out**

El archivo de puntuaciones del paso anterior.

**-smoothing 10**

Cuánto suavizar las correcciones (grados)

**-cap 3.0**

El tope de magnitud de energía de las correcciones.

**-scale 0.65**

Escala las correcciones resultantes por 1/(este valor).

Salidas:

Un conjunto de bibliotecas de rotámeros con las correcciones aplicadas. Se pueden colocar en una carpeta de la base de datos y especificarlas con la opción -dun10_dir (las bibliotecas que no dependen de la cadena principal hay que copiarlas de database/rotamer/ExtendedOpt1-5).

**Nota:** los valores de -smoothing, -cap y -scale son muy específicos de la función de puntuación concreta que se está corrigiendo. Los valores mostrados se usaron para corregir talaris2014 y probablemente sean un buen punto de partida para otras optimizaciones. Aun así, es importante explorar un poco estos parámetros al aplicarlo a una nueva función de energía.
 
## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
