#CoupledMoves

Última actualización del documento: 17 de agosto de 2018

[[_TOC_]]

-------------------------
# [1] Metadatos

Autores: 
Amanda Loshbaugh (aloshbau@gmail.com); Anum Azam Glasgow (anumazam@gmail.com); Noah Ollikainen (nollikai@gmail.com), PI: Tanja Kortemme

Noah Ollikainen, René M. de Jong, Tanja Kortemme. [Coupling Protein Side-Chain and Backbone Flexibility Improves the Re-design of Protein-Ligand Specificity, PLOS Computational Biology, 9/23/2015](http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1004335)

--------------------------

# [2] Resumen

**Coupled Moves** es un método de diseño con cadena principal flexible pensado para diseñar sitios de unión de moléculas pequeñas, interfaces proteína-proteína y sitios de unión proteína-péptido. Maneja ligandos y aguas. Se desarrolló originalmente para diseñar sitios activos de enzimas. CoupledMoves es uno de los principales métodos de diseño con cadena principal flexible que emplea Cyrus.

# [3] Algoritmo

Para entender el algoritmo acoplado, veamos primero un protocolo de diseño de Rosetta con cadena principal flexible no acoplado. Dos ejemplos son (1) FastDesign (relax que respeta un resfile) y (2) generar un conjunto de Backrub y luego realizar un diseño con cadena principal fija sobre los miembros del conjunto. 

Los protocolos no acoplados tienen el siguiente esquema:

1. Movimiento de la cadena principal
2. Aceptación/rechazo de Monte Carlo
3. Movimiento de la cadena lateral
4. Aceptación/rechazo de Monte Carlo

Esto da lugar a una limitación: un movimiento de la cadena principal podría crear un choque de cadena lateral que se rechaza en el primer paso de Monte Carlo, aunque el movimiento de cadena lateral siguiente podría haberlo rescatado. El algoritmo acoplado permite que esto ocurra, lo que posibilita el muestreo de secuencias y de espacio torsional de la cadena principal antes inaccesibles.

**Algoritmo de Coupled Moves**

1. **Movimiento de la cadena principal**
2. **Movimiento de la cadena lateral**
3. **Aceptación/rechazo de Monte Carlo**
4. **Volver al paso 1**

