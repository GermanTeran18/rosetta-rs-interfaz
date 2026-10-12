# MPSpanAngleFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

Documentación escrita por Jonathan Weinstein jonathan.weinstein@weizmann.ac.il, noviembre de 2017

## MPSpanAngleFilter
Tiene dos modos de operación:
1. devuelve el ángulo entre un segmento transmembrana (TM) y la normal de la membrana
2. devuelve la diferencia entre el ángulo del segmento TM con la normal de la membrana y la distribución de esos ángulos en proteínas naturales. Esta es, en esencia, la puntuación que calcula [[MPSpanAngleEnergy]] para ese TM

```
<MPSpanAngleFilter name="(& string)" output_file="(TR string)" tm="(0, Size)" angle_or_score="(angle string)" ang_max="(90 Real)" ang_min="(0 Real)/>
```

- ouptput_file - el flujo de salida del filtro. Si es TR (por defecto), escribe en el tracer; si no, crea un archivo con el nombre indicado
- tm - para qué segmento TM se calcula el ángulo o la puntuación, según el DSSP del Pose
- ang_max - el ángulo máximo permitido
- ang_min - el ángulo mínimo permitido

## Véase también
* [[MPResidueLipophilicityEnergy]]
* [[ResidueLipophilicityFilter]]
* [[TMsAACompFilter]]
* [[MembAccesResidueLipophilicityFilter]]
* [[HelixHelixAngleFilter]]
* [[SpanTopologyMatchPoseFilter]]
* [[MPSpanAngleFilter]]