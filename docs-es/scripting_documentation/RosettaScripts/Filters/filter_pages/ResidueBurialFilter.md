# ResidueBurial
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## ResidueBurial

Cuántos residuos están a una distancia de interacción de target\_residue a través de la interfaz. Cuando se usa con neighbors=1, esto se reduce a comprobar simplemente si un residuo está o no en la interfaz.

```xml
<ResidueBurial name="(&string)" res_num/pdb_num="(&string)" distance="(8.0 &Real)" neighbors="(1 &Integer)" task_operations="(&comma-delimited list of taskoperations)" residue_fraction_buried="(0.0001 &Real)"/>
```

-   task\_operations: el task factory se usará para determinar qué residuos son diseñables. Si alguno de estos residuos supera el umbral de enterramiento, el filtro devolverá true; si no, false. Permite fijar el filtro de enterramiento dinámicamente en tiempo de ejecución.
-   residue\_fraction\_buried: qué fracción del total de residuos definidos como diseñables por el taskfactory debe estar realmente enterrada para devolver false. El valor por defecto (0.0001) significa en la práctica que basta con 1. Pon 1.0 si quieres que todos los residuos estén enterrados.
-   pdb\_num/res\_num: véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]]

## Véase también

* [[EnergyPerResidueFilter]]
* [[HbondsToResidueFilter]]
* [[ResidueDistanceFilter]]
* [[ResidueIEFilter]]


