# CycpepRigidBodyPermutationMover 
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## CycpepRigidBodyPermutationMover

[[_TOC_]]

### Descripción

CycpepRigidBodyPermutationMover se usa para considerar conformaciones alternativas de docking de un péptido cíclico unido a una proteína. Dado un selector de residuos que selecciona la parte del péptido cíclico, el mover superpone el péptido cíclico sobre una permutación cíclica o una permutación cíclica inversa de sí mismo, añade un pequeño desplazamiento aleatorio y una permutación de la orientación, y actualiza las coordenadas solo de los átomos del péptido cíclico. El mover puede funcionar en uno de dos modos. En el modo "randomized_perturbation", la permutación cíclica es aleatoria y variará de una ejecución a otra (de nstruct a nstruct). En el modo "set_permutation", el usuario especifica el desplazamiento de la permutación y si debe usarse una permutación inversa. Ten en cuenta que este mover solo realiza perturbaciones de cuerpo rígido. Se recomienda encarecidamente seguirlo con un reempaquetado de cadenas laterales y una minimización de energía (por ejemplo, con el [[mover FastRelax|FastRelaxMover]]).

### Autor e historial de desarrollo

El mover fue escrito por Vikram K. Mulligan, Center for Computational Biology, Flatiron Institute (vmulligan@flatironinstitute.org), el 9 de diciembre de 2021. Fue probado por Stephan Kudlacek, Menten AI (stephan.kudlacek@menten.ai).

### Organización del código

El mover y su creador se encuentran en el espacio de nombres `protocols::cyclic_peptide` y en el directorio `Rosetta/main/source/src/protocols/cyclic_peptide`.

### Uso

[[include:mover_CycpepRigidBodyPermutationMover_type]]

##Véase también

* [[PeptideStubMover]] -- construye un péptido aminoácido a aminoácido.
* [[PeptideCyclizeMover]] -- conecta los extremos de un péptido para ciclarlo.
* [[ModifyVariantTypeMover]] -- altera los tipos de variante de un aminoácido (por ejemplo, para eliminar los tipos terminales).
* [[Mover DeclareBond|DeclareBond]] -- crea un enlace químico entre dos puntos de conexión abiertos.
* [[Aplicación simple_cycpep_predict|simple_cycpep_predict]] -- predice estructuras de péptidos cíclicos a partir de la secuencia de aminoácidos y valida diseños de péptidos.
* [[I want to do x]]: guía para elegir un mover
