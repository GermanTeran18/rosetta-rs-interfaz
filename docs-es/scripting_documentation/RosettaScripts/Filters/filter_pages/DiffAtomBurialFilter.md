# DiffAtomBurial
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## DiffAtomBurial

-   A fecha de 12-3-12: tendría cuidado al usar este. Después de revisar a mano muchos de estos resultados filtrados, no estoy convencido de que funcione correctamente ni de la manera que uno esperaría.

Compara la DSasa de dos átomos especificados y comprueba si una es mayor o menor que la otra. Es útil para averiguar si un ligando está orientado de la manera correcta (es decir, si en la interfaz diseñada un átomo está más o menos expuesto que otro).

```xml
<DiffAtomBurial name="(&string)"  res1_res_num/res1_pdb_num="(0, see res_num/pdb_num convention)" res2_res_num/res2_pdb_num="(0, see convention)" atomname1="(&string)" atomname2="(&string)" sample_type="(&string)"/>
```

pdb\_num/res\_num: véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]]

-   res1\_res\_num/res2\_res\_num: numeración convencional del Pose en Rosetta; res\_num=0 significa el ligando (suponiendo que solo haya un ligando)
-   res1\_pdb\_num/res2\_pdb\_num: numeración convencional del pdb, como 100A (residuo 100 de la cadena A), 1X (residuo 1 de la cadena X, p. ej., de un ligando)
-   atomname1/atomname2: nombres de los átomos respectivos
-   sample\_type: "more" o "less". "more" significa Dsasa1\>Dsasa2 (el átomo1 está más enterrado que el átomo2); "less" significa Dsasa1\<Dsasa2 (el átomo1 está menos enterrado que el átomo2)

## Véase también:

* [[Docking de ligandos|ligand-dock]]
* [[DSasaFilter]]
* [[LigInterfaceEnergyFilter]]
* [[RepackWithoutLigandFilter]]
