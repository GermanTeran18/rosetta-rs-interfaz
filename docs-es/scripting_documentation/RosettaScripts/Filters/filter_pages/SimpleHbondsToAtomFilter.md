# SimpleHbondsToAtom
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SimpleHbondsToAtom

Este filtro comprueba si un átomo (definido por un residuo mediante res\_num/pdb\_num y target_atom_name) tiene al menos n_partners enlaces de hidrógeno, donde cada enlace de hidrógeno debe tener como máximo una energía de hb_e_cutoff. Supone que hay un único átomo pesado objetivo, y los enlaces de hidrógeno con los hidrógenos polares unidos a este átomo cuentan como enlaces de hidrógeno que involucran al átomo objetivo. Este filtro es un sustituto del filtro HBondsToAtom, que no funciona bien con ligandos. Antes de retirar el filtro HBondsToAtom, sus funcionalidades deberían añadirse a este filtro.

```xml
<SimpleHbondsToAtomFilter name="(hbonds_filter &string)" n_partners="(&integer)" hb_e_cutoff="(-0.5 &float)"
			  target_atom_name="(&string)" res_num/pdb_num="(&string)" scorefxn="(&string)"/>
```

-   n_partners: cuántas parejas de enlace de hidrógeno se esperan 
-   target_atom_name: ¿a qué átomo del residuo dado se cuentan los enlaces de hidrógeno?
-   pdb\_num/res\_num: véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]]
-   hb_e_cutoff: umbral de energía del enlace de hidrógeno; -0.5 es un buen valor por defecto para estructuras relajadas o minimizadas.
-   scorefxn: función de puntuación que se usa.

## Véase también

* [[BuriedUnsatHbondsFilter]]
* [[HbondsToResidueFilter]]
