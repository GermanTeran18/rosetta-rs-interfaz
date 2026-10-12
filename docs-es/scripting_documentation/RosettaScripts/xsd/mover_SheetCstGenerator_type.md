<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<SheetCstGenerator name="(&string;)" blueprint="(&string;)"
        secstruct="(&dssp_string;)" spairs="(&string;)"
        flat_bottom_constraints="(true &bool;)" dist="(5.5 &real;)"
        dist_tolerance="(1.0 &real;)" angle_tolerance="(0.35 &real;)"
        cacb_dihedral_tolerance="(0.9 &real;)"
        bb_dihedral_tolerance="(0.52 &real;)" weight="(1.0 &real;)"
        use_dssp="(false &bool;)" />
```

-   **blueprint**: Ruta al archivo blueprint que especifica el emparejamiento de hebras
-   **secstruct**: Cadena que especifica la estructura secundaria de la Pose
-   **spairs**: Cadena que especifica el emparejamiento de hebras
-   **flat_bottom_constraints**: ¿Usar restricciones de fondo plano?
-   **dist**: Distancia deseada entre hebras
-   **dist_tolerance**: Tolerancia de la distancia entre hebras
-   **angle_tolerance**: Tolerancia del ángulo entre hebras
-   **cacb_dihedral_tolerance**: Tolerancia del ángulo diedro Ca-Cb (en radianes)
-   **bb_dihedral_tolerance**: Tolerancia de la restricción del ángulo diedro de la cadena principal (en radianes)
-   **weight**: Peso que se usa para estas restricciones
-   **use_dssp**: ¿Usar DSSP para determinar la estructura secundaria?

---
