# SymUnsatHbonds
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SymUnsatHbonds

Número máximo de enlaces de hidrógeno enterrados no satisfechos que se permiten a través de una interfaz. Funciona con Poses simétricos y asimétricos, así como con Poses con “bloques de construcción” simétricos. Toma el Pose actual, usa el número de jump o sym\_dof\_names y core::pose::symmetry::get\_sym\_aware\_jump\_num(pose,jump) para obtener el vector correcto de traslación al estado no unido, usa el RigidBodyTransMover para trasladar el Pose a su estado no unido, recorre todos los átomos pesados de la unidad asimétrica y encuentra los casos en que un átomo polar se considera enterrado en el estado unido, pero no en el estado no unido. Si pasa, escribirá el número de enlaces de hidrógeno no satisfechos en el archivo de puntuación y en el tracer. También escribe en el tracer los residuos y átomos específicos que no están satisfechos y una cadena con formato para seleccionarlos fácilmente en pymol.

```xml
<SymUnsatHbonds name="(&string)" jump="(1 &size)" sym_dof_names="('' &string)" cutoff="(20 &size)"/>
```

-   jump: qué jump se examina.
-   sym\_dof\_names: qué jump(s) se examinan. En sistemas multicomponente, basta pasar los nombres de los sym\_dofs que controlan los jumps maestros. En sistemas de un solo componente, todavía se puede usar jump.
-   cutoff: número máximo permitido de enlaces de hidrógeno enterrados no satisfechos.

## Véase también

* [[ClashCheckFilter]]
* [[GetRBDOFValuesFilter]]
* [[InterfacePackingFilter]]
* [[MutationsFilter]]
* [[OligomericAverageDegreeFilter]]
