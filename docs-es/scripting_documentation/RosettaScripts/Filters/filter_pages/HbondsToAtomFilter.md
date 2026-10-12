# HbondsToAtom
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## HbondsToAtom

Este filtro comprueba si un átomo definido por un residuo mediante res\_num/pdb\_num y atomname forma tantos enlaces de hidrógeno como los definidos por partners, donde cada enlace de hidrógeno debe tener como máximo una energía de energy\_cutoff. Para los enlaces de hidrógeno cadena principal-cadena principal, activa la opción (bb\_bb=1).

Este filtro se escribió en el contexto del diseño de interfaces de proteínas, por lo que puede no funcionar como se espera con enlaces de hidrógeno que no atraviesan una única interfaz.

```xml
<HbondsToAtom name="(hbonds_filter &string)" partners="(&integer)" energy_cutoff="(-0.5 &float)" backbone="(0 &bool)" bb_bb="(0 &bool)" sidechain="(1 &bool)" atomname="(&string)" res_num/pdb_num="(&string)">
```

-   partners: cuántas parejas de enlace de hidrógeno se esperan 
-   backbone: ¿se cuentan los enlaces de hidrógeno cadena principal-cadena principal?
-   sidechain: ¿se cuentan los enlaces de hidrógeno cadena principal-cadena lateral y cadena lateral-cadena lateral?
-   atomname: a qué átomo del residuo dado se cuentan los hidrógenos
-   pdb\_num/res\_num: véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]]

## Véase también

* [[BuriedUnsatHbondsFilter]]
* [[HbondsToResidueFilter]]
