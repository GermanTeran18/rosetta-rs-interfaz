<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Docking de oligómeros simétricos.

```xml
<SymDockProtocol name="(&string;)" dock_rtmin="(&bool;)" sc_min="(&bool;)"
        max_repeats="(&bool;)" dock_ppk="(&bool;)" fullatom="(&bool;)"
        local_refine="(&bool;)" view="(&bool;)" docking_score_low="(&string;)"
        docking_score_high="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **dock_rtmin**: Hace pruebas de rotámeros (rotamer trials) con minimización.
-   **sc_min**: Hace minimización de cadenas laterales de los residuos de la interfaz.
-   **max_repeats**: Si un decoy no pasa los filtros de baja y alta resolución, cuántos intentos se hacen antes de fallar.
-   **dock_ppk**: Modo de preempaquetado (prepack) del docking.
-   **fullatom**: Permite la entrada con todos los átomos de estructuras PDB o centroid.
-   **local_refine**: Hace un refinamiento local de la posición del docking (alta resolución).
-   **view**: Decide si se usa el visor (gráfico) o no.
-   **docking_score_low**: Nombre de la función de puntuación a usar
-   **docking_score_high**: Nombre de la función de puntuación a usar
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
