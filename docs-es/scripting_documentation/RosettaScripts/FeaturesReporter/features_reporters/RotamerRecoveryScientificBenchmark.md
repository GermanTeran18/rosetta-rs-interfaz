#Benchmark científico de recuperación de rotámeros

Introducción
============

La recuperación de rotámeros (Rotamer Recovery) mide cuánto se aleja la conformación óptima de Rosetta de una conformación de referencia. Junto con la recuperación de secuencia y la predicción de ddG, es uno de los principales métodos para evaluar la calidad de la función de puntuación de Rosetta.

Al especificar distintos componentes, el marco de trabajo RotamerRecovery puede realizar una amplia gama de pruebas. En general, las pruebas de recuperación con menos grados de libertad evalúan la exactitud de Rosetta más cerca del estado *nativo* y requieren menos optimización, mientras que las pruebas con más grados de libertad evalúan la exactitud de Rosetta más lejos del estado *nativo* y requieren más optimización.

Para realizar una prueba de recuperación de rotámeros hay que proporcionar o especificar lo siguiente:

-   Una conformación estructural de referencia. Por ejemplo, una estructura cristalina de rayos X para una secuencia de proteína.
-   **RRProtocol** : los grados de libertad de la prueba y cómo debe optimizarlos Rosetta
-   **RRComparer** : cómo debe evaluarse la conformación predicha
-   **RRReporter** : cómo deben informarse los resultados

RRProtocol
==========

Cada *RRProtocol* tiene un método *run* que ejecuta uno o más procedimientos de optimización usando una *ScoreFunction* sobre un subconjunto de un *Pose* restringido por un *PackerTask* y luego usa un *RRComparer* para evaluar la exactitud de la conformación predicha y envía los resultados a un *RRComparer* .

RRProtocolMinPack
-----------------

El protocolo *MinPack* predice la conformación de un subconjunto de grados de libertad de la cadena lateral dada una cadena principal fija. Primero, para cada residuo se define un conjunto discreto de conformaciones «rotaméricas» y se optimizan mediante un protocolo estocástico de MCMC llamado *PackRotamers* . Luego, todos los grados de libertad de la cadena lateral se optimizan conjuntamente con el algoritmo de optimización basado en gradiente *Minimization* . Al terminar el protocolo *min\_pack* se mide la recuperación de cada residuo.

RRProtocolPackRotamers
----------------------

El protocolo *PackRotamers* predice la conformación de un subconjunto de grados de libertad de la cadena lateral dada una cadena principal fija. Primero, para cada residuo se define un conjunto discreto de conformaciones «rotaméricas» y se optimizan mediante un protocolo estocástico de MCMC llamado *PackRotamers* . Al terminar el protocolo *PackRotamers* se mide la recuperación de cada residuo.

RRProtocolRTMin
---------------

El protocolo *RTMin* predice la conformación de la cadena lateral de cada residuo del *PackerTask* que es *empaquetable* (uno a la vez), mientras mantiene fija la conformación de todos los demás residuos en su conformación de referencia. Para cada residuo, el procedimiento de optimización define un conjunto discreto de estados de conformación *rotaméricos* y, para cada estado, los grados de libertad de la cadena lateral se optimizan conjuntamente con el algoritmo de optimización basado en gradiente *Minimization* , y se informa de la recuperación.

RRProtocolRotamerTrials
-----------------------

El protocolo *RotamerTrails* predice la conformación de la cadena lateral de cada residuo del *PackerTask* que es *empaquetable* (uno a la vez), mientras mantiene fija la conformación de todos los demás residuos en su conformación de referencia. Tras optimizar cada residuo por turnos, se informa de la recuperación.

RRProtocolMover
---------------

Un *Mover* es un protocolo genérico que toma un *Pose* y le aplica una operación. Como los movers son componibles y están integrados en el marco de trabajo *RosettaScripts* , esta puede ser una forma flexible de especificar y realizar una variedad de protocolos de optimización. Una vez aplicado el *Mover* , se mide la recuperación de cada residuo.

RRComparer
==========

Cada *RRComparer* mide la divergencia entre dos *Residues* , cada uno en su propio *Pose* . La información devuelta es una *puntuación* de valor real y una variable booleana *recovered* . Al ser una puntuación de divergencia, 0 significa recuperación perfecta y valores cada vez más positivos significan peor recuperación. Un rotámero se considera recuperado cuando la puntuación está por debajo de un umbral especificado.

RRComparerRotBins
-----------------

