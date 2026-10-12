# DisulfideMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## DisulfideMover

Introduce un enlace disulfuro en la interfaz. La mejor posición para el enlace disulfuro se selecciona entre los residuos indicados en `     targets    `. Esto puede tardar bastante, por lo que se sugiere especificar un número pequeño de residuos en `     targets    `.

Si no se especifican objetivos en ninguno de los compañeros de la interfaz, se consideran todos los residuos de ese compañero al buscar un disulfuro. Así, incluir un solo residuo en `     targets    ` da como resultado un disulfuro desde ese residuo hasta la mejor posición al otro lado de la interfaz, y omitir por completo el parámetro `     targets    ` encuentra el mejor disulfuro en toda la interfaz.

Los enlaces disulfuro creados por este mover, si los hay, tienen garantizado que superan un DisulfideFilter.

```xml
<DisulfideMover name="&string" targets="(&string)"/>
```

-   targets: una lista de números de residuo separados por comas. Pueden usar la numeración de Rosetta (entero simple) o la numeración PDB (entero seguido de la letra de la cadena, p. ej., '123A'). Se exige que los objetivos estén situados en la interfaz. Valor predeterminado: todos los residuos de la interfaz. *Opcional*



##Véase también

* [[ForceDisulfidesMover]]
* [[DisulfidizeMover]]
* [[RemodelMover]]
* [[I want to do x]]: guía para elegir un mover
