<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Código de interfaz de refinamiento cristalográfico con PHENIX. Fija las opciones de refinamiento que se pasan a través de la interfaz con PHENIX.

```xml
<SetRefinementOptions name="(&string;)" res_high="(0.0 &real;)"
        res_low="(0.0 &real;)" twin_law="(&string;)" algorithm="(&string;)"
        target="(&string;)" map_type="(&string;)" sharpen_b="(0.0 &real;)"
        cifs="(&string;)" />
```

-   **res_high**: fija el límite superior de resolución (ResLimit) para el refinamiento con PHENIX
-   **res_low**: fija el límite inferior de resolución (ResLimit) para el refinamiento con PHENIX
-   **twin_law**: fija la ley de macla (twin law) para el refinamiento con PHENIX
-   **algorithm**: fija el algoritmo para el refinamiento con PHENIX
-   **target**: fija la función objetivo para el refinamiento con PHENIX
-   **map_type**: fija el tipo de mapa para el refinamiento con PHENIX
-   **sharpen_b**: fija sharpen_b para el refinamiento con PHENIX
-   **cifs**: archivos cif que se pasan al refinamiento con PHENIX. El argumento válido son cifs separados por comas: 'cif1.cif,cif2.cif,cif3.cif

---
