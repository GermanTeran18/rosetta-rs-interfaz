# DisulfideFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## DisulfideFilter

Exige que sea posible un enlace disulfuro entre las interfaces. "Posible" se toma de forma bastante laxa; se exige una puntuación de disulfuro de centroide razonable (átomos CB bastante cercanos y sin demasiada tensión angular).

Al buscar un enlace disulfuro se consideran los residuos de `     targets    `. Igual que en [[DisulfideMover|Movers-RosettaScripts#DisulfideMover]], si no se especifica ningún residuo de una de las parejas de la interfaz, se considerarán todos los residuos de esa pareja.

```xml
<DisulfideFilter name="&string" targets="(&string)"/>
```

-   targets: una lista de números de residuo separados por comas. Pueden usar la numeración de Rosetta (entero simple) o la del pdb (entero seguido de la letra de la cadena, p. ej., '123A'). Los objetivos deben estar ubicados en la interfaz. Por defecto: todos los residuos de la interfaz. *Opcional*

## Véase también:

* [[AveragePathLengthFilter]]
* [[DisulfideFilter]]
