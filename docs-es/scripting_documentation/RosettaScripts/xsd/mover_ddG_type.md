<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Este mover es útil para informar de los ddG totales o por residuo en los casos en que, por algún motivo, no quieres usar el filtro ddG (además, el filtro ddG no puede hacer ddG por residuo por ahora). Las puntuaciones ddG se informan como pares cadena-real en el archivo de puntuaciones de salida. La puntuación ddG total tiene la etiqueta "ddg" y cada ddG por residuo tiene la etiqueta "residue_ddg_n", donde n es el número de residuo.

```xml
<ddG name="(&string;)" scorefxn="(&string;)" jump="(1 &non_negative_integer;)"
        per_residue_ddg="(false &bool;)" repack_unbound="(false &bool;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" repack_bound="(true &bool;)"
        relax_bound="(false &bool;)" relax_unbound="(true &bool;)"
        translate_by="(1000.0 &real;)" relax_mover="(&string;)"
        filter="(&string;)" chain_num="(&string;)" chain_name="(&string;)"
        solvate="(false &bool;)" solvate_unbound="(false &bool;)"
        solvate_rbmin="(false &bool;)" min_water_jump="(true &bool;)"
        compute_rmsd="(false &bool;)" dump_pdbs="(false &bool;)" />
```

-   **scorefxn**: Nombre de la función de puntuación a usar
-   **jump**: XSD XRW POR HACER
-   **per_residue_ddg**: XSD XRW POR HACER
-   **repack_unbound**: XSD XRW POR HACER
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **repack_bound**: XSD XRW POR HACER
-   **relax_bound**: ¿Se debe hacer relax del estado unido, si se especifica un mover de relax? Por defecto es false.
-   **relax_unbound**: ¿Se debe hacer relax del estado no unido, si se especifica un mover de relax? Por defecto es true.
-   **translate_by**: Distancia en Å con la que se separan los componentes del estado unido
-   **relax_mover**: XSD XRW POR HACER
-   **filter**: XSD XRW POR HACER
-   **chain_num**: XSD XRW POR HACER
-   **chain_name**: XSD XRW POR HACER
-   **solvate**: Solvata la Pose unida (con el mover ExplicitWater)
-   **solvate_unbound**: Solvata la Pose no unida (con el mover ExplicitWater)
-   **solvate_rbmin**: Usa minimización de cuerpo rígido tras la solvatación
-   **min_water_jump**: Incluye las aguas en la minimización de cuerpo rígido posterior a la solvatación y al empaquetado
-   **compute_rmsd**: Calcula el RMSD con y sin superposición; requiere que se indique in:file:native
-   **dump_pdbs**: Vuelca PDB de depuración. Vuelca 6 PDB por instancia: BOUND_before_repack, BOUND_after_repack, BOUND_after_relax, UNBOUND_before_repack, UNBOUND_after_repack y UNBOUND_after_relax.

---
