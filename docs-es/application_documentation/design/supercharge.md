#Supercharge - rediseño de superficies de proteínas con alta carga neta

Metadatos
========

Autor: Bryan Der, contacto: Brian Kuhlman bkuhlman [at] email.unc.edu

Enero de 2013, por Bryan Der (bder [at] email.unc.edu), laboratorio Kuhlman (bkuhlman [at] email.unc.edu)

Código y demostración
=====================

- El código está en un solo archivo, `src/apps/public/design/supercharge.cc`   
- Prueba de integración: `ain/tests/integration/tests/supercharge`  
- Demostración: `demos/public/supercharge`  

Las ejecuciones de producción siguen siendo rápidas y ligeras: solo requieren packrotamers para las posiciones de la superficie, y recomendamos ejecutar el protocolo varias veces con una variedad de cargas netas objetivo. Experimentalmente es difícil decir cuál será la carga neta óptima, por lo que conviene probar en el laboratorio un espectro de cargas netas.

Referencias
===========

* Modo AvNAPSA: Lawrence MS, Phillips KJ, Liu DR. Supercharging proteins can impart unusual resilience. J Am Chem Soc. 2007 Aug 22;129(33):10110-2. 
* Modo Rosetta: Der BS, Kluwe C, Miklos AE, Jacak R, Lyskov S, Gray JJ, Georgiou G, Ellington AD, Kuhlman B. Alternative computational protocols for supercharging protein surfaces for reversible unfolding and retention of stability. PLoS One. 2013 May 31;8(5):e64363.

Propósito
===========================================

Rediseñar las superficies de las proteínas para que tengan una carga neta alta, lo que se llama supercharging, puede mejorar la reversibilidad del desplegamiento al evitar la agregación de estados parcialmente desplegados. La agregación es un obstáculo común para el uso de proteínas en biotecnología y medicina. La carga neta, más que el número de residuos cargados, suele ser un indicador de la propensión a la agregación. Además, las proteínas y los péptidos muy catiónicos son capaces de entrar en las células sin vectores virales, y las proteínas muy aniónicas son filtradas por los riñones más lentamente que las proteínas neutras o catiónicas.

Hay que determinar las posiciones óptimas para incorporar cadenas laterales cargadas, ya que numerosas mutaciones y la acumulación de cargas del mismo signo también pueden desestabilizar el estado nativo. Un enfoque demostrado anteriormente muta de forma determinista los residuos polares flexibles (aminoácidos DERKNQ) con el menor número promedio de átomos vecinos por átomo de cadena lateral. Nuestro enfoque usa cálculos de energía basados en Rosetta para elegir las mutaciones de superficie. En este protocolo se implementan ambos enfoques automatizados de supercharging.

Algoritmo
=========

En pocas palabras, las opciones del usuario rigen la definición de los residuos de superficie y la tarea del packer, y luego se usa PackRotamersMover para rediseñar la superficie.

En detalle, el servidor de supercharge puede ejecutarse en cuatro modos distintos:
- AvNAPSA con una carga neta objetivo
- AvNAPSA con un umbral de superficie
- Rosetta con una carga neta objetivo
- Rosetta con un umbral de superficie

Este es el flujo de trabajo de cada modo: 

**Modo AvNAPSA, carga objetivo**

1.  Definir la superficie. Ordenar los residuos NQ y RK/DE por valor de AvNAPSA (de menor a mayor)
2.  Siguiente residuo de la lista ordenada: positivo: mutar DENQ–\>K; negativo: mutar RKQ–\>E y N–\>D
3.  Si la carga neta = carga neta objetivo, generar el pdb

**Modo AvNAPSA, umbral de superficie**

1.  Definir la superficie por valor de AvNAPSA (\<100 por defecto)
2.  Para cada residuo NQ y DE/RK de la superficie: positivo: mutar DENQ--\>K; negativo: mutar RKQ–\>E y N–\>D
3.  Generar el pdb

**Modo Rosetta, umbral de superficie y carga objetivo**

1.  Definir la superficie. Calculadora de vecinos por distancia (distancia CB), \<16 vecinos por defecto, o definir la superficie por valor de AvNAPSA (\<100 por defecto)
2.  Establecer la tarea de diseño 
    * leer el resfile del usuario, si se proporciona 
    * dont\_mutate gly, pro, cys 
    * dont\_mutate cadenas laterales con enlaces de hidrógeno 
    * dont\_mutate residuos con la carga correcta
