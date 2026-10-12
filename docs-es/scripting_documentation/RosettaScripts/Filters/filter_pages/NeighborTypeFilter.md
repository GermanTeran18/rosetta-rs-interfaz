# NeighborType
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## NeighborType

Filtra los Poses que colocan un vecino de los tipos especificados alrededor de un residuo objetivo en la proteína pareja.

```xml
<NeighborType name="(neighbor_filter &string)" res_num/pdb_num="(&string)" distance="(8.0 &Real)">
        <Neighbor type="(&3-letter aa code)"/>
</NeighborType>
```

-   pdb\_num/res\_num: véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]]

## Véase también:

* [[Aplicaciones de docking|docking-applications]]
* [[Operaciones de tareas|TaskOperations-RosettaScripts]]
* [[ResidueDistanceFilter]]
* [[AtomicContactFilter]]
* [[AtomicContactCountFilter]]
* [[AtomicDistanceFilter]]
* [[TerminusDistanceFilter]]
