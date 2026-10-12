## StoreCompoundTaskMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*

Este mover usa task operations definidas previamente, aplicadas al Pose actual, para construir una nueva tarea lógica compuesta con las operaciones NOT, AND, OR, XOR, NAND, NOR, ANDNOT y ORNOT. Después crea una packer task aplicando las task operations al Pose actual y guarda la packer task en los datos cacheables del Pose, lo que permite acceder a la tarea, sin cambios, más adelante en el protocolo de RosettaScripts. Debe usarse junto con la task operation RetrieveStoredTask. Al crear tareas compuestas de tareas compuestas, se puede definir esencialmente cualquier tarea lógica. Nota: este mover todavía no se ha probado a fondo. El código fuente se encuentra actualmente en: src/protocols/toolbox/task_operations

```xml
<StoreCompoundTaskMover name="(&string)" task_name="(&std::string)" mode="('packable' &std::string)" true_behavior="(&string)" false_behavior="('prevent_repacking' &string)" invert="(false &bool)" verbose="(false &bool)" overwrite="(false &bool)">
<OPERATION task_operations="(comma-delimited list of operations &string)"/> 
<.... 
</StoreCompoundTaskMover> 
```

Ejemplo:

```xml
<StoreCompoundTaskMover name="store_packable_any" task_name="packable_any" mode="packable" true_behavior="" false_behavior="prevent_repacking" invert="0" verbose="1" overwrite="0">
    <OR task_operations="resfile1" />
    <OR task_operations="resfile2" />
    <OR task_operations="design_bbi" />
</StoreCompoundTaskMover>
```

-   task\_name: el índice donde se guardará la tarea en los datos cacheables del Pose. Debe ser idéntico al task\_name usado para recuperar la tarea con la task operation RetrieveStoredTask.
-   mode: ¿qué propiedad de los residuos debe evaluarse? Opciones: packable o designable
-   true\_behavior: ¿qué comportamiento debe asignarse a los residuos para los que la tarea compuesta es verdadera? Opciones: prevent\_repacking o restrict\_to\_repacking. Si no se fija en una de estas opciones, por defecto estos residuos seguirán siendo diseñables.
-   false\_behavior: ¿qué comportamiento debe asignarse a los residuos para los que la tarea compuesta es falsa? Por defecto: prevent\_repacking. Opciones: prevent\_repacking o restrict\_to\_repacking. Si false\_behavior="", estos residuos seguirán siendo diseñables.
-   invert: ponerlo en true hará que se invierta el resultado final. Si, por ejemplo, se evalúan varias sentencias AND y cada una da true para un residuo dado, se asignará a ese residuo el false\_behavior.
-   verbose: ponerlo en true producirá una cadena de selección de pymol para las posiciones a las que se asignó el comportamiento true
-   overwrite: por encima de qué umbral (p. ej., delta de puntuación/delta ddg) se contará un estado negativo en el cálculo del fitness de Boltzmann. Esto evita la dilución de los estados negativos.
-   OPERATION: cualquiera de las siguientes operaciones lógicas: NOT, AND, OR, XOR, NAND, NOR, ANDNOT y ORNOT. Ten en cuenta que las operaciones se realizan en el orden en que se definen. No se aplican reglas de precedencia, por lo que cualquier precedencia debe escribirse explícitamente creando sentencias compuestas de sentencias compuestas. Ten en cuenta que la primera OPERATION especificada en la sentencia compuesta se trata como una negación si se especifica NOT, ANDNOT u ORNOT.
-   task\_operations: una lista de task operations separadas por comas

##Véase también

* [[StoreTaskMover]]
* [[Task operations en RosettaScripts|TaskOperations-RosettaScripts]]
* [[TaskAwareCstsMover]]
* [[TaskAwareMinMOver]]
* [[TaskAwareSymMinMover]]

