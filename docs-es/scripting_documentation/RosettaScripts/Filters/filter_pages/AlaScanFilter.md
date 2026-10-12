# AlaScan
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## AlaScan

Sustituye por Ala cada posición de la interfaz por separado y mide la diferencia de ddg respecto a la estructura inicial. El filtro siempre devuelve true. La salida solo se coloca en el canal REPORT de la salida del tracer. Con repeats se promedian varios cálculos de ddg, lo que da valores mejor convergidos.

```xml
<AlaScan name="(&string)" scorefxn="(score12 &string)" jump="(1 &Integer)" interface_distance_cutoff="(8.0 &Real)" partner1="(0 &bool)" partner2="(1 &bool)" repeats="(1 &Integer)" repack="(1 &bool)"/>
```

-   scorefxn: la scorefxn que se usa para los cálculos de ddg
-   jump: qué jump se usa para los cálculos de ddg. Si jump=0, el complejo no se separa y solo se calcula el dG de la mutación.
-   interface\_distance\_cutoff: a qué distancia se considera que hay interfaz (en angstroms)
-   partner1: informa los ddG de todo lo que está antes del jump
-   partner2: informa los ddG de todo lo que está después del jump
-   repack: reempaqueta en los estados unido y no unido antes de informar la energía (ddG). Si es false, no reempaqueta (dG).

## Véase también

* [[Aplicaciones de docking|docking-applications]]
* [[DdgFilter]]
* [[ddGMover]]
* [[DdGScanFilter]]
* [[FilterScanFilter]]
