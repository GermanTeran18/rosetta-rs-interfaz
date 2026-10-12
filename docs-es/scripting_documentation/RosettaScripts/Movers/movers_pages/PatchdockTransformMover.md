# PatchdockTransform
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PatchdockTransform

Usa los archivos de salida de Patchdock para modificar la configuración del Pose.

```xml
<PatchdockTransform name="&string" fname="(&string)" from_entry="(&integer)" to_entry="(&integer)" random_entry="(&bool)"/>
```

Como la lectura de Patchdock también está habilitada en la línea de comandos, los valores por defecto de cada parámetro pueden definirse en la línea de comandos. Pero indicar opciones de patchdock en la línea de comandos haría que el JobDistributor llame al JobInputter de PatchDock, y eso podría entrar en conflicto con las opciones del mover definidas aquí.

-   fname: el nombre del archivo de patchdock.
-   from\_entry: a partir de qué entrada se elige al azar una transformación.
-   to\_entry: hasta qué entrada se elige al azar una transformación.
-   random\_entry: ¿se aleatoriza la entrada elegida?

Si eliges límites from\_entry y to\_entry que van más allá de lo que contiene el archivo de patchdock, el límite superior se ajustará automáticamente al del archivo de patchdock.


##Véase también

* [[I want to do x]]: guía para elegir un mover