3.  Establecer las energías de referencia de RK/DE, partiendo de los valores dados por el usuario
4.  Mover pack rotamers
5.  Comprobar la carga neta, aumentar o disminuir las energías de referencia (volver al paso 3.)
6.  Cuando una ejecución de pack rotamers da la carga neta correcta, generar el pdb

**Modo Rosetta, umbral de superficie y energías de referencia dadas para los tipos de residuos cargados deseados (Arg/Lys para supercharging positivo, Asp/Glu para supercharging negativo)**

1.  Definir la superficie. Calculadora de vecinos por distancia (distancia CB), \<16 vecinos por defecto, o definir la superficie por valor de AvNAPSA (\<100 por defecto)
2.  Establecer la tarea de diseño 
    * leer el resfile del usuario, si se proporciona 
    * dont\_mutate gly, pro, cys 
    * dont\_mutate cadenas laterales con enlaces de hidrógeno 
    * dont\_mutate residuos con la carga correcta
3.  Establecer las energías de referencia de RK/DE, usando los valores dados por el usuario
4.  Mover pack rotamers
5.  Generar el pdb

Limitaciones
============

Este código NO predice la carga neta que será suficiente para evitar la agregación y favorecer el replegamiento, ni para mediar la entrada celular sin vectores virales de proteínas catiónicas. El protocolo debe ejecutarse numerosas veces para obtener un espectro de cargas netas, y varias variantes deben probarse en el laboratorio.

Modos
=====

Se implementan dos modos, que se denominan AvNAPSA supercharge (Asc) y Rosetta supercharge (Rsc). Filosofía de AvNAPSA supercharge (Asc): mutar los residuos polares más expuestos para minimizar el cambio estructural o la desestabilización. Solo se pueden mutar residuos DE-RK-NQ. Filosofía de Rosetta supercharge (Rsc): mutar las posiciones de residuos que conservan o agregan interacciones favorables en la superficie. También se pueden mutar los residuos de superficie hidrofóbicos y los polares pequeños.

Inconvenientes de AvNAPSA: mutar residuos polares de la superficie puede eliminar enlaces de hidrógeno. La terminación de hélices (capping), la interacción de hebras de borde y la estabilización de loops resultan todas de enlaces de hidrógeno de superficie. Además, este protocolo automatizado muta N a D y Q a E, pero N y Q a veces actúan simultáneamente como donante y aceptor de enlaces de hidrógeno.

Inconvenientes de Rosetta: mutar posiciones menos expuestas puede dar mejores energías calculadas, pero los errores en esas posiciones pueden desestabilizar. AvNAPSA favorece los intercambios de carga, por lo que Rosetta requiere más mutaciones para lograr la misma carga neta.

El enfoque de AvNAPSA varía la carga neta ajustando el umbral de superficie. El enfoque de Rosetta varía la carga neta ajustando las energías de referencia de los residuos cargados positiva o negativamente.

Archivos de entrada
===================

-   El único archivo de entrada obligatorio es el PDB que se va a rediseñar. Si la estructura inicial son modelos de homología, conjuntos de RMN o estructuras cristalinas relajadas, se puede usar -l.
-   Opcionalmente, el usuario puede usar un resfile para especificar posiciones de residuos que NO se deben mutar (NATAA o NATRO). Esto sería útil, por ejemplo, para conservar una superficie de unión conocida. El valor por defecto del resfile de entrada debe ser ALLAA y el protocolo supercharge restringe los residuos permitidos en las posiciones diseñables. Por ejemplo, por defecto no se permite mutar los residuos Gly, Pro y Cys ni las cadenas laterales con enlaces de hidrógeno.

Si hay algún tipo de archivo de entrada especial, descríbelo aquí.

-   No hay tipos de archivo de entrada especiales.

Opciones
========

Opciones de los modos AvNAPSA y Rosetta:
-------------------

target\_net\_charge\_active BOOL def(false); // supercharge mutará la superficie para lograr el valor de carga neta objetivo (abajo). Control booleano para la implementación en ROSIE (en lugar de .user() ) 

