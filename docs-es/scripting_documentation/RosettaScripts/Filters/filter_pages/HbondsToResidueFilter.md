# HbondsToResidue
Esta página se modificó por última vez el 7 de julio de 2015 por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker.
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## HbondsToResidue

Este filtro cuenta el número de residuos que forman enlaces de hidrógeno con un residuo seleccionado, donde cada enlace de hidrógeno debe tener, como máximo, una energía de energy\_cutoff. Para los enlaces de hidrógeno cadena principal-cadena principal, activa la opción <b>bb_bb</b>.

Este filtro se escribió originalmente en el contexto del diseño de interfaces de proteínas y después se reescribió por completo para ser un contador general de enlaces de hidrógeno.  Por defecto se cuentan todos los enlaces de hidrógeno de un residuo.  Para contar solo los enlaces de hidrógeno entre un residuo y residuos de otras cadenas, desactiva la opción <b>from_same_chain</b>.  Como alternativa, para contar solo los enlaces de hidrógeno dentro de una cadena y no hacia otras cadenas, desactiva la opción <b>from_other_chains</b>.

```xml
<HbondsToResidue name="(hbonds_filter &string)" scorefxn="(&string)" partners="(&integer)" energy_cutoff="(-0.5 &float)" backbone="(false &bool)" bb_bb="(false &bool)" sidechain="(true &bool)" residue="(&string)" from_other_chains="(true &bool)" from_same_chain="(true &bool)" residue_selector="(&string)">
```
-   scorefxn: ¿Qué función de puntuación se debe usar para puntuar los enlaces de hidrógeno?  Por defecto es la función de puntuación global por defecto fijada con la opción "-score:weights".
-   partners: ¿Cuántas parejas de enlace de hidrógeno se esperan?  El número de parejas detectadas debe ser igual o mayor que este valor para que el filtro pase. 
-   backbone: ¿Se cuentan los enlaces de hidrógeno que involucran la cadena principal?
-   sidechain: ¿Se cuentan los enlaces de hidrógeno que involucran cadenas laterales?
-   bb_bb: ¿Se cuentan los enlaces de hidrógeno cadena principal-cadena principal?
-   residue: El número del residuo cuyos enlaces de hidrógeno se examinan.  Puede ser un número de Rosetta (p. ej., "32"), un número de PDB (p. ej., "12B") o un número basado en Poses de referencia (p. ej., "refpose(snapshot1,35)").  Consulta la nota de [[esta página|RosettaScripts-Conventions]] sobre las convenciones de RosettaScripts para los índices de residuos.
-   from_other_chains: ¿Se cuentan los enlaces de hidrógeno entre el residuo especificado y residuos de otras cadenas?  Por defecto true.
-   from_same_chain: ¿Se cuentan los enlaces de hidrógeno entre el residuo especificado y residuos de la misma cadena?  Por defecto true.
-   residue_selector: El nombre de un [[ResidueSelector|ResidueSelectors]] declarado previamente.  Si se usa, solo se cuentan los enlaces de hidrógeno entre el residuo elegido y el subconjunto de residuos especificado por el ResidueSelector.  Opcional.

## Véase también

* [[EnergyPerResidueFilter]]
* [[BuriedUnsatHbondsFilter]]
* [[HbondsToAtomFilter]]
* [[ResidueBurialFilter]]
* [[ResidueDistanceFilter]]
* [[ResidueInteractionEnergy|ResidueIEFilter]]
* [[Convenciones de RosettaScripts para seleccionar índices de residuos|RosettaScripts-Conventions]]
