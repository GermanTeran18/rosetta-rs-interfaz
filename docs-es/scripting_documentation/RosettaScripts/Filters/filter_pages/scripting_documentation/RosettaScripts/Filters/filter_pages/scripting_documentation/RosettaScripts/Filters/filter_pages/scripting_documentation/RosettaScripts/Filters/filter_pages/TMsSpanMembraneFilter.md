# TMsSpanMembraneFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

Documentación escrita por Jonathan Weinstein jonathan.weinstein@weizmann.ac.il, noviembre de 2017

## TMsSpanMembraneFilter

Recorre todos los segmentos (spans) exigidos por el mover AddMembrane (lo que el usuario exigió que atraviese la membrana) y comprueba si todos atraviesan la membrana. 
Para considerarse que atraviesa la membrana, el segmento debe superar estas pruebas:
1. la distancia en el eje Z entre los Ca de los residuos inicial y final es igual o mayor que min_distance
2. la coordenada Z del Ca tanto del residuo inicial como del final debe estar a una distancia de required_dist del borde de la membrana (-15, 15 por defecto)
3. la orientación del segmento es la exigida en AddMembrane
4. ningún residuo que no esté en los segmentos exigidos (más el flanco a cada lado) está en la membrana

```xml
<TMsSpanMembrane name="(& string)" required_distance="(10 &real)" min_distance="(20 &real)" flank="(1 &int|)"/>
```

- required_distance - distancia mínima exigida en el eje Z entre el residuo inicial y el final de cada segmento
- min_distance - distancia mínima en el eje Z exigida entre los Ca de los residuos inicial y final de cada segmento
- flank - el número de residuos en los flancos de cada segmento a los que se permite estar en la membrana

## Véase también

* [[ResidueLipophilicityFilter]]
