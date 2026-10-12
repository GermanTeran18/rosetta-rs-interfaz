#Modelado de anticuerpos de camélidos

Metadatos
========

Autores: Aroop Sircar y Sergey Lyskov

Última edición: 20/7/2011. Investigador principal correspondiente: Jeffrey Gray (jgray@jhu.edu).

Novedades
======

Desde junio de 2019, los anticuerpos de camélidos se pueden modelar con el [[protocolo por defecto|antibody-protocol]].

Código y demostración
=============

-   Código fuente de la aplicación: `        rosetta/rosetta_source/src/apps/public/antibody/antibody_mode.cc       `
-   Código fuente del mover principal: `        rosetta/rosetta_source/src/protocols/antibody/AntibodyModeler.hh       `
-   Para ver demostraciones de algunos casos de uso distintos, consulta las pruebas de integración ubicadas en `        rosetta/rosetta_tests/integration/tests/antibody*       ` .

Para ejecutar el modelador de anticuerpos, haz lo siguiente:

```
1. Checkout antibody directrory.
2. Change ~/antibody/scripts/rampaths.txt to set the paths to
   match your directory structure
3. Copy the following files to directory where simulation will be run:
     i.  ~/antibody/scripts/rampaths.txt
     ii. ~/antibody/scripts/utilities.txt
4. Have the following files ready for input in the simulation directory:
     i.  query_l.fasta: sequence of light chain (not required for camelid VHH antibody)
     ii. query_h.fasta: sequence of heavy chain
         Note: The fasta files should conform to the following format:
         a. The header line with > should not be there
         b. There should not be any hyphens for breaks
         c. There should not be any newline charchter - all on one line
5. Make sure that Profit is installed on your system and it is set up
   such that it can be called from any subfolder by typing "profit".
6. Change the paths.txt in  ~/antibody/scripts/paths.txt
   such that in all cases it points to your local copy of the
   rosetta_database directory
7. Change the hardcoded paths in the file ~/antibody/scripts/ram_blankcdrs.pl
   They should point to two files located in ~/antibody/scripts/. Make
   sure that the full absolute paths (non-relative) are provided. For
   some strange reason incorporating rampaths.txt does not work here,
   more details are provided in ram_blankcdrs.pl
8. Change the hardcoded paths in the following file to match your directory
   structure:
   ~/antibody/scripts/get_top10_scoring.pl
9. Also ensure that you have the most updated version of the rosetta_database
   directory
10. Change paths for sam/jufo/blosum etc in the following file:
    ~antibody/scripts/make_rosetta_fragments.pl
11.In the folder in which simulations will be run,which already contains:
         i.   rampaths.txt
     ii.  utilities.txt
     iii. query_l.fasta (not present for camelid VHH antibody)
     iv.  quary_h.fasta
     Launch the following command for classical antibody:
     perl -P ~/antibody/scripts/ram_buildloop_wrapper.pl pdb1xyz_chothia.pdb bit 1 1 1 1 1 1 1 2000 query_l.fasta query_h.fasta
     Launch the following command for camelid VHH antibody:
     perl -P ~/antibody/scripts/ram_buildloop_wrapper.pl pdb1xyz_chothia.pdb bit 1 1 1 1 1 1 1 2000 query_l.fasta query_h.fasta camelid
12.The simulations folder will have a new directory named "build". Some of the
   important files in the directory are:
     i.   FR02.pdb: The framework region with the non-H3 CDRs grafted in
     ii.  H3_CTERM: Fragment files for the CDR H3 base region
     iii. aaFR02_03_05.200_v1_3: 3-mer fragment file for the H3 loop region with antibody fragments appended
     iv.  aaFR02_09_05.200_v1_3: 9-mer standard rosetta fragment
         v.   lfr.pdb: light chain template from which light chain of FR02.pdb has been obtained (not present for camelid VHH antibody)
     vi.  hfr.pdb: heavy chain template from which heavy chain of FR02.pdb has been obtained
     vii. 1xyz_build_loops.con: The condor script file containing headers. This is used for launching jobs on the cluster using the command: "condor_submit 1xyz_build_loops.con"
         viii.1xyz_build_loops.bash: This is called by the .con file (above) and contains the actual rosetta command line needed for launching a job with 2000 decoys.
13.Post processing: In the directory one level above the "build" directory launch the script:
   ~/antibody/scripts/get_top10_scoring.pl
   The top ten models are outputted: model1.pdb.....model10.pdb
   The processed scorefile void of any redundancies and containing
   decoys which do not have broken CDR H3s is also outputted as:
   aaFR02_unbroken.fasc

After all the scripts and supporting files are in place untar the
"camelid_example.tgz" file. A description of the key files in tar
archieve is provided in input_files_section

Make sure that camelid.bash and rampaths.txt are modified to match
your paths. You should have completed this already if you have read
"antibody_readme.txt" in the "antibody" directory. You can merely copy
the rampaths.txt from "antibody/scripts/rampaths.txt" to overwrite
this local copy.

Once you have modified the "camelid.bash", after the run finishes,
you should have a build directory.

Finally, on execution of the "1xyz_build_loops.bash" script, we
actually generate the final homology models. We generally build 2000
of this (in this example, we build just one) and choose the top ten.
```

