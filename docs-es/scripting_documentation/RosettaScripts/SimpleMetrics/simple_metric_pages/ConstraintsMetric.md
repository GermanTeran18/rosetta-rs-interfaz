# ConstraintsMetric
*Volver a la página de [[SimpleMetrics]].*
Página creada el 19 de mayo de 2021 por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org).

## ConstraintsMetric

ConstraintsMetric ofrece un resumen de todas las restricciones de un Pose, o de una región del Pose seleccionada por un residue
selector.  El resumen tiene el formato de restricciones de [[archivo de restricciones|constraint-file]] (no enzdes), y se puede copiar
directamente en un archivo .cst para usarlo con [[ConstraintSetMover]], por ejemplo.  Esta métrica está pensada como sustituta
del antiguo [[CstInfoMover]].

[[include:simple_metric_ConstraintsMetric_type]]

##Véase también

* [[ConstraintSetMover]]: Un mover que añade restricciones desde un archivo .cst.
* [[ClearConstraintsMover]]: Un mover que elimina las restricciones de un Pose.
* [[AddConstraintsToCurrentConformationMover]]: Un mover que añade restricciones para ayudar a mantener un Pose en su conformación actual.
* [[Formato del archivo de restricciones|constraint-file]]: El formato de archivo .cst, para definir muchos tipos distintos de restricciones.