Para cada uno de los dos residuos, los grados de libertad torsionales se asignan a estados de conformación *rotaméricos* discretos. Luego se compara la identidad del intervalo de rotámero de cada ángulo de la cadena lateral, uno por uno, hasta que no coinciden. La puntuación es el número de intervalos que no coincidieron, y el rotámero está *recuperado* si todos los intervalos coinciden.

Nota: las definiciones de los intervalos de rotámero las determinan las bibliotecas de Dunbrack en path/to/rosetta/main/database. Véase, por ejemplo, la opción *-corrections::score::dun10* . Como los intervalos de rotámero dependen de la biblioteca de rotámeros usada, esta puntuación no da resultados significativos al comparar distintas bibliotecas de rotámeros.

Nota: actualmente este comparador fallará si los residuos no son el mismo aminoácido canónico.

RRComparerAutomorphicRMSD
-------------------------

El RMSD entre dos conjuntos de átomos, cada uno con un etiquetado que los empareja, es la raíz cuadrada de la suma de los cuadrados de las distancias entre los átomos de cada par. Un automorfismo de un residuo es un reetiquetado de los nombres de los átomos que conserva la misma identidad química y conformación atómica. El *automorphic\_rmsd* entre dos conformaciones de residuo es el mínimo del RMSD sobre todos los automorfismos de cada conformación de residuo. Como el RMSD se calcula sobre todos los átomos, este comparador suele dar valores mayores en los tipos de residuo con más átomos, por lo que hay que tener cuidado al interpretar los resultados.

Nota: actualmente este comparador fallará si los residuos no son el mismo aminoácido canónico.

RRComparerChiDiff
-----------------

La puntuación de diferencia chi entre dos conformaciones de cadena lateral es el máximo de las diferencias de ángulo de cada uno de los ángulos torsionales. Como los ángulos están en radianes, el rango de puntuaciones va de cero a pi. Una ventaja de este comparador es que el rango de la puntuación no depende del número de ángulos chi del tipo de aminoácido. Una limitación es que los ángulos torsionales con variación compensatoria se tratan igual de mal que los ángulos torsionales con variación amplificadora.

Para las cadenas laterales de proteína con simetría, la diferencia chi se calcula respecto a la versión simétrica más cercana. Por ejemplo, girar el último ángulo chi de ASP dará una diferencia chi de 0.

RRReporter
==========

Cada *RRReporter* reúne estadísticas de recuperación e informa de los resultados de la prueba, completos o resumidos.

RRReporterSimple
----------------

El reporter *RRReporterSimple* solo lleva la cuenta del número de residuos considerados para la recuperación y del número de residuos que realmente se recuperaron. Este reporter puede usarse, por ejemplo, si la recuperación de rotámeros se usa como criterio para optimizar un protocolo de predicción o una ScoreFunction y se necesita poca información textual.

RRReporterHuman
---------------

El reporter *RRReporterHuman* devuelve una tabla legible por humanos que resume los resultados de la recuperación de rotámeros.

La recuperación de rotámeros se mostrará en pantalla. La salida tiene este aspecto:

    # native_structure_tag1                                                                                                                                                                                                                   
    # total = 30                                                                                                                                                                                                                              
       resi_idx  nat_bb_bin      pct_bb    nat_rot1    pct_rot1    nat_rot2    pct_rot2    nat_rot3    pct_rot3    nat_rot4    pct_rot4                                                                                                       
              1           E      1.0000           1      1.0000           2      1.0000           1      1.0000         999      0.0000                                                                                                       
              2           B      1.0000           2      1.0000           1      1.0000         999      0.0000         999      0.0000                                                                                                       
       ...                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                              
    # native_structure_tag2                                                                                                                                                                                                                   
    # total = 30                                                                                                                                                                                                                              
       resi_idx  nat_bb_bin      pct_bb    nat_rot1    pct_rot1    nat_rot2    pct_rot2    nat_rot3    pct_rot3    nat_rot4    pct_rot4                                                                                                       
              1           E      1.0000           1      1.0000           2      1.0000           1      1.0000         999      0.0000                                                                                                       
              2           B      1.0000           2      1.0000           1      1.0000         999      0.0000         999      0.0000                                                                                                       
       ...                                                                                                                                                                                                                                    

Donde \# total es cuántas proteínas se compararon.

-   resi\_idx = índice del residuo
-   nat\_bb\_bin = nomenclatura dssp para la cadena principal
-   pct\_bb = fracción que coincide con los intervalos de la cadena principal
-   nat\_rot1 = chi 1
-   pct\_rot1 = fracción que coincide con los intervalos chi
-   Si aparece 999, significa que el aminoácido no tiene ese ángulo chi

