# SSShapeComplementarity
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SSShapeComplementarity (SecondaryStructureShapeComplementarity)

[[include:filter_ssshapecomplementarity_type]]


##### Ejemplo

El siguiente XML de ejemplo creará un filtro SecondaryStructureShapeComplementarity que usa las definiciones de estructura secundaria de "input.blueprint" y calcula la SC de todas las hélices con el resto de la proteína.

```xml
<FILTERS>
    <SSShapeComplementarity name="ss_sc" blueprint="input.blueprint" verbose="1" loops="0" helices="1" />
<FILTERS>
<PROTOCOLS>
    <Add filter_name="ss_sc" />
</PROTOCOLS>
```

## Véase también:

* [[Docking proteína-proteína|docking-protocol]]
* [[CavityVolumeFilter]]
* [[InterfaceHolesFilter]]
* [[ShapeComplementarityFilter]]
* [[SpecificResiduesNearInterfaceFilter]]
* [[ResInInterfaceFilter]]
* [[ExposedHydrophobicsFilter]]
