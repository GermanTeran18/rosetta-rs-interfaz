# ReadPoseExtraScoreFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## ReadPoseExtraScoreFilter

Este filtro lee una puntuación extra almacenada en el Pose.
Puede ser útil para recuperar valores guardados por [[FilterReportAsPoseExtraScoresMover|FilterReportAsPoseExtraScoresMover]]
(la opción `term_name` aquí debe ser la misma que la opción `report_as` de FilterReportAsPoseExtraScoresMover).

```xml
<ReadPoseExtraScoreFilter name="read_sew_total" term_name="sew_total" threshold="-1"/>
```

-   term\_name: nombre del término de puntuación almacenado en el Pose.
-   threshold: filtra el Pose si el valor almacenado es mayor que el umbral.