RRReporterSQLite
----------------

El reporter *RRReporterSQLite* escribe los datos de recuperación en una base de datos SQL para su análisis posterior. Se pueden especificar los siguientes formatos de salida:

-   **full** : registra toda la información sobre la prueba de recuperación de rotámeros
    -   **struct\*\_name** , **chain\*** , **res\*** : cómo se identifican los residuos de referencia y los predichos.
    -   **protocol\_name** , **protocol\_params** : información sobre el *RRProtocol*
    -   **comparer\_name** , **comparer\_params** : información sobre el *RRComparer*
    -   **score** , **recovered** : el número real positivo *score* y el booleano *recovered* del *RRComparer*

<!-- -->

        CREATE TABLE IF NOT EXISTS nchi (
            name3 TEXT,  
            nchi INTEGER,
            PRIMARY KEY (name3));

        INSERT OR IGNORE INTO nchi VALUES('ARG', 4);
        INSERT OR IGNORE INTO nchi VALUES('LYS', 4);
        INSERT OR IGNORE INTO nchi VALUES('MET', 3);
        INSERT OR IGNORE INTO nchi VALUES('GLN', 3);
        INSERT OR IGNORE INTO nchi VALUES('GLU', 3);
        INSERT OR IGNORE INTO nchi VALUES('TYR', 2);
        INSERT OR IGNORE INTO nchi VALUES('ILE', 2);
        INSERT OR IGNORE INTO nchi VALUES('ASP', 2);
        INSERT OR IGNORE INTO nchi VALUES('TRP', 2);
        INSERT OR IGNORE INTO nchi VALUES('PHE', 2);
        INSERT OR IGNORE INTO nchi VALUES('HIS', 2);
        INSERT OR IGNORE INTO nchi VALUES('ASN', 2);
        INSERT OR IGNORE INTO nchi VALUES('THR', 1);
        INSERT OR IGNORE INTO nchi VALUES('SER', 1);
        INSERT OR IGNORE INTO nchi VALUES('PRO', 1);
        INSERT OR IGNORE INTO nchi VALUES('CYS', 1);
        INSERT OR IGNORE INTO nchi VALUES('VAL', 1);
        INSERT OR IGNORE INTO nchi VALUES('LEU', 1);
        INSERT OR IGNORE INTO nchi VALUES('ALA', 0);
        INSERT OR IGNORE INTO nchi VALUES('GLY', 0);


        CREATE TABLE IF NOT EXISTS rotamer_recovery (
            struct1_name TEXT,
            name1 TEXT,
            name3 TEXT,
            residue_type TEXT,
            chain1 TEXT,
            res1 INTEGER,
            struct2_name TEXT,
            chain2 TEXT,
            res2 INTEGER,
            protocol_name TEXT,
            protocol_params TEXT,
            comparer_name TEXT,
            comparer_params TEXT,
            score REAL,
            recovered BOOLEAN,
            PRIMARY KEY (struct1_name, chain1, res1, struct2_name, chain2, res2));

-   **features** : registra la cantidad mínima pero completa de información para la prueba de recuperación de rotámeros.
    -   **struct\_id** , **resNum** : son las claves primarias de la tabla *residues* del reporter ResidueFeatures
    -   **divergence** : es la *puntuación* que devuelve el *RRProtocol*.

<!-- -->

        CREATE TABLE IF NOT EXISTS nchi (
            name3 TEXT,  
            nchi INTEGER,
            PRIMARY KEY (name3));

        INSERT OR IGNORE INTO nchi VALUES('ARG', 4);
        INSERT OR IGNORE INTO nchi VALUES('LYS', 4);
        INSERT OR IGNORE INTO nchi VALUES('MET', 3);
        INSERT OR IGNORE INTO nchi VALUES('GLN', 3);
        INSERT OR IGNORE INTO nchi VALUES('GLU', 3);
        INSERT OR IGNORE INTO nchi VALUES('TYR', 2);
        INSERT OR IGNORE INTO nchi VALUES('ILE', 2);
        INSERT OR IGNORE INTO nchi VALUES('ASP', 2);
        INSERT OR IGNORE INTO nchi VALUES('TRP', 2);
        INSERT OR IGNORE INTO nchi VALUES('PHE', 2);
        INSERT OR IGNORE INTO nchi VALUES('HIS', 2);
        INSERT OR IGNORE INTO nchi VALUES('ASN', 2);
        INSERT OR IGNORE INTO nchi VALUES('THR', 1);
        INSERT OR IGNORE INTO nchi VALUES('SER', 1);
        INSERT OR IGNORE INTO nchi VALUES('PRO', 1);
        INSERT OR IGNORE INTO nchi VALUES('CYS', 1);
        INSERT OR IGNORE INTO nchi VALUES('VAL', 1);
        INSERT OR IGNORE INTO nchi VALUES('LEU', 1);
        INSERT OR IGNORE INTO nchi VALUES('ALA', 0);
        INSERT OR IGNORE INTO nchi VALUES('GLY', 0);

        CREATE TABLE IF NOT EXISTS rotamer_recovery (
            struct_id INTEGER,
            resNum INTEGER,
            divergence REAL,
            recovered INTEGER,
            PRIMARY KEY(struct_id, resNum));