target\_net\_charge SIGNED\_INT def(0); //AvNAPSA: las posiciones de residuos se mutan una a una, de la más expuesta a la menos expuesta, hasta alcanzar la carga neta objetivo. Rosetta: las energías de referencia de Arg/Lys/Asp/Glu se incrementan hasta que PackRotamers da la carga neta objetivo.

surface\_atom\_cutoff UNSIGNED\_INT def(100); // así define AvNAPSA la superficie; se puede usar en cualquiera de los dos enfoques

compare\_residue\_energies\_all BOOL def(false); //imprime en el archivo de log un análisis completo de energía residuo por residuo 

compare\_residue\_energies\_mut BOOL def(true); //incluye solo los residuos mutados en el análisis de energía

resfile FILE; así puedes especificar qué residuos no mutar. El valor por defecto debe ser ALLAA, y los ajustes residuo por residuo deben ser NATAA, como se muestra a continuación:

```
ALLAA
start
  20  A  NATAA
  24  A  NATAA
  26  A  NATAA
```

¡si el valor por defecto fuera NATRO, por ejemplo, no se produciría ningún diseño!

Opciones del modo AvNAPSA:
-------------------

AvNAPSA\_positive BOOL def(false); //ejecuta AvNAPSA de carga positiva

AvNAPSA\_negative BOOL def(false); //ejecuta AvNAPSA de carga negativa

surface\_atom\_cutoff UNSIGNED\_INT def(100); // así define AvNAPSA la superficie; se puede usar en los modos AvNAPSA o Rosetta. \<100 es adecuado para un supercharging ligero y \<150 para un supercharging intenso. Rosetta suele definir la superficie según el número de residuos vecinos (\<16 por defecto). Las definiciones de superficie basadas en átomos y en residuos se correlacionan con un R cuadrado de 0.85, así que son moderadamente similares.

Opciones del modo Rosetta:
-------------------

surface\_residue\_cutoff UNSIGNED\_INT def(16); //los residuos con \<16 residuos vecinos a menos de 10 Å se consideran parte de la superficie

include\_arg BOOL def(false); //usa arginina en Rosetta supercharge 

include\_lys BOOL def(false); //usa lisina en Rosetta supercharge 

include\_asp BOOL def(false); //usa aspartato en Rosetta supercharge 

include\_glu BOOL def(false); //usa glutamato en Rosetta supercharge

las energías de referencia de los tipos de residuos cargados regirán la carga neta de los diseños de Rosetta. Rosetta puede elegir entre los tipos de residuos cargados permitidos y el residuo nativo. Energías de referencia más negativas darán lugar a más mutaciones de carga. El usuario puede incrementar los valores de las energías de referencia para variar la carga neta resultante. Para carga positiva, se ignorarán los valores de refweight\_asp y refweight\_glu. Para carga negativa, se ignorarán los valores de refweight\_lys y refweight\_arg. 

refweight\_arg FLOAT def(-0.98); 

refweight\_lys FLOAT def(-0.65); 

refweight\_asp FLOAT def(-0.67); 

refweight\_glu FLOAT def(-0.81);

dont\_mutate\_glyprocys BOOL def(true); //la glicina, la prolina y la cisteína suelen tener funciones estructurales especiales en las proteínas; por defecto no se mutan.

dont\_mutate\_correct\_charge BOOL def(true); //es decir, no mutar arginina a lisina ni aspartato a glutamato.

dont\_mutate\_hbonded\_sidechains BOOL def(true); //no mutar residuos cuyas cadenas laterales forman un enlace de hidrógeno

pre\_packminpack BOOL def(false); //Packrotamers siempre se hace como primer paso. Esta opción va un paso más allá y ejecuta packrotamers, minimización de cadena lateral + cadena principal y packrotamers sobre la estructura de entrada antes de realizar el paso de diseño de supercharge.

nstruct UNSIGNED\_INT def(1); //el diseño de secuencia por Monte Carlo de una superficie de proteína suele ser convergente, pero sigue siendo estocástico; si se desea, se pueden realizar varias ejecuciones de diseño.

Consejos
========

