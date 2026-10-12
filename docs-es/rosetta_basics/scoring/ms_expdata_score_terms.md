# Términos de puntuación de MS de marcaje covalente

Autores:
* Sarah Biehn (biehn.4@osu.edu) (`hrf_dynamics` y `depc_ms`)
* Melanie Aprahamian (aprahamian.4@osu.edu) (`covalent_labeling`, `hrf_ms_labeling` y la aplicación `per_residue_solvent_exposure`)
* Investigador principal: Steffen Lindert (lindert.1@osu.edu)

Fecha de creación: 27 de julio de 2018
Actualizado: 29 de junio de 2021

## Espectrometría de masas de marcaje covalente
El marcaje covalente (a veces llamado «footprinting de proteínas») consiste en exponer una proteína en solución a un pequeño reactivo de marcaje que se unirá covalentemente a ciertas cadenas laterales de aminoácidos expuestas al solvente, mientras que las cadenas laterales enterradas en el núcleo de la proteína o ocluidas por subunidades proteicas que interactúan no se marcarán. Esto aporta información sobre la ubicación relativa de ciertos aminoácidos respecto del solvente (ya sea en la superficie y expuestos al solvente, o enterrados dentro de la estructura de la proteína o del complejo proteico). Existen diversos reactivos de marcaje: algunos son muy específicos en cuanto a qué aminoácidos pueden reaccionar con el reactivo y otros tienen un abanico mucho más amplio de residuos diana potenciales.

Por sí solos, los experimentos de MS de marcaje covalente no aportan información suficiente para determinar la estructura terciaria de una proteína, pero al usar la información junto con Rosetta, mejora la calidad de los modelos generados.

Los resultados experimentales suelen representarse en forma de factores de protección (PF). Definimos el factor de protección como el cociente entre la reactividad intrínseca relativa del residuo i y la constante de velocidad de marcaje k determinada experimentalmente. El logaritmo natural de los PF proporciona una medida cuantitativa que se correlaciona con la exposición relativa al solvente de un residuo (que se puede determinar fácilmente dentro de Rosetta).

