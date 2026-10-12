# GetRBDOFValues
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## GetRBDOFValues

Calcula la traslación o la rotación actual a través de un jump especificado por el usuario (referido por jump\_id o sym\_dof\_name).

```xml
<GetRBDOFValues name="(&string)"  jump="(1 &int)" sym_dof_name="('' &string)" verbose="(0 &bool)" axis="('x' &char)" get_disp="(0 &bool)" get_angle="(0 &bool)" init_disp="(0 &Real)" init_angle="(0 &Real)" get_init_value(0 &bool)/>
```

-   jump: número del jump móvil para el que se calcula la traslación o la rotación
-   sym\_dof\_name: Sym\_dof\_name del jump móvil para el que se calcula la traslación o la rotación
-   verbose: escribe en el tracer el jump y el desplazamiento o ángulo correspondiente
-   axis: eje del sistema de coordenadas local alrededor del cual se calcula la traslación o la rotación (por ahora no está preparado para valores fuera del eje)
-   get\_disp: si es true (y get\_disp es false), calcula el desplazamiento a través del jump especificado
-   get\_angle: si es true (y get\_angle es false), calcula el ángulo de rotación alrededor del jump especificado
-   init\_disp: valor inicial de desplazamiento que se suma a cada valor calculado
-   init\_angle: valor inicial de ángulo que se suma a cada valor calculado
-   get\_init\_value: obtiene el desplazamiento o ángulo inicial del jump especificado desde el SymDofMoverSampler

## Véase también

* [[ClashCheckFilter]]
* [[InterfacePackingFilter]]
* [[MutationsFilter]]
* [[OligomericAverageDegreeFilter]]
* [[SymUnsatHbondsFilter]]