El movimiento de cadena principal por defecto es ShortBackrubMover, pero también puede ser cierre cinemático con fragmentos (consulta [\[7\] Uso avanzado de la cadena principal](https://www.rosettacommons.org/docs/wiki/coupled-moves#7-advanced-backbone-usage)).

El movimiento de cadena lateral lo realiza BoltzmannRotamerMover:

**BoltzmannRotamerMover**

1. calcula la probabilidad ponderada por Boltzmann de cada rotámero
2. usa las probabilidades para seleccionar un rotámero para cada aminoácido
3. calcula las probabilidades ponderadas por Boltzmann de cada aminoácido
4. usa las probabilidades para seleccionar un aminoácido
5. sustituye resnum_ por el rotámero / aminoácido seleccionado

----------------

# [4] Análisis (muy importante leerlo)

Durante su trayectoria de diseño, Coupled Moves muestrea una variedad de secuencias. Cada secuencia única se guardará y se imprimirá en un archivo fasta, my_pdb.fasta. Cuando tus trabajos hayan terminado, combina los archivos fasta de todos los nstruct. Como el análisis se basa en las secuencias únicas muestreadas y no en el PDB final, nstruct puede ser bastante bajo. Recomendamos un nstruct de 100-400, según el número de posiciones de las regiones diseñables. 

Solo las posiciones diseñadas se incluirán en el archivo fasta. Las posiciones diseñables de tu resfile (ALLAA, PIKAA, NOTAA...) definen las posiciones diseñadas que se imprimen en el archivo fasta. No pierdas tu resfile.

**Para cada posición de interés, basa tu decisión de diseño en la distribución de frecuencias de las cadenas laterales de aminoácidos observadas en tus archivos fasta combinados y en la energética de las cadenas laterales de aminoácidos más frecuentes.**

Para cada posición, mira todas las cadenas laterales modeladas por CoupledMoves. Calcula la frecuencia de cada cadena lateral. Y calcula el rango del término total_energy en comparación con las demás cadenas laterales modeladas. **Elige las cadenas laterales que se modelan con una frecuencia >33% *y* que están en el percentil 75 o superior de energía total.**

----------------

# [5] Preparación y entradas

## [5.1] Archivos de entrada
* PDB de entrada
* Resfile: CoupledMoves es un método de diseño
* Archivo params, uno por cada ligando (opcional) (consulta [\[8\] Uso avanzado de ligandos](https://www.rosettacommons.org/docs/wiki/coupled-moves#8-advanced-ligand-usage))
* Archivo de restricciones (opcional) ([documentación](https://www.rosettacommons.org/docs/latest/rosetta_basics/file_types/constraint-file))

## [5.2] Preparación del PDB de entrada

* Si tu proteína no es un monómero simple, coloca cada proteína en una cadena separada.
* Recomendamos encarecidamente renumerar el PDB empezando desde 1
* Consulta [\[8\] Uso avanzado de ligandos](https://www.rosettacommons.org/docs/wiki/coupled-moves#8-advanced-ligand-usage) para saber cómo preparar un PDB que contenga ligandos.
* ¿Hacer un pre-relax? Quizá.

## [5.3] Preparación del resfile

Esta sección supone que estás familiarizado con la [documentación](https://www.rosettacommons.org/docs/latest/rosetta_basics/file_types/resfiles) del resfile.

Define manualmente los residuos empaquetables: para lograr un muestreo adecuado con un número limitado de pruebas, establece todos los residuos en NATRO excepto los residuos objetivo diseñables, p. ej., los residuos de la primera capa del bolsillo de unión de un ligando, los residuos de un motivo o elementos individuales de estructura secundaria. Considera establecer los residuos de la segunda capa en NATAA para permitir el muestreo de rotámeros.

Ejemplo de resfile:

```
NATRO
START
8 - 10 A ALLAA
87 - 90 A ALLAA
216 A ALLAA
277 - 279 B ALLAA
356 - 359 B ALLAA
9 A NATAA
11 A NATAA
```

Detectar automáticamente los residuos empaquetables:

Usa la opción `-exclude_nonclashing_positions` para autodetectar todas las posiciones que chocan con posiciones diseñables. Empieza con un resfile por defecto NATAA que defina las posiciones diseñables. El protocolo CoupledMoves mantendrá como NATAA solo las posiciones que chocan con posiciones diseñables, mientras que todas las demás posiciones pasarán a NATRO.

Ejemplo de resfile:

```
NATAA
START
216 A ALLAA
```

-------------------------

# [6] Uso básico

## [6.1] Línea de comandos básica

Coupled Moves tiene algunas opciones potentes, que se explican en las secciones avanzadas. Estos ejemplos básicos se apoyan en muchos valores por defecto.

### [6.1.1] Línea de comandos: solo proteína

```
coupled_moves.default.linuxgccrelease
-s my.pdb
-resfile my.resfile
-ex1 -ex2 -extrachi_cutoff 0
-mute protocols.backrub.BackrubMover
-nstruct 60
```

### [6.1.2] Línea de comandos: proteína con un ligando

Las siguientes líneas habilitan el modo de ligandos:

```
-s my.pdb # protein and ligand(s). 
   # NOTE: Ligand(s) must be last residues listed in pdb.
-extra_res_fa my_ligand.params # params file for ligand in my.pdb
-coupled_moves::ligand_mode true
```

* Los benchmarks muestran que Fragment KIC rinde igual de bien, y a veces mejor, que el mover por defecto Backrub. Animamos a los usuarios a leer más abajo [\[7\] Uso avanzado de la cadena principal](https://www.rosettacommons.org/docs/wiki/coupled-moves#7-advanced-backbone-usage) y a explorar el uso de CoupledMoves con Fragment KIC.

----------------

## [6.2] XML básico: proteína con ligando

```
<ROSETTASCRIPTS>
    <SCOREFXNS>
        <ScoreFunction name="ref15" />
    </SCOREFXNS>
    <RESIDUE_SELECTORS>
        <Chain name="chainC" chains="C"/>
        <Chain name="chainD" chains="D"/>
        <Neighborhood name="CD_neighbors" distance="10.0">
            <Chain chains="C,D"/>
        </Neighborhood>
        <Or name="all_selectors" selectors="chainC,chainD,CD_neighbors"/>
    </RESIDUE_SELECTORS>
    <TASKOPERATIONS>
        <ReadResfile name="resfile" filename="firstshell_xc.res"/>
        <RestrictToRepacking name="restrict_to_repack"/>
    </TASKOPERATIONS>
    <MOVERS>
        <ConstraintSetMover name="cst" add_constraints="true" cst_file="constraints.cst"/>
        <CoupledMovesProtocol name="coupled_moves" task_operations="resfile"/>
        <WriteFiltersToPose name="writer" prefix="BuriedUnsats_"/>
    </MOVERS>
    <FILTERS>
        <BuriedUnsatHbonds
            name="buriedunsats_bb"
            report_bb_heavy_atom_unsats="true"
            residue_selector="all_selectors"
            scorefxn="ref15"
            cutoff="4"
            residue_surface_cutoff="20.0"
            ignore_surface_res="true"
            print_out_info_to_pdb="true"/>
        <BuriedUnsatHbonds 
            name="buriedunsats_sc"
            report_sc_heavy_atom_unsats="true"
            residue_selector="all_selectors"
            scorefxn="ref15"
            cutoff="0"
            residue_surface_cutoff="20.0"
            ignore_surface_res="true"
            print_out_info_to_pdb="true"/>
        <LigInterfaceEnergy
            name="liginterface" scorefxn="ref15"/>
        <MoveBeforeFilter
            name="movebefore_bb"
            mover_name="coupled_moves"
            filter_name="buriedunsats_bb"/>
        <MoveBeforeFilter
            name="movebefore_sc"
            mover_name="coupled_moves"
            filter_name="buriedunsats_sc"/>
        <MoveBeforeFilter
            name="movebefore_liginterface"
            mover_name="coupled_moves"
            filter_name="liginterface"/>

    </FILTERS>
    <PROTOCOLS>
        <Add mover_name="cst"/>
        <Add mover_name="writer"/>
        <Add mover_name="coupled_moves"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

----------------

# [7] Uso avanzado de la cadena principal

Esta sección supone que estás familiarizado con [backrub](https://www.rosettacommons.org/docs/latest/application_documentation/structure_prediction/backrub) y el [cierre cinemático](https://www.rosettacommons.org/demos/latest/tutorials/GeneralizedKIC/generalized_kinematic_closure_1).

## [7.1] Cambiar el mover de la cadena principal

CoupledMoves puede mover la cadena principal con:
* Backrub
    ```
    -coupled_moves::backbone_mover backrub
    ```

* Cierre cinemático (KIC)
    ```
    -coupled_moves::backbone_mover kic
    ```

### [7.1.1] Coupled Moves con ShortBackrubMover

CoupledMoves usa por defecto ShortBackrubMover. Puedes especificar explícitamente este valor por defecto:
    ```
    -coupled_moves::backbone_mover backrub
    ```

La longitud del segmento de backrub está fijada en el código de ShortBackrubMover en 3 residuos (o 4 residuos si encuentra una prolina).

### [7.1.2] Coupled Moves con KIC

Si no estás familiarizado con KIC, consulta la [documentación](https://www.rosettacommons.org/demos/latest/tutorials/GeneralizedKIC/generalized_kinematic_closure_1). Durante el paso de perturbación de KIC se pueden usar varios algoritmos para perturbar los ángulos de torsión. Actualmente (agosto de 2018) CoupledMoves admite dos perturbadores, Fragment y Walking.

#### [7.1.2.1] Fragment KIC

El perturbador Fragment sustituye fragmentos con secuencias idénticas, lo que da ángulos de torsión actualizados sin relación con las torsiones iniciales. La generación de archivos de fragmentos se explica [aquí](https://www.rosettacommons.org/docs/latest/rosetta_basics/file_types/fragment-file).
    ```
    -coupled_moves::backbone_mover kic
    -coupled_moves::kic_perturber fragment
    -loops:frag_sizes 9 3
    -loops:frag_files my_pdb.200.3mers.gz, my_pdb.200.3mers.gz
    ```

#### [7.1.2.2] Walking KIC

El perturbador Walking "camina" por el espacio de ángulos de torsión. Los ángulos se modifican con valores de una distribución alrededor de una magnitud especificada por el usuario.
    ```
    -coupled_moves::backbone_mover kic
    -coupled_moves::kic_perturber walking # default='walking'
    -coupled_moves::walking_perturber_magnitude 2.0 # units of degrees; default=2.0
    ```

## [7.2] Controlar el tamaño del loop de KIC

* `-coupled_moves::kic_loop_size` solo se aplica al usar `-coupled_moves::backbone_mover kic`.
* KIC intentará cambiar los ángulos de torsión de un segmento de esta cantidad de residuos de longitud. Se diseñará el rotámero del residuo central, por lo que kic_loop_size debe ser un número impar para que exista un residuo central. 
* "Loop" aquí no se refiere a estructura secundaria, sino solo a un segmento de residuos.
* (La longitud del segmento de backrub está fijada en el código de ShortBackrubMover en 3 residuos, o 4 residuos si encuentra una prolina).

```
-coupled_moves::kic_loop_size <n> # default n=9
```

## [7.3] Opciones de línea de comandos del mover de la cadena principal

Opción | Tipo | Valor por defecto | Descripción
------------ | ------------- | ------------- | -------------
backbone_mover | String | backrub | Qué mover de cadena principal usar. Las opciones actuales son backrub (por defecto) o kic. Backrub no requiere opciones adicionales y usa ShortBackrubMover, que está fijado en el código para segmentos de 3 residuos (o 4 residuos si encuentra una prolina). Kic admite opcionalmente la opción adicional -kic_perturber.' legal = [ 'backrub', 'kic' ]
kic_perturber | String | walking | Qué perturbador usar durante el cierre cinemático (KIC). Las opciones actuales son walking (por defecto) o fragment. El perturbador walking ajusta las torsiones en grados, cuya magnitud se puede fijar con -walking_perturber_magnitude. Si especificas walking, PUEDES especificar también -walking_perturber_magnitude. Si especificas fragment, DEBES especificar también -loops::frag_files y -loops::frag_sizes. legal = [ 'walking', 'fragment' ]
walking_perturber_magnitude | Real | 2.0 | Parámetro de grados para el perturbador walking de KIC de coupled moves
kic_loop_size | Real | 4 | Puede ser constante o aleatorio. CONSTANT: si fijas loop_size en un número entero positivo, el loop que mueve coupled_moves::backbone_mover será de 1+2*loop_size. En otras palabras, el loop se define seleccionando primero resnum y definiendo después loopstart=resnum-loop_size y loopend=resnum+loop_size. RANDOM: si fijas loop_size en 0, en cada prueba loop_size será random_range( 3, 7 ). [ NOTA: esta opción es solo para coupled_moves::backbone_mover=kic. La longitud del segmento de backrub está fijada en el código de ShortBackrubMover en 3 residuos (o 4 residuos si encuentra una prolina)

-------------------------------------

# [8] Uso avanzado de ligandos

Coupled Moves se desarrolló originalmente para diseñar sitios activos de enzimas y se ha sometido a un benchmarking exhaustivo con conjuntos de datos de sitios de unión de moléculas pequeñas. Es bueno para el diseño en general, pero se recomienda especialmente para diseñar sitios de unión de moléculas pequeñas.

### [8.1] Opciones de línea de comandos para ligandos

(Consulta [6.1.2](https://www.rosettacommons.org/docs/wiki/coupled-moves#6-basic-usage_6-1-basic-command-line_6-1-2-command-line-protein-with-one-ligand) para la línea de comandos básica con ligandos.)

Opción | Tipo | Valor por defecto | Descripción | Recomendaciones de uso para expertos
------------ | ------------- | ------------- | ------------- | -------------
number_ligands | Integer | 1 | número de ligandos en el Pose |
ligand_mode | Boolean | false | si es true, modela la interacción proteína-ligando | Si se fija en 'true' y no hay ningún ligando, produce un error. Si se fija en 'false' y hay un ligando, no se considerarán las interacciones proteína-ligando.
ligand_weight | Real | 1.0 | peso de las interacciones proteína-ligando | Se recomienda un valor de alrededor de 1.0 o 2.0, según el conjunto de datos.

-------------------------------------

### [8.2] Preparación del ligando

* **Las cadenas de los ligandos deben ser las últimas cadenas del PDB; de lo contrario, CoupledMoves no puede encontrarlas.**
* Coloca cada ligando en su propia cadena al final del PDB (recomendamos la convención de nombrar la cadena X para el primer ligando). 

* Preparación:
  1. Corta y pega las líneas HETATM relevantes del ligando del PDB de origen en un PDB nuevo.
  2. Añade hidrógenos con Babel
       `babel -h IPTG.pdb IPTG_withH.sdf`
  3. Abre el archivo resultante en Avogadro/PyMOL y guárdalo como archivo .mol2.
  4. Para obtener los archivos .params a partir de los archivos .mol2 de cada ligando, ejecuta el script molfile_to_params.py
      ```
      python ~/Rosetta/main/source/scripts/python/public/molfile_to_params.py -n name input_file.mol2
      ```
     O
     si usas el término de puntuación -gen_bonded:
     ```
     python ~/Rosetta/main/source/scripts/python/public/mol2genparams.py -n name input_file.mol2
     ```
  5. El script de params debería generar un archivo pdb. Ábrelo en un editor de texto, cambia el nombre de la cadena y vuelve a ponerlo en el archivo PDB original con la proteína.
  6. Asegúrate de que la colocación del ligando sea correcta alineándolo con el original en PyMOL.



### [8.3] Ejemplo de línea de comandos: uso avanzado de ligandos

```
coupled_moves.default.linuxgccrelease
-s my.pdb # protein and ligand(s). 
   # NOTE: Ligand(s) must be last residues listed in pdb.
-resfile my.resfile
-ex1 -ex2 -extrachi_cutoff 0
-coupled_moves::ligand_mode true
-coupled_moves::number_ligands 2
-extra_res_fa my_ligand.params # params file for ligand on chain X in my.pdb
-extra_res_fa my_ligand.params # params file for ligand on chain Y in my.pdb
-coupled_moves::ligand_weight 2.0 # upweight ligand-protein interactions
```

### [8.4] Aguas explícitas

**Preparar aguas explícitas**
* Coloca las moléculas de agua en una cadena separada, la cadena W. Usa los tipos de residuo TP3/WAT y las posiciones cristalográficas de los oxígenos. 
* Añade los hidrógenos mediante puntuación: `~/Rosetta/main/source/bin/score.linuxgccrelease -database ~/Rosetta/main/database/ -s pdb_file -ignore_unrecognized_res -out:output`
* Las aguas no necesitan un archivo params porque WAT/TP3 ya están en la base de datos de Rosetta.

----------------

# [9] LinkResidues

EN UN FUTURO CERCANO, Coupled Moves admitirá [LinkResidues](https://www.rosettacommons.org/docs/latest/scripting_documentation/RosettaScripts/TaskOperations/taskoperations_pages/LinkResidues). El código está terminado y actualmente lo estamos probando antes de publicarlo. 

LinkResidues especifica grupos de residuos que deben mutarse juntos. Por ejemplo, si un residuo del grupo muta a Cys, todos los residuos de ese grupo mutarán a Cys. Esta task operation está pensada para situaciones en las que quieres diseñar un homomultímero pero no quieres usar el modo de simetría (quizá porque tus monómeros no son geométricamente simétricos).

## [8.1] Ejemplo de XML

```
<ROSETTASCRIPTS>
    <SCOREFXNS>
        <ScoreFunction name="ref15" />
    </SCOREFXNS>
    <RESIDUE_SELECTORS>
        <Chain name="chainC" chains="C"/>
        <Chain name="chainD" chains="D"/>
        <Neighborhood name="CD_neighbors" distance="10.0">
            <Chain chains="C,D"/>
        </Neighborhood>
        <Or name="all_selectors" selectors="chainC,chainD,CD_neighbors"/>
    </RESIDUE_SELECTORS>
    <TASKOPERATIONS>
        <ReadResfile name="resfile" filename="firstshell_xc.res"/>
        <RestrictToRepacking name="restrict_to_repack"/>
        <LinkResidues name="linkres">
            <LinkGroup group="234,503"/>
            <LinkGroup group="235,504"/>
            <LinkGroup group="236,505"/>
        </LinkResidues>
    </TASKOPERATIONS>
    <MOVERS>
        <ConstraintSetMover name="cst" add_constraints="true" cst_file="constraints.cst"/>
        <CoupledMovesProtocol name="coupled_moves" task_operations="resfile"/>
        <WriteFiltersToPose name="writer" prefix="BuriedUnsats_"/>
    </MOVERS>
    <FILTERS>
        <BuriedUnsatHbonds
            name="buriedunsats_bb"
            report_bb_heavy_atom_unsats="true"
            residue_selector="all_selectors"
            scorefxn="ref15"
            cutoff="4"
            residue_surface_cutoff="20.0"
            ignore_surface_res="true"
            print_out_info_to_pdb="true"/>
        <BuriedUnsatHbonds 
            name="buriedunsats_sc"
            report_sc_heavy_atom_unsats="true"
            residue_selector="all_selectors"
            scorefxn="ref15"
            cutoff="0"
            residue_surface_cutoff="20.0"
            ignore_surface_res="true"
            print_out_info_to_pdb="true"/>
        <LigInterfaceEnergy
            name="liginterface" scorefxn="ref15"/>
        <MoveBeforeFilter
            name="movebefore_bb"
            mover_name="coupled_moves"
            filter_name="buriedunsats_bb"/>
        <MoveBeforeFilter
            name="movebefore_sc"
            mover_name="coupled_moves"
            filter_name="buriedunsats_sc"/>
        <MoveBeforeFilter
            name="movebefore_liginterface"
            mover_name="coupled_moves"
            filter_name="liginterface"/>

    </FILTERS>
    <PROTOCOLS>
        <Add mover_name="cst"/>
        <Add mover_name="writer"/>
        <Add mover_name="coupled_moves"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

----------------

# [10] Opciones de línea de comandos

## [10.1] Opciones de línea de comandos que quizá quieras cambiar

**Opciones de los archivos de salida**

Opción | Tipo | Valor por defecto | Descripción
------------ | ------------- | ------------- | -------------
output_prefix | String | default | prefijo de los archivos de salida | 
save_structures | Boolean | false | guarda estructuras para todas las secuencias únicas

**Opciones generales del algoritmo**

Opción | Tipo | Valor por defecto | Descripción | Recomendación
------------ | ------------- | ------------- | ------------- | -------------
ntrials | Integer | 1000 | número de pruebas de Monte Carlo que se ejecutarán | Un benchmarking exhaustivo muestra que más pruebas no es mejor. **Comprueba los resultados, prueba con menos de 1000**. 
initial_repack | Boolean | true | inicia la simulación con un paso de reempaquetado y diseño | El reempaquetado inicial puede dar lugar a una menor diversidad
min_pack | Boolean | false | usa min_pack para el paso inicial de reempaquetado y diseño |

**Opciones de la cadena principal**

Opción | Tipo | Valor por defecto | Descripción
------------ | ------------- | ------------- | ------------- | -------------
backbone_mover | String | backrub | Consulta [\[7.3\] Opciones avanzadas de línea de comandos de la cadena principal](https://www.rosettacommons.org/docs/wiki/coupled-moves#7-advanced-backbone-usage_7-3-backbone-mover-command-line-options)
kic_perturber | String | walking | Consulta [\[7.3\] Opciones avanzadas de línea de comandos de la cadena principal](https://www.rosettacommons.org/docs/wiki/coupled-moves#7-advanced-backbone-usage_7-3-backbone-mover-command-line-options)
kic_loop_size | Real | 4 | Consulta [\[7.3\] Opciones avanzadas de línea de comandos de la cadena principal](https://www.rosettacommons.org/docs/wiki/coupled-moves#7-advanced-backbone-usage_7-3-backbone-mover-command-line-options)
walking_perturber_magnitude | Real | 2.0 | Consulta [\[7.3\] Opciones avanzadas de línea de comandos de la cadena principal](https://www.rosettacommons.org/docs/wiki/coupled-moves#7-advanced-backbone-usage_7-3-backbone-mover-command-line-options)


**Opciones de ligandos**

Opción | Tipo | Valor por defecto | Descripción
------------ | ------------- | ------------- | ------------- | -------------
number_ligands | Integer | 1 | Consulta [\[8.1\] Opciones avanzadas de línea de comandos para ligandos](https://www.rosettacommons.org/docs/wiki/coupled-moves#8-advanced-ligand-usage_8-1-ligand-command-line-options)
ligand_mode | Boolean | false | Consulta [\[8.1\] Opciones avanzadas de línea de comandos para ligandos](https://www.rosettacommons.org/docs/wiki/coupled-moves#8-advanced-ligand-usage_8-1-ligand-command-line-options)
ligand_weight | Real | 1.0 | Consulta [\[8.1\] Opciones avanzadas de línea de comandos para ligandos](https://www.rosettacommons.org/docs/wiki/coupled-moves#8-advanced-ligand-usage_8-1-ligand-command-line-options)
ligand_prob | Real | 0.1 | probabilidad de realizar un movimiento del ligando. Se recomienda el valor por defecto

-------------------------------------

## [10.2] Opciones de línea de comandos que probablemente no quieras tocar

**Opciones del algoritmo**

Opción | Tipo | Valor por defecto | Descripción
------------ | ------------- | ------------- | -------------
mc_kt | Real | 0.6 | valor de kT para Monte Carlo al aceptar o rechazar movimientos acoplados de cadena lateral y cadena principal
boltzmann_kt | Real | 0.6 | valor de kT para los movimientos ponderados por Boltzmann durante el paso de diseño de cadenas laterales
mm_bend_weight | Real | 1.0 | peso del término de energía de ángulo de enlace mm_bend
bias_sampling | Boolean | true | si es true, sesga la selección de rotámeros según la energía
bump_check | Boolean | true | si es true, usa la comprobación de choques al generar rotámeros 
repack_neighborhood | Boolean | false | Tras el movimiento de la cadena principal y el movimiento de rotámero, reempaqueta las cadenas laterales a menos de 5A del residuo de diseño. Por defecto es false, con el comportamiento de Ollikainen 2015. No parece influir en los resultados del benchmark, pero añade un tiempo significativo.
exclude_nonclashing_positions | Boolean | true | True = para cada posición empaquetable, ClashBasedShellSelector recorre los rotámeros para determinar si el residuo podría chocar con alguna posición diseñable. Si no es posible un choque, la posición empaquetable cambia de NATAA a NATRO. False = realiza los movimientos de cadena lateral estrictamente como se define en el resfile. El valor por defecto true reproduce el comportamiento de Ollikainen 2015.
fix_backbone | Boolean | false | Fíjalo en 'true' para impedir los movimientos de la cadena principal. Para depuración
uniform_backrub | Boolean | false | selecciona el ángulo de rotación de backrub a partir de una distribución uniforme. Se recomienda el valor por defecto

**Opciones de los archivos de salida**

Opción | Tipo | Valor por defecto | Descripción | Recomendaciones de uso para expertos
------------ | ------------- | ------------- | ------------- | -------------
trajectory | Boolean | false | registra una trayectoria | Imprime PDB durante la trayectoria de diseño. Es útil para ver la trayectoria, pero ocupa mucho espacio; úsalo con criterio.
trajectory_gz | Boolean | false | comprime la trayectoria con gzip |
trajectory_stride | Integer | 100 | escribe un fotograma de la trayectoria cada N pruebas |
trajectory_file | String | 'traj.pdb' | nombre del archivo de trayectoria |
output_fasta | String | sequences.fasta | nombre del archivo de salida FASTA | Secuencias para el análisis
output_stats | String | sequences.stats | nombre del archivo de salida de estadísticas |
save_sequences | Boolean | true | guarda todas las secuencias únicas  |  Secuencias para el análisis
save_structures | Boolean | false | guarda estructuras para todas las secuencias únicas | 

---------------------------------

# [11] Benchmarking

Se añadirá próximamente; ponte en contacto con Amanda si tienes preguntas inmediatas

---------------------------------

# [12] Véase también

* [[I want to do x]]: guía para elegir un mover
