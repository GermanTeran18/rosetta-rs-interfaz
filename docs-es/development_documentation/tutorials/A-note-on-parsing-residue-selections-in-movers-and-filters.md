# Una nota sobre la interpretación de selecciones de residuos en movers y filtros

Volver a la [[documentación para desarrolladores|development_documentation/Development-Documentation]].

Página creada por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker, 25 de junio de 2015.

## Formas en que los usuarios pueden especificar residuos

Históricamente, los usuarios podían especificar los índices de residuos de dos maneras: con la numeración interna de Rosetta (<i>p. ej.</i> ```7```), en la que a cada residuo de cada Pose se le da un índice único, continuo y que empieza en 1, o con la numeración del PDB (<i>p. ej.</i> ```7A```), en la que el usuario debe especificar un índice de residuo y una letra de cadena.  También se ha añadido una tercera opción: usar Poses de referencia, en las que una posición conocida de una etapa anterior de un Pose se usa para seleccionar una posición en el Pose actual.  El formato es:
 
```
refpose(<refpose_name>,<Rosetta_index_in_refpose>)±<residue_offset>
```

Por ejemplo, en un punto concreto de un script, podría crear una instantánea del Pose con el mover StorePoseSnapshot y llamarla "refpose1".  Después podría aplicar movers que alteren la numeración de los residuos (insertar residuos, eliminar residuos, <i>etc.</i>) y luego decirle a Rosetta que quiero mutar el residuo que está tres residuos después del que era el residuo 12 cuando tomé la instantánea del Pose, usando la cadena ```refpose(refpose1,12)+3```.  Esto puede ser especialmente útil al trabajar con loops de longitud variable.

## Cómo funciona internamente la maquinaria de Poses de referencia

Los objetos Pose ahora guardan un puntero propietario a un objeto ReferencePoseSet.  Por defecto, este puntero propietario es nulo, lo que no cuesta casi nada en uso de memoria.  Cuando se aplica el mover StorePoseSnapshot, se crea un objeto ReferencePoseSet (si no existe ninguno), el puntero propietario se fija para apuntar a él, y se crea e inicializa un nuevo objeto ReferencePose dentro del ReferencePoseSet.  Un objeto ReferencePose guarda una correspondencia entre (índice_del_pose_antiguo_en_el_estado_de_referencia) y (índice_del_pose_actual_en_el_estado_actual).  Si el residuo del estado de referencia ha dejado de existir, la correspondencia será con el residuo 0.  El mapa se inicializa como una correspondencia simple de cada residuo consigo mismo, ya que la longitud y la numeración del Pose todavía no se han modificado.

## Cómo lograr que los movers que alteran la longitud del Pose actualicen los Poses de referencia guardados

Mientras los movers que añaden, insertan o eliminan residuos lo hagan llamando a los distintos métodos de adición, inserción o eliminación de la clase core::pose::Pose, la numeración de los Poses de referencia se actualiza automáticamente y no hace falta cambiar nada en el mover.  Si un mover se salta estos métodos y llama directamente a los métodos de adición, inserción o eliminación de la clase core::conformation::Conformation, la numeración de los Poses de referencia será incorrecta.

## Cómo lograr que los movers y filtros que toman índices de residuos como entrada entiendan los Poses de referencia

Antes, los movers que podían interpretar tanto la numeración de Rosetta como la del PDB lo hacían llamando a la función ```core::pose::parse_resnum()``` de core/pose/selection.cc.  Esta función se sigue usando con este fin, aunque ahora <i>también</i> puede interpretar números de Poses de referencia.  Sin embargo, no lo hace por defecto.  Para permitir que un mover o filtro aproveche los Poses de referencia, hay que hacer los siguientes pequeños cambios:

- El mover o filtro debe guardar una cadena para la selección de residuos en lugar de un entero o un core::Size.  Esto añade una sobrecarga de memoria despreciable al mover o filtro.

- En la función ```apply()``` del mover o filtro (<i>NO en su función</i> ```parse_my_tag```<i>!</i>), el mover o filtro debe llamar a ```core::pose::parse_resnum()```, con ```check_for_refpose=true```, para convertir la cadena en un índice de Rosetta para el estado actual del Pose.  Esto añade un costo computacional despreciable al mover o filtro, pero debe hacerse en el momento de aplicar y no en la configuración inicial, porque la razón de ser de los Poses de referencia es que la longitud o la numeración del Pose puede cambiar desde el comienzo de un script o protocolo hasta el punto en que se aplica un mover o filtro. Ten en cuenta que, si ```check_for_refpose=false``` (el valor por defecto), la función no considera si la cadena podría especificar una numeración de Pose de referencia y solo realiza el comportamiento antiguo de comprobar la numeración de Rosetta o del PDB.  Esto es para evitar que los movers que no se han modificado para interpretar la numeración de residuos en el momento de aplicar usen Poses de referencia.

## ¿Dónde está el código?

* Las clases ReferencePose y ReferencePoseSet están en core/pose/reference_pose/
* Las funciones de utilidad para actualizar los Poses de referencia se han añadido a core/pose/Pose.cc.
* El mover StorePoseSnapshot está en protocols/simple_moves/StorePoseSnapshot.cc.
* El mover MutateResidue, que sirve de ejemplo de cómo se pueden modificar los movers para usar Poses de referencia, está en protocols/simple_moves/MutateResidue.cc.

##Véase también

* [[RosettaScripts Developer Guide]]
* [[StorePoseSnapshotMover]]
* [[MutateResidueMover]]: Un mover que actualmente admite Poses de referencia
