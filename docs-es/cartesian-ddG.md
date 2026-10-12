#Aplicación cartesian\_ddg

Metadatos
========
La documentación se actualizó por última vez el 13 de agosto de 20125, por Rachel Clune. Las preguntas sobre esta documentación se pueden hacer en los canales how\_do\_i\_do\_x, documentation o debugging del Slack de Rosetta Commons. También puedes crear una nueva [Issue](https://github.com/RosettaCommons/rosetta/issues), crear una nueva [Discussion](https://github.com/RosettaCommons/rosetta/discussions) o ponerte en contacto con Frank DiMaio: dimaio(@u.washington.edu). La documentación es solo para el cálculo de ddg monomérico; aunque esta herramienta se puede usar para estudiar interacciones proteína-proteína y con moléculas pequeñas, otras herramientas (p. ej., [[InterfaceAnalyzer|Interface Analyzer]]) son mejores para esos fines. 

_Nota:_ [ThermoMPNN](https://github.com/Kuhlman-Lab/ThermoMPNN) es un método de aprendizaje automático que se puede usar para calcular el ddG de mutación; para información de benchmarking, consulta este [artículo](https://www.pnas.org/doi/10.1073/pnas.2314853121) de H. Dieckhaus, et al. En algunas situaciones puede rendir mejor que cartesian ddG; considera si es una herramienta mejor para tu aplicación. 


Referencia
==========

El algoritmo fue desarrollado por Phil Bradley y Yuan Liu. Los detalles sobre el método y los resultados del benchmark sobre el conjunto de datos de ddg monomérico ([[Kellogg et al. | ddg-monomer]]) se publicaron en:

Hahnbeom Park, Philip Bradley, Per Greisen Jr., Yuan Liu, Vikram Khipple Mulligan, David E Kim, David Baker, and Frank DiMaio (2016) "Simultaneous optimization of biomolecular energy function on features from small molecules and macromolecules", JCTC. [Texto completo](https://pubs.acs.org/doi/10.1021/acs.jctc.6b00819).

Se han descrito mejoras adicionales y benchmarking en:

Frenz, Brandon, Steven M. Lewis, Indigo King, Frank DiMaio, Hahnbeom Park, and Yifan Song. 2020. “Prediction of Protein Mutational Free Energy: Benchmark and Sampling Improvements Increase Classification Accuracy.” Frontiers in Bioengineering and Biotechnology 8 (October): 558247. [Texto completo](https://www.frontiersin.org/journals/bioengineering-and-biotechnology/articles/10.3389/fbioe.2020.558247/full).

Propósito
=======

El propósito de esta aplicación es predecir el cambio de estabilidad (el ddG) de mutaciones puntuales en una estructura proteica. El número de réplicas necesarias para producir los valores de ddG predichos se reduce considerablemente en comparación con [[ddg_monomer|ddg monomer]] gracias al uso del refinamiento en espacio cartesiano, que permite pequeños movimientos locales de la cadena principal durante el procedimiento de refinamiento. El ddG se calcula en [[unidades de energía de Rosetta|Units in Rosetta]] tomando la diferencia entre la estructura inicial (tipo silvestre) y la estructura mutada y relajada. Después se necesita un factor de escala de 2.94 para convertir estos valores a kcal/mol; consulta la información suplementaria del artículo de [Park, et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC5515585/) para más detalles. 

Opciones de línea de comandos
====================
Primero, el PDB de entrada debe estar correctamente relajado en espacio cartesiano, con las coordenadas de la cadena principal y de las cadenas laterales sin restricciones. 

_Nota:_ se ha comprobado que el relax sin restricciones produce menos errores de clasificación. Consulta el artículo de Frenz et al. para más detalles. Esto representa un cambio respecto a la versión anterior.

Consulta [[aquí|relax]] para más información; además, mira este ejemplo de línea de comandos:

```
This is the command line we used for preminimization:

$ROSETTABIN/relax -s $pdb -use_input_sc \
-ignore_unrecognized_res \
-nstruct 20 \
-relax:cartesian-score:weights ref2015_cart \
-relax:min_type lbfgs_armijo_nonmonotone \
-relax:script cart2.script \
-fa_max_dis 9.0 # modify fa_atr and fa_sol behavior, really important for protein stability (default: 6). This flag needs to match what is used in the cartesian ddg options below.

with file "cart2.script":

switch:cartesian
repeat 2
ramp_repack_min 0.02  0.01     1.0  50
ramp_repack_min 0.250 0.01     0.5  50
ramp_repack_min 0.550 0.01     0.0 100
ramp_repack_min 1     0.00001  0.0 200
accept_to_best
endrepeat

```

### Modo de estabilidad de proteínas

Un ejemplo de línea de comandos es
```
cartesian_ddg.linuxgccrelease
 -database $ROSETTADB
 -s [inputpdb]
 -ddg:mut_file [mutfile] # same syntax with what being used in ddg-monomer application.
 -ddg:iterations 3 # can be flexible; 3 is fast and reasonable
 -force_iterations false (default True) #If this flag is on the protocol will stop when the results converge on a score
 -ddg::score_cutoff 1.0 #If the lowest energy scores are within this cutoff the protocol will end early.
 -ddg::cartesian
 -ddg::dump_pdbs false # you can save mutants pdb if you want
 -bbnbr 1 # bb dof, suggestion: i-1, i, i+1
 -fa_max_dis 9.0 # modify fa_atr and fa_sol behavior, really important for protein stability (default: 6)  
 -[scorefunction option]: any other options for score function containing cart_bonded term, for example, -beta_cart or 
 -score:weights talaris2014_cart]
 -ddg::legacy false #Using the latest version of the code
```

Para el formato de ddg:mut_file, consulta [[aquí | ddg-monomer]]. Ten en cuenta que este archivo contiene las mutaciones que quieres introducir a la vez, lo que significa que, si especificas más de una mutación en un solo archivo, se intentará mutarlas todas juntas al mismo tiempo. Por tanto, para escanear mutaciones por separado (p. ej., un escaneo de ALA) habrá que ejecutar esta aplicación por separado usando distintos mut_file como entrada.


### Modo de interfaz

Esta aplicación puede realizar simulaciones de PPI y de proteína con moléculas pequeñas. **Esto no se ha sometido a un benchmarking exhaustivo.** Para este tipo de estudios se recomiendan otras herramientas, como [[InterfaceAnalyzer|Interface Analyzer]]. 

Opciones opcionales:
```
-mut_only #skip native structure
-interface_ddg -1 #jump number for interface (-1 means the last jump)
```

Aquí la aplicación calcula las diferencias de energía separando "la parte del Pose definida por el último jump" del resto del Pose; la forma más fácil de hacerlo es editar el PDB de entrada para que el ligando (ya sea una proteína o una molécula pequeña)
quede al final. Se puede comprobar si funciona bien ejecutando con la opción adicional "-ddg:dump_pdbs", que producirá *_bj.pdb (antes de la disociación) y *_aj.pdb (después de la disociación). 

Opciones y parámetros de Frenz et al. (cartddg2020)
==========================================

## Preparación:

```
ROSETTASCRIPTS>
    <SCOREFXNS>
        <ScoreFunction name="fullatom" weights="ref2015_cart" symmetric="0">
        </ScoreFunction>
	</SCOREFXNS>
	<MOVERS>
        <FastRelax name="fastrelax" scorefxn="fullatom" cartesian="1" repeats="4"/> 
	</MOVERS>
	<PROTOCOLS>
        <Add mover="fastrelax"/>
    </PROTOCOLS>
    <OUTPUT scorefxn="fullatom"/>
</ROSETTASCRIPTS>
```

```
rosetta_scripts.static.release \
    -database $ROSETTA_DATABASE \
    -s /workdir/input.pdb\
    -parser:protocol /workdir/relax.xml\
    -default_max_cycles 200\
    -missing_density_to_jump\
    -ignore_zero_occupancy false\
    -fa_max_dis 9
```

## Ejecución:

```
#!/bin/bash
cartesian_ddg\
    -database $ROSETTA3_DB\
    -s ${input.pdb}\
    -ddg::iterations 5\
    -ddg::score_cutoff 1.0\
    -ddg::dump_pdbs false\
    -ddg::bbnbrs 1\
    -score:weights ref2015_cart\
    -ddg::mut_file ${mutfile.mut}\
    -ddg:frag_nbrs 2\
    -ignore_zero_occupancy false\
    -missing_density_to_jump \
    -ddg:flex_bb false\
    -ddg::force_iterations false\
    -fa_max_dis 9.0\
    -ddg::json true\
    -ddg:legacy false
```

Salidas esperadas y posprocesamiento
===============

Al ejecutar la aplicación se producirá un archivo llamado [pdbfile_prefix]\_[mutationindex].ddg; por ejemplo, 1ctf\_G44S.ddg.

El archivo contiene líneas (modo monómero):
```
COMPLEX: RoundX: [WT or MUT\_XXXX]: [totalscore] fa_atr: [fa\_atr] .....

```

En el artículo, la diferencia de las puntuaciones totales (totalscores) promediadas en 3 rondas para WT y MUT se toma como ddG. Usar las puntuaciones más bajas de cada ronda funciona igual de bien, como se muestra en el artículo de Frenz de 2020, al igual que ejecutar hasta que las puntuaciones converjan dentro de 1 REU:

```
ddG = avrg(MUT totalscore) - avrg(WT totalscore)

```

Con el modo de interfaz, 

```
COMPLEX: RoundX: [WT or MUT\_XXXX]: [totalscore] fa_atr: [fa\_atr] .....
APART: RoundX: [WT or MUT\_XXXX]: [totalscore] fa_atr: [fa\_atr] .....
OPT_APART: RoundX: [WT or MUT\_XXXX]: [totalscore] fa_atr: [fa\_atr] .....


ddG_bind = avrg(COMPLEX MUT totalscore) - avrg(COMPLEX WT totalscore)
ddG_mono = avrg(OPT_APART MUT totalscore) - avrg(OPT_APART WT totalscore)

```

Una forma sencilla de estimar el ddG de unión es usar solo ddG_bind, después de convertir de [[unidades de energía de Rosetta|Units in Rosetta]] a kcal/mol. También se puede combinar con ddG_mono para considerar además el cambio de estabilidad monomérica; la forma de combinar ambos valores no se ha sometido a un benchmarking exhaustivo dentro de la aplicación cartesian_ddg.

##Véase también

* [[Aplicación ddg_monomer| ddg-monomer]]: una aplicación para predecir el ddG de mutaciones puntuales en proteínas monoméricas.
* [[Aplicaciones de análisis | analysis-applications]]: otras aplicaciones de diseño.
* [[Escaneo de mutaciones puntuales| pmut-scan-parallel ]]: detección paralela de mutaciones puntuales estabilizadoras mediante diseño.
* [[Application Documentation]]: página principal de la documentación de las aplicaciones.
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta.
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta.
* [[Units in Rosetta]]: una descripción de cómo maneja Rosetta las distintas unidades.
