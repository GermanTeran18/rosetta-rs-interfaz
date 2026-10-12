#LabelPoseFromResidueSelectorMover

[[include:mover_LabelPoseFromResidueSelectorMover_type]]

Comportamiento muy similar al de [[AddResidueLabelMover]].
Permite tanto etiquetar (`property`) como quitar etiquetas (`remove_property`). Incluso pueden usarse ambas a la vez (se aplicarán sobre la misma selección).
Si se proporciona `from_remark`, no se necesita nada más; leerá los remarks de etiquetas del silent file y los aplicará a la Pose. Esos remarks tienen el formato `REMARK LABELS LABEL1:1-15,23,25;LABEL2:...`, tal como los escribe [[DisplayPoseLabelsMover]].