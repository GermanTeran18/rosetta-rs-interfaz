#multi\_residue\_ligand\_dock

Metadatos
=========

Autor: Gordon Lemmon

ubicación: doc/apps/pilot/multi\_residue\_ligand\_dock.dox

última actualización: 5-25-2009

Puedes encontrar un tutorial introductorio sobre docking de ligandos [aquí](https://www.rosettacommons.org/demos/latest/tutorials/ligand_docking/ligand_docking_tutorial).

Propósito
=========

Esta aplicación realiza docking de ligandos. Refactoriza versiones anteriores de RosettaLigand. Entre las novedades están el docking simultáneo de varios ligandos y la representación de ligandos como varios fragmentos. Estos fragmentos de ligando pueden tener bibliotecas de rotámeros y, por lo tanto, se pueden muestrear igual que los rotámeros de cadenas laterales.

Salvedad: actualmente este código solo funciona con 2 fragmentos de ligando. Para que el muestreo de rotámeros funcione correctamente, los átomos vecinos de los dos fragmentos deben ser los mismos átomos que los átomos CONNECT (es decir, los átomos cuyo enlace se rompió para dividir el ligando en 2 fragmentos). Generalizar esto es nuestro siguiente objetivo.

Resumen de la aplicación
========================

Como versión completamente refactorizada de ligand\_dock, esta aplicación divide una clase en unas 15 clases. Además, utiliza JD2, lo que simplifica las opciones de entrada y salida. Entre las novedades están el docking de varios ligandos y los ligandos de varios fragmentos con muestreo de rotámeros de fragmentos de ligando.

Bibliografía relevante
======================

-   Jens Meiler, David Baker. 2006. ROSETTALIGAND: protein-small molecule docking with full side-chain flexibility. Proteins. 65(3):538-48. La aplicación original de Rosetta++
-   Ian Davis, David Baker. 2008. RosettaLigand Docking with Full Ligand and Receptor Flexibility. JMB 385:381-392. RosettaLigand implementado en MiniRosetta (Rosetta3) y publicado con varias funciones nuevas. Se eligen tramos de residuos cercanos al ligando para la minimización de la cadena principal. Dentro de estos tramos se realiza una minimización por gradiente de los ángulos phi/psi. También se aplica la minimización por gradiente a los ángulos de torsión del ligando, y se pueden muestrear conformeros completos del ligando.

Herramientas y archivos de entrada necesarios
=============================================

El usuario necesitará:

-   un PDB con los ligandos colocados adecuadamente (o PDB separados que se combinarán)
-   Archivos '.params' de ligando que describan la química de cada residuo de ligando
-   un archivo 'flags.txt' que describa varias opciones estándar de Rosetta (tipo de entrada, tipo de salida, nstructs, ubicación de la base de datos y ubicación de archivos .params adicionales). El archivo de opciones debe incluir una opción docking:ligand:option\_file \<fileName\>.
-   un «Ligand Options File» con una sintaxis especial que se muestra en el directorio de demos. Este archivo describe el tratamiento por defecto de cada ligando, si lo hay, así como las opciones específicas de cada ligando. El usuario indica el ID de cadena único de una letra de cada ligando que desee acoplar. Para cada ligando, el usuario indica opciones como la cantidad y el tipo de rotación y traslación, si se debe minimizar el ligando y si se debe minimizar la cadena principal alrededor del ligando.

Herramientas y archivos de entrada opcionales
=============================================

-   Archivos '.confs' opcionales que contienen registros HETATM separados por TER y que describen varias conformaciones del residuo de ligando. Si se usan, estas bibliotecas de rotámeros de ligando se muestrearán junto con los rotámeros de cadenas laterales durante los pasos de empaquetado.

Ubicación de los archivos de demo
=================================

Consulta readme\_for\_multi\_ligand\_dock\_demos dentro del directorio de demos indicado arriba.

Preprocesamiento de los archivos de entrada
===========================================

rosetta/main/source/src/apps/public/ligand\_docking/pdb\_to\_molfile se puede usar para crear un archivo mol para tu ligando. A continuación, rosetta/main/source/python/apps/public/molfile2params se puede usar para crear los archivos .params de ligando necesarios.

Ejecución de la aplicación
==========================

Aquí describiré la sintaxis del archivo de opciones de ligando.

```
# Comments in this file begin with a '#' sign
# There are two section flags, 'DEFAULT' and 'LIGAND <chain_id>'
# Some options are only available as default options (they are not ligand specific)
# Other options are only available as ligand specific options (default doesn't make sense)
# Most options can be used either by default or as ligand specific options.
# Caveat: A ligand will NOT be docked by default.  You must provide the 'LIGAND <chain_id>'
  tag even if you are going to use all default options.

DEFAULT # applies to all ligands listed after LIGAND keywords.
soft_rep [old|new] # default-only option with two accepted parameters.  If provided, use the soft repulsive score during
        # docking (but continue using hard-repulsive during the final minimization).  'old' uses Rosetta++ electrostatics and is
        # recommended.
protocol [meiler2006|abbreviated|abbrev2|min_only|custom <int> <int>] # DEFAULT only option.  The docking step consists of
        # cycles of either rotamer trials (1 residue at a time) or a "full repack" (several residues receive rotamer trials
        # simultaneously).  The choices are:
        # meiler2006.  50 cycles with repacks every 8th
        # abbreviated.  5 cycles with a repack on the 4th.
        # abbrev2.  6 cycles with repacks on the 3rd and 6th.
        # min_only.  No cycles of docking.  Skip to final minimization.
        # custom 42 6.  This example would be 42 cycles with repacks every 6th.

LIGAND X # X is the chain ID as seen in the PDB
random_conformer # choose a random starting conformer (can also be a DEFAULT option)
mutate_same_name3 # during packing sample ligand rotamers that share the same 3 letter name (can also be a DEFAULT option)
translate [uniform|gaussian] 5.0 50 # Move the ligand up to 5.0 angstroms along a uniform distribution, or center a normal
        # distribution at 5.0 angstroms for a random ligand translation.  Try up to 50 moves to find a ligand translation that
        # lands the ligand neighbor atom in an empty space. (can also be a DEFAULT option)
rotate uniform 360 1000 # Try for up to 1000 cycles of 360 degree rotations to collect a certain maximum number of rotations that
        # lead to a *set* of ligand poses with a minimum difference of RMSDs, all of which have acceptable attractive and repulsive scores.
        # Choose randomly from among this set.  If no acceptable rotations are found use the one that leads to the best attractive and
        # and repulsive scores.  Also filter for user provided constraints (not yet implemented). (can also be a DEFAULT option)
slide_together # after initial placement (translate/rotate) slide ligand 1 angstrom at a time until it runs into protein, i
        # then back up 1 angstrom (can also be a DEFAULT option)
tether_ligand 0.1 # constrain ligand centroid during docking step so small repeated movements don't lead to ligand running
        # away (can also be a default option)
minimize_ligand 10 # Let ligand rotatable bonds minimize, with harmonic restraints where one standard deviation is 10 degrees:
minimize_backbone 0.3   # In the final minimization, let the backbone minimize with harmonic restraints on the Calphas (stddev = 0.3 A).
start_from x1,y1,z1 x2,y2,z2 a space separated list of comma separated xyz triplets to randomly select from for initial ligand placement.
        # This option can NOT be a default option (you wouldn't want both ligands ending up in the same place!)
```



Posprocesamiento de los archivos
================================

Si decidiste usar la opción "out:file:atom\_tree\_diffs", que recomiendo porque genera archivos extra pequeños, también tendrás que usar apps/public/ligand\_docking/extract\_atom\_tree\_diffs para recuperar los PDB.

Escribí un script de python que genera gráficos de RMSD a partir de tus archivos atom\_tree\_diff. Pregúntame por él.

Preguntas frecuentes
====================

P. ¿Funciona este código? R. Respuesta confusa, vuelve a intentarlo. 

P. ¿Debería usar este código? R. Todo indica que sí. 

P. ¿Hay ya una publicación? R. Mis fuentes dicen que no. 

P. ¿Es genial este código? R. Es cierto.

No dudes en hacer una pregunta. Consultaré mi bola 8 mágica y te responderé.
