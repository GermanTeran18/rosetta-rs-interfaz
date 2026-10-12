<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Dado un péptido cíclico cuasi simétrico, este mover alinea el péptido de modo que el eje de simetría cíclica quede a lo largo del eje Z y el centro de masa en el origen. Después, opcionalmente, elimina todas las repeticiones de simetría menos una, de modo que se pueda configurar la simetría verdadera con el mover SetupForSymmetry.

Referencias e información de autoría del mover SymmetricCycpepAlign:

Autor(es) de SymmetricCycpepAlign (Mover):
Vikram K. Mulligan, Systems Biology, Center for Computational Biology, Flatiron Institute [vmulligan@flatironinstitute.org]

```xml
<SymmetricCycpepAlign name="(&string;)" auto_detect_symmetry="(&bool;)"
        symmetry_repeats="(&non_negative_integer;)" mirror_symmetry="(&bool;)"
        angle_threshold="(&real;)" trim_to_single_repeat="(&bool;)"
        repeat_to_preserve="(&non_negative_integer;)" invert="(&bool;)" />
```

-   **auto_detect_symmetry**: Si es true, la simetría de este péptido se detectará automáticamente. Por defecto es false. (Ten en cuenta que, si se pone "true", no se pueden usar las opciones "symmetry_repeats" ni "mirror_symmetry".)
-   **symmetry_repeats**: El número de repeticiones de simetría. Por ejemplo, para especificar simetría c6 o s6, ponlo en "6". Por defecto es "2" (para simetría c2).
-   **mirror_symmetry**: Si es true, indica que la Pose tiene simetría especular. Por ejemplo, para especificar simetría s6, pon "symmetry_repeats" en "6" y "mirror_symmetry" en "true". Si se pone "false", indicaría simetría c6. Por defecto es "false" (para simetría c2 sin espejo).
-   **angle_threshold**: El corte, en grados, para considerar iguales dos valores diedros. Por defecto es 10 grados. Se usa al confirmar que un péptido cuasi simétrico tiene la simetría indicada, o al detectar la simetría del péptido.
-   **trim_to_single_repeat**: Si es true, se elimina toda la geometría del péptido (incluidos todos los entrecruzadores), excepto la parte polipeptídica de una única repetición de simetría. Por defecto es "false". (Es útil para preparar un péptido para el mover SetupForSymmetry).
-   **repeat_to_preserve**: Si "trim_to_single_repeat" es true, esta es la repetición de simetría que NO se elimina (es decir, la que se conserva). Por defecto es "1".
-   **invert**: Si es true, la normal del péptido se alinea con el eje Z negativo; si es false, se alinea con el positivo. Por defecto es false.

---