**Publicación de HRPF**: [Biehn and Lindert, _Nat. Comm._ 2021] (https://www.nature.com/articles/s41467-020-20549-7).
Consulta la Nota suplementaria 1 de la publicación para un tutorial detallado de la generación de modelos ab initio y del uso del término de puntuación, con las líneas de comandos correspondientes.

**Publicación de DEPC**: [Biehn, Limpikirati, Vachet, and Lindert, _Anal. Chem._ 2021] (https://pubs.acs.org/doi/full/10.1021/acs.analchem.1c00395).
Consulta la Nota suplementaria 1 de la publicación para un tutorial detallado de la generación de modelos por homología y del uso del término de puntuación, con las líneas de comandos correspondientes.

## Footprinting de proteínas con radicales hidroxilo (HRPF)
Hemos desarrollado el término de puntuación `hrf_dynamics`, que usa datos de lnPF de experimentos de MS de HRPF para premiar los modelos que concuerdan con los datos experimentales.

El método de energía se encuentra en `Rosetta/main/source/src/core/energy_methods/HRFDynamicsEnergy.cc`.

### Exposición al solvente por residuo para HRPF
Para calcular la exposición relativa al solvente de un residuo en un modelo dado, identificamos una ecuación de predicción que relaciona el recuento de vecinos cónicos calculado a partir de 30 modelos de mover con datos experimentales de entrada en forma de lnPF. Este cálculo del recuento de vecinos usa una función logística con un punto medio de distancia de `9.0`, una pendiente de distancia de `1.0`, un punto medio de ángulo de `pi/2` y una pendiente de ángulo de `2pi`. Para determinar el recuento de vecinos, se escribió una aplicación sencilla que lee un PDB y genera como salida un recuento de vecinos por residuo: `Rosetta/main/source/src/apps/public/analysis/per_residue_solvent_exposure.cc`.

### Uso
Para usar `hrf_dynamics` se necesita un archivo de texto de entrada que contenga los lnPF derivados experimentalmente para los tipos de residuo W, Y, F, H y L junto con los números de residuo correspondientes. El formato general de este archivo de entrada es:

```
#RESIDUE NUMBER, lnPF
7	4.0943445622
14      4.370597939
33      5.634789603
...
```

El archivo de pesos asociado, `hrf_dynamics.wts`, da a esta puntuación un peso de `12.0`. Esto se optimizó basándose únicamente en la repuntuación de modelos _ab initio_ generados previamente. Hace falta más trabajo para optimizarlo para su uso con [Abinitio Relax](https://www.rosettacommons.org/docs/wiki/application_documentation/structure_prediction/abinitio-relax).

Uso en la línea de comandos para repuntuar modelos:
```
~/Rosetta/main/source/bin/score.linuxgccrelease 
   -database /path/to/rosetta/main/database 
   -in:file:s S_000001.pdb 
   -score:hrf_dynamics_input labeling_input_file.txt
   -score:weights hrf_dynamics.wts 
```

### Construcción de modelos de mover a partir de los modelos _ab initio_ con mejor puntuación
Los modelos de mover se generan con un script XML de Rosetta: `Rosetta/main/source/scripts/rosetta_scripts/public/flexibility/nma_relax.xml`.
Uso en la línea de comandos para la generación de modelos de mover:
```
~/Rosetta/main/source/bin/rosetta_scripts.linuxgccrelease -s S_000001.pdb -nstruct 30 -parser:protocol ~/Rosetta/main/source/scripts/rosetta_scripts/public/flexibility/nma_relax.xml
```
Los modelos de mover se pueden puntuar luego con `hrf_dynamics`.

## Marcaje covalente con dietilpirocarbonato (DEPC)
Hemos desarrollado el término de puntuación `depc_ms`, que usa datos de marcaje con DEPC como estado de marcaje (`L` para marcado, `U` para no marcado) y números de residuo para premiar los modelos que concuerdan con los datos experimentales. Los residuos de serina, treonina y tirosina con una SASA relativa del 5-35% se premian si están marcados y tienen más vecinos hidrofóbicos o si no están marcados y tienen menos vecinos hidrofóbicos. Los residuos de histidina y lisina marcados con DEPC se premian por tener una SASA relativa más alta.

El método de energía se encuentra en `Rosetta/main/source/src/core/energy_methods/DEPC_MS_Energy.cc`.

### Uso
Para usar `depc_ms` se necesita un archivo de texto de entrada que contenga el estado de marcaje (`L` o `U`) junto con el número de residuo correspondiente para los tipos de residuo H, K, S, T e Y. El formato general de este archivo de entrada es:

```
#Residue number, Label Status
3	L
16      L
24      L
39      U
...
```

El archivo de pesos asociado, `depc_ms.wts`, da a esta puntuación un peso de `9.0`. Esto se optimizó basándose únicamente en la repuntuación de modelos _ab initio_ generados previamente. Hace falta más trabajo para optimizarlo para su uso con [Abinitio Relax](https://www.rosettacommons.org/docs/wiki/application_documentation/structure_prediction/abinitio-relax).

Uso en la línea de comandos para repuntuar modelos:
```
~/Rosetta/main/source/bin/score.linuxgccrelease 
   -database /path/to/rosetta/main/database 
   -in:file:s S_000001.pdb 
   -score:depc_ms_input labeling_input_file.txt
   -score:weights depc_ms.wts 
```

## Marcaje covalente general

Para generalizar aún más el uso de datos de marcaje covalente en la predicción de estructuras de proteínas, se desarrollaron dos nuevos términos de puntuación para usarse junto con AbinitioRelax: `covalent_labeling` y `covalent_labeling_fa`. Estos términos de puntuación residen en `CovalentLabelingEnergy.cc` y `CovalentLabelingFAEnergy.cc`, respectivamente.

Ambas versiones del término de puntuación toman como entradas el resID del residuo marcado y los recuentos de vecinos correspondientes (corresponde al usuario identificar cómo correlacionar los datos experimentales con una medida de recuento de vecinos). La versión centroid del término de puntuación (`covalent_labeling`) se usa durante la fase Abinitio de baja resolución y los pesos se controlan mediante los archivos de parche de pesos que se encuentran en la `database` (`score*_covalentlabeling.patch_wts`). La versión de todos los átomos se usa en la fase Relax y el peso se controla mediante el archivo de pesos `covalent_labeling_fa.wts`.

###Uso

La forma general del término de puntuación de marcaje covalente se diseñó para usarse ya sea para repuntuar (como el término de puntuación HRF de arriba) o en `AbinitioRelax` para guiar la generación de modelos.

Se necesita un archivo de entrada (al que nos referiremos simplemente como `covalent_labeling_input_file.txt`), definido con 2 columnas de la siguiente manera:

```
#RESIDUE NUMBER, NEIGHBOR COUNT
2 9.741145
3 6.41184
6 11.2967
15 13.1428
16 12.6952
...
```

Se puede usar un archivo `flags` para definir todas las entradas necesarias:

```
-abinitio
 -stage1_patch score0_covalentlabeling.wts_patch
 -stage2_patch score1_covalentlabeling.wts_patch
 -stage3a_patch score2_covalentlabeling.wts_patch
 -stage3b_patch score5_covalentlabeling.wts_patch
 -stage4_patch score3_covalentlabeling.wts_patch
 -relax
-relax
 -fast
-in
 -file
  -fasta /path/to/protein.fasta
  -frag3 /path/to/frags_3
  -frag9 /path/to/frags_9
  -native /path/to/protein.pdb
-score
 -covalent_labeling_input /path/to/covalent_labeling_input_file.txt
 -covalent_labeling_fa_input /path/to/covalent_labeling_input_file.txt
 -weights covalent_labeling_fa.wts
-out
 -nstruct #
```

Para ejecutar el comando, sigue los métodos estándar para ejecutar [Abinitio Relax](https://www.rosettacommons.org/docs/wiki/application_documentation/structure_prediction/abinitio-relax).

##Véase también

* [[Scoring explained]]
* [[Score types]]
* [[Centroid vs fullatom]]
* [[Scorefunction history]]
* [[Adding a new energy method to Rosetta|new-energy-method]]
