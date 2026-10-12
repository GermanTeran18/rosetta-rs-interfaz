NonlocalAbinitio 
================

Formato de archivo
-----------

### Visión general

El conocimiento previo sobre la estructura de una proteína se transmite al
protocolo NonlocalAbinitio representando esa información
de forma jerárquica en un archivo de texto estructurado (a menudo llamado
*archivo de apareamientos*). Conceptualmente, un archivo de apareamientos consta de 3 tipos de
entidades: *NLGrouping*, *NLFragmentGroup* y *NLFragment*.
Los veremos en orden inverso.

Los *NLFragment* contienen información estructural sobre un solo residuo de
una proteína. Esta información incluye el número de residuo, los ángulos de torsión
de la cadena principal y las coordenadas cartesianas del átomo Cα del residuo. Las entradas
están separadas por comas y pueden tener espacios en blanco al principio y al final.
Representado en la [forma de Backus-Naur](http://en.wikipedia.org/wiki/Backus%E2%80%93Naur_Form):

    <NLFragment> ::= <residue> "," <phi> "," <psi> "," <omega> "," <CA x> "," <CA y> "," <CA z> <EOL>

Los *NLFragment* que pertenecen a la misma región (por ejemplo, un elemento de estructura
secundaria) se agrupan enumerándolos de forma consecutiva, uno por
línea. Cuando se encuentra una línea en blanco, se inicia un nuevo *NLFragmentGroup*.
Conceptualmente, los *NLFragmentGroup* desempeñan un papel análogo al de la clase
core.fragment.FragData de Rosetta. 
El número de *NLFragment* de cada *NLFragmentGroup* no tiene
por qué ser el mismo.

Del mismo modo que los *NLFragmentGroup* contienen varios
*NLFragment*, los *NLGrouping* contienen varios *NLFragmentGroup*.
Sintácticamente, los *NLGrouping* van entre llaves {}. Para
justificar su uso, considera la siguiente situación. Supón que tenemos un
método predictivo para identificar regiones de una proteína que están en contacto.

### Ejemplo

Para tomar un ejemplo concreto, considera el archivo que se muestra a continuación, que define
un único *NLGrouping* que contiene 4 *NLFragmentGroup*. Las
correspondencias entre los *NLFragmentGroup* y las regiones de la proteína se
muestran a continuación.

-   *NLFragmentGroup*~1~ (residuos 2-6) =\> rojo
-   *NLFragmentGroup*~2~ (residuos 49-54) =\> azul
-   *NLFragmentGroup*~3~ (residuos 66-80) =\> naranja
-   *NLFragmentGroup*~4~ (residuos 84-88) =\> amarillo

Un ejemplo que ilustra la correspondencia entre los segmentos del formato de archivo
non-local abinitio y las secciones de la proteína
1a19a.

[[/images/1a19a.png]]


    {
    2,-110.466,126.421,174.600,97.539,49.731,-2.920
    3,-119.756,145.382,-177.458,96.634,51.368,0.388
    4,-132.235,119.796,176.520,95.461,49.639,3.564
    5,-117.492,124.130,177.571,93.691,51.271,6.506
    6,-107.749,99.134,179.550,92.793,49.314,9.639

    49,-143.132,128.827,176.942,94.852,53.324,-6.631
    50,-118.006,112.700,-171.815,93.025,50.630,-4.667
    51,-105.538,117.641,178.295,92.132,51.602,-1.106
    52,-102.343,117.860,179.175,91.170,48.933,1.425
    53,-107.322,91.600,179.354,89.445,50.179,4.575
    54,-71.162,135.072,176.466,89.341,47.329,7.090

    66,-81.450,0.155,-178.645,85.342,62.214,11.149
    67,-84.864,-23.372,-174.554,86.194,59.236,8.944
    68,-73.413,-31.321,178.657,83.172,59.675,6.682
    69,-70.632,-42.954,172.619,84.356,63.044,5.377
    70,-54.791,-54.004,-178.833,87.738,61.605,4.420
    71,-57.600,-35.842,-179.338,86.085,58.712,2.589
    72,-69.881,-27.140,172.866,83.805,61.185,0.815
    73,-67.993,-40.198,171.931,86.903,62.991,-0.438
    74,-67.543,-40.261,175.771,88.036,59.706,-1.968
    75,-63.606,-23.738,-176.963,84.483,59.165,-3.205
    76,-85.821,-44.670,174.120,84.733,62.625,-4.760
    77,-55.205,-47.212,172.312,88.076,62.176,-6.508
    78,-51.331,-48.179,179.400,86.652,59.002,-8.032
    79,-56.568,-59.022,-177.892,83.667,61.050,-9.195
    80,-53.290,-31.993,168.475,85.700,63.839,-10.789

    84,-118.247,139.397,171.264,90.253,54.853,-7.446
    85,-118.683,127.693,-173.555,88.952,51.548,-6.102
    86,-116.318,111.870,175.979,87.492,51.458,-2.596
    87,-100.612,112.101,-179.332,87.116,48.184,-0.701
    88,-93.093,77.996,-179.257,85.043,48.589,2.460
    }

### Código

Los tipos de datos definidos arriba se encuentran en
NLFragment.hh, NLFragmentGroup.hh y NLGrouping.hh,
respectivamente. Los *NLGrouping* se pueden construir de dos maneras. Se
pueden leer explícitamente de un archivo con el método estático read() de
NonlocalAbinitioReader.

    #include <protocols/abinitio/NonlocalAbinitioReader.hh>
    ...

    vector1<NLGrouping> groupings;
    NonlocalAbinitioReader::read("test.pairings", &groupings);

Como alternativa, los *NLGrouping* se pueden construir mediante programación. Hay un buen
ejemplo en el archivo protocols/abinitio/util.cc.
Un alineamiento de secuencia (SequenceAlignment)
y un PDB de plantilla se convierten en un conjunto de *NLGrouping* para usarlos
en el protocolo NonlocalAbinitio.

Ejemplos
--------

### Topología estándar

*1a19a.flags (archivo de opciones)*

    -database ~/Rosetta/database

    # target-related options
    -frag3 1a19a/aa1a19a03_05.200_v1_3
    -frag9 1a19a/aa1a19a09_05.200_v1_3
    -fasta 1a19a/1a19a.fasta
    -in:file:native 1a19a/1a19a.pdb

    # non-local abinitio options
    -abinitio:nonlocal_moves 1a19a/1a19a.pairings
    -abinitio:nonlocal_close_chainbreaks

    # chainbreak-related options
    -jumps:ramp_chainbreaks
    -jumps:overlap_chainbreak
    -jumps:increase_chainbreak 0.5

    # sampling options
    -abinitio:skip_convergence_check
    -abinitio:increase_cycles 10
    -abinitio:rg_reweight 0.25

    # output options
    -nstruct 1000
    -out:overwrite
    -out:file:silent silent.out

*1a19a.pairings (archivo de apareamientos)*

    {
    2,-110.466,126.421,174.600,97.539,49.731,-2.920
    3,-119.756,145.382,-177.458,96.634,51.368,0.388
    4,-132.235,119.796,176.520,95.461,49.639,3.564
    5,-117.492,124.130,177.571,93.691,51.271,6.506
    6,-107.749,99.134,179.550,92.793,49.314,9.639

    49,-143.132,128.827,176.942,94.852,53.324,-6.631
    50,-118.006,112.700,-171.815,93.025,50.630,-4.667
    51,-105.538,117.641,178.295,92.132,51.602,-1.106
    52,-102.343,117.860,179.175,91.170,48.933,1.425
    53,-107.322,91.600,179.354,89.445,50.179,4.575
    54,-71.162,135.072,176.466,89.341,47.329,7.090

    84,-118.247,139.397,171.264,90.253,54.853,-7.446
    85,-118.683,127.693,-173.555,88.952,51.548,-6.102
    86,-116.318,111.870,175.979,87.492,51.458,-2.596
    87,-100.612,112.101,-179.332,87.116,48.184,-0.701
    88,-93.093,77.996,-179.257,85.043,48.589,2.460
    }

línea de comando:

    nonlocal_abinitio.linuxgccrelease @1a19a.flags

### Topología en estrella

Se usa sobre todo en modelado comparativo. Mismo archivo de apareamientos que arriba.

*2kwba.flags (archivo de opciones)*

    -database ~/Rosetta/database

    # target-related options
    -frag3 2kwba/cs_frags.3mers
    -frag9 2kwba/cs_frags.9mers
    -fasta 2kwba/2kwba.fasta
    -in:file:native 2kwba/2kwba.pdb

    # non-local abinitio options
    -abinitio:nonlocal_moves 2kwba/2kwba.pairings
    -abinitio:nonlocal_close_chainbreaks
    -abinitio:nonlocal_builder star
    -abinitio:nonlocal_randomize_missing

    # chainbreak-related options
    -jumps:ramp_chainbreaks
    -jumps:overlap_chainbreak
    -jumps:increase_chainbreak 0.5

    # sampling options
    -abinitio:skip_convergence_check
    -abinitio:increase_cycles 10
    -abinitio:rg_reweight 0.25

    # output options
    -nstruct 1000
    -out:overwrite
    -out:file:silent silent.out

##Véase también

* [[Structure prediction applications]]: Una lista de otras aplicaciones que se usan para predecir estructuras
  * [[Abinitio-relax]]: Aplicación para predecir estructuras de proteínas usando solo información de secuencia
    * [[Más detalles sobre la aplicación abinitio-relax|abinitio]]
  * [[Membrane abinitio]]: Ab initio para proteínas de membrana.  
  - [[Modelado comparativo|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado (usa la aplicación minirosetta).
    * [[Minirosetta]]: Más información sobre la aplicación minirosetta.
  * [[Metalloprotein ab initio|metalloprotein-abrelax]]: Modelado ab initio de metaloproteínas.  
  - [[Backrub]]: Crea conjuntos de cadenas principales mediante cambios pequeños y locales de la cadena principal.  
  - [[Modelado comparativo|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado.  
  - [[Floppy tail]]: Predice estructuras de regiones N-terminales o C-terminales largas y flexibles.
  - [[Fold-and-dock]]: Predice estructuras tridimensionales de homooligómeros simétricos.  
  - [[Protocolos de reemplazo molecular|mr-protocols]]: Usa Rosetta para construir modelos para el reemplazo molecular en cristalografía de rayos X.  
    * [[Prepare template for MR]]: Script de preparación para los protocolos de reemplazo molecular.  
  - [[Relax]]: Optimiza "localmente" las estructuras, incluida la asignación de las posiciones de las cadenas laterales.
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta
