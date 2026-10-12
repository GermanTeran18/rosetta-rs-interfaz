# PeptideInternalHbondsFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
Página creada el 23 de abril de 2020 por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org).

## PeptideInternalHbondsFilter

El PeptideInternalHbondsFilter cuenta los enlaces de hidrógeno entre residuos que están dentro de una selección de residuos o, si no se da ninguna selección, dentro de un Pose, y descarta los Poses con recuentos por debajo de un umbral definido por el usuario.  Este filtro omite del recuento los enlaces de hidrógeno entre residuos que están dentro de una distancia especificada por el usuario en términos de conectividad covalente.  Esto es especialmente útil, por ejemplo, para encontrar enlaces de hidrógeno de la cadena principal de largo alcance en macrociclos peptídicos.

El PeptideInternalHbondsFilter es un envoltorio delgado de la [[PeptideInternalHbondsMetric]] y filtra según la salida de la métrica.

[[include:filter_PeptideInternalHbondsFilter_type]]

## Véase también

* [[PeptideInternalHbondsMetric]]: cuenta los enlaces de hidrógeno dentro de una selección.  Este filtro envuelve esta métrica.
* [[OversaturatedHbondAcceptorFilter]]: descarta los Poses con demasiados donadores de enlaces de hidrógeno que donan a un único aceptor de enlaces de hidrógeno.
* [[HbondsToResidueFilter]]:  filtra según el número de enlaces de hidrógeno a un residuo dado.
