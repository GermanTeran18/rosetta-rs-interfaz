<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
El BinSelector selecciona residuos que caen en un intervalo de torsión de la cadena principal con nombre (por ejemplo, el intervalo "A", que corresponde a residuos alfa helicoidales según la nomenclatura "ABEGO"). Se ignoran los residuos no poliméricos. Por defecto solo se seleccionan alfa-aminoácidos, aunque esto se puede desactivar.

```xml
<Bin name="(&string;)" bin_params_file="(ABEGO &string;)" bin="(&string;)"
        select_only_alpha_aas="(true &bool;)" />
```

-   **bin_params_file**: El nombre de un archivo bin_params que define un conjunto de intervalos de torsión. Las opciones actuales incluyen "ABEGO", "ABBA" (una versión simétrica de la nomenclatura ABEGO, útil para diseño mixto D/L) y "PRO_DPRO" (que define los intervalos "LPRO" y "DPRO", correspondientes a las regiones del espacio de Ramachandran accesibles a la L-prolina y a la D-prolina, respectivamente). Los archivos bin_params predefinidos están en database/protocol_data/generalizedKIC/bin_params/. También se puede dar un archivo bin_params escrito a medida, con su ruta relativa al directorio de ejecución.
-   **bin**: El nombre del intervalo de torsión de la cadena principal.
-   **select_only_alpha_aas**: Si es true, solo se seleccionan alfa-aminoácidos. Si es false, se selecciona cualquier tipo polimérico permitido por el archivo de definición de intervalos.

---
