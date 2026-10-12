# TMsAACompFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

Documentación escrita por Jonathan Weinstein jonathan.weinstein@weizmann.ac.il, noviembre de 2017

## TMsAACompFilter
Calcula la diferencia entre la composición de aminoácidos de cada segmento transmembrana (TM) y la de los TM naturales. La composición de aminoácidos de los TM naturales se basa en Liu, Y., et al. 2002, ‘Genomic analysis of membrane protein families: abundance and conserved motifs.’.
Como la leucina es el residuo más hidrofóbico en los perfiles de inserción dsTbL (véase [[MPResidueLipophilicityEnergy]]), una minimización sustituirá por leucina todos los residuos posibles que miran hacia la membrana. Si quieres diseñar con más variabilidad, usa sigmoides y GenericMonteCarlo para optimizar este filtro y la puntuación total.

`<TMsAACompFilter name="(& string) threshold="(0.0 Real)/>`

## Véase también
* [[MPResidueLipophilicityEnergy]]
* [[ResidueLipophilicityFilter]]
* [[MembAccesResidueLipophilicityFilter]]
* [[HelixHelixAngleFilter]]
* [[SpanTopologyMatchPoseFilter]]
* [[MPSpanAngleFilter]]