# ResInInterface
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## ResInInterface

Calcula el número de residuos de la interfaz especificada por jump\_number.  Devuelve true si supera el umbral y false en caso contrario. Útil como filtro rápido y poco elegante después del docking para asegurarse de que las parejas hacen contacto.

```xml
<ResInInterface name="(riif &string)" residues="(20 &integer)" jump_number="(1 &integer)"/>
```

## Véase también

* [[Docking proteína-proteína|docking-protocol]]
* [[CavityVolumeFilter]]
* [[InterfaceHolesFilter]]
* [[ShapeComplementarityFilter]]
* [[ExposedHydrophobicsFilter]]
* [[ResidueDistanceFilter]]
* [[SpecificResiduesNearInterfaceFilter]]
