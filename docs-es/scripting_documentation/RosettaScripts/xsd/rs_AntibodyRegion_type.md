<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com)
Selecciona residuos de regiones concretas del anticuerpo.

```xml
<AntibodyRegion name="(&string;)" region="(&region_string;)"
        cdr_definition="(&string;)" input_ab_scheme="(&string;)" />
```

-   **region**: Selecciona la región que quieres desactivar. Opciones: cdr_region, framework_region, antigen_region
-   **cdr_definition**: Fija la definición de CDR que quieres usar. Requiere la opción input_ab_scheme
-   **input_ab_scheme**: Fija el esquema de numeración de anticuerpos. Requiere la opción XML cdr_definition. Ambas opciones también se pueden fijar por línea de comandos (recomendado).

---
