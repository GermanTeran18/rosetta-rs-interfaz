# InterfaceHoles
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## InterfaceHoles

Busca vacíos en las interfaces proteína/proteína usando packstat de Will Sheffler. El número que se informa es la diferencia de la puntuación de holes entre las conformaciones unida y no unida. ¡Asegúrate de fijar la opción -holes:dalphaball (y de compilar el ejecutable correspondiente en source/external/DAlpahBall)!

```xml
<InterfaceHoles name="(&string)" jump="(1 &integer)" threshold="(200 &integer)"/>
```

-   jump: a través de qué jump se calcula InterfaceHoles
-   threshold: devuelve false si supera este número

## Véase también:

* [[InterfacePackingFilter]]
* [[Docking proteína-proteína|docking-protocol]]
* [[CavityVolumeFilter]]
* [[ShapeComplementarityFilter]]
* [[SSShapeComplementarityFilter]]
* [[ResInInterfaceFilter]]
* [[SpecificResiduesNearInterfaceFilter]]
* [[ExposedHydrophobicsFilter]]