Referencias
==========

Para el modelado de anticuerpos VHH de camélidos: Aroop Sircar, Kayode A. Sanni, Jiye Shi & Jeffrey J. Gray, "Analysis and Modeling of the Variable Region of Camelid Single Domain Antibodies," J. Immunology, 186(11), 6357-6367 (2011).

Para el modelado de Fv clásicos: Arvind Sivasubramanian\*, Aroop Sircar\*, Sidhartha Chaudhury & Jeffrey J. Gray, "Toward high-resolution homology modeling of antibody Fv regions and application to antibody-antigen docking," Proteins: Structure, Function and Bioinformatics, 74(2), 497-514 (2009).

Propósito de la aplicación
===========================================

Crear modelos por homología de alta resolución de VHH de cAb. La escasez de estructuras de VHH de cAb, junto con la dependencia del modelado por homología para el diseño computacional de anticuerpos humanizados para la producción de al menos 11 anticuerpos clásicos comercializados, entre ellos Herceptin (trastuzumab o anti-HER2 humanizado), Zenapax (daclizumab o anti-Tac humanizado) y Avastin (bevacizumab o anti-factor de crecimiento endotelial vascular humanizado), pone de relieve la necesidad de una herramienta de modelado por homología de alta resolución de VHH de cAb.

Algoritmo
=========

