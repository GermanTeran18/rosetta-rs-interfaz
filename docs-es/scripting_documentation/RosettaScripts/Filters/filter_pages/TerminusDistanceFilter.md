# TerminusDistance
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## TerminusDistance

Verdadero si todos los residuos de la interfaz están a más de _n_ residuos del extremo N o C (es decir, distancia en el espacio de la secuencia). Si falla, informa a qué distancia del extremo estaba el residuo que falló. Si pasa, devuelve "1000".

```xml
<TerminusDistance name="(&string)" jump_number="(1 &integer)" distance="(5 &integer)"/>
```

-   jump\_number: qué jump se usa para calcular la interfaz.
-   distance: a cuántos residuos de un extremo debe estar cada residuo de la interfaz (distancia en la secuencia).

## Véase también

* [[Docking proteína-proteína|docking-protocol]]
* [[CavityVolumeFilter]]
* [[InterfaceHolesFilter]]
* [[ShapeComplementarityFilter]]
* [[ExposedHydrophobicsFilter]]
* [[ResidueDistanceFilter]]
* [[SpecificResiduesNearInterfaceFilter]]


