<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com)
Selecciona residuos CDR.

```xml
<CDR name="(&string;)" cdrs="(L1,L2,L3,H1,H2,H3 &string;)"
        cdr_definition="(Aroop &string;)" input_ab_scheme="(&string;)" />
```

-   **cdrs**: Qué CDR se incluyen. Lista separada por comas. Por defecto: L1,L2,L3,H1,H2,H3
-   **cdr_definition**: Fija la definición de CDR que quieres usar. Requiere la opción XML input_ab_scheme.
-   **input_ab_scheme**: Fija el esquema de numeración de anticuerpos. Requiere la opción cdr_definition. Ambas opciones también se pueden fijar por línea de comandos (recomendado)

---