El protocolo de modelado por homología sigue a RosettaAntibody para crear modelos así: 1) identifica plantillas homólogas del marco y de los loops en la base de datos de RosettaAntibody mediante la puntuación de bits máxima de la herramienta básica de búsqueda de alineamiento local (BLAST), 2) injerta las plantillas de CDR en el marco, 3) construye el loop CDR H3 y 4) refina globalmente el paratopo. Se destacan las principales diferencias respecto del protocolo estándar de RosettaAntibody. Las estructuras de VHH de cAb se añadieron a la base de datos de Ab de RosettaAntibody. De forma similar a la biblioteca de fragmentos C-terminales de cuatro residuos del CDR H3 usada para modelar loops CDR H3 en Ab VH, creamos una biblioteca de fragmentos C-terminales de seis residuos del CDR H3 específica de cAb. Los fragmentos de seis residuos se han clasificado como «estirados» o «retorcidos», y los que no se pudieron clasificar se denominan «neutros». La identificación de plantillas es similar a la de RosettaAntibody. Como no hay cadena ligera, se omiten las plantillas del marco y de los CDR de la cadena ligera, y el ensamblaje VL–VH es innecesario. Tras identificar correctamente las plantillas respectivas, los CDR se injertan en el marco como se describió antes. Las conformaciones de las cadenas laterales del loop injertado y de los residuos vecinos se optimizan mediante empaquetado de rotámeros. En unos pocos casos, el injerto crea un loop roto por desviaciones del marco [también observadas en unos pocos casos en Ab canónicos enviados al servidor de RosettaAntibody]. Cuando el injerto rompe los loops, estos se reparan con un refinamiento mínimo que usa una combinación de movimientos small, shear y de descenso de coordenadas cíclico, con empaquetado de cadenas laterales, siguiendo el refinamiento de alta resolución del loop CDR H3 de RosettaAntibody, sin minimización de cadenas laterales. El algoritmo de modelado de loops sigue el del protocolo de RosettaAntibody, compuesto por 1) una etapa de Monte Carlo de baja resolución con representación de cadenas laterales por pseudoátomos centroid, en la que se muestrean diversas conformaciones del loop mediante grandes perturbaciones por inserción de fragmentos (incluidos los fragmentos estirado-retorcido y retorcido), y 2) una etapa de alta resolución de Monte Carlo más minimización con todos los átomos, en la que se optimizan todas las conformaciones de las cadenas laterales y se perturban mínimamente los ángulos diedros de la cadena principal del loop para aliviar los choques estéricos. Para modelar dominios VHH de cAb con loops CDR H3 extremadamente largos y con la mayor diversidad de loops CDR H1, el protocolo de RosettaAntibody se mejoró de la siguiente manera. Se añaden dos términos de potencial armónico acotado a la función de puntuación. La primera restricción impone el enlace disulfuro si hay cistinas en los loops CDR H1 y H3. La segunda garantiza que las estructuras estirado-retorcido se plieguen de modo que el residuo n-5 del CDR H3 esté cerca del residuo 46 del marco de la cadena pesada. El término penaliza las desviaciones de las características estructurales observadas durante la búsqueda, pero no se incluye en la discriminación final ni en el ordenamiento de los modelos por homología. De forma similar a RosettaAntibody, el algoritmo inicializa un loop suponiendo longitudes y ángulos de enlace ideales del CDR H3 y ángulos de torsión estirados (Φ = - 150°, Ψ = 150° y ω = 180°). A los seis residuos C-terminales se les asignan ángulos de torsión de la cadena principal de un extremo C-terminal de CDR H3 de cAb, según la clasificación del loop (retorcido, estirado-retorcido o neutro). Para los loops CDR H3 de menos de 16 residuos, el loop se construye con una biblioteca de fragmentos de tres residuos, y los loops más largos se construyen primero con una biblioteca de fragmentos de nueve residuos y después con una de tres residuos. A continuación, un loop CDR H1 se perturba durante 5nH1 ciclos de pasos de baja resolución, cada uno compuesto por max(5, nH1/2) perturbaciones de movimientos small y shear y cierre del loop por descenso de coordenadas cíclico, donde nH1 es la longitud del loop H1. El refinamiento de alta resolución del loop CDR H3 es similar a la etapa de alta resolución de RosettaAntibody y va seguido de un refinamiento similar al de H3 del loop CDR H1. Por último, los ángulos diedros de la cadena principal de todos los loops CDR se optimizan simultáneamente, usando minimización basada en gradiente en los ángulos de torsión de la cadena principal y empaquetado de cadenas laterales en todo el paratopo, pero evidentemente sin optimizar la orientación relativa de las cadenas ligera y pesada. A diferencia de RosettaAntibody, la etapa de alta resolución de la construcción del loop CDR H3 no incluye la minimización de las posiciones de las cadenas laterales, sino que estas se minimizan como etapa final antes de entregar el modelo. En el protocolo estándar, se construyen 5000 modelos de forma independiente para cada objetivo.

Limitaciones
===========

