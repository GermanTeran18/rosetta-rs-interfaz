# DesignableResidues
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## DesignableResidues

Filtra según el número mínimo y máximo de residuos diseñables permitidos, pero los valores por defecto son 0 y 1000, respectivamente, de modo que por defecto funciona sobre todo para informar a los tracers del número total de residuos reempaquetables/diseñables y de cuáles son, según las task\_operations definidas por el usuario. También escribe texto en los tracers para facilitar la visualización de las posiciones diseñables/reempaquetables en Pymol. Es útil para la detección automática de interfaces (para eso, usa la operación de tarea ProteinInterfaceDesign). Los números de residuo que se informan usan la numeración del pdb. Funciona con Poses simétricos y con Poses con "bloques de construcción" simétricos.

```xml
<DesignableResidues name="(&string)" task_operations="(comma-separated list)" designable="(1 &bool)" packable="(0 &bool)" lower_cutoff="(0 &size)" upper_cutoff="(1000 &size)"/>
```

-   task\_operations: definen qué residuos son diseñables o reempaquetables.
-   designable: si se informa o no el número de posiciones diseñables
-   packable: si se informa o no el número de posiciones reempaquetables
-   lower\_cutoff: número mínimo de posiciones diseñables
-   upper\_cutoff: número máximo de posiciones diseñables

## Véase también:

* [[TaskOperations-RosettaScripts]]
* [[MutationsFilter]]
* [[SaveResfileToDiskFilter]]
