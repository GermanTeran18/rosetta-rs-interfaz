# SpanTopologyMatchPoseFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

Documentación escrita por Jonathan Weinstein jonathan.weinstein@weizmann.ac.il, noviembre de 2017

## SpanTopologyMatchPoseFilter
Compara la topología del Pose real con la que exige el segmento (span) que se entrega a AddMembrane.
Para ello crea una cadena de topología con i/o/H en cada posición:
1. i - dentro de la célula
2. o - fuera de la célula
3. H - transmembrana 
En tiempo de ejecución se crea una cadena de topología para el Pose real y otra para el segmento que exige el usuario, y se informa el porcentaje de identidad entre ambas cadenas.

```
<SpanTopologyMatchPoseFilter name="(& string)"/>
```

## Véase también
* [[MPResidueLipophilicityEnergy]]
* [[ResidueLipophilicityFilter]]
* [[TMsAACompFilter]]
* [[MembAccesResidueLipophilicityFilter]]
* [[HelixHelixAngleFilter]]
* [[SpanTopologyMatchPoseFilter]]
* [[MPSpanAngleFilter]]