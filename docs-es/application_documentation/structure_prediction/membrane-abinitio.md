#Membrane Abinitio

Metadatos
========

Autor: Vladimir Yarov-Yarovoy

Este documento fue actualizado por última vez el 17 de julio de 2012 por Vladimir Yarov-Yarovoy (yarovoy@ucdavis.edu) . La aplicación membrane ab initio fue desarrollada en el grupo de David Baker (dabaker@uw.edu) por:

-   Jack Schonbrun
-   Vladimir Yarov-Yarovoy
-   Patrick Barth
-   Bjorn Wallner

Código y demo
=============

El ejecutable membrane ab initio está en src/apps/public/membrane\_abinitio/membrane\_abinitio2.cc. Consulta el directorio /rosetta/main/tests/integration/tests/membrane\_abinitio para ver un ejemplo de ejecución de membrane ab initio y de sus archivos de entrada.

Referencias
==========

-   Barth P, Wallner B, Baker D. (2009 Feb 3) Prediction of membrane protein structures with complex topologies using limited constraints. Proc Natl Acad Sci U S A. 106(5):1409-14.
-   Barth P, Schonbrun J, Baker D. (2007 Oct 2) Toward high-resolution prediction and design of transmembrane helical protein structures. Proc Natl Acad Sci U S A. 104(40):15682-7.
-   Yarov-Yarovoy V, Schonbrun J, Baker D. (2006 Mar 1) Multipass membrane protein structure prediction using Rosetta. Proteins. 62(4):1010-25.

Propósito de la aplicación
===========================================

Este protocolo se desarrolló para predecir estructuras de proteínas de membrana helicoidales.

Algoritmo
=========