Esta versión no incluye todas las funciones del RosettaAntibody original. Por lo tanto, esta versión no puede modelar regiones variables de anticuerpos clásicos.

Modos
=====

El protocolo se divide en dos etapas. La primera etapa (fase de injerto) consiste en construir un modelo aproximado del VHH incorporando todas las plantillas. La segunda etapa (fase de construcción de loops) consiste en la construcción de loops ab initio del CDR H3, la perturbación explícita del loop CDR H1 y la minimización del CDR H2.

Archivos de entrada
===========

El archivo de entrada contiene la secuencia de aminoácidos del anticuerpo VHH de camélido en formato FASTA. Todos los archivos de apoyo, como los archivos de fragmentos y de plantillas, se crean mediante los scripts de Perl incluidos, usando únicamente el archivo FASTA mencionado.

1. grafting\_input \<directory\> Contiene todos los archivos de secuencias fasta de la consulta. 
    1. camelid.bash Un archivo bash que invoca el script contenedor maestro. El script toma los archivos fasta como entrada y entrega un marco con todo excepto el CDR-H3. También genera los archivos de fragmentos para el modelado de H3. Además, crea el directorio build con un script de condor para construir realmente \<nstruct\> modelos por homología. 
    2. query\_h.fasta Archivo fasta con la secuencia de la cadena pesada 
    4. rampaths.txt Rutas de varios archivos que necesitan los scripts 
    5. utilities.txt Archivo de apoyo 
2. build\_input \<directory\> Contiene los archivos necesarios para modelar el CDR H3. Estos archivos son los archivos de salida generados por "camelid.bash". 
    1. 1xyz\_build\_loops.bash Script de bash que invoca rosetta para modelar realmente los loops CDR-H3. Es la parte del protocolo que más tiempo consume. Por simplicidad, nstruct se fija en 1. Sin embargo, para una ejecución normal debería ser 2000. El archivo creado por "camelid.bash" tiene en realidad nstruct 1. Lo cambié manualmente a 1 para este ejemplo. 
    2. aaFR02\_09\_05.200\_v1\_3 Archivo estándar de fragmentos de 9 residuos de rosetta 
    3. aaFR02\_03\_05.200\_v1\_3 Archivo de fragmentos de 3 residuos de Rosetta con fragmentos de anticuerpos añadidos 
    4. H3\_CTERM Archivo especial de fragmentos que contiene fragmentos de la base de H3 
    5. hfr.pdb Estructura plantilla de la que se obtuvo la cadena pesada de la consulta 
    7. paths.txt Archivo estándar de rutas de rosetta. Asegúrate de que coincida con tus rutas. Una vez más, esto debería estar fijado si has seguido las instrucciones de "antibody\_readme.txt" 
    8.FR02.pdb El archivo de salida de "camelid.bash", que tiene todos los CDR que no son H3 injertados en las regiones del marco. Contiene la región del CDR-H3 con las coordenadas en blanco.

Opciones
=======

Opciones de injerto:

-camelid Informa a RosettaAntibody de que este es un anticuerpo VHH de camélido y no un anticuerpo clásico

-graft\_h1 Injerta el CDR H1 desde el archivo de plantilla h1.pdb

-graft\_h2 Injerta el CDR H2 desde el archivo de plantilla h2.pdb

-graft\_h3 Injerta el CDR H3 desde el archivo de plantilla h3.pdb

Opciones de construcción del loop CDR H3:

-camelid Informa a RosettaAntibody de que este es un anticuerpo VHH de camélido y no un anticuerpo clásico

-constraints::cst\_file \<filename\> Archivo que contiene las restricciones de los potenciales armónicos, p. ej., camelid.cst

-model\_h3 Activa la construcción de loops ab initio para el CDR H3

Consejos
====

ACTUALIZAR LA BASE DE DATOS DE ANTICUERPOS: usa el script: \~/antibody/scripts/update\_RosettaAntibody\_database.pl (sigue las instrucciones del script)

