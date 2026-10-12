# AddResidueLabelMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AddResidueLabelMover

[[include:mover_AddResidueLabel_type]]

Añade un PDBInfoLabel a tu Pose a partir de la selección de un residue_selector.

El mover imprime de forma detallada los residuos que etiquetó. También incluye una cadena de selección compatible con Pymol; puede usarse para comprobar qué residuos está seleccionando tu residue_selector.

Notas:
* Algunos movers, como la simetrización con [[SymDofMover|SymDofMover]], borran todas las etiquetas de tu Pose. Si necesitas usar PDBInfoLabel, asegúrate de etiquetar después de simetrizar. Sin embargo, [[SetupForSymmetryMover|SetupForSymmetryMover]] y [[ExtractAsymmetricUnitMover|ExtractAsymmetricUnitMover]] conservan las etiquetas de PDBInfo.
* Si tu Pose es simétrica, solo etiquetará la unidad asimétrica (asu). Si quieres etiquetar todas las copias simétricas, puedes usar [[SymmetricalResidueSelector|ResidueSelectors]] para simetrizar tu selección.


##Véase también

* [[LabelPoseFromResidueSelectorMover]]: un mover para añadir etiquetas como remarks
* [[I want to do x]]: guía para elegir un mover
