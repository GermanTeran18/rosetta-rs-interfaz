#Aplicación UnfoldedStateEnergyCalculator

Metadatos
========

Autor: P. Douglas Renfrew (renfrew@nyu.edu)

Estado de la documentación en su última actualización, en diciembre de 2011, por P. Douglas Renfrew. El investigador principal (PI) de esta aplicación es Brian Kuhlman (bkuhlman@email.unc.edu).

Código y demostración
=============

El mover principal está en el código de la aplicación, en `       main/source/src/protocols/unfolded_state_energy_calculator      `. El código de la aplicación está en `       main/source/src/apps/public/ncaa_utilities/UnfoldedStateEnergyCalculator.cc      `. Las pruebas de integración se encuentran en `       main/tests/integration/tests/unfolded_state_energy_calc/      `. La demostración se encuentra en `       demos/public/UnfoldedStateEnergyCalculator/      `.

Referencias
==========

P. Douglas Renfrew, Eun Jung Choi, Brian Kuhlman, "Using Noncanonical Amino Acids in Computational Protein-Peptide Interface Design" (2011) PLoS One.

Propósito
===========================================

Calcular las energías explícitas del estado desplegado es el tercero de los tres pasos necesarios para poder usar un aminoácido no canónico (NCAA) en Rosetta. Las energías explícitas del estado desplegado de un aminoácido representan la energía de ese aminoácido en el estado desplegado de una proteína y se usan para reemplazar las energías de referencia en Rosetta.

Algoritmo
=========

UnfoldedStateEnergyCalculator usa un método basado en fragmentos para calcular las energías medias del estado desplegado de cada ResidueType. El protocolo trabaja con un gran conjunto de estructuras de proteínas que se dividen en fragmentos generados al azar. El residuo central de cada fragmento se muta al residuo de interés. El fragmento se reempaqueta. Se registra la energía sin ponderar de cada método de energía de la función de puntuación para el residuo central. Una vez recogidas las energías de los residuos centrales de todos los fragmentos, se calcula para cada término una energía media ponderada por Boltzmann.

Calcular las energías explícitas del estado desplegado de un NCAA requiere tres pasos:

-   Obtener un conjunto de PDB de entrada
-   Ejecutar el protocolo UnfoldedStateEnergyCalculator sobre el conjunto de PDB
-   Modificar el archivo de energías del estado desplegado en la base de datos

Limitaciones
===========

Este código sirve para calcular energías del estado desplegado y nada más.

Obtener un conjunto de PDB de entrada
=============================

Como el protocolo UnfoldedStateEnergyCalculator usa fragmentos de estructuras de proteínas, necesitamos un conjunto de estructuras de alta calidad con las que trabajar. A través de su servidor PISCES, el laboratorio Dunbrack mantiene listas de estructuras del Protein Data Bank organizadas según la resolución de rayos X, el porcentaje de similitud de secuencia y los factores R\*\*. Estas listas son una forma cómoda de obtener un conjunto de estructuras de alta calidad. En este ejemplo usaremos una lista depurada el 20 de mayo de 2011. Contiene 1801 archivos PDB con una resolución de rayos X de al menos 1.6 angstroms, menos del 20 % de identidad de secuencia y factores R inferiores a 0.25. Para obtener los PDB, simplemente usa un script incluido que los descarga de los servidores FTP del Protein Data Bank.

```
$ cd inputs
$ ../scripts/get_pdbs.bash cullpdb_pc20_res1.6_R0.25_d110520_chains1859
```

Debería haber 1801 archivos PDB comprimidos con gzip y un archivo de texto que contiene una lista de ellos, llamado `       cullpdb_pc20_res1.6_R0.25_d110520_chains1859_list_pruned      `, en el directorio inputs de la demostración. A veces Rosetta no logra leer correctamente determinados archivos PDB. El archivo `       cullpdb_pc20_res1.6_R0.25_d110520_chains1859_list_pruned      ` es una lista de los PDB que se han comprobado y que Rosetta lee con éxito.

Cita: G. Wang and R. L. Dunbrack, Jr. PISCES: a protein sequence culling server. Bioinformatics, 19:1589-1591, 2003.

Ejecutar UnfoldedStateEnergyCalculator
=========================================

UnfoldedStateEnergyCalculator es relativamente fácil de ejecutar.

Opciones
=======

-   -frag\_size: valor entero único; fija el número de residuos de cada fragmento, debe ser un número impar y tiene un valor por defecto de 5, que es el que se usó en la publicación que lo acompaña
-   -residue\_name: valor de cadena; fija el código de tres letras del tipo de residuo al que se mutará el residuo central
-   -repack\_fragments: valor booleano; controla si los fragmentos se reempaquetarán antes de puntuarse y por defecto es true
-   -native\_sequence: valor booleano; controla si el residuo central se mutará antes de puntuarse y por defecto es false

