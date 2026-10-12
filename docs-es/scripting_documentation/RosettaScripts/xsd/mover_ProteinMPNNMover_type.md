<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Autor: Frederick Chan (fredchan@uw.edu)
Predice (diseña) las identidades de aminoácidos con el modelo de aprendizaje profundo ProteinMPNN y enhebra (thread) la secuencia predicha sobre la Pose. Si intentas usarlo y Rosetta no se compiló correctamente con `extras=pytorch`, se producirá un error en tiempo de ejecución.

```xml
<ProteinMPNNMover name="(&string;)" deterministic_flag="(false &bool;)"
        temperature="(0.1 &real;)" omit_AAs="(X &string;)"
        design_selector="(&string;)" coord_selector="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" >
    <TiedPositions residue_selectors="(&string;)" />
</ProteinMPNNMover>
```

-   **deterministic_flag**: Si se activa el modo determinista. Si es true, anula la temperatura. Por defecto es false.
-   **temperature**: Temperatura de muestreo. Por defecto es 0.1.
-   **omit_AAs**: Lista de tipos de aminoácido no permitidos de forma global (más el desconocido 'X'). Por defecto se permiten todos los aminoácidos excepto X.
-   **design_selector**: Nombre del selector de residuos que selecciona las posiciones diseñables. Si no se indica ninguno, todos los residuos son diseñables.
-   **coord_selector**: Nombre del selector de residuos que selecciona las coordenadas por residuo que se pasan a ProteinMPNN. Si no se selecciona ninguno, se pasan todas las coordenadas.
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).


Subetiqueta **TiedPositions**:   

-   **residue_selectors**: Lista de selectores de residuos, separados por comas, que se atan entre sí. Se atan los primeros residuos de cada selector, luego los segundos, etc. Cada selector de residuos debe tener el mismo número de residuos.

---
