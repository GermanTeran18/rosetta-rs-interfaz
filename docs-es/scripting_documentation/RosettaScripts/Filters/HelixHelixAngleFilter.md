# HelixHelixAngleFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

Documentación escrita por Jonathan Weinstein jonathan.weinstein@weizmann.ac.il, noviembre de 2017

## HelixHelixAngleFilter
Encuentra un vector que es la regresión lineal de todos los átomos de la cadena principal en cada segmento transmembrana (TM) que especifica el usuario.
Este filtro calcula una de estas 3 cosas:
1. el ángulo de cruce entre los vectores
2. la distancia entre los vectores en el punto más cercano a lo largo de ellos
3. la distancia más corta entre las hélices (en distancia atómica real)

```
<HelixHelixAngleFilter name="(& string)" start_helix_1="(0 Size)" start_helix_2="(0 Size)" end_helix_1="(0 Size)" end_helix_2="(0 Size)" angle_min="(40.0 Real)" angle_max="(100.0 Real)" dist_min="(0.0 Real)" dist_max="(5.0 Real)" angle_or_dist="(angle string)" dist_by_atom="(true bool)"/>
```

- start_helix_1 - opcional - el residuo inicial de la hélice 1 con la numeración de Rosetta
- end_helix_1 - opcional - el residuo final de la hélice 1 con la numeración de Rosetta
- start_helix_2 - opcional - el residuo inicial de la hélice 2 con la numeración de Rosetta
- end_helix_2 - opcional - el residuo final de la hélice 2 con la numeración de Rosetta
- angle_min - el ángulo mínimo permitido
- angle_max - el ángulo máximo permitido
- dist_min - la distancia mínima permitida
- dist_max - la distancia máxima permitida
- angle_or_dist - una cadena de texto que indica si se calcula un ángulo o una distancia (angle/dist; por defecto es angle)
- dist_by_atom - si la distancia se calcula por átomo o por vector
- helix_num_1 - elige la hélice 1 a partir de los datos DSSP del Pose (1 será la primera hélice del Pose, 2 la segunda, etc.)
- helix_num_2 - elige la hélice 2, igual que la 1


## Véase también
* [[MPResidueLipophilicityEnergy]]
* [[ResidueLipophilicityFilter]]
* [[TMsAACompFilter]]
* [[MembAccesResidueLipophilicityFilter]]
* [[HelixHelixAngleFilter]]
* [[SpanTopologyMatchPoseFilter]]
* [[MPSpanAngleFilter]]