# SecondaryStructureHasResidue
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SecondaryStructureHasResidue

Cuenta la fracción de elementos de estructura secundaria definidos por DSSP que contienen N o más residuos de uno o más tipos de residuo dados. Útil para comprobar si cada elemento de estructura secundaria de hélice/lámina de una estructura de diseño de novo tiene al menos un residuo hidrofóbico. Usa 2 operaciones de tarea para seleccionar residuos (si son diseñables, los incluye en el cálculo); res_check_task_operations sirve para seleccionar qué residuos se comprueban (o no) respecto a la identidad correcta de aminoácido, y ss_select_task_operations sirve para seleccionar qué residuos se incluyen en el recuento base del total de elementos de estructura secundaria. La tarea por defecto es todos los residuos.

```xml
<SecondaryStructureHasResidue name="(&string)" secstruct_fraction_threshold="(1.0 &Real)" res_check_task_operations="(&string)" ss_select_task_operations="(&string)" required_restypes="(VILMFYW &string)" nres_required_per_secstruct="(1 &int)" filter_helix="(1 &bool)" filter_sheet="(1 &bool)" filter_loop="(0 &bool)" min_helix_length="(4 &int)" min_sheet_length="(3 &int)" min_loop_length="(1 &int)" />
```

- secstruct_fraction_threshold: fracción de los elementos de EE considerados con N o más tipos de residuo requeridos
- res_check_task_operations: ¿en qué residuos se comprueban los tipos de residuo correctos? (diseñable=comprobar)
- ss_select_task_operations: ¿en qué residuos se buscan elementos de estructura secundaria existentes? (diseñable=comprobar)
- required_restypes: por defecto, los hidrofóbicos que no son Ala. Usa una cadena de aa de 1 letra
- nres_required_per_secstruct: por defecto, solo uno por elemento cuenta como un "sí" para ese elemento de EE
- filter_helix/sheet/loop: sí/no. ¿Nos importa este tipo o lo omitimos por completo?
min_helix/sheet/loop_length: ¿qué define un elemento de EE?

## Véase también:

* [[Modelado ab initio|abinitio-relax]]
* [[Modelado de loops|loopmodel]]
* [[AngleToVectorFilter]]
* [[DsspMover]]
* [[GeometryFilter]]
* [[HelixKinkFilter]]
* [[SecondaryStructureFilter]]
* [[TorsionFilter]]
