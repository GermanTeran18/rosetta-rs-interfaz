#DisplayPoseLabelsMover
[[include:mover_DisplayPoseLabelsMover_type]]

Este es, sobre todo, un mover informativo. Imprime las etiquetas asignadas a cada residuo de la Pose como un alineamiento sobre la secuencia. Si se proporcionan TaskOperations y/o un MoveMapFactory, también mostrará los residuos empaquetables/editables y los residuos cuya cadena principal/chi es móvil.  
Además, guardará las etiquetas de la Pose como un `REMARK`, que puede volver a leerse con [[LabelPoseFromResidueSelectorMover]].