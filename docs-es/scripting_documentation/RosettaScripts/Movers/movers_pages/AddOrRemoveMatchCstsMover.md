# AddOrRemoveMatchCsts
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AddOrRemoveMatchCsts

Añade a la Pose, o elimina de ella, restricciones geométricas por pares (residuo-residuo) al estilo del diseño de enzimas. Un cstfile especifica estas restricciones geométricas, que pueden indicarse en el archivo de opciones (-enzdes:cstfile) o en la etiqueta del mover (véase más abajo).

Debe indicarse la opción "-run:preserve\_header" en la línea de comandos para que el analizador pueda leer las especificaciones de restricciones en las líneas REMARK del pdb. (También hay que especificar "-enzdes:parser\_read\_cloud\_pdb" para que el analizador lea el formato de salida CloudPDB predeterminado del matcher.)

```xml
<AddOrRemoveMatchCsts name="&string" cst_instruction="( 'void', '&string')" cstfile="&string" keep_covalent="(0 &bool)" accept_blocks_missing_header="(0 &bool)" fail_on_constraints_missing="(1 &bool)"/>
```

-   cst\_instruction: 1 de 3 opciones: "add\_new" (leer del archivo), "remove" o "add\_pregenerated" (es decir, si en algún punto anterior del protocolo existían restricciones de enzdes, volver a añadirlas)
-   cstfile: nombre del archivo del que se obtienen las restricciones (puede especificarse aquí si se quiere cambiar las restricciones, p. ej., endurecerlas o relajarlas, a medida que la Pose avanza por un protocolo).
-   keep\_covalent: durante la eliminación, mantiene intactas las restricciones correspondientes a enlaces covalentes entre proteína y ligando (valor predeterminado=0).
-   accept\_blocks\_missing\_header: permite más bloques en el cstfile que los especificados en los REMARK del encabezado (consulta la documentación de enzdes para más detalles; valor predeterminado=0)
-   fail\_on\_constraints\_missing: al eliminar restricciones, lanza un error si los bloques de restricciones no existen en la Pose (valor predeterminado=1).


##Véase también

* [[Formato del archivo de restricciones de match|match-cstfile-format]]
* [[EnzRepackMinimizeMover]]
* [[Match]]: la aplicación de línea de comandos match
* [[ConstraintSetMover]] (no para restricciones de match)
* [[ClearConstraintsMover]] (no para restricciones de match)
