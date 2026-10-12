<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Funcionalmente es un mover de optimización; toma una Pose con desviaciones de la simetría suficientemente pequeñas y las resuelve.

```xml
<Symmetrizer name="(&string;)" symm_file="(&string;)" axis="(z &axis_char;)"
        angle_min="(0.0 &real;)" angle_max="(0.0 &real;)"
        sampling_mode="(uniform &Symmetrizer_sampling_mode_choices;)"
        grid="(false &bool;)" angle_step="(&real;)" radial_disp_step="(&real;)"
        angle_delta="(0.0 &real;)" radial_disp_min="(0.0 &real;)"
        radial_disp_max="(0.0 &real;)" radial_disp_delta="(0.0 &real;)"
        radial_disp="(0.0 &real;)" angle="(0.0 &real;)" />
```

-   **symm_file**: (OBLIGATORIO) Archivo de definición de simetría para crear una Pose totalmente simétrica a partir de la unidad asimétrica de entrada.
-   **axis**: Eje alrededor del cual se simetriza.
-   **angle_min**: Para usar con muestreo uniforme.
-   **angle_max**: Para usar con muestreo uniforme.
-   **sampling_mode**: El valor por defecto es 'uniform', pero también puede ser 'grid' o 'gaussian'
-   **grid**: XRW POR HACER (¿qué HACE?) Por defecto es false; pero si se pone en true, también hay que fijar angle_step y radial_disp_step.
-   **angle_step**: xRW POR HACER (¿qué HACE?) Hay que usar esta opción cuando sampling_mode=grid O cuando grid=true
-   **radial_disp_step**: Hay que usar esta opción cuando sampling_mode=grid O cuando grid=1
-   **angle_delta**: El valor por defecto es '0.0', pero cuando se usa sampling_mode=gaussian, se cambia este valor.
-   **radial_disp_min**: XSD XRW POR HACER
-   **radial_disp_max**: XSD XRW POR HACER
-   **radial_disp_delta**: El valor por defecto es '0.0', pero cuando se usa sampling_mode=gaussian, se cambia este valor.
-   **radial_disp**: Traslación de la unidad asimétrica, si es necesario
-   **angle**: Ángulo de rotación de la unidad asimétrica, si es necesario.

---
