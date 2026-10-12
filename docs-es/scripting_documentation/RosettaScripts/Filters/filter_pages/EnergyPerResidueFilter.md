# EnergyPerResidue
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## EnergyPerResidue

Comprueba la energía de un residuo concreto (p. ej., pdb\_num=1), de una interfaz (whole\_interface=1), de toda la proteína (whole\_protein=1) o de un conjunto de residuos (p. ej., resnums=1,2,3). Si whole\_interface vale 1, calcula todas las energías de los residuos de la interfaz definidos por jump\_number e interface\_distance\_cutoff. Útil para análisis posteriores al diseño. Hay que poner bb\_bb en 1 si se quieren evaluar las energías de enlace de hidrógeno cadena principal-cadena principal (de corto y largo alcance). Pon whole\_protein=1 para recorrer toda la proteína, o da resnums para recorrer una lista de residuos.

```xml
<EnergyPerResidue name="(energy_per_res_filter &string)" scorefxn="(score12 &string)" 
score_type="(total_score &string)" pdb_num/res_num="(&string)" energy_cutoff="(0.0 &float)"
whole_interface="(0 &bool)" jump_number="(1 &int)" interface_distance_cutoff="(8.0 &float)" bb_bb="(0, bool)" resn resns="('1' &string)" whole_protein="(0 andint)" resnums="(andstring)/>"
```

-   pdb\_num/res\_num: véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]]
-   resnums, una lista de números de residuo (1,2,3 para la numeración del Pose o 1A,2A,3A para la numeración del pdb) que se recorrerán con el filtro

## Véase también

* [[HbondsToResidueFilter]]
* [[ResidueBurialFilter]]
* [[ResidueDistanceFilter]]
* [[ResidueIEFilter]]
