<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<ClusterPoseSelector name="(&string;)" radius="(&non_negative_integer;)"
        structures_per_cluster="(1 &non_negative_integer;)"
        max_cluster_size="(&non_negative_integer;)"
        max_clusters="(&non_negative_integer;)"
        initial_cluster_set_size="(&non_negative_integer;)"
        remove_singletons="(&bool;)" >
    <Pose Property Reporter Tag ... />
</ClusterPoseSelector>
```

-   **radius**: (OBLIGATORIO) Radio del clúster
-   **structures_per_cluster**: Número de estructuras que se seleccionan de cada clúster
-   **max_cluster_size**: Número máximo de estructuras en un clúster. Por defecto no hay límite.
-   **max_clusters**: Número máximo de clústeres. Por defecto no hay límite
-   **initial_cluster_set_size**: XRW POR HACER
-   **remove_singletons**: ¿Eliminar las estructuras que quedan solas en su propio clúster?


"Pose Property Reporter Tag": Cualquiera de los [[Pose Property Reporters|RosettaScripts-MultiplePoseMover#pose-property-reporters]]

---
