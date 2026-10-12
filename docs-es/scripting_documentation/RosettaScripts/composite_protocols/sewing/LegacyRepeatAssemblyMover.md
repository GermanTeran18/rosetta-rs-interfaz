#LegacyRepeatAssemblyMover
##Nota: esta página es de LegacySEWING.
**Esta página está obsoleta. Para obtener información sobre la versión actual de SEWING, visita las páginas [[AssemblyMover]] y [[AppendAssemblyMover]].**

El RepeatAssemblyMover está pensado para diseñar proteínas con repeticiones usando el marco de SEWING. Debido a que SEWING genera los esqueletos recorriendo un grafo, generar proteínas con repeticiones es relativamente fácil; solo hay que encontrar ciclos en el grafo. Este mover está actualmente en desarrollo activo y, por ello, es posible que muchas de las funciones que se esperan de un mover de SEWING no estén implementadas (por ejemplo, este mover por ahora no respeta el RequirementSet)

##Opciones de línea de comandos
Consulta [[Assembly of models]] para ver las opciones de línea de comandos obligatorias y opcionales.

##Opciones de RosettaScripts

* num_repeating_segments: Se usa para determinar el tamaño del ensamblaje final (ver más abajo).

##Ejemplo
**ADVERTENCIA: Actualmente la opción num_repeating_segments de esta etiqueta es engañosa. La etiqueta siguiente generará en realidad un ensamblaje con 4 segmentos repetidos (por ejemplo, hélice-loop-hélice-loop). A la última repetición del ensamblaje creado le faltará el último segmento (por ejemplo, hélice-loop-hélice). Esto debería corregirse pronto y la documentación se actualizará para reflejar el cambio**

```xml
<RepeatAssemblyMover name="assemble" num_repeating_segments="2" />
```

##Véase también
* [[RequirementSet]]
* [[LegacyMonteCarloAssemblyMover]]
* [[LegacyAppendAssemblyMover]]
* [[Assembly of models]]
* [[SEWING]]
