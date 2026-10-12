# ResidueDistance
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## ResidueDistance

¿Cuál es la distancia entre dos residuos? Se basa en el átomo vecino de cada residuo (normalmente el Cbeta).

```xml
<ResidueDistance name="(&string)" res1_res_num="(&string)" res1_pdb_num="(&string)" res2_res_num="(&string)" res2_pdb_num="(&string)" distance="(8.0 &Real)"/>
```

Para res1 y res2 se puede especificar \*res\_num o \*pdb\_num. Véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]] .

## Véase también

* [[AtomicContactCountFilter]]
* [[AtomicContactFilter]]
* [[AtomicDistanceFilter]]
* [[EnergyPerResidueFilter]]
* [[HbondsToResidueFilter]]
* [[ResidueBurialFilter]]
* [[ResidueCountFilter]]
* [[ResidueIEFilter]]
* [[TerminusDistanceFilter]]


