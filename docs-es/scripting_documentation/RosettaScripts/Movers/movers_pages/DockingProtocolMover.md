# DockingProtocol
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## DockingProtocol

Ejecuta el protocolo de docking completo (posterior a la refactorización) con los valores predeterminados actuales del trunk. Por ahora, este mover no es sensible a la simetría.

```xml
<DockingProtocol name="&string" docking_score_low="(interchain_cen &string)" docking_score_high="(docking &string)" low_res_protocol_only="(0 &bool)" docking_local_refine(0 &bool) dock_min="(0 &bool)" ignore_default_docking_task="(0 &bool)" task_operations="('' comma-separated list)" partners="(&string)"/>
```

-   docking\_score\_low: función de puntuación que se usa en el modo centroide de los pasos de docking
-   docking\_score\_high: función de puntuación que se usa en el modo de todos los átomos del docking
-   low\_res\_protocol\_only: si es true, solo realiza docking a nivel centroide
-   docking\_local\_refine: si es true, omite el nivel centroide y solo realiza docking con todos los átomos
-   dock\_min: si es true, minimiza la estructura final con todos los átomos
-   partners: permite modificar el fold tree para hacer docking entre varias cadenas (ejemplo: para hacer docking de las cadenas L+H con A, partners="LH\_A")
-   ignore\_default\_docking\_task: te permite ignorar el DockingTaskFactory predeterminado que establece el docking y darle tu propia definición de una interfaz. No se recomienda.
-   task\_operations: lista de TaskOperations separadas por comas; se añadirán a las definidas por DockingTaskFactory, salvo que se active ignore\_default\_docking\_task.
-   partners: lista de cadenas para el docking, separadas por \_.


##Véase también

* [Tutorial de docking proteína-proteína](https://www.rosettacommons.org/demos/latest/tutorials/Protein-Protein-Docking/Protein-Protein-Docking)
* [[DockingMover]]
* [[DockWithHotspotMover]]
* [[FlexPepDockMover]]
* [[HighResDockerMover]]
* [[Docking applications]]: aplicaciones de línea de comandos para docking
* [[I want to do x]]: elegir un mover
