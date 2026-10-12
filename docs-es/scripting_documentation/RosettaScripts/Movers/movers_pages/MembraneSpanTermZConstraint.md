# MembraneSpanTermZConstraint
*Volver a la página de [[Filters|Filters-RosettaScripts]].*
## MembraneSpanTermZConstraint

Establece una restricción por la que los extremos de todos los tramos TM (último residuo) deben estar cerca en el eje Z (profundidad de membrana). 
Es útil para simulaciones de plegamiento y docking heterólogos, para evitar que los tramos TM se desplacen en el eje Z unos respecto a otros.
```xml
<MembraneSpanTermZConstraint name="(& string)"/>
```
## Véase también

* [[MembraneSpanConstraint]]
