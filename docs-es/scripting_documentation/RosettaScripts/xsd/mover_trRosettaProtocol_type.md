<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Implementa el protocolo completo de trRosetta, tal como lo describen Yang et al. (2020) Improved protein structure prediction using predicted interresidue orientations. Proc. Natl. Acad. Sci. USA 117(3):1496-503. https://doi.org/10.1073/pnas.1914677117. Este mover toma como entrada un alineamiento múltiple de secuencias, ejecuta la red neuronal trRosetta, genera restricciones de distancia y ángulo entre pares de residuos y hace minimización de energía para producir una estructura. Ten en cuenta que este mover elimina y reemplaza la estructura de entrada. Si se da una estructura nativa, el mover etiqueta la estructura de salida con el RMSD respecto a la nativa.

El mover trRosettaProtocol requiere compilar con soporte de Tensorflow. Para compilar con soporte de Tensorflow:

1.  Descarga las bibliotecas precompiladas de Tensorflow 1.15 para tu sistema operativo desde uno de los siguientes enlaces. (Ten en cuenta que las versiones para GPU requieren controladores CUDA; consulta https://www.tensorflow.org/install/lang_c para más información.)
	Linux/CPU: https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-cpu-linux-x86_64-1.15.0.tar.gz
	Linux/GPU: https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-gpu-linux-x86_64-1.15.0.tar.gz
	Windows/CPU: https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-cpu-windows-x86_64-1.15.0.zip
	Windows/GPU: https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-gpu-windows-x86_64-1.15.0.zip
	MacOS/CPU: https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-cpu-darwin-x86_64-1.15.0.tar.gz
MacOS/GPU: No hay ninguna disponible.

2.  Descomprime el archivo en un directorio adecuado (aquí se usa ~/mydir/ como ejemplo) y añade las siguientes variables de entorno:
Linux, Windows:
		LIBRARY_PATH=$LIBRARY_PATH:~/mydir/lib
		LD_LIBRARY_PATH=$LD_LIBRARY_PATH:~/mydir/lib
MacOS:
		LIBRARY_PATH=$LIBRARY_PATH:~/mydir/lib
		DYLD_LIBRARY_PATH=$DYLD_LIBRARY_PATH:~/mydir/lib

3.  Edita tu archivo user.settings (Rosetta/main/source/tools/build/user.settings) y quita el comentario (es decir, elimina la almohadilla del principio) de las siguientes líneas:
	import os
		'program_path'  : os.environ['PATH'].split(':'),
		'ENV' : os.environ,

4.  Compila Rosetta, añadiendo extras=tensorflow (solo CPU) o extras=tensorflow_gpu (GPU) a tu comando scons. Por ejemplo:
	./scons.py -j 8 mode=release extras=tensorflow bin


Referencias e información de autoría del mover trRosettaProtocol:

Cita(s) de la red neuronal trRosetta:
Yang J, Anishchenko I, Park H, Peng Z, Ovchinnikov S, and Baker D.  (2020).  Improved protein structure prediction using predicted interresidue orientations.  Proc Natl Acad Sci USA 117(3):1496-503.  doi: 10.1073/pnas.1914677117.

Cita(s) de FastRelax (Mover):
\*Tyka MD, \*Keedy DA, André I, Dimaio F, Song Y, Richardson DC, Richardson JS, and Baker D.  (2011).  Alternate states of proteins revealed by detailed energy landscape mapping.  J Mol Biol 405(2):607-18.  doi: 10.1016/j.jmb.2010.11.008.  (\*Co-primary authors.)

Khatib F, Cooper S, Tyka MD, Xu K, Makedon I, Popovic Z, Baker D, and Players F.  (2011).  Algorithm discovery by protein folding game players.  Proc Natl Acad Sci USA 108(47):18949-53.  doi: 10.1073/pnas.1115898108.

Maguire JB, Haddox HK, Strickland D, Halabiya SF, Coventry B, Griffin JR, Pulavarti SVSRK, Cummins M, Thieker DF, Klavins E, Szyperski T, DiMaio F, Baker D, and Kuhlman B.  (2021).  Perturbing the energy landscape for improved packing during computational protein design.  Proteins 89(4):436-449.  doi: 10.1002/prot.26030.

Autor(es) de trRosettaProtocol (Mover):
Vikram K. Mulligan, Systems Biology, Center for Computational Biology, Flatiron Institute [vmulligan@flatironinstitute.org]  (Convirtió a C++ el protocolo trRosetta en Python de Yang et al. (2020) y lo implementó como trRosettaProtocolMover.)

Autor(es) de RMSDMetric (SimpleMetric):
Jared Adolf-Bryfogle, Scripps Research Institute [jadolfbr@gmail.com]

Autor(es) de TotalEnergyMetric (SimpleMetric):
Jared Adolf-Bryfogle, Scripps Research Institute [jadolfbr@gmail.com]

Autor(es) de TimingProfileMetric (SimpleMetric):
Jared Adolf-Bryfogle, Scripps Research Institute [jadolfbr@gmail.com]

```xml
<trRosettaProtocol name="(&string;)" msa_file="(&string;)"
        write_constraints_to_file="(&string;)"
        only_write_constraints="(false &bool;)"
        use_distance_constraints="(true &bool;)"
        use_omega_constraints="(true &bool;)"
        use_theta_constraints="(true &bool;)"
        use_phi_constraints="(true &bool;)"
        distance_constraint_prob_cutoff="(0.05 &real;)"
        omega_constraint_prob_cutoff="(0.55 &real;)"
        theta_constraint_prob_cutoff="(0.55 &real;)"
        phi_constraint_prob_cutoff="(0.65 &real;)"
        distance_constraint_weight="(1.0 &real;)"
        omega_constraint_weight="(1.0 &real;)"
        theta_constraint_weight="(1.0 &real;)"
        phi_constraint_weight="(1.0 &real;)" sequence="(&string;)"
        fasta_file="(&string;)" backbone_randomization_mode="(classic &string;)"
        backbone_minimization_mode="(classic2 &string;)"
        cis_peptide_prob_non_prepro="(0.0005 &real;)"
        cis_peptide_prob_prepro="(0.05 &real;)"
        scorefxn0="(trRosetta_cen0 &string;)"
        scorefxn1="(trRosetta_cen1 &string;)"
        scorefxn2="(trRosetta_cen2 &string;)"
        scorefxn3="(trRosetta_cart &string;)" mutate_gly_to_ala="(true &bool;)"
        fullatom_refinement="(true &bool;)" scorefxn_fullatom="(&string;)" />
```

-   **msa_file**: Nombre de archivo de un alineamiento múltiple de secuencias, en formato a3m. Los guiones indican secuencias con huecos, y los caracteres en minúscula se eliminan (y las regiones flanqueantes se ligan). Si no se indica, se usará la opción de línea de comandos -trRosetta:msa_file. Hace falta una de las dos.
-   **write_constraints_to_file**: Un archivo en el que se escriben las restricciones de trRosetta. Normalmente no se escriben en disco, pero esta opción lo permite. Ten en cuenta que esto provoca escrituras directas en disco por parte de este mover. Puede ser peligroso en un contexto multiproceso o multihilo, o en un entorno de producción grande. No está pensado para nstruct mayor que 1. Si el nombre de archivo se deja como cadena vacía, no se escribe nada en disco. Vacío por defecto, salvo que se establezca otra cosa en las opciones de línea de comandos.
-   **only_write_constraints**: Si es true, este mover SOLO genera las restricciones de trRosetta y las escribe en disco. Es decir, esta opción permite omitir los pasos reales de predicción de la estructura. Si se usa, hay que fijar la opción 'write_constraints_to_file'. Por defecto es false, salvo que se establezca otra cosa en las opciones de línea de comandos.
-   **use_distance_constraints**: Establece si las restricciones de distancia entre residuos generadas por la red neuronal trRosetta deben usarse para la predicción de la estructura. Por defecto es true, salvo que se fije otro valor por defecto en la línea de comandos con la opción -trRosetta:use_distance_constraints.
-   **use_omega_constraints**: Establece si las restricciones de diedro omega entre residuos generadas por la red neuronal trRosetta deben usarse para la predicción de la estructura. Ten en cuenta que NO es el ángulo diedro omega de la cadena principal, sino un diedro entre residuos definido por CA1-CB1-CB2-CA2. Por defecto es true, salvo que se fije otro valor por defecto en la línea de comandos con la opción -trRosetta:use_omega_constraints.
-   **use_theta_constraints**: Establece si las restricciones de diedro theta entre residuos generadas por la red neuronal trRosetta deben usarse para la predicción de la estructura. Ten en cuenta que NO es un ángulo diedro de la cadena principal, sino un diedro entre residuos definido por N1-CA1-CB1-CB2. Por defecto es true, salvo que se fije otro valor por defecto en la línea de comandos con la opción -trRosetta:use_theta_constraints.
-   **use_phi_constraints**: Establece si las restricciones de ángulo phi entre residuos generadas por la red neuronal trRosetta deben usarse para la predicción de la estructura. Ten en cuenta que NO es el ángulo diedro phi de la cadena principal, sino un ángulo entre residuos definido por CA1-CB1-CB2. Por defecto es true, salvo que se fije otro valor por defecto en la línea de comandos con la opción -trRosetta:use_phi_constraints.
-   **distance_constraint_prob_cutoff**: Fija el corte de probabilidad por debajo del cual se omite una restricción de distancia. Por defecto es 0.05, o lo que se haya fijado en la línea de comandos con la opción -trRosetta::distance_constraint_prob_cutoff.
-   **omega_constraint_prob_cutoff**: Fija el corte de probabilidad por debajo del cual se omite una restricción de diedro omega. Por defecto es 0.55, o lo que se haya fijado en la línea de comandos con la opción -trRosetta::omega_constraint_prob_cutoff.
-   **theta_constraint_prob_cutoff**: Fija el corte de probabilidad por debajo del cual se omite una restricción de diedro theta. Por defecto es 0.55, o lo que se haya fijado en la línea de comandos con la opción -trRosetta::theta_constraint_prob_cutoff.
-   **phi_constraint_prob_cutoff**: Fija el corte de probabilidad por debajo del cual se omite una restricción de ángulo phi. Por defecto es 0.65, o lo que se haya fijado en la línea de comandos con la opción -trRosetta::phi_constraint_prob_cutoff.
-   **distance_constraint_weight**: Fija el peso de las restricciones de distancia generadas por trRosetta. Por defecto es 1.0, o lo que se haya fijado en la línea de comandos con la opción -trRosetta:distance_constraint_weight.
-   **omega_constraint_weight**: Fija el peso de las restricciones de diedro omega generadas por trRosetta. Por defecto es 1.0, o lo que se haya fijado en la línea de comandos con la opción -trRosetta:omega_constraint_weight.
-   **theta_constraint_weight**: Fija el peso de las restricciones de diedro theta generadas por trRosetta. Por defecto es 1.0, o lo que se haya fijado en la línea de comandos con la opción -trRosetta:theta_constraint_weight.
-   **phi_constraint_weight**: Fija el peso de las restricciones de ángulo phi generadas por trRosetta. Por defecto es 1.0, o lo que se haya fijado en la línea de comandos con la opción -trRosetta:phi_constraint_weight.
-   **sequence**: La secuencia de aminoácidos a predecir. Hay que dar ESTO o un archivo FASTA. Las secuencias deben usar códigos de aminoácidos de una letra y contener solo los 20 aminoácidos canónicos.
-   **fasta_file**: Un archivo FASTA con una única secuencia, la secuencia de aminoácidos a predecir. Hay que dar ESTO o una secuencia. Las secuencias deben usar códigos de aminoácidos de una letra y contener solo los 20 aminoácidos canónicos. También se puede fijar un archivo FASTA con la opción de línea de comandos -in:file:fasta, que establece el valor por defecto de este mover (se puede anular con la opción fasta_file o con la opción sequence).
-   **backbone_randomization_mode**: La manera en que se aleatoriza inicialmente la cadena principal del polipéptido. Las opciones son 'classic' (la manera usada en el protocolo original de PyRosetta de Yang et al., que elige al azar uno de seis pares phi/psi para cada residuo), 'ramachandran' (aleatorización sesgada por las preferencias de Ramachandran de cada tipo de aminoácido) o 'bins' (aleatorización sesgada por las probabilidades de que el residuo de tipo i esté en el intervalo X de la cadena principal y el residuo de tipo i+1 esté en el intervalo Y). Por defecto es 'classic', o lo que se haya fijado en la línea de comandos con la opción -trRosetta::backbone_randomization_mode.
-   **backbone_minimization_mode**: La manera en que se minimiza la cadena principal del polipéptido con las restricciones de la red neuronal trRosetta. Las opciones son: 'classic0' (minimiza con restricciones de corto alcance, luego con las de medio alcance y luego con las de largo alcance), 'classic1' (minimiza con restricciones de corto y medio alcance, y luego con las de largo alcance) o 'classic2' (minimiza con todas las restricciones). Por defecto es 'classic2', o lo que se haya fijado en la línea de comandos con la opción -trRosetta::backbone_minimization_mode.
-   **cis_peptide_prob_non_prepro**: La probabilidad de muestrear un enlace peptídico cis en una posición que NO va seguida de una prolina cuando se usa el modo de aleatorización de la cadena principal 'ramachandran'. Por defecto es 0.0005 (o un valor dado en la línea de comandos con la opción -trRosetta:cis_peptide_prob_non_prepro). Se ignora en los modos 'classic' o 'bins'.
-   **cis_peptide_prob_prepro**: La probabilidad de muestrear un enlace peptídico cis en una posición que SÍ va seguida de una prolina cuando se usa el modo de aleatorización de la cadena principal 'ramachandran'. Por defecto es 0.05 (o un valor dado en la línea de comandos con la opción -trRosetta:cis_peptide_prob_prepro). Se ignora en los modos 'classic' o 'bins'.
-   **scorefxn0**: La función de puntuación que se usa para la minimización de energía de la etapa 0. Por defecto es trRosetta_cen0 (o lo que se haya fijado en la línea de comandos con la opción -trRosetta:scorefxn0).
-   **scorefxn1**: La función de puntuación que se usa para la minimización de energía de la etapa 1. Por defecto es trRosetta_cen1 (o lo que se haya fijado en la línea de comandos con la opción -trRosetta:scorefxn1).
-   **scorefxn2**: La función de puntuación que se usa para la minimización de energía de la etapa 2 (Van der Waals). Por defecto es trRosetta_cen2 (o lo que se haya fijado en la línea de comandos con la opción -trRosetta:scorefxn2).
-   **scorefxn3**: La función de puntuación que se usa para la minimización de energía de la etapa 3 (cartesiana). Por defecto es trRosetta_cart (o lo que se haya fijado en la línea de comandos con la opción -trRosetta:scorefxn3).
-   **mutate_gly_to_ala**: Si es true, los residuos de glicina se mutan a alanina durante las fases iniciales de centroide de la minimización, para igualar el protocolo original de trRosetta en PyRosetta (y luego se mutan de vuelta a glicina para el refinamiento con todos los átomos). Por defecto es true.
-   **fullatom_refinement**: Si es true, al final se hace un refinamiento con todos los átomos con el protocolo FastRelax, usando la función de puntuación especificada con la opción scorefxn_fullatom. Si los términos de puntuación de restricciones atom_pair, dihedral y angle no están activados, se activan. Por defecto es true.
-   **scorefxn_fullatom**: Archivo de pesos de la función de puntuación usada para el refinamiento con todos los átomos con FastRelax. Si los términos atom-pair_constraint, dihedral_constriant o angle_constraint valen cero, se fijan en 5.0, 1.0 y 1.0 respectivamente. Si está vacío (el valor por defecto), se usa en su lugar la función de puntuación especificada con -score:weights.

---
