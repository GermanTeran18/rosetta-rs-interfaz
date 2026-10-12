<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Almacena en un silent file las salidas de la trayectoria

```xml
<SilentTrajectoryRecorder name="(&string;)"
        stride="(100 &non_negative_integer;)" filename="(&string;)"
        cache_limit="(500 &non_negative_integer;)"
        cumulate_jobs="(false &bool;)" cumulate_replicas="(false &bool;)"
        score_stride="(100 &non_negative_integer;)"
        silent_struct_type="(any &string;)" write_extra_scores="(false &bool;)" />
```

-   **stride**: Cada cuántos ciclos se toma una instantánea y se envía a un archivo
-   **filename**: Nombre del archivo de salida
-   **cache_limit**: Cuánta información (en kb) se guarda en memoria antes de escribir en disco
-   **cumulate_jobs**: ¿Combinar los trabajos MPI en un único archivo?
-   **cumulate_replicas**: ¿Combinar las réplicas en un único archivo?
-   **score_stride**: Cada cuántos ciclos se toman instantáneas y se guarda la salida
-   **silent_struct_type**: Tipo de estructura silent que se usa para la salida
-   **write_extra_scores**: Escribe un archivo de puntuaciones independiente

---
