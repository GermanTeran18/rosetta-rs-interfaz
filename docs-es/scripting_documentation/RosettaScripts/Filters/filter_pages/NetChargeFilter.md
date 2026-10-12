# NetCharge
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

<i>Nota:  esta página trata del </i>filtro<i> NetCharge.  Para información sobre el término de puntuación `netcharge`, consulta [[esta página|NetChargeEnergy]].</i>

## NetCharge

Este filtro suma todos los aminoácidos con carga positiva y negativa de tu estructura e informa una carga neta simplista basada en la secuencia.

```xml
<NetCharge name="(&string)" min="(-100 &Integer)" max="(100 &Integer)" chain="(0 &Integer)" task_operations="('' &string)" />
```

-   min: carga neta mínima deseada (por defecto: -100).
-   max: carga neta máxima deseada (por defecto: 100).
-   chain: especifica para qué cadena quieres calcular la carga neta (en el archivo PDB de entrada, de arriba abajo: 1 es la primera cadena, 2 la segunda, y así sucesivamente). Usa el valor 0 (por defecto) si quieres considerar todos los residuos de la estructura PDB de entrada.
-   task_operations: todos los residuos que son diseñables según las task_operations se seleccionarán para calcular la carga neta. Los residuos que no estén marcados como diseñables no se cuentan.

Este filtro asigna +1 a los residuos básicos LYS y ARG, y -1 a los residuos ácidos ASP y GLU.

Para diseñar con una carga neta deseada en lugar de filtrar después, puedes usar el [[término de puntuación netcharge|NetChargeEnergy]].

## Véase también:

* [[TotalSasaFilter]]
* [[SasaFilter]]
* [[ResidueBurialFilter]]
* [[ExposedHydrophobicsFilter]]
* [[NetChargeEnergy]]