Este protocolo solo generará modelos centroid de baja resolución. El protocolo usa predicciones de regiones transmembrana del servidor OCTOPUS ( [http://octopus.cbr.su.se/](http://octopus.cbr.su.se/) ) para fijar los vectores iniciales de la normal de la membrana y del centro de la membrana, y para definir el entorno específico de la membrana (núcleo hidrofóbico, interfaz, capas polar y de agua). En el caso de proteínas de membrana helicoidales de varios pasos, el protocolo comienza insertando solo dos regiones helicoidales transmembrana adyacentes elegidas al azar y continúa el plegamiento insertando una de las hélices adyacentes, hasta que todas las hélices transmembrana estén insertadas en la membrana.

Archivos de entrada
===========

1.  Generar fragmentos de estructura:

    Programas necesarios para ejecutarlo: generación de fragmentos; hay información en [[fragment file]].

    Nota: usa solo el archivo de predicción de estructura secundaria SAM (\*.rdb); jufo y psipred predicen mal las regiones helicoidales transmembrana.

    Comando de ejemplo:

    ```
    make_fragments.pl -verbose -id BRD4 BRD4_.fasta -nojufo -nopsipred
    ```

2.  Generar el archivo de regiones transmembrana (OCTOPUS):

    El archivo de topología OCTOPUS de entrada se genera en [http://octopus.cbr.su.se/](http://octopus.cbr.su.se/) usando la secuencia de la proteína como entrada.

    Archivo de topología OCTOPUS de ejemplo:

    ```
    ##############################################################################
    OCTOPUS result file
    Generated from http://octopus.cbr.su.se/ at 2008-09-18 21:06:32
    Total request time: 6.69 seconds.
    ##############################################################################

    Sequence name: BRD4
    Sequence length: 123 aa.
    Sequence:
    PIYWARYADWLFTTPLLLLDLALLVDADQGTILALVGADGIMIGTGLVGALTKVYSYRFV
    WWAISTAAMLYILYVLFFGFTSKAESMRPEVASTFKVLRNVTVVLWSAYPVVWLIGSEGA
    GIV

    OCTOPUS predicted topology:
    oooooMMMMMMMMMMMMMMMMMMMMMiiiiMMMMMMMMMMMMMMMMMMMMMooooooMMM
    MMMMMMMMMMMMMMMMMMiiiiiiiiiiiiiiiiiiiiiMMMMMMMMMMMMMMMMMMMMM
    ooo
    ```

3.  Convertir el archivo OCTOPUS al formato de archivo .span:

    BRD4.span: archivo de predicción de topología transmembrana generado con el script octopus2span.pl de la siguiente manera:

    `octopus2span.pl <OCTOPUS topology file>`

    Comando de ejemplo: `<path to rosetta>/rosetta/main/source/src/apps/public/membrane_abinitio/octopus2span.pl BRD4.octopus`

    Archivo .span de ejemplo:

    ```
    TM region prediction for BRD4 predicted using OCTOPUS
    4 123
    antiparallel
    n2c
       6    26     6    26
      31    51    31    51
      58    78    58    78
      97   117    97   117
    ```

    La 1.ª línea es una línea de comentario. La 2.ª línea muestra el número de hélices transmembrana predichas (4 en el ejemplo de líneas de comando de abajo) y el número total de residuos (123 en el ejemplo de abajo). La 3.ª línea muestra la topología predicha de las hélices transmembrana en la membrana (actualmente solo está implementada la topología antiparalela). La 4.ª línea y todas las siguientes muestran los números de residuo inicial y final de cada una de las hélices transmembrana predichas (el formato actual repite estos números dos veces).

4.  Generar el archivo .lips4.

    BRD4.lips4: archivo de predicción de lipofilicidad creado con el script run\_lips.pl de la siguiente manera (ten en cuenta que para ejecutar el script run\_lips.pl se necesitan blastpgp y la base de datos nr)

    ```
    run_lips.pl <fasta file> <span file> <path to blastpgp> <path to nr database> <path to alignblast.pl script>
    ```

    Comando de ejemplo:

    ```
     <path to mini>/mini/src/apps/public/membrane_abinitio/run_lips.pl BRD4.fasta BRD4.span /work/bjornw/Apps/blast/bin/blastpgp /scratch/shared/genomes/nr ~bjornw/mini/src/apps/public/membrane_abinitio/alignblast.pl
    ```

    Archivo lips4 de ejemplo:

    ```
    Lipid exposed data: resnum mean-lipo lipophil entropy
          6  -1.000   3.004   1.211
          9  -1.000   2.268   2.137
         10  -1.000   4.862   1.095
         13  -1.000   1.304   1.552
         16  -1.000   3.328   2.025
    ...
    ```

Opciones
=======

Ejecuta la aplicación membrane ab initio con las siguientes opciones:

```
./bin/membrane_abinitio2.linuxgccrelease
-in:file:native BRD4.pdb                  Native structure (optional)
(or -in:file:fasta BRD4_.fasta)           Protein sequence in fasta format (required if native structure is not provided)
-in:file:spanfile BRD4.span               Octopus transmembrane prediction (see above)
-in:file:lipofile BRD4.lips4              Lipophilicity prediction (see above)
-in:file:frag3 aaBRD4_03_05.200_v1_3      3-residue fragments
-in:file:frag9 aaBRD4_09_05.200_v1_3      9-residue fragments
-in:path:database /path/to/rosetta/main/database       Path to rosetta database
-abinitio:membrane                        Membrane ab initio application
-score:find_neighbors_3dgrid              Use a 3D lookup table for residue neighbors calculations
-membrane:no_interpolate_Mpair            Switch off the interpolation between the two layers for the Mpair term
-membrane:Menv_penalties                  Switch on the following penalties:

    * no non-helical secondary structure fragments in predicted transmembrane helical regions in the hydrophobic layer of the membrane.
    * no N- and C- termini residues of predicted transmembrane helical regions in the hydrophobic layer of the membrane.
    * no transmembrane helices with orientation >45 degrees relative to the membrane normal vector.

-nstruct 1                                Number of output structures
```

Puedes elegir entre usar Monte Carlo (por defecto) o una búsqueda discreta de la normal de la membrana y del centro de la membrana.

Ajustes opcionales usados en el protocolo de búsqueda de la normal y el centro de la membrana basado en Monte Carlo:

```
-membrane:normal_cycles (default=100)     Total number of membrane normal cycles
-membrane:normal_mag (default=5)          Magnitude of membrane normal angle search step size (degrees)
-membrane:center_mag (default=1)          Magnitude of membrane center search step size (Angstroms)
```

Consejo: para acelerar la búsqueda de la normal y el centro de la membrana basada en Monte Carlo, usa los siguientes ajustes:

```
-membrane:normal_cycles 40
-membrane:normal_mag 15
-membrane:center_mag 2
```

Ajustes opcionales para la alternativa, la búsqueda discreta de la normal y el centro de la membrana:

```
-membrane:center_search (default= false) - perform membrane center search within "center_max_delta" deviation (see below).
-membrane:normal_search (default= false) - perform membrane normal search with normal_start_angle, normal_delta_angle, and normal_max_angle values (see below).
-membrane:center_max_delta (default= 5 A) - magnitude of maximum membrane width deviation during membrane center search (Angstroms).
-membrane:normal_start_angle (default= 10 degrees) - magnitude of starting angle during membrane normal search (degrees).
-membrane:normal_delta_angle (default= 10 degrees) - magnitude of angle deviation during membrane normal search (degrees).
-membrane:normal_max_angle (default= 40 degrees) - magnitude of maximum angle deviation during membrane normal search (degrees).
```

Salidas esperadas
================

Convierte la salida del silent file en un archivo pdb con la aplicación score de la siguiente manera:

```
~bin/score.macosgccrelease \
-in:file:native BRD4.pdb \
-in:file:centroid_rosetta_inputs/ \
-in:file:silent BRD4_silent.out \
-in:file:silent_struct_type binary \
-in:file:spanfile BRD4.span \
-in:file:lipofile BRD4.lips4 \
-membrane:no_interpolate_Mpair \
-membrane:Menv_penalties \
-score:find_neighbors_3dgrid \
-score:weights score_membrane.wts \
-out:nstruct 1 \
-database /path/to/rosetta/main/database \
-out:output \
-nstruct 1
```

Las salidas de puntuación específicas de la aplicación membrane ab initio en el archivo de puntuaciones de salida son:

```
Mpair                         membrane pairwise residue interaction energy
Menv                          membrane residue environment energy
Mcbeta                        membrane residue centroid density energy
Mlipo                         membrane residue lipophilicity energy
Menv_hbond                    membrane non-helical secondary structure in the hydrophobic layer penalty
Menv_termini                  membrane N- and C-temini residue in the hydrophobic layer penalty
Menv_tm_proj                  transmembrane helix projection penalty
```

Posprocesamiento
===============

Genera al menos 10,000 modelos y luego usa la aplicación Cluster de Rosetta para identificar las conformaciones muestreadas con más frecuencia. En el caso general, al menos uno de los 5-10 primeros clústeres tendrá modelos con el rmsd más bajo respecto a la estructura nativa.

¡Buena suerte :)!
