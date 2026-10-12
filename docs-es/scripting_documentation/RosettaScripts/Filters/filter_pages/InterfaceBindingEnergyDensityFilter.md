# InterfaceBindingEnergyDensityFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## InterfaceBindingEnergyDensityFilter

Toma otros dos filtros: Ddg y Sasa. Calcula Ddg/Sasa y devuelve el valor. Falla si el valor no está por debajo de cierto umbral.

```xml
<InterfaceBindingEnergyDensityFilter name="(&string)" sasa_filter="(&string)"  ddG_filter="(&string)" threshold="(-0.015 &float)"/>
```

-   sasa\_filter es el nombre de un filtro Sasa definido previamente
-   ddG\_filter es el nombre de un filtro Ddg definido previamente
-   threshold fija la condición de fallo del filtro; este filtro falla si Ddg/Sasa no está por debajo del umbral.

Véase también:

* [[Aplicaciones de docking|docking-applications]]
* [[DdgFilter]]
* [[SasaFilter]]
