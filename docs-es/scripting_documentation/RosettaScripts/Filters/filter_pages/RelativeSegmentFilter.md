# RelativeSegmentFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## RelativeSegmentFilter

Informa los números de los residuos que se alinean con un segmento del Pose de origen.

```xml
<RelativeSegment name="(&string)" source_pose="(&string)" start_res="(&string)" stop_res="(&string)"/>
```

-   source\_pose: el Pose con el que se alinea. Los dos Poses deben estar superpuestos antes de la ejecución. Este filtro no hace la superposición.
-   start\_res: residuo inicial del alineamiento. Se refiere a los residuos del Pose de origen. Solo numeración de Rosetta.
-   stop\_res: residuo final del alineamiento. Igual que el anterior.

La operación de tarea RestrictToAlignedSegments reemplaza a este filtro, ya que permite definir más de un segmento. Usa esa operación de tarea y pásala al filtro DesignableResidues para encontrar los residuos alineados en el Pose de entrada.

## Véase también:

* [[Diseño en Rosetta|application_documentation/design/design-applications]]
