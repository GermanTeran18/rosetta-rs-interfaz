# AngleToVector
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## AngleToVector

Un filtro ad hoc que calcula el ángulo (en grados, 0-180) entre dos átomos del primer residuo de una cadena y un vector predeterminado. La finalidad de este filtro es comprobar si una molécula pequeña está unida en un bolsillo de la proteína con la orientación "correcta".

```xml
<AngleToVector name="(&string)" atm1="(&string)" atm2="(&string)" chain="(2&size)" refx="(&real)" refy="(&real)" refz="(&real)" min_angle="(0.0&real)" max_angle="(90.0&real)"/>
```
-  atm1, atm2: los nombres de los átomos con los que se calcula el vector de direccionalidad, por ejemplo "CA", "NE".
-  chain: en qué cadena está el ligando.
-  refx, refy, refz: las componentes x, y, z, respectivamente, del vector de referencia. El filtro normaliza el vector de referencia antes de calcular el ángulo.
-  min_angle, max_angle: para filtrar, los ángulos mínimo y máximo que se exigen.

El filtro calcula el vector atm1 - atm2 y luego calcula el ángulo entre este vector diferencia y el vector de referencia.

Si no sabes cómo generar un vector de referencia, coloca tu ligando en la orientación deseada respecto a la proteína y ejecuta el filtro con valores arbitrarios de refx, refy y refz. Obtendrás una salida del tracer:

    protocols.simple_filters.AngleToVector: diff vec ...

Esa salida especifica las componentes x, y, z del vector normalizado atm1 - atm2. Ahora usa esos tres valores en refx, refy y refz del filtro y listo.

## Véase también

* [[DockingMover]]
* [[DockingProtocolMover]]
* [[DockWithHotspotMover]]
* [[TorsionFilter]]
* [[GeometryFilter]]
* [[SecondaryStructureFilter]]
* [[SecondaryStructureHasResidueFilter]]