Benchmark científico de recuperación de rotámeros
=====================================

Hay dos versiones del benchmark científico de recuperación de rotámeros:

Recuperación de rotámeros quincenal (biweekly)
-------------------------

La prueba de recuperación de rotámeros *biweekly* se realiza sobre un conjunto de 54 estructuras monoméricas pequeñas y está pensada para ejecutarse en una sola máquina y tardar aproximadamente una hora.

         #initialize input
         cd Rosetta/main/tests/scientific/biweekly/rotamer_recovery
         svn checkout https://svn.rosettacommons.org/source/trunk/mini.data/tests/scientific/tests/rotamer_recovery/inputs inputs
         cd ../..

         #run test: by default, out is generated in 'biweekly_statistics/'
         ./scientific_biweekly.py [OPTIONS] rotamer_recovery

Versiones disponibles:

-   **rotamer\_recovery** :
    -   ScoreFunction: *score12prime*
    -   Protocolo: *RRProtocolRTMin* con los [[parámetros chi|TaskOperations-RosettaScripts#ExtraRotamersGeneric]] *ex 1* , *ex 2* y *extra\_chi 1* .
    -   Comparer: *RRComparerRotBins*
    -   Reporter: *RRReporterSQLite:Features*

-   **rotamer\_recovery\_correct** :
    -   ScoreFunction: *score12\_w\_corrections*
    -   Protocolo: *RRProtocolRTMin* con los [[parámetros chi|TaskOperations-RosettaScripts#ExtraRotamersGeneric]] *ex 1* , *ex 2* y *extra\_chi 1* .
    -   Comparer: *RRComparerRotBins*
    -   Reporter: *RRReporterSQLite:Features*

-   **rotamer\_recovery\_sp2** :
    -   ScoreFunction: *sp2\_correction*
    -   Protocolo: *RRProtocolRTMin* con los [[parámetros chi|TaskOperations-RosettaScripts#ExtraRotamersGeneric]] *ex 1* , *ex 2* y *extra\_chi 1* .
    -   Comparer: *RRComparerRotBins*
    -   Reporter: *RRReporterSQLite:Features*

Recuperación de rotámeros con Features
-------------------------

La recuperación de rotámeros con *features* está pensada para ejecutarse sobre un gran conjunto de conformaciones nativas, como el conjunto top8000 del laboratorio de Richardson, en un clúster de computación. Aquí se calculan los resultados de recuperación de rotámeros y se extraen características estructurales adicionales a una base de datos relacional, que puede usarse para clasificar y analizar patrones de recuperación de rotámeros. Consulta la documentación de features para ver instrucciones detalladas sobre cómo [[ejecutar el benchmark científico de features|FeaturesTutorialRunSciBench]] .

#### Este directorio ya no existe

        cd Rosetta/main/tests/features/sample_sources/top8000_rotamer_recovery_score12prime_MinPack
        # follow directions in README.txt and input/README.txt to initialize input
        # check the sample source configuration.
        cd ..
        
        # add 'top8000_rotamer_recovery_score12prime_MinPack' to benchmark.list
        cd ..

        #submit jobs to cluster
        ./features.py [OPTIONS] submit

Aplicación rotamer\_recovery
=============================

La aplicación de recuperación de rotámeros es un método independiente para medir la recuperación de rotámeros de un conjunto de estructuras nativas.

       Rosetta/main/source/bin/rotamer_recovery.<platform><compiler><mode> \
            -database Rosetta/main/database/ > \
            [Additional options]
            -l <inputs.list> \
            -rotamer_recovery:protocol <RRProtocol> \
            -rotamer_recovery:comparer <RRComparer> \
            -rotamer_recovery:reporter <RRReporter> \
            -out:file:rotamer_recovery <results_output_file>

RotamerRecoveryMover
====================

RotamerRecoveryFeatures
=======================
