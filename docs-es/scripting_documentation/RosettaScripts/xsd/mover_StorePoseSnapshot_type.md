<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
El numerado secuencial de residuos de Rosetta puede dar dolores de cabeza en protocolos en los que se insertan o eliminan residuos y en los que luego se quiere hacer referencia a residuos posteriores al punto de inserción o eliminación. El mover StorePoseSnapshot está pensado para permitir al usuario guardar una instantánea con nombre, o «Pose de referencia», en un punto concreto de un protocolo, y luego usar la numeración de residuos de la Pose en ese punto del protocolo para movers y filtros que se apliquen más tarde, cuando los índices de la Pose puedan haber cambiado por inserciones o eliminaciones.

```xml
<StorePoseSnapshot name="(&string;)" reference_pose_name="(&string;)"
        override_current="(&bool;)" />
```

-   **reference_pose_name**: (OBLIGATORIO) El nombre del objeto de instantánea o Pose de referencia. Se pueden almacenar muchas instantáneas distintas (aplicando distintos movers StorePoseSnapshot en diferentes puntos del protocolo) y luego hacer referencia a ellas con nombres diferentes
-   **override_current**: Si ya existe una Pose de referencia, la sobrescribe.

---
