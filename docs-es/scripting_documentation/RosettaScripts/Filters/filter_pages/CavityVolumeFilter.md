# CavityVolume
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## CavityVolume

Usa el código de empaquetado de Will Sheffler (packstat) para estimar el volumen total de los vacíos dentro de la proteína. 

El valor devuelto es la suma de los volúmenes de las cavidades calculadas, en Angstroms <sup>3</sup>. Un valor de 20 equivale aproximadamente al volumen de un átomo de carbono. Por ahora este filtro no tiene opciones ni umbral y siempre devuelve true, pero es probable que eso cambie en el futuro.

Este cálculo del volumen de las cavidades es estocástico por naturaleza (packstat es estocástico). 
Por eso se recomienda fijar la temperatura de modo que tolere la variación de los resultados con la misma entrada 
o
usar el valor promedio de muchos decoys (nstruct).

El filtro no debería contar las cavidades expuestas al solvente.


```xml
<CavityVolume name="(&string)" />
```

**Ejemplo**

```xml
<FILTERS>
    <CavityVolume name="cav_vol" />
</FILTERS>
<PROTOCOLS>
    <Add filter_name="cav_vol" />
</PROTOCOLS>
```

## Véase también:

* [[Docking proteína-proteína|docking-protocol]]
* [[InterfaceHolesFilter]]
* [[ShapeComplementarityFilter]]
* [[SSShapeComplementarityFilter]]
* [[ResInInterfaceFilter]]
* [[SpecificResiduesNearInterfaceFilter]]
* [[ExposedHydrophobicsFilter]]
