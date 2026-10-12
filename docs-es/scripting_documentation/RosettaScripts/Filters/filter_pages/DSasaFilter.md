# DSasa
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## DSasa

*(Antes conocido como LigDSasa)*

Calcula la delta\_sasa fraccional de la interfaz para un ligando en una interfaz ligando-proteína y comprueba si está \*entre\* el umbral inferior y el superior. Una DSasa de 1 significa que el ligando está totalmente enterrado (pierde toda su área de superficie accesible); 0 significa totalmente accesible (no pierde nada al formarse la interfaz).

```xml
<DSasa name="(&string)" lower_threshold="(0.0 &float)" upper_threshold="(1.0 &float)"/>
```

## Véase también:

* [[Docking de ligandos|ligand-dock]]
* [[DiffAtomBurialFilter]]
* [[LigInterfaceEnergyFilter]]
* [[RepackWithoutLigandFilter]]
* [[SasaFilter]]
* [[TotalSasaFilter]]
