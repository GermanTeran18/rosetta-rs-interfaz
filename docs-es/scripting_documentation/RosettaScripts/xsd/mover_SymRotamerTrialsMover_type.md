<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Este mover recorre cada posición reempaquetable/rediseñable de la Pose, toma por turnos cada rotámero permitido y evalúa la energía. Después, cada posición se actualiza al rotámero de menor energía. No considera cambios coordinados en varios residuos y puede necesitar varias invocaciones para alcanzar la convergencia.
NOTA: Este Mover se ofrece solo por compatibilidad histórica. El RotamerTrialsMover normal debería manejar la simetría de forma transparente y es preferible.

```xml
<SymRotamerTrialsMover name="(&string;)" show_packer_task="(false &bool;)"
        scorefxn="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **show_packer_task**: XRW POR HACER
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---
