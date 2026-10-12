# FARFAR2: modelado por homología y predicción ab initio de estructuras 3D completas de ARN

# Propósito de la aplicación
Producir modelos <i>de novo</i> de estructuras de ARN de hasta unos 250 nt, o modelos por homología de estructuras de ARN en las que hasta unos 80 nt no estén en plantillas conocidas ni en hélices de forma A, mediante una versión con parámetros optimizados de Fragment Assembly of RNA with Full Atom Refinement (FARFAR), a la que llamamos FARFAR2.

Ten en cuenta que la mayor parte de la funcionalidad de FARFAR2 está disponible ahora en un [servidor ROSIE FARFAR](http://rosie.rosettacommons.org/farfar2), por si quieres hacer algunas pruebas fáciles.

# Código y demostración

El código central de la aplicación *rna\_denovo* está en `       src/protocols/rna/denovo/RNA_DeNovoProtocol.cc      ` .

Para ver una demostración "mínima" del protocolo de ensamblaje de fragmentos de ARN y minimización con todos los átomos, y de sus archivos de entrada, consulta

`       demos/public/FARFAR2      `

# Referencias
Watkins, A. M.; Rangan, R.; Das, R. “FARFAR2: Improved de novo Rosetta prediction of complex global RNA folds.” Structure, 2020, 28: 963-976. [Enlace.](https://doi.org/10.1016/j.str.2020.05.011)

# Algoritmo

La descripción algorítmica de FARFAR (es decir, Fragment Assembly of RNA with Full Atom Refinement) en su conjunto se encuentra [[aquí|rna-denovo]]. Hay varias diferencias que hacen de FARFAR2 un método adecuado para la predicción de estructuras grandes de ARN.

-   En el método FARFAR original no era posible tener en cuenta la flexibilidad de las hélices con una cinemática realista en un único pipeline limpio. En los métodos de un solo paso, los usuarios debían elegir entre bloques helicoidales fijos precalculados (de modo que toda la "tensión" resultante se expresara como chainbreaks en los extremos de las hélices) y conjuntos de `AtomPairConstraints` llamados "restricciones de pares de bases" (de modo que toda la "tensión" se encontrara en hélices mal formadas). Si los usuarios se conformaban con un método de varios pasos (la mayoría no lo hacía), podían generar de antemano conjuntos de estructuras de hélices para cada posición, y FARFAR tomaba muestras de esos conjuntos. Este método ofrecía mejoras marginales a cambio de una penalización severa en complejidad. FARFAR2, en cambio, implementa el muestreo de "pasos de pares de bases", que permite sustituir cuartetos de residuos helicoidales, es decir, dos pares de bases consecutivos, por nuevas muestras ideales. Así, la flexibilidad de la hélice se muestrea en el lugar, y cualquier tensión resultante se reparte entre los chainbreaks de todos los residuos helicoidales, donde se optimiza con más facilidad.

-   El método FARFAR original usaba una función de puntuación antigua, desarrollada para el trabajo original de FARFAR (2010), que incluía varios términos con discontinuidades en la derivada en algunas circunstancias, como `ch_bond`. Desde entonces hemos querido aprovechar toda la optimización de la función de puntuación realizada para [[Monte Carlo stepwise|stepwise]], que ahora es la opción por defecto.

-   El método FARFAR original usaba una biblioteca de fragmentos de 2009; la hemos actualizado a 2018 y hemos añadido opciones para excluir fragmentos de cualquier estructura `-native` proporcionada, para simular condiciones de benchmark.

# Limitaciones

-   Los ARN suficientemente grandes siguen siendo difíciles de muestrear por completo. ¡Obviamente, usa plantillas si las hay, incluso para porciones pequeñas de tu objetivo! Los datos experimentales pueden ayudar (véase el [[trabajo anterior con el código previo|rna-assembly]]), al igual que las [[estrategias para construir modelos de forma gradual|rna-denovo-setup], o resolver primero motivos pequeños con [[stepwise]].

-   Como ocurre con la mayoría de los demás modos de Rosetta, no se garantiza que el conjunto final de modelos sea un conjunto de Boltzmann. Hay algunos avances en esa dirección para el ARN con la aplicación [[recces]].

# Modos


-   Por defecto, el código ejecuta ensamblaje de fragmentos con Monte Carlo, optimizado en un potencial de baja resolución basado en conocimiento.

-   Se recomienda encarecidamente ejecutar con "-minimize\_rna", que permite el refinamiento en el potencial de alta resolución de Rosetta y produce modelos con pocos choques estéricos y puentes de hidrógeno más "limpios".


# Archivos de entrada


## Archivo obligatorio

FARNA (rna_denovo) puede aceptar la secuencia y la estructura secundaria desde la línea de comandos y no requiere ningún archivo. Sin embargo, usar archivos de entrada puede ayudar a organizar las ejecuciones.

## Archivos adicionales opcionales:

-   El [[RNA fasta file]]: es un archivo de secuencia para tu ARN. Sus líneas de encabezado también pueden especificar las cadenas y la numeración de las estructuras de salida. *Difiere del formato FASTA ordinario que quizás conoces y es necesario para especificar nucleótidos modificados químicamente.*

-   El [[archivo de estructura secundaria|rna-secondary-structure-file]]: contiene la estructura secundaria del ARN en notación de punto y paréntesis, si se conoce.

-   Archivo pdb nativo, si se desean RMSD de todos los átomos pesados. Debe estar en el [formato PDB de Rosetta para ARN](#File-Format).

## Cómo incluir estos archivos.

Un ejemplo de línea de comandos es el siguiente:

```
rna_denovo.<exe> -sequence "ucaggu aagcag" -secstruct "(....( )....)" -nstruct 2 -out:file:silent test.out -minimize_rna 
```

o, si quieres proporcionar la secuencia y la estructura secundaria en archivos:

```
rna_denovo.<exe> -fasta chunk002_1lnt_.fasta -secstruct_file chunk002_1lnt_.secstruct -nstruct 2 -out:file:silent test.out -minimize_rna 
```

El código tarda aproximadamente 1 minuto en generar dos modelos.

El archivo fasta tiene el nombre del ARN en la primera línea (después de \>) y la secuencia en la segunda línea. Las letras válidas son a, c, g y u. Hay ejemplos de archivos fasta y secstruct en `       demos/public/rna_denovo      ` .

# Opciones
## Opciones de uso común
```
-in:fasta                                        Fasta-formatted sequence file. [FileVector]
-sequence                                        Sequence on command line (put in quotes; fasta input is preferred)
-secstruct_file                                  RNA sec struct to model in dot-parens notation
-secstruct                                       RNA sec struct on command line (put in quotes;  
                                                  secstruct_file input is preferred)
-out:file:silent                                 Name of output file [scores and torsions, compressed format]. default="default.out" [String]
-in:native                                       Native PDB filename. [File].
-out:nstruct                                     Number of models to make. default: 1. [Integer]
-minimize_rna                                    High resolution optimize RNA after fragment assembly.[Boolean]
-vary_geometry                                   Vary bond lengths and angles (with harmonic constraints near Rosetta ideal) for backbone and sugar degrees of freedom [Boolean]
```
## Opciones útiles
```
-cycles                                          Number of Monte Carlo cycles.[default 10000]. [Integer]
-bps_moves                                       Base pair step moves. For adjacent base pairs within stems or that are
                                                 obligate pairs, draw sequence-matched fragments that encompass both
                                                 pairs. Adjacent means that base pairs have contiguous residues on one 
                                                 strand, and at most 3 intervening residues on the other.   
-output_lores_silent_file                        If high resolution minimizing, output intermediate low resolution models. [Boolean]
-dump                                            Generate pdb output. [Boolean]
-vall_torsions                                   Source of RNA fragments. [String]
-jump_library_file                               Source of base-pair rigid body transformations if base pairs are specified. [String]
-obligate_pair                                   Residue pairs that must form a base pair (possibly non canonical)
-secstruct_general                               Specification of -obligate_pair in dot-parens format
-obligate_pair_explicit                          Residue pairs that must form a base pair, with  specification of base 
                                                   edges (W/H/S/X) and orientation (A/P/X for antiparallel/
                                                   parallel/unknown; C/T/X allowed too for cis/trans)

-cst_file                                        Specify constraints (typically atom pairs) in Rosetta-style constraint file. [String]
-output_lores_silent_file                        if doing full-atom minimize, also save models after fragment assembly but before refinement (file will be called *.LORES.out) [Boolean]
-dump                                            output pdbs that occur during the run, even if using silent file output.
```
## Opciones avanzadas
```
Advanced 
-s                                               Input PDBs to be used as fixed 'chunks' in fragment assembly
-in:file:silent                                  List of input files (in 'silent' format) that specify potential template structures or 'chunks'
-input_res                                       Positions at which 'chunks' are applied. If there is more than one chunk file, specify indices for
                                                   the first file and then the second file, etc.
                                                 (Used to be called -chunk_res.)
-cutpoint_closed                                 Positions at which to force transient chainbreaks (may be needed
                                                  if you get fold-tree errors)
-cutpoint_open                                   Positions at which strands end (better to specify separate strands
                                                  in FASTA file, or with spaces between strings in sequence)
-data_file                                       RDAT or legacy-format file with RNA chemical mapping data
```

## Opciones que normalmente no se usan (por completitud)
```
-filter_lores_base_pairs                         Filter for models that satisfy structure parameters. [Boolean] True by default.
-params_file                                     RNA params file name.[String]. For Example: -params_file chunk002_1lnt_.prm
                                                  Deprecated by -working_res option above.
-in:database                                     Path to rosetta databases. Default is based on location of rosetta executables. [PathVector]
-output_res_num                                  Numbering (and chain) of residues in output PDB or silent file. 
                                                  Better to specify in headers in .fasta file.
-staged_constraints                              Apply constraints in stages depending on sequence separation
-close_loops                                     Attempt closure across chainbreaks by cyclic coordinate descent after fragment moves [Boolean] Defaults to true.
```

# Consejos

## Formato de archivo 
<a name="File-Format" />

Ten en cuenta que en versiones antiguas de Rosetta los PDB pueden tener los tipos de residuo marcados como rA, rC, rG y rU y nombres de átomos inusuales. Las versiones de Rosetta publicadas después de la 3.5 tienen nombres de residuos y de átomos que coinciden con la nomenclatura estándar de BMRB/NDB. Si tienes un archivo PDB "estándar", hay un script de Python disponible para convertirlo al formato actual de Rosetta:

```
tools/rna_tools/bin/make_rna_rosetta_ready.py <pdb file>
```

## ¿Puedo especificar pares que no sean Watson-Crick? 
<a name="Can-I-specify-non-Watson-Crick-pairs?" />

También puedes especificar, en el archivo params, pares de bases que deben forzarse, incluso a costa de crear chainbreaks temporales, con una opción como

```
-obligate_pair_explicit 2 11 W W A
```

Esto también permite especificar pares de bases que no son Watson-Crick. En la línea anterior, puedes cambiar las W por H (borde Hoogsteen) o S (borde del azúcar), y la A por P (de antiparalelo a paralelo). Los bordes de las bases son esencialmente los mismos definidos en la clasificación de Leontis y Westhof. La segunda (A/P) se determina por la orientación relativa de las normales de las bases. [La clasificación cis/trans de Leontis y Westhof sería una alternativa a A/P, pero encontramos que A/P es más cómoda de calcular y de evaluar visualmente. Puedes indicar C/T para cis/trans, y se convertirá mediante una tabla de consulta.] Los pares de bases se toman de una biblioteca de pares de bases extraída del modelo cristalográfico de la subunidad ribosomal grande 1JJ2.

Al especificar pares, si no hay suficientes rupturas de hebra para que se formen todos los pares, el código intentará elegir una suite de ARN (que no sea de un tallo) en la que poner un cutpoint, que puede cerrarse durante el ensamblaje de fragmentos con la opción -close\_loops. Si quieres especificar de antemano dónde se elegirá este cutpoint, añade una opción como

```
-cutpoint_closed 6
```

## ¿Puedo usar fragmentos que aprovechen nuestra rica base de datos de apareamientos de bases? 

Sí: con la opción `-bps_moves` puedes pedir a la aplicación que intente tomar muestras de una base de datos de "pasos de pares de bases". Hay dos tipos de estos pasos. 

Primero, en los tallos (especificados mediante el archivo de estructura secundaria), los pares de bases adyacentes forman pasos de pares de bases, que involucran cuatro nucleótidos (i,i+1,j,j+1) donde (i,j+1) e (i+1,j) están apareados. Hay un conjunto de tales pasos en la base de datos de Rosetta, extraído del ribosoma. El FoldTree del ARN se configurará con las conexiones de salto (jump) y los cutpoints adecuados para que esas conformaciones de pasos de bases puedan sustituirse durante el ensamblaje de fragmentos.

Segundo, si has especificado pares obligados, pero con bordes y orientaciones de apareamiento desconocidos ('X' en el archivo params), se prepararán fragmentos especiales para esos pares que involucren nucleótidos adyacentes en la secuencia. Por ejemplo, si tu archivo params contiene una opción como:
```
-secstruct_general .((....)..).
```
o 
```
-obligate_pair 2 11  3 8 
```
usar la opción `-bps_moves` activará movimientos que sustituyen fragmentos con secuencia coincidente para los nucleótidos (2,3,8,11). Esto ocurre si, en al menos una hebra, el paso de pares de bases involucra residuos inmediatamente contiguos (2 y 3 en este ejemplo). En la otra hebra, el paso de pares de bases debe involucrar residuos contiguos o con no más de 3 residuos de protuberancia ("bulge") intermedios (8 y 11 en este ejemplo). Ten en cuenta que estos pasos de pares de bases incluirán, en general, pares no canónicos. Hay una demostración de esta funcionalidad aplicada al modelado del loop sarcina/ricina en `demos/public/RNA_Denovo_with_base_pair_steps/`

Nota: para pares no canónicos, por ahora no permitimos especificar bordes y orientaciones; la base de datos se vuelve muy escasa con ese nivel de especificación. Ten en cuenta también que, si hay un paso de pares de bases que incluye un par dentro de un tallo Watson/Crick y un "par obligado" más general, el apareamiento del tallo puede acabar siendo no Watson-Crick, algo que de todos modos ocurre a menudo con los pares de bases en el borde de los tallos.

## ¿Puedo especificar nucleótidos modificados químicamente?

¡Puedes y debes! Consulta la documentación del formato de [[RNA fasta file]] para ver los detalles.

## Véase también

* [RiboKit](https://ribokit.github.io/workflows/3D_modeling/): flujos de trabajo para el modelado 3D de ARN guiado por datos experimentales.
* [[RNA applications]]: página principal de las aplicaciones de ARN
* [[Structure Prediction Applications]]: lista de aplicaciones de predicción de estructura
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[RNA]]: guía para trabajar con ARN en Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de ejemplos de líneas de comando para ejecutar archivos ejecutables de Rosetta
* [RiboKit](http://ribokit.github.io/): paquetes de modelado y análisis de ARN mantenidos por el Das Lab
