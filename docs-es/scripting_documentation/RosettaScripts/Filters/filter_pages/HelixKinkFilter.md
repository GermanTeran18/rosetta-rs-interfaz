# HelixKink
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## HelixKink

```xml
<HelixKink name="(&string)" bend="(20, &Real)" resnums="(&string)" helix_start="(1 &int)"  helix_end="(1 &int)"/>
```

-   bend: umbral del ángulo de curvatura
-   resnums: residuos separados por comas que se evaluarán. Se considerará cualquier hélice que contenga algún residuo de esta lista; por defecto, sin especificar, se recorren las proteínas completas
-   helix\_start y helix\_end especifican un rango que debe ser una hélice continua para evaluarse. Por defecto es 1, pero deberías poner un valor razonable cuando lo especifiques.

## Véase también

* [[Modelado ab initio|abinitio-relax]]
* [[Modelado de loops|loopmodel]]
* [[HelixPairingFilter]]
* [[SecondaryStructureFilter]]
* [[SecondaryStructureCountFilter]]
* [[SecondaryStructureHasResidueFilter]]
