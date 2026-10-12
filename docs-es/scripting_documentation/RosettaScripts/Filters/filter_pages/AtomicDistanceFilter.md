# AtomicDistance
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## AtomicDistance

¿Están dos átomos especificados a una distancia menor que el umbral? Es más específico que AtomicContact (que informa si *algún* átomo está dentro del umbral) o que ResidueDistance (que solo trabaja con átomos vecinos). Los residuos se pueden especificar con la numeración del Pose o con la numeración del PDB, junto con la designación de la cadena (p. ej., 34B). Para cada pareja hay que especificar atomname o atomtype (pero no ambos). Si se especifica atomtype (usando los [[Rosetta AtomTypes]] de los átomos) para uno o ambos átomos, se usa la distancia más corta entre todas las combinaciones relevantes.

```xml
<AtomicDistance name="(&string)" residue1="(&string)" atomname1="(&string)" atomtype1="(&string)" residue2="(&sring)" atomname2="(&string)" atomtype2="(&string)" distance="(4.0 &integer)"/>
```
## Véase también

* [[AtomicContactFilter]]
* [[AtomicContactCountFilter]]
* [[ResidueCountFilter]]
* [[ResidueDistanceFilter]]

