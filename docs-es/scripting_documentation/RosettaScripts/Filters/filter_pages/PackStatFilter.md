# PackStat
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## PackStat

Calcula estadísticas de empaquetado.

```xml
<PackStat name="(&string)" threshold="(0.58 &Real)" chain="(0 &integer)" repeats="(1 &integer)"/>
```

-   threshold: packstat por encima del cual el filtro pasa. La sabiduría popular dice que 0.65 es un buen número.
-   chain: jump por el cual se separa el complejo antes de calcular packstat. 0 significa no separar el complejo.
-   repeats: cuántas veces se repite el cálculo.

## Véase también

* [[Diseño en Rosetta|application_documentation/design/design-applications]]
* [[BuriedUnsatHbondsFilter]]
* [[CavityVolumeFilter]]
* [[ExposedHydrophobicsFilter]]
* [[PackRotamersMover]]
* [[SasaFilter]]
