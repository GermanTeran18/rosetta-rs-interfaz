# Plegamiento directo sesgado (Biased forward folding)

#Metadatos

Autores: Daniel-Adriano Silva (dadriano@gmail.com) y Enrique Marcos (emarcos82@gmail.com); investigador principal: David Baker

Propósito
==========

La predicción de estructura ab initio es una prueba muy exigente de la compatibilidad entre secuencia y estructura en los diseños de proteínas de novo. Se suele considerar un buen indicador de la calidad de un diseño que el paisaje de energía tenga forma de embudo, con la estructura diseñada como mínimo global de energía y una diferencia de energía sustancial respecto de las conformaciones alternativas. Sin embargo, es una técnica costosa computacionalmente que solo puede ejecutarse para un puñado de diseños. En cambio, las simulaciones de plegamiento directo sesgado (Biased forward folding) [1,2] permiten identificar rápidamente los diseños con más probabilidades de lograr un muestreo conformacional cercano al nativo en simulaciones ab initio estándar. Las simulaciones de plegamiento se sesgan hacia la conformación diseñada usando, en cada posición de residuo, un subconjunto pequeño (tres) de los fragmentos con menor RMSD (de 9 y 3 residuos) respecto de la estructura diseñada. Si no se logra un muestreo cercano al nativo en estas condiciones favorables, es muy poco probable que ocurra en trayectorias ab initio estándar. Además, usar menos fragmentos reduce el espacio conformacional que hay que explorar y, con ello, el número de trayectorias simuladas y el costo computacional total. De este modo se pueden examinar rápidamente miles de diseños y dedicar las simulaciones ab initio estándar a caracterizar los más prometedores.

Preparación de la simulación
==========
Dado un par secuencia-estructura diseñado, primero se escogen los fragmentos como se hace habitualmente en la predicción de estructura ab initio con Rosetta. Luego, un script de Python lee los archivos de fragmentos de 9 y 3 residuos generados e identifica el número deseado de fragmentos de 9 y de 3 residuos más cercanos a la estructura objetivo en RMSD de C-alfa. Con frecuencia se usan los tres fragmentos más cercanos para reducir de forma sustancial el número de trayectorias de plegamiento necesarias (entre 30 y 50) para evaluar si la estructura objetivo es alcanzable mediante plegamiento ab initio.

Entrada y salida
==========
La forma más rápida de seleccionar los fragmentos más cercanos en RMSD es comenzar con una comprobación de calidad de fragmentos de la estructura diseñada, como se hace habitualmente en el diseño de proteínas de novo para evaluar la compatibilidad local entre la secuencia diseñada y la estructura. Esto implica calcular, después de escoger los fragmentos, el RMSD entre los fragmentos generados y los de la estructura diseñada (input.pdb): 

```
r_frag_quality.default.linuxgccrelease -in:file:native input.pdb -f  input.200.3mers -out:qual frag_qual3.dat
r_frag_quality.default.linuxgccrelease -in:file:native input.pdb -f  input.200.9mers -out:qual frag_qual9.dat
```

Después, el script de Python (lowrms_frag_topN.py, que se puede descargar desde https://github.com/emarcos/biased_forward_folding/) lee los archivos frag_qual.dat generados antes, que contienen los RMSD de los fragmentos, y genera nuevos archivos de fragmentos de 9 y 3 residuos con los ntop fragmentos de menor RMSD. 

```
python lowrms_frags_topN.py -frag_qual frag_qual3.dat -ntop 3 -fullmer input.200.3mers -out input.3t200.3mers
python lowrms_frags_topN.py -frag_qual frag_qual9.dat -ntop 3 -fullmer input.200.9mers -out input.3t200.9mers
```

Con los archivos de fragmentos recién generados (input.3t200.3mers e input.3t200.9mers), se ejecuta una simulación estándar de predicción de estructura ab initio con un número pequeño de trayectorias (un valor conveniente es un -nstruct entre 30 y 50):

```
minirosetta.default.linuxgccrelease  -ex1 1 -ex2aro 1 -abinitio::fastrelax 1 -relax::default_repeats 15 -abinitio::use_filters false -abinitio::increase_cycles 10  -frag3 input.3t200.3mers -frag9 input.3t200.9mers -abinitio::number_3mer_frags 1 -abinitio::number_9mer_frags 1  -abinitio::rsd_wt_loop 0.5 -abinitio::rsd_wt_helix 0.5 -abinitio::rg_reweight 0.5  -in:file:native input.pdb  -silent_gz 1 -out:file:silent fold_input.out -out:file:scorefile fold_input.sc -nstruct 30
```

Referencias
==========
(1) [Enrique Marcos, Benjamin Basanta, Tamuka M. Chidyausiku, Yuefeng Tang, Gustav Oberdorfer, Gaohua Liu, G.V.T. Swapna, Rongjin Guan, Daniel-Adriano Silva, Jiayi Dou, Jose Henrique Pereira, Rong Xiao, Banumathi Sankaran, Peter H. Zwart, Gaetano T. Montelione, David Baker. "Principles for designing proteins with cavities formed by curved beta-sheets." Science 355, 6321 (2017): 201-206.](https://www.ncbi.nlm.nih.gov/pubmed/28082595)

(2) [Enrique Marcos, Daniel-Adriano Silva. "Essentials of de novo protein design: Methods and applications", Wiley Interdisciplinary Reviews Computational Molecular Sciences, e1374 (2018)](https://onlinelibrary.wiley.com/doi/abs/10.1002/wcms.1374)
