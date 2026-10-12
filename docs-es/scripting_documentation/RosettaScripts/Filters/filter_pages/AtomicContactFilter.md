# AtomicContact
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## AtomicContact

¿Tienen dos residuos algún par de átomos a una distancia menor que el umbral? Es algo más sutil que [[ResidueDistanceFilter]] (que trabaja con átomos vecinos). Recorre todos los tipos de átomo de un residuo, según las restricciones que especifique el usuario (cadena lateral, cadena principal, protones).

```xml
<AtomicContact name="(&string)" residue1="(&integer)" residue2="(&integer)" sidechain="1" backbone="0" protons="0" distance="(4.0 &integer)"/>
```

Algunos movers (por ejemplo, [[PlaceSimultaneouslyMover]]) pueden fijar el residuo interno de un filtro sobre la marcha durante la operación del protocolo. Para obtener este comportamiento, no especifiques residue2.

## Véase también

* [[AtomicContactCountFilter]]
* [[AtomicDistanceFilter]]
* [[ResidueCountFilter]]
* [[ResidueDistanceFilter]]
* [[PlaceSimultaneouslyMover]]

