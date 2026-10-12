# ExposedHydrophobics
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## ExposedHydrophobics

Calcula la SASA de cada residuo hidrofóbico (A, F, I, M, L, W, V, Y). La puntuación devuelta refleja tanto el número de residuos hidrofóbicos expuestos al solvente como el grado en que están expuestos. La puntuación se calcula así. Para cada residuo hidrofóbico, si la SASA supera cierto valor umbral (por defecto=20), se suma el valor de ( SASA - sasa\_cutoff ) a la puntuación calculada. El filtro pasa si la puntuación calculada es menor que el umbral especificado por el usuario.

```xml
<ExposedHydrophobics name="(&string)" sasa_cutoff="(20 &Real)" threshold="(-1 &Real)" />
```

-   sasa\_cutoff: si un residuo tiene una SASA menor que este valor, se considera enterrado y no afecta a la puntuación que devuelve el filtro ExposedHydrophobics.
-   threshold: si una proteína tiene una puntuación total de ExposedHydrophobics por debajo de este valor, pasa el filtro. Si se especifica un umbral negativo, el filtro siempre pasa.

## Véase también:

* [[CavityVolumeFilter]]
* [[InterfaceHolesFilter]]
* [[ShapeComplementarityFilter]]
* [[SSShapeComplementarityFilter]]


