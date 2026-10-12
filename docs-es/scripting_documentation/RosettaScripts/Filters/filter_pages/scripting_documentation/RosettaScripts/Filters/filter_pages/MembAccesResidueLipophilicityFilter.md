# MembAccesResidueLipophilicityFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

Documentación escrita por Jonathan Weinstein jonathan.weinstein@weizmann.ac.il, noviembre de 2017

## MembAccesResidueLipophilicityFilter
Igual que [[ResidueLipophilicityFilter]], este filtro se basa estrechamente en [[MPResidueLipophilicityEnergy]].
Este filtro comprueba la energía de inserción en la membrana de cada residuo de la membrana, multiplicada por su SASA relativa. Es básicamente la parte de lipofilicidad de los residuos dentro de la inserción total en la membrana de la proteína plegada.

```xml
<MembAccesResidueLipophilicityFilter name="(& string) threshold="(0.0 Real) verbose="(false bool)" ignore_burial="(false bool)/>
```

- verbose - si se imprime el enterramiento y la lipofilicidad de cada residuo
- ignore_burial - si se multiplica o no la lipofilicidad por la SASA relativa de cada residuo

## Véase también
* [[MPResidueLipophilicityEnergy]]
* [[ResidueLipophilicityFilter]]
* [[TMsAACompFilter]]
* [[HelixHelixAngleFilter]]
* [[SpanTopologyMatchPoseFilter]]
* [[MPSpanAngleFilter]]
