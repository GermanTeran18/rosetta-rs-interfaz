<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Genera rápidamente un perfil de estructura

```xml
<StructProfileMover name="(&string;)" RMSthreshold="(0.40 &real;)"
        burialThreshold="(3 &real;)" burialWt="(0.8 &real;)"
        consider_topN_frags="(50 &non_negative_integer;)"
        only_loops="(false &bool;)" censorByBurial="(false &bool;)"
        allowed_deviation="(0.10 &real;)"
        allowed_deviation_loops="(0.10 &real;)"
        eliminate_background="(true &bool;)"
        cenType="(6 &non_negative_integer;)"
        psiblast_style_pssm="(false &bool;)" outputProfile="(false &bool;)"
        add_csts_to_pose="(true &bool;)" ignore_terminal_residue="(true &bool;)"
        profile_name="(profile &string;)" fragment_store="(&string;)"
        residue_selector="(&string;)" />
```

-   **RMSthreshold**: XRW POR HACER
-   **burialThreshold**: XRW POR HACER
-   **burialWt**: XRW POR HACER
-   **consider_topN_frags**: XRW POR HACER
-   **only_loops**: XRW POR HACER
-   **censorByBurial**: XRW POR HACER
-   **allowed_deviation**: XRW POR HACER
-   **allowed_deviation_loops**: XRW POR HACER
-   **eliminate_background**: XRW POR HACER
-   **cenType**: XRW POR HACER
-   **psiblast_style_pssm**: XRW POR HACER
-   **outputProfile**: XRW POR HACER
-   **add_csts_to_pose**: XRW POR HACER
-   **ignore_terminal_residue**: XRW POR HACER
-   **profile_name**: Nombre del perfil de salida. Una cadena vacía hace que se use el nombre de salida del pdb. Si se pone la palabra especial "profile", se obtiene el comportamiento original, con el perfil llamado "profile" y el MSAcst llamado "MSAcst"
-   **fragment_store**: ruta al almacén de fragmentos. Nota: todos los almacenes de fragmentos usan la misma base de datos
-   **residue_selector**: Calcula el perfil de estructura solo para los residuos dentro del selector de residuos

---
