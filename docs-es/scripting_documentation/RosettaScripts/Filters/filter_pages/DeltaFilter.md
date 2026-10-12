# Delta
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Delta

Calcula la diferencia del valor de un filtro respecto a la estructura de entrada.

```xml
<Delta name="(&string)" upper="(1 &bool)" lower="(0 &bool)" range="(0 &Real)" filter="(&string)" unbound="(0 &bool)" jump="(see below &Int)" relax_mover="(null &string)"/>
```

-   upper/lower: ¿el umbral es superior/inferior? Usa ambos si el umbral es un valor exacto.
-   range: cuánto por encima o por debajo de la línea base se permite.
-   filter: el nombre de un filtro predefinido para la evaluación.
-   unbound: traslada las parejas 10000A antes de evaluar la línea base y los filtros. Permite evaluar el Pose no unido.
-   jump: si se fija unbound, sirve para indicar a lo largo de qué jump se traslada.
-   relax\_mover: se llama al analizar el script, antes de fijar la línea base. Útil para obtener las energías lo más bajas posible (¿repack/min?).
-   relax_unbound: ¿relajar el estado no unido con el mover de relax?
-   reference\_name: usa un Pose de referencia de un punto anterior del script, con el nombre indicado en el archivo XML
-   reference\_pdb: usa un Pose de referencia desde el disco
-   changing_baseline: restablece el valor de la línea base al valor actual después de cada aceptación

El filtro se evalúa al analizar el script y se guarda su valor interno (mediante report\_sm). Al aplicarlo, se vuelve a llamar a report\_sm del filtro y se evalúa el delta.

## Véase también

* [[BindingStrainFilter]]
* [[DeltaFilter]]
* [[GreedyOptMutationMover]]
