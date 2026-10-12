<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Este mover crea una tarea almacenada que enlaza residuos seleccionados con RotamerLinks. Los residuos conservarán la misma identidad cuando se llame al packer, pero sus rotámeros pueden empaquetarse de forma distinta. Este mover se diseñó para intentar resolver el problema de diseño cuasi equivalente, en el que residuos idénticos deben satisfacer varias interfaces a la vez. Es, en esencia, un problema de diseño multiestado.

```xml
<StoreQuasiSymmetricTaskMover name="(&string;)"
        task_name="(&pose_cached_task_operation;)" overwrite="(false &bool;)"
        quasi_symm_comp="(B &string;)"
        num_quasi_repeats="(2 &non_negative_integer;)"
        offset_resis="(0 &non_negative_integer;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **task_name**: (OBLIGATORIO) El nombre de la tarea almacenada que se guarda en la caché de datos del objeto Pose. Luego se puede recuperar el objeto con este nombre.
-   **overwrite**: ¿Sobrescribe las tareas almacenadas antiguas que tengan el mismo nombre?
-   **quasi_symm_comp**: Qué componente (A o B, si hay varios componentes) va a ser cuasi equivalente.
-   **num_quasi_repeats**: De cuántas subunidades consta tu bloque de construcción cuasi equivalente. Por ejemplo, un trímero sería 3.
-   **offset_resis**: Si tu bloque de construcción son dominios no cuasi equivalentes, este número indica cuántos residuos se omiten. Por ahora tiene que ser de los residuos 1-x; la parte omitida debe estar en el extremo N-terminal.
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