ex1 y ex2 no son muy importantes, ya que este protocolo solo rediseña la superficie. Para conjuntos de modelos de homología o conjuntos de RMN, recomendamos aplicar supercharging a todas las estructuras de entrada y elegir las mutaciones de consenso. Para aplicar supercharging a una sola estructura cristalina, o a conjuntos, recomendamos generar diseños con un espectro de cargas netas. Como el reempaquetado de la superficie converge en secuencias similares, no recomendamos usar nstruct \> 10 (de hecho, nstruct no se usa en el modo AvNAPSA porque la secuencia es determinista). En el supercharging positivo, puedes sesgar la elección de Arg frente a Lys dando energías de referencia distintas a los dos residuos. Lo mismo vale para el supercharging negativo. El protocolo vuelca PDB de salida con nombres personalizados que se documentan a sí mismos, por lo que yo uso jd2:no\_output.

Salidas esperadas
=================

Salida 1: PDB

Salida 2: resfile. Es un resfile de salida (no de entrada) para que el usuario pueda ver cómo fue la tarea de diseño.

Salida 3: log. La salida incluye la carga neta, el número de mutaciones, cuáles son las mutaciones, la selección de pymol para ver cómodamente los residuos mutados y una comparación de energía residuo por residuo entre la estructura diseñada y la inicial.

Estas son algunas de las líneas que encontrarás en el archivo de log:

