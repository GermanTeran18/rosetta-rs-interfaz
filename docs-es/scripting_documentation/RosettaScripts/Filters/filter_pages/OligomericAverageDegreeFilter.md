# OligomericAverageDegree
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## OligomericAverageDegree

Una versión del filtro AverageDegree (véase [[aquí|AverageDegreeFilter]]) compatible con bloques de construcción oligoméricos. Incluye en el recuento de vecinos las otras subunidades del mismo bloque de construcción. También funciona con bloques de construcción monoméricos.

```xml
<OligomericAverageDegree name="(&string)" jump="(1 &Size)" sym_dof_names="('' &string)" threshold="(0 &Size)" distance_threshold="(10.0 &Real)" multicomp="(0 &bool)" write2pdb="(0 &bool)" task_operations="(comma-delimited list of task operations)" />
```

-   jump - ¿Qué jump separa el bloque de construcción de los demás?
-   sym\_dof\_names - ¿Qué sym\_dofs separan los bloques de construcción de los demás (si es un sistema simétrico multicomponente, también hay que fijar multicomp=1)?
-   threshold - Cuántos residuos debe haber en promedio dentro de la esfera de cada uno de los residuos examinados para que el filtro devuelva true.
-   distance\_threshold - Tamaño de la esfera alrededor de cada residuo examinado.
-   write2pdb - Si se escriben en el archivo .pdb de salida los valores de AverageDegree a nivel de residuo.
-   multicomp - Pon true si el sistema tiene varios componentes.
-   task\_operations - Definen los residuos examinados (todos los residuos reempaquetables).

## Véase también

* [[AverageDegreeFilter]]
* [[GetRBDOFValuesFilter]]
* [[SymUnsatHbondsFilter]]
* [[ClashCheckFilter]]
* [[InterfacePackingFilter]]
* [[MutationsFilter]]
