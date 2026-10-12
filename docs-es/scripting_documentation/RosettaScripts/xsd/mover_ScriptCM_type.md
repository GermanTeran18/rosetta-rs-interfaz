<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XSD_XRW: POR HACER

```xml
<ScriptCM name="(&string;)" >
    <Mover Tag ... />
    <CutBiasClaim label="(&string;)" bias="(&real;)"
            region_start="(&non_negative_integer;)"
            region_end="(&non_negative_integer;)" />
    <JumpClaim jump_label="(&string;)" position1="(&string;)" position2="(&string;)"
            control_strength="(&envclaim_ctrl_str;)"
            initialization_strength="(DOES_NOT_CONTROL &envclaim_ctrl_str;)"
            cut="(&string;)" atom1="(&string;)" atom2="(&string;)"
            physical_cut="(&bool;)" />
    <TorsionClaim selector="(&string;)" control_strength="(&envclaim_ctrl_str;)"
            initialization_strength="(DOES_NOT_CONTROL &envclaim_ctrl_str;)"
            backbone="(false &bool;)" sidechain="(false &bool;)" />
    <VirtResClaim vrt_name="(&string;)" jump_label="(&string;)" parent="(&string;)"
            jump_control_strength="(DOES_NOT_CONTROL &envclaim_ctrl_str;)" />
    <XYZClaim selection="(&string;)" control_strength="(&envclaim_ctrl_str;)"
            initialization_strength="(DOES_NOT_CONTROL &envclaim_ctrl_str;)"
            relative_only="(false &bool;)" />
</ScriptCM>
```



"Mover Tag": Cualquiera de las etiquetas de [[Movers de RosettaScripts|Movers-RosettaScripts]]

Subetiqueta **CutBiasClaim**:   XRW POR HACER

-   **label**: (OBLIGATORIO) XRW POR HACER
-   **bias**: (OBLIGATORIO) XRW POR HACER
-   **region_start**: (OBLIGATORIO) XRW POR HACER
-   **region_end**: (OBLIGATORIO) XRW POR HACER

Subetiqueta **JumpClaim**:   XRW POR HACER

-   **jump_label**: (OBLIGATORIO) XRW POR HACER
-   **position1**: (OBLIGATORIO) XRW POR HACER
-   **position2**: (OBLIGATORIO) XRW POR HACER
-   **control_strength**: (OBLIGATORIO) XRW POR HACER
-   **initialization_strength**: XRW POR HACER
-   **cut**: XRW POR HACER
-   **atom1**: XRW POR HACER
-   **atom2**: XRW POR HACER
-   **physical_cut**: XRW POR HACER

Subetiqueta **TorsionClaim**:   XRW POR HACER

-   **selector**: Nombre de un selector de residuos definido previamente que determina dónde se aplica esta reclamación (claim). El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **control_strength**: (OBLIGATORIO) XRW POR HACER
-   **initialization_strength**: XRW POR HACER
-   **backbone**: XRW POR HACER
-   **sidechain**: XRW POR HACER

Subetiqueta **VirtResClaim**:   XRW POR HACER

-   **vrt_name**: (OBLIGATORIO) XRW POR HACER
-   **jump_label**: Por defecto es vrt_name con _jump añadido al final
-   **parent**: (OBLIGATORIO) XRW POR HACER
-   **jump_control_strength**: XRW POR HACER

Subetiqueta **XYZClaim**:   XRW POR HACER

-   **selection**: . El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **control_strength**: (OBLIGATORIO) XRW POR HACER
-   **initialization_strength**: XRW POR HACER
-   **relative_only**: XRW POR HACER

---
