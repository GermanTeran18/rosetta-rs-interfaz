#Cambios necesarios para lograr la compatibilidad entre proteína y ARN en Rosetta

**Esta sección contenía consejos para leer Poses de proteína/ARN en Rosetta, pero ahora está obsoleta**
+ El ResidueTypeSet estándar de Rosetta puede manejar ARN, ADN y proteínas.
+ El ARN se lee de líneas PDB con nombres de residuo 'A','C','G','U'. El ADN se lee de líneas PDB con 'DA','DC','DG','DT'
+ Actualmente hay un esfuerzo muy activo por unificar las funciones de puntuación para modelar ARN y proteínas, con el fin de permitir la predicción de estructuras y el diseño de complejos y máquinas de ribonucleoproteínas (RNP).

-- Actualizado por R. Das, 2015.

##Véase también

* [[RNA]]: guía principal para usar ARN con Rosetta
* [[Non-protein residues]]: guía para usar moléculas que no son proteínas con Rosetta
* [[Cómo hacer que Rosetta resista PDB mal formados|robust]]
* [[RNA applications]]: aplicaciones pensadas para usarse con ARN
* [[Residue Params file]]: archivo para especificar información química y geométrica de ligandos y residuos.
* [[Preparing structures]]: preparación de estructuras de proteínas típicas para usarlas en Rosetta
* [[Preparing PDB files for non-peptide polymers]]
* [[Preparación de archivos PDB que contienen proteína y ARN|RNA-protein-changes]]
* [[Running Rosetta with options]]: instrucciones para ejecutar aplicaciones de Rosetta en la línea de comandos
* [[File types list]]: tipos de archivo que usa Rosetta
