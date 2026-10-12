# AverageDegree
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## AverageDegree

¿Cuál es el grado medio de conectividad de un subconjunto de residuos? Se ha comprobado que es útil para distinguir los diseños que no interactúan de los complejos naturales. Al parecer, muchos diseños que no interactúan usan superficies mal incrustadas en el monómero diseñado, una característica que esta métrica simple capta con facilidad. Véase Fleishman et al. J. Mol. Biol. 414:289

```xml
<AverageDegree name="(&string)" threshold="(0&Real)" distance_threshold="(&10.0)" task_operations="(comma-delimited list)"/>
```

-   threshold: cuántos residuos debe haber en promedio dentro de la esfera de cada uno de los residuos examinados.
-   distance\_threshold: tamaño de la esfera alrededor de cada residuo examinado.
-   task\_operations: definen los residuos examinados (todos los residuos reempaquetables).

## Véase también

* [[DockingMover]]
* [[DockingProtocolMover]]
* [[DockWithHotspotMover]]
* [[InterfaceBindingEnergyDensityFilter]]
* [[InterfaceHolesFilter]]
* [[InterfacePackingFilter]]
