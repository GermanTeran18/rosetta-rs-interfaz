<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<RepeatPropagationMover name="(&string;)"
        first_template_res="(9999 &non_negative_integer;)"
        last_template_res="(9999 &non_negative_integer;)"
        numb_repeats="(&non_negative_integer;)" ideal_repeat="(true &bool;)"
        repeat_without_replacing_pose="(false &bool;)"
        maintain_cap="(false &bool;)"
        maintain_cap_sequence_only="(false &bool;)"
        nTerm_cap_size="(&non_negative_integer;)"
        cTerm_cap_size="(&non_negative_integer;)"
        maintain_ligand="(false &bool;)"
        extract_repeat_info_from_pose="(false &bool;)"
        extract_repeat_template_repeat="(1 &non_negative_integer;)"
        start_pose_numb_repeats="(4 &non_negative_integer;)"
        start_pose_length="(0 &non_negative_integer;)"
        start_pose_duplicate_residues="(0 &non_negative_integer;)" />
```

-   **first_template_res**: primer residuo del molde
-   **last_template_res**: último residuo del molde
-   **numb_repeats**: (OBLIGATORIO) número de repeticiones a generar
-   **ideal_repeat**: ¿la repetición es internamente ideal?
-   **repeat_without_replacing_pose**: para ganar velocidad al duplicar una Pose de la misma longitud
-   **maintain_cap**: si quieres mantener la estructura y la secuencia del cap
-   **maintain_cap_sequence_only**: mantiene solo la secuencia del cap
-   **nTerm_cap_size**: Tamaño del extremo N-terminal del cap
-   **cTerm_cap_size**: Tamaño del extremo C-terminal del cap
-   **maintain_ligand**: mantiene el ligando
-   **extract_repeat_info_from_pose**: modo en el que la información de las repeticiones se extrae de la Pose de entrada
-   **extract_repeat_template_repeat**: lugar de donde se extrae la información de las repeticiones de la Pose de entrada
-   **start_pose_numb_repeats**: número de repeticiones en la Pose de entrada
-   **start_pose_length**: longitud original de la Pose de entrada. Se usa para detectar cambios en la longitud de la Pose
-   **start_pose_duplicate_residues**: se usa cuando la Pose de entrada tiene una sola repetición y hay residuos idénticos en el extremo N-terminal y en el C-terminal

---