```
apps.public.supercharge: residue: 194  heavy: 8  sidechain: 5  AvNAPSA_value: 109
apps.public.supercharge: residue: 200  heavy: 9  sidechain: 5  AvNAPSA_value: 96
apps.public.supercharge: residue: 205  heavy: 9  sidechain: 5  AvNAPSA_value: 101
apps.public.supercharge: residue 206 is already negative
apps.public.supercharge: residue: 208  heavy: 8  sidechain: 5  AvNAPSA_value: 50
apps.public.supercharge: residue 209 is already negative
apps.public.supercharge: residue: 210  heavy: 9  sidechain: 5  AvNAPSA_value: 46
apps.public.supercharge: residue: 211  heavy: 11  sidechain: 5  AvNAPSA_value: 97

apps.public.supercharge: Starting net charge is -5 and AvNAPSA_target_net_charge is -25
apps.public.supercharge: Mutate 210
apps.public.supercharge: Mutate 208
apps.public.supercharge: Mutate 152
apps.public.supercharge: Mutate 153
apps.public.supercharge: Mutate 25
apps.public.supercharge: Mutate 51
apps.public.supercharge: Mutate 38
apps.public.supercharge: Mutate 97
apps.public.supercharge: Mutate 127
apps.public.supercharge: Mutate 164
apps.public.supercharge: Mutate 200
apps.public.supercharge: Mutate 103
apps.public.supercharge: PYMOL_SELECT AVNAPSA residues: 210+208+152+153+25+51+38+97+127+164+200+103+

apps.public.supercharge: NEW NAME FOR SUPERCHARGED OUTPUT: 2B3P_A_min_AvNAPSA_neg_96_-25.pdb
apps.public.supercharge: 2B3P_A_min_AvNAPSA_neg_96_-25.pdb  R=7, K=12, D=19, E=25
apps.public.supercharge: 2B3P_A_min_AvNAPSA_neg_96_-25.pdb  Net Charge = -25
apps.public.supercharge: 2B3P_A_min_AvNAPSA_neg_96_-25.pdb  Mutations: K26E, N39D, K52E, K101E, K107E, K131E, K156E, Q157E, R168E, Q204E, N212D, K214E,
apps.public.supercharge: 2B3P_A_min_AvNAPSA_neg_96_-25.pdb  # of mutations: 12
apps.public.supercharge: 2B3P_A_min_AvNAPSA_neg_96_-25.pdb  select 26+39+52+101+107+131+156+157+168+204+212+214+

apps.public.supercharge: pdbname residue total fa_atr fa_rep fa_sol fa_intra_rep pro_close fa_pair hbond_sr_bb hbond_lr_bb hbond_bb_sc hbond_sc dslf_ss_dst dslf_cs_ang dslf_ss_dih dslf_ca_dih rama omega fa_dun p_aa_pp ref
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 10 0.3644 0.2911 -0.3058 0.3239 -1.4283 0.0000 -1.0593 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.7930 0.0000 2.3999 1.0869 -1.2700
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 20 0.8852 0.6912 0.0107 -1.7965 0.7626 0.0000 0.4028 0.0000 0.0000 0.0300 0.0000 0.0000 0.0000 0.0000 0.0000 0.6864 0.0000 2.5038 0.0948 -0.3100
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 24 -0.1093 0.0870 0.0103 0.5427 1.0906 0.0000 -0.0248 0.0000 0.0000 -0.0654 0.0000 0.0000 0.0000 0.0000 0.0000 0.4718 0.0000 1.3747 0.6997 -1.5400
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 37 -0.0362 0.0129 0.0006 -0.2910 -1.0171 0.0000 0.2086 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.8536 0.0000 1.3987 -0.5885 -0.3800
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 42 0.2719 -0.2894 0.0031 0.0901 1.0044 0.0000 -0.4531 0.0000 0.0000 0.0000 -0.1038 0.0000 0.0000 0.0000 0.0000 -0.6141 0.0000 2.9814 -0.1912 -0.7100
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 72 0.3975 0.2649 -0.0007 -0.5445 0.0098 0.0000 0.3601 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.4753 0.0000 0.9331 -0.2628 0.0200
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 91 0.0917 -0.2226 0.1196 -0.0862 -0.5008 0.0000 0.4634 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.2621 0.0000 -0.1621 0.0978 0.1600
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 93 0.5335 -0.0054 -0.0032 0.0969 -0.4706 0.0000 -0.3847 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.1144 0.0000 1.4960 0.5811 -0.3800
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 98 0.0845 0.1706 0.1538 -0.7029 0.2191 0.0000 0.4510 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.1411 0.0000 -0.0224 0.2489 0.0200
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 101 0.6787 0.1133 0.0206 -0.1614 -0.1529 0.0000 -0.3488 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.2019 0.0000 2.6725 0.3413 -0.7100
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 113 0.1539 0.5641 -0.0004 -0.9042 -1.4567 0.0000 0.1523 0.0000 0.0000 0.0000 0.0339 0.0000 0.0000 0.0000 0.0000 0.2621 0.0000 -0.0121 0.3713 0.0200
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 120 0.0583 -0.0026 0.0007 -0.0908 -0.4659 0.0000 0.1072 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.0543 0.0000 -0.1800 0.0626 0.1600
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 124 -0.0384 1.2197 0.0144 -1.0732 -3.5904 0.0000 -0.1986 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0013 0.0000 1.0539 0.2759 -0.8900
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 125 0.0951 0.5035 0.0444 -0.7311 0.0725 0.0000 0.0653 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.1499 0.0000 -0.0306 0.2590 0.0200
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 128 0.0433 -0.0009 0.0004 0.0062 -0.3876 0.0000 0.0020 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.0305 0.0000 -0.0963 -0.1860 0.1600
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 138 0.1440 0.4522 -0.0416 -0.9915 0.6102 0.0000 0.1466 0.0000 0.0000 0.0000 0.0668 0.0000 0.0000 0.0000 0.0000 -0.0257 0.0000 0.8851 -0.0726 -0.1700
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 145 -0.3478 0.0592 -0.0288 -0.9271 0.0888 0.0000 0.1110 0.0000 0.0000 0.0000 0.0067 0.0000 0.0000 0.0000 0.0000 -0.6491 0.0000 0.4166 -0.5798 0.2400
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 149 0.1701 -0.2459 -0.0052 -0.0518 -1.1845 0.0000 -0.1135 0.0000 0.0000 0.0633 0.0000 0.0000 0.0000 0.0000 0.0000 0.5776 0.0000 0.7759 0.6844 -0.3800
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 153 -0.2247 -0.2613 0.0002 -0.1377 0.0400 0.0000 0.1629 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.4850 0.0000 -0.3687 -0.0711 0.3200
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 155 0.5406 0.3019 0.1436 -0.6233 0.0553 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 1.0035 0.0000 -0.4034 1.3313 0.2400
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 160 -0.0473 0.3212 0.0081 -0.6022 0.0747 0.0000 -0.0138 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.7511 0.0000 0.3574 -0.6246 0.2400
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 168 -0.3021 0.0274 0.0131 -0.6476 -0.5254 0.0000 0.1083 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.2500 0.0000 -0.4034 0.1755 0.1600
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 176 0.8351 1.8314 -0.3253 -2.2487 -1.4861 0.0000 0.2085 0.0000 0.0000 0.0000 0.0336 0.0000 0.0000 0.0000 0.0000 0.7663 0.0000 0.6481 0.9543 0.0200
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 178 -0.3683 2.0373 -0.3322 -1.8179 -4.8053 0.0000 -0.6891 0.0000 0.0000 0.0000 0.0336 0.0000 0.0000 0.0000 0.0000 0.4646 0.0000 0.9837 0.5180 -1.1600
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 186 0.5944 0.0793 0.0447 -0.1092 -0.1395 0.0000 0.1015 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.1487 0.0000 0.9292 0.0703 0.0200
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 189 -0.1863 0.3694 -0.0074 -0.0359 -2.3352 0.0000 -0.2577 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.7215 0.0000 1.3672 -0.0030 -0.9400
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 190 0.3781 0.3658 -0.0074 -0.0401 -1.1546 0.0000 -0.0018 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.0511 0.0000 0.9868 0.3996 -0.5500
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 194 -0.5029 0.6575 -0.0044 -1.3504 -0.5447 0.0000 0.0584 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.5862 0.0000 -0.3094 -0.3911 0.2400
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 200 0.2742 -0.2598 0.0424 0.3984 -0.3720 0.0000 0.1195 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.1132 0.0000 -0.3244 0.0992 0.3200
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 202 0.8387 -0.4221 -0.0539 0.8043 -0.2201 0.0000 -0.0416 0.0000 0.0000 -0.2348 0.0000 0.0000 0.0000 0.0000 0.0000 1.0256 0.0000 2.8571 1.3696 -1.2700
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 204 0.7566 -0.4132 0.1792 -0.2779 2.0877 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.7133 0.0000 2.1510 1.3854 -0.6100
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 208 0.5157 0.3552 0.0041 -0.6123 -0.0296 0.0000 0.1402 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.6437 0.0000 -0.1138 0.7940 0.2400
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 226 0.7089 0.1036 0.0097 -0.2365 0.6538 0.0000 0.0037 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.9292 0.0000 1.5962 1.2544 -0.7100
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb 227 -0.7347 0.9993 -0.0509 -0.7053 -0.0501 0.0000 0.0871 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 0.0000 -0.0760 0.0000 0.2680 -0.0646 -1.2100
apps.public.supercharge: rosetta_inputs/2B3P_A_min.pdb SUM-DIFFS 6.5164 9.7559 -0.3433 -15.5347 -15.5481 0.0000 -0.1265 0.0000 0.0000 -0.2070 0.0709 0.0000 0.0000 0.0000 0.0000 2.8946 0.0000 28.6096 10.1198 -10.5900
apps.public.supercharge: pdbname residue total fa_atr fa_rep fa_sol fa_intra_rep pro_close fa_pair hbond_sr_bb hbond_lr_bb hbond_bb_sc hbond_sc dslf_ss_dst dslf_cs_ang dslf_ss_dih dslf_ca_dih rama omega fa_dun p_aa_pp ref
```


