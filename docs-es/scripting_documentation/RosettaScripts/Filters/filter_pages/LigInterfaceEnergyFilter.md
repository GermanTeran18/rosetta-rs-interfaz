# LigInterfaceEnergy
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## LigInterfaceEnergy

Calcula la energía de la interfaz a través de una interfaz ligando-proteína teniendo en cuenta (o no) la cst\_energy al estilo de enzdes.

```xml
<LigInterfaceEnergy name="(&string)"  scorefxn="(&string)" include_cstE="(0 &bool)" jump_number="(last_jump &integer)" energy_cutoff="(0.0 &float)"/>
```

include\_cstE=1 \*no\* resta la energía de restricción de la energía de la interfaz. jump\_number es por defecto el último jump del Pose (se supone que está asociado al ligando). Para pasar, la energía debe ser menor que energy\_cutoff.

## Véase también:

* [[Docking de ligandos|ligand-dock]]
* [[DSasaFilter]]
* [[RepackWithoutLigandFilter]]
