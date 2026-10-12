# Torsion
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Torsion

```xml
<Torsion name="(&string)" lower="(0&Real)" upper="(0&Real)" resnum="(0&residue number)" torsion="('' &string)" task_operations="(&comma-delimited list of taskoperations)"/>
```

-   lower: umbral inferior
-   upper: umbral superior
-   resnum: numeración pdb/rosetta
-   torsion: phi/psi/""
-   task\_operations: los residuos que se informan también se pueden definir con un task factory. Se informarán todos los residuos que sean diseñables según el taskfactory. resnum y task\_operations son mutuamente excluyentes, así que no fijes ambos a la vez.

Si no se fija torsion, se informarán phi y psi. Si no se especifica resnum, se informarán todos los residuos. Si quieres filtrar según una torsión dada, tienes que especificar el resnum, la torsión y los valores inferior/superior.

## Véase también:

* [[AngleToVectorFilter]]
* [[GeometryFilter]]
* [[SecondaryStructureFilter]]
* [[SecondaryStructureHasResidueFilter]]


