<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Código de interfaz de refinamiento cristalográfico con PHENIX. Llama a PHENIX para actualizar y optimizar la máscara de solvente.

```xml
<UpdateSolvent name="(&string;)" update_mask="(true &bool;)"
        update_fcalc="(true &bool;)" optimize_mask="(false &bool;)"
        optimize_params="(false &bool;)" />
```

-   **update_mask**: llama a PHENIX para actualizar la máscara de solvente. Solo es válido si optimize_mask y optimize_params son ambos false.
-   **update_fcalc**: llama a PHENIX para actualizar fcalc
-   **optimize_mask**: llama a PHENIX para optimizar la máscara de solvente; se puede combinar con optimize_params
-   **optimize_params**: llama a PHENIX para optimizar la máscara de solvente; se puede combinar con optimize_mask

---
