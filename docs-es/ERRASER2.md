#Remodelado de modelos cristalográficos de ARN, ARN/proteína o ARN/ligando con densidad electrónica (ERRASER2: Enumerative Real-Space Refinement ASsitted by Electron density under Rosetta... 2)

Metadatos
========

Autor: Andrew Watkins

Febrero de 2020, por Andy Watkins (amw579 [at] stanford.edu).

Código y demostración
=============

El pipeline completo de ERRASER2 es una única aplicación de Rosetta, *erraser2*. Depende del código moderno de Monte Carlo stepwise que se encuentra en `src/protocols/stepwise/monte_carlo/`, de la función de puntuación moderna de densidad electrónica `elec_dens_fast` y de una minimización cartesiana corriente con restricciones.


Referencias
==========

Todavía ninguna: el preprint debería salir en los próximos seis meses.

Propósito de la aplicación
===========================================

Este código se usa para mejorar un modelo cristalográfico de ARN dado y reducir el número de posibles errores del modelo (que se pueden evaluar con Molprobity), bajo la restricción del mapa de densidad electrónica experimental.

Algoritmo
=========

Este método encadena la minimización de Rosetta con todos los átomos y la reconstrucción stepwise enumerativa de cada residuo individual para mejorar un modelo cristalográfico de ARN dado. La puntuación de densidad electrónica ayuda a restringir el modelo durante el modelado.

Limitaciones
===========

-   Aunque ERRASER2 funciona con complejos de ARN, proteína, ligandos, o con varios de ellos, solo el ARN y los ligandos se vuelven a muestrear; los demás componentes se mantienen fijos y solo contribuyen al "entorno" de puntuación de los componentes que sí se pueden remuestrear. Además, no podemos producir potenciales torsionales _ad hoc_ para, por ejemplo, nucleótidos modificados químicamente con ángulos chi adicionales; cualquier preferencia conformacional tendrá que obtenerse a partir de las puntuaciones de energía de uno y dos cuerpos que ya existen en Rosetta y de la correspondencia con la densidad electrónica.

-   Actualmente no se modelan los contactos cristalinos, lo que se sabe que causa problemas en algunos casos de prueba en los que el ARN interactúa con fuerza con su compañero de empaquetamiento cristalino (por ejemplo, apareamiento y apilamiento de bases). Por ahora este problema se puede resolver añadiendo manualmente el compañero de empaquetamiento cristalino al archivo PDB inicial que se esté considerando.

-   Para señalar una limitación que ya fue _resuelta_: a diferencia de [[ERRASER]], no se requiere el paquete de refinamiento PHENIX.

Modos
=====

Por ahora solo hay un modo para ejecutar ERRASER2.

Archivos de entrada
===========

Archivos obligatorios
-------------

Necesitas dos archivos:

-   La estructura inicial en formato PDB estándar; no se requiere ningún preprocesamiento.

-   Un archivo de mapa de densidad electrónica CCP4. Se puede crear con PHENIX u otros paquetes de refinamiento. El mapa de entrada debe ser un mapa CCP4 2mFo-DFc. Para evitar el sobreajuste, las reflexiones Rfree deben excluirse al crear el archivo del mapa.

Archivos adicionales opcionales:
--------------------------

-   ERRASER no necesita ningún archivo opcional adicional.

Cómo ejecutar el trabajo
------------------

ERRASER se puede ejecutar con la invocación

```
erraser2 -s 1U8D_cut.pdb -edensity:mapfile 1U8D_cell.ccp4 -fasta fasta.txt @ flags
```

Los tres primeros argumentos son obligatorios: el archivo pdb de entrada, el archivo de mapa CCP4 y un archivo fasta con formato especial que incluye información de cadena y numeración de los residuos. Por ejemplo, para el complejo tRNA-Cys + EF-Tu 1B23, el fasta podría verse así:

```
>1b23.pdb  R:1-16 R:18-46 R:48-76
ggcgcguX[4SU]aacaaagcggX[H2U]X[H2U]auguagcggaX[PSU]ugcaX[MIA]aX[PSU]ccgucuaguccggX[5MU]X[PSU]cgacuccggaacgcgccucca

>1b23.pdb  P:1-405
AKGEFIRTKPHVNVGTIGHVDHGKTTLTAALTYVAAAENPNVEVKDYGDIDKAPEERARGITINTAHVEYETAKRHYSHVDCPGHADYIKNMITGAAQMDGAILVVSAADGPMPQTREHILLARQVGVPYIVVFMNKVDMVDDPELLDLVEMEVRDLLNQYEFPGDEVPVIRGSALLALEEMHKNPKTKRGENEWVDKIWELLDAIDEYIPTPVRDVDKPFLMPVEDVFTITGRGTVATGRIERGKVKVGDEVEIVGLAPETRKTVVTGVEMHRKTLQEGIAGDNVGLLLRGVSREEVERGQVLAKPGSITPHTKFEASVYILKKEEGGRHTGFFTGYRPQFYFRTTDVTGVVRLPQGVEMVMPGDNVTFTVELIKPVALEEGLRFAIREGGRTVGAGVVTKILE
```

Observa que la línea del título incluye la información de residuos y cadena, y que los residuos modificados químicamente se especifican con X y el código PDB de tres letras entre corchetes. Este tipo de archivo FASTA se puede generar con el script `pdb2fasta.py` que se incluye en el directorio `tools/rna_tools/pdb_util` de Rosetta. Consulta la página sobre los [[RNA fasta file]] para más detalles y ejemplos.

El archivo de opciones (flags) puede contener algunos argumentos opcionales:

```
-edensity:map_reso 1.95   # the resolution of the electron density map
-score:weights stepwise/rna/rna_res_level_energy7beta.wts   # 'beta' scorefunction that serves as a starting point for the code
-set_weights elec_dens_fast 30.0 cart_bonded 50.0 linear_chainbreak 10.0 chainbreak 10.0 fa_rep 1.5 fa_intra_rep 0.5 rna_torsion 10 suiteness_bonus 5 rna_sugar_close 10   # modifications to the scoring function to make it more appropriate for electron density scoring
-rmsd_screen 3.0   # during rebuilds, only consider conformations within 3.0 Å of the starting conformation
-ignore_zero_occupancy false   # do not remove from the input model residues with zero occupancy in the PDB file
-missing_density_to_jump   # situational -- if there are gaps in the numbering, ensure they are connected by "jumps" in the Rosetta internal coordinate representation
-allow_virtual_side_chains false   # do not virtualize protein side chains during RNA resampling
-pack_protein_side_chains false   # do not pack protein side chains during RNA resamping
```

Salidas esperadas
================

Al final obtendrás un archivo PDB de salida en formato PDB estándar. Quizás quieras volver a añadir los metales, ligandos o moléculas de agua que Rosetta no pudo modelar. (Rosetta usa un modelo de solvente implícito y no considerará las aguas de entrada). Después puedes refinar el modelo de salida directamente con PHENIX u otros paquetes de refinamiento, sin ningún posprocesamiento.


##Véase también

* [[RNA applications]]: página principal de las aplicaciones de ARN
* [[Utilities Applications]]: lista de aplicaciones de utilidades
* [[Tools]]: herramientas basadas en Python para usar con Rosetta
* [[RNA]]: guía para trabajar con ARN en Rosetta
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de ejemplos de líneas de comando para ejecutar archivos ejecutables de Rosetta
* [RiboKit](http://ribokit.github.io/): paquetes de modelado y análisis de ARN mantenidos por el Das Lab
