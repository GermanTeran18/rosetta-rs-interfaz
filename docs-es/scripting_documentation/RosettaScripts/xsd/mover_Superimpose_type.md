<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<Superimpose name="(&string;)" ref_start="(1 &non_negative_integer;)"
        ref_end="(0 &non_negative_integer;)"
        target_start="(1 &non_negative_integer;)"
        target_end="(0 &non_negative_integer;)" CA_only="(1 &bool;)"
        ref_pose="(&string;)" spm_reference_name="(&string;)" />
```

-   **ref_start**: Residuo inicial para la superposición, en la referencia
-   **ref_end**: Residuo final para la superposición, en la referencia
-   **target_start**: Residuo inicial para la superposición
-   **target_end**: Residuo final para la superposición
-   **CA_only**: Superpone solo por las coordenadas CA
-   **ref_pose**: Nombre del archivo de la Pose de referencia
-   **spm_reference_name**: Nombre de la Pose de referencia a usar (usa SavePoseMover para crear una Pose de referencia)

---
