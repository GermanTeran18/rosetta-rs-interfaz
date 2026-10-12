# InteractionGraphSummaryMetric
*Volver a la página de [[SimpleMetrics]].*
## InteractionGraphSummaryMetric

Autor: Vikram K. Mulligan (vmulligan@flatironinstitute.org)
Página creada el 22 de diciembre de 2018.

[[_TOC_]]

## Descripción

InteractionGraphSummaryMetric toma un Pose y varias [[task operations|TaskOperations-RosettaScripts]], lleva a cabo los pasos de configuración del [[packer|PackRotamersMover]] (generar rotámeros para el Pose y precalcular las energías de interacción por pares para rellenar el grafo de interacción) y después construye y almacena un resumen del grafo de interacción legible tanto por personas como por máquinas.  Esto es útil para experimentar con enfoques de optimización o de annealing externos a Rosetta.  Por defecto, la información incluye todo lo necesario para reconstruir el Pose inicial.  Usado junto con el [[mover ExternalPackerResultLoader|ExternalPackerResultLoader]], esto permite exportar un problema de empaquetado desde Rosetta, ejecutarlo en un optimizador o annealer externo y volver a importar la solución en Rosetta para reconstruir el Pose empaquetado.

## Opciones

[[include:simple_metric_InteractionGraphSummaryMetric_type]]

## Formato de salida

La salida se parece a lo siguiente:

```
[BEGIN POSE BINARY]
# Binary-format information is included here which can be used
# to rebuild the input pose.  Note that this pose may or may not
# contain rotamers used in the packing problem.  This section is
# omitted if skip_pose_reconstruction_info is true.
[END POSE BINARY]

[BEGIN ROTAMER NAME/SEQPOS/ROTINDEX/CHIVALS]
# Information is included here about the geometry of each rotamer.
# This can be used to rebuild individual solutions to the packing
# problem.  This section is omitted if skip_pose_reconstruction_info
# is true.  This section is divided into information for individual
# rotamers with [BEGIN_ROT] ... [END_ROT] blocks.  Each block starts
# with a line in which the tab-separated columns are:
# 1. Residue name (e.g. "DSER:NtermProteinFull", "CYS:disulfide",
# "THR", etc.)
# 2. Sequence position in the pose.
# 3. Rotamer index for this sequence position.
# 4. Side-chain chi angle values for each rotatable dihedral in the
# side-chain for this rotamer at this position.
# This is followed by a block of binary information for the detailed
# three-dimensional geometry of this rotamer.
[END ROTAMER NAME/SEQPOS/ROTINDEX/CHIVALS]

[BEGIN ONEBODY SEQPOS/ROTINDEX/ENERGY]
# Entries in this section contain the information for individual
# nodes in the interaction graph (i.e. the one-body energies).  Each
# row in this section contains tab-separated columns consisting of:
# 1. Sequence position in the pose.
# 2. Rotamer index for this sequence position.
# 3. One-body energy for this rotamer at this sequence position.
# This section is intended to be easy to import into an external
# annealer.
[END ONEBODY SEQPOS/ROTINDEX/ENERGY]

[BEGIN TWOBODY SEQPOS1/ROTINDEX1/SEQPOS2/ROTINDEX2/ENERGY]
# Entries in this section contain the information for individual
# edges in the interaction graph (i.e. the two-body energies).  Each
# row in this section contains tab-separated columns consisting of:
# 1. The sequence position of the first interacting residue in the pose.
# 2. The rotamer index at the first sequence position.
# 3. The sequence position of the second interacting residue in the pose.
# 4. The rotamer index at the second sequence position
# 5. The interaction energy between the two rotamers.
# This section is also intended to be easy to import into an external
# annealer.
```

## Véase también

* [[SimpleMetrics]] -- Módulos de Rosetta que permiten calcular propiedades de un Pose y escribirlas en el archivo de registro, o guardarlas en caché en el Pose para escribirlas junto con los archivos de estructura.
* [[Task operations|TaskOperations-RosettaScripts]] -- Módulos de Rosetta que restringen los rotámeros considerados en cada posición durante el empaquetado.
* [[PackRotamersMover]] -- Un mover que llama al packer de Rosetta para optimizar los rotámeros de las cadenas laterales.
* [[Mover ExternalPackerResultLoader|ExternalPackerResultLoader]] -- Un mover para importar la descripción de un problema de packer y un archivo de solución, y que luego reconstruye el Pose y aplica la solución del packer sobre él.
