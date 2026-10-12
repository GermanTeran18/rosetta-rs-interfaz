<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Mover que añade enlaces químicos y restricciones de distancia/ángulo entre iones metálicos y sus átomos de coordinación. Si se dan un selector de residuos o una lista resnum, solo configura los metales especificados. En caso contrario, configura todos los metales.

Referencias e información de autoría del mover SetupMetalsMover:

Cita(s) de SetupMetalsMover (Mover):
Mulligan VK, Workman S, Sun T, Rettie S, Li X, Worrall LJ, Craven TW, King DT, Hosseinzadeh P, Watkins AM, Renfrew PD, Guffy S, Labonte JW, Moretti R, Bonneau R, Strynadka NCJ, and Baker D.  (2021).  Computationally designed peptide macrocycle inhibitors of New Delhi metallo-β-lactamase 1.  Proc Natl Acad Sci USA 118(12).  doi: 10.1073/pnas.2012800118.

```xml
<SetupMetalsMover name="(&string;)" remove_hydrogens="(true &bool;)"
        constraints_only="(false &bool;)" add_constraints="(true &bool;)"
        metals_detection_LJ_multiplier="(1.0 &real;)"
        metals_distance_constraint_multiplier="(1.0 &real;)"
        metals_angle_constraint_multiplier="(1.0 &real;)"
        metal_residue_selector="(&string;)"
        contact_residue_selector="(&string;)"
        metal_resnums="(&resnum_list_with_ranges;)"
        contact_resnums="(&resnum_list_with_ranges;)" />
```

-   **remove_hydrogens**: ¿Se deben eliminar los hidrógenos de los átomos que se unen a metales?
-   **constraints_only**: ¿Se deben añadir SOLO las restricciones al metal, sin configurar enlaces covalentes? Es útil para aplicaciones repetidas del mover si se eliminan las restricciones.
-   **add_constraints**: ¿Se deben añadir restricciones a la Pose? Puede usarse si, por ejemplo, el usuario quiere añadir sus propias restricciones personalizadas en otro lugar.
-   **metals_detection_LJ_multiplier**: Multiplicador del corte de distancia para detectar contactos, que se basa en los radios de Lennard-Jones de los dos átomos. Esta opción anula el valor por defecto establecido en la línea de comandos.
-   **metals_distance_constraint_multiplier**: Multiplicador de las restricciones de distancia entre el metal y los átomos que se unen a metales. Esta opción anula el valor por defecto establecido en la línea de comandos.
-   **metals_angle_constraint_multiplier**: Multiplicador de las restricciones de ángulo entre el metal y los átomos que se unen a metales. Esta opción anula el valor por defecto establecido en la línea de comandos.
-   **metal_residue_selector**: Selector que indica qué residuos metálicos se configuran. Si no se da ningún selector ni cadena resnum, se configuran todos los metales. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **contact_residue_selector**: Selector que indica qué contactos metálicos se configuran. Si no se da ningún selector ni cadena resnum, se configuran todos los contactos de los metales indicados. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.
-   **metal_resnums**: Lista de números de residuo a usar
-   **contact_resnums**: Lista de números de residuo a usar

---