Posprocesamiento
================

El posprocesamiento suele consistir en revisar el cambio de energía de cada residuo mutado (en el archivo de log) y ver las posiciones de los residuos mutados en pymol (selección de pymol de los residuos mutados en el archivo de log). Además, si se diseña un conjunto de estructuras de RMN, el posprocesamiento debe incluir determinar qué mutaciones se hicieron en todas o en la mayoría de las estructuras de entrada, es decir, determinar una secuencia consenso.

Novedades desde la última versión
=================================

Si has hecho mejoras, anótalas aquí.

Enfoques alternativos
=====================

La carga neta de una superficie de proteína también se puede controlar durante el proceso de diseño con el término de energía [[netcharge|NetChargeEnergy]], que penaliza las desviaciones respecto a una carga neta deseada y guía los algoritmos de diseño de secuencias hacia soluciones con la carga neta deseada.  Se pueden aplicar restricciones de carga neta con el [[AddNetChargeConstraintMover]] para imponer una carga neta deseada en una subregión seleccionada, como la superficie de una proteína.  Este es un enfoque más reciente que tiene la ventaja de la eficiencia: en lugar de producir muchos diseños y escribir solo los que tienen la carga deseada (el enfoque de la aplicación supercharge), el término de energía ```netcharge``` guía todos los diseños hacia la carga neta deseada.

##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta
* [[NetChargeEnergy]]: Guía una ejecución de diseño tradicional hacia una carga neta deseada.
* [[AddNetChargeConstraintMover]]: Especifica una carga neta deseada en una subregión de una Pose.
