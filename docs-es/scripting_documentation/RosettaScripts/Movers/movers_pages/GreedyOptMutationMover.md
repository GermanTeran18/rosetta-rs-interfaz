# GreedyOptMutationMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## GreedyOptMutationMover
### Publicación

King C, Garza EN, Mazor R, Linehan JL, Pastan I, Pepper M, Baker D. Removing T-cell epitopes with computational protein design. Proceedings of the National Academy of Sciences. 2014 Jun 10;111(23):8577-82.
[[http://www.pnas.org/content/111/23/8577.long]]

Nivón, L. G., Bjelic, S., King, C. and Baker, D. (2014), Automating human intuition for protein design. Proteins, 82: 858–866. doi:10.1002/prot.24463
[[http://onlinelibrary.wiley.com/doi/10.1002/prot.24463/full]]

Este mover intentará primero mutaciones aisladas/independientes definidas en la operación de tarea de entrada, las puntuará y filtrará todas, las ordenará por puntuación y luego intentará combinarlas, empezando por la mutación individual con mejor puntuación, aceptando la mutación solo si la puntuación del filtro disminuye (consulta skip\_best\_check para una excepción opcional) y avanzando por la lista hasta el final. Opcionalmente, puede probarse una de las N mejores mutaciones en cada posición en lugar de solo la mejor.

Este mover es paralelizable con MPI. Para usarlo, debes poner la opción parallel=1 y debes poner la opción de línea de comandos nstruct = nprocs - 1

Nota: cada mutación que se intenta va siempre seguida del reempaquetado de todos los residuos en una capa de 8 Å alrededor del sitio de la mutación. El relax\_mover definido por el usuario se llama después.

Nota: producir la primera estructura de salida requiere calcular las puntuaciones de filtro de todas las mutaciones puntuales, lo que puede tardar un poco, pero la salida de estructuras posteriores (con nstruct \> 1 ) reutilizará esta tabla si sigue siendo válida, lo que hace que los cálculos de diseño posteriores sean significativamente más rápidos. Sin embargo, la tabla debe recalcularse cada vez si recibe estructuras distintas en cada iteración (p. ej., si se usan movers que cambian la estructura de forma estocástica antes de llamar a este mover).

Necesario:

-   task\_operations: define las posiciones diseñables y las identidades
-   filter: define la puntuación que intentas optimizar (y un umbral); por defecto menor = mejor
-   relax\_mover: un mover para la relajación posterior al reempaquetado (p. ej., minimización)

Opcional:

-   filter\_delta: añade diversidad de secuencia; es útil con nstruct \> 1; prueba al azar cualquier mutación cuya puntuación esté a menos de N puntos de filtro de la mutación con mejor puntuación en cada posición, en lugar de solo la primera, p. ej., filter\_delta=0.5 para intentar cualquier mutación a menos de 0.5 puntos de filtro de la mejor
-   incl\_nonopt: valor predeterminado = false. Se usa con filter\_delta. Esta opción modifica el comportamiento de filter\_delta de modo que, en la etapa de diseño combinatorio, se intentan todas las mutaciones que puntúan a menos de N puntos de filtro de la mejor.
-   sample\_type: si tus valores de filtro son tales que mayor = mejor, usa "sample\_type=high"
-   dump\_pdb: si quieres ver un pdb de cada mutación de prueba, añade "dump\_pdb=1"
-   dump\_table: si es true, guardará en un archivo la tabla de aminoácidos/valores de filtro sobre la que opera. (El nombre de archivo y el formato de la tabla pueden cambiar: la versión actual enumera la puntuación de cada mutación permitida, con un \* junto a la identidad original. El orden de los aminoácidos de la tabla se establece ordenando según el filtro, de modo que el primer aa enumerado es el mejor según el filtro, etc.)
-   design\_shell: el valor predeterminado es -1, por lo que no hay diseño. Establece un valor positivo para determinar el radio de la capa de diseño. Puede ser útil en caso de reversión a nativo cuando se necesita más de una mutación para revertir.
-   repack\_shell: qué radio se reempaqueta alrededor de cada mutación probada/diseñada
-   stopping\_condition: se detiene antes de completar los trials si un filtro se evalúa como true (por defecto acepta la última mutación que hizo que el filtro se evaluara como true; consulta stop\_before\_condition para cambiar este comportamiento).
-   stop\_before\_condition: valor predeterminado = false. Detiene el mover una vez alcanzada la stopping\_condition y no acepta la última mutación (es decir, rechaza la mutación que hizo que stopping\_condition fuera true)
-   skip\_best\_check: valor predeterminado = false. Acepta mutaciones durante la etapa de combinación siempre que superen el/los filtro(s), independientemente de si el valor es el mejor hasta el momento.
-   reset\_delta\_filters: lista de delta\_filters separados por comas. Restablecerá el valor de referencia de cada delta filter para que coincida con la "mejor Pose" después de cada mutación aceptada durante la etapa de combinación. Es útil para que las mutaciones se sigan evaluando de forma individual, en el contexto de la mejor Pose actual.
-   rtmin: ¿hacer rtmin después del reempaquetado?
-   parallel: ejecuta el calculador de mutaciones puntuales en paralelo; se usa junto con openMPI
-   el modo pareto se activa siempre que se definen varios filtros con etiquetas branch (véase más abajo). El modo pareto intentará primero mutaciones aisladas/independientes definidas en la operación de tarea de entrada y las puntuará/filtrará todas con todos los filtros definidos. Después, se identifican las mutaciones óptimas de Pareto en cada posición (véase: [página de Wikipedia sobre la frontera de Pareto](http://en.wikipedia.org/wiki/Pareto_efficiency#Pareto_frontier)), descartando las mutaciones no óptimas. A continuación, el mover intenta combinar las mutaciones óptimas de Pareto de cada posición. **este es un mover de múltiples Poses, así que usa nstruct >1. -nstruct 100 es seguro. El número de Poses almacenadas en caché en memoria está limitado por nstruct para evitar la sobrecarga de memoria**.

```xml
<GreedyOptMutationMover name="(&string)" task_operations="(&string comma-separated taskoperations)" filter="(&string)" scorefxn="(score12 &string)" relax_mover="(&string)" sample_type="(low &string)" diversify_lvl="(1 &int)" dump_pdb="(0 &bool)" dump_table="(0 &bool)" rtmin="(0 &bool)" stopping_condition="('' &string)" stop_before_condition="(0 &bool)" skip_best_check="(0 &bool)" reset_delta_filters="(&string comma-separated deltafilters)" design_shell="(-1, real)" repack_shell="(8.0, &real)"/>

#Pareto mode example, minimize filter 1 and maximize filter2 
<GreedyOptMutationMover name="gopt" task_operations="task" relax_mover="min" scorefxn="score12">
    <Filters>
       <AND filter_name="filter1" sample_type="low"/>
       <AND filter_name="filter2" sample_type="high"/>
    </Filters>
</GreedyOptMutationMover>
```


##Véase también

* [[RandomMutationMover]]
* [[DeltaFilter]]
* [[GenericMonteCarloMover]]
* [[RotamerTrialsMover]]
* [[PackRotamersMover]]
* [[Aplicación de escaneo de mutantes puntuales|pmut-scan-parallel]]
* [[I want to do x]]: guía para elegir un mover
