<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Transforma una Pose para colocarla en la membrana.

```xml
<TransformIntoMembraneMover name="(&string;)" jump="(&non_negative_integer;)"
        use_default_membrane="(&bool;)" user_defined_membrane="(&bool;)"
        flip_if_needed="(0 &bool;)" center="(&string;)" normal="(&string;)" />
```

-   **jump**: Salto que se usa para la transformación
-   **use_default_membrane**: ¿Usar la membrana por defecto (si el usuario no especifica una)? Si este atributo y user_defined_membrane son false, la posición de la membrana se toma de la Pose.
-   **user_defined_membrane**: ¿Usar una membrana definida por el usuario?
-   **flip_if_needed**: ¿Se debe voltear la Pose si está en la orientación equivocada?
-   **center**: Posición del centro de la membrana en formato x,y,z
-   **normal**: Vector normal de la membrana en formato x,y,z

---
