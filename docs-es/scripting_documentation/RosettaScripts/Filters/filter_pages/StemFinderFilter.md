# StemFinder
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## StemFinder

Compara un conjunto de PDBs homólogos pero estructuralmente heterogéneos con un PDB plantilla y encuentra sitios estructuralmente muy conservados que pueden servir como tallos para empalmar segmentos.
```xml
<StemFinder name="(&string)" from_res="(1&int)" to_res="(pose.total_residue()&int)" rmsd="(0.7&float)" stems_on_sse="(false&bool)" stems_are_neighbors="(true&bool)" neighbor_distance="(4.0&float)" neighbor_separation="(10&int)" filenames="(&comma-separated list of pdb file names)"/>
```
- from_res, to_res: posiciones de la plantilla (con numeración de Rosetta) en las que se buscan tallos. (Las posiciones fuera de rango se ignoran).
- rmsd: umbral del rmsd promedio entre una posición dada de la plantilla y todas las posiciones más cercanas de los homólogos.
- stems_on_sse: exige que, en cada uno de los homólogos, los tallos candidatos estén en elementos de estructura secundaria. No es buena idea, porque DSSP es algo ruidoso.
- stems_are_neighbors: ¿deben eliminarse los tallos que están más lejos que neighbor_distance entre sí?
- neighbor_distance: distancia atómica mínima entre cualquier par de átomos de cada uno de los residuos.
- neighbor_separation: separación mínima en aminoácidos entre los sitios de tallo candidatos
- filenames: estructuras PDB bien alineadas con la plantilla. Usa align o cealign.

## Véase también

* [[Modelado de loops|loopmodel]]
* [[Modelado ab initio|abinitio-relax]]
* [[SpliceMover]]
