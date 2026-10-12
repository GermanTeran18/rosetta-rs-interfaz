<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
El mover Six Degree of Freedom Grid Dock usa los seis grados de libertad (DoF) básicos para hacer docking de la proteína en el espacio 3D: traslada y rota un dominio alrededor de tres ejes definidos por el usuario, conocidos comúnmente como eje x, eje y y eje z. El usuario define tanto el sistema de coordenadas como el espacio de muestreo, lo que permite un sistema de docking fácil de usar y muy personalizable. Al terminar, este mover genera archivos pdb de salida de cada nueva Pose con docking.

```xml
<SixDoFGridDockMover name="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)"
        range_trans_axis_1="(&real_cslist;)"
        range_trans_axis_2="(&real_cslist;)"
        range_trans_axis_3="(&real_cslist;)" range_rot_axis_1="(&real_cslist;)"
        range_rot_axis_2="(&real_cslist;)" range_rot_axis_3="(&real_cslist;)"
        values_trans_axis_1="(&real_cslist;)"
        values_trans_axis_2="(&real_cslist;)"
        values_trans_axis_3="(&real_cslist;)"
        values_rot_axis_1="(&real_cslist;)" values_rot_axis_2="(&real_cslist;)"
        values_rot_axis_3="(&real_cslist;)" degree_check="(true &bool;)"
        max_samples="(10000 &non_negative_integer;)"
        dof_residue_selector_1="(&string;)" dof_residue_selector_2a="(&string;)"
        dof_residue_selector_2b="(&string;)" />
```

-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **range_trans_axis_1**: Lista de rango de grados de libertad (DoF), separada por comas: mínimo, máximo, tamaño de paso
-   **range_trans_axis_2**: Lista de rango de grados de libertad (DoF), separada por comas: mínimo, máximo, tamaño de paso
-   **range_trans_axis_3**: Lista de rango de grados de libertad (DoF), separada por comas: mínimo, máximo, tamaño de paso
-   **range_rot_axis_1**: Lista de rango de grados de libertad (DoF), separada por comas: mínimo, máximo, tamaño de paso
-   **range_rot_axis_2**: Lista de rango de grados de libertad (DoF), separada por comas: mínimo, máximo, tamaño de paso
-   **range_rot_axis_3**: Lista de rango de grados de libertad (DoF), separada por comas: mínimo, máximo, tamaño de paso
-   **values_trans_axis_1**: Lista de valores de grados de libertad (DoF) a muestrear, separada por comas
-   **values_trans_axis_2**: Lista de valores de grados de libertad (DoF) a muestrear, separada por comas
-   **values_trans_axis_3**: Lista de valores de grados de libertad (DoF) a muestrear, separada por comas
-   **values_rot_axis_1**: Lista de valores de grados de libertad (DoF) a muestrear, separada por comas
-   **values_rot_axis_2**: Lista de valores de grados de libertad (DoF) a muestrear, separada por comas
-   **values_rot_axis_3**: Lista de valores de grados de libertad (DoF) a muestrear, separada por comas
-   **degree_check**: True o false para activar o desactivar degree_check
-   **max_samples**: El mover lanzará un error si el número real de muestras es mayor que el valor dado por el usuario
-   **dof_residue_selector_1**: Selector que indica qué residuo se usa al configurar el sistema de coordenadas x, y, z. Este residuo se suele seleccionar en la proteína estática. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **dof_residue_selector_2a**: Selector que indica qué residuo se usa al configurar el sistema de coordenadas x, y, z. Este residuo se suele seleccionar en la proteína móvil. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **dof_residue_selector_2b**: Selector que indica qué residuo se usa al configurar el sistema de coordenadas x, y, z. Este residuo se suele seleccionar en la proteína móvil. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.

---