Además, se recomienda encarecidamente añadir las siguientes opciones, ya que hacen que Rosetta maneje más archivos PDB y mejoran el tiempo de ejecución al desactivar características por defecto que quedarían anuladas por la fragmentación y el prepaquetado

-   -ignore\_unrecognized\_res: hace que Rosetta ignore los tipos de residuo no reconocidos y
-   -ex1 y ex2 y extrachi\_cutoff 0: fuerzan a Rosetta a usar rotámeros adicionales durante el reempaquetado de los fragmentos
-   -mute all y unmute devel.UnfoldedStateEnergyCalculator y unmute protocols.jd2.PDBJobInputer: reducen significativamente el tamaño del archivo de registro al desactivar la salida innecesaria
-   -no\_optH true: desactiva la optimización de hidrógenos que se hace cuando la proteína se lee por primera vez
-   -detect\_disulf false: desactiva la detección de disulfuros

Siguiendo con el ejemplo de la ornitina que hemos usado en las dos capturas de protocolo anteriores, para calcular las energías del estado desplegado se ejecutaría el siguiente comando.

```
$ cd outputs
$ PATH/TO/bin/UnfoldedStateEnergyCalculator.macosgccrelease -database PATH/TO/rosetta/main/database -ignore_unrecognized_res -ex1 -ex2 -extrachi_cutoff 0 -l ../inputs/cullpdb_pc20_res1.6_R0.25_d110520_chains1859_list_pruned -residue_name C40 -mute all -unmute devel.UnfoldedStateEnergyCalculator -unmute protocols.jd2.PDBJobInputer -no_optH true -detect_disulf false >& ufsec_log_c40 &
```

**NOTA:** la extensión de tu ejecutable puede ser distinta.

La ejecución tardará entre 30 y 60 segundos por archivo PDB.

El archivo de registro contiene mucha información útil. Contiene las energías sin ponderar de cada uno de los métodos de energía para cada uno de los fragmentos individuales. Al final imprime las energías medias sin ponderar de cada ResidueType, así como las energías medias sin ponderar ponderadas por Boltzmann. Se usan las energías medias sin ponderar ponderadas por Boltzmann porque algunas cadenas principales simplemente no toleran una mutación a un ResidueType concreto y hay energías repulsivas extremadamente altas en algunos fragmentos que sesgan el valor medio. La ponderación de Boltzmann elimina los valores atípicos de mayor energía de una forma más elegante que un corte de energía rígido.

Modificar el archivo de energías del estado desplegado
=========================================

Una vez que UnfoldedStateEnergyCalculator ha terminado de ejecutarse, hay que añadir a la base de datos las energías medias sin ponderar ponderadas por Boltzmann. La línea que necesitas es `       BOLZMANN UNFOLDED ENERGIES      `. Son las energías medias del estado desplegado ponderadas por Boltzmann para cada método de energía. El archivo que hay que modificar es unfolded\_state\_residue\_energies\_mm\_std.

Tomando la ornitina como ejemplo, la línea del archivo de registro es la siguiente

```
BOLZMANN UNFOLDED ENERGIES:  fa_atr:    -2.462 fa_rep:     1.545 fa_sol:     1.166 mm_lj_intra_rep:     1.933 mm_lj_intra_atr:    -1.997 mm_twist:     2.733 pro_close:     0.009 hbond_sr_bb:    -0.006 hbond_lr_bb:     0.000 hbond_bb_sc:    -0.001 hbond_sc:     0.000 dslf_ss_dst:     0.000 dslf_cs_ang:     0.000 dslf_ss_dih:     0.000 dslf_ca_dih:     0.000
```

Podríamos añadir lo siguiente al archivo unfolded\_state\_residue\_energies\_mm\_std de la base de datos con el siguiente comando.

```
$ echo "C40 -2.462 1.545 1.166 1.933 -1.997 2.733 0.009 -0.006 0.000 -0.001  0.000" >> minirosetta_database/scoring/score_functions/unfolded/unfolded_state_residue_energies_mm_std
```

El ResidueType ya se puede usar en casi cualquier protocolo de Rosetta que sea compatible con la función de puntuación MM\_STD.

Novedades desde la última versión
=============================

Esta aplicación es nueva en la versión 3.4 de Rosetta.

## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[MakeRotLib | make-rot-lib]]: para crear bibliotecas de rotámeros no canónicos
* [[Noncanonical Amino Acids]]: cómo trabajar con aminoácidos no canónicos
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