Salidas esperadas
================

3. build\_output \<directory\> Archivos generados por "1xyz\_build\_loops.bash" 
    1. aaFR02\_0001.pdb Decoy de salida con los CDR H1 y H3 construidos ab initio. 
    2. aaFR02.fasc Scorefile con columnas especiales: 
        1. AA\_H3 RMSD global del CDR H3 comparado con la estructura de entrada 
        2. AB\_H1 RMSD global del CDR H1 comparado con la estructura de entrada 
        3. AB\_H2 RMSD global del CDR H2 comparado con la estructura de entrada 
        4. AF\_constraint Puntuación de restricción que premia la formación de disulfuros entre cistinas de los CDR H1 y H3. También premia los contactos atómicos en los CDR H3 estirado-retorcido.

Posprocesamiento
===============

Posprocesamiento del modelador de anticuerpos: en el directorio un nivel por encima del directorio "build", ejecuta el script: \~/antibody/scripts/get\_top10\_scoring.pl. Se entregan los diez mejores modelos: model1.pdb.....model10.pdb. También se entrega el scorefile procesado, sin redundancias y con los decoys que no tienen CDR H3 rotos: aaFR02\_unbroken.fasc

Novedades desde la última versión
=============================

Esta es la versión inicial de este protocolo, así que todo es nuevo.


##Véase también

* [[General Antibody Options and Tips]]
* [[Antibody Applications]]: página principal de las aplicaciones de anticuerpos
    * [[Antibody protocol]]: la aplicación principal de modelado de anticuerpos
    * [[Antibody Python script]]: script de configuración de esta aplicación
    * [[Injerto de loops de CDR|antibody-assemble-cdrs]]: injerta plantillas de CDR de anticuerpos sobre la plantilla del marco para crear un modelo de anticuerpo aproximado.  
    * [[Modelado del CDR H3|antibody-model-CDR-H3]]: determina estructuras de anticuerpos combinando el docking VL-VH y el modelado del loop H3.
    - [[SnugDock | snugdock]]: optimización de la estructura del paratopo durante el docking anticuerpo-antígeno
    * [[Antibody Design Strategy Analysis]]: una herramienta basada en PyRosetta para analizar o comparar estrategias de diseño de anticuerpos.
    * [[CDR Cluster Identification]]: una aplicación que asigna cada CDR de un anticuerpo a clústeres de CDR de North/Dunbrack según la menor distancia de diedros al centro de cada clúster.
     * [[CDR Cluster Constrained Relax]]: una aplicación para relajar CDR usando restricciones armónicas circulares basadas en los clústeres de CDR identificados.
* [[Docking Applications]]: página principal de las aplicaciones de docking
  - [[SnugDock | snugdock]]: optimización de la estructura del paratopo durante el docking anticuerpo-antígeno
  - [[Docking de ligandos|ligand-dock]] (RosettaLigand): determina la estructura de complejos proteína-molécula pequeña.  
    * [[Extract atomtree diffs]]: extrae estructuras del formato de archivo AtomTreeDiff.
    - [[Docking mediante ray-casting|DARC]] (DARC): método de docking para dirigirse específicamente a sitios de interacción de proteínas.
    - [[Docking flexible de péptidos|flex-pep-dock]]: hace el docking de un péptido flexible a una proteína.
    - [[Docking proteína-proteína|docking-protocol]] (RosettaDock): determina las estructuras de complejos proteína-proteína mediante perturbaciones de cuerpo rígido.  
      * [[Docking prepack protocol]]: prepara estructuras para el docking proteína-proteína.  
    - [[Docking simétrico|sym-dock]]: determina la estructura de homooligómeros simétricos.  
    - [[Docking con conjugación química|ubq-conjugated]]: determina las estructuras de proteínas conjugadas con ubiquitina.  
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta