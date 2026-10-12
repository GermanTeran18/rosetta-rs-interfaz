# ShapeComplementarity
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## ShapeComplementarity

Calcula la complementariedad de forma de Lawrence & Coleman usando una adaptación del código original en Fortran de sc de CCP4. Reconoce la simetría. Se puede calcular a través de un jump (comportamiento por defecto) o se pueden especificar las dos superficies dando explícitamente listas de los residuos que forman cada superficie.

Debería funcionar con *la mayoría* de los ligandos gracias a un commit reciente de Lucas Nivon.

Fija write\_int\_area para añadir al archivo de puntuación el área de la interfaz de SC. Usa sym\_dof\_name en lugar de jump para simetrías multicomponente.

```xml
<ShapeComplementarity name="(&string)" min_sc="(0.5 &Real)" min_interface="(0 &Real)" verbose="(0 &bool)" quick="(0 &bool)" jump="(1 &int)" sym_dof_name="('' &string)" residues1="(comma-separated list)" residues2="(comma-separated list)" residue_selector1="('' &string)" residue_selector2="('' &string)" write_int_area="(1 &bool)" write_median_dist="(0 &bool)" max_median_dist="(1000 &Real)"/>
```

* min_sc - El filtro falla si la sc calculada es menor que el valor dado.
* min_interface - El filtro falla si el área de interfaz calculada es menor que el valor dado.
* verbose - Si es true, imprime en el tracer detalles adicionales del cálculo.
* quick - Si es true, hace un cálculo más rápido y menos preciso reduciendo la densidad. 
* jump - Para Poses no simétricos, el jump sobre el cual se calcula la interfaz.
* sym_dof_name - Para Poses simétricos, el dof sobre el cual se calcula la interfaz.
* residues1 & residues2 - Fijan explícitamente qué residuos están a cada lado de la interfaz (tanto en Poses simétricos como no simétricos).
* residue_selector1 & residue_selector2 - Fijan explícitamente qué residuos están a cada lado de la interfaz usando residue_selectors.
* write_int_area - Si es true, escribe el área de la interfaz en el archivo de puntuación.
* write_median_dist - Si es true, escribe la distancia mediana de la interfaz en el archivo de puntuación.
* max_median_dist - El filtro falla si la distancia mediana calculada entre las superficies moleculares es mayor que el valor dado.

## Véase también:

* [[Docking proteína-proteína|docking-protocol]]
* [[CavityVolumeFilter]]
* [[InterfaceHolesFilter]]
* [[SSShapeComplementarityFilter]]
* [[ExposedHydrophobicsFilter]]
* [[ResInInterfaceFilter]]
* [[SpecificResiduesNearInterfaceFilter]]


