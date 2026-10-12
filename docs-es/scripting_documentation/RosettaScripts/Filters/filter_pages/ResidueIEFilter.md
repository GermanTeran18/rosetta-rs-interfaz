# Energía de interacción de residuos
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Energía de interacción de residuos

Calcula la energía de interacción (IE) del residuo especificado a través de la interfaz (interface=1) o de todo el Pose (interface=0). Luego aplica una penalización de interacción si la IE supera el umbral especificado, de modo que penalización = suma (IE(res)-(umbral)). Por ejemplo, si el residuo es un trp con IE -5 y el umbral es -6.5, la penalización es 1.5.

```xml
<ResidueIE name="(&string)" scorefxn="(score12 &string)" score_type="(total_score &string)" energy_cutoff="(0.0 &float)" restype3="(TRP &string; 3 letter code)" interface="(0 &bool)" whole_pose(0 &bool) selector="(&residue_selector)" jump_number="(1 &float)" interface_distance_cutoff="(8.0 &float)" max_penalty="(1000.0 &float)" penalty_factor="(1.0 & float)"/>
```

Una forma de usar este filtro es mirar la IE en interfaces de proteínas reales; véanse las estadísticas más abajo. Entonces se fijaría el umbral en media + DE, por ejemplo -6.5 para Trp.

Alex Ford (conjunto ZDOCK, proteína/proteína) y Sagar Khare (conjunto CSAR, proteína/ligando) calcularon estadísticas de IE para aromáticos (el número de muestras va entre paréntesis):

|Valores:   |  media(CSAR) | DE(CSAR) |  media(ZDOCK)  |  DE (ZDOCK) |
|-----------|-------------|----------|---------------|-------------|
|W          |  -8.8 (82)  | 2.3      |  -8.6         |   2.0       |
|F          |  -7.3 (128) | 2        |  -7           |   1.9       |
|Y          |  -7.4 (108) | 1.7      |  -6.5         |   2.2       |

## Véase también

* [[EnergyPerResidueFilter]]
* [[HbondsToResidueFilter]]
* [[ResidueDistanceFilter]]
* [[ResidueBurialFilter]]


